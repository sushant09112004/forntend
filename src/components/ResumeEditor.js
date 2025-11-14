"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import ResumePreview from "./ResumePreview";

// Dynamically import DragDropContext to avoid SSR issues
const DragDropContext = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.DragDropContext),
  { ssr: false }
);
const Droppable = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.Droppable),
  { ssr: false }
);
const Draggable = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.Draggable),
  { ssr: false }
);

const ResumeEditor = ({ initialData }) => {
  const [resumeData, setResumeData] = useState(initialData);
  const [selectedFormat, setSelectedFormat] = useState("modern");
  const [activeSection, setActiveSection] = useState(null);
  const [sections, setSections] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Initialize sections array from resumeData
    const sectionOrder = [
      { id: "personalInfo", name: "Personal Information", editable: true },
      { id: "summary", name: "Summary", editable: true },
      { id: "experience", name: "Experience", editable: true },
      { id: "education", name: "Education", editable: true },
      { id: "skills", name: "Skills", editable: true },
      { id: "projects", name: "Projects", editable: true },
      { id: "certifications", name: "Certifications", editable: true },
      { id: "languages", name: "Languages", editable: true },
    ];
    setSections(sectionOrder);
  }, []);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSections(items);
  };

  const updateSection = (sectionId, data) => {
    setResumeData((prev) => ({
      ...prev,
      [sectionId]: data,
    }));
  };

  const updateField = (sectionId, field, value) => {
    setResumeData((prev) => {
      if (Array.isArray(prev[sectionId])) {
        return {
          ...prev,
          [sectionId]: prev[sectionId].map((item, index) =>
            index === field ? { ...item, ...value } : item
          ),
        };
      } else if (typeof prev[sectionId] === "object" && prev[sectionId] !== null) {
        return {
          ...prev,
          [sectionId]: {
            ...prev[sectionId],
            [field]: value,
          },
        };
      } else {
        return {
          ...prev,
          [sectionId]: value,
        };
      }
    });
  };

  const addItem = (sectionId) => {
    const templates = {
      experience: {
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
      },
      education: {
        degree: "",
        institution: "",
        location: "",
        graduationDate: "",
        gpa: "",
      },
      projects: {
        name: "",
        description: "",
        technologies: [],
      },
    };

    setResumeData((prev) => ({
      ...prev,
      [sectionId]: [...(prev[sectionId] || []), templates[sectionId] || {}],
    }));
  };

  const removeItem = (sectionId, index) => {
    setResumeData((prev) => ({
      ...prev,
      [sectionId]: prev[sectionId].filter((_, i) => i !== index),
    }));
  };

  const renderSectionEditor = (section) => {
    const data = resumeData[section.id];

    if (!data) return null;

    switch (section.id) {
      case "personalInfo":
        return (
          <div className="space-y-4">
            {Object.entries(data).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                <input
                  type="text"
                  value={value || ""}
                  onChange={(e) => updateField("personalInfo", key, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                />
              </div>
            ))}
          </div>
        );

      case "summary":
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Summary
            </label>
            <textarea
              value={data || ""}
              onChange={(e) => updateSection("summary", e.target.value)}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            />
          </div>
        );

      case "experience":
      case "education":
      case "projects":
        return (
          <div className="space-y-4">
            {data.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
              >
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                    Item {index + 1}
                  </h4>
                  <button
                    onClick={() => removeItem(section.id, index)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove
                  </button>
                </div>
                {Object.entries(item).map(([key, value]) => (
                  <div key={key} className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")}
                    </label>
                    {Array.isArray(value) ? (
                      <input
                        type="text"
                        value={value.join(", ")}
                        onChange={(e) =>
                          updateField(section.id, index, {
                            [key]: e.target.value.split(", ").filter((v) => v),
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                        placeholder="Comma separated values"
                      />
                    ) : (
                      <input
                        type="text"
                        value={value || ""}
                        onChange={(e) =>
                          updateField(section.id, index, { [key]: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                      />
                    )}
                  </div>
                ))}
              </div>
            ))}
            <button
              onClick={() => addItem(section.id)}
              className="w-full py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-blue-500 hover:text-blue-500 transition-colors"
            >
              + Add {section.name} Item
            </button>
          </div>
        );

      case "skills":
      case "certifications":
      case "languages":
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {section.name} (comma separated)
            </label>
            <input
              type="text"
              value={Array.isArray(data) ? data.join(", ") : ""}
              onChange={(e) =>
                updateSection(
                  section.id,
                  e.target.value.split(", ").filter((v) => v.trim())
                )
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
              placeholder="e.g., JavaScript, React, Node.js"
            />
          </div>
        );

      default:
        return null;
    }
  };

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Resume Editor
            </h1>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <select
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
              >
                <option value="modern">Modern Format</option>
                <option value="classic">Classic Format</option>
              </select>
              <button
                onClick={() => {
                  sessionStorage.setItem("resumeData", JSON.stringify(resumeData));
                  alert("Resume saved!");
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Resume
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - Section Editor */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Edit Sections
            </h2>

            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="sections">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                    {sections.map((section, index) => (
                      <Draggable
                        key={section.id}
                        draggableId={section.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`border rounded-lg p-4 ${
                              snapshot.isDragging
                                ? "bg-blue-50 dark:bg-blue-900/20 border-blue-300"
                                : "bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                            }`}
                          >
                            <div
                              {...provided.dragHandleProps}
                              className="flex items-center justify-between mb-3 cursor-move"
                            >
                              <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                                {section.name}
                              </h3>
                              <svg
                                className="w-5 h-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 8h16M4 16h16"
                                />
                              </svg>
                            </div>
                            {activeSection === section.id ? (
                              <div className="space-y-3">
                                {renderSectionEditor(section)}
                                <button
                                  onClick={() => setActiveSection(null)}
                                  className="text-sm text-blue-600 hover:text-blue-800"
                                >
                                  Collapse
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setActiveSection(section.id)}
                                className="text-sm text-blue-600 hover:text-blue-800"
                              >
                                Edit Section
                              </button>
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

          {/* Right Panel - Preview */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Preview
            </h2>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-900 overflow-auto max-h-[800px]">
              <ResumePreview data={resumeData} format={selectedFormat} sections={sections} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeEditor;
