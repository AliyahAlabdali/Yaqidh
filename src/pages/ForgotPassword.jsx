import React, { useState } from 'react';
import { Mail } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setMessage(`If an account exists for ${email}, a password reset link has been sent.`);
      setEmail('');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src="/Yaqidh-logo.png" alt="Yaqidh Logo" className="h-20 w-auto object-contain mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-slate-900 mt-4">Forgot Password</h1>
          <p className="text-slate-600 mt-2">Enter your email and we'll send a reset link.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
          {message && (
            <div className="mb-4 p-4 bg-safe border border-safe rounded-xl text-white text-sm font-semibold">
              {message}
            </div>
          )}

          {error && (
            <div className="mb-4 p-4 bg-danger border border-danger rounded-xl text-white text-sm font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 text-slate-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-500 hover:bg-brand-600 text-white font-semibold py-3 rounded-xl transition duration-200 disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-600">
              Remembered your password? <a href="/login" className="text-brand-500 hover:text-brand-600 font-semibold">Sign in</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
