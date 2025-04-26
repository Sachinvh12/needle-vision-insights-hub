
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import AnimatedBackground from '../components/AnimatedBackground';
import Logo from '../components/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, state } = useApp();
  
  useEffect(() => {
    if (state.isLoggedIn) {
      navigate('/dashboard');
    }
  }, [state.isLoggedIn, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await login(email, password);
      toast.success("Welcome back!", {
        description: "You've been successfully logged in."
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 relative overflow-hidden">
      <AnimatedBackground variant="subtle" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md"
      >
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden p-8 relative z-10 border border-gray-100">
          <div className="flex flex-col items-center justify-center mb-8">
            <Logo size="large" className="mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-needl-primary to-blue-600 bg-clip-text text-transparent">Welcome Back</h1>
            <p className="text-gray-500 text-center max-w-xs">Sign in to access your intelligence hub and start making informed decisions</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <a href="#" className="text-xs text-needl-primary hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-needl-primary hover:bg-needl-dark transition-all duration-200 gap-2 py-6"
            >
              {loading ? 'Signing in...' : 'Sign In'} 
              {!loading && <ArrowRight className="h-4 w-4" />}
            </Button>
            
            <div className="flex items-center my-3">
              <div className="h-px flex-1 bg-gray-200"></div>
              <p className="px-4 text-sm text-gray-500">or</p>
              <div className="h-px flex-1 bg-gray-200"></div>
            </div>
            
            <Button 
              type="button" 
              variant="outline" 
              className="w-full"
              onClick={() => {
                setEmail('demo@needl.ai');
                setPassword('demo123');
                toast.info("Demo credentials applied", {
                  description: "Click Sign In to continue with the demo account"
                });
              }}
            >
              Try Demo Account
            </Button>
          </form>
          
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>Don't have an account? <a href="#" className="text-needl-primary font-medium hover:underline">Get Started</a></p>
          </div>
        </div>
        
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>© 2025 Needl.ai • Intelligence for everyone</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
