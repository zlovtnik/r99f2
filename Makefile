# Makefile for SvelteKit Cloudflare Pages Project

# Project configuration - can be overridden via environment or command line:
# make deploy PROJECT_NAME=other-project
PROJECT_NAME ?= r99f2

.PHONY: help install dev build preview check clean test lint deploy deploy-preview cf-login cf-secrets cf-tail cf-logs all

# Default target
all: build

# Help target
help:
	@echo "Available targets:"
	@echo "  install        - Install dependencies"
	@echo "  dev            - Start development server"
	@echo "  build          - Build for production"
	@echo "  preview        - Preview production build locally"
	@echo "  check          - Run type checking and linting"
	@echo "  clean          - Clean build artifacts"
	@echo "  test           - Run tests (if available)"
	@echo "  lint           - Run linting (if available)"
	@echo "  cf-login       - Login to Cloudflare"
	@echo "  deploy         - Deploy to Cloudflare Pages (production)"
	@echo "  deploy-preview - Deploy to Cloudflare Pages (preview)"
	@echo "  cf-secrets     - Show how to set Cloudflare secrets"
	@echo "  cf-tail        - Tail Cloudflare Pages logs"
	@echo "  cf-logs        - Alias for cf-tail"

# Install dependencies
install:
	npm ci

# Start development server
dev:
	npm run dev

# Build for production
build:
	npm run build

# Preview production build locally
preview:
	npm run preview

# Run type checking and linting
check:
	npm run check

# Clean build artifacts
clean:
	rm -rf .svelte-kit node_modules/.vite

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

# Login to Cloudflare
cf-login:
	npx wrangler login

# Deploy to Cloudflare Pages (production)
deploy: build
	npx wrangler pages deploy .svelte-kit/cloudflare --project-name=$(PROJECT_NAME)

# Deploy to Cloudflare Pages (preview/staging)
deploy-preview: build
	npx wrangler pages deploy .svelte-kit/cloudflare --project-name=$(PROJECT_NAME) --branch=preview

# Show how to set Cloudflare secrets
cf-secrets:
	@echo "To set secrets for Cloudflare Pages, use:"
	@echo ""
	@echo "  npx wrangler pages secret put ADMIN_EMAIL --project-name=$(PROJECT_NAME)"
	@echo "  npx wrangler pages secret put VITE_EMAIL_API_KEY --project-name=$(PROJECT_NAME)"
	@echo ""
	@echo "You'll be prompted to enter the secret value interactively."
	@echo ""
	@echo "To list existing secrets:"
	@echo "  npx wrangler pages secret list --project-name=$(PROJECT_NAME)"

# Tail Cloudflare Pages logs
cf-tail:
	npx wrangler pages deployment tail --project-name=$(PROJECT_NAME)

# Alias for cf-tail
cf-logs: cf-tail