import { useState, useEffect, useRef } from "react";

const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "ai-security", label: "AI Security" },
  { id: "ctf", label: "CTF" },
  { id: "certifications", label: "Certs" },
  { id: "contact", label: "Contact" },
];

const SKILLS = {
  "Penetration Testing": ["Vulnerability Assessment", "Web App Pentesting", "Network Scanning", "OWASP Top 10", "Burp Suite", "Metasploit"],
  "Security Tools": ["Kali Linux", "Wireshark", "Nmap", "Burp Suite", "Metasploit"],
  "Development": ["React", "TypeScript", "JavaScript", "Java", "Bash Scripting", "SQL"],
  "AI Security": ["Prompt Injection Detection", "LLM Vulnerability Assessment", "AI Risk Scoring", "Jailbreak Analysis"],
  "SOC & Analysis": ["Log Analysis", "Incident Response", "SOC Fundamentals", "Network Traffic Analysis"],
  "Cloud & DevOps": ["Git / GitHub", "MySQL", "OOP", "Data Structures & Algorithms"],
};

const PROJECTS = [
  {
    id: "llmguardian",
    tag: "AI Security",
    tagColor: "#7F77DD",
    title: "LLMGuardian",
    subtitle: "AI Security Testing Platform",
    problem: "As LLMs are deployed in production, they introduce a new class of vulnerabilities — prompt injection, jailbreaks, and adversarial inputs — that traditional security tools cannot detect.",
    relevance: "Every company deploying GPT-4, Claude, or open-source LLMs needs tools to test their systems before attackers do. This is one of the fastest-growing areas in application security.",
    challenge: "Designing a universal attack taxonomy for LLM threats that maps inputs to risk categories, generates meaningful risk scores, and explains vulnerabilities in terms developers and security teams can act on.",
    stack: ["Python", "React", "TypeScript", "REST API", "NLP Classification"],
    impact: "Detects prompt injection, jailbreak attempts, and model manipulation — outputs structured risk reports with remediation guidance.",
    github: "https://github.com/DareToCrack",
    icon: "🛡️",
  },
  {
    id: "webanalyzer",
    tag: "Web Security",
    tagColor: "#1D9E75",
    title: "Web Application Analyzer",
    subtitle: "Browser Security Extension",
    problem: "Developers and security teams lack lightweight, real-time tools to identify security misconfigurations while browsing — most scanners require separate setup and can't analyze live sessions.",
    relevance: "Browser extensions are uniquely positioned to inspect live HTTP headers, CSP policies, cookie flags, and DOM vulnerabilities as they appear — no proxy setup required.",
    challenge: "Using browser extension APIs to perform passive security analysis without modifying page behavior, then presenting findings in a clear, actionable format.",
    stack: ["JavaScript", "Browser Extension APIs", "Chrome DevTools Protocol", "HTML/CSS"],
    impact: "Detects missing security headers, insecure cookies, CSP misconfigurations, and common web vulnerabilities passively from the browser.",
    github: "https://github.com/DareToCrack",
    icon: "🔍",
  },
  {
    id: "networklearn",
    tag: "Security Education",
    tagColor: "#D85A30",
    title: "NetWorkLearn",
    subtitle: "Gamified Cybersecurity Learning Platform",
    problem: "Networking and security fundamentals are notoriously hard to teach — static content fails to build the mental models needed to actually understand how protocols and attacks work.",
    relevance: "Security awareness training and education are a $10B+ market. Interactive, gamified platforms dramatically improve knowledge retention over passive learning.",
    challenge: "Designing 65+ progressive levels covering OSI, TCP/IP, and cyber attacks in a way that builds genuine intuition, not just trivia knowledge.",
    stack: ["React", "TypeScript", "Tailwind CSS", "State Machine Logic"],
    impact: "65+ interactive levels, covering networking fundamentals through real attack scenarios — deployed and functional.",
    github: "https://github.com/DareToCrack",
    icon: "🎮",
  },
];

