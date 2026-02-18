import { Component, useEffect, useRef, useState } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Scene3DComponent from './components/Scene3D';
import CursorParticles from './components/CursorParticles';

/* ─── Error Boundary ─── */
class ErrorBoundary extends Component<{ children: ReactNode; fallback?: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode; fallback?: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn('3D scene error caught:', error, info);
  }
  render() {
    if (this.state.hasError) return this.props.fallback ?? null;
    return this.props.children;
  }
}

/* ─── Data ─── */
const skills = [
  { name: 'Java / Spring Boot', level: 92, color: '#00ff88' },
  { name: 'React / Node.js', level: 85, color: '#00d4ff' },
  { name: 'AWS Cloud', level: 88, color: '#ff00ff' },
  { name: 'DevOps (Docker/CI-CD)', level: 82, color: '#ffdd00' },
  { name: 'PostgreSQL / MongoDB', level: 80, color: '#00ff88' },
  { name: 'DSA / System Design', level: 78, color: '#00d4ff' },
];

const experiences = [
    {
    title: 'Software Engineer Intern',
    company: 'GoBasera',
    link: 'https://gobasera.com/',
    period: 'Sep 2025 – Nov 2025',
    tag: 'ACTIVE MISSION',
    points: [
      'Building live SaaS platform features with React & PostgreSQL',
      '80%+ test coverage using TDD & enterprise QA standards',
      'Extreme Programming: pair coding, code reviews, Kanban flow',
    ],
    missionDetails: [
      'Contributed to the design, development, and deployment of live platform features using React and NestJS',
      'Architected and implemented Razorpay payment gateways to handle secure SaaS transactions',
      'Maintained a strict 80%+ test coverage standard using Test-Driven Development (TDD)',
      'Conducted multi-layer testing, including Unit, Integration, and E2E testing with Playwright',
      'Automated workflows using GitHub Actions and CI/CD pipelines for seamless deployments',
    ],
    skills: [
      { category: 'Frontend', tech: ['React', 'React Native', 'TypeScript'] },
      { category: 'Backend', tech: ['NestJS', 'PostgreSQL', 'REST APIs'] },
      { category: 'Testing', tech: ['Playwright', 'TDD', 'Jest'] },
      { category: 'DevOps', tech: ['Docker', 'GitHub Actions', 'CI/CD'] },
      { category: 'Workflow', tech: ['Pair Programming', 'Code Reviews', 'Kanban'] },
    ],
  },

  {
    title: 'Artificial Intelligence and Data Analysis',
    company: 'Edunet and Shell',
    link: 'https://edunetfoundation.org/',
    period: 'July 2025 – Aug 2025',
    tag: 'COMPLETED',
    points: [
      'Built a high-performance classification tool using React, Vite, and TypeScript',
      'Integrated Supabase for secure image storage and backend data management',
      'Streamlined the user journey from image upload to AI-driven identification with a focus on low latency',
    ],
    missionDetails: [
      'Built a high-performance classification tool using React, Vite, and TypeScript',
      'Integrated Supabase for secure image storage and backend data management',
      'Streamlined the user journey from image upload to AI-driven identification with a focus on low latency',
      'Developed machine learning models for data classification and prediction',
      'Collaborated with the team to optimize model performance and accuracy',
    ],
    skills: [
      { category: 'Frontend', tech: ['React', 'Vite', 'TypeScript'] },
      { category: 'Backend', tech: ['Supabase', 'Node.js', 'REST APIs'] },
      { category: 'AI/ML', tech: ['Machine Learning', 'Data Analysis', 'Python'] },
      { category: 'Tools', tech: ['Git', 'VS Code', 'Jupyter'] },
    ],
  },

  {
    title: 'Tech Support Intern',
    company: 'Bynry Inc.',
    link: 'https://www.bynry.com/',
    period: 'Jul 2025 – Aug 2025',
    tag: 'COMPLETED',
    points: [
      'API testing & Root Cause Analysis with QA teams',
      'AWS & Jenkins automation for data migration & incident mgmt',
    ],
    missionDetails: [
      'Conducted API testing and Root Cause Analysis in collaboration with QA teams',
      'Automated data migration processes using AWS services',
      'Implemented Jenkins automation for incident management and resolution',
      'Monitored system health and performance metrics',
      'Created documentation for support procedures and troubleshooting guides',
    ],
    skills: [
      { category: 'Cloud', tech: ['AWS', 'EC2', 'S3'] },
      { category: 'DevOps', tech: ['Jenkins', 'Docker', 'CI/CD'] },
      { category: 'Testing', tech: ['API Testing', 'Postman', 'Selenium'] },
      { category: 'Support', tech: ['Troubleshooting', 'Documentation', 'RCA'] },
    ],
  },
  {
    title: 'Full Stack Developer Intern',
    company: 'Bharat Intern',
    link: 'https://bharatinternship.com/',
    period: 'Feb 2024 – Mar 2024',
    tag: 'COMPLETED',
    points: [
      'Delivered expense tracker & signup systems (Node.js + MongoDB)',
      'Optimized API response times & secure auth flows',
    ],
    missionDetails: [
      'Delivered a fully functional expense tracker application using Node.js and MongoDB',
      'Implemented secure authentication flows with JWT and bcrypt',
      'Optimized API response times through efficient database queries and indexing',
      'Designed and developed user signup and login systems',
      'Collaborated with mentors to follow best practices in code structure',
    ],
    skills: [
      { category: 'Frontend', tech: ['HTML', 'CSS', 'JavaScript'] },
      { category: 'Backend', tech: ['Node.js', 'Express', 'MongoDB'] },
      { category: 'Authentication', tech: ['JWT', 'Bcrypt', 'OAuth'] },
      { category: 'Tools', tech: ['Git', 'Postman', 'MongoDB Atlas'] },
    ],
  },
];

