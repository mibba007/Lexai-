/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Smart Templates Library Modal (Aqlli Shablonlar Kutubxonasi).
 * Allows users to browse, search, and select common legal document types
 * like 'Mehnat shartnomasi', 'Ijaraga berish shartnomasi', and 'Doverennost' (Ishonchnoma)
 * and auto-populate all fields based on O‘zbekiston standard legislation (Lex.uz).
 */

import React, { useState, useMemo } from 'react';
import {
  X,
  Search,
  Sparkles,
  Briefcase,
  Home,
  ShieldCheck,
  Handshake,
  PackageCheck,
  Coins,
  Gavel,
  AlertTriangle,
  FileText,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Zap,
  BookOpen,
  Scale,
  Award
} from 'lucide-react';
import { 
  SMART_TEMPLATES_LIBRARY, 
  SmartTemplateDefinition, 
  SmartLegislationProfile 
} from '../data/smartTemplatesData';
import { LegalDocumentTemplate, LegalCategory } from '../types';

interface SmartTemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  templates: LegalDocumentTemplate[];
  selectedTemplateId: string;
  onSelectAndAutoPopulate: (
    template: LegalDocumentTemplate, 
    populatedValues: Record<string, string>,
    profile: SmartLegislationProfile,
    smartItem: SmartTemplateDefinition
  ) => void;
  onPreviewTemplate: (template: LegalDocumentTemplate) => void;
}

