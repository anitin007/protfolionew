import { Project, SkillCategory, ExperienceItem, EducationItem, CertificationItem, ServiceItem } from '../types';

export const PERSONAL_INFO = {
  name: 'K T ANITIN',
  shortName: 'K T ANITIN',
  title: 'Software Developer & Graphic Designer',
  subtitle: 'Building Modern Digital Experiences & High-Impact Visual Media.',
  bio: 'Software Developer, MERN Stack Developer, and Visual Graphic Designer pursuing M.Sc. in Computer Science.',
  philosophy: 'Minimalist approach combining analytical software engineering with high-end aesthetic graphic poster design.',
  location: 'Ernakulam, Kerala, India',
  email: 'anitinktofficial@gmail.com',
  secondaryEmail: 'anitinthomas2003@gmail.com',
  phone: '+91 95676 33243',
  github: 'https://github.com/ANITINKT',
  linkedin: 'https://linkedin.com/in/anitin-k-t',
  instagram: 'https://instagram.com/va.li.ant',
  resumeUrl: '/resume.pdf',
  availableForWork: true,
};

export const PROJECTS: Project[] = [
  {
    id: 'fitaura',
    title: 'FitAura App',
    category: 'App Development',
    subtitle: 'Calorie & Nutrition Tracker Mobile Application',
    description: 'A comprehensive health, workout, and nutrition tracking app built with Flutter & Firebase. Designed with personalized daily dashboards and real-time meal analytics.',
    fullDescription: 'FitAura empowers users to take control of their daily nutrition and fitness goals. Built with Flutter and Google Firebase backend, it delivers a sleek mobile interface featuring a live BMI calculator, customized macro targets, meal & water intake logs, workout tracking, and progress charts.',
    features: [
      'Personalized Nutrition & Calorie Dashboard',
      'Instant BMI Calculator & Weight Goal Targeter',
      'Daily Meal, Water, and Protein Tracker',
      'Workout Activity Logs & Progress Metrics',
      'Firebase Authentication & Real-Time Cloud Sync'
    ],
    techStack: ['Flutter', 'Dart', 'Firebase Auth', 'Cloud Firestore', 'Provider'],
    duration: '1 Month',
    githubUrl: 'https://github.com/ANITINKT',
    liveUrl: '#',
    imageBg: 'from-gray-900 to-black',
    accentColor: '#111111',
    highlights: ['Mobile App', 'Firebase Backend', 'Health Tech']
  },
  {
    id: 'auraline-interiors',
    title: 'Auraline Interiors',
    category: 'Web Development',
    subtitle: 'Cinematic Scroll Interior Design Web Experience',
    description: 'A luxury interior design portfolio showcasing high-end architectural concepts through cinematic scroll-driven animations and canvas image sequence rendering.',
    fullDescription: 'Auraline Interiors redefines web architecture for interior luxury brands. Built with HTML5, CSS3, JavaScript, and GSAP ScrollTrigger, it features sequence canvas rendering that smoothly moves through 3D spatial visual reveals as the user scrolls, complemented by smooth scrolling.',
    features: [
      'Canvas-based Image Sequence Rendering',
      'GSAP ScrollTrigger Cinematic Reveals',
      'Smooth Lenis Inertial Scroll Mechanics',
      'Ultra-Minimal luxury white aesthetic'
    ],
    techStack: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'GSAP ScrollTrigger', 'Lenis Scroll'],
    duration: '2 Weeks',
    liveUrl: 'https://auralineex.netlify.app/',
    githubUrl: 'https://github.com/ANITINKT',
    imageBg: 'from-stone-800 to-neutral-900',
    accentColor: '#000000',
    highlights: ['Live Web App', 'GSAP ScrollTrigger', 'Canvas WebGL']
  },
  {
    id: 'sports-posters',
    title: 'Sports & Football Matchday Graphics',
    category: 'Graphic Design',
    subtitle: 'High-Energy Athletic Posters & Key Visual Assets',
    description: 'A collection of dynamic football posters, matchday announcements, championship visual art, and sports event graphics created with Adobe Photoshop.',
    fullDescription: 'An extensive sports graphic series featuring football matchday announcements, tournament flyers, championship victory graphics, and dynamic player cutouts crafted using advanced photo manipulation, lighting effects, and typography in Adobe Photoshop.',
    features: [
      'Football Matchday & Tournament Graphic Designs',
      'High-Impact Player Photo Manipulation & Lighting',
      'Dynamic Typography & Text Masking Techniques',
      'Social Media & Print Ready Poster Layouts'
    ],
    techStack: ['Adobe Photoshop', 'Graphic Poster Design', 'Typography', 'Photo Editing'],
    duration: '2024 - 2025',
    image: '/images/sports/matchday.jpeg',
    galleryImages: [
      '/images/sports/matchday.jpeg',
      '/images/sports/finalmatch-1 (1).jpg.jpeg',
      '/images/sports/inter goal.jpg.jpeg',
      '/images/sports/champ-1.jpg.jpeg',
      '/images/sports/1223.jpeg',
      '/images/sports/iuft.jpeg'
    ],
    githubUrl: '#',
    liveUrl: '#',
    imageBg: 'from-[#111111] to-[#222222]',
    accentColor: '#111111',
    highlights: ['Football Posters', 'Sports Graphics', 'Photoshop']
  },
  {
    id: 'social-media-design',
    title: 'Social Media & Product Banner Suite',
    category: 'Graphic Design',
    subtitle: 'Promotional Banners, Festival Posters & Ads',
    description: 'Creative social media graphics, product advertisement banners, YouTube thumbnails, and festival greeting posters designed for client engagement.',
    fullDescription: 'Custom social media visual campaigns featuring product promotional posters (earphones, retail shop banners), cultural festival posters, and YouTube video thumbnails. Focused on clean aesthetic hierarchy and vibrant color contrast.',
    features: [
      'Product Promotional Poster Design',
      'Festival & Event Social Media Graphics',
      'YouTube Video Thumbnail Collateral',
      'Custom Brand Color Palettes & Vector Badges'
    ],
    techStack: ['Adobe Photoshop', 'Figma', 'Visual Media Design'],
    duration: '2024 - 2025',
    image: '/images/Social meida/vishu 1.1.jpg',
    galleryImages: [
      '/images/Social meida/vishu 1.1.jpg',
      '/images/Social meida/earphone.jpeg',
      '/images/Social meida/shop.jpeg',
      '/images/Social meida/bwvew.jpeg',
      '/images/Social meida/ghh.jpeg'
    ],
    githubUrl: '#',
    liveUrl: '#',
    imageBg: 'from-[#1a1a1a] to-[#0d0d0d]',
    accentColor: '#111111',
    highlights: ['Social Media Art', 'Photoshop', 'Thumbnails']
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Development & Design',
    categoryKey: 'dev-design',
    icon: 'Code2',
    skills: [
      { name: 'JavaScript', level: 90, description: 'Core Web Logic' }
    ]
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'freelance-design-dev',
    role: 'Freelance Graphic Designer & Software Developer',
    company: 'Self-Employed / Independent Work',
    location: 'Ernakulam, India',
    period: '2023 - Present',
    type: 'Freelance & Contract',
    description: [
      'Designed high-engagement social media posters, YouTube thumbnails, sports/football graphics, and digital marketing banners for diverse clients.',
      'Created cohesive brand identity suites, typography systems, and promotional vector graphics using Adobe Photoshop and Figma.',
      'Developed clean web solutions, custom client websites, and cross-platform apps with modern code architecture.',
    ],
    techUsed: ['Adobe Photoshop', 'Figma', 'JavaScript', 'HTML5/CSS3', 'React/Next.js', 'Graphic Poster Design'],
  }
];

