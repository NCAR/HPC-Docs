# Using the Kubernetes MPI Operator for Scientific Computing

This guide explains how to run MPI (Message Passing Interface) jobs on Kubernetes using the [kubeflow/mpi-operator](https://github.com/kubeflow/mpi-operator). This allows scientific users to leverage Kubernetes clusters for multi-node, multi-GPU HPC workloads without needing deep Kubernetes expertise.

## Table of Contents

1. [What is the MPI Operator?](#what-is-the-mpi-operator)
2. [Key Concepts](#key-concepts)
3. [Basic MPIJob Structure](#basic-mpijob-structure)
4. [SSH Configuration: The Key to MPI Communication](#ssh-configuration-the-key-to-mpi-communication)
5. [Running MPI Jobs](#running-mpi-jobs)
6. [Common Patterns and Examples](#common-patterns-and-examples)
7. [Running Jobs from Within a Pod](#running-jobs-from-within-a-pod)
8. [Multi-GPU and Multi-Node configurations](#multi-gpu-and-multi-node-configurations)
9. [Using GitHub Actions with MPIJob](#using-github-actions-mpijob)
10. [Troubleshooting](#troubleshooting)

---

## What is the MPI Operator?

The MPI Operator is a Kubernetes controller that simplifies running MPI workloads on Kubernetes. Instead of manually managing pods, services, and MPI runtime setup, the operator:

- Automatically creates launcher and worker pods
- Handles SSH key distribution between pods
- Sets up the necessary environment for MPI communication
- Manages job lifecycle (start, monitor, clean up)

The operator watches for `MPIJob` resources and takes care of all the complexity of running MPI jobs on Kubernetes.

---

## Key Concepts

| Concept | Description |
|---------|-------------|
| **MPIJob** | The main Kubernetes resource you create. It defines your MPI workload. |
| **Launcher** | A pod that runs `mpirun` to start the MPI job. Contains your computation code. |
| **Worker** | Pods that execute the actual MPI computation. They wait for commands from the launcher. |
| **slotsPerWorker** | Number of MPI ranks (processes) per worker pod. Think of this as "how many CPU cores per worker". |
| **cleanPodPolicy** | Determines what happens to pods after job completion (e.g., `Running` keeps them for debugging). |
| **sshAuthMountPath** | Where SSH keys are mounted for inter-pod communication. Usually `/root/.ssh`. |

---

## Basic MPIJob Structure

Here's the minimal structure of an MPIJob:

```yaml
apiVersion: kubeflow.org/v2beta1
kind: MPIJob
metadata:
  name: my-mpi-job
spec:
  slotsPerWorker: 1
  mpiReplicaSpecs:
    Launcher:
      replicas: 1
      template:
        spec:
          containers:
          - name: mpi-launcher
            image: your-mpi-image:tag
            command: ["mpirun"]
            args: ["-n", "2", "/path/to/your/program"]
    Worker:
      replicas: 2
      template:
        spec:
          containers:
          - name: mpi-worker
            image: your-mpi-image:tag
```

### Key Points:
- **Launcher** runs `mpirun` to start the distributed computation
- **Worker** pods run an SSH server (`sshd`) to accept connections from the launcher
- Both launcher and worker use the same MPI-enabled image

---

## SSH Configuration: The Key to MPI Communication

The MPI operator uses SSH to launch processes on worker pods. Without proper SSH configuration, the launcher cannot communicate with workers, and your job will fail with connection errors.

### How SSH Works in MPIJob

1. The MPI operator generates SSH keys and mounts them at `sshAuthMountPath` (default: `/root/.ssh`)
2. Worker pods run `sshd` as their main process to accept incoming connections
3. The launcher uses these keys to SSH into worker pods and start MPI processes

### Required SSH Configuration for Workers

Workers must run an SSH daemon with proper configuration. Here's the typical pattern:

```yaml
containers:
- name: mpi-worker
  image: your-mpi-image:tag
  command:
    - /usr/sbin/sshd
    - -De                    # Run in foreground, daemonize
    - -f /root/.sshd_config  # Path to SSH config file
```

### SSHD Config File Format

Create a ConfigMap for the SSHD configuration:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: mpi-sshd-config
data:
  sshd_config: |
    StrictModes no
```

### SSH Config File Format

Create a ConfigMap for the SSH configuration:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: mpi-ssh-config
data:
  ssh_config: |
    SendEnv LANG LC_*
    HashKnownHosts yes
    GSSAPIAuthentication yes
    StrictHostKeyChecking no
```

### Volume Mounts Required

Both launcher and worker need SSH-related volumes:

```yaml
# In Worker container
volumeMounts:
- name: sshd-config
  mountPath: /etc/ssh/sshd_config
  subPath: sshd_config
  readOnly: true

# In Launcher container (if custom config needed)
volumeMounts:
- name: ssh-config
  mountPath: /etc/ssh/ssh_config
  subPath: ssh_config
  readOnly: true

# Volumes section
volumes:
- name: sshd-config
  configMap:
    name: mpi-sshd-config
    items:
      - key: sshd_config
        path: sshd_config
- name: ssh-config
  configMap:
    name: mpi-ssh-config
    items:
      - key: ssh_config
        path: ssh_config
```

### Common SSH-Related Failures

| Symptom | Cause | Solution |
|---------|-------|----------|
| `ssh: connect to host ... port 22: Connection timed out` | Worker SSH daemon not running | Check worker container command runs `sshd` |
| `Permission denied (publickey)` | SSH keys not properly mounted | Verify `sshAuthMountPath` is correct |
| `sshd: no hostkeys available` | Missing SSH host keys | Ensure container has `/etc/ssh/ssh_host_*_key` files |

### Debugging SSH Issues

1. **Check worker pod logs for SSH daemon startup:**
   ```bash
   kubectl logs <worker-pod-name> -c mpi-worker
   # Should see: "sshd: Server listening on 0.0.0.0 port 22"
   ```

2. **Exec into launcher and test SSH manually:**
   ```bash
   kubectl exec -it <launcher-pod-name> -- /bin/bash
   # Inside the pod, try to SSH to a worker
   ssh <worker-pod-name> hostname
   ```

3. **Verify SSH keys are mounted:**
   ```bash
   kubectl exec <launcher-pod-name> -- ls -la /root/.ssh
   # Should show id_rsa, id_rsa.pub, known_hosts
   ```

### Example: Complete SSH Setup

See the [tensorflow-mnist.yaml](#example-3-running-tensorflow-multi-node-cpu-only) example for a working SSH configuration with proper ConfigMaps and volume mounts.

---

## Running MPI Jobs

## Running MPI Jobs

### Step 1: Create Your MPIJob YAML

Save your job configuration to a file, e.g., `myjob.yaml`.

### Step 2: Apply the Job

```bash
kubectl apply -f myjob.yaml
```

### Step 3: Monitor Job Progress

```bash
# Check job status
kubectl get mpijob my-mpi-job

# Watch for completion
kubectl get mpijob my-mpi-job -w
```

### Step 4: Get Logs

```bash
# Get launcher logs (where mpirun output appears)
kubectl logs -l training.kubeflow.org/job-name=my-mpi-job -c mpi-launcher

# Get worker logs if needed
kubectl logs <worker-pod-name> -c mpi-worker
```

### Step 5: Clean Up

```bash
kubectl delete mpijob my-mpi-job
```

---

## Common Patterns and Examples

### Example 1: Basic Multi-Node CPU Job (pi-demo)

This example runs a simple MPI program (calculating pi) across 2 worker nodes:

```yaml
apiVersion: kubeflow.org/v2beta1
kind: MPIJob
metadata:
  name: pi
spec:
  slotsPerWorker: 1
  mpiReplicaSpecs:
    Launcher:
      replicas: 1
      template:
        spec:
          containers:
          - image: docker.io/mpioperator/mpi-pi:openmpi
            name: mpi-launcher
            command:
            - mpirun
            args:
            - -n "2"              # Run 2 processes total
            - /home/mpiuser/pi    # Program to run
    Worker:
      replicas: 2             # Create 2 worker pods
      template:
        spec:
          containers:
          - image: docker.io/mpioperator/mpi-pi:openmpi
            name: mpi-worker
            command:
            - /usr/sbin/sshd
            - -De               # Run SSH daemon in foreground
            - -f /home/mpiuser/.sshd_config
```

### Example 2: PyTorch multi gpu training (multi-gpu-test)

For frameworks like PyTorch that need to know the cluster topology, use environment variables:

```yaml
apiVersion: kubeflow.org/v2beta1
kind: MPIJob
metadata:
  name: mpi-gpu-job
spec:
  slotsPerWorker: 1
  runPolicy:
    cleanPodPolicy: Running  # Keeps pods running after job completion for inspection
  sshAuthMountPath: /root/.ssh
  mpiReplicaSpecs:
    Launcher:
      replicas: 1
      template:
        spec:
          containers:
          - name: mpi-launcher
            image: hub.k8s.ucar.edu/khrpcek/nvda-pytorch:23.06
            imagePullPolicy: Always
            command: ["mpirun"]
            args:
              - "--allow-run-as-root"
              - "-np"
              - "$(PYTORCH_DDP_REPLICA_COUNT)"
              - -bind-to
              - none
              - -map-by
              - slot
              - -x
              - LD_LIBRARY_PATH
              - -x
              - PATH
              - -mca
              - pml
              - ob1
              - -mca
              - btl
              - ^openib
              - -mca
              - routed
              - direct
              - torchrun
              - "--nproc_per_node"
              - "1"
              - "--master_addr"
              - 0.0.0.0
              - "--master_port"
              - "29500"
              - "/app/torch_mnist.py"
            env:
              - name: PYTORCH_DDP_REPLICA_COUNT
                value: "2" # Must match worker replica count
              - name: PYTORCH_DDP_MASTER_ADDR
                valueFrom:
                  fieldRef:
                    fieldPath: status.podIP
            ports:
            - name: torch
              containerPort: 29500
              protocol: TCP
            resources:
              limits:
                cpu: 1
                memory: 2Gi
            securityContext:
              privileged: true
            volumeMounts:
            - name: ssh-config
              mountPath: /etc/ssh/ssh_config
              subPath: ssh_config
              readOnly: true
          volumes:
          - name: ssh-config
            configMap:
              name: mpi-ssh-config
              items:
                - key: ssh
                  path: ssh_config

    # Worker: The pods that perform the actual calculation
    Worker:
      replicas: 2
      template:
        spec:
          containers:
          - name: mpi-worker
            image: hub.k8s.ucar.edu/khrpcek/nvda-pytorch:23.06
            imagePullPolicy: Always
            command:
              - /usr/sbin/sshd
              - -De
              - -f
              - /root/.sshd_config
            # Request 1 GPU per worker replica
            resources:
              limits:
                nvidia.com/gpu: 8
                cpu: 5
                memory: 16Gi
            securityContext:
              privileged: true
            volumeMounts:
            - name: sshd
              mountPath: /etc/ssh/sshd_config
              subPath: sshd_config
              readOnly: true
          volumes:
          - name: sshd
            configMap:
              name: mpi-sshd-config
              items:
                - key: sshd
                  path: sshd_config
```


### Example 3: Running tensorflow multi node CPU only

This example container imager from mnist internally handles some of the ssh configuration so it has less ssh related config mounts.

```yaml
apiVersion: kubeflow.org/v2beta1
kind: MPIJob
metadata:
  name: tensorflow-mnist
spec:
  slotsPerWorker: 1
  runPolicy:
    cleanPodPolicy: Running
  sshAuthMountPath: /root/.ssh
  mpiReplicaSpecs:
    Launcher:
      replicas: 1
      template:
        spec:
          containers:
          - image: docker.io/kubeflow/mpi-horovod-mnist
            name: mpi-launcher
            command:
            - mpirun
            args:
            - -np
            - "2"
            - --allow-run-as-root
            - -bind-to
            - none
            - -map-by
            - slot
            - -x
            - LD_LIBRARY_PATH
            - -x
            - PATH
            - -mca
            - pml
            - ob1
            - -mca
            - btl
            - ^openib
            - python
            - /examples/tensorflow_mnist.py
            securityContext:
              privileged: true
            resources:
              limits:
                cpu: 1
                memory: 2Gi
    Worker:
      replicas: 2
      template:
        spec:
          containers:
          - image: docker.io/kubeflow/mpi-horovod-mnist
            command:
              - /usr/sbin/sshd
              - -De
            name: mpi-worker
            securityContext:
              privileged: true
            resources:
              limits:
                cpu: 10
                memory: 16Gi
            volumeMounts:
            - name: sshd
              mountPath: /etc/ssh/sshd_config
              subPath: sshd_config
              readOnly: true
          volumes:
          - name: sshd
            configMap:
              name: mpi-sshd-config
              items:
                - key: sshd
                  path: sshd_config
            volumeMounts:
            - name: sshd
              mountPath: /root/.sshd_config
              subPath: .sshd_config
              readOnly: true
          volumes:
          - name: sshd
            configMap:
              name: sshd
              items:
                - key: sshd
                  path: .sshd_config
```

## Running Jobs from Within a Pod

### Why Run from a Pod?

You might want to:
- Submit MPIJobs as part of a CI/CD pipeline
- Create a job submission dashboard
- Run MPIJobs conditionally based on other work

### Step 1: Set Up RBAC (one-time setup)

Create a service account with permissions to create MPIJobs:

```yaml
# rbac.yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: mpijob
  namespace: your-namespace
---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: your-namespace
  name: mpijob-creator
rules:
- apiGroups: ["kubeflow.org"]
  resources: ["mpijobs"]
  verbs: ["create", "get", "list", "watch"]
- apiGroups: [""]
  resources: ["pods", "pods/log"]
  verbs: ["get", "list", "watch"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: mpijob
  namespace: your-namespace
subjects:
- kind: ServiceAccount
  name: mpijob
  namespace: your-namespace
roleRef:
  kind: Role
  name: mpijob-creator
  apiGroup: rbac.authorization.k8s.io
```

Apply it:
```bash
kubectl apply -f rbac.yaml
```

### Step 2: Create a Pod with kubectl

```yaml
# kubectl-pod.yaml
apiVersion: v1
kind: Pod
metadata:
  name: kubectl-pod
  namespace: your-namespace
spec:
  serviceAccountName: mpijob
  containers:
  - name: app-container
    image: docker.io/bitnami/kubectl:latest
    command: ["sleep", "3600"]
```

Apply and exec into it:
```bash
kubectl apply -f kubectl-pod.yaml
kubectl exec -it kubectl-pod -n your-namespace -- /bin/bash
```

### Step 3: Submit Your MPIJob

Once inside the pod, submit your MPIJob as usual:

```bash
kubectl apply -f my-mpijob.yaml
kubectl get mpijob
```

---

## Multi-GPU and Multi-Node Configurations

### Multi-GPU Tips

1. **Request GPUs in resources:**
   ```yaml
   resources:
     limits:
       nvidia.com/gpu: 1  # or 2, 4, 8, etc.
   ```

2. **Set `slotsPerWorker` to match GPU count:**
   ```yaml
   spec:
     slotsPerWorker: 8  # 1 process per GPU
   ```

3. **For PyTorch/DGL frameworks**, use `torchrun` or the framework's launcher with proper environment variables.

4. **Node selection** (optional, if you have dedicated GPU nodes):
   ```yaml
   nodeSelector:
     nvidia.com/gpu: "true"
   ```

### Multi-Node Tips

1. **Use a shared filesystem** (NFS, Ceph, etc.) for large datasets:
   ```yaml
   volumes:
   - name: shared-data
     nfs:
       server: gladedm1.ucar.edu
       path: /gpfs/csfs1
   ```

2. **Set appropriate resource limits** - multi-node jobs need more total resources:
   ```yaml
   resources:
     requests:
       cpu: 10
       memory: 16Gi
     limits:
       cpu: 10
       memory: 24Gi
   ```

3. **Use `--mca routed direct`** for better performance on large clusters (seen in stormspeed example).

---

## Using GitHub Actions with MPIJob

GitHub Actions can submit and manage MPIJobs, making it easy to run CI/CD for HPC workloads.

### Example: Multi-Node CI/CD Workflow

See `actions/multinode.yml` for a complete example. Key elements:

```yaml
name: multinode test

on:
  workflow_dispatch:  # Allow manual triggering

jobs:
  multi-cpu:
    runs-on: gha-runner-actions-test
    container:
      image: docker.io/bitnami/kubectl:latest
    steps:
      # 1. Submit the MPIJob
      - name: Submit mpijob
        run: |
          cat <<EOF | kubectl apply -f -
          apiVersion: kubeflow.org/v2beta1
          kind: MPIJob
          metadata:
            name: my-mpijob
          spec:
            # ... your MPIJob spec here ...
          EOF

      # 2. Wait for completion
      - name: Wait for mpijob to complete
        run: |
          while true; do
            status=$(kubectl get mpijob my-mpijob -o jsonpath='{.status.conditions[?(@.type=="Succeeded")].status}')
            failed=$(kubectl get mpijob my-mpijob -o jsonpath='{.status.conditions[?(@.type=="Failed")].status}')
            if [[ "$status" == "True" ]]; then
              echo "MPIJob succeeded!"
              break
            fi
            if [[ "$failed" == "True" ]]; then
              echo "MPIJob failed!"
              exit 1
            fi
            echo "Waiting for MPIJob to complete..."
            sleep 10
          done

      # 3. Get logs for analysis
      - name: Get logs from mpijob
        run: |
          kubectl logs -l training.kubeflow.org/job-name=my-mpijob -c mpi-launcher --tail=-1

      # 4. Clean up
      - name: Clean up mpijob
        run: |
          kubectl delete mpijob my-mpijob
```

### GitHub Actions Best Practices

1. **Use container images with kubectl pre-installed:**
   ```yaml
   container:
     image: docker.io/bitnami/kubectl:latest
   ```

2. **Set proper RBAC** - the runner needs permissions to:
   - Create/get/list/watch MPIJobs
   - Get pods and logs for monitoring

3. **Add cleanup steps** to avoid leaving orphaned resources:
   ```yaml
   - name: Clean up mpijob
     run: kubectl delete mpijob my-mpijob
   ```

4. **Monitor both success and failure:**
   ```bash
   # Check for both conditions
   status=$(kubectl get mpijob ... -o jsonpath='{.status.conditions[?(@.type=="Succeeded")].status}')
   failed=$(kubectl get mpijob ... -o jsonpath='{.status.conditions[?(@.type=="Failed")].status}')
   ```

5. **Use workflow_dispatch** for manual triggering during development:
   ```yaml
   on:
     workflow_dispatch:
   ```

---

## Troubleshooting

### Common Issues

#### 1. Job Stays in Pending State

**Cause:** Insufficient resources or node affinity issues.

**Check:**
```bash
kubectl describe mpijob my-mpijob
kubectl get nodes
kubectl describe pod <worker-pod-name>
```

**Fix:** Adjust resource requests or add node selectors.

#### 2. Job Fails with SSH Connection Errors

**Cause:** Worker pods not ready or network policies blocking communication.

**Check:**
```bash
kubectl logs <worker-pod-name>
# Look for SSH daemon startup
```

**Fix:** Ensure workers have time to start before launcher runs. Add startup probes if needed.

#### 3. "Command Not Found" or Missing Dependencies

**Cause:** MPI library not installed in the container image.

**Fix:** Use a container image with MPI installed:
- `mpioperator/mpi-pi:openmpi` - Simple MPI test programs
- `mpioperator/mpi-horovod-mnist` - Horovod examples
- Build your own with OpenMPI, Intel MPI, or MVAPICH

#### 4. GPU Job Doesn't Use All GPUs

**Check:**
```bash
# Verify GPU resources
kubectl describe node <node-name> | grep -i nvidia

# Check container logs for GPU allocation
kubectl logs <pod-name>
```

**Fix:** Ensure `slotsPerWorker` matches your GPU count and resource limits are set correctly.

#### 5. Getting Logs from MPIJob

```bash
# List all pods for the job
kubectl get pods -l training.kubeflow.org/job-name=my-mpijob

# Get launcher logs (primary output)
kubectl logs -l training.kubeflow.org/job-name=my-mpijob -c mpi-launcher

# Get specific pod logs
kubectl logs <pod-name> -c mpi-worker
```

### Debug Mode: Keep Pods After Completion

Set `cleanPodPolicy: Running` to keep pods after job completion for inspection:

```yaml
spec:
  runPolicy:
    cleanPodPolicy: Running
```

Then delete manually when done:
```bash
kubectl delete mpijob my-mpijob
```

---

## Additional Resources

- [MPI Operator GitHub](https://github.com/kubeflow/mpi-operator)
- [Kubeflow MPI Operator Docs](https://www.kubeflow.org/docs/components/mpi-operator/)
- [OpenMPI Documentation](https://www.open-mpi.org/doc/)
- [Horovod with MPI](https://github.com/horovod/horovod)

---
