import User from "../models/user.model.js";
import bcrypt from 'bcrypt';

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

export default createUser;
