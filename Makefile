# Makefile for SvelteKit OCI Deployment Project

.PHONY: help install dev build preview check clean test lint deploy deploy-local docker-build docker-push oci-deploy deploy-oci-ready

# Default target
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
	@echo "  deploy        - Deploy to OCI (requires env vars)"
	@echo "  deploy-local  - Deploy locally using OCI CLI"
	@echo "  docker-build  - Build Docker image"
	@echo "  docker-push   - Push Docker image to OCIR"
	@echo "  oci-deploy    - Show OCI deployment command with variables"
	@echo "  deploy-oci-ready - Run ready-to-use OCI deployment command"

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
	docker build -t $(NAMESPACE)/sveltekit-app:$(IMAGE_TAG) .

# Push Docker image to OCIR
docker-push: docker-build
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
	oci container-instances container-instance create \
	  --compartment-id ocid1.tenancy.oc1..aaaaaaaa6j5cbx7otaftfvt3gois7qjjgwfxs6qp3zum2mq2mcpotcn3citq \
	  --display-name sveltekit-app-instance \
	  --availability-domain ocid1.availabilitydomain.oc1..aaaaaaaaag25rxkuwv76f77a57wz5h4a4pkm545dam4ndohfge25sffw5p3a \
	  --shape CI.Standard.E4.Flex \
	  --shape-config '{"ocpus": 1, "memoryInGBs": 8}' \
	  --containers '[{"displayName": "sveltekit-container", "imageUrl": "us-chicago-1.ocir.io/axye6mel1l0n/sveltekit-app:latest", "environmentVariables": {"NODE_ENV": "production", "VITE_SITE_URL": "https://lbsunrise.com", "VITE_BUSINESS_EMAIL": "LEMADILAN5@gmail.com", "VITE_BUSINESS_PHONE": "(978) 519-9774", "VITE_GA_MEASUREMENT_ID": ""}}]' \
	  --vnics '[{"subnetId": "ocid1.subnet.oc1.us-chicago-1.aaaaaaaav5rea7aafzmw4wetqjexre6m65hs63e5x2ve7wjlock6okgtnxtq"}]'