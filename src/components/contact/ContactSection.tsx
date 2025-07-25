'use client';

import { useRouter } from 'next/navigation';

export default function ContactSection() {
  const router = useRouter();

  const handleGetStartedClick = () => {
    router.push('/get-started');
  };

  const handleScheduleDemoClick = () => {
    router.push('/schedule-demo');
  };

  return (
    <section id="contact" className="py-20 bg-[var(--primary-navy)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to Transform Your <span className="gradient-teal-text">Education?</span>
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
          Join thousands of institutions worldwide that trust Learnwise Technologies to power their educational journey.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={handleGetStartedClick}
            className="gradient-teal text-white px-8 py-4 rounded-full font-semibold text-lg hover-lift hover:shadow-xl transition-all duration-300 animate-pulse-glow"
          >
            Get Started Today
          </button>
          <button 
            onClick={handleScheduleDemoClick}
            className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-[var(--primary-navy)] transition-all duration-300"
          >
            Schedule a Demo
          </button>
        </div>
      </div>
    </section>
  );
}
