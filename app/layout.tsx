'use client'
import React from 'react';
import Nav from './components/Nav';
import Footer from './components/Footer';
import './globals.css';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en">
        <body className={inter.className}>
          <Nav /> 
          {children}
          <Footer />
        </body>
      </html>
  );
}
