# 📝 Notes App (MERN Stack)

A simple and elegant full-stack Notes App built using **React**, **Node.js**, **Express**, and **MongoDB**. Users can register, log in, and securely manage their personal notes. Features include adding, editing, deleting, and searching notes — with a polished, responsive UI.

---

## 🚀 Features

- 🔐 JWT-based Authentication (Login/Signup)
- ➕ Add New Notes
- 🖊️ Edit Existing Notes
- ❌ Delete Notes
- 🔍 Search Notes by Title
- 📦 Persisted notes per authenticated user
- 📤 Toast notifications for actions
- 🧠 Optional drag-and-drop note reordering (UI only)
- 💅 Styled with Tailwind CSS and Neumorphic design

---

## 📁 Project Structure

```bash
├── client/               # React frontend
│   ├── src/
│   │   ├── components/   # Navbar, NoteCard, NotesModel, etc.
│   │   ├── context/      # Auth context
│   │   └── pages/        # Home, Login, Signup
│   └── package.json
├── server/               # Express backend
│   ├── controllers/      # Note & auth logic
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API routes
│   └── server.js
└── README.md
