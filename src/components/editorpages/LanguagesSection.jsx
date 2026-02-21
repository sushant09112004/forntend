"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function LanguagesSection({ structuredData, updateArrayField }) {
  return (
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
  );
}
