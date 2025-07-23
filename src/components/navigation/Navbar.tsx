'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Products', href: '#products' },
  { name: 'Features', href: '#features' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Animate navbar on mount
    gsap.fromTo(
      '.navbar',
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    
    if (!isOpen) {
      // Animate mobile menu opening
      gsap.fromTo(
        '.mobile-menu',
        { x: '100%', opacity: 0 },
        { x: '0%', opacity: 1, duration: 0.5, ease: 'power3.out' }
      );
      gsap.fromTo(
        '.mobile-menu-item',
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.3, stagger: 0.1, delay: 0.2 }
      );
    } else {
      // Animate mobile menu closing
      gsap.to('.mobile-menu', {
        x: '100%',
        opacity: 0,
        duration: 0.3,
        ease: 'power3.in'
      });
    }
  };

  const handleNavClick = (href: string) => {
    setIsOpen(false);

    // Smooth scroll to section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGetStartedClick = () => {
    setIsOpen(false);
    router.push('/get-started');
  };

  return (
    <>
      <nav
        className={`navbar fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#home');
                }}
                className="flex items-center space-x-3 group"
              >
                <div className="relative w-24 h-24 transform group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src="/Learnwise Logo.png"
                    alt="Learnwise Technologies Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className="text-[var(--primary-navy)] hover:gradient-teal-text px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 relative group"
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 gradient-teal group-hover:w-full transition-all duration-300"></span>
                  </a>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <button
                onClick={handleGetStartedClick}
                className="gradient-teal text-white px-6 py-2 rounded-full font-medium hover-lift hover:shadow-lg transition-all duration-300 animate-pulse-glow"
              >
                Get Started
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-[var(--primary-navy)] hover:gradient-teal-text p-2 rounded-md transition-colors duration-300"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={toggleMenu}
          ></div>
          <div className="mobile-menu fixed top-0 right-0 w-64 h-full glass-dark shadow-xl">
            <div className="flex flex-col p-6 pt-20">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className="mobile-menu-item text-white hover:gradient-teal-text py-3 text-lg font-medium transition-all duration-300 border-b border-white/10 last:border-b-0"
                >
                  {item.name}
                </a>
              ))}
              <button
                onClick={handleGetStartedClick}
                className="mobile-menu-item gradient-teal text-white px-6 py-3 rounded-full font-medium mt-6 hover-lift transition-all duration-300"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
