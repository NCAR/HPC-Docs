# Custom Alerting

CIRRUS provides monitoring and alerting capabilities through **Prometheus** and **Alertmanager**. This can be utilized to create custom alerts tailored to your application's specific needs.

Custom alerts allow you to monitor application specific metrics and receive notifications through various channels when certain conditions are met.

---

## Prerequisites

Before configuring custom alerts, ensure:

- Your application is exporting prometheus metrics 
- Your application is already deployed and syncing with Argo CD
- You have a Helm chart repository configured for your application
- Your application namespace is set up in the CIRRUS cluster

!!! note
    If you need assistance with initial application setup, see [Adding Applications](../03-adding-applications/index.md).

---

## Collecting Application Metrics

By default, Prometheus collects basic container metrics (CPU, memory, network). To monitor application specific metrics, you need to:

1. **Export metrics** from your application (typically on a `/metrics` endpoint)
2. **Configure a PodMonitor** or ServiceMonitor to tell Prometheus where to scrape metrics

!!! note
    Many popular official images include a prometheus exporter by default. Make sure this is enabled in your applications configuration. 

### Monitor Examples


!!! note
    Your application must expose a metrics endpoint that returns data in Prometheus format. Popular libraries include:
    
    - **Python**: `prometheus_client`
    - **Node.js**: `prom-client`
    - **Java**: Micrometer or Prometheus JVM Client
    - **Go**: `prometheus/client_golang`

### Updating Your Service Definition

Ensure your `service.yaml` includes a port for metrics:

{% raw %}
```yaml
apiVersion: v1
kind: Service
metadata:
  name: {{ .Values.appName }}
  namespace: {{ .Values.namespace }}
spec:
  selector:
    app: {{ .Values.appName }}
  ports:
    - name: http
      port: 80
      targetPort: {{ .Values.containerPort }}
    - name: metrics        # Metrics port
      port: 9090
      targetPort: 9090
```
{% endraw %}

---

## Custom Alert Configuration

To set up custom alerts, you'll need to add two Kubernetes manifests to your Helm chart:

1. **AlertmanagerConfig** - Defines where and how alerts are sent (email, Slack, etc.)
2. **PrometheusRule** - Defines the conditions that trigger alerts

### Helm Chart Structure

Add these files to your existing Helm chart's `templates/` directory:

```
k8s/
├── Chart.yaml
├── values.yaml
└── templates/
    ├── deployment.yaml
    ├── ingress.yaml
    ├── service.yaml
    ├── alertmanager-config.yaml    # New
    └── prometheus-rule.yaml         # New
```

---

## AlertmanagerConfig

The `AlertmanagerConfig` determines how alerts are routed and which notification channels (receivers) are used.

### Email Notification Example

See [CIRRUS Alerts Examples Repository](https://github.com/NCAR/cirrus-examples/tree/main/helm/alerts-helm) for templates to copy and a README explaining how to customize these to your needs.

### Alternative Receivers

Alertmanager supports multiple notification channels beyond email. For complete configuration options, see the [Prometheus Alerting documentation](https://prometheus.io/docs/alerting/latest/configuration/).

Popular receiver types include:

- **Slack** - Send alerts to Slack channels
- **PagerDuty** - Integrate with on-call scheduling
- **Webhook** - Send alerts to custom HTTP endpoints
- **OpsGenie** - Route to incident management platforms
- **Microsoft Teams** - Post to Teams channels

!!! example "Slack Receiver Example"
{% raw %}
    ```yaml
    receivers:
      - name: {{ .Values.appName }}-slack
        slackConfigs:
          - apiURL: {{ .Values.alerting.slackWebhook }}
            channel: '#alerts'
            title: 'Alert: {{ .Values.appName }}'
            text: '{{ "{{ range .Alerts }}{{ .Annotations.summary }}{{ end }}" }}'
    ```
{% endraw %}
---

## PrometheusRule

The `PrometheusRule` defines the actual alert conditions - what metrics to monitor and when to trigger alerts.

### Basic Alert Example

See [CIRRUS Alerts Examples Repository](https://github.com/NCAR/cirrus-examples/tree/main/helm/alerts-helm) for templates to copy and a README explaining how to customize these to your needs.

## Updating values.yaml

Add the necessary values to your `values.yaml`:

```yaml
appName: my-application
namespace: my-namespace

alerting:
  email: team@ucar.edu
  # slackWebhook: https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

---

## Deploying Custom Alerts

Once you've added the alert configuration files to your Helm chart:

1. **Commit and push** the changes to your Git repository
2. **Argo CD will automatically sync** the changes to your application
3. **Verify the configuration** by checking Argo CD for any sync errors

!!! tip
    You can request read-only access to Argo CD to monitor your deployments. See [Argo CD Access](../03-adding-applications/index.md#argo-cd-access).

---

## Testing Alerts

!!! important
    CIRRUS does not expose Alertmanager directly to users. You cannot view Alertmanager logs or use the Alertmanager UI. This makes proper testing during initial setup crucial.

### Recommended Testing Approach

When setting up alerts for the first time, create an **always-firing test alert** to verify your notification pipeline is working correctly.

Add this temporary rule to your `prometheus-rule.yaml`:

{% raw %}
```yaml
- alert: TestAlert
  expr: vector(1)
  labels:
    severity: info
    namespace: {{ .Values.namespace }}
  annotations:
    summary: "Test alert - always firing"
    description: "This is a test alert to verify notification delivery. Remove this rule once confirmed working."
```
{% endraw %}

**Testing workflow:**

1. **Add the test alert** with `expr: vector(1)` (always true)
2. **Deploy the changes** via Argo CD sync
3. **Wait for notification** - You should receive an alert immediately
4. **Verify notification content** - Check that formatting and routing are correct
5. **Remove the test alert** once confirmed working
6. **Deploy again** to remove the test alert from your configuration

!!! tip
    The `vector(1)` expression always evaluates to true, ensuring the alert fires immediately. This is the most reliable way to test your alert delivery without having to trigger actual error conditions.

## Troubleshooting

### Alerts Not Firing

- Verify the PromQL expression is correct using Prometheus query interface
- Check that metrics are being collected (PodMonitor/ServiceMonitor configured correctly)
- Ensure the `for` duration has elapsed
- Confirm namespace matchers align with your application's namespace

### Notifications Not Received

- Verify the AlertmanagerConfig matchers correctly select your alerts
- Check receiver configuration (email addresses, webhook URLs, etc.)
- Confirm the `repeatInterval` hasn't suppressed duplicate notifications
- For email: verify the SMTP server is accessible from the cluster

### Metrics Not Available

- Confirm your application is exposing metrics on the configured port and path
- Check PodMonitor/ServiceMonitor selector labels match your pod labels
- Verify the metrics port is defined in your Service manifest
- Look for errors in Prometheus logs (contact CIRRUS admin if needed)

---

## Additional Resources

- [Prometheus Alerting Documentation](https://prometheus.io/docs/alerting/latest/configuration/)
- [Prometheus Query Language (PromQL)](https://prometheus.io/docs/prometheus/latest/querying/basics/)
- [Alertmanager Configuration](https://prometheus.io/docs/alerting/latest/configuration/)
- [CIRRUS Examples Repository](https://github.com/NCAR/cirrus-examples)

For assistance with custom alerting configuration, [submit a ticket](../02-interact-with-cirrus-team/create-tickets.md).