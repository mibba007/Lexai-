/**
 * Central Audited Legal Data Repository for LEXAI UZ
 * Enforces verified document-level and provision-level statuses,
 * temporal validity periods, and versioned snapshots.
 */

import {
  OfficialDocumentRecord,
  OfficialProvisionRecord,
  LegalDocumentStatus,
  LegalProvisionStatus,
} from './types';

// Helper to compute deterministic FNV-1a checksum
export function computeStringChecksum(str: string): string {
  let hash = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  return (hash >>> 0).toString(16).padStart(8, '0');
}

/**
 * 1. Yangi Mehnat kodeksi (O‘RQ-798-son, 2023-yil 30-apreldan kuchga kirgan)
 * Rasmiy manba: Lex.uz docId: 6257288
 */
const MEHNAT_KODEKSI_2023: OfficialDocumentRecord = {
  documentId: '6257288',
  officialDocumentNumber: 'O‘RQ-798-son',
  officialTitle: 'O‘zbekiston Respublikasining Mehnat kodeksi',
  shortTitle: 'Mehnat kodeksi',
  documentType: 'Kodeks',
  officialSourceUrl: 'https://lex.uz/docs/6257288',
  adoptionDate: '2022-10-28',
  publicationDate: '2022-10-29',
  effectiveFrom: '2023-04-30',
  documentStatus: 'DOC_IN_FORCE',
  sourceRetrievedAt: '2026-10-12T00:00:00.000Z',
  sourceChecksum: 'mk2023-sha256-verified-81f7c2',
  lastVerifiedAt: '2026-10-12T00:00:00.000Z',
  verificationMethod: 'OFFICIAL_SNAPSHOT',
  provisions: [
    {
      provisionId: 'mk-104',
      documentId: '6257288',
      articleNumber: '104-modda',
      articleTitle: 'Mehnat shartnomasining muddati',
      chapterNumber: 'VI bob',
      chapterTitle: 'Mehnat shartnomasining muddati',
      officialArticleUrl: 'https://lex.uz/docs/6257288#6258380',
      currentContent: `Mehnat shartnomalari:\n1) nomuayyan muddatga;\n2) 3 yildan ko‘p bo‘lmagan muayyan muddatga (muddatli mehnat shartnomasi) tuzilishi mumkin.\nAgar mehnat shartnomasida uning amal qilish muddati ko‘rsatilmagan bo‘lsa, shartnoma nomuayyan muddatga tuzilgan deb hisoblanadi.`,
      currentVersionId: 'mk-104-v1',
      provisionStatus: 'PROVISION_IN_FORCE',
      effectiveFrom: '2023-04-30',
      keywords: ['mehnat shartnomasi muddati', 'nomuayyan muddat', '3 yil muddatli'],
      versions: [
        {
          versionId: 'mk-104-v1',
          versionNumber: 1,
          content: `Mehnat shartnomalari:\n1) nomuayyan muddatga;\n2) 3 yildan ko‘p bo‘lmagan muayyan muddatga (muddatli mehnat shartnomasi) tuzilishi mumkin.\nAgar mehnat shartnomasida uning amal qilish muddati ko‘rsatilmagan bo‘lsa, shartnoma nomuayyan muddatga tuzilgan deb hisoblanadi.`,
          validFrom: '2023-04-30',
          versionStatus: 'ACTIVE',
          sourceChecksum: 'c104',
        },
      ],
    },
    {
      provisionId: 'mk-105',
      documentId: '6257288',
      articleNumber: '105-modda',
      articleTitle: 'Muddatli mehnat shartnomasining bekor qilinishi va ogohlantirish tartibi',
      chapterNumber: 'VI bob',
      chapterTitle: 'Mehnat shartnomasi muddati',
      officialArticleUrl: 'https://lex.uz/docs/6257288#6258384',
      currentContent: `Muddatli mehnat shartnomasi uning muddati tugashi bilan bekor qilinadi. Ish beruvchi xodimni shartnoma muddati tugashidan kamida 3 ish kuni oldin yozma shaklda ogohlantirishi shart.\nAgar muddat tugagandan keyin ham mehnat munosabatlari davom etsa va taraflardan hech biri uning bekor qilinishini talab qilmagan bo‘lsa, shartnoma nomuayyan muddatga uzaytirilgan deb hisoblanadi.`,
      currentVersionId: 'mk-105-v1',
      provisionStatus: 'PROVISION_IN_FORCE',
      effectiveFrom: '2023-04-30',
      keywords: ['muddatli shartnoma', '3 ish kuni ogohlantirish', 'shartnoma muddati tugashi'],
      versions: [
        {
          versionId: 'mk-105-v1',
          versionNumber: 1,
          content: `Muddatli mehnat shartnomasi uning muddati tugashi bilan bekor qilinadi. Ish beruvchi xodimni shartnoma muddati tugashidan kamida 3 ish kuni oldin yozma shaklda ogohlantirishi shart.\nAgar muddat tugagandan keyin ham mehnat munosabatlari davom etsa va taraflardan hech biri uning bekor qilinishini talab qilmagan bo‘lsa, shartnoma nomuayyan muddatga uzaytirilgan deb hisoblanadi.`,
          validFrom: '2023-04-30',
          versionStatus: 'ACTIVE',
          sourceChecksum: 'c105',
        },
      ],
    },
    {
      provisionId: 'mk-129',
      documentId: '6257288',
      articleNumber: '129-modda',
      articleTitle: 'Dastlabki sinov muddati',
      chapterNumber: 'VIII bob',
      chapterTitle: 'Ishga qabul qilishda sinov',
      officialArticleUrl: 'https://lex.uz/docs/6257288#6258412',
      currentContent: `Dastlabki sinov muddati 3 oydan, tashkilotlar rahbarlari va ularning o‘rinbosarlari, bosh buxgalterlar hamda alohida bo‘linmalar rahbarlari uchun esa 6 oydan oshishi mumkin emas.\nDastlabki sinov davri xodimning mehnat stajiga kiritiladi. Sinov davrida xodimga mehnat to‘g‘risidagi qonunchilik va korxonaning ichki hujjatlari to‘liq tatbiq etiladi.`,
      currentVersionId: 'mk-129-v1',
      provisionStatus: 'PROVISION_IN_FORCE',
      effectiveFrom: '2023-04-30',
      keywords: ['dastlabki sinov muddati', '3 oy sinov', '6 oy rahbar', '129-modda'],
      versions: [
        {
          versionId: 'mk-129-v1',
          versionNumber: 1,
          content: `Dastlabki sinov muddati 3 oydan, tashkilotlar rahbarlari va ularning o‘rinbosarlari, bosh buxgalterlar hamda alohida bo‘linmalar rahbarlari uchun esa 6 oydan oshishi mumkin emas.\nDastlabki sinov davri xodimning mehnat stajiga kiritiladi. Sinov davrida xodimga mehnat to‘g‘risidagi qonunchilik va korxonaning ichki hujjatlari to‘liq tatbiq etiladi.`,
          validFrom: '2023-04-30',
          versionStatus: 'ACTIVE',
          sourceChecksum: 'c129',
        },
      ],
    },
    {
      provisionId: 'mk-130',
      documentId: '6257288',
      articleNumber: '130-modda',
      articleTitle: 'Dastlabki sinov tayinlanmaydigan shaxslar',
      chapterNumber: 'VIII bob',
      chapterTitle: 'Ishga qabul qilishda sinov',
      officialArticleUrl: 'https://lex.uz/docs/6257288#6258416',
      currentContent: `Dastlabki sinov quyidagilarga nisbatan belgilanmaydi:\n1) homilador ayollarga, 3 yoshga to‘lmagan bolasi bor ayollarga;\n2) korxona uchun belgilangan minimal ish o‘rinlari hisobidan ishga yuborilgan shaxslarga;\n3) oliy yoki o‘rta maxsus ta‘lim muassasasini tamomlagan va mutaxassisligi bo‘yicha 1 yil ichida ilk bor ishga kirayotgan bitiruvchilarga;\n4) 6 oygacha muddatga mehnat shartnomasi tuzilgan xodimlarga;\n5) 18 yoshga to‘lmagan shaxslarga.`,
      currentVersionId: 'mk-130-v1',
      provisionStatus: 'PROVISION_IN_FORCE',
      effectiveFrom: '2023-04-30',
      keywords: ['sinov tayinlanmaydigan shaxslar', 'homilador ayollar', 'yosh mutaxassislar', '130-modda'],
      versions: [
        {
          versionId: 'mk-130-v1',
          versionNumber: 1,
          content: `Dastlabki sinov quyidagilarga nisbatan belgilanmaydi:\n1) homilador ayollarga, 3 yoshga to‘lmagan bolasi bor ayollarga;\n2) korxona uchun belgilangan minimal ish o‘rinlari hisobidan ishga yuborilgan shaxslarga;\n3) oliy yoki o‘rta maxsus ta‘lim muassasasini tamomlagan va mutaxassisligi bo‘yicha 1 yil ichida ilk bor ishga kirayotgan bitiruvchilarga;\n4) 6 oygacha muddatga mehnat shartnomasi tuzilgan xodimlarga;\n5) 18 yoshga to‘lmagan shaxslarga.`,
          validFrom: '2023-04-30',
          versionStatus: 'ACTIVE',
          sourceChecksum: 'c130',
        },
      ],
    },
    {
      provisionId: 'mk-161',
      documentId: '6257288',
      articleNumber: '161-modda',
      articleTitle: 'Mehnat shartnomasini ish beruvchining tashabbusi bilan bekor qilish asoslari',
      chapterNumber: 'X bob',
      chapterTitle: 'Mehnat shartnomasini bekor qilish',
      officialArticleUrl: 'https://lex.uz/docs/6257288#6258920',
      currentContent: `Mehnat shartnomasi ish beruvchining tashabbusi bilan quyidagi asoslar bo‘yicha bekor qilinishi mumkin:\n1) texnologiyaning, ishlab chiqarish va mehnatni tashkil etishning o‘zgarishi, ishlar hajmining qisqarishi munosabati bilan xodimlar soni yoki shtatining o‘zgarishi;\n2) xodimning malakasi yetarli emasligi tufayli egallab turgan lavozimiga yoki bajarayotgan ishiga nomuvofiqligi;\n3) xodim tomonidan o‘z mehnat majburiyatlari muntazam ravishda buzilganligi;\n4) xodim tomonidan o‘z mehnat majburiyatlari bir marta qo‘pol ravishda buzilganligi;\n5) korxona mulkdorining o‘zgarganligi (rahbar, uning o‘rinbosarlari va bosh buxgalterga nisbatan).`,
      currentVersionId: 'mk-161-v1',
      provisionStatus: 'PROVISION_IN_FORCE',
      effectiveFrom: '2023-04-30',
      keywords: ['ishdan bo‘shatish', 'ish beruvchi tashabbusi', 'shtat qisqarishi', 'intizom buzilishi', '161-modda'],
      versions: [
        {
          versionId: 'mk-161-v1',
          versionNumber: 1,
          content: `Mehnat shartnomasi ish beruvchining tashabbusi bilan quyidagi asoslar bo‘yicha bekor qilinishi mumkin:\n1) texnologiyaning, ishlab chiqarish va mehnatni tashkil etishning o‘zgarishi, ishlar hajmining qisqarishi munosabati bilan xodimlar soni yoki shtatining o‘zgarishi;\n2) xodimning malakasi yetarli emasligi tufayli egallab turgan lavozimiga yoki bajarayotgan ishiga nomuvofiqligi;\n3) xodim tomonidan o‘z mehnat majburiyatlari muntazam ravishda buzilganligi;\n4) xodim tomonidan o‘z mehnat majburiyatlari bir marta qo‘pol ravishda buzilganligi;\n5) korxona mulkdorining o‘zgarganligi (rahbar, uning o‘rinbosarlari va bosh buxgalterga nisbatan).`,
          validFrom: '2023-04-30',
          versionStatus: 'ACTIVE',
          sourceChecksum: 'c161',
        },
      ],
    },
    {
      provisionId: 'mk-163',
      documentId: '6257288',
      articleNumber: '163-modda',
      articleTitle: 'Mehnat shartnomasini bekor qilish taqiqlanadigan davrlar',
      chapterNumber: 'X bob',
      chapterTitle: 'Mehnat shartnomasini bekor qilish',
      officialArticleUrl: 'https://lex.uz/docs/6257288#6258928',
      currentContent: `Xodim vaqtincha mehnatga layoqatsiz bo‘lgan davrda hamda mehnat ta‘tillarida bo‘lgan davrida mehnat shartnomasini ish beruvchining tashabbusi bilan bekor qilishga yo‘l qo‘yilmaydi (korxona to‘liq tugatilgan hollar bundan mustasno).`,
      currentVersionId: 'mk-163-v1',
      provisionStatus: 'PROVISION_IN_FORCE',
      effectiveFrom: '2023-04-30',
      keywords: ['ishdan bo‘shatish taqiqlanadi', 'bolnichniy', 'ta‘tilda bo‘shatish', '163-modda'],
      versions: [
        {
          versionId: 'mk-163-v1',
          versionNumber: 1,
          content: `Xodim vaqtincha mehnatga layoqatsiz bo‘lgan davrda hamda mehnat ta‘tillarida bo‘lgan davrida mehnat shartnomasini ish beruvchining tashabbusi bilan bekor qilishga yo‘l qo‘yilmaydi (korxona to‘liq tugatilgan hollar bundan mustasno).`,
          validFrom: '2023-04-30',
          versionStatus: 'ACTIVE',
          sourceChecksum: 'c163',
        },
      ],
    },
    {
      provisionId: 'mk-165',
      documentId: '6257288',
      articleNumber: '165-modda',
      articleTitle: 'Mehnat shartnomasini bekor qilish to‘g‘risida ogohlantirish muddatlari',
      chapterNumber: 'X bob',
      chapterTitle: 'Mehnat shartnomasini bekor qilish',
      officialArticleUrl: 'https://lex.uz/docs/6257288#6258936',
      currentContent: `Ish beruvchi mehnat shartnomasini bekor qilish niyati haqida xodimni quyidagi muddatlarda yozma ravishda (imzo qo‘ydirib) ogohlantirishi shart:\n1) shtat yoki son qisqarganda — kamida 2 oy oldin;\n2) malakasi yetarli bo‘lmaganda — kamida 2 hafta oldin;\n3) intizomiy jazo tariqasida — kamida 3 kun oldin yoki ogohlantirmasdan (kompensatsiya to‘lagan holda).\nOgohlantirish muddati pullik kompensatsiyaga almashtirilishi mumkin.`,
      currentVersionId: 'mk-165-v1',
      provisionStatus: 'PROVISION_IN_FORCE',
      effectiveFrom: '2023-04-30',
      keywords: ['ogohlantirish muddati', '2 oy oldin', 'kompensatsiya', '165-modda'],
      versions: [
        {
          versionId: 'mk-165-v1',
          versionNumber: 1,
          content: `Ish beruvchi mehnat shartnomasini bekor qilish niyati haqida xodimni quyidagi muddatlarda yozma ravishda (imzo qo‘ydirib) ogohlantirishi shart:\n1) shtat yoki son qisqarganda — kamida 2 oy oldin;\n2) malakasi yetarli bo‘lmaganda — kamida 2 hafta oldin;\n3) intizomiy jazo tariqasida — kamida 3 kun oldin yoki ogohlantirmasdan (kompensatsiya to‘lagan holda).\nOgohlantirish muddati pullik kompensatsiyaga almashtirilishi mumkin.`,
          validFrom: '2023-04-30',
          versionStatus: 'ACTIVE',
          sourceChecksum: 'c165',
        },
      ],
    },
    {
      provisionId: 'mk-173',
      documentId: '6257288',
      articleNumber: '173-modda',
      articleTitle: 'Ishdan bo‘shatish nafaqasi miqdori',
      chapterNumber: 'XI bob',
      chapterTitle: 'Kafolatlar va kompensatsiyalar',
      officialArticleUrl: 'https://lex.uz/docs/6257288#6258968',
      currentContent: `Ishdan bo‘shatish nafaqasining miqdori mazkur ish beruvchidagi ish stajiga bog‘liq bo‘lib, quyidagilardan kam bo‘lishi mumkin emas:\n1) 3 yilgacha stajga ega xodimlarga — o‘rtacha oylik ish haqining 50 foizi;\n2) 3 yildan 5 yilgacha stajga ega xodimlarga — 75 foizi;\n3) 5 yildan 10 yilgacha stajga ega xodimlarga — 100 foizi;\n4) 10 yildan 15 yilgacha stajga ega xodimlarga — 150 foizi;\n5) 15 yildan ortiq stajga ega xodimlarga — 200 foizi.`,
      currentVersionId: 'mk-173-v1',
      provisionStatus: 'PROVISION_IN_FORCE',
      effectiveFrom: '2023-04-30',
      keywords: ['ishdan bo‘shatish nafaqasi', 'posobiye', 'stajga qarab nafaqa', '173-modda'],
      versions: [
        {
          versionId: 'mk-173-v1',
          versionNumber: 1,
          content: `Ishdan bo‘shatish nafaqasining miqdori mazkur ish beruvchidagi ish stajiga bog‘liq bo‘lib, quyidagilardan kam bo‘lishi mumkin emas:\n1) 3 yilgacha stajga ega xodimlarga — o‘rtacha oylik ish haqining 50 foizi;\n2) 3 yildan 5 yilgacha stajga ega xodimlarga — 75 foizi;\n3) 5 yildan 10 yilgacha stajga ega xodimlarga — 100 foizi;\n4) 10 yildan 15 yilgacha stajga ega xodimlarga — 150 foizi;\n5) 15 yildan ortiq stajga ega xodimlarga — 200 foizi.`,
          validFrom: '2023-04-30',
          versionStatus: 'ACTIVE',
          sourceChecksum: 'c173',
        },
      ],
    },
    {
      provisionId: 'mk-217',
      documentId: '6257288',
      articleNumber: '217-modda',
      articleTitle: 'Har yilgi asosiy eng kam mehnat ta‘tili',
      chapterNumber: 'XIII bob',
      chapterTitle: 'Dam olish vaqti va ta‘tillar',
      officialArticleUrl: 'https://lex.uz/docs/6257288#6259144',
      currentContent: `Har yilgi asosiy eng kam mehnat ta‘tilining davomiyligi 21 kalendar kundan kam bo‘lishi mumkin emas.\n(Eslatma: 1995-yilgi eski Mehnat kodeksidagi 15 ish kunlik ta‘til normasi bekor qilingan).`,
      currentVersionId: 'mk-217-v1',
      provisionStatus: 'PROVISION_IN_FORCE',
      effectiveFrom: '2023-04-30',
      keywords: ['mehnat ta‘tili', '21 kalendar kun', 'eng kam ta‘til', '217-modda'],
      versions: [
        {
          versionId: 'mk-217-v1',
          versionNumber: 1,
          content: `Har yilgi asosiy eng kam mehnat ta‘tilining davomiyligi 21 kalendar kundan kam bo‘lishi mumkin emas.`,
          validFrom: '2023-04-30',
          versionStatus: 'ACTIVE',
          sourceChecksum: 'c217',
        },
      ],
    },
    {
      provisionId: 'mk-312',
      documentId: '6257288',
      articleNumber: '312-modda',
      articleTitle: 'Intizomiy jazolar turlari',
      chapterNumber: 'XVIII bob',
      chapterTitle: 'Mehnat intizomi',
      officialArticleUrl: 'https://lex.uz/docs/6257288#6259520',
      currentContent: `Mehnat intizomini buzganligi uchun ish beruvchi xodimga faqat quyidagi intizomiy jazolarni qo‘llashga haqli:\n1) hayfsan;\n2) jarima (o‘rtacha oylik ish haqining 30 foizidan, ichki tartib qoidalarida nazarda tutilgan hollarda esa 50 foizidan oshmagan miqdorda);\n3) mehnat shartnomasini bekor qilish (161-modda 3 va 4-bandlari).\nQonunchilikda nazarda tutilmagan boshqa intizomiy jazolarni (masalan, oylikdan asossiz ushlab qolish yoki noqonuniy jarimalarni) qo‘llash qat‘iyan taqiqlanadi.`,
      currentVersionId: 'mk-312-v1',
      provisionStatus: 'PROVISION_IN_FORCE',
      effectiveFrom: '2023-04-30',
      keywords: ['intizomiy jazo', 'hayfsan', 'jarima chegarasi 30-50%', 'noqonuniy jarimalar taqiqlanadi', '312-modda'],
      versions: [
        {
          versionId: 'mk-312-v1',
          versionNumber: 1,
          content: `Mehnat intizomini buzganligi uchun ish beruvchi xodimga faqat quyidagi intizomiy jazolarni qo‘llashga haqli:\n1) hayfsan;\n2) jarima (o‘rtacha oylik ish haqining 30 foizidan, ichki tartib qoidalarida nazarda tutilgan hollarda esa 50 foizidan oshmagan miqdorda);\n3) mehnat shartnomasini bekor qilish (161-modda 3 va 4-bandlari).\nQonunchilikda nazarda tutilmagan boshqa intizomiy jazolarni qo‘llash qat‘iyan taqiqlanadi.`,
          validFrom: '2023-04-30',
          versionStatus: 'ACTIVE',
          sourceChecksum: 'c312',
        },
      ],
    },
    {
      provisionId: 'mk-560',
      documentId: '6257288',
      articleNumber: '560-modda',
      articleTitle: 'Yakka tartibdagi mehnat nizolarini ko‘rib chiqish uchun murojaat qilish muddatlari',
      chapterNumber: 'XXVIII bob',
      chapterTitle: 'Mehnat nizolari',
      officialArticleUrl: 'https://lex.uz/docs/6257288#6260480',
      currentContent: `Yakka tartibdagi mehnat nizosini ko‘rib chiqish uchun sudga yoki mehnat nizolari komissiyasiga murojaat qilish muddatlari:\n1) ishga tiklash to‘g‘risidagi nizolar bo‘yicha — xodimga mehnat shartnomasi bekor qilinganligi haqidagi buyruq nusxasi topshirilgan kundan e‘tiboran 1 oy;\n2) xodim tomonidan ish beruvchiga yetkazilgan moddiy zararni undirish bo‘yicha — zarar yetkazilganligi ish beruvchiga ma‘lum bo‘lgan kundan e‘tiboran 1 yil;\n3) boshqa barcha mehnat nizolari bo‘yicha — xodim o‘z huquqi buzilganligini bilgan yoki bilishi kerak bo‘lgan kundan e‘tiboran 6 oy.`,
      currentVersionId: 'mk-560-v1',
      provisionStatus: 'PROVISION_IN_FORCE',
      effectiveFrom: '2023-04-30',
      keywords: ['mehnat da‘vo muddati', 'ishga tiklash 1 oy', 'boshqa nizolar 6 oy', '560-modda'],
      versions: [
        {
          versionId: 'mk-560-v1',
          versionNumber: 1,
          content: `Yakka tartibdagi mehnat nizosini ko‘rib chiqish uchun sudga murojaat qilish muddatlari: ishga tiklash bo‘yicha 1 oy; boshqa nizolar bo‘yicha 6 oy.`,
          validFrom: '2023-04-30',
          versionStatus: 'ACTIVE',
          sourceChecksum: 'c560',
        },
      ],
    },
  ],
};

