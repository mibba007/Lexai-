import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Scale, 
  FileText, 
  UploadCloud, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  HelpCircle, 
  ArrowRight, 
  Sparkles, 
  Copy, 
  Download, 
  RotateCcw, 
  BookOpen, 
  Building2, 
  TrendingUp, 
  TrendingDown, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  FileCheck,
  Zap,
  Briefcase
} from 'lucide-react';
import { DisputeAuditResult, DisputePartyRole } from '../types';
import { DISPUTE_PRESET_CASES, DisputePresetCase } from '../data/disputePresets';
import { synthesizeClientDisputeAudit } from '../utils/offlineLegalEngine';

interface DisputeIntelligenceProps {
  onNavigateToDocumentGenerator?: (docType?: string) => void;
}

export const DisputeIntelligence: React.FC<DisputeIntelligenceProps> = ({
  onNavigateToDocumentGenerator,
}) => {
  const [partyRole, setPartyRole] = useState<DisputePartyRole>('defendant');
  const [clientCompanyName, setClientCompanyName] = useState('«GRAND AGRO TECH» MChJ');
  const [opponentName, setOpponentName] = useState('«ASIA LOGISTICS PLUS» MChJ');
  const [disputeCategory, setDisputeCategory] = useState('court_economic');
  const [disputeText, setDisputeText] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ name: string; size: string; type: string }>>([]);
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState<DisputeAuditResult | null>(null);
  const [activePresetId, setActivePresetId] = useState<string | null>(null);
  const [copiedDoc, setCopiedDoc] = useState(false);
  const [auditTab, setAuditTab] = useState<'grounds' | 'procedural' | 'qa' | 'strategy' | 'document'>('grounds');
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<string, string>>({});
  const [expandedGroundId, setExpandedGroundId] = useState<string | null>(null);

  // Load preset case
  const handleSelectPreset = (preset: DisputePresetCase) => {
    setActivePresetId(preset.id);
    setPartyRole(preset.partyRole);
    setClientCompanyName(preset.clientCompanyName);
    setOpponentName(preset.opponentName);
    setDisputeText(preset.rawText);
    setUploadedFiles(
      preset.uploadedDocumentsSummary.map((docName) => ({
        name: docName,
        size: '1.2 MB',
        type: 'application/pdf',
      }))
    );
    setAuditResult(preset.result);
    setAuditTab('grounds');
    
    // Initialize default answered questions
    const initialAnswers: Record<string, string> = {};
    preset.result.interactiveQuestions?.forEach((q) => {
      if (q.userAnswer) initialAnswers[q.id] = q.userAnswer;
    });
    setAnsweredQuestions(initialAnswers);
  };

  // Mock upload file
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map((f) => ({
        name: f.name,
        size: `${(f.size / (1024 * 1024)).toFixed(2)} MB`,
        type: f.type || 'Hujjat',
      }));
      setUploadedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Run AI Audit
  const handleRunDisputeAudit = async () => {
    if (!disputeText.trim() && uploadedFiles.length === 0) return;

    setIsAuditing(true);
    try {
      const response = await fetch('/api/gemini/dispute-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          disputeText,
          documentsSummary: uploadedFiles.map((f) => f.name),
          partyRole,
          clientCompanyName: clientCompanyName || 'Bizning tashkilot',
          opponentName: opponentName || 'Qarshi taraf',
          disputeCategory,
          answeredQuestions: Object.entries(answeredQuestions).map(([qId, ans]) => ({
            id: qId,
            question: qId,
            userAnswer: ans,
          })),
        }),
      });

      if (!response.ok) throw new Error('Audit amalga oshirilmadi');
      const data: DisputeAuditResult = await response.json();
      setAuditResult(data);
      setAuditTab('grounds');
    } catch (err: any) {
      console.warn('Nizo auditi tarmog‘i holati:', err?.message || err);
      const fallbackData = synthesizeClientDisputeAudit(disputeText, clientCompanyName, opponentName);
      setAuditResult(fallbackData);
      setAuditTab('grounds');
    } finally {
      setIsAuditing(false);
    }
  };

  // Update question answer & dynamically recalculate
  const handleAnswerQuestion = (qId: string, answer: string) => {
    const updated = { ...answeredQuestions, [qId]: answer };
    setAnsweredQuestions(updated);
    
    // Dynamically adjust probabilities slightly based on positive evidence
    if (auditResult) {
      let boost = 0;
      if (answer.toLowerCase().includes('ha') || answer.toLowerCase().includes('tasdiqlangan') || answer.toLowerCase().includes('bor')) {
        boost = 4;
      } else if (answer.toLowerCase().includes('yo‘q') || answer.toLowerCase().includes('rad')) {
        boost = -3;
      }
      const newWin = Math.min(96, Math.max(30, auditResult.overallWinProbability + boost));
      setAuditResult({
        ...auditResult,
        overallWinProbability: newWin,
        riskProbability: 100 - newWin,
      });
    }
  };

  const handleCopyDocument = () => {
    if (auditResult?.generatedCounterDocument?.content) {
      navigator.clipboard.writeText(auditResult.generatedCounterDocument.content);
      setCopiedDoc(true);
      setTimeout(() => setCopiedDoc(false), 2000);
    }
  };

  const handleDownloadDocument = () => {
    if (!auditResult?.generatedCounterDocument?.content) return;
    const blob = new Blob([auditResult.generatedCounterDocument.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${auditResult.generatedCounterDocument.title.replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto p-3 sm:p-5 space-y-6 animate-in fade-in duration-300">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 border border-indigo-500/40 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-400/30 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" />
                Yuridik Shaxslar uchun
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                Lex.uz Qonuniylik Auditi
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-400/30 flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5" />
                Sud Ehtimoli & Strategiya
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Nizo, Da‘vo va Shikoyatlar Chuqur Yuridik Ekspertizasi
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Tashkilotingizga nisbatan kelib tushgan ariza, shikoyat, sud da‘volari va shartnoma nizolarini to‘liq elektron o‘rganing. 
              Asossiz bandlarni aniqlang, protsessual xatolarni fosh qiling, sudda yutish ehtimolini hisoblang hamda 
              tayyor <strong className="text-cyan-300">E‘tiroznoma (Otziv)</strong> loyihasini oling.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start lg:self-center">
            <button
              onClick={() => {
                setAuditResult(null);
                setDisputeText('');
                setUploadedFiles([]);
                setActivePresetId(null);
              }}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-2 border border-slate-700 transition"
              title="Yangi nizo auditini boshlash"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Yangi Tahlil</span>
            </button>
          </div>
        </div>
      </div>

      {/* Preset Fast Selection Tabs */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            Amaliyotdagi Real Sud va Nizo Keyslari (1-bosishda tekshirish):
          </label>
          <span className="text-[11px] text-slate-500 hidden sm:inline">
            O‘zbekiston sud amaliyotidan olingan namunalar
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {DISPUTE_PRESET_CASES.map((preset) => {
            const isSelected = activePresetId === preset.id;
            return (
              <button
                key={preset.id}
                id={`preset-btn-${preset.id}`}
                onClick={() => handleSelectPreset(preset)}
                className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-slate-800/95 border-cyan-500 shadow-md shadow-cyan-950/40 ring-1 ring-cyan-500'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-cyan-300 border border-slate-700">
                      {preset.categoryLabel}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        preset.partyRole === 'defendant'
                          ? 'bg-purple-950 text-purple-300 border border-purple-800'
                          : 'bg-blue-950 text-blue-300 border border-blue-800'
                      }`}
                    >
                      {preset.partyRole === 'defendant' ? '🛡️ Biz: Javobgar' : '⚔️ Biz: Da‘vogar'}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white line-clamp-2">{preset.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{preset.summaryProblem}</p>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-800/60">
                  <span>Da‘vo: <strong className="text-amber-400">{preset.claimAmount}</strong></span>
                  <span className="text-emerald-400 font-bold flex items-center gap-0.5">
                    {preset.result.overallWinProbability}% Yutish
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Form & Upload Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Column: Case Parameters & Document Text Input (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4 shadow-lg">
            
            <h3 className="text-sm font-bold text-white flex items-center gap-2 pb-2 border-b border-slate-800">
              <Briefcase className="w-4 h-4 text-cyan-400" />
              <span>1. Ishdagi Tomon va Ishtirokchi Maqomi</span>
            </h3>

            {/* Role Selection Buttons */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Tashkilotingiz ushbu nizoda qaysi tomonda?
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPartyRole('defendant')}
                  className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition cursor-pointer ${
                    partyRole === 'defendant'
                      ? 'bg-purple-950/80 border-purple-500 text-purple-200 shadow-md shadow-purple-950/40 ring-1 ring-purple-500'
                      : 'bg-slate-800/60 border-slate-700/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <ShieldAlert className="w-5 h-5 text-purple-400" />
                  <span>🛡️ Biz JAVOBGARMIZ</span>
                  <span className="text-[10px] font-normal text-purple-300/80 text-center">
                    Bizga da‘vo/shikoyat qilingan
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setPartyRole('plaintiff')}
                  className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition cursor-pointer ${
                    partyRole === 'plaintiff'
                      ? 'bg-cyan-950/80 border-cyan-500 text-cyan-200 shadow-md shadow-cyan-950/40 ring-1 ring-cyan-500'
                      : 'bg-slate-800/60 border-slate-700/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <Scale className="w-5 h-5 text-cyan-400" />
                  <span>⚔️ Biz DA‘VOGARMIZ</span>
                  <span className="text-[10px] font-normal text-cyan-300/80 text-center">
                    Biz da‘vo/shikoyat qo‘zg‘aymiz
                  </span>
                </button>
              </div>
            </div>

            {/* Company & Opponent Names */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-medium text-slate-400 block mb-1">
                  Bizning korxona nomi:
                </label>
                <input
                  type="text"
                  value={clientCompanyName}
                  onChange={(e) => setClientCompanyName(e.target.value)}
                  placeholder="Masalan: «GRAND AGRO TECH» MChJ"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="text-[11px] font-medium text-slate-400 block mb-1">
                  Qarshi taraf / Organ:
                </label>
                <input
                  type="text"
                  value={opponentName}
                  onChange={(e) => setOpponentName(e.target.value)}
                  placeholder="Masalan: «ASIA LOGISTICS» MChJ"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {/* Dispute Category */}
            <div>
              <label className="text-[11px] font-medium text-slate-400 block mb-1">
                Nizo va Sud sohasi:
              </label>
              <select
                value={disputeCategory}
                onChange={(e) => setDisputeCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 cursor-pointer"
              >
                <option value="court_economic">Iqtisodiy sud nizosi (Xo‘jalik shartnomasi, to‘lov, penya)</option>
                <option value="tax_admin">Soliq va Ma‘muriy nizo (DSB, Bojxona, Monopoliyaga qarshi)</option>
                <option value="court_civil">Fuqarolik sudi (Qarz, mulkiy zarar, shartnoma buzilishi)</option>
                <option value="defamation">Ishchanlik obro‘si va tuhmat (FK 100-modda, OAV va blogerlar)</option>
                <option value="construction">Qurilish va Pudrat nizolari (Forma-2/3, kechikish, sifat)</option>
                <option value="labor_corporate">Mehnat va Korporativ nizolar (Ta‘sischilar, rahbar javobgarligi)</option>
              </select>
            </div>

            {/* Document Text Input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300">
                  2. Da‘vo arizasi / Shikoyat / Nizo holatlari matni:
                </label>
                <span className="text-[10px] text-slate-500">
                  {disputeText.length} belgi
                </span>
              </div>
              <textarea
                value={disputeText}
                onChange={(e) => setDisputeText(e.target.value)}
                placeholder="Kelib tushgan da‘vo arizasi, talabnoma (pretenziya) yoki shikoyat matnini bu yerga nusxalab qo‘ying yoki o‘z so‘zingiz bilan holatni bayon eting..."
                rows={8}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500 font-mono leading-relaxed resize-none"
              />
            </div>

            {/* File Upload Zone */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>3. Hujjatlar va Dalillarni Elektron Yuklash (PDF, DOCX, Rasm):</span>
                <span className="text-[10px] text-cyan-400 font-normal">{uploadedFiles.length} ta fayl</span>
              </label>

              <div className="border-2 border-dashed border-slate-800 hover:border-cyan-500/60 rounded-xl p-4 text-center bg-slate-950/60 transition group cursor-pointer relative">
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <UploadCloud className="w-7 h-7 text-slate-500 group-hover:text-cyan-400 mx-auto mb-1 transition-colors" />
                <p className="text-xs font-medium text-slate-300">
                  Fayllarni bu yerga tashlang yoki <span className="text-cyan-400 underline">tanlang</span>
                </p>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  Shartnomalar, E-fakturalar, bank to‘lovlari, dalolatnomalar, da‘vo arizasi nusxalari
                </p>
              </div>

              {/* Uploaded files list */}
              {uploadedFiles.length > 0 && (
                <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                  {uploadedFiles.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800 text-xs"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <FileCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        <span className="text-slate-300 font-medium truncate">{file.name}</span>
                        <span className="text-[10px] text-slate-500 flex-shrink-0">({file.size})</span>
                      </div>
                      <button
                        onClick={() => handleRemoveFile(idx)}
                        className="text-slate-500 hover:text-rose-400 p-0.5"
                        title="O‘chirish"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Run Audit Button */}
            <button
              id="run-dispute-audit-btn"
              onClick={handleRunDisputeAudit}
              disabled={isAuditing || (!disputeText.trim() && uploadedFiles.length === 0)}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-black text-sm shadow-lg shadow-cyan-950/40 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2 cursor-pointer"
            >
              {isAuditing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Lex.uz va Sud Amaliyoti Bo‘yicha Ekspertiza Qilinmoqda...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-cyan-200 animate-pulse" />
                  <span>Ishni To‘liq O‘rganish & Sud Istiqbolini Aniqlash</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Deep Results & Intelligence Dashboard (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {!auditResult ? (
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 text-center space-y-4 flex flex-col items-center justify-center min-h-[500px]">
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Scale className="w-8 h-8" />
              </div>
              <div className="max-w-md space-y-1.5">
                <h3 className="text-base font-bold text-white">
                  Ish bo‘yicha to‘liq ekspertiza natijalari shu yerda ko‘rinadi
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Chapdagi maydonga kelib tushgan ariza/da‘vo matnini kiriting yoki yuqoridagi amaliy keyslardan birini tanlang.
                  Tizim barcha vajlarni qatorma-qator tekshirib, sudda yutish foizini hisoblaydi va tayyor qarshi hujjat tuzib beradi.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-left w-full max-w-lg pt-4 border-t border-slate-800">
                <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800 text-xs">
                  <span className="text-cyan-400 font-bold block">1. Qonuniylik</span>
                  <span className="text-[11px] text-slate-400">Asossiz talablar</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800 text-xs">
                  <span className="text-purple-400 font-bold block">2. Protsessual</span>
                  <span className="text-[11px] text-slate-400">Muddat & vakolat</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800 text-xs">
                  <span className="text-emerald-400 font-bold block">3. Yutish Foizi</span>
                  <span className="text-[11px] text-slate-400">Ehtimollik tahlili</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800 text-xs">
                  <span className="text-amber-400 font-bold block">4. E‘tiroznoma</span>
                  <span className="text-[11px] text-slate-400">Tayyor Otziv loyihasi</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in">
              
              {/* Top Win Rate & Risk Matrix Gauge */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] font-bold">
                        {auditResult.disputeType}
                      </span>
                      <span className="text-xs text-slate-400">
                        {auditResult.partyRole === 'defendant' ? 'Himoya strategiyasi' : 'Da‘vo strategiyasi'}
                      </span>
                    </div>
                    <h2 className="text-base font-bold text-white mt-1">
                      {auditResult.caseTitle}
                    </h2>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Win Probability Score */}
                    <div className="text-right">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        Sudda Yutish Ehtimoli
                      </span>
                      <div className="text-2xl font-black text-emerald-400 flex items-center justify-end gap-1">
                        <TrendingUp className="w-5 h-5 text-emerald-400" />
                        <span>{auditResult.overallWinProbability}%</span>
                      </div>
                    </div>

                    {/* Risk Rate */}
                    <div className="text-right pl-3 border-l border-slate-800">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        Risk Ehtimoli
                      </span>
                      <div className="text-2xl font-black text-rose-400 flex items-center justify-end gap-1">
                        <TrendingDown className="w-5 h-5 text-rose-400" />
                        <span>{auditResult.riskProbability}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Visual Progress Bar */}
                <div className="space-y-1.5">
                  <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden flex border border-slate-800">
                    <div
                      style={{ width: `${auditResult.overallWinProbability}%` }}
                      className="bg-gradient-to-r from-emerald-600 to-teal-400 h-full transition-all duration-500"
                    ></div>
                    <div
                      style={{ width: `${auditResult.riskProbability}%` }}
                      className="bg-gradient-to-r from-rose-500 to-red-600 h-full transition-all duration-500"
                    ></div>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span className="text-emerald-400 font-semibold">
                      ✓ Yutish ehtimoli: {auditResult.overallWinProbability}%
                    </span>
                    <span className="text-rose-400 font-semibold">
                      ✕ Xatar / Qarshi vajlar: {auditResult.riskProbability}%
                    </span>
                  </div>
                </div>

                {/* Probability Rationale */}
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  <strong className="text-cyan-300 block mb-1">Ehtimollik asosnomasi:</strong>
                  {auditResult.probabilityRationale}
                </div>

                {/* Confidence Disclaimer */}
                <div className="flex items-start gap-2 text-[11px] text-amber-300/80 bg-amber-950/30 border border-amber-500/20 p-2.5 rounded-xl">
                  <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>{auditResult.confidenceDisclaimer}</span>
                </div>
              </div>

              {/* Navigation Tabs for Audit Sub-sections */}
              <div className="flex flex-wrap gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl">
                <button
                  id="tab-grounds-btn"
                  onClick={() => setAuditTab('grounds')}
                  className={`flex-1 min-w-[120px] py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                    auditTab === 'grounds'
                      ? 'bg-cyan-600 text-white shadow'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>Da‘vo Bandlari ({auditResult.claimGrounds?.length || 0})</span>
                </button>

                <button
                  id="tab-procedural-btn"
                  onClick={() => setAuditTab('procedural')}
                  className={`flex-1 min-w-[120px] py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                    auditTab === 'procedural'
                      ? 'bg-cyan-600 text-white shadow'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Protsessual Xatolar ({auditResult.proceduralDefects?.length || 0})</span>
                </button>

                <button
                  id="tab-qa-btn"
                  onClick={() => setAuditTab('qa')}
                  className={`flex-1 min-w-[120px] py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                    auditTab === 'qa'
                      ? 'bg-cyan-600 text-white shadow'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Aniqlashtiruvchi Savollar</span>
                </button>

                <button
                  id="tab-strategy-btn"
                  onClick={() => setAuditTab('strategy')}
                  className={`flex-1 min-w-[120px] py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                    auditTab === 'strategy'
                      ? 'bg-cyan-600 text-white shadow'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Harakatlar Rejasi</span>
                </button>

                <button
                  id="tab-document-btn"
                  onClick={() => setAuditTab('document')}
                  className={`flex-1 min-w-[120px] py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                    auditTab === 'document'
                      ? 'bg-indigo-600 text-white shadow'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Tayyor Otziv / Hujjat</span>
                </button>
              </div>

              {/* Tab 1: Claim Grounds Evaluation */}
              {auditTab === 'grounds' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                    <span>Qarshi tomon ilgari surgan talab va vajlarning qonuniylik auditi:</span>
                    <span>{auditResult.claimGrounds.length} ta band</span>
                  </div>

                  {auditResult.claimGrounds.map((ground) => {
                    const isExpanded = expandedGroundId === ground.id || !expandedGroundId;
                    return (
                      <div
                        key={ground.id}
                        className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 transition hover:border-slate-700"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-start gap-2.5">
                            {ground.status === 'UNGROUNDED_OR_ILLEGAL' ? (
                              <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                            ) : ground.status === 'PARTIALLY_GROUNDED' || ground.status === 'PROCEDURAL_VIOLATION' ? (
                              <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                            ) : (
                              <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                            )}
                            <div>
                              <h4 className="text-xs sm:text-sm font-bold text-white">
                                {ground.claimPoint}
                              </h4>
                              {ground.opponentLegalBasis && (
                                <p className="text-[11px] text-slate-400 mt-0.5">
                                  Qarshi taraf keltirgan asos: <span className="font-mono text-slate-300">{ground.opponentLegalBasis}</span>
                                </p>
                              )}
                            </div>
                          </div>

                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${
                              ground.status === 'UNGROUNDED_OR_ILLEGAL'
                                ? 'bg-rose-950 text-rose-300 border border-rose-800'
                                : ground.status === 'PARTIALLY_GROUNDED'
                                ? 'bg-amber-950 text-amber-300 border border-amber-800'
                                : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            }`}
                          >
                            {ground.statusLabel}
                          </span>
                        </div>

                        {/* Analysis & Lex.uz basis */}
                        <div className="p-3 rounded-xl bg-slate-950 border border-slate-850 text-xs text-slate-300 space-y-2">
                          <div>
                            <strong className="text-cyan-300 block mb-0.5">AI Yuridik Ekspert Xulosasi:</strong>
                            <p className="leading-relaxed">{ground.analysis}</p>
                          </div>

                          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80 text-[11px]">
                            <div className="flex items-center gap-1.5 text-slate-400">
                              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                              <span>Qonuniy asos:</span>
                              <strong className="text-cyan-300">{ground.lexArticle}</strong>
                            </div>
                            {ground.lexUrl && (
                              <a
                                href={ground.lexUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-medium hover:underline"
                              >
                                <span>Lex.uz da ko‘rish</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Counter Argument for Court */}
                        <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/30 text-xs text-indigo-200">
                          <strong className="text-indigo-300 block mb-0.5">
                            🛡️ Sudda Rad Etish Uchun Tayyor Qarshi Vaj (Counter-Argument):
                          </strong>
                          <p className="leading-relaxed">{ground.counterArgument}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Tab 2: Procedural Violations */}
              {auditTab === 'procedural' && (
                <div className="space-y-3">
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                      <span>Aniqlangan Protsessual Xatolar va Qoidabuzarliklar</span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      Ushbu protsessual kamchiliklar sudda da‘vo arizasini ko‘rmasdan qoldirish, qaytarish yoki rad etish uchun asos bo‘ladi:
                    </p>

                    <div className="space-y-2.5 pt-1">
                      {auditResult.proceduralDefects.map((defect, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="font-bold text-amber-300 flex items-center gap-1.5">
                              <span>⚠️ {defect.title}</span>
                            </h4>
                            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                              {defect.lawArticle}
                            </span>
                          </div>
                          <p className="text-slate-300 leading-relaxed">{defect.description}</p>
                          <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-[11px] font-medium flex items-center gap-1.5">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                            <span><strong>Amaliy ustunligimiz:</strong> {defect.practicalAdvantage}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Strengths & Weaknesses Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
                      <h4 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle className="w-4 h-4" />
                        <span>Bizning Kuchli Tomonlarimiz:</span>
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {auditResult.strongPoints.map((sp, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-emerald-400 font-bold">•</span>
                            <span>{sp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
                      <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4" />
                        <span>Ehtiyot Bo‘lish Kerak Bo‘lgan Nuqtalar:</span>
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {auditResult.vulnerabilities.map((v, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-amber-400 font-bold">•</span>
                            <span>{v}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Interactive Clarification Q&A */}
              {auditTab === 'qa' && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-cyan-400" />
                      <h3 className="text-sm font-bold text-white">
                        Ishni 100% Aniqlashtiruvchi Qo‘shimcha Savollar
                      </h3>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Ushbu savollarga javob belgilashingiz bilan sudda yutish foizi va himoya strategiyasi real vaqtda yangilanadi:
                    </p>
                  </div>

                  <div className="space-y-3">
                    {auditResult.interactiveQuestions.map((q) => {
                      const selectedAns = answeredQuestions[q.id] || q.userAnswer || '';
                      return (
                        <div
                          key={q.id}
                          className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5 text-xs"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className="font-bold text-slate-200 leading-snug">
                              ❓ {q.question}
                            </p>
                            <span
                              className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                                q.importance === 'CRITICAL'
                                  ? 'bg-rose-950 text-rose-300 border border-rose-800'
                                  : 'bg-amber-950 text-amber-300 border border-amber-800'
                              }`}
                            >
                              {q.importance}
                            </span>
                          </div>

                          <p className="text-[11px] text-slate-400">
                            <span className="text-cyan-400 font-medium">Ta‘siri:</span> {q.impactExplanation}
                          </p>

                          {/* Options */}
                          {q.options && q.options.length > 0 ? (
                            <div className="flex flex-wrap gap-2 pt-1">
                              {q.options.map((opt, i) => {
                                const isChosen = selectedAns === opt;
                                return (
                                  <button
                                    key={i}
                                    onClick={() => handleAnswerQuestion(q.id, opt)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                                      isChosen
                                        ? 'bg-cyan-600 text-white border-cyan-500 shadow'
                                        : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
                                    }`}
                                  >
                                    {opt}
                                  </button>
                                );
                              })}
                            </div>
                          ) : (
                            <input
                              type="text"
                              value={selectedAns}
                              onChange={(e) => handleAnswerQuestion(q.id, e.target.value)}
                              placeholder="Javobingizni yozing..."
                              className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Tab 4: Strategic Action Playbook */}
              {auditTab === 'strategy' && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span>Bosqichma-bosqich Amaliy Harakatlar Rejasi (Action Playbook)</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Sudda yutib chiqish yoki huquqlaringizni 100% himoya qilish uchun quyidagi qadamlarni qat‘iy bajaring:
                    </p>
                  </div>

                  <div className="space-y-3">
                    {auditResult.actionPlaybook.map((step) => (
                      <div
                        key={step.stepNumber}
                        className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs relative pl-12"
                      >
                        <div className="absolute left-3 top-4 w-6 h-6 rounded-full bg-cyan-600 text-white font-black flex items-center justify-center text-xs">
                          {step.stepNumber}
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="font-bold text-white text-xs sm:text-sm">
                            {step.title}
                          </h4>
                          {step.deadline && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700">
                              Muddat: {step.deadline}
                            </span>
                          )}
                        </div>
                        <p className="text-slate-300 leading-relaxed">{step.action}</p>
                        {step.documentsNeeded && step.documentsNeeded.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px]">
                            <span className="text-slate-500 font-medium">Kerakli hujjatlar:</span>
                            {step.documentsNeeded.map((doc, dIdx) => (
                              <span
                                key={dIdx}
                                className="px-2 py-0.5 rounded bg-slate-900 text-cyan-300 border border-slate-800 font-mono text-[10px]"
                              >
                                {doc}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 5: Generated Counter-Document / Otziv */}
              {auditTab === 'document' && auditResult.generatedCounterDocument && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
                        Tayyor Sud Hujjati Loyihasi
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-white">
                        {auditResult.generatedCounterDocument.title}
                      </h3>
                      <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                        Asos: {auditResult.generatedCounterDocument.lexBasis}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleCopyDocument}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>{copiedDoc ? 'Nusxa olindi!' : 'Nusxalash'}</span>
                      </button>
                      <button
                        onClick={handleDownloadDocument}
                        className="px-3.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold flex items-center gap-1.5 shadow transition cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Yuklab olish</span>
                      </button>
                    </div>
                  </div>

                  {/* Document Content View */}
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 sm:p-6 max-h-[480px] overflow-y-auto font-serif text-slate-200 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap selection:bg-cyan-900 selection:text-white">
                    {auditResult.generatedCounterDocument.content}
                  </div>

                  {/* CTA to customize in DocumentGenerator */}
                  {onNavigateToDocumentGenerator && (
                    <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-xs text-indigo-200">
                        <Sparkles className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                        <span>Ushbu hujjatni rasmiy rekvizitlar va A4 formatda to‘liq tahrirlash</span>
                      </div>
                      <button
                        onClick={() => onNavigateToDocumentGenerator('E‘tiroznoma (Otziv)')}
                        className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 transition whitespace-nowrap cursor-pointer shadow"
                      >
                        <span>Hujjatlar Generatorida Ochish</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              )}

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
