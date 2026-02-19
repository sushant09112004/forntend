"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function CollapsibleExperience({
  structuredData,
  updateField,
  addItem,
  removeItem,
  onChange,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-300 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left"
      >
        <span className="font-medium text-lg">Experience</span>
        <span className="text-xl">{isOpen ? "-" : "+"}</span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[1000px] mt-2" : "max-h-0"

        }`}
      >
        <Card>
          <CardHeader>
            <CardTitle>Experience</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {structuredData.experience?.map((exp, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
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
        </Card>
      </div>
    </div>
  );
}
