import { LegalCitation, MetadataVersionStampComparison } from '../types';
import { UZBEKISTAN_LAWS_DATABASE, OBSOLETE_LAW_MAPPINGS } from '../data/lawsDatabase';
import { validateCitation } from '../services/legal/CitationValidator';

export interface CanonicalDocMeta {
  codeTag: string;
  officialName: string;
  lawNumber: string;
  effectiveDate: string;
  status: 'CURRENT' | 'HISTORICAL';
  lexUrl: string;
  lastAmendedLaw: string;
}

const CANONICAL_DOCS: Record<string, CanonicalDocMeta> = {
  mehnat: {
    codeTag: 'MK',
    officialName: 'O‘zbekiston Respublikasi Mehnat kodeksi',
    lawNumber: 'O‘RQ-798-son',
    effectiveDate: '2023-04-30',
    status: 'CURRENT',
    lexUrl: 'https://lex.uz/docs/6257288',
    lastAmendedLaw: 'O‘RQ-798-son Qonun (28.10.2022)',
  },
  fuqarolik: {
    codeTag: 'FK',
    officialName: 'O‘zbekiston Respublikasi Fuqarolik kodeksi',
    lawNumber: '166-I-son',
    effectiveDate: '1997-03-01',
    status: 'CURRENT',
    lexUrl: 'https://lex.uz/docs/111189',
    lastAmendedLaw: 'O‘zR qonunlari bilan kiritilgan amaldagi o‘zgartishlar (2026)',
  },
  soliq: {
    codeTag: 'SK',
    officialName: 'O‘zbekiston Respublikasi Soliq kodeksi',
    lawNumber: 'O‘RQ-599-son',
    effectiveDate: '2020-01-01',
    status: 'CURRENT',
    lexUrl: 'https://lex.uz/docs/4674902',
    lastAmendedLaw: 'O‘RQ-812-son va O‘RQ-891-son qonunlari (2026-yil amaldagi tahrir)',
  },
  oila: {
    codeTag: 'OK',
    officialName: 'O‘zbekiston Respublikasi Oila kodeksi',
    lawNumber: '607-I-son',
    effectiveDate: '1998-09-01',
    status: 'CURRENT',
    lexUrl: 'https://lex.uz/docs/104720',
    lastAmendedLaw: 'O‘RQ-829-son Qonuni',
  },
  mamuriy: {
    codeTag: 'MJTK',
    officialName: 'Ma’muriy javobgarlik to‘g‘risidagi kodeks',
    lawNumber: '2015-XII-son',
    effectiveDate: '1995-04-01',
    status: 'CURRENT',
    lexUrl: 'https://lex.uz/docs/97664',
    lastAmendedLaw: 'O‘zR so‘nggi amaldagi tahriri (2026)',
  },
  jinoyat: {
    codeTag: 'JK',
    officialName: 'O‘zbekiston Respublikasi Jinoyat kodeksi',
    lawNumber: '2012-XII-son',
    effectiveDate: '1995-04-01',
    status: 'CURRENT',
    lexUrl: 'https://lex.uz/docs/111453',
    lastAmendedLaw: 'O‘zR Qonunlari bilan kiritilgan amaldagi modifikatsiyalar',
  },
  fpk: {
    codeTag: 'FPK',
    officialName: 'Fuqarolik protsessual kodeksi',
    lawNumber: 'O‘RQ-461-son',
    effectiveDate: '2018-04-01',
    status: 'CURRENT',
    lexUrl: 'https://lex.uz/docs/3517337',
    lastAmendedLaw: 'O‘RQ-887-son Qonuni',
  },
  ipk: {
    codeTag: 'IPK',
    officialName: 'Iqtisodiy protsessual kodeksi',
    lawNumber: 'O‘RQ-462-son',
    effectiveDate: '2018-04-01',
    status: 'CURRENT',
    lexUrl: 'https://lex.uz/docs/3518496',
    lastAmendedLaw: 'O‘RQ-887-son Qonuni',
  },
  konstitutsiya: {
    codeTag: 'KONST',
    officialName: 'O‘zbekiston Respublikasi Konstitutsiyasi',
    lawNumber: 'Yangi Tahrir 2023',
    effectiveDate: '2023-05-01',
    status: 'CURRENT',
    lexUrl: 'https://lex.uz/docs/6445145',
    lastAmendedLaw: '2023-yil 30-aprel umumxalq referendumi',
  },
  istemolchi: {
    codeTag: 'IHQHQ',
    officialName: 'Iste’molchilarning huquqlarini himoya qilish to‘g‘risidagi qonun',
    lawNumber: '221-I-son',
    effectiveDate: '1996-04-26',
    status: 'CURRENT',
    lexUrl: 'https://lex.uz/docs/440',
    lastAmendedLaw: 'O‘zR amaldagi normativ bazasi',
  },
  mchj: {
    codeTag: 'MCHJ',
    officialName: 'Mas’uliyati cheklangan jamiyatlar to‘g‘risidagi qonun',
    lawNumber: '310-II-son',
    effectiveDate: '2001-12-06',
    status: 'CURRENT',
    lexUrl: 'https://lex.uz/docs/24444',
    lastAmendedLaw: 'O‘zR amaldagi tahriri',
  },
  xarid: {
    codeTag: 'DXQ',
    officialName: 'Davlat xaridlari to‘g‘risidagi qonun',
    lawNumber: 'O‘RQ-684-son',
    effectiveDate: '2021-07-22',
    status: 'CURRENT',
    lexUrl: 'https://lex.uz/docs/5382974',
    lastAmendedLaw: 'O‘RQ-684-son',
  },
};

