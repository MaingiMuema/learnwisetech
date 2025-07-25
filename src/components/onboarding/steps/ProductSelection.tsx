'use client';
/* eslint-disable react/no-unescaped-entities */

import { Users, FileText, Calendar, Shield, BookOpen, Star, ExternalLink } from 'lucide-react';
import { OnboardingData } from '@/types/onboarding';

interface ProductSelectionProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
}

const products = [
  {
    id: 'shule-network',
    name: 'Shule Network',
    description: 'Comprehensive educational network platform connecting schools, teachers, students, and parents',
    icon: <Users className="w-6 h-6" />,
    features: ['School Management Dashboard', 'Teacher Portal', 'Student Hub', 'Parent Communication'],
    price: 'Custom pricing',
    status: 'live',
    url: 'https://shulenetwork.co.ke',
    recommended: true,
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'examyetu',
    name: 'Examyetu',
    description: 'National exams past papers platform with AI-powered grading and detailed explanations',
    icon: <FileText className="w-6 h-6" />,
    features: ['Past Papers Library', 'AI Grading', 'Detailed Explanations', 'Progress Tracking'],
    price: 'KSH 20 per paper',
    status: 'live',
    url: 'https://examyetu.com',
    recommended: false,
    color: 'from-green-500 to-green-600'
  },
  {
    id: 'timetable-generator',
    name: 'Timetable Generator',
    description: 'Automated school timetable system that optimizes schedules and resources',
    icon: <Calendar className="w-6 h-6" />,
    features: ['Automated Scheduling', 'Resource Optimization', 'Conflict Resolution', 'Easy Editing'],
    price: 'KSH 5,000/term',
    status: 'live',
    url: 'https://tg.shulenetwork.co.ke',
    recommended: false,
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 'access-control',
    name: 'Access Control System',
    description: 'Smart campus security and access management for educational institutions',
    icon: <Shield className="w-6 h-6" />,
    features: ['Smart Card Access', 'Visitor Management', 'Security Monitoring', 'Attendance Tracking'],
    price: 'Contact for pricing',
    status: 'coming-soon',
    url: '#',
    recommended: false,
    color: 'from-red-500 to-red-600'
  },
  {
    id: 'library-management',
    name: 'Library Management',
    description: 'Digital library system for managing books, resources, and student access',
    icon: <BookOpen className="w-6 h-6" />,
    features: ['Digital Catalog', 'Book Tracking', 'Student Records', 'Fine Management'],
    price: 'Contact for pricing',
    status: 'coming-soon',
    url: '#',
    recommended: false,
    color: 'from-orange-500 to-orange-600'
  }
];

const interests = [
  'Student Information Management',
  'Learning Management System',
  'Assessment & Grading',
  'Parent Communication',
  'Financial Management',
  'Staff Management',
  'Attendance Tracking',
  'Report Generation',
  'Mobile Access',
  'Data Analytics'
];

export default function ProductSelection({ data, updateData }: ProductSelectionProps) {
  const handleProductToggle = (productId: string) => {
    const currentProducts = data.selectedProducts;
    const isSelected = currentProducts.includes(productId);
    
    if (isSelected) {
      updateData({ selectedProducts: currentProducts.filter(id => id !== productId) });
    } else {
      updateData({ selectedProducts: [...currentProducts, productId] });
    }
  };

  const handleInterestToggle = (interest: string) => {
    const currentInterests = data.interests;
    const isSelected = currentInterests.includes(interest);
    
    if (isSelected) {
      updateData({ interests: currentInterests.filter(i => i !== interest) });
    } else {
      updateData({ interests: [...currentInterests, interest] });
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-3xl font-bold text-[var(--primary-navy)] mb-4">
          Choose Your <span className="gradient-teal-text">Solutions</span>
        </h3>
        <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
          Select the products and services that best fit your educational needs. You can always add more later.
        </p>
      </div>

      {/* Products Grid */}
      <div className="space-y-6">
        <h4 className="text-xl font-semibold text-[var(--primary-navy)]">Available Products</h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => product.status === 'live' && handleProductToggle(product.id)}
              className={`relative p-6 rounded-xl border-2 transition-all duration-300 ${
                product.status === 'coming-soon'
                  ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-75'
                  : data.selectedProducts.includes(product.id)
                  ? 'border-[var(--teal-start)] bg-gradient-to-br from-[var(--teal-start)]/5 to-[var(--teal-end)]/5 shadow-lg cursor-pointer'
                  : 'border-gray-200 bg-white hover:border-[var(--teal-start)]/50 hover:shadow-md cursor-pointer hover-lift'
              }`}
            >
              {/* Recommended badge */}
              {product.recommended && (
                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    <Star className="w-3 h-3" />
                    Recommended
                  </div>
                </div>
              )}

              {/* Coming soon badge */}
              {product.status === 'coming-soon' && (
                <div className="absolute top-4 right-4">
                  <div className="bg-gray-400 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Coming Soon
                  </div>
                </div>
              )}

              {/* Selection indicator */}
              {data.selectedProducts.includes(product.id) && (
                <div className="absolute top-4 left-4">
                  <div className="w-6 h-6 rounded-full gradient-teal flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              )}

              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${product.color} text-white mb-4`}>
                {product.icon}
              </div>

              {/* Content */}
              <h5 className="text-lg font-semibold text-[var(--primary-navy)] mb-2">
                {product.name}
              </h5>
              <p className="text-[var(--text-secondary)] text-sm mb-4">
                {product.description}
              </p>

              {/* Features */}
              <div className="space-y-2 mb-4">
                {product.features.slice(0, 3).map((feature, index) => (
                  <div key={index} className="flex items-center text-sm text-[var(--text-secondary)]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--teal-start)] mr-2" />
                    {feature}
                  </div>
                ))}
              </div>

              {/* Price and link */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[var(--primary-navy)]">
                  {product.price}
                </span>
                {product.status === 'live' && product.url !== '#' && (
                  <a
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-[var(--teal-start)] hover:text-[var(--teal-end)] transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interests */}
      <div className="space-y-6">
        <h4 className="text-xl font-semibold text-[var(--primary-navy)]">Areas of Interest (Optional)</h4>
        <p className="text-[var(--text-secondary)]">
          Help us understand your specific needs so we can provide better recommendations.
        </p>
        <div className="flex flex-wrap gap-3">
          {interests.map((interest) => (
            <button
              key={interest}
              onClick={() => handleInterestToggle(interest)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                data.interests.includes(interest)
                  ? 'gradient-teal text-white'
                  : 'bg-gray-100 text-[var(--text-secondary)] hover:bg-gray-200'
              }`}
            >
              {interest}
            </button>
          ))}
        </div>
      </div>

      {/* Progress indicator */}
      {data.selectedProducts.length > 0 && (
        <div className="text-center p-4 bg-gradient-to-r from-[var(--teal-start)]/10 to-[var(--teal-end)]/10 rounded-lg border border-[var(--teal-start)]/20">
          <p className="text-[var(--primary-navy)] font-medium">
            Great! You've selected {data.selectedProducts.length} product{data.selectedProducts.length > 1 ? 's' : ''} to get started with.
          </p>
        </div>
      )}
    </div>
  );
}
