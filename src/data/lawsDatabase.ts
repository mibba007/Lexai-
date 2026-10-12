import { CodexArticle, LegalCategory, LegalCitation, LexVerificationResult } from '../types';
import { validateCitation } from '../services/legal/CitationValidator';

export const OFFICIAL_MACRO_DATA = {
  BHM: 412000,          // Bazaviy hisoblash miqdori (so'm)
  MHTEKM: 1217000,      // Mehnatga haq to'lashning eng kam miqdori (so'm)
  PENSIYA_EKM: 834000,  // Yoshga doir eng kam pensiya miqdori (so'm)
  LAST_UPDATED: '2026-yil',
};

// Common Confusions and Deprecated/Repealed Law Mappings to Current Lex.uz Norms
export const OBSOLETE_LAW_MAPPINGS = [
  {
    obsoleteTerm: '1995-yilgi mehnat kodeksi',
    obsoleteArticle: '100-modda',
    topic: 'Ish beruvchi tashabbusi bilan ishdan bo‘shatish',
    currentLaw: 'O‘zbekiston Respublikasining yangi Mehnat kodeksi (O‘RQ-798-son, 28.10.2022, kuchga kirgan: 30.04.2023)',
    currentArticle: '161-modda',
    lexUrl: 'https://lex.uz/docs/6257288',
    explanation: '1995-yilgi eski Mehnat kodeksi 2023-yil 30-apreldan to‘liq o‘z kuchini yo‘qotgan. Yangi Mehnat kodeksida ish beruvchi tashabbusi bilan bekor qilish 161-moddada belgilangan.',
  },
  {
    obsoleteTerm: '15 ish kuni ta‘til',
    obsoleteArticle: '134-modda (eski MK)',
    topic: 'Yillik eng kam asosiy mehnat ta‘tili',
    currentLaw: 'O‘zbekiston Respublikasining yangi Mehnat kodeksi (O‘RQ-798-son)',
    currentArticle: '217-modda',
    lexUrl: 'https://lex.uz/docs/6257288',
    explanation: 'Eski Mehnat kodeksidagi 15 ish kunlik ta‘til o‘rniga yangi Mehnat kodeksining 217-moddasida har yilgi eng kam asosiy mehnat ta‘tili 21 kalendar kun etib belgilangan.',
  },
  {
    obsoleteTerm: 'rossiya federatsiyasi mehnat kodeksi',
    obsoleteArticle: 'tk rf',
    topic: 'Chet davlat qonunchiligi',
    currentLaw: 'O‘zbekiston Respublikasining yangi Mehnat kodeksi (O‘RQ-798-son)',
    currentArticle: 'Tegishli O‘zR MK moddasi',
    lexUrl: 'https://lex.uz/docs/6257288',
    explanation: 'Rossiya Federatsiyasi (RF) yoki boshqa davlatlar qonunlari O‘zbekiston yurisdiksiyasida amal qilmaydi. O‘zbekistonda faqat Lex.uz dagi milliy qonunchilik qo‘llaniladi.',
  },
  {
    obsoleteTerm: 'eski soliq kodeksi',
    obsoleteArticle: 'yagona soliq to‘lovi (YaST)',
    topic: 'Soliq solish',
    currentLaw: 'O‘zbekiston Respublikasining yangi Soliq kodeksi (O‘RQ-599-son, 30.12.2019)',
    currentArticle: '461, 467-moddalar (Aylanmadan olinadigan soliq)',
    lexUrl: 'https://lex.uz/docs/4674902',
    explanation: '2020-yildan buyon YaST o‘rniga yangi Soliq kodeksi bilan «Aylanmadan olinadigan soliq» (bazaviy stavkasi 4%) amal qiladi.',
  },
  {
    obsoleteTerm: 'sudgacha pretenziya 30 kun',
    obsoleteArticle: 'eski xo‘jalik protsessi',
    topic: 'Iqtisodiy nizolar va talabnoma',
    currentLaw: 'O‘zbekiston Respublikasining Iqtisodiy protsessual kodeksi (IPK)',
    currentArticle: '148-modda',
    lexUrl: 'https://lex.uz/docs/3518496',
    explanation: 'IPK 148-moddasiga ko‘ra shartnomada boshqa muddat ko‘rsatilmagan bo‘lsa, talabnomaga (pretenziyaga) javob berish muddati 15 kunni tashkil etadi.',
  }
];

