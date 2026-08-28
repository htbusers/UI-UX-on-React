import React from 'react';
import { NavTab } from '../types';

interface SidebarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
  reviewQueueCount?: number;
}

const navItems: { id: NavTab; label: string; icon: string; badge?: number }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { id: 'research', label: 'Research', icon: 'search_insights' },
  { id: 'documents', label: 'Documents', icon: 'description' },
  { id: 'graph', label: 'Knowledge Graph', icon: 'account_tree' },
  { id: 'monitoring', label: 'Monitoring', icon: 'analytics' },
  { id: 'workspace', label: 'Workspace', icon: 'inventory_2' },
  { id: 'uploads', label: 'Uploads', icon: 'upload_file' },
  { id: 'api', label: 'API', icon: 'api' },
  { id: 'review', label: 'Review', icon: 'fact_check', badge: 12 },
  { id: 'settings', label: 'Settings', icon: 'settings' },
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  isOpenMobile = false,
  onCloseMobile = () => {},
  reviewQueueCount = 12,
}) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-md transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container - Frosted Glass */}
      <aside
        className={`fixed md:static left-0 top-0 h-screen w-[260px] lg:w-[270px] bg-white/[0.03] backdrop-blur-2xl border-r border-white/[0.08] flex flex-col py-4 z-50 shrink-0 transition-transform duration-200 ease-in-out ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Header / Brand */}
        <div className="px-5 mb-6 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-600/90 border border-indigo-400/40 shadow-[0_0_15px_rgba(99,102,241,0.4)] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-white text-[20px]">
              account_balance
            </span>
          </div>
          <div className="min-w-0">
            <div className="text-[17px] font-bold text-[#f8fafc] leading-tight truncate tracking-tight flex items-center gap-1.5">
              GRIF
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                OS
              </span>
            </div>
            <div className="text-[#94a3b8] text-[11px] leading-tight truncate mt-0.5">
              Regulatory Intelligence
            </div>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 overflow-y-auto px-3 flex flex-col gap-1 custom-scrollbar">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const badgeCount = item.id === 'review' ? reviewQueueCount : item.badge;

            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  onCloseMobile();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-all duration-200 group cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600/20 text-[#818cf8] border border-indigo-500/30 font-semibold shadow-[0_0_15px_rgba(99,102,241,0.15)] backdrop-blur-md'
                    : 'text-[#94a3b8] hover:text-[#f8fafc] hover:bg-white/[0.05] border border-transparent font-medium'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`material-symbols-outlined text-[19px] transition-transform group-hover:scale-105 ${
                      isActive ? 'text-[#818cf8]' : 'text-[#64748b] group-hover:text-[#cbd5e1]'
                    }`}
                    style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                  >
                    {item.icon}
                  </span>
                  <span className="text-[13.5px]">{item.label}</span>
                </div>

                {badgeCount !== undefined && badgeCount > 0 && (
                  <span
                    className={`text-[10.5px] font-bold px-1.5 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-indigo-500/30 text-indigo-200 border border-indigo-400/30'
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    }`}
                  >
                    {badgeCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* System & Storage Capacity Pill Card (Frosted Glass Style) */}
        <div className="px-3 pt-3 mt-auto">
          <div className="p-3.5 rounded-xl bg-indigo-500/[0.08] border border-indigo-500/20 backdrop-blur-md">
            <div className="flex items-center justify-between text-[11px] text-[#94a3b8] mb-1.5">
              <span className="uppercase font-semibold tracking-wider text-[10px]">CRAWLER STREAM</span>
              <span className="flex items-center gap-1 text-emerald-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                14 Synced
              </span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden mb-2">
              <div className="w-[88%] h-full bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.6)]"></div>
            </div>
            <div className="flex items-center justify-between text-[11px] text-[#cbd5e1]">
              <span className="font-semibold">652.4 MB / 1 GB</span>
              <span className="font-mono text-[10px] text-[#64748b]">v2.4.8</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
