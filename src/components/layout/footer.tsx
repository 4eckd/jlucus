import { SITE, SOCIAL_LINKS } from '@/lib/constants';
import { Button } from '@/components/ui/button';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-primary/10 bg-background-secondary border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-primary text-xl font-bold">
                {'> jlucus'}
              </span>
              <span className="text-primary animate-pulse cursor-pointer">
                _
              </span>
            </div>
            <p className="text-secondary max-w-xs text-sm">
              Engineer, Builder, Architect. Creating innovative solutions in
              blockchain, AI, and web development.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-primary text-sm font-semibold">Navigation</h3>
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
            <h3 className="text-primary text-sm font-semibold">Connect</h3>
            <div className="flex flex-col space-y-2">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover:text-primary text-sm transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <Button variant="outline" size="sm" asChild>
              <a href={`mailto:${SITE.email}`}>Get in Touch</a>
            </Button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-primary/10 mt-8 border-t pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-secondary text-sm">
              © {currentYear} {SITE.name}. All rights reserved.
            </p>
            <div className="text-secondary flex items-center space-x-6 text-sm">
              <span>
                Built with {'{'}React, Next.js, TypeScript{'}'}
              </span>
              <div className="bg-primary h-2 w-2 animate-pulse rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
