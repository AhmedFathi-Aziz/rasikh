"use client"

import { LanguageProvider } from "@/components/language-provider";
import FontWrapper from "@/components/font-wrapper";
import { Inter } from "next/font/google";
import { Cairo } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const cairo = Cairo({ subsets: ["arabic"] });

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LanguageProvider>
      <FontWrapper interClass={inter.className} arabicClass={cairo.className}>
        <div className="min-h-screen bg-background flex flex-col">
          <main className="flex-1 container mx-auto px-4 py-8">
            {children}
          </main>
        </div>
      </FontWrapper>
    </LanguageProvider>
  );
} 