import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import './globals.css';

export const metadata = {
  metadataBase: new URL('https://novulisurvices.com'),
  title: { default: 'NovuliServices | Free Professional Online Tools', template: '%s | NovuliServices' },
  description: 'Free professional-grade online tools for SEO, PDF conversion, image processing, resume building, and business productivity. No sign-up required. Trusted by professionals worldwide.',
  keywords: ['free online tools', 'pdf converter', 'image to pdf', 'resume builder', 'seo audit', 'qr code generator', 'background remover', 'word to pdf'],
  authors: [{ name: 'NovuliServices Editorial Team' }],
  creator: 'NovuliServices',
  publisher: 'NovuliServices',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://novulisurvices.com',
    siteName: 'NovuliServices',
    title: 'NovuliServices | Free Professional Online Tools',
    description: 'Free professional-grade tools for SEO, PDF, image processing, resume building, and more.',
    images: [{ url: '/logo.png', width: 512, height: 512, alt: 'NovuliServices Logo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NovuliServices | Free Professional Online Tools',
    description: 'Free professional-grade tools for SEO, PDF, image processing, and more.',
    images: ['/logo.png'],
  },
  verification: { google: 'TVfPdlID6TO5rQLDBKi2l3fWpOCLtB7i43cFbk8HiuE' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6561467807135376"
          crossOrigin="anonymous"
        />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
      </head>
      <body className="min-h-screen bg-white text-primary font-sans flex flex-col">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
