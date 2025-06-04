import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if all required fields are present
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({ success: true, message: "Account created successfully" });

  } catch (error) {
    console.error("Error in createUser:", error); // Log real error
    return res.status(500).json({ success: false, message: "Server error while creating user" });
  }
};


const logUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if both fields are present
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Compare the entered password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '5h' }
    );

    return res.status(200).json({ success: true, message: "Login successful", token,user:{name:user.name} });

  } catch (error) {
    console.error("Error in logUser:", error);
    return res.status(500).json({ success: false, message: "Server error while logging in" });
  }
};

export default {createUser,logUser};
