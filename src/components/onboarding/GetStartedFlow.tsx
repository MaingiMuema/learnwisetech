'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { gsap } from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import { OnboardingData } from '@/types/onboarding';
import UserTypeSelection from './steps/UserTypeSelection';
import OrganizationDetails from './steps/OrganizationDetails';
import ProductSelection from './steps/ProductSelection';
import PersonalDetails from './steps/PersonalDetails';
import ReviewAndSubmit from './steps/ReviewAndSubmit';

const steps = [
  { id: 1, title: 'User Type', description: 'Tell us about yourself' },
  { id: 2, title: 'Organization', description: 'Your institution details' },
  { id: 3, title: 'Products', description: 'Choose your solutions' },
  { id: 4, title: 'Personal Info', description: 'Contact information' },
  { id: 5, title: 'Review', description: 'Confirm and submit' },
];

export default function GetStartedFlow() {
  const [mounted, setMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<OnboardingData>({
    userType: '',
    organizationName: '',
    organizationType: '',
    organizationSize: '',
    country: '',
    region: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    selectedProducts: [],
    interests: [],
    marketingConsent: false,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Animate step indicator on mount and step changes
    gsap.fromTo(
      '.step-indicator',
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1 }
    );
  }, [currentStep, mounted]);

  const updateData = (newData: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...newData }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
      // Animate step transition
      gsap.fromTo(
        '.step-content',
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }
      );
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      // Animate step transition
      gsap.fromTo(
        '.step-content',
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }
      );
    }
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

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return data.userType !== '';
      case 2:
        return data.organizationName && data.organizationType && data.organizationSize && data.country;
      case 3:
        return data.selectedProducts.length > 0;
      case 4:
        return (
          data.firstName &&
          data.lastName &&
          data.email &&
          validateEmail(data.email) &&
          validatePhone(data.phone)
        );
      case 5:
        return true;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <UserTypeSelection data={data} updateData={updateData} />;
      case 2:
        return <OrganizationDetails data={data} updateData={updateData} />;
      case 3:
        return <ProductSelection data={data} updateData={updateData} />;
      case 4:
        return <PersonalDetails data={data} updateData={updateData} />;
      case 5:
        return <ReviewAndSubmit data={data} setIsLoading={setIsLoading} />;
      default:
        return null;
    }
  };

  // Prevent hydration mismatch by only rendering after mount
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--teal-start)] mx-auto mb-4"></div>
          <p className="text-[var(--text-secondary)]">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
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
              className="text-[var(--text-secondary)] hover:text-[var(--primary-navy)] transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`step-indicator flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                    currentStep > step.id
                      ? 'bg-[var(--teal-start)] border-[var(--teal-start)] text-white'
                      : currentStep === step.id
                      ? 'border-[var(--teal-start)] text-[var(--teal-start)] bg-white'
                      : 'border-gray-300 text-gray-400 bg-white'
                  }`}
                >
                  {currentStep > step.id ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <span className="text-sm font-semibold">{step.id}</span>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 h-0.5 mx-2 transition-all duration-300 ${
                      currentStep > step.id ? 'bg-[var(--teal-start)]' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <h2 className="text-2xl font-bold text-[var(--primary-navy)]">
              {steps[currentStep - 1].title}
            </h2>
            <p className="text-[var(--text-secondary)] mt-1">
              {steps[currentStep - 1].description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gradient-to-br from-[var(--soft-gray)] via-white to-[var(--soft-gray)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="step-content bg-white rounded-xl shadow-lg p-8">
            {renderStepContent()}
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 text-[var(--primary-navy)] hover:bg-gray-200 hover-lift'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
              Previous
            </button>

            <div className="text-sm text-[var(--text-secondary)]">
              Step {currentStep} of {steps.length}
            </div>

            <button
              onClick={nextStep}
              disabled={!canProceed() || isLoading}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                !canProceed() || isLoading
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'gradient-teal text-white hover-lift hover:shadow-lg'
              }`}
            >
              {currentStep === steps.length ? 'Complete' : 'Next'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
