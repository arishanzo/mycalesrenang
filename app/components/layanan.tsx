'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { LAYANAN_LIST } from '../libs/data';


export default function Layanan() {
 

  return (
    <section
      id="services"
      aria-label="Layanan Les Renang MYCA Les Renang"
      className="md:py-24 py-22 bg-marine-50 relative overflow-hidden"
    >
      <div className="absolute top-[5%] right-[-5%] w-[350px] h-[350px] bg-cyan-100/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[5%] left-[-5%] w-[300px] h-[300px] bg-marine-200/20 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center text-xs font-baloo font-bold tracking-widest text-cyan-600 uppercase bg-cyan-50 border border-cyan-200 px-4 py-1.5 rounded-full mb-4">
            Program Les Renang
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-marine-900 leading-tight mb-4">
            Pilih Program Renang yang Tepat untuk Kamu
          </h2>
          <p className="text-sm text-marine-600 font-light leading-relaxed">
            MYCA Les Renangmenyediakan 4 program les renang di  — dari privat intensif, semi privat berdua, kelas grup, hingga paket one course kilat. Semua didampingi instruktur bersertifikat dengan metode terstruktur dan aman.
          </p>
          <div className="h-1.5 w-24 bg-gradient-to-r from-marine-600 to-cyan-400 mx-auto mt-5 rounded-full" />
        </div>

        {/* Layanan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {LAYANAN_LIST.map((item) => (
            <article
              key={item.id}
              className={`relative bg-white rounded-3xl border-2 p-7 sm:p-8 transition-all duration-300 hover:shadow-lg ${item.accent} ${item.featured ? 'ring-2 ring-cyan-400 ring-offset-2' : ''}`}
            >
              {item.featured && (
                <span className="absolute -top-3.5 left-8 bg-gradient-to-r from-cyan-500 to-marine-600 text-white text-[10px] font-bold py-1 px-4 rounded-full uppercase tracking-widest shadow">
                  Paling Direkomendasikan
                </span>
              )}

              <div className="flex items-start gap-5 mb-5">
                <div className={`shrink-0 p-3 rounded-2xl ${item.iconBg} shadow-md`}>
                  {item.icon}
                </div>
                <div>
                  <span className={`inline-block text-[10px] font-baloo font-bold tracking-wider uppercase border px-2.5 py-1 rounded-md mb-1.5 ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                  <h3 className="font-display text-xl font-bold text-marine-900 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-cyan-600 font-semibold mt-0.5">{item.headline}</p>
                </div>
              </div>

              <p className="text-sm text-marine-600 font-light leading-relaxed mb-5">
                {item.description}
              </p>

              <button
                onClick={() => handleCTA(item.id)}
                className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-sm font-semibold bg-marine-900 hover:bg-cyan-500 text-white transition-all duration-300 group cursor-pointer"
              >
                Daftar Program Ini
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </article>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-xs text-marine-500 mt-12 max-w-xl mx-auto">
          Semua program tersedia di MYCA (Miss Yenny Center of Aquatic), . Instruktur bersertifikat ·  inklusif · Konsultasi gratis sebelum mendaftar.
        </p>

      </div>
    </section>
  );
}
