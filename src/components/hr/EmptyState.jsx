import { SearchX } from "lucide-react";

export function EmptyState({ title, description, icon: Icon = SearchX }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
      <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-gray-50 text-black">
        <Icon className="size-8" />
      </div>
      <h3 className="text-lg font-semibold text-black">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-gray-500">{description}</p>
    </div>
  );
}
