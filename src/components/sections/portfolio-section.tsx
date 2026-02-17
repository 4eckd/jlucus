'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Project, PROJECTS } from '@/data/projects';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Calendar, Star, GitFork } from 'lucide-react';
import { AnimatedGrid } from './animated-grid';

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const categoryColors = {
    web: 'border-primary/50',
    mobile: 'border-accent/50',
    ai: 'border-warning/50',
    blockchain: 'border-secondary/50',
    infrastructure: 'border-success/50',
    tools: 'border-error/50',
  };

  const categoryBg = {
    web: 'bg-primary/10',
    mobile: 'bg-accent/10',
    ai: 'bg-warning/10',
    blockchain: 'bg-secondary/10',
    infrastructure: 'bg-success/10',
    tools: 'bg-error/10',
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      viewport={{ once: true }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          'relative overflow-hidden rounded-lg border-2 transition-all duration-300',
          'bg-background-secondary/60 backdrop-blur-sm',
          'hover:scale-105',
          categoryColors[project.category],
          isHovered && 'shadow-neon-primary-lg'
        )}
      >
        {/* Project Header */}
        <div className="border-primary/10 from-primary/5 to-accent/5 relative border-b bg-gradient-to-r p-6">
          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-4 right-4">
              <span className="bg-accent/20 border-accent/50 text-accent rounded border px-2 py-1 font-mono text-xs">
                ⭐ Featured
              </span>
            </div>
          )}

          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-primary group-hover:text-accent mb-2 text-xl font-bold transition-colors">
                {project.title}
              </h3>
              <p className="text-secondary mb-3 text-sm">
                {project.description}
              </p>

              {/* Meta Info */}
              <div className="text-muted flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{project.date}</span>
                </div>

                {project.metrics?.stars && (
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    <span>{project.metrics.stars}</span>
                  </div>
                )}

                {project.metrics?.forks && (
                  <div className="flex items-center gap-1">
                    <GitFork className="h-3 w-3" />
                    <span>{project.metrics.forks}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Project Content */}
        <div className="p-6">
          {/* Category Badge */}
          <div className="mb-4">
            <span
              className={cn(
                'inline-block rounded px-3 py-1 font-mono text-xs',
                categoryBg[project.category]
              )}
            >
              {project.category.toUpperCase()}
            </span>
          </div>

          {/* Tech Stack */}
          <div className="mb-4 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="bg-primary/10 text-primary/80 border-primary/20 rounded border px-2 py-1 font-mono text-xs"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Summary */}
          <p className="text-secondary mb-4 line-clamp-3 text-sm">
            {project.content}
          </p>

          {/* Action Buttons */}
          <div className="flex gap-2">
            {project.github && (
              <Button variant="outline" size="sm" asChild>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-1 h-4 w-4" />
                  Code
                </a>
              </Button>
            )}

            {project.demo && (
              <Button size="sm" asChild>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-1 h-4 w-4" />
                  Live Demo
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Hover Overlay */}
        <motion.div
          className="from-background/80 via-background/40 pointer-events-none absolute inset-0 bg-gradient-to-t to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.article>
  );
}

export function PortfolioSection() {
  const [filter, setFilter] = useState<string>('all');

  const categories = [
    'all',
    'web',
    'mobile',
    'ai',
    'blockchain',
    'infrastructure',
    'tools',
  ];

  const filteredProjects =
    filter === 'all'
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === filter);

  return (
    <section id="portfolio" className="relative py-20">
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
            {'> portfolio'}
            <span className="animate-pulse">_</span>
          </h2>
          <p className="text-secondary mx-auto max-w-3xl text-xl">
            A curated collection of my recent work, from experimental prototypes
            to production-ready applications
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-wrap justify-center gap-2"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={filter === category ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setFilter(category)}
              className="font-mono text-xs"
            >
              {category === 'all' ? 'ALL PROJECTS' : category.toUpperCase()}
              {category !== 'all' && (
                <span className="text-secondary ml-2">
                  ({PROJECTS.filter((p) => p.category === category).length})
                </span>
              )}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-12 text-center"
          >
            <div className="text-secondary mb-4">
              <div className="mb-2 text-4xl">🔍</div>
              <p>No projects found in {filter.toUpperCase()} category</p>
            </div>
            <Button variant="outline" onClick={() => setFilter('all')}>
              View All Projects
            </Button>
          </motion.div>
        )}

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-background-secondary/60 border-primary/10 inline-flex items-center gap-6 rounded-lg border px-6 py-3 backdrop-blur-sm">
            <div className="text-center">
              <div className="text-primary text-2xl font-bold">
                {PROJECTS.length}
              </div>
              <div className="text-secondary text-xs">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-accent text-2xl font-bold">
                {PROJECTS.filter((p) => p.featured).length}
              </div>
              <div className="text-secondary text-xs">Featured</div>
            </div>
            <div className="text-center">
              <div className="text-success text-2xl font-bold">
                {PROJECTS.reduce((sum, p) => sum + (p.metrics?.stars || 0), 0)}
              </div>
              <div className="text-secondary text-xs">Total Stars</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default PortfolioSection;
