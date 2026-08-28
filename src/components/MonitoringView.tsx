import React, { useState } from 'react';
import { mockJurisdictions, mockAlerts } from '../data/mockData';

export const MonitoringView: React.FC = () => {
  const [filterQuery, setFilterQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'All' | 'High' | 'Medium'>('All');

  const filteredJurisdictions = mockJurisdictions.filter((j) =>
    j.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
    j.code.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-64px)] overflow-y-auto custom-scrollbar p-6 bg-transparent">
      <div className="max-w-7xl mx-auto w-full space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-white/[0.08] gap-3">
          <div>
            <h1 className="text-[22px] md:text-[24px] font-bold text-[#f8fafc] flex items-center gap-2">
              <span className="material-symbols-outlined text-indigo-400">analytics</span>
              Active Jurisdiction Monitoring (14)
            </h1>
            <p className="text-[13px] text-[#94a3b8] mt-0.5">
              Live crawler feeds from official gazettes, parliamentary journals, and regulator APIs.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 rounded-full text-[12px] font-semibold backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              All 14 Nodes Operational (Avg 64ms)
            </span>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-wrap items-center justify-between gap-3 glass-card p-4 rounded-2xl">
          <div className="relative flex-1 max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8] text-[18px]">
              search
            </span>
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Search jurisdiction or regulatory code..."
              className="w-full h-10 pl-9 pr-3 rounded-xl border border-white/[0.08] bg-white/[0.03] text-[#f8fafc] placeholder-[#64748b] text-[13px] outline-none focus:border-indigo-500/50 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 text-[12px]">
            <span className="text-[#94a3b8] font-semibold">Severity:</span>
            {['All', 'High', 'Medium'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedStatus(lvl as any)}
                className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                  selectedStatus === lvl
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                    : 'bg-white/[0.04] text-[#cbd5e1] border-white/[0.08] hover:bg-white/[0.08]'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Jurisdictions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredJurisdictions.map((j) => (
            <div
              key={j.code}
              className="glass-card rounded-2xl p-5 hover:border-indigo-500/40 transition-all cursor-pointer group hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[12px] font-bold px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {j.code}
                  </span>
                  <h3 className="text-[14.5px] font-bold text-[#f8fafc] group-hover:text-indigo-300 transition-colors">
                    {j.name}
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                  {j.latency}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-white/[0.08] text-[12px]">
                <div>
                  <span className="text-[#64748b] block text-[10px] uppercase font-bold tracking-wider">Tracked Acts</span>
                  <span className="font-bold text-[#f8fafc] text-[15px]">{j.activeActs}</span>
                </div>
                <div>
                  <span className="text-[#64748b] block text-[10px] uppercase font-bold tracking-wider">Alerts Today</span>
                  <span className={`font-bold text-[15px] ${j.alertsToday > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {j.alertsToday}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
