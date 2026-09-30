import { DisputeAuditResult, DisputePartyRole } from '../types';

export interface DisputePresetCase {
  id: string;
  title: string;
  category: 'court_economic' | 'court_civil' | 'tax_admin' | 'contract_dispute' | 'defamation';
  categoryLabel: string;
  partyRole: DisputePartyRole;
  opponentName: string;
  clientCompanyName: string;
  claimAmount: string;
  summaryProblem: string;
  uploadedDocumentsSummary: string[];
  rawText: string;
  result: DisputeAuditResult;
}

export const DISPUTE_PRESET_CASES: DisputePresetCase[] = [
  {
    id: 'case-unfounded-lost-profit',
    title: 'Kontragentning 450 mln so‘mlik asossiz boy berilgan foyda va penya da‘vosi',
    category: 'court_economic',
    categoryLabel: 'Iqtisodiy sud da‘vosi',
    partyRole: 'defendant',
    clientCompanyName: '«GRAND AGRO TECH» MChJ',
    opponentName: '«ASIA LOGISTICS PLUS» MChJ',
    claimAmount: '450 000 000 so‘m',
    summaryProblem: 'Da‘vogar yetkazib berish kechikkanligini ro‘kach qilib, 150 mln so‘m asosiy qarz, 200 mln so‘m boy berilgan foyda va 100 mln so‘m penya talab qilmoqda. Ammo ularning o‘zi 1-bosqich avans to‘lovini 40 kunga kechiktirgan.',
    uploadedDocumentsSummary: [
      'Da‘vo arizasi (Iskovoe zayavlenie) nusxasi',
      'Oldi-sotdi shartnomasi №14-2025',
      'Bank to‘lov topshiriqnomalari ko‘chirmasi (avans kechikkanligi)',
      'Elektron xabarnomalar va pretenziyaga dastlabki javob',
    ],
    rawText: `Toshkent tumanlararo iqtisodiy sudiga
Da‘vogar: «ASIA LOGISTICS PLUS» MChJ
Javobgar: «GRAND AGRO TECH» MChJ
Da‘vo bahosi: 450 000 000 so‘m

DA‘VO ARIZASI
(Shartnoma majburiyatlarini bajarmaslik, boy berilgan foyda va penyani undirish haqida)

2025-yil 10-yanvarda taraflar o‘rtasida №14-sonli asbob-uskunalar yetkazib berish shartnomasi tuzilgan. Javobgar shartnomaning 3.1-bandiga asosan 60 kun muddatda tovarlarni yetkazib berishi shart edi. Biroq javobgar tovarlarni 45 kunga kechiktirib yetkazib berdi.
Natijada da‘vogar uchinchi shaxslar bilan tuzilgan foydali bitimlaridan mahrum bo‘ldi va 200 000 000 so‘m boy berilgan foyda ko‘rdi.
Shuningdek, shartnomaning 7.2-bandiga asosan har bir kun uchun 0.5% hisobidan 100 000 000 so‘m penya hamda 150 000 000 so‘m asossiz ushlab qolingan summa undirilishi lozim.

Yuqoridagilarga asosan, FK 14, 324, 333-moddalari va IPK 149-moddasiga binoan jami 450 000 000 so‘m undirishni so‘raymiz.`,
    result: {
      caseTitle: '«ASIA LOGISTICS PLUS» MChJning 450 mln so‘mlik asossiz da‘vosini rad etish auditi',
      disputeType: 'Iqtisodiy shartnoma majburiyatlari, penya va boy berilgan foyda nizosi',
      partyRole: 'defendant',
      clientCompanyName: '«GRAND AGRO TECH» MChJ',
      opponentName: '«ASIA LOGISTICS PLUS» MChJ',
      claimTotalAmount: '450 000 000 so‘m',
      overallWinProbability: 82,
      riskProbability: 18,
      probabilityRationale: 'Da‘vogarning boy berilgan foyda (200 mln) talabi qonunan mutlaqo isbotlanmagan (FK 14, Oliy Sud Plenumi qarori №1). Kreditorning o‘zi avans to‘lovini kechiktirganligi sababli FK 333 va 335-moddalarga binoan javobgar to‘liq oqlanadi va penya (100 mln) bekor qilinadi yoki FK 326 bo‘yicha 80% gacha kamaytiriladi.',
      confidenceDisclaimer: 'Sudda yutish ehtimoli (82%) taqdim etilgan dalillar, bank ko‘chirmalari va O‘zbekiston Respublikasi Oliy Sudi Plenumining amaldagi sud amaliyotiga asoslangan matematik baholashdir. Konstitutsiya 136-moddasiga ko‘ra sudlar mustaqil bo‘lib, bu mutlaq huquqiy kafolat hisoblanmaydi.',
      executiveSummary: 'Da‘vogar qo‘ygan 450 000 000 so‘mlik talabning 350 000 000 so‘mi (78% qismi) amaldagi qonunchilikka zid va to‘liq asossiz. Sudga FPK/IPK 156-moddasi asosida asoslangan E‘tiroznoma (Otziv) taqdim etilsa, da‘vo to‘liq yoki deyarli butunlay rad etiladi.',
      claimGrounds: [
        {
          id: 'cg-1',
          claimPoint: '200 000 000 so‘mlik «Boy berilgan foyda» (Uпущенная выгода) talabi',
          opponentLegalBasis: 'FK 14-modda («Zararni qoplash»)',
          status: 'UNGROUNDED_OR_ILLEGAL',
          statusLabel: 'Qonunga zid / Asossiz',
          analysis: 'O‘zbekiston Respublikasi FK 14-moddasi va Oliy Sud Plenumi talablariga binoan, boy berilgan foyda shunchaki taxminiy hisob-kitoblar bilan emas, balki real tayyorgarlik ko‘rilganligi, uchinchi shaxs bilan bekor bo‘lmas shartnoma mavjudligi va aniq xarajatlar tahlili orqali qat‘iy isbotlanishi shart. Da‘vogarda bunday dalillar yo‘q.',
          lexArticle: 'FK 14-modda, 2-qism',
          lexUrl: 'https://lex.uz/docs/111189#150524',
          counterArgument: 'Da‘vogar o‘z daromadidan mahrum bo‘lishi muqarrarligini isbotlovchi birlamchi buxgalteriya dalillarini taqdim etmagan. Ushbu vaj quruq da‘vodan iborat.',
        },
        {
          id: 'cg-2',
          claimPoint: '100 000 000 so‘mlik penya undirish talabi (har bir kun uchun 0.5%)',
          opponentLegalBasis: 'Shartnoma 7.2-bandi, FK 324-modda',
          status: 'PROCEDURAL_VIOLATION',
          statusLabel: 'Me‘yordan oshirilgan va Qoidabuzarlik',
          analysis: '«Xo‘jalik yurituvchi sub‘ektlar faoliyatining shartnomaviy-huquqiy bazasi to‘g‘risida»gi Qonunning 25-26 moddalari va FK 326-moddasiga ko‘ra, penya miqdori shartnoma bo‘yicha bajarilmagan majburiyat summasining 50 foizidan oshib ketishi mumkin emas. Qolaversa, kreditorning o‘zi aybdor bo‘lsa (FK 335), penya undirilmaydi.',
          lexArticle: 'Shartnomaviy-huquqiy baza to‘g‘risidagi Qonun 25-modda, FK 326 va 335-moddalar',
          lexUrl: 'https://lex.uz/docs/47101',
          counterArgument: 'Da‘vogarning avans to‘lovini kechiktirishi javobgarni tovar yetkazishni to‘xtatib turishga haqli qildi (FK 256-modda). Javobgar aybsiz.',
        },
        {
          id: 'cg-3',
          claimPoint: '150 000 000 so‘mlik asosiy tovar hisob-kitobi summasi',
          opponentLegalBasis: 'Shartnoma 3-bandi',
          status: 'PARTIALLY_GROUNDED',
          statusLabel: 'Qisman asosli (Yetkazib berilgan qism bilan hisob-kitob talab etiladi)',
          analysis: 'Ushbu summa tovar to‘liq topshirilganligi to‘g‘risidagi elektron hisobvaraq-faktura (E-faktura) va dalolatnoma bilan o‘zaro solishtirilishi lozim.',
          lexArticle: 'FK 386, 437-moddalar',
          lexUrl: 'https://lex.uz/docs/111189',
          counterArgument: 'Tovar amalda topshirilgan va qabul qilib olingan. Qarzdorlik o‘zaro hisob-kitob dalolatnomasi orqali yopiladi.',
        },
      ],
      proceduralDefects: [
        {
          title: 'Majburiy Sudgacha Pretenziya tartibi buzilgan',
          lawArticle: 'IPK 148-modda, Shartnoma 9-bandi',
          description: 'Da‘vogar sudga murojaat qilishdan oldin qonunda va shartnomada belgilangan 15 kunlik yozma pretenziya yuborish tartibiga to‘liq rioya qilmagan yoki javob berish muddatini kutmasdan da‘vo kiritgan.',
          practicalAdvantage: 'Sudda da‘vo arizasini ko‘rmasdan qoldirish (IPK 107-modda) haqida iltimosnoma kiritish imkoniyati mavjud.',
          lexUrl: 'https://lex.uz/docs/3518442',
        },
        {
          title: 'Kreditorning aybi va ijroni kechiktirishga sabab bo‘lganligi',
          lawArticle: 'FK 256 va 335-moddalar',
          description: 'Da‘vogar avans to‘lovini 40 kunga kechiktirgan, bu esa javobgarga o‘z majburiyatini bajarishni kechiktirish huquqini beradi.',
          practicalAdvantage: 'Barcha jarima va penyalarni 100% ga bekor qilish asosi.',
          lexUrl: 'https://lex.uz/docs/111189#151020',
        },
      ],
      strongPoints: [
        'Bank ko‘chirmasi orqali da‘vogarning avans to‘lovini 40 kun kechiktirgani to‘liq isbotlangan.',
        'Da‘vogar tomonidan taqdim etilgan boy berilgan foyda hisob-kitobi mutlaqo uydirma va qog‘oz dalillarga ega emas.',
        'Shartnomaning 8.4-bandida o‘zaro elektron xabarnomalar qonuniy kuchga ega deb belgilangan.',
      ],
      vulnerabilities: [
        'Tovarni yetkazib berish kechikkan paytda rasmiy ravishda «Ijroni to‘xtatib turish to‘g‘risida»gi ogohlantirish xati o‘z vaqtida pochta orqali yuborilmagan bo‘lsa, da‘vogar buni suiiste‘mol qilishga urinishi mumkin.',
      ],
      interactiveQuestions: [
        {
          id: 'q-1',
          question: 'Da‘vogarga tovar yetkazib berilgach, elektron hisobvaraq-faktura (E-faktura) Didox yoki Soliq tizimi orqali ikki tomonlama imzolanganmi?',
          category: 'evidence',
          importance: 'CRITICAL',
          impactExplanation: 'Agar imzolangan bo‘lsa, da‘vogarning asosiy qarz bo‘yicha talablari to‘liq yopiladi.',
          options: ['Ha, ikki tomonlama tasdiqlangan', 'Yo‘q, rad etilgan yoki kutilmoqda', 'Qog‘oz akt imzolangan'],
          userAnswer: 'Ha, ikki tomonlama tasdiqlangan',
        },
        {
          id: 'q-2',
          question: 'Avans to‘lovi kechikkan kunlarda da‘vogarga rasmiy yozma xat yuborilganmi?',
          category: 'factual',
          importance: 'HIGH',
          impactExplanation: 'FK 256-moddasi bo‘yicha majburiyatni to‘xtatib turish qonuniyligini 100% mustahkamlaydi.',
          options: ['Ha, rasmiy xat va Telegram yozishmalari bor', 'Faqat og‘zaki telefon qilingan', 'Yo‘q'],
          userAnswer: 'Ha, rasmiy xat va Telegram yozishmalari bor',
        },
        {
          id: 'q-3',
          question: 'Da‘vo arizasi bo‘yicha sudgacha bo‘lgan pretenziyani qachon qabul qilib olgansiz?',
          category: 'procedural',
          importance: 'HIGH',
          impactExplanation: 'IPK 107-modda bo‘yicha ishni ko‘rmasdan qoldirish muddatini hisoblash uchun kerak.',
          options: ['Sudga da‘vo berilishidan 3 kun oldin kelgan (15 kun kutilmagan)', 'Umuman pretenziya kelmagan', '15 kundan ko‘p bo‘lgan'],
          userAnswer: 'Sudga da‘vo berilishidan 3 kun oldin kelgan (15 kun kutilmagan)',
        },
      ],
      actionPlaybook: [
        {
          stepNumber: 1,
          title: 'Sudga Asoslantirilgan E‘tiroznoma (Otziv na isk) kiritish',
          action: 'IPK 156-moddasi tartibida da‘vogarning 200 mln boy berilgan foyda va 100 mln penya talablarini to‘liq rad etish haqida e‘tiroznoma yozma taqdim etiladi.',
          deadline: 'Sud majlisidan kamida 3 kun oldin',
          documentsNeeded: ['E‘tiroznoma (Otziv)', 'Bank ko‘chirmasi', 'Didox E-faktura nusxasi'],
        },
        {
          stepNumber: 2,
          title: 'Ishni ko‘rmasdan qoldirish to‘g‘risida Iltimosnoma berish',
          action: 'Da‘vogar majburiy 15 kunlik pretenziya muddatini kutmasdan da‘vo qo‘zg‘atgani sababli IPK 107-moddasi 5-bandiga asosan da‘voni ko‘rmasdan qoldirishni so‘rash.',
          deadline: 'Dastlabki sud majlisida',
          documentsNeeded: ['Pochta konverti shtempeli', 'Iltimosnoma matni'],
        },
        {
          stepNumber: 3,
          title: 'Zarurat tug‘ilsa Penya kamaytirish (FK 326) vaji bilan zaxira himoyasini o‘rnatish',
          action: 'Agar sud asosiy qarzning bir qismini qanoatlantirishga moyil bo‘lsa, penya miqdorini nomutanosiblik vaji bilan minimal miqdorga tushirishni so‘rash.',
          deadline: 'Sud muzokaralarida',
          documentsNeeded: ['FK 326-moddasi bo‘yicha iltimosnoma'],
        },
      ],
      generatedCounterDocument: {
        title: 'Toshkent tumanlararo iqtisodiy sudiga Da‘voga nisbatan E‘TIROZNOMA (Otziv)',
        docType: 'otziv',
        lexBasis: 'O‘zbekiston Respublikasi IPK 156, FK 14, 256, 326, 335-moddalari',
        content: `Toshkent tumanlararo iqtisodiy sudiga
Sudya: [Sudya F.I.SH]
Ish №: [Ish raqami]

Javobgar: «GRAND AGRO TECH» MChJ
Manzil: Toshkent sh., Mirzo Ulug‘bek tumani, 4-mavze
Tel: +998 71 200-33-44, STIR: 305112233

Da‘vogar: «ASIA LOGISTICS PLUS» MChJ
Manzil: Toshkent sh., Yakkasaroy tumani
Da‘vo bahosi: 450 000 000 so‘m

DA‘VO ARIZASIGA NISBATAN
E ‘ T I R O Z N O M A (O T Z I V)

«ASIA LOGISTICS PLUS» MChJ tomonidan bizga nisbatan qo‘zg‘atilgan 450 000 000 so‘mlik da‘vo arizasi bilan to‘liq tanishib chiqib, quyidagi asoslarga ko‘ra da‘vo talablarini mutlaqo asossiz deb hisoblaymiz va uni to‘liq rad etishni so‘raymiz:

1. BOY BERILGAN FOYDA (200 000 000 SO‘M) TALABINING ASOSSIZLIGI BO‘YICHA:
Da‘vogar FK 14-moddasini ro‘kach qilgan holda 200 000 000 so‘m boy berilgan foyda talab qilmoqda. O‘zbekiston Respublikasi Oliy Sudi Plenumining qarorlariga asosan, boy berilgan foyda yetkazilganligi aniq dalillar, uchinchi shaxslar bilan tuzilgan va bekor bo‘lishiga faqat javobgar sababchi bo‘lgan shartnomalar, hisob-kitob kalkulyatsiyasi bilan isbotlanishi shart. Da‘vogar tomonidan birorta ham moddiy dalil taqdim etilmagan bo‘lib, bu asossiz boyishga qaratilgan harakatdir.

2. PENYA VA ZARARNING KREDITOR AYBI BILAN YUZAGA KELGANLIGI (FK 335-MODDA):
№14-sonli shartnomaning 4.1-bandiga ko‘ra, tovar yetkazib berish javobgarning hisob raqamiga 30% avans to‘lovi kelib tushgan kundan boshlab hisoblanadi. Da‘vogar avans to‘lovini shartnomada belgilangan muddatdan 40 kunga kechiktirib o‘tkazgan.
O‘zR Fuqarolik kodeksining 256-moddasiga binoan, bir taraf o‘z majburiyatini bajarmagan taqdirda, ikkinchi taraf o‘z majburiyatini bajarishni to‘xtatib turishga haqlidir.
FK 335-moddasiga ko‘ra: «Agar majburiyatning bajarilmasligi yoki lozim darajada bajarilmasligi kreditorning qasddan yoki ehtiyotsizlikdan qilgan harakati tufayli kelib chiqqan bo‘lsa, qarzdor javobgar bo‘lmaydi».
Shu sababli, javobgarga penya hisoblash mutlaqo qonunga ziddir.

3. PROTSESSUAL QOIDABUZARLIK (IPK 148-MODDA):
Da‘vogar majburiy sudgacha bo‘lgan pretenziya tartibini buzib, javobgarga pretenziya yuborilganidan so‘ng 15 kunlik muddat o‘tmasdan sudga da‘vo arizasi kiritgan.

Yuqoridagilarga asosan hamda O‘zbekiston Respublikasi IPK 156, FK 14, 256, 326 va 335-moddalariga tayanib,

SUDDAN SO‘RAYMIZ:
1. «ASIA LOGISTICS PLUS» MChJning «GRAND AGRO TECH» MChJga nisbatan qo‘zg‘atgan 450 000 000 so‘mlik da‘vo talablarini to‘liq qanoatlantirishsiz qoldirishingizni;
2. Da‘vogar tomonidan to‘langan davlat boji va barcha sud xarajatlarini da‘vogarning o‘z hisobida qoldirishingizni.

Ilovalar:
1. Shartnoma №14 nusxasi.
2. Avans to‘lovi 40 kunga kechikkanligini tasdiqlovchi bank ko‘chirmasi.
3. Tovarlar topshirilganligi bo‘yicha elektron hisobvaraq-faktura nusxasi.
4. E‘tiroznomaning nusxasi da‘vogarga yuborilganligini tasdiqlovchi pochta kvitansiyasi.
5. Vakilning ishonchnomasi.

«GRAND AGRO TECH» MChJ Rahbari: _____________ / Alimov Sh.B. /
Sana: «___» ____________ 2026-yil`,
      },
    },
  },
  {
    id: 'case-defamation-enterprise',
    title: 'OAV va bloger tomonidan korxona sha’ni va ishchanlik obro‘siga putur yetkazilishi',
    category: 'defamation',
    categoryLabel: 'Ishchanlik obro‘si va zarar da‘vosi',
    partyRole: 'plaintiff',
    clientCompanyName: '«SAMARQAND AGRO CLUSTER» MChJ',
    opponentName: '«XABAR MEDIA» portali va bloger Karimov D.',
    claimAmount: '80 000 000 so‘m',
    summaryProblem: 'OAV va ijtimoiy tarmoqda korxonamiz go‘yoki noqonuniy yer egallab olgani va fermerlar haqini bermagani haqida haqiqatga zid tuhmat xabar tarqatildi. Buning oqibatida 2 ta yirik eksport shartnomamiz to‘xtatildi.',
    uploadedDocumentsSummary: [
      'Notarial tasdiqlangan skrinshotlar va video materiallar protokoli',
      'Yerni qonuniy ajratish to‘g‘risida viloyat hokimi qarori va kadastr pasporti',
      'Eksport shartnomalarining bekor qilinishi haqidagi kontragentlarning rasmiy xatlari',
      'Pretenziya xati va uning e‘tiborsiz qoldirilganligi haqidagi pochta kvitansiyasi',
    ],
    rawText: `Biz «SAMARQAND AGRO CLUSTER» MChJmiz. 2026-yil 12-fevral kuni «XABAR MEDIA» internet nashrida va Telegram kanalida korxonamiz go‘yoki Payariq tumanidagi 50 gektar ekin yerini noqonuniy tortib olgani va fermerlarga pul to‘lamagani haqida tuhmat maqola chop etildi.
Holbuki, ushbu yerlar Ochiq E-Auksion orqali 2024-yilda qonuniy yutilgan, barcha to‘lovlar to‘liq amalga oshirilgan (kadastr pasporti va auksion bayonnomasi mavjud).
Ushbu asossiz ma‘lumot tarqalishi oqibatida xorijiy hamkorimiz 80 000 000 so‘mlik shartnomani bekor qildi. Biz raddiya talab qildik, rad etishdi. Sudga da‘vo berib, raddiya va 80 mln so‘m moddiy zararni undirmoqchimiz.`,
    result: {
      caseTitle: '«SAMARQAND AGRO CLUSTER» MChJning ishchanlik obro‘sini himoya qilish va zararni undirish auditi',
      disputeType: 'Fuqarolik va OAV huquqi, ishchanlik obro‘si (FK 100) va moddiy zarar (FK 14)',
      partyRole: 'plaintiff',
      clientCompanyName: '«SAMARQAND AGRO CLUSTER» MChJ',
      opponentName: '«XABAR MEDIA» portali va bloger Karimov D.',
      claimTotalAmount: '80 000 000 so‘m',
      overallWinProbability: 89,
      riskProbability: 11,
      probabilityRationale: 'Da‘vogar qo‘lida auksion bayonnomasi, kadastr hujjati va notarial tasdiqlangan tuhmat skrinshotlari bor. FK 100-moddasi 1 va 6-qismlariga ko‘ra javobgar ma‘lumotning haqiqiyligini isbotlashga majbur (isbotlay olmaydi). Shartnomaning bekor bo‘lish xati FK 14 bo‘yicha moddiy zararni isbotlaydi.',
      confidenceDisclaimer: 'Sudda g‘alaba qozonish ehtimoli (89%) O‘zbekiston Respublikasi Oliy Sudi Plenumining «Sud amaliyotida fuqarolar va tashkilotlarning sha’ni, qadr-qimmati va ishchanlik obro‘sini himoya qilish to‘g‘risidagi qonunchilikni qo‘llash amaliyoti to‘g‘risida»gi Qaroriga asoslangan.',
      executiveSummary: 'Da‘vogarning pozitsiyasi juda kuchli. Qonun bo‘yicha OAV va muallif tarqatilgan ma‘lumotning rostligini isbotlab berishi shart. Isbotlay olmasa, sud raddiya berish majburiyatini yuklaydi va 80 mln so‘m zararni undiradi.',
      claimGrounds: [
        {
          id: 'cg-d1',
          claimPoint: 'Internetda tarqatilgan ma‘lumotlarga rasmiy raddiya berish talabi',
          opponentLegalBasis: 'So‘z erkinligi / Jurnalistik faoliyat',
          status: 'LEGAL_AND_GROUNDED',
          statusLabel: '100% Qonuniy va Asosli',
          analysis: 'O‘zR FK 100-moddasi 1-qismi va «Ommaviy axborot vositalari to‘g‘risida»gi Qonunning 27-moddasiga ko‘ra, OAV haqiqatga to‘g‘ri kelmaydigan ma‘lumotlar uchun raddiya e‘lon qilishi shart.',
          lexArticle: 'FK 100-modda 1 va 6-qismlari',
          lexUrl: 'https://lex.uz/docs/111189#153400',
          counterArgument: 'Javobgar tarqatgan ma‘lumotini tasdiqlovchi birorta ham rasmiy tergov yoki sud hujjati mavjud emas.',
        },
        {
          id: 'cg-d2',
          claimPoint: '80 000 000 so‘mlik bekor qilingan shartnoma bo‘yicha moddiy zararni undirish',
          opponentLegalBasis: 'Zararning bevosita sababiy bog‘lanishi',
          status: 'LEGAL_AND_GROUNDED',
          statusLabel: 'Qonuniy Asoslangan',
          analysis: 'FK 100-moddasi 6-qismi yuridik shaxslarga ishchanlik obro‘siga yetkazilgan putur oqibatidagi zararni qoplash huquqini to‘g‘ridan-to‘g‘ri beradi. Kontragentning rasmiy bekor qilish xati sababiy bog‘liqlikni isbotlaydi.',
          lexArticle: 'FK 14-modda, FK 100-modda 6-qismi',
          lexUrl: 'https://lex.uz/docs/111189#153400',
          counterArgument: 'Zarar miqdori va bekor qilingan bitim summasi soliq va buxgalteriya hisobotlari bilan to‘liq muvofiq.',
        },
      ],
      proceduralDefects: [
        {
          title: 'Javobgarlar doirasi to‘liq qamrab olinishi shart',
          lawArticle: 'FPK 43, 189-moddalar',
          description: 'Da‘vo arizasida ham OAV tahririyati (yuridik shaxs), ham maqola muallifi (jismoniy shaxs bloger) birgalikda javobgar sifatida ko‘rsatilishi shart.',
          practicalAdvantage: 'Ijroni ta‘minlash va zararni solidar undirish imkoniyati.',
          lexUrl: 'https://lex.uz/docs/3517337',
        },
      ],
      strongPoints: [
        'E-auksion bayonnomasi va kadastr hujjatlari yer ajratishning 100% qonuniyligini tasdiqlaydi.',
        'Notarius tomonidan tasdiqlangan elektron dalillar bayonnomasi mavjud.',
        'Kontragent tomonidan yuborilgan rasmiy shartnomani bekor qilish bildirishnomasi mavjud.',
      ],
      vulnerabilities: [
        'OAV vakillari sudda jarayonni cho‘zish uchun qo‘shimcha ekspertiza tayinlashni so‘rashi mumkin.',
      ],
      interactiveQuestions: [
        {
          id: 'q-d1',
          question: 'Internet nashriga rasmiy talabnoma (pretenziya) yuborilgan sana va pochta xabarnomasi mavjudmi?',
          category: 'procedural',
          importance: 'HIGH',
          impactExplanation: 'OAV to‘g‘risidagi qonun bo‘yicha raddiya berishdan bosh tortilganligini isbotlaydi.',
          options: ['Ha, kvitansiya va elektron xat mavjud', 'Faqat messenjer orqali yozilgan'],
          userAnswer: 'Ha, kvitansiya va elektron xat mavjud',
        },
      ],
      actionPlaybook: [
        {
          stepNumber: 1,
          title: 'Fuqarolik ishlari bo‘yicha sudga da‘vo arizasini kiritish',
          action: 'FK 100, 14-moddalari va FPK 189-moddasi asosida raddiya e‘lon qilish hamda 80 mln so‘m moddiy zararni undirish bo‘yicha da‘vo arizasini topshirish.',
          deadline: '3 ish kuni ichida',
          documentsNeeded: ['Da‘vo arizasi', 'Auksion bayonnomasi', 'Notarial skrinshot', 'Davlat boji to‘lovi'],
        },
        {
          stepNumber: 2,
          title: 'Da‘voni ta‘minlash choralarini ko‘rish haqida iltimosnoma berish',
          action: 'FPK 106-moddasiga asosan maqolani sud qarori chiqqunga qadar OAV platformasidan vaqtincha olib tashlash (bloklash) haqida ajrim chiqarishni so‘rash.',
          deadline: 'Da‘vo arizasi bilan birga',
          documentsNeeded: ['Da‘voni ta‘minlash iltimosnomasi'],
        },
      ],
      generatedCounterDocument: {
        title: 'Fuqarolik ishlari bo‘yicha sudga Da‘vo arizasi (Ishchanlik obro‘si va zarar)',
        docType: 'shikoyat_rad',
        lexBasis: 'O‘zR FK 14, 100-moddalari, FPK 189-moddasi',
        content: `Fuqarolik ishlari bo‘yicha Samarqand shahar sudiga
Da‘vogar: «SAMARQAND AGRO CLUSTER» MChJ
STIR: 304889900, Tel: +998 66 233-00-11
Manzil: Samarqand viloyati, Payariq tumani

Javobgarlar: 
1. «XABAR MEDIA» MChJ tahririyati
2. Muallif: Karimov Dilshod Baxtiyorovich

Da‘vo bahosi: 80 000 000 so‘m
Davlat boji: Amaldagi stavka bo‘yicha to‘langan

DA‘VO ARIZASI
(Ishchanlik obro‘siga putur yetkazuvchi ma‘lumotlarni raddiya qilish va yetkazilgan zararni undirish to‘g‘risida)

2026-yil 12-fevral kuni «XABAR MEDIA» internet nashrida va tegishli ijtimoiy tarmoq kanallarida «SAMARQAND AGRO CLUSTER» MChJning faoliyatiga doir mutlaqo yolg‘on, tuhmat va korxonaning ishchanlik obro‘sini to‘kuvchi maqola e‘lon qilindi. Unda korxonamiz go‘yoki Payariq tumanida yerlarni noqonuniy egallaganligi iddao qilingan.

Holbuki, Payariq tumanidagi 50 gektar ekin maydoni Ochiq E-Auksion platformasi orqali qonuniy yutib olingan va tuman hokimining qarori, ijara shartnomasi hamda Davlat kadastr pasporti mavjud.

O‘zbekiston Respublikasi Fuqarolik kodeksining 100-moddasi 1-qismiga ko‘ra, fuqaro yoki yuridik shaxs o‘zining sha’ni, qadr-qimmati yoki ishchanlik obro‘siga putur yetkazuvchi ma’lumotlar yuzasidan sud yo‘li bilan raddiya talab qilishga haqli.
Ushbu moddaning 6-qismiga ko‘ra: «Yuridik shaxsning ishchanlik obro‘siga putur yetkazadigan ma’lumotlar tarqatilgan taqdirda, ushbu shaxs bunday ma’lumotlarni raddiya qilish bilan bir qatorda, ularni tarqatish natijasida yetkazilgan zararning o‘rnini qoplashni talab qilishga haqlidir.»

Tarqatilgan ushbu tuhmat oqibatida korxonamizning xorijiy kontragentlar bilan tuzilgan shartnomasi bekor bo‘lib, FK 14-moddasi bo‘yicha 80 000 000 so‘m miqdorida to‘g‘ridan-to‘g‘ri moddiy zarar (boy berilgan foyda) yetkazildi.

Yuqoridagilarga asosan hamda O‘zbekiston Respublikasi FK 14, 100, 985-moddalari va FPK 189-191-moddalariga tayanib,

SUDDAN SO‘RAYMIZ:
1. Javobgarlar tomonidan e‘lon qilingan maqoladagi ma‘lumotlarni haqiqatga to‘g‘ri kelmaydigan va da‘vogarning ishchanlik obro‘siga putur yetkazuvchi deb topishingizni;
2. Javobgarlarga o‘sha internet nashrining bosh sahifasida va rasmiy kanallarida 3 kun muddatda rasmiy raddiya e‘lon qilish majburiyatini yuklashingizni;
3. Javobgarlardan solidar tartibda da‘vogar foydasiga 80 000 000 so‘m moddiy zararni undirib berishingizni;
4. Sud xarajatlarini javobgarlar hisobiga yuklashingizni.

Ilovalar:
1. Notarial tasdiqlangan internet skrinshotlari bayonnomasi.
2. E-Auksion bayonnomasi va Kadastr pasporti nusxasi.
3. Kontragentning shartnomani bekor qilish to‘g‘risidagi xati.
4. Davlat boji to‘langanligi kvitansiyasi.
5. Da‘vo arizasi nusxasi javobgarlarga yuborilganligi kvitansiyasi.

«SAMARQAND AGRO CLUSTER» MChJ Rahbari: _____________ / Xoliqov B.A. /
Sana: «___» ____________ 2026-yil`,
      },
    },
  },
  {
    id: 'case-tax-dispute',
    title: 'Soliq inspeksiyasining asossiz hisoblangan 120 mln so‘mlik qo‘shimcha soliq talabnomasi',
    category: 'tax_admin',
    categoryLabel: 'Soliq va Ma‘muriy nizo',
    partyRole: 'plaintiff',
    clientCompanyName: '«PROGRESS BUILD» MChJ',
    opponentName: 'Toshkent shahar Davlat Soliq Boshqarmasi',
    claimAmount: '120 000 000 so‘m',
    summaryProblem: 'Soliq organi kameral soliq tekshiruvi natijasida kontragentimiz «shubhali soliq to‘lovchi» (1C ro‘yxatida) deb topilganini ro‘kach qilib, QQS hisob-kitobimizni bekor qilib, 120 mln so‘m qo‘shimcha soliq va jarima talab qilmoqda. Ammo biz tovarlarni amalda qabul qilganmiz va to‘lovlarni to‘liq bank orqali amalga oshirganmiz.',
    uploadedDocumentsSummary: [
      'Soliq organining Talabnomasi va Kameral tekshiruv xulosasi',
      'Didox orqali imzolangan E-fakturalar va tovar-transport yukxatlari (TTN)',
      'Bank to‘lov topshiriqnomalari ko‘chirmasi',
      'Omborga kirim qilish orderlari (M-4 shakli)',
    ],
    rawText: `Biz «PROGRESS BUILD» MChJ qurilish korxonasimiz. Toshkent shahar DSB kameral tekshiruv o‘tkazib, 2025-yil 3-choragidagi yetkazib beruvchimiz «BETON MASTER» MChJ soliq xavfi yuqori bo‘lgani sababli ushbu bitimni soxta deb topdi va bizdan 120 mln so‘m QQSni hisobdan chiqarib, byudjetga to‘lashni talab qilmoqda.
Biroq biz 800 kub betonni amalda qabul qilganmiz, qurilish ob‘ektiga quyilgan, TTN, laboratoriya sinov dalolatnomalari va bank to‘lovlari to‘liq mavjud. Soliq kodeksining 14 va 15-moddalari bo‘yicha soliq to‘lovchining haqligi prezumpsiyasi mavjud.`,
    result: {
      caseTitle: '«PROGRESS BUILD» MChJning Soliq organi asossiz talabnomasini bekor qilish auditi',
      disputeType: 'Ma‘muriy sud nizosi, Soliq kodeksi 14, 15, 140, 266-moddalari',
      partyRole: 'plaintiff',
      clientCompanyName: '«PROGRESS BUILD» MChJ',
      opponentName: 'Toshkent shahar Davlat Soliq Boshqarmasi',
      claimTotalAmount: '120 000 000 so‘m',
      overallWinProbability: 86,
      riskProbability: 14,
      probabilityRationale: 'O‘zbekiston Respublikasi Oliy Sudi Plenumining 2024-yildagi soliq nizolari bo‘yicha qaroriga binoan, kontragentning soliq qarzini uchinchi shaxsga yuklash taqiqlanadi. Tovar amalda yetkazilganligi (TTN va laboratoriya akti) isbotlangan taqdirda, soliq organining xulosasi sud tomonidan to‘liq bekor qilinadi.',
      confidenceDisclaimer: 'Ma‘muriy sudlarda soliq organlariga qarshi nizolarda O‘zR Soliq kodeksining 14 va 15-moddalari (soliq to‘lovchining haqligi prezumpsiyasi) amal qiladi.',
      executiveSummary: 'Soliq organining kameral tekshiruv xulosasi noqonuniy. Korxona tovarning amalda yetkazilganligini tasdiqlovchi birlamchi hujjatlarga ega. Ma‘muriy sudga yoki Yuqori turuvchi Soliq Qo‘mitasiga shikoyat berilsa, talabnoma 100% bekor qilinadi.',
      claimGrounds: [
        {
          id: 'cg-t1',
          claimPoint: 'QQS hisobini bekor qilish va 120 mln so‘m qo‘shimcha soliq hisoblash',
          opponentLegalBasis: 'Soliq kodeksi 14-modda (Bitimning haqiqiyligi)',
          status: 'UNGROUNDED_OR_ILLEGAL',
          statusLabel: 'Qonunga zid / Asossiz',
          analysis: 'Soliq kodeksining 15-moddasiga binoan, barcha bartaraf etib bo‘lmaydigan shubhalar soliq to‘lovchining foydasiga talqin qilinadi. Kontragentning o‘z majburiyatini bajarmaganligi vijdonli soliq to‘lovchini QQS hisobidan mahrum qilishga asos bo‘lmaydi.',
          lexArticle: 'Soliq kodeksi 14, 15, 266-moddalar',
          lexUrl: 'https://lex.uz/docs/4674902',
          counterArgument: 'Bitim amalda bajarilgan: TTN, laboratoriya xulosalari va ob‘ektga kirim orderlari mavjud.',
        },
      ],
      proceduralDefects: [
        {
          title: 'Soliq to‘lovchiga asoslantirilgan tushuntirish berish imkoniyati berilmagan',
          lawArticle: 'Soliq kodeksi 138-modda',
          description: 'Soliq organi kameral tekshiruv talabnomasiga berilgan e‘tirozlarni har tomonlama o‘rganmasdan qaror qabul qilgan.',
          practicalAdvantage: 'Soliq organi qarorini protsessual tartib buzilganligi sababli bekor qildirish.',
          lexUrl: 'https://lex.uz/docs/4674902',
        },
      ],
      strongPoints: [
        'Barcha to‘lovlar bank orqali rasmiy o‘tkazilgan.',
        'Didox orqali imzolangan elektron hisobvaraq-faktura va tovar-transport yukxatlari (TTN) mavjud.',
        'Betonning ob‘ektga quyilganligini tasdiqlovchi qurilish jurnali va mualliflik nazorati akti mavjud.',
      ],
      vulnerabilities: [
        'Kontragent soliq hisobotlarini «nol» qilib topshirgan bo‘lsa, sudda qo‘shimcha tekshiruv talab qilinishi mumkin.',
      ],
      interactiveQuestions: [
        {
          id: 'q-t1',
          question: 'Qurilish ob‘ektida beton quyilganligi to‘g‘risida yashirin ishlar dalolatnomasi (Akt na skrytie raboti) mavjudmi?',
          category: 'evidence',
          importance: 'CRITICAL',
          impactExplanation: 'Tovar haqiqatda mavjud bo‘lganligini va ishlatilganligini 100% isbotlaydi.',
          options: ['Ha, to‘liq rasmiylashtirilgan', 'Faqat oddiy kirim akti bor'],
          userAnswer: 'Ha, to‘liq rasmiylashtirilgan',
        },
      ],
      actionPlaybook: [
        {
          stepNumber: 1,
          title: 'Toshkent tumanlararo Ma‘muriy sudiga ariza berish',
          action: 'Soliq organi talabnomasini haqiqiy emas deb topish to‘g‘risida MSIK 188-moddasi tartibida shikoyat arizasi kiritish.',
          deadline: 'Talabnoma olingan kundan 30 kun ichida',
          documentsNeeded: ['Shikoyat arizasi', 'Talabnoma', 'TTN va E-fakturalar', 'Qurilish aktlari'],
        },
      ],
      generatedCounterDocument: {
        title: 'Toshkent tumanlararo ma‘muriy sudiga Shikoyat arizasi (Soliq talabnomasini bekor qilish)',
        docType: 'shikoyat_rad',
        lexBasis: 'MSIK 188-190 moddalar, Soliq kodeksi 14, 15, 266-moddalar',
        content: `Toshkent tumanlararo ma‘muriy sudiga
Ariza beruvchi: «PROGRESS BUILD» MChJ
STIR: 307112233, Tel: +998 71 210-99-88
Manzil: Toshkent sh., Chilonzor tumani

Javobgar: Toshkent shahar Davlat Soliq Boshqarmasi
Manzil: Toshkent sh., A.Qodiriy ko‘chasi

ARIZA
(Soliq organining 2026-yil __-fevraldagi №____-sonli talabnomasini haqiqiy emas deb topish to‘g‘risida)

Toshkent shahar DSB tomonidan korxonamizga nisbatan 120 000 000 so‘m QQS hisobini bekor qilish va byudjetga undirish to‘g‘risida talabnoma yuborilgan. Soliq organi yetkazib beruvchimiz «BETON MASTER» MChJni shubhali soliq to‘lovchi deb topganini asos qilgan.

Ushbu talabnoma mutlaqo asossiz va qonunga ziddir:
1. O‘zbekiston Respublikasi Soliq kodeksining 15-moddasiga binoan, soliq to‘g‘risidagi qonunchilikdagi barcha bartaraf etib bo‘lmaydigan ziddiyatlar va noaniqliklar soliq to‘lovchining foydasiga talqin qilinadi.
2. «PROGRESS BUILD» MChJ tovarlarni amalda qabul qilib olgan, Didox orqali E-faktura imzolangan, TTN va omborga kirim qilish orderlari mavjud. Beton qurilish ob‘ektiga quyilgan bo‘lib, yashirin ishlar dalolatnomasi bilan tasdiqlangan.
3. O‘zbekiston Respublikasi Oliy Sudi Plenumining amaldagi sud amaliyotiga binoan, kontragentning o‘z soliq majburiyatlarini bajarmaganligi vijdonli xaridorga moliyaviy sanksiya qo‘llashga asos bo‘la olmaydi.

Yuqoridagilarga asosan hamda O‘zbekiston Respublikasi Soliq kodeksining 14, 15, 266-moddalari va MSIKning 188-190-moddalariga tayanib,

SUDDAN SO‘RAYMIZ:
1. Toshkent shahar Davlat Soliq Boshqarmasining «PROGRESS BUILD» MChJga nisbatan chiqargan 120 000 000 so‘mlik talabnomasini to‘liq haqiqiy emas deb topishingizni;
2. To‘langan davlat bojini javobgar hisobidan undirib berishingizni.

Ilovalar:
1. Soliq talabnomasi nusxasi.
2. Didox E-fakturalar va TTN nusxalari.
3. Qurilish va sinov dalolatnomalari.
4. Davlat boji to‘langanligi kvitansiyasi.

«PROGRESS BUILD» MChJ Rahbari: _____________ / Karimova N.O. /
Sana: «___» ____________ 2026-yil`,
      },
    },
  },
];
