'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SkillCategory, SKILL_CATEGORIES } from '@/data/skills';
import { cn } from '@/lib/utils';
import { ChevronUp, ChevronDown, Award, Zap, Code } from 'lucide-react';

interface SkillNodeProps {
  skill: SkillCategory['skills'][0];
  index: number;
}

function SkillNode({ skill, index }: SkillNodeProps) {
  const [isHovered, setIsHovered] = useState(false);

  const levelColors = {
    beginner: 'text-secondary',
    intermediate: 'text-warning', 
    advanced: 'text-accent',
    expert: 'text-primary',
    master: 'text-success',
  };

  const levelProgress = (skill.xp / skill.maxXP) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Skill Node */}
      <div className="relative">
        {/* Glow effect on hover */}
        <motion.div
          className={cn(
            "absolute inset-0 rounded-full blur-xl transition-all duration-300",
            levelColors[skill.level]
          )}
          animate={{
            scale: isHovered ? 1.5 : 1,
            opacity: isHovered ? 0.6 : 0.3,
          }}
        />
        
        {/* Main node */}
        <div className={cn(
          "relative w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all duration-300 cursor-pointer",
          "bg-background-secondary border-primary/30",
          "group-hover:border-primary/60 group-hover:scale-110"
        )}>
          {/* Skill level indicator */}
          <div className={cn(
            "absolute inset-0 rounded-full border-2 opacity-50",
            levelColors[skill.level],
            "border-current"
          )}>
            <div 
              className={cn(
                "absolute inset-0 rounded-full border-2 border-transparent border-t-current transform -rotate-45"
              )}
              style={{
                clipPath: `polygon(50% 50%, 50% 0%, ${50 + levelProgress * 0.5}% 0%, 100% ${levelProgress * 0.5}%, 100% 100%, 50% 100%)`
              }}
            />
          </div>

          {/* Center icon */}
          <div className="relative z-10">
            <Code className="w-6 h-6" />
          </div>
        </div>

        {/* Hover details */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-3 bg-background-secondary border border-primary/20 rounded-lg shadow-neon-primary-lg z-50"
          >
            <div className="text-sm font-bold text-primary mb-1">{skill.name}</div>
            <div className="text-xs text-secondary mb-2">{skill.description}</div>
            
            {/* XP Progress */}
            <div className="mb-2">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-secondary">Level {skill.level}</span>
                <span className="text-primary">{skill.xp}/{skill.maxXP} XP</span>
              </div>
              <div className="h-1 bg-dark-700 rounded-full overflow-hidden">
                <div 
                  className={cn("h-full", levelColors[skill.level])}
                  style={{ width: `${levelProgress}%` }}
                />
              </div>
            </div>
            
            {/* Projects */}
            {skill.projects && skill.projects.length > 0 && (
              <div className="text-xs text-tertiary">
                <Award className="w-3 h-3 inline mr-1" />
                Applied in {skill.projects.length} project{skill.projects.length > 1 ? 's' : ''}
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Skill name label */}
      <div className="mt-2 text-center">
        <div className="text-xs font-mono text-primary group-hover:text-accent transition-colors">
          {skill.name}
        </div>
      </div>
    </motion.div>
  );
}

export function SkillTree() {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  return (
    <section id="skills" className="py-20 relative">
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
            {'> skills'}
            <span className="animate-pulse">_</span>
          </h2>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            Technical expertise across modern development stack, blockchain ecosystems, and AI technologies
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Category Headers */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKILL_CATEGORIES.map((category, categoryIndex) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: categoryIndex * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-background-secondary/60 backdrop-blur-sm border border-primary/10 rounded-lg overflow-hidden"
              >
                {/* Category Header */}
                <motion.div
                  className="p-4 border-b border-primary/10 bg-gradient-to-r from-primary/10 to-accent/10"
                  onClick={() => toggleCategory(category.id)}
                >
                  <div className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                        {category.icon === 'Monitor' && <Code className="w-5 h-5 text-primary" />}
                        {category.icon === 'Server' && <Code className="w-5 h-5 text-primary" />}
                        {category.icon === 'Network' && <Code className="w-5 h-5 text-primary" />}
                        {category.icon === 'Cpu' && <Code className="w-5 h-5 text-primary" />}
                        {category.icon === 'Cloud' && <Code className="w-5 h-5 text-primary" />}
                        {category.icon === 'Wrench' && <Code className="w-5 h-5 text-primary" />}
                        {category.icon === 'Code' && <Code className="w-5 h-5 text-primary" />}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-primary">{category.name}</h3>
                        <p className="text-xs text-secondary">{category.description}</p>
                      </div>
                    </div>
                    <div className="text-primary">
                      {expandedCategories.has(category.id) ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </div>
                  </div>
                  
                  {/* Category stats */}
                  <div className="flex gap-4 mt-3 text-xs">
                    <span className="text-secondary">
                      {category.skills.length} skills
                    </span>
                    <span className="text-success">
                      {Math.round(category.skills.reduce((sum, skill) => sum + (skill.xp / skill.maxXP) * 100, 0) / category.skills.length)}% avg
                    </span>
                  </div>
                </motion.div>

                {/* Skills Grid */}
                <motion.div
                  className="p-4"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: expandedCategories.has(category.id) ? 'auto' : 0,
                    opacity: expandedCategories.has(category.id) ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-2 gap-4">
                    {category.skills
                      .slice(0, expandedCategories.has(category.id) ? category.skills.length : 4)
                      .map((skill, skillIndex) => (
                        <SkillNode key={skill.id} skill={skill} index={skillIndex} />
                      ))}
                  </div>
                  
                  {category.skills.length > 4 && !expandedCategories.has(category.id) && (
                    <div className="text-center mt-2">
                      <div className="text-xs text-secondary">
                        +{category.skills.length - 4} more skills
                      </div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Overall Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-4 px-6 py-3 bg-background-secondary/60 backdrop-blur-sm border border-primary/10 rounded-lg">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                <span className="text-sm text-secondary">Total Skills:</span>
                <span className="text-sm font-bold text-primary">{SKILL_CATEGORIES.reduce((sum, cat) => sum + cat.skills.length, 0)}</span>
              </div>
              <div className="w-px h-4 bg-primary/20"></div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-accent" />
                <span className="text-sm text-secondary">Expert Level:</span>
                <span className="text-sm font-bold text-accent">
                  {SKILL_CATEGORIES.reduce((sum, cat) => 
                    sum + cat.skills.filter(s => s.level === 'expert' || s.level === 'master').length, 0
                  )}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default SkillTree;
