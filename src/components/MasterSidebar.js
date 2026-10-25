"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  School,
  CreditCard,
  Globe,
  Users,
  Settings,
  LogOut,
  ShieldCheck,
  PanelLeftClose,
  X,
} from "lucide-react";
import { useState } from "react";

const menuItems = [
  {
    name: "Dashboard",
    href: "/master/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Manage Schools",
    href: "/master/schools",
    icon: School,
  },
  {
    name: "Subscriptions",
    href: "/master/subscriptions",
    icon: CreditCard,
  },
  {
    name: "Domains",
    href: "/master/domains",
    icon: Globe,
  },
  {
    name: "All Users",
    href: "/master/users",
    icon: Users,
  },
  {
    name: "Settings",
    href: "/master/settings",
    icon: Settings,
  },
];

export default function MasterSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleLogout() {
    try {
      const response = await fetch("/api/master-admin/logout", {
        method: "POST",
      });

      if (response.ok) {
        router.replace("/master-admin");
        router.refresh();
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        aria-label="Open master menu"
        className="fixed left-4 top-4 z-40 rounded-xl border border-slate-200 bg-white p-2.5 text-slate-700 shadow-sm md:hidden"
      >
        <PanelLeftClose size={21} />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close menu overlay"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/50 md:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Brand */}
        <div className="flex h-[76px] items-center gap-3 border-b border-slate-100 px-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-200">
            <ShieldCheck size={25} />
          </div>

          <div className="min-w-0 flex-1">
            <h1 className="truncate text-base font-bold text-slate-900">
              School SaaS
            </h1>
            <p className="text-xs font-medium text-indigo-600">
              Master Control Panel
            </p>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className="rounded-lg p-1 text-slate-500 hover:bg-slate-100 md:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Admin profile */}
        <div className="mx-4 mt-5 flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 font-bold text-indigo-700">
            SA
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-800">
              Super Admin
            </p>
            <p className="text-xs text-slate-500">Platform Owner</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-6">
          <p className="px-3 pb-3 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">
            Platform Management
          </p>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const active =
              pathname === item.href ||
              pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                  active
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                    : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-700"
                }`}
              >
                <Icon size={19} strokeWidth={active ? 2.4 : 1.8} />
                <span>{item.name}</span>

                {active && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-100 p-4">
          <div className="mb-3 rounded-xl bg-emerald-50 px-3 py-2.5">
            <p className="text-xs font-semibold text-emerald-700">
              Platform Status
            </p>
            <p className="mt-1 flex items-center gap-2 text-xs text-emerald-600">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Control panel active
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
          >
            <LogOut size={19} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}