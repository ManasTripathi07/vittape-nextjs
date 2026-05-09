import '@/styles/globals.css';

export const metadata = {
  title: 'VittaPe — Investment & Trading Analytics',
  description: 'IPO analytics, investment tracking, and trading dashboard',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-surface-900 antialiased">
        {children}
      </body>
    </html>
  );
}
