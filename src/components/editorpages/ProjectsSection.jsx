"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GeminieDialog } from "./Generalcomponents/GeminieDailog";

export default function ProjectsSection({ structuredData, updateField, addItem, removeItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-300 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left"
      >
        <span className="font-medium text-lg">Projects</span>
        <span className="text-xl">{isOpen ? "-" : "+"}</span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[1000px] mt-2" : "max-h-0"
        }`}
      >
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
              <div className="flex items-center justify-between gap-2">
                <Label>Description</Label>
                <GeminieDialog
                  context={[
                    project.name && `Project: ${project.name}`,
                    project.description && `Current: ${project.description}`,
                  ]
                    .filter(Boolean)
                    .join("\n")}
                  onResult={(text) =>
                    updateField("projects", index, "description", text)
                  }
                  placeholder="e.g. emphasize impact, add tech stack..."
                  sectionLabel="Edit description with AI"
                />
              </div>
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
      </div>
    </div>
  );
}
