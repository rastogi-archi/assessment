import 'dotenv/config';
import express from 'express';
import connectDB from './Utils/db.js';
import authRoutes from './Routes/Auth.routes.js';
import projectRoutes from './Routes/Project.routes.js';
import cors from 'cors';

const app = express();

app.use(cors({
    origin : 'http://localhost:5173',
    methods : ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders : ['Content-Type', 'Authorization']
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 4000;

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});