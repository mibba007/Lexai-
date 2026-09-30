/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * O‘zbekiston Respublikasi standartlariga (O‘zDSt 1157:2008 «Ish yuritish va hujjatlashtirish»)
 * hamda rasmiy qonunchilik (Lex.uz) mezonlariga to‘liq mos professional
 * yuridik hujjatlarni DOCX (Microsoft Word), PDF va Chop etish (Print) eksport moduli.
 */

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface DocumentExportOptions {
  title: string;
  documentNumber?: string;
  documentDate?: string;
  fontFamily?: 'Times New Roman' | 'Arial' | 'Calibri' | 'Georgia';
  fontSizePt?: number; // default 14
  lineSpacing?: number; // default 1.15 or 1.5
  paragraphIndentCm?: number; // default 1.25
  includeWatermark?: boolean;
  classificationCode?: string;
}

/**
 * Escapes HTML characters
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Pre-processes and normalizes raw contract text to eliminate line merging glitches,
 * separating merged headings, titles, dates and sub-clauses cleanly.
 */
export function normalizeContractText(rawText: string): string {
  if (!rawText) return '';

  let text = rawText.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  // Fix merged section heading and sub-item (e.g., "1. SHARTNOMA PREDMETI VA ISH JOYI1.1. Xodim..." -> split)
  text = text.replace(
    /([0-9]+\.\s+[A-ZА-ЯЁO‘G‘SHCH\s\(\)\,\-\/]{3,}[A-ZА-ЯЁO‘G‘SHCH])([0-9]+\.[0-9]+\.)/g,
    '$1\n\n$2'
  );

  // Fix merged Title and Number (e.g., "MEHNAT SHARTNOMASINº 2026/MS-663" or "SHARTNOMASI№")
  text = text.replace(
    /([A-ZА-ЯЁO‘G‘SHCH]{3,})(№\s*[0-9A-Z\/\-_]+)/g,
    '$1\n$2'
  );

  // Fix merged city and date line (e.g., "Toshkent shahri«___»")
  text = text.replace(
    /([a-zA-Zа-яА-Я‘ʼ\s]+shahri|\s*sh\.)\s*(«___»|\d{4}-yil)/g,
    '$1                                            $2'
  );

  return text;
}

/**
 * Converts contract content into high-standard O‘zDSt 1157:2008 compliant HTML structure
 * with authentic 2-column tables for parties and signatures, exact 1.25cm paragraph indents,
 * clean centered titles, and right-aligned addressees.
 */
