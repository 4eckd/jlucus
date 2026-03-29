'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TERMINAL_COMMANDS, SITE } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { ArrowRight, Github, Mail } from 'lucide-react';
import { AnimatedGrid } from './animated-grid';

export function HeroTerminal() {
  const [currentCommand, setCurrentCommand] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const command = TERMINAL_COMMANDS[currentCommand];
    let index = 0;
    let typingTimer: NodeJS.Timeout;

    if (isTyping && command) {
      typingTimer = setInterval(() => {
        if (index < command.length) {
          setDisplayedText(command.slice(0, index + 1));
          index++;
        } else {
          setIsTyping(false);
          setTimeout(() => {
            setCurrentCommand((prev) => (prev + 1) % TERMINAL_COMMANDS.length);
            setDisplayedText('');
            setIsTyping(true);
          }, 2000);
        }
      }, 100);
    }

    return () => {
      if (typingTimer) clearInterval(typingTimer);
    };
  }, [currentCommand, isTyping]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      id="hero"
      className="min-h-screen flex items-stretch relative overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Left Panel — Info & CTAs */}
      <div className="w-full lg:w-1/2 flex items-center justify-center relative z-10 px-8 py-20">
        <motion.div className="max-w-xl w-full space-y-8" variants={itemVariants}>
          {/* Main Title */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span className="text-primary">{'> jlucus'}</span>
              <span className="text-primary animate-pulse">_</span>
            </h1>
            <p className="text-lg md:text-xl text-secondary">
              Building the future of <span className="text-primary">decentralized</span> and{' '}
              <span className="text-accent">intelligent</span> systems
            </p>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 items-start"
          >
            <Button size="lg" className="group">
              Explore My Work
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>

            <div className="flex gap-3">
              <Button variant="outline" size="icon" asChild>
                <a href={SITE.github} target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5" />
                </a>
              </Button>

              <Button variant="outline" size="icon" asChild>
                <a href={`mailto:${SITE.email}`}>
                  <Mail className="w-5 h-5" />
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4"
          >
            {[
              { label: 'Projects', value: '50+' },
              { label: 'Commits', value: '10K+' },
              { label: 'Stars', value: '2K+' },
              { label: 'Years', value: '5+' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-secondary">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Right Panel — Terminal Window with AnimatedGrid */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center relative overflow-hidden">
        {/* Contained animated grid as right-panel background */}
        <AnimatedGrid contained />

        {/* Terminal Window */}
        <motion.div
          className="relative z-10 w-full max-w-lg mx-8 terminal-box bg-background-secondary/80 backdrop-blur-sm border border-primary/10 rounded-lg overflow-hidden shadow-neon-primary-lg"
          variants={itemVariants}
        >
          {/* Terminal Header */}
          <div className="flex items-center gap-2 px-4 py-2 bg-tertiary border-b border-primary/10">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-error"></div>
              <div className="w-3 h-3 rounded-full bg-warning"></div>
              <div className="w-3 h-3 rounded-full bg-success"></div>
            </div>
            <div className="flex-1 text-center">
              <span className="text-xs text-secondary font-mono">terminal@jlucus.dev</span>
            </div>
          </div>

          {/* Terminal Content */}
          <div className="p-6 font-mono text-left space-y-4">
            {/* Welcome Message */}
            <div className="space-y-2">
              <div className="text-primary">
                <span className="text-secondary">$</span> whoami
              </div>
              <div className="text-secondary ml-4">
                <span className="text-primary">jlucus</span> - Engineer, Builder, Architect
              </div>
            </div>

            {/* Animated Command */}
            <div className="text-primary">
              <span className="text-secondary">$</span> {displayedText}
              <span className="animate-pulse">_</span>
            </div>

            {/* System Info */}
            <div className="space-y-2 text-sm text-secondary">
              <div className="text-primary">$ system --info</div>
              <div className="ml-4 space-y-1">
                <div>├── Location: <span className="text-primary">Cloud, Remote</span></div>
                <div>├── Focus: <span className="text-primary">Blockchain • AI • Web3</span></div>
                <div>├── Status: <span className="text-success">● Available for hire</span></div>
                <div>└── Skills: <span className="text-primary">Full-Stack • DevOps • Architecture</span></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile: Terminal below the fold (shown only on small screens) */}
      <div className="lg:hidden absolute inset-0 z-0 opacity-30 pointer-events-none">
        <AnimatedGrid />
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2"></div>
        </div>
      </motion.div>
    </motion.section>
  );
}

export default HeroTerminal;
