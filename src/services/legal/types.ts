/**
 * Centralized Legal Status & Source Data Models for LEXAI UZ
 * Enforces fail-closed, version-aware, and date-sensitive legal representation.
 */

export type LegalDocumentStatus = 
  | 'DOC_IN_FORCE'           // Hujjat to'liq amalda
  | 'DOC_REPEALED'           // Hujjat o'z kuchini yo'qotgan (bekor qilingan)
  | 'DOC_AMENDED'            // Hujjatga o'zgartishlar kiritilgan
  | 'DOC_FUTURE_EFFECTIVE'   // Hujjat hali kuchga kirmagan (kelajakdagi sana)
  | 'DOC_STATUS_UNKNOWN';    // Maqomi aniqlanmagan (tekshirib bo'lmadi)

export type LegalProvisionStatus =
  | 'PROVISION_IN_FORCE'           // Norma ayni paytda amalda
  | 'PROVISION_AMENDED'            // Normaga o'zgartish kiritilgan (yangi tahrirda)
  | 'PROVISION_REPEALED'           // Norma bekor qilingan (chiqarib tashlangan)
  | 'PROVISION_FUTURE_EFFECTIVE'   // Norma hali kuchga kirmagan
  | 'PROVISION_HISTORICAL_APPLICABLE' // Norma o'tmishdagi ma'lum sanada amalda bo'lgan
  | 'PROVISION_NOT_FOUND'          // Modda hujjatda topilmadi
  | 'PROVISION_STATUS_UNKNOWN';    // Normaning amaldagi maqomi noma'lum

export type VerificationVerdict =
  | 'VERIFIED_CURRENT'        // Rasmiy manba orqali amaldagi tahrir ekanligi tasdiqlangan
  | 'VERIFIED_HISTORICAL'     // Ko'rsatilgan tarixiy sana uchun amalda bo'lganligi tasdiqlangan
  | 'VERIFIED_AMENDED'        // O'zgartirish kiritilganligi va yangi tahriri mavjudligi tasdiqlangan
  | 'REPEALED'                // Rasmiy dalillar asosida bekor qilinganligi tasdiqlangan
  | 'FUTURE_EFFECTIVE'        // Kuchga kirish sanasi kelajakda
  | 'ARTICLE_NOT_FOUND'       // Hujjat mavjud, ammo ko'rsatilgan modda/band unda yo'q
  | 'TEXT_MISMATCH'           // Iqtibos rasmiy matnga mos kelmadi
  | 'URL_MISMATCH'            // Havola rasmiy Lex.uz standartiga mos emas
  | 'UNVERIFIED'              // Tasdiqlovchi dalillar yetarli emas
  | 'SOURCE_UNAVAILABLE'      // Rasmiy manba bilan bog'lanib bo'lmadi (tarmoq/server xatosi)
  | 'STATUS_UNKNOWN'          // Huquqiy maqom aniqlanmadi
  | 'CITATION_MISMATCH'       // Ko'rsatilgan hujjat va modda o'rtasida nomutanosiblik
  | 'STALE_CACHE';            // Kesh muddati o'tgan, qayta tekshirish talab etiladi

export interface ProvisionVersionRecord {
  versionId: string;
  versionNumber: number;
  content: string;
  validFrom: string;          // ISO Date "YYYY-MM-DD"
  validUntil?: string;        // ISO Date yoki bo'sh (hali amalda bo'lsa)
  amendingLaw?: string;       // Masalan: "O'RQ-798-son Qonun"
  amendmentDate?: string;
  versionStatus: 'ACTIVE' | 'SUPERSEDED' | 'REPEALED';
  sourceChecksum: string;
}

export interface OfficialProvisionRecord {
  provisionId: string;        // Masalan: "mk-2023-art-161"
  documentId: string;         // Masalan: "lex-6257288"
  articleNumber: string;      // Masalan: "161-modda"
  articleTitle: string;       // Masalan: "Mehnat shartnomasini ish beruvchining tashabbusi bilan bekor qilish asoslari"
  chapterNumber?: string;
  chapterTitle?: string;
  partNumber?: string;
  paragraphNumber?: string;
  officialArticleUrl: string; // Masalan: "https://lex.uz/docs/6257288#6258920"
  currentContent: string;
  currentVersionId: string;
  provisionStatus: LegalProvisionStatus;
  effectiveFrom: string;
  effectiveUntil?: string;
  repealDate?: string;
  keywords: string[];
  versions: ProvisionVersionRecord[];
  lastAmendedLaw?: string;
  notes?: string;
}

