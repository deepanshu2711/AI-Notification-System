# Build stage
FROM node:20-alpine AS builder

# Build-time variables
ARG NEXT_PUBLIC_CLIENT_ID
ARG NEXT_PUBLIC_AI_NOTIFICATION_DASHBOARD
ARG NEXT_PUBLIC_AUTH
ARG NEXT_PUBLIC_AUTH_BACKEND

# Set environment variables for build
ENV NEXT_PUBLIC_CLIENT_ID=$NEXT_PUBLIC_CLIENT_ID
ENV NEXT_PUBLIC_AI_NOTIFICATION_DASHBOARD=$NEXT_PUBLIC_AI_NOTIFICATION_DASHBOARD
ENV NEXT_PUBLIC_AUTH=$NEXT_PUBLIC_AUTH
ENV NEXT_PUBLIC_AUTH_BACKEND=$NEXT_PUBLIC_AUTH_BACKEND

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm i

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine AS runner

WORKDIR /app

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public folder
COPY --from=builder /app/public ./public

# Copy the standalone output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

# Copy static files
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

# Expose port
ENV PORT 8080
EXPOSE $PORT

# Set environment variables
ENV NODE_ENV=production

# Start the application
CMD ["node", "server.js"]
