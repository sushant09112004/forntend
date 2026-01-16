"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function EditPage() {
  const router = useRouter();
  const [structuredData, setStructuredData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get structured data from sessionStorage
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("structuredResume");
      if (stored) {
        try {
          setStructuredData(JSON.parse(stored));
        } catch (err) {
          console.error("Error parsing structured data:", err);
        }
      }
      setLoading(false);
    }
  }, []);

  const updateField = (section, index, field, value) => {
    setStructuredData((prev) => {
      const newData = { ...prev };
      if (Array.isArray(newData[section])) {
        newData[section] = newData[section].map((item, i) =>
          i === index ? { ...item, [field]: value } : item
        );
      }
      return newData;
    });
  };

  const updateArrayField = (section, value) => {
    setStructuredData((prev) => ({
      ...prev,
      [section]: typeof value === "string" 
        ? value.split(",").map((s) => s.trim()).filter((s) => s)
        : value,
    }));
  };

  const addItem = (section, template) => {
    setStructuredData((prev) => ({
      ...prev,
      [section]: [...(prev[section] || []), template],
    }));
  };

  const removeItem = (section, index) => {
    setStructuredData((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  const handleSave = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("structuredResume", JSON.stringify(structuredData));
      alert("Resume saved successfully!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!structuredData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>No Resume Data</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              No structured resume data found. Please upload a resume first.
            </p>
            <Button onClick={() => router.push("/home")}>
              Go to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Edit Resume</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.push("/home")}>
              Back
            </Button>
            <Button onClick={handleSave}>Save Resume</Button>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Summary Section */}
          <Card>
            <CardHeader>
              <CardTitle>Professional Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                value={structuredData.summary || ""}
                onChange={(e) =>
                  setStructuredData((prev) => ({
                    ...prev,
                    summary: e.target.value,
                  }))
                }
                rows={4}
                placeholder="Enter your professional summary..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </CardContent>
          </Card>

          {/* Experience Section */}
          <Card>
            <CardHeader>
              <CardTitle>Experience</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {structuredData.experience?.map((exp, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 space-y-3"
                >
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Job Title</Label>
                      <Input
                        value={exp.title || ""}
                        onChange={(e) =>
                          updateField("experience", index, "title", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label>Company</Label>
                      <Input
                        value={exp.company || ""}
                        onChange={(e) =>
                          updateField("experience", index, "company", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <Label>Location</Label>
                      <Input
                        value={exp.location || ""}
                        onChange={(e) =>
                          updateField("experience", index, "location", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label>Start Date</Label>
                      <Input
                        value={exp.startDate || ""}
                        onChange={(e) =>
                          updateField("experience", index, "startDate", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label>End Date</Label>
                      <Input
                        value={exp.endDate || ""}
                        onChange={(e) =>
                          updateField("experience", index, "endDate", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Description</Label>
                    <textarea
                      value={exp.description || ""}
                      onChange={(e) =>
                        updateField("experience", index, "description", e.target.value)
                      }
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeItem("experience", index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() =>
                  addItem("experience", {
                    title: "",
                    company: "",
                    location: "",
                    startDate: "",
                    endDate: "",
                    description: "",
                  })
                }
              >
                + Add Experience
              </Button>
            </CardContent>
          </Card>

          {/* Projects Section */}
          <Card>
            <CardHeader>
              <CardTitle>Projects</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {structuredData.projects?.map((project, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div>
                    <Label>Project Name</Label>
                    <Input
                      value={project.name || ""}
                      onChange={(e) =>
                        updateField("projects", index, "name", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <textarea
                      value={project.description || ""}
                      onChange={(e) =>
                        updateField("projects", index, "description", e.target.value)
                      }
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                  </div>
                  <div>
                    <Label>Technologies (comma separated)</Label>
                    <Input
                      value={
                        Array.isArray(project.technologies)
                          ? project.technologies.join(", ")
                          : project.technologies || ""
                      }
                      onChange={(e) =>
                        updateField("projects", index, "technologies", e.target.value.split(",").map((s) => s.trim()))
                      }
                    />
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeItem("projects", index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() =>
                  addItem("projects", {
                    name: "",
                    description: "",
                    technologies: [],
                  })
                }
              >
                + Add Project
              </Button>
            </CardContent>
          </Card>

          {/* Achievements Section */}
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <Label>Achievements (one per line or comma separated)</Label>
              <textarea
                value={
                  Array.isArray(structuredData.achievements)
                    ? structuredData.achievements.join("\n")
                    : structuredData.achievements || ""
                }
                onChange={(e) =>
                  updateArrayField(
                    "achievements",
                    e.target.value.split("\n").map((s) => s.trim()).filter((s) => s)
                  )
                }
                rows={6}
                placeholder="Enter achievements, one per line..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </CardContent>
          </Card>

          {/* Skills Section */}
          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <Label>Skills (comma separated)</Label>
              <Input
                value={
                  Array.isArray(structuredData.skills)
                    ? structuredData.skills.join(", ")
                    : structuredData.skills || ""
                }
                onChange={(e) => updateArrayField("skills", e.target.value)}
                placeholder="JavaScript, React, Node.js, ..."
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
