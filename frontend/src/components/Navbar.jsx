import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/ContextProvider';

const Navbar = ({ setFilter }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-[#f4f0f0] text-black shadow-inner rounded-xl mx-4 mt-4 neumorphic">
     <div className="text-2xl font-bold">
  <Link
    to="/"
    className="p-2 rounded-xl shadow-neumorphic-inset hover:shadow-neumorphic hover:scale-105 transition-all duration-300"
    style={{ fontFamily: "'Pacifico', cursive" }}
  >
    NotoPad
  </Link>
</div>


      <div className="w-1/3">
        <input
          type="text"
          placeholder="Search notes"
          className="w-full px-4 py-2 rounded-xl bg-[#f8f8f8] border-b-slate-950 text-black shadow-neumorphic-inset focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-300"
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <div className="flex items-center space-x-4">
        {!user ? (
          <>
            <Link
              to="/login"
              className="px-3 py-1 rounded-xl shadow-neumorphic-inset hover:shadow-neumorphic transition-all duration-300"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-3 py-1 rounded-xl shadow-neumorphic-inset hover:shadow-neumorphic transition-all duration-300"
            >
              Register
            </Link>
          </>
        ) : (
          <>
           <span className="font-semibold px-2 font-mono">{user.name}</span>

            <button
              onClick={handleLogout}
              className="px-4 py-1 rounded-xl bg-[#e0e0e0] shadow-neumorphic-inset hover:shadow-neumorphic transition-all duration-300 font-semibold px-2 font-mono"
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






