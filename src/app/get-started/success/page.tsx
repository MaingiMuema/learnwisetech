/* eslint-disable react/no-unescaped-entities */
'use client';

import { useEffect } from 'react';
import { CheckCircle, Mail, Phone, Calendar, ArrowRight, Home, ExternalLink } from 'lucide-react';
import { gsap } from 'gsap';
import Image from 'next/image';
import Link from 'next/link';

export default function SuccessPage() {

  useEffect(() => {
    // Animate success elements
    const tl = gsap.timeline();

    tl.fromTo(
      '.success-icon',
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, duration: 0.8, ease: 'back.out(1.7)' }
    )
    .fromTo(
      '.success-content',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
      '-=0.3'
    )
    .fromTo(
      '.action-cards',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
      '-=0.2'
    );
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--soft-gray)] via-white to-[var(--soft-gray)]">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-12 h-12 transform group-hover:scale-110 transition-transform duration-300">
                <Image
                  src="/Learnwise Logo.png"
                  alt="Learnwise Technologies Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center space-y-8">
          {/* Success Icon */}
          <div className="success-icon">
            <div className="w-32 h-32 mx-auto bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-2xl">
              <CheckCircle className="w-20 h-20 text-white" />
            </div>
          </div>

          {/* Success Message */}
          <div className="success-content space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--primary-navy)]">
              Welcome to <span className="gradient-teal-text">Learnwise!</span>
            </h1>
            <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
              Your account has been successfully created. We're excited to help transform your educational experience.
            </p>
          </div>

          {/* Confirmation Details */}
          <div className="success-content bg-white rounded-xl shadow-lg p-8 text-left max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-[var(--primary-navy)] mb-6 text-center">
              What's Next?
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--primary-navy)]">Check Your Email</h3>
                  <p className="text-[var(--text-secondary)] text-sm">
                    We've sent a confirmation email with your account details and next steps. 
                    Please check your inbox (and spam folder just in case).
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--primary-navy)]">Personal Consultation</h3>
                  <p className="text-[var(--text-secondary)] text-sm">
                    Our education technology specialist will contact you within 24 hours to discuss 
                    your specific needs and provide personalized recommendations.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--primary-navy)]">Product Demos</h3>
                  <p className="text-[var(--text-secondary)] text-sm">
                    We'll schedule personalized demos of your selected products and help you 
                    understand how they can benefit your institution.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="action-cards bg-white rounded-xl shadow-lg p-6 hover-lift transition-all duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ExternalLink className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-[var(--primary-navy)] mb-2">Explore Products</h3>
              <p className="text-[var(--text-secondary)] text-sm mb-4">
                Visit our live products and see what's possible for your institution.
              </p>
              <div className="space-y-2">
                <a
                  href="https://shulenetwork.co.ke"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-[var(--teal-start)] hover:text-[var(--teal-end)] text-sm transition-colors"
                >
                  Shule Network →
                </a>
                <a
                  href="https://examyetu.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-[var(--teal-start)] hover:text-[var(--teal-end)] text-sm transition-colors"
                >
                  Examyetu →
                </a>
                <a
                  href="https://tg.shulenetwork.co.ke"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-[var(--teal-start)] hover:text-[var(--teal-end)] text-sm transition-colors"
                >
                  Timetable Generator →
                </a>
              </div>
            </div>

            <div className="action-cards bg-white rounded-xl shadow-lg p-6 hover-lift transition-all duration-300">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-[var(--primary-navy)] mb-2">Contact Support</h3>
              <p className="text-[var(--text-secondary)] text-sm mb-4">
                Have questions? Our support team is here to help you get started.
              </p>
              <div className="space-y-2">
                <p className="text-sm text-[var(--primary-navy)]">
                  Email: support@learnwisetech.co.ke
                </p>
                <p className="text-sm text-[var(--primary-navy)]">
                  Phone: +254 700 000 000
                </p>
              </div>
            </div>

            <div className="action-cards bg-white rounded-xl shadow-lg p-6 hover-lift transition-all duration-300">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-[var(--primary-navy)] mb-2">Schedule Demo</h3>
              <p className="text-[var(--text-secondary)] text-sm mb-4">
                Ready to see our products in action? Schedule a personalized demo.
              </p>
              <button className="w-full gradient-teal text-white px-4 py-2 rounded-lg font-medium hover-lift transition-all duration-300">
                Book Demo Call
              </button>
            </div>
          </div>

          {/* Return Home */}
          <div className="success-content pt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[var(--teal-start)] hover:text-[var(--teal-end)] font-medium transition-colors"
            >
              <Home className="w-5 h-5" />
              Return to Homepage
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[var(--primary-navy)] text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="relative w-8 h-8">
              <Image
                src="/Learnwise Logo.png"
                alt="Learnwise Technologies Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-lg font-bold">Learnwise Technologies</span>
          </div>
          <p className="text-gray-300">
            Transforming education through innovative technology solutions.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            © 2024 Learnwise Technologies. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
