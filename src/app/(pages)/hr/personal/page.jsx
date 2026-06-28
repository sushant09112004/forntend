"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function HRPersonalPage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

        if (!token) {
          throw new Error("No HR session found. Please log in again.");
        }

        const res = await fetch(`${apiUrl}/hr/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to load profile");
        }

        setProfile(data.hr);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (!currentPassword || !newPassword) {
      setPasswordError("Both current and new password are required.");
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters long.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

      const res = await fetch(`${apiUrl}/hr/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update password");
      }

      setPasswordSuccess(data.message || "Password updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setShowDialog(false);
    } catch (err) {
      setPasswordError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="mx-auto flex min-h-screen max-w-4xl flex-col justify-center px-6 py-16">
        <div className="mb-8">
          <Link href="/hr/dashboard" className="text-sm font-medium text-black underline underline-offset-4">
            ← Back to Dashboard
          </Link>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white p-8 shadow-lg shadow-black/10">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-3 inline-flex rounded-full border border-black/10 bg-black/5 px-3 py-1 text-sm font-medium text-black">
                Personal Information
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-black">
                HR Profile Details
              </h1>
              <p className="mt-2 text-gray-700">
                Your logged-in HR account details are shown below.
              </p>
            </div>
            <button
              onClick={() => {
                setShowDialog(true);
                setPasswordError("");
                setPasswordSuccess("");
              }}
              className="rounded-full border border-black/10 bg-black/5 px-4 py-2 text-sm font-medium text-black transition hover:bg-gray-100"
            >
              Change Password
            </button>
          </div>

          {loading && <p className="text-gray-700">Loading profile...</p>}

          {error && <p className="text-red-600">{error}</p>}

          {!loading && !error && profile && (
            <div className="space-y-4">
              <div className="rounded-xl border border-black/10 bg-black/5 p-4">
                <p className="text-sm font-medium text-gray-600">Name</p>
                <p className="mt-1 text-base font-semibold text-black">
                  {profile.name}
                </p>
              </div>

              <div className="rounded-xl border border-black/10 bg-black/5 p-4">
                <p className="text-sm font-medium text-gray-600">Company</p>
                <p className="mt-1 text-base font-semibold text-black">
                  {profile.company}
                </p>
              </div>

              <div className="rounded-xl border border-black/10 bg-black/5 p-4">
                <p className="text-sm font-medium text-gray-600">Email</p>
                <p className="mt-1 break-all text-base font-semibold text-black">
                  {profile.email}
                </p>
              </div>

              <div className="rounded-xl border border-black/10 bg-black/5 p-4">
                <p className="text-sm font-medium text-gray-600">Role</p>
                <p className="mt-1 text-base font-semibold text-black">
                  {profile.role}
                </p>
              </div>

              <div className="rounded-xl border border-black/10 bg-black/5 p-4">
                <p className="text-sm font-medium text-gray-600">Status</p>
                <p className="mt-1 text-base font-semibold text-black">
                  {profile.status}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {showDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-8">
          <div className="w-full max-w-md rounded-3xl border border-black/10 bg-white p-6 shadow-2xl shadow-black/20">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-black">Change Password</h2>
                <p className="text-sm text-gray-600">Enter your current password and a new password.</p>
              </div>
              <button
                onClick={() => setShowDialog(false)}
                className="text-sm font-semibold text-black/60 hover:text-black"
              >
                Close
              </button>
            </div>
            {passwordError && <p className="mb-3 text-sm text-red-600">{passwordError}</p>}
            {passwordSuccess && <p className="mb-3 text-sm text-green-600">{passwordSuccess}</p>}
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full rounded-xl border border-black/10 bg-black/5 px-3 py-2 text-black outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full rounded-xl border border-black/10 bg-black/5 px-3 py-2 text-black outline-none focus:border-black"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowDialog(false)}
                  className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-900"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