export const EDUCATION: EducationItem[] = [
  {
    id: 'msc-cs',
    degree: 'M.Sc. Computer Science',
    institution: "St. Albert's College (Autonomous)",
    location: 'Ernakulam, Kerala',
    period: '2025 – Present (Pursuing)',
    details: 'Advanced studies in Computer Science algorithms, Advanced Software Engineering, Cloud Architectures, and Mobile Systems.',
    highlights: ['Advanced Algorithm Design', 'Software Engineering', 'System Architecture']
  },
  {
    id: 'bvoc-sd',
    degree: 'B.Voc in Software Development',
    institution: "St. Albert's College (Autonomous)",
    location: 'Ernakulam, Kerala',
    period: '2022 – 2025',
    details: 'Practical software engineering degree focused on web technologies, object-oriented programming, mobile applications, database design, and software project management.',
    highlights: ['Web Development', 'Mobile Application Dev', 'Database Management', 'Practical Software Projects']
  },
  {
    id: 'entri-mern',
    degree: 'MERN Stack Development',
    institution: 'Entri',
    location: 'Online / Remote',
    period: 'Pursuing',
    details: 'Comprehensive full-stack training in MongoDB, Express.js, React, Node.js, REST APIs, state management, and modern Web App engineering.',
    highlights: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Full Stack']
  }
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: 'cert-1',
    title: 'Software Development & Design',
    issuer: 'Professional',
    year: '2025',
    credentialId: 'SD-2025',
    iconName: 'Code',
    link: '#'
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'graphic-poster',
    number: '01',
    title: 'Graphic Poster Design',
    subtitle: 'Social Media & Sports',
    description: 'Custom poster and banner art.',
    deliverables: ['Posters', 'Thumbnails'],
    icon: 'Palette'
  }
];

export const TECH_MARQUEE = [
  { name: 'React', icon: 'Atom' },
  { name: 'Next.js', icon: 'Zap' },
  { name: 'JavaScript', icon: 'FileCode' },
  { name: 'HTML5', icon: 'Layout' },
  { name: 'CSS3', icon: 'Wind' },
  { name: 'Java', icon: 'Coffee' },
  { name: 'Python', icon: 'Terminal' },
  { name: 'Bootstrap', icon: 'Wind' },
  { name: 'MySQL', icon: 'Database' },
  { name: 'Firebase', icon: 'Flame' },
  { name: 'Photoshop', icon: 'Image' },
  { name: 'Figma', icon: 'Figma' },
];
