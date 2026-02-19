"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ResumePreview from "@/components/ResumePreview";
import Collapsiblebox from "@/components/editorpages/Collapsiblebox";
import CollapsibleExperience from "@/components/editorpages/CollapsibleExperience";
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
          const parsed = JSON.parse(stored);
          // Ensure personalInfo exists
          if (!parsed.personalInfo) {
            parsed.personalInfo = {};
          }
          // Ensure all array fields exist
          if (!Array.isArray(parsed.experience)) parsed.experience = [];
          if (!Array.isArray(parsed.projects)) parsed.projects = [];
          if (!Array.isArray(parsed.achievements)) parsed.achievements = [];
          if (!Array.isArray(parsed.skills)) parsed.skills = [];
          if (!Array.isArray(parsed.education)) parsed.education = [];
          if (!Array.isArray(parsed.certifications)) parsed.certifications = [];
          if (!Array.isArray(parsed.languages)) parsed.languages = [];
          setStructuredData(parsed);
        } catch (err) {
          console.error("Error parsing structured data:", err);
        }
      }
      setLoading(false);
    }
  }, []);

  // Auto-save to sessionStorage whenever data changes
  useEffect(() => {
    if (structuredData && typeof window !== "undefined") {
      sessionStorage.setItem(
        "structuredResume",
        JSON.stringify(structuredData),
      );
      console.log(structuredData);
    }
  }, [structuredData]);

  const updateField = (section, index, field, value) => {
    setStructuredData((prev) => {
      const newData = { ...prev };
      if (Array.isArray(newData[section])) {
        newData[section] = newData[section].map((item, i) =>
          i === index ? { ...item, [field]: value } : item,
        );
      } else if (
        typeof newData[section] === "object" &&
        newData[section] !== null
      ) {
        newData[section] = { ...newData[section], [field]: value };
      } else {
        newData[section] = value;
      }
      return newData;
    });
  };

  const updateArrayField = (section, value) => {
    setStructuredData((prev) => ({
      ...prev,
      [section]:
        typeof value === "string"
          ? value
              .split(",")
              .map((s) => s.trim())
              .filter((s) => s)
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
      sessionStorage.setItem(
        "structuredResume",
        JSON.stringify(structuredData),
      );
      alert("Resume saved successfully!");
    }
  };

  const handleDownloadHTML = () => {
    const previewElement = document.getElementById("resume-preview");
    if (!previewElement) return;

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Resume - ${structuredData?.personalInfo?.name || structuredData?.name || "Resume"}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @media print {
      @page {
        margin: 0.5in;
      }
      body {
        print-color-adjust: exact;
        -webkit-print-color-adjust: exact;
      }
    }
  </style>
</head>
<body>
  ${previewElement.innerHTML}
</body>
</html>
    `;

    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `resume-${structuredData?.personalInfo?.name || structuredData?.name || "resume"}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadPDF = () => {
    // For PDF, we'll use the browser's print functionality
    // Users can save as PDF from the print dialog
    window.print();
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
            <Button onClick={() => router.push("/home")}>Go to Home</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Edit Resume
            </h1>
            <div className="flex gap-2 flex-wrap">
              <Button variant="outline" onClick={handleDownloadHTML} size="sm">
                Download HTML
              </Button>
              <Button variant="outline" onClick={handleDownloadPDF} size="sm">
                Download PDF
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/home")}
                size="sm"
              >
                Back
              </Button>
              <Button onClick={handleSave} size="sm">
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Edit Form */}
          <div className="space-y-6 overflow-y-auto max-h-[calc(100vh-120px)] pr-2">
            <div className="grid gap-6">
              {/* Summary Section */}
             
              <Collapsiblebox 
                item={structuredData} 
                onChange={(e) =>
                  setStructuredData((prev) => ({
                    ...prev,
                    summary: e.target.value,
                  }))
                }
              />
              {/* Experience Section */}
              {/* <Card>
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
                              updateField(
                                "experience",
                                index,
                                "title",
                                e.target.value,
                              )
                            }
                          />
                        </div>
                        <div>
                          <Label>Company</Label>
                          <Input
                            value={exp.company || ""}
                            onChange={(e) =>
                              updateField(
                                "experience",
                                index,
                                "company",
                                e.target.value,
                              )
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
                              updateField(
                                "experience",
                                index,
                                "location",
                                e.target.value,
                              )
                            }
                          />
                        </div>
                        <div>
                          <Label>Start Date</Label>
                          <Input
                            value={exp.startDate || ""}
                            onChange={(e) =>
                              updateField(
                                "experience",
                                index,
                                "startDate",
                                e.target.value,
                              )
                            }
                          />
                        </div>
                        <div>
                          <Label>End Date</Label>
                          <Input
                            value={exp.endDate || ""}
                            onChange={(e) =>
                              updateField(
                                "experience",
                                index,
                                "endDate",
                                e.target.value,
                              )
                            }
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Description</Label>
                        <textarea
                          value={exp.description || ""}
                          onChange={(e) =>
                            updateField(
                              "experience",
                              index,
                              "description",
                              e.target.value,
                            )
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
              </Card> */}
              <CollapsibleExperience
                structuredData={structuredData}
                updateField={updateField}
                addItem={addItem}
                removeItem={removeItem}
                />
              {/* Projects Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Projects</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {structuredData.projects?.map((project, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 space-y-3"
                    >
                      <div>
                        <Label>Project Name</Label>
                        <Input
                          value={project.name || ""}
                          onChange={(e) =>
                            updateField(
                              "projects",
                              index,
                              "name",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                      <div>
                        <Label>Description</Label>
                        <textarea
                          value={project.description || ""}
                          onChange={(e) =>
                            updateField(
                              "projects",
                              index,
                              "description",
                              e.target.value,
                            )
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
                            updateField(
                              "projects",
                              index,
                              "technologies",
                              e.target.value.split(",").map((s) => s.trim()),
                            )
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
                        e.target.value
                          .split("\n")
                          .map((s) => s.trim())
                          .filter((s) => s),
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
              {/* Personal Info Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Name</Label>
                      <Input
                        value={structuredData.personalInfo?.name || ""}
                        onChange={(e) =>
                          updateField(
                            "personalInfo",
                            null,
                            "name",
                            e.target.value,
                          )
                        }
                        placeholder="Your Name"
                      />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input
                        type="email"
                        value={structuredData.personalInfo?.email || ""}
                        onChange={(e) =>
                          updateField(
                            "personalInfo",
                            null,
                            "email",
                            e.target.value,
                          )
                        }
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div>
                      <Label>Phone</Label>
                      <Input
                        value={structuredData.personalInfo?.phone || ""}
                        onChange={(e) =>
                          updateField(
                            "personalInfo",
                            null,
                            "phone",
                            e.target.value,
                          )
                        }
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <Label>Location</Label>
                      <Input
                        value={structuredData.personalInfo?.location || ""}
                        onChange={(e) =>
                          updateField(
                            "personalInfo",
                            null,
                            "location",
                            e.target.value,
                          )
                        }
                        placeholder="City, State"
                      />
                    </div>
                    <div>
                      <Label>LinkedIn</Label>
                      <Input
                        value={structuredData.personalInfo?.linkedin || ""}
                        onChange={(e) =>
                          updateField(
                            "personalInfo",
                            null,
                            "linkedin",
                            e.target.value,
                          )
                        }
                        placeholder="linkedin.com/in/yourprofile"
                      />
                    </div>
                    <div>
                      <Label>Website</Label>
                      <Input
                        value={structuredData.personalInfo?.website || ""}
                        onChange={(e) =>
                          updateField(
                            "personalInfo",
                            null,
                            "website",
                            e.target.value,
                          )
                        }
                        placeholder="yourwebsite.com"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* Education Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Education</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {structuredData.education?.map((edu, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 space-y-3 relative"
                    >
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => removeItem("education", index)}
                      >
                        Remove
                      </Button>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label>Degree</Label>
                          <Input
                            value={edu.degree || ""}
                            onChange={(e) =>
                              updateField(
                                "education",
                                index,
                                "degree",
                                e.target.value,
                              )
                            }
                          />
                        </div>
                        <div>
                          <Label>Institution</Label>
                          <Input
                            value={edu.institution || ""}
                            onChange={(e) =>
                              updateField(
                                "education",
                                index,
                                "institution",
                                e.target.value,
                              )
                            }
                          />
                        </div>
                        <div>
                          <Label>Location</Label>
                          <Input
                            value={edu.location || ""}
                            onChange={(e) =>
                              updateField(
                                "education",
                                index,
                                "location",
                                e.target.value,
                              )
                            }
                          />
                        </div>
                        <div>
                          <Label>Graduation Date</Label>
                          <Input
                            value={edu.graduationDate || ""}
                            onChange={(e) =>
                              updateField(
                                "education",
                                index,
                                "graduationDate",
                                e.target.value,
                              )
                            }
                          />
                        </div>
                        <div>
                          <Label>GPA</Label>
                          <Input
                            value={edu.gpa || ""}
                            onChange={(e) =>
                              updateField(
                                "education",
                                index,
                                "gpa",
                                e.target.value,
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={() =>
                      addItem("education", {
                        degree: "",
                        institution: "",
                        location: "",
                        graduationDate: "",
                        gpa: "",
                      })
                    }
                  >
                    + Add Education
                  </Button>
                </CardContent>
              </Card>
              {/* Certifications Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Certifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <Label>Certifications (comma separated)</Label>
                  <Input
                    value={
                      Array.isArray(structuredData.certifications)
                        ? structuredData.certifications.join(", ")
                        : structuredData.certifications || ""
                    }
                    onChange={(e) =>
                      updateArrayField("certifications", e.target.value)
                    }
                    placeholder="AWS Certified, Google Cloud Professional, ..."
                  />
                </CardContent>
              </Card>
              {/* Languages Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Languages</CardTitle>
                </CardHeader>
                <CardContent>
                  <Label>Languages (comma separated)</Label>
                  <Input
                    value={
                      Array.isArray(structuredData.languages)
                        ? structuredData.languages.join(", ")
                        : structuredData.languages || ""
                    }
                    onChange={(e) =>
                      updateArrayField("languages", e.target.value)
                    }
                    placeholder="English, Spanish, French, ..."
                  />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Column - Live Preview */}
          <div className="lg:sticky lg:top-20 h-fit">
            <div className="bg-white rounded-lg shadow-lg p-4">
              <div className="mb-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  Live Preview
                </h2>
                <span className="text-xs text-gray-500">
                  Updates as you type
                </span>
              </div>
              <div className="border rounded-lg p-4 bg-gray-50 overflow-y-auto max-h-[calc(100vh-200px)]">
                <ResumePreview data={structuredData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
