"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function EducationSection({ structuredData, updateField, addItem, removeItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-300 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left"
      >
        <span className="font-medium text-lg">Education</span>
        <span className="text-xl">{isOpen ? "-" : "+"}</span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[1000px] mt-2" : "max-h-0"
        }`}
      >
        <Card>
      <CardHeader>
        <CardTitle>Education</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {structuredData.education?.map((edu, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-3 relative">
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
                  onChange={(e) => updateField("education", index, "degree", e.target.value)}
                />
              </div>
              <div>
                <Label>Institution</Label>
                <Input
                  value={edu.institution || ""}
                  onChange={(e) => updateField("education", index, "institution", e.target.value)}
                />
              </div>
              <div>
                <Label>Location</Label>
                <Input
                  value={edu.location || ""}
                  onChange={(e) => updateField("education", index, "location", e.target.value)}
                />
              </div>
              <div>
                <Label>Graduation Date</Label>
                <Input
                  value={edu.graduationDate || ""}
                  onChange={(e) => updateField("education", index, "graduationDate", e.target.value)}
                />
              </div>
              <div>
                <Label>GPA</Label>
                <Input
                  value={edu.gpa || ""}
                  onChange={(e) => updateField("education", index, "gpa", e.target.value)}
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
      </div>
    </div>
  );
}
