import React, { useState } from 'react';
import { 
  Search, 
  BookOpen, 
  ExternalLink, 
  Bookmark, 
  BookmarkCheck, 
  Copy, 
  Check, 
  Sparkles, 
  Filter,
  Layers,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { CodexArticle, LegalCategory } from '../types';
import { UZBEKISTAN_LAWS_DATABASE, searchLawsDatabase } from '../data/lawsDatabase';

interface CodexExplorerProps {
  onSaveCitation: (citation: any) => void;
  savedArticleIds: Set<string>;
  onAskAIAboutArticle: (articleText: string, articleNum: string, codeName: string) => void;
}

export const CodexExplorer: React.FC<CodexExplorerProps> = ({
  onSaveCitation,
  savedArticleIds,
  onAskAIAboutArticle,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<LegalCategory>('all');
  const [selectedArticle, setSelectedArticle] = useState<CodexArticle | null>(
    UZBEKISTAN_LAWS_DATABASE[0] || null
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories: { id: LegalCategory; label: string }[] = [
    { id: 'all', label: 'Barcha Qonunlar' },
    { id: 'labor', label: 'Mehnat kodeksi' },
    { id: 'civil', label: 'Fuqarolik kodeksi' },
    { id: 'family', label: 'Oila kodeksi' },
    { id: 'tax', label: 'Soliq kodeksi' },
    { id: 'admin', label: 'Ma‘muriy javobgarlik' },
    { id: 'court', label: 'Davlat boji & Sud' },
    { id: 'it_ip', label: 'IT Park & Texnologiyalar' },
  ];

  const filteredArticles = searchLawsDatabase(searchQuery, selectedCategory);

  const copyArticle = (art: CodexArticle) => {
    const text = `${art.codeName}\n${art.chapterNumber ? art.chapterNumber + ': ' : ''}${art.chapterTitle || ''}\n${art.articleNumber}. ${art.articleTitle}\n\n${art.content}\n\nManba: ${art.lexUrl}`;
    navigator.clipboard.writeText(text);
    setCopiedId(art.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto p-2 sm:p-4 space-y-4">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-white font-mono">LEX.UZ Qonunchilik & Moddalar Bazasi</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            O‘zbekiston Respublikasining rasmiy normativ-huquqiy hujjatlari, amaldagi tahrirlari va to‘g‘ridan-to‘g‘ri Lex.uz havolalari.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            id="codex-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Modda raqami yoki so‘z (masalan: 161, aliment, ta'til)..."
            className="w-full bg-slate-950 text-slate-200 placeholder-slate-500 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-800 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            id={`category-tab-${cat.id}`}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
              selectedCategory === cat.id
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Main Split View: Left List & Right Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Article List */}
        <div className="lg:col-span-5 space-y-2 max-h-[600px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-800">
          {filteredArticles.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center text-slate-400">
              <p className="text-sm">Qidiruv bo‘yicha moddalar topilmadi.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                className="mt-2 text-xs text-cyan-400 underline"
              >
                Filtrlarni tozalash
              </button>
            </div>
          ) : (
            filteredArticles.map((art) => {
              const isSelected = selectedArticle?.id === art.id;
              const isSaved = savedArticleIds.has(art.id);

              return (
                <div
                  key={art.id}
                  id={`article-item-${art.id}`}
                  onClick={() => setSelectedArticle(art)}
                  className={`p-3.5 rounded-xl border transition cursor-pointer ${
                    isSelected
                      ? 'bg-slate-800/90 border-cyan-500/60 shadow-md shadow-cyan-950/40'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/50">
                      {art.articleNumber}
                    </span>
                    <span className="text-[10px] text-slate-500 flex items-center gap-1">
                      <Calendar className="w-2.5 h-2.5" />
                      {art.effectiveDate}
                    </span>
                  </div>

                  <h3 className="text-xs sm:text-sm font-semibold text-white line-clamp-1 mb-1">
                    {art.articleTitle}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {art.content}
                  </p>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/60 text-[11px] text-slate-400">
                    <span className="truncate max-w-[200px] text-slate-400 font-medium">
                      {art.codeName}
                    </span>
                    <span className="text-emerald-400 font-semibold text-[10px]">Amaldagi tahrir</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right: Detailed Article Reader & AI Explainer */}
        <div className="lg:col-span-7">
          {selectedArticle ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 sticky top-24 shadow-lg">
              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-3 pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                      {selectedArticle.articleNumber}
                    </span>
                    <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Amaldagi tahrir ({selectedArticle.effectiveDate})
                    </span>
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-white leading-snug">
                    {selectedArticle.articleTitle}
                  </h2>
                  <p className="text-xs text-slate-400 mt-1 font-medium">
                    {selectedArticle.codeName} {selectedArticle.chapterNumber ? `— ${selectedArticle.chapterNumber}` : ''}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyArticle(selectedArticle)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-400 transition"
                    title="Nusxa olish"
                  >
                    {copiedId === selectedArticle.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => onSaveCitation({
                      documentName: selectedArticle.codeName,
                      documentType: 'Kodeks',
                      articleNumber: selectedArticle.articleNumber,
                      quote: selectedArticle.content.slice(0, 150),
                      editionDate: selectedArticle.effectiveDate,
                      lexUrl: selectedArticle.lexUrl,
                      status: 'CURRENT',
                    })}
                    className={`p-2 rounded-lg transition ${
                      savedArticleIds.has(selectedArticle.id)
                        ? 'bg-cyan-500/20 text-cyan-300'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-400'
                    }`}
                    title="Kabinetga saqlash"
                  >
                    {savedArticleIds.has(selectedArticle.id) ? (
                      <BookmarkCheck className="w-4 h-4 text-cyan-400" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>

                  <a
                    href={selectedArticle.lexUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-indigo-900/70 hover:bg-indigo-800 text-indigo-200 text-xs font-semibold border border-indigo-700/60 transition"
                  >
                    <span>Lex.uz da ko‘rish</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Article Content */}
              <div className="bg-slate-950/80 rounded-xl p-4 sm:p-5 border border-slate-800/80 font-serif text-sm sm:text-base text-slate-200 leading-relaxed whitespace-pre-wrap">
                {selectedArticle.content}
              </div>

              {/* Keywords */}
              {selectedArticle.keywords && (
                <div className="flex flex-wrap items-center gap-1.5 pt-2">
                  <span className="text-xs text-slate-500 font-medium">Kalit so‘zlar:</span>
                  {selectedArticle.keywords.map((kw, i) => (
                    <span key={i} className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700/50">
                      #{kw}
                    </span>
                  ))}
                </div>
              )}

              {/* Ask AI CTA Banner */}
              <div className="bg-gradient-to-r from-cyan-950/40 via-blue-950/40 to-indigo-950/40 border border-cyan-800/40 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Ushbu modda bo‘yicha AI maslahati kerakmi?</h4>
                    <p className="text-[11px] text-slate-400">AI moddani amaliy misollar bilan tushuntirib beradi</p>
                  </div>
                </div>

                <button
                  id="ask-ai-this-article-btn"
                  onClick={() => onAskAIAboutArticle(selectedArticle.content, selectedArticle.articleNumber, selectedArticle.codeName)}
                  className="w-full sm:w-auto px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition shadow-md shadow-cyan-900/30 whitespace-nowrap"
                >
                  AI dan so‘rash
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
              <BookOpen className="w-8 h-8 mx-auto text-slate-600 mb-2" />
              <p className="text-sm">Batafsil ko‘rish uchun chapdagi ro‘yxatdan moddani tanlang.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
