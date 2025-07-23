'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Star } from 'lucide-react';
import { gsap } from 'gsap';
import Image from 'next/image';
import ThreeBackground from '../three/ThreeBackground';

interface Product {
  id: number;
  name: string;
  description: string;
  features: string[];
  url: string;
  price?: string;
  status: 'live' | 'coming-soon';
  color: string;
  image?: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Shule Network',
    description: 'Comprehensive educational network platform connecting schools, teachers, and students in a unified learning ecosystem.',
    features: ['School Management', 'Teacher Portal', 'Student Dashboard', 'Parent Communication'],
    url: 'https://shulenetwork.co.ke',
    status: 'live',
    color: 'from-blue-500 to-blue-700',
    image: '/shulenetwork.png'
  },
  {
    id: 2,
    name: 'Examyetu',
    description: 'National exams past papers platform with AI-powered grading and detailed explanations for enhanced learning.',
    features: ['Past Papers Library', 'AI Grading', 'Detailed Explanations', 'Progress Tracking'],
    url: 'https://examyetu.com',
    price: 'KSH 20 per paper',
    status: 'live',
    color: 'from-green-500 to-green-700'
  },
  {
    id: 3,
    name: 'Timetable Generator',
    description: 'Automated school timetable system that optimizes schedules for maximum efficiency and minimal conflicts.',
    features: ['Auto Generation', 'Conflict Resolution', 'Resource Optimization', 'Easy Editing'],
    url: 'https://tg.shulenetwork.co.ke',
    status: 'live',
    color: 'from-purple-500 to-purple-700'
  },
  {
    id: 4,
    name: 'Access Control System',
    description: 'Advanced automated attendance tracking system for both staff and students with real-time monitoring.',
    features: ['Automated Attendance', 'Real-time Monitoring', 'Staff Tracking', 'Student Management'],
    url: '#',
    status: 'live',
    color: 'from-orange-500 to-orange-700',
    image: '/terminal-control.png'
  },
  {
    id: 5,
    name: 'Library Management System',
    description: 'Complete library management solution with digital cataloging, borrowing system, and inventory tracking.',
    features: ['Digital Catalog', 'Borrowing System', 'Inventory Tracking', 'User Management'],
    url: '#',
    status: 'coming-soon',
    color: 'from-teal-500 to-teal-700',
    image: '/library-management.jpeg'
  }
];

export default function HeroSection() {
  const [currentProduct, setCurrentProduct] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    // Animate hero content on mount
    gsap.timeline()
      .fromTo('.hero-title', 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }
      )
      .fromTo('.hero-subtitle',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        '-=0.8'
      )
      .fromTo('.product-carousel',
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: 'power3.out' },
        '-=0.6'
      );
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentProduct((prev) => (prev + 1) % products.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextProduct = () => {
    setCurrentProduct((prev) => (prev + 1) % products.length);
    setIsAutoPlaying(false);
  };

  const prevProduct = () => {
    setCurrentProduct((prev) => (prev - 1 + products.length) % products.length);
    setIsAutoPlaying(false);
  };

  const goToProduct = (index: number) => {
    setCurrentProduct(index);
    setIsAutoPlaying(false);
  };

  const currentProductData = products[currentProduct];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ThreeBackground />
      
      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="hero-title text-5xl md:text-7xl font-bold text-[var(--primary-navy)] mb-6">
            <span className="gradient-teal-text">Learnwise</span> Technologies
          </h1>
          <p className="hero-subtitle text-xl md:text-2xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
            Transforming education through innovative technology solutions that empower schools, teachers, and students
          </p>
        </div>

        {/* Product Carousel */}
        <div className="product-carousel relative max-w-4xl mx-auto">
          <div className="glass rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Product Info */}
              <div className="flex-1 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                  <h3 className="text-3xl md:text-4xl font-bold text-[var(--primary-navy)]">
                    {currentProductData.name}
                  </h3>
                  {currentProductData.status === 'coming-soon' && (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full">
                      Coming Soon
                    </span>
                  )}
                </div>
                
                <p className="text-lg text-[var(--text-secondary)] mb-6 leading-relaxed">
                  {currentProductData.description}
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {currentProductData.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-[var(--teal-start)]" fill="currentColor" />
                      <span className="text-sm text-[var(--text-secondary)]">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Price */}
                {currentProductData.price && (
                  <div className="mb-6">
                    <span className="text-2xl font-bold gradient-teal-text">
                      {currentProductData.price}
                    </span>
                  </div>
                )}

                {/* CTA Button */}
                <button
                  onClick={() => {
                    if (currentProductData.url !== '#') {
                      window.open(currentProductData.url, '_blank');
                    }
                  }}
                  disabled={currentProductData.status === 'coming-soon'}
                  className={`inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 ${
                    currentProductData.status === 'coming-soon'
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'gradient-teal text-white hover-lift hover:shadow-xl'
                  }`}
                >
                  {currentProductData.status === 'coming-soon' ? 'Coming Soon' : 'Explore Now'}
                  {currentProductData.status !== 'coming-soon' && <ExternalLink className="w-5 h-5" />}
                </button>
              </div>

              {/* Product Visual */}
              <div className="flex-1 max-w-md">
                <div className="relative w-full h-64 rounded-2xl shadow-lg animate-float overflow-hidden">
                  {currentProductData.image ? (
                    <Image
                      src={currentProductData.image}
                      alt={currentProductData.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${currentProductData.color} flex items-center justify-center`}>
                      <div className="text-white text-center">
                        <div className="text-6xl font-bold mb-2">
                          {currentProductData.name.charAt(0)}
                        </div>
                        <div className="text-lg font-medium">
                          {currentProductData.name}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center mt-8 gap-4">
            <button
              onClick={prevProduct}
              className="p-3 glass rounded-full hover-lift transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6 text-[var(--primary-navy)]" />
            </button>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {products.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToProduct(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentProduct
                      ? 'gradient-teal scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextProduct}
              className="p-3 glass rounded-full hover-lift transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6 text-[var(--primary-navy)]" />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-[var(--teal-start)] rounded-full flex justify-center">
          <div className="w-1 h-3 gradient-teal rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
