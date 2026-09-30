import { CodexArticle, LegalCategory } from '../types';

export const OFFICIAL_MACRO_DATA = {
  BHM: 412000,          // Bazaviy hisoblash miqdori (so'm)
  MHTEKM: 1217000,      // Mehnatga haq to'lashning eng kam miqdori (so'm)
  PENSIYA_EKM: 834000,  // Yoshga doir eng kam pensiya miqdori (so'm)
  LAST_UPDATED: '2026-yil',
};

export const UZBEKISTAN_LAWS_DATABASE: CodexArticle[] = [
  // MEHNAT KODEKSI (Lex.uz 6257288) - 2023-yil 30-apreldan amalda
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
3) xodimning egallab turgan lavozimiga yoki bajarayotgan ishiga malakasi yetarli bo‘lmaganligi sababli noloyiqligi;
4) xodim tomonidan o‘z mehnat majburiyatlari muntazam ravishda buzilganligi;
5) xodim tomonidan o‘z mehnat majburiyatlari bir marta qo‘pol ravishda buzilganligi (shu jumladan, uzrli sabablarsiz 3 va undan ortiq soat davomida ishda bo‘lmaslik — прогул);
6) ushbu Kodeksda va boshqa qonunlarda nazarda tutilgan boshqa asoslar.`,
    effectiveDate: '2023-04-30',
    editionStatus: 'CURRENT',
    lexUrl: 'https://lex.uz/docs/6257288#6258900',
    keywords: ['ishdan bo‘shatish', 'ish beruvchi tashabbusi', 'shtat qisqarishi', 'progul', 'mehnat intizomi', 'ishga kelmaslik'],
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
3) xodim o‘z majburiyatlarini bajarmaganda — kamida 3 kun oldin.
Ogohlantirish muddati pulli kompensatsiyaga almashtirilishi mumkin.`,
    effectiveDate: '2023-04-30',
    editionStatus: 'CURRENT',
    lexUrl: 'https://lex.uz/docs/6257288#6258925',
    keywords: ['ogohlantirish muddati', 'kompensatsiya', '2 oy', '2 hafta', 'yozma ogohlantirish'],
    category: 'labor',
  },
  {
    id: 'mk-173',
    codeId: 'mk-2023',
    codeName: 'O‘zbekiston Respublikasi Mehnat kodeksi',
    chapterNumber: 'XI bob',
    chapterTitle: 'Mehnat shartnomasi bekor qilinganda kafolatlar va kompensatsiyalar',
    articleNumber: '173-modda',
    articleTitle: 'Ishdan bo‘shatish nafaqasi',
    content: `Mehnat shartnomasi bekor qilinganda ishdan bo‘shatish nafaqasi to‘lanadi:
1) 3 yilgacha ish stajiga ega bo‘lganda — o‘rtacha oylik ish haqining kamida 50 foizi miqdorida;
2) 3 yildan 5 yilgacha ish staji bo‘lganda — kamida 75 foizi;
3) 5 yildan 10 yilgacha ish staji bo‘lganda — kamida 100 foizi;
4) 10 yildan 15 yilgacha ish staji bo‘lganda — kamida 150 foizi;
5) 15 yildan ortiq ish staji bo‘lganda — kamida 200 foizi miqdorida.`,
    effectiveDate: '2023-04-30',
    editionStatus: 'CURRENT',
    lexUrl: 'https://lex.uz/docs/6257288#6259020',
    keywords: ['ishdan bo‘shatish nafaqasi', 'kompensatsiya', 'staj', 'o‘rtacha oylik ish haqi'],
    category: 'labor',
  },
  {
    id: 'mk-217',
    codeId: 'mk-2023',
    codeName: 'O‘zbekiston Respublikasi Mehnat kodeksi',
    chapterNumber: 'XIV bob',
    chapterTitle: 'Dam olish vaqti va mehnat ta‘tillari',
    articleNumber: '217-modda',
    articleTitle: 'Har yilgi asosiy eng kam mehnat ta‘tilining davomiyligi',
    content: `Har yilgi asosiy eng kam mehnat ta‘tilining davomiyligi 21 kalendar kunni tashkil etadi (eski Mehnat kodeksida 15 ish kuni edi). Davlat xizmatchilari, pedagoglar va nogironligi bo‘lgan shaxslar uchun uzaytirilgan ta‘tillar qonun hujjatlarida belgilanadi.`,
    effectiveDate: '2023-04-30',
    editionStatus: 'CURRENT',
    lexUrl: 'https://lex.uz/docs/6257288#6259420',
    keywords: ['mehnat ta‘tili', '21 kalendar kun', 'asosiy ta‘til', 'dam olish'],
    category: 'labor',
  },
  {
    id: 'mk-300',
    codeId: 'mk-2023',
    codeName: 'O‘zbekiston Respublikasi Mehnat kodeksi',
    chapterNumber: 'XVIII bob',
    chapterTitle: 'Mehnat intizomi va intizomiy choralar',
    articleNumber: '312-modda',
    articleTitle: 'Intizomiy jazo choralari',
    content: `Mehnat intizomini buzganlik uchun ish beruvchi quyidagi intizomiy jazo choralarini qo‘llashga haqli:
1) hayfsan;
2) o‘rtacha oylik ish haqining o‘ttiz foizidan ortiq bo‘lmagan miqdorda jarima (ichki mehnat tartibi qoidalarida nazarda tutilgan hollarda ellik foizgacha);
3) mehnat shartnomasini bekor qilish (161-modda ikkinchi qismining 4 va 5-bandlari).
Ushbu jazolardan tashqari boshqa intizomiy jazolarni qo‘llash qat‘iyan taqiqlanadi.`,
    effectiveDate: '2023-04-30',
    editionStatus: 'CURRENT',
    lexUrl: 'https://lex.uz/docs/6257288#6260210',
    keywords: ['hayfsan', 'jarima', 'intizomiy jazo', 'mehnat intizomi', 'jazolar ro‘yxati'],
    category: 'labor',
  },

  // FUQAROLIK KODEKSI (Lex.uz 111189)
  {
    id: 'fk-14',
    codeId: 'fk-uz',
    codeName: 'O‘zbekiston Respublikasi Fuqarolik kodeksi',
    chapterNumber: '2-bob',
    chapterTitle: 'Fuqarolik huquqlarini himoya qilish',
    articleNumber: '14-modda',
    articleTitle: 'Zararni qoplash',
    content: `Huquqi buzilgan shaxs o‘ziga yetkazilgan zararning to‘la qoplanishini talab qilishi mumkin.
Zarar deganda huquqi buzilgan shaxsning buzilgan huquqini tiklash uchun qilgan yoki qilishi lozim bo‘lgan xarajatlari, uning mol-mulki yo‘qolishi yoki shikastlanishi (haqiqiy zarar), shuningdek ushbu shaxs o‘z huquqlari buzilmaganida odatdagi fuqarolik muomalasi sharoitida olishi mumkin bo‘lgan, lekin ololmay qolgan daromadlari (boy berilgan foyda) tushuniladi.`,
    effectiveDate: '1997-03-01',
    editionStatus: 'CURRENT',
    lexUrl: 'https://lex.uz/docs/111189#150520',
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
    articleTitle: 'Sha‘n, qadr-qimmat va ishchanlik obro‘sini himoya qilish',
    content: `1-qism: Fuqaro o‘zining sha‘niga, qadr-qimmatiga yoki ishchanlik obro‘siga putur yetkazuvchi ma‘lumotlar yuzasidan, basharti bunday ma‘lumotlarni tarqatgan shaxs ularning haqiqatga to‘g‘ri kelishini isbotlay olmasa, sud yo‘li bilan raddiya talab qilishga haqli.
6-qism: Ushbu moddaning fuqaroning ishchanlik obro‘sini himoya qilishga doir qoidalari tegishincha yuridik shaxsning ishchanlik obro‘sini himoya qilishga nisbatan ham qo‘llanadi (ushbu Kodeksning 1022-moddasida nazarda tutilgan hollardan tashqari). Yuridik shaxsning ishchanlik obro‘siga putur yetkazadigan ma‘lumotlar tarqatilgan taqdirda, ushbu shaxs bunday ma‘lumotlarni raddiya qilish bilan bir qatorda, ularni tarqatish natijasida yetkazilgan zararning o‘rnini qoplashni talab qilishga haqlidir.`,
    effectiveDate: '1997-03-01',
    editionStatus: 'CURRENT',
    lexUrl: 'https://lex.uz/docs/111189#153400',
    keywords: ['ishchanlik obro‘si', 'yuridik shaxs obro‘si', 'raddiya', 'sha‘n va qadr-qimmat', 'tuhmat', '100-modda'],
    category: 'civil',
  },
  {
    id: 'fk-327',
    codeId: 'fk-uz',
    codeName: 'O‘zbekiston Respublikasi Fuqarolik kodeksi',
    chapterNumber: '24-bob',
    chapterTitle: 'Majburiyatlarni buzganlik uchun javobgarlik',
    articleNumber: '327-modda',
    articleTitle: 'Boshqa shaxslarning pul mablag‘larini noqonuniy ushlab qolganlik uchun javobgarlik',
    content: `Boshqa shaxslarning pul mablag‘larini noqonuniy ushlab qolish, ularni qaytarishdan bosh tortish, ulardan foydalanishni boshqacha tarzda kechiktirish yoki boshqa shaxs hisobidan asossiz olish yoxud tejash natijasida ushbu mablag‘lar summasiga foizlar to‘lanishi kerak. Foizlar miqdori bank foizining hisob stavkasi (Markaziy bank qayta moliyalash stavkasi) bo‘yicha belgilanadi.`,
    effectiveDate: '1997-03-01',
    editionStatus: 'CURRENT',
    lexUrl: 'https://lex.uz/docs/111189#158572',
    keywords: ['pul mablag‘lari', 'foizlar', 'qayta moliyalash stavkasi', 'qarz kechiktirish', 'peniya'],
    category: 'civil',
  },
  {
    id: 'fk-382',
    codeId: 'fk-uz',
    codeName: 'O‘zbekiston Respublikasi Fuqarolik kodeksi',
    chapterNumber: '28-bob',
    chapterTitle: 'Shartnomani o‘zgartirish va bekor qilish',
    articleNumber: '382-modda',
    articleTitle: 'Shartnomani o‘zgartirish va bekor qilish asoslari',
    content: `Shartnoma taraflarning kelishuvi bo‘yicha o‘zgartirilishi va bekor qilinishi mumkin. Taraflardan birining talabi bilan shartnoma faqat ikkinchi taraf shartnomani jiddiy ravishda buzgan taqdirda sud tomonidan o‘zgartirilishi yoki bekor qilinishi mumkin.`,
    effectiveDate: '1997-03-01',
    editionStatus: 'CURRENT',
    lexUrl: 'https://lex.uz/docs/111189#159200',
    keywords: ['shartnomani bekor qilish', 'shartnomani o‘zgartirish', 'taraflar kelishuvi', 'sud orqali bekor qilish'],
    category: 'civil',
  },
  {
    id: 'fk-535',
    codeId: 'fk-uz',
    codeName: 'O‘zbekiston Respublikasi Fuqarolik kodeksi',
    chapterNumber: '34-bob',
    chapterTitle: 'Mol-mulk ijarasi',
    articleNumber: '535-modda',
    articleTitle: 'Mulk ijarasi shartnomasi',
    content: `Mulk ijarasi shartnomasi bo‘yicha ijaraga beruvchi ijarachiga mol-mulkni haq evaziga vaqtincha egalik qilish va foydalanish yoki faqat foydalanish uchun topshirish majburiyatini oladi. Fuqarolar o‘rtasidagi bino yoki inshootni ijaraga berish shartnomasi soliq organlarida majburiy hisobga qo‘yilishi (ijara.soliq.uz) shart.`,
    effectiveDate: '1997-03-01',
    editionStatus: 'CURRENT',
    lexUrl: 'https://lex.uz/docs/111189#160800',
    keywords: ['ijara shartnomasi', 'mol-mulk ijarasi', 'ijara haqi', 'soliq hisobi'],
    category: 'civil',
  },
  {
    id: 'fk-732',
    codeId: 'fk-uz',
    codeName: 'O‘zbekiston Respublikasi Fuqarolik kodeksi',
    chapterNumber: '41-bob',
    chapterTitle: 'Qarz va kredit',
    articleNumber: '732-modda',
    articleTitle: 'Qarz shartnomasi',
    content: `Qarz shartnomasi bo‘yicha bir taraf (qarz beruvchi) ikkinchi tarafga (qarz oluvchiga) pul yoki turdosh belgilar bilan aniqlangan boshqa ashyolarni mulk qilib beradi, qarz oluvchi esa qarz beruvchiga bir xil miqdordagi pulni yoki qarzga olingan ashyolarning xuddi o‘zicha miqdori va sifatidagi ashyolarni qaytarib berish majburiyatini oladi. Fuqarolar o‘rtasida qarz summasi BHMning 10 baravaridan ortiq bo‘lsa, yozma shaklda tuzilishi shart.`,
    effectiveDate: '1997-03-01',
    editionStatus: 'CURRENT',
    lexUrl: 'https://lex.uz/docs/111189#162500',
    keywords: ['qarz shartnomasi', 'tilxat', 'notarial tasdiqlash', '10 baravar BHM', 'qarz qaytarish'],
    category: 'civil',
  },
  {
    id: 'fk-985',
    codeId: 'fk-uz',
    codeName: 'O‘zbekiston Respublikasi Fuqarolik kodeksi',
    chapterNumber: '57-bob',
    chapterTitle: 'Zarar yetkazishdan kelib chiqadigan majburiyatlar',
    articleNumber: '985-modda',
    articleTitle: 'Zarar yetkazganlik uchun javobgarlikning umumiy asoslari',
    content: `G‘ayriqonuniy harakat (harakatsizlik) tufayli fuqaroning shaxsiga yoki mol-mulkiga yetkazilgan zarar, shuningdek yuridik shaxsga yetkazilgan zarar uni yetkazgan shaxs tomonidan to‘liq hajmda qoplanishi lozim. Zarar yetkazgan shaxs, agar zarar o‘z aybi bilan yetkazilmaganligini isbotlasa, zararni qoplashdan ozod qilinadi (qonunda nazarda tutilgan hollar bundan mustasno).`,
    effectiveDate: '1997-03-01',
    editionStatus: 'CURRENT',
    lexUrl: 'https://lex.uz/docs/111189#166500',
    keywords: ['zarar yetkazish', 'moddiy javobgarlik', 'delikt majburiyati', '985-modda'],
    category: 'civil',
  },
  {
    id: 'fk-1021',
    codeId: 'fk-uz',
    codeName: 'O‘zbekiston Respublikasi Fuqarolik kodeksi',
    chapterNumber: '57-bob',
    chapterTitle: 'Ma‘naviy zararni qoplash',
    articleNumber: '1021-modda',
    articleTitle: 'Ma‘naviy zararni qoplashning umumiy asoslari',
    content: `Ma‘naviy zarar (jismoniy yoki ma‘naviy azoblar) uni yetkazgan shaxsning aybi bo‘lgan taqdirda, zarar yetkazuvchi tomonidan qoplanadi.
Zarar yetkazuvchining aybidan qat‘i nazar ma‘naviy zarar quyidagi hollarda qoplanadi:
1) zarar fuqaroning hayoti va sog‘lig‘iga oshiqcha xavf manbai (transport vositasi va boshqalar) tomonidan yetkazilgan bo‘lsa;
2) zarar fuqaroni noqonuniy hukm qilish, noqonuniy jinoiy javobgarlikka tortish, ehtiyot chorasi sifatida qamoqqa olish natijasida yetkazilgan bo‘lsa;
3) zarar sha‘n, qadr-qimmat va ishchanlik obro‘sini haqoratlovchi ma‘lumotlar tarqatilishi tufayli yetkazilgan bo‘lsa;
4) qonunda nazarda tutilgan boshqa hollarda.`,
    effectiveDate: '1997-03-01',
    editionStatus: 'CURRENT',
    lexUrl: 'https://lex.uz/docs/111189#167120',
    keywords: ['ma‘naviy zarar', 'ma‘naviy azoblar', 'aybsiz javobgarlik', '1021-modda'],
    category: 'civil',
  },
  {
    id: 'fk-1022',
    codeId: 'fk-uz',
    codeName: 'O‘zbekiston Respublikasi Fuqarolik kodeksi',
    chapterNumber: '57-bob',
    chapterTitle: 'Ma‘naviy zararni qoplash',
    articleNumber: '1022-modda',
    articleTitle: 'Ma‘naviy zararni qoplash usuli va miqdori',
    content: `1-qism: Ma‘naviy zarar pul bilan qoplanadi.
2-qism: Ma‘naviy zararni qoplash miqdori jabrlanuvchiga yetkazilgan jismoniy va ma‘naviy azoblarning xususiyatiga, shuningdek ayb yetkazishda ayb bo‘lgan hollarda zarar yetkazuvchining aybi darajasiga qarab sud tomonidan belgilanadi.
3-qism: Ma‘naviy zarar qoplanishi lozim bo‘lgan mulkiy zarardan qat‘i nazar qoplanadi.`,
    effectiveDate: '1997-03-01',
    editionStatus: 'CURRENT',
    lexUrl: 'https://lex.uz/docs/111189#167150',
    keywords: ['ma‘naviy zarar miqdori', 'pul bilan qoplash', 'sud baholashi', '1022-modda'],
    category: 'civil',
  },

  // OILAN KODEKSI (Lex.uz 145261)
  {
    id: 'ok-99',
    codeId: 'ok-uz',
    codeName: 'O‘zbekiston Respublikasi Oila kodeksi',
    chapterNumber: '15-bob',
    chapterTitle: 'Ota-ona hamda bolalarning aliment majburiyatlari',
    articleNumber: '99-modda',
    articleTitle: 'Voyaga yetmagan bolalarga suddan aliment undirish miqdori',
    content: `Agar voyaga yetmagan bolalariga ta‘minot berish haqida ota-ona o‘rtasida kelishuv bo‘lmasa, aliment sud tomonidan ota-onaning oylik ish haqi va boshqa daromadining:
- 1 nafar bola uchun — 1/4 qismi (25%);
- 2 nafar bola uchun — 1/3 qismi (33.3%);
- 3 va undan ortiq bola uchun — 1/2 qismi (50%) miqdorida undiriladi.
Har bir bola uchun undiriladigan aliment miqdori qonunchilikda belgilangan mehnatga haq to‘lash eng kam miqdorining 26,5 foizidan kam bo‘lmasligi kerak.`,
    effectiveDate: '1998-09-01',
    editionStatus: 'CURRENT',
    lexUrl: 'https://lex.uz/docs/145261#146520',
    keywords: ['aliment', 'voyaga yetmagan bola', 'aliment miqdori', '1/4', '1/3', '1/2', 'eng kam aliment'],
    category: 'family',
  },
  {
    id: 'ok-118',
    codeId: 'ok-uz',
    codeName: 'O‘zbekiston Respublikasi Oila kodeksi',
    chapterNumber: '16-bob',
    chapterTitle: 'Er va xotinning, sobiq er-xotinning aliment majburiyatlari',
    articleNumber: '118-modda',
    articleTitle: 'Er-xotinning bir-biriga ta‘minot berish majburiyati',
    content: `Er-xotin bir-biriga moddiy yordam berishi shart. Yordam berishdan bosh tortilgan taqdirda:
- homiladorlik davrida va umumiy bolasi tug‘ilgan kundan boshlab 3 yil davomida xotin;
- umumiy nogiron bolani parvarishlayotgan muhtoj er (xotin);
- mehnatga layoqatsiz bo‘lib qolgan muhtoj er (xotin) sud orqali ta‘minot (aliment) talab qilish huquqiga ega.`,
    effectiveDate: '1998-09-01',
    editionStatus: 'CURRENT',
    lexUrl: 'https://lex.uz/docs/145261#146710',
    keywords: ['xotiniga aliment', 'homiladorlik alimenti', '3 yoshgacha bola parvarishi'],
    category: 'family',
  },

  // SOLIQ KODEKSI (Lex.uz 4674902)
  {
    id: 'sk-369',
    codeId: 'sk-uz',
    codeName: 'O‘zbekiston Respublikasi Soliq kodeksi',
    chapterNumber: '51-bob',
    chapterTitle: 'Jismoniy shaxslarning daromad solig‘i',
    articleNumber: '369-modda',
    articleTitle: 'Jismoniy shaxslarning daromad solig‘i stavkalari',
    content: `O‘zbekiston Respublikasi rezidenti bo‘lgan jismoniy shaxslarning daromadlariga soliq solish 12 foiz miqdoridagi qat‘iy belgilangan stavka bo‘yicha amalga oshiriladi (ayrim maxsus dividend va foiz daromadlari bundan mustasno).`,
    effectiveDate: '2020-01-01',
    editionStatus: 'CURRENT',
    lexUrl: 'https://lex.uz/docs/4674902#4715200',
    keywords: ['daromad solig‘i', 'JShODS', '12 foiz', 'ish haqi solig‘i', 'jismoniy shaxslar'],
    category: 'tax',
  },
  {
    id: 'sk-467',
    codeId: 'sk-uz',
    codeName: 'O‘zbekiston Respublikasi Soliq kodeksi',
    chapterNumber: '66-bob',
    chapterTitle: 'Aylanmadan olinadigan soliq',
    articleNumber: '467-modda',
    articleTitle: 'Aylanmadan olinadigan soliq stavkalari',
    content: `Aylanmadan olinadigan soliqning bazaviy stavkasi yillik aylanmasi 1 mlrd so‘mgacha bo‘lgan yuridik shaxslar va YaTTlar uchun 4 foizni tashkil etadi (savdo va umumiy ovqatlanish sohalari uchun maxsus differensiatsiyalashgan stavkalar mavjud).`,
    effectiveDate: '2020-01-01',
    editionStatus: 'CURRENT',
    lexUrl: 'https://lex.uz/docs/4674902#4732100',
    keywords: ['aylanmadan soliq', '4 foiz', 'YaTT solig‘i', 'kichik biznes solig‘i'],
    category: 'tax',
  },

  // DAVLAT BOJI TO‘G‘RISIDAGI QONUN (Lex.uz 5202613) - O‘RQ-600
  {
    id: 'db-5',
    codeId: 'zru-600',
    codeName: '«Davlat boji to‘g‘risida»gi O‘zbekiston Respublikasi Qonuni',
    chapterNumber: 'I bob',
    chapterTitle: 'Umumiy qoidalar',
    articleNumber: '5-modda',
    articleTitle: 'Fuqarolik va iqtisodiy ishlari bo‘yicha sudlarga da‘vo arizalari berishda davlat boji stavkalari',
    content: `Sudlarga murojaat qilishda davlat boji stavkalari:
1) Fuqarolik ishlari bo‘yicha sudlarda mulkiy xususiyatga ega da‘vo arizalari: da‘vo bahosining 4 foizi miqdorida, biroq BHMning 1 baravaridan kam bo‘lmagan miqdorda;
2) Iqtisodiy sudlarda mulkiy da‘volar: da‘vo bahosining 2 foizi miqdorida, lekin BHMning 1 baravaridan kam emas;
3) Nomulkiy da‘volar bo‘yicha: BHMning 2 baravari miqdorida;
4) Nikohni bekor qilish haqidagi da‘volar bo‘yicha: BHMning 2 baravari miqdorida (takroriy nikohda 4 baravari).`,
    effectiveDate: '2020-01-06',
    editionStatus: 'CURRENT',
    lexUrl: 'https://lex.uz/docs/5202613#5204100',
    keywords: ['davlat boji', 'sud boji', '4 foiz', '2 foiz', 'BHM', 'da‘vo arizasi'],
    category: 'court',
  },

  // MA‘MURIY JAVOBGARLIK TO‘G‘RISIDAGI KODEKS (Lex.uz 97661)
  {
    id: 'mjtk-49',
    codeId: 'mjtk-uz',
    codeName: 'O‘zbekiston Respublikasi Ma‘muriy javobgarlik to‘g‘risidagi kodeksi',
    chapterNumber: 'VI bob',
    chapterTitle: 'Mehnat va fuqarolar sog‘lig‘ini saqlash sohasidagi huquqbuzarliklar',
    articleNumber: '49-modda',
    articleTitle: 'Mehnat va mehnatni muhofaza qilish to‘g‘risidagi qonunchilikni buzish',
    content: `Mansabdor shaxs tomonidan mehnat va mehnatni muhofaza qilish to‘g‘risidagi qonunchilik talablarini buzish:
- BHMning 5 baravaridan 10 baravarigacha miqdorda jarima solishga sabab bo‘ladi.
Xuddi shunday huquqbuzarlik ma‘muriy jazo qo‘llanilganidan keyin bir yil davomida takroran sodir etilgan bo‘lsa:
- BHMning 10 baravaridan 15 baravarigacha miqdorda jarima solishga sabab bo‘ladi.`,
    effectiveDate: '1995-04-01',
    editionStatus: 'CURRENT',
    lexUrl: 'https://lex.uz/docs/97661#98800',
    keywords: ['mehnat qonunchiligini buzish', 'ish beruvchi jarimasi', 'mehnat inspeksiyasi', '49-modda'],
    category: 'admin',
  },
  {
    id: 'mjtk-175',
    codeId: 'mjtk-uz',
    codeName: 'O‘zbekiston Respublikasi Ma‘muriy javobgarlik to‘g‘risidagi kodeksi',
    chapterNumber: 'XII bob',
    chapterTitle: 'Savdo, xizmat ko‘rsatish va moliya sohasidagi huquqbuzarliklar',
    articleNumber: '175-modda',
    articleTitle: 'Buxgalteriya hisobi va hisoboti tartibini buzish',
    content: `Soliq hisobotlarini belgilangan muddatda taqdim etmaslik yoki noto‘g‘ri taqdim etish:
- mansabdor shaxslarga BHMning 3 baravaridan 5 baravarigacha miqdorda jarima solishga sabab bo‘ladi.`,
    effectiveDate: '1995-04-01',
    editionStatus: 'CURRENT',
    lexUrl: 'https://lex.uz/docs/97661#101500',
    keywords: ['soliq hisoboti kechikishi', 'soliq jarimasi', 'buxgalteriya', '175-modda'],
    category: 'admin',
  },

  // KONSTITUTSIYA (Lex.uz 6445145) - Yangi tahrir
  {
    id: 'const-42',
    codeId: 'const-uz',
    codeName: 'O‘zbekiston Respublikasi Konstitutsiyasi (Yangi tahrir)',
    chapterNumber: 'IX bob',
    chapterTitle: 'Iqtisodiy, ijtimoiy, madaniy va ekologik huquqlar',
    articleNumber: '42-modda',
    articleTitle: 'Mehnat qilish, adolatli mehnat sharoitlari va ishsizlikdan himoyalanish huquqi',
    content: `Har kim munosib mehnat qilish, kasb va faoliyat turini erkin tanlash, xavfsizlik va gigiyena talablariga javob beradigan qulay mehnat sharoitlarida ishlash, shuningdek mehnatiga yarasha hech qanday kamsitishlarsiz hamda mehnatga haq to‘lashning belgilangan eng kam miqdoridan kam bo‘lmagan haq olish huquqiga ega.
Homiladorligi yoki bolasi borligi sababli ayollarni ishga qabul qilishni rad etish, ishdan bo‘shatish va ularning ish haqini kamaytirish taqiqlanadi.`,
    effectiveDate: '2023-05-01',
    editionStatus: 'CURRENT',
    lexUrl: 'https://lex.uz/docs/6445145#6445600',
    keywords: ['mehnat huquqi', 'konstitutsiya 42-modda', 'eng kam ish haqi', 'homilador ayollar huquqlari'],
    category: 'labor',
  },

  // ISTE‘MOLCHILAR HUQUQLARI (Lex.uz 47098)
  {
    id: 'ist-18',
    codeId: 'ist-uz',
    codeName: '«Iste‘molchilarning huquqlarini himoya qilish to‘g‘risida»gi Qonun',
    chapterNumber: 'II bob',
    chapterTitle: 'Iste‘molchilarning asosiy huquqlari',
    articleNumber: '18-modda',
    articleTitle: 'Iste‘molchining maqbul sifatli nooziq-ovqat tovarini almashtirish huquqi',
    content: `Iste‘molchi maqbul sifatli nooziq-ovqat tovarini xarid qilgan kundan e‘tiboran o‘n to‘rt kun (14 kun) ichida xarid qilingan joydagi sotuvchidan uni o‘lchami, shakli, gabariti, fasoni, rangi yoki komplektatsiyasiga mos keladigan shunday tovarga almashtirib olishga, mos tovar bo‘lmagan taqdirda esa pulini qaytarib olishga haqlidir. Tovar ishlatilmagan, uning tovar ko‘rinishi, iste‘mol xususiyatlari, plombalari, yorliqlari saqlangan bo‘lishi lozim.`,
    effectiveDate: '1996-04-26',
    editionStatus: 'CURRENT',
    lexUrl: 'https://lex.uz/docs/47098#47300',
    keywords: ['tovarni qaytarish', '14 kun', 'iste‘molchi huquqi', 'chek', 'sifatli tovarni almashtirish'],
    category: 'civil',
  },

  // IT PARK & RAQAMLI IQTISODIYOT (Lex.uz 4143849 - PF-5624)
  {
    id: 'it-park-1',
    codeId: 'pf-5624',
    codeName: 'O‘zbekiston Respublikasi Prezidentining PF-5624-son Farmoni',
    chapterNumber: 'Asosiy qism',
    chapterTitle: 'Dasturiy mahsulotlar va axborot texnologiyalari texnologik parki faoliyatini tashkil etish',
    articleNumber: '3-band',
    articleTitle: 'IT Park rezidentlari uchun soliq va bojxona imtiyozlari',
    content: `IT Park rezidentlari 2028-yil 1-yanvarga qadar quyidagi soliqlardan to‘liq ozod qilingan:
1) Barcha turdagi soliqlar va davlat maqsadli jamg‘armalariga majburiy ajratmalardan (aylanmadan soliq, foyda solig‘i, QQS);
2) O‘z ehtiyojlari uchun olib kirilayotgan uskunalar, butlovchi buyumlar va dasturiy ta‘minotlar uchun bojxona to‘lovlaridan (bojxona yig‘imlaridan tashqari);
3) IT Park rezidentlari xodimlarining jismoniy shaxslardan olinadigan daromad solig‘i (JShODS) 7.5 foiz qat‘iy stavkada soliqqa tortiladi (umumiy 12% o‘rniga).`,
    effectiveDate: '2019-01-10',
    editionStatus: 'CURRENT',
    lexUrl: 'https://lex.uz/docs/4143849',
    keywords: ['IT Park', 'IT Park imtiyozlari', '7.5 foiz daromad solig‘i', 'nol foiz soliq', 'dasturchilar solig‘i'],
    category: 'it_ip',
  },
];

