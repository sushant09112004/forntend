"use client";
import { MdOutlineMail,MdLocationOn  } from "react-icons/md";
import { IoIosCall } from "react-icons/io";
const ResumePreview = ({ data, format, sections = [] }) => {
  if (!data) return null;

  // Get ordered sections based on sections array
  const getOrderedSections = () => {
    if (!sections || sections.length === 0) {
      // Default order if sections not provided
      return [
        "personalInfo",
        "summary",
        "experience",
        "education",
        "skills",
        "projects",
        "certifications",
        "languages",
      ];
    }
    return sections.map((s) => s.id);
  };

  const orderedSections = getOrderedSections();

  const renderModernFormat = () => {
    return (
      <div className="font-sans text-gray-900">
        {/* Header */}
        {data.personalInfo && (
          <div className="border-b-2 border-blue-600 pb-4 mb-6">
            <h1 className="text-3xl font-bold text-blue-600 mb-2">
              {data.personalInfo.name || "Your Name"}
            </h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              {data.personalInfo.email && (
                <span className="flex items-center gap-1"><MdOutlineMail size={14} /> {data.personalInfo.email}</span>
              )}
              {data.personalInfo.phone && (
                <span>
                   {data.personalInfo.phone}</span>
              )}
              {data.personalInfo.location && (
                <span className="flex items-center gap-1"><MdLocationOn size={14} /> {data.personalInfo.location}</span>
              )}
              {data.personalInfo.linkedin && (
                <span>💼 {data.personalInfo.linkedin}</span>
              )}
              {data.personalInfo.website && (
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
            <p className="text-gray-700 leading-relaxed">{data.summary}</p>
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
                    {exp.company || "Company"} {exp.location && `• ${exp.location}`}
                  </p>
                  <p className="text-sm text-gray-500 mb-2">
                    {exp.startDate || "Start"} - {exp.endDate || "End"}
                  </p>
                  {exp.description && (
                    <p className="text-gray-700 mt-2">{exp.description}</p>
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
                    {edu.institution || "Institution"} {edu.location && `• ${edu.location}`}
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
                    <p className="text-gray-700 mt-1">{project.description}</p>
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
    );
  };

  const renderClassicFormat = () => {
    return (
      <div className="font-serif text-gray-900">
        {/* Header */}
        {data.personalInfo && (
          <div className="text-center border-b-4 border-gray-800 pb-4 mb-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-3 uppercase tracking-wide">
              {data.personalInfo.name || "Your Name"}
            </h1>
            <div className="text-sm text-gray-600 space-x-4">
              {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
              {data.personalInfo.phone && <span>| {data.personalInfo.phone}</span>}
              {data.personalInfo.location && <span>| {data.personalInfo.location}</span>}
            </div>
            {(data.personalInfo.linkedin || data.personalInfo.website) && (
              <div className="text-sm text-gray-600 mt-2">
                {data.personalInfo.linkedin && <span>{data.personalInfo.linkedin}</span>}
                {data.personalInfo.website && (
                  <span className="ml-2">| {data.personalInfo.website}</span>
                )}
              </div>
            )}
          </div>
        )}

        {/* Summary */}
        {data.summary && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider mb-2">
              Objective
            </h2>
            <p className="text-gray-700 leading-relaxed text-justify">{data.summary}</p>
          </section>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider mb-3 border-b-2 border-gray-800 pb-1">
              Work Experience
            </h2>
            <div className="space-y-4">
              {data.experience.map((exp, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-gray-900">
                      {exp.title || "Job Title"}
                    </h3>
                    <span className="text-sm text-gray-600 italic">
                      {exp.startDate || "Start"} - {exp.endDate || "End"}
                    </span>
                  </div>
                  <p className="text-gray-700 font-semibold mb-1">
                    {exp.company || "Company"}
                    {exp.location && <span className="text-gray-600">, {exp.location}</span>}
                  </p>
                  {exp.description && (
                    <p className="text-gray-700 mt-2 text-justify">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider mb-3 border-b-2 border-gray-800 pb-1">
              Education
            </h2>
            <div className="space-y-3">
              {data.education.map((edu, index) => (
                <div key={index} className="mb-3">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-gray-900">
                      {edu.degree || "Degree"}
                    </h3>
                    {edu.graduationDate && (
                      <span className="text-sm text-gray-600 italic">
                        {edu.graduationDate}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700">
                    {edu.institution || "Institution"}
                    {edu.location && <span className="text-gray-600">, {edu.location}</span>}
                    {edu.gpa && <span className="text-gray-600"> • GPA: {edu.gpa}</span>}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider mb-3 border-b-2 border-gray-800 pb-1">
              Skills
            </h2>
            <p className="text-gray-700">
              {data.skills.join(" • ")}
            </p>
          </section>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider mb-3 border-b-2 border-gray-800 pb-1">
              Projects
            </h2>
            <div className="space-y-3">
              {data.projects.map((project, index) => (
                <div key={index} className="mb-3">
                  <h3 className="font-bold text-gray-900">
                    {project.name || "Project Name"}
                  </h3>
                  {project.description && (
                    <p className="text-gray-700 mt-1 text-justify">{project.description}</p>
                  )}
                  {project.technologies && project.technologies.length > 0 && (
                    <p className="text-sm text-gray-600 mt-1 italic">
                      Technologies: {project.technologies.join(", ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {data.certifications && data.certifications.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider mb-3 border-b-2 border-gray-800 pb-1">
              Certifications
            </h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {data.certifications.map((cert, index) => (
                <li key={index}>{cert}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider mb-3 border-b-2 border-gray-800 pb-1">
              Languages
            </h2>
            <p className="text-gray-700">
              {data.languages.join(" • ")}
            </p>
          </section>
        )}
      </div>
    );
  };

  return format === "modern" ? renderModernFormat() : renderClassicFormat();
};

export default ResumePreview;

