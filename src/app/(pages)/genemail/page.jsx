"use client"

import React, { useState, useRef } from "react"

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function Page() {
  const [recipients, setRecipients] = useState([])
  const [input, setInput] = useState("")
  const [subject, setSubject] = useState("")
  const [body, setBody] = useState("")
  const [error, setError] = useState(null)
  const inputRef = useRef(null)
  const [sendLoading, setSendLoading] = useState(false)
  const [sendResult, setSendResult] = useState(null)
  const [generatingAI, setGeneratingAI] = useState(false)

  const addRecipient = (raw) => {
    if (!raw) return
    const parts = raw.split(",").map((s) => s.trim()).filter(Boolean)
    const next = []
    for (const p of parts) {
      if (!isValidEmail(p)) {
        setError(`Invalid email: ${p}`)
        return
      }
      if (!recipients.includes(p) && !next.includes(p)) next.push(p)
    }
    setRecipients((r) => [...r, ...next])
    setInput("")
    setError(null)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      addRecipient(input)
    } else if (e.key === "Backspace" && !input && recipients.length) {
      setRecipients((r) => r.slice(0, -1))
    }
  }

  const removeRecipient = (email) => {
    setRecipients((r) => r.filter((x) => x !== email))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError(null)
    if (recipients.length === 0) return setError("Please add at least one recipient.")
    if (!subject.trim()) return setError("Please enter a subject.")
    if (!body.trim()) return setError("Please enter email body text.")

    // For now, just log the payload. Backend wiring can be added later.
    const payload = { to: recipients, subject, body }
    console.log("Prepared email payload:", payload)
    // Optionally save to sessionStorage
    if (typeof window !== "undefined") sessionStorage.setItem("genEmailDraft", JSON.stringify(payload))
    setError(null)
    alert("Email prepared (check console).")
  }

  const handleSend = async () => {
    setError(null)
    setSendResult(null)
    if (recipients.length === 0) return setError("Please add at least one recipient.")
    if (!subject.trim()) return setError("Please enter a subject.")
    if (!body.trim()) return setError("Please enter email body text.")

    setSendLoading(true)
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"
      const resp = await fetch(`${apiUrl}/email/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: recipients, subject, body })
      })
      const data = await resp.json()
      if (!resp.ok) throw new Error(data.message || 'Failed to send email')
      setSendResult('Emails sent')
    } catch (err) {
      console.error(err)
      setError(err.message)
    } finally {
      setSendLoading(false)
    }
  }

  const handleGenerateAI = async () => {
    setError(null)
    setSendResult(null)
    setGeneratingAI(true)
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"
      const resp = await fetch(`${apiUrl}/email/template/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: "software engineer" }),
      })
      const data = await resp.json()
      if (!resp.ok) throw new Error(data.message || 'Failed to generate template')
      // Put the generated template into the body for the user to edit
      setBody(data.template || '')
      setSendResult('AI template loaded into body for editing')
    } catch (err) {
      console.error(err)
      setError(err.message || String(err))
    } finally {
      setGeneratingAI(false)
    }
  }

  const handleSaveTemplate = async () => {
    setError(null)
    setSendResult(null)
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    if (!token) return setError('Please log in to save templates.')
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"
      const resp = await fetch(`${apiUrl}/email/template/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ role: 'software engineer', subject, body }),
      })
      const data = await resp.json()
      if (!resp.ok) throw new Error(data.message || 'Failed to save template')
      setSendResult('Template saved')
    } catch (err) {
      console.error(err)
      setError(err.message || String(err))
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto w-full max-w-7xl rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-semibold mb-4">Generate Email</h1>
        <p className="text-sm text-slate-600 mb-6">Enter recipients (multiple allowed), subject and body.</p>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <label className="text-sm font-medium text-slate-700">To</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {recipients.map((r) => (
                <div key={r} className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm">
                  <span className="select-all">{r}</span>
                  <button type="button" className="opacity-70 hover:opacity-100" onClick={() => removeRecipient(r)}>×</button>
                </div>
              ))}
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type email and press Enter or comma"
                className="min-w-[220px] flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none"
              />
              <button type="button" className="ml-2 rounded-xl bg-slate-900 px-3 py-2 text-white text-sm" onClick={() => addRecipient(input)}>Add</button>
            </div>
            <p className="mt-2 text-xs text-slate-500">Separate multiple emails with comma or press Enter after each.</p>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">Subject</label>
            <input value={subject} onChange={(e) => setSubject(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none" placeholder="Email subject" />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">Body</label>
            <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={8} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none" placeholder="Write your email here..." />
          </div>

          {error && <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}

          <div className="flex gap-3">
            <button type="submit" className="rounded-2xl bg-slate-900 px-6 py-2 text-sm font-semibold text-white">Prepare Email</button>
            <button type="button" onClick={() => { setRecipients([]); setInput(""); setSubject(""); setBody(""); setError(null); setSendResult(null) }} className="rounded-2xl border border-slate-200 px-4 py-2 text-sm">Clear</button>
            <button type="button" onClick={handleGenerateAI} disabled={generatingAI} className="rounded-2xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white">{generatingAI ? 'Generating...' : 'Generate with AI'}</button>
            <button type="button" onClick={handleSaveTemplate} className="rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">Save Template</button>
            <button type="button" onClick={handleSend} disabled={sendLoading} className="rounded-2xl bg-green-600 px-4 py-2 text-sm font-semibold text-white">{sendLoading ? 'Sending...' : 'Send Email'}</button>
          </div>
          {sendResult && <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">{sendResult}</div>}
        </form>
      </div>
    </main>
  )
}
