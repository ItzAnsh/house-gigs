# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 3001
EXPOSE 3002

# Start the service
CMD ["npm", "run", "start:prod", "user-service" ]

