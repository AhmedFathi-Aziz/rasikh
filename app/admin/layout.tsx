"use client"

import { LanguageProvider } from "@/components/language-provider";
import FontWrapper from "@/components/font-wrapper";
import { Inter } from "next/font/google";
import { Cairo } from "next/font/google";
import { useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });
const cairo = Cairo({ subsets: ["arabic"] });

const ADMIN_USER = process.env.NEXT_PUBLIC_ADMIN_USER;
const ADMIN_PASS = process.env.NEXT_PUBLIC_ADMIN_PASS;

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<null | boolean>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsAuthenticated(localStorage.getItem("admin-auth") === "true");
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      username === (process.env.NEXT_PUBLIC_ADMIN_USER) &&
      password === (process.env.NEXT_PUBLIC_ADMIN_PASS)
    ) {
      localStorage.setItem("admin-auth", "true");
      setIsAuthenticated(true);
      setError(null);
      setUsername("");
      setPassword("");
    } else {
      setError("Incorrect username or password");
    }
  };

  if (isAuthenticated === null) {
    return <div />;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-primary/5 to-white dark:from-primary/10 dark:to-card">
        <form onSubmit={handleLogin} className="bg-white dark:bg-card rounded-2xl shadow-xl p-10 border border-border/40 flex flex-col gap-6 min-w-[320px] max-w-xs w-full">
          <h2 className="text-2xl font-bold text-primary text-center mb-2">Admin Login</h2>
          <input
            className="input input-bordered rounded-xl px-4 py-3 bg-white dark:bg-card border border-primary/20 focus:border-primary/60 shadow-sm"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input
            className="input input-bordered rounded-xl px-4 py-3 bg-white dark:bg-card border border-primary/20 focus:border-primary/60 shadow-sm"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {error && <div className="text-red-600 text-center text-sm">{error}</div>}
          <button type="submit" className="btn btn-primary px-8 py-2 rounded-xl font-bold text-lg shadow-md transition hover:scale-105">Login</button>
        </form>
      </div>
    );
  }

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