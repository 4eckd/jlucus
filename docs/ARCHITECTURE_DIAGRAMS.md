# Architecture Diagrams & ASCII Representations

> **Issue #136 - Part 2**: Visual documentation of project architecture, user journeys, and component layouts
> **Generated**: 2026-02-14

## Table of Contents

1. [User Journey Mermaid Diagrams](#user-journey-mermaid-diagrams)
2. [Permission Scope Diagrams](#permission-scope-diagrams)
3. [Component Architecture](#component-architecture)
4. [ASCII Page Layouts](#ascii-page-layouts)
5. [Endpoint Mapping](#endpoint-mapping)

---

## User Journey Mermaid Diagrams

### 1. User Discovery Journey

```mermaid
journey
    title User Discovery Journey
    section Landing
      Visit homepage: 5: User
      See Terminal Hero: 5: User, Hero Component
      View stats and animations: 4: User
    section Exploration
      Scroll to Ventures: 5: User
      Browse hex cards: 4: User, Ventures Section
      Check metrics (users/growth): 4: User
    section Projects
      Navigate to Portfolio: 5: User
      Filter by category: 4: User, Portfolio Section
      View project details: 5: User
      Click GitHub/Demo links: 4: User
    section Skills
      Expand Skill Tree: 4: User, Skill Tree
      See XP and levels: 4: User
      Understand expertise: 5: User
    section Contact
      Scroll to Contact: 5: User
      Fill form fields: 3: User, Contact Section
      Submit inquiry: 4: User
      View social links: 4: User
```

### 2. Developer Exploration Journey

```mermaid
journey
    title Developer Exploration Journey
    section Discovery
      Land on site: 5: Developer
      Notice Terminal aesthetic: 5: Developer
    section Quick Navigation
      Press Cmd/Ctrl+K: 5: Developer
      Open Command Palette: 5: Developer, Command Palette
      Search sections: 5: Developer
      Jump to Skills: 4: Developer
    section Code Review
      View GitHub link: 5: Developer
      Browse source code: 5: Developer, GitHub
      Check tech stack: 4: Developer
      Read documentation: 4: Developer
    section Blog (Future)
      Navigate to Blog: 3: Developer
      Read technical posts: 4: Developer, Blog System
      View code snippets: 4: Developer
    section Engagement
      Star repository: 4: Developer
      Fork project: 3: Developer
      Contact for questions: 3: Developer
```

### 3. Recruiter Assessment Journey

```mermaid
journey
    title Recruiter Assessment Journey
    section First Impression
      Visit portfolio: 5: Recruiter
      See key stats immediately: 5: Recruiter, Hero Stats
      Assess professionalism: 5: Recruiter
    section Skills Evaluation
      Scroll to Skills: 5: Recruiter
      View skill levels: 5: Recruiter, Skill Tree
      Check technology stack: 5: Recruiter
      Evaluate expertise depth: 4: Recruiter
    section Project Portfolio
      Browse Portfolio: 5: Recruiter
      Filter projects by category: 4: Recruiter, Portfolio Filter
      View featured projects: 5: Recruiter
      Check GitHub stars/forks: 4: Recruiter
    section Ventures
      Review business ventures: 4: Recruiter
      Assess entrepreneurial experience: 4: Recruiter
      Check growth metrics: 4: Recruiter
    section Next Steps
      Download resume (future): 3: Recruiter
      Schedule meeting (future): 3: Recruiter
      Send email: 4: Recruiter, Contact Form
```

---

## Permission Scope Diagrams

### Public Access (No Auth Required)

```mermaid
graph TD
    A[Public User] -->|GET /| B[Homepage]
    A -->|GET /dashboard| C[Project Dashboard]
    A -->|GET /sitemap.xml| D[Sitemap]
    A -->|GET /*| E[Static Assets]

    B --> F[Hero Section]
    B --> G[Ventures Section]
    B --> H[Portfolio Section]
    B --> I[Skills Section]
    B --> J[Contact Section]

    C --> K[Phases View]
    C --> L[Journeys View]
    C --> M[Goals View]

    style A fill:#00d9ff,stroke:#ff006e,stroke-width:2px
    style B fill:#ccff00,stroke:#00d9ff,stroke-width:2px
    style C fill:#ccff00,stroke:#00d9ff,stroke-width:2px
```

### Future: Protected Routes (Admin)

```mermaid
graph TD
    A[Admin User] -->|Auth Required| B{Authentication}
    B -->|Success| C[Admin Dashboard]
    B -->|Failure| D[Login Page]

    C --> E[Analytics View]
    C --> F[Content Manager]
    C --> G[Form Submissions]
    C --> H[Performance Metrics]

    E --> I[Visitor Stats]
    E --> J[Popular Projects]
    E --> K[Contact Form Data]

    F --> L[Edit Ventures]
    F --> M[Edit Projects]
    F --> N[Edit Skills]

    style A fill:#ff006e,stroke:#00d9ff,stroke-width:2px
    style C fill:#ccff00,stroke:#ff006e,stroke-width:3px
```

---

## Component Architecture

### Application Architecture

```mermaid
graph TB
    subgraph "App Layer"
        A[app/layout.tsx]
        B[app/page.tsx]
        C[app/dashboard/page.tsx]
        D[app/not-found.tsx]
    end

    subgraph "Layout Components"
        E[Header]
        F[Footer]
        G[ClientLayout]
    end

    subgraph "Section Components"
        H[HeroTerminal]
        I[VenturesSection]
        J[PortfolioSection]
        K[SkillTree]
        L[ContactSection]
        M[ProjectDashboard]
        N[AnimatedGrid]
    end

    subgraph "UI Components"
        O[Button]
        P[CommandPalette]
    end

    subgraph "Effects"
        Q[CustomCursor]
        R[ScanlineOverlay]
    end

    subgraph "Data Layer"
        S[ventures.ts]
        T[projects.ts]
        U[skills.ts]
    end

    A --> E
    A --> F
    A --> G
    B --> H
    B --> I
    B --> J
    B --> K
    B --> L
    C --> M

    G --> Q
    G --> R
    G --> P

    H --> N
    I --> O
    J --> O
    K --> O
    L --> O

    I --> S
    J --> T
    K --> U

    style A fill:#00d9ff,stroke:#ff006e
    style G fill:#ff006e,stroke:#00d9ff
    style M fill:#ccff00,stroke:#00d9ff
```

### Data Flow Diagram

```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant NextJS
    participant Components
    participant Data

    User->>Browser: Visit /
    Browser->>NextJS: Request Homepage
    NextJS->>Components: Render Layout
    Components->>Data: Load ventures.ts
    Components->>Data: Load projects.ts
    Components->>Data: Load skills.ts
    Data-->>Components: Return data
    Components-->>NextJS: HTML + Client JS
    NextJS-->>Browser: Response
    Browser-->>User: Display Page

    User->>Browser: Press Cmd+K
    Browser->>Components: Toggle CommandPalette
    Components-->>User: Show Palette

    User->>Components: Type search
    Components->>Components: Filter results
    Components-->>User: Update display

    User->>Components: Select section
    Components->>Browser: Smooth scroll
    Browser-->>User: Navigate to section
```

---

## ASCII Page Layouts

### Homepage - Desktop View (1920x1080)

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ▓▓▓ HEADER ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ┃
┃  jlucus.dev          [Home] [Ventures] [Skills] [Portfolio] [Contact] [Cmd+K Search]       [@GitHub] [@LinkedIn] ┃
┃ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                                                                                                 ┃
┃  ╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════╗  ┃
┃  ║ █ HERO TERMINAL ████████████████████████████████████████████████████████████████████████████████████████ ║  ┃
┃  ║                                                                                                           ║  ┃
┃  ║   ┌──────────────────────────────────────────┐     ┌────────────────────────────────────────────┐        ║  ┃
┃  ║   │ $ whoami                                 │     │  🚀 STATS                                  │        ║  ┃
┃  ║   │ > jlucus                                 │     │  ┌──────────────┐  ┌──────────────┐       │        ║  ┃
┃  ║   │                                          │     │  │  5+ YEARS    │  │  20+ PROJECTS│       │        ║  ┃
┃  ║   │ $ cat roles.txt                          │     │  │  Experience  │  │   Delivered  │       │        ║  ┃
┃  ║   │ > Engineer | Builder | Architect         │     │  └──────────────┘  └──────────────┘       │        ║  ┃
┃  ║   │                                          │     │  ┌──────────────┐  ┌──────────────┐       │        ║  ┃
┃  ║   │ $ ./build_portfolio.sh                   │     │  │  15+ SKILLS  │  │  3 VENTURES  │       │        ║  ┃
┃  ║   │ ▓▓▓▓▓▓▓▓░░░░ 75% Loading...             │     │  │   Mastered   │  │   Building   │       │        ║  ┃
┃  ║   │ _                                        │     │  └──────────────┘  └──────────────┘       │        ║  ┃
┃  ║   └──────────────────────────────────────────┘     └────────────────────────────────────────────┘        ║  ┃
┃  ║                                                                                                           ║  ┃
┃  ║   [View Ventures ➜]  [Explore Projects ➜]                                    ⚡ Animated Grid Background ║  ┃
┃  ╚═══════════════════════════════════════════════════════════════════════════════════════════════════════════╝  ┃
┃                                                                                                                 ┃
┃  ┌───────────────────────────────────────────────────────────────────────────────────────────────────────────┐  ┃
┃  │ 🏢 VENTURES SECTION                                                                                       │  ┃
┃  ├───────────────────────────────────────────────────────────────────────────────────────────────────────────┤  ┃
┃  │                                                                                                           │  ┃
┃  │   ╱▔▔▔▔▔▔▔▔▔▔▔▔╲       ╱▔▔▔▔▔▔▔▔▔▔▔▔╲       ╱▔▔▔▔▔▔▔▔▔▔▔▔╲                                              │  ┃
┃  │  ╱  VENTURE 1   ╲     ╱  VENTURE 2   ╲     ╱  VENTURE 3   ╲                                             │  ┃
┃  │ ▕  SaaS Platform ▏   ▕  AI Startup    ▏   ▕  Dev Tools     ▏                                             │  ┃
┃  │ ▕  🚀 Building   ▏   ▕  💡 Launching   ▏   ▕  📈 Growing    ▏                                             │  ┃
┃  │ ▕                ▏   ▕                ▏   ▕                ▏                                             │  ┃
┃  │ ▕  5K Users      ▏   ▕  Beta Phase    ▏   ▕  10K Stars     ▏                                             │  ┃
┃  │ ▕  +25% Growth   ▏   ▕  VC Backed     ▏   ▕  OSS Project   ▏                                             │  ┃
┃  │  ╲______________╱     ╲______________╱     ╲______________╱                                              │  ┃
┃  │                                                                                                           │  ┃
┃  │   [Next.js] [TypeScript] [AWS]     [Python] [TensorFlow]     [React] [Node.js]                          │  ┃
┃  └───────────────────────────────────────────────────────────────────────────────────────────────────────────┘  ┃
┃                                                                                                                 ┃
┃  ┌───────────────────────────────────────────────────────────────────────────────────────────────────────────┐  ┃
┃  │ 💼 PORTFOLIO SECTION                                                                                      │  ┃
┃  ├───────────────────────────────────────────────────────────────────────────────────────────────────────────┤  ┃
┃  │                                                                                                           │  ┃
┃  │   Filter: [All] [Web Apps] [Mobile] [Backend] [DevTools] [OSS]                                           │  ┃
┃  │                                                                                                           │  ┃
┃  │   ┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────────────┐ │  ┃
┃  │   │ 📱 Project 1         │  │ 🌐 Project 2         │  │ 🔧 Project 3         │  │ 💻 Project 4         │ │  ┃
┃  │   │ E-commerce Platform  │  │ Analytics Dashboard  │  │ CLI Tool Suite       │  │ Social Network       │ │  ┃
┃  │   │                      │  │                      │  │                      │  │                      │ │  ┃
┃  │   │ [Featured]           │  │ ⭐ 2.5K stars        │  │ 🍴 350 forks         │  │ 👥 50K users         │ │  ┃
┃  │   │ Next.js • Stripe     │  │ React • D3.js        │  │ Node.js • Commander  │  │ MERN Stack           │ │  ┃
┃  │   │                      │  │                      │  │                      │  │                      │ │  ┃
┃  │   │ [GitHub ➜] [Demo ➜]  │  │ [GitHub ➜] [Demo ➜]  │  │ [GitHub ➜] [Docs ➜]  │  │ [GitHub ➜] [Live ➜]  │ │  ┃
┃  │   └──────────────────────┘  └──────────────────────┘  └──────────────────────┘  └──────────────────────┘ │  ┃
┃  └───────────────────────────────────────────────────────────────────────────────────────────────────────────┘  ┃
┃                                                                                                                 ┃
┃  ┌───────────────────────────────────────────────────────────────────────────────────────────────────────────┐  ┃
┃  │ 🎯 SKILL TREE SECTION                                                                                     │  ┃
┃  ├───────────────────────────────────────────────────────────────────────────────────────────────────────────┤  ┃
┃  │                                                                                                           │  ┃
┃  │   ▼ Frontend Development (5 skills) ──────────────────────────────────────────────────────────────────    │  ┃
┃  │      ├─ React.js          ▓▓▓▓▓▓▓▓▓▓ Master     (10K XP)                                                 │  ┃
┃  │      ├─ TypeScript        ▓▓▓▓▓▓▓▓▓░ Expert     (8.5K XP)                                                 │  ┃
┃  │      ├─ Next.js           ▓▓▓▓▓▓▓▓▓▓ Master     (10K XP)                                                 │  ┃
┃  │      ├─ Tailwind CSS      ▓▓▓▓▓▓▓▓░░ Advanced   (7K XP)                                                  │  ┃
┃  │      └─ Framer Motion     ▓▓▓▓▓▓░░░░ Intermediate (5K XP)                                                 │  ┃
┃  │                                                                                                           │  ┃
┃  │   ▶ Backend Development (4 skills collapsed)                                                             │  ┃
┃  │   ▶ DevOps & Cloud (3 skills collapsed)                                                                  │  ┃
┃  │   ▶ Databases (3 skills collapsed)                                                                       │  ┃
┃  └───────────────────────────────────────────────────────────────────────────────────────────────────────────┘  ┃
┃                                                                                                                 ┃
┃  ┌───────────────────────────────────────────────────────────────────────────────────────────────────────────┐  ┃
┃  │ 📬 CONTACT SECTION                                                                                        │  ┃
┃  ├───────────────────────────────────────────────────────────────────────────────────────────────────────────┤  ┃
┃  │                                                                                                           │  ┃
┃  │   ┌────────────────────────────────────┐       ┌──────────────────────────────┐                          │  ┃
┃  │   │ Contact Form                       │       │ Get in Touch                 │                          │  ┃
┃  │   ├────────────────────────────────────┤       │                              │                          │  ┃
┃  │   │ Name: [___________________]        │       │ 📧 contact@jlucus.dev        │                          │  ┃
┃  │   │ Email: [___________________]       │       │ 💼 LinkedIn: /in/jlucus      │                          │  ┃
┃  │   │ Message:                           │       │ 💻 GitHub: @4eckd            │                          │  ┃
┃  │   │ [________________________]         │       │                              │                          │  ┃
┃  │   │ [________________________]         │       │ ⚡ Response Time: < 24h      │                          │  ┃
┃  │   │ [________________________]         │       │ 🟢 Available for Projects    │                          │  ┃
┃  │   │                                    │       │                              │                          │  ┃
┃  │   │          [Send Message ➜]          │       └──────────────────────────────┘                          │  ┃
┃  │   └────────────────────────────────────┘                                                                 │  ┃
┃  └───────────────────────────────────────────────────────────────────────────────────────────────────────────┘  ┃
┃                                                                                                                 ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃ ▓▓▓ FOOTER ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ┃
┃  © 2026 jlucus.dev | Built with Next.js, TypeScript & Tailwind | Terminal Neon Theme | [Privacy] [Terms]      ┃
┃ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

### Homepage - Tablet View (768x1024)

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ▓▓ HEADER ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ┃
┃  jlucus.dev    [☰ Menu]         [Cmd+K]    [GitHub]  ┃
┃ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                                        ┃
┃  ╔══════════════════════════════════════════════════╗  ┃
┃  ║ █ HERO TERMINAL ████████████████████████████████ ║  ┃
┃  ║                                                  ║  ┃
┃  ║  ┌────────────────────────────────────────────┐  ║  ┃
┃  ║  │ $ whoami                                   │  ║  ┃
┃  ║  │ > jlucus                                   │  ║  ┃
┃  ║  │                                            │  ║  ┃
┃  ║  │ Engineer | Builder | Architect            │  ║  ┃
┃  ║  │                                            │  ║  ┃
┃  ║  │ $ ./build_portfolio.sh                     │  ║  ┃
┃  ║  │ ▓▓▓▓▓▓▓▓░░░░ Loading...                   │  ║  ┃
┃  ║  └────────────────────────────────────────────┘  ║  ┃
┃  ║                                                  ║  ┃
┃  ║  ┌──────────────┐  ┌──────────────┐            ║  ┃
┃  ║  │  5+ YEARS    │  │  20+ PROJECTS│            ║  ┃
┃  ║  └──────────────┘  └──────────────┘            ║  ┃
┃  ║  ┌──────────────┐  ┌──────────────┐            ║  ┃
┃  ║  │  15+ SKILLS  │  │  3 VENTURES  │            ║  ┃
┃  ║  └──────────────┘  └──────────────┘            ║  ┃
┃  ║                                                  ║  ┃
┃  ║  [View Ventures ➜]  [Explore Projects ➜]       ║  ┃
┃  ╚══════════════════════════════════════════════════╝  ┃
┃                                                        ┃
┃  ┌────────────────────────────────────────────────┐    ┃
┃  │ 🏢 VENTURES                                    │    ┃
┃  ├────────────────────────────────────────────────┤    ┃
┃  │                                                │    ┃
┃  │  ╱▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔╲    ╱▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔╲   │    ┃
┃  │ ▕  VENTURE 1       ▏  ▕  VENTURE 2       ▏   │    ┃
┃  │ ▕  SaaS Platform   ▏  ▕  AI Startup      ▏   │    ┃
┃  │ ▕  🚀 Building     ▏  ▕  💡 Launching     ▏   │    ┃
┃  │ ▕  5K Users        ▏  ▕  Beta Phase      ▏   │    ┃
┃  │  ╲________________╱    ╲________________╱     │    ┃
┃  │                                                │    ┃
┃  │  ╱▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔╲                          │    ┃
┃  │ ▕  VENTURE 3       ▏                          │    ┃
┃  │ ▕  Dev Tools       ▏                          │    ┃
┃  │ ▕  📈 Growing      ▏                          │    ┃
┃  │ ▕  10K Stars       ▏                          │    ┃
┃  │  ╲________________╱                            │    ┃
┃  └────────────────────────────────────────────────┘    ┃
┃                                                        ┃
┃  ┌────────────────────────────────────────────────┐    ┃
┃  │ 💼 PORTFOLIO                                   │    ┃
┃  ├────────────────────────────────────────────────┤    ┃
┃  │                                                │    ┃
┃  │  [All] [Web] [Mobile] [Backend] [OSS]         │    ┃
┃  │                                                │    ┃
┃  │  ┌──────────────────┐  ┌──────────────────┐   │    ┃
┃  │  │ Project 1        │  │ Project 2        │   │    ┃
┃  │  │ E-commerce       │  │ Analytics        │   │    ┃
┃  │  │ [Featured]       │  │ ⭐ 2.5K stars    │   │    ┃
┃  │  │ [GitHub] [Demo]  │  │ [GitHub] [Demo]  │   │    ┃
┃  │  └──────────────────┘  └──────────────────┘   │    ┃
┃  │                                                │    ┃
┃  │  ┌──────────────────┐  ┌──────────────────┐   │    ┃
┃  │  │ Project 3        │  │ Project 4        │   │    ┃
┃  │  │ CLI Tools        │  │ Social Network   │   │    ┃
┃  │  │ 🍴 350 forks     │  │ 👥 50K users     │   │    ┃
┃  │  │ [GitHub] [Docs]  │  │ [GitHub] [Live]  │   │    ┃
┃  │  └──────────────────┘  └──────────────────┘   │    ┃
┃  └────────────────────────────────────────────────┘    ┃
┃                                                        ┃
┃  ┌────────────────────────────────────────────────┐    ┃
┃  │ 🎯 SKILLS                                      │    ┃
┃  ├────────────────────────────────────────────────┤    ┃
┃  │                                                │    ┃
┃  │  ▼ Frontend (5 skills)                        │    ┃
┃  │     React.js     ▓▓▓▓▓▓▓▓▓▓ Master            │    ┃
┃  │     TypeScript   ▓▓▓▓▓▓▓▓▓░ Expert            │    ┃
┃  │     Next.js      ▓▓▓▓▓▓▓▓▓▓ Master            │    ┃
┃  │                                                │    ┃
┃  │  ▶ Backend (4 skills)                         │    ┃
┃  │  ▶ DevOps (3 skills)                          │    ┃
┃  └────────────────────────────────────────────────┘    ┃
┃                                                        ┃
┃  ┌────────────────────────────────────────────────┐    ┃
┃  │ 📬 CONTACT                                     │    ┃
┃  ├────────────────────────────────────────────────┤    ┃
┃  │                                                │    ┃
┃  │  Name:  [____________________________]        │    ┃
┃  │  Email: [____________________________]        │    ┃
┃  │  Message:                                      │    ┃
┃  │  [___________________________________]         │    ┃
┃  │  [___________________________________]         │    ┃
┃  │                                                │    ┃
┃  │         [Send Message ➜]                       │    ┃
┃  │                                                │    ┃
┃  │  📧 contact@jlucus.dev                         │    ┃
┃  │  💼 LinkedIn | 💻 GitHub                       │    ┃
┃  └────────────────────────────────────────────────┘    ┃
┃                                                        ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃ ▓▓ FOOTER ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ┃
┃  © 2026 jlucus | Terminal Neon | [Privacy] [Terms]   ┃
┃ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

### Homepage - Mobile View (375x667)

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ▓ HEADER ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ┃
┃  jlucus.dev    [☰]  [⌘K]  ┃
┃ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                           ┃
┃  ╔═══════════════════════╗ ┃
┃  ║ █ HERO TERMINAL █████ ║ ┃
┃  ║                       ║ ┃
┃  ║  $ whoami             ║ ┃
┃  ║  > jlucus             ║ ┃
┃  ║                       ║ ┃
┃  ║  Engineer             ║ ┃
┃  ║  Builder              ║ ┃
┃  ║  Architect            ║ ┃
┃  ║                       ║ ┃
┃  ║  $ build.sh           ║ ┃
┃  ║  ▓▓▓░░░ Loading...    ║ ┃
┃  ║                       ║ ┃
┃  ║  ┌────────────────┐   ║ ┃
┃  ║  │  5+ YEARS      │   ║ ┃
┃  ║  │  Experience    │   ║ ┃
┃  ║  └────────────────┘   ║ ┃
┃  ║  ┌────────────────┐   ║ ┃
┃  ║  │  20+ PROJECTS  │   ║ ┃
┃  ║  │  Delivered     │   ║ ┃
┃  ║  └────────────────┘   ║ ┃
┃  ║                       ║ ┃
┃  ║  [View Ventures ➜]    ║ ┃
┃  ╚═══════════════════════╝ ┃
┃                           ┃
┃  ┌───────────────────────┐ ┃
┃  │ 🏢 VENTURES           │ ┃
┃  ├───────────────────────┤ ┃
┃  │                       │ ┃
┃  │   ╱▔▔▔▔▔▔▔▔▔▔▔▔▔▔╲   │ ┃
┃  │  ▕  VENTURE 1     ▏   │ ┃
┃  │  ▕  SaaS Platform ▏   │ ┃
┃  │  ▕  🚀 Building   ▏   │ ┃
┃  │  ▕  5K Users      ▏   │ ┃
┃  │   ╲______________╱    │ ┃
┃  │                       │ ┃
┃  │   ╱▔▔▔▔▔▔▔▔▔▔▔▔▔▔╲   │ ┃
┃  │  ▕  VENTURE 2     ▏   │ ┃
┃  │  ▕  AI Startup    ▏   │ ┃
┃  │  ▕  💡 Launching  ▏   │ ┃
┃  │  ▕  Beta Phase    ▏   │ ┃
┃  │   ╲______________╱    │ ┃
┃  │                       │ ┃
┃  │   ╱▔▔▔▔▔▔▔▔▔▔▔▔▔▔╲   │ ┃
┃  │  ▕  VENTURE 3     ▏   │ ┃
┃  │  ▕  Dev Tools     ▏   │ ┃
┃  │  ▕  📈 Growing    ▏   │ ┃
┃  │  ▕  10K Stars     ▏   │ ┃
┃  │   ╲______________╱    │ ┃
┃  └───────────────────────┘ ┃
┃                           ┃
┃  ┌───────────────────────┐ ┃
┃  │ 💼 PORTFOLIO          │ ┃
┃  ├───────────────────────┤ ┃
┃  │                       │ ┃
┃  │  [All ▼] [Filter]     │ ┃
┃  │                       │ ┃
┃  │  ┌─────────────────┐  │ ┃
┃  │  │ Project 1       │  │ ┃
┃  │  │ E-commerce      │  │ ┃
┃  │  │ [Featured]      │  │ ┃
┃  │  │ [GitHub] [Demo] │  │ ┃
┃  │  └─────────────────┘  │ ┃
┃  │                       │ ┃
┃  │  ┌─────────────────┐  │ ┃
┃  │  │ Project 2       │  │ ┃
┃  │  │ Analytics       │  │ ┃
┃  │  │ ⭐ 2.5K stars   │  │ ┃
┃  │  │ [GitHub] [Demo] │  │ ┃
┃  │  └─────────────────┘  │ ┃
┃  │                       │ ┃
┃  │  [View All ➜]         │ ┃
┃  └───────────────────────┘ ┃
┃                           ┃
┃  ┌───────────────────────┐ ┃
┃  │ 🎯 SKILLS             │ ┃
┃  ├───────────────────────┤ ┃
┃  │                       │ ┃
┃  │  ▼ Frontend          │ ┃
┃  │   React ▓▓▓▓▓▓▓▓▓▓   │ ┃
┃  │   TypeScript ▓▓▓▓▓▓▓▓ │ ┃
┃  │   Next.js ▓▓▓▓▓▓▓▓▓▓  │ ┃
┃  │                       │ ┃
┃  │  ▶ Backend            │ ┃
┃  │  ▶ DevOps             │ ┃
┃  └───────────────────────┘ ┃
┃                           ┃
┃  ┌───────────────────────┐ ┃
┃  │ 📬 CONTACT            │ ┃
┃  ├───────────────────────┤ ┃
┃  │                       │ ┃
┃  │  Name:                │ ┃
┃  │  [_________________]  │ ┃
┃  │                       │ ┃
┃  │  Email:               │ ┃
┃  │  [_________________]  │ ┃
┃  │                       │ ┃
┃  │  Message:             │ ┃
┃  │  [_________________]  │ ┃
┃  │  [_________________]  │ ┃
┃  │                       │ ┃
┃  │  [Send Message ➜]     │ ┃
┃  │                       │ ┃
┃  │  📧 contact@jlucus.dev│ ┃
┃  │  💼 LinkedIn          │ ┃
┃  │  💻 GitHub            │ ┃
┃  └───────────────────────┘ ┃
┃                           ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃ ▓ FOOTER ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ┃
┃  © 2026 jlucus.dev        ┃
┃  Terminal Neon Theme      ┃
┃  [Privacy] [Terms]        ┃
┃ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

### Dashboard Page - Desktop View

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ▓▓▓ HEADER ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ┃
┃  jlucus.dev     [Home] [Ventures] [Skills] [Portfolio] [Dashboard*] [Cmd+K]        [@GitHub] [@LinkedIn]       ┃
┃ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                                                                                                 ┃
┃  ╔═════════════════════════════════════════════════════════════════════════════════════════════════════════════╗ ┃
┃  ║ > PROJECT DASHBOARD                                                                                         ║ ┃
┃  ║   Real-time visualization of development progress, user journeys, and performance goals                     ║ ┃
┃  ╚═════════════════════════════════════════════════════════════════════════════════════════════════════════════╝ ┃
┃                                                                                                                 ┃
┃  ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────┐ ┃
┃  │ Overall Completion                                                                                      67% │ ┃
┃  │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │ ┃
┃  └─────────────────────────────────────────────────────────────────────────────────────────────────────────────┘ ┃
┃                                                                                                                 ┃
┃  ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────┐ ┃
┃  │  [📊 Development Phases*] [🚀 User Journeys] [🎯 Goals & Metrics]                                           │ ┃
┃  └─────────────────────────────────────────────────────────────────────────────────────────────────────────────┘ ┃
┃                                                                                                                 ┃
┃  ┌──────────────────────────────────┐  ┌──────────────────────────────────┐  ┌──────────────────────────────────┐ ┃
┃  │ ✅ PHASE 1: FOUNDATION       100%│  │ ✅ PHASE 2: POLISH           100%│  │ ⏳ PHASE 3: CONTENT             0%│ ┃
┃  ├──────────────────────────────────┤  ├──────────────────────────────────┤  ├──────────────────────────────────┤ ┃
┃  │ Core architecture & design       │  │ Visual effects & interactive     │  │ Blog, GitHub, analytics          │ ┃
┃  │                                  │  │                                  │  │                                  │ ┃
┃  │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │  │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │  │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │ ┃
┃  │                                  │  │                                  │  │                                  │ ┃
┃  │ ✅ 6 done                        │  │ ✅ 10 done                       │  │ ○ 5 planned                      │ ┃
┃  │ ○ 0 in progress                 │  │ ○ 0 in progress                  │  │ ○ 0 in progress                  │ ┃
┃  │ ○ 0 todo                         │  │ ○ 0 todo                         │  │ ○ 0 todo                         │ ┃
┃  │                                  │  │                                  │  │                                  │ ┃
┃  │ [Click to expand ▼]              │  │ [Click to expand ▼]              │  │ [Click to expand ▼]              │ ┃
┃  └──────────────────────────────────┘  └──────────────────────────────────┘  └──────────────────────────────────┘ ┃
┃                                                                                                                 ┃
┃  ╔═════════════════════════════════════════════════════════════════════════════════════════════════════════════╗ ┃
┃  ║ EXPANDED: PHASE 2 - POLISH & ENHANCEMENT                                                                    ║ ┃
┃  ╠═════════════════════════════════════════════════════════════════════════════════════════════════════════════╣ ┃
┃  ║                                                                                                              ║ ┃
┃  ║  ✅ Command Palette (Cmd+K)              [HIGH]    4 hours       Impact: UX                                 ║ ┃
┃  ║  ✅ Scanline effect overlay              [HIGH]    3 hours       Impact: Aesthetic                          ║ ┃
┃  ║  ✅ AnimatedGrid on all sections         [HIGH]    2 hours       Impact: Consistency                        ║ ┃
┃  ║  ✅ Custom Cursor with neon trail        [HIGH]    3 hours       Impact: Interactive                        ║ ┃
┃  ║  ✅ Sitemap.xml generation               [CRITICAL] 1 hour       Impact: SEO                                ║ ┃
┃  ║  ✅ Smooth scroll behavior                [MEDIUM]  30 mins      Impact: UX                                 ║ ┃
┃  ║  ○ JSON-LD structured data               [HIGH]    2 hours       Impact: SEO                                ║ ┃
┃  ║  ○ Easter eggs (Konami code)             [MEDIUM]  3 hours       Impact: Engagement                         ║ ┃
┃  ║  ○ Loading screen                        [MEDIUM]  4 hours       Impact: Polish                             ║ ┃
┃  ║  🔄 Performance optimization              [HIGH]    1 week        Impact: Speed                              ║ ┃
┃  ║                                                                                                              ║ ┃
┃  ╚═════════════════════════════════════════════════════════════════════════════════════════════════════════════╝ ┃
┃                                                                                                                 ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃ ▓▓▓ FOOTER ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ┃
┃  © 2026 jlucus.dev | Built with ❤️ using Next.js, TypeScript & Tailwind | Terminal Neon                        ┃
┃ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

### Command Palette - Desktop Overlay

```
                ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
                ┃ ⚡ COMMAND PALETTE                                 [Esc] ┃
                ┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
                ┃                                                           ┃
                ┃  🔍 [Type to search...____________________________]        ┃
                ┃                                                           ┃
                ┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
                ┃                                                           ┃
                ┃  > 🏠 Navigate to Home                             Cmd+1  ┃
                ┃    🏢 Navigate to Ventures                         Cmd+2  ┃
                ┃    🎯 Navigate to Skills                           Cmd+3  ┃
                ┃    💼 Navigate to Portfolio                        Cmd+4  ┃
                ┃    📬 Navigate to Contact                          Cmd+5  ┃
                ┃    📊 Navigate to Dashboard                        Cmd+6  ┃
                ┃                                                           ┃
                ┃  ─────────────────────────────────────────────────────────┃
                ┃                                                           ┃
                ┃    💻 Open GitHub                                  Cmd+G  ┃
                ┃    💼 Open LinkedIn                                Cmd+L  ┃
                ┃    📧 Open Email                                   Cmd+E  ┃
                ┃                                                           ┃
                ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
                            ↑/↓ Navigate  ⏎ Select  Esc Close
```

---

## Endpoint Mapping

### Current API Routes (Static Site - No APIs Yet)

```mermaid
graph LR
    A[Client Browser] -->|GET /| B[Homepage SSG]
    A -->|GET /dashboard| C[Dashboard SSG]
    A -->|GET /sitemap.xml| D[Sitemap SSG]
    A -->|GET /robots.txt| E[Robots Static]
    A -->|GET /_next/static/*| F[Static Assets]

    style B fill:#00ff9f,stroke:#00d9ff
    style C fill:#00ff9f,stroke:#00d9ff
    style D fill:#ccff00,stroke:#00d9ff
    style E fill:#ccff00,stroke:#00d9ff
    style F fill:#ff006e,stroke:#00d9ff
```

### Future API Routes (Phase 3)

```mermaid
graph TB
    subgraph "Public Endpoints"
        A[POST /api/contact]
        B[POST /api/newsletter/subscribe]
        C[GET /api/blog/posts]
        D[GET /api/projects]
    end

    subgraph "Protected Endpoints - Admin Only"
        E[GET /api/admin/analytics]
        F[GET /api/admin/submissions]
        G[POST /api/admin/content]
        H[DELETE /api/admin/content/:id]
    end

    subgraph "External Integrations"
        I[GET /api/github/stats]
        J[GET /api/github/commits]
    end

    A --> K[Email Service]
    B --> K
    I --> L[GitHub API]
    J --> L
    E --> M[Analytics DB]
    F --> M

    style A fill:#00ff9f,stroke:#00d9ff
    style B fill:#00ff9f,stroke:#00d9ff
    style E fill:#ff006e,stroke:#ffb800
    style F fill:#ff006e,stroke:#ffb800
```

### Permission Scopes

```mermaid
mindmap
  root((Permissions))
    Public
      Read Homepage
      Read Dashboard
      Read Sitemap
      View Projects
      View Ventures
      View Skills
      Contact Form Submit
    Future::Authenticated
      Blog Comments
      Save Favorites
      Newsletter Preferences
    Future::Admin
      Edit Content
      View Analytics
      Manage Submissions
      Delete Comments
      Publish Posts
```

---

## Component Interaction Flow

### Hero Terminal Component

```mermaid
sequenceDiagram
    participant User
    participant Hero
    participant Terminal
    participant Stats
    participant Grid

    User->>Hero: Page Load
    Hero->>Terminal: Render Terminal UI
    Hero->>Stats: Load stats data
    Hero->>Grid: Activate AnimatedGrid

    Terminal->>Terminal: Type animation ("whoami")
    Terminal->>Terminal: Display output
    Terminal->>Terminal: Type animation ("cat roles.txt")
    Terminal->>Terminal: Display roles
    Terminal->>Terminal: Type animation ("./build.sh")
    Terminal->>Terminal: Show progress bar

    Grid-->>User: Render grid animation
    Stats-->>User: Display metrics
    Terminal-->>User: Show terminal output

    User->>Hero: Click "View Ventures"
    Hero->>User: Smooth scroll to Ventures
```

### Command Palette Interaction

```mermaid
stateDiagram-v2
    [*] --> Closed
    Closed --> Opening: Press Cmd/Ctrl+K
    Opening --> Open: Animation complete

    Open --> Searching: Type search query
    Searching --> Results: Filter results
    Results --> Searching: Continue typing
    Results --> Navigating: Press Enter
    Navigating --> Closed: Navigate complete

    Open --> Closed: Press Escape
    Searching --> Closed: Press Escape
    Results --> Closed: Press Escape

    Closed --> [*]
```

---

## Notes

1. **ASCII Representations** are approximate visual guides. Actual rendering uses HTML/CSS with Terminal Neon styling.
2. **Mermaid Diagrams** can be viewed in any Markdown viewer that supports Mermaid (GitHub, GitLab, VS Code, etc.)
3. **Permission Scopes** are currently all public. Future phases will add authentication.
4. **Endpoint Mapping** shows current SSG routes and planned API routes for Phase 3.
5. **Component Flow** demonstrates the interaction patterns and state management.

---

**Last Updated**: 2026-02-14
**Issue**: #136 - Part 2 (ASCII & Mermaid Diagrams)
**Status**: Complete
