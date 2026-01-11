# CI/CD Setup for SvelteKit with Oracle Cloud Infrastructure (OCI)

This guide provides multiple approaches to set up CI/CD for your SvelteKit application using Oracle Cloud Infrastructure.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Approach 1: OCI DevOps Build Pipelines](#approach-1-oci-devops-build-pipelines)
3. [Approach 2: Containerized Deployment](#approach-2-containerized-deployment)
4. [Approach 3: GitHub Actions with OCI](#approach-3-github-actions-with-oci)
5. [Environment Variables](#environment-variables)
6. [Manual Deployment](#manual-deployment)

## Prerequisites

Before setting up CI/CD, ensure you have:

1. **OCI Account** with appropriate permissions
2. **OCI CLI** installed and configured
3. **Docker** installed (for containerized approach)
4. **Node.js 20+** installed
5. **Compartment ID** and **Region** from your OCI account

### OCI Resources Needed

- **Container Registry** (OCIR) for storing Docker images
- **Container Instances** or **Functions** for deployment
- **DevOps Project** (for OCI DevOps approach)
- **API Keys** or **Auth Tokens** for authentication

## Approach 1: OCI DevOps Build Pipelines

OCI DevOps provides native CI/CD capabilities with managed build pipelines.

### Setup Steps

1. **Create a DevOps Project**
   - Go to OCI Console → Developer Services → DevOps
   - Create a new project in your compartment

2. **Create Build Pipeline**
   - In your DevOps project, create a new build pipeline
   - Add a "Managed Build" stage
   - Configure the build spec to use `build_spec.yml`

3. **Configure Source Connection**
   - Connect your GitHub repository to OCI DevOps
   - Set up authentication tokens

4. **Add Deployment Stage**
   - Add a deployment stage to deploy to Container Instances
   - Configure environment variables and networking

### Build Spec Configuration

The `build_spec.yml` file defines your build process:
- Installs dependencies
- Runs linting and type checking
- Builds the application
- Creates deployment artifacts

## Approach 2: Containerized Deployment

Deploy your application as a Docker container to OCI Container Instances.

### Setup Steps

1. **Build Docker Image**
   ```bash
   docker build -t your-app .
   ```

2. **Push to OCIR**
   ```bash
   # Login to OCIR
   docker login <region>.ocir.io -u <namespace> -p <auth-token>

   # Tag and push
   docker tag your-app <region>.ocir.io/<namespace>/your-app:latest
   docker push <region>.ocir.io/<namespace>/your-app:latest
   ```

3. **Deploy to Container Instances**
   - Use the provided `deploy-oci.sh` script
   - Or manually create container instances via OCI Console

### Container Configuration

The `Dockerfile` is optimized for:
- Multi-stage builds for smaller images
- Production-ready Node.js runtime
- Health checks for monitoring
- Static file serving with `serve`

## Approach 3: GitHub Actions with OCI

Use GitHub Actions for CI/CD with OCI integration.

### Setup Steps

1. **Configure GitHub Secrets**
   - `OCI_CLI_CONFIG`: OCI CLI configuration
   - `OCI_CLI_KEY`: Private key for authentication
   - `OCI_REGION`: Your OCI region
   - `OCI_COMPARTMENT_ID`: Compartment OCID
   - `OCI_FUNCTION_APP`: Function app name (if using Functions)

2. **GitHub Actions Workflow**
   - The GitHub workflow file (`.github/workflows/oci-cicd.yml`) provides:
     - Automated testing on PRs
     - Build validation
     - Deployment to OCI on main branch merges

## Environment Variables

Configure these environment variables for your deployment:

### Required
- `OCI_REGION`: Your OCI region (e.g., `us-ashburn-1`)
- `COMPARTMENT_ID`: OCI compartment OCID
- `NAMESPACE`: OCIR namespace
- `OCI_AUTH_TOKEN`: Authentication token for OCIR

### Optional
- `REPO_NAME`: Docker repository name (default: `sveltekit-app`)
- `IMAGE_TAG`: Docker image tag (default: `latest`)

## Manual Deployment

For manual deployments, use the provided script:

```bash
# Set environment variables
export OCI_REGION="us-ashburn-1"
export COMPARTMENT_ID="ocid1.compartment..."
export NAMESPACE="your-namespace"
export OCI_AUTH_TOKEN="your-auth-token"

# Run deployment
./deploy-oci.sh
```

## Monitoring and Logging

### Health Checks
- Container health checks are configured in the Dockerfile
- Monitor via OCI Console → Container Instances

### Logs
- Application logs available in Container Instances
- Build logs available in DevOps pipelines

## Security Best Practices

1. **Use OCI Vault** for secrets management
2. **Enable WAF** for web applications
3. **Configure proper IAM policies**
4. **Use private subnets** for container instances
5. **Regular security updates** for base images

## Cost Optimization

1. **Use appropriate shapes** for container instances
2. **Configure auto-scaling** based on traffic
3. **Clean up unused resources** regularly
4. **Use spot instances** for non-critical workloads

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version compatibility
   - Verify dependencies in package.json
   - Check build logs for specific errors

2. **Deployment Failures**
   - Verify OCI credentials and permissions
   - Check compartment and region settings
   - Ensure networking configuration is correct

3. **Container Issues**
   - Check health status in OCI Console
   - Review container logs
   - Verify environment variables

### Getting Help

- OCI Documentation: https://docs.oracle.com/en-us/iaas/Content/home.htm
- SvelteKit Documentation: https://kit.svelte.dev/
- Community Forums: Oracle Cloud Community, Svelte Discord

## Approach 4: Kubernetes Deployment (OKE)

Deploy your SvelteKit application to Oracle Kubernetes Engine (OKE) for scalable, containerized deployments.

### Prerequisites

- **OKE Cluster** created in OCI
- **kubectl** installed and configured
- **OCI CLI** 2.24.0+ installed
- **Docker** installed

### Setup Steps

1. **Set up kubectl access to your OKE cluster**
   ```bash
   # Use the provided setup script (recommended)
   ./setup-kubectl.sh <cluster-id> <region> [endpoint-type]

   # Example:
   ./setup-kubectl.sh ocid1.cluster.oc1.us-chicago-1.aaaaaaaagfp3m2azgas5imu4tanitysypbodhaso6kw5br5w2ci3mkr7ap4a us-chicago-1 PUBLIC_ENDPOINT

   # To find your cluster ID, run:
   oci ce cluster list --compartment-id <your-compartment-id>
   ```

   **Manual setup (alternative):**
   ```bash
   # Verify OCI CLI version (must be 2.24.0+)
   oci -v

   # Create kubeconfig directory
   mkdir -p $HOME/.kube

   # Generate kubeconfig (replace with your cluster OCID and region)
   oci ce cluster create-kubeconfig \
     --cluster-id ocid1.cluster.oc1.us-chicago-1.aaaaaaaagfp3m2azgas5imu4tanitysypbodhaso6kw5br5w2ci3mkr7ap4a \
     --file $HOME/.kube/config \
     --region us-chicago-1 \
     --token-version 2.0.0 \
     --kube-endpoint PUBLIC_ENDPOINT

   # Set KUBECONFIG environment variable
   export KUBECONFIG=$HOME/.kube/config
   ```

2. **Configure environment variables**
   ```bash
   # Copy the example environment file
   cp .env.example .env

   # Edit the .env file with your actual values
   # Required variables:
   # - OCI_REGION: Your OCI region (e.g., us-chicago-1)
   # - OCI_USER: Your OCI user OCID
   # - OCI_AUTH_TOKEN: Your OCI auth token
   # - NAMESPACE: Your OCIR namespace
   # - CLUSTER_ID: Your OKE cluster OCID
   # - VITE_SITE_URL: Your domain URL
   # - VITE_BUSINESS_EMAIL: Contact email
   # - VITE_BUSINESS_PHONE: Contact phone
   # - VITE_GA_MEASUREMENT_ID: Google Analytics ID
   ```

   **Or set environment variables manually:**
   ```bash
   export OCI_REGION="us-chicago-1"
   export NAMESPACE="your-namespace"
   export CLUSTER_ID="your-cluster-ocid"
   export REPO_NAME="lbsunrise-roofing"
   export IMAGE_TAG="latest"
   export VITE_SITE_URL="https://your-domain.com"
   export VITE_BUSINESS_EMAIL="contact@lbsunrise.com"
   export VITE_BUSINESS_PHONE="(978) 519-9774"
   export VITE_GA_MEASUREMENT_ID="your-ga-id"
   export OCI_USER="your-oci-user"
   export OCI_AUTH_TOKEN="your-auth-token"
   ```

3. **Update Kubernetes manifests**
   - Edit `k8s-deployment.yaml` with your image URL
   - Update `k8s-ingress.yaml` with your domain
   - Configure environment variables in the deployment

4. **Deploy to Kubernetes**
   ```bash
   # Using the deployment script
   make deploy-k8s

   # Or manually
   ./deploy-k8s.sh
   ```

### Kubernetes Manifests

The project includes the following Kubernetes manifests:
- `k8s-deployment.yaml`: Application deployment with 2 replicas
- `k8s-service.yaml`: Service to expose the application
- `k8s-ingress.yaml`: Ingress for external access (configure with your domain)

### Monitoring and Scaling

- Check pod status: `kubectl get pods`
- View logs: `kubectl logs -l app=lbsunrise-roofing`
- Scale deployment: `kubectl scale deployment lbsunrise-roofing --replicas=3`

## Next Steps

1. Choose your preferred CI/CD approach
2. Set up OCI resources and permissions
3. Configure environment variables
4. Test the deployment pipeline
5. Set up monitoring and alerts