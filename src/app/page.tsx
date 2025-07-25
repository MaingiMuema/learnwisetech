import Navbar from '@/components/navigation/Navbar';
import HeroSection from '@/components/hero/HeroSection';
import AboutSection from '@/components/about/AboutSection';
import ProductShowcase from '@/components/products/ProductShowcase';
import FeaturesSection from '@/components/features/FeaturesSection';
import ContactSection from '@/components/contact/ContactSection';
import Image from 'next/image';
import Link from 'next/link';
import { getCopyrightText } from '@/utils/copyright';

export default function Home() {
  return (
    <main className="relative">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* Products Showcase */}
      <ProductShowcase />

      {/* Features Section */}
      <FeaturesSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <footer className="bg-[var(--primary-navy)] border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative w-12 h-12">
                  <Image
                    src="/Learnwise TECH.png"
                    alt="Learnwise Technologies Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                Transforming education through innovative technology solutions that empower schools, teachers, and students worldwide.
              </p>
              <div className="text-gray-400 text-sm">
                {getCopyrightText()}
              </div>
            </div>

            {/* Products */}
            <div>
              <h3 className="text-white font-semibold mb-4">Products</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="https://shulenetwork.co.ke" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Shule Network</a></li>
                <li><a href="https://examyetu.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Examyetu</a></li>
                <li><a href="https://tg.shulenetwork.co.ke" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Timetable Generator</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Access Control</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Library Management</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
                <li><Link href="/support" className="hover:text-white transition-colors">Support</Link></li>
                <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
