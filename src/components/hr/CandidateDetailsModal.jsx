"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Briefcase,
  DollarSign,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Clock,
} from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Badge } from "@/components/ui/badge";
import { getCandidateById } from "@/lib/semantic-api";
import { SkillBadgeList } from "./SkillBadge";

export function CandidateDetailsModal({ candidateId, open, onOpenChange }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["candidate", candidateId],
    queryFn: () => getCandidateById(candidateId),
    enabled: open && !!candidateId,
  });

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent className="fixed inset-y-0 right-0 left-auto mt-0 h-full w-full max-w-lg rounded-none border-l">
        <DrawerHeader className="border-b border-gray-100 pb-4">
          <DrawerTitle className="text-xl">
            {isLoading ? "Loading..." : data?.name || "Candidate Details"}
          </DrawerTitle>
          <DrawerDescription>
            Full candidate profile and fit analysis
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto p-6">
          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="size-8 animate-spin text-black" />
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
              {error.message}
            </div>
          )}

          {data && (
            <div className="space-y-6">
              <div className="grid gap-3 sm:grid-cols-2">
                {data.email && (
                  <InfoItem icon={Mail} label="Email" value={data.email} />
                )}
                {data.phone && (
                  <InfoItem icon={Phone} label="Phone" value={data.phone} />
                )}
                {data.location && (
                  <InfoItem icon={MapPin} label="Location" value={data.location} />
                )}
                {data.yearsExperience && (
                  <InfoItem
                    icon={Briefcase}
                    label="Experience"
                    value={data.yearsExperience}
                  />
                )}
                {data.expectedSalary && (
                  <InfoItem
                    icon={DollarSign}
                    label="Expected Salary"
                    value={data.expectedSalary}
                  />
                )}
                {data.noticePeriod && (
                  <InfoItem
                    icon={Clock}
                    label="Notice Period"
                    value={data.noticePeriod}
                  />
                )}
              </div>

              {data.currentRole && (
                <div>
                  <h4 className="mb-1 text-sm font-medium text-gray-500">
                    Current Role
                  </h4>
                  <p className="text-base font-semibold text-black">
                    {data.currentRole}
                  </p>
                </div>
              )}

              {data.technicalSkills?.length > 0 && (
                <div>
                  <h4 className="mb-2 text-sm font-medium text-gray-500">
                    Technical Skills
                  </h4>
                  <SkillBadgeList skills={data.technicalSkills} />
                </div>
              )}

              {data.keyAchievements?.length > 0 && (
                <div>
                  <h4 className="mb-3 text-sm font-medium text-gray-500">
                    Key Achievements
                  </h4>
                  <div className="relative space-y-0">
                    {data.keyAchievements.map((achievement, i) => (
                      <div key={i} className="relative flex gap-4 pb-6 last:pb-0">
                        <div className="relative flex flex-col items-center">
                          <div className="size-3 rounded-full bg-black ring-4 ring-gray-100" />
                          {i < data.keyAchievements.length - 1 && (
                            <div className="absolute top-3 h-full w-px bg-gray-200" />
                          )}
                        </div>
                        <p className="pt-0 text-sm leading-relaxed text-gray-700">
                          {achievement}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {(data.reasoning || data.fitScore) && (
                <div className="rounded-xl border border-gray-200 bg-gray-50/60 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <h4 className="text-sm font-medium text-black">
                      AI Reasoning
                    </h4>
                    {data.fitScore && (
                      <Badge className="bg-black text-white">
                        Fit: {data.fitScore}/10
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed text-gray-700">
                    {data.reasoning}
                  </p>
                </div>
              )}

              {data.searchText && (
                <div>
                  <h4 className="mb-2 text-sm font-medium text-gray-500">
                    Profile Summary
                  </h4>
                  <p className="rounded-xl bg-gray-50 p-3 text-xs leading-relaxed text-gray-600">
                    {data.searchText}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-2 rounded-xl bg-gray-50 p-3">
      <Icon className="mt-0.5 size-4 shrink-0 text-black" />
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-medium text-gray-800">{value}</p>
      </div>
    </div>
  );
}
