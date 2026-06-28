"use client"

import React, { useEffect, useState } from 'react'

export default function Page() {
  const [templates, setTemplates] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchTemplates = async () => {
      setError('')
      setLoading(true)
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
        if (!token) return setError('Please log in to view saved templates.')

        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'
        const res = await fetch(`${apiUrl}/email/template/list`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message || 'Failed to load templates')
        setTemplates(Array.isArray(data.templates) ? data.templates : [])
      } catch (err) {
        setError(err.message || String(err))
      } finally {
        setLoading(false)
      }
    }

    fetchTemplates()
  }, [])

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto w-full max-w-6xl rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-semibold mb-4">Saved Email Templates</h1>
        <p className="text-sm text-slate-600 mb-6">Templates you generated or saved — select one to view or copy.</p>

        {error && <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 mb-4">{error}</div>}
        {loading && <div className="text-sm text-slate-500 mb-4">Loading templates…</div>}

        <div className="grid gap-4">
          {templates.length === 0 && !loading && !error && (
            <div className="text-sm text-slate-500">No saved templates yet.</div>
          )}

          {templates.map((t) => (
            <div key={t._id} className="rounded-xl border border-slate-100 p-4 bg-slate-50">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-medium text-slate-800">{t.subject || '(No subject)'}</div>
                  <div className="text-xs text-slate-500">{t.role}</div>
                </div>
                <div className="text-xs text-slate-400">{new Date(t.createdAt).toLocaleString()}</div>
              </div>
              <pre className="whitespace-pre-wrap mt-3 text-sm text-slate-700 bg-white rounded p-3 border border-slate-100">{t.body}</pre>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(t.body)
                    alert('Template copied to clipboard')
                  }}
                  className="rounded-md bg-slate-900 px-3 py-1 text-sm text-white"
                >
                  Copy
                </button>
                <button
                  onClick={() => {
                    // store selected template so user can paste in compose page
                    if (typeof window !== 'undefined') sessionStorage.setItem('selectedEmailTemplate', JSON.stringify(t))
                    alert('Template saved to session. Open Generate Email page to paste it.')
                  }}
                  className="rounded-md border border-slate-200 px-3 py-1 text-sm"
                >
                  Use
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
