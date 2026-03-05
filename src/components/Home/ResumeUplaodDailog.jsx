"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useGemeni } from "@/hooks/useGemeni"

export default function ResumeUploadDialog() {
  const router = useRouter()
  const { structureResume, loading: geminiLoading, error: geminiError } = useGemeni()
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [extractedText, setExtractedText] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [structuring, setStructuring] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("SUBMIT CLICKED")

    if (!file) {
      setError("Please select a PDF resume")
      return
    }

    try {
      setLoading(true)
      setError(null)
      setExtractedText(null)
      setShowResult(false)

      const formData = new FormData()
      formData.append("file", file)

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"
      const res = await fetch(`${apiUrl}/pdf/extract-text`, {
        method: "POST",
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || "Upload failed")
      }

      console.log("✅ Backend Response:", data)
      
      if (data.success && data.data) {
        setExtractedText(data.data)
        setShowResult(true)
        
        // Automatically structure the resume with Gemini
        if (data.data.text) {
          await handleStructureResume(data.data.text)
        }
      }

    } catch (err) {
      console.error(err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleStructureResume = async (text) => {
    try {
      setStructuring(true)
      setError(null)
      
      console.log("🤖 Structuring resume with Gemini...")
      const structuredData = await structureResume(text)

      console.log("✅ Structured Data:", structuredData)

      // Store structured data in sessionStorage for edit page
      if (typeof window !== "undefined") {
        const normalizedData = {
          personalInfo: structuredData.personalInfo || {},
          summary: structuredData.summary || "",
          experience: Array.isArray(structuredData.experience)
            ? structuredData.experience
            : [],
          projects: Array.isArray(structuredData.projects)
            ? structuredData.projects
            : [],
          achievements: Array.isArray(structuredData.achievements)
            ? structuredData.achievements
            : [],
          skills: Array.isArray(structuredData.skills)
            ? structuredData.skills
            : [],
          education: Array.isArray(structuredData.education)
            ? structuredData.education
            : [],
          certifications: Array.isArray(structuredData.certifications)
            ? structuredData.certifications
            : [],
          languages: Array.isArray(structuredData.languages)
            ? structuredData.languages
            : [],
        }

        sessionStorage.setItem("structuredResume", JSON.stringify(normalizedData))
        sessionStorage.setItem("originalText", text)
      }

      // Navigate to edit page after a short delay
      setTimeout(() => {
        router.push("/edit")
      }, 1000)
      
    } catch (err) {
      console.error("Error structuring resume:", err)
      setError("Failed to structure resume: " + err.message)
      // Still show the extracted text even if structuring fails
    } finally {
      setStructuring(false)
    }
  }

  const handleClose = () => {
    setFile(null)
    setError(null)
    setExtractedText(null)
    setShowResult(false)
  }

  return (
    <Dialog onOpenChange={(open) => !open && handleClose()}>
      <DialogTrigger asChild>
        <Button variant="outline">Upload Resume</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        {!showResult ? (
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Upload Resume</DialogTitle>
              <DialogDescription>
                Upload your resume PDF to extract text
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid gap-3">
                <Label htmlFor="resume">Resume (PDF)</Label>
                <Input
                  id="resume"
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  disabled={loading}
                />
                {file && (
                  <p className="text-sm text-gray-500">
                    Selected: {file.name} ({(file.size / 1024).toFixed(2)} KB)
                  </p>
                )}
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline" disabled={loading}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={loading || !file || structuring}>
                {loading ? "Extracting..." : structuring ? "Structuring..." : "Extract Text"}
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <div>
            <DialogHeader>
              <DialogTitle>Extracted Text</DialogTitle>
              <DialogDescription>
                Text extracted from your resume PDF
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              {structuring && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                    <p className="text-sm text-blue-700">
                      Structuring resume with AI... This may take a moment.
                    </p>
                  </div>
                </div>
              )}
              
              {extractedText && (
                <>
                  <div className="flex gap-4 text-sm text-gray-600">
                    <span>Pages: {extractedText.pages || "N/A"}</span>
                    <span>Characters: {extractedText.text?.length || 0}</span>
                  </div>
                  
                  {!structuring && (
                    <div className="border rounded-lg p-4 bg-gray-50 max-h-[400px] overflow-y-auto">
                      <pre className="whitespace-pre-wrap text-sm font-mono">
                        {extractedText.text || "No text found"}
                      </pre>
                    </div>
                  )}

                  {extractedText.info && (
                    <details className="text-sm">
                      <summary className="cursor-pointer text-gray-600 hover:text-gray-800">
                        PDF Metadata
                      </summary>
                      <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
                        {JSON.stringify(extractedText.info, null, 2)}
                      </pre>
                    </details>
                  )}
                </>
              )}
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowResult(false)
                  setFile(null)
                  setExtractedText(null)
                }}
              >
                Upload Another
              </Button>
              <DialogClose asChild>
                <Button type="button">Close</Button>
              </DialogClose>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
