'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  Circle,
  Clock,
  Target,
  Rocket,
  Code,
  Sparkles,
  TrendingUp,
  Layers,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  PHASES,
  JOURNEYS,
  GOALS,
  type PhaseStatus,
  type MilestoneItem,
  type Journey,
  type GoalCategory,
} from '@/data/dashboard-data';

/**
 * Project Dashboard Component
 *
 * Visualizes project status, milestones, journeys, and goals
 * Based on PROJECT_INVENTORY.md and PROJECT_ROADMAP.md
 *
 * Issue #136: Comprehensive project visualization
 */

export function ProjectDashboard() {
  const [activeTab, setActiveTab] = useState<'phases' | 'journeys' | 'goals'>('phases');
  const [selectedPhase, setSelectedPhase] = useState<number | null>(null);

  const overallProgress = Math.round(
    PHASES.reduce((sum, phase) => sum + phase.completion, 0) / PHASES.length
  );

  return (
    <section id="project-dashboard" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background-secondary to-background" />

      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
            <Layers className="w-4 h-4 text-primary" />
            <span className="text-sm font-mono text-primary">Project Overview</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-mono mb-6">
            <span className="text-primary">{'>'}</span> Project Dashboard
          </h2>
          <p className="text-xl text-secondary max-w-2xl mx-auto">
            Real-time visualization of development progress, user journeys, and performance goals
          </p>

          {/* Overall Progress */}
          <div className="mt-12 max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-sm text-muted">Overall Completion</span>
              <span className="font-mono text-2xl font-bold text-primary">{overallProgress}%</span>
            </div>
            <div className="h-3 bg-background-secondary rounded-full overflow-hidden border border-primary/20">
              <motion.div
                className="h-full bg-gradient-to-r from-primary via-accent to-secondary"
                initial={{ width: 0 }}
                whileInView={{ width: `${overallProgress}%` }}
                transition={{ duration: 1, delay: 0.3 }}
                viewport={{ once: true }}
                style={{ boxShadow: '0 0 20px rgba(var(--color-primary), 0.5)' }}
              />
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center gap-4 mb-12"
        >
          {[
            { id: 'phases', label: 'Development Phases', icon: Layers },
            { id: 'journeys', label: 'User Journeys', icon: Rocket },
            { id: 'goals', label: 'Goals & Metrics', icon: Target },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={cn(
                'flex items-center gap-2 px-6 py-3 rounded-lg font-mono text-sm transition-all',
                activeTab === tab.id
                  ? 'bg-primary text-black shadow-neon-primary'
                  : 'bg-background-secondary text-muted hover:text-primary border border-primary/10 hover:border-primary/30'
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Content Tabs */}
        <AnimatePresence mode="wait">
          {activeTab === 'phases' && (
            <motion.div
              key="phases"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <PhasesView phases={PHASES} selected={selectedPhase} onSelect={setSelectedPhase} />
            </motion.div>
          )}

          {activeTab === 'journeys' && (
            <motion.div
              key="journeys"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <JourneysView journeys={JOURNEYS} />
            </motion.div>
          )}

          {activeTab === 'goals' && (
            <motion.div
              key="goals"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <GoalsView goals={GOALS} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// Phases View Component
function PhasesView({
  phases,
  selected,
  onSelect
}: {
  phases: PhaseStatus[];
  selected: number | null;
  onSelect: (phase: number | null) => void;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {phases.map((phase, index) => (
        <motion.div
          key={phase.phase}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          onClick={() => onSelect(selected === phase.phase ? null : phase.phase)}
          className={cn(
            'bg-background-secondary border rounded-lg p-6 cursor-pointer transition-all',
            selected === phase.phase
              ? 'border-primary shadow-neon-primary'
              : 'border-primary/10 hover:border-primary/30'
          )}
        >
          {/* Phase Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {phase.status === 'completed' && <CheckCircle2 className="w-5 h-5 text-success" />}
                {phase.status === 'in-progress' && <Clock className="w-5 h-5 text-primary animate-pulse" />}
                {phase.status === 'planned' && <Circle className="w-5 h-5 text-muted" />}
                <span className="font-mono text-sm text-muted">Phase {phase.phase}</span>
              </div>
              <h3 className="text-2xl font-bold font-mono text-primary mb-2">{phase.name}</h3>
              <p className="text-sm text-secondary">{phase.description}</p>
            </div>
            <span className="text-3xl font-bold font-mono text-primary">{phase.completion}%</span>
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-background rounded-full overflow-hidden mb-4">
            <div
              className={cn(
                'h-full transition-all duration-1000',
                phase.status === 'completed' && 'bg-success',
                phase.status === 'in-progress' && 'bg-primary',
                phase.status === 'planned' && 'bg-muted'
              )}
              style={{ width: `${phase.completion}%` }}
            />
          </div>

          {/* Items Summary */}
          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-success" />
              <span className="text-muted">
                {phase.items.filter(i => i.status === 'done').length} done
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-primary" />
              <span className="text-muted">
                {phase.items.filter(i => i.status === 'in-progress').length} in progress
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Circle className="w-3 h-3 text-muted" />
              <span className="text-muted">
                {phase.items.filter(i => i.status === 'todo').length} todo
              </span>
            </div>
          </div>

          {/* Expanded Items */}
          <AnimatePresence>
            {selected === phase.phase && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 pt-6 border-t border-primary/10 space-y-3"
              >
                {phase.items.map((item) => (
                  <div key={item.id} className="flex items-start gap-3">
                    {item.status === 'done' && <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />}
                    {item.status === 'in-progress' && <Clock className="w-4 h-4 text-primary mt-0.5 flex-shrink-0 animate-pulse" />}
                    {item.status === 'todo' && <Circle className="w-4 h-4 text-muted mt-0.5 flex-shrink-0" />}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-primary">{item.title}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className={cn(
                          'text-xs px-2 py-0.5 rounded',
                          item.priority === 'critical' && 'bg-error/20 text-error',
                          item.priority === 'high' && 'bg-warning/20 text-warning',
                          item.priority === 'medium' && 'bg-info/20 text-info',
                          item.priority === 'low' && 'bg-muted/20 text-muted'
                        )}>
                          {item.priority}
                        </span>
                        <span className="text-xs text-muted">{item.effort}</span>
                        <span className="text-xs text-secondary">Impact: {item.impact}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

// Journeys View Component
function JourneysView({ journeys }: { journeys: typeof JOURNEYS }) {
  return (
    <div className="space-y-8">
      {journeys.map((journey, index) => (
        <motion.div
          key={journey.id}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-background-secondary border border-primary/10 rounded-lg p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <Rocket className="w-6 h-6 text-primary" />
            <h3 className="text-2xl font-bold font-mono text-primary">{journey.title}</h3>
          </div>

          <div className="relative">
            {/* Journey Steps */}
            {journey.steps.map((step, stepIndex) => (
              <div key={stepIndex} className="flex items-start gap-4 mb-6 last:mb-0">
                {/* Step Indicator */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center border-2 font-mono text-sm',
                    step.status === 'done'
                      ? 'border-success bg-success/20 text-success'
                      : step.status === 'todo'
                      ? 'border-muted bg-background text-muted'
                      : 'border-primary bg-primary/20 text-primary'
                  )}>
                    {stepIndex + 1}
                  </div>
                  {stepIndex < journey.steps.length - 1 && (
                    <div className={cn(
                      'w-0.5 h-12 mt-2',
                      step.status === 'done' ? 'bg-success/30' : 'bg-muted/20'
                    )} />
                  )}
                </div>

                {/* Step Content */}
                <div className="flex-1 pt-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium text-primary mb-1">{step.name}</p>
                      <p className="text-sm text-muted font-mono">{step.component}</p>
                    </div>
                    <div className={cn(
                      'px-2 py-1 rounded text-xs font-mono',
                      step.status === 'done' && 'bg-success/20 text-success',
                      step.status === 'todo' && 'bg-muted/20 text-muted'
                    )}>
                      {step.status === 'done' ? 'Ready' : 'Planned'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Journey Progress */}
          <div className="mt-6 pt-6 border-t border-primary/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted font-mono">Journey Completion</span>
              <span className="text-sm font-bold text-primary">
                {Math.round((journey.steps.filter(s => s.status === 'done').length / journey.steps.length) * 100)}%
              </span>
            </div>
            <div className="h-2 bg-background rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-success transition-all duration-1000"
                style={{
                  width: `${(journey.steps.filter(s => s.status === 'done').length / journey.steps.length) * 100}%`
                }}
              />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Goals View Component
function GoalsView({ goals }: { goals: typeof GOALS }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {goals.map((category, index) => (
        <motion.div
          key={category.category}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-background-secondary border border-primary/10 rounded-lg p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <Target className="w-5 h-5 text-primary" />
            <h3 className="text-xl font-bold font-mono text-primary">{category.category}</h3>
          </div>

          <div className="space-y-6">
            {category.metrics.map((metric) => {
              const progress = metric.current === 0 ? 0 : Math.min((metric.current / metric.target) * 100, 100);
              const isGood = progress >= 90;
              const isInProgress = progress > 0 && progress < 90;

              return (
                <div key={metric.name}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm font-medium text-primary">{metric.name}</p>
                      <p className="text-xs text-muted mt-1">
                        Target: {metric.target}{metric.unit}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={cn(
                        'text-lg font-bold font-mono',
                        isGood && 'text-success',
                        isInProgress && 'text-primary',
                        !isGood && !isInProgress && 'text-muted'
                      )}>
                        {metric.current}{metric.unit}
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="h-2 bg-background rounded-full overflow-hidden">
                    <div
                      className={cn(
                        'h-full transition-all duration-1000',
                        isGood && 'bg-success',
                        isInProgress && 'bg-primary',
                        !isGood && !isInProgress && 'bg-muted'
                      )}
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-2 mt-2">
                    {isGood && (
                      <>
                        <CheckCircle2 className="w-3 h-3 text-success" />
                        <span className="text-xs text-success font-mono">On Track</span>
                      </>
                    )}
                    {isInProgress && (
                      <>
                        <TrendingUp className="w-3 h-3 text-primary" />
                        <span className="text-xs text-primary font-mono">In Progress</span>
                      </>
                    )}
                    {!isGood && !isInProgress && (
                      <>
                        <Zap className="w-3 h-3 text-muted" />
                        <span className="text-xs text-muted font-mono">Not Started</span>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default ProjectDashboard;
