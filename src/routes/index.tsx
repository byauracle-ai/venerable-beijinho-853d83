<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ÉCLAT — Mauritius | Ultra-Luxury Villas</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;500;600&display=swap');
    
    body { font-family: 'Inter', system-ui, sans-serif; }
    .heading { font-family: 'Playfair Display', serif; }
    
    .gold { color: #D4AF77; }
    .gold-gradient {
      background: linear-gradient(90deg, #D4AF77, #F5E8C7, #D4AF77);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    .hero-bg {
      background-image: linear-gradient(rgba(10,10,10,0.5), rgba(10,10,10,0.7)), 
                        url('https://picsum.photos/id/1015/2000/1200');
      background-size: cover;
      background-position: center 30%;
    }
    
    .section-title {
      font-size: 3.5rem;
      line-height: 1.1;
    }
  </style>
</head>
<body class="bg-[#0A0A0A] text-white overflow-x-hidden">

  <!-- NAVBAR -->
  <nav class="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10 transition-all duration-500">
    <div class="max-w-screen-2xl mx-auto px-8 py-6 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <span class="text-4xl tracking-[0.5em] heading gold">ÉCLAT</span>
      </div>
      <div class="hidden md:flex items-center gap-10 text-sm uppercase tracking-widest">
        <a href="#villas" class="hover:gold transition-colors">Villas</a>
        <a href="#wellness" class="hover:gold transition-colors">Wellness</a>
        <a href="#investment" class="hover:gold transition-colors">Investment</a>
        <a href="#experience" class="hover:gold transition-colors">Experience</a>
      </div>
      <button onclick="document.getElementById('cta').scrollIntoView({behavior:'smooth'})"
        class="px-8 py-4 border border-[#D4AF77] text-[#D4AF77] hover:bg-[#D4AF77] hover:text-black transition-all duration-300 text-sm tracking-widest">
        BOOK PRIVATE VIEW
