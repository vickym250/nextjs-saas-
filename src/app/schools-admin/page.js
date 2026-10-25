
"use client";

import { useState } from "react";
import {
  Users,
  UserRound,
  BookOpen,
  Wallet,
  Calendar,
  ArrowUpRight,
  Search,
} from "lucide-react";

const students = [
  { name: "Aarav Sharma", initials: "AS", cls: "Class 6", id: "ADM001", date: "Oct 22, 2026", color: "bg-blue-100 text-blue-700" },
  { name: "Sneha Patel", initials: "SP", cls: "Class 8", id: "ADM002", date: "Oct 21, 2026", color: "bg-rose-100 text-rose-700" },
  { name: "Rohan Mehta", initials: "RM", cls: "Class 5", id: "ADM003", date: "Oct 20, 2026", color: "bg-emerald-100 text-emerald-700" },
  { name: "Priya Verma", initials: "PV", cls: "Class 9", id: "ADM004", date: "Oct 19, 2026", color: "bg-violet-100 text-violet-700" },
  { name: "Kabir Khan", initials: "KK", cls: "Class 7", id: "ADM005", date: "Oct 18, 2026", color: "bg-amber-100 text-amber-700" },
];

const notices = [
  { title: "Annual Function Celebration", desc: "Annual function preparations begin next week.", date: "Oct 23, 2026", color: "bg-blue-500" },
  { title: "Parent-Teacher Meeting", desc: "Please attend the upcoming PTM.", date: "Oct 21, 2026", color: "bg-emerald-500" },
  { title: "Exam Schedule Released", desc: "Check the examination timetable.", date: "Oct 19, 2026", color: "bg-amber-500" },
  { title: "School Holiday", desc: "Please check the school calendar.", date: "Oct 17, 2026", color: "bg-rose-500" },
];