/**
 * Identify canonical document metadata based on document name or law number
 */
export function resolveCanonicalDoc(docName: string, lawNumber?: string): CanonicalDocMeta {
  const norm = `${docName} ${lawNumber || ''}`.toLowerCase();

  if (norm.includes('mehnat') || norm.includes('mk') || norm.includes('798')) {
    return CANONICAL_DOCS.mehnat;
  }
  if (norm.includes('soliq') || norm.includes('sk') || norm.includes('599')) {
    return CANONICAL_DOCS.soliq;
  }
  if (norm.includes('fuqarolik protsessual') || norm.includes('fpk')) {
    return CANONICAL_DOCS.fpk;
  }
  if (norm.includes('iqtisodiy protsessual') || norm.includes('ipk')) {
    return CANONICAL_DOCS.ipk;
  }
  if (norm.includes('fuqarolik') || norm.includes('fk')) {
    return CANONICAL_DOCS.fuqarolik;
  }
  if (norm.includes('oila') || norm.includes('ok')) {
    return CANONICAL_DOCS.oila;
  }
  if (norm.includes('ma’muriy') || norm.includes('mjtk')) {
    return CANONICAL_DOCS.mamuriy;
  }
  if (norm.includes('jinoyat') || norm.includes('jk')) {
    return CANONICAL_DOCS.jinoyat;
  }
  if (norm.includes('konstitutsiya')) {
    return CANONICAL_DOCS.konstitutsiya;
  }
  if (norm.includes('iste’molchi') || norm.includes('iste’mol')) {
    return CANONICAL_DOCS.istemolchi;
  }
  if (norm.includes('jamiyat') || norm.includes('mchj')) {
    return CANONICAL_DOCS.mchj;
  }
  if (norm.includes('xarid') || norm.includes('tender')) {
    return CANONICAL_DOCS.xarid;
  }

  // Fallback generic
  return {
    codeTag: 'LAW',
    officialName: docName || 'O‘zbekiston Respublikasi Qonuni',
    lawNumber: lawNumber || 'O‘zR Qonunchiligi',
    effectiveDate: '2023-01-01',
    status: 'CURRENT',
    lexUrl: 'https://lex.uz',
    lastAmendedLaw: 'Lex.uz amaldagi reyestri',
  };
}

/**
 * Clean article digits (e.g. "161-modda" -> "161")
 */
export function extractArticleDigits(articleNumber: string): string {
  const match = (articleNumber || '').match(/\d+/);
  return match ? match[0] : articleNumber.replace(/\s+/g, '');
}