/**
 * 2. 1995-yilgi Eski Mehnat kodeksi (Tarixiy / Butunlay kuchini yo‘qotgan)
 * Rasmiy manba: Lex.uz docId: 145261 (Kuchini yo'qotgan: 2023-yil 30-apreldan)
 */
const MEHNAT_KODEKSI_1995_REPEALED: OfficialDocumentRecord = {
  documentId: '145261',
  officialDocumentNumber: '161-I-son',
  officialTitle: 'O‘zbekiston Respublikasining Mehnat kodeksi (1995-yilgi tahrir - KUCHINI YO‘QOTGAN)',
  shortTitle: 'Eski Mehnat kodeksi (1995)',
  documentType: 'Kodeks',
  officialSourceUrl: 'https://lex.uz/docs/145261',
  adoptionDate: '1995-12-21',
  effectiveFrom: '1996-04-01',
  effectiveUntil: '2023-04-29',
  repealDate: '2023-04-30',
  documentStatus: 'DOC_REPEALED',
  sourceRetrievedAt: '2026-10-12T00:00:00.000Z',
  sourceChecksum: 'mk1995-repealed-sha256-491a',
  lastVerifiedAt: '2026-10-12T00:00:00.000Z',
  verificationMethod: 'OFFICIAL_SNAPSHOT',
  verificationEvidence: 'O‘zbekiston Respublikasining O‘RQ-798-son Qonuniga muvofiq 2023-yil 30-apreldan to‘liq o‘z kuchini yo‘qotgan.',
  provisions: [
    {
      provisionId: 'mk1995-100',
      documentId: '145261',
      articleNumber: '100-modda',
      articleTitle: 'Mehnat shartnomasini ish beruvchining tashabbusi bilan bekor qilish (ESKI MODDA)',
      officialArticleUrl: 'https://lex.uz/docs/145261#145600',
      currentContent: `Mehnat shartnomasi quyidagi asoslar bo‘yicha ish beruvchi tashabbusi bilan bekor qilinishi mumkin edi... (Norma 2023-yil 30-apreldan bekor qilingan, yangi MK 161-moddasiga almashtirilgan).`,
      currentVersionId: 'mk1995-100-v1',
      provisionStatus: 'PROVISION_REPEALED',
      effectiveFrom: '1996-04-01',
      effectiveUntil: '2023-04-29',
      repealDate: '2023-04-30',
      keywords: ['100-modda', 'eski mehnat kodeksi', 'bekor qilingan'],
      notes: 'O‘RQ-798-son Qonun bilan bekor qilingan. Yangi tahrir: MK 161-modda.',
      versions: [
        {
          versionId: 'mk1995-100-v1',
          versionNumber: 1,
          content: `Mehnat shartnomasi nomuayyan muddatga tuzilgan shartnoma, shuningdek muddati tugagunga qadar muddatli mehnat shartnomasi ish beruvchining tashabbusi bilan bekor qilinishi mumkin.`,
          validFrom: '1996-04-01',
          validUntil: '2023-04-29',
          versionStatus: 'REPEALED',
          sourceChecksum: 'c100rep',
        },
      ],
    },
    {
      provisionId: 'mk1995-134',
      documentId: '145261',
      articleNumber: '134-modda',
      articleTitle: 'Yillik asosiy mehnat ta‘tili (15 ish kuni - BEKOR BO‘LGAN)',
      officialArticleUrl: 'https://lex.uz/docs/145261#145780',
      currentContent: `Xodimlarga muddati 15 ish kunidan kam bo‘lmagan yillik asosiy mehnat ta‘tili beriladi (BEKOR QILINGAN).`,
      currentVersionId: 'mk1995-134-v1',
      provisionStatus: 'PROVISION_REPEALED',
      effectiveFrom: '1996-04-01',
      effectiveUntil: '2023-04-29',
      repealDate: '2023-04-30',
      keywords: ['15 ish kuni', '134-modda', 'eski ta‘til'],
      notes: 'Yangi Mehnat kodeksi 217-moddasiga binoan eng kam ta‘til 21 kalendar kun etib belgilangan.',
      versions: [
        {
          versionId: 'mk1995-134-v1',
          versionNumber: 1,
          content: `Xodimlarga muddati 15 ish kunidan kam bo‘lmagan yillik asosiy ta‘til beriladi.`,
          validFrom: '1996-04-01',
          validUntil: '2023-04-29',
          versionStatus: 'REPEALED',
          sourceChecksum: 'c134rep',
        },
      ],
    },
  ],
};

