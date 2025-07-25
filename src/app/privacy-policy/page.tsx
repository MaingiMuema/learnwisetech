/* eslint-disable react/no-unescaped-entities */
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Shield, Eye, Lock, Database, Mail, Phone } from 'lucide-react';
import { getCopyrightText } from '@/utils/copyright';

export const metadata: Metadata = {
  title: "Privacy Policy - Learnwise Technologies",
  description: "Learn how Learnwise Technologies protects your privacy and handles your personal information. Our comprehensive privacy policy explains our data practices.",
  keywords: "privacy policy, data protection, personal information, learnwise technologies, privacy rights",
};

export default function PrivacyPolicyPage() {
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
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-[var(--primary-navy)] mb-4">Privacy Policy</h1>
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <p className="text-sm text-[var(--text-secondary)] mt-4">
            Last updated: July 2025
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold text-[var(--primary-navy)] mb-4">Introduction</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Learnwise Technologies ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy 
              explains how we collect, use, disclose, and safeguard your information when you visit our website or use our 
              educational technology services, including Shule Network, Examyetu, Timetable Generator, Access Control Systems, 
              and Library Management solutions.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-semibold text-[var(--primary-navy)] mb-4 flex items-center gap-2">
              <Database className="w-6 h-6" />
              Information We Collect
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-[var(--primary-navy)] mb-2">Personal Information</h3>
                <ul className="list-disc list-inside text-[var(--text-secondary)] space-y-1 ml-4">
                  <li>Name, email address, and contact information</li>
                  <li>School or institution details</li>
                  <li>Job title and professional information</li>
                  <li>Account credentials and preferences</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-[var(--primary-navy)] mb-2">Usage Information</h3>
                <ul className="list-disc list-inside text-[var(--text-secondary)] space-y-1 ml-4">
                  <li>How you interact with our services</li>
                  <li>Pages visited and features used</li>
                  <li>Time spent on our platforms</li>
                  <li>Device and browser information</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section>
            <h2 className="text-2xl font-semibold text-[var(--primary-navy)] mb-4 flex items-center gap-2">
              <Eye className="w-6 h-6" />
              How We Use Your Information
            </h2>
            <ul className="list-disc list-inside text-[var(--text-secondary)] space-y-2 ml-4">
              <li>Provide and maintain our educational technology services</li>
              <li>Process your requests and respond to inquiries</li>
              <li>Send important updates about our services</li>
              <li>Improve our products and user experience</li>
              <li>Ensure security and prevent fraud</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          {/* Data Protection */}
          <section>
            <h2 className="text-2xl font-semibold text-[var(--primary-navy)] mb-4 flex items-center gap-2">
              <Lock className="w-6 h-6" />
              Data Protection & Security
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              We implement appropriate technical and organizational security measures to protect your personal information 
              against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="list-disc list-inside text-[var(--text-secondary)] space-y-1 ml-4">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security assessments and updates</li>
              <li>Access controls and authentication measures</li>
              <li>Employee training on data protection</li>
            </ul>
          </section>

          {/* Information Sharing */}
          <section>
            <h2 className="text-2xl font-semibold text-[var(--primary-navy)] mb-4">Information Sharing</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-[var(--text-secondary)] space-y-1 ml-4">
              <li>With your explicit consent</li>
              <li>To comply with legal requirements</li>
              <li>To protect our rights and safety</li>
              <li>With trusted service providers who assist in our operations</li>
            </ul>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-semibold text-[var(--primary-navy)] mb-4">Your Rights</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-[var(--text-secondary)] space-y-1 ml-4">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Object to processing of your information</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-semibold text-[var(--primary-navy)] mb-4">Cookies and Tracking</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              We use cookies and similar technologies to enhance your experience, analyze usage patterns, and improve our services. 
              You can control cookie settings through your browser preferences.
            </p>
          </section>

          {/* Updates */}
          <section>
            <h2 className="text-2xl font-semibold text-[var(--primary-navy)] mb-4">Policy Updates</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting 
              the new policy on this page and updating the "Last updated" date.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-blue-50 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-[var(--primary-navy)] mb-4">Contact Us</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[var(--primary-navy)]">
                <Mail className="w-4 h-4" />
                <span>privacy@learnwisetech.com</span>
              </div>
              <div className="flex items-center gap-2 text-[var(--primary-navy)]">
                <Phone className="w-4 h-4" />
                <span>+254 745 873518</span>
              </div>
            </div>
          </section>
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
