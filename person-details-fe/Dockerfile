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

# Expose frontend port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
