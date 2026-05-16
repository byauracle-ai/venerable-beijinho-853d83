import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react'

export const Route = createFileRoute('/')({
  component: HomePage,
})

// ─── Images from GitHub repo ───────────────────────────────────────────────────
const PUB = 'https://raw.githubusercontent.com/byauracle-ai/venerable-beijinho-853d83/main'
const p = (f: string) => `${PUB}/${encodeURIComponent(f)}`

const IMG = {
  // Hero / descent sequence — each used ONCE
  hero:       p('Screenshot 2026-05-14 202001.png'),
  entrance:   p('Sea VIew.png'),
  window:     p('window.png'),
  seaView2:   p('Sea view 2.png'),
  // Estate panels — unique images only
  interior:   p('interior.png'),
  // Spa
  spaEntry:   p('Spa Entry.png'),
  spa1:       p('Spa 1.png'),
  spa2:       p('Spa 2.png'),
  spa3:       p('Spa 3.jpg'),
  // Villa tabs — spread across unique spa/view images
  villa0:     p('Sea VIew.png'),
  villa1:     p('Sea view 2.png'),
  villa2:     p('window.png'),
  villa3:     p('Spa 1.png'),
  villa4:     p('Spa 2.png'),
  villa5:     p('Spa Entry.png'),
  villa6:     p('Spa 3.jpg'),
  // Loro Piana interiors (sourced online)
  loro1:      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1400&q=90',
  loro2:      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1400&q=90',
  loro3:      'https://images.unsplash.com/photo-1615873968403-89e068629265?w=1400&q=90',
  // Helicopter
  heli:       'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1400&q=90',
}

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

function useCount(target: number, active: boolean, duration = 2000, dec = 0) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const ease = 1 - Math.pow(1 - t, 3)
      setVal(parseFloat((ease * target).toFixed(dec)))
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [active, target])
  return val
}

