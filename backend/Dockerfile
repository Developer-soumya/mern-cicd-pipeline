
# Use Node.js as the base image
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install production dependencies only
RUN npm ci --omit=dev

# Copy the application source code
COPY . .

# Application listens on port 5000
EXPOSE 5000

# Start the backend application
CMD ["npm", "start"]
