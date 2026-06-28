import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function SkillBadge({ skill, variant = "default", className }) {
  return (
    <Badge
      variant={variant === "concept" ? "secondary" : "outline"}
      className={cn(
        "rounded-full px-2.5 py-0.5 text-xs font-medium",
        variant === "concept"
          ? "border-gray-300 bg-gray-100 text-gray-700"
          : "border-gray-200 bg-gray-50 text-black",
        className
      )}
    >
      {skill}
    </Badge>
  );
}

export function SkillBadgeList({ skills = [], variant = "default", className }) {
  if (!skills.length) return null;
  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {skills.map((skill) => (
        <SkillBadge key={skill} skill={skill} variant={variant} />
      ))}
    </div>
  );
}
