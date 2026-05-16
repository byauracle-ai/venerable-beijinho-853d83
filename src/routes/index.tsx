import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useRef, useCallback } from 'react'

export const Route = createFileRoute('/')({
  component: HomePage,
})

const img = (f: string) => `/${f}`

// ─── Mouse parallax hook ──────────────────────────────────────────────────────
function useMouseParallax(strength = 12) {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const fn = (e: MouseEvent) => {
      setPos({
        x: (e.clientX / window.innerWidth  - 0.5),
        y: (e.clientY / window.innerHeight - 0.5),
      })
    }
    window.addEventListener('mousemove', fn, { passive: true })
    return () => window.removeEventListener('mousemove', fn)
  }, [])
  return {
    imgStyle: { transform: `translate(${pos.x * -strength}px, ${pos.y * -strength * 0.6}px)` },
    textStyle: { transform: `translate(${pos.x * 5}px, ${pos.y * 3}px)` },
  }
}

// ─── Custom cursor ────────────────────────────────────────────────────────────
function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const pos     = useRef({ x: -100, y: -100 })
  const ring    = useRef({ x: -100, y: -100 })
  const rafRef  = useRef<number>()

  useEffect(() => {
    // Hide system cursor globally
    document.body.style.cursor = 'none'

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      const t = e.target as HTMLElement
      const isImg     = t.closest('img, .img-hover') !== null
      const isBtn     = t.closest('a, button, .btn') !== null
      const isDragging = document.body.classList.contains('dragging')

      if (dotRef.current) {
        dotRef.current.style.opacity = '1'
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%) scale(${isDragging ? 1.8 : isBtn ? 1.4 : 1})`
        dotRef.current.style.background = isBtn ? 'var(--gold2)' : 'var(--gold)'
      }
      if (ringRef.current) {
        ringRef.current.style.width  = isImg ? '56px' : '28px'
        ringRef.current.style.height = isImg ? '56px' : '28px'
        ringRef.current.style.opacity = isDragging ? '0' : '1'
        ringRef.current.style.borderColor = isBtn ? 'var(--gold2)' : 'rgba(196,160,90,0.5)'
      }
    }

    // Lerp ring to dot position
    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.1
      ring.current.y += (pos.current.y - ring.current.y) * 0.1
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%,-50%)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    window.addEventListener('mousemove', onMove)
    return () => {
      document.body.style.cursor = ''
      window.removeEventListener('mousemove', onMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      {/* Dot — snaps instantly */}
      <div ref={dotRef} style={{
        position: 'fixed', top: 0, left: 0, zIndex: 99999,
        width: 6, height: 6, borderRadius: '50%',
        background: 'var(--gold)', pointerEvents: 'none',
        opacity: 0, transition: 'transform 0.08s ease, background 0.3s, width 0.3s, height 0.3s',
        willChange: 'transform',
      }} />
      {/* Ring — lags behind (lerp) */}
      <div ref={ringRef} style={{
        position: 'fixed', top: 0, left: 0, zIndex: 99998,
        width: 28, height: 28, borderRadius: '50%',
        border: '1px solid rgba(196,160,90,0.5)',
        pointerEvents: 'none', opacity: 0,
        transition: 'width 0.4s ease, height 0.4s ease, opacity 0.3s, border-color 0.3s',
        willChange: 'transform',
      }} />
    </>
  )
}

// ─── Drag-to-scroll ───────────────────────────────────────────────────────────
function DragScroll() {
  useEffect(() => {
    let startY    = 0
    let startScroll = 0
    let lastY     = 0
    let velocity  = 0
    let lastTime  = performance.now()
    let isDragging = false
    let rafId: number

    const onDown = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (t.closest('a, button, input, textarea, select')) return
      isDragging  = true
      startY      = e.clientY
      startScroll = window.scrollY
      lastY       = e.clientY
      lastTime    = performance.now()
      velocity    = 0
      cancelAnimationFrame(rafId)
      document.body.classList.add('dragging')
      document.body.style.userSelect = 'none'
    }

    const onMove = (e: MouseEvent) => {
      if (!isDragging) return
      const now = performance.now()
      const dt  = Math.max(1, now - lastTime)
      // velocity in px/ms — used only for the gentle coast on release
      velocity  = (lastY - e.clientY) / dt
      lastY     = e.clientY
      lastTime  = now
      // Pure 1:1 — page moves exactly as far as your hand
      window.scrollTo({ top: startScroll + (startY - e.clientY), behavior: 'instant' as ScrollBehavior })
    }

    const onUp = () => {
      if (!isDragging) return
      isDragging = false
      document.body.classList.remove('dragging')
      document.body.style.userSelect = ''

      // Gentle coast — short, no overshoot
      // Clamp velocity so it never rockets away
      let v = Math.max(-2, Math.min(2, velocity)) * 80 // max ~160px coast
      const coast = () => {
        if (Math.abs(v) < 0.3) return
        v *= 0.88  // slow decay — feels like heavy fabric settling
        window.scrollBy({ top: v, behavior: 'instant' as ScrollBehavior })
        rafId = requestAnimationFrame(coast)
      }
      rafId = requestAnimationFrame(coast)
    }

    window.addEventListener('mousedown', onDown)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup',   onUp)
    return () => {
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup',   onUp)
      cancelAnimationFrame(rafId)
    }
  }, [])
  return null
}

// ─── Page load curtain ────────────────────────────────────────────────────────
function LoadCurtain() {
  const [gone, setGone] = useState(false)
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    const t1 = setTimeout(() => setGone(true), 1200)
    const t2 = setTimeout(() => setVisible(false), 2000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])
  if (!visible) return null
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99997,
      background: 'var(--black)',
      opacity: gone ? 0 : 1,
      transition: 'opacity 0.9s cubic-bezier(0.4,0,0.2,1)',
      pointerEvents: gone ? 'none' : 'all',
    }} />
  )
}

const IMGS = {
  hero:      img('iron-wood-house-earth-lines-architects_18.jpg'),
  window:    img('window.jpg'),
  entrance:  img('entrance.jpg'),
  interior:  img('interior.jpg'),
  pool2:     img('infinity pool 2.jpg'),
  pool:      img('infinity pool.jpg'),
  living:    img('Screenshot 2026-05-14 201935.png'),
  horizon:   img('Screenshot 2026-05-14 201944.png'),
  dining:    img('Screenshot 2026-05-14 202012.png'),
  master:    img('Screenshot 2026-05-14 202036.png'),
  detail:    img('Screenshot 2026-05-14 202054.png'),
  spa1:      img('spa1.jpg'),
  spa2:      img('spa2.jpg'),
  island:    img('grok-image-86070f82-2171-4501-8fe6-d6f72d7d1dcb.png'),
  mcclean:   img('205032606_4198387713573399_8106792087768550505_n.jpg'),
}

// Villa gallery — the horizontal scroll sequence
const VILLA_SLIDES = [
  { src: IMGS.entrance,  label: 'Arrival',       caption: 'A private approach through two hectares of tropical canopy' },
  { src: IMGS.window,    label: 'The View',      caption: 'Light and landscape held in a single frame' },
  { src: IMGS.interior,  label: 'Interior',      caption: 'Floor-to-ceiling glass dissolving interior and ocean into one' },
  { src: IMGS.living,    label: 'Living',        caption: 'Every surface chosen. Every detail earned.' },
  { src: IMGS.pool2,     label: 'Infinity Edge', caption: 'A pool that ends where the Indian Ocean begins' },
  { src: IMGS.pool,      label: 'The Pool',      caption: 'Infinity edge dissolving into the horizon at blue hour' },
  { src: IMGS.dining,    label: 'Al Fresco',     caption: 'A covered pavilion for twelve. Salt air and candlelight.' },
  { src: IMGS.master,    label: 'Master Suite',  caption: 'Five en-suite sanctuaries of reclaimed teak and stone' },
]

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    obs.observe(el); return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

function useScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)
  const [p, setP] = useState(0)
  useEffect(() => {
    const fn = () => {
      const el = ref.current; if (!el) return
      const r = el.getBoundingClientRect()
      setP(Math.min(1, Math.max(0, (window.innerHeight - r.top) / (el.offsetHeight + window.innerHeight))))
    }
    window.addEventListener('scroll', fn, { passive: true }); fn()
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return { ref, p }
}

function useCountUp(target: number, active: boolean, duration = 2200, decimals = 0) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const ease = 1 - Math.pow(1 - t, 3)
      setVal(parseFloat((ease * target).toFixed(decimals)))
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [active, target, duration, decimals])
  return val
}

// ─── Global styles ────────────────────────────────────────────────────────────
function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Jost:wght@200;300;400&display=swap');

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

      :root {
        --black:   #050507;
        --ink:     #08080c;
        --surface: #0d0d12;
        --lift:    #121218;
        --spa:     #030308;
        --gold:    #c4a05a;
        --gold2:   #dcc07e;
        --stone:   #f0ece4;
        --smoke:   #9a9488;
        --ash:     #5a5650;
        --border:  rgba(196,160,90,0.12);
        --borderl: rgba(196,160,90,0.06);
        --F: 'Cormorant Garamond', Georgia, serif;
        --H: 'Cinzel', serif;
        --G: 'Jost', sans-serif;
      }

      html { scroll-behavior: auto; }
      body {
        background: var(--black);
        color: var(--stone);
        font-family: var(--G);
        font-weight: 300;
        -webkit-font-smoothing: antialiased;
        overflow-x: hidden;
        cursor: none;
      }
      body.dragging { cursor: none !important; }
      body.dragging * { cursor: none !important; }
      a, button { cursor: none; }
      body::after {
        content: ''; position: fixed; inset: 0;
        pointer-events: none; z-index: 9999; opacity: 0.025;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        background-size: 180px;
      }

      /* Gold progress bar */
      #bar { position:fixed; top:0; left:0; height:1px; background:var(--gold); z-index:600; transition:width 0.1s linear; }

      .track { font-family:var(--G); font-size:9px; font-weight:300; letter-spacing:0.35em; text-transform:uppercase; color:var(--gold); }

      .nav-a { font-family:var(--G); font-size:10px; letter-spacing:0.22em; text-transform:uppercase; color:var(--smoke); text-decoration:none; font-weight:300; transition:color 0.3s; }
      .nav-a:hover { color:var(--gold2); }

      .btn { display:inline-block; font-family:var(--G); font-size:9px; font-weight:300; letter-spacing:0.32em; text-transform:uppercase; text-decoration:none; padding:14px 36px; transition:all 0.5s ease; cursor:pointer; border:none; outline:none; }
      .btn-gold { background:var(--gold); color:var(--black); }
      .btn-gold:hover { background:var(--gold2); box-shadow:0 8px 40px rgba(196,160,90,0.28); }
      .btn-outline { background:transparent; border:1px solid rgba(196,160,90,0.3); color:var(--stone); }
      .btn-outline:hover { border-color:var(--gold); background:rgba(196,160,90,0.06); color:var(--gold2); }
      .btn-stone { background:var(--stone); color:var(--black); }
      .btn-stone:hover { background:var(--gold2); }

      input, textarea {
        font-family:var(--G); font-size:13px; font-weight:300; letter-spacing:0.06em;
        background:transparent; border:none; border-bottom:1px solid rgba(196,160,90,0.15);
        color:var(--stone); padding:14px 0; width:100%; outline:none; transition:border-color 0.4s;
      }
      input:focus, textarea:focus { border-color:var(--gold); }
      input::placeholder, textarea::placeholder { color:var(--ash); }

      @keyframes kb        { from{transform:scale(1)} to{transform:scale(1.05) translate(-0.4%,-0.4%)} }
      @keyframes fadeUp    { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
      @keyframes fadeIn    { from{opacity:0} to{opacity:1} }
      @keyframes lineW     { from{width:0} to{width:56px} }
      @keyframes pulse     { 0%,100%{opacity:0.3;transform:scaleY(0.4)} 50%{opacity:1;transform:scaleY(1)} }
      @keyframes blurIn    { from{opacity:0;filter:blur(18px);transform:translateY(12px)} to{opacity:1;filter:blur(0);transform:translateY(0)} }
      @keyframes dragHint  { 0%{opacity:0;transform:translateY(4px)} 30%{opacity:0.5} 70%{opacity:0.5} 100%{opacity:0;transform:translateY(-4px)} }

      /* Blur-to-sharp entrance for images */
      .blur-enter { animation: blurIn 0.9s cubic-bezier(0.16,1,0.3,1) forwards; }

      /* Img hover breathe */
      section img { transition: filter 0.6s ease, transform 0.6s ease; }
      section img:hover { filter: brightness(1.06); }

      @media(max-width:768px){
        .hide-m { display:none !important; }
        .stack-m { grid-template-columns:1fr !important; }
      }
    `}</style>
  )
}

