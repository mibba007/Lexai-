/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * O‘zbekiston Respublikasi qonunchiligi (Lex.uz) bo‘yicha shartnomalar
 * va huquqiy hujjatlarning avtomatik auditi, xatarlar tahlili va
 * xavfsiz tahrirlarga almashtirish moduli.
 */

import React, { useState, useRef, useEffect } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  FileText, 
  Upload, 
  Sparkles, 
  CheckCircle, 
  Copy, 
  Check, 
  ExternalLink, 
  ArrowRight,
  RefreshCw,
  Sliders,
  AlertCircle,
  Wand2,
  FileCheck,
  Download,
  FileType,
  Printer,
  Scale,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Play
} from 'lucide-react';
import { ContractAnalysisResult, ContractClauseIssue } from '../types';
import { exportToWordDocx, printDocument } from '../utils/documentExporter';
import { synthesizeClientContractAudit } from '../utils/offlineLegalEngine';

const SAMPLE_CONTRACTS = [
  {
    title: 'Mehnat shartnomasi (Noqonuniy bandlar bilan)',
    type: 'Mehnat shartnomasi',
    text: `MEHNAT SHARTNOMASI № 42
Toshkent shahri                                  2026-yil 15-yanvar

«Alpha Tech» MChJ nomidan direktor Karimov A. va fuqaro Olimov B. quyidagilar haqida kelishdilar:

1. Xodim dasturchi lavozimiga 6 (olti) oylik sinov muddati bilan ishga qabul qilinadi.
2. Ish vaqti haftasiga 6 kun, kuniga 10 soat (jami haftasiga 60 soat) etib belgilanadi.
3. Xodim ish vaqtida telefondan foydalansa yoki ishga 15 daqiqa kechiksa, oylik maoshidan 50% miqdorida jarima ushlab qolinadi.
4. Xodim ishdan o‘z xohishi bilan bo‘shash haqida 3 oy oldin yozma ogohlantirishi shart, aks holda oxirgi oylik maoshi to‘lab berilmaydi.
5. Mehnat ta‘tili yiliga 10 kalendar kunni tashkil etadi va kompensatsiya to‘lanmaydi.`,
  },
  {
    title: 'Turar joy ijarasi shartnomasi (Xatarli bandlar bilan)',
    type: 'Ijara shartnomasi',
    text: `XONADON IJARASI SHARTNOMASI
Toshkent shahri                                  2026-yil 1-fevral

Ijaraga beruvchi: Rahimov Sh.
Ijarachi: Abdullayev N.

1. Ijaraga beruvchi 2 xonali kvartirani 1 yil muddatga ijaraga beradi.
2. Oylik ijara haqi 600 AQSh dollari ekvivalentida belgilanadi.
3. Ijaraga beruvchi istalgan vaqtda, ogohlantirishsiz xonadonga kirish va ijarachini 24 soat ichida chiqarib yuborish huquqiga ega.
4. To‘lov bir kun kechiksa, har bir kechiktirilgan kun uchun kunlik ijara haqining 20 foizi miqdorida peniya hisoblanadi.
5. Ushbu shartnoma soliq organlarida ro‘yxatdan o‘tkazilmaydi va norasmiy hisoblanadi.`,
  },
  {
    title: 'Mahsulot yetkazib berish shartnomasi (Bir tomonlama xatarli)',
    type: 'Oldi-sotdi va yetkazib berish',
    text: `MAHSULOT YETKAZIB BERISH SHARTNOMASI № 102
Toshkent shahri                                  2026-yil 10-yanvar

Yetkazib beruvchi: «Stroy Snab» MChJ
Xaridor: «Mega Qurilish» MChJ

1. Yetkazib beruvchi 500 tonna armatura yetkazib beradi. Shartnoma summasi 450 000 000 so‘m.
2. Xaridor 100% oldindan to‘lovni amalga oshiradi.
3. Yetkazib beruvchi tovar narxini xom-ashyo qimmatlashishiga qarab bir tomonlama oshirish huquqiga ega.
4. Sifatsiz mahsulot yetkazib berilganda Yetkazib beruvchi javobgar bo‘lmaydi, barcha xatarlar Xaridor zimmasida bo‘ladi.
5. Yetkazib berish muddati kechiksa, Yetkazib beruvchi jarima to‘lamaydi, ammo Xaridor qabul qilishni kechiktirsa kuniga 5% peniya to‘laydi.`,
  },
  {
    title: 'Qarz shartnomasi (Asossiz yuqori foizli)',
    type: 'Qarz shartnomasi',
    text: `QARZ SHARTNOMASI VA TILXAT
Toshkent shahri                                  2026-yil 1-mart

Qarz beruvchi: Sobirov B.
Qarz oluvchi: Aliyev M.

1. Qarz beruvchi 100 000 000 so‘m naqd pul qarz berdi.
2. Qarz muddati 3 oy. Qarz oluvchi har oyda asosiy qarzga qo‘shimcha 15% oylik foiz to‘laydi (yillik 180%).
3. Agar qarz belgilangan kuni qaytarilmasa, Qarz oluvchining Toshkent shahridagi xonadoni to‘g‘ridan-to‘g‘ri sud qarorisiz Qarz beruvchiga o‘tadi.
4. Qarz oluvchi ushbu bitim bo‘yicha sudga murojaat qilish huquqidan voz kechadi.`,
  },
];