/**
 * Check if a citation is referencing an obsolete/repealed law
 */
export function checkObsoleteViolation(docName: string, artNumber: string): { isObsolete: boolean; reason?: string; replacement?: string } {
  const norm = `${docName} ${artNumber}`.toLowerCase();
  const digits = extractArticleDigits(artNumber);

  // 1. Check against OBSOLETE_LAW_MAPPINGS
  for (const obs of OBSOLETE_LAW_MAPPINGS) {
    if (
      norm.includes(obs.obsoleteTerm.toLowerCase()) ||
      (obs.obsoleteArticle && norm.includes(obs.obsoleteArticle.toLowerCase())) ||
      (norm.includes('1995') && norm.includes('mehnat')) ||
      (norm.includes('mehnat') && digits === '100') ||
      (norm.includes('mehnat') && digits === '134')
    ) {
      return {
        isObsolete: true,
        reason: obs.explanation,
        replacement: `${obs.currentLaw} - ${obs.currentArticle}`,
      };
    }
  }

  // Old 1995 Labor Code indicators
  if (norm.includes('1995-yil') || (norm.includes('mehnat') && norm.includes('1995'))) {
    return {
      isObsolete: true,
      reason: '1995-yilgi eski Mehnat kodeksi 2023-yil 30-apreldan to‘liq o‘z kuchini yo‘qotgan.',
      replacement: 'O‘zbekiston Respublikasining yangi Mehnat kodeksi (O‘RQ-798-son)',
    };
  }

  return { isObsolete: false };
}

/**
 * Generate AI Citation Version Stamp
 * Example: "AI:MK:ORQ-798:161:2023.04.30:CURRENT"
 */
export function generateAiVersionStamp(citation: {
  documentName: string;
  lawNumber?: string;
  articleNumber: string;
  editionDate?: string;
  status?: string;
}): string {
  const doc = resolveCanonicalDoc(citation.documentName, citation.lawNumber);
  const digits = extractArticleDigits(citation.articleNumber);
  const lawClean = (citation.lawNumber || doc.lawNumber).replace(/[^a-zA-Z0-9-]/g, '');
  const statusClean = (citation.status || 'CURRENT').toUpperCase();
  const dateClean = (citation.editionDate || doc.effectiveDate).replace(/[^0-9.]/g, '').slice(0, 10) || doc.effectiveDate.replace(/-/g, '.');

  return `AI:${doc.codeTag}:${lawClean || 'LAW'}:${digits}:${dateClean}:${statusClean}`;
}

/**
 * Generate Official Lex.uz Metadata Version Stamp
 * Example: "LEXUZ:MK:ORQ-798:161:2023.04.30:CURRENT"
 */
export function generateLexVersionStamp(
  doc: CanonicalDocMeta,
  articleNumber: string,
  currentStatus: 'CURRENT' | 'HISTORICAL' | 'REPEALED' = 'CURRENT'
): string {
  const digits = extractArticleDigits(articleNumber);
  const lawClean = doc.lawNumber.replace(/[^a-zA-Z0-9-]/g, '');
  const dateClean = doc.effectiveDate.replace(/-/g, '.');

  return `LEXUZ:${doc.codeTag}:${lawClean}:${digits}:${dateClean}:${currentStatus}`;
}

/**
 * Generates cryptographic-style verification stamp hash
 */
export function generateStampHash(
  docTag: string,
  digits: string,
  effectiveDate: string,
  status: string
): string {
  const seed = `${docTag}-${digits}-${effectiveDate}-${status}`.toUpperCase();
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).toUpperCase().padStart(8, '0');
  return `LEX-STAMP-${docTag}${digits}-${hex.slice(0, 6)}`;
}

/**
 * Compares AI metadata version stamp with live Lex.uz registered stamp
 */