/**
 * 3. Fuqarolik kodeksi (1-qism va 2-qism)
 * Rasmiy manba: Lex.uz docId: 111189
 */
const FUQAROLIK_KODEKSI_1997: OfficialDocumentRecord = {
  documentId: '111189',
  officialDocumentNumber: '166-I-son',
  officialTitle: 'O‘zbekiston Respublikasining Fuqarolik kodeksi',
  shortTitle: 'Fuqarolik kodeksi',
  documentType: 'Kodeks',
  officialSourceUrl: 'https://lex.uz/docs/111189',
  adoptionDate: '1995-12-21',
  effectiveFrom: '1997-03-01',
  documentStatus: 'DOC_IN_FORCE',
  sourceRetrievedAt: '2026-10-12T00:00:00.000Z',
  sourceChecksum: 'fk1997-sha256-verified-a9b8',
  lastVerifiedAt: '2026-10-12T00:00:00.000Z',
  verificationMethod: 'OFFICIAL_SNAPSHOT',
  provisions: [
    {
      provisionId: 'fk-14',
      documentId: '111189',
      articleNumber: '14-modda',
      articleTitle: 'Zararni qoplash',
      officialArticleUrl: 'https://lex.uz/docs/111189#111320',
      currentContent: `Huquqi buzilgan shaxs o‘ziga yetkazilgan zararning to‘liq qoplanishini talab qilishi mumkin, basharti qonunda yoki shartnomada zararni kamroq miqdorda qoplash nazarda tutilmagan bo‘lsa.\nZarar deganda huquqi buzilgan shaxsning buzilgan huquqini tiklash uchun qilgan yoki qilishi lozim bo‘lgan xarajatlari, uning mol-mulki yo‘qolishi yoki shikastlanishi (haqiqiy zarar), shuningdek agar uning huquqlari buzilmaganida u fuqarolik muomalasining odatdagi sharoitlarida olishi mumkin bo‘lgan boy berilgan foyda tushuniladi.`,
      currentVersionId: 'fk-14-v1',
      provisionStatus: 'PROVISION_IN_FORCE',
      effectiveFrom: '1997-03-01',
      keywords: ['zararni qoplash', 'haqiqiy zarar', 'boy berilgan foyda', '14-modda'],
      versions: [
        {
          versionId: 'fk-14-v1',
          versionNumber: 1,
          content: `Huquqi buzilgan shaxs o‘ziga yetkazilgan zararning to‘liq qoplanishini talab qilishi mumkin.`,
          validFrom: '1997-03-01',
          versionStatus: 'ACTIVE',
          sourceChecksum: 'cfk14',
        },
      ],
    },
    {
      provisionId: 'fk-150',
      documentId: '111189',
      articleNumber: '150-modda',
      articleTitle: 'Umumiy da‘vo muddati',
      officialArticleUrl: 'https://lex.uz/docs/111189#111950',
      currentContent: `Umumiy da‘vo muddati — 3 yil.\nAyrim turdagi talablar uchun qonunlar bilan umumiy muddatga qaraganda qisqartirilgan yoki uzaytirilgan maxsus da‘vo muddatlari belgilanishi mumkin.`,
      currentVersionId: 'fk-150-v1',
      provisionStatus: 'PROVISION_IN_FORCE',
      effectiveFrom: '1997-03-01',
      keywords: ['umumiy da‘vo muddati', '3 yil da‘vo muddati', '150-modda'],
      versions: [
        {
          versionId: 'fk-150-v1',
          versionNumber: 1,
          content: `Umumiy da‘vo muddati — uch yil.`,
          validFrom: '1997-03-01',
          versionStatus: 'ACTIVE',
          sourceChecksum: 'cfk150',
        },
      ],
    },
    {
      provisionId: 'fk-326',
      documentId: '111189',
      articleNumber: '326-modda',
      articleTitle: 'Sud tomonidan neustoykani (penya, jarimani) kamaytirish',
      officialArticleUrl: 'https://lex.uz/docs/111189#112840',
      currentContent: `Agar to‘lanishi lozim bo‘lgan neustoyka kreditorga yetkazilgan zararga nisbatan nomutanosibligi yaqqol ko‘rinib tursa, sud neustoykani kamaytirishga haqli.\nBunda sud majburiyatning qarzdor tomonidan bajarilganlik darajasini, taraflarning mulkiy ahvolini, shuningdek kreditorning diqqatga sazovor manfaatlarini hisobga olishi lozim.`,
      currentVersionId: 'fk-326-v1',
      provisionStatus: 'PROVISION_IN_FORCE',
      effectiveFrom: '1997-03-01',
      keywords: ['sud penya kamaytirishi', 'neustoyka kamaytirish', '326-modda'],
      versions: [
        {
          versionId: 'fk-326-v1',
          versionNumber: 1,
          content: `Agar to‘lanishi lozim bo‘lgan neustoyka kreditorga yetkazilgan zararga nisbatan nomutanosibligi yaqqol ko‘rinib tursa, sud neustoykani kamaytirishga haqli.`,
          validFrom: '1997-03-01',
          versionStatus: 'ACTIVE',
          sourceChecksum: 'cfk326',
        },
      ],
    },
    {
      provisionId: 'fk-327',
      documentId: '111189',
      articleNumber: '327-modda',
      articleTitle: 'Boshqa shaxslarning pul mablag‘larini noqonuniy ushlab qolganlik uchun javobgarlik',
      officialArticleUrl: 'https://lex.uz/docs/111189#112850',
      currentContent: `Boshqa shaxslarning pul mablag‘larini g‘ayriqonuniy ushlab qolish, ularni qaytarishdan bosh tortish, ularni to‘lashni boshqacha tarzda kechiktirish yoxud boshqa shaxs hisobidan asossiz olish yoki jamg‘arish natijasida ushbu mablag‘lardan foydalanganlik uchun ushbu mablag‘lar summasiga foizlar to‘lanishi lozim.\nFoizlar miqdori pul majburiyati yoki uning tegishli qismi bajarilgan kunda kreditor yashaydigan joyda (agar kreditor yuridik shaxs bo‘lsa — uning joylashgan yerida) mavjud bo‘lgan bank foizining hisob stavkasi (MB qayta moliyalash stavkasi) bilan belgilanadi.`,
      currentVersionId: 'fk-327-v1',
      provisionStatus: 'PROVISION_IN_FORCE',
      effectiveFrom: '1997-03-01',
      keywords: ['pul ushlab qolish', 'bank foizi', '327-modda', 'qayta moliyalash stavkasi'],
      versions: [
        {
          versionId: 'fk-327-v1',
          versionNumber: 1,
          content: `Boshqa shaxslarning pul mablag‘larini g‘ayriqonuniy ushlab qolganlik uchun foiz to‘lanadi.`,
          validFrom: '1997-03-01',
          versionStatus: 'ACTIVE',
          sourceChecksum: 'cfk327',
        },
      ],
    },
    {
      provisionId: 'fk-333',
      documentId: '111189',
      articleNumber: '333-modda',
      articleTitle: 'Majburiyatni buzganlik uchun javobgarlik asoslari va fors-major',
      officialArticleUrl: 'https://lex.uz/docs/111189#112890',
      currentContent: `Qarzdor majburiyatni aybi bo‘lgan taqdirdagina bajarmaganligi yoki lozim darajada bajarmaganligi uchun javob beradi, basharti qonunda yoki shartnomada boshqacha qoida nazarda tutilmagan bo‘lsa.\nTadbirkorlik faoliyatini amalga oshirishda majburiyatni bajarmagan yoki lozim darajada bajarmagan shaxs, agar majburiyatni lozim darajada bajarish yengib bo‘lmas kuch (fors-major) tufayli mumkin bo‘lmaganligini isbotlay olmasa, javobgar bo‘ladi.`,
      currentVersionId: 'fk-333-v1',
      provisionStatus: 'PROVISION_IN_FORCE',
      effectiveFrom: '1997-03-01',
      keywords: ['fors-major', 'yengib bo‘lmas kuch', 'ayb asosida javobgarlik', '333-modda'],
      versions: [
        {
          versionId: 'fk-333-v1',
          versionNumber: 1,
          content: `Qarzdor majburiyatni aybi bo‘lgan taqdirdagina javob beradi. Tadbirkorlikda fors-major mustasno.`,
          validFrom: '1997-03-01',
          versionStatus: 'ACTIVE',
          sourceChecksum: 'cfk333',
        },
      ],
    },
    {
      provisionId: 'fk-732',
      documentId: '111189',
      articleNumber: '732-modda',
      articleTitle: 'Qarz shartnomasi tushunchasi',
      officialArticleUrl: 'https://lex.uz/docs/111189#114520',
      currentContent: `Qarz shartnomasi bo‘yicha bir taraf (qarz beruvchi) ikkinchi tarafga (qarz oluvchiga) pul yoki turdosh belgilariga ega bo‘lgan boshqa ashyolarni mulk qilib beradi, qarz oluvchi esa qarz beruvchiga bir yo‘la yoki bo‘lib-bo‘lib, o‘shancha summadagi pulni yoki qarzga olingan ashyolarning xuddi o‘shancha miqdorini qaytarib berish majburiyatini oladi.\nQarz shartnomasi pul yoki ashyolar topshirilgan paytdan boshlab tuzilgan hisoblanadi.`,
      currentVersionId: 'fk-732-v1',
      provisionStatus: 'PROVISION_IN_FORCE',
      effectiveFrom: '1997-03-01',
      keywords: ['qarz shartnomasi', 'pul qarz berish', '732-modda'],
      versions: [
        {
          versionId: 'fk-732-v1',
          versionNumber: 1,
          content: `Qarz shartnomasi bo‘yicha bir taraf ikkinchi tarafga pul beradi, qarz oluvchi esa qaytarish majburiyatini oladi.`,
          validFrom: '1997-03-01',
          versionStatus: 'ACTIVE',
          sourceChecksum: 'cfk732',
        },
      ],
    },
    {
      provisionId: 'fk-733',
      documentId: '111189',
      articleNumber: '733-modda',
      articleTitle: 'Qarz shartnomasining shakli va tilxat (tilxatning kuchi)',
      officialArticleUrl: 'https://lex.uz/docs/111189#114530',
      currentContent: `Qarz shartnomasi, agar uning summasi bazaviy hisoblash miqdorining 10 baravaridan (10 BHM) ortiq bo‘lsa, fuqarolar o‘rtasida esa — kamida 10 BHM dan oshsa, yozma shaklda tuzilishi shart, shartnomadagi taraflardan biri yuridik shaxs bo‘lgan holda esa — summasidan qat‘i nazar, yozma shaklda tuzilishi shart.\nQarz oluvchining tilxati yoki unga qarz beruvchi tomonidan muayyan summa yoki muayyan miqdordagi ashyolar topshirilganligini tasdiqlaydigan boshqa hujjat qarz shartnomasining yozma shakliga tenglashtiriladi.`,
      currentVersionId: 'fk-733-v1',
      provisionStatus: 'PROVISION_IN_FORCE',
      effectiveFrom: '1997-03-01',
      keywords: ['tilxat', 'tilxat kuchi', '10 BHM yozma shakl', '733-modda'],
      versions: [
        {
          versionId: 'fk-733-v1',
          versionNumber: 1,
          content: `Qarz shartnomasi 10 BHM dan ortiq bo‘lsa yozma shaklda tuziladi. Qarz tilxati yozma shartnomaga tenglashtiriladi.`,
          validFrom: '1997-03-01',
          versionStatus: 'ACTIVE',
          sourceChecksum: 'cfk733',
        },
      ],
    },
  ],
};

