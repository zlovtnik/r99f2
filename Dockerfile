# Multi-stage Dockerfile for SvelteKit application
# Optimized for Oracle Cloud Infrastructure

# Build stage
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including dev dependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine AS production

# Create app directory
WORKDIR /app

# Copy built application from builder stage (adapter-node outputs to build/)
COPY --from=builder /app/build ./

# Expose port
EXPOSE 3000

# Health check (using wget since curl is not available in alpine)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --spider http://localhost:3000/health || exit 1

# Start the application (adapter-node entry point)
CMD ["node", "./index.js"]