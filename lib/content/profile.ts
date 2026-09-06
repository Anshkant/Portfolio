export interface Profile {
  name: string;
  roles: string[];
  roleTitle: string;
  location: string;
  education: {
    degree: string;
    field: string;
    institutionFocus: string;
  };
  links: {
    github: string;
    linkedin: string;
    email: string;
  };
  tagline: string;
  headlines: {
    primary: string;
    secondary: string;
    grounding: string;
  };
  aboutBio: {
    paragraphs: string[];
  };
  careerInterest: string;
  verifiedStats: Array<{
    value: string;
    label: string;
    detail: string;
    lean: "structure" | "signal" | "bridge";
  }>;
}

export const profileData: Profile = {
  name: "Anshkant Malviya",
  roles: ["Software Developer", "Data Analyst", "AI/ML Enthusiast"],
  roleTitle: "Software Developer · Data Analyst",
  location: "Nagpur, India",
  education: {
    degree: "B.Tech",
    field: "Computer Science Engineering",
    institutionFocus:
      "Software Architecture, Algorithms & Applied Data Systems",
  },
  links: {
    github: "https://github.com/Anshkant",
    linkedin: "https://linkedin.com/in/anshkant-malviya-1267a736b",
    email: "anshkantmalviya@gmail.com",
  },
  tagline:
    "Building production-ready software, data-driven solutions, and practical AI systems.",
  headlines: {
    primary:
      "I turn scattered data into decisions, and decisions into software.",
    secondary:
      "Where software engineering structure meets data analytics signal.",
    grounding:
      "B.Tech CSE in Nagpur, India. Developing dual-discipline systems bridging robust full-stack code with analytical insight and computer vision.",
  },
  aboutBio: {
    paragraphs: [
      "I operate across two complementary disciplines that are usually kept apart: deterministic software engineering and probabilistic data analytics. Rather than viewing them as separate tracks, I see them as an continuous pipeline where analysis identifies what needs to be solved, and engineering builds the resilient systems to solve it.",
      "With a foundational background in Computer Science Engineering from Nagpur, I design full-stack web applications, end-to-end data pipelines, and real-time computer vision models. Whether architecting database schemas, optimizing REST APIs, or isolating patterns in multi-camera video streams and readmission records, my focus remains building production-grade software that extracts clear signal from noise.",
    ],
  },
  careerInterest:
    "Open to Data Analyst, Software/Full-Stack Developer, and AI/ML & Computer Vision roles — particularly where software engineering and data analysis meet.",
  verifiedStats: [
    {
      value: "4+",
      label: "Shipped Core Repos",
      detail: "Full-stack apps, data analytics pipelines & AI vision",
      lean: "structure",
    },
    {
      value: "92%+",
      label: "Detection Accuracy",
      detail: "VanRakshak AI multi-camera forest surveillance pipeline",
      lean: "bridge",
    },
    {
      value: "8-Stage",
      label: "Analytics Pipeline",
      detail: "From exploratory EDA and SQL to machine learning",
      lean: "signal",
    },
    {
      value: "Dual-Track",
      label: "Discipline Synthesis",
      detail: "Next.js & Node.js paired with Python, Pandas & YOLOv8",
      lean: "bridge",
    },
  ],
};
