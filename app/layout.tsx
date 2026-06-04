import type { Metadata } from "next";
import { Geist, Geist_Mono, Audiowide } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getTranslations} from 'next-intl/server';
import Footer from "@/components/Footer";
import Image from "next/image";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const audiowide = Audiowide({
  variable: "--font-audiowide",
  subsets: ["latin"],
  weight: "400",
});
export const metadata: Metadata = {
  title: "Zefiryn",
  description: "Coding with Philosophy",
  alternates: {
    canonical: "https://portfolio.jewula.net"
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const t = await getTranslations('Header');
  const messages = await getMessages();

  return (
    <html
      className={`${geistSans.variable} ${geistMono.variable} ${audiowide.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-linear-to-br from-gradient-start to-gradient-end bg-fixed text-dark px-4">
        <NextIntlClientProvider messages={messages}>
          <div className="flex flex-col flex-1 items-center justify-center font-sans">
            <main className="flex flex-1 w-full flex-col items-center justify-start pb-16 lg:pb-32 sm:items-start">
              <header className="max-w-4xl m-auto pt-12 pb-8 text-right w-full text-3xl md:text-[2.5rem] font-audiowide flex flex-row justify-between">
                <div className="h-25">
                  <Image
                      src="/images/artur.jpg"
                      alt="Artur"
                      width={100}
                      height={100}
                      className="rounded-2xl shadow-lg object-cover border-2 border-footer p-1 max-h-25"
                      priority
                  />
                </div>
                <span className="block">
                  {t('page_title')}
                  <span className="text-basic text-xl block">{t('page_title_description')}</span>
                </span>
              </header>
              <Navigation />
              <div className="max-w-4xl m-auto">
                {children}
              </div>
            </main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
