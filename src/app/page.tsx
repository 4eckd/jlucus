import { HeroTerminal } from '@/components/sections/hero-terminal'
import { VenturesSection } from '@/components/sections/ventures-section'
import { PortfolioSection } from '@/components/sections/portfolio-section'
import { SkillTree } from '@/components/sections/skill-tree'
import { ContactSection } from '@/components/sections/contact-section'

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroTerminal />
      <VenturesSection />
      <PortfolioSection />
      <SkillTree />
      <ContactSection />
    </main>
  )
}
