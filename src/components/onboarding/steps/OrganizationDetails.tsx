'use client';

import { Building, MapPin, Users, Globe } from 'lucide-react';
import { OnboardingData } from '../GetStartedFlow';

interface OrganizationDetailsProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
}

const organizationTypes = [
  { id: 'primary', label: 'Primary School', description: 'Elementary education (K-8)' },
  { id: 'secondary', label: 'Secondary School', description: 'High school education (9-12)' },
  { id: 'university', label: 'University/College', description: 'Higher education institution' },
  { id: 'training', label: 'Training Center', description: 'Vocational or professional training' },
];

const organizationSizes = [
  { id: '1-50', label: '1-50 students', description: 'Small institution' },
  { id: '51-200', label: '51-200 students', description: 'Medium institution' },
  { id: '201-500', label: '201-500 students', description: 'Large institution' },
  { id: '500+', label: '500+ students', description: 'Very large institution' },
];

const countries = [
  'Kenya', 'Uganda', 'Tanzania', 'Rwanda', 'Burundi', 'South Sudan', 'Ethiopia', 'Somalia',
  'Nigeria', 'Ghana', 'South Africa', 'Egypt', 'Morocco', 'Algeria', 'Tunisia', 'Other'
];

const kenyanRegions = [
  'Nairobi', 'Central', 'Coast', 'Eastern', 'North Eastern', 'Nyanza', 'Rift Valley', 'Western'
];

export default function OrganizationDetails({ data, updateData }: OrganizationDetailsProps) {
  const handleInputChange = (field: keyof OnboardingData, value: string) => {
    updateData({ [field]: value });
  };

  const isSchoolOrTeacher = data.userType === 'school' || data.userType === 'teacher';

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-3xl font-bold text-[var(--primary-navy)] mb-4">
          {isSchoolOrTeacher ? 'Tell us about your institution' : 'Organization Information'}
        </h3>
        <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
          {isSchoolOrTeacher 
            ? 'Help us understand your school so we can provide the best solutions for your needs.'
            : 'Let us know about your educational organization or affiliation.'
          }
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Organization Name */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-[var(--primary-navy)] mb-2">
            <Building className="w-4 h-4 inline mr-2" />
            {isSchoolOrTeacher ? 'School/Institution Name' : 'Organization Name'}
          </label>
          <input
            type="text"
            value={data.organizationName}
            onChange={(e) => handleInputChange('organizationName', e.target.value)}
            placeholder={isSchoolOrTeacher ? 'Enter your school name' : 'Enter organization name'}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--teal-start)] focus:border-transparent transition-all duration-300"
          />
        </div>

        {/* Organization Type */}
        <div>
          <label className="block text-sm font-medium text-[var(--primary-navy)] mb-2">
            <Users className="w-4 h-4 inline mr-2" />
            Institution Type
          </label>
          <div className="space-y-2">
            {organizationTypes.map((type) => (
              <label key={type.id} className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="organizationType"
                  value={type.id}
                  checked={data.organizationType === type.id}
                  onChange={(e) => handleInputChange('organizationType', e.target.value)}
                  className="w-4 h-4 text-[var(--teal-start)] focus:ring-[var(--teal-start)]"
                />
                <div className="ml-3">
                  <div className="text-sm font-medium text-[var(--primary-navy)]">{type.label}</div>
                  <div className="text-xs text-[var(--text-secondary)]">{type.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Organization Size */}
        <div>
          <label className="block text-sm font-medium text-[var(--primary-navy)] mb-2">
            <Users className="w-4 h-4 inline mr-2" />
            Institution Size
          </label>
          <div className="space-y-2">
            {organizationSizes.map((size) => (
              <label key={size.id} className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="organizationSize"
                  value={size.id}
                  checked={data.organizationSize === size.id}
                  onChange={(e) => handleInputChange('organizationSize', e.target.value)}
                  className="w-4 h-4 text-[var(--teal-start)] focus:ring-[var(--teal-start)]"
                />
                <div className="ml-3">
                  <div className="text-sm font-medium text-[var(--primary-navy)]">{size.label}</div>
                  <div className="text-xs text-[var(--text-secondary)]">{size.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Country */}
        <div>
          <label className="block text-sm font-medium text-[var(--primary-navy)] mb-2">
            <Globe className="w-4 h-4 inline mr-2" />
            Country
          </label>
          <select
            value={data.country}
            onChange={(e) => handleInputChange('country', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--teal-start)] focus:border-transparent transition-all duration-300"
          >
            <option value="">Select your country</option>
            {countries.map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>

        {/* Region (shown only for Kenya) */}
        {data.country === 'Kenya' && (
          <div>
            <label className="block text-sm font-medium text-[var(--primary-navy)] mb-2">
              <MapPin className="w-4 h-4 inline mr-2" />
              Region/County
            </label>
            <select
              value={data.region}
              onChange={(e) => handleInputChange('region', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--teal-start)] focus:border-transparent transition-all duration-300"
            >
              <option value="">Select your region</option>
              {kenyanRegions.map((region) => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Progress indicator */}
      {data.organizationName && data.organizationType && data.organizationSize && data.country && (
        <div className="text-center p-4 bg-gradient-to-r from-[var(--teal-start)]/10 to-[var(--teal-end)]/10 rounded-lg border border-[var(--teal-start)]/20">
          <p className="text-[var(--primary-navy)] font-medium">
            Perfect! We have all the information we need about your {data.organizationType} institution.
          </p>
        </div>
      )}
    </div>
  );
}
