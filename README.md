# TaskFlow API

A comprehensive project and task management API built with Node.js, Express, and MongoDB.

## Team Members
- **Isabella Silva** - Infrastructure & Project Management
- **Nyasha Chimutapira** - Task Management & Documentation

## Features
- ✅ Full CRUD operations for Projects and Tasks
- ✅ MongoDB Atlas integration with Mongoose
- ✅ Comprehensive error handling
- ✅ Data validation on all POST/PUT routes
- ✅ Professional Swagger API documentation at `/api-docs`
- ✅ Deployed to Render

## Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB Atlas (Mongoose ODM)
- **Security:** Helmet.js, CORS
- **Documentation:** Swagger (OpenAPI 3.0)

## Project Structure (MVC Pattern)
```
cse341-final/
├── config/          # Database configuration
├── controllers/     # Business logic
├── models/          # Mongoose schemas
├── routes/          # API endpoints
├── middleware/      # Error handling
├── server.js        # Entry point
└── swagger.js       # API documentation config
```

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/isaropesi/cse341-final.git
cd cse341-final
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory:
```env
MONGODB_URI=your_mongodb_atlas_connection_string
PORT=3000
NODE_ENV=development
```

### 4. Run the Application

**Development Mode (with auto-restart):**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

### 5. Access the API
- **Local Server:** http://localhost:3000
- **API Documentation:** http://localhost:3000/api-docs
- **Production (Render):** https://cse341-final-kd0a.onrender.com/api-docs 

## API Endpoints

### Projects
- `GET /projects` - Get all projects
- `GET /projects/:id` - Get project by ID
- `POST /projects` - Create new project
- `PUT /projects/:id` - Update project
- `DELETE /projects/:id` - Delete project

### Tasks
- `GET /tasks/project/:projectId` - Get all tasks for a project
- `GET /tasks/:id` - Get task by ID
- `POST /tasks` - Create new task
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task

## Database Collections

### Projects (7+ fields)
- name, description, ownerId, teamMembers[], startDate, endDate, status, category, createdAt

### Tasks
- title, description, projectId, assigneeId, priority, status, dueDate

## Week 05 Deliverables
- [x] Node.js project structure (MVC)
- [x] MongoDB Atlas connection
- [x] Two collections with full CRUD
- [x] Error handling on all routes
- [x] Data validation
- [x] Swagger documentation at `/api-docs`
- [x] Deployed to Render

## Individual Contributions

### Isabella Silva
1. Created Node.js project structure and MVC architecture
2. Implemented Project collection CRUD operations
3. Set up Render deployment configuration

### Nyasha Chimutapira
1. Configured MongoDB Atlas and Mongoose connection
2. Implemented Task collection CRUD operations
3. Created comprehensive Swagger API documentation

## License
ISC
