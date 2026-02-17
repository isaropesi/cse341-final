require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const connectDB = require('./config/database');
const swaggerSpec = require('./swagger');
const errorHandler = require('./middleware/errorHandler');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo').default;

// Passport config
require('./config/passport')(passport);

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sessions
if (process.env.NODE_ENV !== 'test') {
    app.use(
        session({
            secret: process.env.SESSION_SECRET || 'keyboard cat',
            resave: false,
            saveUninitialized: false,
            store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI })
        })
    );
} else {
    // Use memory store for tests to avoid MongoDB connection issues during testing
    app.use(
        session({
            secret: 'test-secret',
            resave: false,
            saveUninitialized: false
        })
    );
}

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/projects', require('./routes/projectRoutes'));
app.use('/tasks', require('./routes/taskRoutes'));
app.use('/comments', require('./routes/commentRoutes'));
app.use('/users', require('./routes/userRoutes'));

// Root route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to TaskFlow API',
        documentation: '/api-docs',
        version: '1.0.0',
        isAuthenticated: req.isAuthenticated()
    });
});

// Error Handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

// Only start server if run directly (not if imported by tests)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
        console.log(`📚 API Documentation available at http://localhost:${PORT}/api-docs`);
    });
}

module.exports = app;
