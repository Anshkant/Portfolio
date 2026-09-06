# Anshkant Malviya — Portfolio Website

<p align="center">
  <img src="https://img.shields.io/badge/Live_Demo-portfolio--rho--gules--40tdq4n6wl.vercel.app-5C7CFA?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
  <img src="https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js 14" />
  <img src="https://img.shields.io/badge/Three.js_/_R3F-049EF4?style=for-the-badge&logo=three.js&logoColor=white" alt="Three.js" />
  <img src="https://img.shields.io/badge/TypeScript_Strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
</p>

> **"I turn scattered data into decisions, and decisions into software."**

An interactive, dual-track portfolio website for **Anshkant Malviya** (Software Engineer & Data Analyst), visually symbolizing the fusion of deterministic software architecture (**Structure**) and probabilistic data analytics (**Signal**).

🔗 **Live Deployment**: [https://portfolio-rho-gules-40tdq4n6wl.vercel.app/](https://portfolio-rho-gules-40tdq4n6wl.vercel.app/)

---

## ⚡ Key Highlights

- **Particles → 3D Scatter Plot (EDA Engine)**: Custom GPU vertex & fragment shader system where raw, chaotic Brownian noise particles smoothly assemble into an authentic **3D Matplotlib-style scatter plot** with visible X/Y/Z coordinate axes, tick marks, reference grid planes, and cursor-reactive 3D orbit inspection.
- **Interactive Technical Command Console**: A unique engineering console for skills with an interactive track selector (`Software Architecture`, `Data Analytics`, `AI & Vision`) and a **Live Implementation Inspector** showing verified production and research proof for each tool.
- **Dynamic 1% to 100% Preloader**: Smooth digital progress loader with dual-gradient progress track (`#5C7CFA` to `#F2B441`) and curtain reveal transition.
- **Integrated Interactive Resume**: Instant modal viewer with one-click print/save PDF capability, detailing 6 months on-site internship experience at Atorix IT Solutions, Pune, and published AI research.
- **Zero-CLS Lazy Loading**: R3F 3D Canvas loaded dynamically (`ssr: false`) with instant gradient fallbacks to guarantee fast first-contentful paint.

---

## 🎨 Design Concept — "Signal ⇄ Structure"

The visual language contrasts two complementary disciplines:

| Token            | Hex       | Discipline / Purpose                                 |
| ---------------- | --------- | ---------------------------------------------------- |
| `--bg-primary`   | `#0B0E14` | Deep graphite-navy base background                   |
| `--bg-surface`   | `#12161F` | Elevated console panels and cards                    |
| `--structure`    | `#5C7CFA` | **Code / Software Systems** — Cool electric indigo   |
| `--signal`       | `#F2B441` | **Data / Analytics** — Warm amber-gold               |
| `--bridge`       | `#A78BFA` | **Applied AI / Computer Vision** — Connective violet |
| `--text-primary` | `#EDEFF4` | High-contrast headlines & text                       |
| `--line`         | `#232838` | Hairline grid dividers                               |

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router, React 18, Strict TypeScript)
- **3D Graphics**: [Three.js](https://threejs.org/) via [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) & [@react-three/drei](https://github.com/pmndrs/drei) + Custom GPU GLSL Shaders
- **Animation**: [Framer Motion](https://www.framer.com/motion/) + Spring Physics
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom design token system
- **Typography**: [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) (Display), [Inter](https://fonts.google.com/specimen/Inter) (Body), [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) (Code & Metrics) via `next/font`
- **Icons**: [@phosphor-icons/react](https://phosphoricons.com/)
- **Tooling**: ESLint (`core-web-vitals`), Prettier, Husky, and `lint-staged`

---

## 🚀 Featured Projects

### 1. [VanRakshak AI](https://github.com/Anshkant/Vanrakshak-AI) — Wildlife Sanctuary Monitoring System

- **Highlights**: **92%+ Detection Accuracy** · **Published Research (IJRASET79908)** · **Sub-60s Telegram Alerts**
- Multi-camera surveillance pipeline integrating real-time YOLOv8 object detection with DeepSORT tracking algorithms to mitigate human-animal conflict in wildlife reserves.
- **Tech**: Python, YOLOv8, DeepSORT, OpenCV, FastAPI, Telegram Bot API.

### 2. [CritIndia](https://github.com/Anshkant) — SAP Consulting Platform

- **Highlights**: **Sub-2.0s Page Loads** · **1,000+ Monthly B2B Visitors** · **Enterprise SSR**
- Full-stack consulting website built during internship at Atorix IT Solutions with optimized search engine visibility and responsive component architecture.
- **Tech**: Next.js, React.js, Tailwind CSS, SSR.

### 3. [ConnectingDots ERP](https://github.com/Anshkant) — Training Institute Portal

- **Highlights**: **5,000+ Monthly Active Visits** · **35% Faster Query Speed** · **MongoDB Indexed**
- Full-stack workflow and student lifecycle management system with optimized MongoDB query indexing and Express.js middleware.
- **Tech**: Node.js, Express.js, MongoDB, REST APIs, Auth0.

### 4. [AI KPI Monitor](https://github.com/Anshkant/AI-KPI-Monitor) — Operational Intelligence

- Real-time business performance monitoring tracking operational time-series metrics with automated statistical threshold alerts.
- **Tech**: Python, Pandas, REST APIs, Dashboards.

### 5. [Patient Readmission & Healthcare Analysis](https://github.com/Anshkant/Patient-Readmission-and-Healthcare-Analysis)

- Multivariate statistical and exploratory data analysis identifying clinical risk factors and diagnostic correlations in hospital readmissions.
- **Tech**: Python, Pandas, NumPy, Seaborn, Matplotlib, EDA.

---

## 💻 Local Development Setup

```bash
# 1. Clone the repository
git clone https://github.com/Anshkant/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# Navigate to http://localhost:3000

# 5. Run strict verification (TypeScript & Next.js production build)
npm run verify
```

---

## 📬 Connect with Anshkant

- **Portfolio**: [portfolio-rho-gules-40tdq4n6wl.vercel.app](https://portfolio-rho-gules-40tdq4n6wl.vercel.app/)
- **LinkedIn**: [linkedin.com/in/anshkant-malviya-1267a736b](https://linkedin.com/in/anshkant-malviya-1267a736b)
- **GitHub**: [github.com/Anshkant](https://github.com/Anshkant)
- **X (Twitter)**: [x.com/AnshkantMalviya](https://x.com/AnshkantMalviya)
- **Instagram**: [instagram.com/ansh__malviya07](https://www.instagram.com/ansh__malviya07/)
- **Email**: [malviyaanshkant@gmail.com](mailto:malviyaanshkant@gmail.com)

---

<p align="center">
  Designed & Engineered by <strong>Anshkant Malviya</strong> · Nagpur, India
</p>
