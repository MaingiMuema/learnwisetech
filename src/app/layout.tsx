import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Learnwise Technologies - Educational Technology Solutions",
  description: "Leading educational technology company offering innovative solutions including Shule Network, Examyetu, Timetable Generator, and Access Control Systems for modern learning environments.",
  keywords: "educational technology, e-learning, school management, timetable generator, exam papers, access control, library management",
  authors: [{ name: "Learnwise Technologies" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "Learnwise Technologies - Educational Technology Solutions",
    description: "Leading educational technology company offering innovative solutions for modern learning environments.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased"
      >
        {children}
      </body>
    </html>
  );
}
