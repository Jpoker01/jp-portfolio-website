import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  ArrowUpRight,
  Code2,
  Brain,
  Server,
  Cpu,
  Zap,
  Wrench,
  Github,
  FileText,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jiří Pokorný - Software Developer" },
      {
        name: "description",
        content:
          "Python developer specialising in applied ML/AI, taking projects from raw data to deployed applications. Based in Brno, Czech Republic.",
      },
      { property: "og:title", content: "Jiří Pokorný - Software Developer" },
      {
        property: "og:description",
        content:
          "Python developer specialising in applied ML/AI, taking projects from raw data to deployed applications.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

// ─── Data ──────────────────────────────────────────────────────────────────

const NAV = [
  { id: "work", label: "Projects" },
  { id: "skills", label: "Stack" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

const PROJECTS = [
  {
    title: "Authorship Verification System",
    tag: "Master's Thesis",
    description:
      "End-to-end authorship verification system for English text. Hundreds of experiments across BoW/TF-IDF, graph-based, transformer, and LLM approaches. Deployed as an interactive web app with a fine-tuned classification head.",
    stack: ["Python", "transformers", "Longformer", "FastAPI", "React", "TypeScript"],
    links: [
      { label: "Live Demo", url: "https://www.verifyauthor.dev" },
      { label: "GitHub", url: "https://github.com/Jpoker01/diploma_thesis" },
    ],
  },
  {
    title: "ATACA Incident Classification",
    tag: "Bachelor's Thesis · SAP",
    description:
      "Binary text classification model categorising SAP customer incidents at sentence level. Systematic comparison of dataset balancing, vector representations, and classification algorithms — traditional vs. modern approaches. Built on real production SAP incident data.",
    stack: ["Python", "scikit-learn", "TF-IDF", "NLP", "SAP"],
    links: [{ label: "GitHub", url: "https://github.com/Jpoker01/bachelor_thesis" }],
  },
];

const SKILL_GROUPS = [
  { icon: Code2, label: "Languages", items: ["Python", "C#", "C++", "TypeScript"] },
  {
    icon: Brain,
    label: "AI & Machine Learning",
    items: ["scikit-learn", "NLTK", "spaCy", "gensim", "transformers", "Optuna"],
  },
  { icon: Cpu, label: "Data", items: ["pandas", "NumPy", "SciPy", "SQL"] },
  {
    icon: Server,
    label: "Backend & Web",
    items: ["FastAPI", "REST APIs", "ASP.NET Core", "React"],
  },
  { icon: Zap, label: "Cloud & DevOps", items: ["Docker", "Kubernetes", "Azure"] },
  {
    icon: Wrench,
    label: "Tools & Practices",
    items: ["Git", "Linux", "Unit Testing", "CI/CD"],
  },
];

const EXPERIENCE = [
  {
    role: "Associate Developer",
    company: "SAP",
    period: "SEP 2024 - FEB 2026",
    location: "Brno, Czech Republic",
    description:
      "Developed and extended features of enterprise S/4HANA applications based on business requirements, working across the backend (ABAP) and frontend (SAPUI5, Fiori). Resolved complex production issues in live customer systems through systematic root-cause analysis, keeping business-critical processes stable.",
    stack: ["ABAP", "Fiori"],
  },
  {
    role: "Associate Developer (intern)",
    company: "SAP",
    period: "JUN 2022 - SEP 2024",
    location: "Brno, Czech Republic",
    description:
      "Developed an incident classification system on the data analysis & AI team using real production SAP customer incident data, an NLP text-classification model that became the foundation of my bachelor's thesis (see ATACA in Selected Work).",
    stack: ["Python", "NLP", "scikit-learn", "Text Classification"],
  },
];

// ─── Hooks ─────────────────────────────────────────────────────────────────

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

// ─── Nav ───────────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-black/80 backdrop-blur-xl border-b border-ink-800" : "bg-transparent"
      }`}
    >
      <div className="px-6 md:px-10 lg:px-16 h-16 flex items-center justify-between">
        <button
          onClick={() => scrollTo("home")}
          className="cursor-pointer font-mono text-[13px] font-medium text-ink-200 tracking-[0.3em]"
        >
          JP
        </button>

        <div className="hidden md:flex items-center gap-10">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => scrollTo(n.id)}
              className="cursor-pointer text-[13px] font-semibold text-ink-400 hover:text-white transition-colors duration-300 tracking-[0.2em] uppercase"
            >
              {n.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="cursor-pointer md:hidden text-ink-400 hover:text-white"
        >
          {open ? <X className="w-[22px] h-[22px]" /> : <Menu className="w-[22px] h-[22px]" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-black border-t border-ink-800 px-6 py-4 space-y-1">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => {
                scrollTo(n.id);
                setOpen(false);
              }}
              className="cursor-pointer block w-full text-left py-3 text-[13px] font-semibold text-ink-400 hover:text-white tracking-[0.2em] uppercase"
            >
              {n.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("mailto") || href.startsWith("tel") ? undefined : "_blank"}
      rel="noopener noreferrer"
      className="text-ink-300 hover:text-white transition-colors duration-300"
      aria-label={label}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {children}
      </svg>
    </a>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-10 lg:px-16 overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 45%, rgba(255,255,255,0.06), rgba(255,255,255,0.015) 50%, transparent 75%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        <h1 className="name tracking-tight animate-fade-up" style={{ lineHeight: 1.02 }}>
          <span className="first font-medium block text-[clamp(38px,8vw,72px)]">Jiří</span>
          <span className="surname font-extrabold block text-[clamp(46px,10vw,102px)]">
            Pokorný
          </span>
          <span className="name-shine" aria-hidden="true">
            <span className="first font-light block text-[clamp(38px,8vw,72px)]">Jiří</span>
            <span className="surname font-extrabold block text-[clamp(46px,10vw,102px)]">
              Pokorný
            </span>
          </span>
        </h1>

        <span className="mt-6 uppercase text-[14px] font-semibold tracking-[0.24em] text-ink-500 animate-fade-in">
          Software Developer&ensp;&middot;&ensp;Brno, CZ
        </span>

        <p className="mt-7 font-light text-[18px] leading-relaxed text-ink-400 max-w-2xl animate-fade-up delay-200">
          Python developer specialising in applied ML/AI, taking projects from raw data to deployed
          applications.
        </p>

        <div className="flex items-center justify-center gap-6 mt-10 animate-fade-up delay-300">
          <button
            onClick={() => scrollTo("work")}
            className="group flex items-center gap-2 text-[13px] font-semibold text-white tracking-[0.2em] uppercase cursor-pointer"
          >
            View Work
            <ArrowUpRight className="w-[18px] h-[18px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
          <span className="w-12 h-px bg-ink-700" />
          <div className="flex items-center gap-4">
            <SocialIcon href="mailto:jiripokorny455@gmail.com" label="Email">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 7l-10 7L2 7" />
            </SocialIcon>
            <SocialIcon
              href="https://www.linkedin.com/in/ji%C5%99%C3%AD-pokorn%C3%BD-4b1093214/"
              label="LinkedIn"
            >
              <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </SocialIcon>
            <SocialIcon href="tel:+420603967651" label="Phone">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
            </SocialIcon>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3">
        <span className="text-[11px] font-bold uppercase tracking-[0.17em] text-ink-500">
          Scroll
        </span>
        <span className="w-6 h-px bg-ink-600" />
      </div>
    </section>
  );
}

// ─── Section Label ─────────────────────────────────────────────────────────

function SectionLabel({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-center gap-5 mb-14">
      <span className="font-mono text-[16px] text-ink-500">{num}</span>
      <span className="w-10 h-px bg-ink-600" />
      <span className="text-[15px] font-semibold tracking-[0.18em] uppercase text-ink-200">
        {label}
      </span>
    </div>
  );
}

// ─── Work ──────────────────────────────────────────────────────────────────

function ProjectCard({
  project,
  index,
  isFirst,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
  isFirst: boolean;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal grid lg:grid-cols-12 gap-8 lg:gap-12 ${
        isFirst ? "" : "border-t border-ink-800 pt-16"
      } pb-16`}
    >
      <div className="lg:col-span-7">
        <span className="block font-mono text-[12px] text-ink-600 tracking-[0.15em] mb-5">
          {String(index + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
        </span>
        <p className="font-mono text-[13px] font-medium uppercase tracking-[0.2em] text-ink-400 mb-4">
          {project.tag}
        </p>
        <h3 className="text-3xl md:text-4xl lg:text-[35px] font-bold text-white tracking-tight leading-[1.1] mb-6">
          {project.title}
        </h3>
        <p className="text-[17px] text-ink-400 leading-relaxed font-light max-w-xl">
          {project.description}
        </p>
      </div>

      <div className="lg:col-span-5 flex flex-col justify-center gap-8">
        <div className="flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span
              key={s}
              className="font-mono text-[15px] text-ink-400 border border-ink-800 px-2.5 py-1 rounded-sm"
            >
              {s}
            </span>
          ))}
        </div>

        {project.links.length > 0 && (
          <div className="flex items-center gap-4 flex-wrap px-2.5">
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] font-semibold tracking-[0.2em] uppercase text-white hover:text-ink-300 transition-colors duration-300"
              >
                {link.label} &#8599;
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Work() {
  return (
    <section id="work" className="section-pad border-t border-ink-800">
      <div className="max-w-6xl mx-auto">
        <SectionLabel num="01" label="Selected Work" />

        <div className="max-w-4xl mx-auto">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} isFirst={i === 0} />
          ))}
        </div>

        <div className="max-w-4xl mx-auto text-center border-t border-ink-800 pt-10">
          <a
            href="https://github.com/Jpoker01"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-8 py-4 text-[13px] font-semibold tracking-[0.2em] uppercase text-white border border-ink-700 rounded-sm overflow-hidden transition-all duration-400 hover:border-ink-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.04)]"
          >
            <span className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.03] transition-colors duration-400" />
            <Github className="relative w-[20px] h-[20px]" />
            <span className="relative">See More on GitHub</span>
            <ArrowUpRight className="relative w-[18px] h-[18px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Skills ────────────────────────────────────────────────────────────────

