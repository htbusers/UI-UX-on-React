import React, { useState } from 'react';
import { mockDocumentTree, mockProvisionMetadata } from '../data/mockData';
import { DocumentNode } from '../types';

interface DocumentsViewProps {
  onNavigateToCitation?: (citation: string) => void;
}

export const DocumentsView: React.FC<DocumentsViewProps> = ({ onNavigateToCitation }) => {
  const [viewMode, setViewMode] = useState<'split' | 'inline'>('split');
  const [selectedArticle, setSelectedArticle] = useState<string>('art-5');
  const [expandedTitles, setExpandedTitles] = useState<Record<string, boolean>>({
    'title-1': false,
    'title-2': true,
    'title-3': false,
    'title-4': false,
  });
  const [activeClauseHover, setActiveClauseHover] = useState<string | null>(null);

  const toggleTitle = (id: string) => {
    setExpandedTitles((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="flex-1 flex h-[calc(100vh-64px)] overflow-hidden bg-transparent">
      {/* Left Sidebar: Document Structure Tree */}
      <aside className="w-[280px] bg-white/[0.02] backdrop-blur-2xl border-r border-white/[0.08] shrink-0 flex flex-col py-3 z-20">
        <div className="px-4 pb-3 border-b border-white/[0.08] mb-2">
          <h2 className="text-[15px] font-bold text-[#f8fafc] mb-0.5">
            Document Structure
          </h2>
          <p className="text-[11.5px] text-[#94a3b8]">Navigating 113 Articles</p>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar px-2 pb-4 space-y-1">
          {mockDocumentTree.map((titleNode) => {
            const isExpanded = expandedTitles[titleNode.id];
            const hasActiveChild = titleNode.children?.some((c) => c.id === selectedArticle);

            return (
              <div key={titleNode.id}>
                <button
                  onClick={() => toggleTitle(titleNode.id)}
                  className={`w-full flex items-center justify-between text-left px-2.5 py-1.5 rounded-xl text-[12.5px] font-medium transition-all ${
                    hasActiveChild && isExpanded
                      ? 'bg-indigo-600/20 text-[#818cf8] border border-indigo-500/30 font-semibold shadow-[0_0_12px_rgba(99,102,241,0.15)]'
                      : 'text-[#94a3b8] hover:text-[#f8fafc] hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="material-symbols-outlined text-[16px] text-indigo-400">
                      {isExpanded ? 'expand_more' : 'chevron_right'}
                    </span>
                    <span className="truncate">{titleNode.title}</span>
                  </div>
                </button>

                {isExpanded && titleNode.children && (
                  <ul className="ml-5 mt-1 space-y-0.5 border-l border-white/[0.08] pl-2">
                    {childNode(titleNode, selectedArticle, setSelectedArticle)}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </aside>

      {/* Main Diff Comparison Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-transparent overflow-hidden">
        {/* Toolbar */}
        <div className="h-14 border-b border-white/[0.08] bg-white/[0.02] backdrop-blur-md flex items-center justify-between px-6 shrink-0 z-10">
          {/* Split / Inline toggles */}
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-white/[0.04] rounded-xl p-1 border border-white/[0.08]">
              <button
                onClick={() => setViewMode('split')}
                className={`px-3 py-1 text-[12.5px] font-medium rounded-lg transition-all cursor-pointer ${
                  viewMode === 'split'
                    ? 'bg-indigo-600/30 border border-indigo-400/40 text-indigo-200 shadow-xs'
                    : 'text-[#94a3b8] hover:text-[#f8fafc]'
                }`}
              >
                Split View
              </button>
              <button
                onClick={() => setViewMode('inline')}
                className={`px-3 py-1 text-[12.5px] font-medium rounded-lg transition-all cursor-pointer ${
                  viewMode === 'inline'
                    ? 'bg-indigo-600/30 border border-indigo-400/40 text-indigo-200 shadow-xs'
                    : 'text-[#94a3b8] hover:text-[#f8fafc]'
                }`}
              >
                Inline Diff
              </button>
            </div>
          </div>

          {/* Diff Legend */}
          <div className="flex items-center gap-4 text-[12px] font-medium text-[#94a3b8]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]"></span> Added
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.5)]"></span> Removed
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]"></span> Modified
            </div>
          </div>
        </div>

        {/* Diff Canvas */}
        {viewMode === 'split' ? (
          <div className="flex-1 flex overflow-hidden">
            {/* Previous Version Column (v1.4) */}
            <div className="flex-1 flex flex-col border-r border-white/[0.08] bg-white/[0.01] overflow-hidden">
              <div className="h-10 bg-white/[0.02] border-b border-white/[0.08] flex items-center px-6 shrink-0 justify-between">
                <span className="text-[11px] font-bold text-[#94a3b8] tracking-wider uppercase">
                  PREVIOUS DRAFT (v1.4)
                </span>
                <span className="text-[11.5px] text-[#64748b] font-mono">Oct 12, 2023</span>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8">
                <div className="max-w-2xl mx-auto font-serif text-[16px] leading-[28px] text-[#cbd5e1]">
                  <h3 className="font-sans text-[20px] font-bold mb-6 text-[#f8fafc]">
                    Article 5: Prohibitions
                  </h3>
                  <div className="relative mb-6">
                    <p className="mb-4 text-[#94a3b8]">1. The following artificial intelligence practices shall be prohibited:</p>
                    <div className="ml-4 space-y-4">
                      <div className="relative">
                        <p>
                          (a) the placing on the market, putting into service or use of an AI system that deploys subliminal
                          techniques beyond a person’s consciousness{' '}
                          <span className="bg-rose-500/20 text-rose-300 line-through decoration-rose-400 px-1.5 py-0.5 rounded-md border border-rose-500/30">
                            in order to materially distort a person’s behaviour
                          </span>{' '}
                          in a manner that causes or is likely to cause that person or another person physical or psychological harm;
                        </p>
                      </div>

                      <div className="relative">
                        <p>
                          (b) the placing on the market, putting into service or use of an AI system that exploits any of the
                          vulnerabilities of a specific group of persons due to their age, disability{' '}
                          <span className="bg-rose-500/20 text-rose-300 line-through decoration-rose-400 px-1.5 py-0.5 rounded-md border border-rose-500/30">
                            or social or economic situation
                          </span>
                          , with the objective or to the effect of materially distorting the behaviour of a person pertaining to that
                          group in a manner that causes or is likely to cause that person or another person physical or psychological
                          harm;
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Version Column (v2.0) */}
            <div className="flex-1 flex flex-col bg-white/[0.02] overflow-hidden">
              <div className="h-10 bg-white/[0.02] border-b border-white/[0.08] flex items-center px-6 shrink-0 justify-between">
                <span className="text-[11px] font-bold text-[#818cf8] tracking-wider uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                  CURRENT ENACTED (v2.0)
                </span>
                <span className="text-[11.5px] text-emerald-400 font-mono">
                  Effective: Aug 1, 2024
                </span>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8">
                <div className="max-w-2xl mx-auto font-serif text-[16px] leading-[28px] text-[#f8fafc]">
                  <h3 className="font-sans text-[20px] font-bold mb-6 text-[#f8fafc]">
                    Article 5: Prohibitions
                  </h3>
                  <div
                    onMouseEnter={() => setActiveClauseHover('clause-all')}
                    onMouseLeave={() => setActiveClauseHover(null)}
                    className="relative pl-4 mb-6 group cursor-pointer hover:bg-white/[0.03] rounded-xl transition-all -ml-2 p-3"
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 rounded-l opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <p className="mb-4 text-[#cbd5e1]">1. The following artificial intelligence practices shall be prohibited:</p>
                    <div className="ml-4 space-y-4">
                      {/* Clause (a) */}
                      <div className="relative pl-3">
                        <div className="diff-tag bg-amber-400"></div>
                        <p>
                          (a) the placing on the market, putting into service or use of an AI system that deploys subliminal
                          techniques beyond a person’s consciousness{' '}
                          <span className="bg-amber-500/20 text-amber-200 font-medium px-1.5 py-0.5 rounded-md border border-amber-500/30">
                            or purposefully manipulative or deceptive techniques,
                          </span>{' '}
                          in a manner that causes or is likely to cause that person or another person physical or psychological harm;
                        </p>
                      </div>

                      {/* Clause (b) */}
                      <div className="relative pl-3">
                        <div className="diff-tag bg-amber-400"></div>
                        <p>
                          (b) the placing on the market, putting into service or use of an AI system that exploits any of the
                          vulnerabilities of a specific group of persons due to their age, disability{' '}
                          <span className="bg-amber-500/20 text-amber-200 font-medium px-1.5 py-0.5 rounded-md border border-amber-500/30">
                            or a specific social or economic situation
                          </span>
                          , with the objective or to the effect of materially distorting the behaviour of a person pertaining to that
                          group in a manner that causes or is likely to cause that person or another person physical or psychological
                          harm;
                        </p>
                      </div>

                      {/* Clause (c) */}
                      <div className="relative pl-3">
                        <div className="diff-tag bg-emerald-400"></div>
                        <p className="bg-emerald-500/15 text-emerald-200 p-3 rounded-xl border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                          (c) the placing on the market, putting into service or use of biometric categorisation systems that
                          categorise individually natural persons based on their biometric data to deduce or infer their race,
                          political opinions, trade union membership, religious or philosophical beliefs, sex life or sexual
                          orientation.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Inline Diff View */
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10 bg-transparent">
            <div className="max-w-3xl mx-auto font-serif text-[16px] leading-[30px] text-[#f8fafc]">
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/[0.08]">
                <h3 className="font-sans text-[20px] font-bold text-[#f8fafc]">
                  Article 5 (Unified Diff View)
                </h3>
                <span className="text-[12px] font-sans px-2.5 py-1 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-medium">
                  Comparing v1.4 → v2.0
                </span>
              </div>

              <p className="mb-4 text-[#94a3b8]">1. The following artificial intelligence practices shall be prohibited:</p>
              <div className="ml-4 space-y-4">
                <div className="p-4 rounded-xl border border-white/[0.08] bg-white/[0.02]">
                  <p>
                    (a) the placing on the market, putting into service or use of an AI system that deploys subliminal techniques
                    beyond a person’s consciousness{' '}
                    <span className="bg-rose-500/20 text-rose-300 line-through decoration-rose-400 px-1.5 py-0.5 rounded-md border border-rose-500/30 mr-1.5">
                      in order to materially distort a person’s behaviour
                    </span>
                    <span className="bg-amber-500/20 text-amber-200 font-medium px-1.5 py-0.5 rounded-md border border-amber-500/30">
                      or purposefully manipulative or deceptive techniques,
                    </span>{' '}
                    in a manner that causes or is likely to cause that person or another person physical or psychological harm;
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-white/[0.08] bg-white/[0.02]">
                  <p>
                    (b) the placing on the market, putting into service or use of an AI system that exploits any of the
                    vulnerabilities of a specific group of persons due to their age, disability{' '}
                    <span className="bg-rose-500/20 text-rose-300 line-through decoration-rose-400 px-1.5 py-0.5 rounded-md border border-rose-500/30 mr-1.5">
                      or social or economic situation
                    </span>
                    <span className="bg-amber-500/20 text-amber-200 font-medium px-1.5 py-0.5 rounded-md border border-amber-500/30">
                      or a specific social or economic situation
                    </span>
                    , with the objective or to the effect of materially distorting the behaviour of a person pertaining to that
                    group in a manner that causes or is likely to cause that person or another person physical or psychological
                    harm;
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                  <p className="text-emerald-200">
                    + (c) the placing on the market, putting into service or use of biometric categorisation systems that
                    categorise individually natural persons based on their biometric data to deduce or infer their race,
                    political opinions, trade union membership, religious or philosophical beliefs, sex life or sexual
                    orientation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Right Context Panel: Provision Metadata */}
      <aside className="w-[320px] bg-white/[0.02] backdrop-blur-2xl border-l border-white/[0.08] flex flex-col shrink-0 z-20">
        <div className="p-4 border-b border-white/[0.08] flex items-center gap-2 bg-white/[0.02]">
          <span className="material-symbols-outlined text-indigo-400 text-[20px]">info</span>
          <h3 className="text-[15px] font-bold text-[#f8fafc]">
            Provision Metadata
          </h3>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
          {/* Identification */}
          <div>
            <h4 className="text-[10.5px] font-bold text-[#64748b] uppercase tracking-wider mb-2">
              IDENTIFICATION
            </h4>
            <div className="bg-white/[0.03] p-3.5 rounded-xl border border-white/[0.08]">
              <div className="grid grid-cols-3 gap-2 text-[12.5px]">
                <span className="text-[#94a3b8]">Citation:</span>
                <span className="col-span-2 font-medium text-[#f8fafc] font-serif">
                  {mockProvisionMetadata.citation}
                </span>

                <span className="text-[#94a3b8]">Authority:</span>
                <span className="col-span-2 font-medium text-[#cbd5e1]">
                  {mockProvisionMetadata.authority}
                </span>

                <span className="text-[#94a3b8]">Status:</span>
                <span className="col-span-2 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="font-semibold text-emerald-400 text-[12px]">
                    {mockProvisionMetadata.status}
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Semantic Relationships */}
          <div>
            <h4 className="text-[10.5px] font-bold text-[#64748b] uppercase tracking-wider mb-2">
              RELATIONSHIPS
            </h4>
            <div className="space-y-2">
              {mockProvisionMetadata.relationships.map((rel, idx) => (
                <div
                  key={idx}
                  onClick={() => onNavigateToCitation?.(rel.targetId)}
                  className="border border-white/[0.08] rounded-xl p-3 text-[12.5px] bg-white/[0.02] hover:bg-white/[0.05] hover:border-indigo-500/40 cursor-pointer transition-all"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span
                      className={`text-[10.5px] font-bold uppercase tracking-wider ${
                        rel.type === 'Defines Penalty'
                          ? 'text-rose-400'
                          : 'text-indigo-300'
                      }`}
                    >
                      {rel.type}
                    </span>
                    <span className="material-symbols-outlined text-[14px] text-[#64748b]">
                      {rel.type === 'Defines Penalty' ? 'arrow_forward' : 'sync_alt'}
                    </span>
                  </div>
                  <span className="font-bold text-[#f8fafc] block">{rel.title}</span>
                  <p className="text-[11.5px] text-[#94a3b8] mt-1 line-clamp-2">
                    {rel.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Amendment History Timeline */}
          <div>
            <h4 className="text-[10.5px] font-bold text-[#64748b] uppercase tracking-wider mb-2">
              AMENDMENT HISTORY
            </h4>
            <div className="relative border-l border-white/[0.08] ml-2 pl-4 space-y-4">
              {mockProvisionMetadata.amendmentHistory.map((item, idx) => (
                <div key={idx} className="relative">
                  <div
                    className={`absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full ring-4 ring-[#020617] ${
                      item.isCurrent ? 'bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.8)]' : 'bg-slate-600'
                    }`}
                  ></div>
                  <p
                    className={`text-[12px] font-bold ${
                      item.isCurrent ? 'text-[#f8fafc]' : 'text-[#94a3b8]'
                    }`}
                  >
                    {item.version}
                  </p>
                  <p className="text-[11px] text-[#64748b] font-mono">{item.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

function childNode(titleNode: DocumentNode, selectedArticle: string, setSelectedArticle: (id: string) => void) {
  return titleNode.children?.map((child) => {
    const isSelected = selectedArticle === child.id;
    return (
      <li key={child.id}>
        <button
          onClick={() => setSelectedArticle(child.id)}
          className={`w-full flex items-center text-left px-2 py-1.5 rounded-lg text-[12px] transition-all ${
            isSelected
              ? 'text-indigo-300 font-semibold bg-indigo-500/15 border border-indigo-500/25'
              : 'text-[#94a3b8] hover:text-[#f8fafc] hover:bg-white/[0.03]'
          }`}
        >
          <span className="truncate">{child.title}</span>
        </button>
      </li>
    );
  });
}

