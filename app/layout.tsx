
import './globals.css';
import Header from '../components/Header';
import React from 'react';

export const metadata = {
  title: 'Product Catalog Admin',
  description: 'Admin panel for managing products',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900">
        <Header
          role={typeof window !== 'undefined' ? localStorage.getItem('role') : null}
          onLogout={() => {
            if (typeof window !== 'undefined') {
              localStorage.removeItem('token');
              localStorage.removeItem('role');
              window.location.href = '/login';
            }
          }}
        />
        <main className="p-6 max-w-6xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
