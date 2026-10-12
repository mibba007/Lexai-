/**
 * Lex.uz URL Proxy and Canonical Link Sanitization Utility
 * Guarantees that all links to Lex.uz use the official canonical HTTPS format,
 * strips fragile/malformed fragment hashes that cause browser/SPA errors,
 * intercepts any repealed/obsolete document IDs and upgrades them to the current in-force statute,
 * and handles potential HTTPS/domain redirections correctly within the browser context.
 */

export interface CanonicalLawInfo {
  docId: string;
  codeName: string;
  lawNumber: string;
  status: 'CURRENT';
  effectiveDate: string;
}

// Official registry of major Uzbekistan codes and statutes with verified Lex.uz document IDs
export const CANONICAL_LEX_REGISTRY: Record<string, CanonicalLawInfo> = {
  // Yangi Mehnat kodeksi (O‘RQ-798-son, 2023)
  mk: {
    docId: '6257288',
    codeName: 'O‘zbekiston Respublikasining Mehnat kodeksi',
    lawNumber: 'O‘RQ-798-son',
    status: 'CURRENT',
    effectiveDate: '2023-04-30',
  },
  // Fuqarolik kodeksi (1-qism)
  fk: {
    docId: '111189',
    codeName: 'O‘zbekiston Respublikasining Fuqarolik kodeksi (1-qism)',
    lawNumber: '166-I-son',
    status: 'CURRENT',
    effectiveDate: '1997-03-01',
  },
  // Fuqarolik kodeksi (2-qism)
  fk2: {
    docId: '180550',
    codeName: 'O‘zbekiston Respublikasining Fuqarolik kodeksi (2-qism)',
    lawNumber: '256-I-son',
    status: 'CURRENT',
    effectiveDate: '1997-03-01',
  },
  // Yangi Soliq kodeksi (O‘RQ-599-son, 2020)
  sk: {
    docId: '4674902',
    codeName: 'O‘zbekiston Respublikasining Soliq kodeksi',
    lawNumber: 'O‘RQ-599-son',
    status: 'CURRENT',
    effectiveDate: '2020-01-01',
  },
  // Oila kodeksi
  ok: {
    docId: '104720',
    codeName: 'O‘zbekiston Respublikasining Oila kodeksi',
    lawNumber: '607-I-son',
    status: 'CURRENT',
    effectiveDate: '1998-09-01',
  },
  // Ma’muriy javobgarlik to‘g‘risidagi kodeks
  mjtk: {
    docId: '97664',
    codeName: 'Ma’muriy javobgarlik to‘g‘risidagi kodeks',
    lawNumber: '2015-XII-son',
    status: 'CURRENT',
    effectiveDate: '1995-04-01',
  },
  // Jinoyat kodeksi
  jk: {
    docId: '111453',
    codeName: 'O‘zbekiston Respublikasining Jinoyat kodeksi',
    lawNumber: '2012-XII-son',
    status: 'CURRENT',
    effectiveDate: '1995-04-01',
  },
  // Jinoyat-protsessual kodeksi
  jpk: {
    docId: '111460',
    codeName: 'Jinoyat-protsessual kodeksi',
    lawNumber: '2013-XII-son',
    status: 'CURRENT',
    effectiveDate: '1995-04-01',
  },
  // Fuqarolik protsessual kodeksi
  fpk: {
    docId: '3517337',
    codeName: 'Fuqarolik protsessual kodeksi',
    lawNumber: 'O‘RQ-461-son',
    status: 'CURRENT',
    effectiveDate: '2018-04-01',
  },
  // Iqtisodiy protsessual kodeksi
  ipk: {
    docId: '3518496',
    codeName: 'Iqtisodiy protsessual kodeksi',
    lawNumber: 'O‘RQ-462-son',
    status: 'CURRENT',
    effectiveDate: '2018-04-01',
  },
  // Ma’muriy sud ishlarini yuritish to‘g‘risidagi kodeks
  msiyk: {
    docId: '3527353',
    codeName: 'Ma’muriy sud ishlarini yuritish to‘g‘risidagi kodeks',
    lawNumber: 'O‘RQ-464-son',
    status: 'CURRENT',
    effectiveDate: '2018-04-01',
  },
  // Yangi Konstitutsiya (2023)
  konst: {
    docId: '6445145',
    codeName: 'O‘zbekiston Respublikasi Konstitutsiyasi',
    lawNumber: 'Yangi tahrir 2023',
    status: 'CURRENT',
    effectiveDate: '2023-05-01',
  },
  // Iste’molchilar huquqlarini himoya qilish
  ihqhq: {
    docId: '440',
    codeName: 'Iste’molchilarning huquqlarini himoya qilish to‘g‘risida',
    lawNumber: '221-I-son',
    status: 'CURRENT',
    effectiveDate: '1996-04-26',
  },
  // Mas’uliyati cheklangan jamiyatlar to‘g‘risida (MCHJ)
  mchj: {
    docId: '24444',
    codeName: 'Mas’uliyati cheklangan jamiyatlar to‘g‘risida',
    lawNumber: '310-II-son',
    status: 'CURRENT',
    effectiveDate: '2001-12-06',
  },
  // Shartnomaviy-huquqiy baza to‘g‘risida
  shartnoma: {
    docId: '45781',
    codeName: 'Xo‘jalik yurituvchi subyektlar faoliyatining shartnomaviy-huquqiy bazasi to‘g‘risida',
    lawNumber: '670-I-son',
    status: 'CURRENT',
    effectiveDate: '1998-10-10',
  },
  // Davlat xaridlari to‘g‘risida (O‘RQ-684)
  dxq: {
    docId: '5382974',
    codeName: 'Davlat xaridlari to‘g‘risida',
    lawNumber: 'O‘RQ-684-son',
    status: 'CURRENT',
    effectiveDate: '2021-07-22',
  },
  // Sud hujjatlari va boshqa organlar hujjatlarini ijro etish to‘g‘risida
  ijro: {
    docId: '43836',
    codeName: 'Sud hujjatlari va boshqa organlar hujjatlarini ijro etish to‘g‘risida',
    lawNumber: '258-II-son',
    status: 'CURRENT',
    effectiveDate: '2001-08-29',
  },
  // Davlat boji to‘g‘risida
  davlatBoji: {
    docId: '4681020',
    codeName: 'Davlat boji to‘g‘risida',
    lawNumber: 'O‘RQ-600-son',
    status: 'CURRENT',
    effectiveDate: '2020-01-06',
  },
  // Raqobat to‘g‘risida (Yangi, 2023)
  raqobat: {
    docId: '6452295',
    codeName: 'Raqobat to‘g‘risida',
    lawNumber: 'O‘RQ-850-son',
    status: 'CURRENT',
    effectiveDate: '2023-10-04',
  },
  // Mehnatni muhofaza qilish to‘g‘risida
  mehnatMuhofaza: {
    docId: '3031427',
    codeName: 'Mehnatni muhofaza qilish to‘g‘risida',
    lawNumber: 'O‘RQ-410-son',
    status: 'CURRENT',
    effectiveDate: '2016-12-23',
  },
  // Shaxsga doir ma’lumotlar to‘g‘risida
  shaxsiyMalumot: {
    docId: '4396419',
    codeName: 'Shaxsga doir ma’lumotlar to‘g‘risida',
    lawNumber: 'O‘RQ-547-son',
    status: 'CURRENT',
    effectiveDate: '2019-10-01',
  },
  // Tadbirkorlik faoliyati erkinligining kafolatlari to‘g‘risida
  tadbirkorlik: {
    docId: '2006777',
    codeName: 'Tadbirkorlik faoliyati erkinligining kafolatlari to‘g‘risida',
    lawNumber: 'O‘RQ-328-son',
    status: 'CURRENT',
    effectiveDate: '2012-05-02',
  },
};