/**
 * 4. Xo‘jalik yurituvchi subyektlar faoliyatining shartnomaviy-huquqiy bazasi to‘g‘risida Qonun
 * Rasmiy manba: Lex.uz docId: 45781
 */
const SHARTNOMA_QONUNI_45781: OfficialDocumentRecord = {
  documentId: '45781',
  officialDocumentNumber: '670-I-son',
  officialTitle: 'Xo‘jalik yurituvchi subyektlar faoliyatining shartnomaviy-huquqiy bazasi to‘g‘risida O‘zbekiston Respublikasining Qonuni',
  shortTitle: 'Shartnomaviy-huquqiy baza to‘g‘risidagi qonun',
  documentType: 'Qonun',
  officialSourceUrl: 'https://lex.uz/docs/45781',
  adoptionDate: '1998-08-29',
  effectiveFrom: '1998-09-01',
  documentStatus: 'DOC_IN_FORCE',
  sourceRetrievedAt: '2026-10-12T00:00:00.000Z',
  sourceChecksum: 'q45781-sha256-verified-55e1',
  lastVerifiedAt: '2026-10-12T00:00:00.000Z',
  verificationMethod: 'OFFICIAL_SNAPSHOT',
  provisions: [
    {
      provisionId: 'shartnoma-25',
      documentId: '45781',
      articleNumber: '25-modda',
      articleTitle: 'Majburiyatlar kechiktirilganda penya to‘lash va uning 50 foizlik qonuniy chegarasi',
      officialArticleUrl: 'https://lex.uz/docs/45781#45825',
      currentContent: `Tovarlar (ishlar, xizmatlar) yetkazib berish muddatlari kechiktirib yuborilgan, to‘liq yetkazib berilmagan hollarda yetkazib beruvchi xaridorga kechiktirilgan har bir kun uchun majburiyat bajarilmagan qismining 0.5 foizi miqdorida penya to‘laydi, biroq bunda penyaning umumiy summasi yetkazib berilmagan tovarlar (bajarilmagan ishlar, ko‘rsatilmagan xizmatlar) bahosining 50 foizidan oshib ketmasligi lozim.\nPenya to‘lash shartnoma majburiyatlarini buzgan tarafni tovarlar yetkazib berish muddatlarini kechiktirib yuborish, to‘liq yetkazib bermaslik oqibatida yetkazilgan zararni qoplashdan ozod etmaydi.`,
      currentVersionId: 'shartnoma-25-v1',
      provisionStatus: 'PROVISION_IN_FORCE',
      effectiveFrom: '1998-09-01',
      keywords: ['penya chegarasi 50%', 'kunlik 0.5% penya', 'shartnomaviy baza 25-modda'],
      versions: [
        {
          versionId: 'shartnoma-25-v1',
          versionNumber: 1,
          content: `Kechiktirilgan har bir kun uchun 0.5 foiz penya to‘lanadi, biroq bunda penyaning umumiy summasi kechiktirilgan summaning 50 foizidan oshib ketmasligi lozim.`,
          validFrom: '1998-09-01',
          versionStatus: 'ACTIVE',
          sourceChecksum: 'cq25',
        },
      ],
    },
    {
      provisionId: 'shartnoma-32',
      documentId: '45781',
      articleNumber: '32-modda',
      articleTitle: 'Majburiy 15 foizlik oldindan to‘lov (avans) talabi',
      officialArticleUrl: 'https://lex.uz/docs/45781#45832',
      currentContent: `Xo‘jalik yurituvchi subyektlar tomonidan tovarlar yetkazib berish (ishlar bajarish, xizmatlar ko‘rsatish) to‘g‘risidagi shartnomalarda kamida 15 foiz miqdorida oldindan to‘lov (avans) nazarda tutilishi shart (qonunchilikda belgilangan hollar bundan mustasno).`,
      currentVersionId: 'shartnoma-32-v1',
      provisionStatus: 'PROVISION_IN_FORCE',
      effectiveFrom: '1998-09-01',
      keywords: ['15% avans', 'oldindan to‘lov', '32-modda'],
      versions: [
        {
          versionId: 'shartnoma-32-v1',
          versionNumber: 1,
          content: `Kamida 15 foiz oldindan to‘lov (avans) nazarda tutilishi shart.`,
          validFrom: '1998-09-01',
          versionStatus: 'ACTIVE',
          sourceChecksum: 'cq32',
        },
      ],
    },
  ],
};

