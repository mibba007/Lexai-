import React, { useState } from 'react';
import { 
  ExternalLink, 
  Copy, 
  Check, 
  ShieldCheck, 
  AlertTriangle, 
  X, 
  Scale, 
  ArrowUpRight 
} from 'lucide-react';
import { sanitizeLexUrl, checkObsoleteDoc, openSafeLexUrl } from '../utils/lexUrlSanitizer';

interface LexCanonicalLinkProps {
  url?: string;
  documentName?: string;
  articleNumber?: string;
  label?: string;
  children?: React.ReactNode;
  className?: string;
  showVerifiedBadge?: boolean;
  size?: 'xs' | 'sm' | 'md';
  variant?: 'primary' | 'outline' | 'ghost' | 'pill' | 'subtle';
  showCopyButton?: boolean;
}

export const LexCanonicalLink: React.FC<LexCanonicalLinkProps> = ({
  url,
  documentName,
  articleNumber,
  label,
  children,
  className = '',
  showVerifiedBadge = false,
  size = 'sm',
  variant = 'outline',
  showCopyButton = false,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [showSafeModal, setShowSafeModal] = useState<boolean>(false);

  // Compute 100% canonical, validated, HTTPS Lex.uz URL
  const canonicalUrl = sanitizeLexUrl(url, documentName, articleNumber);
  const obsCheck = checkObsoleteDoc(url || '');

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(canonicalUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If inside an iframe where standard links might be blocked or fail,
    // we safely attempt openSafeLexUrl
    const opened = openSafeLexUrl(url, documentName, articleNumber);
    if (!opened) {
      // If popup blocker intervened, show the safe interactive link modal
      e.preventDefault();
      setShowSafeModal(true);
    }
  };

  // Size styling
  const sizeClasses = {
    xs: 'px-1.5 py-0.5 text-[10px] gap-1',
    sm: 'px-2 py-1 text-xs gap-1.5',
    md: 'px-3 py-1.5 text-xs sm:text-sm gap-2 font-medium',
  }[size];

  // Variant styling
  const variantClasses = {
    primary: 'bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold shadow-xs',
    outline: 'bg-indigo-900/60 hover:bg-indigo-800 text-indigo-200 border border-indigo-700/60',
    pill: 'bg-emerald-950/80 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-600/60 rounded-full font-semibold',
    ghost: 'text-cyan-400 hover:text-cyan-300 hover:underline p-0 bg-transparent',
    subtle: 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700',
  }[variant];

  return (
    <>
      <span className="inline-flex items-center gap-1">
        <a
          href={canonicalUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          title={`Lex.uz rasmiy amaldagi tahriri: ${canonicalUrl}`}
          className={`inline-flex items-center rounded-lg transition-colors cursor-pointer select-none ${sizeClasses} ${variantClasses} ${className}`}
        >
          {showVerifiedBadge && (
            <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
          )}

          <span>{children || label || 'Lex.uz'}</span>
          <ExternalLink className="w-3 h-3 shrink-0 opacity-80" />
        </a>

        {/* Quick 1-click Copy button */}
        {showCopyButton && (
          <button
            type="button"
            onClick={handleCopy}
            className="p-1 rounded text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition"
            title="Lex.uz kanonik havolasidan nusxa olish"
          >
            {copied ? (
              <Check className="w-3 h-3 text-emerald-400" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
          </button>
        )}

        {/* If this link was upgraded from an obsolete law, display indicator */}
        {obsCheck.isObsolete && (
          <span 
            className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700/70"
            title={obsCheck.reason || 'Bekor bo‘lgan qonun o‘rniga amaldagi yangi tahrir ochiladi'}
          >
            Yangi tahrir ✓
          </span>
        )}
      </span>

      {/* Safe Link Dialog if browser blocks external popups */}
      {showSafeModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 animate-in fade-in duration-150"
          onClick={() => setShowSafeModal(false)}
        >
          <div 
            className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-5 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/50 flex items-center justify-center text-cyan-400">
                  <Scale className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">
                    Lex.uz Rasmiy Havolasi
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    O‘zbekiston Respublikasi Adliya vazirligi bazasi
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setShowSafeModal(false)}
                className="p-1 text-slate-400 hover:text-white rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {documentName && (
              <div className="text-xs space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Qonun hujjati:</span>
                <p className="font-semibold text-white">
                  {documentName} {articleNumber ? `— ${articleNumber}` : ''}
                </p>
              </div>
            )}

            {obsCheck.isObsolete && (
              <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-500/50 text-[11px] text-amber-200 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong>Amaldagi tahrirga yo‘naltirildi:</strong>
                  <p>{obsCheck.reason}</p>
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-slate-400">Kanonik HTTPS Manzil:</span>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300 break-all select-all flex items-center justify-between gap-2">
                <span>{canonicalUrl}</span>
                <button
                  onClick={handleCopy}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-sans font-bold flex items-center gap-1 shrink-0"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Nusxalandi' : 'Nusxa olish'}</span>
                </button>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-800">
              <button
                onClick={() => setShowSafeModal(false)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Yopish
              </button>
              <a
                href={canonicalUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowSafeModal(false)}
                className="px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-sm"
              >
                <span>Yangi oynada ochish</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