// Known Obsolete Document IDs that must be intercepted and upgraded to current in-force law
export const OBSOLETE_DOC_UPGRADES: Record<string, { currentDocId: string; lawName: string; reason: string }> = {
  // 1995-yilgi eski Mehnat kodeksi
  '145261': {
    currentDocId: '6257288',
    lawName: 'Yangi Mehnat kodeksi (O‘RQ-798-son)',
    reason: '1995-yilgi eski Mehnat kodeksi 2023-yil 30-apreldan kuchini yo‘qotgan.',
  },
  // Eski Soliq kodekslari
  '83295': {
    currentDocId: '4674902',
    lawName: 'Yangi Soliq kodeksi (O‘RQ-599-son)',
    reason: 'Eski Soliq kodeksi 2020-yil 1-yanvardan kuchini yo‘qotgan.',
  },
  '212888': {
    currentDocId: '4674902',
    lawName: 'Yangi Soliq kodeksi (O‘RQ-599-son)',
    reason: '2007-yilgi Soliq kodeksi 2020-yilda yangi tahrir bilan almashtirilgan.',
  },
  // 1992-yilgi eski Konstitutsiya
  '35850': {
    currentDocId: '6445145',
    lawName: 'Yangi Tahrirdagi Konstitutsiya (2023)',
    reason: '1992-yilgi Konstitutsiya 2023-yil 1-maydan yangi tahrirda qabul qilingan.',
  },
  // Eski Davlat xaridlari qonuni (2018)
  '36412': {
    currentDocId: '5382974',
    lawName: 'Yangi Davlat xaridlari to‘g‘risidagi qonun (O‘RQ-684-son)',
    reason: '2018-yilgi qonun 2021-yil 22-iyuldan kuchini yo‘qotgan.',
  },
  '4581404': {
    currentDocId: '5382974',
    lawName: 'Yangi Davlat xaridlari to‘g‘risidagi qonun (O‘RQ-684-son)',
    reason: '2021-yilgi yangi O‘RQ-684-son qonuniga almashtirilgan.',
  },
  // Eski Raqobat to‘g‘risidagi qonun
  '147986': {
    currentDocId: '6452295',
    lawName: 'Yangi Raqobat to‘g‘risidagi qonun (O‘RQ-850-son)',
    reason: 'Eski qonun 2023-yil 4-oktabrdan o‘z kuchini yo‘qotgan.',
  },
};

