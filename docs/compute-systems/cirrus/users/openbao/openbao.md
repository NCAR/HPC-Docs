# Secret Manager

CIRRUS hosts a secrets manager called OpenBao that is available to UCAR employees via a WebUI. 

## Adding a secret to NCAR OpenBao

- Navigate to https://bao.k8s.ucar.edu, change the authentication method to OIDC, and log in with your UCAR username/password
- You will be brought to a screen that resembles this

![Bao Home Screen](../../media/bao1.png "Bao Home Screen")

- Choose `kv` (key/value)
- In the upper right choose the `Create Secret` button
- Path for secret: `<your ucar email address>/<new secret>`
- You can store multiple key/value pairs under each secret. 
- Set the key to be a short description of the secret that will be used to reference it and set the value to the actual secret

![Bao Secret Screen](../../media/bao2.png "Bao Secret Screen")

- Save the secret

## Updating an existing OpenBao secret

You may need to update your secret in order to follow best practices when managing sensitive information and keeping up with rotating them accordingly.

- Login to OpenBao as defined above
- Once in the `kv` screen list your secrets by entering `<email_address>/` in the view secret box
- You should see a list of your secrets
- Edit the secret and add a new key/value token as defined above

## Using Secrets in CIRRUS Applications

In order to use secrets from OpenBao as environment variables in CIRRUS applications a [SecretStore](https://external-secrets.io/latest/api/secretstore/) object needs to be added to Kubernetes by the CIRRUS admin team. A SecretStore specifies how and what secrets an application can access. An [ExternalSecret](https://external-secrets.io/latest/api/externalsecret/) that defines what secrets to use can then be added to your applications Helm chart. The ExternalSecrets can then be referenced directly with the `valueFrom:` field in a Deployment. When requesting an application, see [Adding Applications](../hosting/additions.md), that requires secrets stored in OpenBao please include that information in your request. If you want to add secrets to an existing application, see [Create Tickets](../create-tickets.md)

### External Secret Example

The example below will use the openbao-backend SecretStore in the Release Namespace to connect to OpenBao. Once connected, it will go in to the remoteRef key, ncote/cirrus-secrets, and get the value assigned to the property my-secret-key. This secret is fully encrypted and is injected in to a running container. 

```
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
    name: myapp-esos
    namespace: {{ .Release.Namespace }}
spec:
    refreshInterval: 1h
    secretStoreRef:
        name: openbao-backend
        kind: SecretStore
    target:
        name: myapp-esos
    data:
        - secretKey: my-secret-value
          remoteRef:
            key: ncote@ucar.edu/cirrus-secrets
            property: my-secret-key
```

For an example Helm chart that uses ExternalSecrets, see [external-secret-helm](https://github.com/NCAR/cirrus-helm-examples/tree/main/external-secret-helm).