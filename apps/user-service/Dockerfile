FROM node:18-alpine AS builder

WORKDIR /app 

COPY package*.json ./
COPY turbo.json ./
COPY apps/auth-service/package*.json ./apps/user-service/
COPY packages/*/package*.json ./packages/

RUN npm ci
COPY . .

RUN npx turbo run build --filter=user-service


FROM node:18-alpine AS runtime

WORKDIR /app

COPY apps/user-service/package*.json ./
COPY package-lock.json ./

# Install only production dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy built files
COPY --from=builder /app/apps/user-service/dist ./dist
COPY --from=builder /app/packages/rabbitmq ./node_modules/@repo/rabbitmq

# Expose port
EXPOSE 5003

# Start the app
CMD ["node", "dist/index.js"]





