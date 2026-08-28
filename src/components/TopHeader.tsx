import React, { useState } from 'react';
import { NavTab } from '../types';

interface TopHeaderProps {
  activeTab: NavTab;
  onSearch: (q: string) => void;
  onOpenNotifications: () => void;
  onOpenHelp: () => void;
  unreadAlertsCount?: number;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
  onOpenMobileMenu?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  activeTab,
  onSearch,
  onOpenNotifications,
  onOpenHelp,
  unreadAlertsCount = 3,
  onOpenMobileMenu,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
    }
  };

  return (
    <header className="h-16 bg-[#020617]/75 backdrop-blur-2xl border-b border-white/[0.08] z-30 flex items-center justify-between px-4 md:px-6 shrink-0 relative">
      {/* Left section: Hamburger (mobile) + Breadcrumbs / Title */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Mobile Hamburger */}
        {onOpenMobileMenu && (
          <button
            onClick={onOpenMobileMenu}
            className="md:hidden p-2 rounded-xl text-[#94a3b8] hover:text-[#f8fafc] hover:bg-white/[0.06] transition-colors"
            aria-label="Open menu"
          >
            <span className="material-symbols-outlined text-[24px]">menu</span>
          </button>
        )}

        {/* View Specific Header Content */}
        {activeTab === 'documents' && (
          <div className="hidden sm:flex items-center text-[#94a3b8] text-[13px] gap-2 overflow-hidden">
            <span className="material-symbols-outlined text-[18px] text-indigo-400">account_balance</span>
            <span className="font-semibold text-[#f8fafc]">EU AI Act (2024/1689)</span>
            <span className="material-symbols-outlined text-[16px] text-[#64748b]">chevron_right</span>
            <span>Title II</span>
            <span className="material-symbols-outlined text-[16px] text-[#64748b]">chevron_right</span>
            <span className="font-medium text-indigo-300">Article 5: Prohibitions</span>
          </div>
        )}

        {activeTab === 'review' && (
          <div className="hidden sm:flex items-center gap-2">
            <span className="font-bold text-[17px] text-[#f8fafc] tracking-tight">Review Center</span>
            <span className="text-white/20">|</span>
            <span className="text-[#94a3b8] text-[13px] font-medium">Human-in-the-Loop Validation</span>
          </div>
        )}

        {activeTab === 'research' && (
          <div className="hidden sm:flex items-center gap-2">
            <span className="font-bold text-[17px] text-[#f8fafc] tracking-tight">Research Workspace</span>
            <span className="text-white/20">|</span>
            <span className="text-[#94a3b8] text-[13px] font-medium">Legal Synthesis Engine</span>
          </div>
        )}

        {(activeTab === 'dashboard' || activeTab === 'graph' || activeTab === 'monitoring' || activeTab === 'workspace' || activeTab === 'uploads' || activeTab === 'api' || activeTab === 'settings') && (
          <div className="hidden md:flex items-center text-[13px] text-[#94a3b8]">
            <span className="font-semibold text-[#f8fafc] capitalize">{activeTab}</span>
            <span className="mx-2 text-[#64748b]">•</span>
            <span className="text-[#cbd5e1] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              14 monitored jurisdictions active
            </span>
          </div>
        )}
      </div>

      {/* Middle section: Frosted Global Search Bar */}
      {activeTab !== 'dashboard' && (
        <form onSubmit={handleSearchSubmit} className="hidden lg:flex flex-1 max-w-md mx-6">
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748b] text-[18px]">
              search
            </span>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search provisions, citations, recitals..."
              className="w-full h-9.5 pl-10 pr-4 rounded-xl bg-white/[0.04] border border-white/[0.1] text-[13px] text-[#f8fafc] placeholder:text-[#64748b] focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 backdrop-blur-md transition-all"
            />
          </div>
        </form>
      )}

      {/* Right section: Action Buttons & User Menu */}
      <div className="flex items-center gap-2.5">
        {/* Alerts Button */}
        <button
          onClick={onOpenNotifications}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-[#cbd5e1] hover:text-white transition-all text-[13px] font-medium cursor-pointer backdrop-blur-md shadow-[0_2px_10px_rgba(0,0,0,0.2)]"
          title="Active Regulatory Alerts"
        >
          <span className="material-symbols-outlined text-[18px] text-amber-400">notifications</span>
          <span className="hidden sm:inline text-[12.5px]">Alerts</span>
          <span className="bg-rose-500/90 text-white px-1.5 py-0.2 rounded-full text-[10.5px] font-bold shadow-[0_0_8px_rgba(244,63,94,0.5)]">
            {unreadAlertsCount}
          </span>
        </button>

        {/* Help / Guide Button */}
        <button
          onClick={onOpenHelp}
          className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-[#cbd5e1] hover:text-white transition-all cursor-pointer backdrop-blur-md"
          title="Regulatory Guidance & Help"
        >
          <span className="material-symbols-outlined text-[19px]">help</span>
        </button>

        {/* Account Profile Avatar & Menu */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center focus:outline-none rounded-full ring-2 ring-indigo-500/30 hover:ring-indigo-400/60 transition-all cursor-pointer"
          >
            <div className="w-8.5 h-8.5 rounded-full bg-gradient-to-tr from-indigo-900 to-slate-800 border border-indigo-400/40 flex items-center justify-center font-bold text-[12px] text-white shadow-[0_0_10px_rgba(99,102,241,0.3)]">
              JD
            </div>
          </button>

          {/* Profile Dropdown (Frosted Glass) */}
          {isProfileOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsProfileOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-64 bg-[#030712]/90 backdrop-blur-2xl border border-white/[0.12] rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="px-4 py-2.5 border-b border-white/[0.08]">
                  <p className="text-[13px] font-semibold text-[#f8fafc] truncate">
                    Senior Compliance Officer
                  </p>
                  <p className="text-[11px] text-[#94a3b8] truncate">
                    umairhabib243@gmail.com
                  </p>
                  <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                    Enterprise Tier
                  </div>
                </div>

                <div className="py-1 text-[13px]">
                  <button
                    onClick={() => setIsProfileOpen(false)}
                    className="w-full px-4 py-2 text-left hover:bg-white/[0.06] flex items-center gap-2.5 text-[#cbd5e1] hover:text-white transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px] text-[#818cf8]">shield_person</span>
                    Jurisdiction Rulesets (14)
                  </button>
                  <button
                    onClick={() => setIsProfileOpen(false)}
                    className="w-full px-4 py-2 text-left hover:bg-white/[0.06] flex items-center gap-2.5 text-[#cbd5e1] hover:text-white transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px] text-[#818cf8]">key</span>
                    API Access & Webhooks
                  </button>
                  <button
                    onClick={() => setIsProfileOpen(false)}
                    className="w-full px-4 py-2 text-left hover:bg-white/[0.06] flex items-center gap-2.5 text-[#cbd5e1] hover:text-white transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px] text-[#818cf8]">tune</span>
                    Risk Model Preferences
                  </button>
                </div>

                <div className="pt-1 border-t border-white/[0.08]">
                  <button
                    onClick={() => setIsProfileOpen(false)}
                    className="w-full px-4 py-2 text-left hover:bg-rose-500/10 text-rose-400 text-[13px] font-medium flex items-center gap-2.5 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">logout</span>
                    Sign out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
