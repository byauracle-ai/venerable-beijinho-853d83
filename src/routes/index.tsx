import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react'

export const Route = createFileRoute('/')({
  component: HomePage,
})

// ─── All images from /public folder ──────────────────────────────────────────
// Files must exist in your project's /public directory
const IMGS = {
  stair:    '/iron-wood-house-earth-lines-architects_18.jpg',
  entrance: '/entrance.jpg',
  window:   '/window.jpg',
  interior: '/interior.jpg',
  pool2:    '/infinity pool 2.jpg',
  pool:     '/infinity pool.jpg',
  living:   '/Screenshot 2026-05-14 201935.png',
  dining:   '/Screenshot 2026-05-14 202012.png',
  master:   '/Screenshot 2026-05-14 202036.png',
  detail:   '/Screenshot 2026-05-14 202054.png',
  spa1:     '/spa1.jpg',
  spa2:     '/spa2.jpg',
  island:   '/grok-image-86070f82-2171-4501-8fe6-d6f72d7d1dcb.png',
  pool3:    '/205032606_4198387713573399_8106792087768550505_n.jpg',
  teak:     '/teak.jpg',
  basalt:   '/basalt.jpg',
  marble:   '/calcatta.jpg',
  linen:    '/linen.jpg',
  brass:    '/brass.jpg',
}

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true) },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

function useScrollRatio(ref: React.RefObject<HTMLDivElement>) {
  const [p, setP] = useState(0)
  useEffect(() => {
    const fn = () => {
      const el = ref.current; if (!el) return
      const rect = el.getBoundingClientRect()
      const total = el.offsetHeight - window.innerHeight
      setP(Math.min(1, Math.max(0, -rect.top / total)))
    }
    window.addEventListener('scroll', fn, { passive: true })
    fn()
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return p
}

function useCountUp(target: number, active: boolean, duration = 2000, dec = 0) {
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
  }, [active])
  return val
}

// ─── Global styles ────────────────────────────────────────────────────────────
function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Cinzel:wght@400;500&family=Jost:wght@200;300;400&display=swap');

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

      :root {
        --black:  #050507;
        --ink:    #09090e;
        --deep:   #0d0d14;
        --spa:    #040408;
        --gold:   #c4a05a;
        --gold2:  #dcc07e;
        --stone:  #f0ece4;
        --smoke:  #9a9488;
        --ash:    #5a5650;
        --bl:     rgba(196,160,90,0.1);
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
      }

      /* Film grain */
      body::after {
        content: ''; position: fixed; inset: 0; pointer-events: none; z-index: 9000;
        opacity: 0.022;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        background-size: 180px;
      }

      .cap {
        font-family: var(--G); font-size: 9px; font-weight: 300;
        letter-spacing: 0.36em; text-transform: uppercase; color: var(--gold);
      }
      .nav-a {
        font-family: var(--G); font-size: 10px; letter-spacing: 0.2em;
        text-transform: uppercase; color: var(--smoke); text-decoration: none;
        font-weight: 300; transition: color 0.35s;
      }
      .nav-a:hover { color: var(--gold2); }

      .btn {
        display: inline-block; font-family: var(--G); font-size: 9px;
        font-weight: 300; letter-spacing: 0.3em; text-transform: uppercase;
        text-decoration: none; padding: 13px 32px;
        transition: all 0.45s ease; cursor: pointer; border: none; outline: none;
      }
      .btn-gold   { background: var(--gold); color: var(--black); }
      .btn-gold:hover { background: var(--gold2); box-shadow: 0 6px 36px rgba(196,160,90,0.3); }
      .btn-line   { background: transparent; border: 1px solid rgba(196,160,90,0.32); color: var(--stone); }
      .btn-line:hover { border-color: var(--gold); color: var(--gold2); background: rgba(196,160,90,0.05); }
      .btn-dark   { background: var(--stone); color: var(--black); }
      .btn-dark:hover { background: var(--gold2); }

      input, textarea {
        font-family: var(--G); font-size: 13px; font-weight: 300; letter-spacing: 0.06em;
        background: transparent; border: none; border-bottom: 1px solid rgba(196,160,90,0.18);
        color: var(--stone); padding: 14px 0; width: 100%; outline: none; transition: border-color 0.35s;
      }
      input:focus, textarea:focus { border-color: var(--gold); }
      input::placeholder, textarea::placeholder { color: var(--ash); }

      /* Progress bar */
      #pbar { position: fixed; top: 0; left: 0; height: 1px; background: var(--gold); z-index: 8000; }

      @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
      @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
      @keyframes pulse  { 0%,100%{opacity:0.25;transform:scaleY(0.4)} 50%{opacity:0.8;transform:scaleY(1)} }
      @keyframes kb     { from{transform:scale(1)} to{transform:scale(1.05)} }

      @media (max-width: 768px) {
        .hide-m { display: none !important; }
        .col2   { grid-template-columns: 1fr !important; }
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
  return <div id="pbar" style={{ width: `${w}%` }} />
}

