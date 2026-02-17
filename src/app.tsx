import { Component, useEffect, useRef, useState } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import Scene3DComponent from './components/Scene3D';

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
    period: 'Sep 2025 – Present',
    tag: 'ACTIVE MISSION',
    points: [
      'Building live SaaS platform features with React & PostgreSQL',
      '80%+ test coverage using TDD & enterprise QA standards',
      'Extreme Programming: pair coding, code reviews, Kanban flow',
    ],
  },
  {
    title: 'Tech Support Intern',
    company: 'Bynry Inc.',
    period: 'Jul 2025 – Aug 2025',
    tag: 'COMPLETED',
    points: [
      'API testing & Root Cause Analysis with QA teams',
      'AWS & Jenkins automation for data migration & incident mgmt',
    ],
  },
  {
    title: 'Full Stack Developer Intern',
    company: 'Bharat Intern',
    period: 'Feb 2024 – Mar 2024',
    tag: 'COMPLETED',
    points: [
      'Delivered expense tracker & signup systems (Node.js + MongoDB)',
      'Optimized API response times & secure auth flows',
    ],
  },
];

const projects = [
  {
    title: 'DriveSmarter',
    subtitle: 'AI Vehicle Co-Pilot',
    desc: 'End-to-end AI system integrating vehicle diagnostics with real-time Computer Vision (OpenCV). React/NestJS dashboard for hands-free vehicle telemetry. Backend with Docker + AWS for scalable data processing.',
    tech: ['React', 'NestJS', 'OpenCV', 'Docker', 'AWS'],
    color: '#00ff88',
  },
  {
    title: 'DevOps Chatbot',
    subtitle: 'Automated Infrastructure',
    desc: 'Slack-integrated Jenkins automation for health checks, logs, and service restarts. Docker-deployed with automated CI/CD pipelines for streamlined system maintenance.',
    tech: ['Slack API', 'Jenkins', 'Docker', 'CI/CD'],
    color: '#00d4ff',
  },
  {
    title: 'Event Portal',
    subtitle: 'Serverless Management',
    desc: 'Serverless AWS Amplify backend with S3 for secure image uploads and API Gateway. Full infrastructure management with scalable cloud architecture.',
    tech: ['AWS Amplify', 'S3', 'API Gateway', 'Serverless'],
    color: '#ff00ff',
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
    { label: 'CONTACT', href: '#contact' },
  ];

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
              onClick={() => setMobileOpen(false)}
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

                  <div className="neon-border hud-corners bg-hud-card rounded-lg p-5 card-3d">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-neon-green/10 text-neon-green border border-neon-green/20">
                        {exp.tag}
                      </span>
                      <span className="font-mono text-xs text-white/40">{exp.period}</span>
                    </div>
                    <h4 className="font-heading text-lg tracking-wider text-white mb-1">{exp.title}</h4>
                    <div className="font-mono text-sm text-neon-cyan/70 mb-3">@ {exp.company}</div>
                    <ul className="space-y-2">
                      {exp.points.map((p, i) => (
                        <li key={i} className="font-body text-sm text-white/60 flex gap-2">
                          <span className="text-neon-green/60 mt-0.5">▸</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
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

/* ─── Projects Section ─── */
function ProjectsSection() {
  return (
    <section id="projects" className="relative z-10 py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <RevealSection>
          <div className="font-mono text-neon-green/50 text-xs mb-2 tracking-wider">{'// 04'}</div>
          <h3 className="font-heading text-3xl tablet:text-4xl text-white font-bold tracking-wider mb-2">
            BUILD<span className="text-neon-green">_</span>LOG
          </h3>
          <p className="font-mono text-xs text-neon-cyan/50 mb-10">KEY PROJECTS</p>
        </RevealSection>

        <div className="grid tablet:grid-cols-2 desktop:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <RevealSection key={proj.title}>
              <div
                className="neon-border bg-hud-card rounded-lg p-6 h-full card-3d group hover:shadow-neon transition-all duration-500"
                style={{ borderColor: `${proj.color}20` }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: proj.color, boxShadow: `0 0 8px ${proj.color}` }} />
                  <span className="font-mono text-[10px] tracking-wider" style={{ color: `${proj.color}99` }}>{proj.subtitle.toUpperCase()}</span>
                </div>
                <h4 className="font-heading text-xl tracking-wider text-white mb-3 group-hover:text-neon-green transition-colors">
                  {proj.title}
                </h4>
                <p className="font-body text-sm text-white/50 leading-relaxed mb-4">{proj.desc}</p>
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {proj.tech.map((t) => (
                    <span key={t} className="font-mono text-[10px] px-2 py-0.5 rounded bg-void-200 text-white/40 border border-white/5">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Certifications Section ─── */
function CertificationsSection() {
  return (
    <section className="relative z-10 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <RevealSection>
          <div className="font-mono text-neon-green/50 text-xs mb-2 tracking-wider">{'// 05'}</div>
          <h3 className="font-heading text-3xl tablet:text-4xl text-white font-bold tracking-wider mb-8">
            ACHIEVEMENTS<span className="text-neon-green">_</span>UNLOCKED
          </h3>
        </RevealSection>
        <RevealSection>
          <div className="grid tablet:grid-cols-2 gap-3">
            {certifications.map((cert, idx) => (
              <div key={idx} className="neon-border bg-hud-card rounded-lg p-4 flex items-center gap-3 hover:bg-void-200 transition-colors">
                <div className="font-heading text-lg text-neon-green">✦</div>
                <span className="font-body text-sm text-white/70">{cert}</span>
              </div>
            ))}
          </div>
        </RevealSection>
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
          <ErrorBoundary>
            <Scene3DComponent />
          </ErrorBoundary>
          <Navbar />
          <main className="relative z-10">
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ExperienceSection />
            <ProjectsSection />
            <CertificationsSection />
            <ContactSection />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;