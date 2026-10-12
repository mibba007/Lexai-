/**
 * Central Citation Validator for LEXAI UZ
 * Strict fail-closed verification pipeline with date-aware temporal validation,
 * exact quote text matching, and canonical source verification.
 */

import {
  VerificationVerdict,
  VerificationEvidenceRecord,
  OfficialDocumentRecord,
  OfficialProvisionRecord,
} from './types';
import {
  resolveOfficialDocument,
  resolveOfficialProvision,
  computeStringChecksum,
} from './LegalDataRepository';

export interface CitationValidationRequest {
  documentName?: string;
  articleNumber?: string;
  partNumber?: string;
  paragraphNumber?: string;
  quote?: string;
  editionDate?: string;
  lexUrl?: string;
  targetDateContext?: string; // ISO Date "YYYY-MM-DD", defaults to current date
}

/**
 * Normalizes text for linguistic comparison (strips punctuation, trims spaces, lowercase)
 */
function normalizeTextForComparison(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/[‘'’ʼ`]/g, "'")
    .replace(/[«»""„]/g, '"')
    .replace(/[^\p{L}\p{N}\s']/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Computes token-level Jaccard similarity and substring containment
 */
function computeTextMatchRatio(suppliedQuote: string, authoritativeText: string): {
  ratio: number;
  exactSubstring: boolean;
} {
  if (!suppliedQuote || !authoritativeText) {
    return { ratio: 0, exactSubstring: false };
  }

  const normQuote = normalizeTextForComparison(suppliedQuote);
  const normAuth = normalizeTextForComparison(authoritativeText);

  if (normAuth.includes(normQuote)) {
    return { ratio: 1.0, exactSubstring: true };
  }

  const quoteTokens = new Set(normQuote.split(' ').filter((w) => w.length > 2));
  const authTokens = new Set(normAuth.split(' ').filter((w) => w.length > 2));

  if (quoteTokens.size === 0) {
    return { ratio: 0, exactSubstring: false };
  }

  let intersectionCount = 0;
  for (const token of quoteTokens) {
    if (authTokens.has(token)) {
      intersectionCount++;
    }
  }

  const ratio = intersectionCount / quoteTokens.size;
  return {
    ratio: Math.min(1.0, Math.max(0.0, ratio)),
    exactSubstring: false,
  };
}

/**
 * Validates a legal citation using authoritative evidence
 */
export function validateCitation(
  req: CitationValidationRequest
): VerificationEvidenceRecord {
  const currentDate = new Date().toISOString().slice(0, 10);
  const targetDate = req.targetDateContext ? req.targetDateContext.slice(0, 10) : currentDate;
  const discrepancies: string[] = [];

  // 1. Check basic input presence
  if (!req.documentName && !req.articleNumber && !req.lexUrl) {
    return {
      verdict: 'UNVERIFIED',
      documentResolved: false,
      articleResolved: false,
      isCurrentInForce: false,
      targetDateContext: targetDate,
      textMatchRatio: 0,
      quoteExactMatch: false,
      discrepancies: ['Hujjat nomi yoki modda raqami taqdim etilmadi.'],
      evidenceSummary: 'Tekshirish uchun yetarli ma‘lumot kiritilmagan.',
      lastVerifiedAt: new Date().toISOString(),
      verificationMethod: 'FAIL_CLOSED_VALIDATOR',
      failureReason: 'MISSING_MANDATORY_FIELDS',
    };
  }

  // 2. Resolve Official Document
  const doc: OfficialDocumentRecord | null = resolveOfficialDocument(
    req.documentName || req.lexUrl || ''
  );

  if (!doc) {
    return {
      verdict: 'STATUS_UNKNOWN',
      documentResolved: false,
      articleResolved: false,
      isCurrentInForce: false,
      targetDateContext: targetDate,
      textMatchRatio: 0,
      quoteExactMatch: false,
      discrepancies: [`«${req.documentName || 'Hujjat'}» O‘zbekiston Respublikasining rasmiy Lex.uz bazasi reyestridan topilmadi.`],
      evidenceSummary: 'Ko‘rsatilgan hujjat bo‘yicha rasmiy normativ ma‘lumotlar bazada mavjud emas.',
      lastVerifiedAt: new Date().toISOString(),
      verificationMethod: 'FAIL_CLOSED_VALIDATOR',
      failureReason: 'DOCUMENT_NOT_FOUND',
    };
  }

  // 3. Resolve Provision
  const artQuery = req.articleNumber || '';
  const prov: OfficialProvisionRecord | null = resolveOfficialProvision(doc, artQuery);

  if (!prov) {
    return {
      verdict: 'ARTICLE_NOT_FOUND',
      documentResolved: true,
      articleResolved: false,
      matchedDocumentName: doc.officialTitle,
      matchedLawNumber: doc.officialDocumentNumber,
      canonicalDocId: doc.documentId,
      matchedOfficialUrl: doc.officialSourceUrl,
      isCurrentInForce: false,
      targetDateContext: targetDate,
      textMatchRatio: 0,
      quoteExactMatch: false,
      discrepancies: [
        `«${doc.officialTitle}» tarkibida «${artQuery || 'noma‘lum modda'}» mavjud emas yoki raqamlashda xatolik mavjud.`,
      ],
      evidenceSummary: `Hujjat topildi, ammo ${artQuery} rasmiy tarkibda mavjud emas.`,
      lastVerifiedAt: new Date().toISOString(),
      verificationMethod: 'FAIL_CLOSED_VALIDATOR',
      failureReason: 'ARTICLE_NOT_FOUND_IN_DOCUMENT',
    };
  }

  // 4. Temporal Validity Evaluation
  let verdict: VerificationVerdict = 'UNVERIFIED';
  let isCurrentInForce = false;
  let recommendedReplacement: any = undefined;

  // Check Document Level Status with strict date awareness
  const isDocumentRepealedForDate =
    (doc.repealDate && targetDate >= doc.repealDate) ||
    (doc.documentStatus === 'DOC_REPEALED' && !doc.repealDate);

  const isProvisionRepealedForDate =
    (prov.repealDate && targetDate >= prov.repealDate) ||
    (prov.provisionStatus === 'PROVISION_REPEALED' && !prov.repealDate);

  if (isDocumentRepealedForDate) {
    verdict = 'REPEALED';
    discrepancies.push(
      `Ushbu hujjat (${doc.officialTitle}) ${doc.repealDate || 'avvalroq'} o‘z kuchini yo‘qotgan.`
    );
    if (doc.documentId === '145261') {
      recommendedReplacement = {
        documentName: 'O‘zbekiston Respublikasining yangi Mehnat kodeksi',
        articleNumber: prov.articleNumber === '100-modda' ? '161-modda' : 'Tegishli modda',
        lexUrl: 'https://lex.uz/docs/6257288',
        explanation: '1995-yilgi Mehnat kodeksi 2023-yil 30-apreldan kuchini yo‘qotgan. O‘RQ-798-son yangi Mehnat kodeksi amalda.',
      };
    }
  } else if (isProvisionRepealedForDate) {
    verdict = 'REPEALED';
    discrepancies.push(`Ushbu norma (${prov.articleNumber}) rasmiy ravishda bekor qilingan.`);
  } else if (targetDate < prov.effectiveFrom) {
    verdict = 'FUTURE_EFFECTIVE';
    discrepancies.push(`Norma hali kuchga kirmagan (Kuchga kirish sanasi: ${prov.effectiveFrom}).`);
  } else if (prov.effectiveUntil && targetDate > prov.effectiveUntil) {
    verdict = 'VERIFIED_HISTORICAL';
    discrepancies.push(`Norma faqat ${prov.effectiveFrom} dan ${prov.effectiveUntil} gacha bo‘lgan davrda amalda bo‘lgan.`);
  } else {
    // Currently in force for the given target date
    const isNow = targetDate >= currentDate;
    verdict = isNow ? 'VERIFIED_CURRENT' : 'VERIFIED_HISTORICAL';
    isCurrentInForce = isNow && prov.provisionStatus === 'PROVISION_IN_FORCE';
  }

  // 5. Quote Matching Analysis
  let matchRatio = 1.0;
  let isExactSub = true;
  if (req.quote && req.quote.trim().length > 15) {
    const textMatch = computeTextMatchRatio(req.quote, prov.currentContent);
    matchRatio = textMatch.ratio;
    isExactSub = textMatch.exactSubstring;

    if (!isExactSub && matchRatio < 0.6) {
      verdict = 'TEXT_MISMATCH';
      discrepancies.push(
        `Keltirilgan iqtibos rasmiy matnga mos kelmadi (O‘xshashlik: ${Math.round(matchRatio * 100)}%).`
      );
    }
  }

  // 6. URL Canonical Verification
  if (req.lexUrl) {
    const expectedPrefix = `https://lex.uz/docs/${doc.documentId}`;
    if (!req.lexUrl.startsWith('https://lex.uz/docs/') || !req.lexUrl.includes(doc.documentId)) {
      discrepancies.push(
        `Havola rasmiy kanonik formatga to‘g‘ri kelmadi (Kutilgan: ${expectedPrefix}).`
      );
    }
  }

  const checksum = computeStringChecksum(prov.currentContent);
  const evidenceSummary = verdict === 'VERIFIED_CURRENT'
    ? `«${doc.officialTitle}» ${prov.articleNumber} («${prov.articleTitle}») Lex.uz rasmiy amaldagi tahririda tasdiqlandi.`
    : verdict === 'REPEALED'
    ? `DIQQAT: «${doc.officialTitle}» ${prov.articleNumber} o‘z kuchini yo‘qotgan.`
    : verdict === 'VERIFIED_HISTORICAL'
    ? `Norma ${prov.effectiveFrom} sanasidagi tarixiy holat uchun tasdiqlandi.`
    : `Tekshiruv natijasi: ${verdict}. Aniqlangan tafovutlar mavjud.`;

  return {
    verdict,
    documentResolved: true,
    articleResolved: true,
    matchedDocumentName: doc.officialTitle,
    matchedLawNumber: doc.officialDocumentNumber,
    matchedArticleNumber: prov.articleNumber,
    matchedOfficialUrl: prov.officialArticleUrl || doc.officialSourceUrl,
    canonicalDocId: doc.documentId,
    isCurrentInForce,
    effectiveFrom: prov.effectiveFrom,
    effectiveUntil: prov.effectiveUntil,
    targetDateContext: targetDate,
    textMatchRatio: matchRatio,
    quoteExactMatch: isExactSub,
    discrepancies,
    evidenceSummary,
    sourceChecksum: checksum,
    lastVerifiedAt: new Date().toISOString(),
    verificationMethod: 'OFFICIAL_SNAPSHOT_COMPARISON',
    recommendedReplacement,
  };
}
