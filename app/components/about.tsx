import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, CheckCircle2 } from 'lucide-react';
import { coreValues } from '../libs/data';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin element logic, simple scroll trigger for fade and raise animation
      gsap.from(leftColRef.current, {
        opacity: 0,
        x: -50,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          toggleActions: 'play none none none'
        }
      });

      gsap.from(rightColRef.current, {
        opacity: 0,
        x: 50,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          toggleActions: 'play none none none'
        }
      });

      gsap.from('.value-card', {
        opacity: 0,
        y: 35,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.values-grid-trigger',
          start: 'top bottom',
          toggleActions: 'play none none none'
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  

  return (
    <section
      id="about"
      ref={containerRef}
      className="py-24 bg-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading with SEO Keywords */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center text-xs font-baloo font-bold tracking-widest text-cyan-600 uppercase bg-cyan-100/60 border border-cyan-200 px-4 py-1.5 rounded-full mb-3">
            TENTANG MYCA Les Renang
          </span>
          <p className="font-display text-3xl sm:text-4xl font-bold text-marine-900 tracking-tight">
            Les Renang Terpercaya untuk Segala Jenjang Usia
          </p>
          <div className="h-1.5 w-24 bg-gradient-to-r from-marine-600 to-cyan-400 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Image Block (Left) */}
          <div ref={leftColRef} className="lg:col-span-5 relative">
            <div className="relative">
              {/* Golden beach/sand background accent */}
              <div className="absolute -top-4 -left-4 w-72 h-72 bg-cyan-200/40 rounded-full blur-3xl -z-10" />
              <div className="absolute -bottom-6 -right-6 w-1/2 h-1/2 bg-marine-200/40 rounded-3xl -z-10" />

              <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white transform hover:rotate-1 transition-transform duration-500">
                <Image
                width={400}
                height={400}
                  id="about-img-coach"
                  src="/images/private_coach_1780638055912.png"
                  alt="Instruktur Renang MYCA Les Renang Semarang Mengajar Privat"
                  className="w-full h-[400px] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Float Badge */}
              <div className="absolute -bottom-4 left-6 p-4 bg-marine-850 bg-gradient-to-r from-marine-950 to-marine-900 text-white rounded-2xl shadow-xl flex items-center gap-3">
                <div className="p-2 bg-cyan-500 rounded-lg">
                  <Award className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-cyan-300 font-semibold tracking-wider">Mulai Usia</p>
                  <p className="text-sm font-bold">6 Bulan - Dewasa</p>
                </div>
              </div>
            </div>
          </div>

          {/* Copy Block (Right) */}
          <div ref={rightColRef} className="lg:col-span-7 flex flex-col gap-6">
            
            <h3 className="text-2xl sm:text-3xl font-bold text-marine-900 leading-tight">
              Belajar Renang Tanpa Panik, Tuntas Sesuai Bakat & Kecepatan Anda
            </h3>

            <p className="text-base text-marine-800 font-light leading-relaxed">
              <strong className="font-semibold text-marine-950">MYCA Les Renang</strong> merupakan les renang premium  yang berfokus memberikan instruksi renang berstandar tinggi dengan pendekatan ramah. 
              Kami memahami setiap orang memiliki hubungan yang berbeda dengan air—baik anak balita yang baru mulai, anak yang memiliki trauma tenggelam, hingga orang dewasa yang ingin mahir bernapas jarak jauh.
            </p>

            <p className="text-base text-marine-800 font-light leading-relaxed">
              Kami berkomitmen membuang jauh-jauh rasa cemas di kolam. Metode pengajaran kami mendikte bahwa 
              <span className="font-semibold text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-full ml-1 font-sans">berenang itu seru</span>, dirangkai melalui aktivitas interaktif yang bertahap dan menyenangkan.
            </p>

            {/* Program Subtitles checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              <div className="flex items-center gap-2 text-sm text-marine-900">
                <CheckCircle2 className="h-4 w-4 text-cyan-500 shrink-0" />
                <span><strong className="font-medium">Kelas Privat</strong> — 1 Instruktur 1 Murid</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-marine-900">
                <CheckCircle2 className="h-4 w-4 text-cyan-500 shrink-0" />
                <span><strong className="font-medium">Kelas Semi Privat</strong> — Maks 3 Murid</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-marine-900">
                <CheckCircle2 className="h-4 w-4 text-cyan-500 shrink-0" />
                <span><strong className="font-medium">Kelas Grup</strong> — Suasana Ceria Bersama</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-marine-900">
                <CheckCircle2 className="h-4 w-4 text-cyan-500 shrink-0" />
                <span><strong className="font-medium">Pelatih Berpengalaman</strong> — Instruktur Pria & Wanita</span>
              </div>
            </div>

            <div className="border-t border-marine-100 pt-6 mt-2">
              <blockquote className="border-l-4 border-cyan-500 pl-4 text-sm italic text-marine-600 leading-relaxed">
                Kami percaya bahwa menguasai keahlian berenang bukan cuma tentang kecepatan kayuhan, melainkan kecintaan beraktivitas di dalam air dalam kondisi aman, tenang, dan bahagia.
                <span className="block text-xs font-semibold text-marine-900 not-italic mt-2 font-baloo">— Miss Yenny, Founder MYCA Les Renang </span>
              </blockquote>
            </div>

          </div>

        </div>

        {/* Values Block in SEO  Center */}
        <div className="values-grid-trigger mt-20 pt-10 border-t border-marine-100">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h4 className="text-lg font-bold text-marine-900">Mengapa Memilih MYCA Les Renang?</h4>
            <p className="text-xs text-marine-600 mt-1">Kami menerapkan pilar pengajaran premium untuk hasil belajar terbaik</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coreValues.map((val, i) => (
              <div
                key={i}
                className="value-card p-6 rounded-2xl bg-gradient-to-b from-marine-50/70 to-marine-100/30 border border-marine-100 hover:shadow-md transition-shadow"
              >
                <div className="p-3 bg-white text-marine-800 rounded-xl w-fit shadow-sm mb-4">
                  {val.icon}
                </div>
                <h5 className="font-semibold text-lg text-marine-900 mb-2">
                  {val.title}
                </h5>
                <p className="text-sm text-marine-700 leading-relaxed font-light">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
