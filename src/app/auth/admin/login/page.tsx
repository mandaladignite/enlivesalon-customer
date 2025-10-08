"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { login, isAuthenticated, isAdmin } = useAdminAuth();

  // Prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      router.replace('/admin');
    }
  }, [isAuthenticated, isAdmin, router]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(credentials.email, credentials.password);
      
      // Show success message
      setSuccess(true);
      setError('');
      
      // Wait for state to propagate and then redirect
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Use replace instead of push to avoid back button issues
      router.replace("/admin");
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
      setSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };


  // Prevent hydration issues by not rendering until mounted
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // If already authenticated, show loading while redirecting
  if (isAuthenticated && isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Admin Login | Enlive Salon</title>
        <meta name="description" content="Admin portal for EliteSalon management" />
      </Head>
      
      <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 overflow-hidden relative" suppressHydrationWarning={true}>
        {/* Background elements */}
        <div className="absolute inset-0 opacity-30" suppressHydrationWarning={true}>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-100 rounded-full filter blur-3xl" suppressHydrationWarning={true}></div>
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-blue-100 rounded-full filter blur-3xl" suppressHydrationWarning={true}></div>
        </div>
        
        {/* Main content */}
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 relative z-10" suppressHydrationWarning={true}>
          <div className="mx-auto w-full max-w-sm lg:w-96" suppressHydrationWarning={true}>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200"
                suppressHydrationWarning={true}
              >
              <div className="flex flex-col items-center justify-center mb-4">
                  <img src="/logo.png" alt="" className='h-8 mb-8'/>
              </div>
              
              <h2 className="text-2xl font-bold text-center mb-2 font-['Poppins']">
                Secure Access
              </h2>
              <p className="text-center text-sm text-gray-600 mb-8 font-['Inter']">
                Restricted access to authorized personnel only
              </p>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm"
                >
                  {error}
                </motion.div>
              )}

              {success && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm"
                >
                  ✅ Login successful! Redirecting to admin panel...
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 font-['Inter']">
                    Admin Email
                  </label>
                  <motion.div whileFocus={{ scale: 1.01 }} className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={credentials.email}
                      onChange={handleChange}
                      className="appearance-none block w-full px-4 py-3 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm"
                      placeholder="Enter admin email"
                    />
                  </motion.div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2 font-['Inter']">
                    Password
                  </label>
                  <motion.div whileFocus={{ scale: 1.01 }} className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={credentials.password}
                      onChange={handleChange}
                      className="appearance-none block w-full px-4 py-3 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm"
                      placeholder="Enter password"
                    />
                  </motion.div>
                </div>

                

                <motion.div 
                  whileHover={isLoading ? {} : { scale: 1.02 }} 
                  whileTap={isLoading ? {} : { scale: 0.98 }}
                  className="pt-4"
                >
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 font-['Inter'] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Authenticating...
                      </>
                    ) : 'Sign in'}
                  </button>
                </motion.div>
              </form>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 text-center"
            >
              <p className="text-sm text-gray-600 font-['Inter']">
                Having trouble accessing your account?{' '}
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
                  Contact support
                </a>
              </p>
            </motion.div>
            
            
          </div>
        </div>

        {/* Right side - Visual element */}
        <div className="hidden lg:block relative w-0 flex-1" suppressHydrationWarning={true}>
          <div className="absolute inset-0 h-full w-full" suppressHydrationWarning={true}>
            <div className="absolute top-0 right-0 w-full h-full flex items-center justify-center" suppressHydrationWarning={true}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                className="bg-white w-4/5 p-12 rounded-2xl border border-gray-200 shadow-lg flex items-center justify-center "
                suppressHydrationWarning={true}
              >
                <div className="text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    className="mb-8"
                  >
                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-indigo-100 to-blue-100 mx-auto flex items-center justify-center mb-6 shadow-inner">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 font-['Poppins']">Admin Security</h3>
                    <p className="text-gray-600 font-['Inter']">Secure access to management dashboard</p>
                  </motion.div>
                  
                  <motion.div 
                    className="grid grid-cols-2 gap-6 mt-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.8 }}
                  >
                    {['Appointment Management', 'Staff Management', 'Sales Reports', 'Inventory'].map((feature, index) => (
                      <div key={index} className="text-center">
                        <div className="w-12 h-12 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center mx-auto mb-2 shadow-sm">
                          <div className="w-6 h-6 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full"></div>
                        </div>
                        <p className="text-xs text-gray-600 font-['Inter']">{feature}</p>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>


    </>
  );
}