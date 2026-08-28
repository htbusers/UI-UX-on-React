import React, { useState } from 'react';

export const ApiView: React.FC = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<'diff' | 'synthesize' | 'review'>('diff');
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTestApi = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (selectedEndpoint === 'diff') {
        setApiResponse(
          JSON.stringify(
            {
              status: 'success',
              citation: 'Regulation (EU) 2024/1689 Art. 5',
              previous_version: 'v1.4',
              current_version: 'v2.0',
              diff_summary: {
                added_clauses: ['Article 5(1)(c) - Biometric categorisation'],
                modified_clauses: ['Article 5(1)(a)', 'Article 5(1)(b)'],
                removed_clauses: [],
              },
              penalty_reference: 'Art. 71 (€35M / 7% turnover)',
            },
            null,
            2
          )
        );
      } else if (selectedEndpoint === 'synthesize') {
        setApiResponse(
          JSON.stringify(
            {
              status: 'success',
              query: 'AML obligations for Pakistani fintechs',
              jurisdiction: 'PK',
              authorities: ['State Bank of Pakistan', 'Financial Monitoring Unit'],
              statutes: ['SBP AML/CFT Regs 2023 Sec 12', 'AML Act 2010 Sec 18'],
              mandates: ['Customer Due Diligence (CDD)', 'Suspicious Transaction Reporting (STR) within 3 days'],
            },
            null,
            2
          )
        );
      } else {
        setApiResponse(
          JSON.stringify(
            {
              status: 'success',
              queue_pending: 12,
              next_item: {
                id: 'RC-2024-891A',
                document: '2024-EU-AI-Act-Draft-v3.pdf',
                confidence: 0.62,
                priority: 'HIGH',
              },
            },
            null,
            2
          )
        );
      }
    }, 400);
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-64px)] overflow-y-auto custom-scrollbar p-6 bg-transparent">
      <div className="max-w-5xl mx-auto w-full space-y-6">
        <div className="pb-4 border-b border-white/[0.08]">
          <h1 className="text-[22px] md:text-[24px] font-bold text-[#f8fafc] flex items-center gap-2">
            <span className="material-symbols-outlined text-indigo-400">api</span>
            Regulatory Intelligence API
          </h1>
          <p className="text-[13px] text-[#94a3b8] mt-0.5">
            Programmatic REST endpoints for statutory diffs, AI classification pipelines, and knowledge graph queries.
          </p>
        </div>

        {/* API Playground Card */}
        <div className="glass-card rounded-2xl p-6 md:p-8 space-y-5">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setSelectedEndpoint('diff');
                setApiResponse(null);
              }}
              className={`px-3.5 py-2 rounded-xl text-[12.5px] font-medium transition-all cursor-pointer ${
                selectedEndpoint === 'diff'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white/[0.04] text-[#94a3b8] hover:text-[#f8fafc] border border-white/[0.08]'
              }`}
            >
              POST /v1/provisions/diff
            </button>
            <button
              onClick={() => {
                setSelectedEndpoint('synthesize');
                setApiResponse(null);
              }}
              className={`px-3.5 py-2 rounded-xl text-[12.5px] font-medium transition-all cursor-pointer ${
                selectedEndpoint === 'synthesize'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white/[0.04] text-[#94a3b8] hover:text-[#f8fafc] border border-white/[0.08]'
              }`}
            >
              POST /v1/research/synthesize
            </button>
            <button
              onClick={() => {
                setSelectedEndpoint('review');
                setApiResponse(null);
              }}
              className={`px-3.5 py-2 rounded-xl text-[12.5px] font-medium transition-all cursor-pointer ${
                selectedEndpoint === 'review'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white/[0.04] text-[#94a3b8] hover:text-[#f8fafc] border border-white/[0.08]'
              }`}
            >
              GET /v1/review/queue
            </button>
          </div>

          <div className="bg-black/40 border border-white/[0.08] p-4 rounded-xl font-mono text-[13px] text-[#f8fafc] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-x-auto">
              <span className="text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[11px]">
                {selectedEndpoint === 'review' ? 'GET' : 'POST'}
              </span>
              <span className="text-[#cbd5e1] text-[12.5px]">
                https://api.grif-regulatory.org/v1/
                {selectedEndpoint === 'diff'
                  ? 'provisions/diff'
                  : selectedEndpoint === 'synthesize'
                  ? 'research/synthesize'
                  : 'review/queue'}
              </span>
            </div>
            <button
              onClick={handleTestApi}
              disabled={isLoading}
              className="px-4 py-2 bg-indigo-600 text-white text-[12px] font-semibold rounded-lg hover:bg-indigo-500 transition-all cursor-pointer flex items-center gap-1.5 shadow-[0_0_15px_rgba(99,102,241,0.4)] shrink-0"
            >
              {isLoading ? 'Running...' : 'Execute Request'}
            </button>
          </div>

          {/* Response Payload */}
          {apiResponse && (
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-[#64748b] uppercase tracking-wider">
                Response Payload (200 OK • 38ms)
              </span>
              <pre className="bg-black/50 p-4 rounded-xl font-mono text-[12px] text-emerald-400 overflow-x-auto border border-emerald-500/20">
                {apiResponse}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
