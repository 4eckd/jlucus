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
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Animated Grid Background */}
      <AnimatedGrid />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          className="mx-auto max-w-4xl space-y-8 text-center"
          variants={itemVariants}
        >
          {/* Terminal Window */}
          <motion.div
            className="terminal-box bg-background-secondary/80 border-primary/10 shadow-neon-primary-lg overflow-hidden rounded-lg border backdrop-blur-sm"
            variants={itemVariants}
          >
            {/* Terminal Header */}
            <div className="bg-dark-400 border-primary/10 flex items-center gap-2 border-b px-4 py-2">
              <div className="flex gap-2">
                <div className="bg-error h-3 w-3 rounded-full"></div>
                <div className="bg-warning h-3 w-3 rounded-full"></div>
                <div className="bg-success h-3 w-3 rounded-full"></div>
              </div>
              <div className="flex-1 text-center">
                <span className="text-secondary font-mono text-xs">
                  terminal@jlucus.dev
                </span>
              </div>
            </div>

            {/* Terminal Content */}
            <div className="space-y-4 p-6 text-left font-mono">
              {/* Welcome Message */}
              <div className="space-y-2">
                <div className="text-primary">
                  <span className="text-secondary">$</span> whoami
                </div>
                <div className="text-secondary ml-4">
                  <span className="text-primary">jlucus</span> - Engineer,
                  Builder, Architect
                </div>
              </div>

              {/* Animated Command */}
              <div className="text-primary">
                <span className="text-secondary">$</span> {displayedText}
                <span className="animate-pulse">_</span>
              </div>

              {/* System Info */}
              <div className="text-secondary space-y-2 text-sm">
                <div className="text-primary">$ system --info</div>
                <div className="ml-4 space-y-1">
                  <div>
                    ├── Location:{' '}
                    <span className="text-primary">Cloud, Remote</span>
                  </div>
                  <div>
                    ├── Focus:{' '}
                    <span className="text-primary">Blockchain • AI • Web3</span>
                  </div>
                  <div>
                    ├── Status:{' '}
                    <span className="text-success">● Available for hire</span>
                  </div>
                  <div>
                    └── Skills:{' '}
                    <span className="text-primary">
                      Full-Stack • DevOps • Architecture
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h1 className="text-4xl font-bold md:text-6xl lg:text-7xl">
              <span className="text-primary">{'> jlucus'}</span>
              <span className="text-primary animate-pulse">_</span>
            </h1>
            <p className="text-secondary mx-auto max-w-2xl text-xl md:text-2xl">
              Building the future of{' '}
              <span className="text-primary">decentralized</span> and{' '}
              <span className="text-accent">intelligent</span> systems
            </p>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button size="lg" className="group">
              Explore My Work
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>

            <div className="flex gap-3">
              <Button variant="outline" size="icon" asChild>
                <a href={SITE.github} target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                </a>
              </Button>

              <Button variant="outline" size="icon" asChild>
                <a href={`mailto:${SITE.email}`}>
                  <Mail className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 gap-6 pt-8 md:grid-cols-4"
          >
            {[
              { label: 'Projects', value: '50+' },
              { label: 'Commits', value: '10K+' },
              { label: 'Stars', value: '2K+' },
              { label: 'Years', value: '5+' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-primary text-2xl font-bold">
                  {stat.value}
                </div>
                <div className="text-secondary text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 transform"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="border-primary flex h-10 w-6 justify-center rounded-full border-2">
          <div className="bg-primary mt-2 h-3 w-1 rounded-full"></div>
        </div>
      </motion.div>
    </motion.section>
  );
}

export default HeroTerminal;