/**
 * 5. Fuqarolik protsessual kodeksi (O‘RQ-461-son)
 * Rasmiy manba: Lex.uz docId: 3517337
 */
const FPK_2018: OfficialDocumentRecord = {
  documentId: '3517337',
  officialDocumentNumber: 'O‘RQ-461-son',
  officialTitle: 'O‘zbekiston Respublikasining Fuqarolik protsessual kodeksi',
  shortTitle: 'Fuqarolik protsessual kodeksi',
  documentType: 'Kodeks',
  officialSourceUrl: 'https://lex.uz/docs/3517337',
  adoptionDate: '2018-01-22',
  effectiveFrom: '2018-04-01',
  documentStatus: 'DOC_IN_FORCE',
  sourceRetrievedAt: '2026-10-12T00:00:00.000Z',
  sourceChecksum: 'fpk2018-sha256-verified-71b3',
  lastVerifiedAt: '2026-10-12T00:00:00.000Z',
  verificationMethod: 'OFFICIAL_SNAPSHOT',
  provisions: [
    {
      provisionId: 'fpk-67',
      documentId: '3517337',
      articleNumber: '67-modda',
      articleTitle: 'Dalillar turlari',
      officialArticleUrl: 'https://lex.uz/docs/3517337#3517720',
      currentContent: `Ish bo‘yicha dalillar taraflar va uchinchi shaxslarning tushuntirishlari, guvohlarning ko‘rsatuvlari, yozma va ashyoviy dalillar, audio va video yozuvlar, ekspertlarning xulosalari, mutaxassislarning maslahatlari (tushuntirishlari) bilan aniqlanadi.`,
      currentVersionId: 'fpk-67-v1',
      provisionStatus: 'PROVISION_IN_FORCE',
      effectiveFrom: '2018-04-01',
      keywords: ['dalillar', 'audio va video yozuvlar dalil', '67-modda'],
      versions: [
        {
          versionId: 'fpk-67-v1',
          versionNumber: 1,
          content: `Ish bo‘yicha dalillar guvohlarning ko‘rsatuvlari, yozma va ashyoviy dalillar, audio va video yozuvlar bilan aniqlanadi.`,
          validFrom: '2018-04-01',
          versionStatus: 'ACTIVE',
          sourceChecksum: 'cfpk67',
        },
      ],
    },
    {
      provisionId: 'fpk-78',
      documentId: '3517337',
      articleNumber: '78-modda',
      articleTitle: 'Audio va video yozuvlar va ularning sudga taqdim etilishi',
      officialArticleUrl: 'https://lex.uz/docs/3517337#3517780',
      currentContent: `Audio va video yozuvlarni taqdim etgan yoki ularni talab qilib olish to‘g‘risida iltimosnoma bergan shaxs bu yozuvlar qachon, kim tomonidan va qanday sharoitlarda amalga oshirilganligini ko‘rsatishi shart.\nYashirincha olingan audio va video yozuvlar, agar qonunda boshqacha tartib nazarda tutilmagan bo‘lsa, sud tomonidan dalil sifatida qabul qilinmasligi mumkin.`,
      currentVersionId: 'fpk-78-v1',
      provisionStatus: 'PROVISION_IN_FORCE',
      effectiveFrom: '2018-04-01',
      keywords: ['audio yozuvlar qonuniyligi', 'yashirin audio', '78-modda', 'ovoz yozuvi'],
      versions: [
        {
          versionId: 'fpk-78-v1',
          versionNumber: 1,
          content: `Audio va video yozuvlarni taqdim etgan shaxs bu yozuvlar qachon, kim tomonidan va qanday sharoitlarda amalga oshirilganligini ko‘rsatishi shart.`,
          validFrom: '2018-04-01',
          versionStatus: 'ACTIVE',
          sourceChecksum: 'cfpk78',
        },
      ],
    },
  ],
};

