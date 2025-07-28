import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Web3Provider } from "@/providers/Web3Provider";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "QRBN.app | Islamic Finance Donation dApp",
  description: "Transparent, Shariah-compliant donations with NFT proof and DAO governance",
  keywords: ["Islamic finance", "Zakat", "Qurban", "donation", "blockchain", "NFT", "DAO"],
  themeColor: "#071a12",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  openGraph: {
    title: "QRBN.app | Islamic Finance Donation dApp",
    description: "Transparent, Shariah-compliant donations with NFT proof and DAO governance",
    url: "https://qrbn.app",
    siteName: "QRBN.app",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "QRBN.app - Islamic Finance Donation Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QRBN.app | Islamic Finance Donation dApp",
    description: "Transparent, Shariah-compliant donations with NFT proof and DAO governance",
    creator: "@qrbnapp",
    images: ["/images/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preload fonts */}
        <link
          rel="preload"
          href="/fonts/Amiri-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Amiri-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${inter.variable} font-sans bg-background text-foreground min-h-screen flex flex-col`}>
        <Web3Provider>
          <div className="flex-1 flex flex-col">
            {children}
            
            {/* Global Footer */}
            <footer className="py-6 border-t border-accent/10 mt-auto">
              <div className="container mx-auto px-4 text-center text-text-secondary">
                <p className="text-sm">© {new Date().getFullYear()} QRBN.app - All rights reserved</p>
                <p className="text-xs mt-2 opacity-75">Shariah-compliant donations powered by blockchain technology</p>
              </div>
            </footer>
          </div>
        </Web3Provider>
      </body>
    </html>
  );
}
