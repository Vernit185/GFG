# 🌐 GeeksforGeeks Campus Body — PCCOE Website

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React Router](https://img.shields.io/badge/React_Router-6.28-CA4245?style=flat-square&logo=react-router&logoColor=white)](https://reactrouter.com/)
[![License](https://img.shields.io/badge/License-MIT-2F9E44?style=flat-square)](LICENSE)

The official web portal for the **GeeksforGeeks Student Chapter at Pimpri Chinchwad College of Engineering (PCCOE)**. Recreated with a modern responsive design system, smooth animations, interactive components, and comprehensive event portals.

---

## ✨ Features & Pages

- **🏠 Home Page (`/`)**:
  - Hero banner with chapter tagline *"Sculpting Tomorrow's Coders!"* and live statistics.
  - Interactive syntax-highlighted code demo window (`gfg_pccoe_core.cpp`).
  - Featured felicitation carousel (Mr. Sandeep Jain & Dr. Shitalkumar Rawandale).
  - Dark announcement card with pulsing animations.
  - 4-pillar overview (*Competitive Programming, Hackathons, Workshops, Community Outreach*).

- **📖 About Us (`/about`)**:
  - Left sticky card featuring the chapter's Vision, Mission, and impact metrics.
  - 4 Domain breakdown cards (*Programming & Coding Competition, Technical Workshops & Training, Industry Interaction & Guest Lectures, Technical Outreach & Community Engagement*).

- **👥 Team (`/team`)**:
  - Category filtering (*All, Leadership, Technical, Creative & Marketing*).
  - Member profile cards with roles, departments, taglines, and social media handles (LinkedIn, GitHub, Instagram).

- **🖼️ Gallery (`/gallery`)**:
  - Event photo showcase categorized by *Special Events, Hackathons, Workshops, Competitions, Seminars, and Community*.
  - Interactive modal lightbox preview with details and captions.

- **📬 Contact (`/contact`)**:
  - Branded social channel cards (LinkedIn, Instagram, Twitter/X, YouTube).
  - Embedded Google Map for the PCCOE Akurdi campus.
  - Interactive direct message form with validation and animated feedback.

- **⚡ Hack Matrix 4.0 (`/hackmatrix`)**:
  - Flagship 24-hour offline hackathon portal under ARTIMAS 2026.
  - Live stats: 100+ Teams, 380+ Participants, 5 Tracks, ₹75,000+ Prize Pool.
  - Interactive Round-2 results modal with instant search.
  - Track breakdowns, sponsor showcases, and collapsible FAQ accordion.

- **🎨 Design System**:
  - Google Fonts (`Outfit`, `Inter`, `Fira Code`).
  - Boxicons iconography.
  - Glassmorphism, tailored GFG emerald accents (`#2F9E44`), and glowing edge borders.
  - Fully responsive across Desktop, Tablet, and Mobile viewports.

---

## 🛠️ Tech Stack

- **Frontend**: React 18
- **Tooling & Build**: Vite 6
- **Routing**: React Router DOM (v6)
- **Styling**: Vanilla CSS with modern CSS variables & design tokens
- **Icons**: Boxicons & Lucide React

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (version 18 or above) installed on your system.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/gfg-pccoe-website.git
   cd gfg-pccoe-website
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview production build**:
   ```bash
   npm run preview
   ```

---

## 📁 Project Structure

```
gfg-pccoe-website/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Navbar.css
│   │   ├── Footer.jsx
│   │   └── Footer.css
│   ├── data/
│   │   ├── teamData.js
│   │   ├── galleryData.js
│   │   └── hackmatrixData.js
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Home.css
│   │   ├── About.jsx
│   │   ├── About.css
│   │   ├── Team.jsx
│   │   ├── Team.css
│   │   ├── Gallery.jsx
│   │   ├── Gallery.css
│   │   ├── Contact.jsx
│   │   ├── Contact.css
│   │   ├── HackMatrix.jsx
│   │   └── HackMatrix.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
└── README.md
```

---

## 🚢 Deployment

You can easily deploy this Vite React application to platforms like **Vercel**, **Netlify**, or **GitHub Pages**:

### Deploying to Vercel
1. Push your repository to GitHub.
2. Go to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import your GitHub repository.
4. Framework preset will automatically detect **Vite**.
5. Click **Deploy**.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 🤝 Acknowledgements

- **GeeksforGeeks Campus Body — PCCOE**
- **Pimpri Chinchwad College of Engineering (PCCOE), Pune**
