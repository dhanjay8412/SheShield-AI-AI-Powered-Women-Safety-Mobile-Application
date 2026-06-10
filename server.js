import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { syncDatabase } from './models/sequelize.js';

// Middleware & Configuration
import { errorHandler, notFoundHandler } from './middleware/error.js';

// Route Handlers
import authRoutes from './routes/auth.js';
import sosRoutes from './routes/sos.js';
import chatRoutes from './routes/chat.js';
import trackingRoutes from './routes/tracking.js';
import recordingsRoutes from './routes/recordings.js';
import adminRoutes from './routes/admin.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Standard Platform Middlewares
app.use(cors({ origin: '*' })); // Allow universal cross-origin connectivity
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Output request telemetry to standard logging outputs
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Basic health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'ONLINE',
    timestamp: new Date().toISOString(),
    service: 'SheShield AI Backend Core',
    env: process.env.NODE_ENV || 'development'
  });
});

// Register API Routes
app.use('/api/auth', authRoutes);
app.use('/api/sos', sosRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/tracking', trackingRoutes);
app.use('/api/recordings', recordingsRoutes);
app.use('/api/admin', adminRoutes);

// Fallback Route (404 Not Found Handling)
app.use(notFoundHandler);

// Centralized Runtime Error Handling
app.use(errorHandler);

// Initialize database and bootstrap active listener
const startServer = async () => {
  try {
    await syncDatabase();
    app.listen(PORT, () => {
      console.log(`\n======================================================`);
      console.log(`🛡️  SheShield AI Backend Core Server loaded successfully.`);
      console.log(`🚀 Host Address: http://localhost:${PORT}`);
      console.log(`⚙️  Active Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🗄️  Database: SQLite (${process.env.NODE_ENV === 'development' ? 'Development' : 'Production'})`);
      console.log(`======================================================\n`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
