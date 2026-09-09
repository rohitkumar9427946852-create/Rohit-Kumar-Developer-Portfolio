import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  BadgeCheck,
  BrainCircuit,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  CircleDot,
  Code2,
  CodeXml,
  Command,
  ExternalLink,
  FileText,
  Github,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MessageSquare,
  Monitor,
  Network,
  PanelTop,
  Search,
  Send,
  ServerCog,
  Sparkles,
  Terminal,
  X,
} from 'lucide-react';
import { portfolio, type Project } from '@/data/portfolio';

const sectionIds = portfolio.nav.map((item) => item.id);

function Brand() {
  return (
    <a href="#home" className="focus-ring flex items-center gap-3 rounded-lg" data-testid="link-brand">
      <span className="grid size-9 place-items-center rounded-lg border border-primary/40 bg-primary/10 text-primary">
        <Command size={18} strokeWidth={2.5} />
      </span>
      <span className="font-display text-[15px] font-bold tracking-tight text-slate-100">
        ROHIT<span className="text-primary">.DEV</span>
      </span>
    </a>
  );
}

function ResumeButton() {
  const [available, setAvailable] = useState(false);
  useEffect(() => {
    fetch('/resume.pdf', { method: 'HEAD' }).then((response) => setAvailable(response.ok && response.headers.get('content-type')?.includes('application/pdf') === true)).catch(() => setAvailable(false));
  }, []);
  return available ? (
    <a href="/resume.pdf" download className="focus-ring rounded-lg bg-primary px-3.5 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-background transition hover:bg-primary/90">
      Resume
    </a>
  ) : (
    <button type="button" disabled className="cursor-not-allowed rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.1em] text-slate-600" title="Add your resume at public/resume.pdf to enable this button">
      Resume pending
    </button>
  );
}