export function formatDocumentToHtml(
  content: string,
  options: DocumentExportOptions = { title: 'Hujjat' }
): string {
  const font = options.fontFamily || 'Times New Roman';
  const size = options.fontSizePt || 14;
  const lineSpacing = options.lineSpacing || 1.15;
  const indent = options.paragraphIndentCm || 1.25;

  const normalized = normalizeContractText(content);
  const rawLines = normalized.split('\n');

  // Filter and group lines
  let html = '';
  let inRekvizitlarSection = false;
  let rekvizitlarLines: string[] = [];

  for (let i = 0; i < rawLines.length; i++) {
    const rawLine = rawLines[i];
    const trimmed = rawLine.trim();

    if (!trimmed) {
      if (!inRekvizitlarSection) {
        html += '<div style="height: 6pt;"></div>';
      }
      continue;
    }

    // Check if this triggers the Rekvizitlar / Signatures section
    const isRekvizitHeader = /^[0-9]*\.?\s*(TARAFLARNING|TOMONLARNING|ТАРАФЛАРНИНГ|ТОМОНЛАРНИНГ)\s+(YURIDIK\s+|ЮРИДИК\s+)?(REKVIZITLARI|MANZILLARI|IMZOLARI|РЕКВИЗИТЛАРИ|МАНЗИЛЛАРИ|ИМЗОЛАРИ|MANZILLARI\s+VA\s+REKVIZITLARI|МАНЗИЛЛАРИ\s+ВА\s+ИМЗОЛАРИ)/i.test(trimmed);
    const isPartyHeader = /^(ISH BERUVCHI|XODIM|IJARAGA BERUVCHI|IJARACHI|SOTUVCHI|XARIDOR|BUYURTMACHI|IJROCHI|PUDRATCHI|QARZ BERUVCHI|QARZ OLUVCHI|1-TARAF|2-TARAF|ИШ БЕРУВЧИ|ХОДИМ|ИЖАРАГА БЕРУВЧИ|ИЖАРАЧИ|СОТУВЧИ|ХАРИДОР|БУЮРТМАЧИ|ИЖРОЧИ|ПУДРАТЧИ|ҚАРЗ БЕРУВЧИ|ҚАРЗ ОЛУВЧИ)\s*:/i.test(trimmed);

    if (isRekvizitHeader || (isPartyHeader && !inRekvizitlarSection && i > rawLines.length / 2)) {
      inRekvizitlarSection = true;
      if (isRekvizitHeader) {
        html += `<h3 style="margin: 18pt 0 10pt 0; font-size: ${size}pt; font-weight: bold; text-transform: uppercase; text-align: left; page-break-after: avoid; font-family: '${font}', serif;">${escapeHtml(trimmed)}</h3>`;
        continue;
      }
    }

    if (inRekvizitlarSection) {
      rekvizitlarLines.push(rawLine);
      continue;
    }

    // 1. Recipient / Addressee Header (e.g., "«ALFA» MChJ direktoriga", "Usmonov J. dan")
    const isRecipientHeader = trimmed.endsWith('ga') || 
                              trimmed.endsWith('dan') || 
                              trimmed.endsWith('га') || 
                              trimmed.endsWith('дан') || 
                              trimmed.startsWith('Kimga:') || 
                              trimmed.startsWith('Kimdan:') || 
                              trimmed.startsWith('Кимга:') || 
                              trimmed.startsWith('Кимдан:') || 
                              trimmed.startsWith('Da‘vogar:') || 
                              trimmed.startsWith('Javobgar:') ||
                              trimmed.startsWith('Даъвогар:') || 
                              trimmed.startsWith('Жавобгар:') ||
                              trimmed.startsWith('Da‘vo bahosi:') ||
                              trimmed.startsWith('Davlat boji:');

    // 2. Main Title (Centered, Uppercase, Bold)
    const isMainTitle = (trimmed === trimmed.toUpperCase() && trimmed.length < 100 && !trimmed.includes(':') && !trimmed.match(/^[0-9]+\./) && (
      trimmed.includes('SHARTNOMA') || 
      trimmed.includes('ШАРТНОМА') || 
      trimmed.includes('КОНТРАКТ') || 
      trimmed.includes('KONTRAKT') || 
      trimmed.includes('ARIZA') || 
      trimmed.includes('АРИЗА') || 
      trimmed.includes('BUYRUQ') || 
      trimmed.includes('БУЙРУҚ') || 
      trimmed.includes('DA‘VO') || 
      trimmed.includes('ДАЪВО') || 
      trimmed.includes('TALABNOMA') || 
      trimmed.includes('ТАЛАБНОМА') || 
      trimmed.includes('DALOLATNOMA') || 
      trimmed.includes('ДАЛОЛАТНОМА') || 
      trimmed.includes('TILXAT') || 
      trimmed.includes('ТИЛХАТ') || 
      trimmed.includes('ISHTIROK') || 
      trimmed.includes('BILDIRIShNOMA')
    ));

    // 3. Document Number (e.g., "№ 2026/MS-663", "№ 14-k", "120-сон")
    const isDocNumber = /^№\s*[0-9A-Z\/\-_А-Яа-я]+$/i.test(trimmed) || 
                        /^[0-9A-Z\/\-_]+-(son|сон)\s+.+/i.test(trimmed) || 
                        /^№\s*.+/i.test(trimmed) && trimmed.length < 40;

    // 4. City and Date row (e.g., "Toshkent shahri «___» ________ 2026-yil" / "Тошкент шаҳри")
    const isCityAndDate = /(shahri|sh\.|шаҳри|ш\.)/i.test(trimmed) && /(202\d|«___»|sana|сана|йил|yil)/i.test(trimmed);

    // 5. Section Header (e.g., "1. SHARTNOMA PREDMETI", "2. TO‘LOV SHARTLARI")
    const isSectionHeader = /^[0-9]+\.\s+[A-ZА-ЯЁO‘G‘SHCH\s\(\)\,\-\/]{3,}$/.test(trimmed) || 
                            /^[0-9]+\.\s+.*(PREDMET|TARTIB|MAJBURIYAT|HUQUQ|JAVOBGARLIK|FORS-MAJOR|NIZO|MUDDAT|KORRUPTSIYA|ПРЕДМЕТ|ТАРТИБ|МАЖБУРИЯТ|ҲУҚУҚ|ЖАВОБГАРЛИК|ФОРС-МАЖОР|НИЗО|МУДДАТ|КОРРУПЦИЯ|ТАЪТИЛ|РЕЖИМ|ҲАҚ|ТОМОНЛАР|BOSHQA)/i.test(trimmed);

    // 6. Subheading or Quote in Quotes (e.g., "«Xodimni ishga qabul qilish to‘g‘risida»", "BUYURAMAN:")
    const isOrderDirective = trimmed === 'BUYURAMAN:' || trimmed === 'QAROR QILAMAN:' || trimmed === 'БУЮРАМАН:' || trimmed === 'ҚАРОР ҚИЛАМАН:';
    const isSubjectQuote = trimmed.startsWith('«') && trimmed.endsWith('»') && trimmed.length < 80;

    // 7. Single Signer line (for Buyruq, Ariza, Tilxat)
    const isSingleSignatureLine = (trimmed.startsWith('Direktor:') || trimmed.startsWith('Директор:') || trimmed.startsWith('Imzo:') || trimmed.startsWith('Имзо:') || trimmed.startsWith('Rahbar:') || trimmed.startsWith('Раҳбар:') || trimmed.startsWith('Pudratchi:') || trimmed.includes('M.O‘.') || trimmed.includes('M.O.') || trimmed.includes('М.Ў.') || trimmed.includes('М.О.')) && !inRekvizitlarSection;

    if (isRecipientHeader) {
      html += `<table width="100%" border="0" cellpadding="0" cellspacing="0" style="width: 100%; margin-bottom: 6pt; font-family: '${font}', serif;">
        <tr>
          <td width="40%"></td>
          <td width="60%" align="left" style="font-size: ${size - 0.5}pt; line-height: 1.25; font-weight: normal; color: #1e293b;">
            ${escapeHtml(trimmed)}
          </td>
        </tr>
      </table>`;
    } else if (isMainTitle) {
      html += `<h1 style="margin: 18pt 0 4pt 0; text-align: center; font-size: ${size + 2}pt; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5pt; line-height: 1.3; font-family: '${font}', serif; color: #0f172a;">${escapeHtml(trimmed)}</h1>`;
    } else if (isDocNumber) {
      html += `<p style="margin: 0 0 14pt 0; text-align: center; font-size: ${size}pt; font-weight: bold; line-height: 1.2; text-indent: 0; font-family: '${font}', serif; color: #1e293b;">${escapeHtml(trimmed)}</p>`;
    } else if (isCityAndDate) {
      // Split into Left city and Right date
      const parts = trimmed.split(/\s{3,}|\t+/);
      const cityText = parts[0] || 'Toshkent shahri';
      const dateText = parts.length > 1 ? parts.slice(1).join(' ').trim() : '«___» ____________ 2026-yil';

      html += `<table width="100%" border="0" cellpadding="0" cellspacing="0" style="width: 100%; margin: 12pt 0 14pt 0; font-size: ${size}pt; font-family: '${font}', serif;">
        <tr>
          <td align="left" style="font-weight: 500; width: 50%; color: #0f172a;">${escapeHtml(cityText)}</td>
          <td align="right" style="font-weight: 500; width: 50%; color: #0f172a;">${escapeHtml(dateText)}</td>
        </tr>
      </table>`;
    } else if (isSectionHeader) {
      html += `<h2 style="margin: 16pt 0 6pt 0; font-size: ${size}pt; font-weight: bold; line-height: 1.3; text-transform: uppercase; text-indent: 0; text-align: left; page-break-after: avoid; font-family: '${font}', serif; color: #0f172a;">${escapeHtml(trimmed)}</h2>`;
    } else if (isOrderDirective) {
      html += `<p style="margin: 14pt 0 8pt 0; text-align: center; font-size: ${size + 1}pt; font-weight: bold; text-indent: 0; text-transform: uppercase; font-family: '${font}', serif; color: #0f172a;">${escapeHtml(trimmed)}</p>`;
    } else if (isSubjectQuote) {
      html += `<p style="margin: 6pt 0 12pt 0; text-align: center; font-size: ${size}pt; font-style: italic; font-weight: 500; text-indent: 0; font-family: '${font}', serif; color: #1e293b;">${escapeHtml(trimmed)}</p>`;
    } else if (isSingleSignatureLine) {
      html += `<table width="100%" border="0" cellpadding="0" cellspacing="0" style="width: 100%; margin-top: 18pt; margin-bottom: 8pt; font-size: ${size}pt; font-family: '${font}', serif;">
        <tr>
          <td align="left" style="font-weight: 500; line-height: 1.4;">${escapeHtml(trimmed)}</td>
        </tr>
      </table>`;
    } else {
      // Standard Legal Body Paragraph with official 1.25cm indent & justified alignment
      html += `<p style="margin: 0 0 6pt 0; font-size: ${size}pt; line-height: ${lineSpacing}; text-align: justify; text-justify: inter-ideograph; text-indent: ${indent}cm; font-family: '${font}', serif; color: #0f172a;">${escapeHtml(trimmed)}</p>`;
    }
  }

  // Parse and format Rekvizitlar section into a robust 2-column table
  if (rekvizitlarLines.length > 0) {
    html += formatRekvizitlarTable(rekvizitlarLines, font, size);
  }

  return `
    <div style="font-family: '${font}', 'Times New Roman', serif; color: #0f172a; background-color: #ffffff; padding: 20mm 15mm 20mm 30mm; line-height: ${lineSpacing}; max-width: 210mm; margin: 0 auto; box-sizing: border-box; text-rendering: optimizeLegibility;">
      ${options.classificationCode ? `
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="width: 100%; border-bottom: 1.5pt solid #94a3b8; padding-bottom: 4pt; margin-bottom: 18pt; font-family: Arial, sans-serif; font-size: 8.5pt; color: #475569;">
          <tr>
            <td align="left" style="width: 35%;">Hujjat shifri: <strong style="color: #0f172a;">${escapeHtml(options.classificationCode)}</strong></td>
            <td align="center" style="width: 40%; font-weight: 500;">O‘zbekiston Respublikasi Ish yuritish standarti (O‘zDSt 1157:2008)</td>
            <td align="right" style="width: 25%;">Sana: <strong style="color: #0f172a;">${escapeHtml(options.documentDate || new Date().toLocaleDateString('uz-UZ'))}</strong></td>
          </tr>
        </table>
      ` : ''}
      ${html}
    </div>
  `;
}

