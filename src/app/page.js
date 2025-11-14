"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setResumeFile(file);
      setError("");
    } else {
      setError("Please upload a PDF file");
      setResumeFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!resumeFile) {
      setError("Please upload a resume PDF");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("resume", resumeFile);
      formData.append("jobDescription", jobDescription);

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
      const response = await fetch(`${apiUrl}/resume/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to process resume");
      }

      const data = await response.json();
      
      // Store resume data in sessionStorage for the editor page
      sessionStorage.setItem("resumeData", JSON.stringify(data.resumeData));
      
      // Navigate to editor page
      router.push("/editor");
    } catch (err) {
      setError(err.message || "An error occurred while processing your resume");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 sm:py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Resume Editor
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
              Upload your resume and job description to get started
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Resume Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Upload Resume PDF
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
                  <div className="space-y-1 text-center w-full">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600 dark:text-gray-400">
                      <label
                        htmlFor="resume-upload"
                        className="relative cursor-pointer bg-white dark:bg-gray-700 rounded-md font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="resume-upload"
                          name="resume-upload"
                          type="file"
                          accept=".pdf"
                          className="sr-only"
                          onChange={handleFileChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      PDF up to 10MB
                    </p>
                    {resumeFile && (
                      <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                        Selected: {resumeFile.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Job Description */}
              <div>
                <label
                  htmlFor="job-description"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Job Description (Optional)
                </label>
                <textarea
                  id="job-description"
                  name="job-description"
                  rows={6}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                  placeholder="Paste the job description here to get AI-powered suggestions..."
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <p className="text-sm text-red-800 dark:text-red-200">
                    {error}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !resumeFile}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Process Resume"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
