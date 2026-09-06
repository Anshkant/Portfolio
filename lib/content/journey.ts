export interface JourneyStep {
  step: number;
  title: string;
  category:
    | "Foundations"
    | "Wrangling"
    | "Visualization"
    | "Querying"
    | "BI"
    | "Mathematics"
    | "Advanced";
  tech: string[];
  description: string;
  status: "Completed" | "Mastering" | "Active";
  lean: "signal" | "structure" | "bridge";
}

export const journeyPipeline: JourneyStep[] = [
  {
    step: 1,
    title: "Python for Data Analytics",
    category: "Foundations",
    tech: ["Python 3", "Data Structures", "Control Flow"],
    description:
      "Core algorithmic logic, script automation, and analytical programming syntax.",
    status: "Completed",
    lean: "structure",
  },
  {
    step: 2,
    title: "NumPy + Pandas",
    category: "Wrangling",
    tech: ["NumPy Arrays", "Pandas DataFrames", "Vectorized Compute"],
    description:
      "High-performance vector operations, multi-index indexing, and structured dataframes.",
    status: "Completed",
    lean: "signal",
  },
  {
    step: 3,
    title: "Data Cleaning + EDA",
    category: "Wrangling",
    tech: ["Missing Data", "Outlier Detection", "Feature Profiling"],
    description:
      "Systematic sanitization, anomaly extraction, and distributional hypothesis testing.",
    status: "Completed",
    lean: "signal",
  },
  {
    step: 4,
    title: "Matplotlib + Seaborn",
    category: "Visualization",
    tech: ["Statistical Plots", "Heatmaps", "Custom Visual Themes"],
    description:
      "Translating statistical distributions into intuitive visual narratives and visual proof.",
    status: "Completed",
    lean: "signal",
  },
  {
    step: 5,
    title: "SQL & Relational Logic",
    category: "Querying",
    tech: ["Complex Joins", "Window Functions", "Query Optimization"],
    description:
      "Relational database querying, aggregation pipelines, and schema querying under scale.",
    status: "Completed",
    lean: "structure",
  },
  {
    step: 6,
    title: "Excel + Power BI",
    category: "BI",
    tech: ["DAX Formulas", "Data Modeling", "Executive Dashboards"],
    description:
      "Enterprise metric modeling, KPI tracking boards, and executive-facing dashboards.",
    status: "Completed",
    lean: "signal",
  },
  {
    step: 7,
    title: "Statistics & Probability",
    category: "Mathematics",
    tech: ["Hypothesis Testing", "Regression", "Bayesian Logic"],
    description:
      "Inferential statistics, significance testing, and probabilistic modeling principles.",
    status: "Active",
    lean: "signal",
  },
  {
    step: 8,
    title: "Advanced Analytics & ML",
    category: "Advanced",
    tech: ["YOLOv8", "Deep Learning", "Predictive Modeling"],
    description:
      "Bridging computer vision algorithms with predictive inference and production APIs.",
    status: "Active",
    lean: "bridge",
  },
];