function Skills() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="skills" className="section-pad border-t border-ink-800">
      <div className="max-w-6xl mx-auto">
        <SectionLabel num="02" label="Tech Stack" />

        <div ref={ref} className="reveal grid sm:grid-cols-2 lg:grid-cols-3 border border-ink-800">
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.label}
              className="group/cell p-8 border-r border-b border-ink-800 hover:bg-ink-900 transition-colors duration-300"
            >
              <div className="flex items-center gap-3 mb-5">
                <group.icon
                  className="w-[22px] h-[22px] text-ink-500 group-hover/cell:text-ink-300 transition-colors duration-300"
                  strokeWidth={1.5}
                />
                <h3 className="text-[14px] font-semibold uppercase tracking-[0.16em] text-white">
                  {group.label}
                </h3>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="text-[16px] text-ink-400 group-hover/cell:text-ink-200 transition-colors duration-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Experience ────────────────────────────────────────────────────────────

function ExperienceItem({ job, isFirst }: { job: (typeof EXPERIENCE)[number]; isFirst: boolean }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal grid lg:grid-cols-12 gap-8 lg:gap-12 ${
        isFirst ? "" : "border-t border-ink-800 pt-16"
      } pb-16`}
    >
      <div className="lg:col-span-7">
        <p className="font-mono text-[13px] font-medium uppercase tracking-[0.2em] text-ink-400 mb-4">
          {job.company} · {job.location}
        </p>
        <h3 className="text-3xl md:text-4xl lg:text-[35px] font-bold text-white tracking-tight leading-[1.1] mb-4">
          {job.role}
        </h3>
        <p className="font-mono text-[13px] text-ink-500 tracking-[0.15em] mb-6">{job.period}</p>
        <p className="text-[17px] text-ink-400 leading-relaxed font-light max-w-xl">
          {job.description}
        </p>
      </div>

      <div className="lg:col-span-5 flex flex-col justify-center gap-8">
        <div className="flex flex-wrap gap-2">
          {job.stack.map((s) => (
            <span
              key={s}
              className="font-mono text-[15px] text-ink-400 border border-ink-800 px-2.5 py-1 rounded-sm"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Experience() {
  return (
    <section id="experience" className="section-pad border-t border-ink-800">
      <div className="max-w-6xl mx-auto">
        <SectionLabel num="03" label="Experience" />

        <div className="max-w-4xl mx-auto">
          {EXPERIENCE.map((job, i) => (
            <ExperienceItem key={job.company + job.role} job={job} isFirst={i === 0} />
          ))}
        </div>

        <div className="max-w-4xl mx-auto text-center border-t border-ink-800 pt-10">
          <a
            href="/CV_Jiri_Pokorny_EN.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-8 py-4 text-[13px] font-semibold tracking-[0.2em] uppercase text-white border border-ink-700 rounded-sm overflow-hidden transition-all duration-400 hover:border-ink-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.04)]"
          >
            <span className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.03] transition-colors duration-400" />
            <FileText className="relative w-[20px] h-[20px]" />
            <span className="relative">Download Full CV</span>
            <ArrowUpRight className="relative w-[18px] h-[18px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Contact ───────────────────────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  };

  return (
    <button
      onClick={handleCopy}
      className="relative ml-2 text-ink-600 hover:text-white transition-colors duration-300"
      aria-label="Copy"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="9" y="9" width="13" height="13" rx="2" />
        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
      </svg>
      {copied && (
        <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-[11px] text-white bg-ink-800 px-2 py-0.5 rounded whitespace-nowrap pointer-events-none">
          Copied
        </span>
      )}
    </button>
  );
}

function ContactRow({
  icon,
  copyText,
  children,
}: {
  icon: React.ReactNode;
  copyText?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="shrink-0"
        style={{ color: "#6a6a6a" }}
      >
        {icon}
      </svg>
      {children}
      {copyText && <CopyButton text={copyText} />}
    </div>
  );
}

function Contact() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section
      id="contact"
      className="section-pad border-t border-ink-800"
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div ref={ref} className="reveal max-w-6xl mx-auto w-full">
        <SectionLabel num="04" label="Contact" />

        <div
          className="flex flex-col md:flex-row md:items-center md:justify-center gap-10 md:gap-[56px]"
          style={{ width: "fit-content", marginLeft: "auto", marginRight: "auto" }}
        >
          <h2 className="text-[35px] font-extrabold text-white leading-[1.1] md:text-right">
            Let's work together.
          </h2>

          <div
            className="hidden md:block w-px self-stretch"
            style={{ backgroundColor: "#1e1e1e" }}
          />

          <div className="flex flex-col gap-[18px]">
            <ContactRow
              icon={
                <>
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 7l-10 7L2 7" />
                </>
              }
              copyText="jiripokorny455@gmail.com"
            >
              <a
                href="mailto:jiripokorny455@gmail.com"
                className="text-[16px] hover:text-white transition-colors duration-300"
                style={{ color: "#d0d0d0" }}
              >
                jiripokorny455@gmail.com
              </a>
            </ContactRow>

            <ContactRow
              icon={
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              }
              copyText="+420603967651"
            >
              <a
                href="tel:+420603967651"
                className="text-[18px] hover:text-white transition-colors duration-300"
                style={{ color: "#d0d0d0" }}
              >
                +420 603 967 651
              </a>
            </ContactRow>

            <ContactRow
              icon={
                <>
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </>
              }
            >
              <a
                href="https://www.linkedin.com/in/ji%C5%99%C3%AD-pokorn%C3%BD-4b1093214/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[18px] hover:text-white transition-colors duration-300"
                style={{ color: "#d0d0d0" }}
              >
                LinkedIn &#8599;
              </a>
            </ContactRow>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="w-full" style={{ borderTop: "1px solid #161616", padding: "20px 40px" }}>
      <div
        className="footer-bar flex items-center justify-between"
        style={{ fontSize: "11px", color: "#5f5f5f" }}
      >
        <span>&copy; 2026 Jiří Pokorný</span>
        <span>Brno, Czech Republic</span>
      </div>
    </footer>
  );
}

// ─── App ───────────────────────────────────────────────────────────────────

function Index() {
  return (
    <div className="min-h-screen bg-black">
      <Nav />
      <main>
        <Hero />
        <Work />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
