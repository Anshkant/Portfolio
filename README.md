# Anshkant Malviya — Portfolio Website

> **"I turn scattered data into decisions, and decisions into software."**

An interactive personal portfolio website for **Anshkant Malviya** (Software Developer + Data Analyst), engineered to visually symbolize the fusion of deterministic software architecture (**Structure**) and probabilistic data analytics (**Signal**).

---

## The Concept: "Signal ⇄ Structure"

- **Structure** (Software Engineering): Logic, architectures, deterministic flow, robustness. Represented by cool electric indigo (`#5C7CFA`).
- **Signal** (Data Analytics): Patterns, distributions, insight extraction, probabilistic meaning. Represented by warm amber-gold (`#F2B441`).
- **Bridge** (Applied AI & Computer Vision): Real-time inference and model deployment. Represented by vibrant violet (`#A78BFA`).

---

## Tech Stack & Architecture

- **Framework**: Next.js 14+ (App Router, TypeScript in strict mode)
- **3D Graphics**: Three.js via **React Three Fiber** + `@react-three/drei` with custom GPU shaders
- **Styling**: Tailwind CSS with custom design tokens (`bg-primary: #0B0E14`, `bg-surface: #12161F`)
- **Typography**: Space Grotesk (display), Inter (body), JetBrains Mono (code/metrics) via `next/font/google`
- **Icons**: `@phosphor-icons/react`
- **Tooling**: TypeScript strict mode (`noUncheckedIndexedAccess`), ESLint, Prettier, Husky, lint-staged

---

## 3D Hero Particle Morphing

The hero section features a custom GPU vertex & fragment shader particle system:

- **State A (Signal / Data)**: Gaussian point cloud & density wave distribution (amber `#F2B441`).
- **State B (Structure / Code)**: Crystalline polyhedral network & Git commit graph (indigo `#5C7CFA`).
- **Dynamics**: Interpolates on scroll and a subtle ambient breathing cycle with gentle pointer parallax.
- **Accessibility**: Automatically detects `prefers-reduced-motion` and falls back to a static, low-power geometry.
- **Performance**: Dynamically scales particle density based on device capability (desktop: ~4,800, mobile: ~2,200).
- **Zero-CLS Lazy Loading**: Loaded via `next/dynamic` with `ssr: false` to ensure instantaneous first paint of text content.

---

## Featured Real Projects

1. **VanRakshak AI** (Flagship · AI/ML Bridge)
   - Multi-camera computer vision forest surveillance system.
   - Tech: Python, YOLOv8, OpenCV, DeepSORT, FastAPI.
   - Highlight: 92%+ detection accuracy, published research.
2. **AI KPI Monitor** (Signal · Data)
   - Real-time operational KPI monitoring and automated anomaly detection.
   - Tech: Python, Data Analytics, Dashboards, APIs.
3. **Connecting Dots ERP** (Structure · Software)
   - Full-stack enterprise workflow management and inventory platform.
   - Tech: Next.js, React.js, Node.js, MongoDB, REST APIs.
4. **Patient Readmission & Healthcare Analysis** (Signal · Data)
   - Exploratory statistical evaluation identifying risk patterns in hospital readmissions.
   - Tech: Python, Pandas, NumPy, Seaborn, EDA.

---

## Development & Verification

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run strict type checking and production build
npm run verify

# Format codebase
npm run format
```