export interface OfficialDocumentRecord {
  documentId: string;         // Lex.uz docId (masalan: "6257288")
  officialDocumentNumber: string; // Masalan: "O‘RQ-798-son"
  officialTitle: string;      // Masalan: "O‘zbekiston Respublikasining Mehnat kodeksi"
  shortTitle: string;         // Masalan: "Mehnat kodeksi"
  documentType: 'Kodeks' | 'Qonun' | 'Prezident Farmoni' | 'Prezident Qarori' | 'Vazirlar Mahkamasi Qarori' | 'Konstitutsiya' | 'Boshqa';
  officialSourceUrl: string;  // Masalan: "https://lex.uz/docs/6257288"
  adoptionDate: string;       // Qabul qilingan sana "2022-10-28"
  publicationDate?: string;   // Rasmiy e'lon qilingan sana
  effectiveFrom: string;      // Kuchga kirgan sana "2023-04-30"
  effectiveUntil?: string;    // Agar butun hujjat bekor bo'lgan bo'lsa
  repealDate?: string;        // Bekor bo'lgan sana
  documentStatus: LegalDocumentStatus;
  provisions: OfficialProvisionRecord[];
  sourceRetrievedAt: string;  // ISO Timestamp
  sourceLastModifiedAt?: string;
  sourceChecksum: string;     // SHA-256 yoki FNV xesh
  lastVerifiedAt: string;     // ISO Timestamp
  verificationMethod: 'OFFICIAL_SNAPSHOT' | 'LEXUZ_LIVE_INTEGRATION' | 'MANUAL_OFFICIAL_INGEST';
  verificationEvidence?: string;
}

export interface VerificationEvidenceRecord {
  verdict: VerificationVerdict;
  documentResolved: boolean;
  articleResolved: boolean;
  matchedDocumentName?: string;
  matchedLawNumber?: string;
  matchedArticleNumber?: string;
  matchedOfficialUrl?: string;
  canonicalDocId?: string;
  isCurrentInForce: boolean;
  effectiveFrom?: string;
  effectiveUntil?: string;
  targetDateContext: string;  // Tekshirish amalga oshirilgan sana (masalan "2026-10-12" yoki tarixiy "2021-05-01")
  textMatchRatio: number;     // 0.0 dan 1.0 gacha
  quoteExactMatch: boolean;
  discrepancies: string[];
  evidenceSummary: string;
  sourceChecksum?: string;
  lastVerifiedAt: string;
  verificationMethod: string;
  failureReason?: string;
  applicableHistoricalPeriod?: {
    from: string;
    until: string;
  };
  recommendedReplacement?: {
    documentName: string;
    articleNumber: string;
    lexUrl: string;
    explanation: string;
  };
}

export interface MacroValueRecord {
  indicatorKey: 'BHM' | 'MHTEKM' | 'PENSIYA_EKM' | 'PENALTY_CAP_RATIO' | 'GENERAL_LIMITATION_YEARS' | 'LABOR_DISPUTE_LIMITATION_MONTHS';
  name: string;
  value: number;
  unit: 'UZS' | 'PERCENT' | 'YEARS' | 'MONTHS' | 'DAYS';
  legalBasis: string;
  sourceUrl: string;
  effectiveFrom: string;
  effectiveUntil?: string;
  lastVerifiedAt: string;
  notes?: string;
}

export interface CacheEntryMetadata {
  cacheKey: string;
  documentId: string;
  articleNumber: string;
  versionId: string;
  targetDate: string;
  sourceChecksum: string;
  cachedAt: number;          // epoch ms
  expiresAt: number;         // epoch ms
  verdict: VerificationVerdict;
  payload: any;
}
