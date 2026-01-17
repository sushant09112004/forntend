// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import ResumeEditor from "@/components/ResumeEditor";

// export default function EditorPage() {
//   const router = useRouter();
//   const [resumeData, setResumeData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Get resume data from sessionStorage
//     const storedData = sessionStorage.getItem("resumeData");
//     if (storedData) {
//       try {
//         setResumeData(JSON.parse(storedData));
//       } catch (error) {
//         console.error("Error parsing resume data:", error);
//         router.push("/");
//       }
//     } else {
//       router.push("/");
//     }
//     setLoading(false);
//   }, [router]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   if (!resumeData) {
//     return null;
//   }

//   return <ResumeEditor initialData={resumeData} />;
// }


import React from 'react'

function page() {
  return (
    <div>page</div>
  )
}

export default page