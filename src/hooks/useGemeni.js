"use client";

import { useState } from "react";

export const useGemeni = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getGemeniResponse = async (prompt) => {
    setLoading(true);
    setError(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
      
      const response = await fetch(`${apiUrl}/gemeni/getresponse`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to get Gemini response");
      }

      if (data.success) {
        return data.response;
      } else {
        throw new Error(data.message || "Unknown error");
      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const structureResume = async (extractedText) => {
    const prompt = `You are a resume parser. Extract and structure the following resume text into organized sections. 
Return a JSON object with the following EXACT structure:
{
  "summary": "professional summary or objective",
  "experience": [
    {
      "title": "job title",
      "company": "company name",
      "location": "location if mentioned",
      "startDate": "start date",
      "endDate": "end date or 'Present'",
      "description": "job description and responsibilities"
    }
  ],
  "projects": [
    {
      "name": "project name",
      "description": "project description",
      "technologies": ["tech1", "tech2"]
    }
  ],
  "achievements": [
    "achievement 1",
    "achievement 2"
  ],
  "skills": ["skill1", "skill2", "skill3"]
}

Resume text to parse:
${extractedText}

IMPORTANT: 
- Extract ALL sections that are present in the resume
- For experience, projects, achievements, and skills - extract ALL entries, not just one
- If a section is not found, use an empty string "" or empty array []
- Return ONLY valid JSON, no additional text or markdown formatting
- Start directly with { and end with }`;

    try {
      const response = await getGemeniResponse(prompt);

      // Try to extract JSON from response
      let jsonText = response
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();

      // Find JSON object in response
      const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        jsonText = jsonMatch[0];
      }

      const structuredData = JSON.parse(jsonText);

      // Normalize data to the richer resume structure
      return {
        personalInfo: structuredData.personalInfo || {},
        summary: structuredData.summary || "",
        experience: Array.isArray(structuredData.experience)
          ? structuredData.experience
          : [],
        projects: Array.isArray(structuredData.projects)
          ? structuredData.projects
          : [],
        achievements: Array.isArray(structuredData.achievements)
          ? structuredData.achievements
          : [],
        skills: Array.isArray(structuredData.skills)
          ? structuredData.skills
          : [],
        education: Array.isArray(structuredData.education)
          ? structuredData.education
          : [],
        certifications: Array.isArray(structuredData.certifications)
          ? structuredData.certifications
          : [],
        languages: Array.isArray(structuredData.languages)
          ? structuredData.languages
          : [],
      };
    } catch (err) {
      console.error("Error structuring resume:", err);
      throw new Error("Failed to structure resume data: " + err.message);
    }
  };

  return {
    getGemeniResponse,
    structureResume,
    loading,
    error,
  };
};