// ─── Custom cursor ────────────────────────────────────────────────────────────
function Cursor() {
  const dot  = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const pos  = useRef({ x: -200, y: -200 })
  const lag  = useRef({ x: -200, y: -200 })

  useEffect(() => {
    document.body.style.cursor = 'none'
    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dot.current) {
        dot.current.style.transform = `translate(${e.clientX}px,${e.clientY}px) translate(-50%,-50%)`
        dot.current.style.opacity = '1'
      }
      const t = e.target as HTMLElement
      const onBtn = !!t.closest('a,button,.btn')
      const onImg = !!t.closest('img,section')
      if (ring.current) {
        ring.current.style.width  = onImg ? '52px' : '26px'
        ring.current.style.height = onImg ? '52px' : '26px'
        ring.current.style.borderColor = onBtn ? 'var(--gold2)' : 'rgba(196,160,90,0.4)'
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
    window.addEventListener('mousemove', move)
    return () => {
      document.body.style.cursor = ''
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={dot} style={{ position:'fixed',top:0,left:0,width:6,height:6,borderRadius:'50%',background:'var(--gold)',pointerEvents:'none',zIndex:9999,opacity:0,willChange:'transform' }} />
      <div ref={ring} style={{ position:'fixed',top:0,left:0,width:26,height:26,borderRadius:'50%',border:'1px solid rgba(196,160,90,0.4)',pointerEvents:'none',zIndex:9998,willChange:'transform',transition:'width 0.4s,height 0.4s,border-color 0.3s' }} />
    </>
  )
}

// ─── Load curtain ─────────────────────────────────────────────────────────────
function Curtain() {
  const [opacity, setOpacity] = useState(1)
  const [gone, setGone] = useState(false)
  useEffect(() => {
    const t1 = setTimeout(() => setOpacity(0), 400)
    const t2 = setTimeout(() => setGone(true), 1400)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])
  if (gone) return null
  return (
    <div style={{ position:'fixed',inset:0,background:'#050507',zIndex:9990,opacity,transition:'opacity 1s ease',pointerEvents:'none' }} />
  )
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
      position:'fixed',top:0,left:0,right:0,zIndex:5000,height:68,
      display:'flex',alignItems:'center',justifyContent:'space-between',
      padding:'0 clamp(24px,5vw,72px)',
      background: scrolled ? 'rgba(5,5,7,0.9)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: `1px solid ${scrolled ? 'rgba(196,160,90,0.08)' : 'transparent'}`,
      transition:'background 0.5s,border-color 0.5s',
    }}>
      <a href="/" style={{ textDecoration:'none' }}>
        <div style={{ fontFamily:'var(--F)',fontSize:18,fontWeight:300,letterSpacing:'0.22em',color:'var(--stone)',lineHeight:1 }}>ÉDEN ESTATES</div>
        <div className="cap" style={{ fontSize:7,letterSpacing:'0.4em',marginTop:3 }}>Mauritius · Est. 2018</div>
      </a>
      <div className="hide-m" style={{ display:'flex',alignItems:'center',gap:44 }}>
        {[['Estate','#estate'],['Villas','#villas'],['Island','#island'],['Wellness','#wellness'],['Invest','#investment'],['Contact','#contact']].map(([l,h]) => (
          <a key={l} href={h} className="nav-a">{l}</a>
        ))}
        <a href="#contact" className="btn btn-line" style={{ fontSize:8,padding:'9px 20px' }}>Enquire</a>
      </div>
    </nav>
  )
}

// ─── Cinematic descent — ONE sticky section, 6 scenes ─────────────────────────
const SCENES = [
  { src: IMGS.stair,    label: null,            caption: null,                                                    pos: 'center 25%' },
  { src: IMGS.entrance, label: 'Arrival',       caption: 'A private approach through tropical canopy',             pos: 'center 40%' },
  { src: IMGS.window,   label: 'The View',      caption: 'Light and landscape — held in a single frame',           pos: 'center 50%' },
  { src: IMGS.interior, label: 'Interior',      caption: 'Every surface chosen. Every detail earned.',             pos: 'center 35%' },
  { src: IMGS.pool2,    label: 'Infinity Edge', caption: 'Where the pool dissolves into the Indian Ocean',         pos: 'center 45%' },
  { src: IMGS.pool,     label: 'The Pool',      caption: 'Blue hour. Salt air. Total silence.',                    pos: 'center 40%' },
]