export function compareMetadataVersionStamps(citation: LegalCitation): MetadataVersionStampComparison {
  const doc = resolveCanonicalDoc(citation.documentName, citation.lawNumber);
  const digits = extractArticleDigits(citation.articleNumber);
  const obsCheck = checkObsoleteViolation(citation.documentName, citation.articleNumber);

  // Use authoritative CitationValidator
  const validation = validateCitation({
    documentName: citation.documentName,
    articleNumber: citation.articleNumber,
    quote: citation.quote,
    lexUrl: citation.lexUrl,
    editionDate: citation.editionDate,
  });

  const discrepancies: string[] = [...validation.discrepancies];
  let isVersionMatch = validation.verdict === 'VERIFIED_CURRENT';
  let lexCurrentStatus: 'CURRENT' | 'HISTORICAL' | 'REPEALED' | 'RECENTLY_AMENDED' | 'UNVERIFIED' = 
    validation.verdict === 'VERIFIED_CURRENT' 
      ? 'CURRENT' 
      : validation.verdict === 'REPEALED' 
      ? 'REPEALED' 
      : validation.verdict === 'VERIFIED_HISTORICAL' 
      ? 'HISTORICAL' 
      : 'UNVERIFIED';

  if (!validation.documentResolved) {
    isVersionMatch = false;
    lexCurrentStatus = 'UNVERIFIED';
    discrepancies.push(`Hujjat aniqlanmadi: «${citation.documentName || 'Noma‘lum'}» rasmiy reyestrdan topilmadi.`);
  } else if (!validation.articleResolved) {
    isVersionMatch = false;
    lexCurrentStatus = 'UNVERIFIED';
    discrepancies.push(`Modda topilmadi: «${citation.articleNumber || 'Noma‘lum'}» ko‘rsatilgan hujjat tarkibida mavjud emas.`);
  }

  // 1. Obsolete Check
  if (obsCheck.isObsolete || citation.status === 'HISTORICAL' || validation.verdict === 'REPEALED') {
    isVersionMatch = false;
    lexCurrentStatus = 'REPEALED';
    if (!discrepancies.some((d) => d.includes('kuchini yo‘qotgan') || d.includes('bekor'))) {
      discrepancies.push(obsCheck.reason || 'Keltirilgan norma Lex.uz reyestri bo‘yicha o‘z kuchini yo‘qotgan (eski tahrir).');
    }
  }

  const aiVersionStamp = citation.versionStamp || generateAiVersionStamp(citation);
  const lexVersionStamp = generateLexVersionStamp(
    doc,
    citation.articleNumber,
    lexCurrentStatus === 'CURRENT' ? 'CURRENT' : lexCurrentStatus === 'REPEALED' ? 'REPEALED' : 'HISTORICAL'
  );
  const versionStampHash = generateStampHash(doc.codeTag, digits, doc.effectiveDate, lexCurrentStatus);

  return {
    aiVersionStamp,
    lexVersionStamp,
    isVersionMatch,
    lexCurrentStatus,
    lexEffectiveDate: validation.effectiveFrom || doc.effectiveDate,
    aiEditionDate: citation.editionDate || 'Amaldagi',
    lastAmendedLaw: validation.matchedLawNumber || doc.lastAmendedLaw,
    versionStampHash,
    discrepancies,
    isCurrent: lexCurrentStatus === 'CURRENT' && isVersionMatch && validation.isCurrentInForce,
    verifiedAt: new Date().toISOString(),
  };
}

/**
 * Audits all citations of an entire chat response
 */
export function auditAllMessageCitations(citations: LegalCitation[] = []) {
  if (!citations || citations.length === 0) {
    return {
      totalChecked: 0,
      matchedCurrent: 0,
      repealedOrOutdated: 0,
      allMatchCurrent: true,
      auditedAt: new Date().toISOString(),
      lexRegistryVersion: '2026.1-RELEASE',
      results: [] as MetadataVersionStampComparison[],
    };
  }

  const results = citations.map((c) => compareMetadataVersionStamps(c));
  const matchedCurrent = results.filter((r) => r.isCurrent).length;
  const repealedOrOutdated = results.length - matchedCurrent;

  return {
    totalChecked: results.length,
    matchedCurrent,
    repealedOrOutdated,
    allMatchCurrent: repealedOrOutdated === 0,
    auditedAt: new Date().toISOString(),
    lexRegistryVersion: '2026.1-RELEASE',
    results,
  };
}
