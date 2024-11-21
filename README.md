# Task Manager Application

A full-stack task management application with user authentication, task management, and Docker containerization.

## Features
- 🔐 User authentication (register/login)
- ✅ Create, read, update, delete tasks
- 📅 Due date tracking
- 📱 Responsive design
- 🐳 Docker support

## Tech Stack
### Frontend
- React.js 18
- React Router 6
- Axios
- React Icons

### Backend
- Node.js 18
- Express.js
- MongoDB
- JWT authentication
- bcrypt

## Quick Start

### Local Development
1. Clone the repository:
```bash
git clone https://github.com/Pranav-Khude/task-manager-fullstack.git
cd task-manager-fullstack
```
### Install dependencies:
```
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```
### Configure environment variables:
#### Backend .env
```
PORT=5000
JWT_SECRET=your_secret
MONGO_URI=your_mongodb_uri
```
#### Frontend .env:
```
REACT_APP_API_URL=http://localhost:5000/api
```
### Start development servers
```
# Backend
cd backend
npm start

# Frontend
cd frontend
npm start
```

