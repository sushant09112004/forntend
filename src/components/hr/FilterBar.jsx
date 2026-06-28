"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function FilterBar({
  sortBy,
  onSortChange,
  locationFilter,
  onLocationChange,
  minMatch,
  onMinMatchChange,
  minExperience,
  onMinExperienceChange,
  locations = [],
}) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger className="w-[160px] rounded-full">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="match_desc">Highest Match</SelectItem>
          <SelectItem value="match_asc">Lowest Match</SelectItem>
          <SelectItem value="experience_desc">Experience ↓</SelectItem>
          <SelectItem value="experience_asc">Experience ↑</SelectItem>
          <SelectItem value="location">Location</SelectItem>
        </SelectContent>
      </Select>

      <Select value={locationFilter || "all"} onValueChange={onLocationChange}>
        <SelectTrigger className="w-[140px] rounded-full">
          <SelectValue placeholder="Location" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Locations</SelectItem>
          {locations.map((loc) => (
            <SelectItem key={loc} value={loc}>
              {loc}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500">Min Match</span>
        <Input
          type="number"
          min={0}
          max={100}
          value={minMatch}
          onChange={(e) => onMinMatchChange(Number(e.target.value) || 0)}
          className="h-9 w-20 rounded-full"
        />
        <span className="text-xs text-gray-500">%</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500">Min Exp</span>
        <Input
          type="number"
          min={0}
          step={0.5}
          value={minExperience}
          onChange={(e) => onMinExperienceChange(Number(e.target.value) || 0)}
          className="h-9 w-20 rounded-full"
        />
        <span className="text-xs text-gray-500">yrs</span>
      </div>
    </div>
  );
}

export function applyFilters(candidates, { sortBy, locationFilter, minMatch, minExperience }) {
  let filtered = [...candidates];

  if (locationFilter && locationFilter !== "all") {
    filtered = filtered.filter(
      (c) => c.location?.toLowerCase() === locationFilter.toLowerCase()
    );
  }

  if (minMatch > 0) {
    filtered = filtered.filter((c) => (c.match_score || 0) >= minMatch);
  }

  if (minExperience > 0) {
    filtered = filtered.filter((c) => (c.experience || 0) >= minExperience);
  }

  switch (sortBy) {
    case "match_asc":
      filtered.sort((a, b) => (a.match_score || 0) - (b.match_score || 0));
      break;
    case "experience_desc":
      filtered.sort((a, b) => (b.experience || 0) - (a.experience || 0));
      break;
    case "experience_asc":
      filtered.sort((a, b) => (a.experience || 0) - (b.experience || 0));
      break;
    case "location":
      filtered.sort((a, b) =>
        (a.location || "").localeCompare(b.location || "")
      );
      break;
    default:
      filtered.sort((a, b) => (b.match_score || 0) - (a.match_score || 0));
  }

  return filtered;
}

export function extractLocations(candidates) {
  const set = new Set();
  candidates.forEach((c) => {
    if (c.location) set.add(c.location);
  });
  return Array.from(set).sort();
}
