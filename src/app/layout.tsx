import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import ClientProviders from "@/components/ClientProviders";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FirebaseAuthProvider from "../../FirebaseAuthProvider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Template App",
  description: "Created Using Next.js 14 and Ant Design",
};

//To update for new projects
//- Create firebase project & add google auth secret key to .env.local
//- Add google redirect url to google cloud console. API's / Credentials / Web client
//- Create firebase firestore database. Under properties, add firebase to web app, copy firebase config details
//- Create a firebase key under "service accounts" and paste into .env.local

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientProviders>
      <html lang="en">
        <body className={inter.className}>
          <FirebaseAuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <main>
                <div className="flex flex-col min-h-screen">
                  <Header />
                  <div className="flex-1">{children}</div>
                  <Toaster />
                  <Footer />
                </div>
              </main>
            </ThemeProvider>
          </FirebaseAuthProvider>
        </body>
      </html>
    </ClientProviders>
  );
}
