<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>VENTUS — East Coast, Mauritius.</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Montserrat:wght@200;300;400;500&display=swap" rel="stylesheet" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  <style>
    :root {
      --bg:        #090907;
      --s1:        #0e0e0c;
      --s2:        #141412;
      --s3:        #1b1b18;
      --gold:      #c9a84c;
      --gold-lt:   #e2c97e;
      --gold-dk:   #8b6f2e;
      --gold-hair: rgba(201,168,76,.22);
      --gold-glow: rgba(201,168,76,.08);
      --white:     #f0ede6;
      --mid:       #b0ab9f;
      --mute:      #6a6660;
      --border:    rgba(201,168,76,.14);
      --border-hi: rgba(201,168,76,.38);
      --serif:     'Cormorant Garamond', Georgia, serif;
      --sans:      'Montserrat', system-ui, sans-serif;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; background: var(--bg); }
    body {
      font-family: var(--sans);
      color: var(--white);
      background: var(--bg);
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
      cursor: none;
    }
    ::selection { background: rgba(201,168,76,.2); }
    img { display: block; width: 100%; }
    a { color: inherit; text-decoration: none; }

    /* CURSOR */
    #cur, #cur-ring {
      position: fixed; top: 0; left: 0;
      border-radius: 50%; pointer-events: none;
      z-index: 9900; transform: translate(-50%,-50%);
    }
    #cur { width: 8px; height: 8px; background: var(--gold); mix-blend-mode: screen; }
    #cur-ring { width: 32px; height: 32px; border: 1px solid rgba(201,168,76,.5); }

    /* LOADER */
    #loader {
      position: fixed; inset: 0; background: var(--bg); z-index: 9500;
      display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 28px;
    }
    #loader-logo {
      font-family: var(--serif); font-size: clamp(2.8rem,9vw,5.5rem);
      font-weight: 300; letter-spacing: .5em; opacity: 0;
    }
    #loader-bar { width: 100px; height: 1px; background: var(--gold-hair); overflow: hidden; position: relative; }
    #loader-bar::after {
      content: ''; position: absolute; inset: 0;
      background: var(--gold); transform: translateX(-100%);
      animation: load 1.8s cubic-bezier(.4,0,.2,1) .4s forwards;
    }
    @keyframes load { to { transform: translateX(100%); } }
    #loader-sub {
      font-size: 9px; letter-spacing: .32em; text-transform: uppercase;
      color: var(--mute); opacity: 0; animation: fi .6s .9s ease forwards;
    }
    @keyframes fi { to { opacity: 1; } }

    /* NAV */
    nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 800;
      padding: 30px 52px;
      display: flex; align-items: center; justify-content: space-between;
      transition: background .5s, padding .4s, border-color .5s;
      border-bottom: 1px solid transparent;
    }
    nav.solid {
      background: rgba(9,9,7,.93); backdrop-filter: blur(24px);
      border-color: var(--border); padding: 18px 52px;
    }
    .nav-logo { font-family: var(--serif); font-size: 1.45rem; font-weight: 300; letter-spacing: .42em; }
    .nav-links { display: flex; gap: 32px; list-style: none; }
    .nav-links a {
      font-size: 10px; letter-spacing: .2em; text-transform: uppercase;
      color: var(--mid); transition: color .3s; position: relative;
    }
    .nav-links a::after {
      content: ''; position: absolute; bottom: -3px; left: 0;
      width: 0; height: 1px; background: var(--gold); transition: width .3s;
    }
    .nav-links a:hover { color: var(--white); }
    .nav-links a:hover::after { width: 100%; }
    .nav-cta {
      font-size: 10px; letter-spacing: .2em; text-transform: uppercase;
      color: var(--gold); border: 1px solid var(--gold-hair);
      padding: 9px 22px; transition: background .3s, border-color .3s;
    }
    .nav-cta:hover { background: rgba(201,168,76,.1); border-color: var(--gold); }

    /* DOTS */
    #dots {
      position: fixed; right: 32px; top: 50%; transform: translateY(-50%);
      z-index: 700; display: flex; flex-direction: column; gap: 10px;
    }
    .dot { width: 5px; height: 5px; border-radius: 50%; background: var(--mute); transition: background .4s, transform .4s; }
    .dot.on { background: var(--gold); transform: scale(1.5); }

    /* SHARED */
    .eyebrow {
      font-size: 9px; letter-spacing: .36em; text-transform: uppercase; color: var(--gold-dk);
      display: flex; align-items: center; gap: 14px;
    }
    .eyebrow::before { content: ''; display: block; width: 28px; height: 1px; background: currentColor; flex-shrink: 0; }
    .gold-rule { width: 56px; height: 1px; background: linear-gradient(90deg, var(--gold), transparent); }
    .rv { opacity: 0; transform: translateY(28px); }

    /* ══ 1 — HERO ══ */
    #hero {
      position: relative; height: 100vh; min-height: 100dvh;
      display: flex; align-items: center; justify-content: center; overflow: hidden;
    }
    #hero-img {
      position: absolute; inset: 0; width: 100%; height: 100%;
      object-fit: cover; transform-origin: center bottom;
    }
    #hero-overlay {
      position: absolute; inset: 0; z-index: 1;
      background: linear-gradient(180deg, rgba(9,9,7,.45) 0%, rgba(9,9,7,.1) 40%, rgba(9,9,7,.82) 100%);
    }
    #hero-dark {
      position: absolute; inset: 0; z-index: 1;
      background: #090907; opacity: 0; pointer-events: none;
    }
    #hero-content {
      position: relative; z-index: 2; text-align: center; padding: 0 32px;
    }
    #hero-title {
      font-family: var(--serif);
      font-size: clamp(2rem, 5.5vw, 4.8rem);
      font-weight: 300; letter-spacing: .85em;
      line-height: 1; color: var(--white); margin-bottom: 26px;
      text-indent: .85em;
    }
    #hero-sub {
      font-size: 9px; letter-spacing: .38em; text-transform: uppercase;
      color: rgba(201,168,76,.55);
    }
    #hero-price {
      position: absolute; bottom: 52px; left: 56px; z-index: 3; text-align: left;
    }
    #hero-price .lbl {
      font-size: 8px; letter-spacing: .28em; text-transform: uppercase;
      color: var(--mute); margin-bottom: 4px;
    }
    #hero-price .val {
      font-family: var(--serif); font-size: 1.3rem; font-weight: 300;
      color: rgba(201,168,76,.6); letter-spacing: .08em;
    }
    .btn {
      font-size: 10px; letter-spacing: .24em; text-transform: uppercase;
      display: inline-flex; align-items: center; gap: 12px;
      padding: 14px 36px; border: 1px solid var(--gold-hair);
      color: var(--white); transition: color .4s, border-color .4s;
      position: relative; overflow: hidden; cursor: none;
    }
    .btn::before {
      content: ''; position: absolute; inset: 0;
      background: var(--gold); transform: translateX(-101%);
      transition: transform .4s cubic-bezier(.4,0,.2,1);
    }
    .btn:hover { color: var(--bg); border-color: var(--gold); }
    .btn:hover::before { transform: translateX(0); }
    .btn span { position: relative; z-index: 1; }
    .btn-ghost { border-color: rgba(255,255,255,.2); color: var(--mid); }
    .btn-ghost:hover { border-color: var(--gold); }
    #hero-yield {
      position: absolute; bottom: 48px; right: 52px; z-index: 3; text-align: right;
    }
    #hero-yield .val { font-family: var(--serif); font-size: 1.8rem; font-weight: 300; color: rgba(201,168,76,.55); letter-spacing: .06em; }
    #hero-yield .lbl { font-size: 8px; letter-spacing: .26em; text-transform: uppercase; color: var(--mute); margin-top: 4px; }
    #scroll-hint {
      position: absolute; bottom: 48px; left: 50%; transform: translateX(-50%);
      z-index: 3; display: flex; flex-direction: column; align-items: center; gap: 8px;
    }
    #scroll-hint span { font-size: 8px; letter-spacing: .3em; text-transform: uppercase; color: var(--mute); }
    .scroll-line {
      width: 1px; height: 44px;
      background: linear-gradient(to bottom, var(--gold), transparent);
      animation: pulse 2.2s ease-in-out infinite;
    }
    @keyframes pulse {
      0%,100% { opacity: .3; transform: scaleY(.5); transform-origin: top; }
      50% { opacity: .9; transform: scaleY(1); transform-origin: top; }
    }

    /* ══ 2 — CINEMATIC CHAPTERS ══ */
    .chapter {
      position: relative; height: 100vh; min-height: 600px;
      display: flex; align-items: flex-end; overflow: hidden;
    }
    .chapter-img {
      position: absolute; inset: 0; width: 100%; height: 112%;
      object-fit: cover; top: -6%; will-change: transform;
    }
    .chapter-scrim {
      position: absolute; inset: 0;
      background: linear-gradient(180deg, rgba(9,9,7,.08) 0%, rgba(9,9,7,.2) 55%, rgba(9,9,7,.85) 100%);
    }
    .chapter-body { position: relative; z-index: 2; padding: 0 80px 64px; max-width: 900px; }
    .chapter-index {
      font-family: var(--serif); font-size: 6rem; font-weight: 300;
      color: rgba(201,168,76,.1); letter-spacing: -.02em; line-height: 1; margin-bottom: -14px;
    }
    .chapter-label { font-size: 9px; letter-spacing: .36em; text-transform: uppercase; color: var(--gold); margin-bottom: 18px; }
    .chapter-title {
      font-family: var(--serif); font-size: clamp(2rem,5vw,3.8rem);
      font-weight: 300; font-style: italic; line-height: 1.15; color: var(--white); max-width: 22ch;
    }

    /* ══ 3 — STATS STRIP ══ */
    #stats {
      background: var(--s1); border-top: 1px solid var(--border);
      border-bottom: 1px solid var(--border); padding: 72px 80px;
    }
    #stats-inner { max-width: 1360px; margin: 0 auto; display: grid; grid-template-columns: repeat(6,1fr); }
    .stat { padding: 0 40px; text-align: center; border-right: 1px solid var(--border); }
    .stat:first-child { padding-left: 0; }
    .stat:last-child  { padding-right: 0; border-right: none; }
    .stat-n {
      font-family: var(--serif); font-size: clamp(2.2rem,4vw,3.4rem);
      font-weight: 300; color: var(--white); letter-spacing: .02em; line-height: 1;
      font-variant-numeric: tabular-nums;
    }
    .stat-n .sup { font-size: 1.1rem; color: var(--gold); vertical-align: super; }
    .stat-l { font-size: 9px; letter-spacing: .22em; text-transform: uppercase; color: var(--mute); margin-top: 10px; }

    /* ══ 4 — ALTERNATING FEATURES ══ */
    .feature { display: grid; grid-template-columns: 1fr 1fr; min-height: 80vh; }
    .feature.flip { direction: rtl; }
    .feature.flip > * { direction: ltr; }
    .feat-img { position: relative; overflow: hidden; min-height: 540px; }
    .feat-img img {
      position: absolute; inset: 0; width: 100%; height: 112%;
      object-fit: cover; top: -6%; will-change: transform;
    }
    .feat-img::after { content: ''; position: absolute; inset: 0; background: rgba(9,9,7,.18); }
    .feat-text { background: var(--s1); display: flex; align-items: center; padding: 100px 80px; }
    .feat-text-inner { max-width: 520px; }
    .feat-text-inner h2 {
      font-family: var(--serif); font-size: clamp(2.2rem,4vw,3.6rem);
      font-weight: 300; line-height: 1.1; letter-spacing: .02em; margin: 20px 0 28px;
    }
    .feat-text-inner h2 em { font-style: italic; color: var(--gold-lt); }
    .feat-text-inner p { font-size: .85rem; line-height: 1.95; color: var(--mid); max-width: 50ch; }
    .feat-text-inner p + p { margin-top: 16px; }

    /* ══ 5 — LP INTERLUDE ══ */
    #lp-interlude {
      position: relative; height: 60vh; min-height: 400px; overflow: hidden;
      display: flex; align-items: center; justify-content: center;
    }
    #lp-interlude img {
      position: absolute; inset: 0; width: 100%; height: 120%;
      object-fit: cover; top: -10%; will-change: transform;
    }
    #lp-interlude::after { content: ''; position: absolute; inset: 0; background: rgba(9,9,7,.55); }
    #lp-interlude-text { position: relative; z-index: 2; text-align: center; }
    #lp-interlude-text p {
      font-family: var(--serif); font-size: clamp(1rem,2vw,1.2rem);
      letter-spacing: .14em; color: var(--mid); text-transform: uppercase; margin-bottom: 20px;
    }
    #lp-interlude-text h2 {
      font-family: var(--serif); font-size: clamp(2.2rem,5vw,4.2rem);
      font-weight: 300; font-style: italic; color: var(--white); letter-spacing: .04em;
    }

    /* ══ 6 — SEVEN VILLAS ══ */
    #villas { background: var(--bg); padding: 140px 80px; }
    #villas-header {
      max-width: 1360px; margin: 0 auto 80px;
      display: flex; align-items: flex-end; justify-content: space-between;
    }
    #villas-header h2 {
      font-family: var(--serif); font-size: clamp(2.4rem,5vw,4rem);
      font-weight: 300; line-height: 1.05; margin-top: 18px; max-width: 18ch;
    }
    #villas-header h2 em { font-style: italic; color: var(--gold-lt); }
    .villas-price { text-align: right; }
    .villas-price .from { font-size: 9px; letter-spacing: .26em; text-transform: uppercase; color: var(--mute); }
    .villas-price .amount {
      font-family: var(--serif); font-size: 2.4rem; font-weight: 300;
      color: var(--gold); letter-spacing: .06em; margin-top: 6px;
    }
    #villas-list { max-width: 1360px; margin: 0 auto; display: flex; flex-direction: column; gap: 2px; }
    .villa-row {
      display: grid; grid-template-columns: 80px 1fr 1fr auto auto auto;
      align-items: center; gap: 32px; padding: 28px 40px;
      background: var(--s1); border: 1px solid transparent; cursor: none;
      transition: background .35s, border-color .35s, padding-left .35s;
    }
    .villa-row:hover { background: var(--s2); border-color: var(--border); padding-left: 52px; }
    .villa-row-num { font-family: var(--serif); font-size: 2rem; font-weight: 300; color: var(--gold); letter-spacing: .06em; }
    .villa-row-name { font-family: var(--serif); font-size: 1.3rem; font-weight: 300; font-style: italic; letter-spacing: .06em; }
    .villa-row-loc { font-size: 9px; letter-spacing: .2em; text-transform: uppercase; color: var(--mute); }
    .villa-row-tag { font-size: 9px; letter-spacing: .18em; text-transform: uppercase; color: var(--mute); border: 1px solid var(--border); padding: 5px 12px; white-space: nowrap; }
    .villa-row-price { font-family: var(--serif); font-size: 1.1rem; font-weight: 300; color: var(--mid); text-align: right; white-space: nowrap; letter-spacing: .04em; }
    .villa-row-cta { font-size: 9px; letter-spacing: .2em; text-transform: uppercase; color: var(--gold-dk); display: flex; align-items: center; gap: 8px; white-space: nowrap; transition: color .3s, gap .3s; }
    .villa-row:hover .villa-row-cta { color: var(--gold); gap: 14px; }
    .villa-row-cta::after { content: '→'; font-size: 12px; }

    /* ══ GARAGE (with villas) ══ */
    #garage-interlude {
      position: relative; height: 72vh; min-height: 480px; overflow: hidden;
      display: flex; align-items: flex-end;
    }
    #garage-interlude img {
      position: absolute; inset: 0; width: 100%; height: 122%;
      object-fit: cover; top: -11%; will-change: transform;
    }
    #garage-interlude::after {
      content: ''; position: absolute; inset: 0;
      background: linear-gradient(180deg, rgba(9,9,7,.05) 0%, rgba(9,9,7,.3) 50%, rgba(9,9,7,.88) 100%);
    }
    #garage-text { position: relative; z-index: 2; padding: 0 80px 72px; }
    #garage-text p { font-size: 9px; letter-spacing: .38em; text-transform: uppercase; color: var(--gold-dk); margin-bottom: 18px; }
    #garage-text h2 {
      font-family: var(--serif); font-size: clamp(2rem,5vw,4.2rem);
      font-weight: 300; font-style: italic; color: var(--white); max-width: 18ch;
    }

    /* ══ 7 — PULLQUOTE ══ */
    .pullquote {
      position: relative; height: 70vh; min-height: 480px;
      display: flex; align-items: center; justify-content: center; overflow: hidden;
    }
    .pullquote-img {
      position: absolute; inset: 0; width: 100%; height: 120%;
      object-fit: cover; top: -10%; will-change: transform;
    }
    .pullquote::after { content: ''; position: absolute; inset: 0; background: rgba(9,9,7,.62); }
    .pullquote-body { position: relative; z-index: 2; text-align: center; padding: 0 48px; }
    .pullquote-body blockquote {
      font-family: var(--serif); font-size: clamp(1.8rem,4vw,3.2rem);
      font-weight: 300; font-style: italic; line-height: 1.4; color: var(--white); max-width: 800px;
    }
    .pullquote-body cite {
      display: block; margin-top: 28px; font-style: normal;
      font-size: 9px; letter-spacing: .34em; text-transform: uppercase; color: var(--gold-dk);
    }

    /* ══ 8 — SETTING ══ */
    #setting { background: var(--s1); padding: 140px 80px; }
    #setting-inner { max-width: 1360px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 120px; align-items: center; }
    #setting h2 { font-family: var(--serif); font-size: clamp(2.2rem,4.5vw,3.8rem); font-weight: 300; line-height: 1.1; margin: 20px 0 28px; }
    #setting h2 em { font-style: italic; color: var(--gold-lt); }
    #setting p { font-size: .85rem; line-height: 1.95; color: var(--mid); max-width: 50ch; }
    #setting p + p { margin-top: 16px; }
    .setting-callouts { display: flex; flex-direction: column; margin-top: 48px; padding-top: 40px; border-top: 1px solid var(--border); }
    .setting-callout { display: flex; align-items: baseline; gap: 20px; padding: 20px 0; border-bottom: 1px solid var(--border); }
    .setting-callout:last-child { border-bottom: none; }
    .setting-callout-n { font-family: var(--serif); font-size: 2.2rem; font-weight: 300; color: var(--gold); flex-shrink: 0; width: 110px; }
    .setting-callout-l { font-size: .8rem; line-height: 1.6; color: var(--mid); }
    #setting-right { position: relative; }
    .setting-img-main { position: relative; aspect-ratio: 3/4; overflow: hidden; max-height: 620px; }
    .setting-img-main img { width: 100%; height: 100%; object-fit: cover; transition: transform 5s ease; }
    .setting-img-main:hover img { transform: scale(1.04); }
    .setting-img-main::after { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, transparent 60%, rgba(9,9,7,.6) 100%); }
    .setting-img-accent { position: absolute; bottom: -28px; left: -28px; width: 130px; height: 130px; border: 1px solid var(--border-hi); z-index: -1; }
    .setting-map img { filter: grayscale(60%) contrast(1.15) brightness(.75) sepia(20%); transition: filter 5s ease; }
    .setting-map:hover img { filter: grayscale(40%) contrast(1.1) brightness(.8) sepia(15%); }
    .setting-map::after { background: linear-gradient(180deg, rgba(9,9,7,.35) 0%, rgba(9,9,7,.55) 100%); }
    .map-overlay {
      position: absolute; bottom: 28px; left: 28px; z-index: 2;
      border-left: 1px solid var(--gold-hair); padding-left: 16px;
    }
    .map-coord { font-size: 8px; letter-spacing: .22em; color: var(--gold-dk); text-transform: uppercase; margin-bottom: 5px; }
    .map-label { font-family: var(--serif); font-size: 1.1rem; font-weight: 300; color: var(--white); font-style: italic; }

    /* ══ 9 — WELLNESS ══ */
    #wellness { background: var(--bg); padding: 140px 0; }
    #wellness-head { max-width: 1360px; margin: 0 auto 80px; padding: 0 80px; display: flex; align-items: flex-end; justify-content: space-between; }
    #wellness-head h2 { font-family: var(--serif); font-size: clamp(2.4rem,5vw,4rem); font-weight: 300; line-height: 1.05; margin-top: 18px; max-width: 16ch; }
    #wellness-head h2 em { font-style: italic; color: var(--gold-lt); }
    #wellness-head p { font-size: .85rem; line-height: 1.9; color: var(--mid); max-width: 40ch; text-align: right; }
    .spa-chapter { display: grid; grid-template-columns: 1fr 1fr; min-height: 70vh; }
    .spa-chapter.flip { direction: rtl; }
    .spa-chapter.flip > * { direction: ltr; }
    .spa-chapter-img { position: relative; min-height: 500px; overflow: hidden; }
    .spa-chapter-img img {
      position: absolute; inset: 0; width: 100%; height: 112%;
      object-fit: cover; top: -6%; will-change: transform;
    }
    .spa-chapter-img::after { content: ''; position: absolute; inset: 0; background: rgba(9,9,7,.15); }
    .spa-chapter-body { background: var(--s1); display: flex; align-items: center; padding: 80px; }
    .spa-chapter-body-inner { max-width: 480px; }
    .spa-chapter-body-inner h3 { font-family: var(--serif); font-size: clamp(1.8rem,3.5vw,3rem); font-weight: 300; line-height: 1.1; margin: 18px 0 22px; }
    .spa-chapter-body-inner h3 em { font-style: italic; color: var(--gold-lt); }
    .spa-chapter-body-inner p { font-size: .83rem; line-height: 1.95; color: var(--mid); max-width: 48ch; }
    .spa-chapter-body-inner p + p { margin-top: 14px; }
    #spa-amenities { max-width: 1360px; margin: 80px auto 0; padding: 0 80px; display: grid; grid-template-columns: repeat(4,1fr); border: 1px solid var(--border); }
    .spa-am-cell { padding: 48px 36px; border-right: 1px solid var(--border); position: relative; }
    .spa-am-cell:last-child { border-right: none; }
    .spa-am-cell::before { content: ''; position: absolute; top: 0; left: 36px; width: 32px; height: 1px; background: var(--gold); }
    .spa-am-title { font-size: 10px; letter-spacing: .22em; text-transform: uppercase; color: var(--white); margin-bottom: 14px; }
    .spa-am-items { list-style: none; display: flex; flex-direction: column; gap: 8px; }
    .spa-am-items li { font-size: .78rem; color: var(--mute); line-height: 1.5; }

    /* ══ 10 — DINING ══ */
    #dining { background: var(--bg); }
    #dining-header { max-width: 1360px; margin: 0 auto; padding: 120px 80px 80px; display: flex; align-items: flex-end; justify-content: space-between; gap: 60px; }
    #dining-header h2 { font-family: var(--serif); font-size: clamp(2.4rem,5vw,4rem); font-weight: 300; line-height: 1.05; margin-top: 18px; max-width: 20ch; }
    #dining-header h2 em { font-style: italic; color: var(--gold-lt); }
    #dining-header p { font-size: .85rem; line-height: 1.9; color: var(--mid); max-width: 44ch; text-align: right; }
    .dining-panel { display: grid; grid-template-columns: 1fr 1fr; min-height: 75vh; }
    .dining-panel.flip { direction: rtl; }
    .dining-panel.flip > * { direction: ltr; }
    .dining-panel-img { position: relative; min-height: 540px; overflow: hidden; }
    .dining-panel-img img { position: absolute; inset: 0; width: 100%; height: 112%; object-fit: cover; top: -6%; will-change: transform; }
    .dining-panel-img::after { content: ''; position: absolute; inset: 0; background: rgba(9,9,7,.2); }
    .dining-panel-body { background: var(--s2); display: flex; align-items: center; padding: 100px 80px; }
    .dining-panel-inner { max-width: 500px; }
    .dining-panel-inner h3 { font-family: var(--serif); font-size: clamp(2rem,3.8vw,3.2rem); font-weight: 300; line-height: 1.1; margin: 18px 0 26px; }
    .dining-panel-inner h3 em { font-style: italic; color: var(--gold-lt); }
    .dining-panel-inner p { font-size: .84rem; line-height: 1.95; color: var(--mid); max-width: 48ch; }
    .dining-panel-inner p + p { margin-top: 14px; }
    .dining-tags { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 28px; }
    .dining-tag { font-size: 8px; letter-spacing: .2em; text-transform: uppercase; border: 1px solid var(--border); color: var(--mute); padding: 6px 14px; }

    /* Rooftop interlude */
    #rooftop-interlude {
      position: relative; height: 85vh; min-height: 560px;
      overflow: hidden; display: flex; align-items: flex-end;
    }
    #rooftop-interlude img { position: absolute; inset: 0; width: 100%; height: 122%; object-fit: cover; top: -11%; will-change: transform; }
    #rooftop-interlude::after {
      content: ''; position: absolute; inset: 0;
      background: linear-gradient(180deg, rgba(9,9,7,.08) 0%, rgba(9,9,7,.25) 55%, rgba(9,9,7,.9) 100%);
    }
    #rooftop-body { position: relative; z-index: 2; padding: 0 80px 80px; max-width: 800px; }
    #rooftop-body .eyebrow { margin-bottom: 24px; }
    #rooftop-body h2 { font-family: var(--serif); font-size: clamp(2.2rem,5vw,4.4rem); font-weight: 300; font-style: italic; color: var(--white); line-height: 1.1; margin-bottom: 22px; }
    #rooftop-body .desc { font-size: .84rem; color: var(--mid); line-height: 1.9; max-width: 52ch; }

    /* ══ 11 — MARKET INTELLIGENCE ══ */
    #invest { background: var(--s1); padding: 140px 80px; }
    #invest-inner { max-width: 1360px; margin: 0 auto; }
    #invest-header { display: grid; grid-template-columns: 1fr 1fr; gap: 100px; margin-bottom: 90px; align-items: end; }
    #invest-header h2 { font-family: var(--serif); font-size: clamp(2.4rem,4.5vw,3.8rem); font-weight: 300; line-height: 1.1; margin-top: 20px; }
    #invest-header h2 em { font-style: italic; color: var(--gold-lt); }
    #invest-header p { font-size: .85rem; line-height: 1.9; color: var(--mid); max-width: 50ch; }

    /* Big stats */
    #invest-metrics { display: grid; grid-template-columns: repeat(4,1fr); gap: 1px; background: var(--border); border: 1px solid var(--border); margin-bottom: 2px; }
    .im-cell { background: var(--s1); padding: 52px 44px; position: relative; transition: background .3s; }
    .im-cell:hover { background: var(--s2); }
    .im-cell-l { font-size: 9px; letter-spacing: .28em; text-transform: uppercase; color: var(--gold-dk); margin-bottom: 18px; }
    .im-cell-v { font-family: var(--serif); font-size: clamp(2.4rem,4vw,3.6rem); font-weight: 300; color: var(--white); letter-spacing: .02em; line-height: 1; font-variant-numeric: tabular-nums; }
    .im-cell-v .u { font-size: 1.2rem; color: var(--gold); }
    .im-cell-d { font-size: .76rem; line-height: 1.8; color: var(--mute); margin-top: 14px; }
    .im-cell-bar { position: absolute; bottom: 0; left: 44px; height: 2px; background: linear-gradient(90deg, var(--gold), transparent); width: 0; transition: width 1.4s ease; }
    .im-cell.in .im-cell-bar { width: calc(100% - 88px); }

    /* Infograph row */
    #invest-infograph { display: grid; grid-template-columns: repeat(3,1fr); gap: 1px; background: var(--border); border: 1px solid var(--border); margin-bottom: 80px; }
    .ig-cell { background: var(--s2); padding: 52px 44px; position: relative; overflow: hidden; }
    .ig-cell::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 2px; background: linear-gradient(90deg, var(--gold-dk), transparent); }
    .ig-eyebrow { font-size: 8px; letter-spacing: .3em; text-transform: uppercase; color: var(--gold-dk); margin-bottom: 24px; }
    .ig-number {
      font-family: var(--serif); font-size: clamp(3rem,5vw,5rem);
      font-weight: 300; color: var(--white); line-height: 1; letter-spacing: .02em; margin-bottom: 12px;
    }
    .ig-number .u { font-size: 1.8rem; color: var(--gold); }
    .ig-label { font-size: .78rem; color: var(--mid); line-height: 1.8; max-width: 30ch; }
    /* Animated ring */
    .ig-ring { position: absolute; bottom: 36px; right: 44px; }
    .ig-ring svg { width: 60px; height: 60px; transform: rotate(-90deg); }
    .ring-track { fill: none; stroke: var(--border); stroke-width: 1.5; }
    .ring-fill { fill: none; stroke: var(--gold); stroke-width: 1.5; stroke-linecap: round; stroke-dasharray: 163; stroke-dashoffset: 163; transition: stroke-dashoffset 2s cubic-bezier(.4,0,.2,1); }
    .ig-cell.in .ring-fill { stroke-dashoffset: 0; }

    /* RPPI chart */
    #rppi-wrap { padding: 56px 56px 48px; background: var(--s2); border: 1px solid var(--border); }
    #rppi-wrap h3 { font-family: var(--serif); font-size: 1.5rem; font-weight: 300; letter-spacing: .08em; margin-bottom: 6px; }
    #rppi-sub { font-size: .75rem; color: var(--mute); letter-spacing: .1em; margin-bottom: 44px; }
    #rppi-bars { display: grid; grid-template-columns: repeat(8,1fr); gap: 12px; align-items: flex-end; height: 200px; }
    .rppi-col { display: flex; flex-direction: column; align-items: center; gap: 8px; height: 100%; justify-content: flex-end; }
    .rppi-val { font-family: var(--serif); font-size: .85rem; color: var(--gold); font-variant-numeric: tabular-nums; }
    .rppi-bar { width: 100%; height: 0; background: linear-gradient(to top, var(--gold-dk), var(--gold)); transition: height 1.4s cubic-bezier(.4,0,.2,1); position: relative; }
    .rppi-bar.peak { background: linear-gradient(to top, var(--gold-dk), var(--gold-lt)); box-shadow: 0 0 20px rgba(201,168,76,.3); }
    .rppi-yr { font-size: 8px; letter-spacing: .14em; color: var(--mute); text-align: center; }

    /* Reasons */
    #invest-reasons { display: grid; grid-template-columns: repeat(5,1fr); gap: 1px; background: var(--border); border: 1px solid var(--border); margin-top: 80px; }
    .ir-cell { background: var(--s1); padding: 44px 32px; transition: background .3s; }
    .ir-cell:hover { background: var(--s2); }
    .ir-cell-head { font-size: 9px; letter-spacing: .24em; text-transform: uppercase; color: var(--gold-dk); margin-bottom: 14px; }
    .ir-cell-title { font-family: var(--serif); font-size: 1.15rem; font-weight: 300; line-height: 1.3; margin-bottom: 12px; color: var(--white); letter-spacing: .04em; }
    .ir-cell-title em { font-style: italic; color: var(--gold-lt); }
    .ir-cell-body { font-size: .75rem; line-height: 1.85; color: var(--mute); }

    /* Deadline */
    #deadline { background: linear-gradient(90deg, rgba(201,168,76,.08), rgba(201,168,76,.04)); border: 1px solid var(--border-hi); padding: 36px 56px; margin-top: 56px; display: flex; align-items: center; justify-content: space-between; gap: 40px; }
    #deadline-left h4 { font-family: var(--serif); font-size: 1.4rem; font-weight: 300; letter-spacing: .06em; margin-bottom: 8px; }
    #deadline-left h4 em { font-style: italic; color: var(--gold); }
    #deadline-left p { font-size: .78rem; color: var(--mid); line-height: 1.7; }
    .deadline-arrow { font-size: 9px; letter-spacing: .26em; text-transform: uppercase; color: var(--gold); border: 1px solid var(--border-hi); padding: 13px 28px; white-space: nowrap; transition: background .3s; cursor: none; }
    .deadline-arrow:hover { background: rgba(201,168,76,.1); }

    /* ══ 12 — VEFA ══ */
    #vefa { background: var(--bg); padding: 140px 80px; }
    #vefa-inner { max-width: 1360px; margin: 0 auto; }
    #vefa-header { margin-bottom: 72px; }
    #vefa-header h2 { font-family: var(--serif); font-size: clamp(2.4rem,5vw,4rem); font-weight: 300; line-height: 1.05; margin: 18px 0 28px; max-width: 26ch; }
    #vefa-header h2 em { font-style: italic; color: var(--gold-lt); }
    #vefa-header p { font-size: .85rem; line-height: 1.9; color: var(--mid); max-width: 62ch; }

    #vefa-timeline { display: grid; grid-template-columns: repeat(5,1fr); gap: 2px; position: relative; }
    #vefa-timeline::before { content: ''; position: absolute; top: 44px; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, var(--gold), rgba(201,168,76,.08)); z-index: 1; }
    .vefa-step { background: var(--s1); padding: 60px 32px 44px; position: relative; }
    .vefa-step-dot { width: 11px; height: 11px; border-radius: 50%; border: 1px solid var(--gold-dk); background: var(--bg); margin-bottom: 28px; position: relative; z-index: 2; transition: background .4s, box-shadow .4s; }
    .vefa-step.lit .vefa-step-dot { background: var(--gold); box-shadow: 0 0 18px rgba(201,168,76,.45); }
    .vefa-step-ghost { font-family: var(--serif); font-size: 4rem; font-weight: 300; color: rgba(201,168,76,.08); letter-spacing: -.02em; line-height: 1; margin-bottom: -8px; }
    .vefa-step-pct { font-family: var(--serif); font-size: 2rem; font-weight: 300; color: var(--gold); letter-spacing: .04em; margin-bottom: 14px; }
    .vefa-step-label { font-size: 10px; letter-spacing: .22em; text-transform: uppercase; color: var(--white); margin-bottom: 12px; }
    .vefa-step-body { font-size: .75rem; color: var(--mute); line-height: 1.8; }
    .vefa-step-guar { display: inline-flex; align-items: center; gap: 8px; margin-top: 14px; font-size: 8px; letter-spacing: .18em; text-transform: uppercase; color: var(--gold-dk); }
    .vefa-step-guar::before { content: ''; width: 18px; height: 1px; background: currentColor; }

    #vefa-guarantees { display: grid; grid-template-columns: repeat(3,1fr); gap: 2px; margin-top: 2px; }
    .vg-cell { background: var(--s2); padding: 44px 40px; position: relative; border-top: 1px solid var(--border); overflow: hidden; }
    .vg-cell::after { content: ''; position: absolute; top: 0; left: 0; width: 0; height: 2px; background: var(--gold); transition: width 1.4s ease; }
    .vg-cell.in::after { width: 100%; }
    .vg-icon { font-family: var(--serif); font-size: 3rem; color: rgba(201,168,76,.22); margin-bottom: 18px; line-height: 1; }
    .vg-title { font-size: 10px; letter-spacing: .22em; text-transform: uppercase; color: var(--white); margin-bottom: 12px; }
    .vg-body { font-size: .78rem; color: var(--mute); line-height: 1.85; }

    /* ══ 13 — CONTACT ══ */
    #contact { background: var(--bg); padding: 140px 80px; }
    #contact-inner { max-width: 1360px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 120px; align-items: start; }
    #contact h2 { font-family: var(--serif); font-size: clamp(2.6rem,5vw,4.4rem); font-weight: 300; line-height: 1.05; margin: 20px 0 28px; }
    #contact h2 em { font-style: italic; color: var(--gold-lt); }
    #contact-left > p { font-size: .85rem; line-height: 1.9; color: var(--mid); max-width: 50ch; margin-bottom: 40px; }
    .contact-details { display: flex; flex-direction: column; gap: 20px; margin-bottom: 40px; }
    .cd-label { font-size: 9px; letter-spacing: .28em; text-transform: uppercase; color: var(--gold-dk); margin-bottom: 5px; }
    .cd-val { font-size: .85rem; color: var(--mid); }
    .form { display: flex; flex-direction: column; gap: 18px; }
    .frow { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .ff { display: flex; flex-direction: column; gap: 7px; }
    .ff.full { grid-column: 1/-1; }
    .fl { font-size: 9px; letter-spacing: .26em; text-transform: uppercase; color: var(--gold-dk); }
    .fi, .fsel, .fta { background: transparent; border: none; border-bottom: 1px solid rgba(201,168,76,.2); padding: 11px 0; font-size: .82rem; font-family: var(--sans); color: var(--white); outline: none; appearance: none; transition: border-color .3s; }
    .fi:focus, .fsel:focus, .fta:focus { border-color: var(--gold); }
    .fi::placeholder, .fta::placeholder { color: var(--mute); font-size: .75rem; }
    .fsel option { background: var(--s1); }
    .fta { resize: none; min-height: 90px; }

    /* ══ FOOTER ══ */
    footer { background: var(--s1); border-top: 1px solid var(--border); padding: 72px 80px 48px; }
    .footer-grid { max-width: 1360px; margin: 0 auto; display: grid; grid-template-columns: 1.5fr 1fr 1fr 1fr; gap: 60px; padding-bottom: 56px; border-bottom: 1px solid var(--border); }
    .footer-brand-name { font-family: var(--serif); font-size: 1.7rem; font-weight: 300; letter-spacing: .42em; margin-bottom: 18px; }
    .footer-brand-p { font-size: .75rem; line-height: 1.8; color: var(--mute); max-width: 30ch; }
    .footer-col-head { font-size: 9px; letter-spacing: .26em; text-transform: uppercase; color: var(--gold-dk); margin-bottom: 22px; }
    .footer-links { list-style: none; display: flex; flex-direction: column; gap: 11px; }
    .footer-links a { font-size: .76rem; color: var(--mute); transition: color .3s; }
    .footer-links a:hover { color: var(--white); }
    .footer-bottom { max-width: 1360px; margin: 36px auto 0; display: flex; align-items: center; justify-content: space-between; }
    .footer-copy { font-size: .7rem; color: var(--mute); letter-spacing: .08em; }
    .footer-legal-links { display: flex; gap: 28px; }
    .footer-legal-links a { font-size: .7rem; color: var(--mute); transition: color .3s; }
    .footer-legal-links a:hover { color: var(--mid); }

    /* ══ RESPONSIVE ══ */
    @media (max-width: 1100px) {
      nav { padding: 24px 36px; } nav.solid { padding: 16px 36px; }
      .nav-links { display: none; }
      #stats-inner { grid-template-columns: repeat(3,1fr); }
      .stat:nth-child(3) { border-right: none; }
      .feature, .spa-chapter, .dining-panel { grid-template-columns: 1fr; }
      .feature.flip, .spa-chapter.flip, .dining-panel.flip { direction: ltr; }
      .feat-img, .spa-chapter-img, .dining-panel-img { min-height: 50vw; }
      #villas { padding: 100px 36px; }
      #villas-header { flex-direction: column; align-items: flex-start; gap: 24px; }
      .villa-row { grid-template-columns: 56px 1fr auto; gap: 16px; padding: 20px 24px; }
      .villa-row-loc, .villa-row-tag { display: none; }
      #invest-metrics { grid-template-columns: 1fr 1fr; }
      #invest-infograph { grid-template-columns: 1fr; }
      #invest-reasons { grid-template-columns: 1fr 1fr; }
      #invest-header, #setting-inner, #contact-inner { grid-template-columns: 1fr; }
      #wellness-head { flex-direction: column; align-items: flex-start; gap: 24px; }
      #wellness-head p { text-align: left; }
      #spa-amenities { grid-template-columns: 1fr 1fr; }
      .footer-grid { grid-template-columns: 1fr 1fr; }
      #dots { display: none; }
      #vefa-timeline { grid-template-columns: 1fr 1fr; }
      #vefa-guarantees { grid-template-columns: 1fr; }
      #dining-header { flex-direction: column; gap: 24px; }
      #dining-header p { text-align: left; }
    }
    @media (max-width: 700px) {
      .chapter-body { padding: 0 28px 48px; }
      #hero-yield { display: none; }
      #stats-inner { grid-template-columns: 1fr 1fr; }
      .stat:nth-child(2) { border-right: none; }
      #invest-metrics, #invest-reasons { grid-template-columns: 1fr; }
      .frow { grid-template-columns: 1fr; }
      #spa-amenities { grid-template-columns: 1fr; }
      .footer-grid { grid-template-columns: 1fr; }
      #rppi-bars { grid-template-columns: repeat(4,1fr); }
      #vefa-timeline { grid-template-columns: 1fr; }
      #vefa-timeline::before { display: none; }
    }
  </style>
</head>
<body>

  <div id="cur"></div>
  <div id="cur-ring"></div>

  <!-- LOADER -->
  <div id="loader">
    <div id="loader-logo">VENTUS</div>
    <div id="loader-bar"></div>
    <div id="loader-sub">East Coast &middot; Mauritius &middot; Indian Ocean</div>
  </div>

  <!-- NAV -->
  <nav id="nav">
    <div class="nav-logo">VENTUS</div>
    <ul class="nav-links">
      <li><a href="#villas">Villas</a></li>
      <li><a href="#setting">Estate</a></li>
      <li><a href="#wellness">Wellness</a></li>
      <li><a href="#dining">Dining</a></li>
      <li><a href="#invest">Invest</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
    <a href="#contact" class="nav-cta">Private Enquiry</a>
  </nav>

  <!-- DOTS -->
  <div id="dots">
    <div class="dot on"  data-s="hero"></div>
    <div class="dot"     data-s="chapters"></div>
    <div class="dot"     data-s="villas"></div>
    <div class="dot"     data-s="wellness"></div>
    <div class="dot"     data-s="dining"></div>
    <div class="dot"     data-s="invest"></div>
    <div class="dot"     data-s="contact"></div>
  </div>

  <!-- ══ HERO ══ -->
  <section id="hero">
    <img id="hero-img"
      src="https://raw.githubusercontent.com/byauracle-ai/venerable-beijinho-853d83/main/descent.jpg"
      alt="Ventus — Descent, East Coast Mauritius"
    />
    <div id="hero-overlay"></div>
    <div id="hero-dark"></div>
    <div id="hero-content">
      <h1 id="hero-title">VENTUS</h1>
      <p id="hero-sub">Mauritius &middot; Indian Ocean</p>
    </div>
    <div id="hero-price">
      <div class="lbl">From</div>
      <div class="val">£1,250,000</div>
    </div>
    <div id="hero-yield">
      <div class="val">9%</div>
      <div class="lbl">Est. Gross Yield</div>
    </div>
    <div id="scroll-hint">
      <div class="scroll-line"></div>
      <span>Descend</span>
    </div>
  </section>

  <!-- ══ CINEMATIC CHAPTERS ══ -->
  <div id="chapters">

    <div class="chapter" data-parallax>
      <img class="chapter-img"
        src="https://raw.githubusercontent.com/byauracle-ai/venerable-beijinho-853d83/main/Entrance.png"
        alt="Entrance — Ventus" loading="lazy"
      />
      <div class="chapter-scrim"></div>
      <div class="chapter-body rv">
        <div class="chapter-index">01</div>
        <div class="chapter-label">The Entrance</div>
        <h2 class="chapter-title">Step through.<br/>The world outside<br/>stays there.</h2>
      </div>
    </div>

    <div class="chapter" data-parallax>
      <img class="chapter-img"
        src="https://raw.githubusercontent.com/byauracle-ai/venerable-beijinho-853d83/main/Interior.png"
        alt="Interior — Ventus Villa" loading="lazy"
      />
      <div class="chapter-scrim"></div>
      <div class="chapter-body rv">
        <div class="chapter-index">02</div>
        <div class="chapter-label">The Interior</div>
        <h2 class="chapter-title">Every surface chosen.<br/>Nothing left to chance.</h2>
      </div>
    </div>

    <div class="chapter" data-parallax>
      <img class="chapter-img"
        src="https://raw.githubusercontent.com/byauracle-ai/venerable-beijinho-853d83/main/Infinity%20Pool.png"
        alt="Infinity Pool — Ventus" loading="lazy"
      />
      <div class="chapter-scrim"></div>
      <div class="chapter-body rv">
        <div class="chapter-index">03</div>
        <div class="chapter-label">The Pool</div>
        <h2 class="chapter-title">Where the water ends<br/>and the ocean begins.</h2>
      </div>
    </div>

    <div class="chapter" data-parallax>
      <img class="chapter-img"
        src="https://raw.githubusercontent.com/byauracle-ai/venerable-beijinho-853d83/main/grok-image-86070f82-2171-4501-8fe6-d6f72d7d1dcb.png"
        alt="East Coast Lagoon — Ventus" loading="lazy"
      />
      <div class="chapter-scrim"></div>
      <div class="chapter-body rv">
        <div class="chapter-index">04</div>
        <div class="chapter-label">The Lagoon</div>
        <h2 class="chapter-title">East Coast waters.<br/>Impossibly clear.<br/>Eternally yours.</h2>
      </div>
    </div>

  </div>

  <!-- ══ STATS STRIP ══ -->
  <div id="stats">
    <div id="stats-inner">
      <div class="stat rv">
        <div class="stat-n" data-count="7">7</div>
        <div class="stat-l">Boutique Villas</div>
      </div>
      <div class="stat rv">
        <div class="stat-n"><span class="sup">£</span>1.25M</div>
        <div class="stat-l">Prices From</div>
      </div>
      <div class="stat rv">
        <div class="stat-n" data-count="9"><span id="yield-n">9</span><span class="sup">%</span></div>
        <div class="stat-l">Est. Gross Yield</div>
      </div>
      <div class="stat rv">
        <div class="stat-n">0<span class="sup">%</span></div>
        <div class="stat-l">Capital Gains Tax</div>
      </div>
      <div class="stat rv">
        <div class="stat-n" data-count="4">4</div>
        <div class="stat-l">Design Partners</div>
      </div>
      <div class="stat rv">
        <div class="stat-n"><span class="sup">∞</span></div>
        <div class="stat-l">Residency Included</div>
      </div>
    </div>
  </div>

  <!-- ══ ALTERNATING FEATURES ══ -->

  <div class="feature">
    <div class="feat-img" data-parallax-sm>
      <img src="https://raw.githubusercontent.com/byauracle-ai/venerable-beijinho-853d83/main/Outdoor.png" alt="SAOTA Architecture — Ventus" loading="lazy" />
    </div>
    <div class="feat-text">
      <div class="feat-text-inner">
        <div class="eyebrow rv">Architecture · SAOTA</div>
        <h2 class="rv">Designed to<br/><em>disappear.</em></h2>
        <div class="gold-rule rv" style="margin:0 0 28px;"></div>
        <p class="rv">SAOTA's architecture serves the view, not itself. Clean horizontal planes, raw concrete, and deep cantilevers — buildings sculpted by wind and tide rather than imposed upon the landscape.</p>
        <p class="rv">Each Ventus villa is oriented toward the prevailing trade winds, framing the east coast lagoon and disappearing into the tropical canopy at every opportunity.</p>
      </div>
    </div>
  </div>

  <div id="lp-interlude" data-parallax>
    <img src="https://raw.githubusercontent.com/byauracle-ai/venerable-beijinho-853d83/main/LPInterior.png" alt="Loro Piana Interiors — Ventus" loading="lazy" />
    <div id="lp-interlude-text" class="rv">
      <p>Loro Piana Interiors &middot; Est. 1924 &middot; Novara, Italy</p>
      <h2>The finest materials<br/>on earth.</h2>
    </div>
  </div>

  <div class="feature">
    <div class="feat-img" data-parallax-sm>
      <img src="https://raw.githubusercontent.com/byauracle-ai/venerable-beijinho-853d83/main/LPInterior.png" alt="Loro Piana Interiors — Ventus" loading="lazy" />
    </div>
    <div class="feat-text">
      <div class="feat-text-inner">
        <div class="eyebrow rv">Interiors · Loro Piana</div>
        <h2 class="rv">Every surface<br/><em>chosen.</em></h2>
        <div class="gold-rule rv" style="margin:0 0 28px;"></div>
        <p class="rv">Loro Piana Interiors brings three centuries of textile mastery to Ventus. Hand-woven cashmere wall coverings, reclaimed teak floors, Calacatta Oro marble, and Belgian linen — materials that hold light the way fine fabric holds colour.</p>
        <p class="rv">Nothing is sourced for effect. Every specification is chosen for what it will feel like in twenty years, not twenty photographs.</p>
      </div>
    </div>
  </div>

  <div class="feature flip">
    <div class="feat-img" data-parallax-sm>
      <img src="https://raw.githubusercontent.com/byauracle-ai/venerable-beijinho-853d83/main/LPinterior2.jpg" alt="Loro Piana Interior Detail — Ventus" loading="lazy" />
    </div>
    <div class="feat-text">
      <div class="feat-text-inner">
        <div class="eyebrow rv">Interiors · Material Detail</div>
        <h2 class="rv">Three centuries<br/>of <em>craft.</em></h2>
        <div class="gold-rule rv" style="margin:0 0 28px;"></div>
        <p class="rv">Each room in a Ventus villa is a considered accumulation of material intelligence. Loro Piana's ateliers select only what endures — hand-laid marble, bespoke joinery, and textiles woven to specifications that most manufacturers do not offer.</p>
        <p class="rv">The result is an interior that improves with time. That rewards living in. That holds its distinction long after the photography is forgotten.</p>
      </div>
    </div>
  </div>

  <div class="feature">
    <div class="feat-img" data-parallax-sm>
      <img src="https://raw.githubusercontent.com/byauracle-ai/venerable-beijinho-853d83/main/blue%20lighting.png" alt="Vargov Design · John Cullen Lighting — Ventus" loading="lazy" />
    </div>
    <div class="feat-text">
      <div class="feat-text-inner">
        <div class="eyebrow rv">Lighting · Vargov Design &amp; John Cullen</div>
        <h2 class="rv">Where light becomes<br/><em>architecture.</em></h2>
        <div class="gold-rule rv" style="margin:0 0 28px;"></div>
        <p class="rv">Vargov Design — one of Europe's most sought-after architectural lighting studios — partners with John Cullen Lighting, London's definitive luxury lighting house since 1981, trusted by Claridge's, the Connaught, and some of the world's most significant private residences.</p>
        <p class="rv">Together they deliver a twelve-scene lighting choreography across each Ventus villa: bespoke luminaires engineered to specification, concealed track systems invisible to the eye, and a programme that moves through the day — from the pale clarity of morning to the warmth of the late Indian Ocean evening.</p>
      </div>
    </div>
  </div>

  <div class="feature flip">
    <div class="feat-img" data-parallax-sm>
      <img src="https://raw.githubusercontent.com/byauracle-ai/venerable-beijinho-853d83/main/Master.png" alt="Master Suite — Ventus Villa" loading="lazy" />
    </div>
    <div class="feat-text">
      <div class="feat-text-inner">
        <div class="eyebrow rv">The Master Suite</div>
        <h2 class="rv">Wake to<br/><em>the ocean.</em></h2>
        <div class="gold-rule rv" style="margin:0 0 28px;"></div>
        <p class="rv">Floor-to-ceiling glass dissolves the boundary between the master suite and the Indian Ocean beyond. The bed is positioned so the first light of day arrives from the east — over water.</p>
        <p class="rv">Private terrace, open-air shower, and a dressing room lined in Loro Piana's signature cashmere panel.</p>
      </div>
    </div>
  </div>

  <div class="feature">
    <div class="feat-img" data-parallax-sm>
      <img src="https://raw.githubusercontent.com/byauracle-ai/venerable-beijinho-853d83/main/window.png" alt="Floor-to-ceiling view — Ventus" loading="lazy" />
    </div>
    <div class="feat-text">
      <div class="feat-text-inner">
        <div class="eyebrow rv">Sea View · Floor 3</div>
        <h2 class="rv">The frame<br/>is the <em>horizon.</em></h2>
        <div class="gold-rule rv" style="margin:0 0 28px;"></div>
        <p class="rv">Ventus treats glass not as a wall but as a canvas. Three metres of uninterrupted glazing from floor to ceiling — each window a living painting of the east coast lagoon.</p>
        <p class="rv">Structural glass fins eliminate visible frames at the corners, creating the sensation of standing in open air.</p>
      </div>
    </div>
  </div>

  <!-- ══ SEVEN VILLAS ══ -->
  <section id="villas">
    <div id="villas-header">
      <div>
        <div class="eyebrow rv">The Collection</div>
        <h2 class="rv">Seven addresses.<br/><em>One island.</em></h2>
      </div>
      <div class="villas-price rv">
        <div class="from">Priced from</div>
        <div class="amount">£1,250,000</div>
      </div>
    </div>
    <div id="villas-list">
      <div class="villa-row rv">
        <div class="villa-row-num">I</div>
        <div class="villa-row-name">Tempest</div>
        <div class="villa-row-loc">East Coast, Mauritius</div>
        <div class="villa-row-tag">4 Beds · 380m²</div>
        <div class="villa-row-price">£1,250,000</div>
        <div class="villa-row-cta">Enquire</div>
      </div>
      <div class="villa-row rv">
        <div class="villa-row-num">II</div>
        <div class="villa-row-name">Solstice</div>
        <div class="villa-row-loc">East Coast, Mauritius</div>
        <div class="villa-row-tag">4 Beds · 420m²</div>
        <div class="villa-row-price">£1,390,000</div>
        <div class="villa-row-cta">Enquire</div>
      </div>
      <div class="villa-row rv">
        <div class="villa-row-num">III</div>
        <div class="villa-row-name">Meridian</div>
        <div class="villa-row-loc">East Coast, Mauritius</div>
        <div class="villa-row-tag">4 Beds · 460m²</div>
        <div class="villa-row-price">£1,480,000</div>
        <div class="villa-row-cta">Enquire</div>
      </div>
      <div class="villa-row rv">
        <div class="villa-row-num">IV</div>
        <div class="villa-row-name">Equinox</div>
        <div class="villa-row-loc">East Coast, Mauritius</div>
        <div class="villa-row-tag">5 Beds · 550m²</div>
        <div class="villa-row-price">£1,640,000</div>
        <div class="villa-row-cta">Enquire</div>
      </div>
      <div class="villa-row rv">
        <div class="villa-row-num">V</div>
        <div class="villa-row-name">Sirocco</div>
        <div class="villa-row-loc">East Coast, Mauritius</div>
        <div class="villa-row-tag">5 Beds · 620m²</div>
        <div class="villa-row-price">£1,850,000</div>
        <div class="villa-row-cta">Enquire</div>
      </div>
      <div class="villa-row rv">
        <div class="villa-row-num">VI</div>
        <div class="villa-row-name">Calima</div>
        <div class="villa-row-loc">East Coast, Mauritius</div>
        <div class="villa-row-tag">5 Beds · 720m²</div>
        <div class="villa-row-price">£2,100,000</div>
        <div class="villa-row-cta">Enquire</div>
      </div>
      <div class="villa-row rv">
        <div class="villa-row-num">VII</div>
        <div class="villa-row-name">Aura</div>
        <div class="villa-row-loc">East Coast, Mauritius</div>
        <div class="villa-row-tag">5 Beds · 820m²</div>
        <div class="villa-row-price">Price on Application</div>
        <div class="villa-row-cta">Enquire</div>
      </div>
    </div>
  </section>

  <!-- ══ COLLECTOR'S GARAGE (with villas) ══ -->
  <div id="garage-interlude" data-parallax>
    <img
      src="https://raw.githubusercontent.com/byauracle-ai/venerable-beijinho-853d83/main/Garage.png"
      alt="Collector's Garage — Ventus" loading="lazy"
    />
    <div id="garage-text" class="rv">
      <p>Collector&apos;s Garage &middot; Included with Each Residence</p>
      <h2>Built for those<br/>who collect<br/>the finest things.</h2>
    </div>
  </div>

  <!-- PULLQUOTE 1 -->
  <div class="pullquote" data-parallax>
    <img class="pullquote-img" src="https://raw.githubusercontent.com/byauracle-ai/venerable-beijinho-853d83/main/Sea%20view%202.png" alt="Ventus — Indian Ocean View" loading="lazy" />
    <div class="pullquote-body rv">
      <blockquote>"The rarest addresses are not found.<br/>They are recognised."</blockquote>
      <cite>Ventus &middot; East Coast, Mauritius</cite>
    </div>
  </div>

  <!-- ══ SETTING ══ -->
  <section id="setting">
    <div id="setting-inner">
      <div>
        <div class="eyebrow rv">The Location</div>
        <h2 class="rv">Île aux Cerf<br/>at your <em>threshold.</em></h2>
        <p class="rv">
          Between Quatre Soeurs and Grand Baie — Ventus occupies one of the east coast's last genuinely private plots. Île aux Cerf, Mauritius's most celebrated coral island, is a five-minute boat crossing. The GRSE Waterfall reserve frames the inland boundary. Anahita Golf Resort, the Four Seasons, and the Shangri-La are all within a short drive.
        </p>
        <p class="rv">
          This is a location that requires no compensation with amenity. The natural endowment alone — the lagoon, the reef, the turquoise clarity of the water — places Ventus among the most privileged addresses in the southern hemisphere.
        </p>
        <div class="setting-callouts rv">
          <div class="setting-callout">
            <div class="setting-callout-n">5 min</div>
            <div class="setting-callout-l">To Île aux Cerf by boat —<br/>Mauritius's finest coral island</div>
          </div>
          <div class="setting-callout">
            <div class="setting-callout-n">330</div>
            <div class="setting-callout-l">Days of sunshine per year —<br/>East Coast Mauritius average</div>
          </div>
          <div class="setting-callout">
            <div class="setting-callout-n">27°</div>
            <div class="setting-callout-l">Average Indian Ocean temperature<br/>year-round</div>
          </div>
        </div>
      </div>
      <div id="setting-right" class="rv">
        <div class="setting-img-main setting-map">
          <img src="https://raw.githubusercontent.com/byauracle-ai/venerable-beijinho-853d83/main/Screenshot%202026-05-16%20222718.png" alt="Ventus — East Coast Location, Mauritius" loading="lazy" />
          <div class="map-overlay">
            <div class="map-coord">20°07′S &nbsp; 57°39′E</div>
            <div class="map-label">East Coast, Mauritius</div>
          </div>
        </div>
        <div class="setting-img-accent"></div>
      </div>
    </div>
  </section>

  <!-- PULLQUOTE 2 -->
  <div class="pullquote" data-parallax>
    <img class="pullquote-img" src="https://raw.githubusercontent.com/byauracle-ai/venerable-beijinho-853d83/main/LPinterior3.png" alt="Loro Piana Interior — Ventus" loading="lazy" />
    <div class="pullquote-body rv">
      <blockquote>"Not merely a home.<br/>A permanent address in the world's<br/>most tax-efficient paradise."</blockquote>
      <cite>Permanent Residence Permit included &middot; From £1,250,000</cite>
    </div>
  </div>

  <!-- ══ WELLNESS ══ -->
  <section id="wellness">
    <div id="wellness-head">
      <div>
        <div class="eyebrow rv">Shared Wellness Sanctuary · KLAF Design</div>
        <h2 class="rv">The Wellness<br/><em>Sanctuary.</em></h2>
      </div>
      <p class="rv">
        Descend &middot; Restore &middot; Transcend.<br/><br/>
        The Ventus Wellness Sanctuary is a shared privilege of all seven resident families — a dedicated facility of extraordinary depth, conceived entirely by the KLAF Design Team, specialists in sensory wellness architecture who approach every room as a ritual space.
      </p>
    </div>

    <div class="spa-chapter">
      <div class="spa-chapter-img" data-parallax-sm>
        <img src="https://raw.githubusercontent.com/byauracle-ai/venerable-beijinho-853d83/main/Spa%20Entry.png" alt="Spa Entry — Ventus" loading="lazy" />
      </div>
      <div class="spa-chapter-body">
        <div class="spa-chapter-body-inner">
          <div class="eyebrow rv">The Descent</div>
          <h3 class="rv">Ancient healing<br/>reborn in <em>volcanic stone.</em></h3>
          <p class="rv">The spa begins before the first treatment. The approach — a corridor of black basalt and diffused amber light — signals to the body that something is about to change.</p>
          <p class="rv">Mauritius's indigenous healing traditions, reinterpreted by KLAF in materials that speak of permanence and calm.</p>
        </div>
      </div>
    </div>

    <div class="spa-chapter flip">
      <div class="spa-chapter-img" data-parallax-sm>
        <img src="https://raw.githubusercontent.com/byauracle-ai/venerable-beijinho-853d83/main/DSC04815-Enhanced-NR-Edit-Edit-Edit-min.jpg" alt="Himalayan Pink Salt Sauna — Ventus KLAF Design" loading="lazy" />
      </div>
      <div class="spa-chapter-body">
        <div class="spa-chapter-body-inner">
          <div class="eyebrow rv">The Salt Chamber</div>
          <h3 class="rv"><em>Himalayan</em> Pink Salt<br/>Sauna</h3>
          <p class="rv">Hand-carved walls of ancient pink Himalayan salt — 250 million years of geological memory brought into a room of pure silence. Negative ion emission. Natural halotherapy.</p>
          <p class="rv">The salt is sourced from the Khewra mines of northern Pakistan — the same origin used by the world's finest wellness retreats. Custom-cut and set by KLAF's craftsmen.</p>
        </div>
      </div>
    </div>

    <div class="spa-chapter">
      <div class="spa-chapter-img" data-parallax-sm>
        <img src="https://raw.githubusercontent.com/byauracle-ai/venerable-beijinho-853d83/main/Spa%202.png" alt="Chromatherapy Pool — Ventus" loading="lazy" />
      </div>
      <div class="spa-chapter-body">
        <div class="spa-chapter-body-inner">
          <div class="eyebrow rv">Chromatherapy</div>
          <h3 class="rv">Light as<br/><em>medicine.</em></h3>
          <p class="rv">Seven chromatic states, each calibrated to the body's natural energy centres. From deep indigo calm to amber vitality — the pool shifts its frequency with you.</p>
          <p class="rv">The chromatherapy programme was developed exclusively for Ventus by KLAF in collaboration with a Zurich-based medical wellness consultancy.</p>
        </div>
      </div>
    </div>

    <div class="spa-chapter flip">
      <div class="spa-chapter-img" data-parallax-sm>
        <img src="https://raw.githubusercontent.com/byauracle-ai/venerable-beijinho-853d83/main/Spa%203.jpg" alt="Deep Restoration — Ventus Spa" loading="lazy" />
      </div>
      <div class="spa-chapter-body">
        <div class="spa-chapter-body-inner">
          <div class="eyebrow rv">Deep Restoration</div>
          <h3 class="rv">Total silence.<br/><em>Total surrender.</em></h3>
          <p class="rv">Aromatherapy ritual rooms with botanical diffusion systems. Bespoke scent programmes drawn from indigenous Mauritian flora — ylang-ylang, vetiver, vanilla.</p>
          <p class="rv">The final room in the KLAF sequence is one of complete stillness. The Indian Ocean trade winds carry scent through louvred stone.</p>
        </div>
      </div>
    </div>

    <div id="spa-amenities">
      <div class="spa-am-cell rv">
        <div class="spa-am-title">Hydrotherapy</div>
        <ul class="spa-am-items">
          <li>Heated jet pool</li><li>Cold plunge bath</li>
          <li>Mineral steam room</li><li>Contrast therapy circuit</li>
        </ul>
      </div>
      <div class="spa-am-cell rv">
        <div class="spa-am-title">Body Rituals</div>
        <ul class="spa-am-items">
          <li>Volcanic stone massage</li><li>Coconut &amp; island botanicals</li>
          <li>Ayurvedic treatments</li><li>Bespoke scent ritual</li>
        </ul>
      </div>
      <div class="spa-am-cell rv">
        <div class="spa-am-title">Movement</div>
        <ul class="spa-am-items">
          <li>Sunrise yoga pavilion</li><li>Sunset meditation deck</li>
          <li>Resident wellness director</li><li>Private training available</li>
        </ul>
      </div>
      <div class="spa-am-cell rv">
        <div class="spa-am-title">Nutrition</div>
        <ul class="spa-am-items">
          <li>Ayurvedic cuisine programme</li><li>Plant-based daily menu</li>
          <li>Private chef on request</li><li>Mauritian botanical teas</li>
        </ul>
      </div>
    </div>
  </section>

  <!-- ══ DINING ══ -->
  <section id="dining">
    <div id="dining-header">
      <div>
        <div class="eyebrow rv">Culinary Excellence</div>
        <h2 class="rv">A five-star table<br/>above the <em>Indian Ocean.</em></h2>
      </div>
      <p class="rv">
        Two dining experiences. One philosophy — the pursuit of the extraordinary. A Michelin-calibre Japanese restaurant at sea level, and a rooftop bar above the lagoon. Both exclusive to Ventus residents and their guests.
      </p>
    </div>

    <!-- Restaurant -->
    <div class="dining-panel">
      <div class="dining-panel-img" data-parallax-sm>
        <img src="https://raw.githubusercontent.com/byauracle-ai/venerable-beijinho-853d83/main/Screenshot%202026-05-16%20213211.png" alt="Ventus — Japanese Restaurant" loading="lazy" />
      </div>
      <div class="dining-panel-body">
        <div class="dining-panel-inner">
          <div class="eyebrow rv">The Restaurant</div>
          <h3 class="rv">Japanese <em>Omakase</em><br/>at the water's edge.</h3>
          <p class="rv">
            An intimate twelve-seat omakase counter and a wider dining room of thirty covers, presided over by a chef with fifteen years at Japan's finest kaiseki houses. The menu follows the tides: what is caught that morning defines what is served that evening.
          </p>
          <p class="rv">
            Bluefin from the Maldivian line. Wagyu brought weekly. Sake and Japanese whisky curated by a sommelier who trained in Kyoto. The most considered table on the east coast of Mauritius.
          </p>
          <div class="dining-tags rv">
            <span class="dining-tag">Omakase Counter</span>
            <span class="dining-tag">Private Dining</span>
            <span class="dining-tag">Sake Cellar</span>
            <span class="dining-tag">Residents Only</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Rooftop Bar -->
    <div id="rooftop-interlude" data-parallax>
      <img src="https://raw.githubusercontent.com/byauracle-ai/venerable-beijinho-853d83/main/roof%20top%20bar.png" alt="Ventus — Rooftop Bar" loading="lazy" />
      <div id="rooftop-body">
        <div class="eyebrow rv">The Rooftop</div>
        <h2 class="rv">Cocktails at<br/>the edge of everything.</h2>
        <p class="desc rv">
          Above the restaurant, above the lagoon, above the world — the Ventus rooftop bar is open from sundown to the small hours. Japanese-inspired cocktails, rare whisky, and the east coast horizon burning gold then black. A perch for those who appreciate the finest view in the Indian Ocean.
        </p>
      </div>
    </div>

  </section>

  <!-- ══ MARKET INTELLIGENCE ══ -->
  <section id="invest">
    <div id="invest-inner">
      <div id="invest-header">
        <div>
          <div class="eyebrow rv">Market Intelligence</div>
          <h2 class="rv">Mauritius. The soundest<br/>address in the<br/><em>Indian Ocean.</em></h2>
        </div>
        <div>
          <p class="rv">Five reasons converge into one irrefutable argument: capital appreciation, rental income, permanent residency, zero capital gains, and a way of life unavailable anywhere else on earth.</p>
          <p class="rv" style="margin-top:16px;font-size:.78rem;color:var(--mute);">Ventus qualifies under the Mauritius Smart City Scheme — granting permanent residency to buyers and their dependants upon completion.</p>
        </div>
      </div>

      <!-- Big 4 metrics -->
      <div id="invest-metrics">
        <div class="im-cell rv">
          <div class="im-cell-l">GDP Growth Rate</div>
          <div class="im-cell-v">6.8<span class="u">%</span></div>
          <div class="im-cell-d">Mauritius 2024 GDP growth — IMF. Among the strongest in Africa.</div>
          <div class="im-cell-bar"></div>
        </div>
        <div class="im-cell rv">
          <div class="im-cell-l">RPPI Annual Growth</div>
          <div class="im-cell-v">+12<span class="u">%</span></div>
          <div class="im-cell-d">Residential Property Price Index. Q4 2024, Statistics Mauritius.</div>
          <div class="im-cell-bar"></div>
        </div>
        <div class="im-cell rv">
          <div class="im-cell-l">Luxury Rental Yield</div>
          <div class="im-cell-v">5–9<span class="u">%</span></div>
          <div class="im-cell-d">Average gross yield for luxury coastal villas, eastern Mauritius.</div>
          <div class="im-cell-bar"></div>
        </div>
        <div class="im-cell rv">
          <div class="im-cell-l">Capital Gains Tax</div>
          <div class="im-cell-v">0<span class="u">%</span></div>
          <div class="im-cell-d">Zero CGT, zero inheritance tax, zero wealth tax for property owners.</div>
          <div class="im-cell-bar"></div>
        </div>
      </div>

      <!-- Tourism & FDI infographics -->
      <div id="invest-infograph">
        <div class="ig-cell rv">
          <div class="ig-eyebrow">Tourism Arrivals</div>
          <div class="ig-number">1.4<span class="u">M</span></div>
          <div class="ig-label">International visitors in 2024 — a record high. The east coast commands the highest nightly rates on the island.</div>
          <div class="ig-ring">
            <svg viewBox="0 0 60 60">
              <circle class="ring-track" cx="30" cy="30" r="26"/>
              <circle class="ring-fill" cx="30" cy="30" r="26" data-pct="88"/>
            </svg>
          </div>
        </div>
        <div class="ig-cell rv">
          <div class="ig-eyebrow">Foreign Direct Investment</div>
          <div class="ig-number">$1.2<span class="u">B</span></div>
          <div class="ig-label">FDI inflows 2024 — real estate sector leads, driven by IRS and Smart City schemes attracting global HNW buyers.</div>
          <div class="ig-ring">
            <svg viewBox="0 0 60 60">
              <circle class="ring-track" cx="30" cy="30" r="26"/>
              <circle class="ring-fill" cx="30" cy="30" r="26" data-pct="72"/>
            </svg>
          </div>
        </div>
        <div class="ig-cell rv">
          <div class="ig-eyebrow">Private Wealth Growth</div>
          <div class="ig-number">+67<span class="u">%</span></div>
          <div class="ig-label">Total investable wealth growth, Mauritius 2015–2025. Africa's strongest decade of private wealth appreciation.</div>
          <div class="ig-ring">
            <svg viewBox="0 0 60 60">
              <circle class="ring-track" cx="30" cy="30" r="26"/>
              <circle class="ring-fill" cx="30" cy="30" r="26" data-pct="67"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- RPPI Chart -->
      <div id="rppi-wrap" class="rv">
        <h3>Residential Property Price Index</h3>
        <p id="rppi-sub">Statistics Mauritius &middot; 2017–2024 &middot; Base year 2017 = 100</p>
        <div id="rppi-bars">
          <div class="rppi-col"><div class="rppi-val">100</div><div class="rppi-bar" data-h="38"></div><div class="rppi-yr">2017</div></div>
          <div class="rppi-col"><div class="rppi-val">104</div><div class="rppi-bar" data-h="42"></div><div class="rppi-yr">2018</div></div>
          <div class="rppi-col"><div class="rppi-val">109</div><div class="rppi-bar" data-h="47"></div><div class="rppi-yr">2019</div></div>
          <div class="rppi-col"><div class="rppi-val">107</div><div class="rppi-bar" data-h="44"></div><div class="rppi-yr">2020</div></div>
          <div class="rppi-col"><div class="rppi-val">111</div><div class="rppi-bar" data-h="50"></div><div class="rppi-yr">2021</div></div>
          <div class="rppi-col"><div class="rppi-val">120</div><div class="rppi-bar" data-h="60"></div><div class="rppi-yr">2022</div></div>
          <div class="rppi-col"><div class="rppi-val">132</div><div class="rppi-bar" data-h="74"></div><div class="rppi-yr">2023</div></div>
          <div class="rppi-col"><div class="rppi-val">147</div><div class="rppi-bar peak" data-h="92"></div><div class="rppi-yr">2024</div></div>
        </div>
      </div>

      <!-- Investment reasons -->
      <div id="invest-reasons" style="margin-top:2px;">
        <div class="ir-cell rv">
          <div class="ir-cell-head">Price Appreciation</div>
          <div class="ir-cell-title">8–12% forecast<br/><em>growth 2026</em></div>
          <div class="ir-cell-body">VEFA off-plan buyers lock in 30–60% below completed unit value. Bank-backed guarantees protect your deposit from day one.</div>
        </div>
        <div class="ir-cell rv">
          <div class="ir-cell-head">Permanent Residency</div>
          <div class="ir-cell-title">Family PRP from<br/><em>£1.25M</em></div>
          <div class="ir-cell-body">Buyer, spouse, and all dependants. Valid for the duration of ownership. 20-year renewable status.</div>
        </div>
        <div class="ir-cell rv">
          <div class="ir-cell-head">Tax Position</div>
          <div class="ir-cell-title"><em>0%</em> CGT ·<br/>0% Estate Tax</div>
          <div class="ir-cell-body">No capital gains, no inheritance tax, no annual property tax. Full profit repatriation. DTA with 46 countries.</div>
        </div>
        <div class="ir-cell rv">
          <div class="ir-cell-head">Act Before July 2026</div>
          <div class="ir-cell-title">Registration duty<br/><em>doubles</em></div>
          <div class="ir-cell-body">Non-citizen duty rises 5% → 10% on 1 July 2026. Reserve now under the Smart City Scheme and save significantly.</div>
        </div>
        <div class="ir-cell rv">
          <div class="ir-cell-head">Wealth Growth</div>
          <div class="ir-cell-title"><em>+67%</em><br/>decade growth</div>
          <div class="ir-cell-body">Total investable wealth, Mauritius 2015–2025. Africa's strongest decade of private wealth appreciation.</div>
        </div>
      </div>

      <div id="deadline">
        <div id="deadline-left">
          <h4>Buy before <em>1 July 2026.</em></h4>
          <p>Registration duty for non-citizens doubles from 5% to 10% on 1 July 2026.<br/>Reserving under the Smart City Scheme now protects you at the lower rate.</p>
        </div>
        <a href="#contact" class="deadline-arrow">Request Investment Brief →</a>
      </div>
    </div>
  </section>

  <!-- ══ VEFA — OFF-PLAN PURCHASE JOURNEY ══ -->
  <section id="vefa">
    <div id="vefa-inner">
      <div id="vefa-header">
        <div class="eyebrow rv">VEFA · Off-Plan Purchase</div>
        <h2 class="rv">Your investment,<br/>stage by stage.<br/><em>Every step protected.</em></h2>
        <p class="rv">
          VEFA (Vente en l'État Futur d'Achèvement) is Mauritius's off-plan purchase framework — a staged payment structure where your funds are released only as construction milestones are independently verified. At every stage, a bank guarantee protects your capital. You are buying a future address at today's price, with tomorrow's growth locked in from the day you sign.
        </p>
      </div>

      <div id="vefa-timeline">
        <div class="vefa-step lit rv">
          <div class="vefa-step-dot"></div>
          <div class="vefa-step-ghost">01</div>
          <div class="vefa-step-pct">10%</div>
          <div class="vefa-step-label">Reservation</div>
          <div class="vefa-step-body">Secure your villa with a 10% reservation deposit. Your price is fixed on this date — no future uplift applies to your reservation.</div>
          <div class="vefa-step-guar">Bank guarantee issued</div>
        </div>
        <div class="vefa-step rv">
          <div class="vefa-step-dot"></div>
          <div class="vefa-step-ghost">02</div>
          <div class="vefa-step-pct">20%</div>
          <div class="vefa-step-label">Foundation Complete</div>
          <div class="vefa-step-body">Second stage payment released upon independent certification that foundation and substructure works are complete.</div>
          <div class="vefa-step-guar">Notarised milestone</div>
        </div>
        <div class="vefa-step rv">
          <div class="vefa-step-dot"></div>
          <div class="vefa-step-ghost">03</div>
          <div class="vefa-step-pct">20%</div>
          <div class="vefa-step-label">Walls &amp; Structure</div>
          <div class="vefa-step-body">Third payment on verified completion of structural walls, columns, and load-bearing frame — your villa takes physical shape.</div>
          <div class="vefa-step-guar">Independent surveyor</div>
        </div>
        <div class="vefa-step rv">
          <div class="vefa-step-dot"></div>
          <div class="vefa-step-ghost">04</div>
          <div class="vefa-step-pct">15%</div>
          <div class="vefa-step-label">Roof &amp; Envelope</div>
          <div class="vefa-step-body">Fourth stage triggered by completion of the roof, exterior cladding, and weatherproofed envelope. Interior works begin.</div>
          <div class="vefa-step-guar">Bank guarantee active</div>
        </div>
        <div class="vefa-step rv">
          <div class="vefa-step-dot"></div>
          <div class="vefa-step-ghost">05</div>
          <div class="vefa-step-pct">35%</div>
          <div class="vefa-step-label">Completion &amp; Keys</div>
          <div class="vefa-step-body">Final payment on delivery of your completed villa, Certificate of Conformity issued, and title deed transferred. Your address is yours.</div>
          <div class="vefa-step-guar">Title transferred</div>
        </div>
      </div>

      <div id="vefa-guarantees">
        <div class="vg-cell rv">
          <div class="vg-icon">§</div>
          <div class="vg-title">Bank-Backed Deposit Guarantee</div>
          <div class="vg-body">Every stage payment is protected by a first-demand bank guarantee issued by a Mauritius-licensed bank. If construction halts for any reason, your capital is returned in full within 30 days. No conditions. No arguments.</div>
        </div>
        <div class="vg-cell rv">
          <div class="vg-icon">◈</div>
          <div class="vg-title">Notarised Price Lock</div>
          <div class="vg-body">Your purchase price is fixed on the day you sign the VEFA agreement and registered with the Mauritius Registrar of Companies. No price escalation clauses. No hidden surcharges. The price you agree today is the price you pay at completion.</div>
        </div>
        <div class="vg-cell rv">
          <div class="vg-icon">⌘</div>
          <div class="vg-title">Smart City Scheme Benefits</div>
          <div class="vg-body">Ventus qualifies under the Smart City Scheme, granting buyers who complete before 1 July 2026 the lower 5% registration duty, permanent residency for the family, and access to all Smart City fiscal incentives — including corporate tax holidays for qualifying activities.</div>
        </div>
      </div>
    </div>
  </section>

  <!-- ══ CONTACT ══ -->
  <section id="contact">
    <div id="contact-inner">
      <div id="contact-left">
        <div class="eyebrow rv">Private Viewing</div>
        <h2 class="rv">Arrange a<br/><em>private appointment.</em></h2>
        <p class="rv">All seven Ventus villas are available by private appointment only. Our advisors are reachable around the clock and there are no intermediaries — every enquiry is handled personally.</p>
        <div class="contact-details rv">
          <div>
            <div class="cd-label">Development Office</div>
            <div class="cd-val">East Coast, Mauritius</div>
          </div>
          <div>
            <div class="cd-label">Enquiries</div>
            <div class="cd-val">residences@ventus.mu</div>
          </div>
          <div>
            <div class="cd-label">Investment Memorandum</div>
            <div class="cd-val">Available upon qualification</div>
          </div>
        </div>
        <a href="#" class="btn rv"><span>Submit Enquiry</span></a>
      </div>
      <div class="rv">
        <form class="form" onsubmit="return false;">
          <div class="frow">
            <div class="ff"><label class="fl">First Name</label><input type="text" class="fi" placeholder="Given name" /></div>
            <div class="ff"><label class="fl">Surname</label><input type="text" class="fi" placeholder="Family name" /></div>
          </div>
          <div class="frow">
            <div class="ff"><label class="fl">Email</label><input type="email" class="fi" placeholder="Private address" /></div>
            <div class="ff"><label class="fl">Country</label><input type="text" class="fi" placeholder="Residence" /></div>
          </div>
          <div class="ff full">
            <label class="fl">Villa of Interest</label>
            <select class="fsel">
              <option value="">Select a residence</option>
              <option>Villa I — Tempest · £1,250,000</option>
              <option>Villa II — Solstice · £1,390,000</option>
              <option>Villa III — Meridian · £1,480,000</option>
              <option>Villa IV — Equinox · £1,640,000</option>
              <option>Villa V — Sirocco · £1,850,000</option>
              <option>Villa VI — Calima · £2,100,000</option>
              <option>Villa VII — Aura · POA</option>
              <option>Open to all residences</option>
            </select>
          </div>
          <div class="ff full">
            <label class="fl">Message</label>
            <textarea class="fta" placeholder="Tell us about your requirements..."></textarea>
          </div>
          <div style="margin-top:8px;">
            <button type="submit" class="btn"><span>Submit Enquiry</span></button>
          </div>
        </form>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer>
    <div class="footer-grid">
      <div>
        <div class="footer-brand-name">VENTUS</div>
        <p class="footer-brand-p">Seven boutique villas. East Coast, Mauritius. Indian Ocean.</p>
        <p class="footer-brand-p" style="margin-top:16px;">Architecture · SAOTA<br/>Interiors · Loro Piana<br/>Lighting · Vargov Design<br/>Wellness · KLAF Design Team</p>
      </div>
      <div>
        <div class="footer-col-head">The Villas</div>
        <ul class="footer-links">
          <li><a href="#">I — Tempest</a></li><li><a href="#">II — Solstice</a></li>
          <li><a href="#">III — Meridian</a></li><li><a href="#">IV — Equinox</a></li>
          <li><a href="#">V — Sirocco</a></li><li><a href="#">VI — Calima</a></li>
          <li><a href="#">VII — Aura</a></li>
        </ul>
      </div>
      <div>
        <div class="footer-col-head">The Experience</div>
        <ul class="footer-links">
          <li><a href="#">Architecture</a></li><li><a href="#">Interiors</a></li>
          <li><a href="#">Lighting</a></li><li><a href="#">Wellness</a></li>
          <li><a href="#">Dining</a></li><li><a href="#">Mauritius</a></li>
          <li><a href="#">Investment</a></li>
        </ul>
      </div>
      <div>
        <div class="footer-col-head">Contact</div>
        <ul class="footer-links">
          <li><a href="#">Private Enquiry</a></li><li><a href="#">Investment Memorandum</a></li>
          <li><a href="#">Arrange a Viewing</a></li><li><a href="#">VEFA Guide</a></li>
          <li><a href="#" style="color:var(--mute);margin-top:8px;display:block;">residences@ventus.mu</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-copy">© 2025 VENTUS Residences Ltd · East Coast, Mauritius · Smart City Scheme</div>
      <div class="footer-legal-links">
        <a href="#">Privacy</a><a href="#">Legal</a><a href="#">GDPR</a>
      </div>
    </div>
  </footer>

  <script>
  gsap.registerPlugin(ScrollTrigger);

  /* ── Cursor ── */
  const cur  = document.getElementById('cur');
  const ring = document.getElementById('cur-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    gsap.to(cur, { x: mx, y: my, duration: .07, ease: 'none' });
  });
  (function loop() {
    rx += (mx - rx) * .1; ry += (my - ry) * .1;
    gsap.set(ring, { x: rx, y: ry });
    requestAnimationFrame(loop);
  })();
  document.querySelectorAll('a,button,.villa-row,.dining-tag').forEach(el => {
    el.addEventListener('mouseenter', () => { gsap.to(cur, { width:18, height:18, duration:.3 }); gsap.to(ring, { width:56, height:56, duration:.3 }); });
    el.addEventListener('mouseleave', () => { gsap.to(cur, { width:8,  height:8,  duration:.3 }); gsap.to(ring, { width:32, height:32, duration:.3 }); });
  });

  /* ── Loader ── */
  const ldr  = document.getElementById('loader');
  const logo = document.getElementById('loader-logo');
  gsap.to(logo, { opacity: 1, duration: 1, delay: .3, ease: 'power2.out' });
  gsap.to(ldr,  {
    opacity: 0, duration: .7, delay: 2.1, ease: 'power2.inOut',
    onComplete() { ldr.style.display = 'none'; startHero(); }
  });

  function startHero() {
    const tl = gsap.timeline();
    tl.from('#hero-title',    { opacity: 0, y: 60, letterSpacing: '1em', duration: 1.6, ease: 'expo.out' })
      .from('#hero-badge',    { opacity: 0, y: 20, duration: .9, ease: 'power2.out' }, '-=.9')
      .from('#hero-location', { opacity: 0, y: 16, duration: .8, ease: 'power2.out' }, '-=.7')
      .from('#hero-sub-loc',  { opacity: 0, y: 12, duration: .7, ease: 'power2.out' }, '-=.6')
      .from('#hero-ctas',     { opacity: 0, y: 20, duration: .9, ease: 'power2.out' }, '-=.5')
      .from('#hero-yield',    { opacity: 0, x: 30, duration: .9, ease: 'power2.out' }, '-=.7')
      .from('#scroll-hint',   { opacity: 0, duration: .6, ease: 'power2.out' }, '-=.4');
  }

  /* ── Hero: image parallax + overlay darkens on scroll ── */
  gsap.to('#hero-img', {
    scale: 1.06, y: '6%', ease: 'none',
    scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1.2 }
  });
  gsap.to('#hero-dark', {
    opacity: .78, ease: 'power1.in',
    scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: .8 }
  });

  /* ── Nav solid ── */
  ScrollTrigger.create({
    start: 'top -60',
    onUpdate: s => document.getElementById('nav').classList.toggle('solid', s.scroll() > 60)
  });

  /* ── Chapter parallax ── */
  document.querySelectorAll('.chapter[data-parallax]').forEach(ch => {
    const img = ch.querySelector('.chapter-img');
    gsap.fromTo(img,
      { y: '-6%' },
      { y: '18%', ease: 'none',
        scrollTrigger: { trigger: ch, start: 'top bottom', end: 'bottom top', scrub: 1.4 }
      }
    );
  });

  /* ── Feature / spa / dining image parallax ── */
  document.querySelectorAll('[data-parallax-sm]').forEach(wrap => {
    const img = wrap.querySelector('img');
    if (!img) return;
    gsap.fromTo(img,
      { y: '-6%' },
      { y: '14%', ease: 'none',
        scrollTrigger: { trigger: wrap, start: 'top bottom', end: 'bottom top', scrub: 1 }
      }
    );
  });

  /* ── Full-bleed interlude parallax ── */
  ['#lp-interlude','#garage-interlude','#rooftop-interlude'].forEach(sel => {
    const el  = document.querySelector(sel);
    if (!el) return;
    const img = el.querySelector('img');
    gsap.fromTo(img,
      { y: '-10%' },
      { y: '16%', ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1.3 }
      }
    );
  });

  /* ── Pullquote parallax ── */
  document.querySelectorAll('.pullquote[data-parallax]').forEach(pq => {
    const img = pq.querySelector('.pullquote-img');
    gsap.fromTo(img,
      { y: '-10%' },
      { y: '18%', ease: 'none',
        scrollTrigger: { trigger: pq, start: 'top bottom', end: 'bottom top', scrub: 1.3 }
      }
    );
  });

  /* ── Scroll reveals — staggered by section ── */
  gsap.utils.toArray('.rv').forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, y: 32 },
      {
        opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
        scrollTrigger: {
          trigger: el, start: 'top 88%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  /* ── Villa rows — stagger on enter ── */
  ScrollTrigger.create({
    trigger: '#villas-list', start: 'top 80%',
    onEnter() {
      gsap.to('.villa-row', {
        opacity: 1, y: 0, duration: .7, ease: 'power3.out',
        stagger: .08
      });
    }
  });

  /* ── RPPI bars ── */
  ScrollTrigger.create({
    trigger: '#rppi-wrap', start: 'top 80%',
    onEnter() {
      document.querySelectorAll('.rppi-bar').forEach((b, i) => {
        gsap.to(b, {
          height: b.dataset.h + '%',
          duration: 1.4, delay: i * .1, ease: 'power3.out'
        });
      });
    }
  });

  /* ── Metric cell bars ── */
  gsap.utils.toArray('.im-cell').forEach(cell => {
    ScrollTrigger.create({
      trigger: cell, start: 'top 85%',
      onEnter: () => cell.classList.add('in')
    });
  });

  /* ── Infograph rings ── */
  gsap.utils.toArray('.ig-cell').forEach(cell => {
    const ring = cell.querySelector('.ring-fill');
    const pct  = ring ? +ring.dataset.pct : 0;
    ScrollTrigger.create({
      trigger: cell, start: 'top 80%',
      onEnter() {
        cell.classList.add('in');
        if (ring) {
          const full = 163;
          gsap.to(ring, {
            strokeDashoffset: full - (full * pct / 100),
            duration: 2, delay: .3, ease: 'power3.out'
          });
        }
      }
    });
  });

  /* ── VEFA dot lights ── */
  gsap.utils.toArray('.vefa-step').forEach((step, i) => {
    ScrollTrigger.create({
      trigger: step, start: 'top 80%',
      onEnter: () => step.classList.add('lit')
    });
  });

  /* ── VEFA guarantee top-line draw ── */
  gsap.utils.toArray('.vg-cell').forEach(cell => {
    ScrollTrigger.create({
      trigger: cell, start: 'top 82%',
      onEnter: () => cell.classList.add('in')
    });
  });

  /* ── Section dots ── */
  const dotMap = [
    { el: '#hero',     dot: 0 },
    { el: '#chapters', dot: 1 },
    { el: '#villas',   dot: 2 },
    { el: '#wellness', dot: 3 },
    { el: '#dining',   dot: 4 },
    { el: '#invest',   dot: 5 },
    { el: '#contact',  dot: 6 },
  ];
  const dots = document.querySelectorAll('.dot');
  dotMap.forEach(({ el, dot }) => {
    ScrollTrigger.create({
      trigger: el, start: 'top 55%', end: 'bottom 45%',
      onEnter:     () => dots.forEach((d,i) => d.classList.toggle('on', i === dot)),
      onEnterBack: () => dots.forEach((d,i) => d.classList.toggle('on', i === dot)),
    });
  });

  /* ── Reduced motion ── */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.globalTimeline.timeScale(0);
    document.querySelectorAll('.rv').forEach(e => { e.style.opacity = 1; e.style.transform = 'none'; });
  }
  </script>
</body>
</html>
