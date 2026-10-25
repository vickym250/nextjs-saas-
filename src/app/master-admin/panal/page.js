
import { redirect } from "next/navigation";
import { getMasterAdmin } from "@/lib/auth";
import {
  School,
  CreditCard,
  Users,
  Globe,
  ShieldCheck,
  LayoutDashboard,
} from "lucide-react";
import LogoutButton from "@/components/LogoutButton";


const stats = [
  { title: "Total Schools", value: "0", icon: School },
  { title: "Active Subscriptions", value: "0", icon: CreditCard },
  { title: "Total Users", value: "0", icon: Users },
  { title: "Connected Domains", value: "0", icon: Globe },
];

export default async function MasterDashboard() {
  const admin = await getMasterAdmin();

  if (!admin) {
    redirect("/master-admin");
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="flex items-center justify-between border-b bg-white px-5 py-4 md:px-8">
        <div className="flex items-center gap-3">
          <ShieldCheck size={28} className="text-indigo-600" />
          <div>
            <h1 className="font-bold text-slate-900">School SaaS</h1>
            <p className="text-xs text-slate-500">Master Control Panel</p>
          </div>
        </div>
        <LogoutButton />
      </header>

      <div className="mx-auto max-w-7xl p-5 md:p-8">
        <p className="text-sm font-medium text-indigo-600">
          Platform Overview
        </p>
        <h2 className="mt-2 text-3xl font-bold text-slate-900">
          Master Dashboard
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Welcome, {admin.email}
        </p>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map(({ title, value, icon: Icon }) => (
            <section
              key={title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-slate-500">{title}</p>
                <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                  <Icon size={22} />
                </div>
              </div>
              <h3 className="mt-5 text-3xl font-bold text-slate-900">
                {value}
              </h3>
            </section>
          ))}
        </div>

        <section className="mt-8 rounded-2xl border bg-white p-6">
          <h3 className="font-bold text-slate-900">
            Welcome to Master Control Panel
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Create schools, manage subscriptions, connect domains,
            and oversee platform users from one place.
          </p>
        </section>
      </div>
    </main>
  );
}
