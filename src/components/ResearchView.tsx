import React, { useState } from 'react';
import { mockResearchFindings } from '../data/mockData';
import { ResearchCitation, NavTab } from '../types';

interface ResearchViewProps {
  initialQuery?: string;
  onNavigateToDocument: (docRef: string) => void;
  onNavigateToGraph: () => void;
}

export const ResearchView: React.FC<ResearchViewProps> = ({
  initialQuery = 'What are the current AML obligations for fintechs?',
  onNavigateToDocument,
  onNavigateToGraph,
}) => {
  const [currentQuery, setCurrentQuery] = useState(initialQuery);
  const [selectedCitationId, setSelectedCitationId] = useState<string>('cite-1');
  const [isEvidenceOpen, setIsEvidenceOpen] = useState(true);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [selectedJurisdictions, setSelectedJurisdictions] = useState<string[]>(['Pakistan', 'EU']);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeGraphNode, setActiveGraphNode] = useState<string | null>(null);

  const activeCitation: ResearchCitation =
    mockResearchFindings.citations[selectedCitationId] ||
    mockResearchFindings.citations['cite-1'];

  // Graph nodes for SBP AML/CFT context
  const graphEntities = [
    { id: 'sbp', label: 'State Bank of Pakistan', type: 'authority', x: 220, y: 50 },
    { id: 'emi', label: 'Electronic Money Inst. (EMIs)', type: 'entity', x: 100, y: 140 },
    { id: 'cdd', label: 'Mandatory CDD / EDD', type: 'obligation', x: 340, y: 140 },
    { id: 'pep', label: 'High Risk / PEPs', type: 'risk', x: 450, y: 220 },
    { id: 'fmu', label: 'Financial Monitoring Unit', type: 'authority', x: 100, y: 250 },
    { id: 'str', label: 'Suspicious Trans. Report (STR)', type: 'obligation', x: 250, y: 220 },
  ];

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-transparent">
      {/* Search Header Bar with Filter */}
      <div className="bg-white/[0.02] backdrop-blur-md border-b border-white/[0.08] px-6 py-2.5 flex items-center justify-between gap-4 shrink-0 z-10">
        <div className="relative flex-1 max-w-3xl">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b] text-[20px]">
            search
          </span>
          <input
            type="text"
            value={currentQuery}
            onChange={(e) => setCurrentQuery(e.target.value)}
            className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl py-2 pl-10 pr-24 text-[13.5px] text-[#f8fafc] focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all placeholder:text-[#64748b]"
            placeholder="Search regulatory synthesis..."
          />
          <button
            onClick={() => setFilterModalOpen(!filterModalOpen)}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] px-2.5 py-1 rounded-lg text-[11px] font-bold text-[#cbd5e1] flex items-center gap-1 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[14px]">tune</span> Filter
          </button>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsEvidenceOpen(!isEvidenceOpen)}
            className={`px-3 py-1.5 rounded-xl border text-[12.5px] font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
              isEvidenceOpen
                ? 'bg-indigo-600/30 border-indigo-400/40 text-indigo-200 shadow-xs'
                : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.08] text-[#cbd5e1]'
            }`}
            title="Toggle Evidence Source panel"
          >
            <span className="material-symbols-outlined text-[17px]">fact_check</span>
            <span className="hidden sm:inline">Evidence Panel</span>
          </button>
        </div>
      </div>

      {/* Main Workspace: Left Research Analysis + Right Evidence Panel */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Research Analysis */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8 bg-transparent">
          <div className="max-w-4xl mx-auto w-full">
            {/* Header / Synthesis metadata */}
            <header className="mb-8 border-b border-white/[0.08] pb-6">
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="px-2.5 py-0.5 bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-[11px] font-bold rounded-lg uppercase tracking-wider">
                  Analysis Complete
                </span>
                <span className="text-[#64748b] text-[12px]">Generated today at 14:32</span>
                <span className="text-[#64748b] text-[12px]">•</span>
                <span className="text-emerald-400 text-[12px] font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Grounded in Primary Statutes
                </span>
              </div>

              <h1 className="text-[24px] md:text-[28px] font-bold text-[#f8fafc] mb-3 tracking-tight">
                {mockResearchFindings.title}
              </h1>

              <p className="font-serif text-[16.5px] text-[#cbd5e1] leading-[28px]">
                {mockResearchFindings.summary}
              </p>
            </header>

            {/* Core Findings Section */}
            <section className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[17px] font-bold text-[#f8fafc]">
                  Core Findings
                </h2>
                <span className="text-[12px] text-[#64748b]">
                  Click citations to inspect authoritative statutory extracts
                </span>
              </div>

              <div className="glass rounded-2xl p-6 shadow-xl space-y-6">
                {mockResearchFindings.findings.map((item) => {
                  const isSelected = selectedCitationId === item.citationId;
                  const citation = mockResearchFindings.citations[item.citationId];

                  return (
                    <div
                      key={item.number}
                      className={`relative pl-6 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1.5 before:rounded-full transition-all ${
                        item.number === 1
                          ? 'before:bg-indigo-500 before:shadow-[0_0_10px_rgba(99,102,241,0.6)]'
                          : item.number === 2
                          ? 'before:bg-slate-400'
                          : 'before:bg-purple-500 before:shadow-[0_0_10px_rgba(168,85,247,0.6)]'
                      }`}
                    >
                      <h3 className="text-[15px] font-bold text-[#f8fafc] mb-1.5">
                        {item.number}. {item.title}
                      </h3>
                      <p className="text-[13.5px] text-[#94a3b8] leading-relaxed inline">
                        {item.content}
                      </p>

                      {citation && (
                        <button
                          onClick={() => {
                            setSelectedCitationId(item.citationId);
                            setIsEvidenceOpen(true);
                          }}
                          className={`inline-flex items-center justify-center border rounded-lg px-2.5 py-0.5 ml-2 font-serif text-[12px] cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-indigo-600 text-white border-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.4)]'
                              : 'bg-white/[0.04] hover:bg-white/[0.08] text-indigo-300 border-indigo-500/30'
                          }`}
                        >
                          {citation.label}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Knowledge Graph Context Visualizer */}
            <section className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-[17px] font-bold text-[#f8fafc]">
                  Knowledge Graph Context
                </h2>
                <button
                  onClick={onNavigateToGraph}
                  className="text-[12px] text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  Expand Full Graph <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>

              <div className="glass rounded-2xl h-[300px] relative overflow-hidden flex flex-col p-4 shadow-xl">
                <div className="flex items-center justify-between mb-2 text-[12px] text-[#94a3b8]">
                  <span className="font-semibold uppercase tracking-wider text-[10px] text-indigo-300">
                    Inter-Agency & Compliance Dependency Web
                  </span>
                  <span className="text-[11px] bg-white/[0.05] border border-white/[0.08] px-2 py-0.5 rounded-md text-[#cbd5e1]">
                    Interactive Preview
                  </span>
                </div>

                <div className="flex-1 relative w-full bg-black/30 rounded-xl border border-white/[0.06] overflow-hidden">
                  {/* SVG Canvas for interactive nodes */}
                  <svg className="w-full h-full">
                    {/* SVG Connector Lines */}
                    <line x1="220" y1="65" x2="100" y2="140" stroke="#475569" strokeWidth="2" strokeDasharray="4" />
                    <line x1="220" y1="65" x2="340" y2="140" stroke="#6366f1" strokeWidth="2" />
                    <line x1="340" y1="140" x2="450" y2="220" stroke="#f43f5e" strokeWidth="2" />
                    <line x1="100" y1="140" x2="250" y2="220" stroke="#6366f1" strokeWidth="2" />
                    <line x1="250" y1="220" x2="100" y2="250" stroke="#eab308" strokeWidth="2" strokeDasharray="3" />
                  </svg>

                  {/* Interactive Nodes */}
                  {graphEntities.map((node) => {
                    const isHovered = activeGraphNode === node.id;
                    return (
                      <div
                        key={node.id}
                        onMouseEnter={() => setActiveGraphNode(node.id)}
                        onMouseLeave={() => setActiveGraphNode(null)}
                        style={{ left: `${node.x}px`, top: `${node.y}px` }}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl border text-[11px] font-semibold cursor-pointer transition-all ${
                          node.type === 'authority'
                            ? 'bg-indigo-950/80 text-indigo-200 border-indigo-500/50 shadow-[0_0_12px_rgba(99,102,241,0.2)]'
                            : node.type === 'risk'
                            ? 'bg-rose-950/80 text-rose-200 border-rose-500/50 shadow-[0_0_12px_rgba(244,63,94,0.2)]'
                            : node.type === 'obligation'
                            ? 'bg-indigo-900/60 text-indigo-100 border-indigo-400/50'
                            : 'bg-white/[0.08] text-white border-white/[0.2]'
                        } ${isHovered ? 'scale-110 ring-2 ring-indigo-400 z-20' : ''}`}
                      >
                        {node.label}
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Right: Evidence Panel Context */}
        {isEvidenceOpen && (
          <aside className="w-[360px] bg-white/[0.02] backdrop-blur-2xl border-l border-white/[0.08] shrink-0 flex flex-col h-full z-20">
            {/* Panel Header */}
            <div className="p-4 border-b border-white/[0.08] bg-white/[0.02] flex justify-between items-center shrink-0">
              <h3 className="text-[15px] font-bold text-[#f8fafc] flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-indigo-400">fact_check</span>
                Evidence Source
              </h3>
              <button
                onClick={() => setIsEvidenceOpen(false)}
                className="text-[#94a3b8] hover:text-[#f8fafc] p-1 rounded-lg hover:bg-white/[0.06] transition-all"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Content Body */}
            <div className="p-4 flex flex-col gap-4 overflow-y-auto custom-scrollbar flex-1">
              {/* Metadata Block */}
              <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-3.5 text-[12.5px] space-y-2.5">
                <div className="flex justify-between items-baseline">
                  <span className="text-[10.5px] font-bold text-[#64748b] uppercase tracking-wider">
                    Authority
                  </span>
                  <span className="font-semibold text-[#f8fafc] text-right">
                    {activeCitation.authority}
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-[10.5px] font-bold text-[#64748b] uppercase tracking-wider">
                    Document
                  </span>
                  <span className="font-semibold text-[#cbd5e1] text-right truncate max-w-[200px]">
                    {activeCitation.document}
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-[10.5px] font-bold text-[#64748b] uppercase tracking-wider">
                    Version
                  </span>
                  <span className="text-[#cbd5e1] text-right font-medium">
                    {activeCitation.version}
                  </span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-white/[0.06]">
                  <span className="text-[10.5px] font-bold text-[#64748b] uppercase tracking-wider">
                    Location
                  </span>
                  <span className="text-indigo-400 text-right font-mono text-[12px]">
                    {activeCitation.location}
                  </span>
                </div>
              </div>

              {/* Source Text Highlight */}
              <div>
                <h4 className="text-[10.5px] font-bold text-[#64748b] uppercase tracking-wider mb-2">
                  Source Text Extract
                </h4>
                <div className="font-serif text-[14.5px] text-amber-200 bg-amber-500/10 p-4 rounded-xl border border-amber-500/30 leading-relaxed shadow-sm">
                  {activeCitation.sourceExtract}
                </div>
              </div>

              {/* Bottom Call to Action */}
              <div className="mt-auto pt-4">
                <button
                  onClick={() => onNavigateToDocument('eu-ai-act-art-5')}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-[13.5px] py-2.5 rounded-xl transition-all flex justify-center items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(99,102,241,0.4)]"
                >
                  <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                  View Full Document
                </button>
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* Filter Modal */}
      {filterModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass border border-white/[0.15] rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[16px] font-bold text-[#f8fafc]">
                Filter Research Parameters
              </h3>
              <button
                onClick={() => setFilterModalOpen(false)}
                className="text-[#94a3b8] hover:text-[#f8fafc]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-4 text-[13px]">
              <div>
                <label className="block text-[10.5px] font-bold text-[#64748b] uppercase tracking-wider mb-2">
                  Jurisdictions
                </label>
                <div className="flex flex-wrap gap-2">
                  {['Pakistan (SBP)', 'European Union', 'United States (SEC/Fed)', 'United Kingdom (FCA)', 'Singapore (MAS)'].map(
                    (j) => (
                      <button
                        key={j}
                        onClick={() => {
                          setSelectedJurisdictions((prev) =>
                            prev.includes(j) ? prev.filter((x) => x !== j) : [...prev, j]
                          );
                        }}
                        className={`px-3 py-1 rounded-xl border text-[12px] transition-all cursor-pointer ${
                          selectedJurisdictions.includes(j)
                            ? 'bg-indigo-600 text-white border-indigo-400 shadow-sm'
                            : 'bg-white/[0.04] text-[#cbd5e1] border-white/[0.08] hover:bg-white/[0.08]'
                        }`}
                      >
                        {j}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[10.5px] font-bold text-[#64748b] uppercase tracking-wider mb-2">
                  Legal Sector
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3 py-2 text-[13px] text-[#f8fafc] outline-none"
                >
                  <option value="All" className="bg-[#020617] text-white">All Sectors</option>
                  <option value="AML" className="bg-[#020617] text-white">Anti-Money Laundering (AML/CFT)</option>
                  <option value="AI" className="bg-[#020617] text-white">Artificial Intelligence Governance</option>
                  <option value="Privacy" className="bg-[#020617] text-white">Data Privacy & Localization</option>
                  <option value="Securities" className="bg-[#020617] text-white">Securities & Capital Markets</option>
                </select>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-white/[0.08]">
                <button
                  onClick={() => setFilterModalOpen(false)}
                  className="px-4 py-1.5 rounded-xl border border-white/[0.1] text-[13px] text-[#cbd5e1] hover:bg-white/[0.05]"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setFilterModalOpen(false)}
                  className="px-4 py-1.5 rounded-xl bg-indigo-600 text-white text-[13px] font-semibold hover:bg-indigo-500 shadow-sm"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
