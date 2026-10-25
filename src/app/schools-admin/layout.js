
import Sidebar from "@/components/Sidebar";

export default function SchoolAdminLayout({ children }) {
  return (
    <div className="min-h-screen">
      <Sidebar />

      <main className="min-h-screen min-w-0 bg-[#f4f7fb] md:ml-64">
        {children}
      </main>
    </div>
  );
}
