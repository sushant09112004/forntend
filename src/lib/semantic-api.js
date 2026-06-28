const SEMANTIC_API_URL =
  process.env.NEXT_PUBLIC_SEMANTIC_API_URL ||
  "https://sementicfinalproject-production.up.railway.app";

export async function searchCandidates(query) {
  const res = await fetch(`${SEMANTIC_API_URL}/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.detail || data.message || "Search failed");
  }

  return res.json();
}

export async function getCandidateById(candidateId) {
  const res = await fetch(`${SEMANTIC_API_URL}/candidate/${candidateId}`);

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.detail || data.message || "Failed to load candidate");
  }

  const raw = await res.json();
  return normalizeCandidateDetail(raw);
}

export function normalizeCandidateDetail(raw) {
  const output = raw.output || {};
  const candidate = output.candidate || {};
  const summary = output.summary || {};
  const fitScore = output.fit_score || {};

  const firstName = candidate.first_name || "";
  const lastName = candidate.last_name || "";
  const name = `${firstName} ${lastName}`.trim() || "Unknown";

  return {
    id: raw._id,
    name,
    email: candidate.email || "",
    phone: candidate.phone || "",
    location: candidate.location || "",
    expectedSalary: candidate.expected_salary || "",
    noticePeriod: candidate.notice_period || "",
    yearsExperience: summary.years_experience || raw.exp_years_num || "",
    currentRole: summary.current_role || "",
    technicalSkills: summary.technical_skills || [],
    keyAchievements: summary.key_achievements || [],
    fitScore: fitScore.overall || "",
    reasoning: Array.isArray(fitScore.reasoning)
      ? fitScore.reasoning.join(". ")
      : fitScore.reasoning || "",
    searchText: raw.search_text || "",
  };
}
