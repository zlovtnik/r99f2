#!/bin/bash

# Kubernetes Deployment Script for SvelteKit Application
# This script handles building and deploying the application to Oracle Kubernetes Engine (OKE)

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Load environment variables from .env file if it exists
if [ -f ".env" ]; then
    log_info "Loading environment variables from .env file..."
    set -a
    source .env
    set +a
fi

# Configuration - All variables must be set via environment variables

# Check prerequisites
check_prerequisites() {
    log_info "Checking prerequisites..."

    if ! command -v docker &> /dev/null; then
        log_error "Docker is not installed. Please install Docker first."
        exit 1
    fi

    if ! command -v oci &> /dev/null; then
        log_error "OCI CLI is not installed. Please install OCI CLI first."
        exit 1
    fi

    if ! command -v kubectl &> /dev/null; then
        log_error "kubectl is not installed. Please install kubectl first."
        exit 1
    fi

    # Check OCI CLI version
    local oci_version=$(oci -v | cut -d' ' -f3)
    if [[ "$(printf '%s\n' "$oci_version" "2.24.0" | sort -V | head -n1)" != "2.24.0" ]]; then
        log_error "OCI CLI version must be 2.24.0 or later. Current version: $oci_version"
        exit 1
    fi

    if [ -z "$OCI_REGION" ]; then
        log_error "OCI_REGION environment variable is not set."
        exit 1
    fi

    if [ -z "$NAMESPACE" ]; then
        log_error "NAMESPACE environment variable is not set."
        exit 1
    fi

    if [ -z "$REPO_NAME" ]; then
        log_error "REPO_NAME environment variable is not set."
        exit 1
    fi

    if [ -z "$VITE_SITE_URL" ]; then
        log_error "VITE_SITE_URL environment variable is not set."
        exit 1
    fi

    if [ -z "$VITE_BUSINESS_EMAIL" ]; then
        log_error "VITE_BUSINESS_EMAIL environment variable is not set."
        exit 1
    fi

    if [ -z "$VITE_BUSINESS_PHONE" ]; then
        log_error "VITE_BUSINESS_PHONE environment variable is not set."
        exit 1
    fi

    log_info "Prerequisites check completed."
}

# Build Docker image
build_image() {
    log_info "Building Docker image..."

    local image_url="${OCI_REGION}.ocir.io/${NAMESPACE}/${REPO_NAME}:${IMAGE_TAG}"

    docker build -t "$image_url" .

    log_info "Docker image built successfully: $image_url"
    echo "$image_url"
}

# Push Docker image to OCIR
push_image() {
    local image_url="$1"

    log_info "Pushing Docker image to OCIR..."

    # Login to OCIR using namespace as username (standard for auth tokens)
    echo "$OCI_AUTH_TOKEN" | docker login "${OCI_REGION}.ocir.io" -u "$NAMESPACE" --password-stdin

    docker push "$image_url"

    log_info "Docker image pushed successfully."
}

# Update Kubernetes manifests
update_manifests() {
    local image_url="$1"

    log_info "Updating Kubernetes manifests..."

    # Update deployment.yaml with the actual image URL
    sed -i.bak "s|PLACEHOLDER_IMAGE_URL|$image_url|g" k8s-deployment.yaml

    # Update environment variables in deployment
    sed -i.bak "s|https://your-domain.com|$VITE_SITE_URL|g" k8s-deployment.yaml
    sed -i.bak "s|contact@lrsunrise.com|$VITE_BUSINESS_EMAIL|g" k8s-deployment.yaml
    sed -i.bak "s|(978) 519-9774|$VITE_BUSINESS_PHONE|g" k8s-deployment.yaml

    if [ -n "$VITE_GA_MEASUREMENT_ID" ]; then
        sed -i.bak "s|VITE_GA_MEASUREMENT_ID.*|VITE_GA_MEASUREMENT_ID: \"$VITE_GA_MEASUREMENT_ID\"|g" k8s-deployment.yaml
    fi

    log_info "Kubernetes manifests updated."
}

# Deploy to Kubernetes
deploy_to_k8s() {
    log_info "Deploying to Kubernetes..."

    # Apply Kubernetes manifests
    kubectl apply -f k8s-deployment.yaml
    kubectl apply -f k8s-service.yaml
    kubectl apply -f k8s-ingress.yaml

    # Wait for rollout to complete
    kubectl rollout status deployment/lbsunrise-roofing

    log_info "Deployment completed successfully!"
    log_info "You can check the status with: kubectl get pods"
    log_info "View logs with: kubectl logs -l app=lbsunrise-roofing"
}

# Main deployment function
main() {
    log_info "Starting Kubernetes deployment..."

    check_prerequisites

    local image_url=$(build_image)
    push_image "$image_url"
    update_manifests "$image_url"
    deploy_to_k8s

    log_info "Deployment completed successfully!"
}

# Run main function
main "$@"