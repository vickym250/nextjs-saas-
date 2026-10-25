
"use client";

import { useMemo, useState } from "react";

const initialStudents = [
  {
    id: "STU001",
    admissionNo: "ADM-001",
    name: "Rahul Kumar",
    fatherName: "Rajesh Kumar",
    className: "Class 5",
    section: "A",
    rollNo: "12",
    phone: "9876543210",
    session: "2026-27",
    fees: 5000,
    paid: 3000,
  },
  {
    id: "STU002",
    admissionNo: "ADM-002",
    name: "Priya Singh",
    fatherName: "Amit Singh",
    className: "Class 4",
    section: "B",
    rollNo: "08",
    phone: "9876543211",
    session: "2026-27",
    fees: 4500,
    paid: 4500,
  },
  {
    id: "STU003",
    admissionNo: "ADM-003",
    name: "Aman Verma",
    fatherName: "Suresh Verma",
    className: "Class 5",
    section: "A",
    rollNo: "15",
    phone: "9876543212",
    session: "2025-26",
    fees: 5000,
    paid: 2000,
  },
];

const emptyStudent = {
  admissionNo: "",
  name: "",
  fatherName: "",
  className: "Class 1",
  section: "A",
  rollNo: "",
  phone: "",
  session: "2026-27",
  fees: 5000,
  paid: 0,
};

const classes = [
  "Class 1",
  "Class 2",
  "Class 3",
  "Class 4",
  "Class 5",
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
  "Class 11",
  "Class 12",
];

const sessions = ["2026-27", "2025-26"];

