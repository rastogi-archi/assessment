import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../Models/User.models.js';

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';
const JWT_EXPIRES_IN = '7d';

const createToken = (user) =>
  jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

const sendError = (res, status, message) => res.status(status).json({ message });

export const registerUser = async (req, res) => {
  const fullName = req.body?.fullName;
  const email = req.body?.email;
  const password = req.body?.password;

  if (!fullName || !email || !password) {
    return sendError(res, 400, 'All fields are required');
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return sendError(res, 409, 'Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: 'User created',
      userId: user._id,
      token: createToken(user),
    });
  } catch (error) {
    console.error('Signup error:', error);
    return sendError(res, 500, 'Server error');
  }
};

export const loginUser = async (req, res) => {
  const email = req.body?.email;
  const password = req.body?.password;

  if (!email || !password) {
    return sendError(res, 400, 'Email and password are required');
  }

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return sendError(res, 401, 'Invalid credentials');
    }

    return res.status(200).json({ message: 'Login successful', token: createToken(user) });
  } catch (error) {
    console.error('Login error:', error);
    return sendError(res, 500, 'Server error');
  }
};