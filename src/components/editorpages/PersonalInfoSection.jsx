"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function PersonalInfoSection({ structuredData, updateField }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Name</Label>
            <Input
              value={structuredData.personalInfo?.name || ""}
              onChange={(e) =>
                updateField("personalInfo", null, "name", e.target.value)
              }
              placeholder="Your Name"
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              value={structuredData.personalInfo?.email || ""}
              onChange={(e) =>
                updateField("personalInfo", null, "email", e.target.value)
              }
              placeholder="your.email@example.com"
            />
          </div>
          <div>
            <Label>Phone</Label>
            <Input
              value={structuredData.personalInfo?.phone || ""}
              onChange={(e) =>
                updateField("personalInfo", null, "phone", e.target.value)
              }
              placeholder="+1 (555) 123-4567"
            />
          </div>
          <div>
            <Label>Location</Label>
            <Input
              value={structuredData.personalInfo?.location || ""}
              onChange={(e) =>
                updateField("personalInfo", null, "location", e.target.value)
              }
              placeholder="City, State"
            />
          </div>
          <div>
            <Label>LinkedIn</Label>
            <Input
              value={structuredData.personalInfo?.linkedin || ""}
              onChange={(e) =>
                updateField("personalInfo", null, "linkedin", e.target.value)
              }
              placeholder="linkedin.com/in/yourprofile"
            />
          </div>
          <div>
            <Label>Website</Label>
            <Input
              value={structuredData.personalInfo?.website || ""}
              onChange={(e) =>
                updateField("personalInfo", null, "website", e.target.value)
              }
              placeholder="yourwebsite.com"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