function Navigation({ active, open, onToggle }: { active: string; open: boolean; onToggle: () => void }) {
  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-white/[0.06] bg-[hsl(225_36%_8%/.82)] backdrop-blur-xl">
      <div className="section-wrap flex h-[72px] items-center justify-between">
        <Brand />
        <nav className={`${open ? 'absolute left-4 right-4 top-[82px] flex' : 'hidden'} rounded-2xl border border-white/10 bg-[hsl(225_31%_11%/.98)] p-2 shadow-2xl shadow-black/30 md:static md:flex md:items-center md:gap-1 md:border-0 md:bg-transparent md:p-0 md:shadow-none`} aria-label="Primary navigation">
          {portfolio.nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={onToggle}
              className={`focus-ring flex items-center gap-2 rounded-lg px-3 py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors ${active === item.id ? 'bg-primary/10 text-primary' : 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-100'}`}
              data-testid={`link-nav-${item.id}`}
            >
              <span className={`size-1.5 rounded-full ${active === item.id ? 'bg-primary' : 'bg-slate-600'}`} />
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-1 sm:flex">
            <a href={portfolio.social.github} target="_blank" rel="noreferrer" aria-label="Visit Rohit's GitHub" className="focus-ring grid size-9 place-items-center rounded-lg text-slate-500 transition hover:bg-white/[0.04] hover:text-primary"><Github size={16} /></a>
            <a href={portfolio.social.linkedin} target="_blank" rel="noreferrer" aria-label="Visit Rohit's LinkedIn" className="focus-ring grid size-9 place-items-center rounded-lg text-slate-500 transition hover:bg-white/[0.04] hover:text-primary"><Linkedin size={16} /></a>
          </div>
          <a href="#contact" className="focus-ring hidden items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-3.5 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-primary transition hover:bg-primary/20 sm:flex" data-testid="link-nav-connect">
            <Mail size={14} /> Connect
          </a>
          <div className="hidden lg:block"><ResumeButton /></div>
          <button type="button" className="focus-ring grid size-10 place-items-center rounded-lg border border-white/10 text-slate-300 md:hidden" onClick={onToggle} aria-label={open ? 'Close menu' : 'Open menu'} data-testid="button-menu">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}

function SectionHeading({ index, eyebrow, title, copy }: { index: string; eyebrow: string; title: string; copy?: string }) {
  return (
    <div className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-primary">
          <span className="text-slate-600">{index}</span><span className="h-px w-8 bg-primary/60" />{eyebrow}
        </p>
        <h2 className="font-display text-3xl font-semibold tracking-[-0.04em] text-slate-100 sm:text-4xl">{title}</h2>
      </div>
      {copy && <p className="max-w-sm text-sm leading-6 text-slate-400 md:text-right">{copy}</p>}
    </div>
  );
}

function TerminalCard() {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState('Type a command to inspect the workspace.');
  const terminalLines: Record<string, string> = {
    help: 'available: about · skills · education · projects · contact · clear',
    about: 'Rohit Kumar — CSE (AI/ML), 3rd Year, Lucknow',
    skills: 'HTML · CSS · JavaScript · React · MERN · Java · C · Python',
    education: 'B.Tech CSE (AI/ML) · CGPA 8.7 · graduation 2028',
    projects: '3 selected projects indexed in /projects',
    contact: portfolio.email,
  };
  const run = (event?: FormEvent) => {
    event?.preventDefault();
    const clean = command.trim().toLowerCase();
    if (clean === 'clear') setOutput('');
    else setOutput(terminalLines[clean] ?? `command not found: ${clean || '∅'} · try "help"`);
    setCommand('');
  };
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b111d]/95 shadow-[0_25px_80px_-35px_hsl(190_94%_62%/.3)]">
      <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-rose-400/80" /><span className="size-2 rounded-full bg-amber-300/80" /><span className="size-2 rounded-full bg-emerald-400/80" />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">rohit@dev — terminal</span>
        <Terminal size={14} className="text-slate-500" />
      </div>
      <div className="min-h-[204px] p-5 font-mono text-xs leading-7 sm:p-6">
        <div className="mb-3 text-slate-500">Last login: today · workspace/portfolio</div>
        <div className="flex gap-2 text-primary"><span>›</span><span>whoami</span></div>
        <div className="mb-3 pl-4 text-slate-300">rohit.kumar / builder-in-progress</div>
        <div className="flex gap-2 text-primary"><span>›</span><span>status</span></div>
        <div className="mb-3 pl-4 text-emerald-300"><span className="mr-2 inline-block size-1.5 rounded-full bg-emerald-300 align-middle pulse-dot" />learning in public</div>
        {output && <div className="mb-3 flex gap-2 text-slate-300"><span className="text-primary">↳</span><span>{output}</span></div>}
        <form className="flex items-center gap-2" onSubmit={run}>
          <span className="text-primary">›</span>
          <label htmlFor="terminal-command" className="sr-only">Terminal command</label>
          <input id="terminal-command" value={command} onChange={(e) => setCommand(e.target.value)} className="min-w-0 flex-1 bg-transparent text-slate-100 outline-none placeholder:text-slate-600" placeholder="try help" autoComplete="off" data-testid="input-terminal-command" />
          <span className="cursor-blink text-primary">▋</span>
        </form>
      </div>
      <div className="absolute -right-14 -top-20 size-40 rounded-full border border-primary/10" />
      <div className="absolute -right-7 -top-13 size-28 rounded-full border border-violet-400/10" />
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="relative flex min-h-[700px] items-center overflow-hidden pt-24">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute left-[8%] top-[24%] size-64 rounded-full bg-primary/[0.06] blur-3xl" />
      <div className="absolute bottom-[8%] right-[6%] size-72 rounded-full bg-violet-400/[0.05] blur-3xl" />
      <div className="section-wrap relative grid items-center gap-14 py-16 lg:grid-cols-[1.08fr_.92fr] lg:gap-20 lg:py-24">
        <div className="reveal">
           <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-300">
             <span className="size-1.5 rounded-full bg-emerald-300 pulse-dot" /> Available for opportunities
          </div>
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.22em] text-slate-500">Hello, I&apos;m Rohit Kumar</p>
          <h1 className="max-w-3xl font-display text-[clamp(3.15rem,8vw,6.8rem)] font-semibold leading-[.92] tracking-[-0.075em] text-slate-100">
            Learning to build<br /><span className="text-primary">what&apos;s next.</span>
          </h1>
           <p className="mt-7 max-w-xl text-[15px] leading-7 text-slate-400 sm:text-base">{portfolio.intro}</p>
           <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-primary/80">{portfolio.role}</p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#projects" className="focus-ring group inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-3 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-background transition hover:bg-primary/90" data-testid="link-hero-projects">
              Explore projects <ArrowDown size={15} className="transition-transform group-hover:translate-y-0.5" />
            </a>
            <a href="#contact" className="focus-ring inline-flex items-center gap-2 rounded-lg border border-white/12 px-4 py-3 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-slate-300 transition hover:border-primary/40 hover:text-primary" data-testid="link-hero-contact">
              Say hello <ArrowUpRight size={15} />
            </a>
          </div>
          <div className="mt-10 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-600">
            <span className="flex items-center gap-2"><MapPin size={13} className="text-primary/70" /> Lucknow, India</span>
            <span className="h-3 w-px bg-slate-700" />
            <span>Open to learning</span>
          </div>
        </div>
        <div className="reveal reveal-delay-2 relative">
          <div className="absolute -inset-4 rounded-[28px] border border-primary/[0.07] float-slow" />
          <TerminalCard />
          <div className="mt-5 grid grid-cols-3 gap-2">
            {portfolio.focusAreas.map((item, index) => <div key={item} className={`rounded-lg border border-white/[0.07] bg-white/[0.025] px-3 py-3 font-mono text-[10px] uppercase tracking-[0.12em] text-slate-400 ${index === 0 ? 'text-primary' : ''}`}>{item}</div>)}
          </div>
        </div>
      </div>
      <div className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-3 font-mono text-[9px] uppercase tracking-[0.2em] text-slate-600 sm:flex"><span className="h-px w-10 bg-slate-700" /> Scroll to inspect <span className="h-px w-10 bg-slate-700" /></div>
    </section>
  );
}

