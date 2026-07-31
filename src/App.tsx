import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

const evidence = [
  { text: 'CUSTOMER\nWAITING', className: 'note note-a' },
  { text: 'final_FINAL_v7.xlsx', className: 'note note-b' },
  { text: 'WHO FOLLOWED UP?', className: 'note note-c' },
  { text: 'COPY / PASTE / REPEAT', className: 'note note-d' },
  { text: 'GOOD IDEA.\nNO OWNER.', className: 'note note-e' },
]

const patterns = [
  {
    no: '01',
    symptom: '“We need a better website.”',
    truth: 'Maybe. First, we inspect the journey around it.',
    response: 'Offer clarity · landing pages · intake · booking · follow-up',
    label: 'CUSTOMER JOURNEY',
  },
  {
    no: '02',
    symptom: '“Everything lives in WhatsApp.”',
    truth: 'The team needs shared memory, not another complicated platform.',
    response: 'CRM-lite · client records · dashboards · portals · internal tools',
    label: 'OPERATING MEMORY',
  },
  {
    no: '03',
    symptom: '“We repeat this every week.”',
    truth: 'Repetition is a signal. Automate the routine, protect the judgment.',
    response: 'Reminders · documents · reports · supervised AI workflows',
    label: 'QUIET AUTOMATION',
  },
]

const network = ['BUSINESSES', 'PARTNERS', 'STARTUPS', 'YOUTH', 'MENTORS', 'SPECIALISTS']

function EvidenceBoard() {
  const board = useRef<HTMLDivElement>(null)

  const move = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!board.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rect = board.current.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    board.current.style.setProperty('--mx', `${x}`)
    board.current.style.setProperty('--my', `${y}`)
  }

  return (
    <div ref={board} className="evidence-board" onPointerMove={move}>
      <div className="board-label">EVIDENCE / 001—005</div>
      <div className="board-grid" />
      <svg className="thread-map" viewBox="0 0 760 680" aria-hidden="true">
        <path className="thread-shadow" d="M92 118 C 270 80, 238 325, 386 300 S 515 112, 665 151 M118 526 C275 600, 293 380, 386 300 S 590 420, 684 555" />
        <path className="thread" d="M92 118 C 270 80, 238 325, 386 300 S 515 112, 665 151 M118 526 C275 600, 293 380, 386 300 S 590 420, 684 555" />
      </svg>
      {evidence.map((item) => <div className={item.className} key={item.text}>{item.text}</div>)}
      <div className="pin pin-a" /><div className="pin pin-b" /><div className="pin pin-c" />
      <div className="next-move"><span>ONE USEFUL</span><strong>NEXT MOVE</strong><small>FOUND WITH ARZWARE</small></div>
      <div className="pencil-mark">Look here first.</div>
    </div>
  )
}

function RouteDiagram() {
  return (
    <div className="route-diagram">
      <svg viewBox="0 0 1200 280" preserveAspectRatio="none" aria-hidden="true">
        <path className="route-base" d="M26 145 C155 30 250 250 390 138 S650 45 790 145 S1035 250 1174 128" />
        <path className="route-live" d="M26 145 C155 30 250 250 390 138 S650 45 790 145 S1035 250 1174 128" />
      </svg>
      {[
        ['01', 'DIAGNOSE', 'Find the blockage, not just the request.'],
        ['02', 'CONNECT', 'Bring the right people, tools, and opportunities into reach.'],
        ['03', 'BUILD', 'Make the smallest useful system real.'],
        ['04', 'IMPROVE', 'Measure, learn, and strengthen what works.'],
      ].map(([num, title, text], i) => (
        <article className={`route-stop stop-${i + 1}`} key={title}>
          <span>{num}</span><h3>{title}</h3><p>{text}</p>
        </article>
      ))}
    </div>
  )
}

