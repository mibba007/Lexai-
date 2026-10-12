import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  RefreshCw, 
  ExternalLink, 
  CheckCircle2, 
  X, 
  Calendar, 
  Scale, 
  Sparkles,
  Info,
  Fingerprint,
  ArrowRightLeft,
  HelpCircle,
  XCircle,
  WifiOff,
  Clock,
  History
} from 'lucide-react';
import { LegalCitation, LexVerificationResult, LexVerificationStatus, MetadataVersionStampComparison } from '../types';
import { compareMetadataVersionStamps } from '../utils/versionStampUtils';
import { LexCanonicalLink } from './LexCanonicalLink';

interface LexVerificationBadgeProps {
  citation: LegalCitation;
  size?: 'sm' | 'md';
  autoVerify?: boolean;
  className?: string;
}

const CACHE_PREFIX = 'lex_verify_cache_v2_';

export const LexVerificationBadge: React.FC<LexVerificationBadgeProps> = ({
  citation,
  size = 'sm',
  autoVerify = true,
  className = '',
}) => {
  const [status, setStatus] = useState<LexVerificationStatus>('CHECKING');
  const [result, setResult] = useState<LexVerificationResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const cacheKey = `${CACHE_PREFIX}${citation.lexUrl || citation.documentName}_${citation.articleNumber}`;

  const performVerification = async (force: boolean = false) => {
    // 1. Check local cache if not forced
    if (!force) {
      try {
        const cached = sessionStorage.getItem(cacheKey);
        if (cached) {
          const parsed: LexVerificationResult = JSON.parse(cached);
          setResult(parsed);
          setStatus(parsed.status);
          setIsLoading(false);
          return;
        }
      } catch {
        // continue to fetch
      }
    }

    setIsLoading(true);
    setStatus('CHECKING');

    try {
      const res = await fetch('/api/lex/verify-citation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lexUrl: citation.lexUrl,
          documentName: citation.documentName,
          articleNumber: citation.articleNumber,
          quote: citation.quote,
          editionDate: citation.editionDate,
        }),
      });

      if (!res.ok) {
        throw new Error('Verifikatsiya xizmati vaqtincha javob bermadi');
      }

      const data: LexVerificationResult = await res.json();
      setResult(data);
      setStatus(data.status);
      try {
        sessionStorage.setItem(cacheKey, JSON.stringify(data));
      } catch (e) {
        console.warn('Session storage quota exceeded:', e);
      }
    } catch {
      // FAIL-CLOSED fallback state: Never assign ACTIVE or VERIFIED on failure!
      const fallbackResult: LexVerificationResult = {
        lexUrl: citation.lexUrl,
        documentName: citation.documentName,
        articleNumber: citation.articleNumber,
        status: citation.status === 'HISTORICAL' ? 'REPEALED' : 'SOURCE_UNAVAILABLE',
        statusLabel: citation.status === 'HISTORICAL' ? 'Kuchini yo‘qotgan' : 'Manba bilan bog‘lanib bo‘lmadi',
        isLatestEdition: false,
        lastAmendedLaw: 'Noma‘lum',
        lastVerifiedAt: new Date().toISOString(),
        notes: 'Rasmiy Lex.uz manbasi bilan bog‘lanib bo‘lmadi yoki norma tasdiqlanmadi.',
        officialSource: 'Lex.uz Milliy qonunchilik bazasi',
        confidence: 'UNVERIFIED',
      };
      setResult(fallbackResult);
      setStatus(fallbackResult.status);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (autoVerify) {
      performVerification(false);
    }
  }, [citation.lexUrl, citation.articleNumber, autoVerify]);

  const getStatusConfig = () => {
    switch (status) {
      case 'CHECKING':
        return {
          icon: <RefreshCw className="w-3 h-3 text-cyan-400 animate-spin" />,
          label: 'Lex.uz tekshirilmoqda...',
          badgeBg: 'bg-cyan-950/70 border-cyan-700/60 text-cyan-300',
          dotBg: 'bg-cyan-400',
        };
      case 'RECENTLY_AMENDED':
        return {
          icon: <AlertTriangle className="w-3 h-3 text-amber-400" />,
          label: result?.statusLabel || 'Lex.uz: O‘zgartirish kiritilgan',
          badgeBg: 'bg-amber-950/80 border-amber-500/70 text-amber-300 hover:bg-amber-900/80',
          dotBg: 'bg-amber-400',
        };
      case 'REPEALED':
        return {
          icon: <ShieldAlert className="w-3 h-3 text-rose-400" />,
          label: result?.statusLabel || 'Lex.uz: Kuchini yo‘qotgan',
          badgeBg: 'bg-rose-950/80 border-rose-500/70 text-rose-300 hover:bg-rose-900/80',
          dotBg: 'bg-rose-400',
        };
      case 'REVISED':
        return {
          icon: <History className="w-3 h-3 text-indigo-400" />,
          label: result?.statusLabel || 'Lex.uz: Tarixiy tahrir',
          badgeBg: 'bg-indigo-950/80 border-indigo-500/70 text-indigo-300 hover:bg-indigo-900/80',
          dotBg: 'bg-indigo-400',
        };
      case 'FUTURE_EFFECTIVE':
        return {
          icon: <Clock className="w-3 h-3 text-blue-400" />,
          label: result?.statusLabel || 'Kuchga kirishi kelajakda',
          badgeBg: 'bg-blue-950/80 border-blue-500/70 text-blue-300 hover:bg-blue-900/80',
          dotBg: 'bg-blue-400',
        };
      case 'ARTICLE_NOT_FOUND':
        return {
          icon: <XCircle className="w-3 h-3 text-slate-400" />,
          label: 'Modda topilmadi',
          badgeBg: 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800',
          dotBg: 'bg-slate-400',
        };
      case 'CITATION_MISMATCH':
      case 'TEXT_MISMATCH':
        return {
          icon: <AlertTriangle className="w-3 h-3 text-amber-400" />,
          label: result?.statusLabel || 'Iqtibos tafovuti',
          badgeBg: 'bg-amber-950/80 border-amber-600/70 text-amber-300 hover:bg-amber-900/80',
          dotBg: 'bg-amber-400',
        };
      case 'SOURCE_UNAVAILABLE':
        return {
          icon: <WifiOff className="w-3 h-3 text-slate-400" />,
          label: 'Manba tekshirilmadi',
          badgeBg: 'bg-slate-900/90 border-slate-700 text-slate-400 hover:bg-slate-800',
          dotBg: 'bg-slate-500',
        };
      case 'UNVERIFIED':
      case 'ERROR':
      case 'STATUS_UNKNOWN':
        return {
          icon: <HelpCircle className="w-3 h-3 text-slate-400" />,
          label: 'Tasdiqlanmagan',
          badgeBg: 'bg-slate-900/80 border-slate-700 text-slate-400 hover:bg-slate-800',
          dotBg: 'bg-slate-500',
        };
      case 'ACTIVE':
        return {
          icon: <ShieldCheck className="w-3 h-3 text-emerald-400" />,
          label: result?.statusLabel || 'Lex.uz: Amalda (Kuchda)',
          badgeBg: 'bg-emerald-950/80 border-emerald-500/70 text-emerald-300 hover:bg-emerald-900/80',
          dotBg: 'bg-emerald-400',
        };
      default:
        return {
          icon: <HelpCircle className="w-3 h-3 text-slate-400" />,
          label: 'Tasdiqlanmagan',
          badgeBg: 'bg-slate-900/80 border-slate-700 text-slate-400 hover:bg-slate-800',
          dotBg: 'bg-slate-500',
        };
    }
  };

  const config = getStatusConfig();

  return (
    <>
      <div className={`inline-flex items-center gap-1.5 ${className}`}>
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className={`inline-flex items-center gap-1.5 rounded-lg border font-semibold transition-all cursor-pointer shadow-xs select-none ${
            size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'
          } ${config.badgeBg}`}
          title="Lex.uz real-vaqtda qonun holatini va so‘nggi o‘zgarishlarni tekshirish sertifikati"
        >
          {config.icon}
          <span>{config.label}</span>
          <span className={`w-1.5 h-1.5 rounded-full ${config.dotBg} animate-pulse`} />
        </button>

        {/* Quick Re-Verify trigger button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            performVerification(true);
          }}
          disabled={isLoading}
          className="p-1 rounded text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors disabled:opacity-50"
          title="Lex.uz amaldagi holatini jonli qayta tekshirish"
        >
          <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin text-cyan-400' : ''}`} />
        </button>
      </div>

      {/* Verification Status Certificate Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-lg w-full p-5 space-y-4 shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
                  status === 'REPEALED' 
                    ? 'bg-rose-950/60 border-rose-500/50 text-rose-400' 
                    : status === 'RECENTLY_AMENDED' 
                      ? 'bg-amber-950/60 border-amber-500/50 text-amber-400' 
                      : 'bg-emerald-950/60 border-emerald-500/50 text-emerald-400'
                }`}>
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>Lex.uz Real-Vaqt Verifikatsiya Sertifikati</span>
                    <span className="px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 text-[10px] rounded border border-emerald-500/40">
                      Jonli Audit
                    </span>
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    O‘zbekiston Respublikasi Adliya vazirligi Lex.uz amaldagi bazasi
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Document and Article Info */}
            <div className="bg-slate-950/90 border border-slate-800 p-3 rounded-xl space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block">
                    Qonun Hujjati va Modda:
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-white mt-0.5">
                    {citation.documentName}
                  </h4>
                  <span className="text-xs font-bold text-emerald-400">
                    {citation.articleNumber} {citation.partNumber ? `(${citation.partNumber})` : ''}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-950 text-indigo-300 border border-indigo-800 shrink-0">
                  {citation.documentType || 'Qonun'}
                </span>
              </div>

              {citation.quote && (
                <div className="pt-2 border-t border-slate-900">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-1">
                    Modda matni iqtibosi:
                  </span>
                  <p className="text-xs text-slate-300 italic font-mono bg-slate-900/80 p-2 rounded border border-slate-800/80 leading-relaxed">
                    «{citation.quote}»
                  </p>
                </div>
              )}
            </div>

            {/* Live Verification Status Card */}
            <div className={`p-3.5 rounded-xl border space-y-2 ${
              status === 'REPEALED'
                ? 'bg-rose-950/30 border-rose-500/50 text-rose-200'
                : status === 'RECENTLY_AMENDED'
                  ? 'bg-amber-950/30 border-amber-500/50 text-amber-200'
                  : 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Rasmiy Yuridik Maqomi:
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold border flex items-center gap-1 ${
                  status === 'REPEALED'
                    ? 'bg-rose-900/60 border-rose-400 text-rose-200'
                    : status === 'RECENTLY_AMENDED'
                      ? 'bg-amber-900/60 border-amber-400 text-amber-200'
                      : 'bg-emerald-900/60 border-emerald-400 text-emerald-200'
                }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
                  {result?.statusLabel || 'Amaldagi tahrir (Kuchda)'}
                </span>
              </div>

              <div className="text-xs space-y-1.5 pt-1 text-slate-200">
                <div className="flex items-start gap-1.5">
                  <Scale className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-300 font-semibold">Tahlil va xulosa:</strong>{' '}
                    {result?.notes || 'Lex.uz rasmiy manbasi bo‘yicha norma to‘liq amalda.'}
                  </span>
                </div>

                <div className="flex items-start gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-300 font-semibold">So‘nggi o‘zgartirish kiritgan qonun:</strong>{' '}
                    <span className="text-amber-300 font-mono text-[11px]">
                      {result?.lastAmendedLaw || 'O‘zR amaldagi normativ bazasi'}
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Real-time Metadata Version Stamp Comparison Card */}
            {(() => {
              const versionComp = result?.versionComparison || citation.versionComparison || compareMetadataVersionStamps(citation);
              return (
                <div className="bg-slate-950/90 border border-slate-800 p-3 rounded-xl space-y-2">
                  <div className="flex items-center justify-between text-[11px] pb-1.5 border-b border-slate-900">
                    <span className="font-bold text-cyan-400 flex items-center gap-1.5">
                      <ArrowRightLeft className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Metadata Versiya Tamg‘alari Solishtiruvi:</span>
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      versionComp.isVersionMatch && versionComp.isCurrent
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-500/50'
                        : 'bg-rose-950 text-rose-300 border-rose-500/50'
                    }`}>
                      {versionComp.isVersionMatch && versionComp.isCurrent ? 'VERSIONS MATCH: CURRENT' : 'VERSION MISMATCH: OUTDATED'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                      <span className="text-[10px] text-slate-400 uppercase font-sans font-bold block">
                        AI Keltirgan Tamg‘a:
                      </span>
                      <div className="text-[11px] text-slate-200 break-all select-all font-bold">
                        {versionComp.aiVersionStamp}
                      </div>
                      <div className="text-[10px] text-slate-400 font-sans">
                        Tahrir: <span className="text-slate-200">{versionComp.aiEditionDate}</span>
                      </div>
                    </div>

                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                      <span className="text-[10px] text-emerald-400 uppercase font-sans font-bold block flex items-center gap-1">
                        <Fingerprint className="w-3 h-3 text-emerald-400" />
                        Lex.uz Amaldagi Tamg‘a:
                      </span>
                      <div className="text-[11px] text-emerald-300 break-all select-all font-bold">
                        {versionComp.lexVersionStamp}
                      </div>
                      <div className="text-[10px] text-slate-400 font-sans">
                        Kuchga kirgan: <span className="text-emerald-300 font-medium">{versionComp.lexEffectiveDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-1.5 flex flex-wrap items-center justify-between gap-1 text-[10px] text-slate-400 font-mono">
                    <span>Tamg‘a Xeshi: <strong className="text-cyan-300">{versionComp.versionStampHash}</strong></span>
                    <span className={versionComp.isCurrent ? 'text-emerald-400' : 'text-rose-400'}>
                      {versionComp.isCurrent ? '✓ Lex.uz amaldagi qonun kuchi tasdiqlangan' : '⚠ Yangi tahrirga almashtirilgan'}
                    </span>
                  </div>
                </div>
              );
            })()}

            {/* Audit Metadata & Actions */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800 text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-500" />
                <span>Tekshirilgan vaqt:</span>
                <strong className="text-slate-300 font-mono">
                  {result?.lastVerifiedAt 
                    ? new Date(result.lastVerifiedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) 
                    : 'Hozir'}
                </strong>
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => performVerification(true)}
                  disabled={isLoading}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs flex items-center gap-1 transition-colors cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin text-cyan-400' : ''}`} />
                  <span>Qayta tekshirish</span>
                </button>

                <LexCanonicalLink
                  url={citation.lexUrl}
                  documentName={citation.documentName}
                  articleNumber={citation.articleNumber}
                  label="Lex.uz da ochish"
                  size="md"
                  variant="primary"
                  showCopyButton={true}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
