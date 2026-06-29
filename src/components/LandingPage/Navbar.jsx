"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedUser = localStorage.getItem("user");
    const storedRole = localStorage.getItem("role");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    }
    if (storedRole) setRole(storedRole);

    const handleUpdate = () => {
      const u = localStorage.getItem("user");
      const r = localStorage.getItem("role");
      setUser(u ? JSON.parse(u) : null);
      setRole(r || null);
    };
    window.addEventListener("userUpdated", handleUpdate);
    return () => window.removeEventListener("userUpdated", handleUpdate);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.dispatchEvent(new Event("userUpdated"));
    setUser(null);
    setRole(null);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-sm font-bold text-white">
            RS
          </div>
          <span className="text-lg font-semibold tracking-tight text-black">
            ResumeSync
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <a href="#for-seekers" className="text-sm font-medium text-gray-600 transition-colors hover:text-black">
            For Job Seekers
          </a>
          <a href="#for-hr" className="text-sm font-medium text-gray-600 transition-colors hover:text-black">
            For HR Teams
          </a>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <Button asChild variant="ghost" size="sm" className="rounded-full text-gray-600">
                <Link href={role === "hr" ? "/hr/dashboard" : "/home"}>
                  Dashboard
                </Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="rounded-full border-gray-200 text-gray-600 hover:bg-gray-50"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm" className="rounded-full text-gray-600 hover:text-black">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild size="sm" className="rounded-full bg-black px-5 text-white hover:bg-gray-800">
                <Link href="/signup">Sign Up</Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="rounded-full border-gray-300 text-gray-700 hover:bg-gray-50">
                <Link href="/hr/login">HR Login</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="md:hidden p-2 text-gray-600"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            <a
              href="#for-seekers"
              className="text-sm font-medium text-gray-600"
              onClick={() => setMobileOpen(false)}
            >
              For Job Seekers
            </a>
            <a
              href="#for-hr"
              className="text-sm font-medium text-gray-600"
              onClick={() => setMobileOpen(false)}
            >
              For HR Teams
            </a>
            <div className="mt-2 border-t border-gray-100 pt-3">
              {user ? (
                <div className="flex flex-col gap-2">
                  <Button asChild variant="ghost" size="sm" className="justify-start rounded-full text-gray-600">
                    <Link href={role === "hr" ? "/hr/dashboard" : "/home"}>
                      Dashboard
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    className="justify-start rounded-full border-gray-200 text-gray-600"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Button asChild variant="ghost" size="sm" className="justify-start rounded-full text-gray-600">
                    <Link href="/login">Sign In</Link>
                  </Button>
                  <Button asChild size="sm" className="justify-start rounded-full bg-black text-white hover:bg-gray-800">
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                  <Button asChild variant="outline" size="sm" className="justify-start rounded-full border-gray-300 text-gray-700">
                    <Link href="/hr/login">HR Login</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
