'use client';

import { useEffect, useRef } from 'react';
import {
  Zap,
  Shield,
  Users,
  BarChart3,
  Clock,
  Smartphone,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { animate, stagger } from 'animejs';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRouter } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger);

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  benefits: string[];
}

interface Benefit {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const features: Feature[] = [
  {
    id: 1,
    title: 'Lightning Fast Performance',
    description: 'Our solutions are optimized for speed and efficiency, ensuring smooth user experiences across all devices.',
    icon: <Zap className="w-8 h-8" />,
    color: 'from-yellow-400 to-orange-500',
    benefits: ['Sub-second load times', 'Optimized databases', 'CDN integration', 'Caching strategies']
  },
  {
    id: 2,
    title: 'Enterprise Security',
    description: 'Bank-level security protocols protect your data with advanced encryption and secure authentication.',
    icon: <Shield className="w-8 h-8" />,
    color: 'from-green-400 to-blue-500',
    benefits: ['256-bit encryption', 'Multi-factor auth', 'Regular security audits', 'GDPR compliant']
  },
  {
    id: 3,
    title: 'Collaborative Platform',
    description: 'Built for teamwork with real-time collaboration tools that connect educators, students, and parents.',
    icon: <Users className="w-8 h-8" />,
    color: 'from-purple-400 to-pink-500',
    benefits: ['Real-time messaging', 'Group workspaces', 'File sharing', 'Video conferencing']
  },
  {
    id: 4,
    title: 'Advanced Analytics',
    description: 'Comprehensive insights and reporting tools help you make data-driven decisions for better outcomes.',
    icon: <BarChart3 className="w-8 h-8" />,
    color: 'from-blue-400 to-indigo-500',
    benefits: ['Custom dashboards', 'Real-time metrics', 'Predictive analytics', 'Export capabilities']
  },
  {
    id: 5,
    title: '24/7 Availability',
    description: 'Our cloud infrastructure ensures your educational tools are always accessible when you need them.',
    icon: <Clock className="w-8 h-8" />,
    color: 'from-teal-400 to-cyan-500',
    benefits: ['99.9% uptime', 'Global servers', 'Auto-scaling', 'Disaster recovery']
  },
  {
    id: 6,
    title: 'Mobile Optimized',
    description: 'Fully responsive design ensures perfect functionality across all devices and screen sizes.',
    icon: <Smartphone className="w-8 h-8" />,
    color: 'from-red-400 to-pink-500',
    benefits: ['Native mobile apps', 'Responsive design', 'Offline capabilities', 'Push notifications']
  }
];

const benefits: Benefit[] = [
  {
    id: 1,
    title: 'Improved Learning Outcomes',
    description: 'Students achieve better results with our engaging and interactive learning tools.',
    icon: <CheckCircle className="w-6 h-6" />
  },
  {
    id: 2,
    title: 'Streamlined Operations',
    description: 'Reduce administrative burden and focus more on what matters - education.',
    icon: <CheckCircle className="w-6 h-6" />
  },
  {
    id: 3,
    title: 'Cost-Effective Solutions',
    description: 'Get maximum value with our affordable pricing and comprehensive feature sets.',
    icon: <CheckCircle className="w-6 h-6" />
  },
  {
    id: 4,
    title: 'Expert Support',
    description: '24/7 technical support and training to ensure you get the most from our platforms.',
    icon: <CheckCircle className="w-6 h-6" />
  }
];

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    // GSAP animations for section entrance
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.fromTo('.features-header',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );

    // Anime.js animations for feature cards
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Animate feature cards with staggered entrance
          animate('.feature-card', {
            translateY: [50, 0],
            opacity: [0, 1],
            scale: [0.9, 1],
            duration: 800,
            delay: stagger(150),
            easing: 'easeOutCubic'
          });

          // Animate feature icons
          animate('.feature-icon', {
            rotate: [0, 360],
            scale: [0.8, 1],
            duration: 1000,
            delay: stagger(200, {start: 300}),
            easing: 'easeOutElastic(1, .8)'
          });

          // Animate benefit items
          animate('.benefit-item', {
            translateX: [-30, 0],
            opacity: [0, 1],
            duration: 600,
            delay: stagger(100, {start: 800}),
            easing: 'easeOutCubic'
          });

          observer.disconnect();
        }
      });
    }, { threshold: 0.1 });

    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }

    return () => {
      observer.disconnect();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleFeatureHover = (index: number) => {
    animate(`.feature-card-${index}`, {
      scale: 1.05,
      duration: 300,
      easing: 'easeOutCubic'
    });

    animate(`.feature-icon-${index}`, {
      rotate: '1turn',
      duration: 600,
      easing: 'easeOutCubic'
    });
  };

  const handleFeatureLeave = (index: number) => {
    animate(`.feature-card-${index}`, {
      scale: 1,
      duration: 300,
      easing: 'easeOutCubic'
    });
  };

  return (
    <section id="features" ref={sectionRef} className="py-20 bg-[var(--soft-gray)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="features-header text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--primary-navy)] mb-6">
            Why Choose <span className="gradient-teal-text">Learnwise</span>
          </h2>
          <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
            Discover the powerful features and benefits that make our educational technology solutions the preferred choice for institutions worldwide.
          </p>
        </div>

        <div ref={featuresRef}>
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className={`feature-card feature-card-${index} bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer`}
                onMouseEnter={() => handleFeatureHover(index)}
                onMouseLeave={() => handleFeatureLeave(index)}
              >
                <div className={`feature-icon feature-icon-${index} inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} text-white mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-[var(--primary-navy)] mb-4">
                  {feature.title}
                </h3>
                <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                      <CheckCircle className="w-4 h-4 text-[var(--teal-start)]" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Benefits Section */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-[var(--primary-navy)] mb-4">
                Transform Your <span className="gradient-teal-text">Educational Experience</span>
              </h3>
              <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
                Join thousands of institutions that have already transformed their educational processes with our innovative solutions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {benefits.map((benefit) => (
                <div
                  key={benefit.id}
                  className="benefit-item flex items-start gap-4 p-6 rounded-2xl bg-[var(--soft-gray)] hover:bg-white hover:shadow-md transition-all duration-300"
                >
                  <div className="flex-shrink-0 p-2 gradient-teal rounded-lg text-white">
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-[var(--primary-navy)] mb-2">
                      {benefit.title}
                    </h4>
                    <p className="text-[var(--text-secondary)]">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center">
              <button
                onClick={() => router.push('/get-started')}
                className="inline-flex items-center gap-3 gradient-teal text-white px-8 py-4 rounded-full font-semibold text-lg hover-lift hover:shadow-xl transition-all duration-300 animate-pulse-glow"
              >
                Get Started Today
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
