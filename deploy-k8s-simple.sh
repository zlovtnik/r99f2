#!/bin/bash

# Simple Kubernetes deployment script (skips Docker build/push)

set -e

# Load environment variables
if [ -f ".env" ]; then
    set -a
    source .env
    set +a
fi

echo "Deploying to Kubernetes..."

# Apply manifests
kubectl apply -f k8s-deployment.yaml
kubectl apply -f k8s-service.yaml
kubectl apply -f k8s-ingress.yaml

echo "Deployment complete!"
echo "Check status with: kubectl get pods"
echo "Check service with: kubectl get svc"
echo "Check ingress with: kubectl get ingress"