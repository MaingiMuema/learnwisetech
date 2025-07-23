'use client';
/* eslint-disable react/no-unescaped-entities */

import { useState } from 'react';
import { CheckCircle, User, Building, Package, Loader2 } from 'lucide-react';
import { OnboardingData } from '../GetStartedFlow';
import { useRouter } from 'next/navigation';

interface ReviewAndSubmitProps {
  data: OnboardingData;
  setIsLoading: (loading: boolean) => void;
}

const productNames: { [key: string]: string } = {
  'shule-network': 'Shule Network',
  'examyetu': 'Examyetu',
  'timetable-generator': 'Timetable Generator',
  'access-control': 'Access Control System',
  'library-management': 'Library Management'
};

const userTypeLabels: { [key: string]: string } = {
  'school': 'School Administrator',
  'teacher': 'Teacher/Educator',
  'student': 'Student',
  'parent': 'Parent/Guardian'
};

const organizationTypeLabels: { [key: string]: string } = {
  'primary': 'Primary School',
  'secondary': 'Secondary School',
  'university': 'University/College',
  'training': 'Training Center'
};

export default function ReviewAndSubmit({ data, setIsLoading }: ReviewAndSubmitProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setIsLoading(true);
    setSubmitError(null);

    try {
      // Simulate API call - replace with actual API endpoint
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate occasional failures for testing
          if (Math.random() > 0.9) {
            reject(new Error('Network error occurred'));
          } else {
            resolve(true);
          }
        }, 2000);
      });

      // Here you would typically send the data to your backend
      console.log('Submitting onboarding data:', data);

      setSubmitSuccess(true);

      // Redirect to success page after a short delay
      setTimeout(() => {
        router.push('/get-started/success');
      }, 2000);

    } catch (error) {
      console.error('Error submitting onboarding data:', error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
      setIsLoading(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="text-center space-y-6">
        <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-[var(--primary-navy)]">
          Welcome to Learnwise Technologies!
        </h3>
        <p className="text-[var(--text-secondary)]">
          Your account is being set up. You'll be redirected to our success page shortly.
        </p>
        <div className="flex justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-[var(--teal-start)]" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-3xl font-bold text-[var(--primary-navy)] mb-4">
          Review Your <span className="gradient-teal-text">Information</span>
        </h3>
        <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
          Please review your information before we create your account and get you started.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Personal Information */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-[var(--primary-navy)] flex items-center">
            <User className="w-5 h-5 mr-2" />
            Personal Information
          </h4>
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-[var(--text-secondary)]">Name:</span>
              <span className="font-medium">{data.firstName} {data.lastName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-secondary)]">Email:</span>
              <span className="font-medium">{data.email}</span>
            </div>
            {data.phone && (
              <div className="flex justify-between">
                <span className="text-[var(--text-secondary)]">Phone:</span>
                <span className="font-medium">{data.phone}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-[var(--text-secondary)]">User Type:</span>
              <span className="font-medium">{userTypeLabels[data.userType]}</span>
            </div>
            {data.position && (
              <div className="flex justify-between">
                <span className="text-[var(--text-secondary)]">Position:</span>
                <span className="font-medium">{data.position}</span>
              </div>
            )}
          </div>
        </div>

        {/* Organization Information */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-[var(--primary-navy)] flex items-center">
            <Building className="w-5 h-5 mr-2" />
            Organization Information
          </h4>
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-[var(--text-secondary)]">Name:</span>
              <span className="font-medium">{data.organizationName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-secondary)]">Type:</span>
              <span className="font-medium">{organizationTypeLabels[data.organizationType]}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-secondary)]">Size:</span>
              <span className="font-medium">{data.organizationSize} students</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-secondary)]">Location:</span>
              <span className="font-medium">
                {data.region ? `${data.region}, ` : ''}{data.country}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Products */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-[var(--primary-navy)] flex items-center">
          <Package className="w-5 h-5 mr-2" />
          Selected Products ({data.selectedProducts.length})
        </h4>
        <div className="bg-gray-50 rounded-lg p-4">
          {data.selectedProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {data.selectedProducts.map((productId) => (
                <div key={productId} className="flex items-center justify-between bg-white rounded-lg p-3">
                  <span className="font-medium">{productNames[productId]}</span>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[var(--text-secondary)]">No products selected</p>
          )}
        </div>
      </div>

      {/* Interests */}
      {data.interests.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-[var(--primary-navy)]">
            Areas of Interest ({data.interests.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {data.interests.map((interest) => (
              <span
                key={interest}
                className="px-3 py-1 bg-[var(--teal-start)]/10 text-[var(--teal-start)] rounded-full text-sm"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Marketing Consent */}
      <div className="bg-blue-50 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
            data.marketingConsent ? 'bg-[var(--teal-start)] border-[var(--teal-start)]' : 'border-gray-300'
          }`}>
            {data.marketingConsent && (
              <CheckCircle className="w-4 h-4 text-white" />
            )}
          </div>
          <span className="text-sm text-[var(--primary-navy)]">
            {data.marketingConsent 
              ? 'You will receive marketing communications from us'
              : 'You will not receive marketing communications from us'
            }
          </span>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-gradient-to-r from-[var(--teal-start)]/10 to-[var(--teal-end)]/10 rounded-lg p-6 border border-[var(--teal-start)]/20">
        <h4 className="text-lg font-semibold text-[var(--primary-navy)] mb-3">
          What happens next?
        </h4>
        <ul className="space-y-2 text-[var(--text-secondary)]">
          <li className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-[var(--teal-start)] mr-3" />
            We'll create your account and send you a confirmation email
          </li>
          <li className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-[var(--teal-start)] mr-3" />
            Our team will contact you within 24 hours to discuss your needs
          </li>
          <li className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-[var(--teal-start)] mr-3" />
            We'll provide personalized demos of your selected products
          </li>
          <li className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-[var(--teal-start)] mr-3" />
            Get started with a customized implementation plan
          </li>
        </ul>
      </div>

      {/* Error Message */}
      {submitError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <p className="text-red-600 font-medium">Error Creating Account</p>
          <p className="text-red-500 text-sm mt-1">{submitError}</p>
          <button
            onClick={() => setSubmitError(null)}
            className="text-red-600 text-sm underline mt-2 hover:text-red-700"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Submit Button */}
      <div className="text-center">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 ${
            isSubmitting
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'gradient-teal text-white hover-lift hover:shadow-xl animate-pulse-glow'
          }`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Creating Your Account...
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5" />
              Create My Account
            </>
          )}
        </button>
        <p className="text-xs text-[var(--text-secondary)] mt-3">
          By creating an account, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
