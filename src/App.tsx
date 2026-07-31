import { ArrowUpRight, Bot, Building2, CheckCircle2, CircuitBoard, Globe2, Handshake, Layers3, MousePointer2, Sparkles, UsersRound, Zap } from 'lucide-react'
import { useEffect, useRef } from 'react'
import type { LucideIcon } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'

type Service = [title: string, text: string, Icon: LucideIcon]

const services: Service[] = [
  ['Business diagnosis', 'Map the workflow, revenue leak, and highest-value digital move before building anything.', Building2],
  ['Growth websites', 'Premium business websites that explain, convert, and stay easy to operate.', Globe2],
  ['CRM-lite systems', 'Simple lead, client, booking, and follow-up systems for teams outgrowing WhatsApp and spreadsheets.', Layers3],
  ['Automation + AI agents', 'Supervised workflows that reduce repetitive work while keeping humans in control.', Bot],
]

const steps = [
  ['01', 'Diagnose', 'Understand the business, bottlenecks, customers, and operational reality.'],
  ['02', 'Connect', 'Bring in trusted partners, tools, mentors, providers, and opportunity pathways.'],
  ['03', 'Build', 'Deliver the smallest useful system first: site, dashboard, CRM, automation, or internal tool.'],
  ['04', 'Improve', 'Measure usage, refine the workflow, and grow the system responsibly.'],
]

const stats = [
  ['91.6%', 'Lebanon internet penetration', 'DataReportal 2025'],
  ['93–95%', 'Enterprises are SMEs', 'Lebanon SME Strategy / UNDP'],
  ['22.7%', 'Youth unemployment ages 15–24', 'World Bank / ILO 2023'],
]

function App() {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lenis = reduceMotion ? null : new Lenis({ duration: 1.1, smoothWheel: true })
    let raf = 0
    const tick = (time: number) => {
      lenis?.raf(time)
      raf = requestAnimationFrame(tick)
    }
    if (lenis) raf = requestAnimationFrame(tick)

    const ctx = gsap.context(() => {
      gsap.from('.nav', { y: -22, opacity: 0, duration: .8, ease: 'power3.out' })
      gsap.from('.hero-copy > *', { y: 32, opacity: 0, duration: 1, stagger: .12, ease: 'power3.out' })
      gsap.to('.orb-a', { x: 70, y: -55, rotation: 16, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to('.orb-b', { x: -60, y: 45, rotation: -18, duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to('.mesh-lines', { backgroundPosition: '120% 50%', duration: 18, repeat: -1, ease: 'none' })

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 82%' },
          opacity: 0,
          y: 34,
          duration: .8,
          ease: 'power3.out',
        })
      })

      gsap.utils.toArray<HTMLElement>('.process-card').forEach((card, i) => {
        gsap.to(card, {
          scrollTrigger: { trigger: '.process', start: 'top 72%', end: 'bottom 35%', scrub: true },
          y: i % 2 ? -34 : 34,
          ease: 'none',
        })
      })
    }, root)

    return () => {
      ctx.revert()
      lenis?.destroy()
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={root} className="site-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <header className="nav">
        <a className="brand" href="#top" aria-label="Arzware home">
          <img src="./assets/arzware-logo.svg" alt="Arzware" />
          <span>Arzware</span>
        </a>
        <nav>
          <a href="#model">Model</a>
          <a href="#work">Work</a>
          <a href="#impact">Impact</a>
        </nav>
        <a className="nav-cta" href="mailto:arzware.lb@gmail.com">Start a diagnosis</a>
      </header>

      <main id="top">
        <section className="hero section-grid">
          <div className="hero-copy">
            <p className="eyebrow"><Sparkles size={16} /> Arzware Website V2 concept</p>
            <h1>Connecting Businesses. <span>Building Futures.</span></h1>
            <p className="hero-text">Arzware helps businesses find the right people, partners, opportunities, and digital systems to grow — then turns the highest-value problem into a practical website, workflow, dashboard, CRM-lite system, or supervised automation.</p>
            <div className="hero-actions">
              <a className="primary" href="mailto:arzware.lb@gmail.com">Book a business diagnosis <ArrowUpRight size={18} /></a>
              <a className="secondary" href="#showcase">Explore the motion story</a>
            </div>
          </div>

          <div className="motion-stage" aria-label="Animated Arzware ecosystem graphic">
            <div className="mesh-lines" />
            <div className="orb orb-a"><CircuitBoard /></div>
            <div className="orb orb-b"><Handshake /></div>
            <div className="core-card">
              <img src="./assets/arzware-logo.png" alt="" />
              <strong>Diagnose → Connect → Build → Improve</strong>
              <span>business growth system</span>
            </div>
            <div className="node node-1">SMEs</div>
            <div className="node node-2">Partners</div>
            <div className="node node-3">Youth talent</div>
            <div className="node node-4">Digital systems</div>
          </div>
        </section>

        <section className="marquee" aria-label="Arzware capabilities">
          <div><span>Business diagnosis</span><span>Websites</span><span>CRM-lite</span><span>Dashboards</span><span>Automation</span><span>AI workflows</span><span>Connections</span></div>
          <div><span>Business diagnosis</span><span>Websites</span><span>CRM-lite</span><span>Dashboards</span><span>Automation</span><span>AI workflows</span><span>Connections</span></div>
        </section>

        <section id="model" className="section split" data-reveal>
          <div>
            <p className="eyebrow"><MousePointer2 size={16} /> New direction</p>
            <h2>More than a digital service provider.</h2>
          </div>
          <p className="lead">The website keeps Arzware’s premium dark identity, but makes the message sharper: business development first, digital innovation as the mechanism, social impact as the multiplier.</p>
        </section>

        <section id="showcase" className="section stats-grid">
          {stats.map(([value, label, source]) => (
            <article className="stat-card" data-reveal key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
              <small>{source}</small>
            </article>
          ))}
        </section>

        <section id="work" className="section services">
          <div className="section-heading" data-reveal>
            <p className="eyebrow"><Zap size={16} /> What Arzware builds</p>
            <h2>Smallest useful system first. Then scale what works.</h2>
          </div>
          <div className="service-grid">
            {services.map(([title, text, Icon]) => (
              <article className="service-card" data-reveal key={title as string}>
                <Icon />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section process" data-reveal>
          {steps.map(([num, title, text]) => (
            <article className="process-card" key={title}>
              <span>{num}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </section>

        <section id="impact" className="section impact section-grid" data-reveal>
          <div>
            <p className="eyebrow"><UsersRound size={16} /> Sustainable impact</p>
            <h2>Youth-powered delivery, senior-supervised quality.</h2>
            <p className="lead">Arzware can turn real client projects into supervised experience: portfolio evidence, job-ready discipline, and business value — not charity, a sustainable ecosystem.</p>
          </div>
          <div className="impact-panel">
            {['Trusted business connections', 'Practical digital systems', 'Supervised youth experience', 'Measurable partner outcomes'].map(item => (
              <div key={item}><CheckCircle2 /> {item}</div>
            ))}
          </div>
        </section>

        <section className="cta section" data-reveal>
          <p className="eyebrow">Ready when the business is ready</p>
          <h2>Start with one diagnosis. Build the system that actually matters.</h2>
          <a className="primary" href="mailto:arzware.lb@gmail.com">arzware.lb@gmail.com <ArrowUpRight size={18} /></a>
        </section>
      </main>
    </div>
  )
}

export default App
