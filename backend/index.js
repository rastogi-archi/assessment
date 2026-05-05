import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './Utils/db.js';
import authRoutes from './Routes/Auth.routes.js';
import projectRoutes from './Routes/Project.routes.js';
import cors from 'cors';
import { getMe } from './Controllers/Auth.controllers.js';
import { isAuth } from './Middlewares/Auth.middlewares.js';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const frontendDistPath = path.resolve(__dirname, '../frontend/dist');

const allowedOrigins = [
  /^http:\/\/localhost:\d+$/,
  /^http:\/\/127\.0\.0\.1:\d+$/,
  /^https:\/\/assessment-[a-z0-9-]+\.onrender\.com$/,
  /^https:\/\/assessment-[a-z0-9-]+\.vercel\.app$/,
  ...(process.env.CORS_ORIGINS || '').split(',').map((origin) => origin.trim()).filter(Boolean),
];

app.use(cors({
  origin(origin, callback) {
    if (
      !origin ||
      allowedOrigins.some((allowedOrigin) =>
        typeof allowedOrigin === 'string' ? allowedOrigin === origin : allowedOrigin.test(origin)
      )
    ) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 4000;

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/auth/me', isAuth, getMe);
app.use(express.static(frontendDistPath));

app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(frontendDistPath, 'index.html'));
});

await connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
