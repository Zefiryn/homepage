import type { Metadata } from "next";
import { Geist, Geist_Mono, Audiowide } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getTranslations} from 'next-intl/server';
import Footer from "@/components/Footer";


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
      <body className="min-h-full flex flex-col bg-linear-to-br from-gradient-start to-gradient-end bg-fixed text-dark">
        <NextIntlClientProvider messages={messages}>
          <div className="flex flex-col flex-1 items-center justify-center font-sans">
            <main className="flex flex-1 w-full max-w-4xl flex-col items-center justify-start pb-16 px-8 lg:pb-32 lg:px-16 sm:items-start">
              <header className="pt-20 pb-8 text-right w-full text-[2.5rem] font-audiowide">
                {t('page_title')}
                <span className="text-basic text-xl block">{t('page_title_description')}</span>
              </header>
              <Navigation />
              {children}
            </main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
