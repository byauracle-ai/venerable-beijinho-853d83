import { useState, useEffect, useRef } from "react"

// ─── Image base ───────────────────────────────────────────────────────────────
const PUB = 'https://raw.githubusercontent.com/byauracle-ai/venerable-beijinho-853d83/main'
const p = (f) => `${PUB}/${encodeURIComponent(f)}`

const IMG = {
  hero:       p('descent.jpg'),
  entrance:   p('Entrance.png'),
  window:     p('window.png'),
  interior:   p('Interior.png'),
  pool1:      p('Infinity Pool.png'),
  pool2:      p('Infinity Pool 2.png'),
  master:     p('Master.png'),
  seaView:    p('Sea View.png'),
  seaView2:   p('Sea View 2.png'),
  penthouse:  p('Penthouse-Interior-scaled.jpg'),
  living:     p('Living Area.png'),
  outdoor:    p('Outdoor.png'),
  seaVIew:    p('Sea VIew.png'),
  screenshot: p('Screenshot 2026-05-14 202001.png'),
  spaEntry:   p('Spa Entry.png'),
  spa1:       p('Spa 1.png'),
  spa2:       p('Spa 2.png'),
  spa3:       p('Spa 3.jpg'),
}

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef(null)
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

function useCount(target, active, duration = 2200, dec = 0) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration)
      const ease = 1 - Math.pow(1 - t, 3)
      setVal(parseFloat((ease * target).toFixed(dec)))
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [active, target])
  return val
}