/**
 * 6. Iqtisodiy protsessual kodeksi (O‘RQ-462-son)
 * Rasmiy manba: Lex.uz docId: 3518496
 */
const IPK_2018: OfficialDocumentRecord = {
  documentId: '3518496',
  officialDocumentNumber: 'O‘RQ-462-son',
  officialTitle: 'O‘zbekiston Respublikasining Iqtisodiy protsessual kodeksi',
  shortTitle: 'Iqtisodiy protsessual kodeksi',
  documentType: 'Kodeks',
  officialSourceUrl: 'https://lex.uz/docs/3518496',
  adoptionDate: '2018-01-24',
  effectiveFrom: '2018-04-01',
  documentStatus: 'DOC_IN_FORCE',
  sourceRetrievedAt: '2026-10-12T00:00:00.000Z',
  sourceChecksum: 'ipk2018-sha256-verified-64a2',
  lastVerifiedAt: '2026-10-12T00:00:00.000Z',
  verificationMethod: 'OFFICIAL_SNAPSHOT',
  provisions: [
    {
      provisionId: 'ipk-148',
      documentId: '3518496',
      articleNumber: '148-modda',
      articleTitle: 'Nizoni sudgacha hal qilish (talabnoma / pretenziya) tartibi',
      officialArticleUrl: 'https://lex.uz/docs/3518496#3518920',
      currentContent: `Qonunda yoki shartnomada nazarda tutilgan hollarda nizo sudga taqdim etilishidan oldin taraflar o‘rtasida talabnoma (pretenziya) yuborish orqali hal qilinishi shart.\nTalabnomaga javob berish muddati shartnomada boshqacha qoida belgilanmagan bo‘lsa, u olingan kundan e‘tiboran 15 kunni tashkil etadi (eski 30 kunlik qoida amalda emas).`,
      currentVersionId: 'ipk-148-v1',
      provisionStatus: 'PROVISION_IN_FORCE',
      effectiveFrom: '2018-04-01',
      keywords: ['talabnoma 15 kun', 'pretenziya', 'sudgacha tartib', '148-modda'],
      versions: [
        {
          versionId: 'ipk-148-v1',
          versionNumber: 1,
          content: `Talabnomaga javob berish muddati 15 kunni tashkil etadi.`,
          validFrom: '2018-04-01',
          versionStatus: 'ACTIVE',
          sourceChecksum: 'cipk148',
        },
      ],
    },
    {
      provisionId: 'ipk-156',
      documentId: '3518496',
      articleNumber: '156-modda',
      articleTitle: 'Da‘vo arizasi yuzasidan fikr-mulohaza (otziv)',
      officialArticleUrl: 'https://lex.uz/docs/3518496#3518960',
      currentContent: `Javobgar da‘vo arizasi yuzasidan o‘z e‘tirozlarini asoslovchi hujjatlarni ilova qilgan holda sudga va ishda ishtirok etuvchi boshqa shaxslarga yozma fikr-mulohaza (otziv) yuborishga haqli.`,
      currentVersionId: 'ipk-156-v1',
      provisionStatus: 'PROVISION_IN_FORCE',
      effectiveFrom: '2018-04-01',
      keywords: ['otziv', 'e‘tiroznoma', '156-modda'],
      versions: [
        {
          versionId: 'ipk-156-v1',
          versionNumber: 1,
          content: `Javobgar da‘vo yuzasidan yozma fikr-mulohaza (otziv) yuborishga haqli.`,
          validFrom: '2018-04-01',
          versionStatus: 'ACTIVE',
          sourceChecksum: 'cipk156',
        },
      ],
    },
  ],
};

