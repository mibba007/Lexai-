/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Non-editable Modal Document Preview Component.
 * Displays the formatted legal document in an authentic A4 standard view
 * (O‘zDSt 1157:2008) before final PDF download, featuring zoom controls,
 * page inspection, and one-click PDF / Word export.
 */

import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Printer, 
  FileType, 
  Eye, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  RotateCcw, 
  CheckCircle2, 
  ShieldCheck, 
  FileText,
  Lock,
  RefreshCw
} from 'lucide-react';
import { DocumentExportOptions, formatDocumentToHtml } from '../utils/documentExporter';

interface DocumentPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentText: string;
  options: DocumentExportOptions;
  onDownloadPdf: () => void;
  isGeneratingPdf?: boolean;
  onDownloadWord?: () => void;
  onPrint?: () => void;
}

export const DocumentPreviewModal: React.FC<DocumentPreviewModalProps> = ({
  isOpen,
  onClose,
  documentText,
  options,
  onDownloadPdf,
  isGeneratingPdf = false,
  onDownloadWord,
  onPrint,
}) => {
  const [zoomScale, setZoomScale] = useState<number>(100);

  if (!isOpen) return null;

  const handleZoomIn = () => setZoomScale((prev) => Math.min(prev + 10, 140));
  const handleZoomOut = () => setZoomScale((prev) => Math.max(prev - 10, 70));
  const handleResetZoom = () => setZoomScale(100);

  const formattedHtml = formatDocumentToHtml(documentText, options);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-hidden animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="preview-modal-title"
    >
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-5xl h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header Bar */}
        <div className="p-3.5 sm:p-4 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 id="preview-modal-title" className="text-sm sm:text-base font-bold text-white flex items-center gap-1.5">
                  <span>Hujjatning Rasmiy Ko‘rinishi</span>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-slate-800 text-cyan-300 border border-slate-700">
                    A4 (210×297 mm)
                  </span>
                </h3>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  <Lock className="w-2.5 h-2.5" />
                  Tahrirlanmaydigan rejim (Non-editable)
                </span>
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-1">
                {options.title} — O‘zDSt 1157:2008 davlat standarti bo‘yicha rasmiylashtirilgan
              </p>
            </div>
          </div>

          {/* Quick Actions & Controls */}
          <div className="flex items-center gap-2">
            {/* Zoom Controls */}
            <div className="hidden md:flex items-center gap-1 bg-slate-800/80 rounded-xl px-2 py-1 border border-slate-700 text-xs text-slate-300">
              <button 
                onClick={handleZoomOut} 
                disabled={zoomScale <= 70}
                className="p-1 hover:text-white disabled:opacity-40 transition cursor-pointer"
                title="Kichraytirish"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="w-12 text-center font-mono font-medium">{zoomScale}%</span>
              <button 
                onClick={handleZoomIn} 
                disabled={zoomScale >= 140}
                className="p-1 hover:text-white disabled:opacity-40 transition cursor-pointer"
                title="Kattalashtirish"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={handleResetZoom} 
                className="p-1 hover:text-cyan-300 transition cursor-pointer ml-1 text-[10px] font-bold"
                title="100% asl o‘lcham"
              >
                100%
              </button>
            </div>

            {/* Direct Download PDF in Modal */}
            <button
              onClick={onDownloadPdf}
              disabled={isGeneratingPdf}
              id="preview-modal-download-pdf-btn"
              data-testid="preview-modal-download-pdf-btn"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white text-xs font-bold transition shadow-sm cursor-pointer disabled:opacity-50"
              title="Tasdiqlash va PDF faylni yuklab olish"
            >
              {isGeneratingPdf ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>PDF Export...</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>PDF Export</span>
                </>
              )}
            </button>

            {onDownloadWord && (
              <button
                onClick={onDownloadWord}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition cursor-pointer shadow-sm"
                title="Word (.docx) formatida yuklab olish"
              >
                <FileType className="w-3.5 h-3.5" />
                <span>Word</span>
              </button>
            )}

            {onPrint && (
              <button
                onClick={onPrint}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition cursor-pointer"
                title="Chop etish"
              >
                <Printer className="w-3.5 h-3.5 text-cyan-400" />
                <span>Chop etish</span>
              </button>
            )}

            {/* Close Button */}
            <button
              onClick={onClose}
              id="preview-modal-close-btn"
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer ml-1"
              title="Yopish"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Non-editable Notice Banner */}
        <div className="bg-slate-950/90 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Tahrirlanmaydigan Ko‘rish Rejimi:</strong> Ushbu ko‘rinish PDF fayl yuklab olinganda aynan qanday chiqishini (matn o‘lchami, hoshiyalar, jadval va imzolar) 100% aniqlikda namoyish etadi.
            </span>
          </div>
          <div className="hidden lg:flex items-center gap-3 text-[11px]">
            <span>Shrift: <strong className="text-slate-200">{options.fontFamily || 'Times New Roman'} ({options.fontSizePt || 14}pt)</strong></span>
            <span>Hoshiyalar: <strong className="text-slate-200">Chap 30mm • O‘ng 15mm</strong></span>
          </div>
        </div>

        {/* Scrollable Document Container */}
        <div className="flex-1 overflow-auto bg-slate-950 p-4 sm:p-8 flex justify-center items-start">
          <div 
            style={{
              transform: `scale(${zoomScale / 100})`,
              transformOrigin: 'top center',
              transition: 'transform 0.15s ease-out',
            }}
            className="w-full max-w-[210mm] transition-transform duration-150 select-text"
          >
            {/* Authentic A4 Paper Sheet Simulation (Strictly Non-Editable) */}
            <div 
              id="preview-modal-document-sheet"
              className="bg-white text-slate-900 rounded-sm shadow-2xl relative border border-slate-300 pointer-events-auto"
              style={{
                fontFamily: `'${options.fontFamily || 'Times New Roman'}', serif`,
                minHeight: '297mm',
                boxSizing: 'border-box',
              }}
            >
              {/* Formatted Content Render */}
              <div 
                className="document-preview-content select-text"
                dangerouslySetInnerHTML={{ __html: formattedHtml }}
              />
            </div>
          </div>
        </div>

        {/* Modal Footer Bar */}
        <div className="p-3.5 sm:p-4 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Hujjat O‘zbekiston Respublikasi davlat standartlariga mos holda tayyorlandi.</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition cursor-pointer"
            >
              Tahrirlashga qaytish
            </button>
            <button
              onClick={onDownloadPdf}
              disabled={isGeneratingPdf}
              id="preview-modal-footer-pdf-btn"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 hover:from-rose-500 hover:to-red-500 text-white text-xs font-bold transition shadow-sm cursor-pointer disabled:opacity-50"
            >
              {isGeneratingPdf ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>PDF Export qilinmoqda...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Tasdiqlash &amp; PDF Export</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
