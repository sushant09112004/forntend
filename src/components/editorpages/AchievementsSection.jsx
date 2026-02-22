"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function AchievementsSection({ structuredData, updateArrayField }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-300 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left"
      >
        <span className="font-medium text-lg">Achievements</span>
        <span className="text-xl">{isOpen ? "-" : "+"}</span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[1000px] mt-2" : "max-h-0"
        }`}
      >
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
      </div>
    </div>
  );
}
