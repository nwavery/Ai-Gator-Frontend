# Stage 1: Build the Angular application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the application source code
COPY . .

# Build the application for production
# Output path should match angular.json: dist/agregator/browser
RUN npm run build -- --configuration production

# Stage 2: Serve the application using Nginx
FROM nginx:stable-alpine

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built application artifacts from the builder stage
# Adjust the source path if your angular.json outputPath or browser path is different
COPY --from=builder /app/dist/agregator/browser /usr/share/nginx/html

# Expose port 8080 (the port Nginx is configured to listen on)
EXPOSE 8080

# Default command to run Nginx (will use the custom config)
CMD ["nginx", "-g", "daemon off;"] 