export const UZBEKISTAN_LAWS_DATABASE: CodexArticle[] = [
  // ==========================================
  // 1. MEHNAT HUQUQI - YANGI MEHNAT KODEKSI (O‘RQ-798-son, 28.10.2022)
  // Lex.uz: https://lex.uz/docs/6257288 (2023-yil 30-apreldan amalda)
  // ==========================================
  {
    id: 'mk-104',
    codeId: 'mk-2023',
    codeName: 'O‘zbekiston Respublikasi Mehnat kodeksi',
    chapterNumber: 'VI bob',
    chapterTitle: 'Mehnat shartnomasining muddati',
    articleNumber: '104-modda',
    articleTitle: 'Mehnat shartnomasining muddati',
    content: `Mehnat shartnomalari:
1) nomuayyan muddatga;
2) 3 yildan ko‘p bo‘lmagan muayyan muddatga (muddatli mehnat shartnomasi) tuzilishi mumkin.
Agar mehnat shartnomasida uning amal qilish muddati ko‘rsatilmagan bo‘lsa, shartnoma nomuayyan muddatga tuzilgan deb hisoblanadi.`,
    effectiveDate: '2023-04-30',
    editionStatus: 'CURRENT',
    lawNumber: 'O‘RQ-798-son',
    lexUrl: 'https://lex.uz/docs/6257288',
    keywords: ['mehnat shartnomasi muddati', 'nomuayyan muddat', '3 yilgacha muddat', '104-modda'],
    category: 'labor',
  },
  {
    id: 'mk-105',
    codeId: 'mk-2023',
    codeName: 'O‘zbekiston Respublikasi Mehnat kodeksi',
    chapterNumber: 'VI bob',
    chapterTitle: 'Mehnat shartnomasining muddati va uni bekor qilish',
    articleNumber: '105-modda',
    articleTitle: 'Muddatli mehnat shartnomasining bekor qilinishi va ogohlantirish tartibi',
    content: `Muddatli mehnat shartnomasi uning muddati tugashi bilan bekor qilinadi. Ish beruvchi xodimni shartnoma muddati tugashidan kamida 3 ish kuni oldin yozma shaklda ogohlantirishi shart.
Agar muddat tugagandan keyin ham mehnat munosabatlari davom etsa va taraflardan hech biri uning bekor qilinishini talab qilmagan bo‘lsa, shartnoma nomuayyan muddatga uzaytirilgan (doimiy) deb hisoblanadi.`,
    effectiveDate: '2023-04-30',
    editionStatus: 'CURRENT',
    lawNumber: 'O‘RQ-798-son',
    lexUrl: 'https://lex.uz/docs/6257288',
    keywords: ['muddatli shartnoma', 'shartnoma muddati tugashi', '3 kun oldin ogohlantirish', 'muddat uzayishi', '105-modda'],
    category: 'labor',
  },
  {
    id: 'mk-129',
    codeId: 'mk-2023',
    codeName: 'O‘zbekiston Respublikasi Mehnat kodeksi',
    chapterNumber: 'VIII bob',
    chapterTitle: 'Ishga qabul qilishda dastlabki sinov',
    articleNumber: '129-modda',
    articleTitle: 'Dastlabki sinov muddati va uni qo‘llash chegaralari',
    content: `Dastlabki sinov muddati uch oydan, tashkilotlar rahbarlari va ularning o‘rinbosarlari, bosh buxgalterlar hamda alohida bo‘linmalar rahbarlari uchun esa olti oydan oshishi mumkin emas.
Homilador ayollar, 3 yoshgacha bolasi bor ayollar, davlat granti asosida o‘qigan bitiruvchilar va 6 oygacha muddatli shartnoma tuzilgan shaxslar uchun dastlabki sinov belgilanmaydi.`,
    effectiveDate: '2023-04-30',
    editionStatus: 'CURRENT',
    lawNumber: 'O‘RQ-798-son',
    lexUrl: 'https://lex.uz/docs/6257288',
    keywords: ['sinov muddati', '3 oy sinov', 'bosh buxgalter 6 oy', 'homilador ayolga sinov taqiqlanadi', '129-modda'],
    category: 'labor',
  },
  {
    id: 'mk-131',
    codeId: 'mk-2023',
    codeName: 'O‘zbekiston Respublikasi Mehnat kodeksi',
    chapterNumber: 'VIII bob',
    chapterTitle: 'Dastlabki sinov',
    articleNumber: '131-modda',
    articleTitle: 'Dastlabki sinov natijasi bo‘yicha mehnat shartnomasini bekor qilish',
    content: `Dastlabki sinov muddati tugagunga qadar har bir taraf ikkinchi tarafni kamida uch kun oldin yozma shaklda ogohlantirib, mehnat shartnomasini bekor qilishga haqlidir. Ish beruvchi xodim sinovdan o‘tmaganligining sabablarini asoslab berishi shart.`,
    effectiveDate: '2023-04-30',
    editionStatus: 'CURRENT',
    lawNumber: 'O‘RQ-798-son',
    lexUrl: 'https://lex.uz/docs/6257288',
    keywords: ['sinovdan o‘tolmadi', '3 kun oldin ogohlantirish', 'sinov natijasi', '131-modda'],
    category: 'labor',
  },
  {
    id: 'mk-161',
    codeId: 'mk-2023',
    codeName: 'O‘zbekiston Respublikasi Mehnat kodeksi',
    chapterNumber: 'X bob',
    chapterTitle: 'Mehnat shartnomasini bekor qilish',
    articleNumber: '161-modda',
    articleTitle: 'Mehnat shartnomasini ish beruvchining tashabbusiga ko‘ra bekor qilish asoslari',
    content: `Mehnat shartnomasi quyidagi asoslarga ko‘ra ish beruvchining tashabbusi bilan bekor qilinishi mumkin:
1) tashkilot tugatilganligi munosabati bilan;
2) xodimlar soni yoki shtati qisqartirilganligi munosabati bilan;
3) xodimning egallab turgan lavozimiga malakasi yetarli bo‘lmaganligi sababli noloyiqligi;
4) xodim tomonidan o‘z mehnat majburiyatlari muntazam ravishda buzilganligi;
5) xodim tomonidan o‘z mehnat majburiyatlari bir marta qo‘pol ravishda buzilganligi (shu jumladan, uzrli sabablarsiz 3 va undan ortiq soat davomida ishda bo‘lmaslik — прогул);
6) ushbu Kodeksda va boshqa qonunlarda nazarda tutilgan boshqa asoslar.
ESLATMA: Eski 1995-yilgi MK dagi 100-modda o‘rniga amalda!`,
    effectiveDate: '2023-04-30',
    editionStatus: 'CURRENT',
    lawNumber: 'O‘RQ-798-son',
    warningNote: 'Eski 1995-yilgi Mehnat kodeksi 100-moddasi bekor qilingan, amaldagi norma 161-moddadir.',
    lexUrl: 'https://lex.uz/docs/6257288',
    keywords: ['ishdan bo‘shatish', 'ish beruvchi tashabbusi', 'shtat qisqarishi', 'progul', 'mehnat intizomi', '161-modda', 'eski 100-modda'],
    category: 'labor',
  },
  {
    id: 'mk-162',
    codeId: 'mk-2023',
    codeName: 'O‘zbekiston Respublikasi Mehnat kodeksi',
    chapterNumber: 'X bob',
    chapterTitle: 'Mehnat shartnomasini bekor qilish',
    articleNumber: '162-modda',
    articleTitle: 'Mehnat shartnomasini bekor qilish to‘g‘risida ogohlantirish muddatlari',
    content: `Ish beruvchi mehnat shartnomasini bekor qilish niyati haqida xodimni yozma ravishda (imzo qo‘ydirib) quyidagi muddatlarda ogohlantirishi shart:
1) tashkilot tugatilganda yoki shtat qisqarganda — kamida 2 oy oldin;
2) xodimning malakasi yetarli bo‘lmaganda — kamida 2 hafta oldin;
3) xodim o‘z majburiyatlarini bir marta qo‘pol yoki muntazam buzganida — kamida 3 kun oldin.
Ogohlantirish muddati pulli kompensatsiyaga almashtirilishi mumkin.`,
    effectiveDate: '2023-04-30',
    editionStatus: 'CURRENT',
    lawNumber: 'O‘RQ-798-son',
    lexUrl: 'https://lex.uz/docs/6257288',
    keywords: ['ogohlantirish muddati', 'kompensatsiya', '2 oy', '2 hafta', 'yozma ogohlantirish', '162-modda'],
    category: 'labor',
  },
  {
    id: 'mk-173',
    codeId: 'mk-2023',
    codeName: 'O‘zbekiston Respublikasi Mehnat kodeksi',
    chapterNumber: 'XI bob',
    chapterTitle: 'Mehnat shartnomasi bekor qilinganda kafolatlar va kompensatsiyalar',
    articleNumber: '173-modda',
    articleTitle: 'Ishdan bo‘shatish nafaqasi miqdorlari',
    content: `Mehnat shartnomasi bekor qilinganda (shtat qisqarganda, tashkilot tugatilganda va h.k.) ishdan bo‘shatish nafaqasi xodimning ish stajiga mutanosib to‘lanadi:
1) 3 yilgacha ish stajiga ega bo‘lganda — o‘rtacha oylik ish haqining kamida 50 foizi miqdorida;
2) 3 yildan 5 yilgacha ish staji bo‘lganda — kamida 75 foizi;
3) 5 yildan 10 yilgacha ish staji bo‘lganda — kamida 100 foizi;
4) 10 yildan 15 yilgacha ish staji bo‘lganda — kamida 150 foizi;
5) 15 yildan ortiq ish staji bo‘lganda — kamida 200 foizi miqdorida.`,
    effectiveDate: '2023-04-30',
    editionStatus: 'CURRENT',
    lawNumber: 'O‘RQ-798-son',
    lexUrl: 'https://lex.uz/docs/6257288',
    keywords: ['ishdan bo‘shatish nafaqasi', 'kompensatsiya', 'staj', 'o‘rtacha oylik ish haqi', '173-modda'],
    category: 'labor',
  },
  {
    id: 'mk-217',
    codeId: 'mk-2023',
    codeName: 'O‘zbekiston Respublikasi Mehnat kodeksi',
    chapterNumber: 'XIV bob',
    chapterTitle: 'Dam olish vaqti va mehnat ta‘tillari',
    articleNumber: '217-modda',
    articleTitle: 'Har yilgi asosiy eng kam mehnat ta‘tilining davomiyligi (21 kalendar kun)',
    content: `Har yilgi asosiy eng kam mehnat ta‘tilining davomiyligi 21 kalendar kunni tashkil etadi (eski Mehnat kodeksidagi 15 ish kuni bekor bo‘lgan).
Davlat xizmatchilari, pedagoglar va nogironligi bo‘lgan shaxslar uchun uzaytirilgan ta‘tillar qonun hujjatlarida belgilanadi. Ta‘tillar davriga to‘g‘ri kelgan ishlanmaydigan bayram kunlari ta‘til kunlari hisobiga kirmaydi.`,
    effectiveDate: '2023-04-30',
    editionStatus: 'CURRENT',
    lawNumber: 'O‘RQ-798-son',
    warningNote: 'Eski 15 ish kunlik qoida bekor qilingan, faqat 21 kalendar kun amalda.',
    lexUrl: 'https://lex.uz/docs/6257288',
    keywords: ['mehnat ta‘tili', '21 kalendar kun', 'asosiy ta‘til', 'dam olish', '217-modda', 'eski 15 kun'],
    category: 'labor',
  },
  {
    id: 'mk-230',
    codeId: 'mk-2023',
    codeName: 'O‘zbekiston Respublikasi Mehnat kodeksi',
    chapterNumber: 'XIV bob',
    chapterTitle: 'Mehnat ta‘tillari',
    articleNumber: '230-modda',
    articleTitle: 'Mehnat shartnomasi bekor qilinganda foydalanilmagan ta‘tillar uchun pulli kompensatsiya',
    content: `Mehnat shartnomasi bekor qilinganda xodimga barcha foydalanilmagan har yilgi asosiy va qo‘shimcha mehnat ta‘tillari uchun to‘liq pulli kompensatsiya to‘lanadi. Agar xodim bir necha yil ta‘tildan foydalanmagan bo‘lsa, barcha yillar uchun kompensatsiya hisoblab to‘lab berilishi shart.`,
    effectiveDate: '2023-04-30',
    editionStatus: 'CURRENT',
    lawNumber: 'O‘RQ-798-son',
    lexUrl: 'https://lex.uz/docs/6257288',
    keywords: ['ta‘til kompensatsiyasi', 'ishdan bo‘shaganda ta‘til puli', 'foydalanilmagan ta‘til', '230-modda'],
    category: 'labor',
  },
  {
    id: 'mk-312',
    codeId: 'mk-2023',
    codeName: 'O‘zbekiston Respublikasi Mehnat kodeksi',
    chapterNumber: 'XVIII bob',
    chapterTitle: 'Mehnat intizomi va intizomiy choralar',
    articleNumber: '312-modda',
    articleTitle: 'Intizomiy jazo choralari va ularning qat‘iy ro‘yxati',
    content: `Mehnat intizomini buzganlik uchun ish beruvchi faqat quyidagi intizomiy jazo choralarini qo‘llashga haqli:
1) hayfsan;
2) o‘rtacha oylik ish haqining o‘ttiz foizidan (30%) ortiq bo‘lmagan miqdorda jarima (ichki mehnat tartibi qoidalarida nazarda tutilgan hollarda ellik foizgacha - 50%);
3) mehnat shartnomasini bekor qilish (161-modda ikkinchi qismining 4 va 5-bandlari).
Ushbu jazolardan tashqari boshqa intizomiy jazolarni (masalan, oylikdan qonunga zid ushlab qolishlar, jarimalar) qo‘llash qat‘iyan taqiqlanadi.`,
    effectiveDate: '2023-04-30',
    editionStatus: 'CURRENT',
    lawNumber: 'O‘RQ-798-son',
    lexUrl: 'https://lex.uz/docs/6257288',
    keywords: ['hayfsan', 'jarima', 'intizomiy jazo', 'mehnat intizomi', '30 foiz jarima', '312-modda'],
    category: 'labor',
  },
  {
    id: 'mk-313',
    codeId: 'mk-2023',
    codeName: 'O‘zbekiston Respublikasi Mehnat kodeksi',
    chapterNumber: 'XVIII bob',
    chapterTitle: 'Intizomiy javobgarlik',
    articleNumber: '313-modda',
    articleTitle: 'Intizomiy jazoni qo‘llash tartibi va yozma tushuntirish talabi',
    content: `Intizomiy jazo qo‘llanilishidan oldin xodimdan yozma shaklda tushuntirish xati talab qilinishi shart. Xodimning tushuntirish xati berishdan bosh tortganligi intizomiy jazo qo‘llash uchun to‘siq bo‘lmaydi va bu haqda dalolatnoma tuziladi. Intizomiy jazo nojo‘ya xatti-harakat aniqlangandan keyin bir oydan kechiktirmay qo‘llaniladi.`,
    effectiveDate: '2023-04-30',
    editionStatus: 'CURRENT',
    lawNumber: 'O‘RQ-798-son',
    lexUrl: 'https://lex.uz/docs/6257288',
    keywords: ['tushuntirish xati', 'dalolatnoma', '1 oy muddat', 'intizomiy jazo tartibi', '313-modda'],
    category: 'labor',
  },
  {
    id: 'mk-408',
    codeId: 'mk-2023',
    codeName: 'O‘zbekiston Respublikasi Mehnat kodeksi',
    chapterNumber: 'XXVI bob',
    chapterTitle: 'Ayollar va oilaviy vazifalarni bajarish bilan mashg‘ul shaxslar kafolatlari',
    articleNumber: '408-modda',
    articleTitle: 'Homilador ayollar va bolasi bor ayollar bilan mehnat shartnomasini bekor qilish kafolatlari',
    content: `Homilador ayollar va uch yoshga to‘lmagan bolasi bor xodimlar bilan mehnat shartnomasini ish beruvchining tashabbusiga ko‘ra bekor qilishga yo‘l qo‘yilmaydi, korxona to‘liq tugatilgan hollar bundan mustasno. Muddatli shartnoma muddati tugaganda, xodimning yozma arizasi va tibbiy xulosasi asosida ish beruvchi shartnoma muddatini homiladorlik va tug‘ish ta‘tili tugaguniga qadar uzaytirishi shart.`,
    effectiveDate: '2023-04-30',
    editionStatus: 'CURRENT',
    lawNumber: 'O‘RQ-798-son',
    lexUrl: 'https://lex.uz/docs/6257288',
    keywords: ['homilador ayol', 'ishdan bo‘shatish taqiqlanadi', '3 yoshgacha bola', 'kafolatlar', '408-modda'],
    category: 'labor',
  },

  // ==========================================
  // 2. FUQAROLIK HUQUQI - FUQAROLIK KODEKSI (FK - Lex.uz 111189)
  // ==========================================
  {
    id: 'fk-14',
    codeId: 'fk-uz',
    codeName: 'O‘zbekiston Respublikasi Fuqarolik kodeksi',
    chapterNumber: '2-bob',
    chapterTitle: 'Fuqarolik huquqlarini himoya qilish',
    articleNumber: '14-modda',
    articleTitle: 'Zararni qoplash (Haqiqiy zarar va boy berilgan foyda)',
    content: `Huquqi buzilgan shaxs o‘ziga yetkazilgan zararning to‘la qoplanishini talab qilishi mumkin.
Zarar deganda huquqi buzilgan shaxsning buzilgan huquqini tiklash uchun qilgan yoki qilishi lozim bo‘lgan xarajatlari, uning mol-mulki yo‘qolishi yoki shikastlanishi (haqiqiy zarar), shuningdek ushbu shaxs o‘z huquqlari buzilmaganida odatdagi fuqarolik muomalasi sharoitida olishi mumkin bo‘lgan, lekin ololmay qolgan daromadlari (boy berilgan foyda) tushuniladi.`,
    effectiveDate: '1997-03-01',
    editionStatus: 'CURRENT',
    lawNumber: 'FK-111189',
    lexUrl: 'https://lex.uz/docs/111189',
    keywords: ['zararni qoplash', 'moddiy zarar', 'haqiqiy zarar', 'boy berilgan foyda', '14-modda'],
    category: 'civil',
  },
  {
    id: 'fk-100',
    codeId: 'fk-uz',
    codeName: 'O‘zbekiston Respublikasi Fuqarolik kodeksi',
    chapterNumber: '8-bob',
    chapterTitle: 'Nomoddiy ne‘matlar va ularni himoya qilish',
    articleNumber: '100-modda',
    articleTitle: 'Sha’n, qadr-qimmat va ishchanlik obro‘sini himoya qilish',
    content: `1-qism: Fuqaro o‘zining sha’niga, qadr-qimmatiga yoki ishchanlik obro‘siga putur yetkazuvchi ma’lumotlar yuzasidan sud yo‘li bilan raddiya talab qilishga haqli.
6-qism: Ushbu moddaning fuqaroning ishchanlik obro‘sini himoya qilishga doir qoidalari tegishincha yuridik shaxsning ishchanlik obro‘sini himoya qilishga nisbatan ham qo‘llanadi. Yuridik shaxsning ishchanlik obro‘siga putur yetkazadigan ma’lumotlar tarqatilgan taqdirda, ushbu shaxs bunday ma’lumotlarni raddiya qilish bilan bir qatorda, ularni tarqatish natijasida yetkazilgan zararning o‘rnini qoplashni talab qilishga haqlidir.`,
    effectiveDate: '1997-03-01',
    editionStatus: 'CURRENT',
    lawNumber: 'FK-111189',
    lexUrl: 'https://lex.uz/docs/111189',
    keywords: ['ishchanlik obro‘si', 'sha‘n va qadr-qimmat', 'raddiya', 'tuhmat raddiyasi', '100-modda'],
    category: 'civil',
  },
  {
    id: 'fk-139',
    codeId: 'fk-uz',
    codeName: 'O‘zbekiston Respublikasi Fuqarolik kodeksi',
    chapterNumber: '10-bob',
    chapterTitle: 'Vakillik va ishonchnoma',
    articleNumber: '139-modda',
    articleTitle: 'Ishonchnomaning amal qilish muddati (Maksimal 3 yil)',
    content: `Ishonchnoma ko‘pi bilan uch yil muddatga berilishi mumkin. Agar ishonchnomada muddat ko‘rsatilgan bo‘lmasa, u berilgan kundan boshlab bir yil davomida o‘z kuchini saqlaydi.
Berilgan sanasi ko‘rsatilmagan ishonchnoma haqiqiy emas (haqiqiy hisoblanmaydi).`,
    effectiveDate: '1997-03-01',
    editionStatus: 'CURRENT',
    lawNumber: 'FK-111189',
    lexUrl: 'https://lex.uz/docs/111189',
    keywords: ['ishonchnoma muddati', 'doverennost', '3 yil', 'sana ko‘rsatilmagan ishonchnoma', '139-modda'],
    category: 'civil',
  },
  {
    id: 'fk-150',
    codeId: 'fk-uz',
    codeName: 'O‘zbekiston Respublikasi Fuqarolik kodeksi',
    chapterNumber: '12-bob',
    chapterTitle: 'Da‘vo muddati',
    articleNumber: '150-modda',
    articleTitle: 'Umumiy da‘vo muddati (3 yil)',
    content: `Umumiy da‘vo muddati — uch yil. Da‘vo muddati shaxs o‘zining huquqi buzilganligini bilgan yoki bilishi lozim bo‘lgan kundan e‘tiboran boshlanadi. Qonunda alohida talablar uchun qisqartirilgan yoki uzaytirilgan da‘vo muddatlari belgilanishi mumkin.`,
    effectiveDate: '1997-03-01',
    editionStatus: 'CURRENT',
    lawNumber: 'FK-111189',
    lexUrl: 'https://lex.uz/docs/111189',
    keywords: ['da‘vo muddati', '3 yil da‘vo', 'sudga berish muddati', '150-modda'],
    category: 'civil',
  },
  {
    id: 'fk-326',
    codeId: 'fk-uz',
    codeName: 'O‘zbekiston Respublikasi Fuqarolik kodeksi',
    chapterNumber: '22-bob',
    chapterTitle: 'Majburiyatlar bajarilishini ta‘minlash',
    articleNumber: '326-modda',
    articleTitle: 'Neustoykani (penyani) sud tomonidan kamaytirish va cheklash',
    content: `Agar to‘lanishi lozim bo‘lgan neustoyka kreditorga yetkazilgan zararga nisbatan nomutanosibligi yaqqol ko‘rinib tursa, sud neustoykani kamaytirishga haqlidir.
«Xo‘jalik yurituvchi subyektlar faoliyatining shartnomaviy-huquqiy bazasi to‘g‘risida»gi Qonunning 25-moddasiga binoan, penyaning umumiy summasi muddati o‘tgan majburiyat summasining 50 foizidan oshishi mumkin emas.`,
    effectiveDate: '1997-03-01',
    editionStatus: 'CURRENT',
    lawNumber: 'FK-111189',
    lexUrl: 'https://lex.uz/docs/111189',
    keywords: ['penya', 'neustoyka', '50 foiz chegara', 'penyani kamaytirish', '326-modda'],
    category: 'civil',
  },
  {
    id: 'fk-327',
    codeId: 'fk-uz',
    codeName: 'O‘zbekiston Respublikasi Fuqarolik kodeksi',
    chapterNumber: '24-bob',
    chapterTitle: 'Majburiyatlarni buzganlik uchun javobgarlik',
    articleNumber: '327-modda',
    articleTitle: 'Boshqa shaxslarning pul mablag‘larini noqonuniy ushlab turganlik uchun foizlar',
    content: `Boshqa shaxslarning pul mablag‘larini noqonuniy ushlab qolish, ularni qaytarishdan bo‘yin tovlash, ularni to‘lashni boshqacha tarzda kechiktirish natijasida ulardan foydalanganlik uchun ushbu mablag‘lar summasiga O‘zbekiston Respublikasi Markaziy bankining amaldagi qayta moliyalash stavkasi bo‘yicha foizlar to‘lanishi lozim.`,
    effectiveDate: '1997-03-01',
    editionStatus: 'CURRENT',
    lawNumber: 'FK-111189',
    lexUrl: 'https://lex.uz/docs/111189',
    keywords: ['pulni noqonuniy ushlab turish', 'markaziy bank foizi', 'qarz foizi', '327-modda'],
    category: 'civil',
  },
  {
    id: 'fk-333',
    codeId: 'fk-uz',
    codeName: 'O‘zbekiston Respublikasi Fuqarolik kodeksi',
    chapterNumber: '24-bob',
    chapterTitle: 'Majburiyatlarni buzganlik uchun javobgarlik',
    articleNumber: '333-modda',
    articleTitle: 'Majburiyatni buzganlik uchun javobgarlik asoslari va Fors-major holatlari',
    content: `Qarzdor majburiyatni aybi bo‘lgan taqdirdagina bajarmaganligi yoki lozim darajada bajarmaganligi uchun javob beradi.
Tadbirkorlik faoliyatini amalga oshirishda majburiyatni bajarmagan yoki lozim darajada bajarmagan shaxs, agar majburiyatni lozim darajada bajarish yengib bo‘lmas kuch, ya’ni favqulodda va muayyan sharoitlarda oldini olib bo‘lmaydigan vaziyatlar (fors-major) tufayli mumkin bo‘lmaganligini isbotlay olmasa, javobgar bo‘ladi.`,
    effectiveDate: '1997-03-01',
    editionStatus: 'CURRENT',
    lawNumber: 'FK-111189',
    lexUrl: 'https://lex.uz/docs/111189',
    keywords: ['fors-major', 'yengib bo‘lmas kuch', 'javobgarlikdan ozod qilish', '333-modda'],
    category: 'civil',
  },
  {
    id: 'fk-354',
    codeId: 'fk-uz',
    codeName: 'O‘zbekiston Respublikasi Fuqarolik kodeksi',
    chapterNumber: '27-bob',
    chapterTitle: 'Shartnoma tushunchasi va shartlari',
    articleNumber: '354-modda',
    articleTitle: 'Shartnoma erkinligi prinsipi',
    content: `Fuqarolar va yuridik shaxslar shartnoma tuzishda erkindirlar. Shartnoma tuzishga majburlashga yo‘l qo‘yilmaydi, shartnoma tuzish majburiyati ushbu Kodeksda, boshqa qonunlarda yoki olingan majburiyatda nazarda tutilgan hollar bundan mustasno.`,
    effectiveDate: '1997-03-01',
    editionStatus: 'CURRENT',
    lawNumber: 'FK-111189',
    lexUrl: 'https://lex.uz/docs/111189',
    keywords: ['shartnoma erkinligi', 'majburlash taqiqlanadi', '354-modda'],
    category: 'civil',
  },
  {
    id: 'fk-554',
    codeId: 'fk-uz',
    codeName: 'O‘zbekiston Respublikasi Fuqarolik kodeksi',
    chapterNumber: '34-bob',
    chapterTitle: 'Uy-joy ijarasi',
    articleNumber: '554-modda',
    articleTitle: 'Turar joyni ijaraga berish shartnomasining muddati va ro‘yxatga olish',
    content: `Turar joyni ijaraga berish shartnomasi besh yildan ortiq bo‘lmagan muddatga tuziladi. Agar shartnomada muddat ko‘rsatilmagan bo‘lsa, u besh yilga tuzilgan deb hisoblanadi.
O‘zR qonunchiligiga (VMQ-837) ko‘ra, fuqarolar o‘rtasida tuzilgan turar joy ijara shartnomalari davlat soliq xizmati organlarida (ijara.soliq.uz) hisobga qo‘yilishi shart.`,
    effectiveDate: '1997-03-01',
    editionStatus: 'CURRENT',
    lawNumber: 'FK-111189',
    lexUrl: 'https://lex.uz/docs/111189',
    keywords: ['kvartira ijarasi', 'ijara shartnomasi', 'ijara.soliq.uz', 'soliqda ro‘yxatdan o‘tkazish', '554-modda'],
    category: 'civil',
  },
  {
    id: 'fk-732',
    codeId: 'fk-uz',
    codeName: 'O‘zbekiston Respublikasi Fuqarolik kodeksi',
    chapterNumber: '41-bob',
    chapterTitle: 'Qarz va kredit',
    articleNumber: '732-modda',
    articleTitle: 'Qarz shartnomasi tushunchasi',
    content: `Qarz shartnomasi bo‘yicha bir taraf (qarz beruvchi) ikkinchi tarafga (qarz oluvchiga) pul yoki turdosh belgilariga ega bo‘lgan boshqa ashyolarni mulk qilib beradi, qarz oluvchi esa qarz beruvchiga bir yo‘la yoki bo‘lib-bo‘lib, shuncha summadagi pulni yoki qarzga olingan ashyolarning xuddi o‘shancha miqdoridagi xuddi shunday turdagi va sifatdagi ashyolarni (qarz summasini) qaytarib berish majburiyatini oladi. Qarz shartnomasi pul yoki ashyolar topshirilgan paytdan boshlab tuzilgan hisoblanadi.`,
    effectiveDate: '1997-03-01',
    editionStatus: 'CURRENT',
    lawNumber: 'FK-111189',
    lexUrl: 'https://lex.uz/docs/111189',
    keywords: ['qarz shartnomasi', 'qarz berish', 'qarz summasi', 'pul qarz', '732-modda'],
    category: 'civil',
  },
  {
    id: 'fk-733',
    codeId: 'fk-uz',
    codeName: 'O‘zbekiston Respublikasi Fuqarolik kodeksi',
    chapterNumber: '41-bob',
    chapterTitle: 'Qarz va kredit',
    articleNumber: '733-modda',
    articleTitle: 'Qarz shartnomasining shakli va Tilxatning yuridik kuchi',
    content: `Qarz shartnomasi, agar uning summasi bazaviy hisoblash miqdorining o‘n baravaridan (10 BHM) ortiq bo‘lsa, fuqarolar o‘rtasida esa — kamida o‘n baravaridan oshsa, yozma shaklda tuzilishi shart.
Agar qarz oluvchining tilxati yoki unga qarz beruvchi tomonidan muayyan pul summasi berilganligini tasdiqlaydigan boshqa hujjat taqdim etilsa, qarz shartnomasining yozma shakliga rioya qilingan deb hisoblanadi. Tilxat sudda qarz olinganligini isbotlovchi to‘liq yozma dalildir.`,
    effectiveDate: '1997-03-01',
    editionStatus: 'CURRENT',
    lawNumber: 'FK-111189',
    lexUrl: 'https://lex.uz/docs/111189',
    keywords: ['tilxat', 'qarz tilxati', 'yozma qarz', '10 BHM', 'tilxatning kuchi', '733-modda'],
    category: 'civil',
  },
  {
    id: 'fk-735',
    codeId: 'fk-uz',
    codeName: 'O‘zbekiston Respublikasi Fuqarolik kodeksi',
    chapterNumber: '41-bob',
    chapterTitle: 'Qarz va kredit',
    articleNumber: '735-modda',
    articleTitle: 'Qarz oluvchining qarz summasini qaytarish majburiyati',
    content: `Qarz oluvchi olingan qarz summasini qarz shartnomasida nazarda tutilgan muddatda va tartibda qarz beruvchiga qaytarishi shart.
Qarzni qaytarish muddati belgilanmagan yoki talab qilib olinguncha bo‘lgan hollarda qarz summasi qarz beruvchi bu haqda talab qo‘ygan kundan boshlab o‘ttiz kun (30 kun) mobaynida qarz oluvchi tomonidan qaytarilishi kerak.`,
    effectiveDate: '1997-03-01',
    editionStatus: 'CURRENT',
    lawNumber: 'FK-111189',
    lexUrl: 'https://lex.uz/docs/111189',
    keywords: ['qarzni qaytarish', '30 kunlik muddat', 'qarz talab qilish', '735-modda'],
    category: 'civil',
  },
  {
    id: 'fk-985',
    codeId: 'fk-uz',
    codeName: 'O‘zbekiston Respublikasi Fuqarolik kodeksi',
    chapterNumber: '57-bob',
    chapterTitle: 'Zarar yetkazishdan kelib chiqadigan majburiyatlar',
    articleNumber: '985-modda',
    articleTitle: 'Zarar yetkazganlik uchun javobgarlikning umumiy asoslari (Delikt javobgarlik)',
    content: `G‘ayriqonuniy harakat (harakatsizlik) tufayli fuqaroning shaxsiga yoki mol-mulkiga yetkazilgan zarar, shuningdek yuridik shaxsga yetkazilgan zarar zararni yetkazgan shaxs tomonidan to‘liq hajmda qoplanishi lozim. Qonunda zararni to‘lash majburiyati zarar yetkazuvchi bo‘lmagan shaxsga ham yuklatilishi mumkin.`,
    effectiveDate: '1997-03-01',
    editionStatus: 'CURRENT',
    lawNumber: 'FK-111189',
    lexUrl: 'https://lex.uz/docs/111189',
    keywords: ['zarar yetkazish', 'delikt', 'avtohalokat zarari', 'mol-mulk shikastlanishi', '985-modda'],
    category: 'civil',
  },
  {
    id: 'fk-1021',
    codeId: 'fk-uz',
    codeName: 'O‘zbekiston Respublikasi Fuqarolik kodeksi',
    chapterNumber: '57-bob',
    chapterTitle: 'Ma‘naviy zararni qoplash',
    articleNumber: '1021-modda',
    articleTitle: 'Ma’naviy zararni qoplashning umumiy asoslari',
    content: `Ma’naviy zarar uni yetkazuvchining aybi bo‘lgan taqdirda, zarar yetkazuvchi tomonidan qoplanadi.
Zarar fuqaroning hayoti va sog‘lig‘iga yuqori xavf manbai (masalan, avtomobil) tomonidan yetkazilgan taqdirda, shuningdek fuqaroning sha’ni, qadr-qimmati va ishchanlik obro‘siga putur yetkazuvchi ma’lumotlar tarqatilgan taqdirda ma’naviy zarar yetkazuvchining aybidan qat’i nazar qoplanadi.`,
    effectiveDate: '1997-03-01',
    editionStatus: 'CURRENT',
    lawNumber: 'FK-111189',
    lexUrl: 'https://lex.uz/docs/111189',
    keywords: ['ma‘naviy zarar', 'aybsiz javobgarlik', 'sha‘n va obro‘ zarari', '1021-modda'],
    category: 'civil',
  },
  {
    id: 'fk-1022',
    codeId: 'fk-uz',
    codeName: 'O‘zbekiston Respublikasi Fuqarolik kodeksi',
    chapterNumber: '57-bob',
    chapterTitle: 'Ma‘naviy zararni qoplash',
    articleNumber: '1022-modda',
    articleTitle: 'Ma’naviy zararni qoplash usuli va miqdori',
    content: `1-qism: Ma’naviy zarar pul bilan qoplanadi.
2-qism: Ma’naviy zararni qoplash miqdori jabrlanuvchiga yetkazilgan jismoniy va ma’naviy azoblarning xususiyatiga, shuningdek zarar yetkazuvchining aybi darajasiga qarab sud tomonidan belgilanadi.
3-qism: Ma’naviy zarar qoplanishi lozim bo‘lgan mulkiy zarardan qat’i nazar qoplanadi.`,
    effectiveDate: '1997-03-01',
    editionStatus: 'CURRENT',
    lawNumber: 'FK-111189',
    lexUrl: 'https://lex.uz/docs/111189',
    keywords: ['ma‘naviy zarar pul bilan qoplanadi', 'sud belgilaydigan summa', 'azoblar', '1022-modda'],
    category: 'civil',
  },

  // ==========================================
  // 3. OILA HUQUQI - OILA KODEKSI (OK - Lex.uz 104720)
  // ==========================================
  {
    id: 'ok-23',
    codeId: 'ok-uz',
    codeName: 'O‘zbekiston Respublikasi Oila kodeksi',
    chapterNumber: '5-bob',
    chapterTitle: 'Er va xotinning mol-mulkiga nisbatan qonuniy rejim',
    articleNumber: '23-modda',
    articleTitle: 'Er va xotinning umumiy birgalikdagi mulki',
    content: `Er va xotinning nikoh davomida orttirgan mol-mulklari, shuningdek nikoh qayd etilgunga qadar bo‘lajak er-xotinning umumiy mablag‘lari hisobiga olingan mol-mulklari, agar qonunda yoki nikoh shartnomasida boshqacha hol nazarda tutilmagan bo‘lsa, ularning birgalikdagi umumiy mulki hisoblanadi.`,
    effectiveDate: '1998-09-01',
    editionStatus: 'CURRENT',
    lawNumber: 'OK-104720',
    lexUrl: 'https://lex.uz/docs/104720',
    keywords: ['er-xotin mulki', 'birgalikdagi mulk', 'nikoh davomidagi mol-mulk', '23-modda'],
    category: 'family',
  },
  {
    id: 'ok-37',
    codeId: 'ok-uz',
    codeName: 'O‘zbekiston Respublikasi Oila kodeksi',
    chapterNumber: '5-bob',
    chapterTitle: 'Er va xotinning mol-mulki',
    articleNumber: '37-modda',
    articleTitle: 'Er va xotinning umumiy mol-mulkini bo‘lish',
    content: `Er va xotinning umumiy mol-mulkini bo‘lish er va xotindan birining talabiga ko‘ra nikoh davrida ham, nikohdan ajralgandan keyin ham, shuningdek kreditor umumiy mol-mulkdagi er yoki xotindan birining ulushiga undiruvni qaratish uchun talab qo‘yganda amalga oshirilishi mumkin.
Mol-mulk bo‘linganda er va xotinning ulushlari teng (50/50) deb hisoblanadi, voyaga yetmagan bolalar manfaati hisobga olingan hollar bundan mustasno.`,
    effectiveDate: '1998-09-01',
    editionStatus: 'CURRENT',
    lawNumber: 'OK-104720',
    lexUrl: 'https://lex.uz/docs/104720',
    keywords: ['mol-mulkni bo‘lish', 'ajrashganda mulk bo‘lish', '50/50 ulush', '37-modda'],
    category: 'family',
  },
  {
    id: 'ok-96',
    codeId: 'ok-uz',
    codeName: 'O‘zbekiston Respublikasi Oila kodeksi',
    chapterNumber: '11-bob',
    chapterTitle: 'Ota-ona va bolalarning aliment majburiyatlari',
    articleNumber: '96-modda',
    articleTitle: 'Ota-onaning voyaga yetmagan bolalariga ta’minot (aliment) berish majburiyati',
    content: `Ota-ona voyaga yetmagan bolalariga ta’minot berishi shart. Voyaga yetmagan bolalariga ta’minot berish majburiyatini ixtiyoriy ravishda bajarmagan ota (ona)dan sudning hal qiluv qaroriga yoki sud buyrug‘iga asosan aliment undiriladi.`,
    effectiveDate: '1998-09-01',
    editionStatus: 'CURRENT',
    lawNumber: 'OK-104720',
    lexUrl: 'https://lex.uz/docs/104720',
    keywords: ['aliment', 'bola ta‘minoti', 'aliment undirish', 'ota majburiyati', '96-modda'],
    category: 'family',
  },
  {
    id: 'ok-99',
    codeId: 'ok-uz',
    codeName: 'O‘zbekiston Respublikasi Oila kodeksi',
    chapterNumber: '11-bob',
    chapterTitle: 'Aliment undirish tartibi va miqdori',
    articleNumber: '99-modda',
    articleTitle: 'Sud tomonidan voyaga yetmagan bolalarga undiriladigan aliment miqdori',
    content: `Voyaga yetmagan bolalarga aliment to‘lash haqida ota-ona o‘rtasida kelishuv bo‘lmaganda aliment sud tomonidan ota-onaning har oydagi ish haqi va boshqa daromadining:
- bir bola uchun — to‘rtdan bir qismi (1/4 yoki 25%);
- ikki bola uchun — uchdan bir qismi (1/3 yoki 33.3%);
- uch va undan ortiq bola uchun — yarmi (1/2 yoki 50%) miqdorida undiriladi.
Har bir bola uchun undiriladigan aliment miqdori qonunchilikda belgilangan mehnatga haq to‘lash eng kam miqdorining 26.5 foizidan kam bo‘lmasligi shart (2026-yil holatiga ko‘ra kamida 322 505 so‘m).`,
    effectiveDate: '1998-09-01',
    editionStatus: 'CURRENT',
    lawNumber: 'OK-104720',
    lexUrl: 'https://lex.uz/docs/104720',
    keywords: ['aliment miqdori', '1 bola 25%', '2 bola 33%', '3 bola 50%', 'aliment eng kam miqdori', '99-modda'],
    category: 'family',
  },

  // ==========================================
  // 4. SOLIQ HUQUQI - YANGI SOLIQ KODEKSI (O‘RQ-599-son, 30.12.2019)
  // ==========================================
  {
    id: 'sk-366',
    codeId: 'sk-2020',
    codeName: 'O‘zbekiston Respublikasi Soliq kodeksi',
    chapterNumber: '53-bob',
    chapterTitle: 'Jismoniy shaxslardan olinadigan daromad solig‘i stavkalari',
    articleNumber: '366-modda',
    articleTitle: 'Jismoniy shaxslardan olinadigan daromad solig‘i stavkasi (12%)',
    content: `Jismoniy shaxslardan olinadigan daromad solig‘ining (JShODS) soliq stavkasi 12 foiz (12%) miqdorida belgilanadi.
O‘zbekiston Respublikasi rezidentlari bo‘lgan jismoniy shaxslarning dividendlar va foizlar tarzidagi daromadlariga 5 foiz stavka bo‘yicha soliq solinadi.`,
    effectiveDate: '2020-01-01',
    editionStatus: 'CURRENT',
    lawNumber: 'O‘RQ-599-son',
    lexUrl: 'https://lex.uz/docs/4674902',
    keywords: ['daromad solig‘i', '12 foiz soliq', 'jshods', 'oylikdan soliq', '366-modda'],
    category: 'tax',
  },
  {
    id: 'sk-461',
    codeId: 'sk-2020',
    codeName: 'O‘zbekiston Respublikasi Soliq kodeksi',
    chapterNumber: '67-bob',
    chapterTitle: 'Aylanmadan olinadigan soliq',
    articleNumber: '461-modda',
    articleTitle: 'Aylanmadan olinadigan soliq to‘lovchilar (1 mlrd so‘mgacha)',
    content: `Soliq davrida jami daromadi bir milliard so‘mdan (1 000 000 000 so‘m) oshmagan O‘zbekiston Respublikasi yuridik shaxslari va yakka tartibdagi tadbirkorlar aylanmadan olinadigan soliq to‘lovchilari deb e‘tirof etiladi.`,
    effectiveDate: '2020-01-01',
    editionStatus: 'CURRENT',
    lawNumber: 'O‘RQ-599-son',
    lexUrl: 'https://lex.uz/docs/4674902',
    keywords: ['aylanmadan olinadigan soliq', '1 mlrd so‘m', 'kichik biznes solig‘i', '461-modda'],
    category: 'tax',
  },
  {
    id: 'sk-467',
    codeId: 'sk-2020',
    codeName: 'O‘zbekiston Respublikasi Soliq kodeksi',
    chapterNumber: '67-bob',
    chapterTitle: 'Aylanmadan olinadigan soliq',
    articleNumber: '467-modda',
    articleTitle: 'Aylanmadan olinadigan soliq stavkalari (Bazaviy 4%)',
    content: `Aylanmadan olinadigan soliqning bazaviy soliq stavkasi 4 foiz (4%) miqdorida belgilanadi.
Ulgurji va chakana savdo korxonalari uchun 4%, umumiy ovqatlanish korxonalari uchun 4%, xizmat ko‘rsatish sohalarida 4% stavka qo‘llaniladi.`,
    effectiveDate: '2020-01-01',
    editionStatus: 'CURRENT',
    lawNumber: 'O‘RQ-599-son',
    lexUrl: 'https://lex.uz/docs/4674902',
    keywords: ['aylanma soliq 4%', '4 foiz stavka', 'savdo solig‘i', '467-modda'],
    category: 'tax',
  },

  // ==========================================
  // 5. MA‘MURIY VA JINOYAT HUQUQI (MJTK & JK)
  // ==========================================
  {
    id: 'mjtk-40',
    codeId: 'mjtk-uz',
    codeName: 'O‘zbekiston Respublikasi Ma‘muriy javobgarlik to‘g‘risidagi kodeksi',
    chapterNumber: 'V bob',
    chapterTitle: 'Fuqarolarning huquq va erkinliklariga tajovuz qiluvchi ma‘muriy huquqbuzarliklar',
    articleNumber: '40-modda',
    articleTitle: 'Tuhmat (Ma‘muriy javobgarlik)',
    content: `Tuhmat, ya’ni bila turib yolg‘on, boshqa bir shaxsni sharmanda qiluvchi uydirmalarni tarqatish:
bazaviy hisoblash miqdorining yigirma baravaridan oltmish baravarigacha (20 dan 60 BHM gacha) miqdorda jarima solishga sabab bo‘ladi.
Agar ushbu harakat ma‘muriy jazo qo‘llanilganidan keyin bir yil ichida takrorlansa yoki OAV/Internetda tarqatilsa, Jinoyat kodeksining 139-moddasi bo‘yicha jinoiy javobgarlik kelib chiqadi.`,
    effectiveDate: '1995-04-01',
    editionStatus: 'CURRENT',
    lawNumber: 'MJTK-97661',
    lexUrl: 'https://lex.uz/docs/97661',
    keywords: ['tuhmat', 'yolg‘on tarqatish', 'obro‘ to‘kish', '20-60 BHM jarima', '40-modda'],
    category: 'admin',
  },
  {
    id: 'mjtk-41',
    codeId: 'mjtk-uz',
    codeName: 'O‘zbekiston Respublikasi Ma‘muriy javobgarlik to‘g‘risidagi kodeksi',
    chapterNumber: 'V bob',
    chapterTitle: 'Fuqarolarning huquq va erkinliklariga tajovuz',
    articleNumber: '41-modda',
    articleTitle: 'Haqorat qilish (Ma‘muriy javobgarlik)',
    content: `Haqorat qilish, ya’ni shaxsning sha’ni va qadr-qimmatini qasddan kamsitish:
bazaviy hisoblash miqdorining yigirma baravaridan qirq baravarigacha (20 dan 40 BHM gacha) miqdorda jarima solishga sabab bo‘ladi.`,
    effectiveDate: '1995-04-01',
    editionStatus: 'CURRENT',
    lawNumber: 'MJTK-97661',
    lexUrl: 'https://lex.uz/docs/97661',
    keywords: ['haqorat qilish', 'so‘kish', 'qadr-qimmatni kamsitish', '41-modda'],
    category: 'admin',
  },
  {
    id: 'mjtk-49',
    codeId: 'mjtk-uz',
    codeName: 'O‘zbekiston Respublikasi Ma‘muriy javobgarlik to‘g‘risidagi kodeksi',
    chapterNumber: 'V bob',
    chapterTitle: 'Mehnat sohasidagi huquqbuzarliklar',
    articleNumber: '49-modda',
    articleTitle: 'Mehnat va mehnatni muhofaza qilish to‘g‘risidagi qonunchilikni buzish',
    content: `Mansabdor shaxs tomonidan mehnat va mehnatni muhofaza qilish to‘g‘risidagi qonunchilikni buzish:
bazaviy hisoblash miqdorining besh baravaridan o‘n baravarigacha (5 dan 10 BHM gacha), xuddi shunday huquqbuzarlik bir yil davomida takror sodir etilsa o‘n baravaridan o‘n besh baravarigacha jarima solishga sabab bo‘ladi. Voyaga yetmagan shaxsga nisbatan sodir etilsa — 10 dan 20 BHM gacha jarima solinadi.`,
    effectiveDate: '1995-04-01',
    editionStatus: 'CURRENT',
    lawNumber: 'MJTK-97661',
    lexUrl: 'https://lex.uz/docs/97661',
    keywords: ['ish beruvchini jarimaga tortish', 'mehnat qonunini buzish', 'ish haqini bermaslik', '49-modda'],
    category: 'admin',
  },
  {
    id: 'jk-168',
    codeId: 'jk-uz',
    codeName: 'O‘zbekiston Respublikasi Jinoyat kodeksi',
    chapterNumber: 'XVIII bob',
    chapterTitle: 'O‘zgalar mulkini talon-toroj qilish',
    articleNumber: '168-modda',
    articleTitle: 'Firibgarlik',
    content: `Firibgarlik, ya’ni aldash yoki ishonchni suiiste’mol qilish yo‘li bilan o‘zganing mulkini yoki o‘zganing mulkiga bo‘lgan huquqni qo‘lga kiritish:
BHM ning ellik baravaridan yuz baravarigacha jarima yoki ikki yilgacha axloq tuzatish ishlari yoxud bir yildan uch yilgacha ozodlikni cheklash yoki uch yilgacha ozodlikdan mahrum qilish bilan jazolanadi.
Xizmat mavqeidan foydalanib yoki kompyuter texnikasi vositalaridan foydalanib yoxud ko‘p miqdorda sodir etilsa, uch yildan besh yilgacha ozodlikdan mahrum qilish bilan jazolanadi.`,
    effectiveDate: '1995-04-01',
    editionStatus: 'CURRENT',
    lawNumber: 'JK-111453',
    lexUrl: 'https://lex.uz/docs/111453',
    keywords: ['firibgarlik', 'aldash', 'pulni olib bermaslik', 'karta firibgarligi', '168-modda'],
    category: 'criminal',
  },

  // ==========================================
  // 6. PROTSESSUAL QOIDALAR VA DALILLAR (FPK & IPK)
  // ==========================================
  {
    id: 'fpk-67',
    codeId: 'fpk-uz',
    codeName: 'O‘zbekiston Respublikasi Fuqarolik protsessual kodeksi',
    chapterNumber: '7-bob',
    chapterTitle: 'Dalillar va isbotlash',
    articleNumber: '67-modda',
    articleTitle: 'Dalillar tushunchasi va turlari',
    content: `Ish bo‘yicha dalillar qonunda belgilangan tartibda olingan faktik ma‘lumotlar bo‘lib, ularning asosida sud ishda ishtirok etuvchi shaxslarning talablari va e‘tirozlarini asoslovchi holatlar mavjudligini yoki mavjud emasligini aniqlaydi.
Bu ma‘lumotlar taraflar va uchinchi shaxslarning tushuntirishlari, guvohlarning ko‘rsatuvlari, yozma va ashyoviy dalillar, audio- va videoyozuvlar, ekspertlarning xulosalari bilan aniqlanadi.`,
    effectiveDate: '2018-04-01',
    editionStatus: 'CURRENT',
    lawNumber: 'O‘RQ-460-son',
    lexUrl: 'https://lex.uz/docs/3517337',
    keywords: ['sudda dalillar', 'dalillar turlari', 'sudga taqdim etish', '67-modda'],
    category: 'court',
  },
  {
    id: 'fpk-78',
    codeId: 'fpk-uz',
    codeName: 'O‘zbekiston Respublikasi Fuqarolik protsessual kodeksi',
    chapterNumber: '7-bob',
    chapterTitle: 'Dalillar',
    articleNumber: '78-modda',
    articleTitle: 'Ovoz va video yozuvlarining sudda dalil bo‘lish shartlari',
    content: `Audio- va videoyozuvlarni taqdim etgan yoki ularni talab qilib olish to‘g‘risida iltimosnoma bergan shaxs yozuvlar qachon, kim tomonidan va qanday sharoitda amalga oshirilganligini ko‘rsatishi shart.
Qonunni buzgan holda olingan audio- va videoyozuvlardan dalil sifatida foydalanishga yo‘l qo‘yilmaydi. Shaxs o‘zi ishtirok etgan suhbatni o‘z huquqlarini himoya qilish maqsadida yozib olgan bo‘lsa, ushbu yozuv sud tomonidan dalil sifatida qabul qilinadi.`,
    effectiveDate: '2018-04-01',
    editionStatus: 'CURRENT',
    lawNumber: 'O‘RQ-460-son',
    lexUrl: 'https://lex.uz/docs/3517337',
    keywords: ['audio dalil', 'ovoz yozuvi sudda o‘tadimi', 'telefon yozuvi', 'video dalil', '78-modda'],
    category: 'court',
  },
  {
    id: 'ipk-148',
    codeId: 'ipk-uz',
    codeName: 'O‘zbekiston Respublikasi Iqtisodiy protsessual kodeksi',
    chapterNumber: '17-bob',
    chapterTitle: 'Sudgacha hal qilish (Pretenziya) tartibi',
    articleNumber: '148-modda',
    articleTitle: 'Talabnoma (Pretenziya) yuborish tartibi va javob berish muddati (15 kun)',
    content: `Agar qonunda yoki shartnomada nizoni sudgacha hal qilish (talabnoma yuborish) tartibi nazarda tutilgan bo‘lsa, nizo iqtisodiy sudga ushbu tartibga rioya qilinganidan keyin berilishi mumkin.
Talabnomaga javob talabnoma olingan kundan e‘tiboran o‘n besh kunlik (15 kun) muddatda, agar shartnomada boshqa muddat belgilanmagan bo‘lsa, yozma ravishda yuboriladi.`,
    effectiveDate: '2018-04-01',
    editionStatus: 'CURRENT',
    lawNumber: 'O‘RQ-461-son',
    lexUrl: 'https://lex.uz/docs/3518496',
    keywords: ['talabnoma', 'pretenziya', '15 kun javob muddati', 'sudgacha tartib', '148-modda'],
    category: 'court',
  },

  // ==========================================
  // 7. MAXSUS QONUNLAR VA PREZIDENT HUJJATLARI
  // ==========================================
  {
    id: 'ist-18',
    codeId: 'ist-uz',
    codeName: '«Iste‘molchilarning huquqlarini himoya qilish to‘g‘risida»gi Qonun',
    chapterNumber: 'II bob',
    chapterTitle: 'Iste‘molchilarning asosiy huquqlari',
    articleNumber: '18-modda',
    articleTitle: 'Iste‘molchining maqbul sifatli nooziq-ovqat tovarini 14 kun ichida almashtirish huquqi',
    content: `Iste‘molchi maqbul sifatli nooziq-ovqat tovarini xarid qilgan kundan e‘tiboran o‘n to‘rt kun (14 kun) ichida xarid qilingan joydagi sotuvchidan uni o‘lchami, shakli, gabariti, fasoni, rangi yoki komplektatsiyasiga mos keladigan shunday tovarga almashtirib olishga, mos tovar bo‘lmagan taqdirda esa pulini qaytarib olishga haqlidir. Tovar ishlatilmagan, uning tovar ko‘rinishi, iste‘mol xususiyatlari, plombalari, yorliqlari saqlangan bo‘lishi lozim.`,
    effectiveDate: '1996-04-26',
    editionStatus: 'CURRENT',
    lawNumber: 'Qonun-221-I',
    lexUrl: 'https://lex.uz/docs/47098',
    keywords: ['tovarni qaytarish', '14 kun', 'iste‘molchi huquqi', 'chek', 'sifatli tovarni almashtirish', '18-modda'],
    category: 'civil',
  },
  {
    id: 'shartnoma-qonun-25',
    codeId: 'shartnoma-qonun',
    codeName: '«Xo‘jalik yurituvchi subyektlar faoliyatining shartnomaviy-huquqiy bazasi to‘g‘risida»gi Qonun',
    chapterNumber: 'III bob',
    chapterTitle: 'Shartnoma majburiyatlarini buzganlik uchun mulkiy javobgarlik',
    articleNumber: '25-modda',
    articleTitle: 'Peniya va jarimalarning eng yuqori chegaralari (50% va 20%)',
    content: `Yetkazib berilgan tovarlar (ishlar, xizmatlar) haqini o‘z vaqtida to‘lamaganlik uchun to‘lovchi har bir kechiktirilgan kun uchun muddati o‘tgan to‘lov summasining 0.4 foizi miqdorida, lekin muddati o‘tgan to‘lov summasining 50 foizidan oshmagan miqdorda penya to‘laydi.
Tovarlar (ishlar, xizmatlar) to‘liq yetkazib berilmagan taqdirda yetkazib beruvchi majburiyat bajarilmagan qismining 20 foizidan oshmagan miqdorida jarima to‘laydi.`,
    effectiveDate: '1998-08-29',
    editionStatus: 'CURRENT',
    lawNumber: 'Qonun-670-I',
    lexUrl: 'https://lex.uz/docs/45781',
    keywords: ['penya chegarasi 50%', 'jarima 20%', 'shartnomaviy-huquqiy baza', '25-modda'],
    category: 'business',
  },
  {
    id: 'it-park-1',
    codeId: 'pf-5624',
    codeName: 'O‘zbekiston Respublikasi Prezidentining PF-5624-son Farmoni',
    chapterNumber: 'Asosiy qism',
    chapterTitle: 'Dasturiy mahsulotlar va axborot texnologiyalari texnologik parki faoliyatini tashkil etish',
    articleNumber: '3-band',
    articleTitle: 'IT Park rezidentlari uchun soliq va bojxona imtiyozlari',
    content: `IT Park rezidentlari 2028-yil 1-yanvarga qadar quyidagi soliqlardan to‘liq ozod qilingan:
1) Barcha turdagi soliqlar va davlat maqsadli jamg‘armalariga majburiy ajratmalardan (aylanmadan soliq, foyda solig‘i, QQS 0%);
2) O‘z ehtiyojlari uchun olib kirilayotgan uskunalar, butlovchi buyumlar va dasturiy ta‘minotlar uchun bojxona to‘lovlaridan (bojxona yig‘imlaridan tashqari);
3) IT Park rezidentlari xodimlarining jismoniy shaxslardan olinadigan daromad solig‘i (JShODS) 7.5 foiz qat‘iy stavkada soliqqa tortiladi (umumiy 12% o‘rniga).`,
    effectiveDate: '2019-01-10',
    editionStatus: 'CURRENT',
    lawNumber: 'PF-5624-son',
    lexUrl: 'https://lex.uz/docs/4143849',
    keywords: ['IT Park', 'IT Park imtiyozlari', '7.5 foiz daromad solig‘i', 'nol foiz soliq', 'dasturchilar solig‘i', 'PF-5624'],
    category: 'it_ip',
  },
  {
    id: 'ijara-vmq-837',
    codeId: 'vmq-837',
    codeName: 'O‘zbekiston Respublikasi Vazirlar Mahkamasining 837-son Qarori (29.12.2020)',
    chapterNumber: '1-ilova',
    chapterTitle: 'Ko‘chmas mulk ijara shartnomalarini davlat soliq xizmati organlarida hisobga qo‘yish tartibi',
    articleNumber: '4-band',
    articleTitle: 'Ko‘chmas mulk ijara shartnomalarini soliq organlarida (ijara.soliq.uz) majburiy hisobga qo‘yish',
    content: `Ko‘chmas mulk ijara shartnomalari davlat soliq xizmati organlarida majburiy tartibda hisobga qo‘yiladi.
Hisobga qo‘yish ijaraga beruvchi tomonidan masofadan turib «ijara.soliq.uz» maxsus axborot tizimi orqali elektron raqamli imzo (ERI) yoki Face-ID yordamida bepul amalga oshiriladi. Hisobga qo‘yilmagan ijara shartnomasi bo‘yicha MJTK 175-moddasiga binoan ma‘muriy javobgarlik kelib chiqadi.`,
    effectiveDate: '2021-01-01',
    editionStatus: 'CURRENT',
    lawNumber: 'VMQ-837-son',
    lexUrl: 'https://lex.uz/docs/5189387',
    keywords: ['ijara shartnomasi', 'ijara.soliq.uz', 'soliqda ro‘yxatga olish', 'kvartira ijarasi', 'VMQ-837'],
    category: 'civil',
  }
];

