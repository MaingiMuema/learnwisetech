import GetStartedFlow from '@/components/onboarding/GetStartedFlow';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Get Started - Learnwise Technologies",
  description: "Begin your journey with Learnwise Technologies. Choose your educational technology solutions and start transforming your learning environment today.",
  keywords: "get started, onboarding, educational technology, school registration, learnwise signup",
};

export default function GetStartedPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[var(--soft-gray)] via-white to-[var(--soft-gray)]">
      <GetStartedFlow />
    </main>
  );
}
