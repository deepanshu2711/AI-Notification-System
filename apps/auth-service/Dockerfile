FROM node:18-alpine AS builder

WORKDIR /app 

COPY package*.json ./
COPY turbo.json ./
COPY apps/auth-service/package*.json ./apps/auth-service/
COPY packages/*/package*.json ./packages/


RUN npm ci
COPY . .

RUN npx turbo run build --filter=auth-service


FROM node:18-alpine AS runtime

WORKDIR /app

COPY apps/auth-service/package*.json ./
COPY package-lock.json ./

# Install only production dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy built files
COPY --from=builder /app/apps/auth-service/dist ./dist

# Expose port
EXPOSE 5002

# Start the app
CMD ["node", "dist/index.js"]



