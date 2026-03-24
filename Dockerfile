# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package management files
COPY package.json yarn.lock* package-lock.json* ./

# Copy TS configs and other essential build files specifically
COPY tsconfig*.json ./
COPY vite.config.ts ./
COPY index.html ./

# Install dependencies
RUN if [ -f yarn.lock ]; then yarn install; \
    else npm install; fi

# Copy application source
COPY . .

# Set build-time environment variables
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ARG VITE_RPC_URL
ENV VITE_RPC_URL=$VITE_RPC_URL
ARG VITE_FZ_CONTRACT_ADDRESS
ENV VITE_FZ_CONTRACT_ADDRESS=$VITE_FZ_CONTRACT_ADDRESS

# Build the application
RUN npm run build

# Production stage - Nginx
FROM nginx:stable-alpine

# Copy build output to nginx folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
