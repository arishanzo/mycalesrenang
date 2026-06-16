import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Waves, ShieldCheck,Star } from 'lucide-react';
import Image from 'next/image';

interface HeroProps {
  onExploreClick: () => void;
}

export default function Hero({onExploreClick }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textGroupRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const btnGroupRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  // Entrance animations for premium impression
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      // Floating wave animation
      gsap.to('.hero-wave', {
        y: '12px',
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // Staggered reveal
      tl.from(tagRef.current, {
        opacity: 0,
        y: 20,
        scale: 0.8,
        duration: 0.6,
        ease: 'back.out(1.7)'
      });

      tl.from(titleRef.current, {
        opacity: 0,
        y: 35,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.4');

      tl.from(descRef.current, {
        opacity: 0,
        y: 25,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.5');

      tl.from(btnGroupRef.current, {
        opacity: 0,
        y: 15,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.4');

      tl.from('.hero-badge-item', {
        opacity: 0,
        scale: 0.8,
        stagger: 0.1,
        duration: 0.6,
        ease: 'back.out(1.4)'
      }, '-=0.3');

      tl.from(statsRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.4');

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-marine-50"
    >
      {/* Premium Background Graphics */}
      <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] bg-cyan-200/30 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-[5%] left-[-10%] w-[350px] h-[350px] bg-marine-300/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Landing Copy Column */}
          <div ref={textGroupRef} className="lg:col-span-7 flex flex-col items-start gap-6 text-left">
            
           

            <h1
              ref={titleRef}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-marine-900 tracking-tight leading-[1.1]"
            >
              Mulai Langkahmu, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-marine-600 to-cyan-500 relative">
                Berenang itu Seru!
                {/* Visual undercurl effect */}
                <Waves className="absolute -bottom-4 right-0 w-32 h-6 text-cyan-300/70 hero-wave" />
              </span>
            </h1>

            <p
              ref={descRef}
              className="text-base sm:text-lg text-marine-800 max-w-xl font-light leading-relaxed mt-2"
            >
              Selamat datang di <strong className="font-semibold text-marine-900">MYCA Les Renang</strong>, 
              les renang yang menyediakan pilihan program <span className="underline decoration-cyan-400 font-medium text-marine-900">les privat, semi privat, dan grup</span>. 
              Sebutkan targetmu, kami akan bimbing dari dasar dengan kurikulum menyenangkan, tuntas, dan berstandar safety tinggi.
            </p>

            {/* Micro Badges for SEO/Credibility */}
            <div className="flex flex-wrap gap-3 mt-1">
              <span className="hero-badge-item inline-flex items-center gap-1.5 text-xs bg-white text-marine-800 border border-marine-200 py-1 px-3 rounded-lg shadow-sm">
                <ShieldCheck className="h-3.5 w-3.5 text-cyan-500" /> Kolam Air Hangat (Indoor)
              </span>
              <span className="hero-badge-item inline-flex items-center gap-1.5 text-xs bg-white text-marine-800 border border-marine-200 py-1 px-3 rounded-lg shadow-sm">
                <ShieldCheck className="h-3.5 w-3.5 text-cyan-500" /> Sistem Air Bebas Klorin
              </span>
              <span className="hero-badge-item inline-flex items-center gap-1.5 text-xs bg-white text-marine-800 border border-marine-200 py-1 px-3 rounded-lg shadow-sm">
                <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" /> Instruktur Wanita & Pria
              </span>
            </div>

            {/* Button Interactions */}
            <div
              ref={btnGroupRef}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mt-4"
            >
              <a
                id="hero-join-now"
                onClick={onJoinClick}
                className="flex items-center justify-center gap-2 px-8 py-4 text-white bg-marine-800 hover:bg-cyan-500 rounded-2xl shadow-lg hover:shadow-cyan-200/50 transition-all duration-300 font-semibold group cursor-pointer"
              >
                Booking Jadwal Sekarang
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform" />
              </a>
              
              <button
                id="hero-see-services"
                onClick={onExploreClick}
                className="flex items-center justify-center gap-2 px-8 py-4 text-marine-800 bg-white hover:bg-marine-100 border border-marine-200 rounded-2xl shadow-sm hover:shadow transition-all duration-300 font-semibold cursor-pointer"
              >
                Lihat Program Les
              </button>
            </div>

             <div
                ref={statsRef}
             className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-marine-200 w-full mt-4">
            <div className="text-center">
                <p className="text-3xl font-bold text-marine-900 font-display">50+</p>
                <p className="text-xs text-marine-600 tracking-wider uppercase mt-1">Alumni & Murid</p>
            </div>
            <div className="text-center">
                <p className="text-3xl font-bold text-marine-900 font-display">100%</p>
                <p className="text-xs text-marine-600 tracking-wider uppercase mt-1">Lulus Bisa Renang</p>
            </div>
            <div className="text-center">
                <p className="text-3xl font-bold text-cyan-600 font-display">20+</p>
                <p className="text-xs text-marine-600 tracking-wider uppercase mt-1">Coach Renang Profesional</p>
            </div>
            <div className="text-center">
                <p className="text-3xl font-bold text-marine-900 font-display">100%</p>
                <p className="text-xs text-marine-600 tracking-wider uppercase mt-1">Garansi</p>
            </div>
            </div>

          </div>

          {/* Visual Column Containing Generated Hero Pool */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Visual Backdrops decor */}
            <div className="absolute top-[10%] left-[-5%] w-10 h-10 bg-cyan-400 rounded-full animate-bounce" style={{ animationDuration: '4s' }} />
            <div className="absolute -bottom-4 right-[10%] w-[110%] h-[110%] border-2 border-dashed border-cyan-300/50 rounded-[2.5rem] pointer-events-none -z-10 transform rotate-1" />

            <div className="w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl relative border-4 border-white transform hover:scale-[1.02] transition-transform duration-500 group">
              {/* Overlay Glass effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-marine-950/70 via-transparent to-transparent opacity-60 pointer-events-none" />

              <Image
                id="hero-img-asset"
                height={320}
                width={420}
                src="/images/hero_swimming_pool_1780638038914.png"
                alt="MYCA Les Renang Premium Swimming Center Pool Semarang"
                className="w-full h-[320px] sm:h-[420px] object-cover transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Floating review card inside image for design premium depth */}
              <div className="absolute bottom-6 left-6 right-6 p-4 premium-blur-glass rounded-2xl border border-white/40 shadow-xl flex items-center gap-3 animate-pulse-slow">
                <div className="h-10 w-10 rounded-full bg-cyan-100 flex items-center justify-center font-bold text-cyan-600 text-sm shadow">
                  MY
                </div>
                <div>
                  <div className="flex gap-0.5 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-amber-500" />
                    ))}
                  </div>
                  <p className="text-xs font-semibold text-marine-950 mt-0.5">Kids & Adults Program</p>
                  <p className="text-[10px] text-marine-600 font-baloo">Semarang</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
