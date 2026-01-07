# Makefile for SvelteKit OCI Deployment Project

.PHONY: help install dev build preview check clean test lint deploy deploy-local docker-build docker-push oci-deploy deploy-oci-ready deploy-k8s k8s-deploy all

# Default target
all: build

# Help target
help:
	@echo "Available targets:"
	@echo "  install       - Install dependencies"
	@echo "  dev           - Start development server"
	@echo "  build         - Build for production"
	@echo "  preview       - Preview production build"
	@echo "  check         - Run type checking and linting"
	@echo "  clean         - Clean build artifacts"
	@echo "  test          - Run tests (if available)"
	@echo "  lint          - Run linting (if available)"
	@echo "  setup-kubectl - Set up kubectl access to OKE cluster"
	@echo "  deploy        - Deploy to OCI Container Instances (requires env vars)"
	@echo "  deploy-local  - Deploy locally using OCI CLI"
	@echo "  docker-build  - Build Docker image"
	@echo "  docker-push   - Push Docker image to OCIR"
	@echo "  oci-deploy    - Show OCI deployment command with variables"
	@echo "  deploy-k8s    - Deploy to Oracle Kubernetes Engine (OKE)"
	@echo "  k8s-deploy    - Alias for deploy-k8s"

# Install dependencies
install:
	npm ci

# Start development server
dev:
	npm run dev

# Build for production
build:
	npm run build

# Preview production build
preview:
	npm run preview

# Run type checking and linting
check:
	npm run check

# Clean build artifacts
clean:
	rm -rf build .svelte-kit node_modules/.vite

# Run tests (if test script exists)
test:
	@if npm run | grep -q "  test$$"; then \
		npm run test; \
	else \
		echo "No test script defined"; \
	fi

# Run linting (if lint script exists)
lint:
	@if npm run | grep -q "  lint$$"; then \
		npm run lint; \
	else \
		echo "No lint script defined"; \
	fi

# Set up kubectl access to OKE cluster
setup-kubectl:
	@echo "Setting up kubectl access to OKE cluster..."
	@echo "Usage: make setup-kubectl CLUSTER_ID=<cluster-ocid> REGION=<region>"
	@echo "Example: make setup-kubectl CLUSTER_ID=ocid1.cluster.oc1.us-chicago-1.aaaaaaaagfp3m2azgas5imu4tanitysypbodhaso6kw5br5w2ci3mkr7ap4a REGION=us-chicago-1"
	@if [ -z "$(CLUSTER_ID)" ]; then \
		echo "Error: CLUSTER_ID is required"; \
		exit 1; \
	fi
	@if [ -z "$(REGION)" ]; then \
		echo "Error: REGION is required"; \
		exit 1; \
	fi
	./setup-kubectl.sh $(CLUSTER_ID) $(REGION)

# Deploy to OCI (assumes environment variables are set)
deploy: build
	./deploy-oci.sh

# Deploy locally using OCI CLI (interactive setup)
deploy-local:
	@echo "Setting up OCI deployment..."
	@echo "Please ensure the following environment variables are set:"
	@echo "  OCI_REGION, COMPARTMENT_ID, NAMESPACE, OCI_AUTH_TOKEN"
	@echo "  AVAILABILITY_DOMAIN, SUBNET_ID"
	@echo "  VITE_SITE_URL, VITE_BUSINESS_EMAIL, VITE_BUSINESS_PHONE, VITE_GA_MEASUREMENT_ID"
	@echo ""
	@read -p "Press Enter to continue or Ctrl+C to cancel..."
	$(MAKE) deploy

# Build Docker image
docker-build: build
	@if [ -z "$(NAMESPACE)" ]; then \
		echo "Error: NAMESPACE environment variable is not set"; \
		exit 1; \
	fi
	@if [ -z "$(IMAGE_TAG)" ]; then \
		echo "Error: IMAGE_TAG environment variable is not set"; \
		exit 1; \
	fi
	docker build -t $(NAMESPACE)/sveltekit-app:$(IMAGE_TAG) .

# Push Docker image to OCIR
docker-push: docker-build
	@if [ -z "$(OCI_REGION)" ]; then \
		echo "Error: OCI_REGION environment variable is not set"; \
		exit 1; \
	fi
	@echo "Pushing to OCIR..."
	@echo "Login to OCIR first with: docker login $(OCI_REGION).ocir.io -u $(NAMESPACE) -p <auth-token>"
	docker tag $(NAMESPACE)/sveltekit-app:$(IMAGE_TAG) $(OCI_REGION).ocir.io/$(NAMESPACE)/sveltekit-app:$(IMAGE_TAG)
	docker push $(OCI_REGION).ocir.io/$(NAMESPACE)/sveltekit-app:$(IMAGE_TAG)

# OCI CLI command for manual deployment
oci-deploy:
	@echo "Manual OCI Container Instance deployment command:"
	@echo "oci container-instances container-instance create \\"
	@echo "  --compartment-id $(COMPARTMENT_ID) \\"
	@echo "  --display-name sveltekit-app-instance \\"
	@echo "  --availability-domain $(AVAILABILITY_DOMAIN) \\"
	@echo "  --shape CI.Standard.E4.Flex \\"
	@echo "  --shape-config '{\"ocpus\": 1, \"memoryInGBs\": 8}' \\"
	@echo "  --containers '[{\"displayName\": \"sveltekit-container\", \"imageUrl\": \"$(OCI_REGION).ocir.io/$(NAMESPACE)/sveltekit-app:$(IMAGE_TAG)\", \"environmentVariables\": {\"NODE_ENV\": \"production\", \"VITE_SITE_URL\": \"$(VITE_SITE_URL)\", \"VITE_BUSINESS_EMAIL\": \"$(VITE_BUSINESS_EMAIL)\", \"VITE_BUSINESS_PHONE\": \"$(VITE_BUSINESS_PHONE)\", \"VITE_GA_MEASUREMENT_ID\": \"$(VITE_GA_MEASUREMENT_ID)\"}}]' \\"
	@echo "  --vnics '[{\"subnetId\": \"$(SUBNET_ID)\"}]'"

# Ready-to-run OCI deployment command with hardcoded values
deploy-oci-ready:
	@echo "This target has been removed for security reasons. Use 'make deploy' with proper environment variables instead."

# Deploy to Kubernetes (OKE)
deploy-k8s:
	./deploy-k8s.sh

# Alias for deploy-k8s
k8s-deploy: deploy-k8s