// ─── Progress bar ─────────────────────────────────────────────────────────────
function ProgressBar() {
  const [w, setW] = useState(0)
  useEffect(() => {
    const fn = () => {
      const d = document.documentElement
      setW((window.scrollY / (d.scrollHeight - window.innerHeight)) * 100)
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return <div id="bar" style={{ width: `${w}%` }} />
}

// ─── NavBar ───────────────────────────────────────────────────────────────────
function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true }); fn()
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500, height: 68,
      padding: '0 clamp(24px,5vw,72px)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: scrolled ? 'rgba(5,5,7,0.9)' : 'transparent',
      backdropFilter: scrolled ? 'blur(22px)' : 'none',
      borderBottom: `1px solid ${scrolled ? 'rgba(196,160,90,0.08)' : 'transparent'}`,
      transition: 'background 0.6s, border-color 0.6s',
    }}>
      <a href="/" style={{ textDecoration: 'none' }}>
        <div style={{ fontFamily: 'var(--F)', fontSize: 18, fontWeight: 300, letterSpacing: '0.22em', color: 'var(--stone)', lineHeight: 1 }}>ÉDEN ESTATES</div>
        <div className="track" style={{ fontSize: 7, letterSpacing: '0.42em', marginTop: 3 }}>Mauritius · Est. 2018</div>
      </a>
      <div className="hide-m" style={{ display: 'flex', alignItems: 'center', gap: 44 }}>
        {[['Estate','#estate'],['Villas','#villas'],['Island','#island'],['Wellness','#wellness'],['Invest','#investment'],['Contact','#contact']].map(([l,h]) => (
          <a key={l} href={h} className="nav-a">{l}</a>
        ))}
        <a href="#contact" className="btn btn-outline" style={{ fontSize: 8, padding: '9px 20px' }}>Enquire</a>
      </div>
    </nav>
  )
}

// ─── Hero — staircase image ───────────────────────────────────────────────────
function Hero() {
  const { imgStyle, textStyle } = useMouseParallax(14)
  return (
    <section style={{ height: '100dvh', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      <div style={{ position: 'absolute', inset: '-6%', transition: 'transform 0.8s cubic-bezier(0.23,1,0.32,1)', ...imgStyle }}>
        <img src={IMGS.hero} alt="Villa Azur"
          onError={(e) => { (e.target as HTMLImageElement).src = IMGS.pool2 }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%', animation: 'kb 22s ease-out forwards' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(5,5,7,0.55) 0%, rgba(5,5,7,0.1) 30%, rgba(5,5,7,0.15) 60%, rgba(5,5,7,0.95) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(5,5,7,0.5) 0%, transparent 55%, rgba(5,5,7,0.1) 100%)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(40px,6vw,96px)', paddingBottom: 'clamp(80px,10vw,128px)', maxWidth: 860, transition: 'transform 0.6s cubic-bezier(0.23,1,0.32,1)', ...textStyle }}>
        <div className="track" style={{ marginBottom: 28, opacity: 0, animation: 'fadeUp 1s ease 0.6s forwards' }}>
          Grand Baie · North Coast · Mauritius
        </div>
        <h1 style={{ fontFamily: 'var(--H)', fontSize: 'clamp(18px,2.4vw,34px)', fontWeight: 400, fontStyle: 'normal', lineHeight: 1.5, color: 'var(--stone)', margin: '0 0 28px', opacity: 0, animation: 'fadeUp 1.4s ease 0.9s forwards', letterSpacing: '0.28em', textTransform: 'uppercase' }}>
          Descend into luxury
        </h1>
        <div style={{ width: 0, height: 1, background: 'var(--gold)', marginBottom: 32, opacity: 0.5, animation: 'lineW 1.6s ease 1.7s forwards' }} />
        <p style={{ fontFamily: 'var(--F)', fontSize: 'clamp(15px,1.7vw,19px)', fontStyle: 'italic', fontWeight: 300, color: 'rgba(240,236,228,0.62)', maxWidth: 460, lineHeight: 1.8, marginBottom: 52, opacity: 0, animation: 'fadeUp 1s ease 2s forwards' }}>
          Boutique villas of singular distinction. Permanent residency. A tax environment without parallel. From £1,250,000.
        </p>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', opacity: 0, animation: 'fadeUp 1s ease 2.3s forwards' }}>
          <a href="#estate" className="btn btn-gold">Explore the Estate</a>
          <a href="#contact" className="btn btn-outline">Private Viewing</a>
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{ position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, opacity: 0, animation: 'fadeIn 1s ease 3.2s forwards' }}>
        <div className="track" style={{ fontSize: 7, color: 'rgba(196,160,90,0.5)' }}>Scroll</div>
        <div style={{ width: 1, height: 52, background: 'linear-gradient(to bottom, var(--gold), transparent)', animation: 'pulse 2s ease infinite' }} />
      </div>

      {/* Drag hint — appears then fades */}
      <div style={{ position: 'absolute', bottom: 36, right: 'clamp(24px,5vw,72px)', zIndex: 2, opacity: 0, animation: 'dragHint 4.5s ease 4s forwards', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 18, height: 18, border: '1px solid rgba(196,160,90,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--gold)', opacity: 0.6 }} />
        </div>
        <span className="track" style={{ fontSize: 7, color: 'rgba(196,160,90,0.4)' }}>Click &amp; drag</span>
      </div>

      {/* Yield badge */}
      <div style={{ position: 'absolute', top: 88, right: 'clamp(24px,5vw,72px)', zIndex: 2, borderTop: '1px solid rgba(196,160,90,0.28)', borderBottom: '1px solid rgba(196,160,90,0.28)', padding: '18px 28px', textAlign: 'center', background: 'rgba(5,5,7,0.5)', backdropFilter: 'blur(14px)', opacity: 0, animation: 'fadeIn 1s ease 2.6s forwards' }}>
        <div className="track" style={{ fontSize: 7, marginBottom: 8 }}>Est. Gross Yield</div>
        <div style={{ fontFamily: 'var(--F)', fontSize: 40, fontWeight: 300, lineHeight: 1, color: 'var(--gold)' }}>9%</div>
        <div style={{ fontFamily: 'var(--F)', fontSize: 11, fontStyle: 'italic', color: 'var(--ash)', marginTop: 4 }}>short-term rental</div>
      </div>
    </section>
  )
}

