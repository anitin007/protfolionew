export interface Project {
  id: string;
  title: string;
  category: 'App Development' | 'Web Development' | 'Graphic Design' | string;
  subtitle: string;
  description: string;
  fullDescription: string;
  features: string[];
  techStack: string[];
  duration?: string;
  liveUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
  imageBg: string;
  accentColor: string;
  highlights: string[];
  image?: string;
  galleryImages?: string[];
}

export interface SkillCategory {
  title: string;
  categoryKey: string;
  icon: string;
  skills: {
    name: string;
    level: number;
    icon?: string;
    description: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  description: string[];
  techUsed: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  grade?: string;
  details: string;
  highlights: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  credentialId?: string;
  iconName: string;
  link?: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  icon: string;
}
