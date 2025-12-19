'use client';

import { motion } from 'framer-motion';
import { Venture, VENTURES } from '@/data/ventures';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, TrendingUp, Users, DollarSign } from 'lucide-react';

interface HexCardProps {
  venture: Venture;
  index: number;
}

function HexCard({ venture, index }: HexCardProps) {
  const statusColors = {
    building: 'text-warning',
    launching: 'text-accent', 
    growing: 'text-success',
    scaling: 'text-primary',
  };

  const statusBg = {
    building: 'bg-dark-800 border-warning/20',
    launching: 'bg-dark-800 border-accent/20',
    growing: 'bg-dark-800 border-success/20', 
    scaling: 'bg-dark-800 border-primary/20',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className={cn(
        "relative p-6 bg-background-secondary border-2 transition-all duration-300 hover:border-primary/50 hover:shadow-neon-primary-lg hover:scale-105 cursor-pointer",
        statusBg[venture.status]
      )}>
        {/* Hexagon corner decorations */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary/30"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary/30"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary/30"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary/30"></div>

        {/* Status indicator */}
        <div className="flex items-center justify-between mb-4">
          <span className={cn(
            "text-xs font-mono uppercase tracking-wider",
            statusColors[venture.status]
          )}>
            <span className="inline-block w-2 h-2 rounded-full bg-current mr-2 animate-pulse"></span>
            {venture.status}
          </span>
          <div className="flex gap-1">
            <span className="text-xs text-secondary font-mono">⬢</span>
          </div>
        </div>

        {/* Venture Info */}
        <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
          {venture.title}
        </h3>
        
        <p className="text-sm text-secondary mb-4 line-clamp-3">
          {venture.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {venture.tech.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-1 bg-primary/10 text-primary rounded font-mono"
            >
              {tech}
            </span>
          ))}
          {venture.tech.length > 3 && (
            <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded font-mono">
              +{venture.tech.length - 3}
            </span>
          )}
        </div>

        {/* Metrics */}
        {venture.metrics && (
          <div className="grid grid-cols-3 gap-3 text-center">
            {venture.metrics.users && (
              <div>
                <Users className="w-4 h-4 mx-auto mb-1 text-secondary" />
                <div className="text-sm font-bold text-primary">{venture.metrics.users}</div>
                <div className="text-xs text-secondary">Users</div>
              </div>
            )}
            {venture.metrics.growth && (
              <div>
                <TrendingUp className="w-4 h-4 mx-auto mb-1 text-secondary" />
                <div className="text-sm font-bold text-success">{venture.metrics.growth}</div>
                <div className="text-xs text-secondary">Growth</div>
              </div>
            )}
            {venture.metrics.revenue && (
              <div>
                <DollarSign className="w-4 h-4 mx-auto mb-1 text-secondary" />
                <div className="text-sm font-bold text-accent">{venture.metrics.revenue}</div>
                <div className="text-xs text-secondary">Revenue</div>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4 pt-4 border-t border-primary/10">
          {venture.github && (
            <Button variant="ghost" size="sm" asChild>
              <a href={venture.github} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4" />
              </a>
            </Button>
          )}
          {venture.website && (
            <Button variant="ghost" size="sm" asChild>
              <a href={venture.website} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function VenturesSection() {
  return (
    <section id="ventures" className="py-20 relative">
      <div className="absolute inset-0 bg-grid opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-mono">
            {'> ventures'}
            <span className="animate-pulse">_</span>
          </h2>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            Building innovative solutions at the intersection of blockchain, AI, and decentralized systems
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {VENTURES.map((venture, index) => (
            <HexCard key={venture.id} venture={venture} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default VenturesSection;
