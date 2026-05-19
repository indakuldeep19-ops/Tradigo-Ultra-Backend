
import type {Metadata} from 'next';
import './globals.css';
import { CurrencyProvider } from '@/context/currency-context';
import { FirebaseProvider } from '@/firebase/provider';
import Script from 'next/script';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Tradigo Prime | Quantum AI Trading',
  description: 'Experience futuristic luxury social trading with AI-powered insights, real-time quantum analytics, and premium neon vibes.',
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
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased selection:bg-primary/20 bg-[#0d0d12] text-foreground overflow-x-hidden min-h-screen">
        <FirebaseProvider>
          <CurrencyProvider>
            {children}
            <Toaster />
          </CurrencyProvider>
        </FirebaseProvider>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
