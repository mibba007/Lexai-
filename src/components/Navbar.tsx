import React from 'react';
import { 
  Scale, 
  BookOpen, 
  ShieldCheck, 
  ShieldAlert,
  FileText, 
  Calculator, 
  FolderLock, 
  Globe, 
  CheckCircle2,
  Sparkles,
  TrendingUp,
  FileAudio,
  Wifi,
  WifiOff,
  User
} from 'lucide-react';
import { OFFICIAL_MACRO_DATA } from '../data/lawsDatabase';
import { LanguageMode, NavigationTab } from '../types';

interface NavbarProps {
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  language: LanguageMode;
  setLanguage: (lang: LanguageMode) => void;
  savedCount: number;
  isEffectiveOffline?: boolean;
  onToggleOfflineMode?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  language,
  setLanguage,
  savedCount,
  isEffectiveOffline,
  onToggleOfflineMode,
}) => {
  const tabs: { id: NavigationTab; label: string; icon: any; badge?: string; count?: number }[] = [
    { id: 'chat', label: 'AI Konsultant', icon: Scale, badge: 'Lex.uz RAG' },
    { id: 'forensic', label: 'Audio Forensic', icon: FileAudio, badge: 'FPK 78' },
    { id: 'dispute', label: 'Nizo & Da‘vo Auditi', icon: ShieldAlert, badge: 'Yuridik Shaxslar' },
    { id: 'codex', label: 'Qonunchilik Bazasi', icon: BookOpen },
    { id: 'contract', label: 'Shartnomalar Auditi', icon: ShieldCheck, badge: 'AI Risk' },
    { id: 'generator', label: 'Hujjatlar Generatori', icon: FileText },
    { id: 'calculators', label: 'Yuridik Kalkulyator', icon: Calculator },
    { id: 'cabinet', label: 'Mening Kabinetim', icon: FolderLock, count: savedCount },
    { id: 'profile', label: 'Mening Profilim', icon: User, badge: 'Rekvizitlar' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 shadow-md">
      {/* Top micro-bar with Lex.uz official status and Macro Indicators */}
      <div className="bg-slate-950/80 px-4 py-1.5 border-b border-slate-800/80 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            {isEffectiveOffline ? (
              <div className="flex items-center gap-1.5 text-amber-400 font-medium">
                <WifiOff className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="font-semibold">OFLAYN REJIM: LOKAL BAZA &amp; PDF GENERATOR FAOLLASHTIRILGAN</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>LEX.UZ RASMIY BAZASI: 100% SINXRONLASHTIRILGAN</span>
              </div>
            )}
            
            {onToggleOfflineMode && (
              <button
                onClick={onToggleOfflineMode}
                id="toggle-offline-mode-btn"
                className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border transition cursor-pointer ${
                  isEffectiveOffline
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200 hover:bg-slate-700'
                }`}
                title={isEffectiveOffline ? "Onlayn rejimga qaytish" : "Oflayn rejimni sinash yoki faollashtirish"}
              >
                {isEffectiveOffline ? (
                  <>
                    <Wifi className="w-3 h-3 text-emerald-400" />
                    <span>Onlaynga o‘tish</span>
                  </>
                ) : (
                  <>
                    <WifiOff className="w-3 h-3 text-slate-400" />
                    <span>Oflayn rejim</span>
                  </>
                )}
              </button>
            )}

            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="hidden md:inline text-slate-400">
              O‘zbekiston Respublikasi Qonunchiligi AI Integratsiyasi
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5 text-slate-300">
              <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
              <span>BHM: <strong className="text-cyan-300 font-semibold">{OFFICIAL_MACRO_DATA.BHM.toLocaleString()} so‘m</strong></span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-slate-300">
              <span>MHTEKM: <strong className="text-emerald-300 font-semibold">{OFFICIAL_MACRO_DATA.MHTEKM.toLocaleString()} so‘m</strong></span>
            </div>
            
            {/* Language Selector */}
            <div className="flex items-center gap-1 bg-slate-800/80 rounded-md px-2 py-0.5 border border-slate-700/60">
              <Globe className="w-3 h-3 text-slate-400" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as LanguageMode)}
                className="bg-transparent text-slate-200 text-xs font-medium focus:outline-none cursor-pointer"
                id="language-select"
              >
                <option value="uz_lat" className="bg-slate-900 text-white">O‘zbekcha (Lotin)</option>
                <option value="uz_kir" className="bg-slate-900 text-white">Ўзбекча (Кирилл)</option>
                <option value="ru" className="bg-slate-900 text-white">Русский</option>
                <option value="en" className="bg-slate-900 text-white">English</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div 
            onClick={() => onTabChange('chat')}
            className="flex items-center gap-3 cursor-pointer group"
            id="brand-logo-container"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-700 p-0.5 shadow-lg shadow-cyan-900/30 flex items-center justify-center">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center group-hover:bg-slate-800 transition">
                <Scale className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-white font-mono">
                  LEX<span className="text-cyan-400">AI</span> <span className="text-emerald-400">UZ</span>
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-400 border border-cyan-800/60 uppercase">
                  v2.6 Pro
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">O‘zbekiston Qonunchiligi AI Yuristi</p>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="hidden lg:flex items-center gap-1" id="main-nav-tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`nav-tab-${tab.id}`}
                  onClick={() => onTabChange(tab.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-indigo-900/60 text-indigo-300 border border-indigo-700/50">
                      {tab.badge}
                    </span>
                  )}
                  {tab.count !== undefined && tab.count > 0 && (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-cyan-500 text-slate-950">
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Action Button */}
          <div className="flex items-center gap-2">
            <button
              id="quick-start-consultation-btn"
              onClick={() => onTabChange('chat')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-semibold text-sm shadow-md shadow-cyan-900/20 transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4 fill-current" />
              <span className="hidden sm:inline">Huquqiy Savol Berish</span>
              <span className="sm:hidden">Savol</span>
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation */}
        <div className="lg:hidden flex items-center gap-1 overflow-x-auto pb-3 pt-1 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`mobile-tab-${tab.id}`}
                onClick={() => onTabChange(tab.id)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.count !== undefined && tab.count > 0 && (
                  <span className="text-[9px] px-1 bg-cyan-400 text-slate-950 font-bold rounded-full">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
