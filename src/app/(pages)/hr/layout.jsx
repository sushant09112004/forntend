"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Toaster } from "sonner";
import { QueryProvider } from "@/components/providers/query-provider";
import { HRNavbar } from "@/components/hr/HRNavbar";

const PUBLIC_PATHS = ["/hr/login"];

export default function HRLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const isPublic = PUBLIC_PATHS.includes(pathname);

  useEffect(() => {
    if (isPublic) return;
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token || role !== "hr") {
      router.replace("/hr/login");
    }
  }, [router, isPublic]);

  if (isPublic) {
    return <>{children}</>;
  }

  return (
    <QueryProvider>
      <div className="min-h-screen bg-white">
        <HRNavbar />
        <main>{children}</main>
        <Toaster position="top-right" richColors closeButton />
      </div>
    </QueryProvider>
  );
}
