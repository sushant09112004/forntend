const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

function getAuthHeaders() {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function handleResponse(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }
  return data;
}

export async function fetchShortlistedIds() {
  const res = await fetch(`${API_URL}/hr/shortlist/ids`, {
    headers: getAuthHeaders(),
  });
  const data = await handleResponse(res);
  return data.data || [];
}

export async function fetchShortlisted() {
  const res = await fetch(`${API_URL}/hr/shortlist`, {
    headers: getAuthHeaders(),
  });
  const data = await handleResponse(res);
  return data.data || [];
}

export async function addToShortlist(payload) {
  const res = await fetch(`${API_URL}/hr/shortlist`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (res.status === 409) {
    const err = new Error(data.message || "Candidate already shortlisted");
    err.alreadyShortlisted = true;
    throw err;
  }
  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }
  return data;
}

export async function updateShortlistNotes(id, notes) {
  const res = await fetch(`${API_URL}/hr/shortlist/${id}/notes`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify({ notes }),
  });
  return handleResponse(res);
}

export async function removeFromShortlist(id) {
  const res = await fetch(`${API_URL}/hr/shortlist/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return handleResponse(res);
}