/**
 * Identify canonical document ID from document name or citation
 */
export function matchCanonicalDocId(docName: string = '', lawNumber: string = ''): string | null {
  const norm = `${docName} ${lawNumber}`.toLowerCase();

  if (norm.includes('mehnat') || norm.includes('mk') || norm.includes('798')) {
    return CANONICAL_LEX_REGISTRY.mk.docId;
  }
  if (norm.includes('soliq') || norm.includes('sk') || norm.includes('599')) {
    return CANONICAL_LEX_REGISTRY.sk.docId;
  }
  if (norm.includes('fuqarolik protsessual') || norm.includes('fpk') || norm.includes('461')) {
    return CANONICAL_LEX_REGISTRY.fpk.docId;
  }
  if (norm.includes('iqtisodiy protsessual') || norm.includes('ipk') || norm.includes('462')) {
    return CANONICAL_LEX_REGISTRY.ipk.docId;
  }
  if (norm.includes('fuqarolik') || norm.includes('fk')) {
    return CANONICAL_LEX_REGISTRY.fk.docId;
  }
  if (norm.includes('oila') || norm.includes('ok')) {
    return CANONICAL_LEX_REGISTRY.ok.docId;
  }
  if (norm.includes('ma’muriy javobgarlik') || norm.includes('mjtk')) {
    return CANONICAL_LEX_REGISTRY.mjtk.docId;
  }
  if (norm.includes('jinoyat-protsessual') || norm.includes('jpk')) {
    return CANONICAL_LEX_REGISTRY.jpk.docId;
  }
  if (norm.includes('jinoyat') || norm.includes('jk')) {
    return CANONICAL_LEX_REGISTRY.jk.docId;
  }
  if (norm.includes('ma’muriy sud') || norm.includes('msiyk')) {
    return CANONICAL_LEX_REGISTRY.msiyk.docId;
  }
  if (norm.includes('konstitutsiya')) {
    return CANONICAL_LEX_REGISTRY.konst.docId;
  }
  if (norm.includes('iste’molchi') || norm.includes('iste’mol')) {
    return CANONICAL_LEX_REGISTRY.ihqhq.docId;
  }
  if (norm.includes('mas’uliyati cheklangan') || norm.includes('mchj')) {
    return CANONICAL_LEX_REGISTRY.mchj.docId;
  }
  if (norm.includes('shartnomaviy-huquqiy') || norm.includes('shartnoma')) {
    return CANONICAL_LEX_REGISTRY.shartnoma.docId;
  }
  if (norm.includes('davlat xaridlari') || norm.includes('xarid')) {
    return CANONICAL_LEX_REGISTRY.dxq.docId;
  }
  if (norm.includes('sud hujjatlari') || norm.includes('ijro')) {
    return CANONICAL_LEX_REGISTRY.ijro.docId;
  }
  if (norm.includes('davlat boji')) {
    return CANONICAL_LEX_REGISTRY.davlatBoji.docId;
  }
  if (norm.includes('raqobat')) {
    return CANONICAL_LEX_REGISTRY.raqobat.docId;
  }
  if (norm.includes('mehnatni muhofaza')) {
    return CANONICAL_LEX_REGISTRY.mehnatMuhofaza.docId;
  }
  if (norm.includes('shaxsga doir') || norm.includes('shaxsiy ma’lumot')) {
    return CANONICAL_LEX_REGISTRY.shaxsiyMalumot.docId;
  }
  if (norm.includes('tadbirkorlik')) {
    return CANONICAL_LEX_REGISTRY.tadbirkorlik.docId;
  }

  return null;
}

/**
 * Checks if a URL or document ID points to an obsolete/repealed statute
 */
