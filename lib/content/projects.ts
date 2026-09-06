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
  demoUrl?: string;
  isFlagship?: boolean;
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
      "Real-time forest surveillance & multi-camera computer vision monitoring",
    description:
      "AI-powered computer vision system for real-time forest monitoring and threat detection, engineered with a multi-camera pipeline and robust object tracking.",
    longDescription:
      "Engineered as a mission-critical AI system for environmental surveillance. VanRakshak AI fuses deep learning object detection with real-time video stream processing and tracking across multi-camera feeds to monitor wildlife movements, detect forest intrusions, and safeguard sensitive reserves.",
    lean: "bridge",
    leanLabel: "Bridge (AI/ML)",
    accentColor: "#A78BFA",
    technologies: ["Python", "YOLOv8", "OpenCV", "DeepSORT", "FastAPI"],
    repoUrl: "https://github.com/Anshkant/Vanrakshak-AI",
    isFlagship: true,
    metrics: [
      { label: "Detection Accuracy", value: "92%+" },
      { label: "Surveillance Pipeline", value: "Multi-Camera" },
      { label: "Tracking Framework", value: "DeepSORT + YOLOv8" },
      { label: "Research Status", value: "Published Research" },
    ],
    architectureHighlights: [
      "Real-time object detection and classification using custom-trained YOLOv8 weights",
      "Persistent identity association across frames via DeepSORT tracking algorithms",
      "Asynchronous video ingestion pipeline built on FastAPI and optimized OpenCV buffers",
      "Automated threat boundary alerting and incident logging architecture",
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
      "Translates complex corporate data streams into actionable operational intelligence. AI KPI Monitor runs automated data extraction, statistical trend analysis, and live KPI dashboards to empower stakeholders to pinpoint operational bottlenecks before they escalate.",
    lean: "signal",
    leanLabel: "Signal (Data)",
    accentColor: "#F2B441",
    technologies: ["Python", "Data Analytics", "Dashboard", "APIs", "Pandas"],
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
    id: "connecting-dots-erp",
    title: "Connecting Dots ERP",
    tagline:
      "Enterprise workflow management and full-stack operational architecture",
    description:
      "Full-stack ERP web application architected for business operations, workflow automation, inventory tracking, and enterprise team coordination.",
    longDescription:
      "Built with a focus on data consistency and high user concurrency. Connecting Dots ERP delivers modular business management, responsive role-based dashboards, and structured MongoDB schema models wrapped in performant RESTful API routes.",
    lean: "structure",
    leanLabel: "Structure (Software)",
    accentColor: "#5C7CFA",
    technologies: [
      "Next.js",
      "React.js",
      "Node.js",
      "MongoDB",
      "REST APIs",
      "Tailwind CSS",
    ],
    repoUrl: "https://github.com/Anshkant",
    metrics: [
      { label: "Architecture", value: "Full-Stack Web" },
      { label: "Database Layer", value: "MongoDB Schemas" },
      { label: "Client Engine", value: "Next.js + React" },
    ],
    architectureHighlights: [
      "Component-driven responsive interfaces with optimized server-side rendering",
      "Secure REST API endpoints with granular role authorization and request validation",
      "Relational document schemas designed for enterprise operational flows",
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
      "Applies exploratory data analysis and statistical evaluation to complex healthcare records. Identifies high-risk patient segments, analyzes diagnostic correlations, and provides data-backed recommendations to reduce preventable hospital returns.",
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
