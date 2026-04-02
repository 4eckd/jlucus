'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { SITE } from '@/lib/constants';
import { SOCIAL_LINKS } from '@/lib/constants';
import { Mail, Send, Github, Linkedin, MapPin, Terminal, Zap } from 'lucide-react';
import { AnimatedGrid } from './animated-grid';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In production, this would send to a real endpoint
    try {
      console.log('Form submitted:', formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (submissionError) {
      console.error(submissionError);
      setSubmitStatus('error');
    }
    
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-20 relative">
      <AnimatedGrid />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-mono">
            {'> contact'}
            <span className="animate-pulse">_</span>
          </h2>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            Ready to build something amazing together? Let&rsquo;s connect and discuss your next project
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-background-secondary/60 backdrop-blur-sm border border-primary/10 rounded-lg p-8">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-primary mb-2 flex items-center gap-2">
                  <Terminal className="w-6 h-6" />
                  Send a Message
                </h3>
                <p className="text-secondary">
                  I&rsquo;ll get back to you within 24 hours
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-mono text-primary mb-2">
                    {'name:'}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={cn(
                      "w-full px-4 py-3 bg-background-secondary border border-primary/20 rounded-lg",
                      "text-primary placeholder-secondary",
                      "focus:outline-none focus:border-primary focus:shadow-neon-primary-sm",
                      "transition-all duration-300 font-mono"
                    )}
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-mono text-primary mb-2">
                    {'email:'}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={cn(
                      "w-full px-4 py-3 bg-background-secondary border border-primary/20 rounded-lg",
                      "text-primary placeholder-secondary",
                      "focus:outline-none focus:border-primary focus:shadow-neon-primary-sm",
                      "transition-all duration-300 font-mono"
                    )}
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-mono text-primary mb-2">
                    {'message:'}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className={cn(
                      "w-full px-4 py-3 bg-background-secondary border border-primary/20 rounded-lg",
                      "text-primary placeholder-secondary resize-none",
                      "focus:outline-none focus:border-primary focus:shadow-neon-primary-sm",
                      "transition-all duration-300 font-mono"
                    )}
                    placeholder="Let&rsquo;s talk about your project..."
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-xs text-secondary">
                    <Zap className="w-4 h-4 inline mr-1" />
                    Response time: ~24 hours
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="min-w-[120px]"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        Send Message
                      </span>
                    )}
                  </Button>
                </div>
              </form>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-success/10 border border-success/30 rounded-lg text-success text-sm"
                >
                  Message sent successfully! I&rsquo;ll get back to you soon.
                </motion.div>
              )}
              
              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-error/10 border border-error/30 rounded-lg text-error text-sm"
                >
                  Oops! Something went wrong. Please try again or email me directly.
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Contact Info & Links */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Quick Contact Info */}
            <div className="bg-background-secondary/60 backdrop-blur-sm border border-primary/10 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
                <MapPin className="w-6 h-6" />
                Get in Touch
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-secondary">
                  <Mail className="w-5 h-5 text-primary" />
                  <a href={`mailto:${SITE.email}`} className="hover:text-primary transition-colors">
                    {SITE.email}
                  </a>
                </div>
                
                <div className="text-secondary">
                  <div className="text-xs uppercase tracking-wider mb-1">Location</div>
                  <div className="text-sm">Remote - Available Worldwide</div>
                </div>
                
                <div className="text-secondary">
                  <div className="text-xs uppercase tracking-wider mb-1">Availability</div>
                  <div className="text-sm text-success flex items-center gap-2">
                    <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
                    Open for Opportunities
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-background-secondary/60 backdrop-blur-sm border border-primary/10 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-primary mb-6">Connect Socially</h3>
              
              <div className="space-y-4">
                {SOCIAL_LINKS.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 border border-primary/20 rounded-lg hover:border-primary/50 hover:shadow-neon-primary-sm transition-all duration-300"
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-primary">{link.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-secondary">→</span>
                      {link.name === 'GitHub' && <Github className="w-5 h-5" />}
                      {link.name === 'LinkedIn' && <Linkedin className="w-5 h-5" />}
                      {link.name === 'Email' && <Mail className="w-5 h-5" />}
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-8 text-center"
            >
              <h3 className="text-xl font-bold text-primary mb-3">Let&rsquo;s Build Something Amazing</h3>
              <p className="text-secondary mb-6">
                Whether you have a project in mind or just want to connect, I&rsquo;m always excited to meet fellow developers and creators.
              </p>
              <div className="flex gap-3 justify-center">
                <Button size="lg" asChild>
                  <a href={`mailto:${SITE.email}`}>
                    <Mail className="w-4 h-4 mr-2" />
                    Email Me
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href={SITE.github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </a>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
