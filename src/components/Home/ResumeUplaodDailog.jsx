"use client"

import { useState } from "react"
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

export default function ResumeUploadDialog() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [extractedText, setExtractedText] = useState(null)
  const [showResult, setShowResult] = useState(false)

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
      }

    } catch (err) {
      console.error(err)
      setError(err.message)
    } finally {
      setLoading(false)
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
              <Button type="submit" disabled={loading || !file}>
                {loading ? "Extracting..." : "Extract Text"}
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
              {extractedText && (
                <>
                  <div className="flex gap-4 text-sm text-gray-600">
                    <span>Pages: {extractedText.pages || "N/A"}</span>
                    <span>Characters: {extractedText.text?.length || 0}</span>
                  </div>
                  
                  <div className="border rounded-lg p-4 bg-gray-50 max-h-[400px] overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm font-mono">
                      {extractedText.text || "No text found"}
                    </pre>
                  </div>

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