function StatsStrip() {
  return <div className="section-wrap border-y border-white/[0.07] py-5"><div className="grid grid-cols-1 divide-y divide-white/[0.07] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">{portfolio.stats.map((stat) => <div key={stat.label} className="flex items-center gap-4 px-2 py-4 sm:justify-center sm:py-1"><strong className="font-display text-3xl font-semibold tracking-[-0.06em] text-primary">{stat.value}</strong><div><div className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-300">{stat.label}</div><div className="mt-1 text-xs text-slate-500">{stat.detail}</div></div></div>)}</div></div>;
}

function About() {
  return <section id="about" className="section-wrap scroll-mt-24 py-24 md:py-32"><SectionHeading index="01" eyebrow="Context" title="A developer in the making." copy="Not a finished story. A clear view of the work, the questions, and the direction." /><div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr]"><div className="relative min-h-[290px] overflow-hidden rounded-2xl border border-white/10 bg-[#0b111d] p-6"><div className="absolute -right-14 -top-14 size-48 rounded-full border border-primary/20" /><div className="absolute -right-5 top-[-2rem] size-32 rounded-full border border-violet-300/20" /><div className="relative flex h-full flex-col justify-between"><div><span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">/about/rohit</span><div className="mt-8 font-display text-6xl font-semibold tracking-[-0.08em] text-slate-200">RK<span className="text-primary">.</span></div></div><div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.15em] text-slate-500"><span>Curious by default</span><span>Lucknow → anywhere</span></div></div></div><div className="flex flex-col justify-center gap-5 text-[15px] leading-7 text-slate-400">{portfolio.bio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<div className="mt-2 grid gap-3 sm:grid-cols-2"><div className="rounded-xl border border-primary/15 bg-primary/[0.04] p-4"><Code2 size={18} className="mb-3 text-primary" /><div className="text-sm font-semibold text-slate-200">Build with clarity</div><div className="mt-1 text-xs leading-5 text-slate-500">Readable UI, intentional decisions, useful details.</div></div><div className="rounded-xl border border-violet-300/15 bg-violet-300/[0.04] p-4"><BrainCircuit size={18} className="mb-3 text-violet-300" /><div className="text-sm font-semibold text-slate-200">Learn in layers</div><div className="mt-1 text-xs leading-5 text-slate-500">From fundamentals to systems, one concept at a time.</div></div></div></div></div></section>;
}

function Skills() {
  const tabs = Object.keys(portfolio.skills) as Array<keyof typeof portfolio.skills>;
  const [tab, setTab] = useState<keyof typeof portfolio.skills>(tabs[0]);
  return <section id="skills" className="scroll-mt-24 border-y border-white/[0.06] bg-white/[0.018] py-24 md:py-32"><div className="section-wrap"><SectionHeading index="02" eyebrow="Toolkit" title="Skills, without the theatre." copy="A living map of what I use, what I understand, and what I am actively learning." /><div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr]"><div><div className="mb-7 space-y-2" role="tablist" aria-label="Skill categories">{tabs.map((item) => <button key={item} type="button" onClick={() => setTab(item)} role="tab" aria-selected={tab === item} className={`focus-ring flex w-full items-center justify-between rounded-xl border px-4 py-4 text-left transition ${tab === item ? 'border-primary/30 bg-primary/[0.07] text-slate-100' : 'border-white/[0.07] text-slate-500 hover:border-white/15 hover:text-slate-300'}`} data-testid={`button-skill-tab-${item.replace(/\s/g, '-').toLowerCase()}`}><span className="flex items-center gap-3 text-sm font-medium"><span className={`grid size-8 place-items-center rounded-lg ${tab === item ? 'bg-primary/15 text-primary' : 'bg-white/[0.05]'}`}>{item === 'Frontend' ? <Monitor size={15} /> : item === 'Backend / Full Stack' ? <ServerCog size={15} /> : item === 'Programming' ? <Code2 size={15} /> : item === 'Tools' ? <Sparkles size={15} /> : <Search size={15} />}</span>{item}</span><ChevronRight size={15} /></button>)}</div><div className="rounded-xl border border-dashed border-white/10 p-4"><div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-slate-500"><CircleDot size={12} className="text-primary" /> Learning signal</div><p className="text-xs leading-5 text-slate-500">These labels describe a current learning position, not a claim of mastery.</p></div></div><div className="grid gap-3 sm:grid-cols-2">{portfolio.skills[tab].map((skill, index) => <div key={skill.name} className="group rounded-xl border border-white/[0.08] bg-[#0d1421] p-5 transition hover:-translate-y-0.5 hover:border-primary/25"><div className="mb-7 flex items-start justify-between"><span className="font-display text-lg font-semibold tracking-tight text-slate-200">{skill.name}</span><span className={`rounded-full px-2 py-1 font-mono text-[9px] uppercase tracking-[0.1em] ${index === 0 ? 'bg-primary/10 text-primary' : 'bg-white/[0.05] text-slate-500'}`}>{skill.level}</span></div><p className="text-xs leading-5 text-slate-500">{skill.note}</p><div className="mt-5 h-1 overflow-hidden rounded-full bg-white/[0.06]"><div className={`h-full rounded-full ${index === 0 ? 'w-3/4 bg-primary' : index === 1 ? 'w-1/2 bg-violet-300/80' : 'w-2/5 bg-slate-500'}`} /></div></div>)}</div></div><div className="mt-12"><div className="mb-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500"><span className="h-px w-8 bg-primary/50" /> Currently learning</div><div className="flex flex-wrap gap-2">{portfolio.learning.map((item) => <span key={item} className="rounded-full border border-white/10 bg-white/[0.025] px-3 py-2 text-xs text-slate-400">{item}</span>)}</div></div></div></section>;
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => { const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); }; document.addEventListener('keydown', onKey); document.body.style.overflow = 'hidden'; return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; }; }, [onClose]);
  return <div className="fixed inset-0 z-50 grid place-items-center bg-[#050810]/85 p-4 backdrop-blur-sm" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><div className="max-h-[90dvh] w-full max-w-2xl overflow-auto rounded-2xl border border-white/10 bg-[#101725] shadow-2xl shadow-black/50" role="dialog" aria-modal="true" aria-labelledby="project-modal-title"><div className={`h-2 ${project.accent === 'cyan' ? 'bg-primary' : project.accent === 'violet' ? 'bg-violet-300' : 'bg-amber-300'}`} /><div className="p-6 sm:p-8"><div className="flex items-start justify-between gap-4"><div><span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">{project.eyebrow}</span><h3 id="project-modal-title" className="mt-3 font-display text-3xl font-semibold tracking-[-0.05em] text-slate-100">{project.title}</h3></div><button type="button" onClick={onClose} className="focus-ring grid size-9 shrink-0 place-items-center rounded-lg border border-white/10 text-slate-400 hover:text-slate-100" aria-label="Close project details" data-testid="button-close-project-modal"><X size={17} /></button></div><p className="mt-6 text-sm leading-7 text-slate-400">{project.longDescription}</p><div className="my-7 grid gap-4 sm:grid-cols-2"><div><p className="font-mono text-[10px] uppercase tracking-[0.15em] text-primary">Problem</p><p className="mt-2 text-sm leading-6 text-slate-400">{project.problem}</p></div><div><p className="font-mono text-[10px] uppercase tracking-[0.15em] text-primary">Solution</p><p className="mt-2 text-sm leading-6 text-slate-400">{project.solution}</p></div></div><div className="mb-7"><p className="font-mono text-[10px] uppercase tracking-[0.15em] text-primary">Features</p><div className="mt-3 flex flex-wrap gap-2">{project.features.map((item) => <span key={item} className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-xs text-slate-400">{item}</span>)}</div></div><div className="mb-7 flex flex-wrap gap-2">{project.stack.map((item) => <span key={item} className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1.5 font-mono text-[10px] text-slate-400">{item}</span>)}</div><div className="grid gap-4 border-y border-white/[0.07] py-5 sm:grid-cols-3"><div><p className="font-mono text-[10px] uppercase tracking-[0.15em] text-slate-600">Role</p><p className="mt-2 text-sm text-slate-300">{project.role}</p></div><div><p className="font-mono text-[10px] uppercase tracking-[0.15em] text-slate-600">Status</p><p className="mt-2 text-sm text-slate-300">{project.status}</p></div><div><p className="font-mono text-[10px] uppercase tracking-[0.15em] text-slate-600">Learned</p><p className="mt-2 text-sm leading-5 text-slate-400">{project.learned}</p></div></div><div className="mt-6 grid gap-4 sm:grid-cols-2"><div><p className="font-mono text-[10px] uppercase tracking-[0.15em] text-slate-600">Future improvements</p><p className="mt-2 text-sm leading-6 text-slate-400">{project.future}</p></div><div className="rounded-xl border border-dashed border-amber-300/20 bg-amber-300/[0.04] p-4"><div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-amber-200"><CircleDot size={12} /> Link status</div><p className="mt-2 text-xs leading-5 text-slate-500">Demo and code links are placeholders from the portfolio brief. Replace them when public project URLs are available.</p></div></div><div className="mt-7 flex flex-wrap gap-3"><a href={project.links.code} onClick={(e) => e.preventDefault()} className="focus-ring inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.12em] text-slate-300" data-testid={`link-project-code-placeholder-${project.id}`}><CodeXml size={14} /> Code <span className="text-amber-300">placeholder</span></a><a href={project.links.demo} onClick={(e) => e.preventDefault()} className="focus-ring inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.12em] text-slate-300" data-testid={`link-project-demo-placeholder-${project.id}`}><ExternalLink size={14} /> Demo <span className="text-amber-300">placeholder</span></a></div></div></div></div>;
}

function Projects() {
  const filters = ['All', 'Full Stack', 'Frontend', 'Maps', 'API', 'AI/ML'] as const;
  const [filter, setFilter] = useState<(typeof filters)[number]>('All');
  const [selected, setSelected] = useState<Project | null>(null);
  const visible = useMemo(() => filter === 'All' ? portfolio.projects : portfolio.projects.filter((project) => (project.tags as readonly string[]).includes(filter)), [filter]);
  return <section id="projects" className="section-wrap scroll-mt-24 py-24 md:py-32"><SectionHeading index="03" eyebrow="Selected work" title="Small builds. Real learning." copy="Projects are checkpoints: proof of practice, not inflated case studies." /><div className="mb-8 flex flex-wrap items-center gap-2">{filters.map((item) => <button key={item} type="button" onClick={() => setFilter(item)} className={`focus-ring rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.13em] transition ${filter === item ? 'border-primary/40 bg-primary/10 text-primary' : 'border-white/10 text-slate-500 hover:border-white/20 hover:text-slate-300'}`} data-testid={`button-filter-projects-${item.replace(/\W/g, '-').toLowerCase()}`}>{item}</button>)}</div><div className="grid gap-4 lg:grid-cols-3">{visible.map((project) => <article key={project.id} className="group relative flex min-h-[360px] flex-col overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0d1421] p-5 transition hover:-translate-y-1 hover:border-primary/25"><div className={`absolute right-0 top-0 h-32 w-32 rounded-full blur-3xl ${project.accent === 'cyan' ? 'bg-primary/10' : project.accent === 'violet' ? 'bg-violet-300/10' : 'bg-amber-300/10'}`} /><div className="relative flex items-center justify-between"><span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">{project.eyebrow}</span><span className="rounded-full border border-white/10 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.1em] text-slate-500">{project.status}</span></div><div className="relative mt-12"><div className={`mb-5 grid size-11 place-items-center rounded-xl border ${project.accent === 'cyan' ? 'border-primary/20 bg-primary/10 text-primary' : project.accent === 'violet' ? 'border-violet-300/20 bg-violet-300/10 text-violet-200' : 'border-amber-300/20 bg-amber-300/10 text-amber-200'}`}>{project.category === 'Frontend' ? <PanelTop size={19} /> : project.category === 'Full Stack' ? <ServerCog size={19} /> : <BrainCircuit size={19} />}</div><h3 className="font-display text-2xl font-semibold tracking-[-0.04em] text-slate-100">{project.title}</h3><p className="mt-3 text-sm leading-6 text-slate-500">{project.description}</p></div><div className="relative mt-auto flex items-end justify-between pt-8"><div className="flex max-w-[75%] flex-wrap gap-1.5">{project.stack.slice(0, 4).map((item) => <span key={item} className="rounded bg-white/[0.05] px-2 py-1 font-mono text-[9px] text-slate-500">{item}</span>)}</div><button type="button" onClick={() => setSelected(project)} className="focus-ring grid size-10 shrink-0 place-items-center rounded-lg border border-white/10 text-slate-300 transition hover:border-primary/40 hover:bg-primary/10 hover:text-primary" aria-label={`View details for ${project.title}`} data-testid={`button-view-project-${project.id}`}><ArrowUpRight size={17} /></button></div></article>)}</div>{selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}</section>;
}

function EmptyState({ icon: Icon, title, detail }: { icon: typeof BriefcaseBusiness; title: string; detail: string }) {
  return <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.015] p-7"><Icon size={20} className="mb-5 text-slate-500" /><div className="font-display text-lg font-semibold text-slate-300">{title}</div><p className="mt-2 max-w-md text-sm leading-6 text-slate-500">{detail}</p><div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-slate-600"><CircleDot size={11} /> Not listed yet</div></div>;
}

function Journey() {
  return <section id="journey" className="scroll-mt-24 border-y border-white/[0.06] bg-white/[0.018] py-24 md:py-32"><div className="section-wrap"><SectionHeading index="04" eyebrow="Developer journey" title="A direction, not a performance." copy="No invented milestones here. Just an honest snapshot of the road ahead." /><div className="grid gap-4 lg:grid-cols-3">{portfolio.milestones.map((item, index) => <div key={item.label} className="relative rounded-2xl border border-white/[0.09] bg-[#0d1421] p-6"><div className="mb-12 flex items-center justify-between"><span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">{item.label}</span><span className="font-mono text-[10px] text-slate-700">0{index + 1}</span></div><div className="mb-5 grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-300">{item.icon === 'layers' ? <Layers3 size={18} /> : item.icon === 'network' ? <Network size={18} /> : <BrainCircuit size={18} />}</div><h3 className="font-display text-xl font-semibold tracking-[-0.04em] text-slate-200">{item.title}</h3><p className="mt-3 text-sm leading-6 text-slate-500">{item.detail}</p></div>)}</div></div></section>;
}

function ExperienceAchievements() {
  return <section className="section-wrap scroll-mt-24 py-24 md:py-32"><div className="grid gap-4 md:grid-cols-2"><div id="experience"><SectionHeading index="05" eyebrow="Experience" title="Building toward the first chapter." /><EmptyState icon={BriefcaseBusiness} title="Currently building projects and preparing for professional opportunities." detail="No professional experience has been provided yet. This space is intentionally ready for future internships or industry work." /><a href="#projects" className="focus-ring mt-5 inline-flex items-center gap-2 rounded-lg border border-primary/25 bg-primary/[0.06] px-4 py-3 font-mono text-[10px] uppercase tracking-[0.12em] text-primary">View projects <ArrowUpRight size={14} /></a></div><div id="achievements"><SectionHeading index="06" eyebrow="Achievements" title="Proof over performance." /><EmptyState icon={BadgeCheck} title="No verified achievements listed yet." detail="Awards, hackathon wins, rankings, scholarships, and other milestones will be added here when there is real data to share." /><details className="mt-5 rounded-xl border border-dashed border-white/10 p-4 text-sm text-slate-500"><summary className="cursor-pointer font-mono text-[10px] uppercase tracking-[0.12em] text-slate-400">What can be added later?</summary><p className="mt-3 leading-6">A verified achievement can include its title, context, date, issuer, and a link to supporting evidence.</p></details></div></div></section>;
}

function EducationAndProfiles() {
  return <section id="education" className="section-wrap scroll-mt-24 py-24 md:py-32"><div className="grid gap-16 lg:grid-cols-[1.1fr_.9fr]"><div><SectionHeading index="07" eyebrow="Education" title="Where I am learning." /><div className="relative ml-3 border-l border-primary/20 pl-8">{portfolio.education.map((item) => <div key={item.title} className="relative pb-10 last:pb-0"><span className="absolute -left-[41px] top-1 grid size-5 place-items-center rounded-full border border-primary/30 bg-[#0b101b]"><span className="size-1.5 rounded-full bg-primary" /></span><div className="mb-2 flex flex-wrap items-center gap-3"><span className="font-mono text-[10px] uppercase tracking-[0.17em] text-primary">{item.period}</span><span className="h-px w-5 bg-slate-700" /><span className="text-xs text-slate-500">{item.place}</span></div><h3 className="font-display text-xl font-semibold tracking-[-0.03em] text-slate-200">{item.title}</h3><p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">{item.detail}</p></div>)}</div><div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4"><div className="rounded-xl border border-white/10 p-4"><span className="font-mono text-[9px] uppercase text-slate-600">Program</span><strong className="mt-2 block text-sm text-slate-200">CSE (AI/ML)</strong></div><div className="rounded-xl border border-white/10 p-4"><span className="font-mono text-[9px] uppercase text-slate-600">Year</span><strong className="mt-2 block text-sm text-slate-200">3rd Year</strong></div><div className="rounded-xl border border-white/10 p-4"><span className="font-mono text-[9px] uppercase text-slate-600">CGPA</span><strong className="mt-2 block text-sm text-slate-200">8.7</strong></div><div className="rounded-xl border border-white/10 p-4"><span className="font-mono text-[9px] uppercase text-slate-600">Graduation</span><strong className="mt-2 block text-sm text-slate-200">2028</strong></div></div></div><div><div className="mb-10"><SectionHeading index="08" eyebrow="Coding profiles" title="Elsewhere." /></div><div className="space-y-3">{portfolio.profiles.map((profile) => <a key={profile.name} href={profile.href} target="_blank" rel="noreferrer" className="focus-ring group flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] p-4 transition hover:border-primary/25 hover:bg-primary/[0.04]" data-testid={`link-profile-${profile.name.toLowerCase()}`}><span className="flex items-center gap-3">{profile.icon === 'github' ? <Github size={20} className="text-slate-300" /> : profile.icon === 'linkedin' ? <Linkedin size={20} className="text-slate-300" /> : <Code2 size={20} className="text-slate-300" />}<span><span className="block text-sm font-semibold text-slate-200">{profile.name}</span><span className="mt-1 block text-xs text-slate-500">{profile.handle}</span></span></span><span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.12em] text-primary">Visit profile <ExternalLink size={13} /></span></a>)}</div><div className="mt-5 rounded-xl border border-dashed border-white/10 p-4 text-xs leading-5 text-slate-600">Public profiles are linked directly. No ratings or problem counts are claimed.</div></div></div></section>;
}

function ResumeCta() {
  const [available, setAvailable] = useState(false);
  useEffect(() => {
    fetch('/resume.pdf', { method: 'HEAD' }).then((response) => setAvailable(response.ok && response.headers.get('content-type')?.includes('application/pdf') === true)).catch(() => setAvailable(false));
  }, []);
  return <section className="section-wrap pb-24 md:pb-32"><div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-primary/[0.06] p-7 sm:p-10"><div className="absolute -right-14 -top-20 size-64 rounded-full border border-primary/10" /><div className="absolute -right-4 -top-10 size-44 rounded-full border border-violet-300/10" /><div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center"><div><div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-primary"><FileText size={13} /> Resume</div><h2 className="font-display text-2xl font-semibold tracking-[-0.04em] text-slate-100 sm:text-3xl">Let&apos;s build what&apos;s next.</h2><p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">Interested in working together, collaborating on a project, or discussing opportunities? A resume will be available here once it is added to <code className="text-primary">/public/resume.pdf</code>.</p></div><div className="flex flex-wrap gap-3"><a href="#contact" className="focus-ring inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.12em] text-slate-300">Contact me <ArrowUpRight size={14} /></a>{available ? <a href="/resume.pdf" download className="focus-ring inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-3 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-background">Download resume <ArrowDown size={14} /></a> : <button type="button" disabled className="inline-flex cursor-not-allowed items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 font-mono text-[10px] uppercase tracking-[0.12em] text-slate-500" data-testid="button-resume-placeholder">Resume unavailable <ArrowUpRight size={14} /></button>}</div></div></div></section>;
}

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.subject.trim() || !form.message.trim()) { setError('Please complete all four fields before sending.'); setSent(false); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { setError('Please use a valid email address.'); setSent(false); return; }
    setError(''); setSent(true); setForm({ name: '', email: '', subject: '', message: '' });
  };
  return <section id="contact" className="scroll-mt-24 border-t border-white/[0.06] py-24 md:py-32"><div className="section-wrap"><SectionHeading index="09" eyebrow="Open channel" title="Let&apos;s connect." copy="The form stays local for now, but the intent is real. Nothing is sent until an email provider is connected." /><div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><div className="mb-8 rounded-2xl border border-white/10 bg-[#0d1421] p-6"><MessageSquare size={20} className="mb-5 text-primary" /><h3 className="font-display text-xl font-semibold text-slate-200">Let&apos;s compare notes.</h3><p className="mt-3 text-sm leading-6 text-slate-500">Interested in modern web development, MERN, DSA, AI/ML, or the thinking behind a build? Those are good places to start.</p><div className="mt-6 space-y-3 font-mono text-[10px] uppercase tracking-[0.12em] text-slate-500"><a href={`mailto:${portfolio.email}`} className="focus-ring flex items-center gap-3 rounded-md hover:text-primary"><Mail size={14} className="text-primary" /> {portfolio.email}</a><div className="flex items-center gap-3"><MapPin size={14} className="text-primary" /> {portfolio.location}</div></div><div className="mt-6 flex flex-wrap gap-2"><a href={portfolio.social.github} target="_blank" rel="noreferrer" className="focus-ring rounded-lg border border-white/10 px-3 py-2 font-mono text-[10px] uppercase text-slate-400 hover:border-primary/30 hover:text-primary">GitHub</a><a href={portfolio.social.linkedin} target="_blank" rel="noreferrer" className="focus-ring rounded-lg border border-white/10 px-3 py-2 font-mono text-[10px] uppercase text-slate-400 hover:border-primary/30 hover:text-primary">LinkedIn</a></div></div></div><form className="space-y-5" onSubmit={submit} noValidate><div className="grid gap-5 sm:grid-cols-2"><label className="block"><span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.14em] text-slate-500">Your name</span><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="focus-ring w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600" placeholder="Name" data-testid="input-contact-name" /></label><label className="block"><span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.14em] text-slate-500">Email</span><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="focus-ring w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600" placeholder="you@example.com" data-testid="input-contact-email" /></label></div><label className="block"><span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.14em] text-slate-500">Subject</span><input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="focus-ring w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600" placeholder="What would you like to discuss?" data-testid="input-contact-subject" /></label><label className="block"><span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.14em] text-slate-500">Message</span><textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} className="focus-ring w-full resize-y rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm leading-6 text-slate-100 placeholder:text-slate-600" placeholder="What are you working on?" data-testid="input-contact-message" /></label>{error && <p className="text-xs text-rose-300" role="alert" data-testid="status-contact-error">{error}</p>}{sent && <p className="flex items-center gap-2 text-xs text-emerald-300" role="status" data-testid="status-contact-success"><Check size={14} /> Message staged locally. Thank you for reaching out.</p>}<button type="submit" className="focus-ring inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 font-mono text-[10px] font-semibold uppercase tracking-[0.13em] text-background transition hover:bg-primary/90" data-testid="button-submit-contact">Send message <Send size={14} /></button></form></div></div></section>;
}

function Footer({ onTop }: { onTop: () => void }) {
  return <footer className="border-t border-white/[0.06] py-8"><div className="section-wrap flex flex-col gap-6"><div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center"><div><Brand /><p className="mt-3 font-mono text-[9px] uppercase tracking-[0.14em] text-slate-600">Built with React, Tailwind CSS &amp; JavaScript.</p></div><div className="flex items-center gap-5"><span className="font-mono text-[9px] uppercase tracking-[0.14em] text-slate-600">© {new Date().getFullYear()} Rohit Kumar</span><button type="button" onClick={onTop} className="focus-ring flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.14em] text-slate-400 hover:border-primary/30 hover:text-primary" data-testid="button-back-to-top">Top <ArrowUp size={13} /></button></div></div><div className="flex flex-wrap items-center gap-4 border-t border-white/[0.06] pt-5 font-mono text-[10px] uppercase tracking-[0.12em] text-slate-500"><span className="text-slate-700">Find me</span><a href={portfolio.social.github} target="_blank" rel="noreferrer" className="focus-ring hover:text-primary">GitHub</a><a href={portfolio.social.linkedin} target="_blank" rel="noreferrer" className="focus-ring hover:text-primary">LinkedIn</a><a href={portfolio.social.leetcode} target="_blank" rel="noreferrer" className="focus-ring hover:text-primary">LeetCode</a><a href={portfolio.social.hackerrank} target="_blank" rel="noreferrer" className="focus-ring hover:text-primary">HackerRank</a></div></div></footer>;
}

export function PortfolioPage() {
  const [active, setActive] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: '-25% 0px -60% 0px', threshold: [0, .2, .5, 1] });
    sectionIds.forEach((id) => { const element = document.getElementById(id); if (element) observerRef.current?.observe(element); });
    return () => observerRef.current?.disconnect();
  }, []);
  return <div className="noise min-h-[100dvh]"><Navigation active={active} open={menuOpen} onToggle={() => setMenuOpen((value) => !value)} /><main><Hero /><StatsStrip /><About /><Skills /><Projects /><Journey /><ExperienceAchievements /><EducationAndProfiles /><ResumeCta /><Contact /></main><Footer onTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })} /></div>;
}