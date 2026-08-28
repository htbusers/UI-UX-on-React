import React, { useState } from 'react';

interface IntakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExtractionComplete: (docTitle: string) => void;
}

export const IntakeModal: React.FC<IntakeModalProps> = ({
  isOpen,
  onClose,
  onExtractionComplete,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [extractedEntities, setExtractedEntities] = useState<string[] | null>(null);
  const [fileName, setFileName] = useState<string>('');

  if (!isOpen) return null;

  const simulateProcessing = (name: string) => {
    setFileName(name);
    setUploadProgress(15);
    setTimeout(() => setUploadProgress(45), 300);
    setTimeout(() => setUploadProgress(80), 700);
    setTimeout(() => {
      setUploadProgress(100);
      setExtractedEntities([
        'Jurisdiction: European Union',
        'Directives: Artificial Intelligence Act (2024/1689)',
        'Classified Type: Binding Statutory Act',
        'Entities: AI Office, Market Surveillance Authorities',
        'Penalties: Article 71 (€35,000,000 max fines)',
      ]);
    }, 1100);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      simulateProcessing(e.dataTransfer.files[0].name);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      simulateProcessing(e.target.files[0].name);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-md">
      <div className="glass rounded-3xl p-6 md:p-8 max-w-xl w-full shadow-2xl animate-in fade-in zoom-in-95 duration-150 border border-white/[0.12]">
        <div className="flex justify-between items-center pb-4 border-b border-white/[0.08]">
          <div>
            <h2 className="text-[18px] font-bold text-[#f8fafc] flex items-center gap-2">
              <span className="material-symbols-outlined text-indigo-400">upload_file</span>
              Automated Document Intake
            </h2>
            <p className="text-[12px] text-[#94a3b8] mt-0.5">
              Ingest regulatory gazettes, draft legislation, or policy memos for automated OCR and classification.
            </p>
          </div>
          <button onClick={onClose} className="text-[#94a3b8] hover:text-[#f8fafc] p-1 rounded-lg hover:bg-white/[0.06] transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {uploadProgress === null ? (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            className={`mt-6 border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
              dragActive
                ? 'border-indigo-500 bg-indigo-500/10 shadow-[0_0_25px_rgba(99,102,241,0.2)]'
                : 'border-white/[0.15] hover:border-indigo-500/40 bg-white/[0.02] hover:bg-white/[0.04]'
            }`}
          >
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center mb-3 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
              <span className="material-symbols-outlined text-indigo-300 text-[28px]">
                cloud_upload
              </span>
            </div>
            <h3 className="text-[15px] font-semibold text-[#f8fafc] mb-1">
              Drag & Drop PDF, DOCX, or Regulatory Gazette
            </h3>
            <p className="text-[12px] text-[#94a3b8] max-w-sm mb-4 leading-relaxed">
              Supports multilingual legal documents across all 14 monitored jurisdictions.
            </p>

            <label className="bg-indigo-600 hover:bg-indigo-500 text-white text-[13px] font-semibold px-5 py-2.5 rounded-xl cursor-pointer transition-all shadow-[0_0_15px_rgba(99,102,241,0.4)]">
              <span>Select File from Disk</span>
              <input
                type="file"
                className="hidden"
                accept=".pdf,.docx,.txt,.xml"
                onChange={handleFileChange}
              />
            </label>

            <div className="mt-5 flex items-center gap-3 text-[11px] text-[#64748b]">
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px] text-indigo-400">verified</span> Auto OCR</span>
              <span>•</span>
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px] text-purple-400">psychology</span> Citation Graphing</span>
              <span>•</span>
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px] text-emerald-400">lock</span> PII Scrubbing</span>
            </div>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            <div className="flex justify-between text-[13px] font-medium">
              <span className="truncate max-w-[300px] text-[#f8fafc] font-semibold">
                {fileName || 'Regulatory-Directive-Draft-2024.pdf'}
              </span>
              <span className="text-indigo-400 font-mono font-bold">{uploadProgress}%</span>
            </div>

            <div className="w-full bg-white/[0.08] h-2 rounded-full overflow-hidden">
              <div
                className="bg-indigo-500 h-full transition-all duration-300 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.6)]"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>

            {extractedEntities && (
              <div className="mt-4 p-4.5 bg-white/[0.04] border border-white/[0.08] rounded-2xl space-y-2 animate-in fade-in duration-200">
                <div className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[15px] text-emerald-400">check_circle</span>
                  Extraction Successful
                </div>
                <ul className="space-y-1.5 text-[12.5px] text-[#cbd5e1]">
                  {extractedEntities.map((entity, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                      {entity}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex justify-end gap-2.5 pt-3">
              <button
                onClick={() => {
                  setUploadProgress(null);
                  setExtractedEntities(null);
                }}
                className="px-4 py-2 border border-white/[0.1] hover:bg-white/[0.05] text-[#cbd5e1] text-[13px] rounded-xl cursor-pointer transition-colors"
              >
                Upload Another
              </button>
              {extractedEntities && (
                <button
                  onClick={() => {
                    onClose();
                    onExtractionComplete(fileName);
                  }}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-[13px] font-semibold rounded-xl transition-all cursor-pointer shadow-[0_0_15px_rgba(99,102,241,0.4)]"
                >
                  Open in Review Center
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