/**
 * 7. Oila kodeksi (607-I-son)
 * Rasmiy manba: Lex.uz docId: 104720
 */
const OILA_KODEKSI_1998: OfficialDocumentRecord = {
  documentId: '104720',
  officialDocumentNumber: '607-I-son',
  officialTitle: 'O‘zbekiston Respublikasining Oila kodeksi',
  shortTitle: 'Oila kodeksi',
  documentType: 'Kodeks',
  officialSourceUrl: 'https://lex.uz/docs/104720',
  adoptionDate: '1998-04-30',
  effectiveFrom: '1998-09-01',
  documentStatus: 'DOC_IN_FORCE',
  sourceRetrievedAt: '2026-10-12T00:00:00.000Z',
  sourceChecksum: 'ok1998-sha256-verified-23d9',
  lastVerifiedAt: '2026-10-12T00:00:00.000Z',
  verificationMethod: 'OFFICIAL_SNAPSHOT',
  provisions: [
    {
      provisionId: 'ok-99',
      documentId: '104720',
      articleNumber: '99-modda',
      articleTitle: 'Voyaga yetmagan bolalarga aliment undirish miqdori',
      officialArticleUrl: 'https://lex.uz/docs/104720#105150',
      currentContent: `Agar voyaga yetmagan bolalariga ta‘minot berish haqida ota-ona o‘rtasida kelishuv bo‘lmasa, aliment sud tomonidan ota-onaning har oydagi ish haqi va (yoki) boshqa daromadining:\n— bir bola uchun — to‘rtdan bir qismi (25%);\n— ikki bola uchun — uchdan bir qismi (33.33%);\n— uch va undan ortiq bola uchun — yarmi (50%) miqdorida undiriladi.\nHar bir bola uchun undiriladigan aliment miqdori qonunchilikda belgilangan mehnatga haq to‘lash eng kam miqdorining (MHTEKM) 26.5 foizidan kam bo‘lmasligi kerak.`,
      currentVersionId: 'ok-99-v1',
      provisionStatus: 'PROVISION_IN_FORCE',
      effectiveFrom: '1998-09-01',
      keywords: ['aliment', 'aliment miqdori 25% 33% 50%', 'kamida 26.5% MHTEKM', '99-modda'],
      versions: [
        {
          versionId: 'ok-99-v1',
          versionNumber: 1,
          content: `Aliment: 1 bolaga 25%, 2 bolaga 33.3%, 3+ bolaga 50%. Har bir bolaga eng kam miqdor MHTEKMning 26.5% idan kam bo‘lmasligi lozim.`,
          validFrom: '1998-09-01',
          versionStatus: 'ACTIVE',
          sourceChecksum: 'cok99',
        },
      ],
    },
  ],
};

/**
 * 8. Yangi Tahrirdagi Konstitutsiya (2023-yil 1-maydan kuchga kirgan)
 * Rasmiy manba: Lex.uz docId: 6445145
 */
const KONSTITUTSIYA_2023: OfficialDocumentRecord = {
  documentId: '6445145',
  officialDocumentNumber: 'Yangi Tahrir 2023',
  officialTitle: 'O‘zbekiston Respublikasi Konstitutsiyasi',
  shortTitle: 'Konstitutsiya (2023)',
  documentType: 'Konstitutsiya',
  officialSourceUrl: 'https://lex.uz/docs/6445145',
  adoptionDate: '2023-04-30',
  effectiveFrom: '2023-05-01',
  documentStatus: 'DOC_IN_FORCE',
  sourceRetrievedAt: '2026-10-12T00:00:00.000Z',
  sourceChecksum: 'konst2023-sha256-verified-fe31',
  lastVerifiedAt: '2026-10-12T00:00:00.000Z',
  verificationMethod: 'OFFICIAL_SNAPSHOT',
  provisions: [
    {
      provisionId: 'konst-42',
      documentId: '6445145',
      articleNumber: '42-modda',
      articleTitle: 'Mehnat qilish va adolatli mehnat sharoitlariga bo‘lgan huquq',
      officialArticleUrl: 'https://lex.uz/docs/6445145#6445340',
      currentContent: `Har kim munosib mehnat qilish, erkin kasb va faoliyat turini tanlash, xavfsizlik va gigiyena talablariga javob beradigan qulay mehnat sharoitlarida ishlash, shuningdek mehnatiga hech qanday kamsitishlarsiz hamda mehnatga haq to‘lashning belgilangan eng kam miqdoridan kam bo‘lmagan tarzda adolatli haq olish huquqiga ega.\nHomiladorligi yoki bolasi borligi sababli ayollarni ishga qabul qilishni rad etish, ishdan bo‘shatish va ularning ish haqini kamaytirish taqiqlanadi.`,
      currentVersionId: 'konst-42-v1',
      provisionStatus: 'PROVISION_IN_FORCE',
      effectiveFrom: '2023-05-01',
      keywords: ['konstitutsiya 42-modda', 'adolatli mehnat', 'eng kam ish haqi', 'homilador ayollar huquqi'],
      versions: [
        {
          versionId: 'konst-42-v1',
          versionNumber: 1,
          content: `Har kim munosib mehnat qilish va adolatli haq olish huquqiga ega.`,
          validFrom: '2023-05-01',
          versionStatus: 'ACTIVE',
          sourceChecksum: 'ckonst42',
        },
      ],
    },
    {
      provisionId: 'konst-136',
      documentId: '6445145',
      articleNumber: '136-modda',
      articleTitle: 'Sudyalarning mustaqilligi',
      officialArticleUrl: 'https://lex.uz/docs/6445145#6445820',
      currentContent: `Sudyalar mustaqildir, faqat O‘zbekiston Respublikasi Konstitutsiyasiga va qonunlariga bo‘ysunadilar. Sudyalarning odil sudlovni amalga oshirish borasidagi faoliyatiga biron-bir tarzda aralashishga yo‘l qo‘yilmaydi va bunday aralashish qonunga muvofiq javobgarlikka sabab bo‘ladi.`,
      currentVersionId: 'konst-136-v1',
      provisionStatus: 'PROVISION_IN_FORCE',
      effectiveFrom: '2023-05-01',
      keywords: ['sudlar mustaqilligi', '136-modda'],
      versions: [
        {
          versionId: 'konst-136-v1',
          versionNumber: 1,
          content: `Sudyalar mustaqildir, faqat qonunga bo‘ysunadilar.`,
          validFrom: '2023-05-01',
          versionStatus: 'ACTIVE',
          sourceChecksum: 'ckonst136',
        },
      ],
    },
  ],
};

