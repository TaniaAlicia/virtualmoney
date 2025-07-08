import * as React from 'react';
import { Metadata } from 'next';
import '@/styles/globals.css';
import Footer from '@/components/generals/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Digital Money House',
    template: '%s | Digital Money House',
  },
  description: 'Tu billetera digital construida con Next.js y Tailwind CSS',
  metadataBase: new URL('https://digitalmoneyhouse.com'),
  robots: { index: true, follow: true },
  icons: {
    icon: '/images/Logo01Dark.png',
  },
 
  openGraph: {
    url: 'https://digitalmoneyhouse.com',
    title: 'Digital Money House',
    description: 'Tu billetera digital construida con Next.js y Tailwind CSS',
    siteName: 'Digital Money House',
    images: ['/images/og.jpg'],
    type: 'website',
    locale: 'es_UY',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Money House',
    description: 'Tu billetera digital construida con Next.js y Tailwind CSS',
    images: ['/images/og.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="w-full min-h-screen flex flex-col justify-between bg-dark text-white overflow-x-hidden">
        {children}
        <Footer />
      </body>
    </html>
  );
}
