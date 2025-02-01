# Stage 1: Build
FROM node:22-alpine AS build
WORKDIR /app

# Copy package files and install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Set environment variable for build
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}

# Copy source files and build
COPY . . 
RUN yarn build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy built frontend files to Nginx
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Inject environment variables at runtime
COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80

# Use custom entrypoint to inject env variables
CMD ["/entrypoint.sh"]
