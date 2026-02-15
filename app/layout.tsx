
import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';
import Script from 'next/script';

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Business Lead Generation Services | LinkedIn & Email Outreach',
    description: 'Precision B2B lead generation booking qualified appointments for SaaS, Tech, and Manufacturing. Specialized LinkedIn & Email campaigns with proven ROI.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={spaceGrotesk.className}>
            <head>
                {/* Google Tag Manager */}
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-VS98ZX5Q5Z"
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VS98ZX5Q5Z');
          `}
                </Script>
            </head>
            <body className="antialiased bg-slate-950 text-white">
                {children}
            </body>
        </html>
    );
}
