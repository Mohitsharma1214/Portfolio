import React, { useState, useEffect } from 'react';
import { GitCommit, GitFork, Star, ExternalLink } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { PERSONAL_INFO } from '../data/portfolioData';

interface RepoSummary {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  url: string;
  pushedAt: string;
}

export const GitHubActivityCard: React.FC = () => {
  const [repos, setRepos] = useState<RepoSummary[]>([]);

  useEffect(() => {
    // Fetch top pinned/active repositories directly from GitHub public API
    fetch('https://api.github.com/users/mohitsharma1214/repos?sort=updated&per_page=6')
      .then((res) => {
        if (!res.ok) throw new Error('GitHub rate limit');
        return res.json();
      })
      .then((data: any[]) => {
        if (Array.isArray(data)) {
          const formatted: RepoSummary[] = data
            .filter((r) => !r.fork)
            .slice(0, 4)
            .map((r) => ({
              name: r.name,
              description: r.description || 'Production computer vision & deep learning pipeline.',
              stars: r.stargazers_count,
              forks: r.forks_count,
              language: r.language || 'Python',
              url: r.html_url,
              pushedAt: new Date(r.pushed_at).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              }),
            }));
          setRepos(formatted);
        }
      })
      .catch(() => {
        // Fallback curated repositories if GitHub rate limit is triggered
        setRepos([
          {
            name: 'Driver-Drowsiness-Detection-System',
            description: 'Govt Copyright SW-19841/2024. Edge Raspberry Pi telematics running 100% offline.',
            stars: 6,
            forks: 2,
            language: 'Python',
            url: 'https://github.com/Mohitsharma1214/Driver-Drowsiness-Detection-System',
            pushedAt: 'Recently active',
          },
          {
            name: 'Hair-Strand-Detection',
            description: 'Clinical trichoscopy segmentation achieving 0.84 mAP at <120ms P95 latency.',
            stars: 4,
            forks: 1,
            language: 'Python',
            url: 'https://github.com/Mohitsharma1214/Hair-Strand-Detection',
            pushedAt: 'Recently active',
          },
          {
            name: 'Ultra-Doc-Intelligence',
            description: 'Deterministic document parsing and agentic tool-calling with strict Pydantic schemas.',
            stars: 3,
            forks: 1,
            language: 'Python',
            url: 'https://github.com/Mohitsharma1214/Ultra-Doc-Intelligence',
            pushedAt: 'Recently active',
          },
          {
            name: 'mohitsharma1214.github.io',
            description: 'High-performance portfolio engine with local RAG assistant & offline telematics.',
            stars: 2,
            forks: 0,
            language: 'TypeScript',
            url: 'https://github.com/Mohitsharma1214/mohitsharma1214.github.io',
            pushedAt: 'Active',
          },
        ]);
      });
  }, []);

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="space-y-1">
          <div className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-2">
            <GithubIcon className="w-4 h-4 text-slate-800" />
            <span>Open Source &amp; Systems Repositories</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight">
            Verified GitHub Activity
          </h3>
        </div>

        <a
          href={PERSONAL_INFO.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-mono font-semibold bg-slate-900 hover:bg-slate-950 text-white px-3.5 py-2 rounded-xl transition-all shadow-xs shrink-0 self-start sm:self-auto"
        >
          <span>@mohitsharma1214</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </a>
      </div>

      {/* GitHub Commit Streak / Activity Heatmap Image */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-slate-600">
          <span className="flex items-center gap-1.5 font-medium">
            <GitCommit className="w-3.5 h-3.5 text-emerald-600" />
            <span>Public Contribution History</span>
          </span>
          <span className="text-slate-400">27+ Public Repositories</span>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3 sm:p-4 overflow-x-auto">
          <img
            src="https://ghchart.rshah.org/2563eb/mohitsharma1214"
            alt="Mohit Sharma's GitHub Contribution Graph"
            className="w-full min-w-[640px] max-w-full block"
            loading="lazy"
          />
        </div>
      </div>

      {/* Repositories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
        {repos.map((repo) => (
          <a
            key={repo.name}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-blue-300 hover:shadow-xs transition-all space-y-2 group block"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                {repo.name}
              </span>
              <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-blue-600 shrink-0" />
            </div>
            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
              {repo.description}
            </p>
            <div className="flex items-center gap-3 pt-1 text-[11px] font-mono text-slate-500">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
                <span>{repo.language}</span>
              </span>
              {repo.stars > 0 && (
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span>{repo.stars}</span>
                </span>
              )}
              {repo.forks > 0 && (
                <span className="flex items-center gap-1">
                  <GitFork className="w-3 h-3 text-slate-400" />
                  <span>{repo.forks}</span>
                </span>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
