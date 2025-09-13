import React, { useState, useEffect, useRef } from 'react';
import { Send, Check, X, AlertCircle, User, Mail, MessageSquare, Sparkles } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

interface FormStatus {
  type: 'idle' | 'sending' | 'success' | 'error';
  message: string;
}

const InteractiveContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>({ type: 'idle', message: '' });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const formRef = useRef<HTMLFormElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  // Real-time validation
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return '';
      
      case 'email': {
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        return '';
      }
      
      case 'subject':
        if (!value.trim()) return 'Subject is required';
        if (value.trim().length < 5) return 'Subject must be at least 5 characters';
        return '';
      
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        return '';
      
      default:
        return '';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: FormErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) newErrors[key as keyof FormErrors] = error;
    });
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      setStatus({ type: 'error', message: 'Please fix the errors above' });
      return;
    }
    
    setStatus({ type: 'sending', message: 'Sending message...' });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, you would send the form data to your backend
      console.log('Form submitted:', formData);
      
      setStatus({ type: 'success', message: 'Message sent successfully! I\'ll get back to you soon.' });
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Trigger success animation
      createSuccessParticles();
      
    } catch {
      setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
    }
  };

  const createSuccessParticles = () => {
    const container = particlesRef.current;
    if (!container) return;

    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'success-particle';
      particle.style.cssText = `
        position: absolute;
        width: 6px;
        height: 6px;
        background: #10b981;
        border-radius: 50%;
        pointer-events: none;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        opacity: 1;
        animation: explode 1s ease-out forwards;
        animation-delay: ${i * 50}ms;
      `;
      
      container.appendChild(particle);
      
      // Remove particle after animation
      setTimeout(() => {
        if (container.contains(particle)) {
          container.removeChild(particle);
        }
      }, 1000 + i * 50);
    }
  };

  const getFieldStatus = (fieldName: string) => {
    if (errors[fieldName as keyof FormErrors]) return 'error';
    if (formData[fieldName as keyof FormData] && !errors[fieldName as keyof FormErrors]) return 'valid';
    return 'default';
  };

  const getFieldIcon = (fieldName: string) => {
    const status = getFieldStatus(fieldName);
    if (status === 'valid') return <Check size={16} className="text-emerald-500" />;
    if (status === 'error') return <X size={16} className="text-red-500" />;
    return null;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Add custom CSS for particles animation
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes explode {
        0% {
          transform: translate(-50%, -50%) scale(1);
          opacity: 1;
        }
        100% {
          transform: translate(-50%, -50%) translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(0);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="relative">
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none z-10" />
      
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className={`space-y-6 transition-all duration-700 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
        }`}
      >
        {/* Name Field */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center space-x-2">
            <User size={16} />
            <span>Full Name</span>
          </label>
          <div className="relative">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
              className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 ${
                getFieldStatus('name') === 'error'
                  ? 'border-red-500 bg-red-50 dark:bg-red-950/20'
                  : getFieldStatus('name') === 'valid'
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20'
                  : focusedField === 'name'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20'
                  : 'border-gray-300 dark:border-gray-600'
              } bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              placeholder="Enter your full name"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {getFieldIcon('name')}
            </div>
          </div>
          {errors.name && (
            <div className="flex items-center space-x-1 text-red-500 text-sm animate-fade-in">
              <AlertCircle size={14} />
              <span>{errors.name}</span>
            </div>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center space-x-2">
            <Mail size={16} />
            <span>Email Address</span>
          </label>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 ${
                getFieldStatus('email') === 'error'
                  ? 'border-red-500 bg-red-50 dark:bg-red-950/20'
                  : getFieldStatus('email') === 'valid'
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20'
                  : focusedField === 'email'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20'
                  : 'border-gray-300 dark:border-gray-600'
              } bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              placeholder="your.email@example.com"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {getFieldIcon('email')}
            </div>
          </div>
          {errors.email && (
            <div className="flex items-center space-x-1 text-red-500 text-sm animate-fade-in">
              <AlertCircle size={14} />
              <span>{errors.email}</span>
            </div>
          )}
        </div>

        {/* Subject Field */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center space-x-2">
            <Sparkles size={16} />
            <span>Subject</span>
          </label>
          <div className="relative">
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              onFocus={() => setFocusedField('subject')}
              onBlur={() => setFocusedField(null)}
              className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 ${
                getFieldStatus('subject') === 'error'
                  ? 'border-red-500 bg-red-50 dark:bg-red-950/20'
                  : getFieldStatus('subject') === 'valid'
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20'
                  : focusedField === 'subject'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20'
                  : 'border-gray-300 dark:border-gray-600'
              } bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              placeholder="What's this about?"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {getFieldIcon('subject')}
            </div>
          </div>
          {errors.subject && (
            <div className="flex items-center space-x-1 text-red-500 text-sm animate-fade-in">
              <AlertCircle size={14} />
              <span>{errors.subject}</span>
            </div>
          )}
        </div>

        {/* Message Field */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center space-x-2">
            <MessageSquare size={16} />
            <span>Message</span>
          </label>
          <div className="relative">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              onFocus={() => setFocusedField('message')}
              onBlur={() => setFocusedField(null)}
              rows={5}
              className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 resize-none ${
                getFieldStatus('message') === 'error'
                  ? 'border-red-500 bg-red-50 dark:bg-red-950/20'
                  : getFieldStatus('message') === 'valid'
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20'
                  : focusedField === 'message'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20'
                  : 'border-gray-300 dark:border-gray-600'
              } bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              placeholder="Tell me about your project or question..."
            />
            <div className="absolute right-3 top-3">
              {getFieldIcon('message')}
            </div>
          </div>
          {errors.message && (
            <div className="flex items-center space-x-1 text-red-500 text-sm animate-fade-in">
              <AlertCircle size={14} />
              <span>{errors.message}</span>
            </div>
          )}
          <div className="text-xs text-gray-500 dark:text-gray-400 flex justify-between">
            <span>Minimum 10 characters</span>
            <span className={formData.message.length >= 10 ? 'text-emerald-500' : ''}>
              {formData.message.length} characters
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status.type === 'sending'}
          className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 flex items-center justify-center space-x-2 ${
            status.type === 'sending'
              ? 'bg-gray-400 cursor-not-allowed'
              : status.type === 'success'
              ? 'bg-emerald-600 hover:bg-emerald-700'
              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 hover:shadow-lg'
          }`}
        >
          {status.type === 'sending' ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Sending...</span>
            </>
          ) : status.type === 'success' ? (
            <>
              <Check size={20} />
              <span>Sent!</span>
            </>
          ) : (
            <>
              <Send size={20} />
              <span>Send Message</span>
            </>
          )}
        </button>

        {/* Status Message */}
        {status.message && (
          <div className={`p-4 rounded-lg border text-center transition-all duration-300 ${
            status.type === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300'
              : status.type === 'error'
              ? 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300'
              : 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300'
          }`}>
            {status.message}
          </div>
        )}
      </form>
    </div>
  );
};

export default InteractiveContactForm;