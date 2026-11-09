import type { ProjectItem, ExperienceItem, SkillCategory, NavigationNode } from '../types';

export const PERSONAL_INFO = {
  name: "DARSHAN SP",
  callsign: "PREDATOR007",
  title: "Software Engineer",
  subtitles: ["AI/ML", "Backend", "Full-Stack"],
  tagline: "Building real-world, scalable systems with AI, high-concurrency backends & high-performance architecture.",
  email: "darshanspdarshu6172@gmail.com",
  phone: "+91 8147769141",
  location: "Bengaluru, IN",
  experienceYears: "1+ Years",
  projectsCount: "3+",
  education: {
    institution: "Jyothy Institute Of Technology",
    degree: "Bachelor of Engineering in Computer Science & Engineering",
    duration: "Nov 2021 – May 2025",
    cgpa: "8.7 / 10.0",
    location: "Bengaluru, India"
  },
  certifications: [
    "Stanford – Supervised Machine Learning (Coursera, Aug 2025)",
    "Red Hat RHCSA – EX200 System Administrator (Dec 2023)",
    "Quation Solutions Internship Certificate (Apr 2025)",
    "IBM – Introduction to Cybersecurity and Attacks (May 2023)",
    "Smart India Hackathon – 3rd Place National Finalist (Oct 2023)"
  ]
};

