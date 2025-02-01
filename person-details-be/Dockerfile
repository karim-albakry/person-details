# Stage 1: Build
FROM node:22-alpine AS build
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source files and build
COPY . . 
RUN npm run build

# Stage 2: Run
FROM node:22-alpine
WORKDIR /app

# Copy built files
COPY --from=build /app/dist ./dist
COPY package.json package-lock.json ./

# Install only production dependencies
RUN npm install --only=production

# Expose port
EXPOSE 3000

# Environment variables (Handled in docker-compose)
ENV NODE_ENV=production
ENV PORT=3000

# Ensure CSV file exists before running
CMD ["/bin/sh", "-c", "mkdir -p /app/src/data && cp /app/src/data/persons.csv /app/src/data/persons.csv || touch /app/src/data/persons.csv && node dist/server.js"]
