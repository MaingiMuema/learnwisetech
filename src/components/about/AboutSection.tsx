'use client';

import { useEffect, useRef, useState } from 'react';
import { Target, Eye, Award, Users, Lightbulb, Heart } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Stat {
  id: number;
  label: string;
  value: number;
  suffix: string;
  icon: React.ReactNode;
  color: string;
}

interface Value {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const stats: Stat[] = [
  {
    id: 1,
    label: 'Schools Served',
    value: 500,
    suffix: '+',
    icon: <Users className="w-8 h-8" />,
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 2,
    label: 'Students Impacted',
    value: 75000,
    suffix: '+',
    icon: <Award className="w-8 h-8" />,
    color: 'from-green-500 to-green-600'
  },
  {
    id: 3,
    label: 'Years of Excellence',
    value: 5,
    suffix: '+',
    icon: <Target className="w-8 h-8" />,
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 4,
    label: 'Success Rate',
    value: 98,
    suffix: '%',
    icon: <Lightbulb className="w-8 h-8" />,
    color: 'from-orange-500 to-orange-600'
  }
];

const values: Value[] = [
  {
    id: 1,
    title: 'Innovation',
    description: 'We continuously push the boundaries of educational technology to create cutting-edge solutions.',
    icon: <Lightbulb className="w-6 h-6" />
  },
  {
    id: 2,
    title: 'Excellence',
    description: 'We strive for excellence in every product we develop and every service we provide.',
    icon: <Award className="w-6 h-6" />
  },
  {
    id: 3,
    title: 'Impact',
    description: 'We measure our success by the positive impact we create in educational communities.',
    icon: <Heart className="w-6 h-6" />
  }
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [animatedStats, setAnimatedStats] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    // Animate section elements
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.fromTo('.about-header',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    )
    .fromTo('.mission-vision',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.5'
    )
    .fromTo('.stat-card',
      { y: 50, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
      '-=0.3'
    )
    .fromTo('.value-card',
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
      '-=0.2'
    );

    // Animate counters
    stats.forEach(stat => {
      gsap.fromTo(
        {},
        { value: 0 },
        {
          value: stat.value,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: `.stat-${stat.id}`,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          },
          onUpdate: function() {
            setAnimatedStats(prev => ({
              ...prev,
              [stat.id]: Math.round(this.targets()[0].value)
            }));
          }
        }
      );
    });

    // Morphing shapes animation
    gsap.to('.morphing-shape', {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: 'none'
    });

    gsap.to('.floating-shape', {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
      stagger: 0.5
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-20 bg-white overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="morphing-shape absolute top-20 left-10 w-32 h-32 gradient-teal rounded-full opacity-10"></div>
        <div className="floating-shape absolute top-40 right-20 w-24 h-24 bg-blue-200 rounded-lg opacity-20 transform rotate-45"></div>
        <div className="morphing-shape absolute bottom-20 left-1/4 w-40 h-40 bg-purple-200 rounded-full opacity-10"></div>
        <div className="floating-shape absolute bottom-40 right-10 w-28 h-28 bg-green-200 rounded-lg opacity-20 transform rotate-12"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="about-header text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--primary-navy)] mb-6">
            About <span className="gradient-teal-text">Learnwise Technologies</span>
          </h2>
          <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
            We are passionate about transforming education through innovative technology solutions that empower institutions, educators, and learners worldwide.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="mission-vision grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="glass rounded-3xl p-8 hover-lift">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 gradient-teal rounded-2xl">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--primary-navy)]">Our Mission</h3>
            </div>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              To revolutionize education by providing innovative, accessible, and effective technology solutions that enhance learning experiences, streamline educational processes, and bridge the gap between traditional and modern learning methodologies.
            </p>
          </div>

          <div className="glass rounded-3xl p-8 hover-lift">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 gradient-teal rounded-2xl">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--primary-navy)]">Our Vision</h3>
            </div>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              To be the leading educational technology company in Africa, empowering millions of learners and educators with cutting-edge tools that make quality education accessible, engaging, and effective for everyone, everywhere.
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center text-[var(--primary-navy)] mb-12">
            Our <span className="gradient-teal-text">Impact</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className={`stat-card stat-${stat.id} text-center p-6 rounded-2xl bg-white shadow-lg hover-lift`}
              >
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${stat.color} text-white mb-4`}>
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold gradient-teal-text mb-2">
                  {animatedStats[stat.id] || 0}{stat.suffix}
                </div>
                <div className="text-[var(--text-secondary)] font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Core Values */}
        <div>
          <h3 className="text-3xl font-bold text-center text-[var(--primary-navy)] mb-12">
            Our <span className="gradient-teal-text">Values</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div
                key={value.id}
                className="value-card text-center p-8 rounded-2xl bg-[var(--soft-gray)] hover:bg-white hover:shadow-lg transition-all duration-300 hover-lift"
              >
                <div className="inline-flex p-4 gradient-teal rounded-2xl text-white mb-6">
                  {value.icon}
                </div>
                <h4 className="text-xl font-bold text-[var(--primary-navy)] mb-4">
                  {value.title}
                </h4>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