function Descent() {
  const ref = useRef<HTMLDivElement>(null)
  const [p, setP] = useState(0) // 0→1 across entire container

  useEffect(() => {
    const fn = () => {
      const el = ref.current; if (!el) return
      const rect = el.getBoundingClientRect()
      const total = el.offsetHeight - window.innerHeight
      setP(Math.min(1, Math.max(0, -rect.top / total)))
    }
    window.addEventListener('scroll', fn, { passive: true }); fn()
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const n = SCENES.length
  const raw = p * n
  const idx = Math.min(n - 1, Math.floor(raw))
  const sp  = raw - idx  // 0→1 within current scene

  // Transition: last 30% exit → dark+blur, first 30% entry → clear
  const exit  = sp > 0.7  ? (sp - 0.7) / 0.3  : 0
  const entry = sp < 0.3  ? 1 - sp / 0.3        : 0
  const dark  = Math.max(exit, entry)
  const blur  = dark * 16

  // Caption mid-scene
  const capO = sp > 0.32 && sp < 0.75
    ? Math.min(1, (sp - 0.32) / 0.12, (0.75 - sp) / 0.1)
    : 0

  // Hero text on scene 0
  const heroO = idx === 0 ? Math.max(0, 1 - sp * 4) : 0

  // Staircase gets darker from bottom as you scroll (descent feel)
  const stairGrad = idx === 0 ? Math.min(0.9, sp * 2) : 0

  const scene = SCENES[idx]
  const next  = SCENES[idx + 1]

  return (
    // Container: 6 scenes × 150vh = 900vh total — enough to feel cinematic but not endless
    <div ref={ref} id="estate" style={{ height:`${n * 150}vh`, position:'relative' }}>
      <div style={{ position:'sticky',top:0,height:'100dvh',overflow:'hidden',background:'#000' }}>

        {/* Current image */}
        <img
          key={idx}
          src={scene.src}
          alt={scene.label ?? 'Villa Azur'}
          style={{
            position:'absolute',inset:0,width:'100%',height:'100%',
            objectFit:'cover',objectPosition:scene.pos,
            filter:`blur(${blur}px)`,
            transform:`scale(${1 + blur * 0.006})`,
            willChange:'filter,transform',
          }}
        />

        {/* Staircase bottom darkening */}
        {idx === 0 && (
          <div style={{ position:'absolute',inset:0,pointerEvents:'none',
            background:`linear-gradient(to top, rgba(3,3,8,${stairGrad}) 0%, transparent 55%)` }} />
        )}

        {/* Preload next */}
        {next && <img key={`pre${idx}`} src={next.src} alt="" style={{ position:'absolute',width:1,height:1,opacity:0,pointerEvents:'none' }} />}

        {/* Scroll-driven dark overlay */}
        <div style={{ position:'absolute',inset:0,background:`rgba(3,3,6,${dark})`,pointerEvents:'none' }} />

        {/* Bottom vignette always */}
        <div style={{ position:'absolute',inset:0,pointerEvents:'none',
          background:'linear-gradient(to top, rgba(5,5,7,0.8) 0%, transparent 42%)' }} />

        {/* HERO text — scene 0 */}
        <div style={{ position:'absolute',bottom:'clamp(72px,9vw,120px)',left:'clamp(40px,6vw,96px)',opacity:heroO,maxWidth:680,pointerEvents:heroO > 0.1 ? 'all' : 'none' }}>
          <div className="cap" style={{ marginBottom:20,fontSize:8 }}>Grand Baie · North Coast · Mauritius</div>
          <h1 style={{ fontFamily:'var(--H)',fontSize:'clamp(16px,2vw,28px)',fontWeight:400,letterSpacing:'0.28em',textTransform:'uppercase',color:'var(--stone)',margin:'0 0 18px',lineHeight:1.4 }}>
            Descend into luxury
          </h1>
          <div style={{ width:44,height:1,background:'var(--gold)',opacity:0.5,marginBottom:22 }} />
          <p style={{ fontFamily:'var(--F)',fontSize:'clamp(14px,1.5vw,17px)',fontStyle:'italic',color:'rgba(240,236,228,0.55)',maxWidth:380,lineHeight:1.8,marginBottom:32 }}>
            Boutique villas of singular distinction. Permanent residency. From £1,250,000.
          </p>
          <div style={{ display:'flex',gap:12,flexWrap:'wrap' }}>
            <a href="#villas" className="btn btn-gold">Explore Villas</a>
            <a href="#contact" className="btn btn-line">Private Viewing</a>
          </div>
        </div>

        {/* Yield badge — scene 0 */}
        <div style={{ position:'absolute',top:88,right:'clamp(24px,5vw,72px)',opacity:heroO,pointerEvents:'none',
          borderTop:'1px solid rgba(196,160,90,0.25)',borderBottom:'1px solid rgba(196,160,90,0.25)',
          padding:'16px 24px',textAlign:'center',background:'rgba(5,5,7,0.5)',backdropFilter:'blur(12px)' }}>
          <div className="cap" style={{ fontSize:7,marginBottom:7 }}>Est. Gross Yield</div>
          <div style={{ fontFamily:'var(--F)',fontSize:36,fontWeight:300,lineHeight:1,color:'var(--gold)' }}>9%</div>
          <div style={{ fontFamily:'var(--F)',fontSize:10,fontStyle:'italic',color:'var(--ash)',marginTop:4 }}>short-term rental</div>
        </div>

        {/* Scene caption — scenes 1–5 */}
        {scene.label && (
          <div style={{ position:'absolute',bottom:'clamp(52px,7vh,88px)',left:'clamp(40px,6vw,96px)',opacity:capO,
            transform:`translateY(${(1-Math.min(1,capO*3))*8}px)`,pointerEvents:'none',maxWidth:540 }}>
            <div className="cap" style={{ marginBottom:12,fontSize:8 }}>{scene.label}</div>
            <p style={{ fontFamily:'var(--F)',fontSize:'clamp(20px,2.8vw,42px)',fontStyle:'italic',fontWeight:300,color:'var(--stone)',lineHeight:1.2 }}>
              {scene.caption}
            </p>
          </div>
        )}

        {/* Counter — scenes 1+ */}
        {idx > 0 && (
          <div className="cap" style={{ position:'absolute',top:28,left:'clamp(28px,4vw,56px)',fontSize:8,color:'rgba(196,160,90,0.3)',opacity:capO }}>
            {String(idx).padStart(2,'0')} / {String(n-1).padStart(2,'0')}
          </div>
        )}

        {/* Scroll cue — scene 0 */}
        <div style={{ position:'absolute',bottom:52,left:'50%',transform:'translateX(-50%)',opacity:heroO * 0.7,pointerEvents:'none',
          display:'flex',flexDirection:'column',alignItems:'center',gap:8 }}>
          <div className="cap" style={{ fontSize:7 }}>Scroll</div>
          <div style={{ width:1,height:44,background:'linear-gradient(to bottom,var(--gold),transparent)',animation:'pulse 2s ease infinite' }} />
        </div>

        {/* Progress line */}
        <div style={{ position:'absolute',bottom:0,left:0,right:0,height:1,background:'rgba(196,160,90,0.07)' }}>
          <div style={{ height:'100%',background:'var(--gold)',width:`${p*100}%` }} />
        </div>

        {/* Scene dots */}
        <div style={{ position:'absolute',bottom:16,left:'50%',transform:'translateX(-50%)',display:'flex',gap:8 }}>
          {SCENES.map((_,i) => (
            <div key={i} style={{ width:i===idx?18:4,height:1,background:i===idx?'var(--gold)':'rgba(196,160,90,0.18)',transition:'all 0.4s' }} />
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Full-bleed section ───────────────────────────────────────────────────────
function Panel({ src, eyebrow, title, sub, align='left', objPos='center', dim=0.45, id }: {
  src:string; eyebrow?:string; title:string; sub?:string
  align?:'left'|'center'|'right'; objPos?:string; dim?:number; id?:string
}) {
  const { ref, inView } = useInView(0.1)
  const a = align==='center' ? {textAlign:'center' as const,left:0,right:0}
          : align==='right'  ? {textAlign:'right'  as const,right:'clamp(40px,7vw,120px)'}
          :                    {left:'clamp(40px,7vw,120px)'}
  return (
    <section id={id} style={{ height:'100dvh',position:'relative',overflow:'hidden',display:'flex',flexDirection:'column',justifyContent:'flex-end' }}>
      <img src={src} alt={title} loading="lazy" style={{ position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',objectPosition:objPos }} />
      <div style={{ position:'absolute',inset:0,background:`linear-gradient(to top,rgba(5,5,7,${dim+0.4}) 0%,rgba(5,5,7,${dim*0.2}) 48%,transparent 100%)` }} />
      <div ref={ref} style={{
        position:'relative',zIndex:2,
        padding:'clamp(40px,6vw,96px)',paddingBottom:'clamp(56px,7vw,96px)',
        ...a,
        opacity:inView?1:0,transform:inView?'none':'translateY(18px)',
        transition:'opacity 1.4s ease,transform 1.4s ease',
      }}>
        {eyebrow && <div className="cap" style={{ marginBottom:16 }}>{eyebrow}</div>}
        <h2 style={{ fontFamily:'var(--F)',fontSize:'clamp(32px,5vw,78px)',fontWeight:300,fontStyle:'italic',lineHeight:1.06,color:'var(--stone)',margin:0 }}>{title}</h2>
        {sub && <p style={{ fontFamily:'var(--F)',fontSize:'clamp(14px,1.5vw,18px)',fontStyle:'italic',color:'rgba(240,236,228,0.58)',marginTop:16,maxWidth:460,lineHeight:1.75,...(align==='center'?{margin:'16px auto 0',display:'block'}:{}) }}>{sub}</p>}
      </div>
    </section>
  )
}

// ─── Dark text section ────────────────────────────────────────────────────────
function Dark({ eyebrow, title, body, center=false, id, children }: {
  eyebrow?:string; title?:string; body?:string; center?:boolean; id?:string; children?:React.ReactNode
}) {
  const { ref, inView } = useInView(0.15)
  return (
    <section id={id} style={{ background:'var(--ink)',padding:'clamp(72px,9vw,130px) clamp(40px,6vw,96px)',textAlign:center?'center':'left' }}>
      <div ref={ref} style={{ maxWidth:center?680:900,margin:center?'0 auto':undefined,
        opacity:inView?1:0,transform:inView?'none':'translateY(20px)',transition:'opacity 1.2s,transform 1.2s' }}>
        {eyebrow && <div className="cap" style={{ marginBottom:20 }}>{eyebrow}</div>}
        {title && <h2 style={{ fontFamily:'var(--F)',fontSize:'clamp(28px,4vw,62px)',fontWeight:300,fontStyle:'italic',lineHeight:1.1,color:'var(--stone)',marginBottom:body?24:0 }}>{title}</h2>}
        {body && <p style={{ fontFamily:'var(--F)',fontSize:'clamp(15px,1.5vw,18px)',fontStyle:'italic',color:'var(--smoke)',lineHeight:1.85 }}>{body}</p>}
        {children}
      </div>
    </section>
  )
}

// ─── Specs bar ────────────────────────────────────────────────────────────────
function Specs() {
  const { ref, inView } = useInView()
  const items = [{v:'5',l:'Bedrooms'},{v:'6',l:'Bathrooms'},{v:'820m²',l:'Interior'},{v:'2,400m²',l:'Land'},{v:'£3.75M',l:'Asking Price'},{v:'9%',l:'Gross Yield'}]
  return (
    <div ref={ref} style={{ display:'grid',gridTemplateColumns:'repeat(6,1fr)',borderTop:'1px solid var(--bl)',borderBottom:'1px solid var(--bl)',background:'var(--black)' }}>
      {items.map(({v,l},i) => (
        <div key={l} style={{ padding:'clamp(32px,4vw,60px) clamp(16px,2.5vw,36px)',borderLeft:i>0?'1px solid var(--bl)':'none',
          opacity:inView?1:0,transform:inView?'none':'translateY(14px)',transition:`all 0.85s ease ${i*0.08}s` }}>
          <div style={{ fontFamily:'var(--F)',fontSize:'clamp(24px,3vw,48px)',fontWeight:300,fontStyle:'italic',color:'var(--gold)',lineHeight:1,marginBottom:8 }}>{v}</div>
          <div className="cap" style={{ fontSize:8,color:'var(--ash)' }}>{l}</div>
        </div>
      ))}
    </div>
  )
}

// ─── Villa tiers ──────────────────────────────────────────────────────────────
const TIERS = [
  { name:'Maison Lagon',  loc:'Trou aux Biches, West Coast', price:'£1,250,000', tag:'Entry',    beds:3, baths:4, sqm:380, yld:'6.8%', desc:'Steps from Mauritius\'s most celebrated lagoon. Fully furnished, income-generating from day one.', img:IMGS.dining },
  { name:'Domaine Noir',  loc:'Bel Ombre, South Coast',      price:'£2,100,000', tag:'Collector',beds:4, baths:5, sqm:640, yld:'7.5%', desc:'Monolithic basalt, 22-metre lap pool, 1.4 hectares of private nature reserve on an untouched coastline.', img:IMGS.pool },
  { name:'Villa Azur',    loc:'Grand Baie, North Coast',      price:'£3,750,000', tag:'Flagship', beds:5, baths:6, sqm:820, yld:'9%',   desc:'Five en-suite suites, infinity pool, private beach, wine cellar, spa suite, dedicated concierge.', img:IMGS.pool3 },
]

function VillaTiers() {
  const [active, setActive] = useState(1)
  const { ref, inView } = useInView(0.08)
  const t = TIERS[active]
  return (
    <section id="villas" ref={ref} style={{ background:'var(--deep)',borderTop:'1px solid var(--bl)' }}>
      <div style={{ padding:'clamp(64px,8vw,110px) clamp(40px,6vw,96px) 0',
        opacity:inView?1:0,transform:inView?'none':'translateY(14px)',transition:'all 0.9s' }}>
        <div className="cap" style={{ marginBottom:14 }}>Exclusive Portfolio</div>
        <h2 style={{ fontFamily:'var(--F)',fontSize:'clamp(28px,4vw,58px)',fontWeight:300,fontStyle:'italic',color:'var(--stone)',marginBottom:40 }}>Three estates. One island.</h2>
        <div style={{ display:'flex',borderBottom:'1px solid var(--bl)',gap:0 }}>
          {TIERS.map((tier,i) => (
            <button key={tier.name} onClick={()=>setActive(i)} style={{
              fontFamily:'var(--G)',fontSize:9,fontWeight:300,letterSpacing:'0.24em',textTransform:'uppercase',
              background:'none',border:'none',cursor:'pointer',padding:'13px 28px 13px 0',
              color:active===i?'var(--gold)':'var(--ash)',
              borderBottom:active===i?'1px solid var(--gold)':'1px solid transparent',
              marginBottom:-1,transition:'all 0.3s',
            }}>{tier.name}</button>
          ))}
        </div>
      </div>

      <div key={active} style={{ display:'grid',gridTemplateColumns:'1fr 1fr',minHeight:'68vh',animation:'fadeIn 0.5s ease forwards' }} className="col2">
        <div style={{ position:'relative',overflow:'hidden',minHeight:360 }}>
          <img src={t.img} alt={t.name} style={{ width:'100%',height:'100%',objectFit:'cover' }} />
          <div style={{ position:'absolute',top:18,left:18 }}>
            <div style={{ background:'var(--gold)',color:'var(--black)',fontFamily:'var(--G)',fontSize:8,letterSpacing:'0.26em',textTransform:'uppercase',padding:'5px 12px' }}>{t.tag}</div>
          </div>
        </div>
        <div style={{ padding:'clamp(44px,5vw,88px)',display:'flex',flexDirection:'column',justifyContent:'center',background:'var(--ink)' }}>
          <div className="cap" style={{ marginBottom:10,fontSize:8,color:'var(--ash)' }}>{t.loc}</div>
          <h3 style={{ fontFamily:'var(--F)',fontSize:'clamp(24px,3vw,46px)',fontWeight:300,fontStyle:'italic',color:'var(--stone)',marginBottom:6,lineHeight:1.1 }}>{t.name}</h3>
          <div style={{ fontFamily:'var(--F)',fontSize:'clamp(18px,2vw,30px)',fontWeight:300,color:'var(--gold)',marginBottom:26 }}>{t.price}</div>
          <div style={{ display:'flex',gap:24,marginBottom:24,paddingBottom:24,borderBottom:'1px solid var(--bl)' }}>
            {[{v:t.beds,l:'Beds'},{v:t.baths,l:'Baths'},{v:`${t.sqm}m²`,l:'Interior'},{v:t.yld,l:'Yield'}].map(({v,l}) => (
              <div key={l}>
                <div style={{ fontFamily:'var(--F)',fontSize:'clamp(16px,1.8vw,24px)',fontWeight:300,fontStyle:'italic',color:'var(--stone)',lineHeight:1 }}>{v}</div>
                <div className="cap" style={{ fontSize:7,color:'var(--ash)',marginTop:4 }}>{l}</div>
              </div>
            ))}
          </div>
          <p style={{ fontFamily:'var(--F)',fontSize:'clamp(13px,1.3vw,16px)',fontStyle:'italic',lineHeight:1.85,color:'var(--smoke)',marginBottom:32 }}>{t.desc}</p>
          <div style={{ display:'flex',gap:10,marginBottom:24 }}>
            <a href="#contact" className="btn btn-gold" style={{ fontSize:8,padding:'11px 24px' }}>Request Brochure</a>
            <a href="#contact" className="btn btn-line" style={{ fontSize:8,padding:'11px 24px' }}>Arrange Viewing</a>
          </div>
          <div style={{ padding:'12px 16px',background:'rgba(196,160,90,0.05)',borderLeft:'2px solid var(--gold)' }}>
            <div className="cap" style={{ fontSize:7,marginBottom:4 }}>Permanent Residency Included</div>
            <div style={{ fontFamily:'var(--F)',fontSize:12,fontStyle:'italic',color:'var(--ash)',lineHeight:1.6 }}>Qualifies under EDB schemes. Buyer, spouse and dependants receive permanent residence for duration of ownership.</div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Horizontal scroll (materials) ───────────────────────────────────────────
const MATS = [
  { n:'Reclaimed Teak',     s:'Floors · Ceilings · Louvres',    d:'200-year-old Indonesian river barges. Grain patterns and silver-grey patina no fabrication can replicate.',   tex:IMGS.teak   },
  { n:'Volcanic Basalt',    s:'Walls · Pool · Columns',         d:'Quarried from the Mauritian interior. 600mm slabs honed to satin — cool to the touch at every hour.',          tex:IMGS.basalt },
  { n:'Calacatta Oro',      s:'Kitchen · Bathrooms · Vanities', d:'Single slab selected at the Carrara quarry. Gold veining matched across every surface. No two pieces alike.',   tex:IMGS.marble },
  { n:'Belgian Linen',      s:'Bedding · Drapes · Day beds',    d:'400-thread stonewashed, laundered in rainwater collected on site. 280gsm — luxurious yet effortless.',          tex:IMGS.linen  },
  { n:'Unlacquered Brass',  s:'Hardware · Fixtures · Lighting', d:'Single Burgundy foundry. Left to develop its own patina through the first year of residence.',                  tex:IMGS.brass  },
]

function Materials() {
  const container = useRef<HTMLDivElement>(null)
  const track     = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const { ref: hRef, inView } = useInView(0.05)

  useEffect(() => {
    let cur = 0, target = 0, raf: number
    const maxX = () => (track.current?.scrollWidth ?? 0) - window.innerWidth

    const animate = () => {
      cur += (target - cur) * 0.07
      if (track.current) track.current.style.transform = `translateX(${-cur}px)`
      setActive(Math.round((cur / maxX()) * (MATS.length - 1)))
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    const onScroll = () => {
      const el = container.current; if (!el) return
      const rect = el.getBoundingClientRect()
      const sticky = el.offsetHeight - window.innerHeight
      const prog = Math.min(1, Math.max(0, -rect.top / sticky))
      target = prog * maxX()
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf) }
  }, [])

  return (
    <section style={{ background:'var(--ink)',borderTop:'1px solid var(--bl)' }}>
      <div ref={hRef} style={{ padding:'clamp(64px,8vw,110px) clamp(40px,6vw,96px) clamp(48px,6vw,80px)',borderBottom:'1px solid var(--bl)',
        opacity:inView?1:0,transform:inView?'none':'translateY(12px)',transition:'all 0.9s' }}>
        <div className="cap" style={{ marginBottom:12 }}>Craftsmanship</div>
        <h2 style={{ fontFamily:'var(--F)',fontSize:'clamp(26px,3.8vw,58px)',fontWeight:300,fontStyle:'italic',color:'var(--stone)' }}>The material world</h2>
      </div>

      {/* Sticky horizontal track — 5 scenes × 90vh = 450vh */}
      <div ref={container} style={{ height:`${MATS.length * 90}vh`,position:'relative' }}>
        <div style={{ position:'sticky',top:0,height:'100dvh',overflow:'hidden' }}>
          <div ref={track} style={{ display:'flex',height:'100%',willChange:'transform' }}>
            {MATS.map(({n,s,d,tex},i) => (
              <div key={n} style={{ minWidth:'100vw',height:'100%',display:'grid',gridTemplateColumns:'1fr 1fr',
                background:i%2===0?'var(--ink)':'var(--deep)',borderRight:'1px solid var(--bl)' }}>
                {/* Text */}
                <div style={{ padding:'clamp(48px,6vw,96px)',display:'flex',flexDirection:'column',justifyContent:'center' }}>
                  <div className="cap" style={{ fontSize:8,marginBottom:16,color:'rgba(196,160,90,0.4)' }}>{String(i+1).padStart(2,'0')} / {String(MATS.length).padStart(2,'0')}</div>
                  <div style={{ width:36,height:1,background:'var(--gold)',marginBottom:28,opacity:0.5 }} />
                  <h3 style={{ fontFamily:'var(--F)',fontSize:'clamp(26px,3.5vw,56px)',fontWeight:300,fontStyle:'italic',color:'var(--stone)',marginBottom:18,lineHeight:1.1 }}>{n}</h3>
                  <p style={{ fontFamily:'var(--F)',fontSize:'clamp(14px,1.5vw,18px)',fontStyle:'italic',color:'rgba(240,236,228,0.48)',lineHeight:1.85,marginBottom:22 }}>{d}</p>
                  <div className="cap" style={{ fontSize:8,color:'rgba(196,160,90,0.22)' }}>{s}</div>
                </div>
                {/* Texture image — diamond shape */}
                <div style={{ display:'flex',alignItems:'center',justifyContent:'center',padding:'clamp(40px,5vw,80px)',position:'relative' }}>
                  <div style={{ width:'clamp(200px,26vw,380px)',height:'clamp(200px,26vw,380px)',transform:'rotate(45deg)',overflow:'hidden',
                    boxShadow:'0 20px 72px rgba(0,0,0,0.7)',border:'1px solid rgba(196,160,90,0.1)',flexShrink:0 }}>
                    <img src={tex} alt={n} loading="lazy" style={{
                      width:'142%',height:'142%',objectFit:'cover',objectPosition:'center',
                      transform:'rotate(-45deg) translate(-15%,-15%)',filter:'brightness(0.72) saturate(0.85)',
                    }} />
                  </div>
                  {/* Ghost number */}
                  <div style={{ position:'absolute',right:'-0.03em',bottom:'-0.05em',fontFamily:'var(--F)',fontSize:'clamp(130px,16vw,220px)',fontWeight:300,fontStyle:'italic',color:'rgba(196,160,90,0.025)',lineHeight:1,userSelect:'none',pointerEvents:'none' }}>
                    {String(i+1).padStart(2,'0')}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Progress */}
          <div style={{ position:'absolute',bottom:0,left:0,right:0,height:1,background:'rgba(196,160,90,0.07)' }}>
            <div style={{ height:'100%',background:'var(--gold)',width:`${(active/(MATS.length-1))*100}%`,transition:'width 0.1s' }} />
          </div>
          <div style={{ position:'absolute',bottom:16,left:'50%',transform:'translateX(-50%)',display:'flex',gap:8 }}>
            {MATS.map((_,i) => (
              <div key={i} style={{ width:i===active?18:4,height:1,background:i===active?'var(--gold)':'rgba(196,160,90,0.18)',transition:'all 0.4s' }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Island section ───────────────────────────────────────────────────────────
function Island() {
  return (
    <section id="island">
      <Panel src={IMGS.island} eyebrow="Île aux Cerfs · Grand Baie" title="Minutes from one of the world's last untouched lagoons" sub="The northern lagoon of Mauritius — turquoise, warm, impossibly clear." objPos="center 30%" dim={0.5} />
      <div style={{ background:'var(--deep)',display:'grid',gridTemplateColumns:'repeat(3,1fr)',borderTop:'1px solid var(--bl)',borderBottom:'1px solid var(--bl)' }}>
        {[{v:'330',u:'days',l:'of sunshine per year'},{v:'27°',u:'avg',l:'ocean temperature'},{v:'5',u:'min',l:'to Grand Baie marina'}].map(({v,u,l},i) => (
          <div key={l} style={{ padding:'clamp(36px,4.5vw,60px)',borderRight:i<2?'1px solid var(--bl)':'none',textAlign:'center' }}>
            <div style={{ fontFamily:'var(--F)',fontSize:'clamp(30px,4vw,60px)',fontWeight:300,fontStyle:'italic',color:'var(--gold)',lineHeight:1 }}>
              {v}<span style={{ fontSize:'38%',marginLeft:4,color:'var(--ash)' }}>{u}</span>
            </div>
            <div className="cap" style={{ fontSize:8,color:'var(--ash)',marginTop:10 }}>{l}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Quote ────────────────────────────────────────────────────────────────────
function Quote({ text, attr }: { text:string; attr?:string }) {
  const { ref, inView } = useInView(0.3)
  return (
    <section ref={ref} style={{ background:'var(--ink)',padding:'clamp(88px,12vw,160px) clamp(40px,10vw,180px)',textAlign:'center',borderTop:'1px solid var(--bl)',borderBottom:'1px solid var(--bl)' }}>
      <div style={{ width:inView?40:0,height:1,background:'var(--gold)',margin:'0 auto 36px',transition:'width 1.2s ease',opacity:0.55 }} />
      <blockquote style={{ fontFamily:'var(--F)',fontSize:'clamp(20px,3.5vw,48px)',fontWeight:300,fontStyle:'italic',lineHeight:1.3,color:'var(--stone)',maxWidth:800,margin:'0 auto',
        opacity:inView?1:0,transform:inView?'none':'translateY(12px)',transition:'all 1.4s ease 0.2s' }}>
        "{text}"
      </blockquote>
      {attr && <div className="cap" style={{ marginTop:32,fontSize:8,color:'var(--ash)',opacity:inView?1:0,transition:'opacity 1s ease 0.8s' }}>{attr}</div>}
    </section>
  )
}

// ─── Wellness descent ─────────────────────────────────────────────────────────
function WellnessDescent() {
  const ref = useRef<HTMLDivElement>(null)
  const p = useScrollRatio(ref)
  const dark  = p < 0.5 ? 0 : Math.min(1,(p-0.5)/0.42)
  const txt   = p < 0.65 ? 0 : Math.min(1,(p-0.65)*7)
  const blur  = dark * 14
  return (
    <div ref={ref} style={{ minHeight:'140dvh',position:'relative',overflow:'hidden' }}>
      <img src={IMGS.interior} alt="Wellness descent" style={{
        width:'100%',height:'100%',objectFit:'cover',objectPosition:'center 30%',
        position:'absolute',inset:0,
        filter:`blur(${blur}px)`,
        transform:`scale(${1+p*0.05+blur*0.004})`,
      }} />
      <div style={{ position:'absolute',inset:0,background:`rgba(3,3,8,${dark})` }} />
      <div style={{ position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',padding:40,opacity:txt }}>
        <div className="cap" style={{ marginBottom:20,letterSpacing:'0.44em' }}>Descend · Restore · Transcend</div>
        <h2 style={{ fontFamily:'var(--F)',fontSize:'clamp(28px,5vw,64px)',fontWeight:300,fontStyle:'italic',color:'var(--stone)',lineHeight:1.1 }}>
          The Wellness<br />
          <span style={{ background:'linear-gradient(90deg,var(--gold),var(--gold2),var(--gold))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text' }}>Sanctuary</span>
        </h2>
      </div>
    </div>
  )
}

// ─── Wellness section ─────────────────────────────────────────────────────────
function Wellness() {
  const { ref, inView } = useInView()
  return (
    <section id="wellness" style={{ background:'var(--spa)' }}>
      <Dark eyebrow="In-Residence Wellness" title="The Spa Sanctuary" body="Ancient Mauritian healing traditions, reborn in volcanic stone and total silence." center />
      <Panel src={IMGS.spa1} eyebrow="Concierge" title="Your Dedicated Curator" sub="A personal wellness director — anticipating every need before it becomes one." objPos="center 30%" dim={0.5} />
      <Panel src={IMGS.spa2} eyebrow="Treatment" title="The Treatment Sanctuary" sub="Volcanic stone · Cold ocean mineral · Island botanicals." align="right" dim={0.5} />
      <div ref={ref} style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',borderTop:'1px solid rgba(196,160,90,0.05)' }}>
        {[{n:'Hydrotherapy',d:'Heated jet pool, cold plunge, mineral steam'},{n:'Body Rituals',d:'Volcanic stone · Coconut · Ayurvedic'},{n:'Yoga Pavilion',d:'Sunrise & sunset with resident instructor'},{n:'Nutrition',d:'Ayurvedic & plant-based in-villa cuisine'}].map(({n,d},i) => (
          <div key={n} style={{ padding:'clamp(32px,4vw,56px) clamp(20px,3vw,40px)',borderRight:i<3?'1px solid rgba(196,160,90,0.05)':'none',
            opacity:inView?1:0,transform:inView?'none':'translateY(12px)',transition:`all 0.85s ease ${i*0.1}s` }}>
            <div className="cap" style={{ fontSize:8,marginBottom:10 }}>{n}</div>
            <p style={{ fontFamily:'var(--F)',fontSize:14,fontStyle:'italic',color:'rgba(240,236,228,0.28)',lineHeight:1.7 }}>{d}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Counting stats ───────────────────────────────────────────────────────────
function StatNum({ target, suffix, label, note, dec=0, active, delay=0, border }: {
  target:number; suffix:string; label:string; note:string; dec?:number; active:boolean; delay?:number; border:boolean
}) {
  const [go, setGo] = useState(false)
  useEffect(() => { if (active) { const t = setTimeout(()=>setGo(true),delay); return ()=>clearTimeout(t) } }, [active,delay])
  const v = useCountUp(target, go, 2000, dec)
  return (
    <div style={{ padding:'clamp(44px,5.5vw,72px) clamp(20px,3vw,44px)',borderRight:border?'1px solid var(--bl)':'none',textAlign:'center' }}>
      <div style={{ fontFamily:'var(--F)',fontSize:'clamp(36px,5.5vw,80px)',fontWeight:300,fontStyle:'italic',lineHeight:1,color:'var(--gold)',marginBottom:10 }}>
        {dec===0?Math.round(v):v.toFixed(dec)}{suffix}
      </div>
      <div className="cap" style={{ fontSize:8,marginBottom:6 }}>{label}</div>
      <div style={{ fontFamily:'var(--F)',fontSize:12,fontStyle:'italic',color:'var(--ash)' }}>{note}</div>
    </div>
  )
}

function Stats() {
  const { ref, inView } = useInView(0.3)
  const data = [
    {target:13.89,suffix:'%',label:'RPPI Growth Q3 2025',note:'Statistics Mauritius',dec:2},
    {target:140,  suffix:'%',label:'Cumulative since 2019',note:'Property price index'},
    {target:9,    suffix:'%',label:'Gross rental yield',note:'Short-term coastal villa'},
    {target:67,   suffix:'%',label:'Wealth growth 2015–25',note:"Africa's strongest decade"},
  ]
  return (
    <section ref={ref} style={{ background:'var(--deep)',borderTop:'1px solid var(--bl)',borderBottom:'1px solid var(--bl)' }}>
      <div style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)' }}>
        {data.map((d,i) => <StatNum key={d.label} {...d} active={inView} delay={i*140} border={i<3} />)}
      </div>
    </section>
  )
}

// ─── Investment ───────────────────────────────────────────────────────────────
function Investment() {
  const { ref, inView } = useInView()
  return (
    <section id="investment" style={{ background:'var(--black)' }}>
      <div style={{ padding:'clamp(72px,9vw,130px) clamp(40px,6vw,96px) 0',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'clamp(36px,6vw,96px)' }} className="col2">
        <div ref={ref} style={{ opacity:inView?1:0,transform:inView?'none':'translateY(16px)',transition:'all 1s' }}>
          <div className="cap" style={{ marginBottom:16 }}>Market Intelligence · 2025–2026</div>
          <h2 style={{ fontFamily:'var(--F)',fontSize:'clamp(26px,3.5vw,52px)',fontWeight:300,fontStyle:'italic',lineHeight:1.1,color:'var(--stone)',marginBottom:22 }}>The case for Mauritius</h2>
          <p style={{ fontFamily:'var(--F)',fontSize:'clamp(14px,1.4vw,17px)',fontStyle:'italic',lineHeight:1.85,color:'var(--smoke)' }}>
            Five reasons converge: capital appreciation, rental income, permanent residency, zero capital gains, and a way of life unavailable anywhere else on earth.
          </p>
        </div>
        <div style={{ borderLeft:'1px solid var(--bl)',paddingLeft:'clamp(32px,4vw,72px)',display:'flex',flexDirection:'column' }}>
          {[
            {e:'Price Appreciation',t:'8–12% forecast growth in 2026',d:'VEFA off-plan buyers lock in prices 30–60% below completed units with bank-backed guarantees.'},
            {e:'Permanent Residency',t:'Family PRP from £1.25M',d:'Buyer, spouse and all dependants. Valid for the duration of ownership. 20-year renewable.'},
            {e:'Tax Position',t:'0% CGT. 0% Estate Tax.',d:'No capital gains, no inheritance tax, no annual property tax. Full repatriation of profits.'},
            {e:'Act Before July 2026',t:'Registration duty doubles',d:'Non-citizen duty rises 5%→10% on 1 July 2026. Buy now and save significantly.'},
          ].map(({e,t,d},i) => (
            <div key={e} style={{ padding:'clamp(20px,2.5vw,32px) 0',borderBottom:'1px solid var(--bl)',
              opacity:inView?1:0,transform:inView?'none':'translateX(12px)',transition:`all 0.85s ease ${i*0.1}s` }}>
              <div className="cap" style={{ fontSize:7,marginBottom:6 }}>{e}</div>
              <div style={{ fontFamily:'var(--F)',fontSize:'clamp(14px,1.6vw,20px)',fontStyle:'italic',color:'var(--stone)',marginBottom:6 }}>{t}</div>
              <div style={{ fontFamily:'var(--F)',fontSize:13,fontStyle:'italic',color:'var(--ash)',lineHeight:1.7 }}>{d}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding:'clamp(64px,8vw,110px) clamp(40px,6vw,96px)',textAlign:'center',marginTop:'clamp(56px,7vw,90px)',borderTop:'1px solid var(--bl)' }}>
        <div className="cap" style={{ marginBottom:16 }}>Africa's Strongest Decade of Wealth Growth</div>
        <div style={{ fontFamily:'var(--F)',fontSize:'clamp(72px,11vw,148px)',fontWeight:300,fontStyle:'italic',color:'var(--gold)',lineHeight:1,marginBottom:16 }}>+67%</div>
        <p style={{ fontFamily:'var(--F)',fontSize:'clamp(14px,1.4vw,17px)',fontStyle:'italic',color:'var(--smoke)',maxWidth:420,margin:'0 auto 36px',lineHeight:1.8 }}>
          Total investable wealth growth, Mauritius 2015–2025.
        </p>
        <a href="#contact" className="btn btn-gold">Request Investment Brief</a>
      </div>
    </section>
  )
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  const { ref, inView } = useInView()
  return (
    <section id="contact" style={{ background:'var(--deep)',borderTop:'1px solid var(--bl)' }}>
      <div ref={ref} style={{ display:'grid',gridTemplateColumns:'1fr 1fr',minHeight:'76vh' }} className="col2">
        <div style={{ padding:'clamp(64px,8vw,110px) clamp(40px,6vw,88px)',display:'flex',flexDirection:'column',justifyContent:'center',borderRight:'1px solid var(--bl)' }}>
          <div style={{ opacity:inView?1:0,transform:inView?'none':'translateY(14px)',transition:'all 1s ease 0.1s' }}>
            <div className="cap" style={{ marginBottom:20 }}>Private Access Only</div>
            <h2 style={{ fontFamily:'var(--F)',fontSize:'clamp(28px,3.8vw,54px)',fontWeight:300,fontStyle:'italic',lineHeight:1.1,marginBottom:22,color:'var(--stone)' }}>Arrange a<br />Private Viewing</h2>
            <p style={{ fontFamily:'var(--F)',fontSize:'clamp(14px,1.4vw,16px)',fontStyle:'italic',lineHeight:1.85,color:'var(--smoke)',maxWidth:340,marginBottom:36 }}>
              All three estates are available by private appointment only. Advisors available around the clock.
            </p>
            <div className="cap" style={{ fontSize:8,color:'var(--ash)',lineHeight:2 }}>hello@edenestates.mu<br />+230 5000 0000</div>
          </div>
        </div>
        <div style={{ padding:'clamp(64px,8vw,110px) clamp(40px,6vw,88px)',display:'flex',flexDirection:'column',justifyContent:'center',
          opacity:inView?1:0,transition:'opacity 1s ease 0.3s' }}>
          <div style={{ display:'flex',flexDirection:'column',gap:24 }}>
            {[{p:'Full Name',t:'text'},{p:'Email Address',t:'email'},{p:'Phone · WhatsApp',t:'tel'},{p:'Country of Residence',t:'text'}].map(({p,t})=>(
              <input key={p} type={t} placeholder={p} />
            ))}
            <textarea placeholder="Your enquiry or preferred dates" rows={3} style={{ resize:'none' }} />
            <a href="mailto:hello@edenestates.mu" className="btn btn-gold" style={{ textAlign:'center',marginTop:6 }}>Submit Enquiry</a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background:'var(--black)',borderTop:'1px solid var(--bl)',padding:'clamp(24px,3.5vw,44px) clamp(40px,6vw,96px)',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12 }}>
      <span style={{ fontFamily:'var(--F)',fontSize:13,fontWeight:300,fontStyle:'italic',letterSpacing:'0.18em',color:'var(--ash)' }}>ÉDEN ESTATES</span>
      <span className="cap" style={{ fontSize:7,color:'var(--ash)' }}>© 2026 · Grand Baie, Mauritius</span>
      <span className="cap" style={{ fontSize:7,color:'var(--ash)' }}>From £1,250,000</span>
    </footer>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
function HomePage() {
  return (
    <>
      <GlobalStyles />
      <Curtain />
      <Cursor />
      <ProgressBar />
      <NavBar />

      {/* Opening cinematic — staircase + 5 villa scenes */}
      <Descent />

      {/* Estate gallery panels */}
      <Specs />
      <Panel id="estate" src={IMGS.living}  eyebrow="Living"       title="Open-Plan Living"    sub="Floor-to-ceiling glass — interior and ocean as one continuous experience." />
      <Panel             src={IMGS.dining}  eyebrow="Al Fresco"    title="The Dining Terrace"  sub="A covered pavilion for twelve. Salt air, candlelight, and the sound of nothing." align="right" />
      <Panel             src={IMGS.master}  eyebrow="Master Suite" title="Five Sanctuaries"    sub="Each bedroom — reclaimed teak, hand-laid stone, and the lagoon at the foot of your bed." align="center" dim={0.5} />
      <Panel             src={IMGS.detail}  eyebrow="Detail"       title="The Grounds"         sub="2,400m² of curated botanical landscape, tended by two full-time horticulturalists." align="right" />

      {/* Villa tiers */}
      <VillaTiers />

      {/* Materials */}
      <Materials />

      {/* Quote */}
      <Quote text="The rarest addresses are not found. They are recognised." attr="Éden Estates · Grand Baie, Mauritius" />

      {/* Island */}
      <Island />

      {/* Quote 2 */}
      <Quote text="Not merely a home. A permanent address in the world's most tax-efficient paradise. From £1,250,000." attr="Permanent Residence Permit included for buyer, spouse and dependants" />

      {/* Wellness */}
      <WellnessDescent />
      <Wellness />

      {/* Stats */}
      <Stats />

      {/* Investment */}
      <Investment />

      {/* Contact */}
      <Contact />
      <Footer />
    </>
  )
}
