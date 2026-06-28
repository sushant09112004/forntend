"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AlertCircle, RefreshCw, Users } from "lucide-react";
import { toast } from "sonner";
import { SearchBar } from "@/components/hr/SearchBar";
import { SearchHistory } from "@/components/hr/SearchHistory";
import { FilterBar, applyFilters, extractLocations } from "@/components/hr/FilterBar";
import { CandidateCard } from "@/components/hr/CandidateCard";
import { CandidateDetailsModal } from "@/components/hr/CandidateDetailsModal";
import { EmptyState } from "@/components/hr/EmptyState";
import { LoadingSkeleton } from "@/components/hr/LoadingSkeleton";
import { Button } from "@/components/ui/button";
import { searchCandidates } from "@/lib/semantic-api";
import { fetchShortlistedIds } from "@/lib/shortlist-api";
import { addSearchHistory, getSearchHistory } from "@/lib/search-history";

export default function HRSearchPage() {
  const queryClient = useQueryClient();
  const [query, setQuery] = useState("");
  const [activeQuery, setActiveQuery] = useState("");
  const [results, setResults] = useState([]);
  const [rejectedIds, setRejectedIds] = useState(new Set());
  const [history, setHistory] = useState([]);
  const [detailsId, setDetailsId] = useState(null);
  const [sortBy, setSortBy] = useState("match_desc");
  const [locationFilter, setLocationFilter] = useState("all");
  const [minMatch, setMinMatch] = useState(0);
  const [minExperience, setMinExperience] = useState(0);

  useEffect(() => {
    setHistory(getSearchHistory());
  }, []);

  const { data: shortlistedIds = [] } = useQuery({
    queryKey: ["shortlisted-ids"],
    queryFn: fetchShortlistedIds,
  });

  const shortlistedSet = useMemo(
    () => new Set(shortlistedIds),
    [shortlistedIds]
  );

  const searchMutation = useMutation({
    mutationFn: searchCandidates,
    onSuccess: (data) => {
      setResults(data.results || []);
      setRejectedIds(new Set());
      const updated = addSearchHistory(data.query || activeQuery);
      setHistory(updated);
      toast.success(`Found ${data.result_count || 0} candidates`);
    },
    onError: (error) => {
      toast.error(error.message || "Search failed");
    },
  });

  const runSearch = useCallback(
    (searchQuery) => {
      const q = (searchQuery || query).trim();
      if (!q) return;
      setActiveQuery(q);
      setQuery(q);
      searchMutation.mutate(q);
    },
    [query, searchMutation]
  );

  const handleClear = () => {
    setQuery("");
    setActiveQuery("");
    setResults([]);
    setRejectedIds(new Set());
  };

  const handleReject = (id) => {
    setRejectedIds((prev) => new Set([...prev, id]));
  };

  const handleShortlisted = (id) => {
    queryClient.invalidateQueries({ queryKey: ["shortlisted-ids"] });
    queryClient.invalidateQueries({ queryKey: ["shortlisted"] });
  };

  const visibleCandidates = useMemo(() => {
    const filtered = results.filter((c) => !rejectedIds.has(c.id));
    return applyFilters(filtered, {
      sortBy,
      locationFilter,
      minMatch,
      minExperience,
    });
  }, [results, rejectedIds, sortBy, locationFilter, minMatch, minExperience]);

  const locations = useMemo(
    () => extractLocations(results),
    [results]
  );

  const hasSearched = searchMutation.isSuccess || searchMutation.isError;
  const isLoading = searchMutation.isPending;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-black">
          Candidate Search
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Describe your ideal candidate in natural language
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="space-y-3">
          <h2 className="text-sm font-medium text-gray-700">Search History</h2>
          <SearchHistory
            history={history}
            activeQuery={activeQuery}
            onSelect={(item) => runSearch(item)}
          />
        </aside>

        <div className="space-y-6">
          <SearchBar
            query={query}
            onQueryChange={setQuery}
            onSearch={() => runSearch()}
            onClear={handleClear}
            isLoading={isLoading}
          />

          {isLoading && <LoadingSkeleton count={6} />}

          {searchMutation.isError && (
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center">
              <AlertCircle className="mx-auto mb-3 size-8 text-gray-500" />
              <p className="text-sm text-gray-700">{searchMutation.error.message}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => runSearch()}
                className="mt-4 rounded-full"
              >
                <RefreshCw className="size-4" />
                Retry
              </Button>
            </div>
          )}

          {!isLoading && hasSearched && results.length > 0 && (
            <>
              <FilterBar
                sortBy={sortBy}
                onSortChange={setSortBy}
                locationFilter={locationFilter}
                onLocationChange={setLocationFilter}
                minMatch={minMatch}
                onMinMatchChange={setMinMatch}
                minExperience={minExperience}
                onMinExperienceChange={setMinExperience}
                locations={locations}
              />

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Users className="size-4" />
                {visibleCandidates.length} candidate
                {visibleCandidates.length !== 1 ? "s" : ""} shown
              </div>

              {visibleCandidates.length === 0 ? (
                <EmptyState
                  title="No candidates match filters"
                  description="Try adjusting your filters or run a new search."
                />
              ) : (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-2">
                  {visibleCandidates.map((candidate) => (
                    <CandidateCard
                      key={candidate.id}
                      candidate={candidate}
                      sourceQuery={activeQuery}
                      isShortlisted={shortlistedSet.has(candidate.id)}
                      onShortlisted={handleShortlisted}
                      onViewDetails={setDetailsId}
                      onReject={handleReject}
                    />
                  ))}
                </div>
              )}
            </>
          )}

          {!isLoading && !hasSearched && (
            <EmptyState
              title="Search candidates using natural language"
              description='Try "Backend Python developer with FastAPI and MongoDB having 3+ years experience in Pune."'
            />
          )}

          {!isLoading &&
            hasSearched &&
            results.length === 0 &&
            !searchMutation.isError && (
              <EmptyState
                title="No candidates found"
                description="Try broadening your search criteria or using different keywords."
              />
            )}
        </div>
      </div>

      <CandidateDetailsModal
        candidateId={detailsId}
        open={!!detailsId}
        onOpenChange={(open) => !open && setDetailsId(null)}
      />
    </div>
  );
}
