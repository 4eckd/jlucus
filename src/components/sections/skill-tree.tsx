'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SkillCategory, SKILL_CATEGORIES } from '@/data/skills';
import { cn } from '@/lib/utils';
import { ChevronUp, ChevronDown, Award, Zap, Code } from 'lucide-react';
import { AnimatedGrid } from './animated-grid';

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
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Skill Node */}
      <div className="relative">
        {/* Glow effect on hover */}
        <motion.div
          className={cn(
            'absolute inset-0 rounded-full blur-xl transition-all duration-300',
            levelColors[skill.level]
          )}
          animate={{
            scale: isHovered ? 1.5 : 1,
            opacity: isHovered ? 0.6 : 0.3,
          }}
        />

        {/* Main node */}
        <div
          className={cn(
            'relative flex h-16 w-16 cursor-pointer items-center justify-center rounded-full border-2 transition-all duration-300',
            'bg-background-secondary border-primary/30',
            'group-hover:border-primary/60 group-hover:scale-110'
          )}
        >
          {/* Skill level indicator */}
          <div
            className={cn(
              'absolute inset-0 rounded-full border-2 opacity-50',
              levelColors[skill.level],
              'border-current'
            )}
          >
            <div
              className={cn(
                'absolute inset-0 -rotate-45 transform rounded-full border-2 border-transparent border-t-current'
              )}
              style={{
                clipPath: `polygon(50% 50%, 50% 0%, ${50 + levelProgress * 0.5}% 0%, 100% ${levelProgress * 0.5}%, 100% 100%, 50% 100%)`,
              }}
            />
          </div>

          {/* Center icon */}
          <div className="relative z-10">
            <Code className="h-6 w-6" />
          </div>
        </div>

        {/* Hover details */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-background-secondary border-primary/20 shadow-neon-primary-lg absolute bottom-full left-1/2 z-50 mb-2 w-48 -translate-x-1/2 transform rounded-lg border p-3"
          >
            <div className="text-primary mb-1 text-sm font-bold">
              {skill.name}
            </div>
            <div className="text-secondary mb-2 text-xs">
              {skill.description}
            </div>

            {/* XP Progress */}
            <div className="mb-2">
              <div className="mb-1 flex justify-between text-xs">
                <span className="text-secondary">Level {skill.level}</span>
                <span className="text-primary">
                  {skill.xp}/{skill.maxXP} XP
                </span>
              </div>
              <div className="bg-dark-700 h-1 overflow-hidden rounded-full">
                <div
                  className={cn('h-full', levelColors[skill.level])}
                  style={{ width: `${levelProgress}%` }}
                />
              </div>
            </div>

            {/* Projects */}
            {skill.projects && skill.projects.length > 0 && (
              <div className="text-tertiary text-xs">
                <Award className="mr-1 inline h-3 w-3" />
                Applied in {skill.projects.length} project
                {skill.projects.length > 1 ? 's' : ''}
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Skill name label */}
      <div className="mt-2 text-center">
        <div className="text-primary group-hover:text-accent font-mono text-xs transition-colors">
          {skill.name}
        </div>
      </div>
    </motion.div>
  );
}

export function SkillTree() {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );

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
    <section id="skills" className="relative py-20">
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
            {'> skills'}
            <span className="animate-pulse">_</span>
          </h2>
          <p className="text-secondary mx-auto max-w-3xl text-xl">
            Technical expertise across modern development stack, blockchain
            ecosystems, and AI technologies
          </p>
        </motion.div>

        <div className="mx-auto max-w-6xl">
          {/* Category Headers */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SKILL_CATEGORIES.map((category, categoryIndex) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: categoryIndex * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-background-secondary/60 border-primary/10 overflow-hidden rounded-lg border backdrop-blur-sm"
              >
                {/* Category Header */}
                <motion.div
                  className="border-primary/10 from-primary/10 to-accent/10 border-b bg-gradient-to-r p-4"
                  onClick={() => toggleCategory(category.id)}
                >
                  <div className="flex cursor-pointer items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/20 flex h-10 w-10 items-center justify-center rounded-lg">
                        {category.icon === 'Monitor' && (
                          <Code className="text-primary h-5 w-5" />
                        )}
                        {category.icon === 'Server' && (
                          <Code className="text-primary h-5 w-5" />
                        )}
                        {category.icon === 'Network' && (
                          <Code className="text-primary h-5 w-5" />
                        )}
                        {category.icon === 'Cpu' && (
                          <Code className="text-primary h-5 w-5" />
                        )}
                        {category.icon === 'Cloud' && (
                          <Code className="text-primary h-5 w-5" />
                        )}
                        {category.icon === 'Wrench' && (
                          <Code className="text-primary h-5 w-5" />
                        )}
                        {category.icon === 'Code' && (
                          <Code className="text-primary h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-primary text-lg font-bold">
                          {category.name}
                        </h3>
                        <p className="text-secondary text-xs">
                          {category.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-primary">
                      {expandedCategories.has(category.id) ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </div>
                  </div>

                  {/* Category stats */}
                  <div className="mt-3 flex gap-4 text-xs">
                    <span className="text-secondary">
                      {category.skills.length} skills
                    </span>
                    <span className="text-success">
                      {Math.round(
                        category.skills.reduce(
                          (sum, skill) => sum + (skill.xp / skill.maxXP) * 100,
                          0
                        ) / category.skills.length
                      )}
                      % avg
                    </span>
                  </div>
                </motion.div>

                {/* Skills Grid */}
                <motion.div
                  className="p-4"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: expandedCategories.has(category.id) ? 'auto' : 0,
                    opacity: expandedCategories.has(category.id) ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-2 gap-4">
                    {category.skills
                      .slice(
                        0,
                        expandedCategories.has(category.id)
                          ? category.skills.length
                          : 4
                      )
                      .map((skill, skillIndex) => (
                        <SkillNode
                          key={skill.id}
                          skill={skill}
                          index={skillIndex}
                        />
                      ))}
                  </div>

                  {category.skills.length > 4 &&
                    !expandedCategories.has(category.id) && (
                      <div className="mt-2 text-center">
                        <div className="text-secondary text-xs">
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
            <div className="bg-background-secondary/60 border-primary/10 inline-flex items-center gap-4 rounded-lg border px-6 py-3 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <Zap className="text-primary h-5 w-5" />
                <span className="text-secondary text-sm">Total Skills:</span>
                <span className="text-primary text-sm font-bold">
                  {SKILL_CATEGORIES.reduce(
                    (sum, cat) => sum + cat.skills.length,
                    0
                  )}
                </span>
              </div>
              <div className="bg-primary/20 h-4 w-px"></div>
              <div className="flex items-center gap-2">
                <Award className="text-accent h-5 w-5" />
                <span className="text-secondary text-sm">Expert Level:</span>
                <span className="text-accent text-sm font-bold">
                  {SKILL_CATEGORIES.reduce(
                    (sum, cat) =>
                      sum +
                      cat.skills.filter(
                        (s) => s.level === 'expert' || s.level === 'master'
                      ).length,
                    0
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
