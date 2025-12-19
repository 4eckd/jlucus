'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Project, PROJECTS } from '@/data/projects';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Calendar, Star, GitFork } from 'lucide-react';

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
      <div className={cn(
        "relative overflow-hidden rounded-lg border-2 transition-all duration-300",
        "bg-background-secondary/60 backdrop-blur-sm",
        "hover:scale-105",
        categoryColors[project.category],
        isHovered && "shadow-neon-primary-lg"
      )}>
        {/* Project Header */}
        <div className="relative p-6 border-b border-primary/10 bg-gradient-to-r from-primary/5 to-accent/5">
          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-4 right-4">
              <span className="px-2 py-1 bg-accent/20 border border-accent/50 rounded text-xs font-mono text-accent">
                ⭐ Featured
              </span>
            </div>
          )}

          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-secondary mb-3">
                {project.description}
              </p>
              
              {/* Meta Info */}
              <div className="flex items-center gap-4 text-xs text-muted">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{project.date}</span>
                </div>
                
                {project.metrics?.stars && (
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    <span>{project.metrics.stars}</span>
                  </div>
                )}
                
                {project.metrics?.forks && (
                  <div className="flex items-center gap-1">
                    <GitFork className="w-3 h-3" />
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
            <span className={cn(
              "inline-block px-3 py-1 text-xs font-mono rounded",
              categoryBg[project.category]
            )}>
              {project.category.toUpperCase()}
            </span>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="text-xs px-2 py-1 bg-primary/10 text-primary/80 rounded font-mono border border-primary/20"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Summary */}
          <p className="text-sm text-secondary mb-4 line-clamp-3">
            {project.content}
          </p>

          {/* Action Buttons */}
          <div className="flex gap-2">
            {project.github && (
              <Button variant="outline" size="sm" asChild>
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-1" />
                  Code
                </a>
              </Button>
            )}
            
            {project.demo && (
              <Button size="sm" asChild>
                <a href={project.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Live Demo
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Hover Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/40 to-transparent pointer-events-none"
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
  
  const categories = ['all', 'web', 'mobile', 'ai', 'blockchain', 'infrastructure', 'tools'];
  
  const filteredProjects = filter === 'all' 
    ? PROJECTS 
    : PROJECTS.filter(project => project.category === filter);

  return (
    <section id="portfolio" className="py-20 relative">
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
            {'> portfolio'}
            <span className="animate-pulse">_</span>
          </h2>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            A curated collection of my recent work, from experimental prototypes to production-ready applications
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={filter === category ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter(category)}
              className="text-xs font-mono"
            >
              {category === 'all' ? 'ALL PROJECTS' : category.toUpperCase()}
              {category !== 'all' && (
                <span className="ml-2 text-secondary">
                  ({PROJECTS.filter(p => p.category === category).length})
                </span>
              )}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-secondary mb-4">
              <div className="text-4xl mb-2">🔍</div>
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
          <div className="inline-flex items-center gap-6 px-6 py-3 bg-background-secondary/60 backdrop-blur-sm border border-primary/10 rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{PROJECTS.length}</div>
              <div className="text-xs text-secondary">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">
                {PROJECTS.filter(p => p.featured).length}
              </div>
              <div className="text-xs text-secondary">Featured</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">
                {PROJECTS.reduce((sum, p) => sum + (p.metrics?.stars || 0), 0)}
              </div>
              <div className="text-xs text-secondary">Total Stars</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default PortfolioSection;
