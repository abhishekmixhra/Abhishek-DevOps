import React, { useState, useEffect } from 'react';

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 30;
      });
    }, 200);

    return () => clearInterval(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900">
      <div className="text-center">
        {/* Logo/Brand */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Abhishek Mishra
          </h1>
          <p className="text-gray-400 mt-2">DevOps Engineer</p>
        </div>

        {/* Loading Animation */}
        <div className="relative w-64 mx-auto">
          {/* Progress Bar */}
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          
          {/* Percentage */}
          <div className="mt-4 text-blue-400 font-semibold">
            {Math.round(Math.min(progress, 100))}%
          </div>
        </div>

        {/* Animated Dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>

        {/* Loading Text */}
        <p className="text-gray-500 mt-4 text-sm">
          Setting up the experience...
        </p>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.1)_0%,transparent_50%)]"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