// ─── Full-bleed parallax panel ────────────────────────────────────────────────
function FullBleed({ src, eyebrow, title, sub, align = 'left', pos = 'center', dim = 0.45, id }:
  { src:string; eyebrow?:string; title:string; sub?:string; align?:'left'|'center'|'right'; pos?:string; dim?:number; id?:string }) {
  const { ref: pRef, p } = useScrollProgress()
  const { ref: iRef, inView } = useInView(0.08)
  const { imgStyle, textStyle } = useMouseParallax(10)
  const ref = useCallback((el: HTMLDivElement|null) => {
    ;(pRef as any).current = el;
    ;(iRef as any).current = el
  }, [])
  const scrollY = `${(p - 0.5) * -11}%`
  const aStyle = align === 'center' ? { textAlign:'center' as const, left:0, right:0 }
    : align === 'right' ? { textAlign:'right' as const, right:'clamp(40px,7vw,120px)' }
    : { left:'clamp(40px,7vw,120px)' }

  return (
    <section id={id} style={{ height: '100dvh', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      <div style={{ position: 'absolute', inset: '-10%', overflow: 'hidden' }}>
        <img
          src={src} alt={title} loading="lazy"
          className={inView ? 'blur-enter' : ''}
          style={{
            width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos,
            transform: `translateY(${scrollY}) ${imgStyle.transform}`,
            willChange: 'transform', opacity: inView ? 1 : 0,
          }}
        />
      </div>
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, rgba(5,5,7,${dim+0.4}) 0%, rgba(5,5,7,${dim*0.25}) 50%, transparent 100%)` }} />
      <div ref={ref} style={{
        position: 'relative', zIndex: 2,
        padding: 'clamp(40px,6vw,96px)', paddingBottom: 'clamp(60px,7vw,100px)',
        ...aStyle,
        opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)',
        transition: 'opacity 1.5s ease, transform 1.5s ease',
        ...textStyle,
      }}>
        {eyebrow && <div className="track" style={{ marginBottom: 18 }}>{eyebrow}</div>}
        <h2 style={{ fontFamily: 'var(--F)', fontSize: 'clamp(36px,5.5vw,84px)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.04, color: 'var(--stone)', margin: 0 }}>{title}</h2>
        {sub && <p style={{ fontFamily: 'var(--F)', fontSize: 'clamp(14px,1.5vw,18px)', fontStyle: 'italic', color: 'rgba(240,236,228,0.58)', marginTop: 18, maxWidth: 460, lineHeight: 1.75, ...(align === 'center' ? { margin: '18px auto 0', display: 'block' } : {}) }}>{sub}</p>}
      </div>
    </section>
  )
}

// ─── Wow capture — full bleed image immediately after hero ────────────────────
// ─── Cinematic descent sequence ───────────────────────────────────────────────
// Each scene: image fills 100dvh, sticky. As you scroll through its allocated
// height it darkens + blurs at the exit, then the next image emerges from black.
// The staircase also darkens+blurs as you scroll, so the cut to the next scene
// happens through total darkness — seamless, cinematic.

const DESCENT_SCENES = [
  { src: IMGS.hero,     label: null,           caption: null,                                                  pos: 'center 20%' },
  { src: IMGS.entrance, label: 'Arrival',      caption: 'A private approach through two hectares of tropical canopy', pos: 'center 40%' },
  { src: IMGS.window,   label: 'The View',     caption: 'Light and landscape held in a single frame',          pos: 'center 50%' },
  { src: IMGS.interior, label: 'Interior',     caption: 'Every surface chosen. Every detail earned.',          pos: 'center 35%' },
  { src: IMGS.pool2,    label: 'Infinity Edge','caption': 'Where the pool dissolves into the Indian Ocean',    pos: 'center 45%' },
  { src: IMGS.pool,     label: 'The Pool',     caption: 'Blue hour. Salt air. Total silence.',                 pos: 'center 40%' },
]

function CinematicDescent() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current; if (!el) return
      const rect = el.getBoundingClientRect()
      const total = el.offsetHeight - window.innerHeight
      setProgress(Math.min(1, Math.max(0, -rect.top / total)))
    }
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const n = DESCENT_SCENES.length

  // Scene 0 (staircase) gets 40% of total scroll — suspense
  // Remaining 5 scenes share the other 60% equally
  const WEIGHTS = [0.25, 0.15, 0.15, 0.15, 0.15, 0.15]
  const CUMULATIVE = WEIGHTS.reduce((acc, w, i) => {
    acc.push((acc[i] || 0) + w); return acc
  }, [] as number[])

  // Find which scene we're in based on weighted progress
  let sceneIdx = 0
  let sceneP = 0
  for (let i = 0; i < n; i++) {
    const start = i === 0 ? 0 : CUMULATIVE[i - 1]
    const end   = CUMULATIVE[i]
    if (progress <= end || i === n - 1) {
      sceneIdx = i
      sceneP   = Math.min(1, Math.max(0, (progress - start) / (end - start)))
      break
    }
  }

  const scene     = DESCENT_SCENES[sceneIdx]
  const nextScene = DESCENT_SCENES[sceneIdx + 1]

  // Exit: last 28% of scene → darkens + blurs toward black
  const EXIT_START  = 0.72
  const exitP       = sceneP < EXIT_START ? 0 : (sceneP - EXIT_START) / (1 - EXIT_START)

  // Entry: first 28% of scene → emerges from black
  const ENTRY_END   = 0.28
  const entryP      = sceneP > ENTRY_END  ? 0 : 1 - (sceneP / ENTRY_END)

  const dark        = Math.max(exitP, entryP)
  const blur        = dark * 18

  // Caption: appears 28%→72%, centred in scene
  const captionVisible = sceneP > 0.28 && sceneP < 0.72
  const captionOpacity = captionVisible
    ? Math.min(1, (sceneP - 0.28) / 0.12, (0.72 - sceneP) / 0.12)
    : 0

  // Hero title: only on scene 0, fades out in first 20% of scene progress
  const heroTextOpacity = sceneIdx === 0 ? Math.max(0, 1 - sceneP * 5) : 0
  // Staircase darkens top→bottom as progress builds — feel of descending
  const staircaseBottomDark = sceneIdx === 0 ? Math.min(0.85, sceneP * 1.4) : 0

  return (
    <div ref={containerRef} id="estate" style={{ height: `${n * 120}vh`, position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100dvh', overflow: 'hidden', background: '#000' }}>

        {/* Current scene */}
        <img
          key={`scene-${sceneIdx}`}
          src={scene.src}
          alt={scene.label ?? 'Villa Azur'}
          onError={(e) => { (e.target as HTMLImageElement).src = IMGS.mcclean }}
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: scene.pos,
            filter: `blur(${blur}px)`,
            transform: `scale(${1 + blur * 0.005})`,
            willChange: 'filter, transform',
          }}
        />

        {/* Staircase-specific: gradient grows from bottom as you descend */}
        {sceneIdx === 0 && (
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: `linear-gradient(to top, rgba(3,3,6,${staircaseBottomDark}) 0%, transparent 60%)`,
          }} />
        )}

        {/* Preload next scene */}
        {nextScene && (
          <img key={`pre-${sceneIdx}`} src={nextScene.src} alt=""
            style={{ position: 'absolute', width: 1, height: 1, opacity: 0, pointerEvents: 'none' }} />
        )}

        {/* Dark transition overlay — full bleed, scroll-driven */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `rgba(3,3,6,${dark})`,
        }} />

        {/* Permanent bottom vignette */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(to top, rgba(5,5,7,0.75) 0%, transparent 40%)' }} />

        {/* HERO TEXT — scene 0 only, fades as staircase begins */}
        <div style={{
          position: 'absolute',
          bottom: 'clamp(80px,9vw,130px)',
          left: 'clamp(40px,6vw,96px)',
          opacity: heroTextOpacity,
          pointerEvents: 'none',
          maxWidth: 700,
        }}>
          <div className="track" style={{ marginBottom: 20, fontSize: 8 }}>Grand Baie · North Coast · Mauritius</div>
          <h1 style={{ fontFamily: 'var(--H)', fontSize: 'clamp(18px,2.4vw,34px)', fontWeight: 400, lineHeight: 1.5, color: 'var(--stone)', margin: '0 0 20px', letterSpacing: '0.28em', textTransform: 'uppercase' }}>
            Descend into luxury
          </h1>
          <div style={{ width: 48, height: 1, background: 'var(--gold)', marginBottom: 24, opacity: 0.5 }} />
          <p style={{ fontFamily: 'var(--F)', fontSize: 'clamp(14px,1.5vw,17px)', fontStyle: 'italic', color: 'rgba(240,236,228,0.55)', maxWidth: 400, lineHeight: 1.8, marginBottom: 36 }}>
            Boutique villas of singular distinction. Permanent residency. From £1,250,000.
          </p>
          <div style={{ display: 'flex', gap: 14 }}>
            <a href="#villas" className="btn btn-gold" style={{ pointerEvents: 'all' }}>Explore Villas</a>
            <a href="#contact" className="btn btn-outline" style={{ pointerEvents: 'all' }}>Private Viewing</a>
          </div>
        </div>

        {/* SCENE CAPTION — scenes 1–5 */}
        {scene.label && (
          <div style={{
            position: 'absolute',
            bottom: 'clamp(56px,7vh,96px)',
            left: 'clamp(40px,6vw,96px)',
            opacity: captionOpacity,
            transform: `translateY(${(1 - Math.min(1, captionOpacity * 3)) * 10}px)`,
            pointerEvents: 'none',
            maxWidth: 560,
          }}>
            <div className="track" style={{ marginBottom: 14, fontSize: 9 }}>{scene.label}</div>
            <p style={{ fontFamily: 'var(--F)', fontSize: 'clamp(22px,3vw,44px)', fontStyle: 'italic', fontWeight: 300, color: 'var(--stone)', lineHeight: 1.18 }}>
              {scene.caption}
            </p>
          </div>
        )}

        {/* Scene counter */}
        <div className="track" style={{ position: 'absolute', top: 28, left: 'clamp(28px,4vw,56px)', fontSize: 8, color: 'rgba(196,160,90,0.3)', opacity: sceneIdx > 0 ? captionOpacity : 0 }}>
          {String(sceneIdx).padStart(2,'0')} / {String(n - 1).padStart(2,'0')}
        </div>

        {/* Yield badge — visible on scene 0 only */}
        <div style={{
          position: 'absolute', top: 96, right: 'clamp(24px,5vw,72px)',
          borderTop: '1px solid rgba(196,160,90,0.28)', borderBottom: '1px solid rgba(196,160,90,0.28)',
          padding: '18px 28px', textAlign: 'center',
          background: 'rgba(5,5,7,0.5)', backdropFilter: 'blur(14px)',
          opacity: heroTextOpacity, pointerEvents: 'none',
        }}>
          <div className="track" style={{ fontSize: 7, marginBottom: 8 }}>Est. Gross Yield</div>
          <div style={{ fontFamily: 'var(--F)', fontSize: 38, fontWeight: 300, lineHeight: 1, color: 'var(--gold)' }}>9%</div>
          <div style={{ fontFamily: 'var(--F)', fontSize: 11, fontStyle: 'italic', color: 'var(--ash)', marginTop: 4 }}>short-term rental</div>
        </div>

        {/* Progress bar */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'rgba(196,160,90,0.08)' }}>
          <div style={{ height: '100%', background: 'var(--gold)', width: `${progress * 100}%` }} />
        </div>

        {/* Dots */}
        <div style={{ position: 'absolute', bottom: 18, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8 }}>
          {DESCENT_SCENES.map((_, i) => (
            <div key={i} style={{ width: i === sceneIdx ? 20 : 4, height: 1, background: i === sceneIdx ? 'var(--gold)' : 'rgba(196,160,90,0.18)', transition: 'all 0.5s ease' }} />
          ))}
        </div>

        {/* Scroll cue — only on scene 0 */}
        <div style={{ position: 'absolute', bottom: 48, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: heroTextOpacity * 0.6, pointerEvents: 'none' }}>
          <div className="track" style={{ fontSize: 7, color: 'rgba(196,160,90,0.5)' }}>Scroll</div>
          <div style={{ width: 1, height: 44, background: 'linear-gradient(to bottom, var(--gold), transparent)', animation: 'pulse 2s ease infinite' }} />
        </div>
      </div>
    </div>
  )
}


// ─── INTERRUPT 1: Quote moment ────────────────────────────────────────────────
function QuoteMoment({ quote, attr }: { quote:string; attr?:string }) {
  const { ref, inView } = useInView(0.3)
  return (
    <section ref={ref} style={{ background: 'var(--surface)', padding: 'clamp(100px,14vw,180px) clamp(40px,12vw,200px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '55vh', textAlign: 'center', borderTop: '1px solid var(--borderl)', borderBottom: '1px solid var(--borderl)' }}>
      <div style={{ width: inView?48:0, height:1, background:'var(--gold)', marginBottom:44, transition:'width 1.3s ease', opacity:0.6 }} />
      <blockquote style={{ fontFamily:'var(--F)', fontSize:'clamp(22px,3.8vw,52px)', fontWeight:300, fontStyle:'italic', lineHeight:1.28, color:'var(--stone)', maxWidth:820, opacity:inView?1:0, transform:inView?'none':'translateY(14px)', transition:'all 1.5s ease 0.2s' }}>
        "{quote}"
      </blockquote>
      {attr && <div className="track" style={{ marginTop:36, fontSize:8, color:'var(--ash)', opacity:inView?1:0, transition:'opacity 1s ease 0.9s' }}>{attr}</div>}
    </section>
  )
}

// ─── INTERRUPT 2: Horizontal villa photo scroll ───────────────────────────────
function VillaScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const { ref: hRef, inView } = useInView(0.05)

  useEffect(() => {
    const container = containerRef.current
    const track = trackRef.current
    if (!container || !track) return

    let currentX = 0
    let targetX = 0
    let lastScrollY = window.scrollY
    let lastTime = performance.now()
    let rafId: number

    const getMaxX = () => track.scrollWidth - window.innerWidth

    const getBaseProgress = () => {
      const rect = container.getBoundingClientRect()
      const sticky = container.offsetHeight - window.innerHeight
      return Math.min(1, Math.max(0, -rect.top / sticky))
    }

    // Lerp the visual position toward target for smoothness
    const animate = () => {
      const diff = targetX - currentX
      if (Math.abs(diff) > 0.5) {
        currentX += diff * 0.08
        track.style.transform = `translateX(${-currentX}px)`
        setActiveIdx(Math.round((currentX / getMaxX()) * (VILLA_SLIDES.length - 1)))
      }
      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)

    const onScroll = () => {
      const now = performance.now()
      const dt = Math.max(1, now - lastTime)
      const dy = window.scrollY - lastScrollY
      const velocity = Math.abs(dy / dt) // px/ms

      // Base target from scroll position
      const baseProgress = getBaseProgress()
      const baseX = baseProgress * getMaxX()

      // Velocity boost — faster scrolling = jumps ahead more
      // Cap boost so it never skips more than ~1.5 slides worth
      const slideWidth = window.innerWidth
      const boost = Math.min(dy * velocity * 1.8, slideWidth * 1.5)
      targetX = Math.min(getMaxX(), Math.max(0, baseX + boost))

      lastScrollY = window.scrollY
      lastTime = now
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section id="estate" style={{ background: 'var(--black)' }}>
      {/* Section header — outside the sticky */}
      <div ref={hRef} style={{ padding: 'clamp(80px,10vw,130px) clamp(40px,6vw,96px) clamp(64px,7vw,96px)', borderBottom: '1px solid var(--borderl)', opacity: inView?1:0, transform: inView?'none':'translateY(16px)', transition: 'all 1s ease' }}>
        <div className="track" style={{ marginBottom: 16 }}>The Estate · Scroll to explore</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
          <h2 style={{ fontFamily: 'var(--F)', fontSize: 'clamp(32px,4.5vw,68px)', fontWeight: 300, fontStyle: 'italic', color: 'var(--stone)', lineHeight: 1.05 }}>
            Villa Azur<br /><span style={{ color: 'var(--gold)', fontSize: '65%', fontStyle: 'normal', fontWeight: 300, letterSpacing: '0.04em' }}>Grand Baie · £3,750,000</span>
          </h2>
          <p style={{ fontFamily: 'var(--F)', fontSize: 'clamp(14px,1.4vw,17px)', fontStyle: 'italic', color: 'var(--smoke)', maxWidth: 400, lineHeight: 1.8 }}>
            Five en-suite suites. Infinity pool. Private beach. Wine cellar. Dedicated concierge. The definitive Mauritian estate.
          </p>
        </div>
      </div>

      {/* Sticky horizontal track */}
      <div ref={containerRef} style={{ height: `${VILLA_SLIDES.length * 60}vh`, position: 'relative' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: 'var(--black)' }}>

          {/* Slide track */}
          <div ref={trackRef} style={{ display: 'flex', height: '100%', willChange: 'transform', transition: 'transform 0.06s linear' }}>
            {VILLA_SLIDES.map(({ src, label, caption }, i) => (
              <div key={i} style={{ minWidth: '100vw', height: '100%', position: 'relative', overflow: 'hidden' }}>
                <img src={src} alt={label} loading={i < 2 ? 'eager' : 'lazy'} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
                {/* Bottom gradient */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,5,7,0.88) 0%, rgba(5,5,7,0.1) 45%, transparent 100%)' }} />
                {/* Top left: counter */}
                <div style={{ position: 'absolute', top: 24, left: 32 }}>
                  <div className="track" style={{ fontSize: 8, color: 'rgba(196,160,90,0.5)' }}>{String(i+1).padStart(2,'0')} / {String(VILLA_SLIDES.length).padStart(2,'0')}</div>
                </div>
                {/* Bottom left: label + caption */}
                <div style={{ position: 'absolute', bottom: 'clamp(40px,6vh,72px)', left: 'clamp(32px,5vw,72px)', maxWidth: 520 }}>
                  <div className="track" style={{ marginBottom: 12, fontSize: 9 }}>{label}</div>
                  <p style={{ fontFamily: 'var(--F)', fontSize: 'clamp(20px,2.8vw,40px)', fontStyle: 'italic', fontWeight: 300, color: 'var(--stone)', lineHeight: 1.2 }}>{caption}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Progress bar — bottom */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'rgba(196,160,90,0.1)' }}>
            <div style={{ height: '100%', background: 'var(--gold)', width: `${((activeIdx) / (VILLA_SLIDES.length - 1)) * 100}%`, transition: 'width 0.15s ease' }} />
          </div>

          {/* Slide dots */}
          <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8, alignItems: 'center' }}>
            {VILLA_SLIDES.map((_, i) => (
              <div key={i} style={{ width: i === activeIdx ? 24 : 4, height: 1, background: i === activeIdx ? 'var(--gold)' : 'rgba(196,160,90,0.25)', transition: 'all 0.4s ease' }} />
            ))}
          </div>

          {/* Right edge: current label large */}
          <div style={{ position: 'absolute', right: 40, top: '50%', transform: 'translateY(-50%) rotate(90deg)', transformOrigin: 'center', whiteSpace: 'nowrap' }}>
            <div className="track" style={{ fontSize: 8, color: 'rgba(196,160,90,0.2)', letterSpacing: '0.4em' }}>
              {VILLA_SLIDES[activeIdx]?.label}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── INTERRUPT 3: Villa tiers ─────────────────────────────────────────────────
const TIERS = [
  { name:'Maison Lagon',  loc:'Trou aux Biches, West Coast', price:'£1,250,000', tag:'Entry Value', beds:3, baths:4, sqm:380, yield:'6.8%', desc:'A refined coastal retreat steps from Mauritius\'s most celebrated lagoon. Fully furnished, income-generating from day one. The ideal entry into Mauritian ownership.', img: IMGS.dining },
  { name:'Domaine Noir',  loc:'Bel Ombre, South Coast',      price:'£2,100,000', tag:'Collector\'s', beds:4, baths:5, sqm:640, yield:'7.5%', desc:'Monolithic basalt, a 22-metre lap pool, and 1.4 hectares of private nature reserve on one of the island\'s last untouched coastlines. Architecture as a singular statement.', img: IMGS.pool },
  { name:'Villa Azur',    loc:'Grand Baie, North Coast',      price:'£3,750,000', tag:'Flagship',    beds:5, baths:6, sqm:820, yield:'9%',   desc:'Five en-suite suites, infinity pool, private beach pathway, wine cellar, spa suite, dedicated concierge. The definitive Mauritian estate on the island\'s most coveted coast.', img: IMGS.pool2 },
]

function VillaTiers() {
  const [active, setActive] = useState(1)
  const { ref, inView } = useInView(0.08)
  const tier = TIERS[active]

  return (
    <section id="villas" ref={ref} style={{ background: 'var(--surface)', borderTop: '1px solid var(--borderl)' }}>
      <div style={{ padding: 'clamp(72px,9vw,120px) clamp(40px,6vw,96px) 0', opacity: inView?1:0, transform: inView?'none':'translateY(16px)', transition: 'all 1s ease' }}>
        <div className="track" style={{ marginBottom: 14 }}>Exclusive Portfolio</div>
        <h2 style={{ fontFamily: 'var(--F)', fontSize: 'clamp(30px,4vw,60px)', fontWeight: 300, fontStyle: 'italic', color: 'var(--stone)', marginBottom: 48 }}>Three estates. One island.</h2>
        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--borderl)' }}>
          {TIERS.map((t, i) => (
            <button key={t.name} onClick={() => setActive(i)} style={{ fontFamily: 'var(--G)', fontSize: 9, fontWeight: 300, letterSpacing: '0.25em', textTransform: 'uppercase', background: 'none', border: 'none', borderBottom: active === i ? '1px solid var(--gold)' : '1px solid transparent', color: active === i ? 'var(--gold)' : 'var(--ash)', padding: '14px 28px 14px 0', cursor: 'pointer', transition: 'all 0.3s', marginBottom: -1 }}>
              {t.name}
            </button>
          ))}
        </div>
      </div>

      {/* Active tier */}
      <div key={active} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '70vh', opacity: 0, animation: 'fadeIn 0.5s ease forwards' }} className="stack-m">
        <div style={{ position: 'relative', overflow: 'hidden', minHeight: 400 }}>
          <img src={tier.img} alt={tier.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', top: 20, left: 20 }}>
            <div style={{ background: 'var(--gold)', color: 'var(--black)', fontFamily: 'var(--G)', fontSize: 8, letterSpacing: '0.28em', textTransform: 'uppercase', padding: '5px 12px' }}>{tier.tag}</div>
          </div>
        </div>
        <div style={{ padding: 'clamp(48px,6vw,96px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'var(--lift)' }}>
          <div className="track" style={{ marginBottom: 10, fontSize: 8, color: 'var(--ash)' }}>{tier.loc}</div>
          <h3 style={{ fontFamily: 'var(--F)', fontSize: 'clamp(26px,3.2vw,48px)', fontWeight: 300, fontStyle: 'italic', color: 'var(--stone)', marginBottom: 6, lineHeight: 1.1 }}>{tier.name}</h3>
          <div style={{ fontFamily: 'var(--F)', fontSize: 'clamp(18px,2.2vw,32px)', fontWeight: 300, color: 'var(--gold)', marginBottom: 28, letterSpacing: '0.03em' }}>{tier.price}</div>
          <div style={{ display: 'flex', gap: 28, marginBottom: 28, paddingBottom: 28, borderBottom: '1px solid var(--borderl)' }}>
            {[{v:tier.beds,l:'Beds'},{v:tier.baths,l:'Baths'},{v:`${tier.sqm}m²`,l:'Interior'},{v:tier.yield,l:'Gross Yield'}].map(({v,l}) => (
              <div key={l}>
                <div style={{ fontFamily: 'var(--F)', fontSize: 'clamp(16px,1.8vw,26px)', fontWeight: 300, fontStyle: 'italic', color: 'var(--stone)', lineHeight: 1 }}>{v}</div>
                <div className="track" style={{ fontSize: 7, color: 'var(--ash)', marginTop: 5 }}>{l}</div>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: 'var(--F)', fontSize: 'clamp(13px,1.3vw,16px)', fontStyle: 'italic', lineHeight: 1.85, color: 'var(--smoke)', marginBottom: 36 }}>{tier.desc}</p>
          <div style={{ display: 'flex', gap: 12, marginBottom: 28 }}>
            <a href="#contact" className="btn btn-gold" style={{ fontSize: 8, padding: '12px 28px' }}>Request Brochure</a>
            <a href="#contact" className="btn btn-outline" style={{ fontSize: 8, padding: '12px 28px' }}>Arrange Viewing</a>
          </div>
          <div style={{ padding: '14px 18px', background: 'rgba(196,160,90,0.06)', borderLeft: '2px solid var(--gold)' }}>
            <div className="track" style={{ fontSize: 7, marginBottom: 5 }}>Permanent Residency Included</div>
            <div style={{ fontFamily: 'var(--F)', fontSize: 12, fontStyle: 'italic', color: 'var(--ash)', lineHeight: 1.6 }}>All estates qualify under EDB schemes. Buyer, spouse and dependants receive permanent residence for the duration of ownership.</div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── INTERRUPT 4: Horizontal materials scroll ─────────────────────────────────
const MATERIALS = [
  { n:'Reclaimed Teak',     s:'Floors · Ceilings · Louvres',     d:'Sourced from 200-year-old Indonesian river barges. Each plank carries its own century — grain patterns and silver-grey patina no fabrication can replicate.',     tex: img('teak.jpg') },
  { n:'Volcanic Basalt',    s:'Walls · Pool surround · Columns',  d:'Quarried from the Mauritian interior. Cut to 600mm slabs, honed to a satin finish that is cool to the touch at every hour of the day.',                        tex: img('basalt.jpg') },
  { n:'Calacatta Oro',      s:'Kitchen · Bathrooms · Vanities',   d:'Single-slab marble selected in person at the Carrara quarry. Gold veining matched across every surface. No two pieces are the same.',                          tex: img('calcatta.jpg') },
  { n:'Belgian Linen',      s:'Bedding · Drapes · Day beds',      d:'400-thread stonewashed linen, laundered in rainwater collected on site. Weighted to 280gsm — the precise threshold between luxurious and effortless.',           tex: img('linen.jpg') },
  { n:'Hand-Laid Terrazzo', s:'Terrace · Bathrooms · Hall',       d:'Rose quartz, serpentine and white marble. Mixed on site by local Mauritian craftsmen. Each floor a singular composition.',                                      tex: img('calcatta.jpg') },
  { n:'Unlacquered Brass',  s:'Hardware · Fixtures · Lighting',   d:'From a single foundry in Burgundy. Left to develop its own patina through the first year of residence. Every handle, tap and fitting from one source.',         tex: img('brass.jpg') },
]

function MaterialsScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const { ref: hRef, inView } = useInView(0.05)

  useEffect(() => {
    const container = containerRef.current
    const track = trackRef.current
    if (!container || !track) return

    let currentX = 0
    let targetX = 0
    let lastScrollY = window.scrollY
    let lastTime = performance.now()
    let rafId: number

    const getMaxX = () => track.scrollWidth - window.innerWidth

    const animate = () => {
      const diff = targetX - currentX
      if (Math.abs(diff) > 0.5) {
        currentX += diff * 0.08
        track.style.transform = `translateX(${-currentX}px)`
        setActive(Math.round((currentX / getMaxX()) * (MATERIALS.length - 1)))
      }
      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)

    const onScroll = () => {
      const now = performance.now()
      const dt = Math.max(1, now - lastTime)
      const dy = window.scrollY - lastScrollY
      const velocity = Math.abs(dy / dt)
      const rect = container.getBoundingClientRect()
      const sticky = container.offsetHeight - window.innerHeight
      const baseProgress = Math.min(1, Math.max(0, -rect.top / sticky))
      const baseX = baseProgress * getMaxX()
      const boost = Math.min(dy * velocity * 1.8, window.innerWidth * 1.5)
      targetX = Math.min(getMaxX(), Math.max(0, baseX + boost))
      lastScrollY = window.scrollY
      lastTime = now
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section style={{ background: 'var(--ink)', borderTop: '1px solid var(--borderl)' }}>
      <div ref={hRef} style={{ padding: 'clamp(80px,10vw,130px) clamp(40px,6vw,96px) clamp(60px,7vw,96px)', borderBottom: '1px solid var(--borderl)', opacity: inView?1:0, transform: inView?'none':'translateY(14px)', transition: 'all 1s ease' }}>
        <div className="track" style={{ marginBottom: 14 }}>Craftsmanship · Drag to explore</div>
        <h2 style={{ fontFamily: 'var(--F)', fontSize: 'clamp(30px,4.2vw,62px)', fontWeight: 300, fontStyle: 'italic', color: 'var(--stone)', maxWidth: 560 }}>The material world</h2>
      </div>

      <div ref={containerRef} style={{ height: `${MATERIALS.length * 60}vh`, position: 'relative' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
          <div ref={trackRef} style={{ display: 'flex', height: '100%', willChange: 'transform', transition: 'transform 0.06s linear' }}>
            {MATERIALS.map(({ n, s, d, tex }, i) => (
              <div key={n} style={{ minWidth: '100vw', height: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', borderRight: '1px solid var(--borderl)', position: 'relative', background: i % 2 === 0 ? 'var(--ink)' : 'var(--surface)' }}>

                {/* Left — text */}
                <div style={{ padding: 'clamp(40px,6vw,96px)', position: 'relative', zIndex: 1 }}>
                  <div className="track" style={{ marginBottom: 18, fontSize: 8, color: 'rgba(196,160,90,0.45)' }}>{String(i+1).padStart(2,'0')} / {String(MATERIALS.length).padStart(2,'0')}</div>
                  <div style={{ width: 40, height: 1, background: 'var(--gold)', marginBottom: 32, opacity: 0.5 }} />
                  <h3 style={{ fontFamily: 'var(--F)', fontSize: 'clamp(30px,4vw,64px)', fontWeight: 300, fontStyle: 'italic', color: 'var(--stone)', marginBottom: 22, lineHeight: 1.08 }}>{n}</h3>
                  <p style={{ fontFamily: 'var(--F)', fontSize: 'clamp(15px,1.6vw,19px)', fontStyle: 'italic', color: 'rgba(240,236,228,0.5)', lineHeight: 1.85, marginBottom: 28 }}>{d}</p>
                  <div className="track" style={{ fontSize: 8, color: 'rgba(196,160,90,0.25)' }}>{s}</div>
                </div>

                {/* Right — texture image in diamond clip */}
                <div style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(40px,5vw,80px)' }}>
                  {/* Large ghost number behind */}
                  <div style={{ position: 'absolute', right: '-0.04em', bottom: '-0.06em', fontFamily: 'var(--F)', fontSize: 'clamp(160px,20vw,280px)', fontWeight: 300, fontStyle: 'italic', color: 'rgba(196,160,90,0.03)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>
                    {String(i+1).padStart(2,'0')}
                  </div>
                  {/* Diamond shape — rotated square */}
                  <div style={{
                    width: 'clamp(220px,28vw,420px)',
                    height: 'clamp(220px,28vw,420px)',
                    transform: 'rotate(45deg)',
                    overflow: 'hidden',
                    boxShadow: '0 24px 80px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(196,160,90,0.12)',
                    flexShrink: 0,
                    position: 'relative',
                    zIndex: 1,
                  }}>
                    <img
                      src={tex}
                      alt={n}
                      loading="lazy"
                      style={{
                        width: '142%',
                        height: '142%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        transform: 'rotate(-45deg) translate(-15%, -15%)',
                        filter: 'brightness(0.75) saturate(0.9)',
                      }}
                    />
                    {/* Subtle gold tint overlay */}
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(196,160,90,0.06)', mixBlendMode: 'overlay' }} />
                  </div>
                  {/* Material name etched below diamond */}
                  <div className="track" style={{ position: 'absolute', bottom: 'clamp(32px,4vw,56px)', left: '50%', transform: 'translateX(-50%)', fontSize: 7, color: 'rgba(196,160,90,0.3)', whiteSpace: 'nowrap', letterSpacing: '0.35em' }}>{n.toUpperCase()}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom progress */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'var(--borderl)' }}>
            <div style={{ height: '100%', background: 'var(--gold)', width: `${(active / (MATERIALS.length-1)) * 100}%`, transition: 'width 0.15s ease' }} />
          </div>

          {/* Dots */}
          <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8, alignItems: 'center' }}>
            {MATERIALS.map((_, i) => (
              <div key={i} style={{ width: i === active ? 24 : 4, height: 1, background: i === active ? 'var(--gold)' : 'rgba(196,160,90,0.2)', transition: 'all 0.4s ease' }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Island ───────────────────────────────────────────────────────────────────
function IslandSection() {
  return (
    <section id="island">
      <FullBleed src={IMGS.island} eyebrow="Île aux Cerfs · Grand Baie · Le Morne" title="Minutes from one of the world's last untouched lagoons" sub="The northern lagoon of Mauritius — turquoise, warm, and almost impossibly clear." pos="center 30%" dim={0.5} />
      <div style={{ background: 'var(--surface)', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderTop: '1px solid var(--borderl)', borderBottom: '1px solid var(--borderl)' }}>
        {[{v:'330',u:'days',l:'of sunshine per year'},{v:'27°',u:'avg',l:'ocean temperature'},{v:'5',u:'min',l:'to Grand Baie marina'}].map(({v,u,l},i) => (
          <div key={l} style={{ padding:'clamp(40px,5vw,64px)', borderRight:i<2?'1px solid var(--borderl)':'none', textAlign:'center' }}>
            <div style={{ fontFamily:'var(--F)', fontSize:'clamp(36px,5vw,72px)', fontWeight:300, fontStyle:'italic', color:'var(--gold)', lineHeight:1 }}>{v}<span style={{ fontSize:'40%', marginLeft:4, color:'var(--ash)' }}>{u}</span></div>
            <div className="track" style={{ fontSize:8, color:'var(--ash)', marginTop:12 }}>{l}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Staircase descent ────────────────────────────────────────────────────────
function StaircaseDescent() {
  const { ref, p } = useScrollProgress()
  const dark   = p < 0.52 ? 0 : Math.min(1, (p - 0.52) / 0.40)
  const txt    = p < 0.68 ? 0 : Math.min(1, (p - 0.68) * 8)
  const rotate = p * 2.5
  const blurPx = dark * 12
  return (
    <div ref={ref} style={{ minHeight: '150dvh', position: 'relative', overflow: 'hidden' }}>
      <img
        src={IMGS.interior}
        alt="Descend into sanctuary"
        onError={(e) => { (e.target as HTMLImageElement).src = IMGS.pool }}
        style={{
          width:'100%', height:'100%', objectFit:'cover', objectPosition:'center 30%',
          position:'absolute', inset:0,
          transform:`scale(${1 + p * 0.06 + blurPx * 0.005}) rotate(${rotate}deg)`,
          transformOrigin:'center center',
          filter: `blur(${blurPx}px)`,
        }}
      />
      <div style={{ position:'absolute', inset:0, background:`rgba(3,3,8,${dark})` }} />
      <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', padding:40, opacity:txt }}>
        <div className="track" style={{ marginBottom:22, letterSpacing:'0.45em' }}>Descend · Restore · Transcend</div>
        <h2 style={{ fontFamily:'var(--F)', fontSize:'clamp(30px,5vw,68px)', fontWeight:300, fontStyle:'italic', color:'var(--stone)', lineHeight:1.1 }}>
          The Wellness<br />
          <span style={{ background:'linear-gradient(90deg,var(--gold),var(--gold2),var(--gold))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Sanctuary</span>
        </h2>
      </div>
    </div>
  )
}

// ─── Wellness ─────────────────────────────────────────────────────────────────
function WellnessSection() {
  const { ref, inView } = useInView()
  return (
    <section id="wellness" style={{ background:'var(--spa)' }}>
      <div style={{ padding:'clamp(80px,10vw,130px) clamp(40px,6vw,96px)', textAlign:'center', borderBottom:'1px solid rgba(196,160,90,0.05)' }}>
        <div className="track" style={{ marginBottom:20 }}>In-Residence Wellness</div>
        <h2 style={{ fontFamily:'var(--F)', fontSize:'clamp(30px,5vw,70px)', fontWeight:300, fontStyle:'italic', color:'var(--stone)', lineHeight:1.1, marginBottom:22 }}>The Spa Sanctuary</h2>
        <div style={{ width:1, height:60, background:'linear-gradient(to bottom,var(--gold),transparent)', margin:'0 auto 26px' }} />
        <p style={{ fontFamily:'var(--F)', fontSize:'clamp(14px,1.5vw,18px)', fontStyle:'italic', color:'rgba(240,236,228,0.4)', maxWidth:500, margin:'0 auto', lineHeight:1.8 }}>
          Ancient Mauritian healing traditions, reborn in volcanic stone and total silence.
        </p>
      </div>
      <FullBleed src={IMGS.spa1} eyebrow="Concierge" title="Your Dedicated Curator" sub="A personal wellness director — anticipating every need before it becomes one." pos="center 30%" dim={0.5} />
      <FullBleed src={IMGS.spa2} eyebrow="Treatment" title="The Treatment Sanctuary" sub="Volcanic stone · Cold ocean mineral · Island botanicals." align="right" dim={0.5} />
      <div ref={ref} style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', borderTop:'1px solid rgba(196,160,90,0.05)' }}>
        {[{n:'Hydrotherapy',d:'Heated jet pool, cold plunge, mineral steam'},{n:'Body Rituals',d:'Volcanic stone · Coconut · Ayurvedic'},{n:'Yoga Pavilion',d:'Sunrise & sunset, resident instructor'},{n:'Nutrition',d:'Ayurvedic & plant-based cuisine'}].map(({n,d},i) => (
          <div key={n} style={{ padding:'clamp(36px,4vw,60px) clamp(22px,3vw,40px)', borderRight:i<3?'1px solid rgba(196,160,90,0.05)':'none', opacity:inView?1:0, transform:inView?'none':'translateY(14px)', transition:`all 0.9s ease ${i*0.1}s` }}>
            <div className="track" style={{ fontSize:8, marginBottom:12 }}>{n}</div>
            <p style={{ fontFamily:'var(--F)', fontSize:14, fontStyle:'italic', color:'rgba(240,236,228,0.3)', lineHeight:1.7 }}>{d}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── INTERRUPT 5: Counting stats ──────────────────────────────────────────────
function CountingStats() {
  const { ref, inView } = useInView(0.3)
  const stats = [
    { target:13.89, suffix:'%', label:'RPPI Growth Q3 2025',   note:'Statistics Mauritius', dec:2 },
    { target:140,   suffix:'%', label:'Cumulative since 2019', note:'Property price index',  dec:0 },
    { target:9,     suffix:'%', label:'Gross rental yield',    note:'Short-term coastal',    dec:0 },
    { target:67,    suffix:'%', label:'Wealth growth 2015–25', note:"Africa's strongest",    dec:0 },
  ]
  return (
    <section ref={ref} style={{ background:'var(--surface)', borderTop:'1px solid var(--borderl)', borderBottom:'1px solid var(--borderl)' }}>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)' }}>
        {stats.map(({ target, suffix, label, note, dec }, i) => (
          <CountStat key={label} target={target} suffix={suffix} label={label} note={note} dec={dec} active={inView} delay={i*160} border={i<3} />
        ))}
      </div>
    </section>
  )
}

function CountStat({ target, suffix, label, note, dec, active, delay, border }: { target:number; suffix:string; label:string; note:string; dec:number; active:boolean; delay:number; border:boolean }) {
  const [go, setGo] = useState(false)
  useEffect(() => { if (active) { const t = setTimeout(() => setGo(true), delay); return () => clearTimeout(t) } }, [active, delay])
  const val = useCountUp(target, go, 2200, dec)
  return (
    <div style={{ padding:'clamp(48px,6vw,80px) clamp(24px,3.5vw,48px)', borderRight:border?'1px solid var(--borderl)':'none', textAlign:'center' }}>
      <div style={{ fontFamily:'var(--F)', fontSize:'clamp(44px,6vw,88px)', fontWeight:300, fontStyle:'italic', lineHeight:1, color:'var(--gold)', marginBottom:12 }}>
        {dec === 0 ? Math.round(val) : val.toFixed(dec)}{suffix}
      </div>
      <div className="track" style={{ fontSize:8, marginBottom:8 }}>{label}</div>
      <div style={{ fontFamily:'var(--F)', fontSize:12, fontStyle:'italic', color:'var(--ash)' }}>{note}</div>
    </div>
  )
}

// ─── Investment ───────────────────────────────────────────────────────────────
function InvestmentSection() {
  const { ref, inView } = useInView()
  return (
    <section id="investment" style={{ background:'var(--black)' }}>
      <div style={{ padding:'clamp(80px,10vw,140px) clamp(40px,6vw,96px) 0', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'clamp(40px,6vw,100px)' }} className="stack-m">
        <div ref={ref} style={{ opacity:inView?1:0, transform:inView?'none':'translateY(18px)', transition:'all 1.1s ease' }}>
          <div className="track" style={{ marginBottom:18 }}>Market Intelligence · 2025–2026</div>
          <h2 style={{ fontFamily:'var(--F)', fontSize:'clamp(28px,3.8vw,56px)', fontWeight:300, fontStyle:'italic', lineHeight:1.1, color:'var(--stone)', marginBottom:24 }}>The case for Mauritius</h2>
          <p style={{ fontFamily:'var(--F)', fontSize:'clamp(14px,1.5vw,17px)', fontStyle:'italic', lineHeight:1.85, color:'var(--smoke)' }}>
            Five reasons converge into one irrefutable argument: capital appreciation, rental income, permanent residency, zero capital gains, and a way of life unavailable anywhere else on earth.
          </p>
        </div>
        <div style={{ borderLeft:'1px solid var(--borderl)', paddingLeft:'clamp(36px,5vw,80px)', display:'flex', flexDirection:'column', gap:0 }}>
          {[
            { e:'Price Appreciation', t:'8–12% forecast growth in 2026',  d:'VEFA off-plan buyers lock in prices 30–60% below completed units with bank-backed completion guarantees under Mauritian law.' },
            { e:'Permanent Residency', t:'Family PRP from £1.25M',         d:'Buyer, spouse and all dependants. Valid for the duration of ownership. Renewable for 20 years.' },
            { e:'Tax Position',        t:'0% CGT. 0% Estate Tax.',         d:'No capital gains tax, no inheritance tax, no annual property tax. Full free repatriation of capital and profits.' },
            { e:'Act Before July 2026',t:'Registration duty doubles',      d:'Non-citizen duty rises from 5% to 10% on 1 July 2026. Buyers exchanging now secure the lower rate and pre-construction pricing.' },
          ].map(({ e, t, d }, i) => (
            <div key={e} style={{ padding:'clamp(24px,3vw,36px) 0', borderBottom:'1px solid var(--borderl)', opacity:inView?1:0, transform:inView?'none':'translateX(16px)', transition:`all 0.9s ease ${i*0.12}s` }}>
              <div className="track" style={{ fontSize:7, marginBottom:7 }}>{e}</div>
              <div style={{ fontFamily:'var(--F)', fontSize:'clamp(15px,1.7vw,20px)', fontStyle:'italic', color:'var(--stone)', marginBottom:7 }}>{t}</div>
              <div style={{ fontFamily:'var(--F)', fontSize:13, fontStyle:'italic', color:'var(--ash)', lineHeight:1.7 }}>{d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* +67% callout */}
      <div style={{ padding:'clamp(80px,9vw,120px) clamp(40px,6vw,96px)', textAlign:'center', marginTop:'clamp(60px,8vw,100px)', borderTop:'1px solid var(--borderl)' }}>
        <div className="track" style={{ marginBottom:18 }}>Africa's Strongest Decade of Wealth Growth</div>
        <div style={{ fontFamily:'var(--F)', fontSize:'clamp(80px,12vw,160px)', fontWeight:300, fontStyle:'italic', color:'var(--gold)', lineHeight:1, marginBottom:18 }}>+67%</div>
        <p style={{ fontFamily:'var(--F)', fontSize:'clamp(14px,1.5vw,18px)', fontStyle:'italic', color:'var(--smoke)', maxWidth:440, margin:'0 auto 44px', lineHeight:1.8 }}>
          Total investable wealth growth, Mauritius 2015–2025.
        </p>
        <a href="#contact" className="btn btn-gold">Request Investment Brief</a>
      </div>
    </section>
  )
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function ContactSection() {
  const { ref, inView } = useInView()
  return (
    <section id="contact" style={{ background:'var(--surface)', borderTop:'1px solid var(--borderl)' }}>
      <div ref={ref} style={{ display:'grid', gridTemplateColumns:'1fr 1fr', minHeight:'80vh' }} className="stack-m">
        <div style={{ padding:'clamp(72px,8vw,120px) clamp(40px,6vw,96px)', display:'flex', flexDirection:'column', justifyContent:'center', borderRight:'1px solid var(--borderl)' }}>
          <div style={{ opacity:inView?1:0, transform:inView?'none':'translateY(16px)', transition:'all 1.1s ease 0.1s' }}>
            <div className="track" style={{ marginBottom:22 }}>Private Access Only</div>
            <h2 style={{ fontFamily:'var(--F)', fontSize:'clamp(30px,4vw,56px)', fontWeight:300, fontStyle:'italic', lineHeight:1.1, marginBottom:24, color:'var(--stone)' }}>Arrange a<br />Private Viewing</h2>
            <p style={{ fontFamily:'var(--F)', fontSize:'clamp(14px,1.4vw,17px)', fontStyle:'italic', lineHeight:1.85, color:'var(--smoke)', maxWidth:340, marginBottom:40 }}>
              All three estates are available by private appointment only. Our advisors are reachable around the clock.
            </p>
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              <div className="track" style={{ fontSize:8, color:'var(--ash)' }}>hello@edenestates.mu</div>
              <div className="track" style={{ fontSize:8, color:'var(--ash)' }}>+230 5000 0000</div>
            </div>
          </div>
        </div>
        <div style={{ padding:'clamp(72px,8vw,120px) clamp(40px,6vw,96px)', display:'flex', flexDirection:'column', justifyContent:'center', opacity:inView?1:0, transition:'opacity 1.1s ease 0.3s' }}>
          <div style={{ display:'flex', flexDirection:'column', gap:28 }}>
            {[{p:'Full Name',t:'text'},{p:'Email Address',t:'email'},{p:'Phone · WhatsApp',t:'tel'},{p:'Country of Residence',t:'text'}].map(({p,t}) => (
              <input key={p} type={t} placeholder={p} />
            ))}
            <textarea placeholder="Your enquiry or preferred dates" rows={3} style={{ resize:'none' }} />
            <a href="mailto:hello@edenestates.mu" className="btn btn-gold" style={{ textAlign:'center', marginTop:8 }}>Submit Enquiry</a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background:'var(--black)', borderTop:'1px solid var(--borderl)', padding:'clamp(28px,4vw,48px) clamp(40px,6vw,96px)', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:16 }}>
      <span style={{ fontFamily:'var(--F)', fontSize:13, fontWeight:300, fontStyle:'italic', letterSpacing:'0.2em', color:'var(--ash)' }}>ÉDEN ESTATES</span>
      <span className="track" style={{ fontSize:7, color:'var(--ash)' }}>© 2026 · Grand Baie, Mauritius</span>
      <span className="track" style={{ fontSize:7, color:'var(--ash)' }}>From £1,250,000</span>
    </footer>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
function HomePage() {
  return (
    <>
      <GlobalStyles />
      <LoadCurtain />
      <CustomCursor />
      <ProgressBar />
      <NavBar />

      {/* Cinematic descent — staircase (hero) → entrance → window → interior → pool2 → pool */}
      <CinematicDescent />

      {/* INTERRUPT: Horizontal villa photo scroll */}
      <VillaScroll />

      {/* INTERRUPT: Villa tiers */}
      <VillaTiers />

      {/* INTERRUPT: Horizontal materials */}
      <MaterialsScroll />

      {/* Island */}
      <IslandSection />

      {/* INTERRUPT: Quote */}
      <QuoteMoment quote="Not merely a home. A permanent address in the world's most tax-efficient paradise. From £1,250,000." attr="Permanent Residence Permit included for buyer, spouse and dependants" />

      {/* Staircase → Wellness */}
      <StaircaseDescent />
      <WellnessSection />

      {/* INTERRUPT: Counting stats */}
      <CountingStats />

      {/* Investment */}
      <InvestmentSection />

      {/* Contact */}
      <ContactSection />
      <Footer />
    </>
  )
}
