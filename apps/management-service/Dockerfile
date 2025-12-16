FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./ 
COPY turbo.json ./
COPY /apps/management-service/package*.json  ./apps/management-service/
COPY packages/package*.json ./packages/

RUN npm ci
COPY . .

RUN npx turbo run build --filter=management-service


FROM node:18-alpine AS runtime

WORKDIR /app

COPY apps/management-service/package*.json ./
COPY package-lock.json ./

# Install only production dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy built files
COPY --from=builder /app/apps/management-service/dist ./dist

# Expose port
EXPOSE 5004

# Start the app
CMD ["node", "dist/index.js"]