export default function StudentsPage() {
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("All Classes");
  const [sessionFilter, setSessionFilter] = useState("2026-27");
  const [modal, setModal] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [form, setForm] = useState(emptyStudent);
  const [message, setMessage] = useState("");

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSession =
        student.session === sessionFilter;

      const matchesClass =
        classFilter === "All Classes" ||
        student.className === classFilter;

      const query = search.trim().toLowerCase();

      const matchesSearch =
        student.name.toLowerCase().includes(query) ||
        student.admissionNo.toLowerCase().includes(query) ||
        student.fatherName.toLowerCase().includes(query);

      return matchesSession && matchesClass && matchesSearch;
    });
  }, [students, search, classFilter, sessionFilter]);

  const totalDue = filteredStudents.reduce(
    (sum, student) =>
      sum + Math.max(0, Number(student.fees) - Number(student.paid)),
    0
  );

  function openAdd() {
    setForm({ ...emptyStudent, session: sessionFilter });
    setSelectedStudent(null);
    setModal("form");
  }

  function openEdit(student) {
    setSelectedStudent(student);
    setForm({ ...student });
    setModal("form");
  }

  function saveStudent(event) {
    event.preventDefault();

    if (!form.name.trim() || !form.admissionNo.trim()) {
      return;
    }

    if (selectedStudent) {
      setStudents((prev) =>
        prev.map((student) =>
          student.id === selectedStudent.id
            ? { ...student, ...form }
            : student
        )
      );
      setMessage("Student details updated.");
    } else {
      const duplicate = students.some(
        (student) =>
          student.session === form.session &&
          student.admissionNo.trim().toLowerCase() ===
            form.admissionNo.trim().toLowerCase()
      );

      if (duplicate) {
        setMessage("Admission number already exists in this demo.");
        return;
      }

      setStudents((prev) => [
        ...prev,
        {
          ...form,
          id: `STU${Date.now()}`,
          paid: Number(form.paid) || 0,
          fees: Number(form.fees) || 0,
        },
      ]);

      setMessage("Student added.");
    }

    setModal(null);
    setSelectedStudent(null);
  }

  function deleteStudent(student) {
    const confirmed = window.confirm(
      `Delete ${student.name} from this demo?`
    );

    if (!confirmed) return;

    setStudents((prev) =>
      prev.filter((item) => item.id !== student.id)
    );
    setMessage("Student removed from demo data.");
  }

  function openAction(type, student) {
    setSelectedStudent(student);
    setModal(type);
  }

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const inputClass =
    "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500";

  const buttonClass =
    "rounded-lg border px-3 py-1.5 text-sm font-medium transition hover:bg-gray-50";

  return (
    <div className="min-h-screen bg-gray-50 p-4 text-gray-900 md:p-7">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Page heading */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm text-gray-500">
              School Management / Students
            </p>
            <h1 className="mt-1 text-2xl font-bold">
              Student Management
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage admissions, records, ID cards and fees.
            </p>
          </div>

          <button
            onClick={openAdd}
            className="rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white hover:bg-blue-700"
          >
            + Add Student
          </button>
        </div>

        {message && (
          <div className="flex items-center justify-between rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-800">
            {message}
            <button onClick={() => setMessage("")}>✕</button>
          </div>
        )}

        {/* Summary cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <SummaryCard
            title="Students in session"
            value={students.filter(
              (s) => s.session === sessionFilter
            ).length}
          />
          <SummaryCard
            title="Filtered students"
            value={filteredStudents.length}
          />
          <SummaryCard
            title="Outstanding fees"
            value={`₹${totalDue.toLocaleString("en-IN")}`}
          />
        </div>

        {/* Filters */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Academic Session
              </label>
              <select
                className={inputClass}
                value={sessionFilter}
                onChange={(e) => setSessionFilter(e.target.value)}
              >
                {sessions.map((session) => (
                  <option key={session} value={session}>
                    {session}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Filter by Class
              </label>
              <select
                className={inputClass}
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
              >
                <option>All Classes</option>
                {classes.map((className) => (
                  <option key={className}>{className}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Search Student
              </label>
              <input
                className={inputClass}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Name, admission no. or father name"
              />
            </div>
          </div>
        </div>

        {/* Student table */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="font-semibold">Student Records</h2>
            <span className="text-sm text-gray-500">
              {filteredStudents.length} records
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-left text-sm">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="px-4 py-3">Student</th>
                  <th className="px-4 py-3">Admission No.</th>
                  <th className="px-4 py-3">Father Name</th>
                  <th className="px-4 py-3">Class</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Fee Due</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-4 py-3">
                      <div className="font-semibold">
                        {student.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        Roll: {student.rollNo || "-"}
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      {student.admissionNo}
                    </td>
                    <td className="px-4 py-3">
                      {student.fatherName || "-"}
                    </td>
                    <td className="px-4 py-3">
                      {student.className} - {student.section}
                    </td>
                    <td className="px-4 py-3">
                      {student.phone || "-"}
                    </td>
                    <td className="px-4 py-3 font-medium">
                      ₹
                      {Math.max(
                        0,
                        Number(student.fees) -
                          Number(student.paid)
                      ).toLocaleString("en-IN")}
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        <button
                          className={`${buttonClass} border-blue-200 text-blue-700`}
                          onClick={() => openEdit(student)}
                        >
                          Edit
                        </button>

                        <button
                          className={`${buttonClass} border-red-200 text-red-700`}
                          onClick={() => deleteStudent(student)}
                        >
                          Delete
                        </button>

                        <button
                          className={`${buttonClass} border-purple-200 text-purple-700`}
                          onClick={() =>
                            openAction("idcard", student)
                          }
                        >
                          ID Card
                        </button>

                        <button
                          className={`${buttonClass} border-green-200 text-green-700`}
                          onClick={() =>
                            openAction("fees", student)
                          }
                        >
                          Fees
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredStudents.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-12 text-center text-gray-500"
                    >
                      No students found for these filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add / Edit modal */}
        {modal === "form" && (
          <Modal
            title={
              selectedStudent ? "Edit Student" : "Add Student"
            }
            onClose={() => setModal(null)}
          >
            <form onSubmit={saveStudent} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Student Name">
                  <input
                    required
                    className={inputClass}
                    value={form.name}
                    onChange={(e) =>
                      updateField("name", e.target.value)
                    }
                  />
                </Field>

                <Field label="Admission Number">
                  <input
                    required
                    className={inputClass}
                    value={form.admissionNo}
                    onChange={(e) =>
                      updateField("admissionNo", e.target.value)
                    }
                  />
                </Field>

                <Field label="Father Name">
                  <input
                    className={inputClass}
                    value={form.fatherName}
                    onChange={(e) =>
                      updateField("fatherName", e.target.value)
                    }
                  />
                </Field>

                <Field label="Phone">
                  <input
                    className={inputClass}
                    value={form.phone}
                    onChange={(e) =>
                      updateField("phone", e.target.value)
                    }
                  />
                </Field>

                <Field label="Class">
                  <select
                    className={inputClass}
                    value={form.className}
                    onChange={(e) =>
                      updateField("className", e.target.value)
                    }
                  >
                    {classes.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </Field>

                <Field label="Section">
                  <select
                    className={inputClass}
                    value={form.section}
                    onChange={(e) =>
                      updateField("section", e.target.value)
                    }
                  >
                    {["A", "B", "C", "D"].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </Field>

                <Field label="Roll Number">
                  <input
                    className={inputClass}
                    value={form.rollNo}
                    onChange={(e) =>
                      updateField("rollNo", e.target.value)
                    }
                  />
                </Field>

                <Field label="Academic Session">
                  <select
                    className={inputClass}
                    value={form.session}
                    onChange={(e) =>
                      updateField("session", e.target.value)
                    }
                  >
                    {sessions.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </Field>

                <Field label="Total Fees (₹)">
                  <input
                    type="number"
                    min="0"
                    className={inputClass}
                    value={form.fees}
                    onChange={(e) =>
                      updateField("fees", e.target.value)
                    }
                  />
                </Field>

                <Field label="Fees Paid (₹)">
                  <input
                    type="number"
                    min="0"
                    className={inputClass}
                    value={form.paid}
                    onChange={(e) =>
                      updateField("paid", e.target.value)
                    }
                  />
                </Field>
              </div>

              <div className="flex justify-end gap-3 border-t pt-4">
                <button
                  type="button"
                  className={buttonClass}
                  onClick={() => setModal(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  {selectedStudent ? "Save Changes" : "Add Student"}
                </button>
              </div>
            </form>
          </Modal>
        )}

        {/* ID Card preview */}
        {modal === "idcard" && selectedStudent && (
          <Modal
            title="Student ID Card"
            onClose={() => setModal(null)}
          >
            <div
              id="student-id-card"
              className="mx-auto max-w-sm rounded-xl border-2 border-blue-700 bg-white p-5 text-center"
            >
              <h2 className="font-bold text-blue-800">
                YOUR SCHOOL NAME
              </h2>
              <p className="text-xs text-gray-500">
                STUDENT IDENTITY CARD
              </p>
              <div className="mx-auto my-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-3xl">
                {selectedStudent.name.charAt(0).toUpperCase()}
              </div>
              <h3 className="text-lg font-bold">
                {selectedStudent.name}
              </h3>
              <p className="mt-2 text-sm">
                Admission No.: {selectedStudent.admissionNo}
              </p>
              <p className="text-sm">
                Father: {selectedStudent.fatherName || "-"}
              </p>
              <p className="text-sm">
                Class: {selectedStudent.className} -{" "}
                {selectedStudent.section}
              </p>
              <p className="text-sm">
                Session: {selectedStudent.session}
              </p>
              <p className="mt-3 text-xs text-gray-500">
                This is a preview, not an official ID card.
              </p>
            </div>

            <div className="mt-5 flex justify-end gap-3">
              <button
                className={buttonClass}
                onClick={() => setModal(null)}
              >
                Close
              </button>
              <button
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
                onClick={() => window.print()}
              >
                Print
              </button>
            </div>
          </Modal>
        )}

        {/* Fees details */}
        {modal === "fees" && selectedStudent && (
          <Modal
            title="Student Fees"
            onClose={() => setModal(null)}
          >
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">
                  {selectedStudent.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {selectedStudent.admissionNo} ·{" "}
                  {selectedStudent.session}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <SummaryCard
                  title="Total Fees"
                  value={`₹${Number(
                    selectedStudent.fees
                  ).toLocaleString("en-IN")}`}
                />
                <SummaryCard
                  title="Paid"
                  value={`₹${Number(
                    selectedStudent.paid
                  ).toLocaleString("en-IN")}`}
                />
              </div>

              <div className="rounded-lg bg-orange-50 p-4">
                <p className="text-sm text-orange-800">
                  Remaining balance
                </p>
                <p className="text-2xl font-bold text-orange-900">
                  ₹
                  {Math.max(
                    0,
                    Number(selectedStudent.fees) -
                      Number(selectedStudent.paid)
                  ).toLocaleString("en-IN")}
                </p>
              </div>

              <p className="text-xs text-gray-500">
                Demo only: actual fee receipts, payment history
                and collection must be connected to the Fees API.
              </p>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}

function SummaryCard({ title, value }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      {children}
    </div>
  );
}

function Modal({ title, onClose, children }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-5 shadow-xl">
        <div className="mb-5 flex items-center justify-between gap-3">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-lg px-3 py-1 text-xl text-gray-500 hover:bg-gray-100"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
