import React, { useState } from 'react';
import { RegulatoryAlert, RecentQuery, SavedBrief, NavTab } from '../types';

interface DashboardViewProps {
  alerts: RegulatoryAlert[];
  recentQueries: RecentQuery[];
  savedBriefs: SavedBrief[];
  onNavigate: (tab: NavTab, params?: any) => void;
  onAskGRIF: (query: string) => void;
  onOpenIntake: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  alerts,
  recentQueries,
  savedBriefs,
  onNavigate,
  onAskGRIF,
  onOpenIntake,
}) => {
  const [queryInput, setQueryInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    if (!queryInput.trim()) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      onAskGRIF(queryInput);
    }, 400);
  };

  const handleSuggestedClick = (text: string) => {
    setQueryInput(text);
    onAskGRIF(text);
  };

  return (
    <div className="flex-1 flex flex-col gap-6 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full overflow-y-auto custom-scrollbar">
      {/* Top Banner / Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-white/[0.08] gap-3">
        <div>
          <h1 className="text-[26px] md:text-[30px] font-bold text-[#f8fafc] tracking-tight leading-tight">
            Intelligence Dashboard
          </h1>
          <p className="text-[13.5px] text-[#94a3b8] mt-1">
            Welcome back. Grounded regulatory reasoning across 14 monitored jurisdictions.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('monitoring')}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-[#cbd5e1] hover:text-white text-[12.5px] font-medium transition-all backdrop-blur-md cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>14 Live Streams Active</span>
          </button>
        </div>
      </div>

      {/* Bento Grid: Ask GRIF (2 cols) & Document Intake (1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ask GRIF (Spans 2 columns on lg) */}
        <div className="lg:col-span-2 glass p-5 md:p-6 rounded-2xl shadow-xl flex flex-col justify-between relative overflow-hidden">
          {/* Subtle Indigo Glow in background */}
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <label className="text-[11px] font-bold text-indigo-300 uppercase tracking-widest flex items-center gap-1.5 mb-3">
              <span className="material-symbols-outlined text-[16px] text-indigo-400">auto_awesome</span>
              Ask GRIF
            </label>
            <div className="relative">
              <textarea
                value={queryInput}
                onChange={(e) => setQueryInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleAnalyze();
                  }
                }}
                className="w-full bg-white/[0.04] border border-white/[0.12] rounded-xl p-4 text-[15px] md:text-[17px] font-serif text-[#f8fafc] focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/70 transition-all resize-none h-32 placeholder:text-[#64748b] placeholder:font-sans placeholder:text-[13.5px] backdrop-blur-md outline-none"
                placeholder="Enter natural language query, regulatory citation, or specific legal constraint..."
              />
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="absolute bottom-3.5 right-3.5 bg-indigo-600 hover:bg-indigo-500 text-white text-[13px] font-semibold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(99,102,241,0.4)] disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <>
                    <span className="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>
                    Analyzing...
                  </>
                ) : (
                  <>
                    Analyze <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Suggested queries */}
          <div className="mt-4 flex flex-wrap items-center gap-2 relative z-10">
            <span className="text-[10.5px] font-bold text-[#64748b] uppercase tracking-wider">
              SUGGESTED:
            </span>
            <button
              onClick={() =>
                handleSuggestedClick('What are the current AML reporting obligations for a Pakistani fintech?')
              }
              className="text-left text-[12px] text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 px-3 py-1.5 rounded-xl border border-indigo-500/20 hover:border-indigo-500/40 transition-all truncate max-w-[280px] cursor-pointer backdrop-blur-md"
              title="What are the current AML reporting obligations for a Pakistani fintech?"
            >
              "What are the current AML reporting obligations for a Pakistani fintech?"
            </button>
            <button
              onClick={() =>
                handleSuggestedClick('Compare GDPR Article 17 with CCPA deletion rights.')
              }
              className="text-left text-[12px] text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 px-3 py-1.5 rounded-xl border border-indigo-500/20 hover:border-indigo-500/40 transition-all truncate max-w-[280px] cursor-pointer backdrop-blur-md"
              title="Compare GDPR Article 17 with CCPA deletion rights."
            >
              "Compare GDPR Article 17 with CCPA deletion rights."
            </button>
          </div>
        </div>

        {/* Document Intake */}
        <div
          onClick={onOpenIntake}
          className="glass border-2 border-dashed border-white/[0.15] hover:border-indigo-500/50 rounded-2xl p-6 shadow-xl flex flex-col justify-center items-center hover:bg-white/[0.06] transition-all cursor-pointer text-center group"
        >
          <div className="w-13 h-13 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(99,102,241,0.2)]">
            <span className="material-symbols-outlined text-indigo-300 text-[26px]">
              upload_file
            </span>
          </div>
          <h3 className="text-[17px] font-bold text-[#f8fafc] mb-1">
            Document Intake
          </h3>
          <p className="text-[12px] text-[#94a3b8] mb-4 px-2 leading-relaxed">
            Drag and drop PDF, Email, or Regulatory Notice for automated entity extraction.
          </p>
          <button className="text-[12.5px] text-indigo-300 font-semibold border border-indigo-500/30 px-4 py-1.5 rounded-xl bg-indigo-500/15 hover:bg-indigo-500/25 transition-all shadow-xs">
            Browse Files
          </button>
        </div>
      </div>

      {/* Bottom Grid: Trending Regulatory Alerts & Institutional Memory */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trending Regulatory Alerts */}
        <div className="glass rounded-2xl flex flex-col shadow-xl overflow-hidden">
          <div className="px-5 py-3.5 border-b border-white/[0.08] bg-white/[0.02] flex justify-between items-center">
            <h2 className="text-[15px] font-bold text-[#f8fafc] flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-indigo-400">trending_up</span>
              Trending Regulatory Alerts
            </h2>
            <button
              onClick={() => onNavigate('monitoring')}
              className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 hover:text-indigo-300 hover:underline cursor-pointer"
            >
              View All
            </button>
          </div>

          <div className="flex-1 divide-y divide-white/[0.06]">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                onClick={() => {
                  if (alert.documentRef === 'eu-ai-act-art-5') {
                    onNavigate('documents');
                  } else {
                    onNavigate('research', { query: alert.title });
                  }
                }}
                className="p-4 hover:bg-white/[0.04] transition-all group cursor-pointer flex items-start gap-3"
              >
                {/* Colored Status Dot */}
                <div className="pt-1.5 shrink-0">
                  <div
                    className={`w-2.5 h-2.5 rounded-full ${
                      alert.dotColor === 'error'
                        ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]'
                        : alert.dotColor === 'secondary'
                        ? 'bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.6)]'
                        : 'bg-slate-400'
                    }`}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-[13.5px] font-semibold text-[#f8fafc] group-hover:text-indigo-300 transition-colors truncate">
                      {alert.title}
                    </h3>
                    <span className="text-[11.5px] font-mono text-[#94a3b8] bg-white/[0.05] border border-white/[0.08] px-2 py-0.5 rounded-md shrink-0">
                      {alert.timeAgo}
                    </span>
                  </div>
                  <p className="text-[12px] text-[#94a3b8] mt-1 leading-snug">
                    {alert.summary}
                  </p>
                  <div className="flex items-center gap-2 mt-2.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {alert.jurisdiction}
                    </span>
                    <span className="text-[11px] text-[#64748b]">
                      {alert.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Institutional Memory */}
        <div className="glass rounded-2xl flex flex-col shadow-xl overflow-hidden">
          <div className="px-5 py-3.5 border-b border-white/[0.08] bg-white/[0.02] flex justify-between items-center">
            <h2 className="text-[15px] font-bold text-[#f8fafc] flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-indigo-400">history</span>
              Institutional Memory
            </h2>
            <span className="text-[10.5px] font-bold text-[#64748b] uppercase tracking-wider">
              Saved Cache
            </span>
          </div>

          <div className="p-5 flex flex-col gap-5 flex-1">
            {/* Recent Queries */}
            <div>
              <h3 className="text-[10.5px] font-bold text-[#64748b] uppercase tracking-wider mb-2.5">
                RECENT QUERIES
              </h3>
              <div className="flex flex-col gap-2">
                {recentQueries.map((q) => (
                  <div
                    key={q.id}
                    onClick={() => onAskGRIF(q.query)}
                    className="flex items-center justify-between p-2.5 bg-white/[0.02] border border-white/[0.08] rounded-xl hover:bg-white/[0.06] hover:border-indigo-500/40 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <span className="material-symbols-outlined text-[#64748b] group-hover:text-indigo-300 transition-colors text-[18px]">
                        search
                      </span>
                      <span className="text-[13px] text-[#cbd5e1] group-hover:text-[#f8fafc] truncate font-medium">
                        {q.query}
                      </span>
                    </div>
                    <span className="material-symbols-outlined text-[#64748b] text-[16px] opacity-0 group-hover:opacity-100 transition-opacity">
                      open_in_new
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Saved Research Briefs */}
            <div>
              <h3 className="text-[10.5px] font-bold text-[#64748b] uppercase tracking-wider mb-2.5">
                SAVED RESEARCH BRIEFS
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {savedBriefs.map((brief) => (
                  <div
                    key={brief.id}
                    onClick={() => onNavigate('research', { query: brief.title })}
                    className="p-3.5 border border-white/[0.08] rounded-xl bg-white/[0.02] hover:bg-white/[0.06] hover:border-indigo-500/40 transition-all cursor-pointer group relative overflow-hidden"
                  >
                    <div className="text-[13px] font-bold text-[#f8fafc] mb-1 group-hover:text-indigo-300 transition-colors">
                      {brief.title}
                    </div>
                    <div className="text-[11px] font-mono text-[#94a3b8]">
                      Updated: {brief.updated}
                    </div>
                    <p className="text-[11.5px] text-[#64748b] mt-1.5 line-clamp-1">
                      {brief.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