/**
 * Intelligent helper to convert multi-party details into a structured 2-column table
 */
function formatRekvizitlarTable(lines: string[], font: string, size: number): string {
  // Try to split lines into Left Column (Party 1) and Right Column (Party 2)
  let leftLines: string[] = [];
  let rightLines: string[] = [];
  let isTwoColumnText = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // Check if line contains wide tab or multiple spaces separating two columns
    const columns = line.split(/\s{4,}|\t+/);
    if (columns.length >= 2 && (columns[0].trim() || columns[1].trim())) {
      isTwoColumnText = true;
      leftLines.push(columns[0].trim());
      rightLines.push(columns.slice(1).join(' ').trim());
    } else {
      // Check if it's sequential (Party 1 block followed by Party 2 block)
      leftLines.push(trimmed);
    }
  }

  // If we detected two distinct columns
  if (isTwoColumnText && rightLines.length > 0) {
    const leftHeader = leftLines[0] || '1-TARAF (ISH BERUVCHI / SOTUVCHI / IJARAGA BERUVCHI)';
    const rightHeader = rightLines[0] || '2-TARAF (XODIM / XARIDOR / IJARACHI)';

    const leftBody = leftLines.slice(1).filter(l => l.length > 0);
    const rightBody = rightLines.slice(1).filter(l => l.length > 0);

    return `
      <table width="100%" border="1" cellpadding="8" cellspacing="0" style="width: 100%; border-collapse: collapse; border: 1pt solid #cbd5e1; margin-top: 14pt; margin-bottom: 16pt; font-size: ${size - 1}pt; font-family: '${font}', serif; page-break-inside: avoid;">
        <tr style="background-color: #f8fafc;">
          <th width="50%" align="left" style="padding: 8pt; font-weight: bold; border: 1pt solid #cbd5e1; text-transform: uppercase; color: #0f172a;">
            ${escapeHtml(leftHeader)}
          </th>
          <th width="50%" align="left" style="padding: 8pt; font-weight: bold; border: 1pt solid #cbd5e1; text-transform: uppercase; color: #0f172a;">
            ${escapeHtml(rightHeader)}
          </th>
        </tr>
        <tr>
          <td width="50%" valign="top" style="padding: 10pt; border: 1pt solid #cbd5e1; line-height: 1.35; color: #1e293b;">
            ${leftBody.map(l => `<div style="margin-bottom: 4pt;">${escapeHtml(l)}</div>`).join('')}
          </td>
          <td width="50%" valign="top" style="padding: 10pt; border: 1pt solid #cbd5e1; line-height: 1.35; color: #1e293b;">
            ${rightBody.map(l => `<div style="margin-bottom: 4pt;">${escapeHtml(l)}</div>`).join('')}
          </td>
        </tr>
      </table>
    `;
  }

  // Fallback for single column / freeform rekvizitlar
  return `
    <div style="margin-top: 14pt; padding: 12pt; border: 1pt solid #cbd5e1; background-color: #f8fafc; border-radius: 4pt; font-size: ${size - 0.5}pt; font-family: '${font}', serif; line-height: 1.4; page-break-inside: avoid;">
      ${lines.map(l => `<div style="margin-bottom: 4pt;">${escapeHtml(l.trim())}</div>`).join('')}
    </div>
  `;
}

