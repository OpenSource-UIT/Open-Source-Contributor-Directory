"use client";

import { useState } from "react";
import { Contributor } from "@/types/contributor";
import { Github, Linkedin, Globe, User, Code2 } from "lucide-react";

interface ContributorCardProps {
  contributor: Contributor;
  onSkillClick?: (skill: string) => void;
  selectedSkills?: string[];
}

export default function ContributorCard({
  contributor,
  onSkillClick,
  selectedSkills = [],
}: ContributorCardProps) {
  const [imageError, setImageError] = useState(false);

  const avatarUrl = `https://github.com/${contributor.githubUsername}.png`;

  return (
    <div className="glow-card rounded-2xl p-7 flex flex-col justify-between h-full relative overflow-hidden group bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-indigo-300 hover:-translate-y-1 transition-all duration-300">
      {/* Decorative gradient corner indicator */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-indigo-100/50 via-purple-50/30 to-transparent rounded-bl-full pointer-events-none" />

      <div>
        {/* Header: Avatar, Name & Role */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative shrink-0">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-indigo-200 bg-slate-100 flex items-center justify-center shadow-sm group-hover:border-indigo-500 transition-colors">
              {!imageError ? (
                <img
                  src={avatarUrl}
                  alt={`${contributor.name}'s avatar`}
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <User className="w-7 h-7 text-indigo-600" />
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center" title="Active Contributor">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
              {contributor.name}
            </h3>
            <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1.5 mt-0.5">
              <Code2 className="w-3.5 h-3.5" />
              {contributor.role}
            </p>
            <span className="text-[11px] text-slate-400 font-mono">
              @{contributor.githubUsername}
            </span>
          </div>
        </div>

        {/* WORKSHOP STARTER ISSUE #2:
            The bio paragraph below is missing Tailwind's `line-clamp-3` class.
            Long bios will stretch the card height and cause misaligned grids.
            FIX FOR WORKSHOP PR: Add `line-clamp-3` to the class list below!
        */}
        <p className="text-slate-600 text-sm leading-relaxed mb-5 line-clamp-3">
          {contributor.bio}
        </p>

        {/* Skills list */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-1.5">
            {contributor.skills.map((skill) => {
              const isSelected = selectedSkills.includes(skill);
              return (
                <button
                  key={skill}
                  onClick={() => onSkillClick?.(skill)}
                  className={`text-xs font-medium px-2.5 py-1 rounded-lg border transition-all duration-200 ${
                    isSelected
                      ? "bg-indigo-600 border-indigo-600 text-white shadow-sm shadow-indigo-600/30"
                      : "bg-slate-100 border-slate-200/90 text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200"
                  }`}
                >
                  {skill}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer & Social Links */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
        <span className="text-xs text-slate-400 font-mono">
          {contributor.skills.length} skills
        </span>

        <div className="flex items-center gap-2">
          {/* GitHub Social Icon */}
          {contributor.socials.github && (
            <a
              href={contributor.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 border border-slate-200 hover:border-indigo-200 transition-all shadow-sm"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
          )}

          {/* WORKSHOP STARTER ISSUE #1:
              LinkedIn and Portfolio social links are rendered unconditionally without checking
              if `contributor.socials.linkedin` or `contributor.socials.portfolio` exist in JSON!
              When missing, they render broken empty href links.
              FIX FOR WORKSHOP PR: Wrap these icons in conditional checks:
              `{contributor.socials.linkedin && ( ... )}`
              `{contributor.socials.portfolio && ( ... )}`
          */}
          <a
            href={contributor.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 border border-slate-200 hover:border-indigo-200 transition-all shadow-sm"
            title="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <a
            href={contributor.socials.portfolio}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 border border-slate-200 hover:border-indigo-200 transition-all shadow-sm"
            title="Portfolio Website"
          >
            <Globe className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
