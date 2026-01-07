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

## Next Steps

1. Choose your preferred CI/CD approach
2. Set up OCI resources and permissions
3. Configure environment variables
4. Test the deployment pipeline
5. Set up monitoring and alerts