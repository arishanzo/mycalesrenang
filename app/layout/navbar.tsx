import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Waves, Menu, X, Phone, CalendarRange } from 'lucide-react';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export default function Header({ onNavigate, activeSection }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Monitor scroll height
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a clean entry animation
      const tl = gsap.timeline();
      tl.from(logoRef.current, {
        opacity: 0,
        x: -40,
        duration: 0.8,
        ease: 'power3.out',
      });
      
      tl.from(menuItemsRef.current, {
        opacity: 0,
        y: -15,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
      }, '-=0.5');

      tl.from(ctaRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.5,
        ease: 'back.out(1.7)',
      }, '-=0.3');
    }, headerRef);

    return () => ctx.revert();
  }, []);

  const handleLinkClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setIsMenuOpen(false);

    // id berupa '/home' atau '/#about', '/#services', '/#contact'
    if (id === '/home') {
      router.push('/');
      return;
    }

    // Ambil hash dari id, misal '/#about' → 'about'
    const hash = id.replace('/#', '');

    if (pathname !== '/') {
      // Navigasi ke home dulu, lalu scroll ke section setelah halaman load
      router.push(`/#${hash}`);
      return;
    }

    // Sudah di home, scroll langsung
    onNavigate(hash);
    const element = document.getElementById(hash);
    if (element) {
      const headerOffset = 80;
      const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const menuLinks = [
    { name: 'Home', id: '/home' },
    { name: 'About', id: '/#about' },
    { name: 'Layanan', id: '/#services' },
    { name: 'Contact', id: '/#contact' },
  ];

  const isActive = (id: string) => {
    if (pathname !== '/') return false; // di luar home, tidak ada yang aktif
    if (id === '/home') return !activeSection || activeSection === 'home';
    return activeSection === id.replace('/#', '');
  };

  return (
    <header
      id="main-navigation"
      ref={headerRef}
      className={`fixed top-0 left-0 w-full z-50 h-20 flex items-center transition-all duration-300 ${
        isScrolled
          ? 'premium-blur-glass shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between">
          
          {/* Logo Brand */}
          <div
            id="header-logo"
            ref={logoRef}
            className="flex items-center gap-2 cursor-pointer group text-left"
            onClick={(e) => handleLinkClick('home', e)}
          >
                   <Image
                              alt={'logo'}
                              width={60}
                              height={60}
                              src={'/images/logo.png'}
                             />
         
            <div className="flex flex-col text-left">
              <span className="font-display font-bold tracking-wider text-xl sm:text-2xl text-marine-900 leading-none">
                MYCA
              </span>
              <span className="text-[9px] font-[Baloo_2] tracking-widest text-marine-600 mt-0.5 uppercase font-bold">
                Les Renang
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav
            id="desktop-nav"
            ref={menuItemsRef}
            className="hidden lg:flex items-center gap-8"
          >
            {menuLinks.map((link) => (
              <a
                id={`nav-link-${link.id}`}
                key={link.id}
                href={`${link.id}`}
                onClick={(e) => handleLinkClick(link.id, e)}
                className={`text-sm font-medium transition-all duration-300 relative py-1 nav-item hover:text-cyan-500 ${
                  isActive(link.id)
                    ? 'text-marine-600 font-bold'
                    : 'text-marine-800'
                }`}
              >
                {link.name}
                {isActive(link.id) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-500 rounded-full" />
                )}
              </a>
            ))}
          </nav>

          {/* Action CTA Top Right */}
          <div
            id="header-actions"
            ref={ctaRef}
            className="hidden lg:flex items-center gap-4"
          >
            <a
              id="cta-whatsapp-nav"
              href="https://wa.me/089675211854?text=Halo%20MYCA Les Renang%20,%20saya%20ingin%20tanya%20mengenai%20les%20renang."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold text-marine-800 hover:text-cyan-600 transition-colors border border-marine-200 px-3 py-1.5 rounded-full"
            >
              <Phone className="h-3.5 w-3.5" />
              Hubungi WhatsApp 
            </a>
            <a
              id="cta-booking-nav"
              href={'/pendaftaran'}
              className="flex items-center gap-2 text-xs font-semibold px-5 py-2.5 text-white bg-marine-800 hover:bg-cyan-500 rounded-full shadow-md group hover:shadow-cyan-200/40 transition-all duration-300"
            >
              <CalendarRange className="h-3.5 w-3.5 group-hover:rotate-12 transition-transform" />
              Daftar Les Online
            </a>
          </div>

          {/* Mobile Menu Actions */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              id="mobile-nav-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg bg-marine-100 text-marine-900 border border-marine-200 hover:bg-marine-200 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        id="mobile-drawer"
        className={`fixed top-20 left-0 w-full bg-white border-b border-marine-100 shadow-xl transition-all duration-300 lg:hidden z-40 ${
          isMenuOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="px-4 pt-4 pb-6 space-y-3">
          {menuLinks.map((link) => (
            <a
              id={`nav-link-mobile-${link.id}`}
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleLinkClick(link.id, e)}
              className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                isActive(link.id)
                  ? 'bg-marine-100 text-marine-900 border-l-4 border-cyan-500'
                  : 'text-marine-800 hover:bg-marine-50'
              }`}
            >
              {link.name}
            </a>
          ))}
          <div className="pt-3 border-t border-marine-100 flex flex-col sm:flex-row gap-3">
            <a
              id="cta-whatsapp-nav-mobile"
              href="https://wa.me/089675211854?text=Halo%20MYCA Les Renang%20,%20saya%20ingin%20tanya%20mengenai%20les%20renang."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-marine-200 text-sm font-semibold text-marine-800 hover:bg-marine-50 transition-colors"
            >
              <Phone className="h-4 w-4" />
              Hubungi WhatsApp
            </a>
            <a
              id="cta-booking-nav"
              href={'/pendaftaran'}
              className="flex items-center gap-2 text-xs font-semibold px-5 py-2.5 text-white bg-marine-800 hover:bg-cyan-500 rounded-full shadow-md group hover:shadow-cyan-200/40 transition-all duration-300"
            >
              <CalendarRange className="h-3.5 w-3.5 group-hover:rotate-12 transition-transform" />
              Daftar Les Online
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