function App() {
  const root = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lenis = reduceMotion ? null : new Lenis({ duration: 1.05, smoothWheel: true })
    let raf = 0
    const frame = (time: number) => { lenis?.raf(time); raf = requestAnimationFrame(frame) }
    raf = requestAnimationFrame(frame)

    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power4.out' } })
        .from('.masthead', { y: -28, opacity: 0, duration: .8 })
        .from('.hero-kicker', { y: 18, opacity: 0, duration: .65 }, '-=.35')
        .from('.hero-word span', { yPercent: 115, rotate: 3, duration: 1.15, stagger: .1 }, '-=.35')
        .from('.hero-summary, .hero-actions', { y: 25, opacity: 0, duration: .7, stagger: .1 }, '-=.5')
        .from('.evidence-board', { scale: .92, rotate: 3, opacity: 0, duration: 1.1 }, '-=1')

      gsap.utils.toArray<HTMLElement>('[data-in]').forEach((el) => {
        gsap.from(el, { scrollTrigger: { trigger: el, start: 'top 84%' }, y: 45, opacity: 0, duration: .9, ease: 'power3.out' })
      })

      gsap.to('.thread', { strokeDashoffset: 0, duration: 3, ease: 'power2.inOut' })
      gsap.to('.route-live', {
        scrollTrigger: { trigger: '.method', start: 'top 70%', end: 'bottom 58%', scrub: 1 },
        strokeDashoffset: 0,
      })
      gsap.to('.case-roll', {
        scrollTrigger: { trigger: '.evidence-chapter', start: 'top bottom', end: 'bottom top', scrub: 1 },
        xPercent: -14,
      })
      gsap.utils.toArray<HTMLElement>('.pattern').forEach((panel) => {
        gsap.from(panel.querySelectorAll('.pattern-line > *'), {
          scrollTrigger: { trigger: panel, start: 'top 75%' },
          y: 30, opacity: 0, stagger: .08, duration: .75, ease: 'power3.out',
        })
      })
      gsap.to('.network-ring', { rotation: 20, scrollTrigger: { trigger: '.network', start: 'top bottom', end: 'bottom top', scrub: 1 } })
    }, root)

    return () => { ctx.revert(); lenis?.destroy(); cancelAnimationFrame(raf) }
  }, [])

  return (
    <div ref={root} className="site">
      <header className="masthead">
        <a className="identity" href="#top"><img src="./assets/arzware-mark.png" alt="" /><span>ARZWARE</span></a>
        <div className="status"><i /> ACCEPTING BUSINESS REVIEWS</div>
        <nav className={menuOpen ? 'open' : ''}>
          <a href="#method" onClick={() => setMenuOpen(false)}>METHOD</a>
          <a href="#patterns" onClick={() => setMenuOpen(false)}>PATTERNS</a>
          <a href="#impact" onClick={() => setMenuOpen(false)}>IMPACT</a>
          <a href="mailto:arzware.lb@gmail.com">START A REVIEW ↗</a>
        </nav>
        <button className="menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? 'CLOSE' : 'MENU'}</button>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <div className="hero-kicker"><span>BUSINESS DEVELOPMENT</span><span>DIGITAL INNOVATION</span><span>LEBANON + BEYOND</span></div>
            <h1 aria-label="Bring us the messy part">
              <span className="hero-word"><span>BRING US</span></span>
              <span className="hero-word outline"><span>THE MESSY</span></span>
              <span className="hero-word italic"><span>PART.</span></span>
            </h1>
            <p className="hero-summary">Arzware finds what is slowing the business, connects the right people or tools, and turns one valuable problem into a practical next move.</p>
            <div className="hero-actions"><a href="mailto:arzware.lb@gmail.com">PUT THE PROBLEM ON THE TABLE ↗</a><span>SCROLL TO OPEN THE FILE ↓</span></div>
          </div>
          <EvidenceBoard />
          <div className="hero-index">FILE № A—2026<br />SAIDA, LEBANON</div>
        </section>

        <div className="case-ticker"><div className="case-roll">UNANSWERED MESSAGE — MISSED LEAD — REPEATED TASK — SCATTERED DATA — UNCLEAR OFFER — GOOD IDEA, STILL WAITING —&nbsp;</div></div>

        <section className="evidence-chapter">
          <div className="chapter-index">I / READ THE EVIDENCE</div>
          <div className="evidence-title" data-in>
            <p>BEFORE A WEBSITE.<br />BEFORE AN AUTOMATION.<br />BEFORE “AI.”</p>
            <h2>There is a business problem asking to be <em>understood.</em></h2>
          </div>
          <div className="receipt" data-in>
            <div className="receipt-head">ARZWARE / FIELD NOTES<br />OBSERVATION LOG</div>
            <p><span>09:12</span> An inquiry sits unanswered.</p>
            <p><span>10:40</span> A task is copied into three places.</p>
            <p><span>13:05</span> The owner is the only system.</p>
            <p><span>16:22</span> A growth idea has no next step.</p>
            <div className="receipt-total"><span>PATTERN DETECTED</span><strong>FRICTION</strong></div>
          </div>
          <p className="evidence-copy" data-in>Businesses rarely fail in one dramatic moment. They leak time, context, trust, and opportunity through small gaps. We start there—not with a technology shopping list.</p>
        </section>

        <section id="method" className="method">
          <div className="chapter-index">II / THE ROUTE</div>
          <div className="method-head" data-in>
            <h2>Four moves.<br /><em>One accountable outcome.</em></h2>
            <p>Sometimes the answer is software. Sometimes it is a partner, a clearer process, or a smaller first step. Arzware owns the diagnosis and coordinates the route.</p>
          </div>
          <RouteDiagram />
        </section>

        <section id="patterns" className="patterns">
          <div className="patterns-intro">
            <div className="chapter-index">III / RESPONSE PATTERNS</div>
            <h2 data-in>Not a service menu.<br />A response to what is <em>actually happening.</em></h2>
            <p data-in>These are solution patterns, not claims about completed client projects.</p>
          </div>
          {patterns.map((item) => (
            <article className="pattern" key={item.no}>
              <div className="pattern-no">{item.no}</div>
              <div className="pattern-line"><small>THE REQUEST</small><h3>{item.symptom}</h3></div>
              <div className="pattern-line"><small>WHAT WE TEST</small><p>{item.truth}</p></div>
              <div className="pattern-line response"><small>USEFUL RESPONSE</small><p>{item.response}</p></div>
              <div className="pattern-stamp">{item.label}</div>
            </article>
          ))}
        </section>

        <section className="network">
          <div className="chapter-index">IV / CONNECTION IS INFRASTRUCTURE</div>
          <div className="network-copy" data-in>
            <h2>The right system can move work.<br /><em>The right connection can move a business.</em></h2>
            <p>Arzware connects businesses with trusted partners, specialists, startups, mentors, technical support, and growth opportunities—then keeps one accountable outcome at the center.</p>
          </div>
          <div className="network-map" data-in>
            <div className="network-ring">
              {network.map((item, i) => <span className={`network-node node-${i + 1}`} key={item}>{item}</span>)}
            </div>
            <div className="network-core"><img src="./assets/arzware-mark.png" alt="Arzware" /><span>DIAGNOSE<br />COORDINATE<br />DELIVER</span></div>
          </div>
        </section>

        <section id="impact" className="impact">
          <div className="impact-stamp">REAL WORK<br />SUPERVISED</div>
          <div className="chapter-index">V / BUILDING FUTURES</div>
          <h2 data-in>Every experienced person was once waiting for someone to trust them with <em>real work.</em></h2>
          <div className="impact-columns" data-in>
            <p><strong>For young people</strong>Supervised real-project experience across development, design, research, quality assurance, AI, marketing, and operations.</p>
            <p><strong>For businesses</strong>Research, testing, documentation, and execution support—with Arzware accountable for supervision, privacy, quality, and the client outcome.</p>
          </div>
          <div className="impact-rule"><span>TALENT IS EVERYWHERE.</span><span>OPPORTUNITY IS NOT.</span></div>
        </section>

        <section className="closing">
          <div className="closing-note">BUSINESS IMPROVEMENT REVIEW / 01</div>
          <h2 data-in>Put the messy part<br /><em>on the table.</em></h2>
          <p data-in>A missed lead. A repeated task. A scattered process. A connection you cannot find. An AI idea that needs human judgment.</p>
          <a href="mailto:arzware.lb@gmail.com">START WITH ONE PROBLEM <span>↗</span></a>
          <footer><div className="identity"><img src="./assets/arzware-mark.png" alt="" /><span>ARZWARE</span></div><span>SAIDA, LEBANON · ARZWARE.LB@GMAIL.COM</span><span>© 2026</span></footer>
        </section>
      </main>
    </div>
  )
}

export default App
