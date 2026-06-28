"use client"

import { useState } from "react"

export default function Page() {
  const [jobDescription, setJobDescription] = useState("")
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [roastText, setRoastText] = useState("")

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError(null)
    setRoastText("")

    if (!jobDescription.trim()) {
      setError("Please enter the job description or role.")
      return
    }

    if (!file) {
      setError("Please upload a PDF resume.")
      return
    }

    setLoading(true)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const pdfResponse = await fetch(`${apiUrl}/pdf/extract-text`, {
        method: "POST",
        body: formData,
      })

      const pdfData = await pdfResponse.json()
      if (!pdfResponse.ok) {
        throw new Error(pdfData.message || "Failed to extract text from PDF.")
      }

      const resumeText = pdfData?.data?.text || ""
      if (!resumeText.trim()) {
        throw new Error("Unable to extract text from the resume PDF.")
      }

      const roastResponse = await fetch(`${apiUrl}/roast`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobRole: jobDescription,
          resumeText,
        }),
      })

      const roastData = await roastResponse.json()
      if (!roastResponse.ok) {
        throw new Error(roastData.message || "Failed to generate roast.")
      }

      setRoastText(roastData.roast || roastData.response || "No roast returned.")
    } catch (err) {
      console.error(err)
      setError(err?.message || "Something went wrong while generating the roast.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto w-full max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
        <div className="mb-8">
          <h1 className="text-4xl font-semibold text-slate-900">Roast My Resume</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
Enter the job description and upload your resume PDF. ResumeSync will intelligently extract your resume content, analyze it against the job description, and provide actionable improvement suggestions          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="grid gap-2">
            <label htmlFor="jobDescription" className="text-sm font-medium text-slate-700">
              Job Description / Target Role
            </label>
            <textarea
              id="jobDescription"
              value={jobDescription}
              onChange={(event) => setJobDescription(event.target.value)}
              rows={5}
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
              placeholder="Describe the role or paste the job description here"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="resumePdf" className="text-sm font-medium text-slate-700">
              Resume PDF
            </label>
            <input
              id="resumePdf"
              type="file"
              accept="application/pdf"
              onChange={(event) => setFile(event.target.files?.[0] ?? null)}
              className="text-sm text-slate-900"
            />
            {file && (
              <p className="text-xs text-slate-500">Selected file: {file.name}</p>
            )}
          </div>

          {error && (
            <div className="rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center rounded-3xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Generating roast..." : "Generate Roast"}
          </button>
        </form>

        {roastText && (
          <section className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-2xl font-semibold text-slate-900">Roast Result</h2>
            <div className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-800">
              {roastText}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
