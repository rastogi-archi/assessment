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
  'https://assessment-theta-coral.vercel.app',
  'https://assessment-awxk.vercel.app',
];

app.use(cors({
  origin: [
    "http://localhost:4000",
    "https://assessment-3-zfnf.onrender.com"
  ]
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 4000;

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/auth/me', isAuth, getMe);
app.use(express.static(frontendDistPath));

await connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
