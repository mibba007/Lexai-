/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Qonunchilik iqtiboslari va qonuniy shartnoma bandlari banki.
 * Drag-and-drop va 1-klik orqali shartnoma loyihasiga qo‘shish imkoniyatiga ega.
 */

import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Plus, 
  ExternalLink, 
  Scale, 
  GripVertical, 
  Check, 
  Sparkles,
  Info,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { LEGAL_CLAUSE_BANK, LegalClauseSnippet } from '../data/legalClauseBank';

interface LegalClauseDrawerProps {
  onInsertClause: (clauseText: string, sectionTitle?: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const LegalClauseDrawer: React.FC<LegalClauseDrawerProps> = ({
  onInsertClause,
  isOpen,
  onToggle,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [insertedId, setInsertedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'Barcha bandlar' },
    { id: 'labor', label: 'Mehnat (MK)' },
    { id: 'civil', label: 'Fuqarolik & Ijara (FK)' },
    { id: 'business', label: 'Biznes & Sifat' },
    { id: 'liability', label: 'Peniya & Jarima' },
    { id: 'confidentiality', label: 'Maxfiylik & NDA' },
    { id: 'dispute', label: 'Nizolar & Sud' },
  ];

  const filteredClauses = LEGAL_CLAUSE_BANK.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.applicableArticle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.clauseText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleInsert = (clause: LegalClauseSnippet) => {
    onInsertClause(clause.clauseText, clause.title);
    setInsertedId(clause.id);
    setTimeout(() => setInsertedId(null), 1800);
  };

  const handleDragStart = (e: React.DragEvent, clause: LegalClauseSnippet) => {
    e.dataTransfer.setData('text/plain', clause.clauseText);
    e.dataTransfer.setData('application/json', JSON.stringify(clause));
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
              Qonuniy Iqtiboslar va Bandlar Banki
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                Drag & Drop
              </span>
            </h4>
            <p className="text-[11px] text-slate-400">
              Shartnomaga to‘g‘ridan-to‘g‘ri tortib tashlang (drag) yoki 1-bosish bilan kiriting
            </p>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Bandlar, qonun moddalari yoki kalit so‘zlarni qidiring..."
          className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
        />
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 text-xs">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap transition cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-750'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Drag & Drop Hint */}
      <div className="flex items-center gap-2 p-2 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-[11px] text-cyan-300">
        <Info className="w-3.5 h-3.5 shrink-0 text-cyan-400" />
        <span>Quyidagi bandlarni sichqoncha bilan tutib, shartnoma bloklariga tortib tashlashingiz mumkin.</span>
      </div>

      {/* Clause Cards List */}
      <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
        {filteredClauses.length === 0 ? (
          <div className="text-center py-6 text-xs text-slate-500">
            Qidiruv bo‘yicha mos keluvchi qonuniy band topilmadi.
          </div>
        ) : (
          filteredClauses.map((clause) => {
            const isJustInserted = insertedId === clause.id;
            return (
              <div
                key={clause.id}
                draggable={true}
                onDragStart={(e) => handleDragStart(e, clause)}
                id={`clause-drag-${clause.id}`}
                className="group p-3 rounded-xl bg-slate-950/70 hover:bg-slate-950 border border-slate-800 hover:border-cyan-500/40 transition-all cursor-grab active:cursor-grabbing relative"
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <GripVertical className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 shrink-0" />
                    <h5 className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition line-clamp-1">
                      {clause.title}
                    </h5>
                  </div>

                  <button
                    onClick={() => handleInsert(clause)}
                    title="Shartnomaga qo‘shish"
                    className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold transition cursor-pointer shrink-0 ${
                      isJustInserted
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'bg-cyan-500/10 hover:bg-cyan-500 text-cyan-400 hover:text-slate-950 border border-cyan-500/20'
                    }`}
                  >
                    {isJustInserted ? (
                      <>
                        <Check className="w-3 h-3" />
                        <span>Qo‘shildi!</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3 h-3" />
                        <span>Kiritish</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-[11px] text-slate-400 line-clamp-2 mb-2 leading-relaxed pl-5">
                  {clause.clauseText}
                </p>

                <div className="flex items-center justify-between pt-1 border-t border-slate-900 text-[10px] pl-5">
                  <div className="flex items-center gap-1 text-slate-400">
                    <Scale className="w-3 h-3 text-cyan-400" />
                    <span className="font-medium text-slate-300">{clause.applicableArticle}</span>
                  </div>

                  <a
                    href={clause.lexUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-0.5 text-cyan-400 hover:text-cyan-300 transition font-medium"
                  >
                    <span>Lex.uz</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
