#!/bin/bash

# OCI Deployment Script for SvelteKit Application
# This script handles building and deploying the application to Oracle Cloud Infrastructure

set -e

# Configuration - All variables must be set via environment variables
OCI_REGION="${OCI_REGION}"
COMPARTMENT_ID="${COMPARTMENT_ID}"
NAMESPACE="${NAMESPACE}"
REPO_NAME="${REPO_NAME}"
IMAGE_TAG="${IMAGE_TAG}"

# Environment variables for the application
VITE_SITE_URL="${VITE_SITE_URL}"
VITE_BUSINESS_EMAIL="${VITE_BUSINESS_EMAIL}"
VITE_BUSINESS_PHONE="${VITE_BUSINESS_PHONE}"
VITE_GA_MEASUREMENT_ID="${VITE_GA_MEASUREMENT_ID}"

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

    if ! command -v npm &> /dev/null; then
        log_error "npm is not installed. Please install Node.js first."
        exit 1
    fi

    # Validate required environment variables
    if [ -z "$OCI_REGION" ]; then
        log_error "OCI_REGION environment variable is not set. Please set it to your OCI region."
        exit 1
    fi

    if [ -z "$COMPARTMENT_ID" ]; then
        log_error "COMPARTMENT_ID environment variable is not set. Please set it to your OCI compartment ID."
        exit 1
    fi

    if [ -z "$OCI_AUTH_TOKEN" ]; then
        log_error "OCI_AUTH_TOKEN environment variable is not set. Please set it to your OCI auth token."
        exit 1
    fi

    if [ -z "$NAMESPACE" ]; then
        log_error "NAMESPACE environment variable is not set. Please set it to your OCI namespace."
        exit 1
    fi

    if [ -z "$REPO_NAME" ]; then
        log_error "REPO_NAME environment variable is not set. Please set it to your OCI repository name."
        exit 1
    fi

    if [ -z "$IMAGE_TAG" ]; then
        log_error "IMAGE_TAG environment variable is not set. Please set it to your desired image tag."
        exit 1
    fi

    if [ -z "$AVAILABILITY_DOMAIN" ]; then
        log_error "AVAILABILITY_DOMAIN environment variable is not set. Please set it to your OCI availability domain OCID."
        exit 1
    fi

    if [ -z "$SUBNET_ID" ]; then
        log_error "SUBNET_ID environment variable is not set. Please set it to your OCI subnet OCID."
        exit 1
    fi

    if [ -z "$VITE_SITE_URL" ]; then
        log_error "VITE_SITE_URL environment variable is not set. Please set it to your production site URL."
        exit 1
    fi

    if [ -z "$VITE_BUSINESS_EMAIL" ]; then
        log_error "VITE_BUSINESS_EMAIL environment variable is not set. Please set it to your business email."
        exit 1
    fi

    if [ -z "$VITE_BUSINESS_PHONE" ]; then
        log_error "VITE_BUSINESS_PHONE environment variable is not set. Please set it to your business phone."
        exit 1
    fi

    log_info "Prerequisites check passed."
}

# Build the application
build_app() {
    log_info "Building SvelteKit application..."

    # Install dependencies
    npm ci

    # Run checks
    npm run check

    # Build the application
    npm run build

    log_info "Application build completed."
}

# Build Docker image
build_docker_image() {
    log_info "Building Docker image..."

    local image_name="${NAMESPACE}/${REPO_NAME}:${IMAGE_TAG}"

    docker build -t "$image_name" .

    log_info "Docker image built: $image_name"
}

# Push Docker image to OCIR
push_to_ocir() {
    log_info "Pushing image to Oracle Cloud Infrastructure Registry (OCIR)..."

    local image_name="${NAMESPACE}/${REPO_NAME}:${IMAGE_TAG}"
    local oci_registry="${OCI_REGION}.ocir.io"

    # Login to OCIR
    # Login to OCIR (using stdin to avoid exposing token in process list)
    echo "$OCI_AUTH_TOKEN" | docker login "$oci_registry" -u "$NAMESPACE" --password-stdin

    # Tag and push
    docker tag "$image_name" "${oci_registry}/${NAMESPACE}/${REPO_NAME}:${IMAGE_TAG}"
    docker push "${oci_registry}/${NAMESPACE}/${REPO_NAME}:${IMAGE_TAG}"

    log_info "Image pushed to OCIR: ${oci_registry}/${NAMESPACE}/${REPO_NAME}:${IMAGE_TAG}"
}

# Deploy to OCI Container Instances
deploy_to_oci() {
    log_info "Deploying to Oracle Cloud Infrastructure..."

    local oci_registry="${OCI_REGION}.ocir.io"
    local image_url="${oci_registry}/${NAMESPACE}/${REPO_NAME}:${IMAGE_TAG}"
    local instance_name="sveltekit-app-instance"

    # Delete existing container instance to avoid accumulating duplicates
    log_info "Checking for existing container instance..."
    local existing_instance_id
    existing_instance_id=$(oci container-instances container-instance list \
        --compartment-id "$COMPARTMENT_ID" \
        --display-name "$instance_name" \
        --lifecycle-state ACTIVE \
        --query 'data[0].id' \
        --raw-output 2>/dev/null || true)

    if [ -n "$existing_instance_id" ] && [ "$existing_instance_id" != "null" ]; then
        log_info "Deleting existing instance: $existing_instance_id"
        oci container-instances container-instance delete \
            --container-instance-id "$existing_instance_id" \
            --force
        # Wait for deletion to complete
        log_info "Waiting for instance deletion..."
        sleep 30
    else
        log_info "No existing instance found, proceeding with creation"
    fi

    # Create new container instance
    log_info "Creating new container instance..."
    oci container-instances container-instance create \
        --compartment-id "$COMPARTMENT_ID" \
        --display-name "$instance_name" \
        --availability-domain "$AVAILABILITY_DOMAIN" \
        --shape "CI.Standard.E4.Flex" \
        --shape-config '{"ocpus": 1, "memoryInGBs": 8}' \
        --containers '[{"displayName": "sveltekit-container", "imageUrl": "'"$image_url"'", "environmentVariables": {"NODE_ENV": "production", "VITE_SITE_URL": "'"$VITE_SITE_URL"'", "VITE_BUSINESS_EMAIL": "'"$VITE_BUSINESS_EMAIL"'", "VITE_BUSINESS_PHONE": "'"$VITE_BUSINESS_PHONE"'", "VITE_GA_MEASUREMENT_ID": "'"$VITE_GA_MEASUREMENT_ID"'"}}]' \
        --vnics '[{"subnetId": "'"$SUBNET_ID"'"}]'

    log_info "Deployment initiated. Check OCI console for status."
}

# Main deployment function
main() {
    log_info "Starting OCI deployment for SvelteKit application..."

    check_prerequisites
    build_app
    build_docker_image
    push_to_ocir
    deploy_to_oci

    log_info "Deployment completed successfully!"
    log_info "Your application should be available at the OCI Container Instance endpoint."
}

# Run main function
main "$@"