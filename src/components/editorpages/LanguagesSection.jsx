"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function LanguagesSection({ structuredData, updateArrayField }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-300 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left"
      >
        <span className="font-medium text-lg">Languages</span>
        <span className="text-xl">{isOpen ? "-" : "+"}</span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[1000px] mt-2" : "max-h-0"
        }`}
      >
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
          onChange={(e) => updateArrayField("languages", e.target.value)}
          placeholder="English, Spanish, French, ..."
        />
      </CardContent>
    </Card>
      </div>
    </div>
  );
}
