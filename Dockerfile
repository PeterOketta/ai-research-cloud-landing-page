# ───────── Build stage ─────────
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies first (better layer caching)
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source
COPY . .

# Build-time env (available to Vite as import.meta.env.VITE_*)
ARG VITE_REQUEST_ACCESS_URL
ENV VITE_REQUEST_ACCESS_URL=$VITE_REQUEST_ACCESS_URL

RUN npm run build

# ───────── Runtime stage ─────────
FROM nginx:1.27-alpine

# SPA-aware nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Static build output
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
