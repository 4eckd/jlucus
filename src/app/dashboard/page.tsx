import { ProjectDashboard } from '@/components/sections/project-dashboard';

export const metadata = {
  title: 'Project Dashboard | jlucus.dev',
  description: 'Real-time visualization of development progress, user journeys, and performance goals for jlucus.dev portfolio',
};

/**
 * Dashboard Page
 *
 * Dedicated page for project status visualization
 * Accessible at /dashboard
 *
 * Issue #136: Comprehensive project visualization and tracking
 */
export default function DashboardPage() {
  return (
    <main className="min-h-screen">
      <ProjectDashboard />
    </main>
  );
}
