
import { redirect } from "next/navigation";
import { getMasterAdmin } from "@/lib/auth";
import MasterLoginForm from "./MasterLoginForm";

export default async function MasterLoginPage() {
  const admin = await getMasterAdmin();

  // Agar pehle se login hai, dashboard par bhejo
  if (admin) {
    redirect("/master-admin/panal");
  }

  // Login nahi hai toh login form dikhao
  return <MasterLoginForm />;
}
