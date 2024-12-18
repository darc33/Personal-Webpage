import bcrypt from "bcrypt";
import { getUserByEmail, createUser } from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv" 

dotenv.config();

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

export const registerUser = async (db, name, email, password) => {
  // Check if the user already exists
  const existingUser = await getUserByEmail(db, email);
  if (existingUser) {
    throw new Error('User already exists');
  }

  // Encrypt the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the user in the database
  const user = await createUser(db, { name, email, password: hashedPassword, travels:[], books:[], games:[] });

  // Generate a JWT token
  const token = generateToken(user._id);
  console.log("Generated token:", token);
  return { user, token };
};

export const loginUser = async (db, email, password) => {
  const user = await getUserByEmail(db, email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid email or password');
  }

  const token = generateToken(user._id);
  return { user, token };
};

export const recoverPassword = async (db, email) => {
  const user = await getUserByEmail(db, email);
  if (!user) {
    throw new Error('User not found');
  }

  // Here will be the logic to send the email with a recovery link
  return 'Recovery email sent';
};
