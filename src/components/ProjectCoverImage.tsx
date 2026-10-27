import React from 'react';
import { Camera, Bot, Cpu, Layers, Sparkles, Activity } from 'lucide-react';

interface ProjectCoverImageProps {
  coverImage?: string;
  title: string;
  category: string;
  metric?: string;
  className?: string;
}

export const ProjectCoverImage: React.FC<ProjectCoverImageProps> = ({
  coverImage,
  title,
  category,
  metric,
  className = '',
}) => {
  // If screenshot image exists, render it with smooth loaded state
  if (coverImage && coverImage.trim()) {
    return (
      <div className={`relative w-full aspect-[16/9] sm:aspect-[2/1] overflow-hidden rounded-2xl bg-slate-900 border border-slate-200/80 shadow-xs group ${className}`}>
        <img
          src={coverImage}
          alt={`${title} project preview`}
          loading="lazy"
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
        
        {/* Subtle overlay pills */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-mono">
          <span className="bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-[10px] font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Screenshot Preview</span>
          </span>
          {metric && (
            <span className="bg-blue-950/80 backdrop-blur-md px-2 py-0.5 rounded-md border border-blue-400/30 text-[10px] text-blue-300 font-bold">
              {metric}
            </span>
          )}
        </div>
      </div>
    );
  }

  // High-Tech Engineering Schematic Placeholder when no screenshot is uploaded
  const getCategoryDetails = () => {
    const cat = category.toLowerCase();
    if (cat.includes('vision') || cat.includes('edge')) {
      return {
        icon: Camera,
        gradient: 'from-slate-950 via-blue-950 to-indigo-950',
        accentColor: 'text-blue-400',
        borderColor: 'border-blue-500/20',
        chipBg: 'bg-blue-500/20 text-blue-300 border-blue-400/30',
        patternType: 'reticle',
        tag: 'Computer Vision & Edge Hardware',
      };
    }
    if (cat.includes('llm') || cat.includes('agent')) {
      return {
        icon: Bot,
        gradient: 'from-slate-950 via-indigo-950 to-purple-950',
        accentColor: 'text-indigo-400',
        borderColor: 'border-indigo-500/20',
        chipBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-400/30',
        patternType: 'nodes',
        tag: 'Agentic AI & Neural Pipelines',
      };
    }
    return {
      icon: Cpu,
      gradient: 'from-slate-950 via-slate-900 to-blue-950',
      accentColor: 'text-emerald-400',
      borderColor: 'border-emerald-500/20',
      chipBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30',
      patternType: 'grid',
      tag: 'Production Platform & Systems',
    };
  };

  const details = getCategoryDetails();
  const IconComponent = details.icon;

  return (
    <div
      className={`relative w-full aspect-[16/9] sm:aspect-[2/1] overflow-hidden rounded-2xl bg-gradient-to-br ${details.gradient} border ${details.borderColor} shadow-xs flex flex-col justify-between p-4 sm:p-5 text-white select-none group ${className}`}
    >
      {/* Background SVG Geometric Matrix Grid */}
      <svg
        className="absolute inset-0 w-full h-full opacity-15 pointer-events-none group-hover:opacity-25 transition-opacity duration-500"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid-pattern" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      </svg>

      {/* Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Top Bar: Category Pill & Live Signal */}
      <div className="relative z-10 flex items-center justify-between">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold border ${details.chipBg}`}>
          <IconComponent className="w-3 h-3" />
          <span>{details.tag}</span>
        </span>
        <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
          <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
          <span>Production Arch</span>
        </div>
      </div>

      {/* Center: High-Tech Schematic Icon & Title */}
      <div className="relative z-10 my-auto text-center space-y-1.5 py-2">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md text-white shadow-lg shadow-black/30 group-hover:scale-110 transition-transform duration-300">
          <IconComponent className={`w-6 h-6 ${details.accentColor}`} />
        </div>
        <div className="text-xs sm:text-sm font-extrabold text-white tracking-tight line-clamp-1">
          {title}
        </div>
      </div>

      {/* Bottom Bar: Benchmark Metric & Architecture Spec Label */}
      <div className="relative z-10 flex items-center justify-between text-[10px] font-mono border-t border-white/10 pt-2.5">
        <span className="text-slate-400 flex items-center gap-1">
          <Layers className="w-3 h-3 text-slate-400" />
          <span>Case Study Verified</span>
        </span>
        {metric ? (
          <span className="font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
            {metric}
          </span>
        ) : (
          <span className="text-slate-400 font-mono flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-blue-400" />
            <span>Interactive Specs</span>
          </span>
        )}
      </div>
    </div>
  );
};
