import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react'

export const Route = createFileRoute('/')({
  component: HomePage,
})

// ─── Images — raw GitHub URLs from repo ROOT (not /public) ───────────────────
const R = 'https://raw.githubusercontent.com/byauracle-ai/venerable-beijinho-853d83/main'
const g = (f: string) => `${R}/${encodeURIComponent(f)}`

const I = {
  // Descent sequence
  stair:    g('Screenshot 2026-05-14 202001.png'), // using pool screenshot as stair fallback
  entrance: g('Sea View.png'),
  window:   g('window.png'),
  seaView2: g('Sea view 2.png'),
  // Villa interiors / estate
  pool:     g('Screenshot 2026-05-14 202001.png'),
  // Spa
  spa1:     g('Spa 1.png'),
  spa2:     g('Spa 2.png'),
  spa3:     g('Spa 3.jpg'),
  spaEntry: g('Spa Entry.png'),
  // Island
  island:   g('Sea View.png'),
}

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true) }, { threshold })
    o.observe(el); return () => o.disconnect()
  }, [threshold])
  return { ref, v }
}

function useScrollP(ref: React.RefObject<HTMLDivElement>) {
  const [p, setP] = useState(0)
  useEffect(() => {
    const fn = () => {
      const el = ref.current; if (!el) return
      const r = el.getBoundingClientRect()
      setP(Math.min(1, Math.max(0, -r.top / (el.offsetHeight - window.innerHeight))))
    }
    window.addEventListener('scroll', fn, { passive: true }); fn()
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return p
}

function useCount(target: number, active: boolean, dur = 2000, dec = 0) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    const s = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - s) / dur)
      setVal(parseFloat((( 1 - Math.pow(1-t, 3)) * target).toFixed(dec)))
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [active, target])
  return val
}

