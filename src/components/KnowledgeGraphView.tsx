import React, { useState } from 'react';
import { mockGraphNodes, mockGraphLinks } from '../data/mockData';
import { GraphNode } from '../types';

export const KnowledgeGraphView: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [activeNode, setActiveNode] = useState<GraphNode | null>(mockGraphNodes[1]);
  const [searchFilter, setSearchFilter] = useState('');

  const filteredNodes = mockGraphNodes.filter((node) => {
    const matchesType = selectedType === 'all' || node.type === selectedType;
    const matchesSearch = node.label.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-transparent">
      {/* Header & Controls */}
      <div className="p-4 md:px-6 bg-white/[0.02] backdrop-blur-md border-b border-white/[0.08] flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div>
          <h1 className="text-[18px] md:text-[20px] font-bold text-[#f8fafc] flex items-center gap-2">
            <span className="material-symbols-outlined text-indigo-400">account_tree</span>
            Regulatory Knowledge Graph
          </h1>
          <p className="text-[12px] text-[#94a3b8]">
            Semantic ontology mapping jurisdictions, authorities, legal obligations, and penalty provisions.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2">
          <div className="flex bg-white/[0.04] p-1 rounded-xl border border-white/[0.08]">
            {['all', 'jurisdiction', 'authority', 'regulation', 'obligation', 'penalty'].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-2.5 py-1 text-[11px] font-bold uppercase rounded-lg transition-all capitalize cursor-pointer ${
                  selectedType === type
                    ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                    : 'text-[#94a3b8] hover:text-[#f8fafc]'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Canvas & Detail Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Visual Graph Explorer */}
        <div className="flex-1 relative bg-transparent p-6 overflow-auto custom-scrollbar flex items-center justify-center">
          <div className="relative w-[900px] h-[550px] glass rounded-3xl shadow-2xl p-8 overflow-hidden">
            {/* Background grid dots */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />

            {/* SVG Connecting Links */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <marker
                  id="arrow"
                  viewBox="0 0 10 10"
                  refX="22"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
                </marker>
              </defs>
              {/* EU lines */}
              <line x1="180" y1="120" x2="380" y2="120" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrow)" />
              <line x1="380" y1="120" x2="620" y2="120" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrow)" />
              <line x1="620" y1="120" x2="780" y2="120" stroke="#f43f5e" strokeWidth="2" markerEnd="url(#arrow)" />
              <line x1="380" y1="120" x2="520" y2="230" stroke="#a855f7" strokeWidth="2" strokeDasharray="4" markerEnd="url(#arrow)" />

              {/* PK lines */}
              <line x1="180" y1="380" x2="380" y2="380" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow)" />
              <line x1="380" y1="380" x2="620" y2="380" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow)" />
              <line x1="620" y1="380" x2="780" y2="380" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow)" />
              <line x1="620" y1="380" x2="780" y2="470" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4" markerEnd="url(#arrow)" />
            </svg>

            {/* Positioned Node Elements */}
            <div className="relative w-full h-full">
              {/* Cluster 1: EU Regulation */}
              <div
                onClick={() => setActiveNode(mockGraphNodes[0])}
                className="absolute left-[100px] top-[90px] px-4 py-2.5 rounded-xl bg-indigo-950/80 text-indigo-200 border border-indigo-500/40 shadow-lg cursor-pointer hover:scale-105 transition-all text-[12.5px] font-bold flex items-center gap-2 hover:border-indigo-400"
              >
                <span className="material-symbols-outlined text-[16px] text-indigo-400">public</span>
                European Union
              </div>

              <div
                onClick={() => setActiveNode(mockGraphNodes[1])}
                className="absolute left-[300px] top-[90px] px-4 py-2.5 rounded-xl bg-indigo-900/60 text-white border border-indigo-400/50 shadow-lg cursor-pointer hover:scale-105 transition-all text-[12.5px] font-bold flex items-center gap-2 hover:shadow-[0_0_15px_rgba(99,102,241,0.4)]"
              >
                <span className="material-symbols-outlined text-[16px] text-indigo-300">description</span>
                EU AI Act (2024/1689)
              </div>

              <div
                onClick={() => setActiveNode(mockGraphNodes[2])}
                className="absolute left-[540px] top-[90px] px-4 py-2.5 rounded-xl bg-white/[0.06] text-[#f8fafc] border border-white/[0.15] shadow-lg cursor-pointer hover:scale-105 transition-all text-[12.5px] font-medium flex items-center gap-2 hover:bg-white/[0.1]"
              >
                <span className="material-symbols-outlined text-[16px] text-purple-400">task_alt</span>
                Article 5: Prohibitions
              </div>

              <div
                onClick={() => setActiveNode(mockGraphNodes[3])}
                className="absolute left-[720px] top-[90px] px-4 py-2.5 rounded-xl bg-rose-950/80 text-rose-200 border border-rose-500/50 shadow-lg cursor-pointer hover:scale-105 transition-all text-[12.5px] font-bold flex items-center gap-2 hover:shadow-[0_0_15px_rgba(244,63,94,0.4)]"
              >
                <span className="material-symbols-outlined text-[16px] text-rose-400">gavel</span>
                Article 71: Penalties (€35M)
              </div>

              <div
                onClick={() => setActiveNode(mockGraphNodes[4])}
                className="absolute left-[440px] top-[200px] px-4 py-2.5 rounded-xl bg-white/[0.05] text-[#cbd5e1] border border-white/[0.1] shadow-lg cursor-pointer hover:scale-105 transition-all text-[12.5px] font-medium flex items-center gap-2 hover:bg-white/[0.08]"
              >
                <span className="material-symbols-outlined text-[16px] text-indigo-400">domain</span>
                European AI Office
              </div>

              {/* Cluster 2: Pakistan SBP AML */}
              <div
                onClick={() => setActiveNode(mockGraphNodes[5])}
                className="absolute left-[100px] top-[350px] px-4 py-2.5 rounded-xl bg-emerald-950/80 text-emerald-200 border border-emerald-500/40 shadow-lg cursor-pointer hover:scale-105 transition-all text-[12.5px] font-bold flex items-center gap-2 hover:border-emerald-400"
              >
                <span className="material-symbols-outlined text-[16px] text-emerald-400">public</span>
                Pakistan (State Bank)
              </div>

              <div
                onClick={() => setActiveNode(mockGraphNodes[7])}
                className="absolute left-[300px] top-[350px] px-4 py-2.5 rounded-xl bg-indigo-900/60 text-white border border-indigo-400/50 shadow-lg cursor-pointer hover:scale-105 transition-all text-[12.5px] font-bold flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[16px] text-indigo-300">account_balance</span>
                AML/CFT Regulations 2023
              </div>

              <div
                onClick={() => setActiveNode(mockGraphNodes[8])}
                className="absolute left-[540px] top-[350px] px-4 py-2.5 rounded-xl bg-white/[0.06] text-[#f8fafc] border border-white/[0.15] shadow-lg cursor-pointer hover:scale-105 transition-all text-[12.5px] font-medium flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[16px] text-indigo-400">verified_user</span>
                Customer Due Diligence (CDD/EDD)
              </div>

              <div
                onClick={() => setActiveNode(mockGraphNodes[9])}
                className="absolute left-[720px] top-[350px] px-4 py-2.5 rounded-xl bg-amber-950/80 text-amber-200 border border-amber-500/40 shadow-lg cursor-pointer hover:scale-105 transition-all text-[12.5px] font-medium flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[16px] text-amber-400">flag</span>
                STR Filing (Financial Monitoring Unit)
              </div>

              <div
                onClick={() => setActiveNode({ id: 'pep-node', label: 'Politically Exposed Persons (PEPs)', type: 'obligation', group: 3, description: 'Mandatory enhanced scrutiny for senior public officials.' })}
                className="absolute left-[700px] top-[440px] px-4 py-2 rounded-xl bg-rose-950/60 text-rose-200 border border-rose-500/30 shadow-lg cursor-pointer hover:scale-105 transition-all text-[12px] font-medium"
              >
                High Risk PEP Categorisation
              </div>
            </div>
          </div>
        </div>

        {/* Right Node Inspector */}
        <aside className="w-80 bg-white/[0.02] backdrop-blur-2xl border-l border-white/[0.08] p-5 flex flex-col shrink-0 overflow-y-auto custom-scrollbar">
          <div className="pb-3 border-b border-white/[0.08] mb-4">
            <h3 className="text-[15px] font-bold text-[#f8fafc]">
              Node Details
            </h3>
            <p className="text-[11px] text-[#64748b]">Entity graph inspector</p>
          </div>

          {activeNode ? (
            <div className="space-y-4 text-[13px]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 px-2 py-0.5 rounded-md bg-indigo-500/20 border border-indigo-500/30">
                  {activeNode.type}
                </span>
                <h2 className="text-[16px] font-bold text-[#f8fafc] mt-2">
                  {activeNode.label}
                </h2>
                <p className="text-[#94a3b8] mt-1 text-[12.5px] leading-relaxed">
                  {activeNode.description || 'Verified regulatory intelligence node.'}
                </p>
              </div>

              <div className="bg-white/[0.03] p-3.5 rounded-xl border border-white/[0.08] space-y-2">
                <div className="text-[10.5px] font-bold text-[#64748b] uppercase tracking-wider">
                  Connected Relationships
                </div>
                <ul className="space-y-1.5 text-[12px]">
                  <li className="flex items-center gap-1.5 text-[#cbd5e1]">
                    <span className="material-symbols-outlined text-[14px] text-indigo-400">arrow_forward</span>
                    Enforces binding mandates in Jurisdiction
                  </li>
                  <li className="flex items-center gap-1.5 text-[#cbd5e1]">
                    <span className="material-symbols-outlined text-[14px] text-purple-400">sync_alt</span>
                    Cross-references Annex III classification rules
                  </li>
                </ul>
              </div>

              <button
                onClick={() => alert(`Navigating to full statutory dossier for: ${activeNode.label}`)}
                className="w-full py-2.5 bg-indigo-600 text-white rounded-xl font-semibold text-[12.5px] hover:bg-indigo-500 transition-all shadow-[0_0_15px_rgba(99,102,241,0.4)] cursor-pointer"
              >
                Inspect Statutory Source
              </button>
            </div>
          ) : (
            <p className="text-[13px] text-[#64748b]">Select any node in the graph to inspect metadata and relationships.</p>
          )}
        </aside>
      </div>
    </div>
  );
};
