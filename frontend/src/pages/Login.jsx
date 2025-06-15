import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/ContextProvider';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', data);
      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem('token', response.data.token);
        toast.success(`${response.data.user.name} logged in successfully`);
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f0f0] px-4">
      <div className="bg-[#f4f0f0] shadow-[8px_8px_16px_#d1cdcd,_-8px_-8px_16px_#ffffff] rounded-2xl p-10 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-600 mb-1">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Enter a valid email address',
                },
              })}
              className="w-full px-4 py-2 rounded-xl bg-[#f4f0f0] text-gray-800 shadow-[inset_4px_4px_10px_#d1cdcd,_inset_-4px_-4px_10px_#ffffff] focus:outline-none"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-gray-600 mb-1">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              className="w-full px-4 py-2 rounded-xl bg-[#f4f0f0] text-gray-800 shadow-[inset_4px_4px_10px_#d1cdcd,_inset_-4px_-4px_10px_#ffffff] focus:outline-none"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 rounded-xl bg-[#f4f0f0] text-gray-800 font-semibold shadow-[4px_4px_10px_#d1cdcd,_-4px_-4px_10px_#ffffff] hover:shadow-inner transition duration-300"
          >
            Login
          </button>

          {/* Link to Signup */}
          <p className="text-center text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="text-black-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;




