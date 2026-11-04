import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { env } from './config/env.js';
import { errorHandler } from './middleware/errorHandler.js';

import authRoutes from './routes/auth.routes.js';
import templateRoutes from './routes/template.routes.js';
import projectRoutes from './routes/project.routes.js';
import assetRoutes from './routes/asset.routes.js';
import exportRoutes from './routes/export.routes.js';

export const app = express();

// Security & Parsing
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow localhost, Vite dev server, and same-origin
      if (!origin || origin.includes('localhost') || origin.includes('127.0.0.1')) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

app.use(cookieParser(env.COOKIE_SECRET));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Static uploads serving
const uploadsPath = path.resolve(process.cwd(), env.UPLOAD_DIR);
app.use('/uploads', express.static(uploadsPath));

// API v1 Routes
app.get('/api/v1/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'framecraft-api',
  });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/templates', templateRoutes);
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/assets', assetRoutes);
app.use('/api/v1/exports', exportRoutes);

// 404 handler
app.use('/api', (_req, res) => {
  res.status(404).json({ success: false, error: 'API endpoint not found' });
});

// Global error handler
app.use(errorHandler);
