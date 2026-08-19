"use client";

import { useState, useMemo } from "react";
import contributorsData from "@/data/contributors.json";
import { Contributor } from "@/types/contributor";
import ContributorCard from "@/components/ContributorCard";
import FilterBar from "@/components/FilterBar";
import StatsCounter from "@/components/StatsCounter";
import { Users, Github, PlusCircle, SearchX, Terminal, Sparkles } from "lucide-react";

export default function Home() {
  const contributors = contributorsData as Contributor[];

  // Client-side state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"name-asc" | "name-desc" | "skills-desc">("name-asc");

  // WORKSHOP STARTER ISSUE #3 STATE:
  // We keep a stale count override when search is active, and intentionally do NOT clear it
  // when `searchQuery` becomes empty string via search input clear!
  const [displayCountOverride, setDisplayCountOverride] = useState<number | null>(null);

  // Compute list of all unique skills across all contributors
  const allSkills = useMemo(() => {
    const skillsSet = new Set<string>();
    contributors.forEach((c) => c.skills.forEach((s) => skillsSet.add(s)));
    return Array.from(skillsSet).sort();
  }, [contributors]);

  // Handle skill toggle
  const handleSkillToggle = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  const handleClearSkills = () => {
    setSelectedSkills([]);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);

    // WORKSHOP STARTER ISSUE #3 BUG DEMO:
    // If user typed something, we update `displayCountOverride`.
    // When query is cleared (''), we set a stale override value of 1,
    // causing the FilterBar counter to stay out of sync when search is cleared!
    if (query !== "") {
      setDisplayCountOverride(filteredContributors.length);
    } else {
      setDisplayCountOverride(1);
    }
  };

  // Filter and sort contributors
  const filteredContributors = useMemo(() => {
    return contributors
      .filter((contributor) => {
        // Search filter: matching name, role, or any skill
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !query ||
          contributor.name.toLowerCase().includes(query) ||
          contributor.role.toLowerCase().includes(query) ||
          contributor.skills.some((s) => s.toLowerCase().includes(query));

        // Skill multi-select filter: contributor must have ALL selected skills
        const matchesSkills =
          selectedSkills.length === 0 ||
          selectedSkills.every((s) => contributor.skills.includes(s));

        return matchesSearch && matchesSkills;
      })
      .sort((a, b) => {
        if (sortBy === "name-asc") {
          return a.name.localeCompare(b.name);
        } else if (sortBy === "name-desc") {
          return b.name.localeCompare(a.name);
        } else if (sortBy === "skills-desc") {
          return b.skills.length - a.skills.length;
        }
        return 0;
      });
  }, [contributors, searchQuery, selectedSkills, sortBy]);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 bg-radial-glow px-4 sm:px-8 lg:px-12 xl:px-16 py-12 w-full max-w-[1500px] mx-auto">
      {/* Header & Hero Banner */}
      <header className="text-center mb-16 relative pt-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Open Source Workshop Edition</span>
        </div>

        <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold text-slate-900 tracking-tight mb-5">
          Open Source <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">Contributor Directory</span>
        </h1>

        <p className="text-slate-600 text-base sm:text-xl max-w-3xl mx-auto leading-relaxed mb-10">
          Welcome! A community-driven showcase of developers, designers, and open-source contributors.
          Add your profile card by submitting a quick Pull Request!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://github.com/OpenSource-UIT/Open-Source-Contributor-Directory"
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold flex items-center gap-2 shadow-lg shadow-indigo-600/25 transition-all hover:scale-105"
          >
            <Github className="w-4 h-4" />
            View Repository
          </a>
          <a
            href="#contribute-info"
            className="px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-700 text-sm font-semibold flex items-center gap-2 shadow-sm transition-all hover:scale-105"
          >
            <PlusCircle className="w-4 h-4 text-emerald-600" />
            Add Your Card
          </a>
        </div>
      </header>

      {/* Stats Counter Section */}
      <StatsCounter contributors={contributors} />

      {/* Filter and Search Bar */}
      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        allSkills={allSkills}
        selectedSkills={selectedSkills}
        onSkillToggle={handleSkillToggle}
        onClearSkills={handleClearSkills}
        sortBy={sortBy}
        onSortChange={setSortBy}
        totalCount={contributors.length}
        filteredCount={filteredContributors.length}
        displayCountOverride={displayCountOverride}
      />

      {/* Contributor Grid */}
      {filteredContributors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 mb-20">
          {filteredContributors.map((contributor) => (
            <ContributorCard
              key={contributor.id}
              contributor={contributor}
              onSkillClick={handleSkillToggle}
              selectedSkills={selectedSkills}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="glow-card rounded-2xl p-12 text-center my-12 border border-slate-200 bg-white shadow-sm">
          <div className="w-16 h-16 rounded-full bg-indigo-50 text-indigo-600 mx-auto flex items-center justify-center mb-4 border border-indigo-100">
            <SearchX className="w-8 h-8 text-indigo-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">No contributors found</h3>
          <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
            We couldn't find any contributor matching your search query or skill filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedSkills([]);
              setDisplayCountOverride(null);
            }}
            className="px-6 py-3 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-600/20"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Workshop Contribution Callout */}
      <footer id="contribute-info" className="glow-card rounded-2xl p-8 lg:p-10 border border-indigo-100 bg-gradient-to-r from-indigo-50/90 via-white to-purple-50/90 text-slate-800 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-2">
              <Terminal className="w-4 h-4" />
              Workshop Contribution Guide
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
              Want to join our Open Source Directory?
            </h3>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl">
              Check out <code className="text-indigo-700 font-mono bg-indigo-100/80 px-2 py-0.5 rounded border border-indigo-200">CONTRIBUTING.md</code> in the project root to learn how to add your card or solve one of the workshop starter issues!
            </p>
          </div>
          <div className="shrink-0">
            <a
              href="https://github.com/OpenSource-UIT/Open-Source-Contributor-Directory"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm flex items-center gap-2 transition-all shadow-lg shadow-emerald-600/20 hover:scale-105"
            >
              <Users className="w-4 h-4" />
              Submit a PR
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
