export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription?: string;
  lean: "signal" | "structure" | "bridge";
  leanLabel: "Signal (Data)" | "Structure (Software)" | "Bridge (AI/ML)";
  accentColor: string;
  technologies: string[];
  repoUrl: string;
  liveUrl?: string;
  image?: string;
  isFlagship?: boolean;
  publication?: string;
  metrics?: Array<{
    label: string;
    value: string;
  }>;
  architectureHighlights?: string[];
}

export const projectsData: Project[] = [
  // 1. AI KPI Health Monitor
  {
    id: "ai-kpi-monitor",
    title: "AI KPI Health Monitor",
    tagline: "Real-Time Operational Telemetry & Statistical Anomaly Detection",
    description:
      "Automated business performance monitoring pipeline with real-time operational metrics, 3-sigma anomaly detection, and automated variance alert feeds.",
    longDescription:
      "Translates complex corporate data streams into actionable operational intelligence. Runs automated data extraction, statistical trend analysis, and live KPI dashboards with sub-second alert triggers.",
    lean: "signal",
    leanLabel: "Signal (Data)",
    accentColor: "#F2B441",
    technologies: [
      "Python",
      "Pandas",
      "NumPy",
      "Time-Series",
      "FastAPI",
      "EDA",
    ],
    repoUrl: "https://github.com/Anshkant/AI-KPI-Monitor",
    image: "/images/projects/ai-kpi.svg",
    metrics: [
      { label: "Anomaly Engine", value: "3-Sigma Threshold" },
      { label: "Telemetry Feed", value: "Real-Time Stream" },
      { label: "Core Processing", value: "Python + Pandas" },
    ],
    architectureHighlights: [
      "Automated extraction and aggregation of operational KPI time-series metrics",
      "Statistical threshold monitoring for immediate variance anomaly detection",
      "Intuitive visualization layers designed for fast executive decision-making",
    ],
  },

  // 2. VanRakshak AI
  {
    id: "vanrakshak-ai",
    title: "VanRakshak AI",
    tagline:
      "Wildlife Sanctuary Monitoring System — Published Research (IJRASET79908)",
    description:
      "AI-powered multi-camera surveillance pipeline achieving 92%+ detection accuracy on live streams with sub-60s automated Telegram emergency alerts.",
    longDescription:
      "Engineered as a mission-critical AI system for environmental surveillance. VanRakshak AI fuses deep learning object detection with real-time video stream processing and tracking across multi-camera feeds. Published in IJRASET (Paper ID: IJRASET79908).",
    lean: "bridge",
    leanLabel: "Bridge (AI/ML)",
    accentColor: "#A78BFA",
    technologies: [
      "Python",
      "YOLOv8",
      "DeepSORT",
      "OpenCV",
      "Telegram Bot API",
      "FastAPI",
    ],
    repoUrl: "https://github.com/Anshkant/Vanrakshak-AI",
    liveUrl: "https://vanrakshak-ai.vercel.app/",
    image: "/images/projects/vanrakshak.png",
    isFlagship: true,
    publication: "IJRASET79908",
    metrics: [
      { label: "Detection Accuracy", value: "92%+" },
      { label: "Alert Response Time", value: "< 60s" },
      { label: "Research Paper", value: "IJRASET79908" },
      { label: "Tracking Framework", value: "DeepSORT + YOLOv8" },
    ],
    architectureHighlights: [
      "Real-time object detection and classification using custom-trained YOLOv8 weights",
      "Persistent identity association across frames via DeepSORT tracking algorithms",
      "Automated instant Telegram alerts cutting emergency response to under 60 seconds",
      "Multi-camera video ingestion pipeline with asynchronous frame buffering",
    ],
  },

  // 3. Customer Churn Intelligence Dashboard
  {
    id: "customer-churn-analysis",
    title: "Customer Churn Intelligence Dashboard",
    tagline:
      "E-Commerce Churn Intelligence — Predictive Risk Scoring & Retention Economics",
    description:
      "Enterprise predictive churn scoring platform evaluating 5,630 accounts with cross-validated Random Forest ensembles (0.998 AUC-ROC) and financial retention simulator.",
    longDescription:
      "Engineered predictive machine learning models with SHAP explainability and interactive what-if financial simulation, identifying at-risk accounts with 95.3% precision.",
    lean: "signal",
    leanLabel: "Signal (Data)",
    accentColor: "#F2B441",
    technologies: [
      "Next.js",
      "TypeScript",
      "Python",
      "Random Forest",
      "Scikit-Learn",
      "Tailwind CSS",
    ],
    repoUrl: "https://github.com/Anshkant/Customer-Churn-Analysis",
    liveUrl: "https://customer-churn-dashboard-sigma.vercel.app/",
    image: "/images/projects/churn.png",
    metrics: [
      { label: "Model AUC-ROC", value: "0.998" },
      { label: "Churn Precision", value: "95.3%" },
      { label: "Campaign Net ROI", value: "432%" },
    ],
    architectureHighlights: [
      "Cross-validated Random Forest ensemble achieving 0.998 AUC-ROC across 5,630 accounts",
      "Dynamic targeted retention campaign simulator calculating ROI and net profit preservation",
      "Real-time individual customer risk profiler and SHAP explainability telemetry",
    ],
  },

  // 4. Patient Readmission & Healthcare Analysis
  {
    id: "patient-readmission-analysis",
    title: "Patient Readmission & Healthcare Analysis",
    tagline: "Clinical Intelligence & Statistical Risk Stratification",
    description:
      "Comprehensive healthcare analytics study isolating preventable hospital readmission risk factors, multivariate correlation matrices, and predictive modeling (0.814 ROC-AUC).",
    longDescription:
      "Applies exploratory clinical data analysis and statistical evaluation to hospital records to isolate key drivers of early discharge returns and mitigate clinical readmission costs.",
    lean: "signal",
    leanLabel: "Signal (Data)",
    accentColor: "#38BDF8",
    technologies: [
      "Python",
      "Pandas",
      "NumPy",
      "Scikit-Learn",
      "EDA",
      "Seaborn",
    ],
    repoUrl:
      "https://github.com/Anshkant/Patient-Readmission-and-Healthcare-Analysis",
    image: "/images/projects/patient-readmission.svg",
    metrics: [
      { label: "Predictive ROC-AUC", value: "0.814" },
      { label: "High-Risk Flags", value: "18.2%" },
      { label: "Methodology", value: "EDA & Stat Modeling" },
    ],
    architectureHighlights: [
      "Rigorous cleaning and imputation of messy, multi-variable patient clinical data",
      "Multivariate correlation matrices isolating primary readmission drivers",
      "High-clarity visualizations communicating risk thresholds to healthcare leaders",
    ],
  },

  // 5. CritIndia (SAP Consulting Platform)
  {
    id: "critindia",
    title: "CritIndia — SAP Consulting Platform",
    tagline: "High-performance enterprise consulting website with Next.js SSR",
    description:
      "Full-stack website engineered with Next.js Server-Side Rendering achieving sub-2s page load speeds, serving 1,000+ monthly B2B enterprise visitors.",
    longDescription:
      "Built during internship at Atorix IT Solutions. Delivers modern responsive interfaces, optimized search engine visibility, structured component hierarchies, and sub-2s load times for enterprise SAP consultants.",
    lean: "structure",
    leanLabel: "Structure (Software)",
    accentColor: "#5C7CFA",
    technologies: [
      "Next.js",
      "React.js",
      "Tailwind CSS",
      "SSR",
      "SEO Optimization",
    ],
    repoUrl: "https://github.com/Anshkant",
    liveUrl: "https://critindia.com",
    image: "/images/projects/critindia.png",
    metrics: [
      { label: "Page Load Speed", value: "< 2.0s" },
      { label: "Monthly B2B Traffic", value: "1,000+" },
      { label: "Architecture", value: "Next.js SSR" },
    ],
    architectureHighlights: [
      "Server-Side Rendered pages ensuring immediate first-contentful paint under 2 seconds",
      "Responsive, mobile-optimized component architecture built on Tailwind CSS",
      "Enterprise lead generation flows and client portal touchpoints",
    ],
  },

  // 6. ConnectingDots ERP
  {
    id: "connecting-dots-erp",
    title: "ConnectingDots ERP",
    tagline: "Training Institute Portal & Workflow Management System",
    description:
      "Full-stack ERP backend handling 5,000+ monthly student visits across diverse course verticals, with MongoDB query indexing and Express middleware.",
    longDescription:
      "Shipped during internship at Atorix IT Solutions. Handles student lifecycle, course registrations, role-based auth, and automated scheduling with optimized database performance.",
    lean: "structure",
    leanLabel: "Structure (Software)",
    accentColor: "#5C7CFA",
    technologies: ["Node.js", "Express.js", "MongoDB", "REST APIs", "Auth0"],
    repoUrl: "https://github.com/Anshkant",
    liveUrl: "https://connectingdotserp.com",
    image: "/images/projects/connectingdots.png",
    metrics: [
      { label: "Monthly Active Visits", value: "5,000+" },
      { label: "Query Optimization", value: "35% Faster" },
      { label: "Database Layer", value: "MongoDB Indexed" },
    ],
    architectureHighlights: [
      "Optimized MongoDB indexing cutting query latency by ~35%",
      "Modular Express.js middleware handling role authorization and secure session tokens",
      "Robust RESTful endpoints serving high student traffic across course verticals",
    ],
  },

  // 7. Atorix IT Solutions
  {
    id: "atorix-it-solutions",
    title: "Atorix IT Solutions",
    tagline: "Corporate Portal & Enterprise SAP S/4 HANA Partner Platform",
    description:
      "Official corporate portal delivering robust digital solutions, SAP implementation services, and automated lead capture with modern responsive architecture.",
    longDescription:
      "Built and deployed during 6-month on-site internship at Atorix IT Solutions in Pune. Features responsive layouts, enterprise service catalogs, and optimized performance.",
    lean: "structure",
    leanLabel: "Structure (Software)",
    accentColor: "#5C7CFA",
    technologies: ["Next.js", "React.js", "Node.js", "MongoDB", "Tailwind CSS"],
    repoUrl: "https://github.com/Anshkant",
    liveUrl: "https://atorixit.com",
    image: "/images/projects/atorix.png",
    metrics: [
      { label: "Company", value: "Atorix IT Solutions" },
      { label: "Location", value: "Pune, India" },
      { label: "Tenure", value: "6 Months On-Site" },
    ],
    architectureHighlights: [
      "Interactive enterprise service catalogs and responsive client consultation funnels",
      "High-performance frontend architecture with optimized asset delivery",
      "Production deployment serving active business clients across enterprise verticals",
    ],
  },
];
