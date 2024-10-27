# RTSHolidays.com - Full Stack TypeScript MERN App

## Live At

https://rtsholidays.onrender.com/

RTSHolidays.com is a full-stack MERN (MongoDB, Express.js, React+TypeScript, Node.js+TypeScript) hotel booking application that allows users to search or filter and book hotel according to their desired dates. The frontend is built with Vite React+TypeScript, providing a fast and modern user interface. Users can explore hotel images, check reviews, add their own hotels, and update them. The app supports filtering and searching hotels and places based on various criteria.

## Features

- Hotel Booking: Users can search and book hotel rooms based on their desired dates.
- Hotel Details: View hotel images and check reviews before booking.
- Hotel Management: Users can add their own hotels or update existing ones.
- Filtering and Searching: Filter hotels based on criteria like location, amenities, and price range.

## Installation

### Using Docker

<details>
<summary><code>Dockerfile</code></summary>

```Dockerfile

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

```

</details>

#### add a .env file in frontend directory with environment variables like

      #VITE_API_BASE_URL=http://localhost:3000
      #VITE_STRIPE_PUB_KEY=your cloudinary cloud name

#### add a .env file in the backend directory with environment variables like

      #PORT=3000
      #MONGODB_URL=your mongodb url
      #ACCESS_TOKEN_SECRET= your access token secret
      #REFRESH_TOKEN_SECRET= your refresh token secret
      #NODE_ENV= development
      #FRONTEND_URL = http://localhost:5173
      #CLOUDINARY_CLOUD_NAME= your cloudinary cloud name
      #CLOUDINARY_API_KEY= your cloudinary api key
      #CLOUDINARY_API_SECRET = your cloudinary api secret
      #STRIPE_SECRET_API_KEY = your stripe secret api key

<details>
<summary><code>docker-compose.yaml</code></summary>

```dockerfile

# specify the version of docker-compose
version: "3.8"

# define the services/containers to be run
services:
  # define the backend service/container
  backend:
    # api service depends on the db service so the db service will be started before the api service
    depends_on:
      - db

    build:
      context: .
      dockerfile: Dockerfile

    ports:
      - "3000:3000" # Map backend port

    # specify environment variables for the backend service
    # for demo purposes, we're using a local mongodb instance
    env_file:
      - ./backend/.env

      # add a .env file in the backend directory with environment variables like
      #PORT=3000
      #MONGODB_URL=your mongodb url
      #ACCESS_TOKEN_SECRET= your access token secret
      #REFRESH_TOKEN_SECRET= your refresh token secret
      #NODE_ENV= development
      #FRONTEND_URL = http://localhost:5173
      #CLOUDINARY_CLOUD_NAME= your cloudinary cloud name
      #CLOUDINARY_API_KEY= your cloudinary api key
      #CLOUDINARY_API_SECRET = your cloudinary api secret
      #STRIPE_SECRET_API_KEY = your stripe secret api key

    # establish docker compose watch mode for the backend service
    develop:
      # specify the files to watch for changes
      watch:
        # it'll watch for changes in package.json and package-lock.json and rebuild the container and image if there are any changes
        - path: ./backend/package.json
          action: rebuild
        - path: ./backend/package-lock.json
          action: rebuild

        # it'll watch for changes in the backend directory and sync the changes with the container real time
        - path: ./backend
          target: /app
          action: sync

  # define the db service
  db:
    # specify the image to use for the db service from docker hub. If we have a custom image, we can specify that in this format
    # In the above two services, we're using the build context to build the image for the service from the Dockerfile so we specify the image as "build: ./frontend" or "build: ./backend".
    # but for the db service, we're using the image from docker hub so we specify the image as "image: mongo:latest"
    # you can find the image name and tag for mongodb from docker hub here: https://hub.docker.com/_/mongo
    image: mongo:latest

    # specify the ports to expose for the db service
    # generally, we do this in backend service using mongodb atlas. But for demo purposes, we're using a local mongodb instance
    # usually, mongodb runs on port 27017. So we're exposing the port 27017 on the host machine and mapping it to the port 27017 inside the container
    ports:
      - 27017:27017

    # specify the volumes to mount for the db service
    # we're mounting the volume named "hotelDB" inside the container at /data/db directory
    # this is done so that the data inside the mongodb container is persisted even if the container is stopped
    volumes:
      - hotelDB:/data/db

# define the volumes to be used by the services
volumes:
  hotelDB:

```

</details>

#### Creating Images and container from .yaml file

1.  Running in watch mode

    docker-compose watch

2.  Without watch mode

    docker-compose up

3.  Stop and Remove containers

    docker-compose down

### Prerequisites

- Node.js and npm installed globally.
- MongoDB instance.

## Backend Setup

1. Clone the repository:
   git clone https://github.com/yourusername/RTSHolidays.git
2. Navigate to the backend directory:
   cd RTSHolidays/backend
3. Install dependencies:
   npm install

4.Create a .env file in the backend directory and add the following variables:

MONGODB_URL=your_mongodb_connection_url
JWT_SECRET=your_jwt_secret
PORT=your_preferred_port_number

5. Start the backend server:npm run dev

## Frontend Setup

1. Navigate to the frontend directory:
   cd RTSHolidays/frontend

2. Install dependencies:
   npm install

3. Create a .env file in the frontend directory and add the following variable:
   VITE_API_URL=http://localhost:your_backend_port

- Replace your_backend_port with the port number you specified in the backend setup.

4. Start the frontend development server:npm run dev

## Usage

- Open your browser and go to http://localhost:your_frontend_port.

- Replace your_frontend_port with the port number specified in the frontend setup.

- Explore hotels, view images, and read reviews.

- Book hotel rooms according to your desired dates.

- If you're a hotel owner, add your hotels or update existing ones.

- Use filtering and searching features to find hotels and places based on your preferences.

Happy travels with RTSHolidays.com! 🏨🌟
