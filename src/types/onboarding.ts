export interface OnboardingData {
  userType: 'school' | 'teacher' | 'student' | 'parent' | '';
  organizationName: string;
  organizationType: 'primary' | 'secondary' | 'university' | 'training' | '';
  organizationSize: '1-50' | '51-200' | '201-500' | '500+' | '';
  country: string;
  region: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  selectedProducts: string[];
  interests: string[];
  marketingConsent: boolean;
}