// ─── Styles ───────────────────────────────────────────────────────────────────
function Styles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Cinzel:wght@400;500&family=Jost:wght@200;300;400&display=swap');

      *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

      :root{
        --K:#04040a;   /* near-black */
        --D:#080810;   /* dark */
        --M:#0e0e1a;   /* mid */
        --S:#141420;   /* surface */
        --G:#c8a85c;   /* gold */
        --G2:#e2c882;  /* gold light */
        --T:#f2ede6;   /* text primary */
        --T2:#8a8478;  /* text secondary */
        --T3:#4a4840;  /* text muted */
        --BL:rgba(200,168,92,0.1);  /* border */
        --BH:rgba(200,168,92,0.25); /* border hi */
        --F:'Cormorant Garamond',Georgia,serif;
        --H:'Cinzel',serif;
        --B:'Jost',sans-serif;
      }

      html{scroll-behavior:auto}
      body{background:var(--K);color:var(--T);font-family:var(--B);font-weight:300;-webkit-font-smoothing:antialiased;overflow-x:hidden;cursor:none}

      /* Grain */
      body::after{content:'';position:fixed;inset:0;pointer-events:none;z-index:9000;opacity:.02;
        background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        background-size:180px}

      .cap{font-family:var(--B);font-size:9px;font-weight:300;letter-spacing:.36em;text-transform:uppercase;color:var(--G)}
      .na{font-family:var(--B);font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--T2);text-decoration:none;font-weight:300;transition:color .3s}
      .na:hover{color:var(--G2)}
      .btn{display:inline-block;font-family:var(--B);font-size:9px;font-weight:300;letter-spacing:.3em;text-transform:uppercase;text-decoration:none;padding:13px 32px;transition:all .4s;cursor:none;border:none;outline:none}
      .bg{background:var(--G);color:var(--K)}.bg:hover{background:var(--G2);box-shadow:0 6px 40px rgba(200,168,92,.3)}
      .bl{background:transparent;border:1px solid var(--BH);color:var(--T)}.bl:hover{border-color:var(--G);color:var(--G2);background:rgba(200,168,92,.05)}
      .bk{background:var(--T);color:var(--K)}.bk:hover{background:var(--G2)}

      input,textarea{font-family:var(--B);font-size:13px;font-weight:300;letter-spacing:.06em;background:transparent;border:none;border-bottom:1px solid rgba(200,168,92,.15);color:var(--T);padding:14px 0;width:100%;outline:none;transition:border-color .35s}
      input:focus,textarea:focus{border-color:var(--G)}
      input::placeholder,textarea::placeholder{color:var(--T3)}

      #pb{position:fixed;top:0;left:0;height:1px;background:var(--G);z-index:8000;transition:width .1s}

      @keyframes fu{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
      @keyframes fi{from{opacity:0}to{opacity:1}}
      @keyframes kb{from{transform:scale(1)}to{transform:scale(1.05)}}
      @keyframes pl{0%,100%{opacity:.2;transform:scaleY(.3)}50%{opacity:.7;transform:scaleY(1)}}
      @keyframes lineX{from{width:0}to{width:100%}}

      /* Hover glow on images */
      .img-panel img{transition:filter .7s,transform .7s}
      .img-panel:hover img{filter:brightness(1.06) saturate(1.05)}

      @media(max-width:768px){.hm{display:none!important}.c2{grid-template-columns:1fr!important}.c3{grid-template-columns:1fr!important}}
    `}</style>
  )
}

// ─── Cursor ───────────────────────────────────────────────────────────────────
function Cursor() {
  const dot  = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const pos  = useRef({x:-200,y:-200})
  const lag  = useRef({x:-200,y:-200})

  useEffect(() => {
    const move = (e: MouseEvent) => {
      pos.current = {x:e.clientX,y:e.clientY}
      if (dot.current) {
        dot.current.style.transform = `translate(${e.clientX}px,${e.clientY}px) translate(-50%,-50%)`
        dot.current.style.opacity = '1'
      }
      const t = e.target as HTMLElement
      const onBtn = !!t.closest('a,button')
      const onImg = !!t.closest('section,.img-panel')
      if (ring.current) {
        ring.current.style.width  = onImg  ? '50px' : '24px'
        ring.current.style.height = onImg  ? '50px' : '24px'
        ring.current.style.borderColor = onBtn ? 'var(--G2)' : 'rgba(200,168,92,.38)'
      }
    }
    let raf: number
    const lerp = () => {
      lag.current.x += (pos.current.x - lag.current.x) * .1
      lag.current.y += (pos.current.y - lag.current.y) * .1
      if (ring.current) ring.current.style.transform = `translate(${lag.current.x}px,${lag.current.y}px) translate(-50%,-50%)`
      raf = requestAnimationFrame(lerp)
    }
    raf = requestAnimationFrame(lerp)
    window.addEventListener('mousemove', move)
    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(raf) }
  }, [])

  return (
    <>
      <div ref={dot} style={{position:'fixed',top:0,left:0,width:5,height:5,borderRadius:'50%',background:'var(--G)',pointerEvents:'none',zIndex:9999,opacity:0,willChange:'transform'}} />
      <div ref={ring} style={{position:'fixed',top:0,left:0,width:24,height:24,borderRadius:'50%',border:'1px solid rgba(200,168,92,.38)',pointerEvents:'none',zIndex:9998,willChange:'transform',transition:'width .4s,height .4s,border-color .3s'}} />
    </>
  )
}

// ─── Load curtain ─────────────────────────────────────────────────────────────
function Curtain() {
  const [o, setO] = useState(1)
  const [gone, setGone] = useState(false)
  useEffect(() => {
    const t1 = setTimeout(() => setO(0), 300)
    const t2 = setTimeout(() => setGone(true), 1400)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])
  if (gone) return null
  return <div style={{position:'fixed',inset:0,background:'#04040a',zIndex:9990,opacity:o,transition:'opacity 1.1s ease',pointerEvents:'none'}} />
}

// ─── Progress bar ─────────────────────────────────────────────────────────────
function PBar() {
  const [w, setW] = useState(0)
  useEffect(() => {
    const fn = () => { const d = document.documentElement; setW(window.scrollY/(d.scrollHeight-window.innerHeight)*100) }
    window.addEventListener('scroll', fn, {passive:true})
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return <div id="pb" style={{width:`${w}%`}} />
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, {passive:true}); fn()
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:5000,height:68,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 clamp(24px,5vw,72px)',background:scrolled?'rgba(4,4,10,.92)':'transparent',backdropFilter:scrolled?'blur(20px)':'none',borderBottom:`1px solid ${scrolled?'rgba(200,168,92,.07)':'transparent'}`,transition:'background .5s,border-color .5s'}}>
      <a href="/" style={{textDecoration:'none'}}>
        <div style={{fontFamily:'var(--F)',fontSize:17,fontWeight:300,letterSpacing:'.22em',color:'var(--T)',lineHeight:1}}>ÉDEN ESTATES</div>
        <div className="cap" style={{fontSize:7,letterSpacing:'.42em',marginTop:3}}>Mauritius · Est. 2018</div>
      </a>
      <div className="hm" style={{display:'flex',alignItems:'center',gap:44}}>
        {[['Villas','#villas'],['Estate','#estate'],['Island','#island'],['Wellness','#wellness'],['Invest','#invest'],['Contact','#contact']].map(([l,h])=>(
          <a key={l} href={h} className="na">{l}</a>
        ))}
        <a href="#contact" className="btn bl" style={{fontSize:8,padding:'9px 20px'}}>Enquire</a>
      </div>
    </nav>
  )
}

// ─── CINEMATIC DESCENT ────────────────────────────────────────────────────────
// Staircase hero → Sea View → window → Sea view 2 → pool
// Each scene transitions through darkness + blur

const SCENES = [
  { src: I.stair,    label: null,           caption: null,                                          pos:'center 25%' },
  { src: I.entrance, label: 'Arrival',      caption: 'The estate reveals itself — unhurried',       pos:'center 40%' },
  { src: I.window,   label: 'The View',     caption: 'Light and landscape in a single frame',        pos:'center 50%' },
  { src: I.seaView2, label: 'The Horizon',  caption: 'Unobstructed. Uncompromising. Yours.',         pos:'center 35%' },
  { src: I.pool,     label: 'The Pool',     caption: 'Where the water ends and the ocean begins',    pos:'center 45%' },
]

function Descent() {
  const ref = useRef<HTMLDivElement>(null)
  const [p, setP] = useState(0)

  useEffect(() => {
    const fn = () => {
      const el = ref.current; if (!el) return
      const r = el.getBoundingClientRect()
      const total = el.offsetHeight - window.innerHeight
      setP(Math.min(1, Math.max(0, -r.top / total)))
    }
    window.addEventListener('scroll', fn, {passive:true}); fn()
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const n   = SCENES.length
  const raw = p * n
  const idx = Math.min(n-1, Math.floor(raw))
  const sp  = raw - idx  // 0→1 within scene

  // Transitions: exit last 28%, entry first 28%
  const exit  = sp > .72 ? (sp-.72)/.28 : 0
  const entry = sp < .28 ? 1 - sp/.28   : 0
  const dark  = Math.max(exit, entry)
  const blur  = dark * 14

  // Caption: visible 30%→72%
  const capO = sp>.3&&sp<.72 ? Math.min(1,(sp-.3)/.1,((.72-sp)/.08)) : 0

  // Hero text fades as scene 0 scrolls
  const heroO = idx===0 ? Math.max(0, 1 - sp*3.5) : 0

  // Staircase bottom shadow grows as you descend
  const stairShadow = idx===0 ? Math.min(.88, sp*2) : 0

  const scene = SCENES[idx]
  const next  = SCENES[idx+1]

  return (
    // 5 scenes × 140vh = 700vh — cinematic but not endless
    <div ref={ref} id="estate" style={{height:`${n*140}vh`,position:'relative'}}>
      <div style={{position:'sticky',top:0,height:'100dvh',overflow:'hidden',background:'#000'}}>

        {/* Scene image */}
        <img
          key={idx}
          src={scene.src}
          alt={scene.label ?? 'Éden Estates'}
          style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',objectPosition:scene.pos,filter:`blur(${blur}px)`,transform:`scale(${1+blur*.006})`,willChange:'filter,transform'}}
        />

        {/* Staircase bottom darkening — feel of descending */}
        {idx===0 && <div style={{position:'absolute',inset:0,pointerEvents:'none',background:`linear-gradient(to top,rgba(4,4,10,${stairShadow}) 0%,transparent 55%)`}} />}

        {/* Preload next */}
        {next && <img key={`p${idx}`} src={next.src} alt="" style={{position:'absolute',width:1,height:1,opacity:0,pointerEvents:'none'}} />}

        {/* Scroll-driven dark overlay */}
        <div style={{position:'absolute',inset:0,background:`rgba(4,4,10,${dark})`,pointerEvents:'none'}} />

        {/* Permanent bottom vignette */}
        <div style={{position:'absolute',inset:0,pointerEvents:'none',background:'linear-gradient(to top,rgba(4,4,10,.82) 0%,transparent 44%)'}} />

        {/* ── HERO TEXT — scene 0 ── */}
        <div style={{position:'absolute',bottom:'clamp(72px,9vw,120px)',left:'clamp(40px,6vw,96px)',opacity:heroO,maxWidth:700,pointerEvents:heroO>.05?'all':'none',transition:'opacity .05s'}}>
          <div className="cap" style={{marginBottom:20,fontSize:8}}>Grand Baie · North Coast · Mauritius</div>
          <h1 style={{fontFamily:'var(--H)',fontSize:'clamp(15px,1.8vw,26px)',fontWeight:400,letterSpacing:'.28em',textTransform:'uppercase',color:'var(--T)',margin:'0 0 18px',lineHeight:1.5}}>
            Where luxury<br />finds its address
          </h1>
          <div style={{width:44,height:1,background:'var(--G)',opacity:.5,marginBottom:22}} />
          <p style={{fontFamily:'var(--F)',fontSize:'clamp(14px,1.5vw,17px)',fontStyle:'italic',color:'rgba(242,237,230,.52)',maxWidth:380,lineHeight:1.85,marginBottom:36}}>
            7 boutique villas of singular distinction. Permanent residency included. From £1,250,000.
          </p>
          <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
            <a href="#villas" className="btn bg">Explore Villas</a>
            <a href="#contact" className="btn bl">Private Viewing</a>
          </div>
        </div>

        {/* Yield badge — scene 0 */}
        <div style={{position:'absolute',top:88,right:'clamp(24px,5vw,72px)',opacity:heroO,pointerEvents:'none',borderTop:'1px solid rgba(200,168,92,.22)',borderBottom:'1px solid rgba(200,168,92,.22)',padding:'16px 24px',textAlign:'center',background:'rgba(4,4,10,.52)',backdropFilter:'blur(12px)'}}>
          <div className="cap" style={{fontSize:7,marginBottom:7}}>Est. Gross Yield</div>
          <div style={{fontFamily:'var(--F)',fontSize:36,fontWeight:300,lineHeight:1,color:'var(--G)'}}>9%</div>
          <div style={{fontFamily:'var(--F)',fontSize:10,fontStyle:'italic',color:'var(--T3)',marginTop:4}}>short-term rental</div>
        </div>

        {/* ── SCENE CAPTIONS — scenes 1–4 ── */}
        {scene.label && (
          <div style={{position:'absolute',bottom:'clamp(52px,7vh,88px)',left:'clamp(40px,6vw,96px)',opacity:capO,transform:`translateY(${(1-Math.min(1,capO*3))*8}px)`,pointerEvents:'none',maxWidth:540,transition:'opacity .08s,transform .08s'}}>
            <div className="cap" style={{marginBottom:12,fontSize:8}}>{scene.label}</div>
            <p style={{fontFamily:'var(--F)',fontSize:'clamp(20px,2.8vw,44px)',fontStyle:'italic',fontWeight:300,color:'var(--T)',lineHeight:1.18}}>{scene.caption}</p>
          </div>
        )}

        {/* Counter */}
        {idx>0 && <div className="cap" style={{position:'absolute',top:26,left:'clamp(28px,4vw,56px)',fontSize:8,color:'rgba(200,168,92,.28)',opacity:capO}}>{String(idx).padStart(2,'0')} / {String(n-1).padStart(2,'0')}</div>}

        {/* Scroll cue — scene 0 */}
        <div style={{position:'absolute',bottom:52,left:'50%',transform:'translateX(-50%)',opacity:heroO*.6,pointerEvents:'none',display:'flex',flexDirection:'column',alignItems:'center',gap:8}}>
          <div className="cap" style={{fontSize:7}}>Scroll</div>
          <div style={{width:1,height:44,background:'linear-gradient(to bottom,var(--G),transparent)',animation:'pl 2s ease infinite'}} />
        </div>

        {/* Progress */}
        <div style={{position:'absolute',bottom:0,left:0,right:0,height:1,background:'rgba(200,168,92,.06)'}}>
          <div style={{height:'100%',background:'var(--G)',width:`${p*100}%`}} />
        </div>

        {/* Dots */}
        <div style={{position:'absolute',bottom:16,left:'50%',transform:'translateX(-50%)',display:'flex',gap:8}}>
          {SCENES.map((_,i)=>(
            <div key={i} style={{width:i===idx?18:4,height:1,background:i===idx?'var(--G)':'rgba(200,168,92,.18)',transition:'all .4s'}} />
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Full-bleed image panel ───────────────────────────────────────────────────
function Panel({src,eyebrow,title,sub,align='left',pos='center',dim=.45,id}: {
  src:string;eyebrow?:string;title:string;sub?:string
  align?:'left'|'center'|'right';pos?:string;dim?:number;id?:string
}) {
  const {ref,v} = useInView(.08)
  const a = align==='center'?{textAlign:'center' as const,left:0,right:0}
           :align==='right' ?{textAlign:'right'  as const,right:'clamp(40px,7vw,120px)'}
           :                 {left:'clamp(40px,7vw,120px)'}
  return (
    <section id={id} className="img-panel" style={{height:'100dvh',position:'relative',overflow:'hidden',display:'flex',flexDirection:'column',justifyContent:'flex-end'}}>
      <img src={src} alt={title} loading="lazy" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',objectPosition:pos}} />
      <div style={{position:'absolute',inset:0,background:`linear-gradient(to top,rgba(4,4,10,${dim+.4}) 0%,rgba(4,4,10,${dim*.18}) 46%,transparent 100%)`}} />
      <div ref={ref} style={{position:'relative',zIndex:2,padding:'clamp(40px,6vw,96px)',paddingBottom:'clamp(52px,7vw,96px)',...a,opacity:v?1:0,transform:v?'none':'translateY(16px)',transition:'opacity 1.4s ease,transform 1.4s ease'}}>
        {eyebrow && <div className="cap" style={{marginBottom:14}}>{eyebrow}</div>}
        <h2 style={{fontFamily:'var(--F)',fontSize:'clamp(30px,5vw,76px)',fontWeight:300,fontStyle:'italic',lineHeight:1.06,color:'var(--T)',margin:0}}>{title}</h2>
        {sub && <p style={{fontFamily:'var(--F)',fontSize:'clamp(14px,1.5vw,18px)',fontStyle:'italic',color:'rgba(242,237,230,.55)',marginTop:16,maxWidth:460,lineHeight:1.75,...(align==='center'?{margin:'16px auto 0',display:'block'}:{})}}>{sub}</p>}
      </div>
    </section>
  )
}

// ─── Specs bar ────────────────────────────────────────────────────────────────
function Specs() {
  const {ref,v} = useInView()
  const items = [{val:'7',lab:'Boutique Villas'},{val:'5',lab:'Bedrooms (max)'},{val:'820m²',lab:'Interior (max)'},{val:'9%',lab:'Gross Yield'},{val:'0%',lab:'Capital Gains Tax'},{val:'£1.25M',lab:'From'}]
  return (
    <div ref={ref} style={{display:'grid',gridTemplateColumns:'repeat(6,1fr)',borderTop:'1px solid var(--BL)',borderBottom:'1px solid var(--BL)',background:'var(--K)'}} className="c3">
      {items.map(({val,lab},i)=>(
        <div key={lab} style={{padding:'clamp(28px,4vw,56px) clamp(14px,2.5vw,32px)',borderLeft:i>0?'1px solid var(--BL)':'none',opacity:v?1:0,transform:v?'none':'translateY(12px)',transition:`all .8s ease ${i*.07}s`}}>
          <div style={{fontFamily:'var(--F)',fontSize:'clamp(22px,3vw,46px)',fontWeight:300,fontStyle:'italic',color:'var(--G)',lineHeight:1,marginBottom:7}}>{val}</div>
          <div className="cap" style={{fontSize:8,color:'var(--T3)'}}>{lab}</div>
        </div>
      ))}
    </div>
  )
}

// ─── 7 Villa tiers ────────────────────────────────────────────────────────────
const VILLAS = [
  {name:'Maison Lagon',   loc:'Trou aux Biches',  price:'£1,250,000', tag:'Entry',     beds:3,baths:4,sqm:380, yld:'6.8%',img:I.entrance, desc:'Steps from the most celebrated lagoon in Mauritius. Fully furnished, income-generating from day one.'},
  {name:'Villa Corail',   loc:'Grand Baie',        price:'£1,650,000', tag:'Signature', beds:3,baths:4,sqm:440, yld:'7.2%',img:I.window,   desc:'Panoramic lagoon views from every room. A villa that disappears into the landscape.'},
  {name:'Domaine Azur',   loc:'Péreybère',         price:'£1,950,000', tag:'Premium',   beds:4,baths:5,sqm:560, yld:'7.6%',img:I.seaView2, desc:'Elevated position with 180° northern lagoon views. Architect-designed, immaculately finished.'},
  {name:'Domaine Noir',   loc:'Bel Ombre',         price:'£2,100,000', tag:"Collector's",beds:4,baths:5,sqm:640,yld:'7.5%',img:I.spa1,    desc:'Monolithic basalt and 22-metre lap pool on 1.4 hectares of private nature reserve.'},
  {name:'Villa Lumière',  loc:'Tamarin',           price:'£2,750,000', tag:'Grand',     beds:5,baths:6,sqm:720, yld:'8.2%',img:I.spaEntry, desc:'Moorish geometry meets Creole colour. Rooftop terrace with 360° mountain-to-ocean views.'},
  {name:'Résidence Soleil',loc:'Black River',      price:'£3,200,000', tag:'Estate',    beds:5,baths:6,sqm:800, yld:'8.8%',img:I.spa2,     desc:'Six suites surrounding a double infinity pool with fire features. Paris-designed interiors.'},
  {name:'Villa Azur',     loc:'Grand Baie',        price:'£3,750,000', tag:'Flagship',  beds:5,baths:6,sqm:820, yld:'9.0%',img:I.pool,     desc:'The definitive Mauritian estate. Infinity pool, private beach, wine cellar, dedicated concierge.'},
]

function Villas() {
  const [active, setActive] = useState(0)
  const {ref,v} = useInView(.06)
  const villa = VILLAS[active]
  return (
    <section id="villas" ref={ref} style={{background:'var(--D)',borderTop:'1px solid var(--BL)'}}>
      {/* Header */}
      <div style={{padding:'clamp(56px,7vw,100px) clamp(40px,6vw,96px) 0',opacity:v?1:0,transform:v?'none':'translateY(12px)',transition:'all .9s'}}>
        <div className="cap" style={{marginBottom:12}}>Exclusive Portfolio · 7 Estates</div>
        <h2 style={{fontFamily:'var(--F)',fontSize:'clamp(26px,4vw,58px)',fontWeight:300,fontStyle:'italic',color:'var(--T)',marginBottom:36}}>
          Seven addresses. One island.
        </h2>
        {/* Tab bar */}
        <div style={{display:'flex',flexWrap:'wrap',borderBottom:'1px solid var(--BL)',gap:0}}>
          {VILLAS.map((vi,i)=>(
            <button key={vi.name} onClick={()=>setActive(i)} style={{fontFamily:'var(--B)',fontSize:8,fontWeight:300,letterSpacing:'.22em',textTransform:'uppercase',background:'none',border:'none',cursor:'none',padding:'12px 20px 12px 0',color:active===i?'var(--G)':'var(--T3)',borderBottom:active===i?'1px solid var(--G)':'1px solid transparent',marginBottom:-1,transition:'all .3s',whiteSpace:'nowrap'}}>
              {vi.name}
            </button>
          ))}
        </div>
      </div>

      {/* Active villa */}
      <div key={active} style={{display:'grid',gridTemplateColumns:'1fr 1fr',minHeight:'66vh',animation:'fi .45s ease forwards'}} className="c2">
        <div className="img-panel" style={{position:'relative',overflow:'hidden',minHeight:340}}>
          <img src={villa.img} alt={villa.name} style={{width:'100%',height:'100%',objectFit:'cover'}} />
          <div style={{position:'absolute',top:16,left:16}}>
            <div style={{background:'var(--G)',color:'var(--K)',fontFamily:'var(--B)',fontSize:8,letterSpacing:'.24em',textTransform:'uppercase',padding:'5px 12px'}}>{villa.tag}</div>
          </div>
          <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(4,4,10,.6) 0%,transparent 50%)'}} />
        </div>
        <div style={{padding:'clamp(40px,5vw,80px)',display:'flex',flexDirection:'column',justifyContent:'center',background:'var(--M)'}}>
          <div className="cap" style={{marginBottom:9,fontSize:7,color:'var(--T3)'}}>{villa.loc} · Mauritius</div>
          <h3 style={{fontFamily:'var(--F)',fontSize:'clamp(22px,3vw,44px)',fontWeight:300,fontStyle:'italic',color:'var(--T)',marginBottom:6,lineHeight:1.1}}>{villa.name}</h3>
          <div style={{fontFamily:'var(--F)',fontSize:'clamp(18px,2.2vw,32px)',fontWeight:300,color:'var(--G)',marginBottom:24}}>{villa.price}</div>
          <div style={{display:'flex',gap:22,marginBottom:22,paddingBottom:22,borderBottom:'1px solid var(--BL)'}}>
            {[{v:villa.beds,l:'Beds'},{v:villa.baths,l:'Baths'},{v:`${villa.sqm}m²`,l:'Interior'},{v:villa.yld,l:'Yield'}].map(({v,l})=>(
              <div key={l}>
                <div style={{fontFamily:'var(--F)',fontSize:'clamp(15px,1.8vw,24px)',fontWeight:300,fontStyle:'italic',color:'var(--T)',lineHeight:1}}>{v}</div>
                <div className="cap" style={{fontSize:7,color:'var(--T3)',marginTop:4}}>{l}</div>
              </div>
            ))}
          </div>
          <p style={{fontFamily:'var(--F)',fontSize:'clamp(13px,1.3vw,16px)',fontStyle:'italic',lineHeight:1.85,color:'var(--T2)',marginBottom:28}}>{villa.desc}</p>
          <div style={{display:'flex',gap:10,marginBottom:22,flexWrap:'wrap'}}>
            <a href="#contact" className="btn bg" style={{fontSize:8,padding:'11px 22px'}}>Request Brochure</a>
            <a href="#contact" className="btn bl" style={{fontSize:8,padding:'11px 22px'}}>Arrange Viewing</a>
          </div>
          <div style={{padding:'11px 14px',background:'rgba(200,168,92,.05)',borderLeft:'2px solid var(--G)'}}>
            <div className="cap" style={{fontSize:7,marginBottom:4}}>Permanent Residency Included</div>
            <div style={{fontFamily:'var(--F)',fontSize:12,fontStyle:'italic',color:'var(--T3)',lineHeight:1.6}}>Qualifies under EDB schemes. Buyer, spouse and dependants receive PRP for duration of ownership.</div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Quote ────────────────────────────────────────────────────────────────────
function Quote({text,attr}:{text:string;attr?:string}) {
  const {ref,v} = useInView(.28)
  return (
    <section ref={ref} style={{background:'var(--M)',padding:'clamp(80px,11vw,150px) clamp(40px,10vw,180px)',textAlign:'center',borderTop:'1px solid var(--BL)',borderBottom:'1px solid var(--BL)'}}>
      <div style={{width:v?40:0,height:1,background:'var(--G)',margin:'0 auto 36px',transition:'width 1.2s ease',opacity:.5}} />
      <blockquote style={{fontFamily:'var(--F)',fontSize:'clamp(19px,3.2vw,46px)',fontWeight:300,fontStyle:'italic',lineHeight:1.32,color:'var(--T)',maxWidth:780,margin:'0 auto',opacity:v?1:0,transform:v?'none':'translateY(10px)',transition:'all 1.4s ease .15s'}}>
        "{text}"
      </blockquote>
      {attr && <div className="cap" style={{marginTop:28,fontSize:8,color:'var(--T3)',opacity:v?1:0,transition:'opacity 1s ease .7s'}}>{attr}</div>}
    </section>
  )
}

// ─── Island ───────────────────────────────────────────────────────────────────
function Island() {
  return (
    <section id="island">
      <Panel src={I.entrance} eyebrow="The Setting · Grand Baie · Mauritius" title="Minutes from one of the world's last untouched lagoons" sub="The northern lagoon — turquoise, warm, and impossibly clear year-round." pos="center 30%" dim={.5} />
      <div style={{background:'var(--D)',display:'grid',gridTemplateColumns:'repeat(3,1fr)',borderTop:'1px solid var(--BL)',borderBottom:'1px solid var(--BL)'}} className="c3">
        {[{v:'330',u:'days',l:'of sunshine per year'},{v:'27°',u:'avg',l:'Indian Ocean temperature'},{v:'5',u:'min',l:'to Grand Baie marina'}].map(({v,u,l},i)=>(
          <div key={l} style={{padding:'clamp(32px,4vw,56px)',borderRight:i<2?'1px solid var(--BL)':'none',textAlign:'center'}}>
            <div style={{fontFamily:'var(--F)',fontSize:'clamp(28px,4vw,58px)',fontWeight:300,fontStyle:'italic',color:'var(--G)',lineHeight:1}}>{v}<span style={{fontSize:'36%',marginLeft:4,color:'var(--T3)'}}>{u}</span></div>
            <div className="cap" style={{fontSize:8,color:'var(--T3)',marginTop:9}}>{l}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Wellness ─────────────────────────────────────────────────────────────────
function WellnessDescent() {
  const ref = useRef<HTMLDivElement>(null)
  const p = useScrollP(ref)
  const dark = p<.5?0:Math.min(1,(p-.5)/.42)
  const txt  = p<.66?0:Math.min(1,(p-.66)*7)
  const blur = dark*13
  return (
    <div ref={ref} style={{minHeight:'130dvh',position:'relative',overflow:'hidden'}}>
      <img src={I.spaEntry} alt="Wellness" style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center 30%',position:'absolute',inset:0,filter:`blur(${blur}px)`,transform:`scale(${1+p*.05+blur*.004})`}} />
      <div style={{position:'absolute',inset:0,background:`rgba(4,4,10,${dark})`}} />
      <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',padding:40,opacity:txt}}>
        <div className="cap" style={{marginBottom:18,letterSpacing:'.44em'}}>Descend · Restore · Transcend</div>
        <h2 style={{fontFamily:'var(--F)',fontSize:'clamp(26px,4.5vw,62px)',fontWeight:300,fontStyle:'italic',color:'var(--T)',lineHeight:1.12}}>
          The Wellness<br/>
          <span style={{background:'linear-gradient(90deg,var(--G),var(--G2),var(--G))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>Sanctuary</span>
        </h2>
      </div>
    </div>
  )
}

function Wellness() {
  const {ref,v} = useInView()
  return (
    <section id="wellness" style={{background:'#040408'}}>
      {/* Header */}
      <div style={{padding:'clamp(64px,8vw,110px) clamp(40px,6vw,96px)',textAlign:'center',borderBottom:'1px solid rgba(200,168,92,.05)'}}>
        <div className="cap" style={{marginBottom:16}}>In-Residence Wellness</div>
        <h2 style={{fontFamily:'var(--F)',fontSize:'clamp(28px,4.5vw,66px)',fontWeight:300,fontStyle:'italic',color:'var(--T)',lineHeight:1.1,marginBottom:20}}>The Spa Sanctuary</h2>
        <div style={{width:1,height:56,background:'linear-gradient(to bottom,var(--G),transparent)',margin:'0 auto 22px'}} />
        <p style={{fontFamily:'var(--F)',fontSize:'clamp(14px,1.5vw,18px)',fontStyle:'italic',color:'rgba(242,237,230,.38)',maxWidth:480,margin:'0 auto',lineHeight:1.82}}>Ancient Mauritian healing traditions, reborn in volcanic stone and total silence.</p>
      </div>
      {/* Spa panels */}
      <Panel src={I.spa1}    eyebrow="Concierge"  title="Your Dedicated Curator"    sub="A personal wellness director — anticipating every need before it becomes one." pos="center 30%" dim={.52} />
      <Panel src={I.spa2}    eyebrow="Treatment"  title="The Treatment Sanctuary"   sub="Volcanic stone · Cold ocean mineral · Island botanicals." align="right" dim={.52} />
      <Panel src={I.spa3}    eyebrow="Restoration" title="Deep Restoration"         sub="Total silence. Total surrender. Total renewal." align="center" dim={.58} />
      {/* Offerings */}
      <div ref={ref} style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',borderTop:'1px solid rgba(200,168,92,.05)'}}>
        {[{n:'Hydrotherapy',d:'Heated jet pool, cold plunge, mineral steam'},{n:'Body Rituals',d:'Volcanic stone · Coconut · Ayurvedic'},{n:'Yoga Pavilion',d:'Sunrise & sunset, resident instructor'},{n:'Nutrition',d:'Ayurvedic & plant-based cuisine'}].map(({n,d},i)=>(
          <div key={n} style={{padding:'clamp(28px,3.5vw,52px) clamp(18px,2.5vw,36px)',borderRight:i<3?'1px solid rgba(200,168,92,.05)':'none',opacity:v?1:0,transform:v?'none':'translateY(10px)',transition:`all .8s ease ${i*.09}s`}}>
            <div className="cap" style={{fontSize:8,marginBottom:9}}>{n}</div>
            <p style={{fontFamily:'var(--F)',fontSize:14,fontStyle:'italic',color:'rgba(242,237,230,.26)',lineHeight:1.72}}>{d}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Stats (counting) ─────────────────────────────────────────────────────────
function StatBox({target,suffix,label,note,dec=0,active,delay=0,border}:{target:number;suffix:string;label:string;note:string;dec?:number;active:boolean;delay?:number;border:boolean}) {
  const [go,setGo] = useState(false)
  useEffect(()=>{if(active){const t=setTimeout(()=>setGo(true),delay);return()=>clearTimeout(t)}},[active,delay])
  const val = useCount(target,go,2000,dec)
  return (
    <div style={{padding:'clamp(40px,5vw,68px) clamp(18px,3vw,40px)',borderRight:border?'1px solid var(--BL)':'none',textAlign:'center'}}>
      <div style={{fontFamily:'var(--F)',fontSize:'clamp(32px,5vw,76px)',fontWeight:300,fontStyle:'italic',lineHeight:1,color:'var(--G)',marginBottom:9}}>
        {dec===0?Math.round(val):val.toFixed(dec)}{suffix}
      </div>
      <div className="cap" style={{fontSize:8,marginBottom:6}}>{label}</div>
      <div style={{fontFamily:'var(--F)',fontSize:12,fontStyle:'italic',color:'var(--T3)'}}>{note}</div>
    </div>
  )
}

function Stats() {
  const {ref,v} = useInView(.28)
  return (
    <section ref={ref} style={{background:'var(--S)',borderTop:'1px solid var(--BL)',borderBottom:'1px solid var(--BL)'}}>
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)'}} className="c2">
        {[
          {target:13.89,suffix:'%',label:'RPPI Growth Q3 2025',   note:'Statistics Mauritius',dec:2},
          {target:140,  suffix:'%',label:'Cumulative since 2019', note:'Property price growth'},
          {target:9,    suffix:'%',label:'Gross rental yield',    note:'Short-term coastal villa'},
          {target:67,   suffix:'%',label:'Wealth growth 2015–25', note:"Africa's strongest decade"},
        ].map((d,i)=><StatBox key={d.label} {...d} active={v} delay={i*130} border={i<3} />)}
      </div>
    </section>
  )
}

// ─── Investment ───────────────────────────────────────────────────────────────
function Investment() {
  const {ref,v} = useInView()
  return (
    <section id="invest" style={{background:'var(--K)'}}>
      <div style={{padding:'clamp(64px,8vw,110px) clamp(40px,6vw,96px) 0',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'clamp(32px,6vw,88px)'}} className="c2">
        <div ref={ref} style={{opacity:v?1:0,transform:v?'none':'translateY(14px)',transition:'all 1s'}}>
          <div className="cap" style={{marginBottom:14}}>Market Intelligence · 2025–2026</div>
          <h2 style={{fontFamily:'var(--F)',fontSize:'clamp(24px,3.5vw,52px)',fontWeight:300,fontStyle:'italic',lineHeight:1.1,color:'var(--T)',marginBottom:20}}>The case for Mauritius</h2>
          <p style={{fontFamily:'var(--F)',fontSize:'clamp(14px,1.4vw,17px)',fontStyle:'italic',lineHeight:1.85,color:'var(--T2)'}}>
            Five reasons converge into one irrefutable argument: capital appreciation, rental income, permanent residency, zero capital gains, and a way of life unavailable anywhere else on earth.
          </p>
        </div>
        <div style={{borderLeft:'1px solid var(--BL)',paddingLeft:'clamp(28px,4vw,64px)',display:'flex',flexDirection:'column'}}>
          {[
            {e:'Price Appreciation',t:'8–12% forecast growth in 2026',d:'VEFA off-plan buyers lock in 30–60% below completed units. Bank-backed guarantees.'},
            {e:'Permanent Residency',t:'Family PRP from £1.25M',d:'Buyer, spouse and all dependants. Valid for duration of ownership. 20-year renewable.'},
            {e:'Tax Position',t:'0% CGT · 0% Estate Tax',d:'No capital gains, no inheritance tax, no annual property tax. Full repatriation of profits.'},
            {e:'Act Before July 2026',t:'Registration duty doubles',d:'Non-citizen duty rises 5%→10% on 1 July 2026. Buy now and save significantly.'},
          ].map(({e,t,d},i)=>(
            <div key={e} style={{padding:'clamp(18px,2.2vw,28px) 0',borderBottom:'1px solid var(--BL)',opacity:v?1:0,transform:v?'none':'translateX(10px)',transition:`all .85s ease ${i*.1}s`}}>
              <div className="cap" style={{fontSize:7,marginBottom:5}}>{e}</div>
              <div style={{fontFamily:'var(--F)',fontSize:'clamp(13px,1.5vw,19px)',fontStyle:'italic',color:'var(--T)',marginBottom:5}}>{t}</div>
              <div style={{fontFamily:'var(--F)',fontSize:13,fontStyle:'italic',color:'var(--T3)',lineHeight:1.7}}>{d}</div>
            </div>
          ))}
        </div>
      </div>
      {/* +67% callout */}
      <div style={{padding:'clamp(60px,8vw,100px) clamp(40px,6vw,96px)',textAlign:'center',marginTop:'clamp(48px,6vw,80px)',borderTop:'1px solid var(--BL)'}}>
        <div className="cap" style={{marginBottom:14}}>Africa's Strongest Decade of Wealth Growth</div>
        <div style={{fontFamily:'var(--F)',fontSize:'clamp(68px,11vw,140px)',fontWeight:300,fontStyle:'italic',color:'var(--G)',lineHeight:1,marginBottom:14}}>+67%</div>
        <p style={{fontFamily:'var(--F)',fontSize:'clamp(14px,1.4vw,17px)',fontStyle:'italic',color:'var(--T2)',maxWidth:400,margin:'0 auto 32px',lineHeight:1.82}}>
          Total investable wealth growth, Mauritius 2015–2025.
        </p>
        <a href="#contact" className="btn bg">Request Investment Brief</a>
      </div>
    </section>
  )
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  const {ref,v} = useInView()
  return (
    <section id="contact" style={{background:'var(--D)',borderTop:'1px solid var(--BL)'}}>
      <div ref={ref} style={{display:'grid',gridTemplateColumns:'1fr 1fr',minHeight:'72vh'}} className="c2">
        <div style={{padding:'clamp(56px,7vw,100px) clamp(36px,5.5vw,80px)',display:'flex',flexDirection:'column',justifyContent:'center',borderRight:'1px solid var(--BL)'}}>
          <div style={{opacity:v?1:0,transform:v?'none':'translateY(12px)',transition:'all 1s ease .1s'}}>
            <div className="cap" style={{marginBottom:18}}>Private Access Only</div>
            <h2 style={{fontFamily:'var(--F)',fontSize:'clamp(26px,3.5vw,52px)',fontWeight:300,fontStyle:'italic',lineHeight:1.12,marginBottom:20,color:'var(--T)'}}>Arrange a<br/>Private Viewing</h2>
            <p style={{fontFamily:'var(--F)',fontSize:'clamp(13px,1.3vw,16px)',fontStyle:'italic',lineHeight:1.85,color:'var(--T2)',maxWidth:320,marginBottom:32}}>
              All seven estates available by private appointment. Advisors reachable around the clock.
            </p>
            <div className="cap" style={{fontSize:8,color:'var(--T3)',lineHeight:2.2}}>hello@edenestates.mu<br/>+230 5000 0000</div>
          </div>
        </div>
        <div style={{padding:'clamp(56px,7vw,100px) clamp(36px,5.5vw,80px)',display:'flex',flexDirection:'column',justifyContent:'center',opacity:v?1:0,transition:'opacity 1s ease .3s'}}>
          <div style={{display:'flex',flexDirection:'column',gap:22}}>
            {[{p:'Full Name',t:'text'},{p:'Email Address',t:'email'},{p:'Phone · WhatsApp',t:'tel'},{p:'Country of Residence',t:'text'}].map(({p,t})=>(
              <input key={p} type={t} placeholder={p} />
            ))}
            <textarea placeholder="Your enquiry or preferred dates" rows={3} style={{resize:'none'}} />
            <a href="mailto:hello@edenestates.mu" className="btn bg" style={{textAlign:'center',marginTop:6}}>Submit Enquiry</a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{background:'var(--K)',borderTop:'1px solid var(--BL)',padding:'clamp(22px,3vw,40px) clamp(40px,6vw,96px)',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12}}>
      <span style={{fontFamily:'var(--F)',fontSize:13,fontWeight:300,fontStyle:'italic',letterSpacing:'.18em',color:'var(--T3)'}}>ÉDEN ESTATES</span>
      <span className="cap" style={{fontSize:7,color:'var(--T3)'}}>© 2026 · Grand Baie, Mauritius</span>
      <span className="cap" style={{fontSize:7,color:'var(--T3)'}}>7 Boutique Villas · From £1,250,000</span>
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

      {/* Cinematic descent: stair → Sea View → window → Sea view 2 → pool */}
      <Descent />

      {/* Estate */}
      <Specs />
      <Panel id="estate" src={I.seaView2} eyebrow="The Estate" title="Designed to disappear into the landscape" sub="Award-winning architecture that serves the view, not itself." />
      <Panel src={I.window} eyebrow="Interior" title="Every surface chosen" sub="Reclaimed teak, Calacatta Oro, Belgian linen — no detail unconsidered." align="right" dim={.5} />
      <Panel src={I.pool} eyebrow="Infinity Edge" title="Where the pool ends" sub="And the Indian Ocean begins." align="center" dim={.42} />

      {/* 7 Villas */}
      <Villas />

      {/* Quote */}
      <Quote text="The rarest addresses are not found. They are recognised." attr="Éden Estates · Grand Baie, Mauritius" />

      {/* Island */}
      <Island />

      {/* Quote 2 */}
      <Quote text="Not merely a home. A permanent address in the world's most tax-efficient paradise." attr="Permanent Residence Permit included · From £1,250,000" />

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
