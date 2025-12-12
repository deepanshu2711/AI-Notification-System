# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY turbo.json ./
COPY apps/api-gateway/package*.json ./apps/api-gateway/
COPY packages/*/package*.json ./packages/

# Install dependencies
RUN npm ci

# Copy source
COPY . .

# Build using turbo
RUN npx turbo run build --filter=api-gateway

# Production stage
FROM node:18-alpine AS runtime

WORKDIR /app

# Copy package files for production
COPY apps/api-gateway/package*.json ./
COPY package-lock.json ./

# Install only production dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy built files
COPY --from=builder /app/apps/api-gateway/dist ./dist

# Expose port
EXPOSE 5001

# Start the app
CMD ["node", "dist/index.js"]