// ─── Global styles ────────────────────────────────────────────────────────────
function Styles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Cinzel:wght@400;500&family=Jost:wght@200;300;400&display=swap');

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

      :root {
        --K: #04040a;
        --D: #07070e;
        --M: #0a0a14;
        --S: #0c0c18;
        --spa: #030308;
        --gold: #c8a85c;
        --gold2: #e2c882;
        --T: #f2ede6;
        --T2: #8a8478;
        --T3: #4a4840;
        --BL: rgba(200,168,92,0.1);
        --BH: rgba(200,168,92,0.26);
        --F: 'Cormorant Garamond', Georgia, serif;
        --H: 'Cinzel', serif;
        --B: 'Jost', sans-serif;
      }

      html { scroll-behavior: auto; }

      body {
        background: var(--K);
        color: var(--T);
        font-family: var(--B);
        font-weight: 300;
        -webkit-font-smoothing: antialiased;
        overflow-x: hidden;
        cursor: none;
      }

      /* Subtle grain */
      body::after {
        content: ''; position: fixed; inset: 0; pointer-events: none;
        z-index: 9000; opacity: 0.02;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        background-size: 180px;
      }

      .cap {
        font-family: var(--B); font-size: 9px; font-weight: 300;
        letter-spacing: 0.36em; text-transform: uppercase; color: var(--gold);
      }

      /* Nav links */
      .nl { font-family: var(--B); font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--T2); text-decoration: none; font-weight: 300; transition: color 0.3s; }
      .nl:hover { color: var(--gold2); }

      /* Buttons */
      .btn { display: inline-block; font-family: var(--B); font-size: 9px; font-weight: 300; letter-spacing: 0.3em; text-transform: uppercase; text-decoration: none; padding: 13px 32px; transition: all 0.4s; cursor: none; border: none; outline: none; }
      .bg  { background: var(--gold); color: var(--K); }
      .bg:hover  { background: var(--gold2); box-shadow: 0 6px 40px rgba(200,168,92,0.3); }
      .bl  { background: transparent; border: 1px solid var(--BH); color: var(--T); }
      .bl:hover  { border-color: var(--gold); color: var(--gold2); background: rgba(200,168,92,0.05); }

      /* Progress bar */
      #pb { position: fixed; top: 0; left: 0; height: 1px; background: var(--gold); z-index: 8000; }

      /* Inputs */
      input, textarea {
        font-family: var(--B); font-size: 13px; font-weight: 300; letter-spacing: 0.06em;
        background: transparent; border: none; border-bottom: 1px solid rgba(200,168,92,0.15);
        color: var(--T); padding: 14px 0; width: 100%; outline: none; transition: border-color 0.35s;
      }
      input:focus, textarea:focus { border-color: var(--gold); }
      input::placeholder, textarea::placeholder { color: var(--T3); }

      @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      @keyframes pulse  { 0%,100%{opacity:0.2;transform:scaleY(0.3)} 50%{opacity:0.7;transform:scaleY(1)} }
      @keyframes rotateSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      @keyframes dashAnim { from { stroke-dashoffset: 600; } to { stroke-dashoffset: 0; } }
      @keyframes floatUp { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
      @keyframes glowPulse { 0%,100%{opacity:0.6} 50%{opacity:1} }

      @media (max-width: 768px) {
        .hm  { display: none !important; }
        .c2  { grid-template-columns: 1fr !important; }
        .c3  { grid-template-columns: 1fr 1fr !important; }
        .c4  { grid-template-columns: 1fr 1fr !important; }
        .c6  { grid-template-columns: repeat(3,1fr) !important; }
      }
    `}</style>
  )
}

// ─── Cursor ───────────────────────────────────────────────────────────────────
function Cursor() {
  const dot  = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const pos  = useRef({ x: -200, y: -200 })
  const lag  = useRef({ x: -200, y: -200 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dot.current) {
        dot.current.style.transform = `translate(${e.clientX}px,${e.clientY}px) translate(-50%,-50%)`
        dot.current.style.opacity = '1'
      }
      const t = e.target as HTMLElement
      const isImg = !!t.closest('section, .img-wrap')
      const isBtn = !!t.closest('a, button')
      if (ring.current) {
        ring.current.style.width  = isImg ? '48px' : '22px'
        ring.current.style.height = isImg ? '48px' : '22px'
        ring.current.style.borderColor = isBtn ? 'var(--gold2)' : 'rgba(200,168,92,0.35)'
      }
    }
    let raf: number
    const lerp = () => {
      lag.current.x += (pos.current.x - lag.current.x) * 0.1
      lag.current.y += (pos.current.y - lag.current.y) * 0.1
      if (ring.current)
        ring.current.style.transform = `translate(${lag.current.x}px,${lag.current.y}px) translate(-50%,-50%)`
      raf = requestAnimationFrame(lerp)
    }
    raf = requestAnimationFrame(lerp)
    window.addEventListener('mousemove', onMove)
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf) }
  }, [])

  return (
    <>
      <div ref={dot} style={{ position:'fixed',top:0,left:0,width:5,height:5,borderRadius:'50%',background:'var(--gold)',pointerEvents:'none',zIndex:9999,opacity:0,willChange:'transform' }} />
      <div ref={ring} style={{ position:'fixed',top:0,left:0,width:22,height:22,borderRadius:'50%',border:'1px solid rgba(200,168,92,0.35)',pointerEvents:'none',zIndex:9998,willChange:'transform',transition:'width 0.4s,height 0.4s,border-color 0.3s' }} />
    </>
  )
}

// ─── Load curtain ─────────────────────────────────────────────────────────────
function Curtain() {
  const [opacity, setOpacity] = useState(1)
  const [gone, setGone] = useState(false)
  useEffect(() => {
    const t1 = setTimeout(() => setOpacity(0), 200)
    const t2 = setTimeout(() => setGone(true), 1300)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])
  if (gone) return null
  return <div style={{ position:'fixed',inset:0,background:'var(--K)',zIndex:9990,opacity,transition:'opacity 1.1s ease',pointerEvents:'none' }} />
}

// ─── Progress bar ─────────────────────────────────────────────────────────────
function PBar() {
  const [w, setW] = useState(0)
  useEffect(() => {
    const fn = () => {
      const d = document.documentElement
      setW(window.scrollY / (d.scrollHeight - window.innerHeight) * 100)
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return <div id="pb" style={{ width: `${w}%` }} />
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true }); fn()
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 5000, height: 68,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 clamp(24px,5vw,72px)',
      background: scrolled ? 'rgba(4,4,10,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: `1px solid ${scrolled ? 'rgba(200,168,92,0.07)' : 'transparent'}`,
      transition: 'background 0.5s, border-color 0.5s',
    }}>
      <a href="/" style={{ textDecoration: 'none' }}>
        <div style={{ fontFamily:'var(--F)',fontSize:18,fontWeight:300,letterSpacing:'0.22em',color:'var(--T)',lineHeight:1 }}>ÉDEN ESTATES</div>
        <div className="cap" style={{ fontSize:7,letterSpacing:'0.42em',marginTop:3 }}>Mauritius · Est. 2018</div>
      </a>
      <div className="hm" style={{ display:'flex',alignItems:'center',gap:40 }}>
        {[['Villas','#villas'],['Estate','#estate'],['Island','#island'],['Wellness','#wellness'],['Invest','#invest'],['Contact','#contact']].map(([l,h]) => (
          <a key={l} href={h} className="nl">{l}</a>
        ))}
        <a href="#contact" className="btn bl" style={{ fontSize:8,padding:'9px 20px' }}>Enquire</a>
      </div>
    </nav>
  )
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [scrollY, setScrollY] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const vh = typeof window !== 'undefined' ? window.innerHeight : 800
  const progress = Math.min(1, scrollY / vh)

  // Darken/fade as hero scrolls into next image
  const imgBlur = progress > 0.35 ? (progress - 0.35) / 0.65 * 20 : 0
  const imgDark = 0.15 + progress * 0.85  // starts at 0.15, reaches 1.0 at end

  const textOpacity = Math.max(0, 1 - progress * 2.8)

  return (
    <section ref={ref} style={{ position: 'relative', height: '100dvh', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <img
          src={IMG.hero}
          alt="Éden Estates"
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center 30%',
            filter: `blur(${imgBlur}px)`,
            transform: `scale(${1 + imgBlur * 0.005})`,
            willChange: 'filter, transform',
          }}
        />
        <div style={{ position:'absolute',inset:0,background:`rgba(4,4,10,${imgDark})`,transition:'background 0.05s' }} />
        <div style={{ position:'absolute',inset:0,background:'linear-gradient(to top,rgba(4,4,10,0.88) 0%,rgba(4,4,10,0.2) 45%,transparent 100%)' }} />
        <div style={{ position:'absolute',inset:0,background:'linear-gradient(to bottom,rgba(4,4,10,0.4) 0%,transparent 25%)' }} />
      </div>

      <div style={{ position:'absolute',bottom:'clamp(72px,9vw,120px)',left:'clamp(40px,6vw,96px)',maxWidth:680,opacity:textOpacity,transform:`translateY(${progress*24}px)`,pointerEvents:textOpacity>0.1?'all':'none' }}>
        <div className="cap" style={{ marginBottom:20,fontSize:8,animation:'fadeUp 1s ease 0.4s both' }}>
          Grand Baie · North Coast · Mauritius
        </div>
        <h1 style={{ fontFamily:'var(--H)',fontSize:'clamp(16px,2vw,28px)',fontWeight:400,letterSpacing:'0.28em',textTransform:'uppercase',color:'var(--T)',margin:'0 0 18px',lineHeight:1.5,animation:'fadeUp 1.1s ease 0.6s both' }}>
          Where luxury<br />finds its address
        </h1>
        <div style={{ width:44,height:1,background:'var(--gold)',opacity:0.5,marginBottom:22,animation:'fadeUp 1s ease 0.8s both' }} />
        <p style={{ fontFamily:'var(--F)',fontSize:'clamp(14px,1.5vw,17px)',fontStyle:'italic',color:'rgba(242,237,230,0.6)',maxWidth:380,lineHeight:1.85,marginBottom:36,animation:'fadeUp 1s ease 1s both' }}>
          7 boutique villas of singular distinction.<br />Permanent residency included. From £1,250,000.
        </p>
        <div style={{ display:'flex',gap:12,flexWrap:'wrap',animation:'fadeUp 1s ease 1.2s both' }}>
          <a href="#villas" className="btn bg">Explore Villas</a>
          <a href="#contact" className="btn bl">Private Viewing</a>
        </div>
      </div>

      <div style={{ position:'absolute',top:88,right:'clamp(24px,5vw,72px)',opacity:textOpacity,borderTop:'1px solid rgba(200,168,92,0.22)',borderBottom:'1px solid rgba(200,168,92,0.22)',padding:'16px 24px',textAlign:'center',background:'rgba(4,4,10,0.5)',backdropFilter:'blur(12px)',animation:'fadeIn 1s ease 1.4s both',pointerEvents:'none' }}>
        <div className="cap" style={{ fontSize:7,marginBottom:7 }}>Est. Gross Yield</div>
        <div style={{ fontFamily:'var(--F)',fontSize:36,fontWeight:300,lineHeight:1,color:'var(--gold)' }}>9%</div>
        <div style={{ fontFamily:'var(--F)',fontSize:10,fontStyle:'italic',color:'var(--T3)',marginTop:4 }}>short-term rental</div>
      </div>

      <div style={{ position:'absolute',bottom:36,left:'50%',transform:'translateX(-50%)',display:'flex',flexDirection:'column',alignItems:'center',gap:8,opacity:textOpacity*0.6,pointerEvents:'none',animation:'fadeIn 1s ease 2s both' }}>
        <div className="cap" style={{ fontSize:7 }}>Scroll</div>
        <div style={{ width:1,height:44,background:'linear-gradient(to bottom,var(--gold),transparent)',animation:'pulse 2s ease infinite' }} />
      </div>
    </section>
  )
}

// ─── SCENE — darkens/fades on exit into next image ────────────────────────────
function Scene({ src, label, caption, objPos = 'center', id }: {
  src: string; label?: string; caption?: string; objPos?: string; id?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const fn = () => {
      const el = ref.current; if (!el) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const p = -rect.top / vh
      setProgress(Math.min(1, Math.max(0, p)))
    }
    window.addEventListener('scroll', fn, { passive: true }); fn()
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Exit: darkens strongly + blurs as user scrolls into next panel
  const exitBlur = progress > 0.5 ? (progress - 0.5) / 0.5 * 18 : 0
  const exitDark = progress > 0.4 ? 0.1 + (progress - 0.4) / 0.6 * 0.9 : 0.1

  const capOp = progress > 0.08 && progress < 0.58
    ? Math.min(1, (progress - 0.08) / 0.14, (0.58 - progress) / 0.1)
    : 0

  return (
    <section id={id} ref={ref} style={{ position:'relative',height:'100dvh',overflow:'hidden' }}>
      <div className="img-wrap" style={{ position:'absolute',inset:0 }}>
        <img
          src={src} alt={label ?? ''} loading="lazy"
          style={{ width:'100%',height:'100%',objectFit:'cover',objectPosition:objPos,filter:`blur(${exitBlur}px)`,transform:`scale(${1+exitBlur*0.005})`,willChange:'filter,transform' }}
        />
        <div style={{ position:'absolute',inset:0,background:`rgba(4,4,10,${exitDark})`,pointerEvents:'none',transition:'background 0.05s' }} />
        <div style={{ position:'absolute',inset:0,background:'linear-gradient(to top,rgba(4,4,10,0.82) 0%,transparent 40%)',pointerEvents:'none' }} />
      </div>

      {label && (
        <div style={{ position:'absolute',bottom:'clamp(52px,7vh,88px)',left:'clamp(40px,6vw,96px)',maxWidth:560,opacity:capOp,transform:`translateY(${(1-Math.min(1,capOp*4))*10}px)`,pointerEvents:'none' }}>
          <div className="cap" style={{ marginBottom:12,fontSize:8 }}>{label}</div>
          {caption && (
            <p style={{ fontFamily:'var(--F)',fontSize:'clamp(20px,2.8vw,42px)',fontStyle:'italic',fontWeight:300,color:'var(--T)',lineHeight:1.18 }}>
              {caption}
            </p>
          )}
        </div>
      )}
    </section>
  )
}

// ─── Full-bleed panel ─────────────────────────────────────────────────────────
function Panel({ src, eyebrow, title, sub, align = 'left', objPos = 'center', dim = 0.45, id }: {
  src: string; eyebrow?: string; title: string; sub?: string
  align?: 'left'|'center'|'right'; objPos?: string; dim?: number; id?: string
}) {
  const { ref, visible } = useInView(0.08)
  const a = align === 'center' ? { textAlign:'center' as const, left:0, right:0 }
           : align === 'right'  ? { textAlign:'right'  as const, right:'clamp(40px,7vw,120px)' }
           :                       { left:'clamp(40px,7vw,120px)' }
  return (
    <section id={id} style={{ position:'relative',height:'100dvh',overflow:'hidden',display:'flex',flexDirection:'column',justifyContent:'flex-end' }}>
      <div className="img-wrap" style={{ position:'absolute',inset:0 }}>
        <img src={src} alt={title} loading="lazy" style={{ width:'100%',height:'100%',objectFit:'cover',objectPosition:objPos }} />
        <div style={{ position:'absolute',inset:0,background:`linear-gradient(to top,rgba(4,4,10,${dim+0.4}) 0%,rgba(4,4,10,${dim*0.15}) 48%,transparent 100%)` }} />
      </div>
      <div ref={ref} style={{ position:'relative',zIndex:2,padding:'clamp(40px,6vw,96px)',paddingBottom:'clamp(52px,7vw,96px)',...a,opacity:visible?1:0,transform:visible?'none':'translateY(14px)',transition:'opacity 1.3s ease,transform 1.3s ease' }}>
        {eyebrow && <div className="cap" style={{ marginBottom:14 }}>{eyebrow}</div>}
        <h2 style={{ fontFamily:'var(--F)',fontSize:'clamp(28px,5vw,74px)',fontWeight:300,fontStyle:'italic',lineHeight:1.06,color:'var(--T)',margin:0 }}>{title}</h2>
        {sub && <p style={{ fontFamily:'var(--F)',fontSize:'clamp(14px,1.5vw,18px)',fontStyle:'italic',color:'rgba(242,237,230,0.54)',marginTop:16,maxWidth:460,lineHeight:1.75,...(align==='center'?{margin:'16px auto 0',display:'block' as const}:{}) }}>{sub}</p>}
      </div>
    </section>
  )
}

// ─── Specs bar ────────────────────────────────────────────────────────────────
function Specs() {
  const { ref, visible } = useInView()
  const items = [
    { v:'7',      l:'Boutique Villas' },
    { v:'5',      l:'Max Bedrooms' },
    { v:'820m²',  l:'Max Interior' },
    { v:'9%',     l:'Gross Yield' },
    { v:'0%',     l:'Capital Gains Tax' },
    { v:'£1.25M', l:'Prices From' },
  ]
  return (
    <div ref={ref} className="c6" style={{ display:'grid',gridTemplateColumns:'repeat(6,1fr)',borderTop:'1px solid var(--BL)',borderBottom:'1px solid var(--BL)',background:'var(--K)' }}>
      {items.map(({ v, l }, i) => (
        <div key={l} style={{ padding:'clamp(28px,4vw,56px) clamp(14px,2.5vw,32px)',borderLeft:i>0?'1px solid var(--BL)':'none',opacity:visible?1:0,transform:visible?'none':'translateY(12px)',transition:`all 0.8s ease ${i*0.07}s` }}>
          <div style={{ fontFamily:'var(--F)',fontSize:'clamp(22px,3vw,46px)',fontWeight:300,fontStyle:'italic',color:'var(--gold)',lineHeight:1,marginBottom:8 }}>{v}</div>
          <div className="cap" style={{ fontSize:8,color:'var(--T3)' }}>{l}</div>
        </div>
      ))}
    </div>
  )
}

// ─── Dark text section ────────────────────────────────────────────────────────
function Dark({ eyebrow, title, body, center = false, id, children }: {
  eyebrow?: string; title?: string; body?: string; center?: boolean; id?: string; children?: React.ReactNode
}) {
  const { ref, visible } = useInView(0.12)
  return (
    <section id={id} style={{ background:'var(--D)',padding:'clamp(64px,8vw,110px) clamp(40px,6vw,96px)',textAlign:center?'center':'left' }}>
      <div ref={ref} style={{ maxWidth:center?680:900,margin:center?'0 auto':undefined,opacity:visible?1:0,transform:visible?'none':'translateY(16px)',transition:'opacity 1.2s,transform 1.2s' }}>
        {eyebrow && <div className="cap" style={{ marginBottom:18 }}>{eyebrow}</div>}
        {title && <h2 style={{ fontFamily:'var(--F)',fontSize:'clamp(26px,4vw,60px)',fontWeight:300,fontStyle:'italic',lineHeight:1.1,color:'var(--T)',marginBottom:body?22:0 }}>{title}</h2>}
        {body && <p style={{ fontFamily:'var(--F)',fontSize:'clamp(15px,1.5vw,18px)',fontStyle:'italic',color:'var(--T2)',lineHeight:1.85 }}>{body}</p>}
        {children}
      </div>
    </section>
  )
}

// ─── 7 Villa tiers ────────────────────────────────────────────────────────────
const VILLAS = [
  { name:'Maison Lagon',    loc:'Trou aux Biches', price:'£1,250,000', tag:'Entry',       beds:3,baths:4,sqm:380,yld:'6.8%',img:IMG.villa0, desc:'Steps from the most celebrated lagoon in Mauritius. Fully furnished, generating income from day one.' },
  { name:'Villa Corail',    loc:'Grand Baie',       price:'£1,650,000', tag:'Signature',   beds:3,baths:4,sqm:440,yld:'7.2%',img:IMG.villa1, desc:'Panoramic lagoon views from every room. Architecture that dissolves into the landscape.' },
  { name:'Domaine Azur',    loc:'Péreybère',        price:'£1,950,000', tag:'Premium',     beds:4,baths:5,sqm:560,yld:'7.6%',img:IMG.villa2, desc:'Elevated position with 180° northern lagoon views. Architect-designed, immaculately finished.' },
  { name:'Domaine Noir',    loc:'Bel Ombre',        price:'£2,100,000', tag:"Collector's", beds:4,baths:5,sqm:640,yld:'7.5%',img:IMG.villa3, desc:'Monolithic basalt and 22-metre lap pool on 1.4 hectares of private nature reserve.' },
  { name:'Villa Lumière',   loc:'Tamarin',          price:'£2,750,000', tag:'Grand',       beds:5,baths:6,sqm:720,yld:'8.2%',img:IMG.villa4, desc:'Moorish geometry meets Creole colour. Rooftop terrace with 360° mountain-to-ocean views.' },
  { name:'Résidence Soleil',loc:'Black River',      price:'£3,200,000', tag:'Estate',      beds:5,baths:6,sqm:800,yld:'8.8%',img:IMG.villa5, desc:'Six suites surrounding a double infinity pool with fire features. Paris-designed interiors.' },
  { name:'Villa Azur',      loc:'Grand Baie',       price:'£3,750,000', tag:'Flagship',    beds:5,baths:6,sqm:820,yld:'9.0%',img:IMG.villa6, desc:'The definitive Mauritian estate. Infinity pool, private beach, wine cellar, dedicated concierge.' },
]

function Villas() {
  const [active, setActive] = useState(0)
  const { ref, visible } = useInView(0.06)
  const villa = VILLAS[active]
  return (
    <section id="villas" ref={ref} style={{ background:'var(--D)',borderTop:'1px solid var(--BL)' }}>
      <div style={{ padding:'clamp(52px,7vw,96px) clamp(40px,6vw,96px) 0',opacity:visible?1:0,transform:visible?'none':'translateY(12px)',transition:'all 0.9s' }}>
        <div className="cap" style={{ marginBottom:10 }}>Exclusive Portfolio · 7 Estates</div>
        <h2 style={{ fontFamily:'var(--F)',fontSize:'clamp(24px,4vw,56px)',fontWeight:300,fontStyle:'italic',color:'var(--T)',marginBottom:32 }}>Seven addresses. One island.</h2>
        <div style={{ display:'flex',flexWrap:'wrap',borderBottom:'1px solid var(--BL)' }}>
          {VILLAS.map((vi,i) => (
            <button key={vi.name} onClick={() => setActive(i)} style={{ fontFamily:'var(--B)',fontSize:8,fontWeight:300,letterSpacing:'0.22em',textTransform:'uppercase',background:'none',border:'none',cursor:'none',padding:'11px 18px 11px 0',color:active===i?'var(--gold)':'var(--T3)',borderBottom:active===i?'1px solid var(--gold)':'1px solid transparent',marginBottom:-1,transition:'all 0.3s',whiteSpace:'nowrap' }}>
              {vi.name}
            </button>
          ))}
        </div>
      </div>

      <div key={active} className="c2" style={{ display:'grid',gridTemplateColumns:'1fr 1fr',minHeight:'65vh',animation:'fadeIn 0.45s ease forwards' }}>
        <div className="img-wrap" style={{ position:'relative',overflow:'hidden',minHeight:320 }}>
          <img src={villa.img} alt={villa.name} style={{ width:'100%',height:'100%',objectFit:'cover',objectPosition:'center' }} />
          <div style={{ position:'absolute',top:14,left:14 }}>
            <span style={{ background:'var(--gold)',color:'var(--K)',fontFamily:'var(--B)',fontSize:8,letterSpacing:'0.24em',textTransform:'uppercase',padding:'5px 11px' }}>{villa.tag}</span>
          </div>
          <div style={{ position:'absolute',inset:0,background:'linear-gradient(to top,rgba(4,4,10,0.5) 0%,transparent 50%)' }} />
        </div>
        <div style={{ padding:'clamp(36px,5vw,76px)',display:'flex',flexDirection:'column',justifyContent:'center',background:'var(--M)' }}>
          <div className="cap" style={{ marginBottom:8,fontSize:7,color:'var(--T3)' }}>{villa.loc} · Mauritius</div>
          <h3 style={{ fontFamily:'var(--F)',fontSize:'clamp(20px,3vw,42px)',fontWeight:300,fontStyle:'italic',color:'var(--T)',marginBottom:6,lineHeight:1.1 }}>{villa.name}</h3>
          <div style={{ fontFamily:'var(--F)',fontSize:'clamp(17px,2.2vw,30px)',fontWeight:300,color:'var(--gold)',marginBottom:22 }}>{villa.price}</div>
          <div style={{ display:'flex',gap:20,marginBottom:20,paddingBottom:20,borderBottom:'1px solid var(--BL)' }}>
            {[{v:villa.beds,l:'Beds'},{v:villa.baths,l:'Baths'},{v:`${villa.sqm}m²`,l:'Interior'},{v:villa.yld,l:'Yield'}].map(({v,l}) => (
              <div key={l}>
                <div style={{ fontFamily:'var(--F)',fontSize:'clamp(15px,1.8vw,24px)',fontWeight:300,fontStyle:'italic',color:'var(--T)',lineHeight:1 }}>{v}</div>
                <div className="cap" style={{ fontSize:7,color:'var(--T3)',marginTop:4 }}>{l}</div>
              </div>
            ))}
          </div>
          <p style={{ fontFamily:'var(--F)',fontSize:'clamp(13px,1.3vw,16px)',fontStyle:'italic',lineHeight:1.85,color:'var(--T2)',marginBottom:26 }}>{villa.desc}</p>
          <div style={{ display:'flex',gap:10,marginBottom:20,flexWrap:'wrap' }}>
            <a href="#contact" className="btn bg" style={{ fontSize:8,padding:'11px 22px' }}>Request Brochure</a>
            <a href="#contact" className="btn bl" style={{ fontSize:8,padding:'11px 22px' }}>Arrange Viewing</a>
          </div>
          <div style={{ padding:'11px 14px',background:'rgba(200,168,92,0.05)',borderLeft:'2px solid var(--gold)' }}>
            <div className="cap" style={{ fontSize:7,marginBottom:4 }}>Permanent Residency Included</div>
            <p style={{ fontFamily:'var(--F)',fontSize:12,fontStyle:'italic',color:'var(--T3)',lineHeight:1.6 }}>Qualifies under EDB schemes. Buyer, spouse and dependants receive PRP for duration of ownership.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Loro Piana Interiors ─────────────────────────────────────────────────────
function LoroPiana() {
  const { ref, visible } = useInView(0.08)
  return (
    <section style={{ background:'var(--K)',borderTop:'1px solid var(--BL)' }}>
      {/* Intro */}
      <div ref={ref} style={{ padding:'clamp(72px,9vw,130px) clamp(40px,6vw,96px) clamp(52px,6vw,80px)',maxWidth:900,opacity:visible?1:0,transform:visible?'none':'translateY(16px)',transition:'all 1.2s' }}>
        <div className="cap" style={{ marginBottom:16,letterSpacing:'0.44em' }}>Interiors · An Exclusive Partnership</div>
        <h2 style={{ fontFamily:'var(--F)',fontSize:'clamp(28px,4.5vw,66px)',fontWeight:300,fontStyle:'italic',lineHeight:1.08,color:'var(--T)',marginBottom:22 }}>
          Dressed by<br />
          <span style={{ background:'linear-gradient(90deg,var(--gold),var(--gold2),var(--gold))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text' }}>Loro Piana</span>
        </h2>
        <p style={{ fontFamily:'var(--F)',fontSize:'clamp(15px,1.5vw,18px)',fontStyle:'italic',color:'var(--T2)',lineHeight:1.9,maxWidth:620 }}>
          Each Éden estate is dressed in collaboration with Loro Piana — the Italian house that has defined the quiet luxury of the world's most discerning interiors for two centuries. Cashmere, vicuña, and fine linen in tones drawn from the Indian Ocean.
        </p>
      </div>

      {/* Three-image grid */}
      <div className="c3" style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:2,margin:'0 2px 2px' }}>
        {[
          { src:IMG.loro1, label:'Living Quarters', note:'Hand-loomed Loro Piana cashmere throws · Sage & sand palette' },
          { src:IMG.loro2, label:'Master Suite',    note:'Vicuña wool bedding · Climate-controlled wardrobes' },
          { src:IMG.loro3, label:'Terrace Lounge',  note:'Outdoor linen collection · Seamless indoor-outdoor flow' },
        ].map(({ src, label, note }, i) => (
          <LoroPianaCard key={label} src={src} label={label} note={note} delay={i * 160} />
        ))}
      </div>

      {/* Brand line */}
      <div style={{ background:'var(--D)',borderTop:'1px solid var(--BL)',padding:'clamp(36px,4vw,60px) clamp(40px,6vw,96px)',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:24 }}>
        <div>
          <div className="cap" style={{ marginBottom:8,fontSize:7 }}>Every surface. Every texture. Every thread.</div>
          <p style={{ fontFamily:'var(--F)',fontSize:'clamp(14px,1.4vw,18px)',fontStyle:'italic',color:'var(--T2)',lineHeight:1.75,maxWidth:560 }}>
            The Loro Piana interior programme is available exclusively to Éden Estates owners — a level of material refinement that cannot be replicated or purchased separately.
          </p>
        </div>
        <div style={{ textAlign:'right' }}>
          <div style={{ fontFamily:'var(--F)',fontSize:'clamp(11px,1.2vw,14px)',fontStyle:'italic',color:'var(--gold)',letterSpacing:'0.18em',marginBottom:4 }}>LORO PIANA × ÉDEN ESTATES</div>
          <div className="cap" style={{ fontSize:7,color:'var(--T3)' }}>Estd. 1924 · Quarona, Italy</div>
        </div>
      </div>
    </section>
  )
}

function LoroPianaCard({ src, label, note, delay }: { src:string; label:string; note:string; delay:number }) {
  const { ref, visible } = useInView(0.1)
  return (
    <div ref={ref} style={{ position:'relative',height:'clamp(280px,40vw,520px)',overflow:'hidden',opacity:visible?1:0,transform:visible?'none':'translateY(18px)',transition:`all 1s ease ${delay}ms` }}>
      <img src={src} alt={label} loading="lazy" style={{ width:'100%',height:'100%',objectFit:'cover',objectPosition:'center',transition:'transform 0.8s ease' }} />
      <div style={{ position:'absolute',inset:0,background:'linear-gradient(to top,rgba(4,4,10,0.82) 0%,rgba(4,4,10,0.1) 55%,transparent 100%)' }} />
      <div style={{ position:'absolute',bottom:0,left:0,right:0,padding:'clamp(18px,2.5vw,32px)' }}>
        <div className="cap" style={{ fontSize:7,marginBottom:6 }}>{label}</div>
        <p style={{ fontFamily:'var(--F)',fontSize:'clamp(11px,1.1vw,13px)',fontStyle:'italic',color:'rgba(242,237,230,0.55)',lineHeight:1.65 }}>{note}</p>
      </div>
    </div>
  )
}

// ─── Quote ────────────────────────────────────────────────────────────────────
function Quote({ text, attr }: { text: string; attr?: string }) {
  const { ref, visible } = useInView(0.25)
  return (
    <section ref={ref} style={{ background:'var(--M)',padding:'clamp(72px,10vw,140px) clamp(40px,10vw,180px)',textAlign:'center',borderTop:'1px solid var(--BL)',borderBottom:'1px solid var(--BL)' }}>
      <div style={{ width:visible?40:0,height:1,background:'var(--gold)',margin:'0 auto 32px',transition:'width 1.2s ease',opacity:0.5 }} />
      <blockquote style={{ fontFamily:'var(--F)',fontSize:'clamp(18px,3.2vw,44px)',fontWeight:300,fontStyle:'italic',lineHeight:1.32,color:'var(--T)',maxWidth:780,margin:'0 auto',opacity:visible?1:0,transform:visible?'none':'translateY(10px)',transition:'all 1.4s ease 0.15s' }}>
        "{text}"
      </blockquote>
      {attr && <div className="cap" style={{ marginTop:28,fontSize:8,color:'var(--T3)',opacity:visible?1:0,transition:'opacity 1s ease 0.7s' }}>{attr}</div>}
    </section>
  )
}

// ─── Island ───────────────────────────────────────────────────────────────────
function Island() {
  return (
    <section id="island">
      <Panel src={IMG.seaView2} eyebrow="The Setting · Grand Baie" title="Minutes from one of the world's last untouched lagoons" sub="The northern lagoon — turquoise, warm, impossibly clear." objPos="center 30%" dim={0.5} />
      <div className="c3" style={{ background:'var(--D)',display:'grid',gridTemplateColumns:'repeat(3,1fr)',borderTop:'1px solid var(--BL)',borderBottom:'1px solid var(--BL)' }}>
        {[{v:'330',u:'days',l:'of sunshine per year'},{v:'27°',u:'avg',l:'Indian Ocean temperature'},{v:'5',u:'min',l:'to Grand Baie marina'}].map(({v,u,l},i) => (
          <div key={l} style={{ padding:'clamp(32px,4vw,56px)',borderRight:i<2?'1px solid var(--BL)':'none',textAlign:'center' }}>
            <div style={{ fontFamily:'var(--F)',fontSize:'clamp(28px,4vw,56px)',fontWeight:300,fontStyle:'italic',color:'var(--gold)',lineHeight:1 }}>
              {v}<span style={{ fontSize:'36%',marginLeft:4,color:'var(--T3)' }}>{u}</span>
            </div>
            <div className="cap" style={{ fontSize:8,color:'var(--T3)',marginTop:9 }}>{l}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Private Helicopter Transfers ─────────────────────────────────────────────
function Helicopter() {
  const { ref, visible } = useInView(0.08)
  return (
    <section style={{ position:'relative',height:'100dvh',overflow:'hidden',display:'flex',flexDirection:'column',justifyContent:'center' }}>
      <div style={{ position:'absolute',inset:0 }}>
        <img src={IMG.heli} alt="Private helicopter transfers" loading="lazy" style={{ width:'100%',height:'100%',objectFit:'cover',objectPosition:'center 40%' }} />
        <div style={{ position:'absolute',inset:0,background:'linear-gradient(135deg,rgba(4,4,10,0.85) 0%,rgba(4,4,10,0.4) 60%,rgba(4,4,10,0.65) 100%)' }} />
      </div>
      <div ref={ref} style={{ position:'relative',zIndex:2,padding:'clamp(40px,6vw,96px)',maxWidth:700,opacity:visible?1:0,transform:visible?'none':'translateY(14px)',transition:'all 1.3s ease' }}>
        <div className="cap" style={{ marginBottom:16,letterSpacing:'0.44em' }}>Exclusive Transfer · Sky to Shore</div>
        <h2 style={{ fontFamily:'var(--F)',fontSize:'clamp(28px,4.5vw,66px)',fontWeight:300,fontStyle:'italic',lineHeight:1.08,color:'var(--T)',marginBottom:20 }}>
          Private Helicopter<br />
          <span style={{ background:'linear-gradient(90deg,var(--gold),var(--gold2))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text' }}>Transfers</span>
        </h2>
        <p style={{ fontFamily:'var(--F)',fontSize:'clamp(14px,1.5vw,18px)',fontStyle:'italic',color:'rgba(242,237,230,0.65)',lineHeight:1.9,maxWidth:520,marginBottom:36 }}>
          Arrive at Sir Seewoosagur Ramgoolam International and be at your villa within eighteen minutes. Door-to-door, island-wide. Available on demand, around the clock, for all Éden Estates residents.
        </p>
        <div style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:1,maxWidth:480,marginBottom:36 }}>
          {[{v:'18',u:'min',l:'Airport to villa'},{v:'24/7',u:'',l:'On-demand access'},{v:'4',u:'seat',l:'Executive cabin'}].map(({v,u,l},i) => (
            <div key={l} style={{ padding:'clamp(16px,2vw,24px)',background:'rgba(200,168,92,0.06)',borderTop:'1px solid rgba(200,168,92,0.15)',textAlign:'center' }}>
              <div style={{ fontFamily:'var(--F)',fontSize:'clamp(22px,3vw,38px)',fontWeight:300,fontStyle:'italic',color:'var(--gold)',lineHeight:1 }}>
                {v}<span style={{ fontSize:'40%',marginLeft:3,color:'var(--T3)' }}>{u}</span>
              </div>
              <div className="cap" style={{ fontSize:7,color:'var(--T3)',marginTop:6 }}>{l}</div>
            </div>
          ))}
        </div>
        <a href="#contact" className="btn bg">Arrange Transfer</a>
      </div>
    </section>
  )
}

// ─── Wellness ─────────────────────────────────────────────────────────────────
function WellnessDescent() {
  const ref = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)
  const [elTop, setElTop] = useState(0)

  useEffect(() => {
    const fn = () => {
      setScrollY(window.scrollY)
      if (ref.current) setElTop(ref.current.offsetTop)
    }
    window.addEventListener('scroll', fn, { passive: true }); fn()
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const vh = typeof window !== 'undefined' ? window.innerHeight : 800
  const progress = Math.min(1, Math.max(0, (scrollY - elTop + vh) / (vh * 1.5)))
  const dark = progress < 0.45 ? 0 : Math.min(1,(progress-0.45)/0.45)
  const blur = dark * 13
  const txt  = progress < 0.65 ? 0 : Math.min(1,(progress-0.65)*7)

  return (
    <div ref={ref} style={{ minHeight:'130dvh',position:'relative',overflow:'hidden' }}>
      <img src={IMG.spaEntry} alt="Wellness descent" style={{ width:'100%',height:'100%',objectFit:'cover',objectPosition:'center 30%',position:'absolute',inset:0,filter:`blur(${blur}px)`,transform:`scale(${1+progress*0.04+blur*0.004})` }} />
      <div style={{ position:'absolute',inset:0,background:`rgba(4,4,10,${dark})` }} />
      <div style={{ position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',padding:40,opacity:txt }}>
        <div className="cap" style={{ marginBottom:18,letterSpacing:'0.44em' }}>Descend · Restore · Transcend</div>
        <h2 style={{ fontFamily:'var(--F)',fontSize:'clamp(26px,4.5vw,62px)',fontWeight:300,fontStyle:'italic',color:'var(--T)',lineHeight:1.12 }}>
          The Wellness<br />
          <span style={{ background:'linear-gradient(90deg,var(--gold),var(--gold2),var(--gold))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text' }}>Sanctuary</span>
        </h2>
      </div>
    </div>
  )
}

function Wellness() {
  const { ref, visible } = useInView()
  return (
    <section id="wellness" style={{ background:'var(--spa)' }}>
      {/* Opening image is Spa 2.png — no "In-Residence Wellness" section */}
      <Panel src={IMG.spa2}    eyebrow="The Spa"      title="The Treatment Sanctuary"  sub="Volcanic stone · Cold ocean mineral · Island botanicals." objPos="center 30%" dim={0.52} />
      <Panel src={IMG.spa1}    eyebrow="Concierge"    title="Your Dedicated Curator"   sub="A personal wellness director — anticipating every need before it becomes one." align="right" dim={0.52} />
      <Panel src={IMG.spa3}    eyebrow="Restoration"  title="Deep Restoration"         sub="Total silence. Total surrender. Total renewal." align="center" dim={0.58} />
      <div ref={ref} className="c4" style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',borderTop:'1px solid rgba(200,168,92,0.05)' }}>
        {[{n:'Hydrotherapy',d:'Heated jet pool, cold plunge, mineral steam'},{n:'Body Rituals',d:'Volcanic stone · Coconut · Ayurvedic'},{n:'Yoga Pavilion',d:'Sunrise & sunset, resident instructor'},{n:'Nutrition',d:'Ayurvedic & plant-based cuisine'}].map(({n,d},i) => (
          <div key={n} style={{ padding:'clamp(28px,3.5vw,52px) clamp(18px,2.5vw,36px)',borderRight:i<3?'1px solid rgba(200,168,92,0.05)':'none',opacity:visible?1:0,transform:visible?'none':'translateY(10px)',transition:`all 0.85s ease ${i*0.09}s` }}>
            <div className="cap" style={{ fontSize:8,marginBottom:9 }}>{n}</div>
            <p style={{ fontFamily:'var(--F)',fontSize:14,fontStyle:'italic',color:'rgba(242,237,230,0.26)',lineHeight:1.72 }}>{d}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Investment Infographic ────────────────────────────────────────────────────
function InvestmentInfographic() {
  const { ref, visible } = useInView(0.05)

  const metrics = [
    { id:'rppi', angle:-120, r:140, value:'+13.89%', label:'RPPI Growth', sub:'Q3 2025', color:'#c8a85c' },
    { id:'cum',  angle:-60,  r:140, value:'+140%',   label:'Cumulative',  sub:'Since 2019', color:'#e2c882' },
    { id:'yld',  angle:0,    r:140, value:'9%',       label:'Max Yield',   sub:'Coastal Villa', color:'#c8a85c' },
    { id:'gv',   angle:60,   r:140, value:'$1M',      label:'Golden Visa', sub:'Launched 2026', color:'#d4b870' },
    { id:'cgx',  angle:120,  r:140, value:'0%',       label:'Capital Gains',sub:'Tax Free',     color:'#e2c882' },
  ]

  return (
    <section ref={ref} style={{ background:'var(--K)',borderTop:'1px solid var(--BL)',padding:'clamp(72px,9vw,130px) clamp(40px,6vw,96px)',overflow:'hidden' }}>
      <div style={{ opacity:visible?1:0,transform:visible?'none':'translateY(16px)',transition:'all 1.1s' }}>
        <div className="cap" style={{ marginBottom:14,letterSpacing:'0.44em',textAlign:'center' }}>Market Intelligence · Mauritius 2025–2026</div>
        <h2 style={{ fontFamily:'var(--F)',fontSize:'clamp(24px,4vw,60px)',fontWeight:300,fontStyle:'italic',color:'var(--T)',textAlign:'center',marginBottom:8 }}>
          The Investment Case
        </h2>
        <p style={{ fontFamily:'var(--F)',fontSize:'clamp(13px,1.3vw,16px)',fontStyle:'italic',color:'var(--T2)',textAlign:'center',maxWidth:560,margin:'0 auto clamp(48px,7vw,90px)',lineHeight:1.85 }}>
          Five converging forces — appreciation, yield, residency, fiscal efficiency, and sustained demand — combine into a single irrefutable argument.
        </p>
      </div>

      {/* Central SVG infographic */}
      <div style={{ display:'flex',justifyContent:'center',opacity:visible?1:0,transition:'opacity 1.4s ease 0.3s' }}>
        <svg viewBox="0 0 600 520" style={{ width:'100%',maxWidth:680,overflow:'visible' }}>
          <defs>
            <radialGradient id="glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#c8a85c" stopOpacity="0.18"/>
              <stop offset="100%" stopColor="#c8a85c" stopOpacity="0"/>
            </radialGradient>
            <filter id="blur4">
              <feGaussianBlur stdDeviation="4"/>
            </filter>
          </defs>

          {/* Glow background */}
          <ellipse cx="300" cy="260" rx="180" ry="180" fill="url(#glow)" />
          <ellipse cx="300" cy="260" rx="180" ry="180" fill="url(#glow)" filter="url(#blur4)" />

          {/* Orbit rings */}
          {[80,130,175].map((r,i) => (
            <circle key={r} cx="300" cy="260" r={r} fill="none" stroke="rgba(200,168,92,0.08)" strokeWidth={i===2?1:0.5}
              strokeDasharray={i===2?"6 4":"none"}
            />
          ))}

          {/* Rotating dashes — outer ring */}
          <circle cx="300" cy="260" r="200" fill="none" stroke="rgba(200,168,92,0.05)" strokeWidth="0.5" strokeDasharray="3 8" />

          {/* Spoke lines */}
          {metrics.map(m => {
            const rad = (m.angle - 90) * Math.PI / 180
            const ix = 300 + 80 * Math.cos(rad)
            const iy = 260 + 80 * Math.sin(rad)
            const ox = 300 + 205 * Math.cos(rad)
            const oy = 260 + 205 * Math.sin(rad)
            return <line key={m.id} x1={ix} y1={iy} x2={ox} y2={oy} stroke="rgba(200,168,92,0.12)" strokeWidth="0.5" />
          })}

          {/* Metric nodes */}
          {metrics.map((m, i) => {
            const rad = (m.angle - 90) * Math.PI / 180
            const nx = 300 + m.r * Math.cos(rad)
            const ny = 260 + m.r * Math.sin(rad)
            return (
              <g key={m.id} style={{ animation:`floatUp ${2.8 + i * 0.35}s ease-in-out infinite`,animationDelay:`${i*0.4}s` }}>
                <circle cx={nx} cy={ny} r="42" fill="rgba(4,4,10,0.9)" stroke={m.color} strokeWidth="0.6" />
                <circle cx={nx} cy={ny} r="38" fill="none" stroke={m.color} strokeWidth="0.2" opacity="0.4" />
                <text x={nx} y={ny-8} textAnchor="middle" fill={m.color} fontSize="14" fontFamily="Cormorant Garamond,serif" fontStyle="italic">{m.value}</text>
                <text x={nx} y={ny+6} textAnchor="middle" fill="rgba(242,237,230,0.8)" fontSize="7" fontFamily="Jost,sans-serif" letterSpacing="1.5">{m.label.toUpperCase()}</text>
                <text x={nx} y={ny+17} textAnchor="middle" fill="rgba(200,168,92,0.55)" fontSize="6" fontFamily="Jost,sans-serif" letterSpacing="1">{m.sub.toUpperCase()}</text>
              </g>
            )
          })}

          {/* Central hub */}
          <circle cx="300" cy="260" r="68" fill="rgba(4,4,10,0.95)" stroke="rgba(200,168,92,0.25)" strokeWidth="1" />
          <circle cx="300" cy="260" r="62" fill="none" stroke="rgba(200,168,92,0.08)" strokeWidth="0.5" />
          <text x="300" y="248" textAnchor="middle" fill="rgba(200,168,92,0.9)" fontSize="9" fontFamily="Cinzel,serif" letterSpacing="2">MAURITIUS</text>
          <text x="300" y="265" textAnchor="middle" fill="rgba(242,237,230,0.95)" fontSize="22" fontFamily="Cormorant Garamond,serif" fontStyle="italic">+67%</text>
          <text x="300" y="281" textAnchor="middle" fill="rgba(242,237,230,0.4)" fontSize="6" fontFamily="Jost,sans-serif" letterSpacing="1.5">WEALTH GROWTH 2015–25</text>
        </svg>
      </div>

      {/* Data rows */}
      <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:2,marginTop:'clamp(48px,6vw,80px)',opacity:visible?1:0,transition:'opacity 1.2s ease 0.6s' }}>
        {[
          { cat:'Price Growth',      stat:'+12.62%',  desc:'Year-on-year rise in foreign-buyer-eligible listings, 2025' },
          { cat:'VEFA Advantage',    stat:'30–60%',   desc:'Below market — off-plan buyers lock in pre-construction pricing with staged payments' },
          { cat:'Tourism Demand',    stat:'1.44M',    desc:'Record arrivals in 2025, +3.9% YoY — driving premium villa occupancy' },
          { cat:'FDI · Luxury',      stat:'₨17.17B',  desc:'Foreign investment in IRS/RES/PDS luxury schemes, 2025' },
          { cat:'Residency Route',   stat:'≥$375K',   desc:'EDB-qualifying VEFA villa → Permanent Residence Permit, buyer + family' },
          { cat:'Urgency · July 26', stat:'5%→10%',   desc:'Non-citizen registration duty doubles on 1 July 2026. Act before completion.' },
        ].map(({ cat, stat, desc }) => (
          <div key={cat} style={{ padding:'clamp(20px,2.5vw,32px)',background:'rgba(200,168,92,0.03)',borderTop:'1px solid var(--BL)' }}>
            <div className="cap" style={{ fontSize:7,marginBottom:8 }}>{cat}</div>
            <div style={{ fontFamily:'var(--F)',fontSize:'clamp(22px,3vw,38px)',fontWeight:300,fontStyle:'italic',color:'var(--gold)',lineHeight:1,marginBottom:10 }}>{stat}</div>
            <p style={{ fontFamily:'var(--F)',fontSize:13,fontStyle:'italic',color:'var(--T3)',lineHeight:1.72 }}>{desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Counting stats ───────────────────────────────────────────────────────────
function StatBox({ target, suffix, label, note, dec=0, active, delay=0, border }: {
  target:number; suffix:string; label:string; note:string; dec?:number; active:boolean; delay?:number; border:boolean
}) {
  const [go, setGo] = useState(false)
  useEffect(() => { if (active) { const t = setTimeout(() => setGo(true), delay); return () => clearTimeout(t) } }, [active,delay])
  const val = useCount(target, go, 2000, dec)
  return (
    <div style={{ padding:'clamp(40px,5vw,68px) clamp(18px,3vw,40px)',borderRight:border?'1px solid var(--BL)':'none',textAlign:'center' }}>
      <div style={{ fontFamily:'var(--F)',fontSize:'clamp(32px,5vw,76px)',fontWeight:300,fontStyle:'italic',lineHeight:1,color:'var(--gold)',marginBottom:9 }}>
        {dec===0?Math.round(val):val.toFixed(dec)}{suffix}
      </div>
      <div className="cap" style={{ fontSize:8,marginBottom:6 }}>{label}</div>
      <div style={{ fontFamily:'var(--F)',fontSize:12,fontStyle:'italic',color:'var(--T3)' }}>{note}</div>
    </div>
  )
}

function Stats() {
  const { ref, visible } = useInView(0.28)
  return (
    <section ref={ref} style={{ background:'var(--S)',borderTop:'1px solid var(--BL)',borderBottom:'1px solid var(--BL)' }}>
      <div className="c2" style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)' }}>
        {[
          {target:13.89,suffix:'%',label:'RPPI Growth Q3 2025',  note:'Statistics Mauritius',dec:2},
          {target:140,  suffix:'%',label:'Cumulative since 2019', note:'Property price growth'},
          {target:9,    suffix:'%',label:'Gross rental yield',    note:'Short-term coastal villa'},
          {target:67,   suffix:'%',label:'Wealth growth 2015–25', note:"Africa's strongest decade"},
        ].map((d,i) => <StatBox key={d.label} {...d} active={visible} delay={i*130} border={i<3} />)}
      </div>
    </section>
  )
}

// ─── Investment text ───────────────────────────────────────────────────────────
function Investment() {
  const { ref, visible } = useInView()
  return (
    <section id="invest" style={{ background:'var(--K)' }}>
      <div className="c2" style={{ padding:'clamp(64px,8vw,110px) clamp(40px,6vw,96px) 0',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'clamp(32px,6vw,88px)' }}>
        <div ref={ref} style={{ opacity:visible?1:0,transform:visible?'none':'translateY(14px)',transition:'all 1s' }}>
          <div className="cap" style={{ marginBottom:14 }}>Market Intelligence · 2025–2026</div>
          <h2 style={{ fontFamily:'var(--F)',fontSize:'clamp(24px,3.5vw,52px)',fontWeight:300,fontStyle:'italic',lineHeight:1.1,color:'var(--T)',marginBottom:20 }}>The case for Mauritius</h2>
          <p style={{ fontFamily:'var(--F)',fontSize:'clamp(14px,1.4vw,17px)',fontStyle:'italic',lineHeight:1.85,color:'var(--T2)' }}>
            Five reasons converge into one irrefutable argument: capital appreciation, rental income, permanent residency, zero capital gains, and a way of life unavailable anywhere else on earth.
          </p>
        </div>
        <div style={{ borderLeft:'1px solid var(--BL)',paddingLeft:'clamp(28px,4vw,64px)',display:'flex',flexDirection:'column' }}>
          {[
            {e:'Price Appreciation',t:'8–12% forecast growth in 2026',d:'VEFA off-plan buyers lock in 30–60% below completed units. Bank-backed guarantees.'},
            {e:'Permanent Residency',t:'Family PRP from £1.25M',d:'Buyer, spouse and all dependants. Valid for duration of ownership. 20-year renewable.'},
            {e:'Tax Position',t:'0% CGT · 0% Estate Tax',d:'No capital gains, no inheritance tax, no annual property tax. Full repatriation of profits.'},
            {e:'Act Before July 2026',t:'Registration duty doubles',d:'Non-citizen duty rises 5%→10% on 1 July 2026. Buy now and save significantly.'},
          ].map(({e,t,d},i) => (
            <div key={e} style={{ padding:'clamp(16px,2vw,26px) 0',borderBottom:'1px solid var(--BL)',opacity:visible?1:0,transform:visible?'none':'translateX(10px)',transition:`all 0.85s ease ${i*0.1}s` }}>
              <div className="cap" style={{ fontSize:7,marginBottom:5 }}>{e}</div>
              <div style={{ fontFamily:'var(--F)',fontSize:'clamp(13px,1.5vw,19px)',fontStyle:'italic',color:'var(--T)',marginBottom:5 }}>{t}</div>
              <div style={{ fontFamily:'var(--F)',fontSize:13,fontStyle:'italic',color:'var(--T3)',lineHeight:1.7 }}>{d}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding:'clamp(56px,7vw,96px) clamp(40px,6vw,96px)',textAlign:'center',marginTop:'clamp(44px,6vw,72px)',borderTop:'1px solid var(--BL)' }}>
        <div className="cap" style={{ marginBottom:12 }}>Africa's Strongest Decade of Wealth Growth</div>
        <div style={{ fontFamily:'var(--F)',fontSize:'clamp(64px,10vw,136px)',fontWeight:300,fontStyle:'italic',color:'var(--gold)',lineHeight:1,marginBottom:14 }}>+67%</div>
        <p style={{ fontFamily:'var(--F)',fontSize:'clamp(14px,1.4vw,17px)',fontStyle:'italic',color:'var(--T2)',maxWidth:400,margin:'0 auto 30px',lineHeight:1.82 }}>
          Total investable wealth growth, Mauritius 2015–2025.
        </p>
        <a href="#contact" className="btn bg">Request Investment Brief</a>
      </div>
    </section>
  )
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  const { ref, visible } = useInView()
  return (
    <section id="contact" style={{ background:'var(--D)',borderTop:'1px solid var(--BL)' }}>
      <div ref={ref} className="c2" style={{ display:'grid',gridTemplateColumns:'1fr 1fr',minHeight:'70vh' }}>
        <div style={{ padding:'clamp(56px,7vw,100px) clamp(36px,5.5vw,80px)',display:'flex',flexDirection:'column',justifyContent:'center',borderRight:'1px solid var(--BL)' }}>
          <div style={{ opacity:visible?1:0,transform:visible?'none':'translateY(12px)',transition:'all 1s ease 0.1s' }}>
            <div className="cap" style={{ marginBottom:18 }}>Private Access Only</div>
            <h2 style={{ fontFamily:'var(--F)',fontSize:'clamp(24px,3.5vw,50px)',fontWeight:300,fontStyle:'italic',lineHeight:1.12,marginBottom:18,color:'var(--T)' }}>Arrange a<br />Private Viewing</h2>
            <p style={{ fontFamily:'var(--F)',fontSize:'clamp(13px,1.3vw,16px)',fontStyle:'italic',lineHeight:1.85,color:'var(--T2)',maxWidth:320,marginBottom:30 }}>
              All seven estates available by private appointment. Advisors reachable around the clock.
            </p>
            <div className="cap" style={{ fontSize:8,color:'var(--T3)',lineHeight:2.2 }}>hello@edenestates.mu<br />+230 5000 0000</div>
          </div>
        </div>
        <div style={{ padding:'clamp(56px,7vw,100px) clamp(36px,5.5vw,80px)',display:'flex',flexDirection:'column',justifyContent:'center',opacity:visible?1:0,transition:'opacity 1s ease 0.3s' }}>
          <div style={{ display:'flex',flexDirection:'column',gap:22 }}>
            {[{pl:'Full Name',t:'text'},{pl:'Email Address',t:'email'},{pl:'Phone · WhatsApp',t:'tel'},{pl:'Country of Residence',t:'text'}].map(({pl,t}) => (
              <input key={pl} type={t} placeholder={pl} />
            ))}
            <textarea placeholder="Your enquiry or preferred dates" rows={3} style={{ resize:'none' }} />
            <a href="mailto:hello@edenestates.mu" className="btn bg" style={{ textAlign:'center',marginTop:6 }}>Submit Enquiry</a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background:'var(--K)',borderTop:'1px solid var(--BL)',padding:'clamp(20px,3vw,40px) clamp(40px,6vw,96px)',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12 }}>
      <span style={{ fontFamily:'var(--F)',fontSize:13,fontWeight:300,fontStyle:'italic',letterSpacing:'0.18em',color:'var(--T3)' }}>ÉDEN ESTATES</span>
      <span className="cap" style={{ fontSize:7,color:'var(--T3)' }}>© 2026 · Grand Baie, Mauritius</span>
      <span className="cap" style={{ fontSize:7,color:'var(--T3)' }}>7 Boutique Villas · From £1,250,000</span>
    </footer>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
function HomePage() {
  return (
    <>
      <Styles />
      <Curtain />
      <Cursor />
      <PBar />
      <Nav />

      {/* HERO — darkens/fades as you scroll into the next image */}
      <Hero />

      {/* Post-hero cinematic scenes — each darkens on exit */}
      <Scene src={IMG.entrance} label="Arrival"       caption="The estate reveals itself — unhurried, deliberate"   objPos="center 40%" />
      <Scene src={IMG.window}   label="The View"      caption="Light and landscape, held in a single frame"          objPos="center 50%" />
      <Scene src={IMG.seaView2} label="The Horizon"   caption="Unobstructed. Uncompromising. Yours."                 objPos="center 35%" id="estate" />

      {/* Estate */}
      <Specs />
      <Panel src={IMG.interior}  eyebrow="The Estate"  title="Designed to disappear"        sub="Architecture that serves the view, not itself." />
      <Panel src={IMG.spaEntry}  eyebrow="Blue Hour"   title="The pool at dusk"             sub="Salt air. Candlelight. The horizon on fire." align="center" dim={0.42} />

      {/* Villas */}
      <Villas />

      {/* Loro Piana Interiors */}
      <LoroPiana />

      {/* Quote */}
      <Quote text="The rarest addresses are not found. They are recognised." attr="Éden Estates · Grand Baie, Mauritius" />

      {/* Island */}
      <Island />

      {/* Helicopter transfers */}
      <Helicopter />

      {/* Quote 2 */}
      <Quote text="Not merely a home. A permanent address in the world's most tax-efficient paradise." attr="Permanent Residence Permit included · From £1,250,000" />

      {/* Wellness — opening image is Spa 2.png */}
      <WellnessDescent />
      <Wellness />

      {/* Investment infographic */}
      <InvestmentInfographic />

      {/* Stats */}
      <Stats />

      {/* Investment text */}
      <Investment />

      {/* Contact */}
      <Contact />
      <Footer />
    </>
  )
}
