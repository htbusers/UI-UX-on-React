import React, { useState } from 'react';

export const SettingsView: React.FC = () => {
  const [confidenceThreshold, setConfidenceThreshold] = useState<number>(75);
  const [enablePiiScrubbing, setEnablePiiScrubbing] = useState<boolean>(true);
  const [enableRealtimePush, setEnableRealtimePush] = useState<boolean>(true);
  const [webhookUrl, setWebhookUrl] = useState<string>('https://api.fintech-compliance.io/v1/grif-stream');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-64px)] overflow-y-auto custom-scrollbar p-6 bg-transparent">
      <div className="max-w-4xl mx-auto w-full space-y-6">
        <div className="pb-4 border-b border-white/[0.08]">
          <h1 className="text-[22px] md:text-[24px] font-bold text-[#f8fafc]">
            System & Engine Settings
          </h1>
          <p className="text-[13px] text-[#94a3b8] mt-0.5">
            Configure AI classification confidence thresholds, jurisdictional crawlers, and compliance webhooks.
          </p>
        </div>

        {savedSuccess && (
          <div className="p-3.5 bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 rounded-xl text-[13px] flex items-center gap-2 backdrop-blur-md">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            Engine preferences saved successfully.
          </div>
        )}

        <div className="glass-card rounded-2xl p-6 md:p-8 space-y-6">
          {/* Classification Confidence Threshold */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-[14px] font-bold text-[#f8fafc]">
                Human-in-the-Loop Confidence Threshold
              </label>
              <span className="font-mono font-bold text-indigo-400 text-[15px]">
                {confidenceThreshold}%
              </span>
            </div>
            <p className="text-[12px] text-[#94a3b8] mb-3 leading-relaxed">
              Any regulatory extraction or categorization with model confidence below this score will automatically route to the Review Queue.
            </p>
            <input
              type="range"
              min="50"
              max="95"
              value={confidenceThreshold}
              onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
              className="w-full h-2 bg-white/[0.1] rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
          </div>

          {/* Privacy & Compliance */}
          <div className="pt-5 border-t border-white/[0.08] space-y-4">
            <h3 className="text-[14px] font-bold text-[#f8fafc]">
              Data Protection & Ingestion Guardrails
            </h3>

            <label className="flex items-center justify-between cursor-pointer group">
              <div>
                <span className="text-[13px] font-medium text-[#f8fafc] block group-hover:text-indigo-300 transition-colors">
                  Automatic PII & Sensitive Entity Redaction
                </span>
                <span className="text-[11px] text-[#64748b]">
                  Scrubs personal names, tax IDs, and confidential account numbers before model vectorization.
                </span>
              </div>
              <input
                type="checkbox"
                checked={enablePiiScrubbing}
                onChange={(e) => setEnablePiiScrubbing(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 accent-indigo-500 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer group">
              <div>
                <span className="text-[13px] font-medium text-[#f8fafc] block group-hover:text-indigo-300 transition-colors">
                  Real-time Regulatory Webhook Dispatch
                </span>
                <span className="text-[11px] text-[#64748b]">
                  Emit instant JSON payloads upon high-severity statutory gazette publications.
                </span>
              </div>
              <input
                type="checkbox"
                checked={enableRealtimePush}
                onChange={(e) => setEnableRealtimePush(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 accent-indigo-500 cursor-pointer"
              />
            </label>
          </div>

          {/* Webhook Endpoint */}
          <div className="pt-5 border-t border-white/[0.08]">
            <label className="block text-[13px] font-bold text-[#f8fafc] mb-1.5">
              Production Webhook URL
            </label>
            <input
              type="text"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-[13px] font-mono text-[#f8fafc] outline-none focus:border-indigo-500/50 transition-all"
            />
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={handleSave}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-[13px] font-semibold rounded-xl transition-all cursor-pointer shadow-[0_0_15px_rgba(99,102,241,0.4)]"
            >
              Save Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
