# 🏡 Airbnb Clone

A modern full-stack **Airbnb-style** web application for listing and booking vacation properties, built using the powerful **MERN Stack** (MongoDB, Express.js, React.js, Node.js). This platform allows users to browse, search, and book holiday rentals seamlessly.

---

## 📋 Table of Contents

- [Features](#-features)  
- [Tech Stack](#-tech-stack)  
- [Project Structure](#-project-structure)  
- [Getting Started](#-getting-started)  
- [API Documentation](#-api-documentation)  
- [Contributing](#-contributing)  
- [License](#-license)  
- [Contact](#-contact)

---

## ✨ Features

- 🔍 Property listing and advanced searching  
- 🔐 User authentication and authorization (JWT-based)  
- 🎯 Filtering by price, location, and amenities  
- 🗓️ Booking system with scheduling  
- 📱 Responsive UI (Mobile & Desktop)  
- 🗺️ Interactive property map integration  
- ⭐ User reviews and ratings  
- 📷 Image upload with Multer

---

## 🛠️ Tech Stack

### 🔹 Frontend

- React.js (v18+)
- Redux Toolkit for state management
- Material-UI & Styled Components
- React Router v6
- Axios for API communication

### 🔸 Backend

- Node.js & Express.js
- MongoDB with Mongoose ODM
- JWT (JSON Web Tokens) for authentication
- Express Validator for input validation
- Multer for file uploads

---

## 📁 Project Structure

├── client/
│ ├── public/
│ └── src/
│ ├── components/
│ ├── pages/
│ ├── redux/
│ ├── services/
│ └── utils/
└── server/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
└── utils/


---

## 🚀 Getting Started

### ✅ Prerequisites

- Node.js (v14+)
- MongoDB Atlas account
- npm or yarn installed

### 📦 Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/airbnb-clone.git
cd airbnb-clone

Install Server Dependencies

cd server
npm install

Install Client Dependencies

cd ../client
npm install
Create Environment Variables

In server/.env file:

MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=8080
Run Development Servers

Open two terminals:

Terminal 1 - Backend

cd server
npm run dev

Terminal 2 - Frontend

cd client
npm start

🔐 Auth Routes

POST   /api/auth/register      // Register a new user
POST   /api/auth/login         // User login
GET    /api/auth/profile       // Get user profile
PUT    /api/auth/profile       // Update user profile
🏠 Properties Routes

GET    /api/properties          // Get all properties
POST   /api/properties          // Create a property
GET    /api/properties/:id      // Get property by ID
PUT    /api/properties/:id      // Update property
DELETE /api/properties/:id      // Delete property
GET    /api/properties/search   // Search properties
GET    /api/properties/filter   // Filter properties

📅 Booking Routes

POST   /api/bookings            // Create a new booking
GET    /api/bookings            // Get all bookings for user
DELETE /api/bookings/:id        // Cancel a booking
🤝 Contributing
Contributions are welcome! Follow these steps:

Fork the repository

Create your branch


git checkout -b feature/AmazingFeature
Commit your changes


git commit -m 'Add some AmazingFeature'
Push to GitHub


git push origin feature/AmazingFeature
Open a Pull Request

📝 License
This project is licensed under the MIT License. See the LICENSE file for details.

🔗 Links
Live Demo: Coming Soon

Documentation: Coming Soon


📧 Contact
Your Name – @yourtwitter – email@example.com
Project Link: https://github.com/yourusername/airbnb-clone

⭐ If you like this project, please consider giving it a star on GitHub!





