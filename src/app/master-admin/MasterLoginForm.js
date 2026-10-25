
"use client";

import { useState } from "react";
import {
  ShieldCheck,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  LoaderCircle,
} from "lucide-react";

export default function MasterLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/master-admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        setError(data.message || "Email ya password galat hai.");
        return;
      }

      if (data.user?.role !== "SUPER_ADMIN") {
        setError("Sirf Super Admin login kar sakta hai.");
        return;
      }

      // API ki HTTP-only cookie save hone ke baad dashboard kholo
      window.location.replace("/master-admin/panal");
    } catch (err) {
      console.error("Master Admin login error:", err);
      setError("Server se connection nahi ho pa raha. Dobara try karo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 via-indigo-50 to-slate-200 px-4 py-10">
      <section className="w-full max-w-md rounded-3xl border border-white bg-white p-7 shadow-2xl sm:p-9">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
            <ShieldCheck size={34} />
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Master Admin
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Sign in to manage your school platform.
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Email Address
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-slate-300 px-4 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100">
              <Mail size={19} className="shrink-0 text-slate-400" />

              <input
                id="email"
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter admin email"
                className="w-full bg-transparent py-3.5 text-sm text-slate-900 outline-none"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Password
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-slate-300 px-4 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100">
              <LockKeyhole size={19} className="shrink-0 text-slate-400" />

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-transparent py-3.5 text-sm text-slate-900 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="shrink-0 text-slate-500 hover:text-indigo-600"
              >
                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <LoaderCircle size={19} className="animate-spin" />
                Signing in...
              </>
            ) : (
              "Login to Dashboard"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-400">
          Secure access for platform administrators
        </p>
      </section>
    </main>
  );
}