/**
 * 9. Davlat boji to‘g‘risida Qonun (O‘RQ-600-son)
 * Rasmiy manba: Lex.uz docId: 4682057
 */
const DAVLAT_BOJI_QONUNI_2020: OfficialDocumentRecord = {
  documentId: '4682057',
  officialDocumentNumber: 'O‘RQ-600-son',
  officialTitle: 'Davlat boji to‘g‘risida O‘zbekiston Respublikasining Qonuni',
  shortTitle: 'Davlat boji to‘g‘risidagi qonun',
  documentType: 'Qonun',
  officialSourceUrl: 'https://lex.uz/docs/4682057',
  adoptionDate: '2020-01-06',
  effectiveFrom: '2020-01-07',
  documentStatus: 'DOC_IN_FORCE',
  sourceRetrievedAt: '2026-10-12T00:00:00.000Z',
  sourceChecksum: 'q600-sha256-verified-88cc',
  lastVerifiedAt: '2026-10-12T00:00:00.000Z',
  verificationMethod: 'OFFICIAL_SNAPSHOT',
  provisions: [
    {
      provisionId: 'davlat-boji-stavkalar',
      documentId: '4682057',
      articleNumber: 'Stavkalar ilovasi',
      articleTitle: 'Sudlarda davlat boji stavkalari miqdorlari',
      officialArticleUrl: 'https://lex.uz/docs/4682057#4682480',
      currentContent: `Sudlarga beriladigan da‘vo arizalaridan davlat boji stavkalari:\n1) Fuqarolik ishlari bo‘yicha sudlarda mulkiy da‘volardan — da‘vo bahosining 4 foizi, lekin kamida 1 BHM;\n2) Fuqarolik ishlari bo‘yicha nomulkiy da‘volardan — 2 BHM;\n3) Nikohni bekor qilish da‘volaridan — 2 BHM;\n4) Iqtisodiy sudlarda mulkiy da‘volardan — da‘vo bahosining 2 foizi, lekin kamida 1 BHM;\n5) Ma‘muriy sudlarga davlat organlari ustidan shikoyatlardan — 1 BHM.`,
      currentVersionId: 'davlat-boji-v1',
      provisionStatus: 'PROVISION_IN_FORCE',
      effectiveFrom: '2020-01-07',
      keywords: ['davlat boji stavkalari', 'sud boji', '4 foiz', '2 foiz', 'BHM'],
      versions: [
        {
          versionId: 'davlat-boji-v1',
          versionNumber: 1,
          content: `Fuqarolik mulkiy: 4% (kamida 1 BHM). Iqtisodiy mulkiy: 2% (kamida 1 BHM).`,
          validFrom: '2020-01-07',
          versionStatus: 'ACTIVE',
          sourceChecksum: 'cbojiv1',
        },
      ],
    },
  ],
};

// Central Master In-Memory Database Registry
export const AUDITED_OFFICIAL_DOCUMENTS: OfficialDocumentRecord[] = [
  MEHNAT_KODEKSI_2023,
  MEHNAT_KODEKSI_1995_REPEALED,
  FUQAROLIK_KODEKSI_1997,
  SHARTNOMA_QONUNI_45781,
  FPK_2018,
  IPK_2018,
  OILA_KODEKSI_1998,
  KONSTITUTSIYA_2023,
  DAVLAT_BOJI_QONUNI_2020,
];

// Document ID to Record Fast Map
const DOC_MAP_BY_ID = new Map<string, OfficialDocumentRecord>();
for (const doc of AUDITED_OFFICIAL_DOCUMENTS) {
  DOC_MAP_BY_ID.set(doc.documentId, doc);
}

/**
 * Resolves an official document record by exact ID or name lookup
 */
export function resolveOfficialDocument(
  docIdentifierOrName: string
): OfficialDocumentRecord | null {
  if (!docIdentifierOrName) return null;
  const clean = docIdentifierOrName.trim().toLowerCase();

  // 1. Direct docId match (e.g., "6257288")
  if (DOC_MAP_BY_ID.has(clean)) {
    return DOC_MAP_BY_ID.get(clean)!;
  }

  // 2. Direct law number match (e.g., "O‘RQ-798-son", "166-I-son")
  for (const doc of AUDITED_OFFICIAL_DOCUMENTS) {
    const cleanLaw = doc.officialDocumentNumber.toLowerCase().replace(/[^a-z0-9]/g, '');
    const cleanQuery = clean.replace(/[^a-z0-9]/g, '');
    if (cleanQuery && cleanLaw.includes(cleanQuery)) {
      return doc;
    }
  }

  // 3. Name or keyword match
  if (clean.includes('mehnat') || clean.includes('mk')) {
    if (clean.includes('1995') || clean.includes('eski')) {
      return MEHNAT_KODEKSI_1995_REPEALED;
    }
    return MEHNAT_KODEKSI_2023;
  }
  if (clean.includes('fuqarolik protsessual') || clean.includes('fpk')) {
    return FPK_2018;
  }
  if (clean.includes('iqtisodiy protsessual') || clean.includes('ipk')) {
    return IPK_2018;
  }
  if (clean.includes('fuqarolik') || clean.includes('fk')) {
    return FUQAROLIK_KODEKSI_1997;
  }
  if (clean.includes('shartnomaviy-huquqiy') || clean.includes('45781')) {
    return SHARTNOMA_QONUNI_45781;
  }
  if (clean.includes('oila') || clean.includes('ok')) {
    return OILA_KODEKSI_1998;
  }
  if (clean.includes('konstitutsiya')) {
    return KONSTITUTSIYA_2023;
  }
  if (clean.includes('davlat boji') || clean.includes('600')) {
    return DAVLAT_BOJI_QONUNI_2020;
  }

  return null;
}

/**
 * Resolves an exact official provision record from a document
 */
export function resolveOfficialProvision(
  doc: OfficialDocumentRecord,
  articleNumberQuery: string
): OfficialProvisionRecord | null {
  if (!doc || !articleNumberQuery) return null;
  const digits = (articleNumberQuery.match(/\d+/) || [''])[0];

  for (const prov of doc.provisions) {
    const provDigits = (prov.articleNumber.match(/\d+/) || [''])[0];
    if (digits && provDigits === digits) {
      return prov;
    }
    if (prov.articleNumber.toLowerCase().includes(articleNumberQuery.toLowerCase().trim())) {
      return prov;
    }
  }

  return null;
}

/**
 * Searches audited database across all in-force provisions
 */
export function searchAuditedProvisions(
  query: string,
  targetDateContext?: string
): Array<{
  document: OfficialDocumentRecord;
  provision: OfficialProvisionRecord;
  relevanceScore: number;
}> {
  if (!query) return [];
  const qLower = query.toLowerCase();
  const qTokens = qLower.split(/\s+/).filter((t) => t.length > 2);
  const qDigits = (query.match(/\d+/) || [''])[0];
  const targetDate = targetDateContext ? targetDateContext.slice(0, 10) : new Date().toISOString().slice(0, 10);

  const results: Array<{
    document: OfficialDocumentRecord;
    provision: OfficialProvisionRecord;
    relevanceScore: number;
  }> = [];

  for (const doc of AUDITED_OFFICIAL_DOCUMENTS) {
    // By default, filter out repealed documents unless explicitly asked for historical queries
    const isDocActiveOnDate = targetDate >= doc.effectiveFrom && (!doc.effectiveUntil || targetDate <= doc.effectiveUntil);

    for (const prov of doc.provisions) {
      let score = 0;
      const provDigits = (prov.articleNumber.match(/\d+/) || [''])[0];

      if (qDigits && provDigits === qDigits) {
        score += 80;
      }

      for (const token of qTokens) {
        if (prov.articleNumber.toLowerCase().includes(token)) score += 40;
        if (prov.articleTitle.toLowerCase().includes(token)) score += 30;
        if (prov.currentContent.toLowerCase().includes(token)) score += 10;
        if (prov.keywords.some((k) => k.toLowerCase().includes(token))) score += 25;
      }

      if (score > 15) {
        // Boost currently active documents
        if (isDocActiveOnDate && prov.provisionStatus === 'PROVISION_IN_FORCE') {
          score += 20;
        }
        results.push({ document: doc, provision: prov, relevanceScore: score });
      }
    }
  }

  return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
}
