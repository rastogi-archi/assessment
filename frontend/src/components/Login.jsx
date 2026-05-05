import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        onLogin?.();
        toast.success('Login successful');
        navigate('/dashboard', { replace: true });
      } else {
        toast.error(data.message || 'Login failed');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-sky-100 px-4 py-10">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-xl border border-slate-200 shadow-2xl rounded-[32px] p-8 md:p-10">
        <h1 className="text-4xl font-semibold text-slate-900 text-center">Welcome back</h1>
        <p className="text-sm text-slate-500 text-center mt-2">Sign in to continue to your project workspace</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="kristin.watson@example.com"
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
          </div>

          <div className="flex items-center justify-between text-sm text-slate-600">
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
              />
              Remember me
            </label>
            <Link to="/forgot-password" className="text-sky-600 hover:text-sky-700 font-medium">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-sky-600 py-3 text-sm font-semibold text-white shadow-sm shadow-sky-300/50 transition hover:bg-sky-700"
          >
            Sign in
          </button>
        </form>

        <div className="mt-7 flex items-center gap-3 text-sm text-slate-400">
          <span className="h-px flex-1 bg-slate-200"></span>
          <span>Sign in with</span>
          <span className="h-px flex-1 bg-slate-200"></span>
        </div>

        <div className="mt-5 grid grid-cols-4 gap-3">
          {['F', 'T', 'G', ''].map((label) => (
            <button
              key={label}
              type="button"
              className="h-12 w-full rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-slate-300"
              aria-label={`Sign in with ${label}`}
            >
              {label}
            </button>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-slate-600">
          Don't have an account?{' '}
          <Link to="/signup" className="font-semibold text-sky-600 hover:text-sky-700">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
