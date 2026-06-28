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
        throw new Error(data.message || data.error || "Failed to get Gemini response");
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
  "personalInfo": {
    "name": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "website": ""
  },
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
  "education": [
    {
      "degree": "",
      "institution": "",
      "location": "",
      "graduationDate": "",
      "gpa": ""
    }
  ],
  "skills": ["skill1", "skill2", "skill3"],
  "projects": [
    {
      "name": "project name",
      "description": "project description",
      "technologies": ["tech1", "tech2"]
    }
  ],
  "certifications": [],
  "languages": [],
  "achievements": [
    "achievement 1",
    "achievement 2"
  ]
}

Resume text to parse:
${extractedText}

IMPORTANT: 
- Extract ALL sections that are present in the resume
- For experience, projects, achievements, and skills - extract ALL entries, not just one
- If a section is not found, use an empty string "" or empty array []
- Return ONLY valid JSON, no additional text or markdown formatting
- Do not include markdown, code fences, or extra explanation
- Start directly with { and end with }`;

    const extractJsonText = (text) => {
      if (typeof text !== "string") return "";

      const cleaned = text
        .replace(/```json\s*/g, "")
        .replace(/```/g, "")
        .replace(/[“”]/g, '"')
        .trim();

      const startIndex = cleaned.indexOf("{");
      if (startIndex === -1) {
        return cleaned;
      }

      let depth = 0;
      for (let i = startIndex; i < cleaned.length; i += 1) {
        const char = cleaned[i];
        if (char === "{") depth += 1;
        if (char === "}") depth -= 1;
        if (depth === 0) {
          return cleaned.slice(startIndex, i + 1).trim();
        }
      }

      return cleaned.slice(startIndex).trim();
    };

    const cleanJsonResponse = (text) => {
      let jsonText = extractJsonText(text);

      jsonText = jsonText
        .replace(/,\s*([\]}])/g, "$1")
        .replace(/([{,]\s*)'([^']+?)'\s*:/g, '$1"$2":')
        .replace(/:\s*'([^']*?)'/g, ': "$1"')
        .replace(/([\[{,]\s*)([A-Za-z0-9_]+)\s*:/g, '$1"$2":')
        .replace(/\r?\n/g, " ")
        .replace(/\s+/g, " ")
        .trim();

      return jsonText;
    };

    const balanceQuotes = (text) => {
      let quoteCount = 0;
      let escaped = false;

      for (let i = 0; i < text.length; i += 1) {
        const char = text[i];
        if (char === "\\" && !escaped) {
          escaped = true;
          continue;
        }
        if (char === '"' && !escaped) {
          quoteCount += 1;
        }
        escaped = false;
      }

      if (quoteCount % 2 !== 0) {
        return text + '"';
      }
      return text;
    };

    const balanceBrackets = (text) => {
      const stack = [];
      let inString = false;
      let escaped = false;

      for (let i = 0; i < text.length; i += 1) {
        const char = text[i];
        if (char === "\\" && !escaped) {
          escaped = true;
          continue;
        }
        if (char === '"' && !escaped) {
          inString = !inString;
        }
        if (!inString) {
          if (char === "{") stack.push("}");
          if (char === "[") stack.push("]");
          if ((char === "}" || char === "]") && stack.length > 0) {
            const expected = stack.pop();
            if (char !== expected) {
              stack.push(expected);
            }
          }
        }
        escaped = false;
      }

      return text + stack.reverse().join("");
    };

    const repairJsonString = (jsonText) => {
      let repaired = cleanJsonResponse(jsonText);
      repaired = balanceQuotes(repaired);
      repaired = balanceBrackets(repaired);
      repaired = repaired.replace(/\bnull\b/gi, "null");
      repaired = repaired.replace(/\bundefined\b/gi, "null");
      repaired = repaired.replace(/\,(\s*[}\]])/g, "$1");
      return repaired;
    };

    const parseJsonString = (jsonText) => {
      try {
        return JSON.parse(jsonText);
      } catch (parseError) {
        const cleaned = cleanJsonResponse(jsonText);
        try {
          return JSON.parse(cleaned);
        } catch (secondError) {
          const repaired = repairJsonString(jsonText);
          try {
            return JSON.parse(repaired);
          } catch (thirdError) {
            try {
              // Last resort: parse the string as a JavaScript object literal.
              // This helps recover from trailing commas and unquoted keys.
              // eslint-disable-next-line no-new-func
              return new Function(`return (${repaired})`)();
            } catch (fallbackError) {
              throw new Error(
                `Invalid JSON response from AI. Parsing failed: ${parseError.message}`
              );
            }
          }
        }
      }
    };

    try {
      const response = await getGemeniResponse(prompt);

      let jsonText = cleanJsonResponse(response);
      const structuredData = parseJsonString(jsonText);

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

