"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function HistoryPage() {
  const router = useRouter();
  const [historyItems, setHistoryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("token");

    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
      setError("You need to be logged in to view your history.");
      return;
    }

    setIsAuthenticated(true);

    const fetchHistory = async () => {
      try {
        setLoading(true);
        setError("");

        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

        const res = await fetch(`${apiUrl}/history`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.message || "Failed to fetch history");
        }

        setHistoryItems(Array.isArray(data.data) ? data.data : []);
      } catch (err) {
        console.error("Error fetching history:", err);
        setError(err.message || "Failed to load history");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const handleOpenInEditor = (entry) => {
    if (typeof window === "undefined") return;

    const structured = {
      personalInfo: entry.personalInfo || {},
      summary: entry.summary || "",
      experience: Array.isArray(entry.experience) ? entry.experience : [],
      projects: Array.isArray(entry.projects) ? entry.projects : [],
      achievements: Array.isArray(entry.achievements) ? entry.achievements : [],
      skills: Array.isArray(entry.skills) ? entry.skills : [],
      education: Array.isArray(entry.education) ? entry.education : [],
      certifications: Array.isArray(entry.certifications)
        ? entry.certifications
        : [],
      languages: Array.isArray(entry.languages) ? entry.languages : [],
    };

    window.sessionStorage.setItem(
      "structuredResume",
      JSON.stringify(structured),
    );
    window.sessionStorage.setItem("originalText", entry.originalText || "");

    router.push("/edit");
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
            <p className="text-sm text-gray-600">Loading your history...</p>
          </div>
        </div>
      );
    }

    if (error && !isAuthenticated) {
      return (
        <div className="min-h-[50vh] flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Login required</CardTitle>
              <CardDescription>
                You need to be logged in to view your resume history.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex gap-3">
              <Button
                className="w-full"
                variant="outline"
                onClick={() => router.push("/login")}
              >
                Go to Login
              </Button>
              <Button
                className="w-full"
                variant="outline"
                onClick={() => router.push("/signup")}
              >
                Create Account
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    if (error) {
      return (
        <div className="min-h-[50vh] flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Unable to load history</CardTitle>
              <CardDescription>{error}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" onClick={() => window.location.reload()}>
                Try again
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    if (!historyItems.length) {
      return (
        <div className="min-h-[50vh] flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>No history yet</CardTitle>
              <CardDescription>
                Once you save resumes, they will appear here.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" onClick={() => router.push("/home")}>
                Go to Home
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    return (
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Resume History
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              All resumes saved under your account.
            </p>
          </div>
          <Badge variant="outline">
            {historyItems.length}{" "}
            {historyItems.length === 1 ? "entry" : "entries"}
          </Badge>
        </div>

        <div className="grid gap-4">
          {historyItems.map((item) => {
            const createdAt = item.createdAt
              ? new Date(item.createdAt).toLocaleString()
              : "";
            const name =
              item.personalInfo?.name ||
              item.personalInfo?.fullName ||
              "Unnamed Resume";
            const summaryPreview =
              (item.summary || "").length > 220
                ? item.summary.slice(0, 220) + "..."
                : item.summary || "No summary provided.";

            return (
              <Card
                key={item._id}
                className="hover:shadow-md transition-shadow border border-gray-200"
              >
                <CardHeader className="flex flex-row items-start justify-between gap-3">
                  <div>
                    <CardTitle className="text-base md:text-lg">
                      {name}
                    </CardTitle>
                    {createdAt && (
                      <p className="text-xs text-gray-500 mt-1">
                        Saved on {createdAt}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge variant="secondary">
                      {Array.isArray(item.experience)
                        ? `${item.experience.length} experience`
                        : "0 experience"}
                    </Badge>
                    <Badge variant="outline">
                      {Array.isArray(item.projects)
                        ? `${item.projects.length} projects`
                        : "0 projects"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {summaryPreview}
                  </p>
                  <div className="flex flex-wrap gap-2 justify-between items-center">
                    <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                      {Array.isArray(item.skills) && item.skills.length > 0 && (
                        <span>
                          Skills:{" "}
                          {item.skills.slice(0, 4).join(", ")}
                          {item.skills.length > 4 ? " ..." : ""}
                        </span>
                      )}
                      {Array.isArray(item.languages) &&
                        item.languages.length > 0 && (
                          <span>
                            Languages:{" "}
                            {item.languages.slice(0, 3).join(", ")}
                            {item.languages.length > 3 ? " ..." : ""}
                          </span>
                        )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenInEditor(item)}
                      >
                        Open in Editor
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderContent()}
    </div>
  );
}