const projects = [
  {
    title: 'DriveSmarter',
    subtitle: 'AI Vehicle Co-Pilot',
    link: 'https://github.com/shriyashsawant/CodeName-Chariot',
    desc: 'End-to-end AI system integrating vehicle diagnostics with real-time Computer Vision (OpenCV). React/NestJS dashboard for hands-free vehicle telemetry. Backend with Docker + AWS for scalable data processing.',
    tech: ['React', 'NestJS', 'OpenCV', 'Docker', 'AWS'],
    color: '#00ff88',
    image: '/images/project-drivesmarter.png',
  },
  {
    title: 'DevOps Chatbot',
    subtitle: 'Automated Infrastructure',
    link: 'https://github.com/shriyashsawant/devops-chatbot-java',
    desc: 'Slack-integrated Jenkins automation for health checks, logs, and service restarts. Docker-deployed with automated CI/CD pipelines for streamlined system maintenance.',
    tech: ['Slack API', 'Jenkins', 'Docker', 'CI/CD'],
    color: '#00d4ff',
    image: '/images/project-devops-chatbot.png',
  },
  {
    title: 'Event Portal',
    subtitle: 'Serverless Management',
    link: 'https://github.com/shriyashsawant/Event_Managment_Portal',
    desc: 'Serverless AWS Amplify backend with S3 for secure image uploads and API Gateway. Full infrastructure management with scalable cloud architecture.',
    tech: ['AWS Amplify', 'S3', 'API Gateway', 'Serverless'],
    color: '#ff00ff',
    image: '/images/project-event-portal.png',
  },
];

const certifications = [
  'AWS Academy Cloud Foundations (2024)',
  'AWS APAC Solutions Architecture – Forage (2025)',
  'Verizon Cloud Platform – Forage (2025)',
  'Web Development – Teachnook & IIT Bhubaneswar',
  'Linguaskill – Soft Skills Certification',
];

