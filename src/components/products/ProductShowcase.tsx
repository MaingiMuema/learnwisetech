'use client';

import { useEffect, useRef } from 'react';
import { ExternalLink, Star, Clock, Users, BookOpen, Calendar, Shield, Library } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Product {
  id: number;
  name: string;
  description: string;
  longDescription: string;
  features: string[];
  benefits: string[];
  url: string;
  price?: string;
  status: 'live' | 'coming-soon';
  icon: React.ReactNode;
  stats: { label: string; value: string }[];
  color: string;
  gradient: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Shule Network',
    description: 'Comprehensive educational network platform',
    longDescription: 'A unified ecosystem that connects schools, teachers, students, and parents in one comprehensive platform, streamlining communication and educational management.',
    features: ['School Management Dashboard', 'Teacher Portal & Resources', 'Student Learning Hub', 'Parent Communication Center', 'Real-time Analytics'],
    benefits: ['Improved Communication', 'Streamlined Operations', 'Enhanced Learning', 'Better Parent Engagement'],
    url: 'https://shulenetwork.co.ke',
    status: 'live',
    icon: <Users className="w-8 h-8" />,
    stats: [
      { label: 'Schools Connected', value: '500+' },
      { label: 'Active Users', value: '50K+' },
      { label: 'Success Rate', value: '98%' }
    ],
    color: 'blue',
    gradient: 'from-blue-500 to-blue-700'
  },
  {
    id: 2,
    name: 'Examyetu',
    description: 'AI-powered exam preparation platform',
    longDescription: 'Revolutionary platform offering national exam past papers with AI-powered grading and detailed explanations to enhance student learning and exam preparation.',
    features: ['Extensive Past Papers Library', 'AI-Powered Auto Grading', 'Detailed Answer Explanations', 'Progress Tracking & Analytics', 'Performance Insights'],
    benefits: ['Better Exam Preparation', 'Instant Feedback', 'Personalized Learning', 'Cost-Effective Solution'],
    url: 'https://examyetu.com',
    price: 'KSH 20 per paper',
    status: 'live',
    icon: <BookOpen className="w-8 h-8" />,
    stats: [
      { label: 'Past Papers', value: '10K+' },
      { label: 'Students Served', value: '25K+' },
      { label: 'Success Rate', value: '95%' }
    ],
    color: 'green',
    gradient: 'from-green-500 to-green-700'
  },
  {
    id: 3,
    name: 'Timetable Generator',
    description: 'Automated school scheduling system',
    longDescription: 'Intelligent timetable generation system that automatically creates optimized schedules while resolving conflicts and maximizing resource utilization.',
    features: ['Automated Schedule Generation', 'Conflict Resolution Engine', 'Resource Optimization', 'Easy Manual Adjustments', 'Multi-format Export'],
    benefits: ['Time Saving', 'Conflict-Free Schedules', 'Optimal Resource Use', 'Easy Management'],
    url: 'https://tg.shulenetwork.co.ke',
    status: 'live',
    icon: <Calendar className="w-8 h-8" />,
    stats: [
      { label: 'Schools Using', value: '200+' },
      { label: 'Schedules Generated', value: '5K+' },
      { label: 'Time Saved', value: '80%' }
    ],
    color: 'purple',
    gradient: 'from-purple-500 to-purple-700'
  },
  {
    id: 4,
    name: 'Access Control System',
    description: 'Smart attendance & security solution',
    longDescription: 'Advanced automated attendance tracking and access control system providing real-time monitoring for both staff and students with comprehensive security features.',
    features: ['Automated Attendance Tracking', 'Real-time Monitoring Dashboard', 'Staff & Student Management', 'Security Access Control', 'Detailed Reporting'],
    benefits: ['Enhanced Security', 'Accurate Attendance', 'Real-time Insights', 'Reduced Manual Work'],
    url: '#',
    status: 'live',
    icon: <Shield className="w-8 h-8" />,
    stats: [
      { label: 'Institutions', value: '150+' },
      { label: 'Daily Check-ins', value: '100K+' },
      { label: 'Accuracy Rate', value: '99.9%' }
    ],
    color: 'orange',
    gradient: 'from-orange-500 to-orange-700'
  },
  {
    id: 5,
    name: 'Library Management System',
    description: 'Complete digital library solution',
    longDescription: 'Comprehensive library management system with digital cataloging, automated borrowing processes, and advanced inventory tracking capabilities.',
    features: ['Digital Catalog Management', 'Automated Borrowing System', 'Inventory Tracking', 'User Management Portal', 'Analytics & Reports'],
    benefits: ['Streamlined Operations', 'Digital Transformation', 'Better User Experience', 'Efficient Management'],
    url: '#',
    status: 'coming-soon',
    icon: <Library className="w-8 h-8" />,
    stats: [
      { label: 'Launch Date', value: 'Q2 2024' },
      { label: 'Pre-orders', value: '50+' },
      { label: 'Interest Level', value: 'High' }
    ],
    color: 'teal',
    gradient: 'from-teal-500 to-teal-700'
  }
];

export default function ProductShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cards = gsap.utils.toArray('.product-card') as Element[];

    cards.forEach((card, index) => {
      gsap.fromTo(card,
        {
          y: 100,
          opacity: 0,
          rotationX: 15,
          scale: 0.9
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          },
          delay: index * 0.2
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="products" ref={sectionRef} className="py-20 bg-[var(--soft-gray)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--primary-navy)] mb-6">
            Our <span className="gradient-teal-text">Products</span>
          </h2>
          <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
            Discover our comprehensive suite of educational technology solutions designed to transform learning experiences
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="product-card group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover-lift"
              style={{ perspective: '1000px' }}
            >
              {/* Status Badge */}
              {product.status === 'coming-soon' && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Coming Soon
                  </span>
                </div>
              )}

              <div className="p-8">
                {/* Product Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className={`p-3 rounded-2xl bg-gradient-to-br ${product.gradient} text-white group-hover:scale-110 transition-transform duration-300`}>
                    {product.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[var(--primary-navy)] mb-2">
                      {product.name}
                    </h3>
                    <p className="text-[var(--text-secondary)]">
                      {product.description}
                    </p>
                  </div>
                </div>

                {/* Long Description */}
                <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                  {product.longDescription}
                </p>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="font-semibold text-[var(--primary-navy)] mb-3">Key Features:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.features.slice(0, 4).map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-[var(--teal-start)]" fill="currentColor" />
                        <span className="text-sm text-[var(--text-secondary)]">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-[var(--soft-gray)] rounded-2xl">
                  {product.stats.map((stat, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-lg font-bold gradient-teal-text">{stat.value}</div>
                      <div className="text-xs text-[var(--text-secondary)]">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between">
                  <div>
                    {product.price && (
                      <div className="text-lg font-bold gradient-teal-text mb-1">
                        {product.price}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      if (product.url !== '#' && product.status === 'live') {
                        window.open(product.url, '_blank');
                      }
                    }}
                    disabled={product.status === 'coming-soon'}
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                      product.status === 'coming-soon'
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : `bg-gradient-to-r ${product.gradient} text-white hover:shadow-lg hover:scale-105`
                    }`}
                  >
                    {product.status === 'coming-soon' ? 'Coming Soon' : 'Learn More'}
                    {product.status !== 'coming-soon' && <ExternalLink className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
