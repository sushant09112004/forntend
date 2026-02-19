"use client";
import { useState } from "react";



export default function Collapsiblebox({ item, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-300 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left"
      >
        <span className="font-medium text-lg">Progessional Summary </span>
        <span className="text-xl">
          {isOpen ? "-" : "+"}
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-40 mt-2" : "max-h-0"
        }`}
      >
        <textarea
          value={item.summary || ""}
          onChange={onChange}
          rows={4}
          placeholder="Enter your professional summary..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none mt-2"
        />
      </div>
    </div>
  );
}
