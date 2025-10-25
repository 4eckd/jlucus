import type { Metadata } from "next";
import { Roboto, Raleway, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

// Portfolio fonts (from legacy site)
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jesse Lucas - Software Engineer & Product Manager",
  description: "Portfolio of Jesse Lucas showcasing expertise in software development, product management, and AI/ML integration. Specializing in Web 3.0 solutions and digital transformation.",
  keywords: ["software engineer", "product manager", "web development", "AI/ML", "Web 3.0", "Jesse Lucas"],
  authors: [{ name: "Jesse Lucas" }],
  creator: "Jesse Lucas",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jlucus.dev",
    title: "Jesse Lucas - Software Engineer & Product Manager",
    description: "Portfolio showcasing software development and product management expertise",
    siteName: "Jesse Lucas Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jesse Lucas - Software Engineer & Product Manager",
    description: "Portfolio showcasing software development and product management expertise",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${roboto.variable} ${raleway.variable} ${poppins.variable} antialiased`}
        style={{ fontFamily: 'var(--font-roboto)' }}
      >
        <ThemeProvider>
          <a href="#main-content" className="skip-to-content">
            Skip to main content
          </a>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
