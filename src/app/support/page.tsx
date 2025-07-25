/* eslint-disable react/no-unescaped-entities */
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  Headphones,
  Mail,
  Phone,
  MessageCircle,
  Clock,
  HelpCircle,
  Book,
  Video,
  Download,
  Users
} from 'lucide-react';
import { getCopyrightText } from '@/utils/copyright';

export const metadata: Metadata = {
  title: "Support - Learnwise Technologies",
  description: "Get help with Learnwise Technologies products. Access documentation, contact support, and find answers to frequently asked questions.",
  keywords: "support, help, documentation, contact, learnwise technologies, technical support, customer service",
};

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--soft-gray)] via-white to-[var(--soft-gray)]">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-24 h-24 transform group-hover:scale-110 transition-transform duration-300">
                <Image
                  src="/Learnwise Logo.png"
                  alt="Learnwise Technologies Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--primary-navy)] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
            <Headphones className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-[var(--primary-navy)] mb-4">Support Center</h1>
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
            We're here to help you get the most out of our educational technology solutions.
          </p>
        </div>

        {/* Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Email Support */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-[var(--primary-navy)] mb-2 text-center">Email Support</h3>
            <p className="text-[var(--text-secondary)] text-center mb-4">
              Get detailed help via email. We typically respond within 24 hours.
            </p>
            <div className="text-center">
              <a 
                href="mailto:support@learnwisetech.com"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                support@learnwisetech.com
              </a>
            </div>
          </div>

          {/* Phone Support */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-[var(--primary-navy)] mb-2 text-center">Phone Support</h3>
            <p className="text-[var(--text-secondary)] text-center mb-4">
              Speak directly with our support team for immediate assistance.
            </p>
            <div className="text-center">
              <a 
                href="tel:+254700000000"
                className="text-green-600 hover:text-green-700 font-medium"
              >
                +254 745 873518
              </a>
            </div>
          </div>

          {/* Live Chat */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-[var(--primary-navy)] mb-2 text-center">Live Chat</h3>
            <p className="text-[var(--text-secondary)] text-center mb-4">
              Chat with our support team in real-time for quick solutions.
            </p>
            <div className="text-center">
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                Start Chat
              </button>
            </div>
          </div>
        </div>

        {/* Support Hours */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-16">
          <div className="flex items-center justify-center mb-4">
            <Clock className="w-6 h-6 text-[var(--primary-navy)] mr-2" />
            <h2 className="text-2xl font-semibold text-[var(--primary-navy)]">Support Hours</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
            <div>
              <h3 className="text-lg font-medium text-[var(--primary-navy)] mb-2">Business Hours</h3>
              <p className="text-[var(--text-secondary)]">Monday - Friday: 8:00 AM - 6:00 PM EAT</p>
              <p className="text-[var(--text-secondary)]">Saturday: 9:00 AM - 2:00 PM EAT</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-[var(--primary-navy)] mb-2">Emergency Support</h3>
              <p className="text-[var(--text-secondary)]">24/7 for critical system issues</p>
              <p className="text-[var(--text-secondary)]">Premium support customers only</p>
            </div>
          </div>
        </div>

        {/* Resources */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[var(--primary-navy)] text-center mb-8">Self-Help Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Documentation */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Book className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--primary-navy)] mb-2 text-center">Documentation</h3>
              <p className="text-[var(--text-secondary)] text-center mb-4 text-sm">
                Comprehensive guides and tutorials for all our products.
              </p>
              <div className="text-center">
                <button className="text-orange-600 hover:text-orange-700 font-medium text-sm">
                  View Docs
                </button>
              </div>
            </div>

            {/* Video Tutorials */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--primary-navy)] mb-2 text-center">Video Tutorials</h3>
              <p className="text-[var(--text-secondary)] text-center mb-4 text-sm">
                Step-by-step video guides to help you get started.
              </p>
              <div className="text-center">
                <button className="text-red-600 hover:text-red-700 font-medium text-sm">
                  Watch Videos
                </button>
              </div>
            </div>

            {/* Downloads */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--primary-navy)] mb-2 text-center">Downloads</h3>
              <p className="text-[var(--text-secondary)] text-center mb-4 text-sm">
                Access software updates, templates, and resources.
              </p>
              <div className="text-center">
                <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">
                  Download Center
                </button>
              </div>
            </div>

            {/* Community */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--primary-navy)] mb-2 text-center">Community</h3>
              <p className="text-[var(--text-secondary)] text-center mb-4 text-sm">
                Connect with other users and share experiences.
              </p>
              <div className="text-center">
                <button className="text-teal-600 hover:text-teal-700 font-medium text-sm">
                  Join Community
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-center mb-6">
            <HelpCircle className="w-6 h-6 text-[var(--primary-navy)] mr-2" />
            <h2 className="text-2xl font-semibold text-[var(--primary-navy)]">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-medium text-[var(--primary-navy)] mb-2">How do I get started with Learnwise products?</h3>
              <p className="text-[var(--text-secondary)]">
                You can get started by visiting our Get Started page, where you'll be guided through selecting the right products for your institution and setting up your account.
              </p>
            </div>
            
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-medium text-[var(--primary-navy)] mb-2">What support is included with my subscription?</h3>
              <p className="text-[var(--text-secondary)]">
                All subscriptions include email support, access to documentation, and video tutorials. Premium plans include phone support and priority assistance.
              </p>
            </div>
            
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-medium text-[var(--primary-navy)] mb-2">How can I request a new feature?</h3>
              <p className="text-[var(--text-secondary)]">
                We welcome feature requests! Please contact our support team with your suggestions, and we'll consider them for future updates.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-[var(--primary-navy)] mb-2">Do you offer training for new users?</h3>
              <p className="text-[var(--text-secondary)]">
                Yes! We offer comprehensive training sessions for new users, including webinars, one-on-one sessions, and on-site training for larger institutions.
              </p>
            </div>
          </div>
        </div>
      </main>

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
            {getCopyrightText()}
          </p>
        </div>
      </footer>
    </div>
  );
}
