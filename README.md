# GeeksforGeeks Student Chapter — PCCOE

Official web application for the GeeksforGeeks Student Chapter at Pimpri Chinchwad College of Engineering (PCCOE), Pune.

---

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router DOM (v6)
- **Styling**: Vanilla CSS (CSS variables, responsive grid, glassmorphism)
- **Icons**: Boxicons
- **Carousel**: Embla Carousel React

---

## Project Structure

```text
├── public/                # Static assets, logos, and illustrations
├── src/
│   ├── components/        # Reusable UI components (Navbar, Footer, Antigravity, SplashScreen)
│   │   └── ui/            # Generic primitives (Carousel, etc.)
│   ├── data/              # Static content & dataset models (eventsData, teamData, hackmatrixData, galleryData)
│   ├── pages/             # Route views
│   │   ├── Home.jsx       # Landing page & featured highlights
│   │   ├── About.jsx      # Chapter overview & domain verticals
│   │   ├── Team.jsx       # Core team directory with category filters
│   │   ├── Events.jsx     # Upcoming workshops & past event timelines
│   │   ├── Contact.jsx    # Inquiry form & campus location
│   │   └── HackMatrix.jsx # Hack Matrix hackathon portal & results
│   ├── App.jsx            # App shell, routing, and background effects
│   ├── main.jsx           # Entry point
│   └── index.css          # Global typography, color tokens, and utility classes
├── index.html             # HTML entry point with SEO metadata
├── package.json           # Dependencies and scripts
└── vite.config.js         # Vite configuration
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-org/gfg-pccoe-website.git
   cd gfg-pccoe-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:3000`.

---

## Available Scripts

- `npm run dev` — Starts the local development server with HMR.
- `npm run build` — Compiles and minifies the application for production in `dist/`.
- `npm run preview` — Locally previews the production build.

---

## Managing Content

All dynamic page data is structured in the `src/data/` folder for maintainability:

- **Events & Highlights**: Update `src/data/eventsData.js` to add upcoming events or append highlight carousel images.
- **Team Members**: Update `src/data/teamData.js` to modify core team profiles, social links, and roles.
- **Hack Matrix**: Update `src/data/hackmatrixData.js` for hackathon announcements, tracks, FAQs, and round results.

---

## License & Copyright

© 2026 GeeksforGeeks Student Chapter — PCCOE. All Rights Reserved.

This repository and its contents (including source code, design assets, branding, logos, event data, and media) are the intellectual property of the GeeksforGeeks Student Chapter at Pimpri Chinchwad College of Engineering (PCCOE). Unauthorized copying, distribution, modification, or commercial use of any part of this project without prior written permission is strictly prohibited.
