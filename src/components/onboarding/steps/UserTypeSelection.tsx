'use client';
/* eslint-disable react/no-unescaped-entities */

import { Building, GraduationCap, User, Users } from 'lucide-react';
import { OnboardingData } from '@/types/onboarding';

interface UserTypeSelectionProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
}

const userTypes = [
  {
    id: 'school',
    title: 'School Administrator',
    description: 'I represent a school or educational institution',
    icon: <Building className="w-8 h-8" />,
    color: 'from-blue-500 to-blue-600',
    benefits: ['Full institutional access', 'Multi-user management', 'Advanced analytics', 'Priority support']
  },
  {
    id: 'teacher',
    title: 'Teacher/Educator',
    description: 'I am a teacher looking for educational tools',
    icon: <GraduationCap className="w-8 h-8" />,
    color: 'from-green-500 to-green-600',
    benefits: ['Classroom management', 'Student progress tracking', 'Resource library', 'Collaboration tools']
  },
  {
    id: 'student',
    title: 'Student',
    description: 'I am a student seeking learning resources',
    icon: <User className="w-8 h-8" />,
    color: 'from-purple-500 to-purple-600',
    benefits: ['Personalized learning', 'Progress tracking', 'Study materials', 'Peer collaboration']
  },
  {
    id: 'parent',
    title: 'Parent/Guardian',
    description: 'I want to support my child\'s education',
    icon: <Users className="w-8 h-8" />,
    color: 'from-orange-500 to-orange-600',
    benefits: ['Child progress monitoring', 'Communication with teachers', 'Home learning support', 'Educational insights']
  }
];

export default function UserTypeSelection({ data, updateData }: UserTypeSelectionProps) {
  const handleUserTypeSelect = (userType: string) => {
    updateData({ userType: userType as OnboardingData['userType'] });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-3xl font-bold text-[var(--primary-navy)] mb-4">
          Welcome to <span className="gradient-teal-text">Learnwise Technologies</span>
        </h3>
        <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
          Let's personalize your experience. Tell us which best describes your role in education.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {userTypes.map((type) => (
          <div
            key={type.id}
            onClick={() => handleUserTypeSelect(type.id)}
            className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover-lift ${
              data.userType === type.id
                ? 'border-[var(--teal-start)] bg-gradient-to-br from-[var(--teal-start)]/5 to-[var(--teal-end)]/5 shadow-lg'
                : 'border-gray-200 bg-white hover:border-[var(--teal-start)]/50 hover:shadow-md'
            }`}
          >
            {/* Selection indicator */}
            {data.userType === type.id && (
              <div className="absolute top-4 right-4">
                <div className="w-6 h-6 rounded-full gradient-teal flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            )}

            {/* Icon */}
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${type.color} text-white mb-4`}>
              {type.icon}
            </div>

            {/* Content */}
            <h4 className="text-xl font-semibold text-[var(--primary-navy)] mb-2">
              {type.title}
            </h4>
            <p className="text-[var(--text-secondary)] mb-4">
              {type.description}
            </p>

            {/* Benefits */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-[var(--primary-navy)]">What you'll get:</p>
              <ul className="space-y-1">
                {type.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center text-sm text-[var(--text-secondary)]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--teal-start)] mr-2" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {data.userType && (
        <div className="text-center p-4 bg-gradient-to-r from-[var(--teal-start)]/10 to-[var(--teal-end)]/10 rounded-lg border border-[var(--teal-start)]/20">
          <p className="text-[var(--primary-navy)] font-medium">
            Great choice! We'll customize your experience for {userTypes.find(t => t.id === data.userType)?.title.toLowerCase()}.
          </p>
        </div>
      )}
    </div>
  );
}
