"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const actions = [
  {
    title: "Search for Candidate",
    description: "Find candidates by skills, experience, or job title.",
    href: "/hr/search",
    badge: "Quick Search",
  },
  {
    title: "View Shortlisted Candidates",
    description: "Review candidates who have already passed the initial screening.",
    href: "/hr/shortlisted",
    badge: "Shortlist",
  },
  {
    title: "Send Email to Candidate",
    description: "Create and send interview or follow-up emails from here.",
    href: "/hr/mail",
    badge: "Communication",
  },
  {
    title: "Personal Info Section",
    description: "Review and manage personal details for the HR profile and candidate workflow.",
    href: "/hr/personal",
    badge: "Profile",
  },
];

export default function HRDashboardPage() {
  const router = useRouter();

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("role");
      window.dispatchEvent(new Event("userUpdated"));
    }
    router.push("/hr/login");
  };
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-16">
        <div className="mb-10">
          <div className="flex items-start justify-between">
            <div className="text-center md:text-left">
              <p className="mb-3 inline-flex rounded-full border border-black/15 bg-black/5 px-3 py-1 text-sm font-medium text-black">
                HR Dashboard
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-black sm:text-5xl">
                Welcome back, HR Team
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-700">
                Manage hiring actions in one place with a clean, simple frontend experience.
              </p>
            </div>
            <div>
              <button
                onClick={handleLogout}
                className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-black hover:bg-gray-50"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {actions.map((action) => (
            <Link
              key={action.title}
              href={action.href}
              className="group rounded-2xl border border-black/10 bg-white p-6 shadow-lg shadow-black/10 transition-transform duration-200 hover:-translate-y-1 hover:bg-gray-50"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="rounded-full border border-black/10 bg-black/5 px-3 py-1 text-sm text-black">
                  {action.badge}
                </span>
                <span className="text-xl text-black transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
              <h2 className="text-xl font-semibold text-black">{action.title}</h2>
              <p className="mt-3 text-sm leading-6 text-gray-700">
                {action.description}
              </p>
              <div className="mt-6 text-sm font-medium text-black">
                Open section
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