export const NAVIGATION_NODES: NavigationNode[] = [
  {
    id: 'projects',
    label: '<> PROJECTS',
    icon: 'Code2',
    color: 'cyan',
    topPercent: 24,
    leftPercent: 66,
    description: 'Production GenAI RAG, Computer Vision (YOLOv8 + CUDA), & Web3 DApps.'
  },
  {
    id: 'experience',
    label: 'EXPERIENCE',
    icon: 'Briefcase',
    color: 'cyan',
    topPercent: 36,
    leftPercent: 50,
    description: 'TechCrafter.cps (Software Engineer), Quation Solutions (CV Intern).'
  },
  {
    id: 'skills',
    label: 'SKILLS',
    icon: 'Settings',
    color: 'cyan',
    topPercent: 36,
    leftPercent: 79,
    description: 'Python, FastAPI, LangGraph, PyTorch, YOLOv8, PostgreSQL, Docker, RHCSA.'
  },
  {
    id: 'about',
    label: 'ABOUT ME',
    icon: 'User',
    color: 'cyan',
    topPercent: 54,
    leftPercent: 45,
    description: 'High-performance AI engineer dedicated to production software systems.'
  },
  {
    id: 'education',
    label: 'EDUCATION',
    icon: 'GraduationCap',
    color: 'cyan',
    topPercent: 57,
    leftPercent: 71,
    description: 'Jyothy Institute of Technology (CSE, CGPA 8.7) & Stanford ML credentials.'
  },
  {
    id: 'contact',
    label: 'CONTACT',
    icon: 'Send',
    color: 'cyan',
    topPercent: 52,
    leftPercent: 92,
    description: 'Direct communication link, GitHub, LinkedIn, and email coordinates.'
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'hts-tariff',
    title: 'HTS Tariff Classification & GenAI Pipeline',
    role: 'Lead GenAI / Backend Engineer',
    period: 'Aug 2025 – Sep 2026',
    description: 'AI-assisted hierarchical tariff classification system over 4,500+ pages of legal notes and Harmonized Tariff Schedules.',
    highlights: [
      'Engineered hybrid retrieval combining BM25 lexical search and dense semantic embeddings with Reciprocal Rank Fusion (RRF).',
      'Developed hierarchical candidate traversal logic minimizing unnecessary LLM calls by 68%.',
      'Built high-concurrency FastAPI microservices with structured LLM JSON outputs and GRI legal-rule evaluation.'
    ],
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'BM25', 'RRF', 'ChromaDB', 'Docker'],
    metrics: [
      { label: 'Corpus Size', value: '4,500+ Pages' },
      { label: 'Latency Reduction', value: '68% Less LLM Calls' }
    ]
  },
  {
    id: 'cv-people-counter',
    title: 'Real-Time Crowd Analytics & People Counter',
    role: 'Computer Vision Engineer',
    period: 'Sep 2024 – Apr 2025',
    description: 'Multi-stream real-time video analytics platform detecting, counting, and estimating crowd density over simultaneous RTSP camera streams.',
    highlights: [
      'Trained and deployed YOLOv8 object tracking and CSRNet crowd density models.',
      'Achieved sub-18ms inference per frame using NVIDIA CUDA acceleration on Azure GPU VMs.',
      'Integrated FastAPI backend with HLS (HTTP Live Streaming) for low-latency browser monitoring.'
    ],
    technologies: ['Python', 'FastAPI', 'YOLOv8', 'CSRNet', 'PyTorch', 'OpenCV', 'CUDA', 'Azure GPU VMs']
  },
  {
    id: 'resichain',
    title: 'ResiChain – Supply Chain & Logistics Engine',
    role: 'Full-Stack Backend Engineer',
    period: 'May 2025 – Aug 2025',
    description: 'Enterprise logistics operations platform automating messy multi-source manifest ingestion and live shipment telemetry.',
    highlights: [
      'Ingests 50,000+ client Excel rows in under 2.4 seconds with automated validation and ETL transformations.',
      'Containerized with Docker and deployed with SSL on AWS EC2 with 99.9% uptime.'
    ],
    technologies: ['Python', 'FastAPI', 'SQLAlchemy', 'PostgreSQL', 'Docker', 'AWS EC2', 'Angular']
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    company: 'TechCrafter.cps Pvt Ltd.',
    role: 'Software Engineer',
    period: 'Aug 2025 – Sep 2026',
    location: 'Bengaluru, India',
    achievements: [
      'Architected hierarchical classification workflows for US Harmonized Tariff Schedule data.',
      'Contributed to hybrid retrieval pipeline (BM25 + semantic vector search) for candidate identification.',
      'Developed backend services with FastAPI and PostgreSQL, handling document ingestion and structured LLM outputs.'
    ],
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'BM25', 'Hybrid Retrieval', 'LLMs', 'Docker']
  },
  {
    company: 'TechCrafter.cps Pvt Ltd.',
    role: 'Software Engineering Intern',
    period: 'May 2025 – Aug 2025',
    location: 'Bengaluru, India',
    achievements: [
      'Built Python data ingestion pipelines integrating external APIs for supply-chain platforms.',
      'Developed containerized backend microservices on AWS EC2.'
    ],
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'AWS EC2']
  },
  {
    company: 'Quation Solutions Pvt Ltd.',
    role: 'Backend Developer Intern',
    period: 'Sep 2024 – Apr 2025',
    location: 'Bengaluru, India',
    achievements: [
      'Maintained FastAPI REST APIs for real-time computer vision applications.',
      'Worked with YOLOv8, CSRNet, OpenCV, and PyTorch for people counting and crowd tracking.',
      'Deployed deep-learning workloads on Azure Virtual Machines with NVIDIA CUDA infrastructure.'
    ],
    technologies: ['FastAPI', 'YOLOv8', 'CSRNet', 'PyTorch', 'CUDA', 'Azure GPU VMs']
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Generative AI & LLMs',
    skills: ['LangGraph', 'LangChain', 'Hybrid Retrieval (BM25 + Semantic)', 'Reciprocal Rank Fusion (RRF)', 'Structured LLM Outputs', 'ChromaDB', 'Prompt Engineering']
  },
  {
    title: 'AI, ML & Computer Vision',
    skills: ['PyTorch', 'TensorFlow', 'YOLOv8', 'CSRNet Crowd Density', 'OpenCV', 'NVIDIA CUDA Acceleration', 'NumPy', 'Pandas']
  },
  {
    title: 'Backend & APIs',
    skills: ['FastAPI (Async Microservices)', 'PostgreSQL', 'SQLAlchemy ORM', 'REST APIs', 'HLS Video Streaming', 'Data Ingestion Pipelines']
  },
  {
    title: 'Cloud & Systems',
    skills: ['Docker', 'AWS EC2 / S3', 'Azure GPU Virtual Machines', 'Linux (Red Hat RHCSA EX200 Certified)', 'Git & CI/CD']
  }
];
