"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import LandingPage from "@/components/LandingPage/LandingPage";
export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    // Dispatch event to update sidebar
    window.dispatchEvent(new Event("userUpdated"));
    setUser(null);
  };

  return (
    // <div className="min-h-screen bg-background text-foreground px-4 py-8 flex flex-col items-center">
    //   <div className="w-full max-w-3xl space-y-4 text-center">
    //     <h1 className="text-3xl sm:text-4xl font-bold">
    //       {user ? `Welcome, ${user.username}` : "Welcome to the Resume App"}
    //     </h1>
    //     <p className="text-sm sm:text-base text-muted-foreground">
    //       {user ? (
    //         "You are logged in. You can now upload and edit your resume."
    //       ) : (
    //         <span>
    //           You are not logged in.{" "}
    //           <Link href="/login" className="underline underline-offset-2">
    //             Login
    //           </Link>{" "}
    //           or{" "}
    //           <Link href="/signup" className="underline underline-offset-2">
    //             Create an account
    //           </Link>
    //           .
    //         </span>
    //       )}
    //     </p>

    //     {user && (
    //       <button
    //         onClick={handleLogout}
    //         className="mt-4 inline-flex items-center rounded-md border border-red-500 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition"
    //       >
    //         Logout
    //       </button>
    //     )}
    //   </div>
    // </div>
    <div>
      <LandingPage />
      </div>
  );
}
