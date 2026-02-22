"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { GripVertical } from "lucide-react";
import ResumePreview from "@/components/ResumePreview";
import Collapsiblebox from "@/components/editorpages/Collapsiblebox";
import CollapsibleExperience from "@/components/editorpages/CollapsibleExperience";
import ProjectsSection from "@/components/editorpages/ProjectsSection";
import AchievementsSection from "@/components/editorpages/AchievementsSection";
import SkillsSection from "@/components/editorpages/SkillsSection";
import PersonalInfoSection from "@/components/editorpages/PersonalInfoSection";
import EducationSection from "@/components/editorpages/EducationSection";
import CertificationsSection from "@/components/editorpages/CertificationsSection";
import LanguagesSection from "@/components/editorpages/LanguagesSection";
import { SelectResumeFormat } from "@/components/editorpages/Generalcomponents/SelectResumeFormat";
const DEFAULT_SECTION_ORDER = [
  "personalInfo",
  "summary",
  "experience",
  "projects",
  "achievements",
  "skills",
  "education",
  "certifications",
  "languages",
];

export default function EditPage() {
  const router = useRouter();
  const [structuredData, setStructuredData] = useState(null);
  const [sectionOrder, setSectionOrder] = useState(DEFAULT_SECTION_ORDER);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get structured data and section order from sessionStorage
    if (typeof window !== "undefined") {
      const orderStored = sessionStorage.getItem("resumeSectionOrder");
      if (orderStored) {
        try {
          const parsed = JSON.parse(orderStored);
          if (Array.isArray(parsed) && parsed.length) setSectionOrder(parsed);
        } catch (_) {}
      }
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

  // Auto-save to sessionStorage whenever data or section order changes
  useEffect(() => {
    if (structuredData && typeof window !== "undefined") {
      sessionStorage.setItem(
        "structuredResume",
        JSON.stringify(structuredData),
      );
    }
  }, [structuredData]);

  useEffect(() => {
    if (sectionOrder.length && typeof window !== "undefined") {
      sessionStorage.setItem("resumeSectionOrder", JSON.stringify(sectionOrder));
    }
  }, [sectionOrder]);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const from = result.source.index;
    const to = result.destination.index;
    if (from === to) return;
    setSectionOrder((prev) => {
      const next = [...prev];
      const [removed] = next.splice(from, 1);
      next.splice(to, 0, removed);
      return next;
    });
  };

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
              {/* <Button variant="outline" onClick={handleDownloadHTML} size="sm">
                Download HTML
              </Button> */}
              <Button variant="outline" onClick={handleDownloadPDF} size="sm">
                Download PDF
              </Button>
              <SelectResumeFormat/>
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
          {/* Left Column - Edit Form (drag to reorder; order sets preview order) */}
          <div className="overflow-y-auto max-h-[calc(100vh-120px)] pr-2">
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="edit-sections">
                {(provided) => (
                  <div
                    className="grid gap-6"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {sectionOrder.map((sectionId, index) => (
                      <Draggable
                        key={sectionId}
                        draggableId={sectionId}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`rounded-lg transition-shadow ${
                              snapshot.isDragging ? "shadow-lg bg-white/80" : ""
                            }`}
                          >
                            <div
                              {...provided.dragHandleProps}
                              className="flex items-center gap-2 py-1 -mb-1 cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 touch-none"
                              aria-label="Drag to reorder section"
                            >
                              <GripVertical className="h-4 w-4 shrink-0" />
                              <span className="text-xs font-medium text-gray-500">
                                Drag to reorder
                              </span>
                            </div>
                            {sectionId === "summary" && (
                              <Collapsiblebox
                                item={structuredData}
                                onChange={(e) =>
                                  setStructuredData((prev) => ({
                                    ...prev,
                                    summary: e.target.value,
                                  }))
                                }
                                onAiResult={(text) =>
                                  setStructuredData((prev) => ({
                                    ...prev,
                                    summary: text,
                                  }))
                                }
                              />
                            )}
                            {sectionId === "experience" && (
                              <CollapsibleExperience
                                structuredData={structuredData}
                                updateField={updateField}
                                addItem={addItem}
                                removeItem={removeItem}
                              />
                            )}
                            {sectionId === "projects" && (
                              <ProjectsSection
                                structuredData={structuredData}
                                updateField={updateField}
                                addItem={addItem}
                                removeItem={removeItem}
                              />
                            )}
                            {sectionId === "achievements" && (
                              <AchievementsSection
                                structuredData={structuredData}
                                updateArrayField={updateArrayField}
                              />
                            )}
                            {sectionId === "skills" && (
                              <SkillsSection
                                structuredData={structuredData}
                                updateArrayField={updateArrayField}
                              />
                            )}
                            {sectionId === "personalInfo" && (
                              <PersonalInfoSection
                                structuredData={structuredData}
                                updateField={updateField}
                              />
                            )}
                            {sectionId === "education" && (
                              <EducationSection
                                structuredData={structuredData}
                                updateField={updateField}
                                addItem={addItem}
                                removeItem={removeItem}
                              />
                            )}
                            {sectionId === "certifications" && (
                              <CertificationsSection
                                structuredData={structuredData}
                                updateArrayField={updateArrayField}
                              />
                            )}
                            {sectionId === "languages" && (
                              <LanguagesSection
                                structuredData={structuredData}
                                updateArrayField={updateArrayField}
                              />
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
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
                <ResumePreview data={structuredData} sectionOrder={sectionOrder} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
