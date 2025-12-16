"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";
  
  const [username, setUsername] = useState("demo");
  const [password, setPassword] = useState("demo");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  // Check if already logged in
  useEffect(() => {
    const cookies = document.cookie.split(";");
    const isLoggedIn = cookies.some((c) => c.trim().startsWith("isLoggedIn=true"));
    if (isLoggedIn) {
      router.push(redirect);
    } else {
      setChecking(false);
    }
  }, [router, redirect]);

  if (checking) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="w-8 h-8 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin" />
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simple demo authentication
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (username === "demo" && password === "demo") {
      // Set auth cookie
      document.cookie = "isLoggedIn=true; path=/; max-age=604800"; // 7 days
      document.cookie = `userName=${username}; path=/; max-age=604800`;
      router.push(redirect);
    } else {
      setError("Invalid username or password");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          Username
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="demo"
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="demo"
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
          required
        />
      </div>

      {error && (
        <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg">
          <p className="text-sm text-rose-600">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Signing in...
          </>
        ) : (
          "Sign In"
        )}
      </button>

      {/* Demo Credentials Hint */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <p className="text-xs text-amber-700 text-center mb-2 font-medium">
          Demo Credentials (Already Prefilled)
        </p>
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="text-center">
            <p className="text-xs text-amber-600 mb-1">Username</p>
            <code className="px-3 py-1 bg-white rounded border border-amber-200 text-slate-700 font-mono">
              demo
            </code>
          </div>
          <div className="text-center">
            <p className="text-xs text-amber-600 mb-1">Password</p>
            <code className="px-3 py-1 bg-white rounded border border-amber-200 text-slate-700 font-mono">
              demo
            </code>
          </div>
        </div>
        <p className="text-xs text-amber-600 text-center mt-2">
          Just click "Sign In" to continue
        </p>
      </div>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">FL</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-xl text-slate-800">
                  Flex Living
                </span>
                <span className="px-2 py-0.5 bg-teal-100 text-teal-700 text-xs font-medium rounded-full">
                  Demo
                </span>
              </div>
            </div>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-teal-100 rounded-xl mb-4">
                <svg className="w-7 h-7 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-slate-800 mb-1">
                Manager Login
              </h1>
              <p className="text-slate-500 text-sm">
                Sign in to access the reviews dashboard
              </p>
            </div>

            <Suspense fallback={
              <div className="flex items-center justify-center py-8">
                <div className="w-8 h-8 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin" />
              </div>
            }>
              <LoginForm />
            </Suspense>
          </div>

          {/* Back Link */}
          <p className="text-center mt-6">
            <Link href="/" className="text-sm text-slate-500 hover:text-teal-600 transition-colors">
              ← Back to website
            </Link>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center">
        <p className="text-sm text-slate-400">
          Demo Version · For Interview Assessment Only
        </p>
      </footer>
    </div>
  );
}
