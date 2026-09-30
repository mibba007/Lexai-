import React from 'react';
import { 
  FolderLock, 
  Bookmark, 
  Trash2, 
  ExternalLink, 
  Copy, 
  Check, 
  Scale, 
  FileText, 
  ShieldCheck,
  Calendar,
  Sparkles
} from 'lucide-react';
import { LegalCitation } from '../types';
import { LexVerificationBadge } from './LexVerificationBadge';

interface CabinetViewProps {
  savedCitations: LegalCitation[];
  onRemoveCitation: (lexUrl: string) => void;
  onNavigateToChat: () => void;
}

export const CabinetView: React.FC<CabinetViewProps> = ({
  savedCitations,
  onRemoveCitation,
  onNavigateToChat,
}) => {
  const [copiedUrl, setCopiedUrl] = React.useState<string | null>(null);

  const copyCitation = (cite: LegalCitation) => {
    const text = `${cite.documentName}, ${cite.articleNumber} ${cite.partNumber ? '(' + cite.partNumber + ')' : ''}\n«${cite.quote || ''}»\nManba: ${cite.lexUrl}`;
    navigator.clipboard.writeText(text);
    setCopiedUrl(cite.lexUrl);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto p-2 sm:p-4 space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
            <FolderLock className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white font-mono">Mening Yuridik Kabinetim</h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Saqlangan Lex.uz huquqiy normalari, moddalar va yuridik xulosalar arxivi.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 font-medium">
            Saqlangan moddalar: <strong className="text-cyan-400">{savedCitations.length} ta</strong>
          </span>
        </div>
      </div>

      {/* Citations List */}
      {savedCitations.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
          <Bookmark className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-semibold text-white">Saqlangan moddalar mavjud emas</h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            AI konsultatsiyasi yoki Qonunchilik bazasidan kerakli moddalarni tanlab, «Saqlash» tugmasini bossangiz, ular shu yerda jamlanadi.
          </p>
          <button
            onClick={onNavigateToChat}
            className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition"
          >
            <Scale className="w-4 h-4" />
            <span>Konsultatsiyaga o‘tish</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedCitations.map((cite, idx) => (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 hover:border-cyan-500/40 rounded-xl p-5 space-y-3 transition flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-950 text-indigo-300 border border-indigo-800/60">
                      {cite.documentType}
                    </span>
                    {/* Real-time verification badge */}
                    <LexVerificationBadge citation={cite} size="sm" />
                  </div>
                  <span className="text-[10px] text-slate-500 flex items-center gap-1">
                    <Calendar className="w-2.5 h-2.5" />
                    {cite.editionDate || 'Amaldagi tahrir'}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white mb-1">
                  {cite.documentName}
                </h3>
                <span className="text-xs font-bold text-cyan-400 block mb-2">
                  {cite.articleNumber} {cite.partNumber ? `(${cite.partNumber})` : ''} {cite.paragraphNumber || ''}
                </span>

                {cite.quote && (
                  <blockquote className="text-xs text-slate-300 italic bg-slate-950 p-2.5 rounded-lg border border-slate-800/80 leading-relaxed">
                    «{cite.quote}»
                  </blockquote>
                )}
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2 text-xs">
                <a
                  href={cite.lexUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-indigo-300 hover:underline font-medium text-xs"
                >
                  <span>Lex.uz da ochish</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => copyCitation(cite)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-400 transition"
                    title="Nusxa olish"
                  >
                    {copiedUrl === cite.lexUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => onRemoveCitation(cite.lexUrl)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/40 text-slate-400 hover:text-rose-400 transition"
                    title="O‘chirish"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
