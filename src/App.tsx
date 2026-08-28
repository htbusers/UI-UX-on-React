/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { NavTab, RegulatoryAlert } from './types';
import {
  mockAlerts,
  mockRecentQueries,
  mockSavedBriefs,
} from './data/mockData';

import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { DashboardView } from './components/DashboardView';
import { DocumentsView } from './components/DocumentsView';
import { ResearchView } from './components/ResearchView';
import { ReviewView } from './components/ReviewView';
import { KnowledgeGraphView } from './components/KnowledgeGraphView';
import { MonitoringView } from './components/MonitoringView';
import { SettingsView } from './components/SettingsView';
import { ApiView } from './components/ApiView';
import { IntakeModal } from './components/IntakeModal';
import { AlertsDrawer } from './components/AlertsDrawer';
import { HelpModal } from './components/HelpModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [researchQuery, setResearchQuery] = useState<string>(
    'What are the current AML reporting obligations for a Pakistani fintech?'
  );
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [alerts, setAlerts] = useState<RegulatoryAlert[]>(mockAlerts);
  const [isIntakeOpen, setIsIntakeOpen] = useState<boolean>(false);
  const [isAlertsDrawerOpen, setIsAlertsDrawerOpen] = useState<boolean>(false);
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);

  // Sync dark class on html document root
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleNavigate = (tab: NavTab, params?: any) => {
    if (tab === 'uploads') {
      setIsIntakeOpen(true);
      return;
    }
    if (params?.query) {
      setResearchQuery(params.query);
    }
    setActiveTab(tab);
  };

  const handleAskGRIF = (query: string) => {
    setResearchQuery(query);
    setActiveTab('research');
  };

  const handleSelectAlert = (alert: RegulatoryAlert) => {
    if (alert.documentRef === 'eu-ai-act-art-5') {
      setActiveTab('documents');
    } else {
      setResearchQuery(alert.title);
      setActiveTab('research');
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#020617] text-[#f8fafc] relative font-sans">
      {/* Dynamic Cosmic Mesh Background */}
      <div className="mesh-bg" />

      {/* Fixed Left Navigation Sidebar (Frosted Glass) */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={(tab) => {
          if (tab === 'uploads') {
            setIsIntakeOpen(true);
          } else {
            setActiveTab(tab);
          }
        }}
        reviewQueueCount={12}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
        {/* Top Header */}
        <TopHeader
          activeTab={activeTab}
          onSearch={(query) => handleAskGRIF(query)}
          onOpenNotifications={() => setIsAlertsDrawerOpen(true)}
          onOpenHelp={() => setIsHelpOpen(true)}
          unreadAlertsCount={3}
          isDarkMode={isDarkMode}
          onToggleTheme={toggleTheme}
        />

        {/* View Switcher */}
        <main className="flex-1 flex overflow-hidden relative">
          {activeTab === 'dashboard' && (
            <DashboardView
              alerts={alerts}
              recentQueries={mockRecentQueries}
              savedBriefs={mockSavedBriefs}
              onNavigate={handleNavigate}
              onAskGRIF={handleAskGRIF}
              onOpenIntake={() => setIsIntakeOpen(true)}
            />
          )}

          {activeTab === 'documents' && (
            <DocumentsView
              onNavigateToCitation={(citationId) => {
                setActiveTab('research');
              }}
            />
          )}

          {activeTab === 'research' && (
            <ResearchView
              initialQuery={researchQuery}
              onNavigateToDocument={(docRef) => {
                setActiveTab('documents');
              }}
              onNavigateToGraph={() => {
                setActiveTab('graph');
              }}
            />
          )}

          {activeTab === 'review' && <ReviewView />}

          {activeTab === 'graph' && <KnowledgeGraphView />}

          {activeTab === 'monitoring' && <MonitoringView />}

          {activeTab === 'settings' && <SettingsView />}

          {activeTab === 'api' && <ApiView />}

          {activeTab === 'workspace' && (
            <DashboardView
              alerts={alerts}
              recentQueries={mockRecentQueries}
              savedBriefs={mockSavedBriefs}
              onNavigate={handleNavigate}
              onAskGRIF={handleAskGRIF}
              onOpenIntake={() => setIsIntakeOpen(true)}
            />
          )}
        </main>
      </div>

      {/* Modals and Drawers */}
      <IntakeModal
        isOpen={isIntakeOpen}
        onClose={() => setIsIntakeOpen(false)}
        onExtractionComplete={(fileName) => {
          setActiveTab('review');
        }}
      />

      <AlertsDrawer
        isOpen={isAlertsDrawerOpen}
        onClose={() => setIsAlertsDrawerOpen(false)}
        alerts={alerts}
        onSelectAlert={handleSelectAlert}
      />

      <HelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />
    </div>
  );
}