// Hybrid BM25 + Semantic helper for client-side instant retrieval
export function searchLawsDatabase(query: string, category?: LegalCategory): CodexArticle[] {
  if (!query.trim() && (!category || category === 'all')) {
    return UZBEKISTAN_LAWS_DATABASE;
  }

  const cleanQuery = query.toLowerCase().trim();
  const queryTokens = cleanQuery.split(/\s+/).filter(t => t.length > 1);

  return UZBEKISTAN_LAWS_DATABASE.filter(art => {
    if (category && category !== 'all' && art.category !== category) {
      return false;
    }

    if (!cleanQuery) return true;

    const searchableText = `${art.codeName} ${art.articleNumber} ${art.articleTitle} ${art.content} ${art.keywords.join(' ')}`.toLowerCase();

    // Exact article match bonus (e.g. "161", "161-modda")
    const articleNumMatch = art.articleNumber.toLowerCase().includes(cleanQuery);
    if (articleNumMatch) return true;

    // Token matching
    const matchCount = queryTokens.reduce((acc, token) => {
      return acc + (searchableText.includes(token) ? 1 : 0);
    }, 0);

    return matchCount > 0;
  }).sort((a, b) => {
    // Exact title or keyword matches rank higher
    const aMatch = (a.articleTitle + a.keywords.join(' ')).toLowerCase().includes(cleanQuery) ? 2 : 1;
    const bMatch = (b.articleTitle + b.keywords.join(' ')).toLowerCase().includes(cleanQuery) ? 2 : 1;
    return bMatch - aMatch;
  });
}