/**
 * Export document as standard Microsoft Word (.docx / .doc) with native Word XML styling
 */
export function exportToWordDocx(content: string, options: DocumentExportOptions): void {
  const font = options.fontFamily || 'Times New Roman';
  const size = options.fontSizePt || 14;
  const lineSpacing = options.lineSpacing || 1.15;
  const indent = options.paragraphIndentCm || 1.25;

  const htmlContent = formatDocumentToHtml(content, options);

  const wordDocumentTemplate = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' 
          xmlns:w='urn:schemas-microsoft-com:office:word' 
          xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>${escapeHtml(options.title)}</title>
        <!--[if gte mso 9]>
        <xml>
          <w:WordDocument>
            <w:View>Print</w:View>
            <w:Zoom>100</w:Zoom>
            <w:DoNotOptimizeForBrowser/>
          </w:WordDocument>
        </xml>
        <![endif]-->
        <style>
          @page Section1 {
            size: 210mm 297mm; /* A4 standard */
            margin: 20mm 15mm 20mm 30mm; /* Top 20mm, Right 15mm, Bottom 20mm, Left 30mm (O‘zDSt 1157) */
            mso-header-margin: 10mm;
            mso-footer-margin: 10mm;
            mso-paper-source: 0;
          }
          div.Section1 {
            page: Section1;
          }
          body {
            font-family: '${font}', 'Times New Roman', serif;
            font-size: ${size}pt;
            line-height: ${lineSpacing};
            color: #000000;
            background: #ffffff;
            margin: 0;
            padding: 0;
          }
          p {
            margin: 0pt 0pt 6pt 0pt;
            text-align: justify;
            text-justify: inter-ideograph;
            text-indent: ${indent}cm;
            mso-char-indent-count: 0;
          }
          h1 {
            font-size: ${size + 2}pt;
            font-weight: bold;
            text-align: center;
            text-transform: uppercase;
            margin: 16pt 0pt 4pt 0pt;
            mso-line-height-rule: exactly;
          }
          h2 {
            font-size: ${size}pt;
            font-weight: bold;
            text-transform: uppercase;
            text-align: left;
            margin: 14pt 0pt 4pt 0pt;
            page-break-after: avoid;
          }
          h3 {
            font-size: ${size}pt;
            font-weight: bold;
            margin: 12pt 0pt 4pt 0pt;
            page-break-after: avoid;
          }
          table {
            border-collapse: collapse;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
          }
          td, th {
            font-family: '${font}', 'Times New Roman', serif;
          }
        </style>
      </head>
      <body>
        <div class="Section1">
          ${htmlContent}
        </div>
      </body>
    </html>
  `;

  const blob = new Blob(['\ufeff', wordDocumentTemplate], {
    type: 'application/msword;charset=utf-8',
  });

  const cleanName = options.title.replace(/[^a-zA-Z0-9_\u0400-\u04FF]/g, '_');
  const filename = `${cleanName}_${new Date().toISOString().slice(0, 10)}.doc`;
  
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}

/**
 * Print Document directly with clean A4 print styles and clean page breaks
 */
export function printDocument(content: string, options: DocumentExportOptions): void {
  const font = options.fontFamily || 'Times New Roman';
  const size = options.fontSizePt || 14;
  const lineSpacing = options.lineSpacing || 1.15;
  const indent = options.paragraphIndentCm || 1.25;

  const htmlContent = formatDocumentToHtml(content, options);

  const printIframe = document.createElement('iframe');
  printIframe.style.position = 'fixed';
  printIframe.style.right = '0';
  printIframe.style.bottom = '0';
  printIframe.style.width = '0';
  printIframe.style.height = '0';
  printIframe.style.border = '0';
  document.body.appendChild(printIframe);

  const doc = printIframe.contentWindow?.document;
  if (!doc) return;

  doc.open();
  doc.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>${escapeHtml(options.title)} — LEXAI UZ</title>
        <style>
          @page {
            size: A4;
            margin: 20mm 15mm 20mm 30mm; /* Top 20mm, Right 15mm, Bottom 20mm, Left 30mm (O‘zDSt 1157) */
          }
          * {
            box-sizing: border-box;
          }
          body {
            margin: 0;
            padding: 0;
            font-family: '${font}', 'Times New Roman', serif;
            font-size: ${size}pt;
            line-height: ${lineSpacing};
            color: #000000;
            background: #ffffff;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          p {
            margin: 0 0 6pt 0;
            text-align: justify;
            text-justify: inter-ideograph;
            text-indent: ${indent}cm;
          }
          h1 {
            font-size: ${size + 2}pt;
            font-weight: bold;
            text-align: center;
            text-transform: uppercase;
            margin: 16pt 0 4pt 0;
          }
          h2 {
            font-size: ${size}pt;
            font-weight: bold;
            text-transform: uppercase;
            text-align: left;
            margin: 14pt 0 4pt 0;
            page-break-after: avoid;
          }
          h3 {
            font-size: ${size}pt;
            font-weight: bold;
            margin: 12pt 0 4pt 0;
            page-break-after: avoid;
          }
          table {
            border-collapse: collapse;
            page-break-inside: avoid;
          }
          .no-print {
            display: none !important;
          }
        </style>
      </head>
      <body>
        ${htmlContent}
        <script>
          window.onload = function() {
            window.focus();
            window.print();
            setTimeout(function() {
              window.frameElement.parentNode.removeChild(window.frameElement);
            }, 1000);
          };
        </script>
      </body>
    </html>
  `);
  doc.close();
}