/* ─── Hook: Intersection observer for reveal animations ─── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          obs.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function RevealSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal-section ${className}`}>
      {children}
    </div>
  );
}

/* ─── Loading Screen ─── */
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [lines, setLines] = useState<string[]>([]);

  const bootLines = [
    '> Initializing SHRIYASH.exe ...',
    '> Loading neural networks ████████ OK',
    '> Connecting to cloud matrix ████████ OK',
    '> Rendering 3D viewport ...',
    '> Compiling skill modules ████████ OK',
    '> System ready. Welcome, Player.',
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < bootLines.length) {
        setLines((prev) => [...prev, bootLines[i]]);
        setProgress(((i + 1) / bootLines.length) * 100);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 600);
      }
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-void">
      <div className="w-full max-w-lg px-6">
        <h2 className="font-heading text-neon-green text-2xl mb-6 tracking-wider animate-pulse-neon">
          SYSTEM BOOT
        </h2>
        <div className="font-mono text-sm space-y-1 mb-8 min-h-[180px]">
          {lines.map((line, idx) => (
            <div key={idx} className="text-neon-green/80 animate-fade-in">{line}</div>
          ))}
          {progress < 100 && <span className="text-neon-green animate-blink">█</span>}
        </div>
        <div className="w-full h-1 bg-void-200 rounded overflow-hidden">
          <div
            className="h-full bg-neon-green transition-all duration-300 shadow-neon"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="font-mono text-xs text-neon-green/50 mt-2">{Math.round(progress)}% LOADED</div>
      </div>
    </div>
  );
}

/* ─── Navbar ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const links = [
    { label: 'ABOUT', href: '#about' },
    { label: 'SKILLS', href: '#skills' },
    { label: 'XP', href: '#experience' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'CERTS', href: '#certifications' },
    { label: 'CONTACT', href: '#contact' },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-void/90 backdrop-blur-md border-b border-neon-green/10' : ''}`}>
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#" className="font-heading text-neon-green text-lg tracking-widest hover:text-neon-cyan transition-colors">
          SS<span className="text-neon-cyan">.</span>exe
        </a>
        <div className="hidden tablet:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={(e) => handleSmoothScroll(e, l.href)}
              className="font-heading text-xs tracking-wider text-white/60 hover:text-neon-green transition-colors relative group"
            >
              {l.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-neon-green transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>
        <button
          className="tablet:hidden text-neon-green font-mono text-sm"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? '[X]' : '[≡]'}
        </button>
      </div>
      {mobileOpen && (
        <div className="tablet:hidden bg-void/95 backdrop-blur-md border-t border-neon-green/10 px-4 py-4 space-y-3">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="block font-heading text-sm tracking-wider text-white/70 hover:text-neon-green transition-colors"
              onClick={(e) => handleSmoothScroll(e, l.href)}
            >
              {'> '}{l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ─── Hero Section ─── */