const CTF_EVENTS = [
  {
    name: "CREST CTF",
    org: "CREST International",
    type: "Mixed (Web, Network, Crypto)",
    skills: ["Web exploitation", "Network analysis", "Cryptography basics"],
    tools: ["Burp Suite", "Wireshark", "CyberChef"],
    highlight: "Worked on web vulnerability exploitation challenges. Gained hands-on exposure to real-world pentest scenarios.",
  },
  {
    name: "MythX National CTF",
    org: "MythX / Smart Contract Security",
    type: "Blockchain / Smart Contract Security",
    skills: ["Smart contract analysis", "Solidity vulnerability patterns", "Reentrancy attacks"],
    tools: ["MythX", "Remix IDE", "Etherscan"],
    highlight: "Analyzed Solidity contracts for reentrancy, overflow, and access control vulnerabilities.",
  },
  {
    name: "ZeroSecure CTF",
    org: "ZeroSecure",
    type: "Web & Application Security",
    skills: ["SQL Injection", "XSS", "IDOR", "Authentication bypass"],
    tools: ["Burp Suite", "SQLmap", "Browser DevTools"],
    highlight: "Focused on OWASP Top 10 vulnerability classes. Applied manual and automated techniques for web application testing.",
  },
];

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedProject, setExpandedProject] = useState(null);
  const observerRef = useRef(null);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => observerRef.current.observe(s));
    return () => observerRef.current?.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: "#0B0F1A", color: "#E2E8F0", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #0B0F1A; } ::-webkit-scrollbar-thumb { background: #2D3748; border-radius: 2px; }
        .nav-link { transition: color 0.2s; font-size: 13px; font-weight: 500; cursor: pointer; padding: 6px 12px; border-radius: 6px; color: #94A3B8; letter-spacing: 0.01em; }
        .nav-link:hover, .nav-link.active { color: #E2E8F0; background: rgba(255,255,255,0.06); }
        .section { padding: 80px 0; max-width: 900px; margin: 0 auto; padding-left: 24px; padding-right: 24px; }
        .section-label { font-size: 11px; font-weight: 600; letter-spacing: 0.12em; color: #7F77DD; text-transform: uppercase; margin-bottom: 8px; }
        .section-title { font-family: 'Space Grotesk', sans-serif; font-size: 32px; font-weight: 700; color: #F1F5F9; line-height: 1.2; margin-bottom: 12px; }
        .section-sub { font-size: 16px; color: #64748B; line-height: 1.7; margin-bottom: 48px; max-width: 580px; }
        .skill-pill { display: inline-block; font-size: 12px; font-weight: 500; padding: 5px 12px; border-radius: 20px; background: rgba(127,119,221,0.1); color: #A5B4FC; border: 1px solid rgba(127,119,221,0.2); margin: 4px; }
        .proj-card { border: 1px solid #1E2D45; border-radius: 12px; background: #0F1623; padding: 28px; margin-bottom: 20px; transition: border-color 0.2s; cursor: pointer; }
        .proj-card:hover { border-color: #7F77DD; }
        .proj-tag { display: inline-block; font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; padding: 3px 10px; border-radius: 4px; margin-bottom: 12px; }
        .proj-title { font-family: 'Space Grotesk', sans-serif; font-size: 22px; font-weight: 600; color: #F1F5F9; margin-bottom: 4px; }
        .proj-sub { font-size: 13px; color: #64748B; margin-bottom: 16px; }
        .tech-chip { display: inline-block; font-size: 11px; font-weight: 500; padding: 3px 10px; border-radius: 4px; background: #1A2235; border: 1px solid #2D3748; color: #94A3B8; margin: 3px; font-family: monospace; }
        .detail-label { font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #64748B; margin-bottom: 6px; margin-top: 20px; }
        .detail-text { font-size: 14px; color: #94A3B8; line-height: 1.7; }
        .ctf-card { border: 1px solid #1E2D45; border-radius: 10px; background: #0F1623; padding: 24px; }
        .cert-badge { display: flex; align-items: center; gap: 16px; background: #0F1623; border: 1px solid #1E2D45; border-radius: 10px; padding: 20px 24px; }
        .impact-bar { height: 3px; border-radius: 2px; background: linear-gradient(90deg, #7F77DD, #5DCAA5); margin-top: 16px; }
        .timeline-dot { width: 10px; height: 10px; border-radius: 50%; background: #7F77DD; flex-shrink: 0; margin-top: 5px; }
        .btn-primary { display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; background: #7F77DD; color: #fff; border: none; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; text-decoration: none; transition: background 0.2s; }
        .btn-primary:hover { background: #534AB7; }
        .btn-outline { display: inline-flex; align-items: center; gap: 8px; padding: 11px 22px; background: transparent; color: #7F77DD; border: 1px solid #7F77DD; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; text-decoration: none; transition: all 0.2s; }
        .btn-outline:hover { background: rgba(127,119,221,0.1); }
        .divider { border: none; border-top: 1px solid #1E2D45; margin: 0; }
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        @media (max-width: 640px) { .grid-2 { grid-template-columns: 1fr; } .section-title { font-size: 26px; } }
        .skill-group-title { font-size: 12px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #7F77DD; margin-bottom: 10px; }
        .glow-dot { width: 8px; height: 8px; border-radius: 50%; background: #5DCAA5; display: inline-block; margin-right: 8px; box-shadow: 0 0 6px #5DCAA5; }
        .hero-stat { text-align: center; }
        .hero-stat-num { font-family: 'Space Grotesk', sans-serif; font-size: 28px; font-weight: 700; color: #F1F5F9; }
        .hero-stat-label { font-size: 12px; color: #64748B; margin-top: 2px; }
        input, textarea { background: #0F1623; border: 1px solid #1E2D45; border-radius: 8px; color: #E2E8F0; padding: 12px 16px; font-size: 14px; font-family: inherit; width: 100%; outline: none; transition: border-color 0.2s; }
        input:focus, textarea:focus { border-color: #7F77DD; }
        textarea { min-height: 120px; resize: vertical; }
        .contact-row { display: flex; gap: 12px; } @media (max-width: 640px) { .contact-row { flex-direction: column; } }
        .social-link { display: flex; align-items: center; gap: 10px; padding: 14px 20px; background: #0F1623; border: 1px solid #1E2D45; border-radius: 8px; color: #94A3B8; text-decoration: none; font-size: 14px; font-weight: 500; transition: all 0.2s; }
        .social-link:hover { border-color: #7F77DD; color: #E2E8F0; }
        .expand-row { display: flex; justify-content: space-between; align-items: center; }
        .chip-green { background: rgba(29,158,117,0.12); color: #5DCAA5; border: 1px solid rgba(29,158,117,0.2); }
        .ai-feature { background: #0F1623; border: 1px solid #1E2D45; border-radius: 10px; padding: 20px; }
        .ai-feature-icon { font-size: 24px; margin-bottom: 10px; }
        .ai-feature-title { font-weight: 600; font-size: 15px; color: #F1F5F9; margin-bottom: 6px; }
        .ai-feature-desc { font-size: 13px; color: #64748B; line-height: 1.6; }
        .menu-overlay { position: fixed; inset: 0; background: #0B0F1A; z-index: 50; padding: 24px; }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 40, background: "rgba(11,15,26,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid #1A2235" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 16, color: "#F1F5F9", letterSpacing: "-0.01em" }}>
          <img
            src="/logo.png"
            alt="PJ Logo"
            style={{
              height: "42px",
              width: "auto"
            }}
          />
          </span>
          <div style={{ display: "flex", gap: 2, alignItems: "center" }} className="desktop-nav">
            {NAV_LINKS.map((l) => (
              <button key={l.id} className={`nav-link${activeSection === l.id ? " active" : ""}`} onClick={() => scrollTo(l.id)} style={{ background: "none", border: "none" }}>
                {l.label}
              </button>
            ))}
            <a href="https://github.com/DareToCrack" target="_blank" rel="noopener noreferrer" style={{ marginLeft: 8, padding: "6px 14px", border: "1px solid #2D3748", borderRadius: 6, fontSize: 13, color: "#94A3B8", textDecoration: "none", fontWeight: 500 }}>
              GitHub ↗
            </a>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className="menu-overlay">
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 32 }}>
            <button onClick={() => setMenuOpen(false)} style={{ background: "none", border: "none", color: "#94A3B8", fontSize: 24, cursor: "pointer" }}>✕</button>
          </div>
          {NAV_LINKS.map((l) => (
            <button key={l.id} onClick={() => scrollTo(l.id)} style={{ display: "block", width: "100%", background: "none", border: "none", color: "#E2E8F0", fontSize: 20, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif", textAlign: "left", padding: "16px 0", cursor: "pointer", borderBottom: "1px solid #1E2D45" }}>
              {l.label}
            </button>
          ))}
        </div>
      )}

      {/* HERO */}
      <section id="hero" style={{ paddingTop: 120, paddingBottom: 80, maxWidth: 900, margin: "0 auto", paddingLeft: 24, paddingRight: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
          <span className="glow-dot"></span>
          <span style={{ fontSize: 13, color: "#5DCAA5", fontWeight: 500 }}>Open to internship opportunities</span>
        </div>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 700, color: "#F1F5F9", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 20 }}>
          Potta Jyothsna
          <br />
          <span style={{ color: "#7F77DD" }}>Cybersecurity</span> Engineer
        </h1>
        <p style={{ fontSize: 18, color: "#64748B", maxWidth: 560, lineHeight: 1.7, marginBottom: 36 }}>
          CEH-certified CS student specializing in VAPT, AI security research, and secure application development. Building tools that find vulnerabilities before attackers do.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 56 }}>
          <a href="#projects" onClick={(e) => { e.preventDefault(); scrollTo("projects"); }} className="btn-primary">View Projects →</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo("contact"); }} className="btn-outline">Get in Touch</a>
        </div>
        <div style={{ display: "flex", gap: 32, borderTop: "1px solid #1E2D45", paddingTop: 32 }}>
          {[["CEH", "Certified"], ["3", "CTF Events"], ["3", "Key Projects"], ["8.5", "CGPA"]].map(([n, l]) => (
            <div key={l} className="hero-stat">
              <div className="hero-stat-num">{n}</div>
              <div className="hero-stat-label">{l}</div>
            </div>
          ))}
        </div>
      </section>

      <hr className="divider" />

      {/* ABOUT */}
      <section id="about" className="section">
        <div className="section-label">Background</div>
        <h2 className="section-title">About Me</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
          <div>
            <p style={{ fontSize: 15, color: "#94A3B8", lineHeight: 1.8, marginBottom: 16 }}>
              I'm a B.Tech Computer Science & Cybersecurity student at Parul University (CGPA 8.5), graduating April 2027. I hold the CEH certification and have hands-on experience performing vulnerability assessments and penetration tests through my internship and independent projects.
            </p>
            <p style={{ fontSize: 15, color: "#94A3B8", lineHeight: 1.8, marginBottom: 16 }}>
              My focus is on the intersection of AI and security — I'm particularly interested in how large language models introduce new attack surfaces, and I've built LLMGuardian specifically to address this gap.
            </p>
            <p style={{ fontSize: 15, color: "#94A3B8", lineHeight: 1.8 }}>
              Outside security, I'm an NCC Leading Cadet and was selected for the PwC Launchpad Program, where I trained in Generative AI and modern data systems.
            </p>
          </div>
          <div>
            {[
              { label: "Education", value: "B.Tech Computer Science, Parul University" },
              { label: "CGPA", value: "8.5 / 10" },
              { label: "Certification", value: "Certified Ethical Hacker (CEH)" },
              { label: "Internship", value: "Cybersecurity Intern (Dec 2024 – Feb 2025)" },
              { label: "Program", value: "PwC Launchpad — Gen AI & Modern Data Systems" },
              { label: "Achievement", value: "NCC Leading Cadet (LCDT)" },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: "flex", gap: 12, marginBottom: 14, alignItems: "flex-start" }}>
                <div className="timeline-dot" style={{ marginTop: 6 }}></div>
                <div>
                  <div style={{ fontSize: 12, color: "#64748B", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 2 }}>{label}</div>
                  <div style={{ fontSize: 14, color: "#C4CBDA" }}>{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* SKILLS */}
      <section id="skills" className="section">
        <div className="section-label">Capabilities</div>
        <h2 className="section-title">Technical Skills</h2>
        <p className="section-sub">Tools, languages, and frameworks I work with across security and development.</p>
        <div className="grid-2">
          {Object.entries(SKILLS).map(([group, items]) => (
            <div key={group} style={{ background: "#0F1623", border: "1px solid #1E2D45", borderRadius: 10, padding: "20px 20px 14px" }}>
              <div className="skill-group-title">{group}</div>
              <div>{items.map((s) => <span key={s} className="skill-pill">{s}</span>)}</div>
            </div>
          ))}
        </div>
      </section>

      <hr className="divider" />

      {/* PROJECTS */}
      <section id="projects" className="section">
        <div className="section-label">Portfolio</div>
        <h2 className="section-title">Featured Projects</h2>
        <p className="section-sub">Security tools and platforms built to solve real problems — not toy demos.</p>
        {PROJECTS.map((p) => (
          <div key={p.id} className="proj-card" onClick={() => setExpandedProject(expandedProject === p.id ? null : p.id)}>
            <div className="expand-row">
              <div style={{ flex: 1 }}>
                <span className="proj-tag" style={{ background: `${p.tagColor}18`, color: p.tagColor, border: `1px solid ${p.tagColor}30` }}>{p.tag}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 22 }}>{p.icon}</span>
                  <div>
                    <div className="proj-title">{p.title}</div>
                    <div className="proj-sub">{p.subtitle}</div>
                  </div>
                </div>
              </div>
              <div style={{ color: "#64748B", fontSize: 20, marginLeft: 16 }}>{expandedProject === p.id ? "−" : "+"}</div>
            </div>
            <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.7, marginTop: 12 }}>{p.problem}</p>
            <div style={{ marginTop: 12 }}>{p.stack.map((t) => <span key={t} className="tech-chip">{t}</span>)}</div>
            <div className="impact-bar"></div>

            {expandedProject === p.id && (
              <div style={{ marginTop: 24, borderTop: "1px solid #1E2D45", paddingTop: 20 }}>
                <div className="detail-label">Real-World Relevance</div>
                <p className="detail-text">{p.relevance}</p>
                <div className="detail-label">Security Challenge</div>
                <p className="detail-text">{p.challenge}</p>
                <div className="detail-label">Security Impact</div>
                <p className="detail-text" style={{ color: "#5DCAA5" }}>{p.impact}</p>
                <div style={{ marginTop: 20 }}>
                  <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ fontSize: 13, padding: "8px 16px" }}>
                    View on GitHub ↗
                  </a>
                </div>
              </div>
            )}
          </div>
        ))}
      </section>

      <hr className="divider" />

      {/* AI SECURITY */}
      <section id="ai-security" className="section">
        <div className="section-label">Research Focus</div>
        <h2 className="section-title">AI Security & LLM Research</h2>
        <p className="section-sub">
          LLMs introduce an entirely new class of security vulnerabilities. This is one of the least-understood areas in cybersecurity — and one of the most important.
        </p>
        <div style={{ background: "linear-gradient(135deg, rgba(127,119,221,0.08) 0%, rgba(29,158,117,0.06) 100%)", border: "1px solid rgba(127,119,221,0.2)", borderRadius: 12, padding: "28px 32px", marginBottom: 32 }}>
          <div style={{ fontSize: 13, color: "#7F77DD", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Flagship Project</div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 700, color: "#F1F5F9", marginBottom: 8 }}>LLMGuardian</div>
          <p style={{ fontSize: 14, color: "#94A3B8", lineHeight: 1.7, maxWidth: 520, marginBottom: 20 }}>
            An AI security testing platform that systematically evaluates LLMs for prompt injection, jailbreaks, and adversarial manipulation. Generates structured risk scores with remediation guidance — purpose-built for security teams auditing AI deployments.
          </p>
          <a href="https://github.com/DareToCrack" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: 13 }}>View Project ↗</a>
        </div>
        <div className="grid-2">
          {[
            { icon: "💉", title: "Prompt Injection Detection", desc: "Identifies direct and indirect prompt injection attempts — both user-side and document-based injection patterns." },
            { icon: "🔓", title: "Jailbreak Analysis", desc: "Tests known and novel jailbreak techniques — role-playing, base64 encoding, context override, and more." },
            { icon: "📊", title: "AI Risk Scoring", desc: "Quantifies vulnerability severity using a structured scoring model. Outputs actionable risk reports by category." },
            { icon: "🛡️", title: "LLM Vulnerability Assessment", desc: "Systematic evaluation of LLM deployments against the OWASP Top 10 for LLM Applications framework." },
          ].map((f) => (
            <div key={f.title} className="ai-feature">
              <div className="ai-feature-icon">{f.icon}</div>
              <div className="ai-feature-title">{f.title}</div>
              <div className="ai-feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 24, background: "#0F1623", border: "1px solid #1E2D45", borderRadius: 10, padding: "16px 20px" }}>
          <div style={{ fontSize: 12, color: "#64748B", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Relevant Frameworks</div>
          <div>{["OWASP LLM Top 10", "MITRE ATLAS", "NIST AI RMF", "Prompt Injection (PEAS)", "Adversarial ML"].map((f) => <span key={f} className="skill-pill">{f}</span>)}</div>
        </div>
      </section>

      <hr className="divider" />

      {/* CTF */}
      <section id="ctf" className="section">
        <div className="section-label">Competitions</div>
        <h2 className="section-title">CTF Experience</h2>
        <p className="section-sub">Capture The Flag competitions are where security skills get tested against real challenges. Each event sharpens a different part of the toolkit.</p>
        <div style={{ display: "grid", gap: 16 }}>
          {CTF_EVENTS.map((c) => (
            <div key={c.name} className="ctf-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
                <div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 600, color: "#F1F5F9" }}>{c.name}</div>
                  <div style={{ fontSize: 13, color: "#64748B", marginTop: 2 }}>{c.org}</div>
                </div>
                <span className="skill-pill chip-green" style={{ fontSize: 11 }}>{c.type}</span>
              </div>
              <p style={{ fontSize: 14, color: "#94A3B8", lineHeight: 1.7, marginBottom: 14 }}>{c.highlight}</p>
              <div style={{ marginBottom: 10 }}>
                <span style={{ fontSize: 11, color: "#64748B", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", marginRight: 8 }}>Skills:</span>
                {c.skills.map((s) => <span key={s} className="skill-pill" style={{ fontSize: 11 }}>{s}</span>)}
              </div>
              <div>
                <span style={{ fontSize: 11, color: "#64748B", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", marginRight: 8 }}>Tools:</span>
                {c.tools.map((t) => <span key={t} className="tech-chip" style={{ fontSize: 11 }}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="divider" />

      {/* CERTIFICATIONS */}
      <section id="certifications" className="section">
        <div className="section-label">Credentials</div>
        <h2 className="section-title">Certifications & Programs</h2>
        <p className="section-sub">Verified credentials that demonstrate security knowledge and professional development.</p>
        <div style={{ display: "grid", gap: 12 }}>
          {[
            { name: "Certified Ethical Hacker (CEH)", org: "EC-Council", status: "Active", color: "#7F77DD", icon: "🎯" },
            { name: "PwC Launchpad Program", org: "PricewaterhouseCoopers — Generative AI & Modern Data Systems", status: "Completed", color: "#1D9E75", icon: "🏢" },
            { name: "NCC Leading Cadet (LCDT)", org: "National Cadet Corps, India", status: "Active", color: "#D85A30", icon: "🎖️" },
          ].map((cert) => (
            <div key={cert.name} className="cert-badge">
              <span style={{ fontSize: 28 }}>{cert.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: "#F1F5F9", fontSize: 15 }}>{cert.name}</div>
                <div style={{ fontSize: 13, color: "#64748B", marginTop: 2 }}>{cert.org}</div>
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 20, background: `${cert.color}18`, color: cert.color, border: `1px solid ${cert.color}30` }}>{cert.status}</span>
            </div>
          ))}
        </div>
      </section>

      <hr className="divider" />

      {/* INTERNSHIP */}
      <section id="experience" className="section">
        <div className="section-label">Experience</div>
        <h2 className="section-title">Internship Experience</h2>
        <div style={{ background: "#0F1623", border: "1px solid #1E2D45", borderRadius: 12, padding: "28px 32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
            <div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 600, color: "#F1F5F9" }}>Cybersecurity Intern</div>
              <div style={{ fontSize: 14, color: "#64748B", marginTop: 4 }}>Hands-on security internship</div>
            </div>
            <span style={{ fontSize: 13, color: "#94A3B8", padding: "6px 14px", border: "1px solid #2D3748", borderRadius: 6 }}>Dec 2024 – Feb 2025</span>
          </div>
          <div>
            {["Conducted vulnerability assessments on web and network targets", "Performed security analysis tasks using industry-standard tooling", "Worked on web/network security testing and reporting", "Applied VAPT methodology to identify and document security findings"].map((item) => (
              <div key={item} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
                <span style={{ color: "#7F77DD", marginTop: 3, flexShrink: 0 }}>▸</span>
                <span style={{ fontSize: 14, color: "#94A3B8", lineHeight: 1.6 }}>{item}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16 }}>
            {["Burp Suite", "Kali Linux", "Network Scanning", "Vulnerability Reporting", "Web Security"].map((t) => <span key={t} className="tech-chip">{t}</span>)}
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* CONTACT */}
      <section id="contact" className="section">
        <div className="section-label">Get In Touch</div>
        <h2 className="section-title">Contact</h2>
        <p className="section-sub">I'm actively looking for cybersecurity internship and analyst roles. Reach out to discuss opportunities or security projects.</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
          {[
            { icon: "📧", label: "Email", value: "pottajyothsna@gmail.com", href: "mailto:pottajyothsna@gmail.com" },
            { icon: "📱", label: "Phone", value: "+91 88852 77433", href: "tel:+918885277433" },
          ].map((c) => (
            <a key={c.label} href={c.href} className="social-link">
              <span style={{ fontSize: 20 }}>{c.icon}</span>
              <div>
                <div style={{ fontSize: 11, color: "#64748B", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 2 }}>{c.label}</div>
                <div style={{ color: "#C4CBDA", fontSize: 14 }}>{c.value}</div>
              </div>
            </a>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 40 }}>
        {[
          {
            icon: "/linkedin.png",
            label: "LinkedIn",
            url: "https://www.linkedin.com/in/jyothsna6125",
          },
          {
            icon: "/github.png",
            label: "GitHub",
            url: "https://github.com/DareToCrack",
          },
        ].map((s) => (
            <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" className="social-link">
              <img
                src={s.icon}
                alt={s.label}
                style={{
                  width: "24px",
                  height: "24px",
                  objectFit: "contain"
                }}
              />
              <span>{s.label}</span>
              <span style={{ marginLeft: "auto", color: "#64748B", fontSize: 12 }}>↗</span>
            </a>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #1E2D45", padding: "28px 24px", textAlign: "center" }}>
        <p style={{ fontSize: 13, color: "#475569" }}>
          Built by Potta Jyothsna · CEH · Parul University ·{" "}
          <a href="mailto:pottajyothsna@gmail.com" style={{ color: "#7F77DD", textDecoration: "none" }}>pottajyothsna@gmail.com</a>
        </p>
      </footer>
    </div>
  );
}