function StatCard({ title, value, note, icon: Icon, theme }) {
  return (
    <section className={`min-w-0 rounded-2xl border p-5 shadow-sm ${theme}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-600">{title}</p>
          <h2 className="mt-2 break-words text-2xl font-bold text-slate-900 sm:text-3xl">
            {value}
          </h2>
        </div>

        <div className="shrink-0 rounded-xl bg-white/80 p-3 shadow-sm">
          <Icon size={23} />
        </div>
      </div>

      <p className="mt-4 flex items-center gap-1 text-xs text-slate-600">
        <ArrowUpRight size={15} className="shrink-0 text-emerald-600" />
        {note}
      </p>
    </section>
  );
}

function SectionTitle({ title, subtitle }) {
  return (
    <div className="min-w-0">
      <h2 className="text-base font-bold text-slate-900 sm:text-lg">
        {title}
      </h2>
      <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
    </div>
  );
}

export default function DashboardPage() {
  const [search, setSearch] = useState("");
  const [period, setPeriod] = useState("This Year");
  const [attendancePeriod, setAttendancePeriod] = useState("This Week");

  const filteredStudents = students.filter((student) =>
    `${student.name} ${student.cls} ${student.id}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const bars =
    period === "This Year"
      ? [48, 55, 61, 68, 77, 83, 92, 100]
      : period === "Last Year"
      ? [38, 47, 52, 59, 65, 72, 79, 87]
      : [25, 35, 43, 52, 64, 71, 78, 89];

  const attendance =
    attendancePeriod === "This Week"
      ? { present: 86, absent: 10, leave: 4 }
      : attendancePeriod === "This Month"
      ? { present: 89, absent: 8, leave: 3 }
      : { present: 87, absent: 9, leave: 4 };

  return (
    <div className="w-full min-w-0 space-y-6 p-4 sm:p-5 lg:p-6">

      {/* Page heading */}
      <header className="flex min-w-0 flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Dashboard
          </h1>
          <p className="mt-1 text-sm leading-6 text-slate-500">
            Welcome back, Admin! Here&apos;s what&apos;s happening in your school.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-3 self-start rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm sm:self-auto">
          <Calendar size={21} className="text-slate-500" />
          <div>
            <p className="text-sm font-semibold text-slate-800">Today</p>
            <p className="text-xs text-slate-500">October 24, 2026</p>
          </div>
        </div>
      </header>

      {/* Statistics cards */}
      <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
        <StatCard
          title="Total Students"
          value="512"
          note="+12% from last month"
          icon={Users}
          theme="border-blue-100 bg-gradient-to-br from-blue-50 to-white text-blue-600"
        />

        <StatCard
          title="Total Teachers"
          value="28"
          note="+8% from last month"
          icon={UserRound}
          theme="border-emerald-100 bg-gradient-to-br from-emerald-50 to-white text-emerald-600"
        />

        <StatCard
          title="Total Classes"
          value="12"
          note="Academic Session 2026–27"
          icon={BookOpen}
          theme="border-amber-100 bg-gradient-to-br from-amber-50 to-white text-amber-600"
        />

        <StatCard
          title="Pending Fees"
          value="₹2,32,450"
          note="Pending fee collection"
          icon={Wallet}
          theme="border-rose-100 bg-gradient-to-br from-rose-50 to-white text-rose-600"
        />
      </div>

      {/* Charts */}
      <div className="grid min-w-0 grid-cols-1 gap-5 2xl:grid-cols-2">

        {/* Enrollment chart */}
        <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <SectionTitle
              title="Student Enrollment"
              subtitle="Enrollment overview"
            />

            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="max-w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>This Year</option>
              <option>Last Year</option>
              <option>All Time</option>
            </select>
          </div>

          <div className="mt-6 flex h-52 min-w-0 gap-3">
            <div className="flex shrink-0 flex-col justify-between pb-1 text-xs text-slate-400">
              <span>200</span>
              <span>150</span>
              <span>100</span>
              <span>50</span>
              <span>0</span>
            </div>

            <div className="relative mb-6 flex min-w-0 flex-1 items-end justify-around border-b border-slate-200">
              <div className="pointer-events-none absolute inset-0 flex flex-col justify-between">
                {[0, 1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="border-t border-dashed border-slate-200"
                  />
                ))}
              </div>

              {bars.map((height, index) => (
                <div
                  key={index}
                  className="z-10 flex h-full min-w-0 w-[8%] items-end"
                >
                  <div
                    title={`${height * 2} students`}
                    className="w-full rounded-t-md bg-blue-500 transition-colors hover:bg-blue-700"
                    style={{ height: `${height}%` }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="ml-9 flex justify-around gap-1 text-xs text-slate-500">
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"].map(
              (month) => (
                <span key={month}>{month}</span>
              )
            )}
          </div>

          <div className="mt-5 flex items-center gap-2 text-xs text-slate-500">
            <span className="h-2.5 w-2.5 rounded-sm bg-blue-500" />
            Student admissions
          </div>
        </section>

        {/* Attendance chart */}
        <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <SectionTitle
              title="Attendance Overview"
              subtitle="Student attendance summary"
            />

            <select
              value={attendancePeriod}
              onChange={(e) => setAttendancePeriod(e.target.value)}
              className="max-w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
          </div>

          <div className="mt-7 flex min-w-0 flex-col items-center justify-around gap-7 sm:flex-row sm:flex-wrap xl:flex-nowrap">
            <div
              className="flex h-40 w-40 shrink-0 items-center justify-center rounded-full sm:h-44 sm:w-44"
              style={{
                background: `conic-gradient(#10b981 0% ${attendance.present}%, #f59e0b ${attendance.present}% ${attendance.present + attendance.absent}%, #f43f5e ${attendance.present + attendance.absent}% 100%)`,
              }}
            >
              <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-white sm:h-32 sm:w-32">
                <span className="text-3xl font-bold text-slate-900">
                  {attendance.present}%
                </span>
                <span className="mt-1 text-center text-xs text-slate-500">
                  Average
                  <br />
                  Attendance
                </span>
              </div>
            </div>

            <div className="w-full max-w-xs min-w-0 space-y-5">
              {[
                { label: "Present", value: attendance.present, color: "bg-emerald-500" },
                { label: "Absent", value: attendance.absent, color: "bg-amber-500" },
                { label: "Leave", value: attendance.leave, color: "bg-rose-500" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-3 text-sm"
                >
                  <span className="flex items-center gap-2.5 text-slate-700">
                    <span className={`h-3 w-3 shrink-0 rounded-full ${item.color}`} />
                    {item.label}
                  </span>
                  <span className="font-semibold text-slate-800">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Recent students and notices */}
      <div className="grid min-w-0 grid-cols-1 gap-5 2xl:grid-cols-2">

        {/* Students table */}
        <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="mb-5 flex min-w-0 flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <SectionTitle
              title="Recent Students"
              subtitle="Recently admitted students"
            />

            <div className="relative w-full sm:w-52">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search students..."
                aria-label="Search students"
                className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="max-w-full overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead>
                <tr className="bg-slate-50 text-xs text-slate-500">
                  <th className="rounded-l-lg px-3 py-3">#</th>
                  <th className="px-3 py-3">Name</th>
                  <th className="px-3 py-3">Class</th>
                  <th className="px-3 py-3">Admission No.</th>
                  <th className="rounded-r-lg px-3 py-3">Date</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((student, index) => (
                  <tr
                    key={student.id}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                  >
                    <td className="px-3 py-3 text-slate-500">
                      {index + 1}
                    </td>

                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${student.color}`}
                        >
                          {student.initials}
                        </span>

                        <span className="whitespace-nowrap font-medium text-slate-800">
                          {student.name}
                        </span>
                      </div>
                    </td>

                    <td className="whitespace-nowrap px-3 py-3">
                      {student.cls}
                    </td>

                    <td className="whitespace-nowrap px-3 py-3 text-slate-500">
                      {student.id}
                    </td>

                    <td className="whitespace-nowrap px-3 py-3 text-slate-500">
                      {student.date}
                    </td>
                  </tr>
                ))}

                {filteredStudents.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="p-6 text-center text-slate-500"
                    >
                      No students found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Notices */}
        <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="mb-5">
            <SectionTitle
              title="Recent Notices"
              subtitle="School announcements"
            />
          </div>

          <div className="divide-y divide-slate-100">
            {notices.map((notice) => (
              <div
                key={notice.title}
                className="flex min-w-0 gap-3 py-4 first:pt-0 last:pb-0"
              >
                <span
                  className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${notice.color}`}
                />

                <div className="min-w-0 flex-1">
                  <h3 className="break-words text-sm font-semibold text-slate-800">
                    {notice.title}
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {notice.desc}
                  </p>
                </div>

                <span className="shrink-0 text-right text-xs text-slate-500">
                  {notice.date}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="flex flex-wrap items-center justify-between gap-2 pb-2 text-xs text-slate-400">
        <span>© 2026 SchoolManage. All rights reserved.</span>
        <span>Admin Dashboard · Demo Data</span>
      </footer>
    </div>
  );
}
