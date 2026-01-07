#!/bin/bash

# Script to set up kubectl access to Oracle Kubernetes Engine (OKE)
# This script helps configure kubectl to access your OKE cluster

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

# Check prerequisites
check_prerequisites() {
    log_info "Checking prerequisites..."

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

    log_info "Prerequisites check completed."
}

# Setup kubeconfig
setup_kubeconfig() {
    local cluster_id="$1"
    local region="$2"
    local endpoint_type="${3:-PUBLIC_ENDPOINT}"

    if [ -z "$cluster_id" ]; then
        log_error "Cluster ID is required. Usage: $0 <cluster-id> <region> [endpoint-type]"
        log_info "Find your cluster ID with: oci ce cluster list --compartment-id <compartment-id>"
        exit 1
    fi

    if [ -z "$region" ]; then
        log_error "Region is required. Usage: $0 <cluster-id> <region> [endpoint-type]"
        exit 1
    fi

    log_info "Setting up kubeconfig for cluster: $cluster_id"

    # Create kubeconfig directory
    mkdir -p $HOME/.kube

    # Generate kubeconfig
    oci ce cluster create-kubeconfig \
        --cluster-id "$cluster_id" \
        --file $HOME/.kube/config \
        --region "$region" \
        --token-version 2.0.0 \
        --kube-endpoint "$endpoint_type"

    # Set KUBECONFIG environment variable
    export KUBECONFIG=$HOME/.kube/config

    # Add to shell profile for persistence
    if [[ "$SHELL" == *"zsh"* ]]; then
        echo "export KUBECONFIG=$HOME/.kube/config" >> ~/.zshrc
        log_info "Added KUBECONFIG to ~/.zshrc"
    elif [[ "$SHELL" == *"bash"* ]]; then
        echo "export KUBECONFIG=$HOME/.kube/config" >> ~/.bashrc
        log_info "Added KUBECONFIG to ~/.bashrc"
    fi

    log_info "Kubeconfig setup completed!"
    log_info "You can now use kubectl to manage your cluster."
    log_info "Test with: kubectl get nodes"
}

# Main function
main() {
    log_info "Oracle Kubernetes Engine (OKE) kubectl Setup"
    echo

    check_prerequisites

    if [ $# -eq 0 ]; then
        log_info "Usage: $0 <cluster-id> <region> [endpoint-type]"
        log_info "Example: $0 ocid1.cluster.oc1.us-chicago-1.aaaaaaaagfp3m2azgas5imu4tanitysypbodhaso6kw5br5w2ci3mkr7ap4a us-chicago-1 PUBLIC_ENDPOINT"
        log_info ""
        log_info "To find your cluster ID, run:"
        log_info "oci ce cluster list --compartment-id <your-compartment-id>"
        exit 1
    fi

    setup_kubeconfig "$@"
}

# Run main function
main "$@"