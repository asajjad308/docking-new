import React from 'react';
import Nav from './components/Nav';
import Footer from './components/Footer';
import './globals.css';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider, createTranslator } from 'next-intl';
import { notFound } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'de' }];
}

async function getMessages(locale: string) {
  try {
    return (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
}
type Props = { children: React.ReactNode; params: { locale: string } }
export async function generateMetadata({ params: { locale } }: Props) {
  const messages = await getMessages(locale);

  const t = createTranslator({ locale, messages });

  return {
    title: t('LocaleLayout.title')
  };
}

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  const messages = await getMessages(locale);
  return (
    <html lang={locale}>
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
