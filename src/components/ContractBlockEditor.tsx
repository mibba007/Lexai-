/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Shartnoma shablonlarini vizual bloklar (Preambula, Shartnoma predmeti,
 * Huquq va majburiyatlar, Javobgarlik, Nizolar, Rekvizitlar) bo‘yicha
 * tahrirlash va Drag-and-Drop qilish interfeysi.
 */

import React, { useState, useEffect } from 'react';
import { 
  Layers, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  GripVertical, 
  Sparkles, 
  Scale, 
  AlertCircle, 
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  FileText
} from 'lucide-react';
import { LegalClauseSnippet } from '../data/legalClauseBank';

export interface ContractBlock {
  id: string;
  title: string;
  categoryTag: string;
  content: string;
  requiredLawReference?: string;
  isExpanded?: boolean;
}

interface ContractBlockEditorProps {
  initialDocumentText: string;
  onChangeDocumentText: (fullText: string) => void;
}

/**
 * Intelligent parser that converts plain text or markdown legal contracts into structured blocks
 */
export function parseTextToBlocks(rawText: string): ContractBlock[] {
  const lines = rawText.split('\n');
  const blocks: ContractBlock[] = [];
  
  let currentTitle = 'PREAMBULA VA KIRISH QISMI';
  let currentTag = 'Kirish va Taraflar';
  let currentLaw = 'Fuqarolik kodeksi 354, 386-moddalar';
  let currentContentLines: string[] = [];
  let blockCounter = 1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Check if line matches section pattern like "1. SHARTNOMA PREDMETI" or "2. HISOB-KITOB"
    const sectionMatch = trimmed.match(/^([0-9]+)\.\s+(.+)$/);
    const isMajorSection = sectionMatch && (
      trimmed.includes('PREDMET') ||
      trimmed.includes('TARTIB') ||
      trimmed.includes('MAJBURIYAT') ||
      trimmed.includes('HUQUQ') ||
      trimmed.includes('JAVOBGARLIK') ||
      trimmed.includes('FORS-MAJOR') ||
      trimmed.includes('NIZOLAR') ||
      trimmed.includes('MUDDAT') ||
      trimmed.includes('REKVIZIT') ||
      trimmed.includes('BOSHQA')
    );

    if (isMajorSection && currentContentLines.length > 0) {
      blocks.push({
        id: `block-${blockCounter++}`,
        title: currentTitle,
        categoryTag: currentTag,
        content: currentContentLines.join('\n').trim(),
        requiredLawReference: currentLaw,
        isExpanded: true,
      });

      currentTitle = trimmed;
      currentContentLines = [];

      if (trimmed.includes('PREDMET')) {
        currentTag = 'Predmet';
        currentLaw = 'FK 386, 437-moddalar';
      } else if (trimmed.includes('TO‘LOV') || trimmed.includes('HISOB')) {
        currentTag = 'To‘lov va Hisob-kitob';
        currentLaw = 'FK 327, 444-moddalar';
      } else if (trimmed.includes('HUQUQ') || trimmed.includes('MAJBURIYAT')) {
        currentTag = 'Huquq va Majburiyatlar';
        currentLaw = 'FK 356, MK 104-moddalar';
      } else if (trimmed.includes('JAVOBGARLIK')) {
        currentTag = 'Javobgarlik va Jarimalar';
        currentLaw = 'Qonun № 670-I 25-modda; FK 326-modda';
      } else if (trimmed.includes('FORS-MAJOR') || trimmed.includes('YENGIB')) {
        currentTag = 'Fors-major';
        currentLaw = 'FK 333-modda 3-qism';
      } else if (trimmed.includes('NIZO')) {
        currentTag = 'Nizolarni hal etish';
        currentLaw = 'IPK 148-modda; FK 234-modda';
      } else if (trimmed.includes('REKVIZIT') || trimmed.includes('MANZIL')) {
        currentTag = 'Rekvizitlar va Imzolar';
        currentLaw = 'O‘zDSt 1157:2008 standarti';
      } else {
        currentTag = 'Maxsus Shartlar';
        currentLaw = 'Lex.uz talablari';
      }
    } else {
      currentContentLines.push(line);
    }
  }

  // Push last block
  if (currentContentLines.length > 0) {
    blocks.push({
      id: `block-${blockCounter++}`,
      title: currentTitle,
      categoryTag: currentTag,
      content: currentContentLines.join('\n').trim(),
      requiredLawReference: currentLaw,
      isExpanded: true,
    });
  }

  // If no sections were detected, default to standard templates
  if (blocks.length <= 1) {
    return [
      {
        id: 'block-preamble',
        title: 'PREAMBULA VA HUJJAT BOShLANISHI',
        categoryTag: 'Preambula',
        content: rawText,
        requiredLawReference: 'O‘zDSt 1157:2008',
        isExpanded: true,
      }
    ];
  }

  return blocks;
}

