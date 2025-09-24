# syntax=docker/dockerfile:1

# Build stage
FROM --platform=linux/amd64 node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage - run Next.js server for SSR
FROM --platform=linux/amd64 node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Only copy necessary build outputs
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 8080
CMD ["npm", "start"]