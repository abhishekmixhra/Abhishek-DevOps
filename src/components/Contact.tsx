import React, { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Send, Instagram, Youtube } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`New Contact from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:abhishekmishra15102001@gmail.com?subject=${subject}&body=${body}`;
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 scroll-mt-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full blur opacity-30 animate-pulse"></div>
            <span className="relative text-sm font-mono text-white bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-400/30 hover:scale-105 transition-all duration-300">
              💬 <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">Get In Touch</span>
            </span>
          </div>
          <div className="inline-block relative mb-4">
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-2xl blur opacity-20 animate-tilt"></div>
            <h2 className="relative text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent animate-gradient-x bg-300% hover:scale-105 transition-transform duration-300">
              Ready to collaborate?
            </h2>
          </div>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-xl blur opacity-10"></div>
            <p className="relative text-lg text-gray-300 bg-gray-900/30 backdrop-blur-sm p-4 rounded-xl border border-gray-700/30">
              Let's discuss your next project or explore 
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">opportunities to work together</span>
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <div className="group relative glass-morphism p-6 rounded-2xl border border-gray-700/30 hover:border-purple-400/50 transition-all duration-500 h-fit hover-lift">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
              <div className="relative">
                <h3 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300 mb-6">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="group/card interactive-card p-4 rounded-xl border border-blue-600/30 hover:border-blue-400/80 transition-all duration-300 hover:neon-glow-blue">
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-blue-500/30 rounded blur opacity-0 group-hover/card:opacity-60 transition-opacity duration-300"></div>
                      <Mail className="relative text-blue-400 mt-1 group-hover/card:scale-110 transition-transform duration-300" size={18} />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm group-hover/card:text-blue-300 transition-colors duration-300">Email</p>
                      <p className="text-gray-400 text-sm group-hover/card:text-gray-300 transition-colors duration-300">abhishekmishra15102001@gmail.com</p>
                    </div>
                  </div>
                </div>
                
                <div className="interactive-card p-4 rounded-xl border border-emerald-600/30 hover:border-emerald-500/60 transition-all duration-300">
                  <div className="flex items-start space-x-3">
                    <Phone className="text-emerald-400 mt-1 tech-icon" size={18} />
                    <div>
                      <p className="text-white font-semibold text-sm">Phone</p>
                      <p className="text-gray-400 text-sm">+91 79050 68878</p>
                    </div>
                  </div>
                </div>
                
                <div className="interactive-card p-4 rounded-xl border border-orange-600/30 hover:border-orange-500/60 transition-all duration-300">
                  <div className="flex items-start space-x-3">
                    <MapPin className="text-orange-400 mt-1 tech-icon" size={18} />
                    <div>
                      <p className="text-white font-semibold text-sm">Location</p>
                      <p className="text-gray-400 text-sm">Remote • Global</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-6">
                <p className="text-white font-semibold text-sm mb-3">Connect with me</p>
                <div className="flex space-x-3">
                  <a href="https://linkedin.com/in/abhishek-mishra-14b538221" className="interactive-card p-2 bg-blue-600/20 hover:bg-blue-600 rounded-lg transition-all duration-300 border border-blue-600/30" target="_blank" rel="noopener noreferrer">
                    <Linkedin size={16} className="text-blue-400" />
                  </a>
                  <a href="https://github.com/abhishekmixhra" className="interactive-card p-2 bg-gray-700/20 hover:bg-gray-700 rounded-lg transition-all duration-300 border border-gray-600/30" target="_blank" rel="noopener noreferrer">
                    <Github size={16} className="text-gray-400" />
                  </a>
                  <a href="https://instagram.com/abhishekmishra6121" className="interactive-card p-2 bg-pink-600/20 hover:bg-pink-600 rounded-lg transition-all duration-300 border border-pink-600/30" target="_blank" rel="noopener noreferrer">
                    <Instagram size={16} className="text-pink-400" />
                  </a>
                  <a href="https://youtube.com/channel/UCy5pB_taMNCPe7mssaBF56A" className="interactive-card p-2 bg-red-600/20 hover:bg-red-600 rounded-lg transition-all duration-300 border border-red-600/30" target="_blank" rel="noopener noreferrer">
                    <Youtube size={16} className="text-red-400" />
                  </a>
                </div>
              </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="modern-blur p-8 rounded-2xl border border-gray-700/30">
              <h3 className="text-xl font-bold text-white mb-6">Send me a message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      required 
                      className="w-full px-4 py-3 modern-blur border border-gray-600/50 rounded-xl focus:border-blue-500/80 text-white placeholder-gray-500 transition-all duration-300" 
                      placeholder="Abhishek Mishra" 
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      required 
                      className="w-full px-4 py-3 modern-blur border border-gray-600/50 rounded-xl focus:border-blue-500/80 text-white placeholder-gray-500 transition-all duration-300" 
                      placeholder="ab@example.com" 
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    value={formData.message} 
                    onChange={handleChange} 
                    required 
                    rows={6} 
                    className="w-full px-4 py-3 modern-blur border border-gray-600/50 rounded-xl focus:border-blue-500/80 text-white placeholder-gray-500 resize-none transition-all duration-300" 
                    placeholder="Tell me about your project, collaboration ideas, or just say hello..."
                  />
                </div>
                <button 
                  type="submit" 
                  className="interactive-card w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 px-8 py-4 rounded-xl font-semibold transition-all duration-300 text-white glow-on-hover"
                >
                  <div className="flex items-center justify-center space-x-3">
                    <Send size={18} />
                    <span>Mail me</span>
                  </div>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
