import React from 'react';
import { RegulatoryAlert } from '../types';

interface AlertsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  alerts: RegulatoryAlert[];
  onSelectAlert: (alert: RegulatoryAlert) => void;
}

export const AlertsDrawer: React.FC<AlertsDrawerProps> = ({
  isOpen,
  onClose,
  alerts,
  onSelectAlert,
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed right-0 top-0 bottom-0 w-[380px] max-w-full glass z-50 shadow-2xl border-l border-white/[0.12] flex flex-col animate-in slide-in-from-right duration-200">
        <div className="p-4 border-b border-white/[0.08] flex justify-between items-center bg-white/[0.04]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-rose-400">notifications_active</span>
            <h2 className="text-[15px] font-bold text-[#f8fafc]">Active Regulatory Alerts</h2>
            <span className="bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded-full text-[10px] font-bold">
              3 new
            </span>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/[0.08] text-[#94a3b8] hover:text-[#f8fafc] transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-3 divide-y divide-white/[0.06]">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              onClick={() => {
                onSelectAlert(alert);
                onClose();
              }}
              className="p-3.5 hover:bg-white/[0.05] rounded-xl transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 px-1.5 py-0.5 rounded bg-indigo-500/20">
                  {alert.jurisdiction}
                </span>
                <span className="text-[11px] font-mono text-[#64748b]">{alert.timeAgo}</span>
              </div>
              <h3 className="text-[13px] font-bold text-[#f8fafc] group-hover:text-indigo-300 transition-colors">
                {alert.title}
              </h3>
              <p className="text-[12px] text-[#94a3b8] mt-1 line-clamp-2 leading-relaxed">
                {alert.summary}
              </p>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-white/[0.08] bg-white/[0.02] flex justify-between items-center">
          <span className="text-[11px] text-[#64748b]">Webhook ingestion active</span>
          <button
            onClick={onClose}
            className="text-[12px] font-semibold text-indigo-400 hover:text-indigo-300 cursor-pointer"
          >
            Mark all read
          </button>
        </div>
      </div>
    </>
  );
};
