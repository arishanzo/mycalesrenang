import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MYCA_TESTIMONIALS } from '../libs/data';
import { Star, Quote, ShieldCheck, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.review-card-item', {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: reviewsRef.current,
          start: 'top bottom',
          toggleActions: 'play none none none',
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="testimonials"
      ref={containerRef}
      className="py-24 bg-marine-950 text-white relative overflow-hidden"
    >
      {/* Decorative dark marine background elements */}
      <div className="absolute top-[10%] right-[-10%] w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[400px] h-[400px] bg-marine-800/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Testimonials Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center text-xs font-baloo font-bold tracking-widest text-cyan-400 uppercase bg-marine-900/60 border border-marine-800 px-4 py-1.5 rounded-full mb-3">
            KATA MEREKA
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mt-3 tracking-tight">
            Cerita Sukses Alumni Belajar Renang.
          </h2>
          <p className="text-xs sm:text-sm text-marine-300 mt-3 font-light max-w-xl mx-auto">
            Ratusan orang tua, anak, dan dewasa telah mempercayakan impian berenang mereka kepada kami. Baca ulasan tulus mereka di bawah ini.
          </p>
          <div className="h-1.5 w-24 bg-gradient-to-r from-cyan-500 to-marine-600 mx-auto mt-4 rounded-full" />
        </div>

        {/* Reviews Horizontal Testimonial Grid */}
        <div
          ref={reviewsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch"
        >
          {MYCA_TESTIMONIALS.map((test) => (
            <div
              key={test.id}
              className="review-card-item flex flex-col justify-between p-6 sm:p-8 rounded-3xl premium-dark-card relative hover:border-cyan-500/40 transition-colors"
            >
              {/* Quote background icon */}
              <Quote className="absolute top-6 right-6 h-10 w-10 text-cyan-500/10" />

              <div>
                
                {/* Rating Stars */}
                <div className="flex gap-1 text-amber-500 mb-4 items-center">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-500 stroke-amber-500" />
                  ))}
                  <span className="text-xs font-baloo text-marine-300 ml-1">5.0 / 5.0</span>
                </div>

                <p className="text-xs sm:text-sm text-marine-200 font-light leading-relaxed mb-6 italic text-left">
                  {test.text}
                </p>

              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3 pt-6 border-t border-marine-800 mt-auto">
                <div className="h-10 w-10 rounded-full bg-marine-800 border border-marine-700 flex items-center justify-center font-bold text-cyan-400 text-sm">
                  {test.name[0]}
                </div>
                
                <div className="text-left">
                  <h4 className="text-xs sm:text-sm font-semibold text-white">
                    {test.name}
                  </h4>
                  <p className="text-[10px] text-marine-300 font-sans mt-0.5">
                    {test.role}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Footnote validation trust */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-16 text-center text-xs text-marine-300">
          <div className="flex items-center gap-1.5 bg-marine-900/60 border border-marine-800 py-1.5 px-4 rounded-xl">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Garansi Lulus Berenang Sesuai Target Kurikulum</span>
          </div>
          <div className="flex items-center gap-1.5 bg-marine-900/60 border border-marine-800 py-1.5 px-4 rounded-xl">
            <Heart className="h-4 w-4 text-rose-400 fill-rose-400" />
            <span>98% Peringkat Kepuasan</span>
          </div>
        </div>

      </div>
    </section>
  );
}
