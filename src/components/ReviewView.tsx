import React, { useState } from 'react';
import { mockReviewQueue } from '../data/mockData';
import { ReviewQueueItem } from '../types';

interface ReviewViewProps {
  onShowAuditLog?: () => void;
}

export const ReviewView: React.FC<ReviewViewProps> = () => {
  const [queue, setQueue] = useState<ReviewQueueItem[]>(mockReviewQueue);
  const [selectedItemId, setSelectedItemId] = useState<string>('RC-2024-891A');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [tokens, setTokens] = useState<string[]>([
    'Jurisdiction: EU',
    'Sector: Technology',
    'Effective: Pending',
  ]);
  const [category, setCategory] = useState<string>('Binding Statutory Act');
  const [isAnnotateOpen, setIsAnnotateOpen] = useState(false);
  const [isAuditLogOpen, setIsAuditLogOpen] = useState(false);
  const [feedbackNote, setFeedbackNote] = useState('');
  const [newTokenInput, setNewTokenInput] = useState('');
  const [isAddingToken, setIsAddingToken] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const currentItem = queue.find((i) => i.id === selectedItemId) || queue[0];

  const handleApprove = () => {
    setToastMessage(`Classification approved for #${currentItem.id}. Enqueued to verified index.`);
    setTimeout(() => setToastMessage(null), 3500);

    // Advance to next queue item
    const currentIndex = queue.findIndex((i) => i.id === currentItem.id);
    const nextItem = queue[(currentIndex + 1) % queue.length];
    if (nextItem) {
      setSelectedItemId(nextItem.id);
      setCategory(nextItem.proposedCategory);
      setTokens(nextItem.tokens);
    }
  };

  const handleSkip = () => {
    const currentIndex = queue.findIndex((i) => i.id === currentItem.id);
    const nextItem = queue[(currentIndex + 1) % queue.length];
    if (nextItem) {
      setSelectedItemId(nextItem.id);
      setCategory(nextItem.proposedCategory);
      setTokens(nextItem.tokens);
    }
  };

  const handleRemoveToken = (tokenToRemove: string) => {
    setTokens(tokens.filter((t) => t !== tokenToRemove));
  };

  const handleAddTokenSubmit = () => {
    if (newTokenInput.trim() && !tokens.includes(newTokenInput.trim())) {
      setTokens([...tokens, newTokenInput.trim()]);
      setNewTokenInput('');
      setIsAddingToken(false);
    }
  };

  const handleSendBack = () => {
    setIsAnnotateOpen(false);
    setToastMessage(`Annotation sent to triage engineer for #${currentItem.id}.`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-transparent">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 glass border border-white/[0.15] text-[#f8fafc] px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 text-[13px]">
          <span className="material-symbols-outlined text-emerald-400 text-[18px]">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Workspace Header */}
      <div className="px-6 py-3 border-b border-white/[0.08] bg-white/[0.02] backdrop-blur-md flex justify-between items-center shrink-0 z-10">
        <div>
          <h1 className="text-[18px] md:text-[20px] font-bold text-[#f8fafc] leading-tight">
            Human-in-the-Loop Review
          </h1>
          <p className="text-[12.5px] text-[#94a3b8]">
            Reviewing priority item{' '}
            <span className="font-bold text-indigo-300">#{currentItem.id}</span>
          </p>
        </div>

        {/* Top actions */}
        <div className="flex items-center gap-2">
          <div className="bg-white/[0.04] flex items-center rounded-xl overflow-hidden border border-white/[0.08] p-0.5">
            <button
              onClick={() => {
                setToastMessage(`Review suspended for #${currentItem.id}.`);
                setTimeout(() => setToastMessage(null), 3000);
              }}
              className="px-3 py-1 rounded-lg bg-white/[0.08] shadow-2xs text-[#f8fafc] text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 hover:bg-white/[0.12] transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">pause</span> Suspend
            </button>
            <button
              onClick={handleSkip}
              className="px-3 py-1 rounded-lg text-[#94a3b8] hover:text-[#f8fafc] text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">skip_next</span> Skip
            </button>
          </div>
        </div>
      </div>

      {/* Main Review Split Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel: Review Queue (w-80) */}
        <aside className="w-80 border-r border-white/[0.08] bg-white/[0.02] backdrop-blur-2xl flex flex-col shrink-0">
          <div className="p-3.5 border-b border-white/[0.08] bg-white/[0.02] shrink-0 flex justify-between items-center">
            <h2 className="text-[10.5px] font-bold text-[#64748b] uppercase tracking-wider">
              Review Queue ({queue.length})
            </h2>
            <button className="text-indigo-400 hover:text-indigo-300">
              <span className="material-symbols-outlined text-[18px]">filter_list</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-2.5 space-y-2">
            {queue.map((item) => {
              const isSelected = item.id === currentItem.id;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedItemId(item.id);
                    setCategory(item.proposedCategory);
                    setTokens(item.tokens);
                  }}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600/20 border-indigo-400/50 shadow-[0_0_15px_rgba(99,102,241,0.15)] border-l-4 border-l-indigo-500'
                      : 'bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.06]'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1.5">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider ${
                        isSelected ? 'text-indigo-300' : 'text-[#64748b]'
                      }`}
                    >
                      {item.type}
                    </span>
                    <span
                      className={`px-1.5 py-0.5 rounded-md text-[9px] font-bold ${
                        item.severity === 'HIGH'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-white/[0.06] text-[#cbd5e1] border border-white/[0.08]'
                      }`}
                    >
                      {item.severity}
                    </span>
                  </div>

                  <h3
                    className={`text-[12.5px] font-bold mb-1 line-clamp-2 ${
                      isSelected ? 'text-[#f8fafc]' : 'text-[#e2e8f0]'
                    }`}
                  >
                    {item.title}
                  </h3>

                  <p className="text-[11px] text-[#94a3b8] flex items-center gap-1 truncate">
                    <span className="material-symbols-outlined text-[13px]">psychology</span>
                    {item.subtitle}
                  </p>
                </div>
              );
            })}
          </div>
        </aside>

        {/* Center & Right Split Panes */}
        <div className="flex-1 flex flex-col min-w-0 bg-transparent overflow-hidden">
          {/* Main content grid */}
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden p-4 md:p-6 gap-6">
            {/* Left Box: AI Proposed Classification */}
            <div className="flex-1 glass rounded-2xl flex flex-col overflow-hidden shadow-xl">
              <div className="p-3.5 border-b border-white/[0.08] bg-white/[0.02] flex justify-between items-center">
                <h3 className="text-[10.5px] font-bold text-[#f8fafc] uppercase tracking-wider flex items-center gap-2">
                  <span className="material-symbols-outlined text-indigo-400 text-[18px]">psychology</span>
                  AI PROPOSED CLASSIFICATION
                </h3>
              </div>

              <div className="p-5 overflow-y-auto custom-scrollbar flex-1 space-y-5">
                {/* Proposed Primary Category */}
                <div>
                  <label className="block text-[10.5px] font-bold text-[#64748b] uppercase tracking-wider mb-1.5">
                    Proposed Primary Category
                  </label>
                  <div className="relative">
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-[13.5px] text-[#f8fafc] appearance-none focus:outline-none focus:border-indigo-500 font-medium"
                    >
                      <option value="Regulatory Guideline" className="bg-[#020617] text-white">Regulatory Guideline</option>
                      <option value="Binding Statutory Act" className="bg-[#020617] text-white">Binding Statutory Act</option>
                      <option value="Enforcement Action" className="bg-[#020617] text-white">Enforcement Action</option>
                      <option value="Statutory Amendment" className="bg-[#020617] text-white">Statutory Amendment</option>
                      <option value="Internal Compliance Policy" className="bg-[#020617] text-white">Internal Compliance Policy</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#64748b]">
                      expand_more
                    </span>
                  </div>

                  <div className="mt-2 flex gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-rose-500/20 text-rose-300 text-[11px] font-bold border border-rose-500/30">
                      <span className="material-symbols-outlined text-[14px]">warning</span>
                      Low Confidence ({currentItem.aiConfidence}%)
                    </span>
                  </div>
                </div>

                {/* AI Reasoning Trace */}
                <div>
                  <label className="block text-[10.5px] font-bold text-[#64748b] uppercase tracking-wider mb-1.5">
                    AI Reasoning Trace
                  </label>
                  <div className="bg-white/[0.03] p-4 rounded-xl border border-white/[0.08] text-[13px] text-[#cbd5e1] space-y-3 leading-relaxed">
                    <p>{currentItem.reasoning}</p>
                    <div className="border-l-2 border-indigo-500 pl-3 text-[#94a3b8] italic text-[12px]">
                      "{currentItem.reasoningQuote}"
                    </div>
                  </div>
                </div>

                {/* Extracted Metadata Tokens */}
                <div>
                  <label className="block text-[10.5px] font-bold text-[#64748b] uppercase tracking-wider mb-2">
                    Extracted Metadata Tokens
                  </label>
                  <div className="flex flex-wrap gap-2 items-center">
                    {tokens.map((token, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-white/[0.05] border border-white/[0.08] rounded-lg font-serif text-[12px] text-[#cbd5e1] flex items-center gap-1.5"
                      >
                        {token}
                        <button
                          onClick={() => handleRemoveToken(token)}
                          className="text-[#64748b] hover:text-rose-400 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[14px]">close</span>
                        </button>
                      </span>
                    ))}

                    {isAddingToken ? (
                      <div className="flex items-center gap-1">
                        <input
                          type="text"
                          value={newTokenInput}
                          onChange={(e) => setNewTokenInput(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleAddTokenSubmit()}
                          placeholder="e.g. Scope: Global"
                          autoFocus
                          className="h-7 px-2 border border-indigo-500/50 rounded-lg text-[12px] bg-white/[0.08] text-white outline-none"
                        />
                        <button
                          onClick={handleAddTokenSubmit}
                          className="px-2 py-0.5 bg-indigo-600 text-white rounded-lg text-[11px]"
                        >
                          Add
                        </button>
                        <button
                          onClick={() => setIsAddingToken(false)}
                          className="px-1.5 py-0.5 text-[#94a3b8] text-[11px]"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setIsAddingToken(true)}
                        className="px-2.5 py-1 border border-dashed border-white/[0.2] rounded-lg font-serif text-[12px] text-indigo-300 hover:bg-white/[0.05] flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <span className="material-symbols-outlined text-[14px]">add</span> Add Token
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Box: Source Evidence */}
            <div className="flex-1 glass rounded-2xl flex flex-col overflow-hidden shadow-xl">
              <div className="p-3.5 border-b border-white/[0.08] bg-white/[0.02] flex justify-between items-center">
                <h3 className="text-[10.5px] font-bold text-[#f8fafc] uppercase tracking-wider flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#64748b] text-[18px]">menu_book</span>
                  SOURCE EVIDENCE
                </h3>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setZoomLevel((prev) => Math.min(prev + 10, 140))}
                    className="p-1 text-[#94a3b8] hover:bg-white/[0.08] rounded-lg transition-colors cursor-pointer"
                    title="Zoom In"
                  >
                    <span className="material-symbols-outlined text-[16px]">zoom_in</span>
                  </button>
                  <button
                    onClick={() => setZoomLevel((prev) => Math.max(prev - 10, 80))}
                    className="p-1 text-[#94a3b8] hover:bg-white/[0.08] rounded-lg transition-colors cursor-pointer"
                    title="Zoom Out"
                  >
                    <span className="material-symbols-outlined text-[16px]">zoom_out</span>
                  </button>
                  <span className="text-[11px] text-[#64748b] font-mono ml-1">{zoomLevel}%</span>
                </div>
              </div>

              <div
                className="p-6 overflow-y-auto custom-scrollbar flex-1 font-serif leading-relaxed text-[#f8fafc] relative bg-black/20"
                style={{ fontSize: `${(16 * zoomLevel) / 100}px` }}
              >
                {/* Formal legal document sheet */}
                <div className="max-w-xl mx-auto bg-white/[0.04] backdrop-blur-md p-6 md:p-8 border border-white/[0.08] rounded-2xl shadow-xl min-h-full">
                  <h1 className="font-sans text-[18px] font-bold mb-2 text-center border-b border-white/[0.08] pb-3 text-[#f8fafc]">
                    {currentItem.evidenceText.title}
                  </h1>
                  <p className="mb-4 text-[#94a3b8] italic text-[12px] text-center font-sans">
                    {currentItem.evidenceText.subtitle}
                  </p>

                  <div className="space-y-4">
                    {currentItem.evidenceText.paragraphs.map((p) => {
                      return (
                        <div key={p.id} className="relative group">
                          {p.isHighlighted && (
                            <div
                              className={`absolute -left-3 top-0 bottom-0 w-1 rounded-full ${
                                p.highlightType === 'error'
                                  ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]'
                                  : p.highlightType === 'warning'
                                  ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]'
                                  : 'bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]'
                              }`}
                            />
                          )}

                          <div
                            className={
                              p.isHighlighted
                                ? p.highlightType === 'error'
                                  ? 'bg-rose-500/15 border border-rose-500/30 p-3 rounded-xl'
                                  : p.highlightType === 'warning'
                                  ? 'bg-amber-500/15 border border-amber-500/30 p-3 rounded-xl'
                                  : 'bg-indigo-500/15 border border-indigo-500/30 p-3 rounded-xl'
                                : 'p-1'
                            }
                          >
                            {p.heading && (
                              <div className="font-sans font-bold text-[13.5px] mb-1.5 text-[#f8fafc]">
                                {p.heading}
                              </div>
                            )}
                            <p className="whitespace-pre-line leading-relaxed text-[#cbd5e1]">
                              {p.text}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Footer Bar */}
          <div className="p-4 border-t border-white/[0.08] bg-white/[0.02] backdrop-blur-md flex flex-col sm:flex-row justify-between items-center gap-3 shrink-0">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsAuditLogOpen(true)}
                className="text-[#94a3b8] hover:text-[#f8fafc] flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider cursor-pointer transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">history</span>
                Audit Log
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <button
                onClick={() => setIsAnnotateOpen(true)}
                className="px-3.5 py-2 border border-white/[0.1] text-[#cbd5e1] rounded-xl text-[11px] font-bold uppercase tracking-wider hover:bg-white/[0.06] transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">edit_note</span>
                Annotate & Send Back
              </button>

              <button
                onClick={() => {
                  setToastMessage(`Second review requested for compliance officer #${currentItem.id}`);
                  setTimeout(() => setToastMessage(null), 3000);
                }}
                className="px-3.5 py-2 border border-white/[0.1] text-[#cbd5e1] rounded-xl text-[11px] font-bold uppercase tracking-wider hover:bg-white/[0.06] transition-all cursor-pointer"
              >
                Request 2nd Review
              </button>

              <button
                onClick={handleApprove}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(99,102,241,0.4)] flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                Approve Classification
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Annotate & Send Back Modal */}
      {isAnnotateOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass border border-white/[0.15] rounded-2xl p-6 max-w-lg w-full shadow-2xl">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-[16px] font-bold text-[#f8fafc] flex items-center gap-2">
                <span className="material-symbols-outlined text-indigo-400">edit_note</span>
                Annotate & Send Back for Retraining
              </h3>
              <button
                onClick={() => setIsAnnotateOpen(false)}
                className="text-[#94a3b8] hover:text-[#f8fafc]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <p className="text-[12px] text-[#94a3b8] mb-3">
              Provide instructions to model fine-tuning or secondary compliance auditors explaining
              the misclassification reasoning.
            </p>

            <textarea
              value={feedbackNote}
              onChange={(e) => setFeedbackNote(e.target.value)}
              placeholder="e.g. The term 'shall' refers to voluntary industry consortium commitments rather than statutory enforcement..."
              className="w-full h-28 bg-white/[0.04] border border-white/[0.1] rounded-xl p-3 text-[13px] text-[#f8fafc] outline-none focus:border-indigo-500 resize-none mb-4"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsAnnotateOpen(false)}
                className="px-4 py-2 border border-white/[0.1] text-[13px] text-[#cbd5e1] rounded-xl hover:bg-white/[0.05]"
              >
                Cancel
              </button>
              <button
                onClick={handleSendBack}
                className="px-4 py-2 bg-rose-600 text-white text-[13px] font-semibold rounded-xl hover:bg-rose-500 shadow-sm"
              >
                Submit Annotation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Audit Log Modal */}
      {isAuditLogOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass border border-white/[0.15] rounded-2xl p-6 max-w-lg w-full shadow-2xl max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[16px] font-bold text-[#f8fafc] flex items-center gap-2">
                <span className="material-symbols-outlined text-indigo-400">history</span>
                Audit Trail #{currentItem.id}
              </h3>
              <button
                onClick={() => setIsAuditLogOpen(false)}
                className="text-[#94a3b8] hover:text-[#f8fafc]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-4 overflow-y-auto custom-scrollbar flex-1 pr-2 text-[12px]">
              <div className="border-l-2 border-indigo-500 pl-3 py-1">
                <div className="font-semibold text-[#f8fafc]">Ingestion & OCR Extraction</div>
                <div className="text-[#64748b]">2026-08-28 14:10:02 • GRIF Harvester Node 04</div>
                <p className="text-[#94a3b8] mt-1">
                  Document ingested from Official Journal of EU PDF feed. 42 pages parsed.
                </p>
              </div>

              <div className="border-l-2 border-indigo-400 pl-3 py-1">
                <div className="font-semibold text-[#f8fafc]">LLM Regulatory Classifier</div>
                <div className="text-[#64748b]">2026-08-28 14:10:14 • Model v3.4 (Gemini Regulatory)</div>
                <p className="text-[#94a3b8] mt-1">
                  Confidence score: 62%. Flagged for human review due to ambiguity in preamble scope.
                </p>
              </div>

              <div className="border-l-2 border-amber-400 pl-3 py-1">
                <div className="font-semibold text-[#f8fafc]">Assigned to Priority Queue</div>
                <div className="text-[#64748b]">2026-08-28 14:10:15 • Queue Dispatcher</div>
                <p className="text-[#94a3b8] mt-1">
                  Severity elevated to HIGH based on EU AI Act enforcement date proximities.
                </p>
              </div>
            </div>

            <div className="pt-4 mt-2 border-t border-white/[0.08] flex justify-end">
              <button
                onClick={() => setIsAuditLogOpen(false)}
                className="px-4 py-1.5 bg-indigo-600 text-white rounded-xl text-[12px] font-semibold hover:bg-indigo-500 shadow-sm"
              >
                Close Audit Log
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