export const ContractAnalyzer: React.FC = () => {
  const [contractText, setContractText] = useState(SAMPLE_CONTRACTS[0].text);
  const [contractType, setContractType] = useState('Mehnat shartnomasi');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ContractAnalysisResult | null>(null);
  const [copiedClauseId, setCopiedClauseId] = useState<string | null>(null);
  const [replacedClauseId, setReplacedClauseId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'high' | 'medium' | 'safe'>('all');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Instant automated audit trigger
  const handleAnalyze = async (textToAudit?: string, typeToAudit?: string) => {
    const text = textToAudit !== undefined ? textToAudit : contractText;
    const type = typeToAudit !== undefined ? typeToAudit : contractType;

    if (!text.trim() && !uploadedImage) return;

    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/gemini/analyze-contract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contractText: text,
          imageAttachment: uploadedImage && !uploadedImage.startsWith('blob:') ? uploadedImage : undefined,
          contractType: type,
        }),
      });

      if (!res.ok) throw new Error('Shartnomani tahlil qilishda xatolik yuz berdi');
      const data: ContractAnalysisResult = await res.json();
      setAnalysisResult(data);
    } catch (err: any) {
      console.warn('Shartnoma auditi tarmog‘i holati:', err?.message || err);
      const fallbackData = synthesizeClientContractAudit(text, type);
      setAnalysisResult(fallbackData);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const copyAlternativeText = (altText: string, id: string) => {
    navigator.clipboard.writeText(altText);
    setCopiedClauseId(id);
    setTimeout(() => setCopiedClauseId(null), 2000);
  };

  // 1-Click Replace / Patch Violating Clause with Safe Alternative in Document Text
  const handleApplyAlternativeToDocument = (clause: ContractClauseIssue) => {
    let updated = contractText;

    if (clause.originalText && updated.includes(clause.originalText)) {
      updated = updated.replace(clause.originalText, clause.suggestedAlternative);
    } else {
      // Find matching line by partial substring or append
      const lines = updated.split('\n');
      const matchIndex = lines.findIndex(l => 
        l.toLowerCase().includes(clause.clauseTitle.toLowerCase()) || 
        (clause.originalText && l.toLowerCase().includes(clause.originalText.slice(0, 20).toLowerCase()))
      );

      if (matchIndex !== -1) {
        lines[matchIndex] = clause.suggestedAlternative;
        updated = lines.join('\n');
      } else {
        updated += `\n\n[Tuzatilgan band: ${clause.clauseTitle}]\n${clause.suggestedAlternative}`;
      }
    }

    setContractText(updated);
    setReplacedClauseId(clause.id);
    setTimeout(() => setReplacedClauseId(null), 2000);
  };

  // Export Legal Audit Report
  const handleExportAuditReport = (format: 'docx' | 'print') => {
    if (!analysisResult) return;

    const reportContent = `
O‘ZBEKISTON RESPUBLIKASI QONUNCHILIGI BO‘YICHA
YURIDIK AUDIT VA XATARLAR XULOSASI

Hujjat turi: ${contractType}
Audit sanasi: ${new Date().toLocaleDateString('uz-UZ')}
Umumiy Huquqiy Xavfsizlik Reytingi: ${analysisResult.overallRiskScore} / 100
Komplayens holati: ${analysisResult.complianceStatus === 'COMPLIANT' ? 'QONUNIY XAVFSIZ' : analysisResult.complianceStatus === 'NEEDS_REVISION' ? 'TUZATISH TALAB ETILADI' : 'KRITIK XAVFLI'}

1. UMUMIY HUQUQIY TAHLIL VA XULOSA:
${analysisResult.summary}

2. ANIQLANGAN NOMUVOFIQLIKLAR VA XATARLI BANDLAR:
${analysisResult.clauses.map((c, i) => `
${i + 1}. ${c.clauseTitle} [Xavf darajasi: ${c.riskLevel}]
- Asl matn: ${c.originalText || 'Ko‘rsatilmagan'}
- Qonun buzilishi: ${c.issueDescription}
- Huquqiy norma: ${c.legalViolationCitation}
- Tavsiya etilgan xavfsiz tahrir: ${c.suggestedAlternative}
`).join('\n')}

3. TUSHIRIB QOLDIRILGAN MAJBURIIY SHARTLAR:
${analysisResult.missingCrucialClauses?.map((m, i) => `${i + 1}. ${m}`).join('\n') || 'Mavjud emas'}

4. ASOSIY HUQUQIY TAVSIYALAR:
${analysisResult.generalRecommendations?.map((r, i) => `${i + 1}. ${r}`).join('\n') || 'Mavjud emas'}

Audit xulosasi O‘zbekiston Respublikasi Lex.uz qonunchilik bazasi me‘yorlariga asosan LEXAI UZ yuridik tahlil tizimi tomonidan tuzildi.
    `.trim();

    const options = {
      title: `Audit_Xulosasi_${contractType.replace(/\s+/g, '_')}`,
      documentDate: new Date().toLocaleDateString('uz-UZ'),
      fontFamily: 'Times New Roman' as const,
      fontSizePt: 14,
      lineSpacing: 1.15,
      paragraphIndentCm: 1.25,
      classificationCode: 'LEXAI / AUDIT-2026',
    };

    if (format === 'docx') {
      exportToWordDocx(reportContent, options);
    } else {
      printDocument(reportContent, options);
    }
  };

  const filteredClauses = analysisResult?.clauses?.filter((c) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'high') return c.riskLevel === 'HIGH';
    if (activeFilter === 'medium') return c.riskLevel === 'MEDIUM';
    if (activeFilter === 'safe') return c.riskLevel === 'SAFE' || c.riskLevel === 'LOW';
    return true;
  }) || [];

  return (
    <div className="max-w-7xl mx-auto p-2 sm:p-4 space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                AI Shartnomalar va Hujjatlar Auditi
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Lex.uz Skaner
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Shartnomalarni O‘zbekiston Respublikasi qonunchiligiga muvofiqligini avtomatik tekshirish, noqonuniy jarimalar va bir tomonlama xatarlarni aniqlash.
              </p>
            </div>
          </div>
        </div>

        {/* Sample Selection */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 whitespace-nowrap">Namunalar:</span>
          <select
            onChange={(e) => {
              const selected = SAMPLE_CONTRACTS.find((c) => c.title === e.target.value);
              if (selected) {
                setContractText(selected.text);
                setContractType(selected.type);
                setUploadedImage(null);
                setAnalysisResult(null);
              }
            }}
            className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer"
          >
            {SAMPLE_CONTRACTS.map((c, i) => (
              <option key={i} value={c.title}>
                {c.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid: Input Form vs Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Input Text / OCR Upload */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
            
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>Tekshiriladigan Shartnoma Matni:</span>
              </label>
              <span className="text-[11px] text-cyan-400 font-medium">Lex.uz Komplayens</span>
            </div>

            {/* Document Type Selector */}
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Shartnoma / Hujjat turi:</label>
              <select
                value={contractType}
                onChange={(e) => setContractType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
              >
                <option value="Mehnat shartnomasi">Mehnat shartnomasi (MK)</option>
                <option value="Ijara shartnomasi">Turar / Noturar joy ijara shartnomasi (FK)</option>
                <option value="Oldi-sotdi va yetkazib berish">Mahsulot yetkazib berish va oldi-sotdi</option>
                <option value="Xizmat ko‘rsatish shartnomasi">Pulli xizmatlar ko‘rsatish</option>
                <option value="Qarz shartnomasi">Qarz shartnomasi va Tilxat</option>
                <option value="Pudrat shartnomasi">Fuqarolik-huquqiy pudrat (GPH)</option>
                <option value="Boshqa shartnoma">Boshqa yuridik shartnoma</option>
              </select>
            </div>

            {/* Textarea */}
            <textarea
              value={contractText}
              onChange={(e) => setContractText(e.target.value)}
              placeholder="Shartnoma matnini shu yerga nusxalang yoki yozing..."
              rows={12}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-[13px] text-slate-100 font-serif leading-relaxed focus:outline-none focus:border-cyan-500 transition resize-y"
            />

            {/* Image / Scan Upload Section */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-medium border border-slate-700 transition cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>{uploadedImage ? 'Rasm yuklandi (Almashtirish)' : 'Skaner / Rasm yuklash (OCR)'}</span>
              </button>

              {uploadedImage && (
                <button
                  type="button"
                  onClick={() => setUploadedImage(null)}
                  className="text-xs text-red-400 hover:underline cursor-pointer"
                >
                  Rasmni o‘chirish
                </button>
              )}
            </div>

            {/* Auto-Audit Launch Button */}
            <button
              onClick={() => handleAnalyze()}
              disabled={isAnalyzing || (!contractText.trim() && !uploadedImage)}
              id="start-contract-audit-btn"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white text-xs sm:text-sm font-bold transition shadow-lg shadow-emerald-600/20 disabled:opacity-50 cursor-pointer"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Lex.uz bo‘yicha avtomatik audit bajarilmoqda...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>Avtomatik Yuridik Auditni Boshlash</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right: Comprehensive Audit Results & Risk Score */}
        <div className="lg:col-span-7 space-y-4">
          
          {!analysisResult && !isAnalyzing ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-3">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-white">Shartnomangizni Qonuniy Auditga topshiring</h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
                Chap tomondagi matnni tahrirlang yoki tayyor namunalardan birini tanlab <strong>"Avtomatik Yuridik Auditni Boshlash"</strong> tugmasini bosing.
              </p>
            </div>
          ) : isAnalyzing ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center space-y-4 animate-pulse">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <RefreshCw className="w-7 h-7 animate-spin" />
              </div>
              <h3 className="text-base font-bold text-white">Shartnoma bandlari Lex.uz qonunlari bilan solishtirilmoqda...</h3>
              <p className="text-xs text-slate-400">
                Mehnat kodeksi, Fuqarolik kodeksi, Soliq talablari va peniya chegaralari tekshirilmoqda...
              </p>
            </div>
          ) : analysisResult ? (
            <div className="space-y-4">
              
              {/* Overall Score & Compliance Status Banner */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  
                  {/* Gauge */}
                  <div className="flex items-center gap-3.5">
                    <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-bold text-xl border ${
                      analysisResult.overallRiskScore >= 80
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : analysisResult.overallRiskScore >= 50
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                        : 'bg-red-500/10 text-red-400 border-red-500/30'
                    }`}>
                      <span>{analysisResult.overallRiskScore}</span>
                      <span className="text-[9px] font-normal uppercase">/ 100</span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm sm:text-base font-bold text-white">
                          Huquqiy Xavfsizlik Indeksi:
                        </h3>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          analysisResult.complianceStatus === 'COMPLIANT'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : analysisResult.complianceStatus === 'NEEDS_REVISION'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            : 'bg-red-500/10 text-red-400 border border-red-500/20'
                        }`}>
                          {analysisResult.complianceStatus === 'COMPLIANT' ? 'Qonuniy Xavfsiz' : analysisResult.complianceStatus === 'NEEDS_REVISION' ? 'Tuzatish Talab Qilinadi' : 'Kritik Xavfli'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {analysisResult.summary}
                      </p>
                    </div>
                  </div>

                  {/* Export Report Buttons */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleExportAuditReport('docx')}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition cursor-pointer"
                      title="Audit hisobotini Word formatida yuklab olish"
                    >
                      <FileType className="w-3.5 h-3.5" />
                      <span>Audit Hisoboti (.docx)</span>
                    </button>
                    <button
                      onClick={() => handleExportAuditReport('print')}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
                      title="Chop etish"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 text-xs">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setActiveFilter('all')}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
                      activeFilter === 'all'
                        ? 'bg-cyan-500 text-slate-950'
                        : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Barcha bandlar ({analysisResult.clauses.length})
                  </button>

                  <button
                    onClick={() => setActiveFilter('high')}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
                      activeFilter === 'high'
                        ? 'bg-red-500 text-white'
                        : 'bg-slate-900 text-red-400 hover:bg-slate-800'
                    }`}
                  >
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Yuqori xavfli ({analysisResult.clauses.filter(c => c.riskLevel === 'HIGH').length})</span>
                  </button>

                  <button
                    onClick={() => setActiveFilter('medium')}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
                      activeFilter === 'medium'
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'bg-slate-900 text-amber-400 hover:bg-slate-800'
                    }`}
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>O‘rta xavf ({analysisResult.clauses.filter(c => c.riskLevel === 'MEDIUM').length})</span>
                  </button>
                </div>
              </div>

              {/* Clause-by-Clause Findings */}
              <div className="space-y-3">
                {filteredClauses.map((clause) => {
                  const isHigh = clause.riskLevel === 'HIGH';
                  const isMedium = clause.riskLevel === 'MEDIUM';
                  const isSafe = clause.riskLevel === 'SAFE' || clause.riskLevel === 'LOW';
                  const isCopied = copiedClauseId === clause.id;
                  const isReplaced = replacedClauseId === clause.id;

                  return (
                    <div
                      key={clause.id}
                      className={`p-4 rounded-2xl border transition-all ${
                        isHigh
                          ? 'bg-slate-900/90 border-red-500/30'
                          : isMedium
                          ? 'bg-slate-900/90 border-amber-500/30'
                          : 'bg-slate-900/90 border-emerald-500/30'
                      }`}
                    >
                      {/* Clause Title & Risk Tag */}
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          {isHigh ? (
                            <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                          ) : isMedium ? (
                            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                          ) : (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          )}
                          <h4 className="text-xs sm:text-sm font-bold text-white">
                            {clause.clauseTitle}
                          </h4>
                        </div>

                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          isHigh
                            ? 'bg-red-500/10 text-red-400 border border-red-500/30'
                            : isMedium
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                            : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        }`}>
                          {isHigh ? 'Kritik Xatar' : isMedium ? 'Ogohlantirish' : 'Qonuniy'}
                        </span>
                      </div>

                      {/* Original text quote */}
                      {clause.originalText && (
                        <div className="p-2 rounded-xl bg-slate-950/70 border border-slate-850 text-xs text-slate-400 italic mb-2.5 font-serif">
                          "{clause.originalText}"
                        </div>
                      )}

                      {/* Issue Description */}
                      <div className="text-xs text-slate-300 leading-relaxed mb-2.5 space-y-1">
                        <p>{clause.issueDescription}</p>
                        <div className="flex items-center gap-2 text-[11px] text-cyan-400 pt-1">
                          <Scale className="w-3.5 h-3.5 shrink-0" />
                          <span>Qonuniy asos: <strong>{clause.legalViolationCitation}</strong></span>
                          {clause.lexUrl && (
                            <a
                              href={clause.lexUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-0.5 text-cyan-400 hover:text-cyan-300 font-semibold ml-auto"
                            >
                              <span>Lex.uz</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Safe Alternative Recommendation & 1-Click Replace Button */}
                      {clause.suggestedAlternative && (
                        <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                          <div className="flex items-center justify-between text-[11px] text-emerald-400 font-semibold">
                            <span className="flex items-center gap-1">
                              <Wand2 className="w-3.5 h-3.5" />
                              <span>Qonunga mos xavfsiz tahrir:</span>
                            </span>

                            <div className="flex items-center gap-1.5">
                              {/* 1-Click Replace */}
                              <button
                                onClick={() => handleApplyAlternativeToDocument(clause)}
                                className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold transition cursor-pointer ${
                                  isReplaced
                                    ? 'bg-emerald-500 text-slate-950 font-bold'
                                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm'
                                }`}
                                title="Shartnomadagi matnni ushbu xavfsiz tahrirga almashtirish"
                              >
                                {isReplaced ? <Check className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
                                <span>{isReplaced ? 'Almashtirildi!' : 'Shartnomaga qo‘llash'}</span>
                              </button>

                              {/* Copy */}
                              <button
                                onClick={() => copyAlternativeText(clause.suggestedAlternative, clause.id)}
                                className="p-1 rounded text-slate-400 hover:text-white transition cursor-pointer"
                                title="Nusxalash"
                              >
                                {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          </div>

                          <p className="text-xs text-slate-200 font-serif leading-relaxed">
                            {clause.suggestedAlternative}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Missing Clauses Card */}
              {analysisResult.missingCrucialClauses && analysisResult.missingCrucialClauses.length > 0 && (
                <div className="p-4 rounded-2xl bg-slate-900 border border-amber-500/20 space-y-2">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Tushirib qoldirilgan majburiy shartlar (Essential Terms):</span>
                  </h4>
                  <ul className="text-xs text-slate-300 space-y-1 list-disc pl-5">
                    {analysisResult.missingCrucialClauses.map((m, idx) => (
                      <li key={idx}>{m}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
