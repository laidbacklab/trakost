import './globals.css';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import { ExpenseProvider } from '@/context/ExpenseContent';

// Load Inter font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'PlanXpense | Financial Planner',
  description: 'Plan your finances visually with PlanXpense',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Font Awesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <ExpenseProvider>
          {children}
        </ExpenseProvider>
      </body>
    </html>
  );
}