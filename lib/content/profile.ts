export interface Internship {
  role: string;
  company: string;
  location: string;
  website: string;
  period: string;
  highlights: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  score?: string;
  status?: string;
}

export interface CertificationItem {
  name: string;
  issuer: string;
  year: string;
}

export interface Profile {
  name: string;
  roles: string[];
  roleTitle: string;
  location: string;
  phone: string;
  publication: {
    title: string;
    paperId: string;
    journal: string;
  };
  education: EducationItem[];
  internships: Internship[];
  certifications: CertificationItem[];
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
  roles: ["Software Engineer", "Data Analyst", "Published Researcher"],
  roleTitle: "Software Engineer & Data Analyst",
  location: "Nagpur, India",
  phone: "+91-7477078103",
  publication: {
    title: "Vanrakshak AI: AI-Driven Wildlife Sanctuary Monitoring System",
    paperId: "IJRASET79908",
    journal:
      "International Journal for Research in Applied Science & Engineering Technology (IJRASET)",
  },
  education: [
    {
      degree: "B.Tech, Computer Science & Engineering",
      institution: "G H Raisoni University, Amravati",
      period: "Aug 2022 – May 2026",
      score: "CGPA: 7.98 / 10.0",
    },
    {
      degree: "Post Graduate Program in Data Science",
      institution: "ExcelR Institute, Pune",
      period: "Expected Jan 2027",
      status: "Currently Pursuing",
    },
  ],
  internships: [
    {
      role: "Full-Stack Developer Intern",
      company: "Atorix IT Solutions",
      location: "Pune (On-site)",
      website: "https://atorixit.com",
      period: "Jul 2024 – Dec 2024",
      highlights: [
        "Delivered 3 production websites for enterprise clients using Next.js, React.js, Node.js, and MongoDB.",
        "Optimised API response times by ~35% through MongoDB query indexing and Express.js middleware refactoring.",
        "Integrated third-party APIs (Auth0, Telegram Bot) across client projects with zero critical post-launch issues.",
      ],
    },
  ],
  certifications: [
    {
      name: "The Complete Web Development Bootcamp",
      issuer: "Udemy",
      year: "2024",
    },
    {
      name: "Android App Development",
      issuer: "ACEMGRADE",
      year: "Nov 2024",
    },
    {
      name: "Post Graduate Program in Data Science",
      issuer: "ExcelR Institute, Pune",
      year: "In Progress (Jan 2027)",
    },
  ],
  links: {
    github: "https://github.com/Anshkant",
    linkedin: "https://linkedin.com/in/anshkant-malviya-1267a736b",
    email: "malviyaanshkant@gmail.com",
  },
  tagline:
    "Building production-ready software, data-driven solutions, and practical AI systems.",
  headlines: {
    primary:
      "I turn scattered data into decisions, and decisions into software.",
    secondary:
      "Where software engineering structure meets data analytics signal.",
    grounding:
      "Full-stack developer and data analyst with 6 months of on-site internship experience at Atorix IT Solutions and a peer-reviewed AI research publication (IJRASET79908).",
  },
  aboutBio: {
    paragraphs: [
      "I operate across two complementary disciplines that are usually kept apart: deterministic software engineering and probabilistic data analytics. Rather than viewing them as separate tracks, I see them as a continuous pipeline where analysis identifies what needs to be solved, and engineering builds the resilient systems to solve it.",
      "With 6 months of on-site industry experience at Atorix IT Solutions in Pune, I shipped 3 live production web applications, optimized MongoDB and Express APIs by 35%, and engineered VanRakshak AI—a published peer-reviewed AI wildlife surveillance pipeline achieving 92%+ detection accuracy with sub-60s Telegram alerts.",
    ],
  },
  careerInterest:
    "Open to Data Analyst, Software/Full-Stack Developer, and AI/ML & Computer Vision roles — particularly where software engineering and data analysis meet.",
  verifiedStats: [
    {
      value: "6 Mo",
      label: "Industry Experience",
      detail:
        "On-site Full-Stack Developer Intern at Atorix IT Solutions, Pune",
      lean: "structure",
    },
    {
      value: "92%+",
      label: "Detection Accuracy",
      detail: "VanRakshak AI surveillance pipeline (Published: IJRASET79908)",
      lean: "bridge",
    },
    {
      value: "3 Shipped",
      label: "Live Production Apps",
      detail: "Enterprise web platforms serving 5,000+ monthly visits",
      lean: "structure",
    },
    {
      value: "7.98",
      label: "B.Tech CGPA",
      detail: "Computer Science & Engineering, G H Raisoni University",
      lean: "signal",
    },
  ],
};
