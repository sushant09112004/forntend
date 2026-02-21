"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function CertificationsSection({ structuredData, updateArrayField }) {
  return (
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
          onChange={(e) => updateArrayField("certifications", e.target.value)}
          placeholder="AWS Certified, Google Cloud Professional, ..."
        />
      </CardContent>
    </Card>
  );
}
