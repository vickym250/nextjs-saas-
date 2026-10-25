
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiOutlineViewGrid,
  HiOutlineUserGroup,
  HiOutlineUserCircle,
  HiOutlineBookOpen,
  HiOutlineSpeakerphone,
  HiOutlineQuestionMarkCircle,
  HiChevronDown,
  HiOutlineAcademicCap,
  HiOutlineBadgeCheck,
  HiX,
  HiOutlineCog,
  HiOutlineCurrencyDollar,
  HiOutlineDocumentText,
  HiOutlineBell,
  HiMenu,
} from "react-icons/hi";

const menuItems = [
  { path: "/schools-admin", name: "Dashboard", icon: HiOutlineViewGrid },
  {
    name: "Students",
    icon: HiOutlineUserGroup,
    subMenu: [
      { path: "schools-admin/students", name: "Student Data" },
      { path: "/feesreport", name: "Student Fees Report" },
      { path: "/attendance", name: "Attendance" },
      { path: "/absentstudent", name: "Absent List" },
      { path: "/idcard", name: "ID Card" },
      { path: "/exam-time", name: "Exam Time" },
    ],
  },
  {
    name: "Fees Master",
    icon: HiOutlineCurrencyDollar,
    subMenu: [
      { path: "/feescon", name: "Setup" },
      { path: "/feessetup", name: "Monthly Fees Setup" },
      { path: "/feesmaster", name: "Set Class Fees" },
      { path: "/busplane", name: "Location Bus" },
    ],
  },
  {
    name: "Admit Card Master",
    icon: HiOutlineDocumentText,
    subMenu: [
      { path: "/submap", name: "Set Subject" },
      { path: "/exam-time", name: "Exam Timetable" },
      { path: "/admitcard", name: "Admit Card" },
    ],
  },
  {
    name: "Teachers",
    icon: HiOutlineUserCircle,
    subMenu: [
      { path: "/teacher", name: "Teacher Profiles" },
      { path: "/teacherattendace", name: "Teacher Attendance" },
      { path: "/teachertime", name: "Teacher Time" },
      { path: "/teacherid", name: "Teacher ID Card" },
    ],
  },
  { path: "/homework", name: "Homework", icon: HiOutlineBookOpen },
  { path: "/notice", name: "Notices", icon: HiOutlineSpeakerphone },
  { path: "/result", name: "Exam Results", icon: HiOutlineBadgeCheck },
  { path: "/help", name: "Support Help", icon: HiOutlineQuestionMarkCircle },
  { path: "/manage", name: "Settings", icon: HiOutlineCog },
  { path: "/autobel", name: "AutoBell", icon: HiOutlineBell },
];

export default function Sidebar() {
  const pathname = usePathname();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const isActive = (path) =>
    pathname === path || pathname.startsWith(`${path}/`);

  const toggleSubMenu = (name) => {
    setOpenSubMenu((current) => (current === name ? null : name));
    setCollapsed(false);
  };

  const sidebarWidth = collapsed ? "md:w-20" : "md:w-64";

  return (
    <>
      {/* Mobile top bar */}
      <header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center gap-3 border-b border-slate-200 bg-white px-4 md:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Open sidebar"
          className="rounded-lg p-2 text-slate-700 hover:bg-slate-100"
        >
          <HiMenu size={24} />
        </button>

        <span className="font-bold text-slate-900">EduAdmin</span>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-dvh flex-col overflow-hidden border-r border-slate-800 bg-[#0f172a] text-slate-300 transition-[width,transform] duration-300
          ${sidebarWidth}
          ${
            mobileOpen
              ? "translate-x-0 w-64"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* Brand */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-800 bg-[#1e293b]/50 px-4">
          <Link
            href="/dashboard"
            onClick={() => setMobileOpen(false)}
            className="flex min-w-0 items-center gap-3"
          >
            <span className="shrink-0 rounded-lg bg-blue-600 p-2 text-white">
              <HiOutlineAcademicCap size={24} />
            </span>

            <span
              className={`whitespace-nowrap text-lg font-bold tracking-wide text-white ${
                collapsed ? "md:hidden" : ""
              }`}
            >
              EduAdmin
            </span>
          </Link>

          {/* Mobile close */}
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close sidebar"
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-700 hover:text-white md:hidden"
          >
            <HiX size={23} />
          </button>

          {/* Collapse / expand */}
          <button
            type="button"
            onClick={() => {
              setCollapsed((value) => !value);
              setOpenSubMenu(null);
            }}
            aria-label="Toggle sidebar width"
            className="hidden rounded-lg p-1 text-slate-400 hover:bg-slate-700 hover:text-white md:block"
          >
            <HiMenu size={22} />
          </button>
        </div>

        {/* Navigation: scrollbar hidden, scrolling enabled */}
        <nav className="sidebar-scroll min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain p-3">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;

              const active = item.path
                ? isActive(item.path)
                : item.subMenu.some((sub) => isActive(sub.path));

              const expanded =
                openSubMenu === item.name ||
                item.subMenu?.some((sub) => isActive(sub.path));

              return (
                <li key={item.name}>
                  {item.subMenu ? (
                    <>
                      <button
                        type="button"
                        title={collapsed ? item.name : undefined}
                        aria-expanded={Boolean(expanded && !collapsed)}
                        onClick={() => toggleSubMenu(item.name)}
                        className={`flex w-full items-center justify-between gap-3 rounded-xl p-3 transition-colors ${
                          active || expanded
                            ? "bg-slate-800 text-white"
                            : "hover:bg-slate-800/70 hover:text-white"
                        } ${collapsed ? "md:justify-center" : ""}`}
                      >
                        <span className="flex min-w-0 items-center gap-3">
                          <Icon className="h-6 w-6 shrink-0" />

                          <span
                            className={`truncate text-sm font-medium ${
                              collapsed ? "md:hidden" : ""
                            }`}
                          >
                            {item.name}
                          </span>
                        </span>

                        <HiChevronDown
                          className={`h-4 w-4 shrink-0 transition-transform ${
                            expanded ? "rotate-180" : ""
                          } ${collapsed ? "md:hidden" : ""}`}
                        />
                      </button>

                      {expanded && !collapsed && (
                        <ul className="ml-5 mt-1 space-y-1 border-l border-slate-700 py-1 pl-4">
                          {item.subMenu.map((sub) => {
                            const subActive = isActive(sub.path);

                            return (
                              <li key={`${item.name}-${sub.path}-${sub.name}`}>
                                <Link
                                  href={sub.path}
                                  onClick={() => setMobileOpen(false)}
                                  className={`block rounded-lg px-3 py-2 text-xs transition-colors ${
                                    subActive
                                      ? "bg-blue-600/15 font-semibold text-blue-400"
                                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                                  }`}
                                >
                                  {sub.name}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.path}
                      title={collapsed ? item.name : undefined}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 rounded-xl p-3 transition-colors ${
                        active
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                          : "hover:bg-slate-800/70 hover:text-white"
                      } ${collapsed ? "md:justify-center" : ""}`}
                    >
                      <Icon className="h-6 w-6 shrink-0" />

                      <span
                        className={`truncate text-sm font-medium ${
                          collapsed ? "md:hidden" : ""
                        }`}
                      >
                        {item.name}
                      </span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom label */}
        <div
          className={`shrink-0 border-t border-slate-800 p-4 text-xs text-slate-500 ${
            collapsed ? "md:hidden" : ""
          }`}
        >
          School Management System
          <div className="mt-1 text-slate-600">Admin Panel</div>
        </div>
      </aside>
    </>
  );
}