export function compileBlocksToText(blocks: ContractBlock[]): string {
  return blocks
    .map((b) => {
      if (b.title === 'PREAMBULA VA KIRISH QISMI' || b.title === 'PREAMBULA VA HUJJAT BOShLANISHI') {
        return b.content;
      }
      return `${b.title}\n${b.content}`;
    })
    .join('\n\n')
    .trim();
}

export const ContractBlockEditor: React.FC<ContractBlockEditorProps> = ({
  initialDocumentText,
  onChangeDocumentText,
}) => {
  const [blocks, setBlocks] = useState<ContractBlock[]>(() => parseTextToBlocks(initialDocumentText));
  const [activeDropZoneId, setActiveDropZoneId] = useState<string | null>(null);

  // Sync internal state when external document changes drastically
  useEffect(() => {
    const parsed = parseTextToBlocks(initialDocumentText);
    setBlocks(parsed);
  }, [initialDocumentText]);

  const updateBlockContent = (blockId: string, newContent: string) => {
    const updated = blocks.map((b) => (b.id === blockId ? { ...b, content: newContent } : b));
    setBlocks(updated);
    onChangeDocumentText(compileBlocksToText(updated));
  };

  const toggleExpand = (blockId: string) => {
    setBlocks((prev) =>
      prev.map((b) => (b.id === blockId ? { ...b, isExpanded: !b.isExpanded } : b))
    );
  };

  const handleAddCustomBlock = () => {
    const newBlock: ContractBlock = {
      id: `block-custom-${Date.now()}`,
      title: `${blocks.length + 1}. QO‘SHIMCHA SHARTLAR`,
      categoryTag: 'Maxsus qoida',
      content: 'Taraflarning o‘zaro kelishuviga ko‘ra kiritilgan maxsus qonuniy shartlar...',
      requiredLawReference: 'Fuqarolik kodeksi 354-modda',
      isExpanded: true,
    };
    const updated = [...blocks, newBlock];
    setBlocks(updated);
    onChangeDocumentText(compileBlocksToText(updated));
  };

  const handleDeleteBlock = (blockId: string) => {
    const updated = blocks.filter((b) => b.id !== blockId);
    setBlocks(updated);
    onChangeDocumentText(compileBlocksToText(updated));
  };

  // Drag and Drop handlers
  const handleDragOver = (e: React.DragEvent, blockId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    if (activeDropZoneId !== blockId) {
      setActiveDropZoneId(blockId);
    }
  };

  const handleDragLeave = (e: React.DragEvent, blockId: string) => {
    if (activeDropZoneId === blockId) {
      setActiveDropZoneId(null);
    }
  };

  const handleDrop = (e: React.DragEvent, blockId: string) => {
    e.preventDefault();
    setActiveDropZoneId(null);

    const droppedText = e.dataTransfer.getData('text/plain');
    if (!droppedText) return;

    const block = blocks.find((b) => b.id === blockId);
    if (!block) return;

    const newContent = `${block.content}\n\n${droppedText}`.trim();
    updateBlockContent(blockId, newContent);
  };

  return (
    <div className="space-y-4">
      {/* Editor Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-xl bg-slate-900 border border-slate-800">
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Shartnoma Qismlari va Bloklari Muharriri</span>
          </h4>
          <p className="text-[11px] text-slate-400">
            Har bir bo‘limni alohida tahrirlang, qonunchilik talablarini ko‘ring va qonuniy bandlarni to‘g‘ridan-to‘g‘ri bloklarga tashlang.
          </p>
        </div>

        <button
          onClick={handleAddCustomBlock}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition cursor-pointer shadow-sm shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Yangi bo‘lim qo‘shish</span>
        </button>
      </div>

      {/* Block List */}
      <div className="space-y-3">
        {blocks.map((block, index) => {
          const isDropTarget = activeDropZoneId === block.id;

          return (
            <div
              key={block.id}
              onDragOver={(e) => handleDragOver(e, block.id)}
              onDragLeave={(e) => handleDragLeave(e, block.id)}
              onDrop={(e) => handleDrop(e, block.id)}
              className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                isDropTarget
                  ? 'border-cyan-400 bg-cyan-950/40 ring-2 ring-cyan-400/30'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Block Header */}
              <div className="p-3 bg-slate-850/90 flex items-center justify-between gap-3 border-b border-slate-800">
                <div className="flex items-center gap-2.5 flex-1 min-w-0">
                  <span className="w-5 h-5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] font-bold flex items-center justify-center shrink-0">
                    {index + 1}
                  </span>

                  <input
                    type="text"
                    value={block.title}
                    onChange={(e) => {
                      const newTitle = e.target.value;
                      const updated = blocks.map((b) =>
                        b.id === block.id ? { ...b, title: newTitle } : b
                      );
                      setBlocks(updated);
                      onChangeDocumentText(compileBlocksToText(updated));
                    }}
                    className="bg-transparent font-bold text-xs sm:text-sm text-slate-200 focus:outline-none focus:text-cyan-300 w-full truncate"
                  />
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {/* Category / Legal badge */}
                  <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-cyan-400 border border-slate-700">
                    <Scale className="w-3 h-3" />
                    <span>{block.categoryTag}</span>
                  </span>

                  {/* Delete button (except if single block) */}
                  {blocks.length > 1 && (
                    <button
                      onClick={() => handleDeleteBlock(block.id)}
                      title="Bo‘limni o‘chirish"
                      className="p-1 rounded text-slate-500 hover:text-red-400 transition cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {/* Toggle expand */}
                  <button
                    onClick={() => toggleExpand(block.id)}
                    className="p-1 rounded text-slate-400 hover:text-white transition cursor-pointer"
                  >
                    {block.isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Block Body */}
              {block.isExpanded && (
                <div className="p-3 space-y-2.5">
                  {/* Legal Requirement Annotation */}
                  {block.requiredLawReference && (
                    <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
                      <span className="flex items-center gap-1.5 text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Qonuniy asos: <strong className="text-slate-300">{block.requiredLawReference}</strong></span>
                      </span>
                      <span className="text-[10px] text-cyan-400/80 font-mono">
                        {isDropTarget ? '✨ Qo‘yib yuboring (Drop)!' : 'Drag & Drop zonasi'}
                      </span>
                    </div>
                  )}

                  {/* Textarea for block content */}
                  <textarea
                    value={block.content}
                    onChange={(e) => updateBlockContent(block.id, e.target.value)}
                    rows={Math.max(3, Math.min(10, block.content.split('\n').length + 1))}
                    placeholder="Ushbu bo‘lim matnini kiriting yoki o‘ng tomondagi qonuniy iqtiboslardan tortib tashlang..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-[13px] text-slate-100 placeholder:text-slate-600 leading-relaxed font-serif focus:outline-none focus:border-cyan-500 transition resize-y"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
