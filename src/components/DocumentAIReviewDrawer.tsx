/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Document AI Review Drawer Component.
 * Displays AI-identified legal errors, missing mandatory clauses under Uzbekistan Law (Lex.uz),
 * and provides 1-click inline suggestions and auto-fixes.
 */

import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  AlertTriangle, 
  AlertCircle, 
  CheckCircle2, 
  ExternalLink, 
  Check, 
  ArrowRight, 
  Wand2, 
  Scale, 
  FileText, 
  ShieldAlert, 
  ShieldCheck, 
  RefreshCw,
  PlusCircle,
  FileCheck
} from 'lucide-react';
import { DocumentAIReviewResult, DocumentReviewSuggestion, ReviewSuggestionType } from '../types';

interface DocumentAIReviewDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  reviewResult: DocumentAIReviewResult | null;
  isLoading: boolean;
  onApplySuggestion: (suggestion: DocumentReviewSuggestion) => void;
  onApplyAllSuggestions: () => void;
  appliedSuggestionIds: Set<string>;
  onRefreshReview?: () => void;
}

export const DocumentAIReviewDrawer: React.FC<DocumentAIReviewDrawerProps> = ({
  isOpen,
  onClose,
  reviewResult,
  isLoading,
  onApplySuggestion,
  onApplyAllSuggestions,
  appliedSuggestionIds,
  onRefreshReview,
}) => {
  const [filterType, setFilterType] = useState<ReviewSuggestionType | 'ALL'>('ALL');

  if (!isOpen) return null;

  const suggestions = reviewResult?.suggestions || [];
  const filteredSuggestions = suggestions.filter((s) => {
    if (filterType === 'ALL') return true;
    return s.type === filterType;
  });

  const criticalCount = suggestions.filter((s) => s.type === 'CRITICAL_ERROR').length;
  const missingCount = suggestions.filter((s) => s.type === 'MISSING_MANDATORY_CLAUSE').length;
  const unappliedCount = suggestions.filter((s) => !appliedSuggestionIds.has(s.id)).length;

  return (
    <div 
      className="fixed inset-y-0 right-0 z-50 w-full max-w-xl bg-slate-900 border-l border-slate-700/80 shadow-2xl flex flex-col animate-slideLeft"
      role="dialog"
      aria-modal="true"
    >
      {/* Drawer Header */}
      <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-400">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <span>AI Yuridik Ekspertiza &amp; Audit</span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                Lex.uz Qonunlari
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Qonunga zid bandlar, yetishmayotgan shartlar va 1-bosishda tuzatish
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {onRefreshReview && (
            <button
              onClick={onRefreshReview}
              disabled={isLoading}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              title="Qayta tekshirish"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-cyan-400' : ''}`} />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            title="Yopish"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Drawer Body */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
        
        {/* Loading State */}
        {isLoading && (
          <div className="py-16 flex flex-col items-center justify-center text-center space-y-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-2 border-cyan-500/30 border-t-cyan-400 animate-spin"></div>
              <Sparkles className="w-5 h-5 text-cyan-400 absolute inset-0 m-auto" />
            </div>
            <p className="text-sm font-bold text-white">AI Hujjatni qatorma-qator tahlil qilmoqda...</p>
            <p className="text-xs text-slate-400 max-w-sm">
              O‘zbekiston Respublikasi Fuqarolik kodeksi, Mehnat kodeksi, O‘zDSt 1157:2008 va Lex.uz mezonlari bilan solishtirilmoqda.
            </p>
          </div>
        )}

        {/* Loaded Review Result */}
        {!isLoading && reviewResult && (
          <>
            {/* Score & Summary Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg border ${
                    reviewResult.overallScore >= 90
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : reviewResult.overallScore >= 70
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      : 'bg-red-500/10 text-red-400 border-red-500/30'
                  }`}>
                    {reviewResult.overallScore}%
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                      <span>Yuridik Muvofiqlik Reytingi:</span>
                      <span className={
                        reviewResult.overallScore >= 90 ? 'text-emerald-400' :
                        reviewResult.overallScore >= 70 ? 'text-amber-400' : 'text-red-400'
                      }>
                        {reviewResult.overallScore >= 90 ? 'Mukammal' :
                         reviewResult.overallScore >= 70 ? 'Qoniqarli' : 'Zudlik bilan tuzatish lozim'}
                      </span>
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {criticalCount} ta xato • {missingCount} ta yetishmayotgan band
                    </p>
                  </div>
                </div>

                {/* 1-Click Apply All Fixes Button */}
                {unappliedCount > 0 && (
                  <button
                    onClick={onApplyAllSuggestions}
                    id="apply-all-suggestions-btn"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold transition shadow-md shadow-emerald-950/30 cursor-pointer shrink-0"
                    title="Barcha tavsiya va tuzatishlarni bir zumda hujjatga kiritish"
                  >
                    <Wand2 className="w-3.5 h-3.5" />
                    <span>Hammasini tuzatish ({unappliedCount})</span>
                  </button>
                )}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-slate-800/80">
                {reviewResult.summary}
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <button
                onClick={() => setFilterType('ALL')}
                className={`px-3 py-1 rounded-lg font-medium transition cursor-pointer whitespace-nowrap ${
                  filterType === 'ALL'
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Barchasi ({suggestions.length})
              </button>
              {criticalCount > 0 && (
                <button
                  onClick={() => setFilterType('CRITICAL_ERROR')}
                  className={`px-3 py-1 rounded-lg font-medium transition cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                    filterType === 'CRITICAL_ERROR'
                      ? 'bg-red-500 text-white font-bold'
                      : 'bg-red-950/40 text-red-300 border border-red-500/30 hover:bg-red-900/40'
                  }`}
                >
                  <AlertCircle className="w-3 h-3" />
                  <span>Xatolar ({criticalCount})</span>
                </button>
              )}
              {missingCount > 0 && (
                <button
                  onClick={() => setFilterType('MISSING_MANDATORY_CLAUSE')}
                  className={`px-3 py-1 rounded-lg font-medium transition cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                    filterType === 'MISSING_MANDATORY_CLAUSE'
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-amber-950/40 text-amber-300 border border-amber-500/30 hover:bg-amber-900/40'
                  }`}
                >
                  <AlertTriangle className="w-3 h-3" />
                  <span>Yetishmayotgan ({missingCount})</span>
                </button>
              )}
            </div>

            {/* Suggestions Cards List */}
            <div className="space-y-3">
              {filteredSuggestions.map((suggestion) => {
                const isApplied = appliedSuggestionIds.has(suggestion.id);
                const isCritical = suggestion.type === 'CRITICAL_ERROR';
                const isMissing = suggestion.type === 'MISSING_MANDATORY_CLAUSE';

                return (
                  <div
                    key={suggestion.id}
                    id={`suggestion-card-${suggestion.id}`}
                    className={`p-4 rounded-2xl border transition-all ${
                      isApplied
                        ? 'bg-slate-950/40 border-slate-800/80 opacity-75'
                        : isCritical
                        ? 'bg-red-950/20 border-red-500/40 shadow-sm shadow-red-950/20'
                        : isMissing
                        ? 'bg-amber-950/20 border-amber-500/40'
                        : 'bg-slate-950/70 border-slate-800'
                    }`}
                  >
                    {/* Card Top: Badges & Title */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap mb-1">
                          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${
                            isCritical
                              ? 'bg-red-500/20 text-red-300 border-red-500/40'
                              : isMissing
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                              : 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                          }`}>
                            {isCritical ? 'Qonunga zid xato' : isMissing ? 'Majburiy band yo‘q' : 'Tavsiya'}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                            {suggestion.category}
                          </span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-white">
                          {suggestion.issueTitle}
                        </h4>
                      </div>

                      {/* Applied Status or Action Button */}
                      {isApplied ? (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-2.5 py-1 rounded-lg shrink-0">
                          <Check className="w-3.5 h-3.5" />
                          <span>Qo‘llandi</span>
                        </span>
                      ) : (
                        <button
                          onClick={() => onApplySuggestion(suggestion)}
                          id={`apply-sug-btn-${suggestion.id}`}
                          className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-sm cursor-pointer shrink-0 ${
                            isCritical
                              ? 'bg-red-600 hover:bg-red-500 text-white'
                              : isMissing
                              ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                              : 'bg-cyan-600 hover:bg-cyan-500 text-white'
                          }`}
                          title="Hujjatga ushbu tuzatishni kiritish"
                        >
                          {suggestion.actionType === 'REPLACE' ? (
                            <>
                              <Wand2 className="w-3 h-3" />
                              <span>Tuzatish</span>
                            </>
                          ) : (
                            <>
                              <PlusCircle className="w-3 h-3" />
                              <span>Qo‘shish</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>

                    {/* Problematic Text (if replacing) */}
                    {suggestion.problematicText && (
                      <div className="my-2 p-2 rounded-lg bg-red-950/40 border border-red-500/30 text-[11px] text-red-200">
                        <span className="font-semibold text-red-400">Muammoli joriy matn:</span>
                        <p className="font-mono mt-0.5 line-through opacity-90">«{suggestion.problematicText}»</p>
                      </div>
                    )}

                    {/* Law Citation with Lex.uz Link */}
                    <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300 my-2">
                      <div className="flex items-center gap-1.5">
                        <Scale className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="line-clamp-1">{suggestion.lawViolationCitation}</span>
                      </div>
                      <a
                        href={suggestion.lexUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold shrink-0"
                      >
                        <span>Lex.uz</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    {/* Explanation */}
                    <p className="text-xs text-slate-300 leading-relaxed mt-1">
                      {suggestion.explanation}
                    </p>

                    {/* Suggested Replacement Preview */}
                    <div className="mt-2.5 pt-2 border-t border-slate-800 text-[11px]">
                      <span className="font-semibold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Tavsiya etiladigan qonuniy matn:</span>
                      </span>
                      <div className="mt-1 p-2 rounded-lg bg-emerald-950/20 border border-emerald-500/30 text-emerald-200 font-mono text-[11px] whitespace-pre-wrap">
                        {suggestion.suggestedReplacement}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Drawer Footer */}
      <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Barcha tavsiyalar Lex.uz amaldagi kodekslariga asoslangan</span>
        </div>

        <button
          onClick={onClose}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition cursor-pointer"
        >
          Yopish
        </button>
      </div>
    </div>
  );
};
