# Root-level Dockerfile
ARG NODE_VERSION=20.11.0

# Use the official Node.js 20-alpine as a base image
# Stage 1: Build the frontend
FROM node:${NODE_VERSION}-alpine AS frontend-build

# Set working directory for frontend
WORKDIR /frontend

# Copy package.json and package-lock.json for frontend
COPY ./frontend/package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the frontend source code
COPY ./frontend ./

# Build the frontend for production
RUN npm run build

# Stage 2: Set up the backend with frontend build
FROM node:${NODE_VERSION}-alpine

# Set working directory for backend
WORKDIR /app

# Copy backend package files
COPY ./backend/package*.json ./

# Install backend dependencies
RUN npm install

# Copy backend source code to /app
COPY ./backend ./

# Copy the frontend build files from Stage 1 to /frontend/dist
WORKDIR /
COPY --from=frontend-build /frontend/dist /frontend/dist

# Compile TypeScript to JavaScript
WORKDIR /app
RUN npm run build

# Expose backend port (default to 3000)
EXPOSE 3000

# Start the backend server
CMD ["npm", "run", "start"]
