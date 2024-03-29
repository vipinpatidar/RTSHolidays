# RTSHolidays.com - Full Stack TypeScript MERN App

RTSHolidays.com is a full-stack MERN (MongoDB, Express.js, React+TypeScript, Node.js+TypeScript) hotel booking application that allows users to search or filter and book hotel according to their desired dates. The frontend is built with Vite React+TypeScript, providing a fast and modern user interface. Users can explore hotel images, check reviews, add their own hotels, and update them. The app supports filtering and searching hotels and places based on various criteria.

## Features

- Hotel Booking: Users can search and book hotel rooms based on their desired dates.
- Hotel Details: View hotel images and check reviews before booking.
- Hotel Management: Users can add their own hotels or update existing ones.
- Filtering and Searching: Filter hotels based on criteria like location, amenities, and price range.

## Installation

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
