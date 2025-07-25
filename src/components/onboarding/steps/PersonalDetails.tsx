'use client';
/* eslint-disable react/no-unescaped-entities */

import { User, Mail, Phone, Briefcase, Shield } from 'lucide-react';
import { OnboardingData } from '@/types/onboarding';

interface PersonalDetailsProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
}

const positions = {
  school: [
    'Principal/Head Teacher',
    'Deputy Principal',
    'Academic Director',
    'IT Administrator',
    'Administrative Officer',
    'Other'
  ],
  teacher: [
    'Subject Teacher',
    'Head of Department',
    'Class Teacher',
    'Special Needs Teacher',
    'Substitute Teacher',
    'Other'
  ],
  student: [
    'Primary Student',
    'Secondary Student',
    'University Student',
    'Graduate Student',
    'Other'
  ],
  parent: [
    'Parent',
    'Guardian',
    'Family Member',
    'Other'
  ]
};

export default function PersonalDetails({ data, updateData }: PersonalDetailsProps) {
  const handleInputChange = (field: keyof OnboardingData, value: string | boolean) => {
    updateData({ [field]: value });
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    if (!phone) return true; // Phone is optional
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
  };

  const currentPositions = positions[data.userType as keyof typeof positions] || positions.school;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-3xl font-bold text-[var(--primary-navy)] mb-4">
          Personal <span className="gradient-teal-text">Information</span>
        </h3>
        <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
          We need some basic information to create your account and provide personalized support.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* First Name */}
        <div>
          <label className="block text-sm font-medium text-[var(--primary-navy)] mb-2">
            <User className="w-4 h-4 inline mr-2" />
            First Name *
          </label>
          <input
            type="text"
            value={data.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            placeholder="Enter your first name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--teal-start)] focus:border-transparent transition-all duration-300"
            required
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium text-[var(--primary-navy)] mb-2">
            <User className="w-4 h-4 inline mr-2" />
            Last Name *
          </label>
          <input
            type="text"
            value={data.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            placeholder="Enter your last name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--teal-start)] focus:border-transparent transition-all duration-300"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-[var(--primary-navy)] mb-2">
            <Mail className="w-4 h-4 inline mr-2" />
            Email Address *
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="Enter your email address"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-300 ${
              data.email && !validateEmail(data.email)
                ? 'border-red-300 focus:ring-red-500'
                : 'border-gray-300 focus:ring-[var(--teal-start)]'
            }`}
            required
          />
          {data.email && !validateEmail(data.email) && (
            <p className="text-xs text-red-600 mt-1">
              Please enter a valid email address.
            </p>
          )}
          {(!data.email || validateEmail(data.email)) && (
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              We'll use this to send you important updates and account information.
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-[var(--primary-navy)] mb-2">
            <Phone className="w-4 h-4 inline mr-2" />
            Phone Number
          </label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="Enter your phone number"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-300 ${
              data.phone && !validatePhone(data.phone)
                ? 'border-red-300 focus:ring-red-500'
                : 'border-gray-300 focus:ring-[var(--teal-start)]'
            }`}
          />
          {data.phone && !validatePhone(data.phone) && (
            <p className="text-xs text-red-600 mt-1">
              Please enter a valid phone number.
            </p>
          )}
          {(!data.phone || validatePhone(data.phone)) && (
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              Optional - for important notifications and support.
            </p>
          )}
        </div>

        {/* Position */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-[var(--primary-navy)] mb-2">
            <Briefcase className="w-4 h-4 inline mr-2" />
            Your Role/Position
          </label>
          <select
            value={data.position}
            onChange={(e) => handleInputChange('position', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--teal-start)] focus:border-transparent transition-all duration-300"
          >
            <option value="">Select your position</option>
            {currentPositions.map((position) => (
              <option key={position} value={position}>{position}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Privacy and Marketing Consent */}
      <div className="space-y-6 p-6 bg-gray-50 rounded-lg">
        <h4 className="text-lg font-semibold text-[var(--primary-navy)] flex items-center">
          <Shield className="w-5 h-5 mr-2" />
          Privacy & Communications
        </h4>
        
        <div className="space-y-4">
          {/* Marketing Consent */}
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={data.marketingConsent}
              onChange={(e) => handleInputChange('marketingConsent', e.target.checked)}
              className="w-4 h-4 mt-1 text-[var(--teal-start)] focus:ring-[var(--teal-start)] rounded"
            />
            <div className="text-sm">
              <div className="font-medium text-[var(--primary-navy)]">
                Marketing Communications
              </div>
              <div className="text-[var(--text-secondary)]">
                I would like to receive updates about new products, features, and educational resources from Learnwise Technologies.
              </div>
            </div>
          </label>

          {/* Privacy Notice */}
          <div className="text-xs text-[var(--text-secondary)] p-3 bg-white rounded border">
            <p className="mb-2">
              <strong>Privacy Notice:</strong> Your personal information will be used to create your account and provide our services. 
              We take your privacy seriously and will never share your information with third parties without your consent.
            </p>
            <p>
              By proceeding, you agree to our Terms of Service and Privacy Policy. You can update your preferences at any time.
            </p>
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      {data.firstName && data.lastName && data.email && (
        <div className="text-center p-4 bg-gradient-to-r from-[var(--teal-start)]/10 to-[var(--teal-end)]/10 rounded-lg border border-[var(--teal-start)]/20">
          <p className="text-[var(--primary-navy)] font-medium">
            Perfect! We have all the information we need to set up your account.
          </p>
        </div>
      )}
    </div>
  );
}
