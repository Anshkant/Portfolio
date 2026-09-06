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
  isFlagship?: boolean;
  publication?: string;
  metrics?: Array<{
    label: string;
    value: string;
  }>;
  architectureHighlights?: string[];
}

export const projectsData: Project[] = [
  {
    id: "vanrakshak-ai",
    title: "VanRakshak AI",
    tagline:
      "Wildlife Sanctuary Monitoring System — Published Research (IJRASET79908)",
    description:
      "End-to-end AI pipeline achieving 92%+ detection accuracy on live surveillance feeds, cutting human-animal conflict response time to under 60 seconds via automated Telegram alerts.",
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
  {
    id: "ai-kpi-monitor",
    title: "AI KPI Monitor",
    tagline:
      "Data-driven business performance analytics & automated operational insights",
    description:
      "Data-driven KPI monitoring application for tracking business performance with real-time operational metrics, trend detection, and anomaly alerts.",
    longDescription:
      "Translates complex corporate data streams into actionable operational intelligence. AI KPI Monitor runs automated data extraction, statistical trend analysis, and live KPI dashboards.",
    lean: "signal",
    leanLabel: "Signal (Data)",
    accentColor: "#F2B441",
    technologies: [
      "Python",
      "Pandas",
      "Data Analytics",
      "Dashboards",
      "REST APIs",
    ],
    repoUrl: "https://github.com/Anshkant/AI-KPI-Monitor",
    metrics: [
      { label: "Core Metric Tracking", value: "Real-Time" },
      { label: "Analysis Engine", value: "Python + Pandas" },
      { label: "Data Integration", value: "REST API Feed" },
    ],
    architectureHighlights: [
      "Automated extraction and aggregation of operational KPI time-series metrics",
      "Statistical threshold monitoring for immediate variance anomaly detection",
      "Intuitive visualization layers designed for fast executive decision-making",
    ],
  },
  {
    id: "patient-readmission-analysis",
    title: "Patient Readmission & Healthcare Analysis",
    tagline:
      "Exploratory clinical analytics and predictive pattern identification",
    description:
      "Comprehensive data analytics study uncovering critical clinical patterns, patient demographics, and risk factors that correlate with hospital readmissions.",
    longDescription:
      "Applies exploratory data analysis and statistical evaluation to complex healthcare records to identify high-risk patient segments and reduce preventable hospital returns.",
    lean: "signal",
    leanLabel: "Signal (Data)",
    accentColor: "#F2B441",
    technologies: [
      "Python",
      "Pandas",
      "NumPy",
      "Data Visualization",
      "EDA",
      "Seaborn",
    ],
    repoUrl:
      "https://github.com/Anshkant/Patient-Readmission-and-Healthcare-Analysis",
    metrics: [
      { label: "Analytical Domain", value: "Healthcare / Clinical" },
      { label: "Core Methodology", value: "EDA & Stat Modeling" },
      { label: "Key Outcome", value: "Risk Correlation Matrix" },
    ],
    architectureHighlights: [
      "Rigorous cleaning and imputation of messy, multi-variable patient clinical data",
      "Multivariate correlation matrices isolating primary readmission drivers",
      "High-clarity visualizations communicating risk thresholds to healthcare leaders",
    ],
  },
];
