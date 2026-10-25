import MasterSidebar from "@/components/MasterSidebar";

export default function MasterLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#f4f7fb]">
      <MasterSidebar />

      <main className="min-h-screen min-w-0 pt-16 md:ml-64 md:pt-0">
        {children}
      </main>
    </div>
  );
}