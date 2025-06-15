import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import Note from "../models/note.model.js";

dotenv.config();

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();
    return res.status(201).json({ success: true, message: "Account created successfully" });

  } catch (error) {
    console.error("Error in createUser:", error);
    return res.status(500).json({ success: false, message: "Server error while creating user" });
  }
};

const logUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '24h'
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: { name: user.name }
    });

  } catch (error) {
    console.error("Error in logUser:", error);
    return res.status(500).json({ success: false, message: "Server error while logging in" });
  }
};

const addNote = async (req, res) => {
  try {
    const { title, description } = req.body;
    // console.log("REQ.USER in addNote:", req.user);

    if (!title || !description) {
      return res.status(400).json({ success: false, message: "Title and description required" });
    }

    const newNote = new Note({
      title,
      description,
      userId: req.user.id,
    });

    await newNote.save();
    return res.status(201).json({ success: true, note: newNote });
  } catch (error) {
    console.error("Error in addNote:", error);
    return res.status(500).json({ success: false, message: "Error adding note" });
  }
};

const getNote = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id });
    return res.status(200).json({ success: true, notes });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Can't retrieve notes" });
  }
};

const updateNote = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedNote = await Note.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedNote) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }

    return res.status(200).json({ success: true, note: updatedNote });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Can't update note" });
  }
};

const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }

    return res.status(200).json({ success: true, message: 'Note deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Couldn't delete note" });
  }
};

const verifyUser = async (req, res) => {
  return res.status(200).json({ success: true, user: req.user });
};

export default {
  createUser,
  logUser,
  addNote,
  getNote,
  updateNote,
  deleteNote,
  verifyUser
};

