'use client';

import Footer from "./layout/footer";
import Header from "./layout/navbar";
import Hero from "./components/hero";
import About from "./components/about";
import Layanan from "./components/layanan";
import Testimonials from "./components/testimoni";
import { useState, useEffect } from "react";
import Contact from "./components/contact";

export default function Home() {

    const [activeSection, setActiveSection] = useState('home');

  // Track active section for high UX navbar highlight
  useEffect(() => {
    const sections = ['home', 'about', 'services', 'booking-form', 'testimonials', 'seo-faq-coverage', 'main-footer', 'contact'];
    
    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Map section IDs cleanly to corresponding nav items only
            if (entry.target.id === 'home') {
              setActiveSection('home');
            } else if (entry.target.id === 'about') {
              setActiveSection('about');
            } else if (entry.target.id === 'services') {
              setActiveSection('services');
            } else if (entry.target.id === 'contact') {
              setActiveSection('contact');
            }
          }
        });
      },
      {
        rootMargin: '-20% 0px -40% 0px', // Trigger cleanly near center of screen
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) countObserver.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) countObserver.unobserve(el);
      });
    };
  }, []);

  const handleNavigateToSection = (sectionId: string) => {
    setActiveSection(sectionId === 'services' ? 'services' : sectionId);
  };

  // const handleScrollToBooking = () => {
  //   const el = document.getElementById('booking-form');
  //   if (el) {
  //     const headerOffset = 80;
  //     const elementPosition = el.getBoundingClientRect().top;
  //     const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  //     window.scrollTo({
  //       top: offsetPosition,
  //       behavior: 'smooth'
  //     });
  //   }
  // };

  const handleScrollToServices = () => {
    const el = document.getElementById('services');
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
     <div className="relative min-h-screen bg-marine-50 selection:bg-cyan-200 selection:text-marine-950">
      
      {/* Premium Header Navbar sticky */}
      <Header onNavigate={handleNavigateToSection} activeSection={activeSection} />

      {/* Main Structural Content Layout */}
      <main className="relative">
        
        {/* HERO SECTION */}
        <Hero
          onExploreClick={handleScrollToServices}
        />

        {/* ABOUT SECTION */}
        <About />

        {/* LAYANAN CATALOG SECTION */}
        <Layanan />

        {/* CUSTOM ALUMNI TESTIMONIALS */}
        <Testimonials />

        <Contact />

      </main>

      {/* FOOTER BLOCK WITH LOCATION MAP DETAILS */}
      <Footer onNavigate={handleNavigateToSection} />

    </div>
  );
}
