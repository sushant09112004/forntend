"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function SkillsSection({ structuredData, updateArrayField }) {
  return (
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
  );
}
