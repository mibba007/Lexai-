/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LegalChatView } from './components/LegalChatView';
import { AudioForensic } from './components/AudioForensic';
import { CodexExplorer } from './components/CodexExplorer';
import { ContractAnalyzer } from './components/ContractAnalyzer';
import { DisputeIntelligence } from './components/DisputeIntelligence';
import { DocumentGenerator } from './components/DocumentGenerator';
import { LegalCalculators } from './components/LegalCalculators';
import { CabinetView } from './components/CabinetView';
import { MyProfileView } from './components/MyProfileView';
import { NavigationTab, LegalCitation, LanguageMode, ConsultationDocContext } from './types';
import { useOfflineMode } from './utils/offlineManager';
import { WifiOff, Info } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('chat');
  const [language, setLanguage] = useState<LanguageMode>('uz_lat');
  const [consultationDocContext, setConsultationDocContext] = useState<ConsultationDocContext | null>(null);
  const { isEffectiveOffline, toggleForcedOffline } = useOfflineMode();
  const [savedCitations, setSavedCitations] = useState<LegalCitation[]>(() => {
    try {
      const saved = localStorage.getItem('lexai_saved_citations');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('lexai_saved_citations', JSON.stringify(savedCitations));
    } catch (e) {
      console.warn('Saqlangan moddalarni xotiraga yozishda eslatma:', e);
    }
  }, [savedCitations]);

  const handleSaveCitation = (citation: LegalCitation) => {
    setSavedCitations((prev) => {
      if (prev.some((c) => c.lexUrl === citation.lexUrl)) {
        return prev.filter((c) => c.lexUrl !== citation.lexUrl);
      }
      return [citation, ...prev];
    });
  };

  const handleRemoveCitation = (lexUrl: string) => {
    setSavedCitations((prev) => prev.filter((c) => c.lexUrl !== lexUrl));
  };

  const savedCitationUrls = new Set(savedCitations.map((c) => c.lexUrl));

  const handleAskAIAboutArticle = (articleText: string, articleNum: string, codeName: string) => {
    setActiveTab('chat');
    // Store in session storage to trigger automatic question if needed
    const prompt = `Hurmatli AI-yurist, ${codeName}ning ${articleNum} («${articleText.slice(0, 200)}...») bo‘yicha amaliyotda eng ko‘p uchraydigan holatlar, fuqarolar va tadbirkorlar uchun huquqiy oqibatlarini tushuntirib bering.`;
    // We can dispatch or set text directly
    setTimeout(() => {
      const inputEl = document.getElementById('legal-chat-input') as HTMLTextAreaElement;
      if (inputEl) {
        inputEl.value = prompt;
        inputEl.focus();
      }
    }, 100);
  };

  const handleNavigateToGenerator = (context?: ConsultationDocContext) => {
    if (context) {
      setConsultationDocContext(context);
    }
    setActiveTab('generator');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        language={language}
        setLanguage={setLanguage}
        savedCount={savedCitations.length}
        isEffectiveOffline={isEffectiveOffline}
        onToggleOfflineMode={toggleForcedOffline}
      />

      {/* Global Offline Mode Notice Banner if offline */}
      {isEffectiveOffline && (
        <div className="bg-gradient-to-r from-amber-950/80 via-slate-900 to-amber-950/80 border-b border-amber-500/30 px-4 py-2 text-xs text-amber-200">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <WifiOff className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>Oflayn rejim faol:</strong> Hujjatlar generatori, barcha namunaviy shartnomalar, qonunchilik qoidalari va <strong>PDF Export</strong> internet talab qilmasdan 100% lokal ishlaydi.
              </span>
            </div>
            <button
              onClick={() => setActiveTab('generator')}
              className="text-[11px] underline font-medium hover:text-white shrink-0 cursor-pointer"
            >
              Hujjat tuzish →
            </button>
          </div>
        </div>
      )}

      {/* Main Tab Content */}
      <main className="flex-1 pb-8">
        {activeTab === 'chat' && (
          <LegalChatView
            onSaveCitation={handleSaveCitation}
            savedCitationUrls={savedCitationUrls}
            onNavigateToDocumentGenerator={handleNavigateToGenerator}
          />
        )}

        {activeTab === 'forensic' && (
          <AudioForensic
            onNavigateToDocumentGenerator={(initialDoc) => handleNavigateToGenerator({
              query: initialDoc.title,
              suggestedDocType: initialDoc.docType,
              analysis: {
                category: 'civil',
                summaryAnswer: 'Audio yozuvning sud-fonotexnika ekspertizasi va stenogrammasi asosida iltimosnoma loyihasi.',
                legalBasis: [
                  {
                    documentName: 'O‘zbekiston Respublikasining Fuqarolik protsessual kodeksi',
                    documentType: 'Kodeks',
                    articleNumber: '78-modda',
                    quote: 'Audio va video yozuvlarni taqdim etuvchi yoki ularni talab qilib olish to‘g‘risida iltimosnoma beruvchi shaxs yozuv qachon, kim tomonidan va qanday sharoitda amalga oshirilganligini ko‘rsatishi shart.',
                    editionDate: 'Amaldagi tahrir',
                    lexUrl: 'https://lex.uz/docs/3517337',
                    status: 'CURRENT',
                  },
                ],
                detailedAnalysis: initialDoc.prefilledContent || 'Audio dalilni ish materiallariga qo‘shish to‘g‘risidagi rasmiy protsessual iltimosnoma shakllantirildi.',
                practicalSteps: ['Hujjatni chop etish va imzolash', 'Audio yozuvning disk/fleshkadagi nusxasini ilova qilish', 'Sudga topshirish'],
                importantNotes: ['FPK 78-moddasiga muvofiq audio yozuvning qachon, kim tomonidan va qanday sharoitda yozilgani ko‘rsatilishi shart.'],
                confidenceLevel: 'HIGH',
                editionStatus: 'Amaldagi tahrir: 2026-yil',
              },
            })}
          />
        )}

        {activeTab === 'dispute' && (
          <DisputeIntelligence
            onNavigateToDocumentGenerator={(docType) => handleNavigateToGenerator({
              query: 'Nizo bo‘yicha e‘tiroznoma va sud hujjati',
              suggestedDocType: docType || 'E‘tiroznoma (Otziv)',
              analysis: {
                category: 'civil',
                summaryAnswer: 'Nizo ekspertizasi asosida shakllantirilgan rasmiy hujjat loyihasi.',
                legalBasis: [
                  {
                    documentName: 'O‘zbekiston Respublikasining Iqtisodiy protsessual kodeksi',
                    documentType: 'Kodeks',
                    articleNumber: '156-modda',
                    quote: 'Javobgar da‘vo arizasini olgandan keyin sudga va ishda ishtirok etuvchi shaxslarga da‘vo arizasi yuzasidan yozma fikr (e‘tiroznoma) yuborishga haqli.',
                    editionDate: 'Amaldagi tahrir',
                    lexUrl: 'https://lex.uz/docs/3518442',
                    status: 'CURRENT',
                  },
                ],
                detailedAnalysis: 'Taqdim etilgan nizo holatlari bo‘yicha O‘zbekiston Respublikasi protsessual va moddiy qonunchiligiga asoslangan rasmiy sud hujjati shakllantirildi.',
                practicalSteps: ['Hujjatni imzolash', 'Sudga taqdim etish'],
                importantNotes: ['Sud majlisiga qadar e‘tiroznomani topshirish maqsadga muvofiq.'],
                confidenceLevel: 'HIGH',
                editionStatus: 'Amaldagi tahrir',
              },
            })}
          />
        )}

        {activeTab === 'codex' && (
          <CodexExplorer
            onSaveCitation={handleSaveCitation}
            savedArticleIds={savedCitationUrls}
            onAskAIAboutArticle={handleAskAIAboutArticle}
          />
        )}

        {activeTab === 'contract' && <ContractAnalyzer />}

        {activeTab === 'generator' && (
          <DocumentGenerator
            consultationContext={consultationDocContext}
            onClearConsultationContext={() => setConsultationDocContext(null)}
          />
        )}

        {activeTab === 'calculators' && <LegalCalculators />}

        {activeTab === 'cabinet' && (
          <CabinetView
            savedCitations={savedCitations}
            onRemoveCitation={handleRemoveCitation}
            onNavigateToChat={() => setActiveTab('chat')}
          />
        )}

        {activeTab === 'profile' && (
          <MyProfileView
            onNavigateToGenerator={() => setActiveTab('generator')}
          />
        )}
      </main>

      {/* Footer Banner */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-4 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 LEXAI UZ — O‘zbekiston Respublikasi Qonunchiligi AI-Yuridik Konsultanti.</p>
          <p className="flex items-center gap-1 text-[11px]">
            <span>Rasmiy manba:</span>
            <a href="https://lex.uz" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
              LEX.UZ (Adliya vazirligi)
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