// High-precision search in authentic Uzbekistan laws database
export function searchLawsDatabase(query: string, category?: LegalCategory): CodexArticle[] {
  if (!query.trim() && (!category || category === 'all')) {
    return UZBEKISTAN_LAWS_DATABASE;
  }

  const cleanQuery = query.toLowerCase().trim();
  const STOP_WORDS = new Set([
    'va', 'yoki', 'esa', 'uchun', 'bo‘yicha', 'boyicha', 'haqida', 'bilan', 'ham', 
    'bu', 'shu', 'kerak', 'mumkin', 'savol', 'noma‘lum', 'nomalum', 'mavzu', 'qanday', 
    'nima', 'qilingan', 'berilgan', 'to‘g‘risida', 'togrisida'
  ]);
  const queryTokens = cleanQuery
    .split(/[\s,.:;?!'"«»()/-]+/)
    .filter((t) => t.length > 2 && !STOP_WORDS.has(t));

  // Check if user is asking about an obsolete law
  const detectedObsolete = OBSOLETE_LAW_MAPPINGS.find(
    (m) => cleanQuery.includes(m.obsoleteTerm.toLowerCase()) || cleanQuery.includes(m.obsoleteArticle.toLowerCase())
  );

  const queryDigits = (cleanQuery.match(/\d+/) || [''])[0];

  // If query consists only of stop words and has no digits or obsolete markers, return empty
  if (queryTokens.length === 0 && !queryDigits && !detectedObsolete) {
    return [];
  }

  return UZBEKISTAN_LAWS_DATABASE.filter((art) => {
    if (category && category !== 'all' && art.category !== category) {
      return false;
    }

    const searchableText = `${art.codeName} ${art.articleNumber} ${art.articleTitle} ${art.content} ${art.keywords.join(' ')} ${art.lawNumber || ''}`.toLowerCase();

    // Exact article number match bonus (e.g. "161", "161-modda", "217", "100")
    const artNumDigits = (art.articleNumber.match(/\d+/) || [''])[0];
    if (queryDigits && artNumDigits && queryDigits === artNumDigits) {
      return true;
    }

    if (queryTokens.length === 0) {
      return false;
    }

    // Token matching
    const matchCount = queryTokens.reduce((acc, token) => {
      return acc + (searchableText.includes(token) ? 1 : 0);
    }, 0);

    return matchCount > 0;
  })
.sort((a, b) => {
    let aScore = 0;
    let bScore = 0;

    const aText = `${a.articleTitle} ${a.keywords.join(' ')} ${a.articleNumber}`.toLowerCase();
    const bText = `${b.articleTitle} ${b.keywords.join(' ')} ${b.articleNumber}`.toLowerCase();

    // Prioritize if detected obsolete maps to this
    if (detectedObsolete) {
      if (a.articleNumber.toLowerCase().includes(detectedObsolete.currentArticle.toLowerCase())) aScore += 10;
      if (b.articleNumber.toLowerCase().includes(detectedObsolete.currentArticle.toLowerCase())) bScore += 10;
    }

    queryTokens.forEach((t) => {
      if (aText.includes(t)) aScore += 2;
      if (bText.includes(t)) bScore += 2;
    });

    return bScore - aScore;
  });
}

// Full Lex.uz verification helper
export function verifyCitationWithLexDb(
  docName: string,
  artNum: string,
  quoteText?: string
): LexVerificationResult {
  const cleanDoc = (docName || '').toLowerCase();
  const cleanArt = (artNum || '').toLowerCase();
  const digits = (cleanArt.match(/\d+/) || [''])[0];

  // 1. Check if user is referencing an obsolete law
  for (const obs of OBSOLETE_LAW_MAPPINGS) {
    if (
      cleanDoc.includes('1995') ||
      (cleanDoc.includes('mehnat') && digits === '100') ||
      (cleanDoc.includes('mehnat') && cleanArt.includes('100')) ||
      (cleanArt.includes('134') && cleanDoc.includes('mehnat'))
    ) {
      return {
        lexUrl: obs.lexUrl,
        documentName: obs.currentLaw,
        articleNumber: obs.currentArticle,
        status: 'REPEALED',
        statusLabel: 'Kuchini yo‘qotgan (Yangi tahrirga almashtirildi)',
        isLatestEdition: false,
        lastAmendedLaw: 'O‘RQ-798-son Qonun (28.10.2022)',
        lastVerifiedAt: new Date().toISOString(),
        notes: `DIQQAT: Ushbu norma bekor bo‘lgan. ${obs.explanation}`,
        officialSource: 'Lex.uz Milliy qonunchilik bazasi',
        confidence: 'VERIFIED',
      };
    }
  }

  // 2. Validate via authoritative CitationValidator
  const validation = validateCitation({
    documentName: docName,
    articleNumber: artNum,
    quote: quoteText,
  });

  if (validation.verdict === 'VERIFIED_CURRENT') {
    return {
      lexUrl: validation.matchedOfficialUrl || 'https://lex.uz',
      documentName: validation.matchedDocumentName || docName,
      articleNumber: validation.matchedArticleNumber || artNum,
      status: 'ACTIVE',
      statusLabel: 'Lex.uz: Amaldagi tahrir (Kuchda)',
      isLatestEdition: true,
      lastAmendedLaw: validation.matchedLawNumber || 'O‘zR amaldagi normativ-huquqiy bazasi',
      lastVerifiedAt: validation.lastVerifiedAt,
      notes: validation.evidenceSummary,
      officialSource: 'Lex.uz Milliy qonunchilik bazasi',
      confidence: 'VERIFIED',
    };
  }

  if (validation.verdict === 'REPEALED') {
    return {
      lexUrl: validation.matchedOfficialUrl || 'https://lex.uz',
      documentName: validation.matchedDocumentName || docName,
      articleNumber: validation.matchedArticleNumber || artNum,
      status: 'REPEALED',
      statusLabel: 'Lex.uz: Kuchini yo‘qotgan (Bekor qilingan)',
      isLatestEdition: false,
      lastAmendedLaw: validation.matchedLawNumber || 'Bekor qilingan norma',
      lastVerifiedAt: validation.lastVerifiedAt,
      notes: validation.discrepancies.join('. ') || 'Ushbu norma Lex.uz reyestri bo‘yicha bekor qilingan.',
      officialSource: 'Lex.uz Milliy qonunchilik bazasi',
      confidence: 'VERIFIED',
    };
  }

  if (validation.verdict === 'ARTICLE_NOT_FOUND') {
    return {
      lexUrl: validation.matchedOfficialUrl || 'https://lex.uz',
      documentName: validation.matchedDocumentName || docName,
      articleNumber: artNum,
      status: 'ARTICLE_NOT_FOUND',
      statusLabel: 'Modda topilmadi (Mavjud emas)',
      isLatestEdition: false,
      lastAmendedLaw: 'Noma‘lum',
      lastVerifiedAt: validation.lastVerifiedAt,
      notes: `«${validation.matchedDocumentName}» tarkibida ${artNum} topilmadi.`,
      officialSource: 'Lex.uz Milliy qonunchilik bazasi',
      confidence: 'UNVERIFIED',
    };
  }

  // 3. Fallback: Fail-Closed UNVERIFIED. Never return ACTIVE or VERIFIED for unverified laws!
  return {
    lexUrl: 'https://lex.uz',
    documentName: docName || 'Aniqlanmagan hujjat',
    articleNumber: artNum || 'Aniqlanmagan modda',
    status: 'UNVERIFIED',
    statusLabel: 'Tasdiqlanmagan (Rasmiy norma topilmadi)',
    isLatestEdition: false,
    lastAmendedLaw: 'Noma‘lum',
    lastVerifiedAt: new Date().toISOString(),
    notes: 'Ushbu norma rasmiy qonunchilik reyestridan tasdiqlanmadi. Amaldagi kuchga ega ekanligi noma‘lum.',
    officialSource: 'Lex.uz Milliy qonunchilik bazasi',
    confidence: 'UNVERIFIED',
  };
}
