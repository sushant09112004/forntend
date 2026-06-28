"use client";

import React, { useState } from "react";
import { Check, Loader2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { addToShortlist } from "@/lib/shortlist-api";

export function ShortlistButton({
  candidate,
  sourceQuery,
  isShortlisted,
  onShortlisted,
  size = "default",
}) {
  const [loading, setLoading] = useState(false);

  const handleShortlist = async () => {
    if (isShortlisted || loading) return;

    setLoading(true);
    try {
      await addToShortlist({
        candidate_id: candidate.id,
        source_query: sourceQuery,
        candidate_snapshot: {
          name: candidate.name,
          experience: candidate.experience,
          location: candidate.location,
          match_score: candidate.match_score,
          matched_skills: candidate.matched_skills,
          reason: candidate.reason,
        },
      });
      toast.success(`${candidate.name} added to shortlist`);
      onShortlisted?.(candidate.id);
    } catch (error) {
      if (error.alreadyShortlisted) {
        toast.info("Candidate already shortlisted");
        onShortlisted?.(candidate.id);
      } else {
        toast.error(error.message || "Failed to shortlist");
      }
    } finally {
      setLoading(false);
    }
  };

  if (isShortlisted) {
    return (
      <Button
        variant="secondary"
        size={size}
        disabled
        className="rounded-full bg-gray-100 text-gray-700"
      >
        <Check className="size-4" />
        Already Shortlisted
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size={size}
      onClick={handleShortlist}
      disabled={loading}
      className="rounded-full border-gray-200 text-black hover:bg-gray-50"
    >
      {loading ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Star className="size-4" />
      )}
      Shortlist
    </Button>
  );
}
