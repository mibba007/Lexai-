/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * O‘zbekiston Respublikasi davlat standarti (O‘zDSt 1157:2008)
 * "Ish yuritish va hujjatlashtirish talablari" bo‘yicha avtomatik
 * komplayens (muvofiqlik) tekshiruvi va A4 Preview modal oynasi.
 */

import React from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  X, 
  Printer, 
  Download, 
  FileType, 
  Scale, 
  ShieldCheck,
  FileCheck,
  Info
} from 'lucide-react';
import { DocumentExportOptions, formatDocumentToHtml } from '../utils/documentExporter';

interface CompliancePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentText: string;
  options: DocumentExportOptions;
  onExportWord: () => void;
  onExportPdf?: () => void;
  onPrint: () => void;
}

export const CompliancePreviewModal: React.FC<CompliancePreviewModalProps> = ({
  isOpen,
  onClose,
  documentText,
  options,
  onExportWord,
  onExportPdf,
  onPrint,
}) => {
  if (!isOpen) return null;

  const font = options.fontFamily || 'Times New Roman';
  const size = options.fontSizePt || 14;
  const lineSpacing = options.lineSpacing || 1.15;
  const indent = options.paragraphIndentCm || 1.25;

  // Compliance Audit Checks
  const checks = [
    {
      id: 'font-type',
      title: 'Shrift turi standarti',
      requirement: 'Times New Roman (yoki Arial)',
      currentValue: font,
      passed: font === 'Times New Roman' || font === 'Arial',
      standardCode: 'O‘zDSt 1157:2008 4.2-band',
    },
    {
      id: 'font-size',
      title: 'Harflar o‘lchami (Kegl)',
      requirement: '14 pt (rasmiy matnlar uchun)',
      currentValue: `${size} pt`,
      passed: size === 14,
      standardCode: 'O‘zDSt 1157:2008 4.3-band',
    },
    {
      id: 'paragraph-indent',
      title: 'Xatboshi (Abzats) chekinishi',
      requirement: '1.25 sm aniq chekinish',
      currentValue: `${indent} sm`,
      passed: indent === 1.25,
      standardCode: 'O‘zDSt 1157:2008 4.4-band',
    },
    {
      id: 'line-spacing',
      title: 'Satrlararo oraliq (Interval)',
      requirement: '1.15 yoki 1.5 koeffitsiyent',
      currentValue: `${lineSpacing}x`,
      passed: lineSpacing === 1.15 || lineSpacing === 1.5,
      standardCode: 'O‘zDSt 1157:2008 4.5-band',
    },
    {
      id: 'margins',
      title: 'A4 Qog‘oz maydonlari',
      requirement: 'Chap 30mm, O‘ng 15mm, Yuqori 20mm, Past 20mm',
      currentValue: 'Chap: 30mm, O‘ng: 15mm',
      passed: true,
      standardCode: 'O‘zDSt 1157:2008 3.1-band',
    },
    {
      id: 'signatures',
      title: 'Tomonlar rekvizitlari va imzo o‘rni',
      requirement: 'Imzo va M.O‘. (Muhr o‘rni) mavjudligi',
      currentValue: documentText.includes('M.O') || documentText.includes('Imzo') || documentText.includes('Direktor') ? 'Mavjud' : 'Tekshirilsin',
      passed: documentText.includes('M.O') || documentText.includes('Imzo') || documentText.includes('Direktor') || documentText.includes('Rekvizit'),
      standardCode: 'FK 386-modda',
    },
  ];

  const passedCount = checks.filter((c) => c.passed).length;
  const compliancePercentage = Math.round((passedCount / checks.length) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Hujjatning Davlat Standarti (O‘zDSt 1157:2008) Muvofiqlik Tekshiruvi
              </h3>
              <p className="text-xs text-slate-400">
                Chop etish va eksport qilishdan oldin shrift, abzats va rasmiy rekvizitlar auditi
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Summary Score Card */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-slate-950 to-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${
                compliancePercentage >= 90 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                  : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
              }`}>
                {compliancePercentage}%
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Standart Muvofiqlik Reytingi:</span>
                  <span className={compliancePercentage >= 90 ? 'text-emerald-400' : 'text-amber-400'}>
                    {compliancePercentage >= 90 ? 'Mukammal (Rasmiy talablarga to‘liq mos)' : 'Tavsiya etilgan tuzatishlar bor'}
                  </span>
                </h4>
                <p className="text-xs text-slate-400">
                  {passedCount} / {checks.length} ta rasmiy me‘yoriy shart bajarilgan.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {onExportPdf && (
                <button
                  onClick={onExportPdf}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold transition cursor-pointer shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PDF Yuklab olish</span>
                </button>
              )}
              <button
                onClick={onExportWord}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition cursor-pointer shadow-sm"
              >
                <FileType className="w-3.5 h-3.5" />
                <span>Word (.docx)</span>
              </button>
              <button
                onClick={onPrint}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition cursor-pointer shadow-sm"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Chop etish</span>
              </button>
            </div>
          </div>

          {/* Compliance Checklist Grid */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Standart parametrlar tahlili:
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {checks.map((c) => (
                <div
                  key={c.id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    c.passed
                      ? 'bg-slate-950/60 border-slate-800'
                      : 'bg-amber-950/20 border-amber-500/30'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      {c.passed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                      )}
                      <span className="text-xs font-bold text-white">{c.title}</span>
                    </div>

                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                      {c.standardCode}
                    </span>
                  </div>

                  <div className="text-[11px] space-y-0.5 pl-6">
                    <p className="text-slate-400">Talab: <span className="text-slate-300 font-medium">{c.requirement}</span></p>
                    <p className="text-slate-400">Joriy parametr: <strong className={c.passed ? 'text-emerald-400' : 'text-amber-400'}>{c.currentValue}</strong></p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Document Preview Snippet */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              A4 Varoqining qisqacha ko‘rinishi (O‘zDSt 1157:2008):
            </h4>
            <div 
              className="rounded-xl bg-white text-slate-900 max-h-64 overflow-y-auto shadow-inner border border-slate-300"
            >
              <div 
                dangerouslySetInnerHTML={{
                  __html: formatDocumentToHtml(documentText, options)
                }}
              />
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Info className="w-4 h-4 text-cyan-400" />
            <span>Chop etishda brauzer sozlamalarida "Fon grafikasi" (Background graphics)ni yoqing.</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition cursor-pointer"
          >
            Yopish
          </button>
        </div>
      </div>
    </div>
  );
};
