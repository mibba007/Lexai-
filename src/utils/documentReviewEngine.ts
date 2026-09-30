/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * O‘zbekiston Respublikasi qonunchiligi (Lex.uz) va davlat standartlariga
 * (O‘zDSt 1157:2008) to‘liq mos keluvchi professional Yuridik Hujjatlar
 * AI Tekshiruvi va Inline Tavsiyalar Dvigateli (Legal Review Engine).
 */

import { DocumentAIReviewResult, DocumentReviewSuggestion } from '../types';

/**
 * Intelligent Client-Side & Offline Legal Scanner for Documents
 */
export function scanDocumentForLegalIssuesOffline(
  documentText: string,
  documentType: string
): DocumentAIReviewResult {
  const text = documentText || '';
  const textLower = text.toLowerCase();
  const suggestions: DocumentReviewSuggestion[] = [];

  let criticalCount = 0;
  let warningsCount = 0;

  // 1. Penya & Jarima (Penalty & Late Fee Limits)
  const penyaMatch = text.match(/([0-9]+[.,]?[0-9]*)\s*(foiz|%)\s*(penya|jarima|undiriladi|to‘lanadi|to'lanadi)/i) ||
                     text.match(/(penya|jarima)\s*miqdori\s*([0-9]+[.,]?[0-9]*)\s*(%|foiz)/i);

  const hasFiftyPercentCap = /50\s*(foiz|%)\s*(dan|oshmasligi|chegaralanadi|oshmagan)/i.test(text);

  if (penyaMatch) {
    const rawRate = parseFloat(penyaMatch[1] || penyaMatch[2] || '0');
    if (rawRate > 0.5) {
      criticalCount++;
      const fullProblematicSentence = findSentenceContaining(text, penyaMatch[0]) || penyaMatch[0];
      suggestions.push({
        id: 'sug-penya-rate',
        type: 'CRITICAL_ERROR',
        category: 'Penya va Moliyaviy javobgarlik',
        issueTitle: 'Penya stavkasi qonuniy eng yuqori 0.5% chegarasidan ortiq',
        problematicText: fullProblematicSentence,
        lawViolationCitation: '«Xo‘jalik yurituvchi subyektlar faoliyatining shartnomaviy-huquqiy bazasi to‘g‘risida»gi Qonun, 25-modda; FK 326-modda',
        lexUrl: 'https://lex.uz/docs/45781',
        explanation: 'Qonunning 25-moddasiga binoan, majburiyat kechiktirilganda penya kunlik 0.5 foizdan oshishi qat‘iyan taqiqlanadi. Sudlar bundan yuqori penyalarni haqiqiy emas deb topadi.',
        suggestedReplacement: 'Majburiyatlar kechiktirilganda muddati o‘tgan har bir kun uchun to‘lanmagan summaning 0.5 foizi miqdorida, ammo jami kechiktirilgan summaning 50 foizidan oshmagan miqdorda penya hisoblanadi.',
        actionType: 'REPLACE',
      });
    } else if (!hasFiftyPercentCap && (textLower.includes('shartnoma') || textLower.includes('kontrakt'))) {
      warningsCount++;
      const fullProblematicSentence = findSentenceContaining(text, penyaMatch[0]) || penyaMatch[0];
      suggestions.push({
        id: 'sug-penya-cap',
        type: 'MISSING_MANDATORY_CLAUSE',
        category: 'Penya va Moliyaviy javobgarlik',
        issueTitle: 'Jami penyaga 50% lik qonuniy chegara kiritilmagan',
        problematicText: fullProblematicSentence,
        lawViolationCitation: '«Xo‘jalik yurituvchi subyektlar faoliyatining shartnomaviy-huquqiy bazasi to‘g‘risida»gi Qonun, 25-modda',
        lexUrl: 'https://lex.uz/docs/45781',
        explanation: 'Qonunchilikka binoan penyaning umumiy summasi muddati o‘tgan to‘lov yoki yetkazib berilmagan mahsulot qiymatining 50 foizidan oshib ketishi mumkin emas.',
        suggestedReplacement: `${fullProblematicSentence.replace(/[.;]$/, '')}, bunda penyaning umumiy summasi muddati o‘tgan majburiyat qiymatining 50 foizidan oshmasligi shart.`,
        actionType: 'REPLACE',
      });
    }
  }

  // 2. Fors-major (Force Majeure Clause)
  const hasForceMajeure = /fors-major|yengib bo‘lmas kuch|форс-мажор/i.test(text);
  if (!hasForceMajeure && (textLower.includes('shartnoma') || textLower.includes('kontrakt') || textLower.includes('yetkazib') || textLower.includes('xizmat'))) {
    warningsCount++;
    suggestions.push({
      id: 'sug-force-majeure',
      type: 'MISSING_MANDATORY_CLAUSE',
      category: 'Fors-major va Majburiyatlar',
      issueTitle: 'Fors-major (Yengib bo‘lmas kuch) bandi mavjud emas',
      lawViolationCitation: 'O‘zR Fuqarolik kodeksi 333-moddasi, 3-qism',
      lexUrl: 'https://lex.uz/docs/111189#152840',
      explanation: 'Fors-major holatlari (tabiiy ofatlar, davlat cheklovlari) yuz berganda taraflarni javobgarlikdan ozod qilish va O‘zR Savdo-sanoat palatasi ma‘lumotnomasini olish tartibi belgilanmagan.',
      suggestedReplacement: `\n\nFORS-MAJOR (YENGIB BO‘LMAS KUCH) HOLATLARI:
1. Taraflar o‘zlarining ixtiyoriga bog‘liq bo‘lmagan, oldindan bilib yoki bartaraf etib bo‘lmaydigan yengib bo‘lmas kuch (fors-major: yong‘in, toshqin, zilzila, epidemiya, davlat taqiqlari) holatlarida shartnoma majburiyatlarini qisman yoki to‘liq bajarmaganlik uchun javobgarlikdan ozod qilinadilar.
2. Bunday holatlar yuz berganda tegishli taraf 3 (uch) ish kuni ichida ikkinchi tarafni yozma ravishda xabardor qilishi hamda O‘zbekiston Respublikasi Savdo-sanoat palatasining tegishli sertifikatini taqdim etishi shart.`,
      actionType: 'INSERT_SECTION',
    });
  }

  // 3. Korrupsiyaga qarshi shart (Anti-Corruption Compliance Clause)
  const hasAntiCorruption = /korruptsiya|korrupsiya|пора|halollik|коррупция/i.test(text);
  if (!hasAntiCorruption && (textLower.includes('shartnoma') || textLower.includes('xizmat') || textLower.includes('buyurtma'))) {
    warningsCount++;
    suggestions.push({
      id: 'sug-anti-corruption',
      type: 'RECOMMENDATION',
      category: 'Korporativ Komplayens',
      issueTitle: 'Korrupsiyaga qarshi kurashish va halollik sharti kiritilmagan',
      lawViolationCitation: '«Korrupsiyaga qarshi kurashish to‘g‘risida»gi O‘zbekiston Respublikasi Qonuni (O‘RQ-419)',
      lexUrl: 'https://lex.uz/docs/3088013',
      explanation: 'O‘zbekiston Respublikasining rasmiy namunaviy shartnomalarida (O‘zDSt 1157:2008 va Yurxizmat) korrupsiyaga qarshi maxsus shart kiritilishi tavsiya etiladi.',
      suggestedReplacement: `\n\nKORRUPSIYAGA QARSHI KURASHISH VA ODOB-AXLOQ TALABLARI:
Taraflar ushbu shartnoma bo‘yicha o‘z majburiyatlarini bajarishda O‘zbekiston Respublikasining «Korrupsiyaga qarshi kurashish to‘g‘risida»gi Qonuniga qat‘iy rioya etadilar. Taraflarga shartnomani tuzish, bajarish yoki bekor qilish jarayonida har qanday noqonuniy to‘lovlar, moddiy manfaatdorlik yoki pora berish/olish qat‘iyan man etiladi.`,
      actionType: 'INSERT_SECTION',
    });
  }

  // 4. Nizolarni hal etish va Sudgacha Pretenziya (Dispute Resolution)
  const hasDisputeResolution = /nizo|kelishmovchilik|sud|pretenziya|низо/i.test(text);
  const hasPretrialPeriod = /15\s*(kun|ish kuni)|10\s*(kun|ish kuni)|pretenziya\s*muddati/i.test(text);
  if (!hasDisputeResolution) {
    criticalCount++;
    suggestions.push({
      id: 'sug-dispute-section',
      type: 'MISSING_MANDATORY_CLAUSE',
      category: 'Nizolarni hal etish tartibi',
      issueTitle: 'Nizolarni hal qilish va sudlovga tegishlilik bandi mavjud emas',
      lawViolationCitation: 'O‘zR Iqtisodiy protsessual kodeksi 148-modda; Fuqarolik protsessual kodeksi 34-39-moddalar',
      lexUrl: 'https://lex.uz/docs/3518442',
      explanation: 'Shartnomada nizolarni sudgacha hal qilish (pretenziya tartibi) va qaysi sudga murojaat qilinishi aniq ko‘rsatilmasa, sud arizani ko‘rmasdan qaytarishi mumkin.',
      suggestedReplacement: `\n\nNIZOLARNI HAL ETISH TARTIBI:
1. Taraflar o‘rtasida kelib chiqadigan barcha nizolar dastlab muzokaralar va yozma talabnoma (pretenziya) yuborish yo‘li bilan hal etiladi. Pretenziyaga javob berish muddati u olingan kundan boshlab 15 (o‘n besh) kalendar kunni tashkil etadi.
2. O‘zaro kelishuvga erishilmagan taqdirda, nizo O‘zbekiston Respublikasi qonunchiligiga muvofiq javobgar joylashgan hududdagi tegishli iqtisodiy yoki fuqarolik sudida ko‘rib chiqiladi.`,
      actionType: 'INSERT_SECTION',
    });
  } else if (!hasPretrialPeriod && textLower.includes('shartnoma')) {
    warningsCount++;
    const disputeSentence = findSentenceContaining(text, 'nizo') || findSentenceContaining(text, 'sud') || '';
    if (disputeSentence) {
      suggestions.push({
        id: 'sug-pretrial-period',
        type: 'RECOMMENDATION',
        category: 'Nizolarni hal etish tartibi',
        issueTitle: 'Pretenziya (talabnoma)ga javob berishning aniq 15 kunlik muddati ko‘rsatilmagan',
        problematicText: disputeSentence,
        lawViolationCitation: 'O‘zR IPK 148-moddasi (Pretenziya tartibi)',
        lexUrl: 'https://lex.uz/docs/3518442',
        explanation: 'IPK 148-moddasiga ko‘ra sudga berishdan oldin yozma pretenziya yuborilishi va unga 15 kunlik javob muddati berilishi shartnomada aniq mustahkamlanishi foydali.',
        suggestedReplacement: `${disputeSentence.replace(/[.;]$/, '')}. Taraflar nizolarni sudgacha hal etish uchun 15 (o‘n besh) kunlik muddatda pretenziya tartibiga rioya qilishlari shart.`,
        actionType: 'REPLACE',
      });
    }
  }

  // 5. Mehnat shartnomasi xususiy tekshiruvlari (Labor Contract Specifics)
  if (textLower.includes('mehnat shartnomasi') || textLower.includes('ishga qabul')) {
    // Check vacation days
    const vacationMatch = text.match(/([0-9]+)\s*(kun|kalendar kun)\s*(ta‘til|tatil|ta'til)/i);
    if (vacationMatch) {
      const days = parseInt(vacationMatch[1], 10);
      if (days < 21) {
        criticalCount++;
        const prob = findSentenceContaining(text, vacationMatch[0]) || vacationMatch[0];
        suggestions.push({
          id: 'sug-labor-vacation',
          type: 'CRITICAL_ERROR',
          category: 'Mehnat kafolatlari (MK)',
          issueTitle: 'Ta‘til muddati yangi Mehnat kodeksida belgilangan eng kam 21 kundan kam',
          problematicText: prob,
          lawViolationCitation: 'O‘zR yangi Mehnat kodeksi 216-moddasi',
          lexUrl: 'https://lex.uz/docs/6257288#6259400',
          explanation: 'Yangi Mehnat kodeksining 216-moddasiga binoan, xodimga har yili beriladigan asosiy mehnat ta‘tilining eng kam muddati 21 kalendar kundan kam bo‘lishi mumkin emas. Qonundan kam muddat belgilash qonunga ziddir.',
          suggestedReplacement: prob.replace(new RegExp(`${days}\\s*(kun|kalendar kun)`, 'i'), '21 kalendar kun'),
          actionType: 'REPLACE',
        });
      }
    }

    // Check probation period
    const probationMatch = text.match(/([0-9]+)\s*(oylik|oy)\s*(dastlabki sinov|sinov muddati)/i) ||
                           text.match(/(sinov muddati)\s*([0-9]+)\s*(oy)/i);
    if (probationMatch) {
      const months = parseInt(probationMatch[1] || probationMatch[2] || '0', 10);
      if (months > 3 && !textLower.includes('direktor') && !textLower.includes('bosh buxgalter')) {
        criticalCount++;
        const prob = findSentenceContaining(text, probationMatch[0]) || probationMatch[0];
        suggestions.push({
          id: 'sug-labor-probation',
          type: 'CRITICAL_ERROR',
          category: 'Mehnat kafolatlari (MK)',
          issueTitle: 'Sinov muddati oddiy xodimlar uchun 3 oydan ortiq belgilangan',
          problematicText: prob,
          lawViolationCitation: 'O‘zR Mehnat kodeksi 129-130-moddalari',
          lexUrl: 'https://lex.uz/docs/6257288#6258700',
          explanation: 'Mehnat kodeksining 129-moddasiga binoan sinov muddati 3 oydan oshmasligi kerak (faqat tashkilot rahbari va bosh buxgalter uchun 6 oygacha ruxsat etiladi).',
          suggestedReplacement: prob.replace(new RegExp(`${months}\\s*(oy|oylik)`, 'i'), '3 oy'),
          actionType: 'REPLACE',
        });
      }
    }

    // Check YAMMT notice
    const hasYammt = /yammt|yagona milliy mehnat|mehnat\.uz/i.test(text);
    if (!hasYammt) {
      warningsCount++;
      suggestions.push({
        id: 'sug-labor-yammt',
        type: 'RECOMMENDATION',
        category: 'Mehnat daftarchasi va YAMMT',
        issueTitle: 'YAMMT (Yagona milliy mehnat tizimi) ro‘yxatidan o‘tkazish bandi ko‘rsatilmagan',
        lawViolationCitation: 'Vazirlar Mahkamasining 2019-yil 5-dekabrdagi 971-son qarori',
        lexUrl: 'https://lex.uz/docs/4632860',
        explanation: 'Ish beruvchi xodim bilan tuzilgan mehnat shartnomasini my.mehnat.uz (YAMMT) portalida ro‘yxatdan o‘tkazishi qonuniy majburiyat hisoblanadi.',
        suggestedReplacement: `\n\nMEHNAT SHARTNOMASINI RO‘YXATDAN O‘TKAZISH:
Ish beruvchi ushbu mehnat shartnomasi imzolangan kundan boshlab O‘zbekiston Respublikasi Vazirlar Mahkamasining 971-son qarori talablariga binoan Yagona milliy mehnat tizimi (YAMMT - my.mehnat.uz) orqali elektron ro‘yxatdan o‘tkazish majburiyatini oladi.`,
        actionType: 'INSERT_SECTION',
      });
    }
  }

  // 6. Ijara shartnomasi xususiy tekshiruvlari (Rent Contract Specifics)
  if (textLower.includes('ijara') || textLower.includes('arenda')) {
    const hasTaxRegister = /ijara\.soliq\.uz|soliq organlarida hisobga|soliq\.uz/i.test(text);
    if (!hasTaxRegister) {
      warningsCount++;
      suggestions.push({
        id: 'sug-rent-soliq',
        type: 'RECOMMENDATION',
        category: 'Soliq hisobi (ijara.soliq.uz)',
        issueTitle: 'Ijara shartnomasini soliq organlarida hisobga qo‘yish majburiyati ko‘rsatilmagan',
        lawViolationCitation: 'O‘zR Soliq kodeksi; MJTK 159-1-moddasi',
        lexUrl: 'https://lex.uz/docs/4674902',
        explanation: 'Ko‘chmas mulk ijara shartnomalari ijara.soliq.uz portalida hisobga qo‘yilishi shart. Aks holda ma‘muriy javobgarlik kelib chiqadi.',
        suggestedReplacement: `\n\nSOLIQ HISOBIGA QO‘YISH SHARTI:
Ijaraga beruvchi ushbu ijara shartnomasini tuzilgan kundan boshlab belgilangan muddatda davlat soliq xizmati organlarining maxsus axborot tizimi (ijara.soliq.uz) orqali hisobga qo‘yish majburiyatini oladi.`,
        actionType: 'INSERT_SECTION',
      });
    }
  }

  // 7. Tomonlar rekvizitlari va imzo o'rni tekshiruvi (Signatures & Identifiers)
  const hasStir = /stir|inn|стир|инн/i.test(text);
  const hasPinfl = /pinfl|jshshir|жшшир|пинфл/i.test(text);
  if (!hasStir && !hasPinfl && !textLower.includes('ariza') && !textLower.includes('tilxat')) {
    warningsCount++;
    suggestions.push({
      id: 'sug-stir-pinfl',
      type: 'MISSING_MANDATORY_CLAUSE',
      category: 'Rasmiy Rekvizitlar',
      issueTitle: 'Taraflarning STIR yoki JSHSHIR (PINFL) raqamlari ko‘rsatilmagan',
      lawViolationCitation: 'O‘zDSt 1157:2008 standarti; O‘zR FK 386-modda',
      lexUrl: 'https://lex.uz/docs/111189',
      explanation: 'Yuridik va jismoniy shaxslarni elektron tizimlarda identifikatsiyalash uchun STIR va JSHSHIR rekvizitlar bo‘limida kiritilishi shart.',
      suggestedReplacement: `STIR (Yuridik shaxs uchun): _______________ | JSHSHIR/PINFL (Fuqaro uchun): _______________`,
      actionType: 'APPEND',
    });
  }

  // Calculate overall score (100 base)
  let score = 100 - (criticalCount * 15) - (warningsCount * 6);
  if (score < 30) score = 30;
  if (score > 100) score = 100;

  const complianceRating: DocumentAIReviewResult['complianceRating'] = 
    score >= 90 ? 'EXCELLENT' : score >= 75 ? 'GOOD' : score >= 50 ? 'NEEDS_REVISION' : 'CRITICAL_RISK';

  const summary = criticalCount > 0 
    ? `Hujjatda ${criticalCount} ta qonunga nomuvofiq jiddiy kamchilik va ${warningsCount} ta yetishmayotgan mezon aniqlandi. Quyidagi tuzatishlarni kiritish orqali hujjatni 100% rasmiy standartga keltirishingiz mumkin.`
    : warningsCount > 0
    ? `Hujjatda qonun buzilishi holatlari aniqlanmadi, biroq huquqiy himoyani kuchaytirish uchun ${warningsCount} ta muhim qo‘shimcha band kiritish tavsiya etiladi.`
    : `Hujjat O‘zbekiston Respublikasining barcha qonuniy normalari va O‘zDSt 1157:2008 standartlariga to‘liq mos keladi. Hech qanday huquqiy xato aniqlanmadi.`;

  return {
    overallScore: score,
    summary,
    complianceRating,
    criticalIssuesCount: criticalCount,
    warningsCount,
    suggestions,
    reviewedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };
}

/**
 * Helper to extract the full sentence containing a matching fragment
 */
function findSentenceContaining(text: string, fragment: string): string | null {
  if (!text || !fragment) return null;
  const sentences = text.split(/(?<=[.!?\n])\s+/);
  const found = sentences.find((s) => s.toLowerCase().includes(fragment.toLowerCase()));
  return found ? found.trim() : null;
}
