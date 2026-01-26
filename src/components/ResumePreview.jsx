"use client";

export default function ResumePreview({ data }) {
  if (!data) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <p>No resume data to preview</p>
      </div>
    );
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          @page {
            margin: 0.5in;
            size: letter;
          }
          body * {
            visibility: hidden;
          }
          #resume-preview, #resume-preview * {
            visibility: visible;
          }
          #resume-preview {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            box-shadow: none;
            padding: 0;
          }
          .no-print {
            display: none !important;
          }
        }
      `}} />
      <div className="bg-white p-6 md:p-8 shadow-lg rounded-lg max-w-4xl mx-auto" id="resume-preview">

      {/* Personal Info / Header */}
      {(data.personalInfo || data.name) && (
        <div className="border-b-2 border-blue-600 pb-4 mb-6">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">
            {data.personalInfo?.name || data.name || "Your Name"}
          </h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            {data.personalInfo?.email && (
              <span>📧 {data.personalInfo.email}</span>
            )}
            {data.personalInfo?.phone && (
              <span>📱 {data.personalInfo.phone}</span>
            )}
            {data.personalInfo?.location && (
              <span>📍 {data.personalInfo.location}</span>
            )}
            {data.personalInfo?.linkedin && (
              <span>💼 {data.personalInfo.linkedin}</span>
            )}
            {data.personalInfo?.website && (
              <span>🌐 {data.personalInfo.website}</span>
            )}
          </div>
        </div>
      )}

      {/* Summary */}
      {data.summary && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 border-b border-gray-300 pb-2 mb-3">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {data.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 border-b border-gray-300 pb-2 mb-3">
            Professional Experience
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp, index) => (
              <div key={index} className="pl-4 border-l-2 border-blue-400">
                <h3 className="font-semibold text-lg text-gray-800">
                  {exp.title || "Job Title"}
                </h3>
                <p className="text-gray-600">
                  {exp.company || "Company"}
                  {exp.location && ` • ${exp.location}`}
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  {exp.startDate || "Start"} - {exp.endDate || "End"}
                </p>
                {exp.description && (
                  <p className="text-gray-700 mt-2 whitespace-pre-line">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 border-b border-gray-300 pb-2 mb-3">
            Education
          </h2>
          <div className="space-y-3">
            {data.education.map((edu, index) => (
              <div key={index} className="pl-4 border-l-2 border-green-400">
                <h3 className="font-semibold text-gray-800">
                  {edu.degree || "Degree"}
                </h3>
                <p className="text-gray-600">
                  {edu.institution || "Institution"}
                  {edu.location && ` • ${edu.location}`}
                </p>
                <p className="text-sm text-gray-500">
                  {edu.graduationDate || "Graduation Date"}
                  {edu.gpa && ` • GPA: ${edu.gpa}`}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 border-b border-gray-300 pb-2 mb-3">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 border-b border-gray-300 pb-2 mb-3">
            Projects
          </h2>
          <div className="space-y-4">
            {data.projects.map((project, index) => (
              <div key={index} className="pl-4 border-l-2 border-purple-400">
                <h3 className="font-semibold text-gray-800">
                  {project.name || "Project Name"}
                </h3>
                {project.description && (
                  <p className="text-gray-700 mt-1 whitespace-pre-line">
                    {project.description}
                  </p>
                )}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Achievements */}
      {data.achievements && data.achievements.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 border-b border-gray-300 pb-2 mb-3">
            Achievements
          </h2>
          <ul className="list-disc list-inside space-y-1">
            {data.achievements.map((achievement, index) => (
              <li key={index} className="text-gray-700">
                {achievement}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Certifications */}
      {data.certifications && data.certifications.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 border-b border-gray-300 pb-2 mb-3">
            Certifications
          </h2>
          <ul className="list-disc list-inside space-y-1">
            {data.certifications.map((cert, index) => (
              <li key={index} className="text-gray-700">{cert}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Languages */}
      {data.languages && data.languages.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 border-b border-gray-300 pb-2 mb-3">
            Languages
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.languages.map((lang, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
              >
                {lang}
              </span>
            ))}
          </div>
        </section>
      )}
      </div>
    </>
  );
}

