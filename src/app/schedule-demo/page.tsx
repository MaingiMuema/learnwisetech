/* eslint-disable react/no-unescaped-entities */
'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, User, Mail, Phone, Building, ArrowLeft, CheckCircle, Loader2 } from 'lucide-react';
import { gsap } from 'gsap';
import Image from 'next/image';
import Link from 'next/link';

interface DemoFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization: string;
  position: string;
  preferredDate: string;
  preferredTime: string;
  products: string[];
  message: string;
}

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
];

const products = [
  { id: 'shule-network', name: 'Shule Network', description: 'Comprehensive school management system' },
  { id: 'examyetu', name: 'Examyetu', description: 'National exams past papers platform' },
  { id: 'timetable-generator', name: 'Timetable Generator', description: 'Automated school scheduling system' },
  { id: 'access-control', name: 'Access Control System', description: 'Smart campus security solution' },
  { id: 'library-management', name: 'Library Management', description: 'Digital library management system' }
];

export default function ScheduleDemoPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<DemoFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
    position: '',
    preferredDate: '',
    preferredTime: '',
    products: [],
    message: ''
  });

  useEffect(() => {
    // Animate page elements on load
    const tl = gsap.timeline();
    
    tl.fromTo(
      '.demo-header',
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    )
    .fromTo(
      '.demo-form',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.4'
    );
  }, []);

  const handleInputChange = (field: keyof DemoFormData, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleProductToggle = (productId: string) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products.includes(productId)
        ? prev.products.filter(id => id !== productId)
        : [...prev.products, productId]
    }));
  };

  const validateForm = () => {
    const required = ['firstName', 'lastName', 'email', 'organization', 'preferredDate', 'preferredTime'];
    return required.every(field => formData[field as keyof DemoFormData]) && formData.products.length > 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert('Please fill in all required fields and select at least one product.');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, you would send this data to your backend
      console.log('Demo request submitted:', formData);
      
      setIsSubmitted(true);
      
      // Animate success state
      gsap.fromTo(
        '.success-content',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }
      );
      
    } catch (error) {
      console.error('Error submitting demo request:', error);
      alert('There was an error submitting your request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[var(--soft-gray)] via-white to-[var(--soft-gray)]">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center success-content">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--primary-navy)] mb-4">
              Demo Scheduled Successfully!
            </h1>
            
            <p className="text-lg text-[var(--text-secondary)] mb-8">
              Thank you for your interest in our products. We've received your demo request and will contact you within 24 hours to confirm the details.
            </p>
            
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h3 className="font-semibold text-[var(--primary-navy)] mb-4">What happens next?</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-blue-600">1</span>
                  </div>
                  <p className="text-[var(--text-secondary)]">Our team will contact you to confirm your preferred date and time</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-blue-600">2</span>
                  </div>
                  <p className="text-[var(--text-secondary)]">We'll send you a calendar invite with the meeting details</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-blue-600">3</span>
                  </div>
                  <p className="text-[var(--text-secondary)]">Join the personalized demo of your selected products</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/"
                className="gradient-teal text-white px-6 py-3 rounded-lg font-semibold hover-lift transition-all duration-300"
              >
                Back to Home
              </Link>
              <button 
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    organization: '',
                    position: '',
                    preferredDate: '',
                    preferredTime: '',
                    products: [],
                    message: ''
                  });
                }}
                className="border-2 border-[var(--primary-navy)] text-[var(--primary-navy)] px-6 py-3 rounded-lg font-semibold hover:bg-[var(--primary-navy)] hover:text-white transition-all duration-300"
              >
                Schedule Another Demo
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[var(--soft-gray)] via-white to-[var(--soft-gray)]">
      {/* Header */}
      <div className="demo-header bg-[var(--primary-navy)] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link 
              href="/"
              className="inline-flex items-center text-white/80 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative w-16 h-16">
                <Image
                  src="/Learnwise TECH.png"
                  alt="Learnwise Technologies Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">Schedule a Demo</h1>
                <p className="text-white/80 text-lg">See our products in action</p>
              </div>
            </div>
            
            <p className="text-xl text-white/90 max-w-3xl">
              Book a personalized demonstration of our educational technology solutions.
              Our experts will show you how our products can transform your institution's learning environment.
            </p>
          </div>
        </div>
      </div>

      {/* Demo Form */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="demo-form bg-white rounded-2xl shadow-xl p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[var(--primary-navy)] mb-2">
                Tell us about yourself
              </h2>
              <p className="text-[var(--text-secondary)]">
                Help us prepare a personalized demo experience for you
              </p>
            </div>

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-[var(--primary-navy)] mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  First Name *
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder="Enter your first name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--teal-start)] focus:border-transparent transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--primary-navy)] mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Last Name *
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder="Enter your last name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--teal-start)] focus:border-transparent transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--primary-navy)] mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--teal-start)] focus:border-transparent transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--primary-navy)] mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--teal-start)] focus:border-transparent transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--primary-navy)] mb-2">
                  <Building className="w-4 h-4 inline mr-2" />
                  Organization *
                </label>
                <input
                  type="text"
                  value={formData.organization}
                  onChange={(e) => handleInputChange('organization', e.target.value)}
                  placeholder="Enter your organization name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--teal-start)] focus:border-transparent transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--primary-navy)] mb-2">
                  Position/Role
                </label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => handleInputChange('position', e.target.value)}
                  placeholder="e.g., Principal, IT Administrator"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--teal-start)] focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            {/* Scheduling */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[var(--primary-navy)] mb-4">
                <Calendar className="w-5 h-5 inline mr-2" />
                Preferred Schedule
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[var(--primary-navy)] mb-2">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--teal-start)] focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--primary-navy)] mb-2">
                    <Clock className="w-4 h-4 inline mr-2" />
                    Preferred Time *
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => handleInputChange('preferredTime', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--teal-start)] focus:border-transparent transition-all duration-300"
                    required
                  >
                    <option value="">Select a time</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Product Selection */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[var(--primary-navy)] mb-4">
                Products to Demo *
              </h3>
              <p className="text-[var(--text-secondary)] mb-4">
                Select the products you'd like to see in the demonstration
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {products.map(product => (
                  <label
                    key={product.id}
                    className={`flex items-start space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                      formData.products.includes(product.id)
                        ? 'border-[var(--teal-start)] bg-teal-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.products.includes(product.id)}
                      onChange={() => handleProductToggle(product.id)}
                      className="w-5 h-5 mt-0.5 text-[var(--teal-start)] focus:ring-[var(--teal-start)] rounded"
                    />
                    <div>
                      <div className="font-semibold text-[var(--primary-navy)]">
                        {product.name}
                      </div>
                      <div className="text-sm text-[var(--text-secondary)]">
                        {product.description}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Additional Message */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-[var(--primary-navy)] mb-2">
                Additional Information
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                placeholder="Tell us about your specific needs, questions, or anything else you'd like us to cover in the demo..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--teal-start)] focus:border-transparent transition-all duration-300 resize-vertical"
              />
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <Link
                href="/"
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition-all duration-300 text-center"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isLoading || !validateForm()}
                className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center ${
                  isLoading || !validateForm()
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'gradient-teal text-white hover-lift hover:shadow-xl'
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Scheduling Demo...
                  </>
                ) : (
                  'Schedule Demo'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
