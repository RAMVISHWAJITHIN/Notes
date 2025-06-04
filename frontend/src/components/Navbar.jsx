import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/contextProvider';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="flex items-center justify-between bg-blue-600 text-white px-6 py-3">
      <div className="text-xl font-bold">
        <Link to="/">Notes App</Link>
      </div>

      <div>
        <input
          type="text"
          placeholder="Search notes"
          className="px-3 py-1 rounded border border-gray-300 focus:outline-none"
        />
      </div>

      <div className="flex items-center space-x-4">
        {!user ? (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </>
        ) : (
          <>
            <span>{user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

