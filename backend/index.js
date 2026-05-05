import 'dotenv/config';
import express from 'express';
import connectDB from './Utils/db.js';
import authRoutes from './Routes/Auth.routes.js';
import projectRoutes from './Routes/Project.routes.js';
import cors from 'cors';
import { getMe } from './Controllers/Auth.controllers.js';
import { isAuth } from './Middlewares/Auth.middlewares.js';

const app = express();

const allowedOrigins = [
  /^http:\/\/localhost:\d+$/,
  /^http:\/\/127\.0\.0\.1:\d+$/,
  'https://assessment-theta-coral.vercel.app',
  'https://assessment-awxk.vercel.app',
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
app.use('/api/auth/me',isAuth, getMe);

if (process.env.NODE_ENV !== 'production') {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
