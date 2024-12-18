import { registerUser, loginUser, recoverPassword } from '../services/usersService.js';
import connectToDatabase from '../config/mongo.js';

export const registerController = async (req, res) => {
  const db = await connectToDatabase();
  try {
    const { name, email, password } = req.body;
    const { user, token } = await registerUser(db, name, email, password);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const loginController = async (req, res) => {
  const db = await connectToDatabase();
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser(db, email, password);
    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const recoverPasswordController = async (req, res) => {
  const db = await connectToDatabase();
  try {
    const { email } = req.body;
    const message = await recoverPassword(db, email);
    res.json({ message });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
