
import type {Metadata} from 'next';
import './globals.css';
import { CurrencyProvider } from '@/context/currency-context';
import Script from 'next/script';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Tradigo Prime | Elite AI Trading',
  description: 'Experience luxury social trading with AI-powered insights, real-time analytics, and premium signals.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased selection:bg-primary/20 bg-background text-foreground overflow-x-hidden">
        <CurrencyProvider>
          {children}
          <Toaster />
        </CurrencyProvider>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
