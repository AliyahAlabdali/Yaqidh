import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, Lock, CheckCircle } from 'lucide-react';

export default function Register() {
  const [step, setStep] = useState(1); // Step 1: Registration, Step 2: Phone Verification
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'parent',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.fullName || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setLoading(true);
    setTimeout(() => {
      setStep(2);
      setLoading(false);
    }, 1000);
  };

  const handleVerifyPhone = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      if (verificationCode) {
        sessionStorage.setItem('user', JSON.stringify({ 
          email: formData.email,
          role: formData.role 
        }));
        window.location.href = '/';
      } else {
        setError('Please enter the verification code');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <img src="/Yaqidh-logo.png" alt="Yaqidh Logo" className="h-20 w-auto object-contain mx-auto mb-4" />
          <p className="text-slate-600 mt-2">Create Your Account</p>
        </div>

        {/* Registration Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
          {step === 1 ? (
            <>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Register</h2>
              <p className="text-slate-600 text-sm mb-6">Step 1 of 2</p>

              {error && (
                <div className="mb-4 p-4 bg-danger border border-danger rounded-xl text-white text-sm font-semibold">
                  {error}
                </div>
              )}

              <form onSubmit={handleRegister} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 text-slate-400" size={20} />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 text-slate-400" size={20} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="name@example.com"
                      className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3.5 text-slate-400" size={20} />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 text-slate-400" size={20} />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter a strong password"
                      className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
                    />
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 text-slate-400" size={20} />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your password"
                      className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
                    />
                  </div>
                </div>

                {/* Role Selection */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">
                    Select Your Role
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-brand-50 transition" >
                      <input
                        type="radio"
                        name="role"
                        value="parent"
                        checked={formData.role === 'parent'}
                        onChange={handleInputChange}
                        className="w-4 h-4 accent-brand-500"
                      />
                      <span className="ml-3 font-medium text-slate-700">Parent/Caregiver</span>
                    </label>
                    <label className="flex items-center p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-brand-50 transition">
                      <input
                        type="radio"
                        name="role"
                        value="manager"
                        checked={formData.role === 'manager'}
                        onChange={handleInputChange}
                        className="w-4 h-4 accent-brand-500"
                      />
                      <span className="ml-3 font-medium text-slate-700">Nursery Manager</span>
                    </label>
                    <label className="flex items-center p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-brand-50 transition">
                      <input
                        type="radio"
                        name="role"
                        value="teacher"
                        checked={formData.role === 'teacher'}
                        onChange={handleInputChange}
                        className="w-4 h-4 accent-brand-500"
                      />
                      <span className="ml-3 font-medium text-slate-700">Teacher</span>
                    </label>
                  </div>
                </div>

                {/* Register Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-500 hover:bg-brand-600 text-white font-semibold py-3 rounded-xl transition duration-200 disabled:opacity-50 mt-6"
                >
                  {loading ? 'Creating Account...' : 'Continue to Verification'}
                </button>
              </form>

              {/* Login Link */}
              <div className="mt-6 text-center">
                <p className="text-slate-600">
                  Already have an account?{' '}
                  <Link to="/login" className="text-brand-500 hover:text-brand-600 font-semibold">
                    Login here
                  </Link>
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-100 rounded-full mb-4">
                  <Phone className="text-brand-500" size={32} />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Verify Your Phone</h2>
                <p className="text-slate-600 text-sm mt-2">Step 2 of 2</p>
              </div>

              {error && (
                <div className="mb-4 p-4 bg-danger border border-danger rounded-xl text-white text-sm font-semibold">
                  {error}
                </div>
              )}

              <form onSubmit={handleVerifyPhone} className="space-y-4">
                <div className="bg-brand-50 p-4 rounded-xl border border-brand-200 mb-4">
                  <p className="text-sm text-slate-700">
                    We've sent a verification code to <span className="font-semibold">{formData.phone}</span>
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Verification Code
                  </label>
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="Enter 6-digit code"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-500 hover:bg-brand-600 text-white font-semibold py-3 rounded-xl transition duration-200 disabled:opacity-50"
                >
                  {loading ? 'Verifying...' : 'Verify & Complete Registration'}
                </button>
              </form>

              <div className="mt-4 text-center">
                <button
                  onClick={() => setStep(1)}
                  className="text-sm text-brand-500 hover:text-brand-600 font-medium"
                >
                  Back to Registration
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
