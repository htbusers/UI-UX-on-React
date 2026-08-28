import React from 'react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-md">
      <div className="glass rounded-3xl p-6 md:p-8 max-w-xl w-full shadow-2xl animate-in fade-in zoom-in-95 duration-150 border border-white/[0.12]">
        <div className="flex justify-between items-center pb-3 border-b border-white/[0.08]">
          <h2 className="text-[18px] font-bold text-[#f8fafc] flex items-center gap-2">
            <span className="material-symbols-outlined text-indigo-400">help</span>
            GRIF Framework Guide
          </h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/[0.08] text-[#94a3b8] hover:text-[#f8fafc] transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="py-4 space-y-4 text-[13px] text-[#cbd5e1] overflow-y-auto max-h-[60vh] custom-scrollbar pr-1">
          <div>
            <h3 className="font-bold text-[#f8fafc] text-[14px] mb-1">
              1. Intelligence Dashboard
            </h3>
            <p className="text-[#94a3b8] text-[12.5px] leading-relaxed">
              Natural language regulatory synthesis query bar, real-time alert streams, and institutional query caching across 14 monitored jurisdictions.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-[#f8fafc] text-[14px] mb-1">
              2. Document Diff & Version Comparison
            </h3>
            <p className="text-[#94a3b8] text-[12.5px] leading-relaxed">
              Side-by-side or inline statutory diffs (e.g. EU AI Act v1.4 Council Trilogue draft vs v2.0 Final Enacted Regulation 2024/1689) with colored modifications, additions, and deletions.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-[#f8fafc] text-[14px] mb-1">
              3. Research Workspace
            </h3>
            <p className="text-[#94a3b8] text-[12.5px] leading-relaxed">
              Deep comparative legal briefs with interactive citation chips (`[1]`, `[2]`), grounding extracts, and interactive dependency graphs.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-[#f8fafc] text-[14px] mb-1">
              4. Human-in-the-Loop Review Center
            </h3>
            <p className="text-[#94a3b8] text-[12.5px] leading-relaxed">
              Review low-confidence AI classifications (e.g. 62%), inspect highlighted statutory evidence parchment, modify metadata tokens, and audit compliance trails.
            </p>
          </div>

          <div className="pt-3 border-t border-white/[0.08]">
            <h4 className="font-bold text-[#f8fafc] text-[11.5px] uppercase tracking-wider mb-2.5">
              Keyboard Shortcuts
            </h4>
            <div className="grid grid-cols-2 gap-2.5 text-[12px]">
              <div className="flex justify-between items-center bg-white/[0.03] border border-white/[0.08] p-2.5 rounded-xl">
                <span className="text-[#94a3b8]">Switch Tab</span>
                <kbd className="font-mono bg-white/[0.08] text-[#f8fafc] px-2 py-0.5 rounded-md border border-white/[0.1] text-[11px]">
                  1 - 9
                </kbd>
              </div>
              <div className="flex justify-between items-center bg-white/[0.03] border border-white/[0.08] p-2.5 rounded-xl">
                <span className="text-[#94a3b8]">Approve Review</span>
                <kbd className="font-mono bg-white/[0.08] text-[#f8fafc] px-2 py-0.5 rounded-md border border-white/[0.1] text-[11px]">
                  Enter
                </kbd>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-white/[0.08] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-[13px] font-semibold transition-all cursor-pointer shadow-[0_0_15px_rgba(99,102,241,0.4)]"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
