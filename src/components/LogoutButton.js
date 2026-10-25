
"use client";

import { useState } from "react";
import { LogOut, LoaderCircle } from "lucide-react";

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogout() {
    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/master-admin/logout", {
        method: "POST",
        credentials: "same-origin",
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        throw new Error(data.message || `Logout failed (${response.status})`);
      }

      // Cookie delete hone ke baad login page kholo
      window.location.replace("/master");
    } catch (err) {
      console.error("Logout error:", err);
      setError(err.message || "Logout nahi hua. Dobara try karo.");
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleLogout}
        disabled={loading}
        className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <LoaderCircle size={18} className="animate-spin" />
        ) : (
          <LogOut size={18} />
        )}

        {loading ? "Logging out..." : "Logout"}
      </button>

      {error && (
        <p role="alert" className="mt-2 max-w-xs text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
