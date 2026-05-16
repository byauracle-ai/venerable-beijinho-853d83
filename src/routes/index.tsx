// src/routes/index.tsx
import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  useEffect(() => {
    // Smooth scroll for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement
      if (target.hash) {
        e.preventDefault()
        document.querySelector(target.hash)?.scrollIntoView({
          behavior: 'smooth'
        })
      }
    }
    document.addEventListener('click', handleAnchorClick)
    return () => document.removeEventListener('click', handleAnchorClick)
  }, [])

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen overflow-x-hidden">
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-screen-2xl mx-auto px-8 py-6 flex justify-between items-center">
          <div className="text-4xl tracking-[4px] font-serif text-[#D4AF77]">ÉCLAT</div>
          
          <div className="hidden md:flex gap-10 text-sm uppercase tracking-widest">
            <a href="#villas" className="hover:text-[#D4AF77] transition-colors">Villas</a>
            <a href="#wellness" className="hover:text-[#D4AF77] transition-colors">Wellness</a>
            <a href="#investment" className="hover:text-[#D4AF77] transition-colors">Investment</a>
            <a href="#experience" className="hover:text-[#D4AF77] transition-colors">Experience</a>
          </div>

          <button 
            onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 border border-[#D4AF77] hover:bg-[#D4AF77] hover:text-black transition-all text-sm tracking-widest"
          >
            BOOK PRIVATE VIEWING
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="h-screen bg-cover bg-center relative flex items-center" 
               style={{ backgroundImage: "linear-gradient(rgba(10,10,10,0.55), rgba(10,10,10,0.75)), url('https://picsum.photos/id/1015/2000/1200')" }}>
        <div className="max-w-screen-2xl mx-auto px-8 pt-20">
          <h1 className="text-7xl md:text-8xl leading-none tracking-tighter font-serif max
