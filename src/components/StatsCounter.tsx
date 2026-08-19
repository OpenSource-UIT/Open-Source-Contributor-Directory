"use client";

import { Contributor } from "@/types/contributor";
import { Users, Code, ShieldCheck, Heart } from "lucide-react";

interface StatsCounterProps {
  contributors: Contributor[];
}

export default function StatsCounter({ contributors }: StatsCounterProps) {
  // Pure array methods to calculate statistics
  const totalContributors = contributors.length;

  const uniqueSkillsCount = new Set(
    contributors.flatMap((c) => c.skills)
  ).size;

  const totalRolesCount = new Set(contributors.map((c) => c.role)).size;

  const totalSocialLinks = contributors.reduce((acc, c) => {
    let count = 0;
    if (c.socials.github) count++;
    if (c.socials.linkedin) count++;
    if (c.socials.portfolio) count++;
    return acc + count;
  }, 0);

  const stats = [
    {
      label: "Total Contributors",
      value: totalContributors,
      icon: Users,
      iconBg: "bg-indigo-50 border-indigo-100 text-indigo-600",
    },
    {
      label: "Unique Skills",
      value: uniqueSkillsCount,
      icon: Code,
      iconBg: "bg-emerald-50 border-emerald-100 text-emerald-600",
    },
    {
      label: "Active Roles",
      value: totalRolesCount,
      icon: ShieldCheck,
      iconBg: "bg-sky-50 border-sky-100 text-sky-600",
    },
    {
      label: "Connected Links",
      value: totalSocialLinks,
      icon: Heart,
      iconBg: "bg-rose-50 border-rose-100 text-rose-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
      {stats.map((stat, idx) => {
        const IconComponent = stat.icon;
        return (
          <div
            key={idx}
            className="glow-card rounded-2xl p-6 border border-slate-200/90 bg-white shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  {stat.label}
                </p>
                <h4 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {stat.value}
                </h4>
              </div>
              <div
                className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${stat.iconBg} shadow-sm group-hover:scale-110 transition-transform duration-300`}
              >
                <IconComponent className="w-6 h-6" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
