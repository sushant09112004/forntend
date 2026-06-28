const STORAGE_KEY = "hr_search_history";
const MAX_HISTORY = 10;

export function getSearchHistory() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addSearchHistory(query) {
  if (typeof window === "undefined" || !query?.trim()) return [];
  const trimmed = query.trim();
  const existing = getSearchHistory().filter((q) => q !== trimmed);
  const updated = [trimmed, ...existing].slice(0, MAX_HISTORY);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export function clearSearchHistory() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
