# ---- Build Stage ----
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source files
COPY . .

# Build frontend and backend
RUN npm run build

# ---- Production Stage ----
FROM node:20-alpine

WORKDIR /app

# Copy only production dependencies and built files
COPY package.json package-lock.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist

# Optionally copy .env (or use Docker secrets/env at runtime)
COPY --from=builder /app/.env ./.env

EXPOSE 5000

CMD ["node", "dist/index.js"]