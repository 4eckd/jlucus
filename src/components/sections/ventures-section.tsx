'use client';

import { motion } from 'framer-motion';
import { Venture, VENTURES } from '@/data/ventures';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  ExternalLink,
  Github,
  TrendingUp,
  Users,
  DollarSign,
} from 'lucide-react';
import { AnimatedGrid } from './animated-grid';

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
    building: 'bg-secondary border-warning/20',
    launching: 'bg-secondary border-accent/20',
    growing: 'bg-secondary border-success/20',
    scaling: 'bg-secondary border-primary/20',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      className="group"
    >
      <div
        className={cn(
          'bg-background-secondary hover:border-primary/50 hover:shadow-neon-primary-lg relative cursor-pointer border-2 p-6 transition-all duration-300 hover:scale-105',
          statusBg[venture.status]
        )}
      >
        {/* Hexagon corner decorations */}
        <div className="border-primary/30 absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2"></div>
        <div className="border-primary/30 absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2"></div>
        <div className="border-primary/30 absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2"></div>
        <div className="border-primary/30 absolute right-0 bottom-0 h-4 w-4 border-r-2 border-b-2"></div>

        {/* Status indicator */}
        <div className="mb-4 flex items-center justify-between">
          <span
            className={cn(
              'font-mono text-xs tracking-wider uppercase',
              statusColors[venture.status]
            )}
          >
            <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-current"></span>
            {venture.status}
          </span>
          <div className="flex gap-1">
            <span className="text-secondary font-mono text-xs">⬢</span>
          </div>
        </div>

        {/* Venture Info */}
        <h3 className="text-primary group-hover:text-accent mb-2 text-xl font-bold transition-colors">
          {venture.title}
        </h3>

        <p className="text-secondary mb-4 line-clamp-3 text-sm">
          {venture.description}
        </p>

        {/* Tech Stack */}
        <div className="mb-4 flex flex-wrap gap-2">
          {venture.tech.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="bg-primary/10 text-primary rounded px-2 py-1 font-mono text-xs"
            >
              {tech}
            </span>
          ))}
          {venture.tech.length > 3 && (
            <span className="bg-primary/10 text-primary rounded px-2 py-1 font-mono text-xs">
              +{venture.tech.length - 3}
            </span>
          )}
        </div>

        {/* Metrics */}
        {venture.metrics && (
          <div className="grid grid-cols-3 gap-3 text-center">
            {venture.metrics.users && (
              <div>
                <Users className="text-secondary mx-auto mb-1 h-4 w-4" />
                <div className="text-primary text-sm font-bold">
                  {venture.metrics.users}
                </div>
                <div className="text-secondary text-xs">Users</div>
              </div>
            )}
            {venture.metrics.growth && (
              <div>
                <TrendingUp className="text-secondary mx-auto mb-1 h-4 w-4" />
                <div className="text-success text-sm font-bold">
                  {venture.metrics.growth}
                </div>
                <div className="text-secondary text-xs">Growth</div>
              </div>
            )}
            {venture.metrics.revenue && (
              <div>
                <DollarSign className="text-secondary mx-auto mb-1 h-4 w-4" />
                <div className="text-accent text-sm font-bold">
                  {venture.metrics.revenue}
                </div>
                <div className="text-secondary text-xs">Revenue</div>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="border-primary/10 mt-4 flex gap-2 border-t pt-4">
          {venture.github && (
            <Button variant="ghost" size="sm" asChild>
              <a
                href={venture.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" />
              </a>
            </Button>
          )}
          {venture.website && (
            <Button variant="ghost" size="sm" asChild>
              <a
                href={venture.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4" />
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
    <section id="ventures" className="relative py-20">
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
            {'> ventures'}
            <span className="animate-pulse">_</span>
          </h2>
          <p className="text-secondary mx-auto max-w-3xl text-xl">
            Building innovative solutions at the intersection of blockchain, AI,
            and decentralized systems
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
          {VENTURES.map((venture, index) => (
            <HexCard key={venture.id} venture={venture} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default VenturesSection;