export const SmartTemplatesModal: React.FC<SmartTemplatesModalProps> = ({
  isOpen,
  onClose,
  templates,
  selectedTemplateId,
  onSelectAndAutoPopulate,
  onPreviewTemplate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProfileMap, setSelectedProfileMap] = useState<Record<string, string>>({});
  const [focusedDocTypeCode, setFocusedDocTypeCode] = useState<string | null>(null);

  // Icon mapping
  const getIcon = (docTypeCode: string) => {
    switch (docTypeCode) {
      case 'mehnat':
        return Briefcase;
      case 'ijara':
        return Home;
      case 'doverennost':
        return ShieldCheck;
      case 'xizmat':
        return Handshake;
      case 'savdo':
        return PackageCheck;
      case 'qarz':
        return Coins;
      case 'sud':
        return Gavel;
      case 'talabnoma':
        return AlertTriangle;
      default:
        return FileText;
    }
  };

  // Filter templates
  const filteredSmartTemplates = useMemo(() => {
    return SMART_TEMPLATES_LIBRARY.filter((item) => {
      const matchesSearch =
        searchQuery === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.shortTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.governingLaw.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.statutoryMandatoryClauses.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.docTypeCode === 'doverennost' && (searchQuery.toLowerCase().includes('dover') || searchQuery.toLowerCase().includes('ishonch')));

      const matchesCat =
        selectedCategory === 'all' ||
        (selectedCategory === 'labor' && item.category === 'labor') ||
        (selectedCategory === 'civil' && (item.category === 'civil' || item.docTypeCode === 'ijara')) ||
        (selectedCategory === 'business' && (item.category === 'business' || item.docTypeCode === 'doverennost')) ||
        (selectedCategory === 'court' && item.category === 'court');

      const matchesFocus = !focusedDocTypeCode || item.docTypeCode === focusedDocTypeCode;

      return matchesSearch && matchesCat && matchesFocus;
    });
  }, [searchQuery, selectedCategory, focusedDocTypeCode]);

  if (!isOpen) return null;

  const handleApplySmartTemplate = (item: SmartTemplateDefinition) => {
    const rawTemplate = templates.find((t) => t.id === item.templateId);
    if (!rawTemplate) return;

    const currentProfileId = selectedProfileMap[item.id] || item.defaultProfileId;
    const profile = item.profiles.find((p) => p.id === currentProfileId) || item.profiles[0];

    onSelectAndAutoPopulate(rawTemplate, profile.populatedValues, profile, item);
    onClose();
  };

  const handleSelectProfile = (smartId: string, profileId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedProfileMap((prev) => ({ ...prev, [smartId]: profileId }));
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden ring-1 ring-cyan-500/20">
        
        {/* Header Bar */}
        <div className="p-4 sm:p-6 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 flex items-start justify-between gap-4 shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                    Smart Templates Kutubxonasi
                  </h2>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
                    O‘zbekiston Qonunchiligi
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                    O‘zDSt 1157:2008
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  «Mehnat shartnomasi», «Ijaraga berish shartnomasi», «Doverennost» va boshqa rasmiy hujjatlarni tanlang — tizim qonunchilik mezonlari asosida barcha bandlarni avtomatik to‘ldiradi.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer shrink-0"
            title="Yopish (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search, Filter Tabs & Fast Quick Switcher */}
        <div className="p-4 border-b border-slate-800/90 bg-slate-950/40 space-y-3 shrink-0">
          
          {/* Quick Focus Pills (Requested Common Types) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
              Asosiy turlar:
            </span>

            {[
              { code: null, label: 'Barchasi', icon: FileText },
              { code: 'mehnat', label: 'Mehnat shartnomasi (MK)', icon: Briefcase },
              { code: 'ijara', label: 'Ijaraga berish shartnomasi (FK)', icon: Home },
              { code: 'doverennost', label: 'Doverennost / Ishonchnoma (FK)', icon: ShieldCheck },
              { code: 'xizmat', label: 'Xizmat shartnomasi', icon: Handshake },
              { code: 'qarz', label: 'Qarz va Tilxat', icon: Coins },
              { code: 'sud', label: 'Sud da‘vosi', icon: Gavel },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = focusedDocTypeCode === tab.code;
              return (
                <button
                  key={tab.label}
                  onClick={() => setFocusedDocTypeCode(tab.code)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                      : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search bar & Category filters */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Shablon nomi, kodeks moddasi yoki kalit so‘z (masalan: mehnat, ijara, doverennost, 104, 600, 134)..."
                className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto text-xs shrink-0">
              {[
                { id: 'all', label: 'Barcha sohalar' },
                { id: 'labor', label: 'Mehnat' },
                { id: 'civil', label: 'Fuqarolik & Ijara' },
                { id: 'business', label: 'Biznes & Vakillik' },
                { id: 'court', label: 'Sud' },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`px-2.5 py-1 rounded-lg transition cursor-pointer whitespace-nowrap ${
                    selectedCategory === c.id
                      ? 'bg-slate-700 text-cyan-300 font-bold border border-cyan-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Smart Templates Grid List */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {filteredSmartTemplates.length === 0 ? (
            <div className="p-12 text-center text-slate-400 space-y-2">
              <FileText className="w-12 h-12 mx-auto text-slate-600 mb-2" />
              <p className="text-sm font-semibold">Mos keluvchi Smart Shablon topilmadi</p>
              <p className="text-xs text-slate-500">
                Qidiruv so‘zini o‘zgartiring yoki filtrlarni tozalang.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setFocusedDocTypeCode(null);
                }}
                className="mt-3 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs text-cyan-300 rounded-lg cursor-pointer"
              >
                Filtrlarni tozalash
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredSmartTemplates.map((smartItem) => {
                const Icon = getIcon(smartItem.docTypeCode);
                const rawTemplate = templates.find((t) => t.id === smartItem.templateId);
                const isCurrentlyActive = selectedTemplateId === smartItem.templateId;
                const activeProfileId = selectedProfileMap[smartItem.id] || smartItem.defaultProfileId;
                const activeProfile =
                  smartItem.profiles.find((p) => p.id === activeProfileId) || smartItem.profiles[0];

                return (
                  <div
                    key={smartItem.id}
                    id={`smart-card-${smartItem.id}`}
                    className={`rounded-2xl border p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 ${
                      isCurrentlyActive
                        ? 'bg-gradient-to-br from-cyan-950/40 via-slate-900 to-slate-900 border-cyan-500/60 shadow-lg shadow-cyan-950/30 ring-1 ring-cyan-500/30'
                        : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40 shadow-sm'
                    }`}
                  >
                    <div>
                      {/* Top Badges & Meta */}
                      <div className="flex items-start justify-between gap-3 mb-2.5">
                        <div className="flex items-center gap-2.5">
                          <div className={`p-2 rounded-xl shrink-0 ${
                            smartItem.docTypeCode === 'mehnat'
                              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                              : smartItem.docTypeCode === 'ijara'
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                              : smartItem.docTypeCode === 'doverennost'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                          }`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                              {smartItem.governingCodeName}
                            </span>
                            <h3 className="text-sm font-bold text-white leading-tight">
                              {smartItem.shortTitle}
                            </h3>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-1 shrink-0">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-cyan-300 border border-slate-700">
                            {smartItem.standardClassification.split('/')[0].trim()}
                          </span>
                          {isCurrentlyActive && (
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
                              Faol tahrirda
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-slate-300 leading-relaxed mb-3">
                        {smartItem.summary}
                      </p>

                      {/* Mandatory Legislation Clauses Checklist */}
                      <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/80 mb-3 space-y-1.5">
                        <div className="flex items-center justify-between text-[11px] font-bold text-slate-300 pb-1 border-b border-slate-800">
                          <span className="flex items-center gap-1.5 text-cyan-400">
                            <Scale className="w-3.5 h-3.5" />
                            Qonuniy Majburiy Shartlar (Lex.uz)
                          </span>
                          <a
                            href={smartItem.lexUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-500 hover:text-cyan-400 transition flex items-center gap-1 text-[10px]"
                            title="Lex.uz rasmiy qonun matnini ochish"
                          >
                            <span>Norma</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                        <ul className="text-[11px] text-slate-400 space-y-1">
                          {smartItem.statutoryMandatoryClauses.slice(0, 3).map((clause, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{clause}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Sub-Profiles Selector (Standard vs Remote vs Commercial etc.) */}
                      {smartItem.profiles.length > 1 && (
                        <div className="space-y-1.5 mb-3.5">
                          <span className="text-[11px] font-bold text-slate-400 block">
                            Qonunchilik profillari (Pre-fill Profile):
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {smartItem.profiles.map((profile) => {
                              const isProfileActive = profile.id === activeProfileId;
                              return (
                                <button
                                  key={profile.id}
                                  onClick={(e) => handleSelectProfile(smartItem.id, profile.id, e)}
                                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition cursor-pointer flex items-center gap-1 ${
                                    isProfileActive
                                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 font-bold'
                                      : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-slate-700/60'
                                  }`}
                                  title={profile.description}
                                >
                                  <span>{profile.badge}</span>
                                  {isProfileActive && <span>✓</span>}
                                </button>
                              );
                            })}
                          </div>
                          <p className="text-[10px] text-amber-200/80 italic mt-1 bg-amber-950/20 px-2 py-1 rounded border border-amber-500/20">
                            Tanlangan: {activeProfile.name} — {activeProfile.description}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Bottom Actions */}
                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                      {rawTemplate && (
                        <button
                          onClick={() => onPreviewTemplate(rawTemplate)}
                          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition cursor-pointer flex items-center gap-1"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Prevyu</span>
                        </button>
                      )}

                      <button
                        onClick={() => handleApplySmartTemplate(smartItem)}
                        id={`btn-apply-smart-${smartItem.id}`}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 text-xs font-extrabold transition shadow-md shadow-amber-950/40 cursor-pointer flex items-center gap-1.5 ml-auto"
                        title="Ushbu shablonni tanlash va O‘zbekiston qonunchilik me‘yorlari bilan avto-to‘ldirish"
                      >
                        <Zap className="w-3.5 h-3.5 fill-slate-950" />
                        <span>Tanlash & Avto-to‘ldirish</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Guarantee info */}
        <div className="p-3.5 px-6 border-t border-slate-800 bg-slate-950/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-400 shrink-0">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              Barcha andozalar O‘zbekiston Respublikasining rasmiy kodekslari (MK, FK, SK) va O‘zDSt 1157:2008 mezonlariga moslashtirilgan.
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white font-semibold cursor-pointer underline text-[11px]"
          >
            Yopish
          </button>
        </div>
      </div>
    </div>
  );
};