/**
 * Export document as a real PDF file (.pdf) with standard A4 geometry
 */
export async function exportToPdf(
  content: string,
  options: DocumentExportOptions,
  elementOrId?: HTMLElement | string | null
): Promise<void> {
  const cleanName = options.title.replace(/[^a-zA-Z0-9_\u0400-\u04FF]/g, '_');
  const filename = `${cleanName}_${new Date().toISOString().slice(0, 10)}.pdf`;

  // Find canvas target element if available
  let targetElement: HTMLElement | null = null;
  if (typeof elementOrId === 'string') {
    targetElement = document.getElementById(elementOrId);
  } else if (elementOrId instanceof HTMLElement) {
    targetElement = elementOrId;
  } else {
    targetElement = document.getElementById('official-document-canvas');
  }

  // If element is available in DOM, generate high-resolution multi-page PDF
  if (targetElement) {
    try {
      const canvas = await html2canvas(targetElement, {
        scale: 2, // 2x resolution for sharp crystal clear text
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: targetElement.scrollWidth,
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight, undefined, 'FAST');
        heightLeft -= pageHeight;
      }

      pdf.save(filename);
      return;
    } catch (err) {
      console.warn('Canvas-based PDF export encountered an error, falling back to direct jsPDF vector generator:', err);
    }
  }

  // Direct offline vector PDF generator fallback using jsPDF
  try {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const leftMargin = 30; // 30mm left (O‘zDSt 1157:2008)
    const rightMargin = 15; // 15mm right
    const topMargin = 20; // 20mm top
    const bottomMargin = 20; // 20mm bottom
    const pageWidth = 210;
    const pageHeight = 297;
    const printableWidth = pageWidth - leftMargin - rightMargin;

    let currentY = topMargin;

    // Header classification code if present
    if (options.classificationCode) {
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8.5);
      pdf.setTextColor(100, 116, 139);
      pdf.text(`Hujjat shifri: ${options.classificationCode}`, leftMargin, currentY);
      pdf.text(`Sana: ${options.documentDate || new Date().toLocaleDateString('uz-UZ')}`, pageWidth - rightMargin, currentY, { align: 'right' });
      currentY += 4;
      pdf.setDrawColor(203, 213, 225);
      pdf.line(leftMargin, currentY, pageWidth - rightMargin, currentY);
      currentY += 8;
    }

    const normalized = normalizeContractText(content);
    const lines = normalized.split('\n');

    pdf.setTextColor(15, 23, 42);

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) {
        currentY += 3;
        continue;
      }

      // Check if page needs to break
      if (currentY > pageHeight - bottomMargin - 10) {
        pdf.addPage();
        currentY = topMargin;
      }

      const isMainTitle = (line === line.toUpperCase() && line.length < 100 && !line.includes(':') && (
        line.includes('SHARTNOMA') || line.includes('ARIZA') || line.includes('BUYRUQ') || line.includes('DA‘VO') || line.includes('TALABNOMA')
      ));

      const isSectionHeader = /^[0-9]+\.\s+[A-ZА-ЯЁO‘G‘SHCH\s\(\)\,\-\/]{3,}$/.test(line);

      if (isMainTitle) {
        pdf.setFont('times', 'bold');
        pdf.setFontSize(15);
        const splitTitle = pdf.splitTextToSize(line, printableWidth);
        pdf.text(splitTitle, pageWidth / 2, currentY, { align: 'center' });
        currentY += splitTitle.length * 6 + 4;
      } else if (isSectionHeader) {
        if (currentY > pageHeight - bottomMargin - 20) {
          pdf.addPage();
          currentY = topMargin;
        }
        pdf.setFont('times', 'bold');
        pdf.setFontSize(12);
        const splitSec = pdf.splitTextToSize(line, printableWidth);
        pdf.text(splitSec, leftMargin, currentY);
        currentY += splitSec.length * 5 + 3;
      } else {
        pdf.setFont('times', 'normal');
        pdf.setFontSize(11);
        const splitText = pdf.splitTextToSize(line, printableWidth);
        // Indent first line by 10mm if not a single short detail
        if (splitText.length > 0) {
          pdf.text(splitText, leftMargin + 8, currentY);
          currentY += splitText.length * 4.8 + 2;
        }
      }
    }

    pdf.save(filename);
    return;
  } catch (vectorErr) {
    console.warn('Vector PDF generation also failed, opening system print dialog:', vectorErr);
  }

  // Final fallback to native print-to-PDF
  printDocument(content, options);
}


/**
 * Export document as plain text (.txt)
 */
export function exportToPlainText(content: string, options: DocumentExportOptions): void {
  const normalized = normalizeContractText(content);
  const blob = new Blob([normalized], { type: 'text/plain;charset=utf-8' });
  const cleanName = options.title.replace(/[^a-zA-Z0-9_\u0400-\u04FF]/g, '_');
  const filename = `${cleanName}_${new Date().toISOString().slice(0, 10)}.txt`;
  
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}
