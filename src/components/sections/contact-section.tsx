'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { SITE } from '@/lib/constants';
import { SOCIAL_LINKS } from '@/lib/constants';
import {
  Mail,
  Send,
  Github,
  Linkedin,
  MapPin,
  Terminal,
  Zap,
} from 'lucide-react';
import { AnimatedGrid } from './animated-grid';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

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
    <section id="contact" className="relative py-20">
      <AnimatedGrid />

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-primary mb-4 font-mono text-4xl font-bold md:text-5xl">
            {'> contact'}
            <span className="animate-pulse">_</span>
          </h2>
          <p className="text-secondary mx-auto max-w-3xl text-xl">
            Ready to build something amazing together? Let&rsquo;s connect and
            discuss your next project
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-background-secondary/60 border-primary/10 rounded-lg border p-8 backdrop-blur-sm">
              <div className="mb-6">
                <h3 className="text-primary mb-2 flex items-center gap-2 text-2xl font-bold">
                  <Terminal className="h-6 w-6" />
                  Send a Message
                </h3>
                <p className="text-secondary">
                  I&rsquo;ll get back to you within 24 hours
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="text-primary mb-2 block font-mono text-sm"
                  >
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
                      'bg-background-secondary border-primary/20 w-full rounded-lg border px-4 py-3',
                      'text-primary placeholder-secondary',
                      'focus:border-primary focus:shadow-neon-primary-sm focus:outline-none',
                      'font-mono transition-all duration-300'
                    )}
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="text-primary mb-2 block font-mono text-sm"
                  >
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
                      'bg-background-secondary border-primary/20 w-full rounded-lg border px-4 py-3',
                      'text-primary placeholder-secondary',
                      'focus:border-primary focus:shadow-neon-primary-sm focus:outline-none',
                      'font-mono transition-all duration-300'
                    )}
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="text-primary mb-2 block font-mono text-sm"
                  >
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
                      'bg-background-secondary border-primary/20 w-full rounded-lg border px-4 py-3',
                      'text-primary placeholder-secondary resize-none',
                      'focus:border-primary focus:shadow-neon-primary-sm focus:outline-none',
                      'font-mono transition-all duration-300'
                    )}
                    placeholder="Let&rsquo;s talk about your project..."
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-secondary text-xs">
                    <Zap className="mr-1 inline h-4 w-4" />
                    Response time: ~24 hours
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="min-w-[120px]"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <div className="border-primary/30 border-t-primary h-4 w-4 animate-spin rounded-full border-2"></div>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
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
                  className="bg-success/10 border-success/30 text-success mt-4 rounded-lg border p-4 text-sm"
                >
                  Message sent successfully! I&rsquo;ll get back to you soon.
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-error/10 border-error/30 text-error mt-4 rounded-lg border p-4 text-sm"
                >
                  Oops! Something went wrong. Please try again or email me
                  directly.
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
            <div className="bg-background-secondary/60 border-primary/10 rounded-lg border p-8 backdrop-blur-sm">
              <h3 className="text-primary mb-6 flex items-center gap-2 text-2xl font-bold">
                <MapPin className="h-6 w-6" />
                Get in Touch
              </h3>

              <div className="space-y-4">
                <div className="text-secondary flex items-center gap-3">
                  <Mail className="text-primary h-5 w-5" />
                  <a
                    href={`mailto:${SITE.email}`}
                    className="hover:text-primary transition-colors"
                  >
                    {SITE.email}
                  </a>
                </div>

                <div className="text-secondary">
                  <div className="mb-1 text-xs tracking-wider uppercase">
                    Location
                  </div>
                  <div className="text-sm">Remote - Available Worldwide</div>
                </div>

                <div className="text-secondary">
                  <div className="mb-1 text-xs tracking-wider uppercase">
                    Availability
                  </div>
                  <div className="text-success flex items-center gap-2 text-sm">
                    <span className="bg-success h-2 w-2 animate-pulse rounded-full"></span>
                    Open for Opportunities
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-background-secondary/60 border-primary/10 rounded-lg border p-8 backdrop-blur-sm">
              <h3 className="text-primary mb-6 text-2xl font-bold">
                Connect Socially
              </h3>

              <div className="space-y-4">
                {SOCIAL_LINKS.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-primary/20 hover:border-primary/50 hover:shadow-neon-primary-sm flex items-center justify-between rounded-lg border p-3 transition-all duration-300"
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-primary">{link.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-secondary text-xs">→</span>
                      {link.name === 'GitHub' && <Github className="h-5 w-5" />}
                      {link.name === 'LinkedIn' && (
                        <Linkedin className="h-5 w-5" />
                      )}
                      {link.name === 'Email' && <Mail className="h-5 w-5" />}
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
              className="from-primary/10 to-accent/10 border-primary/20 rounded-lg border bg-gradient-to-r p-8 text-center"
            >
              <h3 className="text-primary mb-3 text-xl font-bold">
                Let&rsquo;s Build Something Amazing
              </h3>
              <p className="text-secondary mb-6">
                Whether you have a project in mind or just want to connect,
                I&rsquo;m always excited to meet fellow developers and creators.
              </p>
              <div className="flex justify-center gap-3">
                <Button size="lg" asChild>
                  <a href={`mailto:${SITE.email}`}>
                    <Mail className="mr-2 h-4 w-4" />
                    Email Me
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a
                    href={SITE.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-2 h-4 w-4" />
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