function HeroSection() {
  const [typed, setTyped] = useState('');
  const fullText = 'Software Engineer // Cloud Architect // AI Enthusiast';

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        setTyped(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-16">
      <div className="text-center z-10 max-w-4xl">
        <div className="font-mono text-neon-green/60 text-xs tracking-[0.3em] mb-4 animate-fade-in">
          {'// PLAYER_ONE.INIT'}
        </div>
        <h1 className="font-heading text-5xl tablet:text-7xl desktop:text-8xl font-bold mb-4 tracking-wider">
          <span className="glitch-text text-white" data-text="SHRIYASH">SHRIYASH</span>
        </h1>
        <h2 className="font-heading text-2xl tablet:text-3xl desktop:text-4xl text-neon-green font-semibold mb-6 tracking-wide">
          SAWANT
        </h2>
        <div className="font-mono text-sm tablet:text-base text-neon-cyan/80 mb-8 min-h-[24px]">
          <span>{typed}</span>
          <span className="animate-blink text-neon-green">█</span>
        </div>
        <div className="flex flex-col tablet:flex-row gap-4 justify-center items-center mb-8">
          <a
            href="#projects"
            className="neon-border hud-corners px-8 py-3 font-heading text-sm tracking-wider text-neon-green hover:bg-neon-green/10 transition-all hover:shadow-neon"
          >
            VIEW PROJECTS
          </a>
          <a
            href="#contact"
            className="neon-border-cyan px-8 py-3 font-heading text-sm tracking-wider text-neon-cyan hover:bg-neon-cyan/10 transition-all hover:shadow-neon-cyan"
          >
            CONNECT
          </a>
        </div>
        <div className="flex justify-center gap-6 font-mono text-xs text-white/40">
          <a href="https://linkedin.com/in/shriyash-sawant-5a6a6120a" target="_blank" rel="noopener noreferrer" className="hover:text-neon-green transition-colors">[LinkedIn]</a>
          <a href="https://github.com/shriyashsawant" target="_blank" rel="noopener noreferrer" className="hover:text-neon-cyan transition-colors">[GitHub]</a>
          <a href="mailto:shriyashsantoshsawant@gmail.com" className="hover:text-neon-magenta transition-colors">[Email]</a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
          <span className="font-mono text-[10px] tracking-[0.3em] text-neon-green/40">SCROLL</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-neon-green/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}

/* ─── About Section ─── */
function AboutSection() {
  return (
    <section id="about" className="relative z-10 py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <RevealSection>
          <div className="font-mono text-neon-green/50 text-xs mb-2 tracking-wider">{'// 01'}</div>
          <h3 className="font-heading text-3xl tablet:text-4xl text-white font-bold tracking-wider mb-8">
            ABOUT<span className="text-neon-green">_</span>ME
          </h3>
        </RevealSection>
        <RevealSection>
          <div className="neon-border hud-corners bg-hud-card rounded-lg p-6 tablet:p-8">
            <div className="grid tablet:grid-cols-3 gap-6">
              <div className="tablet:col-span-2">
                <p className="font-body text-lg text-white/80 leading-relaxed mb-4">
                  Computer Engineering student specializing in <span className="text-neon-green font-semibold">Cloud Computing</span> and{' '}
                  <span className="text-neon-cyan font-semibold">AI/ML</span>, driven by a deep-seated interest in high-precision engineering
                  and Japanese technological innovation.
                </p>
                <p className="font-body text-base text-white/60 leading-relaxed">
                  Expert in Java/JEE and Spring Boot with a proven track record of building scalable SaaS solutions and AI-driven automation.
                  Committed to the philosophy of <span className="text-neon-magenta">Kaizen</span> — continuous improvement — and eager to
                  contribute technical rigor to global engineering teams.
                </p>
              </div>
              <div className="space-y-4">
                <div className="neon-border rounded-lg p-4 text-center">
                  <div className="font-heading text-2xl text-neon-green">B.Tech</div>
                  <div className="font-mono text-xs text-white/50 mt-1">MIT ADT University</div>
                  <div className="font-mono text-xs text-neon-cyan/60">2022 – 2026</div>
                </div>
                <div className="neon-border-cyan rounded-lg p-4 text-center">
                  <div className="font-heading text-lg text-neon-cyan">Pune, India</div>
                  <div className="font-mono text-xs text-white/50 mt-1">Base Location</div>
                </div>
              </div>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

/* ─── Skills Section ─── */
function SkillsSection() {
  return (
    <section id="skills" className="relative z-10 py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <RevealSection>
          <div className="font-mono text-neon-green/50 text-xs mb-2 tracking-wider">{'// 02'}</div>
          <h3 className="font-heading text-3xl tablet:text-4xl text-white font-bold tracking-wider mb-2">
            SKILL<span className="text-neon-green">_</span>TREE
          </h3>
          <p className="font-mono text-xs text-neon-cyan/50 mb-10">POWER LEVELS</p>
        </RevealSection>

        <div className="grid gap-5">
          {skills.map((skill, idx) => (
            <RevealSection key={skill.name}>
              <div className="flex items-center gap-4">
                <div className="font-mono text-xs text-white/30 w-8">{String(idx + 1).padStart(2, '0')}</div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="font-heading text-sm tracking-wider text-white/90">{skill.name}</span>
                    <span className="font-mono text-xs" style={{ color: skill.color }}>{skill.level}/100</span>
                  </div>
                  <div className="w-full h-2 bg-void-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full skill-bar-fill"
                      style={{
                        '--bar-width': `${skill.level}%`,
                        backgroundColor: skill.color,
                        boxShadow: `0 0 10px ${skill.color}40`,
                      } as React.CSSProperties}
                    />
                  </div>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>

        <RevealSection className="mt-10">
          <div className="neon-border rounded-lg p-5 bg-hud-card">
            <h4 className="font-heading text-sm tracking-wider text-neon-green mb-4">TECH_INVENTORY</h4>
            <div className="flex flex-wrap gap-2">
              {['Java/JEE', 'Spring Boot', 'React', 'Node.js', 'AWS', 'Docker', 'Jenkins', 'PostgreSQL', 'MongoDB', 'TypeScript', 'Hibernate', 'REST APIs', 'Microservices', 'GitHub Actions', 'Nginx', 'Tailwind CSS'].map((t) => (
                <span key={t} className="font-mono text-xs px-3 py-1.5 rounded bg-void-200 text-neon-cyan/70 border border-neon-cyan/10 hover:border-neon-cyan/30 hover:text-neon-cyan transition-all cursor-default">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

/* ─── Experience Section ─── */
function ExperienceSection() {
  const [expandedMission, setExpandedMission] = useState<number | null>(null);

  const toggleMission = (idx: number) => {
    setExpandedMission(expandedMission === idx ? null : idx);
  };

  return (
    <section id="experience" className="relative z-10 py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <RevealSection>
          <div className="font-mono text-neon-green/50 text-xs mb-2 tracking-wider">{'// 03'}</div>
          <h3 className="font-heading text-3xl tablet:text-4xl text-white font-bold tracking-wider mb-2">
            MISSION<span className="text-neon-green">_</span>LOG
          </h3>
          <p className="font-mono text-xs text-neon-cyan/50 mb-10">EXPERIENCE TIMELINE</p>
        </RevealSection>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 tablet:left-6 top-0 bottom-0 w-[1px] bg-gradient-to-b from-neon-green/30 via-neon-cyan/20 to-transparent" />

          <div className="space-y-8">
            {experiences.map((exp, idx) => (
              <RevealSection key={idx}>
                <div className="relative pl-12 tablet:pl-16">
                  {/* Node */}
                  <div className="absolute left-2.5 tablet:left-4.5 top-2 w-3 h-3 rounded-full border-2 border-neon-green bg-void shadow-neon" />

                  <div 
                    className="neon-border hud-corners bg-hud-card rounded-lg p-5 card-3d cursor-pointer hover:border-neon-green/50 transition-all"
                    onClick={() => toggleMission(idx)}
                  >
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-neon-green/10 text-neon-green border border-neon-green/20">
                        {exp.tag}
                      </span>
                      <span className="font-mono text-xs text-white/40">{exp.period}</span>
                      <span className="font-mono text-xs text-neon-cyan/50 ml-auto">
                        [{expandedMission === idx ? 'CLOSE' : 'VIEW'} MISSION]
                      </span>
                    </div>
                    <h4 className="font-heading text-lg tracking-wider text-white mb-1">{exp.title}</h4>
                    <a href={exp.link} target="_blank" rel="noopener noreferrer" className="font-mono text-sm text-neon-cyan/70 mb-3 hover:text-neon-green hover:underline">
                      @ {exp.company}
                    </a>
                    <ul className="space-y-2">
                      {exp.points.map((p: string, i: number) => (
                        <li key={i} className="font-body text-sm text-white/60 flex gap-2">
                          <span className="text-neon-green/60 mt-0.5">▸</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Expanded Mission Details */}
                    <AnimatePresence>
                      {expandedMission === idx && exp.missionDetails && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-6 pt-4 border-t border-neon-green/20 overflow-hidden"
                        >
                          <div className="bg-void/50 rounded-lg p-4">
                            <h5 className="font-heading text-sm tracking-wider text-neon-green mb-4">
                              MISSION INTEL: {exp.company.toUpperCase()}
                            </h5>
                            
                            <div className="grid tablet:grid-cols-2 gap-4 mb-4">
                              <div>
                                <span className="font-mono text-xs text-white/40">ROLE:</span>
                                <p className="font-body text-sm text-white/80">{exp.title}</p>
                              </div>
                              <div>
                                <span className="font-mono text-xs text-white/40">TIMELINE:</span>
                                <p className="font-body text-sm text-white/80">{exp.period}</p>
                              </div>
                            </div>

                            <div className="mb-4">
                              <span className="font-mono text-xs text-neon-cyan/70 block mb-2">DETAILED MISSION OBJECTIVES:</span>
                              <ul className="space-y-2">
                                {exp.missionDetails.map((detail: string, i: number) => (
                                  <li key={i} className="font-body text-xs text-white/60 flex gap-2">
                                    <span className="text-neon-cyan/60 mt-0.5">▸</span>
                                    <span>{detail}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {exp.skills && (
                              <div>
                                <span className="font-mono text-xs text-neon-green/70 block mb-2">SKILLS MASTERED (TECH STACK):</span>
                                <div className="grid tablet:grid-cols-2 gap-2">
                                  {exp.skills.map((skillGroup, i: number) => (
                                    <div key={i} className="flex items-start gap-2">
                                      <span className="font-mono text-[10px] text-neon-green/60 min-w-[80px]">{skillGroup.category}:</span>
                                      <div className="flex flex-wrap gap-1">
                                        {skillGroup.tech.map((tech: string, j: number) => (
                                          <span key={j} className="font-mono text-[10px] px-2 py-0.5 rounded bg-void-200 text-white/50 border border-white/5">
                                            {tech}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Framer Motion Variants ─── */
const sectionVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: i * 0.15,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const certVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

/* ─── Projects Section ─── */
function ProjectsSection() {
  return (
    <section id="projects" className="relative z-10 py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <RevealSection>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}
          >
            <div className="font-mono text-neon-green/50 text-xs mb-2 tracking-wider">{'// 04'}</div>
            <h3 className="font-heading text-3xl tablet:text-4xl text-white font-bold tracking-wider mb-2">
              BUILD<span className="text-neon-green">_</span>LOG
            </h3>
            <p className="font-mono text-xs text-neon-cyan/50 mb-10">KEY PROJECTS</p>
          </motion.div>
        </RevealSection>

        <div className="grid tablet:grid-cols-2 desktop:grid-cols-3 gap-6">
          {projects.map((proj, idx) => (
            <motion.div
              key={proj.title}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 },
              }}
            >
              <div
                className="neon-border bg-hud-card rounded-lg overflow-hidden h-full card-3d group hover:shadow-neon transition-all duration-500"
                style={{ borderColor: `${proj.color}20` }}
              >
                {/* Project Image */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-80"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                    style={{ background: `linear-gradient(135deg, ${proj.color}20, transparent)` }}
                  />
                  {/* Scan line overlay on image */}
                  <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.1)_2px,rgba(0,0,0,0.1)_4px)] pointer-events-none" />
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: proj.color, boxShadow: `0 0 8px ${proj.color}` }} />
                    <span className="font-mono text-[10px] tracking-wider" style={{ color: `${proj.color}99` }}>{proj.subtitle.toUpperCase()}</span>
                  </div>
                  <a href={proj.link} target="_blank" rel="noopener noreferrer" className="block">
                    <h4 className="font-heading text-xl tracking-wider text-white mb-3 group-hover:text-neon-green transition-colors">
                      {proj.title}
                    </h4>
                  </a>
                  <p className="font-body text-sm text-white/50 leading-relaxed mb-4">{proj.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {proj.tech.map((t) => (
                      <span key={t} className="font-mono text-[10px] px-2 py-0.5 rounded bg-void-200 text-white/40 border border-white/5">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Certifications Section ─── */
function CertificationsSection() {
  return (
    <section id="certifications" className="relative z-10 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <RevealSection>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}
          >
            <div className="font-mono text-neon-green/50 text-xs mb-2 tracking-wider">{'// 05'}</div>
            <h3 className="font-heading text-3xl tablet:text-4xl text-white font-bold tracking-wider mb-8">
              ACHIEVEMENTS<span className="text-neon-green">_</span>UNLOCKED
            </h3>
          </motion.div>
        </RevealSection>
        <div className="grid tablet:grid-cols-2 gap-3">
          {certifications.map((cert, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={certVariants}
              whileHover={{
                scale: 1.02,
                x: 5,
                transition: { duration: 0.2 },
              }}
            >
              <div className="neon-border bg-hud-card rounded-lg p-4 flex items-center gap-3 hover:bg-void-200 hover:border-neon-green/30 transition-all duration-300 cursor-default">
                <div className="font-heading text-lg text-neon-green animate-pulse-neon">✦</div>
                <span className="font-body text-sm text-white/70">{cert}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Contact Section ─── */
function ContactSection() {
  return (
    <section id="contact" className="relative z-10 py-24 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <RevealSection>
          <div className="font-mono text-neon-green/50 text-xs mb-2 tracking-wider">{'// 06'}</div>
          <h3 className="font-heading text-3xl tablet:text-4xl text-white font-bold tracking-wider mb-6">
            INIT<span className="text-neon-green">_</span>CONNECTION
          </h3>
        </RevealSection>

        <RevealSection>
          <div className="neon-border hud-corners bg-hud-card rounded-lg p-8">
            <div className="font-mono text-sm text-white/40 mb-6 text-left">
              <span className="text-neon-green">root@shriyash</span>:<span className="text-neon-cyan">~</span>$ cat contact_info.txt
            </div>
            <div className="space-y-4 text-left font-mono text-sm">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-neon-green/60">EMAIL:</span>
                <a href="mailto:shriyashsantoshsawant@gmail.com" className="text-neon-cyan hover:text-neon-green transition-colors break-all">
                  shriyashsantoshsawant@gmail.com
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-neon-green/60">PHONE:</span>
                <span className="text-white/70">+91 9511746917</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-neon-green/60">LOCATION:</span>
                <span className="text-white/70">Pune, India</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-neon-green/60">LINKEDIN:</span>
                <a href="https://linkedin.com/in/shriyash-sawant-5a6a6120a" target="_blank" rel="noopener noreferrer" className="text-neon-cyan hover:text-neon-green transition-colors break-all">
                  linkedin.com/in/shriyash-sawant-5a6a6120a
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-neon-green/60">GITHUB:</span>
                <a href="https://github.com/shriyashsawant" target="_blank" rel="noopener noreferrer" className="text-neon-cyan hover:text-neon-green transition-colors break-all">
                  github.com/shriyashsawant
                </a>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-neon-green/10">
              <div className="font-mono text-xs text-white/30 typing-cursor">
                Ready to collaborate? Let's build something amazing together
              </div>
            </div>
          </div>
        </RevealSection>

        <RevealSection className="mt-8">
          <div className="flex justify-center gap-4">
            <a
              href="mailto:shriyashsantoshsawant@gmail.com"
              className="neon-border px-6 py-3 font-heading text-sm tracking-wider text-neon-green hover:bg-neon-green/10 transition-all hover:shadow-neon rounded-lg"
            >
              SEND_MESSAGE
            </a>
            <a
              href="https://linkedin.com/in/shriyash-sawant-5a6a6120a"
              target="_blank"
              rel="noopener noreferrer"
              className="neon-border-cyan px-6 py-3 font-heading text-sm tracking-wider text-neon-cyan hover:bg-neon-cyan/10 transition-all hover:shadow-neon-cyan rounded-lg"
            >
              LINKEDIN
            </a>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="relative z-10 py-8 px-4 border-t border-neon-green/5">
      <div className="max-w-4xl mx-auto text-center">
        <div className="font-mono text-xs text-white/20">
          © 2026 SHRIYASH SAWANT — Crafted with code & creativity
        </div>
        <div className="font-mono text-[10px] text-neon-green/20 mt-1">
          v1.0.0 // SHRIYASH.exe
        </div>
      </div>
    </footer>
  );
}

/* ─── Main App ─── */
function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="scanline-overlay grid-bg">
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      {!loading && (
        <>
          <CursorParticles />
          <ErrorBoundary>
            <Scene3DComponent />
          </ErrorBoundary>
          <Navbar />
          <AnimatePresence>
            <motion.main
              className="relative z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <HeroSection />
              <AboutSection />
              <SkillsSection />
              <ExperienceSection />
              <ProjectsSection />
              <CertificationsSection />
              <ContactSection />
            </motion.main>
          </AnimatePresence>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;