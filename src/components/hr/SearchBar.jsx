"use client";

import { Loader2, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const EXAMPLES = [
  "Senior React Developer",
  "Flutter Developer with Firebase",
  "AI Engineer with LangChain",
  "Golang Backend Developer",
  "Robotics Engineer",
  "Android Developer",
];

export function SearchBar({
  query,
  onQueryChange,
  onSearch,
  onClear,
  isLoading,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && !isLoading) onSearch();
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Describe the candidate you are looking for..."
          rows={4}
          className="min-h-[120px] resize-none rounded-2xl border-gray-200 bg-white text-base shadow-sm focus-visible:border-gray-400 focus-visible:ring-gray-100"
          disabled={isLoading}
        />
        <div className="flex flex-wrap gap-3">
          <Button
            type="submit"
            disabled={!query.trim() || isLoading}
            className="rounded-full bg-black px-6 hover:bg-gray-800"
          >
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="size-4" />
                Search
              </>
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onClear}
            disabled={isLoading}
            className="rounded-full"
          >
            <X className="size-4" />
            Clear
          </Button>
        </div>
      </form>

      <div className="flex flex-wrap gap-2">
        {EXAMPLES.map((example) => (
          <button
            key={example}
            type="button"
            onClick={() => onQueryChange(example)}
            disabled={isLoading}
            className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-600 transition-colors hover:border-gray-400 hover:bg-gray-50 hover:text-black disabled:opacity-50"
          >
            {example}
          </button>
        ))}
      </div>
    </div>
  );
}
