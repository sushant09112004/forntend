"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Briefcase, Calendar, MapPin, Star, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EmptyState } from "@/components/hr/EmptyState";
import { LoadingSkeleton } from "@/components/hr/LoadingSkeleton";
import { ScoreProgress } from "@/components/hr/ScoreProgress";
import { SkillBadgeList } from "@/components/hr/SkillBadge";
import { CandidateDetailsModal } from "@/components/hr/CandidateDetailsModal";
import {
  fetchShortlisted,
  removeFromShortlist,
  updateShortlistNotes,
} from "@/lib/shortlist-api";

export default function HRShortlistedPage() {
  const queryClient = useQueryClient();
  const [detailsId, setDetailsId] = useState(null);
  const [removeTarget, setRemoveTarget] = useState(null);
  const [editingNotes, setEditingNotes] = useState({});

  const { data: shortlisted = [], isLoading } = useQuery({
    queryKey: ["shortlisted"],
    queryFn: fetchShortlisted,
  });

  const removeMutation = useMutation({
    mutationFn: removeFromShortlist,
    onSuccess: () => {
      toast.success("Removed from shortlist");
      queryClient.invalidateQueries({ queryKey: ["shortlisted"] });
      queryClient.invalidateQueries({ queryKey: ["shortlisted-ids"] });
      setRemoveTarget(null);
    },
    onError: (error) => toast.error(error.message),
  });

  const notesMutation = useMutation({
    mutationFn: ({ id, notes }) => updateShortlistNotes(id, notes),
    onSuccess: () => {
      toast.success("Notes saved");
      queryClient.invalidateQueries({ queryKey: ["shortlisted"] });
    },
    onError: (error) => toast.error(error.message),
  });

  const handleSaveNotes = (id) => {
    notesMutation.mutate({ id, notes: editingNotes[id] ?? "" });
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <LoadingSkeleton count={3} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-black">
          Shortlisted Candidates
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          {shortlisted.length} candidate{shortlisted.length !== 1 ? "s" : ""}{" "}
          in your shortlist
        </p>
      </div>

      {shortlisted.length === 0 ? (
        <EmptyState
          title="No shortlisted candidates yet"
          description="Search for candidates and click Shortlist to save them here."
          icon={Star}
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {shortlisted.map((item) => {
            const snap = item.candidate_snapshot || {};
            return (
              <Card
                key={item._id}
                className="rounded-2xl border-gray-200 shadow-sm"
              >
                <CardHeader className="flex flex-row items-start justify-between gap-3 pb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-black">
                      {snap.name || "Unknown"}
                    </h3>
                    <div className="mt-1 flex flex-wrap gap-3 text-sm text-gray-500">
                      {snap.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="size-3.5" />
                          {snap.location}
                        </span>
                      )}
                      {snap.experience != null && (
                        <span className="flex items-center gap-1">
                          <Briefcase className="size-3.5" />
                          {snap.experience} yrs
                        </span>
                      )}
                    </div>
                  </div>
                  {snap.match_score != null && (
                    <ScoreProgress score={snap.match_score} size="sm" />
                  )}
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Calendar className="size-3.5" />
                    Shortlisted{" "}
                    {new Date(item.shortlisted_at).toLocaleDateString()}
                  </div>

                  {snap.matched_skills?.length > 0 && (
                    <SkillBadgeList skills={snap.matched_skills} />
                  )}

                  {snap.reason && (
                    <p className="line-clamp-2 text-xs text-gray-600">
                      {snap.reason}
                    </p>
                  )}

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-500">
                      Notes
                    </label>
                    <Textarea
                      value={
                        editingNotes[item._id] !== undefined
                          ? editingNotes[item._id]
                          : item.notes || ""
                      }
                      onChange={(e) =>
                        setEditingNotes((prev) => ({
                          ...prev,
                          [item._id]: e.target.value,
                        }))
                      }
                      placeholder="Add notes about this candidate..."
                      rows={2}
                      className="resize-none rounded-xl text-sm"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSaveNotes(item._id)}
                      disabled={notesMutation.isPending}
                      className="rounded-full"
                    >
                      Save Notes
                    </Button>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => setDetailsId(item.candidate_id)}
                      className="flex-1 rounded-full bg-black hover:bg-gray-800"
                    >
                      View Details
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setRemoveTarget(item)}
                      className="rounded-full text-gray-600 hover:bg-gray-50"
                    >
                      <Trash2 className="size-4" />
                      Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <CandidateDetailsModal
        candidateId={detailsId}
        open={!!detailsId}
        onOpenChange={(open) => !open && setDetailsId(null)}
      />

      <Dialog open={!!removeTarget} onOpenChange={() => setRemoveTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove from shortlist?</DialogTitle>
            <DialogDescription>
              This will remove{" "}
              <strong>{removeTarget?.candidate_snapshot?.name}</strong> from your
              shortlist. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRemoveTarget(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => removeMutation.mutate(removeTarget._id)}
              disabled={removeMutation.isPending}
            >
              Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
