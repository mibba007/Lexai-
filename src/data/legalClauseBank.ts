/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * O‘zbekiston Respublikasi qonunchiligi (Lex.uz) talablariga to‘liq mos
 * keluvchi rasmiy moddalar, qonuniy iqtiboslar va shartnoma bandlari bazasi.
 * Drag-and-drop va 1-klik orqali shartnoma loyihalariga qo‘shish uchun mo‘ljallangan.
 */

export interface LegalClauseSnippet {
  id: string;
  category: 'labor' | 'civil' | 'business' | 'dispute' | 'confidentiality' | 'liability';
  title: string;
  shortDescription: string;
  applicableArticle: string;
  lexUrl: string;
  clauseText: string;
  tags: string[];
}

export const LEGAL_CLAUSE_BANK: LegalClauseSnippet[] = [
  // MEHNAT HUQUQI (MK)
  {
    id: 'mk-probation-clause',
    category: 'labor',
    title: 'Dastlabki sinov muddati kafolati (MK 129-132)',
    shortDescription: 'Sinov muddati 3 oydan oshmasligi va ish haqining to‘liq to‘lanishi kafolati',
    applicableArticle: 'Mehnat kodeksi 129, 130-moddalar',
    lexUrl: 'https://lex.uz/docs/6257288#6258700',
    clauseText: 'Xodimga nisbatan uning kasbiy layoqatini tekshirish maqsadida 3 (uch) oylik dastlabki sinov muddati belgilanadi. Sinov davrida Xodimga Mehnat kodeksining barcha kafolatlari va belgilangan lavozim maoshi to‘liq tatbiq etiladi (MK 129, 130-moddalar).',
    tags: ['Sinov muddati', 'Mehnat', 'MK 129', 'Yurxizmat-120'],
  },
  {
    id: 'mk-probation-result-notice',
    category: 'labor',
    title: 'Sinov muddati natijasi bo‘yicha ogohlantirish (MK 132)',
    shortDescription: 'Sinov muddati davrida 3 kun oldin yozma xabardor qilish tartibi',
    applicableArticle: 'Mehnat kodeksi 132-modda',
    lexUrl: 'https://lex.uz/docs/6257288#6258720',
    clauseText: 'Dastlabki sinov muddati tugagunga qadar har bir taraf ikkinchi tarafni kamida 3 (uch) kun oldin yozma ravishda ogohlantirgan holda mehnat shartnomasini bekor qilishga haqlidir. Sinov muddati tugagach, agar shartnoma bekor qilinmagan bo‘lsa, u davom ettirilgan hisoblanadi (MK 132-modda).',
    tags: ['Sinov muddati', 'Ogohlantirish', 'MK 132', 'Yurxizmat-120'],
  },
  {
    id: 'mk-work-nature-remote-clause',
    category: 'labor',
    title: 'Masofaviy ish (Remote) va o‘rindoshlik tartibi (MK 452-464)',
    shortDescription: 'Masofadan ishlash tartibi va elektron hujjat aylanishi kafolatlari',
    applicableArticle: 'Mehnat kodeksi 452, 453, 456-moddalar',
    lexUrl: 'https://lex.uz/docs/6257288#6261500',
    clauseText: 'Xodim o‘z mehnat vazifalarini masofaviy ish (yoki qisman masofaviy) rejimida axborot-kommunikatsiya texnologiyalaridan foydalangan holda bajaradi. Ish beruvchi xodimni zarur texnik vositalar, dasturiy ta‘minot va aloqa xarajatlari kompensatsiyasi bilan ta‘minlaydi (MK 452-456 moddalar).',
    tags: ['Masofaviy ish', 'Remote', 'O‘rindoshlik', 'MK 452', 'Yurxizmat-120'],
  },
  {
    id: 'mk-vacation-clause',
    category: 'labor',
    title: 'Yillik asosiy mehnat ta‘tili normasi (MK 216-218)',
    shortDescription: 'Kamida 21 kalendar kunlik haq to‘lanadigan mehnat ta‘tili',
    applicableArticle: 'Mehnat kodeksi 216, 217-moddalar',
    lexUrl: 'https://lex.uz/docs/6257288#6259280',
    clauseText: 'Xodimga har yili davomiyligi kamida 21 (yigirma bir) kalendar kundan kam bo‘lmagan yillik asosiy haq to‘lanadigan mehnat ta‘tili beriladi. Ta‘til davrida xodimning ish o‘rni va o‘rtacha ish haqi to‘liq saqlanadi (MK 216-modda).',
    tags: ['Mehnat ta‘tili', 'Dam olish', 'MK 216', 'Yurxizmat-120'],
  },
  {
    id: 'mk-salary-dates-clause',
    category: 'labor',
    title: 'Ish haqini oyiga kamida ikki marta to‘lash majburiyati (MK 253)',
    shortDescription: 'Har oyning 20 va 5-kunlarida plastik kartaga o‘tkazish',
    applicableArticle: 'Mehnat kodeksi 253-modda',
    lexUrl: 'https://lex.uz/docs/6257288#6259600',
    clauseText: 'Ish beruvchi Xodimga ish haqini oyiga kamida ikki marta — har oyning 20-sanasida (bo‘nak / avans) va keyingi oyning 5-sanasida (yakuniy hisob-kitob) xodimning bank plastik kartasiga o‘tkazish orqali to‘laydi (MK 253-modda).',
    tags: ['Ish haqi', 'To‘lov muddati', 'MK 253', 'Yurxizmat-120'],
  },
  {
    id: 'mk-overtime-weekend-pay-clause',
    category: 'labor',
    title: 'Ish vaqtidan tashqari va dam olish kunlaridagi ishga 2 hissa haq to‘lash (MK 262-264)',
    shortDescription: 'Tungi vaqt, dam olish va bayram kunlari uchun kamida 2 karra to‘lov',
    applicableArticle: 'Mehnat kodeksi 262, 263, 264-moddalar',
    lexUrl: 'https://lex.uz/docs/6257288#6259680',
    clauseText: 'Ish vaqtidan tashqari ish, dam olish kunlari va bayram kunlaridagi mehnat uchun xodimga kamida ikki hissa miqdorida haq to‘lanadi yoki xodimning xohishiga ko‘ra boshqa dam olish kuni (otgul) beriladi (MK 262, 263-moddalar).',
    tags: ['Ustamalar', 'Ish vaqtidan tashqari', 'Tungi ish', 'MK 262', 'Yurxizmat-120'],
  },
  {
    id: 'mk-yammt-registration-clause',
    category: 'labor',
    title: 'Yagona milliy mehnat tizimida (YAMMT - my.mehnat.uz) ro‘yxatdan o‘tkazish',
    shortDescription: 'Elektron mehnat daftarchasiga kiritish va mehnat shartnomasini ro‘yxatga olish',
    applicableArticle: 'Vazirlar Mahkamasining 971-son qarori; MK 105, 127-moddalar',
    lexUrl: 'https://lex.uz/docs/4632007',
    clauseText: 'Ish beruvchi mazkur mehnat shartnomasi imzolangan kundan boshlab belgilangan tartibda «Yagona milliy mehnat tizimi» (YAMMT — my.mehnat.uz) idoralararo dasturiy-apparat kompleksida shartnomani ro‘yxatdan o‘tkazadi va xodimning elektron mehnat daftarchasini yuritishni ta‘minlaydi.',
    tags: ['YAMMT', 'my.mehnat.uz', 'Elektron mehnat daftarchasi', 'Yurxizmat-120'],
  },
  {
    id: 'mk-material-liability-clause',
    category: 'labor',
    title: 'Moddiy javobgarlik va ish beruvchining mol-mulkini saqlash (MK 337-343)',
    shortDescription: 'Yetkazilgan to‘g‘ridan-to‘g‘ri haqiqiy zararni qoplash majburiyati',
    applicableArticle: 'Mehnat kodeksi 337, 338, 342-moddalar',
    lexUrl: 'https://lex.uz/docs/6257288#6260400',
    clauseText: 'Xodim Ish beruvchining unga ishonib topshirilgan mol-mulki, texnika vositalari va jihozlariga ehtiyotkorona munosabatda bo‘lishga majbur. Aybli harakat yoki harakatsizlik oqibatida yetkazilgan to‘g‘ridan-to‘g‘ri haqiqiy zarar qonun hujjatlarida belgilangan tartibda qoplanadi (MK 337-343 moddalar).',
    tags: ['Moddiy javobgarlik', 'Zarar qoplash', 'MK 337', 'Yurxizmat-120'],
  },
  {
    id: 'mk-termination-clause',
    category: 'labor',
    title: 'Shartnomani bekor qilishda qonuniy ogohlantirish (MK 160, 165)',
    shortDescription: 'Xodim o‘z xohishi bilan bo‘shashda 14 kunlik ogohlantirish',
    applicableArticle: 'Mehnat kodeksi 160, 165-moddalar',
    lexUrl: 'https://lex.uz/docs/6257288#6258880',
    clauseText: 'Xodim mehnat shartnomasini o‘z tashabbusi bilan bekor qilish haqida Ish beruvchini kamida 14 (o‘n to‘rt) kalendar kun oldin yozma ravishda ogohlantirishga haqlidir. Tomonlar kelishuviga ko‘ra shartnoma ogohlantirish muddati tugamasdan ham bekor qilinishi mumkin (MK 160-modda).',
    tags: ['Ishdan bo‘shash', 'Ogohlantirish', 'MK 160', 'Yurxizmat-120'],
  },
  {
    id: 'mk-severance-pay-clause',
    category: 'labor',
    title: 'Ishdan bo‘shatish nafaqasi va kafolatli to‘lovlar (MK 173)',
    shortDescription: 'Shtat qisqarishi yoki korxona tugatilishida ish stajiga qarab nafaqa to‘lash',
    applicableArticle: 'Mehnat kodeksi 173-modda',
    lexUrl: 'https://lex.uz/docs/6257288#6259000',
    clauseText: 'Mehnat shartnomasi xodimning aybi bo‘lmagan asoslar bo‘yicha (tashkilot tugatilishi, shtat qisqarishi, sog‘lig‘i holati va boshqalar) bekor qilinganda, xodimga uning ish stajiga mutanosib ravishda o‘rtacha oylik ish haqining 50 foizidan 200 foizigacha bo‘lgan miqdorda ishdan bo‘shatish nafaqasi to‘lanadi (MK 173-modda).',
    tags: ['Nafaqa', 'Ishdan bo‘shatish nafaqasi', 'MK 173', 'Yurxizmat-120'],
  },
  {
    id: 'mk-labor-disputes-clause',
    category: 'dispute',
    title: 'Yakka mehnat nizolarini hal etish tartibi (MK 541-562)',
    shortDescription: 'Mehnat nizolari komissiyasi yoki sud orqali nizolarni ko‘rib chiqish',
    applicableArticle: 'Mehnat kodeksi 541, 543, 545-moddalar',
    lexUrl: 'https://lex.uz/docs/6257288#6262400',
    clauseText: 'Xodim va Ish beruvchi o‘rtasida kelib chiqadigan barcha yakka mehnat nizolari muzokaralar yo‘li bilan, hal etilmagan taqdirda esa korxonadagi Mehnat nizolari komissiyasi yoki to‘g‘ridan-to‘g‘ri Fuqarolik ishlari bo‘yicha tumanlararo sudiga murojaat qilish orqali qonuniy tartibda ko‘rib chiqiladi (MK 541-562 moddalar).',
    tags: ['Mehnat nizolari', 'Sud', 'MK 541', 'Yurxizmat-120'],
  },

  // FUQAROLIK VA IJARA HUQUQI (FK)
  {
    id: 'fk-lease-tax-registration',
    category: 'civil',
    title: 'Ijarani davlat soliq xizmati organlarida ro‘yxatga qo‘yish',
    shortDescription: 'ijara.soliq.uz tizimi orqali 3 kunda hisobga qo‘yish majburiyati',
    applicableArticle: 'Soliq kodeksi 369-modda; FK 600-modda',
    lexUrl: 'https://lex.uz/docs/111189#160800',
    clauseText: 'Ijaraga beruvchi ushbu shartnoma imzolangan kundan boshlab 3 (uch) ish kuni ichida Davlat soliq organlarining maxsus axborot tizimida (ijara.soliq.uz) shartnomani hisobga qo‘yish majburiyatini oladi.',
    tags: ['Ijara', 'Soliq', 'ijara.soliq.uz'],
  },
  {
    id: 'fk-security-deposit-clause',
    category: 'civil',
    title: 'Kafolat depoziti (garov) va uni qaytarish kafolati',
    shortDescription: 'Mulkka zarar yetkazilmaganda depozitni to‘liq qaytarish',
    applicableArticle: 'Fuqarolik kodeksi 259, 290-moddalar',
    lexUrl: 'https://lex.uz/docs/111189#153000',
    clauseText: 'Ijarachi tomonidan to‘langan kafolat depoziti (garov summasi) shartnoma muddati tugab, turar joy topshirish-qabul qilish dalolatnomasi bilan bekamu-ko‘st qaytarilgan kundan boshlab 3 (uch) bank kuni ichida Ijarachiga to‘liq qaytariladi.',
    tags: ['Depozit', 'Garov', 'Ijara'],
  },
  {
    id: 'fk-sublease-ban',
    category: 'civil',
    title: 'Mulkni ikkilamchi ijaraga (subarenda) berishni taqiqlash',
    shortDescription: 'Egasining yozma roziligisiz boshqalarga berish taqiqlanadi',
    applicableArticle: 'Fuqarolik kodeksi 544-modda',
    lexUrl: 'https://lex.uz/docs/111189#160300',
    clauseText: 'Ijarachiga ijaraga olingan mulkni Ijaraga beruvchining oldindan olingan yozma roziligisiz uchinchi shaxslarga ikkilamchi ijaraga (subarenda) berish yoki tekinga foydalanishga topshirish qat‘iyan taqiqlanadi (FK 544-modda).',
    tags: ['Subarenda', 'Taqiq', 'FK 544'],
  },

  // BIZNES, YETKAZIB BERISH VA JAVOBGARLIK
  {
    id: 'biz-penalty-limit',
    category: 'liability',
    title: 'Qonuniy peniya va jarima chegarasi (Shartnomaviy-huquqiy baza to‘g‘risidagi Qonun)',
    shortDescription: 'Kechiktirilgan har kun uchun 0.5%, jami tovar summasining 50%idan oshmaydi',
    applicableArticle: 'Qonun № 670-I 25-modda; FK 326, 327-moddalar',
    lexUrl: 'https://lex.uz/docs/44427#44450',
    clauseText: 'Yetkazib berish muddatlari kechiktirilganda Yetkazib beruvchi kechiktirilgan har bir kun uchun kechiktirilgan tovar summasining 0.5% miqdorida, ammo jami kechiktirilgan summa qiymatining 50%idan ko‘p bo‘lmagan miqdorda peniya to‘laydi. To‘lov kechiktirilganda Xaridor har bir kun uchun 0.4% (maksimal 50%) peniya to‘laydi.',
    tags: ['Peniya', 'Jarima', 'Javobgarlik', 'Qonun 670-I'],
  },
  {
    id: 'biz-quality-warranty',
    category: 'business',
    title: 'Tovarning sifati, kafolat muddati va nuqsonlarni bartaraf etish',
    shortDescription: 'Sifatsiz tovar aniqlanganda 5 kunda bepul almashtirish',
    applicableArticle: 'Fuqarolik kodeksi 402, 403, 445-moddalar',
    lexUrl: 'https://lex.uz/docs/111189#158200',
    clauseText: 'Yetkazib berilgan tovarning kafolat muddati u qabul qilingan kundan boshlab 12 (o‘n ikki) oyni tashkil etadi. Sifatsiz yoki nuqsonli tovar aniqlangan taqdirda, Yetkazib beruvchi Xaridorning talabnomasini olgan kundan boshlab 5 (besh) ish kuni ichida o‘z hisobidan nuqsonlarni bartaraf etadi yoki yangi sifatlisiga almashtirib beradi.',
    tags: ['Kafolat', 'Sifat', 'FK 402'],
  },
  {
    id: 'biz-force-majeure',
    category: 'business',
    title: 'Yengib bo‘lmas kuch (Fors-major) holatlari',
    shortDescription: 'Favqulodda va bartaraf etib bo‘lmaydigan holatlarda javobgarlikdan ozod qilish',
    applicableArticle: 'Fuqarolik kodeksi 333-modda 3-qism',
    lexUrl: 'https://lex.uz/docs/111189#155400',
    clauseText: 'Taraflardan biri shartnoma bo‘yicha o‘z majburiyatlarini yengib bo‘lmas kuch (fors-major: tabiiy ofatlar, yong‘in, epidemiya, urush, davlat organlarining taqiqlovchi hujjatlari) oqibatida bajara olmasa, bu haqda ikkinchi tarafni 3 kun ichida O‘zbekiston Savdo-sanoat palatasi ma‘lumotnomasi bilan yozma xabardor qilishi lozim va javobgarlikdan ozod etiladi (FK 333-modda).',
    tags: ['Fors-major', 'Yengib bo‘lmas kuch', 'SSP'],
  },

  // MAXFIYLIK VA INTELLEKTUAL MULK
  {
    id: 'conf-commercial-secret',
    category: 'confidentiality',
    title: 'Tijorat siri va maxfiylikni saqlash (NDA)',
    shortDescription: 'Shartnoma muddati tugaganidan keyin 3 yil davomida ma‘lumotlarni oshkor qilmaslik',
    applicableArticle: '«Tijorat siri to‘g‘risida»gi Qonun № O‘RQ-374',
    lexUrl: 'https://lex.uz/docs/2462524',
    clauseText: 'Taraflar mazkur shartnomani bajarish jarayonida ma‘lum bo‘lgan barcha texnik, moliyaviy, tijorat va boshqa maxfiy ma‘lumotlarni uchinchi shaxslarga oshkor etmaslik majburiyatini oladilar. Ushbu majburiyat shartnoma muddati tugaganidan so‘ng ham 3 (uch) yil davomida o‘z kuchini saqlab qoladi.',
    tags: ['Maxfiylik', 'NDA', 'Tijorat siri'],
  },
  {
    id: 'conf-ip-transfer',
    category: 'confidentiality',
    title: 'Eksklyuziv mulkiy intellektual huquqlarning to‘liq o‘tishi',
    shortDescription: 'Yaratilgan dasturiy ta‘minot va dizaynga bo‘lgan huquqlar Buyurtmachiga o‘tadi',
    applicableArticle: 'Fuqarolik kodeksi 1031-1040 moddalar; «Mualliflik huquqi» to‘g‘risidagi Qonun',
    lexUrl: 'https://lex.uz/docs/1024097',
    clauseText: 'Mazkur shartnoma bo‘yicha yaratilgan barcha natijalar, manba kodlari, dizayn va dasturiy ta‘minotga bo‘lgan to‘liq eksklyuziv mulkiy (mualliflik) huquqlari xizmat haqi to‘liq to‘langan paytdan boshlab Buyurtmachiga cheklovlarsiz o‘tadi.',
    tags: ['Intellektual mulk', 'Mualliflik', 'Mualliflik huquqi'],
  },

  // NIZOLARNI HAL ETISH VA SUD TARTIBI
  {
    id: 'disp-pre-court-claim',
    category: 'dispute',
    title: 'Sudgacha majburiy talabnoma (pretenziya) yuborish tartibi',
    shortDescription: 'Nizoni sudga kiritishdan oldin 10 kunlik yozma talabnoma yuborish',
    applicableArticle: 'Iqtisodiy protsessual kodeksi 148-modda; FK 234-modda',
    lexUrl: 'https://lex.uz/docs/3518496#3520100',
    clauseText: 'Mazkur shartnoma bo‘yicha kelib chiqadigan nizolar yuzasidan sudgacha talabnoma (pretenziya) yuborish tartibi majburiydir. Talabnoma olgan taraf uni olgan kundan boshlab 10 (o‘n) kalendar kun ichida asoslantirilgan yozma javob qaytarishi shart.',
    tags: ['Pretenziya', 'Talabnoma', 'Sudgacha tartib'],
  },
  {
    id: 'disp-tashkent-court-jurisdiction',
    category: 'dispute',
    title: 'Sud yurisdiksiyasi: Toshkent tumanlararo iqtisodiy sudi',
    shortDescription: 'Kelishuvga erishilmagan taqdirda nizoni iqtisodiy sudda ko‘rish',
    applicableArticle: 'Iqtisodiy protsessual kodeksi 25, 36-moddalar',
    lexUrl: 'https://lex.uz/docs/3518496',
    clauseText: 'Taraflar o‘rtasida kelib chiqadigan va muzokaralar yo‘li bilan hal etilmagan barcha nizolar O‘zbekiston Respublikasi qonunchiligiga muvofiq Toshkent tumanlararo iqtisodiy sudida (yoki javobgar joylashgan yurisdiksiya bo‘yicha) ko‘rib chiqiladi.',
    tags: ['Sud', 'Iqtisodiy sud', 'Yurisdiksiya'],
  },
];
