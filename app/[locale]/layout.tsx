import React from 'react';
import Nav from './components/Nav';
import Footer from './components/Footer';
import './globals.css';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'de' }];
}

export default async function RootLayout({ children, params: { locale } }: { children: React.ReactNode; params: any }) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
  return (
    <html>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Nav />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}