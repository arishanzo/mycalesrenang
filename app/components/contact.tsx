'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {CheckCircle2, Send} from 'lucide-react';
import { CONTACT_ITEMS, SOCIAL_LINKS } from '../libs/data';

gsap.registerPlugin(ScrollTrigger);



const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from(leftRef.current, {
        opacity: 0,
        x: -40,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: leftRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from(rightRef.current, {
        opacity: 0,
        x: 40,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: rightRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from('.contact-info-item', {
        opacity: 0,
        y: 20,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: leftRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get('name');
    const phone = data.get('phone');
    const message = data.get('message');
    const text = `Halo MYCA Les Renang! Saya *${name}* (${phone}) ingin bertanya: ${message}`;
    window.open(`https://wa.me/089675211854?text=${encodeURIComponent(String(text))}`, '_blank');
    form.reset();
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-white to-marine-50 relative overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-100/40 rounded-full blur-3xl -z-0 -translate-x-1/2 -translate-y-1/4" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-marine-100/50 rounded-full blur-3xl -z-0 translate-x-1/3 translate-y-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Heading */}
        <div ref={headingRef} className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center text-xs font-[Baloo_2] font-bold tracking-widest text-cyan-600 uppercase bg-cyan-100/60 border border-cyan-200 px-4 py-1.5 rounded-full mb-3">
            HUBUNGI KAMI
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-marine-900 tracking-tight">
            Mulai Perjalanan Renang Anda Bersama MYCA Les Renang
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-marine-600 to-cyan-400 mx-auto mt-4 rounded-full" />
          <p className="text-marine-600 text-sm mt-5 leading-relaxed">
            Konsultasikan kebutuhan belajar renang Anda — kami siap membantu memilihkan program terbaik untuk Anda atau buah hati.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">

          {/* Left — Contact Info */}
          <div ref={leftRef} className="flex flex-col gap-6">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CONTACT_ITEMS.map((item, i) => (
                <div
                  key={i}
                  className="contact-info-item premium-card-glass rounded-2xl p-5 flex items-start gap-4 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className={`${item.bg} p-3 rounded-xl shrink-0 shadow-md`}>
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-marine-400 font-[Baloo_2] font-semibold tracking-wider uppercase mb-0.5">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-bold text-marine-900 hover:text-cyan-600 transition-colors truncate block"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-bold text-marine-900">{item.value}</p>
                    )}
                    <p className="text-xs text-marine-500 mt-0.5 font-light">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Media */}
            <div className="premium-card-glass rounded-2xl p-6">
              <p className="text-xs font-[Baloo_2] font-bold text-marine-400 uppercase tracking-wider mb-4">
                Ikuti Kami di Media Sosial
              </p>
              <div className="flex flex-col mx-auto">
              <div className="flex flex-wrap gap-3 justify-start">
                {SOCIAL_LINKS.map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className={`flex items-center gap-2 text-sm font-medium text-marine-700 border border-marine-200 px-4 py-2 rounded-xl transition-all duration-200 hover:text-white ${s.color}`}
                  >
                    {s.icon}
                    <span>{s.label}</span>
                  </a>
                ))}
                </div>
              </div>
            </div>

            {/* Quick Assurance */}
            <div className="premium-dark-card rounded-2xl p-6 text-white">
              <p className="text-xs font-[Baloo_2] text-cyan-400 tracking-widest uppercase font-semibold mb-4">
                Kenapa Pilih MYCA Les Renang?
              </p>
              {[
                'Konsultasi pertama gratis, tanpa komitmen',
                'Respons WhatsApp dalam 30 menit',
                'Pendaftaran mudah, tanpa biaya admin',
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3 mt-3">
                  <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" />
                  <p className="text-sm text-marine-100 font-light">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Contact Form */}
          <div ref={rightRef}>
            <form
              onSubmit={handleSubmit}
              className="premium-card-glass rounded-3xl p-8 shadow-xl flex flex-col gap-5"
            >
              <div>
                <h3 className="text-xl font-bold text-marine-900">Kirim Pesan</h3>
                <p className="text-sm text-marine-500 mt-1 font-light">
                  Isi form di bawah, pesan Anda akan langsung diteruskan via WhatsApp.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-xs font-semibold text-marine-700 tracking-wide">
                      Nama Lengkap <span className="text-cyan-500">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Misal: Bunda Rani"
                      className="w-full px-4 py-3 rounded-xl border border-marine-200 bg-white/80 text-sm text-marine-900 placeholder:text-marine-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="text-xs font-semibold text-marine-700 tracking-wide">
                      No. WhatsApp <span className="text-cyan-500">*</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="08xxxxxxxxxx"
                      className="w-full px-4 py-3 rounded-xl border border-marine-200 bg-white/80 text-sm text-marine-900 placeholder:text-marine-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="program" className="text-xs font-semibold text-marine-700 tracking-wide">
                    Program yang Diminati
                  </label>
                  <select
                    id="program"
                    name="program"
                    className="w-full px-4 py-3 rounded-xl border border-marine-200 bg-white/80 text-sm text-marine-900 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition appearance-none"
                  >
                    <option value="">-- Pilih program --</option>
                    <option value="privat">Les Privat (1-on-1)</option>
                    <option value="semiprivat">Les Semi Privat (1-on-2)</option>
                    <option value="grup">Les Grup (3–4 murid)</option>
                    <option value="onecourse">One Course — Intensif Kilat</option>
                    <option value="lainnya">Belum tahu / Konsultasi dulu</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-xs font-semibold text-marine-700 tracking-wide">
                    Pesan / Pertanyaan <span className="text-cyan-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Ceritakan kebutuhan belajar renang Anda — usia, tujuan, atau kendala yang dihadapi..."
                    className="w-full px-4 py-3 rounded-xl border border-marine-200 bg-white/80 text-sm text-marine-900 placeholder:text-marine-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-marine-700 to-cyan-600 hover:from-marine-800 hover:to-cyan-700 text-white font-semibold text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-marine-200 transition-all duration-200 active:scale-[0.98]"
              >
                <Send className="h-4 w-4" />
                Kirim via WhatsApp
              </button>

              <p className="text-center text-xs text-marine-400 font-light">
                Dengan mengirim form ini Anda setuju dihubungi oleh tim MYCA Les Renang melalui WhatsApp.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
