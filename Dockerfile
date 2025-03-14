FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./
COPY scripts/install-legacy-deps.js ./scripts/

# Install dependencies with legacy peer deps flag
RUN npm install --legacy-peer-deps

# Copy the rest of the application
COPY . .

# Set environment variables
ENV NODE_ENV=production
ENV NEXT_PUBLIC_API_URL=http://host.docker.internal:8080

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]

