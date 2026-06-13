import React from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutubeSquare } from 'react-icons/fa';
import { FaTiktok } from 'react-icons/fa6';
import Image from 'next/image';


interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  
  const handleScrollTo = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(id);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 85;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="main-footer"
      className="bg-marine-950 text-marine-100 border-t border-marine-900 pt-20 pb-8 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Core Locations  details block for Local SEO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-marine-900">
          
          {/* Brand Info Left */}
          <div className="lg:col-span-4 flex flex-col items-start gap-4">
            <div className="flex items-center gap-2">
             
                <Image
                 alt={'logo'}
                 width={80}
                 height={80}
                 src={'/images/logo.png'}
                />
              <div className="flex flex-col">
                <span className="font-display font-bold tracking-wider text-2xl text-white">
                  MYCA
                </span>
                <span className="text-[10px] font-[Baloo_2] tracking-widest text-cyan-400 -mt-1 uppercase font-bold">
                 MYCA Les Renang
                </span>
              </div>
            </div>

            <p className="text-xs text-marine-300 font-light leading-relaxed mt-2 text-left">
            MYCA Les Renang adalah les renang premium yang menyediakan les privat, semi privat, dan grup. Kami mengedukasi dengan kurikulum standardisasi tinggi, ceria, bersertifikat, serta peduli keamanan di air.
            </p>

            <p className="text-sm font-display italic font-semibold text-cyan-400 mt-2">
              Berenang itu seru!
            </p>

            {/* Social channels */}
            <div className="flex items-center gap-3 mt-4">
                  <a
                href="https://wa.me/089675211854"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-marine-900 hover:bg-cyan-500 hover:text-white transition-all shadow"
                aria-label="Youtube Channel MYCA"
              >
                <FaWhatsapp className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-marine-900 hover:bg-cyan-500 hover:text-white transition-all shadow"
                aria-label="Instagram Resmi MYCA"
              >
                <FaInstagram className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-marine-900 hover:bg-cyan-500 hover:text-white transition-all shadow"
                aria-label="Facebook Resmi MYCA"
              >
                <FaFacebook className="h-4 w-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-marine-900 hover:bg-cyan-500 hover:text-white transition-all shadow"
                aria-label="Youtube Channel MYCA"
              >
                <FaTiktok className="h-4 w-4" />
              </a>
            </div>

          </div>

          {/* Quick Links Nav */}
          <div className="lg:col-span-3 lg:col-start-6 flex flex-col items-start gap-4">
            <h3 className="font-semibold text-sm tracking-wider uppercase text-white border-b border-cyan-500 pb-2">
              Navigasi Halaman
            </h3>
            <ul className="space-y-2.5 text-xs text-left">
              {[
                { name: 'Home Utama', id: 'home' },
                { name: 'Tentang MYCA', id: 'about' },
                { name: 'Katalog Layanan', id: 'services' },
                { name: 'Formulir Registrasi', id: 'booking-form' },
                { name: 'Testimonials Swimmer', id: 'testimonials' },
              ].map((link, i) => (
                <li key={i}>
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => handleScrollTo(link.id, e)}
                    className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                  >
                    <span>•</span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

    

        </div>

        {/* Closing copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-marine-400 text-center sm:text-left">
          
          <div>
            <p>© {currentYear} MYCA Les Renang . Hak Cipta Dilindungi Undang-Undang.</p>
          </div>

          <div className="flex gap-4">
            <a href="#about" onClick={(e) => handleScrollTo('about', e)} className="hover:text-cyan-400 transition-colors">Privat</a>
            <a href="#services" onClick={(e) => handleScrollTo('services', e)} className="hover:text-cyan-400 transition-colors">Semi Privat</a>
            <a href="#services" onClick={(e) => handleScrollTo('services', e)} className="hover:text-cyan-400 transition-colors">Grup</a>
          </div>

        </div>

      </div>
    </footer>
  );
}
