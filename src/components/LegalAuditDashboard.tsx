import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  RefreshCw,
  Search,
  CheckCircle2,
  XCircle,
  FileText,
  Database,
  Calendar,
  Layers,
  Clock,
  Sparkles,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Filter,
  Download,
  Activity
} from 'lucide-react';
import { runFullRepositoryLegalAudit, LegalAuditReportSummary, AuditFindingRecord } from '../services/legal/LegalAuditService';
import { legalIngestionService, SyncStatus } from '../services/legal/LegalIngestionService';
import { validateCitation } from '../services/legal/CitationValidator';
import { getBhmForDate, getMhtekmForDate, BHM_HISTORICAL_REGISTRY } from '../services/legal/MacroValuesService';
import { VerificationVerdict } from '../services/legal/types';
import { LexCanonicalLink } from './LexCanonicalLink';

export const LegalAuditDashboard: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'audit' | 'verifier' | 'ingestion' | 'macro'>('audit');
  const [auditReport, setAuditReport] = useState<LegalAuditReportSummary | null>(null);
  const [ingestionStatus, setIngestionStatus] = useState<SyncStatus | null>(null);
  const [quarantinedList, setQuarantinedList] = useState<Array<{ documentId: string; title: string; reason: string }>>([]);
  const [severityFilter, setSeverityFilter] = useState<string>('ALL');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Verifier Playground state
  const [testDocName, setTestDocName] = useState('O‘zbekiston Respublikasining Mehnat kodeksi');
  const [testArticleNumber, setTestArticleNumber] = useState('161-modda');
  const [testQuote, setTestQuote] = useState('Mehnat shartnomasi ish beruvchining tashabbusi bilan quyidagi asoslar bo‘yicha bekor qilinishi mumkin');
  const [testLexUrl, setTestLexUrl] = useState('https://lex.uz/docs/6257288');
  const [testDateContext, setTestDateContext] = useState(new Date().toISOString().slice(0, 10));
  const [testResult, setTestResult] = useState<any>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  // Macro test date
  const [macroDate, setMacroDate] = useState(new Date().toISOString().slice(0, 10));

  const loadData = () => {
    setIsLoading(true);
    try {
      const report = runFullRepositoryLegalAudit();
      const sync = legalIngestionService.getSyncStatus();
      const quars = legalIngestionService.getQuarantinedRecords();
      setAuditReport(report);
      setIngestionStatus(sync);
      setQuarantinedList(quars);
    } catch (e) {
      console.error('Audit yuklashda xatolik:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRunCustomVerification = () => {
    setIsVerifying(true);
    setTimeout(() => {
      const res = validateCitation({
        documentName: testDocName,
        articleNumber: testArticleNumber,
        quote: testQuote,
        lexUrl: testLexUrl,
        targetDateContext: testDateContext,
      });
      setTestResult(res);
      setIsVerifying(false);
    }, 150);
  };

  const currentBhm = getBhmForDate(macroDate);
  const currentMhtekm = getMhtekmForDate(macroDate);

  const filteredFindings = auditReport?.findings.filter((f) => {
    if (severityFilter !== 'ALL' && f.severity !== severityFilter) return false;
    if (searchFilter) {
      const q = searchFilter.toLowerCase();
      return (
        f.documentTitle.toLowerCase().includes(q) ||
        f.articleNumber.toLowerCase().includes(q) ||
        f.legalClaim.toLowerCase().includes(q) ||
        f.evidence.toLowerCase().includes(q) ||
        f.file.toLowerCase().includes(q)
      );
    }
    return true;
  }) || [];

  const getVerdictBadge = (verdict: VerificationVerdict) => {
    switch (verdict) {
      case 'VERIFIED_CURRENT':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
            <CheckCircle2 className="w-3 h-3" /> Amalda (Kuchda)
          </span>
        );
      case 'REPEALED':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-950 text-rose-400 border border-rose-800">
            <ShieldAlert className="w-3 h-3" /> Bekor Qilingan
          </span>
        );
      case 'VERIFIED_AMENDED':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-950 text-amber-400 border border-amber-800">
            <AlertTriangle className="w-3 h-3" /> O‘zgartirilgan
          </span>
        );
      case 'VERIFIED_HISTORICAL':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-950 text-indigo-400 border border-indigo-800">
            <Clock className="w-3 h-3" /> Tarixiy Tahrir
          </span>
        );
      case 'FUTURE_EFFECTIVE':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-950 text-blue-400 border border-blue-800">
            <Calendar className="w-3 h-3" /> Kelajakda Kuchga Kiradi
          </span>
        );
      case 'ARTICLE_NOT_FOUND':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-900 text-slate-400 border border-slate-700">
            <XCircle className="w-3 h-3" /> Modda Topilmadi
          </span>
        );
      case 'TEXT_MISMATCH':
      case 'CITATION_MISMATCH':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-950 text-amber-400 border border-amber-800">
            <AlertTriangle className="w-3 h-3" /> Matn Tafovuti
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-900 text-slate-400 border border-slate-700">
            <AlertTriangle className="w-3 h-3" /> Tasdiqlanmagan
          </span>
        );
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
        return <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">CRITICAL</span>;
      case 'HIGH':
        return <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">HIGH</span>;
      case 'MEDIUM':
        return <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">MEDIUM</span>;
      case 'INFO':
        return <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">INFO</span>;
      default:
        return <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-700 text-slate-300">LOW</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-2 sm:p-4 space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              <h1 className="text-xl font-bold text-white font-mono tracking-tight">
                LEXAI UZ — Qonunchilik Nazorati &amp; Rasmiy Baza Auditi
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              O‘zbekiston Respublikasi qonunlarining amaldagi holatini tekshirish, bekor qilingan normalarni aniqlash va fail-closed xavfsizlik filtri.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={loadData}
              disabled={isLoading}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-cyan-400' : ''}`} />
              <span>Qayta tekshirish</span>
            </button>
          </div>
        </div>

        {/* Global KPI stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3">
            <div className="text-[11px] font-medium text-slate-400">Jami tekshirilgan normalar</div>
            <div className="text-xl font-extrabold text-white mt-1 font-mono">
              {auditReport?.totalReferencesChecked || 0}
            </div>
            <div className="text-[10px] text-cyan-400 mt-0.5">100% rasmiy auditdan o‘tgan</div>
          </div>

          <div className="bg-slate-950/70 border border-emerald-900/40 rounded-xl p-3">
            <div className="text-[11px] font-medium text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Amaldagi (Kuchda)
            </div>
            <div className="text-xl font-extrabold text-emerald-300 mt-1 font-mono">
              {auditReport?.verifiedCurrentCount || 0}
            </div>
            <div className="text-[10px] text-emerald-500 mt-0.5">Yangi tahrirda tasdiqlangan</div>
          </div>

          <div className="bg-slate-950/70 border border-rose-900/40 rounded-xl p-3">
            <div className="text-[11px] font-medium text-rose-400 flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5" /> Bekor qilingan / Eski
            </div>
            <div className="text-xl font-extrabold text-rose-300 mt-1 font-mono">
              {auditReport?.repealedCount || 0}
            </div>
            <div className="text-[10px] text-rose-500 mt-0.5">Fail-closed bloklangan</div>
          </div>

          <div className="bg-slate-950/70 border border-amber-900/40 rounded-xl p-3">
            <div className="text-[11px] font-medium text-amber-400 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" /> Karantindagi hujjatlar
            </div>
            <div className="text-xl font-extrabold text-amber-300 mt-1 font-mono">
              {ingestionStatus?.quarantinedCount || 0}
            </div>
            <div className="text-[10px] text-amber-500 mt-0.5">To‘liq tekshiruvgacha izolyatsiya</div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveSubTab('audit')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
            activeSubTab === 'audit'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Kutubxona &amp; Havolalar Auditi</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-800 text-slate-300">
            {auditReport?.findings.length || 0}
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('verifier')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
            activeSubTab === 'verifier'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Jonli Norma &amp; Modda Verifikatori</span>
        </button>

        <button
          onClick={() => setActiveSubTab('ingestion')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
            activeSubTab === 'ingestion'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Sinxronizatsiya &amp; Karantin</span>
        </button>

        <button
          onClick={() => setActiveSubTab('macro')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
            activeSubTab === 'macro'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>BHM &amp; Sana Mezonlari</span>
        </button>
      </div>

      {/* SUB-TAB 1: Repository Audit Findings */}
      {activeSubTab === 'audit' && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Modda, hujjat yoki qoida nomi bo‘yicha izlash..."
                className="w-full bg-slate-950 text-slate-200 placeholder-slate-500 rounded-lg pl-9 pr-3 py-2 text-xs border border-slate-800 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto">
              <span className="text-[11px] text-slate-400 font-medium mr-1">Daraja:</span>
              {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'INFO'].map((sev) => (
                <button
                  key={sev}
                  onClick={() => setSeverityFilter(sev)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                    severityFilter === sev
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {sev}
                </button>
              ))}
            </div>
          </div>

          {/* Findings Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-md">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3">ID / Daraja</th>
                    <th className="px-4 py-3">Manba Fayl</th>
                    <th className="px-4 py-3">Hujjat &amp; Modda</th>
                    <th className="px-4 py-3">Audit Xulosasi</th>
                    <th className="px-4 py-3">Tuzatish / Ishonchli Holat</th>
                    <th className="px-4 py-3 text-right">Havola</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-sans">
                  {filteredFindings.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                        Tanlangan mezon bo‘yicha hech qanday natija topilmadi.
                      </td>
                    </tr>
                  ) : (
                    filteredFindings.map((f) => (
                      <tr key={f.findingId} className="hover:bg-slate-800/40 transition">
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="font-mono font-bold text-slate-200">{f.findingId}</div>
                          <div className="mt-1">{getSeverityBadge(f.severity)}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-slate-400 font-mono text-[11px]">
                          {f.file}
                          <div className="text-[10px] text-cyan-400">{f.testReference}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-semibold text-white">{f.documentTitle}</div>
                          <div className="text-cyan-400 font-medium">{f.articleNumber}</div>
                          {f.legalClaim && (
                            <div className="text-[11px] text-slate-400 truncate max-w-xs">{f.legalClaim}</div>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="mb-1">{getVerdictBadge(f.auditVerdict)}</div>
                          <div className="text-[11px] text-slate-400 max-w-sm leading-relaxed">{f.evidence}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-[11px] text-emerald-300 max-w-sm font-medium leading-relaxed">
                            {f.remediation}
                          </div>
                          <div className="text-[10px] text-emerald-500 mt-1">Holati: {f.resolutionStatus}</div>
                        </td>
                        <td className="px-4 py-3 text-right whitespace-nowrap">
                          <LexCanonicalLink
                            url={f.existingUrl}
                            documentName={f.documentTitle}
                            articleNumber={f.articleNumber}
                            size="sm"
                            label="Lex.uz"
                          />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: Interactive Live Citation Verifier */}
      {activeSubTab === 'verifier' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                Jonli Qonunchilik Verifikatori (Fail-Closed Sandbox)
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Istalgan hujjat, modda yoki iqtibosni kiritib, tizim qanday xulosa berishini bevosita sinab ko‘ring.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Normativ Hujjat Nomi:</label>
                <input
                  type="text"
                  value={testDocName}
                  onChange={(e) => setTestDocName(e.target.value)}
                  className="w-full bg-slate-950 text-slate-200 rounded-lg p-2.5 border border-slate-800 focus:outline-none focus:ring-1 focus:ring-cyan-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Modda Raqami:</label>
                  <input
                    type="text"
                    value={testArticleNumber}
                    onChange={(e) => setTestArticleNumber(e.target.value)}
                    className="w-full bg-slate-950 text-slate-200 rounded-lg p-2.5 border border-slate-800 focus:outline-none focus:ring-1 focus:ring-cyan-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Tahlil Sanasi (Temporal Context):</label>
                  <input
                    type="date"
                    value={testDateContext}
                    onChange={(e) => setTestDateContext(e.target.value)}
                    className="w-full bg-slate-950 text-slate-200 rounded-lg p-2.5 border border-slate-800 focus:outline-none focus:ring-1 focus:ring-cyan-500 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Rasmiy Lex.uz URL Manzili:</label>
                <input
                  type="text"
                  value={testLexUrl}
                  onChange={(e) => setTestLexUrl(e.target.value)}
                  className="w-full bg-slate-950 text-slate-200 rounded-lg p-2.5 border border-slate-800 focus:outline-none focus:ring-1 focus:ring-cyan-500 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Moddadan Keltirilgan Iqtibos (Quote Matcher):</label>
                <textarea
                  rows={3}
                  value={testQuote}
                  onChange={(e) => setTestQuote(e.target.value)}
                  className="w-full bg-slate-950 text-slate-200 rounded-lg p-2.5 border border-slate-800 focus:outline-none focus:ring-1 focus:ring-cyan-500 leading-relaxed"
                />
              </div>

              {/* Preset quick test buttons */}
              <div className="pt-2">
                <span className="text-[11px] text-slate-400 block mb-1.5 font-medium">Tezkor Sinov Holatlari:</span>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => {
                      setTestDocName('O‘zbekiston Respublikasining Mehnat kodeksi');
                      setTestArticleNumber('161-modda');
                      setTestQuote('Mehnat shartnomasi ish beruvchining tashabbusi bilan quyidagi asoslar bo‘yicha bekor qilinishi mumkin');
                      setTestLexUrl('https://lex.uz/docs/6257288');
                    }}
                    className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-emerald-400 text-[10px] font-semibold border border-slate-700"
                  >
                    1. Amaldagi MK 161 (Kuchda)
                  </button>
                  <button
                    onClick={() => {
                      setTestDocName('1995-yilgi Mehnat kodeksi');
                      setTestArticleNumber('100-modda');
                      setTestQuote('Mehnat shartnomasini ish beruvchining tashabbusi bilan bekor qilish');
                      setTestLexUrl('https://lex.uz/docs/145261');
                    }}
                    className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-rose-400 text-[10px] font-semibold border border-slate-700"
                  >
                    2. Bekor qilingan 1995-MK 100
                  </button>
                  <button
                    onClick={() => {
                      setTestDocName('O‘zbekiston Respublikasining Mehnat kodeksi');
                      setTestArticleNumber('999-modda');
                      setTestQuote('Mavjud bo‘lmagan to‘qima modda matni');
                      setTestLexUrl('https://lex.uz/docs/6257288');
                    }}
                    className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-semibold border border-slate-700"
                  >
                    3. Mavjud bo‘lmagan 999-modda
                  </button>
                  <button
                    onClick={() => {
                      setTestDocName('O‘zbekiston Respublikasining Mehnat kodeksi');
                      setTestArticleNumber('161-modda');
                      setTestQuote('Xodim hech qanday sababsiz darhol ishdan haydaladi va kompensatsiya berilmaydi');
                      setTestLexUrl('https://lex.uz/docs/6257288');
                    }}
                    className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-400 text-[10px] font-semibold border border-slate-700"
                  >
                    4. Matn tafovuti (Text Mismatch)
                  </button>
                </div>
              </div>

              <button
                onClick={handleRunCustomVerification}
                disabled={isVerifying}
                className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer mt-3"
              >
                <Activity className={`w-4 h-4 ${isVerifying ? 'animate-spin' : ''}`} />
                <span>Tekshiruvni Bajarish (Authoritative Audit)</span>
              </button>
            </div>
          </div>

          {/* Result Card */}
          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Verifikatsiya Xulosasi &amp; Dalil Yozuvi
            </h3>

            {testResult ? (
              <div className="space-y-4 text-xs font-sans">
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">Xulosa (Verdict):</span>
                    <div>{getVerdictBadge(testResult.verdict)}</div>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-900 pt-2">
                    <span className="text-slate-400 font-medium">Hujjat Kuchdaligi:</span>
                    <span className={`font-bold ${testResult.isCurrentInForce ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {testResult.isCurrentInForce ? 'HA (Kuchda)' : 'YO‘Q (Amaldagi emas)'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-900 pt-2">
                    <span className="text-slate-400 font-medium">Hujjat / Modda Aniqlanishi:</span>
                    <span className="font-semibold text-slate-300">
                      {testResult.documentResolved ? '✓ Hujjat topildi' : '✗ Hujjat topilmadi'} |{' '}
                      {testResult.articleResolved ? '✓ Modda topildi' : '✗ Modda topilmadi'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-900 pt-2">
                    <span className="text-slate-400 font-medium">Amal Qilish Davri:</span>
                    <span className="font-mono text-slate-300">
                      {testResult.effectiveFrom || 'Noma‘lum'} — {testResult.effectiveUntil || 'Hozirgacha'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-900 pt-2">
                    <span className="text-slate-400 font-medium">Checksum (MD5/SHA256):</span>
                    <span className="font-mono text-[10px] text-cyan-400">
                      {testResult.sourceChecksum || 'N/A'}
                    </span>
                  </div>
                </div>

                {/* Evidence Summary */}
                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2">
                  <span className="text-slate-400 font-semibold block">Rasmiy Dalil Asosi:</span>
                  <p className="text-slate-200 leading-relaxed font-sans">{testResult.evidenceSummary}</p>
                </div>

                {/* Discrepancies */}
                {testResult.discrepancies && testResult.discrepancies.length > 0 && (
                  <div className="bg-rose-950/30 border border-rose-900/60 rounded-xl p-4 space-y-1.5">
                    <span className="text-rose-400 font-semibold block flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" /> Tafovutlar va Qoidabuzarliklar:
                    </span>
                    <ul className="list-disc list-inside space-y-1 text-rose-300">
                      {testResult.discrepancies.map((d: string, i: number) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-8 text-center text-slate-500">
                Tekshirish uchun chap paneldagi ma‘lumotlarni kiritib, «Tekshiruvni Bajarish» tugmasini bosing yoki tezkor sinov holatlaridan birini tanlang.
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: Source Ingestion & Quarantine Status */}
      {activeSubTab === 'ingestion' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
              <Database className="w-4 h-4 text-cyan-400" />
              Rasmiy Qonunchilik Bazasini Qabul Qilish (Ingestion) Holati
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Lex.uz rasmiy qonunlar bazasidan qabul qilingan kodekslar, ularning yaxlitligi, kuchga kirish sanalari va karantin jurnali.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400">Ro‘yxatdagi rasmiy hujjatlar</div>
                <div className="text-2xl font-bold text-white mt-1 font-mono">
                  {(ingestionStatus?.activeDocumentsCount || 0) + (ingestionStatus?.quarantinedCount || 0)}
                </div>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-emerald-900/40">
                <div className="text-xs text-emerald-400">Kuchdagi rasmiy hujjatlar</div>
                <div className="text-2xl font-bold text-emerald-300 mt-1 font-mono">
                  {ingestionStatus?.activeDocumentsCount || 0}
                </div>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-amber-900/40">
                <div className="text-xs text-amber-400">Karantinga olingan (Quarantined)</div>
                <div className="text-2xl font-bold text-amber-300 mt-1 font-mono">
                  {ingestionStatus?.quarantinedCount || 0}
                </div>
              </div>
            </div>

            {/* Quarantined Records Table */}
            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                Karantin Jurnali (Fail-Closed Himoya Qatlami):
              </h4>
              <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900 border-b border-slate-800 text-[11px] font-semibold text-slate-400">
                    <tr>
                      <th className="px-4 py-2.5">Hujjat ID</th>
                      <th className="px-4 py-2.5">Nomi</th>
                      <th className="px-4 py-2.5">Karantin Sababi</th>
                      <th className="px-4 py-2.5">Vaqt</th>
                      <th className="px-4 py-2.5">Holati</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-sans">
                    {quarantinedList.length > 0 ? (
                      quarantinedList.map((q) => (
                        <tr key={q.documentId} className="hover:bg-slate-900/40">
                          <td className="px-4 py-3 font-mono font-bold text-slate-200">{q.documentId}</td>
                          <td className="px-4 py-3 font-medium text-white">{q.title}</td>
                          <td className="px-4 py-3 text-rose-400 font-medium">{q.reason}</td>
                          <td className="px-4 py-3 text-slate-400 font-mono text-[11px]">{new Date().toISOString().slice(0, 10)}</td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                              QUARANTINED
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-4 py-6 text-center text-slate-500">
                          Karantindagi hujjatlar mavjud emas. Barcha qabul qilingan qonunlar tekshiruvdan o‘tgan.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: Macro Economic & Legal Indicators */}
      {activeSubTab === 'macro' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  Bazaviy Hisoblash Miqdori (BHM) &amp; Qonuniy Limitlar Tarixi
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Har bir iqtisodiy va yuridik hisob-kitob voqea sodir bo‘lgan sanadagi amaldagi rasmiy BHM va qonuniy mezonlarga bog‘liq.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-medium">Sana tanlash:</span>
                <input
                  type="date"
                  value={macroDate}
                  onChange={(e) => setMacroDate(e.target.value)}
                  className="bg-slate-950 text-slate-200 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs font-mono"
                />
              </div>
            </div>

            {/* Current Selected Date KPI */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400">Tanlangan sanada BHM</div>
                <div className="text-xl font-bold text-cyan-400 mt-1 font-mono">
                  {currentBhm.value.toLocaleString()} so‘m
                </div>
                <div className="text-[11px] text-slate-400 mt-1">{currentBhm.legalBasis}</div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400">Mehnatga Haq To‘lashning Eng Kam Miqdori</div>
                <div className="text-xl font-bold text-indigo-400 mt-1 font-mono">
                  {currentMhtekm.value.toLocaleString()} so‘m
                </div>
                <div className="text-[11px] text-slate-400 mt-1">{currentMhtekm.legalBasis}</div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400">Majburiy Qonuniy Cheklovlar</div>
                <div className="text-sm font-semibold text-amber-300 mt-1">
                  Peniya limiti: max 50% (FK 326)
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Aliment minimum: 26.5% MHTEKM floor (Oila kodeksi 99)
                </div>
              </div>
            </div>

            {/* Historical Table */}
            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                O‘zbekiston Respublikasi BHM Rasmiy Xronologiyasi:
              </h4>
              <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900 border-b border-slate-800 text-[11px] font-semibold text-slate-400">
                    <tr>
                      <th className="px-4 py-2.5">Davr (Amal qilish oralig‘i)</th>
                      <th className="px-4 py-2.5">BHM Miqdori</th>
                      <th className="px-4 py-2.5">Huquqiy Asos (Farmon / Qonun)</th>
                      <th className="px-4 py-2.5 text-right">Rasmiy Havola</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-sans">
                    {BHM_HISTORICAL_REGISTRY.map((rec, i) => (
                      <tr key={i} className="hover:bg-slate-900/40">
                        <td className="px-4 py-3 font-mono font-medium text-slate-200">
                          {rec.effectiveFrom} — {rec.effectiveUntil.startsWith('2099') ? 'Hozirgacha' : rec.effectiveUntil}
                        </td>
                        <td className="px-4 py-3 font-bold text-cyan-300 font-mono">
                          {rec.value.toLocaleString()} so‘m
                        </td>
                        <td className="px-4 py-3 text-slate-300">{rec.legalBasis}</td>
                        <td className="px-4 py-3 text-right">
                          <LexCanonicalLink
                            url={rec.sourceUrl}
                            label="Lex.uz"
                            size="sm"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
