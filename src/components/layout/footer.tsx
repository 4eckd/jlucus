import { SITE, SOCIAL_LINKS } from '@/lib/constants';
import { Button } from '@/components/ui/button';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-primary/10 bg-background-secondary">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-primary">{'> jlucus'}</span>
              <span className="text-primary cursor-pointer animate-pulse">_</span>
            </div>
            <p className="text-sm text-secondary max-w-xs">
              Engineer, Builder, Architect. Creating innovative solutions in blockchain, AI, and web development.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-primary">Navigation</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {[
                { label: 'Home', href: '#hero' },
                { label: 'Ventures', href: '#ventures' },
                { label: 'Skills', href: '#skills' },
                { label: 'Portfolio', href: '#portfolio' },
                { label: 'About', href: '#about' },
                { label: 'Contact', href: '#contact' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-secondary hover:text-primary transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social & Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-primary">Connect</h3>
            <div className="flex flex-col space-y-2">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-secondary hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <Button variant="outline" size="sm" asChild>
              <a href={`mailto:${SITE.email}`}>
                Get in Touch
              </a>
            </Button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-primary/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-secondary">
              © {currentYear} {SITE.name}. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm text-secondary">
              <span>Built with {'{'}React, Next.js, TypeScript{'}'}</span>
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
