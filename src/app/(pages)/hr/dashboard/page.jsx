"use client";

import Link from "next/link";
import { Search, Star, Mail, User, ArrowRight } from "lucide-react";

const actions = [
  {
    title: "Search Candidates",
    description: "Find talent using natural language — describe your ideal hire and let AI match candidates.",
    href: "/hr/search",
    icon: Search,
    color: "bg-black",
  },
  {
    title: "Shortlisted",
    description: "Review and manage candidates you've saved during search sessions.",
    href: "/hr/shortlisted",
    icon: Star,
    color: "bg-black",
  },
  {
    title: "Send Email",
    description: "Create and send interview or follow-up emails to candidates.",
    href: "/hr/mail",
    icon: Mail,
    color: "bg-black",
  },
  {
    title: "Profile",
    description: "Manage your HR account details and security settings.",
    href: "/hr/personal",
    icon: User,
    color: "bg-black",
  },
];

export default function HRDashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-10">
        <p className="mb-2 inline-flex rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-black">
          HR Dashboard
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-black sm:text-4xl">
          Welcome back, HR Team
        </h1>
        <p className="mt-3 max-w-2xl text-gray-500">
          Manage hiring workflows in one place — search, shortlist, and connect
          with top candidates powered by semantic AI matching.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {actions.map((action) => (
          <Link
            key={action.title}
            href={action.href}
            className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gray-400 hover:shadow-md"
          >
            <div
              className={`mb-4 flex size-10 items-center justify-center rounded-xl text-white ${action.color}`}
            >
              <action.icon className="size-5" />
            </div>
            <h2 className="text-lg font-semibold text-black">
              {action.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-500">
              {action.description}
            </p>
            <div className="mt-5 flex items-center gap-1 text-sm font-medium text-black transition-transform group-hover:translate-x-1">
              Open
              <ArrowRight className="size-4" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