export function checkObsoleteDoc(rawUrlOrDocId: string = ''): {
  isObsolete: boolean;
  reason?: string;
  currentDocId?: string;
  upgradedUrl?: string;
} {
  const match = rawUrlOrDocId.match(/(\d+)/);
  const docId = match ? match[1] : '';

  if (docId && OBSOLETE_DOC_UPGRADES[docId]) {
    const upgrade = OBSOLETE_DOC_UPGRADES[docId];
    return {
      isObsolete: true,
      reason: upgrade.reason,
      currentDocId: upgrade.currentDocId,
      upgradedUrl: `https://lex.uz/docs/${upgrade.currentDocId}`,
    };
  }

  const lower = rawUrlOrDocId.toLowerCase();
  if (lower.includes('1995') && lower.includes('mehnat')) {
    return {
      isObsolete: true,
      reason: '1995-yilgi eski Mehnat kodeksi 2023-yil 30-apreldan to‘liq kuchini yo‘qotgan.',
      currentDocId: '6257288',
      upgradedUrl: 'https://lex.uz/docs/6257288',
    };
  }

  return { isObsolete: false };
}

/**
 * Cleans and sanitizes any Lex.uz URL to the official canonical HTTPS format.
 * Strips fragile/obsolete fragment hashes that cause client-side Lex.uz script crashes or 404s.
 * Upgrades repealed laws to current in-force laws.
 * Generates canonical search fallback if exact doc ID is missing.
 */
export function sanitizeLexUrl(
  rawUrl?: string,
  documentName?: string,
  articleNumber?: string
): string {
  const input = (rawUrl || '').trim();

  // 1. Check if input has an obsolete doc ID that needs upgrade
  const obsCheck = checkObsoleteDoc(input);
  if (obsCheck.isObsolete && obsCheck.upgradedUrl) {
    return obsCheck.upgradedUrl;
  }

  // 2. Extract doc ID from URL if present
  // Matches: https://lex.uz/docs/6257288, http://lex.uz/docs/6257288#123, lex.uz/docs/6257288, etc.
  const docIdMatch = input.match(/(?:lex\.uz\/docs\/|docs\/)(\d+)/i);
  if (docIdMatch && docIdMatch[1]) {
    const docId = docIdMatch[1];
    // Check if docId itself is obsolete
    if (OBSOLETE_DOC_UPGRADES[docId]) {
      return `https://lex.uz/docs/${OBSOLETE_DOC_UPGRADES[docId].currentDocId}`;
    }
    // Return clean canonical HTTPS URL without fragile DOM hashes that break in browsers
    return `https://lex.uz/docs/${docId}`;
  }

  // 3. If no numeric doc ID in rawUrl, try matching from documentName
  if (documentName) {
    const matchedId = matchCanonicalDocId(documentName);
    if (matchedId) {
      return `https://lex.uz/docs/${matchedId}`;
    }
  }

  // 4. If URL already is a valid lex.uz search URL, normalize HTTPS
  if (input.includes('lex.uz/search')) {
    return input.replace(/^http:\/\//i, 'https://');
  }

  // 5. If document name is provided, generate official Lex.uz search URL
  if (documentName) {
    const cleanSearch = `${documentName} ${articleNumber || ''}`.trim();
    return `https://lex.uz/search/nat?query=${encodeURIComponent(cleanSearch)}`;
  }

  // 6. Default safe root canonical URL
  return 'https://lex.uz';
}

/**
 * Returns the proxy URL that routes via our backend for reliable HTTPS redirection
 */
export function getLexProxyUrl(
  rawUrl?: string,
  documentName?: string,
  articleNumber?: string
): string {
  const canonical = sanitizeLexUrl(rawUrl, documentName, articleNumber);
  return `/api/lex/proxy?url=${encodeURIComponent(canonical)}`;
}

/**
 * Safely opens a Lex.uz URL in the browser, preventing iframe encapsulation issues.
 * Uses top-level window.open with strict noopener,noreferrer, or returns the canonical URL.
 */
export function openSafeLexUrl(
  rawUrl?: string,
  documentName?: string,
  articleNumber?: string
): boolean {
  const canonical = sanitizeLexUrl(rawUrl, documentName, articleNumber);

  try {
    const newWindow = window.open(canonical, '_blank', 'noopener,noreferrer');
    if (newWindow) {
      newWindow.opener = null;
      return true;
    }
  } catch (err) {
    console.warn('[LexSanitizer] Popup blocked or window.open prevented:', err);
  }

  // Fallback: create temporary anchor and dispatch click
  try {
    const a = document.createElement('a');
    a.href = canonical;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    return true;
  } catch {
    return false;
  }
}
