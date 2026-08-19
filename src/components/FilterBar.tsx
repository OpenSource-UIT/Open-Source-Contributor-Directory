"use client";

import React from "react";
import { Search, X, Filter, ArrowUpDown, Sparkles } from "lucide-react";

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  allSkills: string[];
  selectedSkills: string[];
  onSkillToggle: (skill: string) => void;
  onClearSkills: () => void;
  sortBy: "name-asc" | "name-desc" | "skills-desc";
  onSortChange: (sortBy: "name-asc" | "name-desc" | "skills-desc") => void;
  totalCount: number;
  filteredCount: number;
  // Workshop starter issue prop: stale count on clear search
  displayCountOverride?: number | null;
}

export default function FilterBar({
  searchQuery,
  onSearchChange,
  allSkills,
  selectedSkills,
  onSkillToggle,
  onClearSkills,
  sortBy,
  onSortChange,
  totalCount,
  filteredCount,
  displayCountOverride,
}: FilterBarProps) {
  // WORKSHOP STARTER ISSUE #3:
  // When clearing search input via the 'X' button or backspacing,
  // `effectiveCount` uses a stale cached override if searchQuery was set,
  // causing the count badge to display an out-of-sync number when search is cleared.
  // FIX FOR WORKSHOP PR: Always use `filteredCount` directly instead of checking stale fallback logic!
  const countToDisplay =
    searchQuery === "" && displayCountOverride !== null && displayCountOverride !== undefined
      ? displayCountOverride
      : filteredCount;

  return (
    <div className="glow-card rounded-2xl p-6 lg:p-8 mb-10 border border-slate-200/90 bg-white shadow-sm">
      {/* Top Row: Search Input & Sort Dropdown */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
        {/* Search Field */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by name, role, or skill..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => {
                onSearchChange("");
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-200/60 transition-colors"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Right Side: Results counter badge & Sorting */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
          {/* Results Badge */}
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>
              Showing <strong className="text-indigo-600 font-bold">{countToDisplay}</strong> of {totalCount} contributors
            </span>
          </div>

          {/* Sort Dropdown */}
          <div className="relative flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-slate-500 hidden sm:block" />
            <select
              value={sortBy}
              onChange={(e) =>
                onSortChange(
                  e.target.value as "name-asc" | "name-desc" | "skills-desc"
                )
              }
              className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:bg-white focus:border-indigo-500 transition-all cursor-pointer shadow-sm"
            >
              <option value="name-asc">Sort: Name (A-Z)</option>
              <option value="name-desc">Sort: Name (Z-A)</option>
              <option value="skills-desc">Sort: Most Skills</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bottom Row: Multi-Select Skill Badges */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <Filter className="w-3.5 h-3.5 text-emerald-600" />
            Filter by Skill
          </div>
          {selectedSkills.length > 0 && (
            <button
              onClick={onClearSkills}
              className="text-xs text-indigo-600 hover:text-indigo-700 hover:underline font-semibold transition-colors"
            >
              Reset skills ({selectedSkills.length})
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {allSkills.map((skill) => {
            const isSelected = selectedSkills.includes(skill);
            return (
              <button
                key={skill}
                onClick={() => onSkillToggle(skill)}
                className={`text-xs px-3.5 py-1.5 rounded-xl font-medium border transition-all duration-200 flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-indigo-600 border-indigo-600 text-white shadow-sm shadow-indigo-600/30"
                    : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200"
                }`}
              >
                <span>{skill}</span>
                {isSelected && <X className="w-3 h-3 text-white" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
