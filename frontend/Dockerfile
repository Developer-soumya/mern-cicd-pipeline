
# -----------------------------
# Stage 1: Build React frontend
# -----------------------------
FROM node:22-alpine AS build

WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy frontend source code
COPY . .

# API path used by the browser
ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL

# Generate production build
RUN npm run build


# -----------------------------
# Stage 2: Serve using Nginx
# -----------------------------
FROM nginx:alpine

# Remove default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy our custom Nginx configuration
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy React production files
COPY --from=build /app/dist /usr/share/nginx/html

# Nginx listens on port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
