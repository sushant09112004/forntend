"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row sm:items-start">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <div className="flex items-center gap-2.5 justify-center sm:justify-start">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-black text-xs font-bold text-white">
                RS
              </div>
              <span className="text-base font-semibold text-black">
                ResumeSync
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-gray-400">
              AI-powered resume optimization for job seekers and semantic hiring
              tools for HR teams.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-12 text-sm">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                Job Seekers
              </p>
              <Link
                href="/signup"
                className="block text-gray-600 transition-colors hover:text-black"
              >
                Sign Up
              </Link>
              <Link
                href="/login"
                className="block text-gray-600 transition-colors hover:text-black"
              >
                Sign In
              </Link>
              <Link
                href="/home"
                className="block text-gray-600 transition-colors hover:text-black"
              >
                Upload Resume
              </Link>
            </div>
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                HR Teams
              </p>
              <Link
                href="/hr/login"
                className="block text-gray-600 transition-colors hover:text-black"
              >
                HR Login
              </Link>
              <Link
                href="/hr/login"
                className="block text-gray-600 transition-colors hover:text-black"
              >
                Register
              </Link>
              <Link
                href="/hr/dashboard"
                className="block text-gray-600 transition-colors hover:text-black"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-gray-100 pt-6 text-center">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} ResumeSync. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