// ─── Global Styles ────────────────────────────────────────────────────────────
function Styles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Cinzel:wght@300;400;500&family=Jost:wght@100;200;300;400&display=swap');

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

      :root {
        --K: #04040a;
        --D: #07070e;
        --M: #0c0c18;
        --S: #0a0a14;
        --spa: #030308;
        --gold: #c8a85c;
        --gold2: #e2c882;
        --gold3: #a8883c;
        --T: #f2ede6;
        --T2: #8a8478;
        --T3: #4a4840;
        --BL: rgba(200,168,92,0.08);
        --BH: rgba(200,168,92,0.22);
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

      body::after {
        content: ''; position: fixed; inset: 0; pointer-events: none;
        z-index: 9000; opacity: 0.025;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        background-size: 160px;
      }

      .cap {
        font-family: var(--B); font-size: 9px; font-weight: 200;
        letter-spacing: 0.42em; text-transform: uppercase; color: var(--gold);
      }

      .nl { font-family: var(--B); font-size: 9px; letter-spacing: 0.24em; text-transform: uppercase; color: var(--T2); text-decoration: none; font-weight: 200; transition: color 0.4s; }
      .nl:hover { color: var(--gold2); }

      .btn { display: inline-block; font-family: var(--B); font-size: 8px; font-weight: 200; letter-spacing: 0.34em; text-transform: uppercase; text-decoration: none; padding: 13px 32px; transition: all 0.5s; cursor: none; border: none; outline: none; }
      .bg  { background: var(--gold); color: var(--K); }
      .bg:hover { background: var(--gold2); box-shadow: 0 8px 48px rgba(200,168,92,0.28); }
      .bl  { background: transparent; border: 1px solid var(--BH); color: var(--T); }
      .bl:hover { border-color: var(--gold); color: var(--gold2); background: rgba(200,168,92,0.04); }

      #pb { position: fixed; top: 0; left: 0; height: 1px; background: linear-gradient(90deg, var(--gold3), var(--gold), var(--gold2)); z-index: 8000; }

      input, textarea {
        font-family: var(--B); font-size: 13px; font-weight: 200; letter-spacing: 0.08em;
        background: transparent; border: none; border-bottom: 1px solid rgba(200,168,92,0.12);
        color: var(--T); padding: 16px 0; width: 100%; outline: none; transition: border-color 0.4s;
      }
      input:focus, textarea:focus { border-color: rgba(200,168,92,0.5); }
      input::placeholder, textarea::placeholder { color: var(--T3); letter-spacing: 0.04em; }

      @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      @keyframes pulse  { 0%,100%{opacity:0.15;transform:scaleY(0.2)} 50%{opacity:0.6;transform:scaleY(1)} }
      @keyframes breathe { 0%,100%{opacity:0.4} 50%{opacity:0.8} }
      @keyframes slideRight { from{transform:scaleX(0)} to{transform:scaleX(1)} }

      @media (max-width: 768px) {
        .hm { display: none !important; }
        .c2 { grid-template-columns: 1fr !important; }
        .c3 { grid-template-columns: 1fr !important; }
        .c4 { grid-template-columns: 1fr 1fr !important; }
        .c6 { grid-template-columns: repeat(3,1fr) !important; }
        .c7 { grid-template-columns: repeat(2,1fr) !important; }
      }
    `}</style>
  )
}

// ─── Cursor ───────────────────────────────────────────────────────────────────
function Cursor() {
  const dot  = useRef(null)
  const ring = useRef(null)
  const pos  = useRef({ x: -200, y: -200 })
  const lag  = useRef({ x: -200, y: -200 })

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dot.current) {
        dot.current.style.transform = `translate(${e.clientX}px,${e.clientY}px) translate(-50%,-50%)`
        dot.current.style.opacity = '1'
      }
      const t = e.target
      const isImg = !!t.closest('section, .img-wrap')
      const isBtn = !!t.closest('a, button')
      if (ring.current) {
        ring.current.style.width  = isImg ? '52px' : isBtn ? '32px' : '20px'
        ring.current.style.height = isImg ? '52px' : isBtn ? '32px' : '20px'
        ring.current.style.borderColor = isBtn ? 'var(--gold2)' : 'rgba(200,168,92,0.3)'
      }
    }
    let raf
    const lerp = () => {
      lag.current.x += (pos.current.x - lag.current.x) * 0.08
      lag.current.y += (pos.current.y - lag.current.y) * 0.08
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
      <div ref={dot} style={{ position:'fixed',top:0,left:0,width:4,height:4,borderRadius:'50%',background:'var(--gold)',pointerEvents:'none',zIndex:9999,opacity:0,willChange:'transform' }} />
      <div ref={ring} style={{ position:'fixed',top:0,left:0,width:20,height:20,borderRadius:'50%',border:'1px solid rgba(200,168,92,0.3)',pointerEvents:'none',zIndex:9998,willChange:'transform',transition:'width 0.5s cubic-bezier(.16,1,.3,1),height 0.5s cubic-bezier(.16,1,.3,1),border-color 0.3s' }} />
    </>
  )
}

// ─── Curtain ──────────────────────────────────────────────────────────────────
function Curtain() {
  const [opacity, setOpacity] = useState(1)
  const [gone, setGone] = useState(false)
  useEffect(() => {
    const t1 = setTimeout(() => setOpacity(0), 100)
    const t2 = setTimeout(() => setGone(true), 1400)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])
  if (gone) return null
  return <div style={{ position:'fixed',inset:0,background:'var(--K)',zIndex:9990,opacity,transition:'opacity 1.2s cubic-bezier(.4,0,.2,1)',pointerEvents:'none' }} />
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────
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
  return <div id="pb" style={{ width:`${w}%` }} />
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', fn, { passive: true }); fn()
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <nav style={{
      position:'fixed',top:0,left:0,right:0,zIndex:5000,height:72,
      display:'flex',alignItems:'center',justifyContent:'space-between',
      padding:'0 clamp(24px,5vw,80px)',
      background: scrolled ? 'rgba(4,4,10,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(24px)' : 'none',
      borderBottom: `1px solid ${scrolled ? 'rgba(200,168,92,0.06)' : 'transparent'}`,
      transition:'background 0.6s,border-color 0.6s',
    }}>
      <a href="/" style={{ textDecoration:'none' }}>
        <div style={{ fontFamily:'var(--H)',fontSize:13,fontWeight:300,letterSpacing:'0.38em',color:'var(--T)',lineHeight:1,textTransform:'uppercase' }}>THE VENTUS</div>
        <div className="cap" style={{ fontSize:6,letterSpacing:'0.5em',marginTop:4,color:'var(--gold3)' }}>Collection · Seven Coastal Residences</div>
      </a>
      <div className="hm" style={{ display:'flex',alignItems:'center',gap:36 }}>
        {[['Collection','#collection'],['Residences','#villas'],['Estate','#estate'],['Wellness','#wellness'],['Invest','#invest'],['Contact','#contact']].map(([l,h]) => (
          <a key={l} href={h} className="nl">{l}</a>
        ))}
        <a href="#contact" className="btn bl" style={{ fontSize:7,padding:'9px 22px',letterSpacing:'0.3em' }}>Private Enquiry</a>
      </div>
    </nav>
  )
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [scrollY, setScrollY] = useState(0)
  useEffect(() => {
    const fn = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', fn, { passive:true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800
  const progress = Math.min(1, scrollY / vh)
  const imgBlur = progress > 0.45 ? (progress - 0.45) / 0.55 * 20 : 0
  const imgDark = 0.18 + (progress > 0.45 ? (progress - 0.45) / 0.55 * 0.78 : 0)
  const textOpacity = Math.max(0, 1 - progress * 2.6)

  return (
    <section style={{ position:'relative',height:'100dvh',overflow:'hidden' }}>
      <div style={{ position:'absolute',inset:0 }}>
        <img src={IMG.hero} alt="The Ventus Collection" style={{
          width:'100%',height:'100%',objectFit:'cover',objectPosition:'center 25%',
          filter:`blur(${imgBlur}px)`,
          transform:`scale(${1.04 + imgBlur*0.006})`,
          willChange:'filter,transform',
        }} />
        <div style={{ position:'absolute',inset:0,background:`rgba(4,4,10,${imgDark})`,transition:'background 0.05s' }} />
        <div style={{ position:'absolute',inset:0,background:'linear-gradient(to top,rgba(4,4,10,0.95) 0%,rgba(4,4,10,0.1) 50%,transparent 100%)' }} />
        <div style={{ position:'absolute',inset:0,background:'linear-gradient(to bottom,rgba(4,4,10,0.5) 0%,transparent 30%)' }} />
      </div>

      {/* Collection wordmark — top center */}
      <div style={{
        position:'absolute',top:'clamp(92px,14vh,130px)',left:0,right:0,
        textAlign:'center',
        opacity: textOpacity,
        animation:'fadeIn 2s ease 0.3s both',
      }}>
        <div className="cap" style={{ fontSize:7,letterSpacing:'0.55em',marginBottom:16,color:'rgba(200,168,92,0.6)' }}>Mauritius · Grand Baie · North Coast</div>
        <div style={{ fontFamily:'var(--H)',fontSize:'clamp(10px,1.2vw,14px)',fontWeight:300,letterSpacing:'0.55em',color:'rgba(242,237,230,0.35)',textTransform:'uppercase' }}>
          The Ventus Collection
        </div>
      </div>

      <div style={{
        position:'absolute',
        bottom:'clamp(80px,10vw,130px)',
        left:'clamp(48px,7vw,110px)',
        maxWidth:700,
        opacity:textOpacity,
        transform:`translateY(${progress * 28}px)`,
        pointerEvents: textOpacity > 0.1 ? 'all' : 'none',
      }}>
        <div className="cap" style={{ marginBottom:24,fontSize:7.5,animation:'fadeUp 1.2s ease 0.5s both' }}>
          Seven Private Coastal Residences
        </div>
        <h1 style={{
          fontFamily:'var(--H)',
          fontSize:'clamp(22px,3.2vw,52px)',
          fontWeight:300,letterSpacing:'0.18em',textTransform:'uppercase',
          color:'var(--T)',margin:'0 0 22px',lineHeight:1.4,
          animation:'fadeUp 1.3s ease 0.7s both',
        }}>
          Where wind shapes<br />architecture
        </h1>
        <div style={{ width:52,height:1,background:'linear-gradient(90deg,var(--gold),transparent)',marginBottom:26,animation:'slideRight 1.2s ease 0.9s both',transformOrigin:'left' }} />
        <p style={{
          fontFamily:'var(--F)',fontSize:'clamp(15px,1.6vw,19px)',fontStyle:'italic',
          color:'rgba(242,237,230,0.55)',maxWidth:420,lineHeight:1.9,marginBottom:40,
          animation:'fadeUp 1.2s ease 1.1s both',
        }}>
          A designed residential sequence across a single<br />coastal estate. From £1,250,000.
        </p>
        <div style={{ display:'flex',gap:14,flexWrap:'wrap',animation:'fadeUp 1.2s ease 1.3s both' }}>
          <a href="#collection" className="btn bg">Explore The Collection</a>
          <a href="#contact" className="btn bl">Private Viewing</a>
        </div>
      </div>

      {/* Yield badge */}
      <div style={{
        position:'absolute',top:90,right:'clamp(28px,5vw,80px)',
        opacity:textOpacity,
        borderTop:'1px solid rgba(200,168,92,0.18)',
        borderBottom:'1px solid rgba(200,168,92,0.18)',
        padding:'18px 28px',textAlign:'center',
        background:'rgba(4,4,10,0.55)',backdropFilter:'blur(16px)',
        animation:'fadeIn 1.2s ease 1.5s both',
        pointerEvents:'none',
      }}>
        <div className="cap" style={{ fontSize:6.5,marginBottom:8,letterSpacing:'0.4em' }}>Est. Gross Yield</div>
        <div style={{ fontFamily:'var(--F)',fontSize:38,fontWeight:300,lineHeight:1,color:'var(--gold)' }}>9%</div>
        <div style={{ fontFamily:'var(--F)',fontSize:10,fontStyle:'italic',color:'var(--T3)',marginTop:5,letterSpacing:'0.04em' }}>short-term coastal villa</div>
      </div>

      {/* Scroll cue */}
      <div style={{
        position:'absolute',bottom:38,left:'50%',transform:'translateX(-50%)',
        display:'flex',flexDirection:'column',alignItems:'center',gap:10,
        opacity:textOpacity * 0.5,pointerEvents:'none',
        animation:'fadeIn 1s ease 2.2s both',
      }}>
        <div className="cap" style={{ fontSize:6.5,letterSpacing:'0.5em' }}>Descend</div>
        <div style={{ width:1,height:48,background:'linear-gradient(to bottom,var(--gold),transparent)',animation:'pulse 2.2s ease infinite' }} />
      </div>
    </section>
  )
}

// ─── Cinematic Scene ──────────────────────────────────────────────────────────
function Scene({ src, label, caption, sub, objPos='center', id }) {
  const ref = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const fn = () => {
      const el = ref.current; if (!el) return
      const rect = el.getBoundingClientRect()
      const p = -rect.top / window.innerHeight
      setProgress(Math.min(1, Math.max(0, p)))
    }
    window.addEventListener('scroll', fn, { passive:true }); fn()
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const exitBlur = progress > 0.65 ? (progress - 0.65) / 0.35 * 18 : 0
  const exitDark = progress > 0.65 ? (progress - 0.65) / 0.35 * 0.92 : 0
  const capOp = progress > 0.08 && progress < 0.6
    ? Math.min(1, (progress - 0.08) / 0.16, (0.6 - progress) / 0.12)
    : 0

  return (
    <section id={id} ref={ref} style={{ position:'relative',height:'100dvh',overflow:'hidden' }}>
      <div className="img-wrap" style={{ position:'absolute',inset:0 }}>
        <img src={src} alt={label ?? ''} loading="lazy" style={{
          width:'100%',height:'100%',objectFit:'cover',objectPosition:objPos,
          filter:`blur(${exitBlur}px)`,
          transform:`scale(${1 + exitBlur*0.006})`,
          willChange:'filter,transform',
        }} />
        <div style={{ position:'absolute',inset:0,background:`rgba(4,4,10,${exitDark})`,pointerEvents:'none' }} />
        <div style={{ position:'absolute',inset:0,background:'linear-gradient(to top,rgba(4,4,10,0.88) 0%,transparent 45%)',pointerEvents:'none' }} />
      </div>
      {label && (
        <div style={{
          position:'absolute',bottom:'clamp(60px,8vh,100px)',left:'clamp(48px,7vw,110px)',
          maxWidth:600,opacity:capOp,
          transform:`translateY(${(1 - Math.min(1,capOp * 6))*12}px)`,
          pointerEvents:'none',
        }}>
          <div className="cap" style={{ marginBottom:14,fontSize:7.5 }}>{label}</div>
          {caption && (
            <p style={{ fontFamily:'var(--F)',fontSize:'clamp(22px,3.2vw,48px)',fontStyle:'italic',fontWeight:300,color:'var(--T)',lineHeight:1.12 }}>
              {caption}
            </p>
          )}
          {sub && <p style={{ fontFamily:'var(--F)',fontSize:'clamp(13px,1.3vw,16px)',fontStyle:'italic',color:'rgba(242,237,230,0.45)',marginTop:14,lineHeight:1.8 }}>{sub}</p>}
        </div>
      )}
    </section>
  )
}

// ─── VENTUS COLLECTION MASTER INTRO ──────────────────────────────────────────
function VentusIntro() {
  const { ref, visible } = useInView(0.1)
  return (
    <section id="collection" style={{ background:'var(--K)',padding:'clamp(80px,10vw,140px) clamp(48px,7vw,110px)',borderTop:'1px solid var(--BL)' }}>
      <div ref={ref} style={{
        maxWidth:900,
        opacity:visible?1:0,transform:visible?'none':'translateY(20px)',
        transition:'opacity 1.4s ease,transform 1.4s ease',
      }}>
        <div className="cap" style={{ marginBottom:20,fontSize:7,letterSpacing:'0.55em' }}>The Ventus Collection · Grand Baie, Mauritius</div>
        <h2 style={{ fontFamily:'var(--H)',fontSize:'clamp(28px,4.5vw,72px)',fontWeight:300,letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--T)',lineHeight:1.1,marginBottom:28 }}>
          Seven Private<br />Coastal Residences
        </h2>
        <div style={{ width:60,height:1,background:'linear-gradient(90deg,var(--gold),transparent)',marginBottom:30,opacity:0.7 }} />
        <p style={{ fontFamily:'var(--F)',fontSize:'clamp(16px,1.8vw,22px)',fontStyle:'italic',color:'var(--T2)',lineHeight:1.85,maxWidth:640,marginBottom:20 }}>
          "Ventus" — wind, movement, and coastal flow. The invisible force shaping architecture, landscape, and experience across a single estate.
        </p>
        <p style={{ fontFamily:'var(--F)',fontSize:'clamp(14px,1.4vw,17px)',fontStyle:'italic',color:'var(--T3)',lineHeight:1.9,maxWidth:540 }}>
          This is not a group of villas. This is a designed residential sequence — seven distinct emotional moments in a single continuous architectural film.
        </p>
      </div>

      {/* Ventus I–VII overview strip */}
      <div className="c7" style={{
        display:'grid',gridTemplateColumns:'repeat(7,1fr)',
        marginTop:'clamp(52px,7vw,96px)',
        borderTop:'1px solid var(--BL)',
        opacity:visible?1:0,transition:'opacity 1.6s ease 0.3s',
      }}>
        {[
          { n:'I',  name:'Arrival Residence',       note:'Estate entrance sequence' },
          { n:'II', name:'Elevated Privacy',         note:'Partial ocean framing' },
          { n:'III',name:'Core Estate',              note:'Architectural symmetry' },
          { n:'IV', name:'Signature Infinity',       note:'Primary ocean exposure' },
          { n:'V',  name:'Wellness Adjacent',        note:'Spa integration' },
          { n:'VI', name:'Panoramic Elevation',      note:'Widest coastal framing' },
          { n:'VII',name:'Ultra-Private Horizon',    note:'Ultimate exclusivity' },
        ].map(({ n, name, note }, i) => (
          <div key={n} style={{
            padding:'clamp(20px,2.5vw,36px) clamp(12px,1.5vw,20px)',
            borderRight: i < 6 ? '1px solid var(--BL)' : 'none',
            opacity:visible?1:0,
            transform:visible?'none':`translateY(${12 + i*2}px)`,
            transition:`all 0.9s ease ${0.4 + i*0.06}s`,
          }}>
            <div style={{ fontFamily:'var(--H)',fontSize:'clamp(16px,2vw,28px)',fontWeight:300,color:'var(--gold)',lineHeight:1,marginBottom:10,letterSpacing:'0.05em' }}>
              {n}
            </div>
            <div style={{ fontFamily:'var(--B)',fontSize:8,fontWeight:200,letterSpacing:'0.2em',textTransform:'uppercase',color:'var(--T2)',marginBottom:6,lineHeight:1.5 }}>{name}</div>
            <div style={{ fontFamily:'var(--F)',fontSize:11,fontStyle:'italic',color:'var(--T3)',lineHeight:1.6 }}>{note}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Specs Bar ────────────────────────────────────────────────────────────────
function Specs() {
  const { ref, visible } = useInView()
  const items = [
    { v:'7',      l:'Private Residences' },
    { v:'5',      l:'Max Bedrooms' },
    { v:'820m²',  l:'Max Interior' },
    { v:'9%',     l:'Gross Yield' },
    { v:'0%',     l:'Capital Gains Tax' },
    { v:'£1.25M', l:'From' },
  ]
  return (
    <div ref={ref} className="c6" style={{ display:'grid',gridTemplateColumns:'repeat(6,1fr)',borderTop:'1px solid var(--BL)',borderBottom:'1px solid var(--BL)',background:'var(--K)' }}>
      {items.map(({ v, l }, i) => (
        <div key={l} style={{
          padding:'clamp(30px,4vw,58px) clamp(16px,2.5vw,32px)',
          borderLeft:i>0?'1px solid var(--BL)':'none',
          opacity:visible?1:0,transform:visible?'none':'translateY(14px)',
          transition:`all 0.9s ease ${i*0.08}s`,
        }}>
          <div style={{ fontFamily:'var(--F)',fontSize:'clamp(20px,2.8vw,44px)',fontWeight:300,fontStyle:'italic',color:'var(--gold)',lineHeight:1,marginBottom:10 }}>{v}</div>
          <div className="cap" style={{ fontSize:7.5,color:'var(--T3)' }}>{l}</div>
        </div>
      ))}
    </div>
  )
}

// ─── Panel ────────────────────────────────────────────────────────────────────
function Panel({ src, eyebrow, title, sub, align='left', objPos='center', dim=0.45, id }) {
  const { ref, visible } = useInView(0.08)
  const a = align === 'center' ? { textAlign:'center', left:0, right:0 }
           : align === 'right'  ? { textAlign:'right', right:'clamp(48px,7vw,110px)' }
           :                       { left:'clamp(48px,7vw,110px)' }
  return (
    <section id={id} style={{ position:'relative',height:'100dvh',overflow:'hidden',display:'flex',flexDirection:'column',justifyContent:'flex-end' }}>
      <div className="img-wrap" style={{ position:'absolute',inset:0 }}>
        <img src={src} alt={title} loading="lazy" style={{ width:'100%',height:'100%',objectFit:'cover',objectPosition:objPos }} />
        <div style={{ position:'absolute',inset:0,background:`linear-gradient(to top,rgba(4,4,10,${dim+0.45}) 0%,rgba(4,4,10,${dim*0.1}) 50%,transparent 100%)` }} />
      </div>
      <div ref={ref} style={{
        position:'relative',zIndex:2,
        padding:'clamp(48px,6vw,96px)',paddingBottom:'clamp(60px,8vw,110px)',
        ...a,
        opacity:visible?1:0,transform:visible?'none':'translateY(16px)',
        transition:'opacity 1.5s ease,transform 1.5s ease',
      }}>
        {eyebrow && <div className="cap" style={{ marginBottom:16 }}>{eyebrow}</div>}
        <h2 style={{ fontFamily:'var(--F)',fontSize:'clamp(28px,5vw,76px)',fontWeight:300,fontStyle:'italic',lineHeight:1.04,color:'var(--T)',margin:0 }}>{title}</h2>
        {sub && <p style={{ fontFamily:'var(--F)',fontSize:'clamp(14px,1.5vw,18px)',fontStyle:'italic',color:'rgba(242,237,230,0.5)',marginTop:18,maxWidth:480,lineHeight:1.8,...(align==='center'?{margin:'18px auto 0',display:'block'}:{}) }}>{sub}</p>}
      </div>
    </section>
  )
}

// ─── MASTERPLAN SECTION ───────────────────────────────────────────────────────
function Masterplan() {
  const { ref, visible } = useInView(0.1)
  const villas = [
    { n:'I',   name:'Arrival',         top:'72%', left:'18%', desc:'Estate entrance' },
    { n:'II',  name:'Privacy',         top:'55%', left:'28%', desc:'Elevated seclusion' },
    { n:'III', name:'Core Estate',     top:'42%', left:'42%', desc:'Architectural centre' },
    { n:'IV',  name:'Infinity',        top:'30%', left:'56%', desc:'Primary ocean view' },
    { n:'V',   name:'Wellness',        top:'48%', left:'65%', desc:'Spa adjacency' },
    { n:'VI',  name:'Panoramic',       top:'20%', left:'72%', desc:'Highest elevation' },
    { n:'VII', name:'Horizon',         top:'12%', left:'82%', desc:'Ultimate privacy' },
  ]
  return (
    <section id="estate" style={{ background:'var(--D)',padding:'clamp(80px,10vw,140px) clamp(48px,7vw,110px)',borderTop:'1px solid var(--BL)' }}>
      <div ref={ref} style={{ opacity:visible?1:0,transform:visible?'none':'translateY(16px)',transition:'all 1.4s ease' }}>
        <div className="cap" style={{ marginBottom:18,fontSize:7 }}>Estate Masterplan · Single Coastal Estate</div>
        <h2 style={{ fontFamily:'var(--F)',fontSize:'clamp(24px,3.5vw,54px)',fontWeight:300,fontStyle:'italic',color:'var(--T)',marginBottom:14 }}>
          A designed sequence across the coastline
        </h2>
        <p style={{ fontFamily:'var(--F)',fontSize:'clamp(14px,1.4vw,17px)',fontStyle:'italic',color:'var(--T2)',maxWidth:560,lineHeight:1.85,marginBottom:'clamp(40px,6vw,72px)' }}>
          Seven residences positioned across varying elevations, each commanding a distinct relationship with the ocean, landscape, and sky.
        </p>

        {/* Masterplan visual */}
        <div style={{ position:'relative',height:'clamp(360px,50vw,600px)',background:'linear-gradient(160deg,rgba(7,7,14,1) 0%,rgba(12,12,24,1) 40%,rgba(4,8,20,1) 100%)',border:'1px solid var(--BL)',borderRadius:2,overflow:'hidden' }}>
          {/* Ocean suggestion */}
          <div style={{ position:'absolute',top:0,left:0,right:0,height:'40%',background:'linear-gradient(to bottom,rgba(8,20,48,0.8),rgba(8,24,56,0.2))',borderBottom:'1px solid rgba(200,168,92,0.06)' }}>
            <div className="cap" style={{ position:'absolute',top:16,left:24,fontSize:6.5,color:'rgba(200,168,92,0.3)',letterSpacing:'0.5em' }}>Indian Ocean</div>
          </div>
          {/* Coastline line */}
          <div style={{ position:'absolute',top:'40%',left:0,right:0,height:1,background:'linear-gradient(90deg,transparent,rgba(200,168,92,0.2),rgba(200,168,92,0.4),rgba(200,168,92,0.2),transparent)' }} />
          {/* Elevation gradient */}
          <div style={{ position:'absolute',top:'40%',bottom:0,left:0,right:0,background:'linear-gradient(to bottom,rgba(10,14,8,0.2),rgba(6,8,4,0.6))' }} />
          {/* Circulation path */}
          <svg style={{ position:'absolute',inset:0,width:'100%',height:'100%' }} viewBox="0 0 800 500" preserveAspectRatio="none">
            <path d="M 144 360 Q 224 280 336 210 Q 448 150 576 110 Q 656 90 672 80" fill="none" stroke="rgba(200,168,92,0.12)" strokeWidth="1" strokeDasharray="4 6" />
          </svg>

          {/* Villa markers */}
          {villas.map(({ n, name, top, left, desc }, i) => (
            <div key={n} style={{
              position:'absolute',top,left,transform:'translate(-50%,-50%)',
              opacity:visible?1:0,
              transition:`all 1s ease ${0.6+i*0.1}s`,
              cursor:'none',
            }}>
              <div style={{ position:'relative',display:'flex',flexDirection:'column',alignItems:'center',gap:8 }}>
                <div style={{ width:28,height:28,borderRadius:'50%',border:'1px solid rgba(200,168,92,0.5)',background:'rgba(4,4,10,0.85)',display:'flex',alignItems:'center',justifyContent:'center',animation:'breathe 3s ease infinite',animationDelay:`${i*0.4}s` }}>
                  <div style={{ fontFamily:'var(--H)',fontSize:8,fontWeight:300,color:'var(--gold)',letterSpacing:'0.05em' }}>{n}</div>
                </div>
                <div style={{ background:'rgba(4,4,10,0.8)',border:'1px solid var(--BL)',padding:'4px 8px',whiteSpace:'nowrap',textAlign:'center' }}>
                  <div style={{ fontFamily:'var(--B)',fontSize:7,fontWeight:200,letterSpacing:'0.2em',textTransform:'uppercase',color:'var(--T2)' }}>{name}</div>
                  <div style={{ fontFamily:'var(--F)',fontSize:9,fontStyle:'italic',color:'var(--T3)',marginTop:1 }}>{desc}</div>
                </div>
              </div>
            </div>
          ))}

          {/* Legend */}
          <div style={{ position:'absolute',bottom:20,right:24,display:'flex',gap:16,alignItems:'center' }}>
            <div style={{ display:'flex',alignItems:'center',gap:6 }}>
              <div style={{ width:16,height:1,background:'rgba(200,168,92,0.3)',borderTop:'1px dashed rgba(200,168,92,0.3)' }} />
              <div className="cap" style={{ fontSize:6,color:'var(--T3)',letterSpacing:'0.3em' }}>Circulation pathway</div>
            </div>
            <div style={{ display:'flex',alignItems:'center',gap:6 }}>
              <div style={{ width:8,height:8,borderRadius:'50%',border:'1px solid rgba(200,168,92,0.5)' }} />
              <div className="cap" style={{ fontSize:6,color:'var(--T3)',letterSpacing:'0.3em' }}>Ventus residence</div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="c4" style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',marginTop:1,borderTop:'1px solid var(--BL)',borderBottom:'1px solid var(--BL)' }}>
          {[
            { v:'1', l:'Contiguous coastal estate' },
            { v:'7', l:'Private residences' },
            { v:'4', l:'Elevation changes' },
            { v:'∞', l:'Ocean horizon' },
          ].map(({ v, l }, i) => (
            <div key={l} style={{ padding:'clamp(22px,3vw,36px)',borderRight:i<3?'1px solid var(--BL)':'none',opacity:visible?1:0,transform:visible?'none':'translateY(8px)',transition:`all 0.8s ease ${0.8+i*0.08}s` }}>
              <div style={{ fontFamily:'var(--F)',fontSize:'clamp(24px,3.5vw,50px)',fontWeight:300,fontStyle:'italic',color:'var(--gold)',lineHeight:1,marginBottom:8 }}>{v}</div>
              <div className="cap" style={{ fontSize:7.5,color:'var(--T3)' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── VENTUS VILLA SEQUENCE (I–VII) ────────────────────────────────────────────
const VENTUS_VILLAS = [
  { roman:'I',   name:'Arrival Residence',          sub:'Closest connection to estate entrance and arrival sequence.',         price:'£1,250,000', tag:'Entry',       beds:3,baths:4,sqm:380,yld:'6.8%', img:IMG.entrance,   objPos:'center 40%', moment:'Emergence — the estate reveals itself.' },
  { roman:'II',  name:'Elevated Privacy Residence', sub:'Slight elevation, partial ocean framing, increased seclusion.',       price:'£1,650,000', tag:'Signature',   beds:3,baths:4,sqm:440,yld:'7.2%', img:IMG.seaView2,   objPos:'center',     moment:'Ascent — privacy found in elevation.' },
  { roman:'III', name:'Core Estate Residence',      sub:'Central balance point of the collection, architectural symmetry.',    price:'£1,950,000', tag:'Premium',     beds:4,baths:5,sqm:560,yld:'7.6%', img:IMG.window,     objPos:'center 50%', moment:'Stillness — the architecture at rest.' },
  { roman:'IV',  name:'Signature Infinity Residence',sub:'Primary ocean-facing villa with strongest visual exposure to horizon.',price:'£2,100,000', tag:"Collector's", beds:4,baths:5,sqm:640,yld:'7.5%', img:IMG.pool2,      objPos:'center 45%', moment:'Revelation — where water meets the horizon.' },
  { roman:'V',   name:'Wellness Adjacent Residence', sub:'Closest integration with spa and sanctuary environment.',            price:'£2,750,000', tag:'Grand',       beds:5,baths:6,sqm:720,yld:'8.2%', img:IMG.outdoor,    objPos:'center',     moment:'Restoration — architecture built for silence.' },
  { roman:'VI',  name:'Panoramic Elevation Residence',sub:'Highest viewpoint, wide coastal framing, expansive views.',         price:'£3,200,000', tag:'Estate',      beds:5,baths:6,sqm:800,yld:'8.8%', img:IMG.penthouse,  objPos:'center 35%', moment:'Elevation — the full sweep of coastline.' },
  { roman:'VII', name:'Ultra-Private Horizon Residence',sub:'Most exclusive, most secluded, ultimate end-of-collection villa.',  price:'£3,750,000', tag:'Flagship',   beds:5,baths:6,sqm:820,yld:'9.0%', img:IMG.master,     objPos:'center 30%', moment:'Completion — silence, horizon, and sovereignty.' },
]

function VillaSequence() {
  const [active, setActive] = useState(0)
  const { ref, visible } = useInView(0.06)
  const villa = VENTUS_VILLAS[active]

  return (
    <section id="villas" ref={ref} style={{ background:'var(--D)',borderTop:'1px solid var(--BL)' }}>
      <div style={{ padding:'clamp(60px,8vw,110px) clamp(48px,7vw,110px) 0',opacity:visible?1:0,transform:visible?'none':'translateY(14px)',transition:'all 1.1s ease' }}>
        <div className="cap" style={{ marginBottom:12,fontSize:7,letterSpacing:'0.5em' }}>The Ventus Collection · Seven Residences</div>
        <h2 style={{ fontFamily:'var(--F)',fontSize:'clamp(24px,4vw,58px)',fontWeight:300,fontStyle:'italic',color:'var(--T)',marginBottom:36 }}>
          A sequence of seven emotional moments
        </h2>

        {/* Ventus navigation */}
        <div style={{ display:'flex',flexWrap:'wrap',borderBottom:'1px solid var(--BL)',gap:0 }}>
          {VENTUS_VILLAS.map((v, i) => (
            <button key={v.roman} onClick={() => setActive(i)} style={{
              fontFamily:'var(--H)',fontSize:10,fontWeight:300,
              letterSpacing:'0.2em',background:'none',border:'none',cursor:'none',
              padding:'12px 20px 12px 0',
              color:active===i?'var(--gold)':'var(--T3)',
              borderBottom:active===i?'1px solid var(--gold)':'1px solid transparent',
              marginBottom:-1,transition:'all 0.4s',whiteSpace:'nowrap',
            }}>
              {v.roman}
            </button>
          ))}
        </div>
      </div>

      <div key={active} className="c2" style={{ display:'grid',gridTemplateColumns:'1fr 1fr',minHeight:'72vh',animation:'fadeIn 0.5s ease forwards' }}>
        <div className="img-wrap" style={{ position:'relative',overflow:'hidden',minHeight:360 }}>
          <img src={villa.img} alt={villa.name} loading="lazy" style={{ width:'100%',height:'100%',objectFit:'cover',objectPosition:villa.objPos,transition:'transform 0.8s ease' }} />
          <div style={{ position:'absolute',inset:0,background:'linear-gradient(to top,rgba(4,4,10,0.7) 0%,transparent 60%)' }} />
          <div style={{ position:'absolute',top:0,left:0,right:0,padding:'clamp(20px,3vw,36px)' }}>
            <div style={{ display:'inline-block',background:'rgba(4,4,10,0.7)',backdropFilter:'blur(12px)',border:'1px solid var(--BL)',padding:'8px 14px' }}>
              <span style={{ fontFamily:'var(--H)',fontSize:9,letterSpacing:'0.3em',color:'var(--gold)',textTransform:'uppercase' }}>Ventus {villa.roman}</span>
            </div>
          </div>
          <div style={{ position:'absolute',bottom:'clamp(20px,3vw,36px)',left:'clamp(20px,3vw,36px)' }}>
            <div style={{ background:'var(--gold)',color:'var(--K)',fontFamily:'var(--B)',fontSize:7,letterSpacing:'0.3em',textTransform:'uppercase',padding:'5px 12px',marginBottom:10,display:'inline-block' }}>{villa.tag}</div>
            <p style={{ fontFamily:'var(--F)',fontSize:'clamp(13px,1.4vw,17px)',fontStyle:'italic',color:'rgba(242,237,230,0.65)',maxWidth:320,lineHeight:1.7 }}>{villa.moment}</p>
          </div>
        </div>

        <div style={{ padding:'clamp(40px,5.5vw,80px)',display:'flex',flexDirection:'column',justifyContent:'center',background:'var(--M)' }}>
          <div className="cap" style={{ marginBottom:10,fontSize:6.5,color:'var(--T3)',letterSpacing:'0.4em' }}>Ventus {villa.roman} · The Ventus Collection</div>
          <h3 style={{ fontFamily:'var(--H)',fontSize:'clamp(13px,1.6vw,22px)',fontWeight:300,letterSpacing:'0.16em',color:'var(--T)',marginBottom:8,lineHeight:1.4,textTransform:'uppercase' }}>
            {villa.name}
          </h3>
          <div style={{ fontFamily:'var(--F)',fontSize:'clamp(22px,3vw,42px)',fontWeight:300,color:'var(--gold)',marginBottom:10,fontStyle:'italic' }}>{villa.price}</div>
          <p style={{ fontFamily:'var(--F)',fontSize:'clamp(13px,1.3vw,16px)',fontStyle:'italic',color:'var(--T2)',marginBottom:26,lineHeight:1.85 }}>{villa.sub}</p>

          <div style={{ display:'flex',gap:22,marginBottom:22,paddingBottom:22,borderBottom:'1px solid var(--BL)' }}>
            {[{v:villa.beds,l:'Bedrooms'},{v:villa.baths,l:'Bathrooms'},{v:`${villa.sqm}m²`,l:'Interior'},{v:villa.yld,l:'Est. Yield'}].map(({v,l}) => (
              <div key={l}>
                <div style={{ fontFamily:'var(--F)',fontSize:'clamp(15px,1.8vw,24px)',fontWeight:300,fontStyle:'italic',color:'var(--T)',lineHeight:1 }}>{v}</div>
                <div className="cap" style={{ fontSize:6.5,color:'var(--T3)',marginTop:5 }}>{l}</div>
              </div>
            ))}
          </div>

          <div style={{ padding:'14px 18px',background:'rgba(200,168,92,0.04)',borderLeft:'2px solid rgba(200,168,92,0.3)',marginBottom:26 }}>
            <div className="cap" style={{ fontSize:6.5,marginBottom:5 }}>Permanent Residency Included</div>
            <p style={{ fontFamily:'var(--F)',fontSize:12,fontStyle:'italic',color:'var(--T3)',lineHeight:1.65 }}>Qualifies under EDB schemes. Buyer, spouse and all dependants receive permanent residence permit for duration of ownership.</p>
          </div>

          <div style={{ display:'flex',gap:10,flexWrap:'wrap' }}>
            <a href="#contact" className="btn bg" style={{ fontSize:7,padding:'11px 24px' }}>Request Brochure</a>
            <a href="#contact" className="btn bl" style={{ fontSize:7,padding:'11px 24px' }}>Arrange Viewing</a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Quote ────────────────────────────────────────────────────────────────────
function Quote({ text, attr }) {
  const { ref, visible } = useInView(0.2)
  return (
    <section ref={ref} style={{ background:'var(--M)',padding:'clamp(80px,10vw,150px) clamp(48px,12vw,200px)',textAlign:'center',borderTop:'1px solid var(--BL)',borderBottom:'1px solid var(--BL)' }}>
      <div style={{ width:visible?48:0,height:1,background:'linear-gradient(90deg,transparent,var(--gold),transparent)',margin:'0 auto 36px',transition:'width 1.4s ease',opacity:0.5 }} />
      <blockquote style={{ fontFamily:'var(--F)',fontSize:'clamp(18px,3.2vw,46px)',fontWeight:300,fontStyle:'italic',lineHeight:1.28,color:'var(--T)',maxWidth:820,margin:'0 auto',opacity:visible?1:0,transform:visible?'none':'translateY(12px)',transition:'all 1.6s ease 0.2s' }}>
        "{text}"
      </blockquote>
      {attr && <div className="cap" style={{ marginTop:32,fontSize:7.5,color:'var(--T3)',opacity:visible?1:0,transition:'opacity 1.2s ease 0.8s',letterSpacing:'0.4em' }}>{attr}</div>}
    </section>
  )
}

// ─── LORO PIANA INTERIORS SECTION ─────────────────────────────────────────────
function LoroPianaInteriors() {
  const { ref, visible } = useInView(0.1)
  return (
    <section style={{ background:'var(--K)',borderTop:'1px solid var(--BL)' }}>
      <div ref={ref} style={{ padding:'clamp(80px,10vw,140px) clamp(48px,7vw,110px)',opacity:visible?1:0,transform:visible?'none':'translateY(16px)',transition:'all 1.4s ease' }}>
        <div className="cap" style={{ marginBottom:20,fontSize:7,letterSpacing:'0.5em' }}>Ventus Residences · Interior Philosophy</div>
        <div className="c2" style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'clamp(48px,8vw,120px)',alignItems:'center' }}>
          <div>
            <h2 style={{ fontFamily:'var(--F)',fontSize:'clamp(26px,4vw,62px)',fontWeight:300,fontStyle:'italic',color:'var(--T)',lineHeight:1.08,marginBottom:24 }}>
              Tactile silence.<br />Cashmere softness.
            </h2>
            <div style={{ width:44,height:1,background:'linear-gradient(90deg,var(--gold),transparent)',marginBottom:24,opacity:0.6 }} />
            <p style={{ fontFamily:'var(--F)',fontSize:'clamp(14px,1.5vw,18px)',fontStyle:'italic',color:'var(--T2)',lineHeight:1.9,marginBottom:18 }}>
              Each Ventus residence is a private atelier of material restraint — neutral palette, enduring quality, luxury stillness.
            </p>
            <p style={{ fontFamily:'var(--F)',fontSize:'clamp(13px,1.3vw,16px)',fontStyle:'italic',color:'var(--T3)',lineHeight:1.9,marginBottom:32 }}>
              Reclaimed teak. Calacatta Oro. Belgian linen in grain and stone. Nothing left to chance. Nothing placed without intention.
            </p>
            <div style={{ borderTop:'1px solid var(--BL)',paddingTop:24 }}>
              {['Bespoke furniture programme','Stone from Carrara & Azul Macaúbas','Hand-loomed textile walls','Artisan bronze hardware throughout'].map((item, i) => (
                <div key={item} style={{ display:'flex',alignItems:'center',gap:14,marginBottom:12,opacity:visible?1:0,transition:`opacity 0.8s ease ${0.6+i*0.1}s` }}>
                  <div style={{ width:20,height:1,background:'var(--gold)',opacity:0.4,flexShrink:0 }} />
                  <div style={{ fontFamily:'var(--F)',fontSize:13,fontStyle:'italic',color:'var(--T2)' }}>{item}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display:'flex',flexDirection:'column',gap:2 }}>
            {[IMG.interior, IMG.living, IMG.screenshot].map((src, i) => (
              <div key={i} className="img-wrap" style={{ position:'relative',height:'clamp(140px,18vw,240px)',overflow:'hidden',opacity:visible?1:0,transform:visible?'none':'translateY(12px)',transition:`all 1s ease ${0.3+i*0.15}s` }}>
                <img src={src} alt="" loading="lazy" style={{ width:'100%',height:'100%',objectFit:'cover',objectPosition:'center',transition:'transform 0.8s ease' }} />
                <div style={{ position:'absolute',inset:0,background:'rgba(4,4,10,0.15)' }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── HELICOPTER ARRIVAL ───────────────────────────────────────────────────────
function HelicopterArrival() {
  const ref = useRef(null)
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const fn = () => {
      const el = ref.current; if (!el) return
      const rect = el.getBoundingClientRect()
      const p = -rect.top / window.innerHeight
      setProgress(Math.min(1, Math.max(0, p)))
    }
    window.addEventListener('scroll', fn, { passive:true }); fn()
    return () => window.removeEventListener('scroll', fn)
  }, [])
  const capOp = progress > 0.1 && progress < 0.65
    ? Math.min(1, (progress - 0.1) / 0.18, (0.65 - progress) / 0.12)
    : 0

  return (
    <section ref={ref} style={{ position:'relative',height:'100dvh',overflow:'hidden',background:'var(--K)' }}>
      <div style={{ position:'absolute',inset:0,background:'linear-gradient(160deg,rgba(4,8,24,1) 0%,rgba(6,12,32,1) 50%,rgba(4,4,10,1) 100%)' }} />
      {/* Aerial view simulation */}
      <div className="img-wrap" style={{ position:'absolute',inset:0,opacity:0.35 }}>
        <img src={IMG.seaVIew} alt="Aerial arrival" loading="lazy" style={{ width:'100%',height:'100%',objectFit:'cover',objectPosition:'center 20%',transform:`scale(${1 + progress*0.06})` }} />
      </div>
      <div style={{ position:'absolute',inset:0,background:'radial-gradient(ellipse at 50% 40%, rgba(4,4,10,0) 0%, rgba(4,4,10,0.9) 100%)' }} />

      <div style={{
        position:'absolute',bottom:'clamp(80px,10vh,120px)',left:0,right:0,
        textAlign:'center',
        opacity:capOp,
        transform:`translateY(${(1-capOp)*16}px)`,
        padding:'0 clamp(40px,8vw,140px)',
        pointerEvents:'none',
      }}>
        <div className="cap" style={{ marginBottom:20,fontSize:7,letterSpacing:'0.55em' }}>Private Helicopter Arrival · The Ventus Collection</div>
        <h2 style={{ fontFamily:'var(--H)',fontSize:'clamp(18px,2.8vw,44px)',fontWeight:300,letterSpacing:'0.2em',textTransform:'uppercase',color:'var(--T)',lineHeight:1.4,marginBottom:20 }}>
          You do not arrive here<br />like a tourist
        </h2>
        <div style={{ width:44,height:1,background:'linear-gradient(90deg,transparent,var(--gold),transparent)',margin:'0 auto 24px',opacity:0.6 }} />
        <p style={{ fontFamily:'var(--F)',fontSize:'clamp(14px,1.6vw,20px)',fontStyle:'italic',color:'rgba(242,237,230,0.5)',maxWidth:480,margin:'0 auto',lineHeight:1.85 }}>
          Aerial coastline approach. Estate revealed from above. Descent into The Ventus Collection.
        </p>
      </div>

      {/* Flight path visualization */}
      <svg style={{ position:'absolute',inset:0,width:'100%',height:'100%',opacity:progress>0.1?Math.min(0.4,(progress-0.1)*2):0,transition:'opacity 1s ease' }} viewBox="0 0 1000 600" preserveAspectRatio="none">
        <path d="M 100 100 Q 300 200, 500 350 Q 650 430, 780 480" fill="none" stroke="rgba(200,168,92,0.5)" strokeWidth="0.5" strokeDasharray="6 8" />
        <circle cx="780" cy="480" r="6" fill="none" stroke="rgba(200,168,92,0.6)" strokeWidth="0.8" />
        <circle cx="780" cy="480" r="16" fill="none" stroke="rgba(200,168,92,0.2)" strokeWidth="0.5" />
      </svg>
    </section>
  )
}

// ─── Island ───────────────────────────────────────────────────────────────────
function Island() {
  return (
    <section style={{ background:'var(--D)',borderTop:'1px solid var(--BL)' }}>
      <div className="c3" style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',borderBottom:'1px solid var(--BL)' }}>
        {[{v:'330',u:'days',l:'of sunshine per year'},{v:'27°',u:'avg',l:'Indian Ocean temperature'},{v:'5',u:'min',l:'to Grand Baie marina'}].map(({v,u,l},i) => (
          <div key={l} style={{ padding:'clamp(36px,5vw,64px)',borderRight:i<2?'1px solid var(--BL)':'none',textAlign:'center' }}>
            <div style={{ fontFamily:'var(--F)',fontSize:'clamp(30px,4.5vw,62px)',fontWeight:300,fontStyle:'italic',color:'var(--gold)',lineHeight:1 }}>
              {v}<span style={{ fontSize:'32%',marginLeft:5,color:'var(--T3)' }}>{u}</span>
            </div>
            <div className="cap" style={{ fontSize:7.5,color:'var(--T3)',marginTop:10 }}>{l}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── WELLNESS ─────────────────────────────────────────────────────────────────
function WellnessDescent() {
  const ref = useRef(null)
  const [scrollY, setScrollY] = useState(0)
  const [elTop, setElTop] = useState(0)
  useEffect(() => {
    const fn = () => {
      setScrollY(window.scrollY)
      if (ref.current) setElTop(ref.current.offsetTop)
    }
    window.addEventListener('scroll', fn, { passive:true }); fn()
    return () => window.removeEventListener('scroll', fn)
  }, [])
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800
  const progress = Math.min(1, Math.max(0, (scrollY - elTop + vh) / (vh * 1.6)))
  const dark = progress < 0.4 ? 0 : Math.min(1,(progress-0.4)/0.45)
  const blur = dark * 14
  const txt  = progress < 0.6 ? 0 : Math.min(1,(progress-0.6)*8)
  return (
    <div ref={ref} style={{ minHeight:'140dvh',position:'relative',overflow:'hidden' }}>
      <img src={IMG.spa2} alt="Wellness" style={{ width:'100%',height:'100%',objectFit:'cover',objectPosition:'center 30%',position:'absolute',inset:0,filter:`blur(${blur}px)`,transform:`scale(${1+progress*0.05+blur*0.005})` }} />
      <div style={{ position:'absolute',inset:0,background:`rgba(3,3,8,${dark})` }} />
      <div style={{ position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',padding:'40px clamp(40px,8vw,120px)',opacity:txt }}>
        <div className="cap" style={{ marginBottom:22,letterSpacing:'0.55em',fontSize:7 }}>Descend · Restore · Transcend</div>
        <h2 style={{ fontFamily:'var(--H)',fontSize:'clamp(24px,4vw,58px)',fontWeight:300,letterSpacing:'0.18em',textTransform:'uppercase',color:'var(--T)',lineHeight:1.28,marginBottom:24 }}>
          The Wellness<br />
          <span style={{ background:'linear-gradient(90deg,var(--gold3),var(--gold),var(--gold2),var(--gold))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text' }}>Sanctuary</span>
        </h2>
        <div style={{ width:44,height:1,background:'linear-gradient(90deg,transparent,var(--gold),transparent)',opacity:0.5,margin:'0 auto' }} />
      </div>
    </div>
  )
}

function Wellness() {
  const { ref, visible } = useInView()
  return (
    <section id="wellness" style={{ background:'var(--spa)' }}>
      {/* NOTE: "In-Residence Wellness / Spa Sanctuary / Ancient Mauritian healing" section removed per brief */}
      {/* First spa image shown is Spa 2.png (already used in WellnessDescent above), then progression */}
      <Panel src={IMG.spa2}    eyebrow="Wellness Sanctuary · Opening Ritual" title="Where stone meets silence"          sub="Volcanic basalt. Mineral water. The body restored." objPos="center 30%" dim={0.55} />
      <Panel src={IMG.spaEntry} eyebrow="Concierge Wellness"    title="Your Dedicated Curator"    sub="A personal wellness director — anticipating every need before it becomes one." align="right" dim={0.52} />
      <Panel src={IMG.spa1}    eyebrow="Treatment Sanctuary"   title="Ancient ritual, modern form" sub="Island botanicals · Cold ocean mineral · Volcanic stone." align="center" dim={0.58} />
      <Panel src={IMG.spa3}    eyebrow="Deep Restoration"      title="Total surrender"              sub="Total silence. Total renewal." dim={0.6} />
      <div ref={ref} className="c4" style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',borderTop:'1px solid rgba(200,168,92,0.04)' }}>
        {[{n:'Hydrotherapy',d:'Heated jet pool, cold plunge, mineral steam'},{n:'Body Rituals',d:'Volcanic stone · Coconut · Ayurvedic'},{n:'Yoga Pavilion',d:'Sunrise & sunset, resident instructor'},{n:'Nutrition',d:'Ayurvedic & plant-based cuisine'}].map(({n,d},i) => (
          <div key={n} style={{ padding:'clamp(28px,3.5vw,52px) clamp(18px,2.5vw,36px)',borderRight:i<3?'1px solid rgba(200,168,92,0.04)':'none',opacity:visible?1:0,transform:visible?'none':'translateY(10px)',transition:`all 0.9s ease ${i*0.1}s` }}>
            <div className="cap" style={{ fontSize:7.5,marginBottom:10 }}>{n}</div>
            <p style={{ fontFamily:'var(--F)',fontSize:13,fontStyle:'italic',color:'rgba(242,237,230,0.24)',lineHeight:1.78 }}>{d}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── INVESTMENT INFOGRAPHICS ──────────────────────────────────────────────────
function StatBox({ target, suffix, prefix='', label, note, dec=0, active, delay=0, border }) {
  const [go, setGo] = useState(false)
  useEffect(() => { if (active) { const t = setTimeout(() => setGo(true), delay); return () => clearTimeout(t) } }, [active,delay])
  const val = useCount(target, go, 2200, dec)
  return (
    <div style={{ padding:'clamp(36px,5vw,64px) clamp(18px,3vw,40px)',borderRight:border?'1px solid var(--BL)':'none',textAlign:'center' }}>
      <div style={{ fontFamily:'var(--F)',fontSize:'clamp(28px,4.5vw,68px)',fontWeight:300,fontStyle:'italic',lineHeight:1,color:'var(--gold)',marginBottom:10 }}>
        {prefix}{dec===0?Math.round(val):val.toFixed(dec)}{suffix}
      </div>
      <div className="cap" style={{ fontSize:7.5,marginBottom:7 }}>{label}</div>
      <div style={{ fontFamily:'var(--F)',fontSize:12,fontStyle:'italic',color:'var(--T3)' }}>{note}</div>
    </div>
  )
}

function InvestmentInfographics() {
  const { ref, visible } = useInView(0.15)
  return (
    <section id="invest" style={{ background:'var(--K)',borderTop:'1px solid var(--BL)' }}>
      {/* Header */}
      <div ref={ref} style={{ padding:'clamp(80px,10vw,130px) clamp(48px,7vw,110px) clamp(40px,5vw,64px)',opacity:visible?1:0,transform:visible?'none':'translateY(16px)',transition:'all 1.4s ease' }}>
        <div className="cap" style={{ marginBottom:20,fontSize:7,letterSpacing:'0.5em' }}>Market Intelligence · Mauritius 2025–2026</div>
        <h2 style={{ fontFamily:'var(--H)',fontSize:'clamp(22px,3.5vw,52px)',fontWeight:300,letterSpacing:'0.14em',textTransform:'uppercase',color:'var(--T)',lineHeight:1.2,marginBottom:20 }}>
          Investment Grade<br />Intelligence
        </h2>
        <p style={{ fontFamily:'var(--F)',fontSize:'clamp(14px,1.5vw,18px)',fontStyle:'italic',color:'var(--T2)',maxWidth:560,lineHeight:1.85 }}>
          Five converging forces constitute an irrefutable argument for coastal real estate in Mauritius — capital appreciation, rental yield, permanent residency, zero capital gains, and a way of life unavailable anywhere else on earth.
        </p>
      </div>

      {/* Primary stats */}
      <div className="c2" style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',borderTop:'1px solid var(--BL)',borderBottom:'1px solid var(--BL)' }}>
        {[
          {target:13.89,suffix:'%',label:'RPPI Growth Q3 2025',  note:'Statistics Mauritius',dec:2},
          {target:140,  suffix:'%',label:'Growth since 2019',     note:'Cumulative property price index'},
          {target:9,    suffix:'%',label:'Gross Rental Yield',    note:'Short-term luxury coastal villa'},
          {target:67,   suffix:'%',label:'Wealth Growth 2015–25', note:"Africa's strongest decade"},
        ].map((d,i) => <StatBox key={d.label} {...d} active={visible} delay={i*150} border={i<3} />)}
      </div>

      {/* Investment categories */}
      <div className="c2" style={{ display:'grid',gridTemplateColumns:'1fr 1fr',borderBottom:'1px solid var(--BL)' }}>
        {/* Real Estate Performance */}
        <div style={{ padding:'clamp(40px,5vw,72px)',borderRight:'1px solid var(--BL)' }}>
          <div className="cap" style={{ marginBottom:18,fontSize:7 }}>Real Estate Performance</div>
          {[
            { label:'RPPI Year-on-Year',         value:'+13.89%', note:'Q3 2025' },
            { label:'Growth since 2019',          value:'+140%',   note:'Cumulative' },
            { label:'2026 Forecast (coastal)',    value:'8–12%',   note:'Projected appreciation' },
            { label:'VEFA off-plan advantage',    value:'30–60%',  note:'Below completion pricing' },
          ].map(({ label, value, note }, i) => (
            <div key={label} style={{ display:'flex',justifyContent:'space-between',alignItems:'center',padding:'14px 0',borderBottom:'1px solid rgba(200,168,92,0.05)',opacity:visible?1:0,transition:`opacity 0.8s ease ${0.4+i*0.08}s` }}>
              <div>
                <div className="cap" style={{ fontSize:7,marginBottom:3,color:'var(--T3)' }}>{label}</div>
                <div style={{ fontFamily:'var(--F)',fontSize:11,fontStyle:'italic',color:'var(--T3)' }}>{note}</div>
              </div>
              <div style={{ fontFamily:'var(--F)',fontSize:'clamp(16px,2vw,26px)',fontWeight:300,fontStyle:'italic',color:'var(--gold)' }}>{value}</div>
            </div>
          ))}
        </div>

        {/* Rental Yields */}
        <div style={{ padding:'clamp(40px,5vw,72px)' }}>
          <div className="cap" style={{ marginBottom:18,fontSize:7 }}>Rental Yields & Market</div>
          {[
            { label:'Long-term rental',     value:'3–5%',       note:'Gross annual yield' },
            { label:'Short-term luxury',    value:'5–9%',       note:'Premium coastal villas' },
            { label:'Tourism arrivals',     value:'1.436M',     note:'+3.9% growth' },
            { label:'FDI inflow 2025',      value:'Rs 21.39B',  note:'Foreign direct investment' },
            { label:'Foreign approvals',    value:'862',        note:'Verified 2025' },
            { label:'Luxury units sold',    value:'5,396',      note:'Historical market depth' },
          ].map(({ label, value, note }, i) => (
            <div key={label} style={{ display:'flex',justifyContent:'space-between',alignItems:'center',padding:'14px 0',borderBottom:'1px solid rgba(200,168,92,0.05)',opacity:visible?1:0,transition:`opacity 0.8s ease ${0.6+i*0.08}s` }}>
              <div>
                <div className="cap" style={{ fontSize:7,marginBottom:3,color:'var(--T3)' }}>{label}</div>
                <div style={{ fontFamily:'var(--F)',fontSize:11,fontStyle:'italic',color:'var(--T3)' }}>{note}</div>
              </div>
              <div style={{ fontFamily:'var(--F)',fontSize:'clamp(14px,1.6vw,22px)',fontWeight:300,fontStyle:'italic',color:'var(--gold)' }}>{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tax & Residency */}
      <div className="c2" style={{ display:'grid',gridTemplateColumns:'1fr 1fr',borderBottom:'1px solid var(--BL)' }}>
        {/* Tax */}
        <div style={{ padding:'clamp(40px,5vw,72px)',borderRight:'1px solid var(--BL)' }}>
          <div className="cap" style={{ marginBottom:20,fontSize:7 }}>Tax Structure</div>
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:2,marginBottom:20 }}>
            {[
              { label:'Capital Gains Tax', value:'0%' },
              { label:'Estate Tax', value:'0%' },
              { label:'Annual Property Tax', value:'0%' },
              { label:'Inheritance Tax', value:'0%' },
            ].map(({ label, value }, i) => (
              <div key={label} style={{ background:'rgba(200,168,92,0.04)',border:'1px solid var(--BL)',padding:'clamp(18px,2.5vw,28px)',opacity:visible?1:0,transition:`opacity 0.9s ease ${0.5+i*0.1}s` }}>
                <div style={{ fontFamily:'var(--F)',fontSize:'clamp(28px,4vw,52px)',fontWeight:300,fontStyle:'italic',color:'var(--gold)',lineHeight:1,marginBottom:8 }}>{value}</div>
                <div className="cap" style={{ fontSize:6.5,color:'var(--T3)' }}>{label}</div>
              </div>
            ))}
          </div>
          <p style={{ fontFamily:'var(--F)',fontSize:13,fontStyle:'italic',color:'var(--T3)',lineHeight:1.75 }}>Full capital repatriation. No restriction on profit transfer.</p>
        </div>

        {/* Residency */}
        <div style={{ padding:'clamp(40px,5vw,72px)' }}>
          <div className="cap" style={{ marginBottom:20,fontSize:7 }}>Residency Pathways</div>
          {[
            { title:'Permanent Residence Permit', note:'From £1.25M · Ventus qualification threshold', detail:'Buyer, spouse and all dependants included. Valid for duration of ownership. 20-year renewable.', tag:'INCLUDED' },
            { title:'2026 Golden Visa', note:'From $1M investment route', detail:'Family inclusion. Full residency rights. New pathway launching 2026.', tag:'NEW 2026' },
          ].map(({ title, note, detail, tag }, i) => (
            <div key={title} style={{ padding:'clamp(18px,2.5vw,28px)',background:'rgba(200,168,92,0.03)',borderLeft:'2px solid rgba(200,168,92,0.25)',marginBottom:16,opacity:visible?1:0,transition:`opacity 0.9s ease ${0.6+i*0.15}s` }}>
              <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8 }}>
                <div className="cap" style={{ fontSize:7 }}>{title}</div>
                <div style={{ fontFamily:'var(--B)',fontSize:6,letterSpacing:'0.3em',background:'var(--gold)',color:'var(--K)',padding:'3px 8px' }}>{tag}</div>
              </div>
              <div style={{ fontFamily:'var(--F)',fontSize:12,fontStyle:'italic',color:'var(--T2)',marginBottom:6 }}>{note}</div>
              <div style={{ fontFamily:'var(--F)',fontSize:11,fontStyle:'italic',color:'var(--T3)',lineHeight:1.65 }}>{detail}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Urgency — duty rising */}
      <div style={{ padding:'clamp(40px,6vw,80px) clamp(48px,7vw,110px)',background:'rgba(200,168,92,0.03)',borderBottom:'1px solid var(--BL)',opacity:visible?1:0,transition:'opacity 1.2s ease 0.8s' }}>
        <div style={{ display:'flex',flexWrap:'wrap',gap:'clamp(24px,5vw,72px)',alignItems:'center',justifyContent:'space-between' }}>
          <div>
            <div className="cap" style={{ marginBottom:14,fontSize:7,color:'rgba(200,168,92,0.7)' }}>Critical Deadline · Act Before July 2026</div>
            <h3 style={{ fontFamily:'var(--F)',fontSize:'clamp(18px,2.8vw,40px)',fontWeight:300,fontStyle:'italic',color:'var(--T)',lineHeight:1.2,marginBottom:12 }}>
              Registration duty doubles<br />on 1 July 2026
            </h3>
            <p style={{ fontFamily:'var(--F)',fontSize:'clamp(13px,1.3vw,16px)',fontStyle:'italic',color:'var(--T2)',maxWidth:480,lineHeight:1.85 }}>
              Non-citizen registration duty rises from 5% to 10% on 1 July 2026. Complete your purchase before this date and save significantly on the total acquisition cost.
            </p>
          </div>
          <div style={{ display:'flex',gap:24,alignItems:'center' }}>
            <div style={{ textAlign:'center',padding:'clamp(20px,3vw,36px)',border:'1px solid var(--BH)' }}>
              <div style={{ fontFamily:'var(--F)',fontSize:'clamp(28px,4vw,56px)',fontWeight:300,fontStyle:'italic',lineHeight:1,color:'var(--gold)',textDecoration:'line-through',opacity:0.6 }}>5%</div>
              <div className="cap" style={{ fontSize:6.5,marginTop:6,color:'var(--T3)' }}>Current rate</div>
            </div>
            <div style={{ fontFamily:'var(--F)',fontSize:20,color:'var(--T3)',fontStyle:'italic' }}>→</div>
            <div style={{ textAlign:'center',padding:'clamp(20px,3vw,36px)',border:'1px solid rgba(200,168,92,0.5)',background:'rgba(200,168,92,0.05)' }}>
              <div style={{ fontFamily:'var(--F)',fontSize:'clamp(28px,4vw,56px)',fontWeight:300,fontStyle:'italic',lineHeight:1,color:'var(--T)' }}>10%</div>
              <div className="cap" style={{ fontSize:6.5,marginTop:6,color:'var(--T3)' }}>After 1 Jul 2026</div>
            </div>
          </div>
        </div>
      </div>

      {/* Wealth growth hero */}
      <div style={{ padding:'clamp(80px,10vw,140px) clamp(48px,7vw,110px)',textAlign:'center',borderBottom:'1px solid var(--BL)' }}>
        <div className="cap" style={{ marginBottom:14,fontSize:7 }}>Africa's Strongest Decade of Wealth Growth</div>
        <div style={{ fontFamily:'var(--F)',fontSize:'clamp(72px,12vw,152px)',fontWeight:300,fontStyle:'italic',color:'var(--gold)',lineHeight:1,marginBottom:16 }}>+67%</div>
        <p style={{ fontFamily:'var(--F)',fontSize:'clamp(14px,1.4vw,17px)',fontStyle:'italic',color:'var(--T2)',maxWidth:380,margin:'0 auto 36px',lineHeight:1.85 }}>
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
      <div ref={ref} className="c2" style={{ display:'grid',gridTemplateColumns:'1fr 1fr',minHeight:'72vh' }}>
        <div style={{ padding:'clamp(64px,8vw,110px) clamp(48px,6vw,88px)',display:'flex',flexDirection:'column',justifyContent:'center',borderRight:'1px solid var(--BL)' }}>
          <div style={{ opacity:visible?1:0,transform:visible?'none':'translateY(14px)',transition:'all 1.2s ease 0.1s' }}>
            <div className="cap" style={{ marginBottom:20,fontSize:7,letterSpacing:'0.5em' }}>Private Access Only</div>
            <h2 style={{ fontFamily:'var(--H)',fontSize:'clamp(22px,3.2vw,48px)',fontWeight:300,letterSpacing:'0.14em',textTransform:'uppercase',lineHeight:1.28,marginBottom:20,color:'var(--T)' }}>
              Arrange a<br />Private Viewing
            </h2>
            <div style={{ width:44,height:1,background:'linear-gradient(90deg,var(--gold),transparent)',marginBottom:24,opacity:0.6 }} />
            <p style={{ fontFamily:'var(--F)',fontSize:'clamp(13px,1.3vw,16px)',fontStyle:'italic',lineHeight:1.9,color:'var(--T2)',maxWidth:340,marginBottom:36 }}>
              All seven Ventus residences available by private appointment. Advisors available around the clock across every time zone.
            </p>
            <div className="cap" style={{ fontSize:7.5,color:'var(--T3)',lineHeight:2.4 }}>
              hello@ventusestate.mu<br />+230 5000 0000
            </div>
            <div style={{ marginTop:28,padding:'16px 20px',background:'rgba(200,168,92,0.04)',borderLeft:'2px solid rgba(200,168,92,0.2)' }}>
              <div className="cap" style={{ fontSize:6.5,marginBottom:6 }}>Permanent Residency from £1,250,000</div>
              <p style={{ fontFamily:'var(--F)',fontSize:12,fontStyle:'italic',color:'var(--T3)',lineHeight:1.65 }}>Complete the enquiry form to receive the private brochure and investment memorandum for The Ventus Collection.</p>
            </div>
          </div>
        </div>
        <div style={{ padding:'clamp(64px,8vw,110px) clamp(48px,6vw,88px)',display:'flex',flexDirection:'column',justifyContent:'center',opacity:visible?1:0,transition:'opacity 1.2s ease 0.3s' }}>
          <div style={{ display:'flex',flexDirection:'column',gap:24 }}>
            {[{pl:'Full Name',t:'text'},{pl:'Email Address',t:'email'},{pl:'Phone · WhatsApp',t:'tel'},{pl:'Country of Residence',t:'text'},{pl:'Ventus Residence of Interest (I–VII)',t:'text'}].map(({pl,t}) => (
              <input key={pl} type={t} placeholder={pl} />
            ))}
            <textarea placeholder="Your enquiry or preferred viewing dates" rows={3} style={{ resize:'none' }} />
            <a href="mailto:hello@ventusestate.mu" className="btn bg" style={{ textAlign:'center',marginTop:8 }}>Submit Private Enquiry</a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background:'var(--K)',borderTop:'1px solid var(--BL)',padding:'clamp(24px,3.5vw,44px) clamp(48px,7vw,110px)',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:14 }}>
      <div>
        <div style={{ fontFamily:'var(--H)',fontSize:10,fontWeight:300,letterSpacing:'0.4em',color:'var(--T3)',textTransform:'uppercase',marginBottom:4 }}>The Ventus Collection</div>
        <div className="cap" style={{ fontSize:6.5,color:'var(--T3)',opacity:0.5 }}>Seven Private Coastal Residences · Grand Baie, Mauritius</div>
      </div>
      <span className="cap" style={{ fontSize:6.5,color:'var(--T3)' }}>© 2026 · From £1,250,000</span>
      <span className="cap" style={{ fontSize:6.5,color:'var(--T3)' }}>Permanent Residency Included</span>
    </footer>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <Styles />
      <Curtain />
      <Cursor />
      <PBar />
      <Nav />

      {/* 1. DESIRE — Architectural beauty */}
      <Hero />

      {/* Cinematic arrival sequence */}
      <Scene src={IMG.entrance}  label="Ventus I · Arrival"        caption="The estate reveals itself — unhurried, deliberate"      objPos="center 40%" />
      <Scene src={IMG.window}    label="Ventus II · Elevation"      caption="Light held in a single frame, the ocean beyond"         objPos="center 50%" />
      <Scene src={IMG.seaView2}  label="Ventus III · Core Estate"   caption="Architecture in perfect equilibrium with landscape"      objPos="center 35%" />
      <Scene src={IMG.pool1}     label="Ventus IV · Infinity"       caption="Where the water ends and the horizon begins"            objPos="center 45%" />

      {/* 2. COLLECTION INTRO */}
      <VentusIntro />
      <Specs />

      {/* 3. IMAGINATION — Living inside Ventus */}
      <Panel src={IMG.seaVIew}   eyebrow="The Estate · Designed to disappear" title="Architecture that serves the view, not itself" sub="Every orientation calibrated to the ocean. Every opening framed by sky." />
      <Panel src={IMG.seaView}   eyebrow="Interior · Material Permanence"     title="Every surface chosen"        sub="Reclaimed teak. Calacatta Oro. Belgian linen — nothing left to chance." align="right" dim={0.5} />
      <Panel src={IMG.pool2}     eyebrow="Blue Hour · The Pool"                title="The pool at dusk"            sub="Salt air. Candlelight. The horizon on fire." align="center" dim={0.42} />

      {/* Villa Sequence */}
      <VillaSequence />

      <Quote text="The rarest addresses are not found. They are recognised." attr="The Ventus Collection · Grand Baie, Mauritius" />

      {/* Island context */}
      <Scene src={IMG.outdoor}   label="The Setting · Grand Baie"  caption="Minutes from one of the world's last untouched lagoons"  objPos="center 30%" />
      <Island />

      {/* Loro Piana Interiors */}
      <LoroPianaInteriors />

      {/* Helicopter Arrival */}
      <HelicopterArrival />

      <Quote text="Not merely a home. A permanent address in the world's most tax-efficient paradise." attr="Permanent Residence Permit included · From £1,250,000" />

      {/* 4. TRUST — Wellness & Restoration */}
      <WellnessDescent />
      <Wellness />

      {/* 5. TRUST — Investment data */}
      <InvestmentInfographics />

      {/* 6. COMMITMENT — Contact */}
      <Contact />
      <Footer />
    </>
  )
}
