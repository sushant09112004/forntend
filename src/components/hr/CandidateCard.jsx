"use client";

import { Briefcase, MapPin, Eye, GitCompare, X } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScoreProgress } from "./ScoreProgress";
import { SkillBadgeList } from "./SkillBadge";
import { ReasonCard } from "./ReasonCard";
import { ScoreBreakdown } from "./ScoreBreakdown";
import { ShortlistButton } from "./ShortlistButton";

export function CandidateCard({
  candidate,
  sourceQuery,
  isShortlisted,
  onShortlisted,
  onViewDetails,
  onReject,
}) {
  return (
    <Card className="group rounded-2xl border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
      <CardHeader className="flex flex-row items-start justify-between gap-4 pb-3">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-lg font-semibold text-black">
            {candidate.name}
          </h3>
          <div className="mt-1.5 flex flex-wrap items-center gap-3 text-sm text-gray-500">
            {candidate.location && (
              <span className="flex items-center gap-1">
                <MapPin className="size-3.5" />
                {candidate.location}
              </span>
            )}
            {candidate.experience != null && (
              <span className="flex items-center gap-1">
                <Briefcase className="size-3.5" />
                {candidate.experience} yrs
              </span>
            )}
          </div>
        </div>
        <ScoreProgress score={candidate.match_score} size="md" />
      </CardHeader>

      <CardContent className="space-y-4">
        {candidate.matched_skills?.length > 0 && (
          <div>
            <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-gray-400">
              Matched Skills
            </p>
            <SkillBadgeList skills={candidate.matched_skills} />
          </div>
        )}

        {candidate.matched_concepts?.length > 0 && (
          <div>
            <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-gray-400">
              Matched Concepts
            </p>
            <SkillBadgeList
              skills={candidate.matched_concepts}
              variant="concept"
            />
          </div>
        )}

        <ReasonCard reason={candidate.reason} />
        <ScoreBreakdown breakdown={candidate.score_breakdown} />

        <div className="flex flex-wrap gap-2 pt-1">
          <Button
            variant="default"
            size="sm"
            onClick={() => onViewDetails(candidate.id)}
            className="rounded-full bg-black hover:bg-gray-800"
          >
            <Eye className="size-4" />
            View Details
          </Button>
          <ShortlistButton
            candidate={candidate}
            sourceQuery={sourceQuery}
            isShortlisted={isShortlisted}
            onShortlisted={onShortlisted}
            size="sm"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => onReject(candidate.id)}
            className="rounded-full text-gray-600 hover:bg-gray-50 hover:text-gray-700"
          >
            <X className="size-4" />
            Reject
          </Button>
          <Button
            variant="ghost"
            size="sm"
            disabled
            className="rounded-full text-gray-400"
            title="Coming soon"
          >
            <GitCompare className="size-4" />
            Compare
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
