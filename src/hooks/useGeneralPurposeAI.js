"use client";

import { useState } from "react";

const RESUME_AI_SYSTEM_PROMPT = `You are a resume editor. Your job is to improve the given text for use on a resume.
RULES (follow strictly):
- Keep the reply SHORT: 1-4 bullet points or 2-4 concise sentences maximum. Resume space is limited.
- Be direct and impactful. No filler, no "I believe", no long intros or conclusions.
- Use strong action verbs and metrics where relevant.
- Output ONLY the improved text. No explanations, no "Here is...", no markdown unless it's bullet points.
- Preserve the original meaning; only refine wording and impact.`;

/**
 * Builds the full prompt sent to Gemini when resume context is provided.
 * @param {string} userMessage - Predefined option label or custom user text
 * @param {string} [context] - Resume/section text sent as context
 * @returns {string} Full prompt
 */
function buildResumePrompt(userMessage, context) {
  if (!context || !context.trim()) {
    return userMessage;
  }
  return `${RESUME_AI_SYSTEM_PROMPT}\n\n--- RESUME CONTEXT (text to improve) ---\n${context}\n\n--- USER REQUEST ---\n${userMessage}`;
}

export const useGeneralPurposeAI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  /**
   * @param {string} input - User message (predefined option or custom text)
   * @param {string} [context] - Optional resume/section context for strict resume-style response
   */
  const generate = async (input, context) => {
    setLoading(true);
    setError(null);
    setData(null);

    const prompt = context ? buildResumePrompt(input, context) : input;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

      const res = await fetch(`${apiUrl}/gemeni/getresponse`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.message || "Something went wrong");
      }

      setData(result.response);
      return result.response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    generate,
    data,
    loading,
    error,
  };
};