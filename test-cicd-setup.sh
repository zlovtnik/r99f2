#!/bin/bash

# Test script for SvelteKit OCI CI/CD setup
# This script validates the build and deployment configuration

set -e

echo "🧪 Testing SvelteKit OCI CI/CD Setup"
echo "==================================="

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Test 1: Check Node.js version
echo "Testing Node.js version..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "Node.js version: $NODE_VERSION"
    NODE_VERSION_NUM=$(echo "$NODE_VERSION" | sed 's/v//' | cut -d. -f1)
    if [ "$NODE_VERSION_NUM" -ge 20 ]; then
        log_success "Node.js version is compatible"
    else
        log_warning "Node.js version might not be optimal (recommended: 20+)"
    fi
else
    log_error "Node.js is not installed"
fi

# Test 2: Check npm
echo "Testing npm..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo "npm version: $NPM_VERSION"
    log_success "npm is available"
else
    log_error "npm is not installed"
fi

# Test 3: Check Docker
echo "Testing Docker..."
if command -v docker &> /dev/null; then
    DOCKER_VERSION=$(docker --version)
    echo "Docker version: $DOCKER_VERSION"
    log_success "Docker is available"
else
    log_error "Docker is not installed (required for containerized deployment)"
fi

# Test 4: Check OCI CLI
echo "Testing OCI CLI..."
if command -v oci &> /dev/null; then
    OCI_VERSION=$(oci --version)
    echo "OCI CLI version: $OCI_VERSION"
    log_success "OCI CLI is available"
else
    log_error "OCI CLI is not installed (required for OCI deployment)"
fi

# Test 5: Validate package.json
echo "Validating package.json..."
if [ -f "package.json" ]; then
    if grep -q '"build"' package.json; then
        log_success "Build script found in package.json"
    else
        log_error "Build script not found in package.json"
    fi
else
    log_error "package.json not found"
fi

# Test 6: Check required files
echo "Checking required files..."
REQUIRED_FILES=("Dockerfile" "build_spec.yml" "deploy-oci.sh" "OCI_CICD_README.md")
for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        log_success "$file exists"
    else
        log_error "$file missing"
    fi
done

# Test 7: Test build process
echo "Testing build process..."
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    if ! npm ci; then
        log_error "Failed to install dependencies"
        exit 1
    fi
fi
if build_output=$(npm run build 2>&1); then
    log_success "Build process completed successfully"
    # Check for adapter-node output (build/) or legacy output (.svelte-kit/output)
    if [ -d "build" ]; then
        log_success "Build output directory created (build/)"
    elif [ -d ".svelte-kit/output" ]; then
        log_success "Build output directory created (.svelte-kit/output)"
    else
        log_error "Build output directory not found (expected build/ or .svelte-kit/output)"
    fi
else
    log_error "Build process failed"
    echo "Build output:"
    echo "$build_output"
fi

# Test 8: Test Docker build (if Docker available and daemon running)
if command -v docker &> /dev/null; then
    echo "Testing Docker build..."
    if docker info &> /dev/null; then
        # Capture both stdout and stderr from docker build
        if build_output=$(docker build -t sveltekit-test . 2>&1); then
            log_success "Docker build completed successfully"
            # Clean up test image
            docker rmi sveltekit-test 2>/dev/null || true
        else
            log_error "Docker build failed - check Dockerfile configuration"
            echo "Build output:"
            echo "$build_output"
        fi
    else
        log_warning "Docker daemon is not running - skip Docker build test"
    fi
else
    log_warning "Docker not available - skip Docker build test"
fi

echo ""
echo "🎯 CI/CD Setup Test Complete"
echo "============================"
echo "Review the results above and fix any issues before deploying."
echo "Refer to OCI_CICD_README.md for detailed setup instructions."