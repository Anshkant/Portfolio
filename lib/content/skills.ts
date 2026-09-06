export interface SkillGroup {
  track: "signal" | "structure" | "bridge";
  title: string;
  subtitle: string;
  badge: string;
  accentColor: string;
  description: string;
  skills: Array<{
    name: string;
    category?: string;
  }>;
  focusAreas: string[];
}

export const skillsData: SkillGroup[] = [
  {
    track: "structure",
    title: "Software Development",
    subtitle: "Deterministic Systems & Architecture",
    badge: "Structure",
    accentColor: "#5C7CFA",
    description:
      "Engineering resilient web applications, robust backend architectures, and database integrations designed for production stability.",
    skills: [
      { name: "JavaScript" },
      { name: "React.js" },
      { name: "Next.js" },
      { name: "Node.js" },
      { name: "HTML5" },
      { name: "CSS3" },
      { name: "Tailwind CSS" },
      { name: "MongoDB" },
      { name: "REST APIs" },
    ],
    focusAreas: [
      "Full-Stack Development",
      "REST APIs & Endpoints",
      "Responsive Web Applications",
      "Backend Architecture",
      "Database Integration & Schemas",
    ],
  },
  {
    track: "bridge",
    title: "Applied AI & Computer Vision",
    subtitle: "The Connective Pipeline",
    badge: "Bridge",
    accentColor: "#A78BFA",
    description:
      "Connecting analytical models into usable software through real-time inference, computer vision, and neural network pipelines.",
    skills: [
      { name: "Python" },
      { name: "YOLOv8" },
      { name: "OpenCV" },
      { name: "TensorFlow" },
      { name: "Keras" },
    ],
    focusAreas: [
      "Computer Vision",
      "Object Detection & Tracking",
      "Real-Time Surveillance Pipelines",
      "Deep Learning Models",
    ],
  },
  {
    track: "signal",
    title: "Data Analytics",
    subtitle: "Patterns, Insight & Probabilistic Flow",
    badge: "Signal",
    accentColor: "#F2B441",
    description:
      "Extracting clear signal from noisy operational datasets through rigorous statistical analysis, EDA, and business dashboards.",
    skills: [
      { name: "Python" },
      { name: "SQL" },
      { name: "Power BI" },
      { name: "Excel" },
      { name: "Pandas" },
      { name: "NumPy" },
      { name: "Matplotlib" },
      { name: "Seaborn" },
    ],
    focusAreas: [
      "Data Cleaning & Wrangling",
      "Exploratory Data Analysis (EDA)",
      "Data Visualization",
      "Business Analytics & KPIs",
      "Dashboard Development",
      "Statistical Analysis",
    ],
  },
];
