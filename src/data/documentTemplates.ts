/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * O‘zbekiston Respublikasi rasmiy qonunchiligi (Lex.uz) va davlat standartlariga
 * (O‘zDSt 1157:2008 «Ish yuritish va hujjatlashtirish») to‘liq mos keluvchi
 * professional yuridik hujjatlar, namunaviy shartnomalar va arizalar bazasi.
 */

import { LegalDocumentTemplate } from '../types';

export const LEGAL_DOCUMENT_TEMPLATES: LegalDocumentTemplate[] = [
  // 1. MEHNAT SHARTNOMASI (YURXIZMAT.UZ №120 & YANGI MEHNAT KODEKSI - LOTIN)
  {
    id: 'mehnat-shartnomasi-namunaviy',
    title: 'Yakka tartibdagi mehnat shartnomasi (Yurxizmat.uz 120-hujjat andozasi)',
    shortTitle: 'Mehnat shartnomasi (Yurxizmat 120)',
    category: 'labor',
    description: 'Yangi tahrirdagi Mehnat kodeksining 104-108 moddalari va Yurxizmat.uz (120-shartnoma) talablariga to‘liq mos institutsional mehnat shartnomasi.',
    applicableLaw: 'Mehnat kodeksi 104, 105, 106, 107, 108, 110, 129, 216, 253, 452-moddalar; VM 971-son qarori (YAMMT)',
    lexUrl: 'https://lex.uz/docs/6257288#6258520',
    classificationCode: 'O‘zDSt 1157:2008 / YURXIZMAT-120 / MK-104',
    fields: [
      { key: 'contractNumber', label: 'Shartnoma raqami', placeholder: '120-MS', defaultValue: `${new Date().getFullYear()}/MS-120`, type: 'text', required: true },
      { key: 'contractRegion', label: 'Shartnoma tuzilgan hudud (shahar/tuman)', placeholder: 'Toshkent shahri, Mirobod tumani', defaultValue: 'Toshkent shahri, Mirobod tumani', type: 'text', required: true },
      { key: 'contractDate', label: 'Shartnoma tuzilgan sana', placeholder: '«___» ____________ 2026-yil', defaultValue: '2026-yil 1-mart', type: 'text', required: true },
      { key: 'companyName', label: 'Ish beruvchi tashkilot nomi va rahbari', placeholder: '«ALFA GLOBAL TECH» MChJ nomidan direktor Karimov A.B. (Ustav asosida)', defaultValue: '«ALFA GLOBAL TECH» MChJ nomidan direktor Karimov Alisher Baxtiyorovich (Ustav asosida)', type: 'text', required: true },
      { key: 'employeeName', label: 'Xodimning to‘liq F.I.Sh.', placeholder: 'Usmonov Jasur Rustamovich', defaultValue: 'Usmonov Jasur Rustamovich', type: 'text', required: true },
      { key: 'employeePassport', label: 'Xodim pasport/ID karta ma‘lumotlari va PINFL', placeholder: 'Pasport: AB 1234567, PINFL: 31204951234567', defaultValue: 'Pasport: AB 1234567, JSHSHIR (PINFL): 31204951234567', type: 'text', required: true },
      { key: 'employeeAddress', label: 'Xodimning yashash manzili va telefoni', placeholder: 'Toshkent sh., Chilonzor t., 9-mavze, 14-uy, Tel: +998 90 123-45-67', defaultValue: 'Toshkent sh., Chilonzor t., 9-mavze, 14-uy, Tel: +998 90 123-45-67', type: 'text', required: true },
      { key: 'workPlace', label: 'Taklif qilinayotgan ish joyi (korxona / bo‘lim)', placeholder: '«ALFA GLOBAL TECH» MChJ Axborot texnologiyalari departamenti', defaultValue: '«ALFA GLOBAL TECH» MChJ Axborot texnologiyalari departamenti', type: 'text', required: true },
      { key: 'jobTitle', label: 'Taklif qilinayotgan lavozim nomi va talablari', placeholder: 'Yetakchi dasturiy ta‘minot muhandisi (Oliy ma‘lumotli, 3 yillik tajriba)', defaultValue: 'Yetakchi dasturiy ta‘minot muhandisi (Oliy ma‘lumotli, 3 yillik tajriba)', type: 'text', required: true },
      { key: 'workNature', label: 'Ish vaqti turi', placeholder: 'Asosiy ish joyi', type: 'select', options: ['Asosiy ish joyi', 'Ichki o‘rindoshlik asosida', 'Tashqi o‘rindoshlik asosida', 'Masofaviy ish (Remote - MK 452)', 'Kombinatsiyalashgan masofaviy ish'], defaultValue: 'Asosiy ish joyi', required: true },
      { key: 'contractType', label: 'Shartnoma muddati', placeholder: 'Nomuayyan muddatga (muddatsiz)', type: 'select', options: ['Nomuayyan muddatga (muddatsiz)', '5 yildan oshmagan muayyan muddatga (MK 111-modda)', 'Muayyan ishni bajarish davriga'], defaultValue: 'Nomuayyan muddatga (muddatsiz)', required: true },
      { key: 'startDate', label: 'Shartnoma kuchga kirish vaqti (ish boshlanishi)', placeholder: '2026-yil 1-martdan', defaultValue: '2026-yil 1-martdan', type: 'text', required: true },
      { key: 'endDate', label: 'Shartnoma yakuniga yetish vaqti', placeholder: 'Nomuayyan muddatli (yoki 2027-yil 1-martgacha)', defaultValue: 'Nomuayyan muddatli', type: 'text' },
      { key: 'probationPeriod', label: 'Dastlabki sinov muddati (MK 129-130)', placeholder: '3 oy', type: 'select', options: ['Sinov muddatisiz', '1 oy', '2 oy', '3 oy', '6 oygacha (rahbar/buxgalter)'], defaultValue: '3 oy', required: true },
      { key: 'workHours', label: 'Ish kuni rejimi', placeholder: 'Haftasiga 40 soat, 5 kunlik ish haftasi (09:00 dan 18:00 gacha, tushlik 13:00 dan 14:00 gacha)', defaultValue: 'Haftasiga 40 soat, 5 kunlik ish haftasi (09:00 dan 18:00 gacha, tushlik 13:00 dan 14:00 gacha)', type: 'text', required: true },
      { key: 'salaryAmount', label: 'Mehnatga haq to‘lash (to‘lov turi va miqdori)', placeholder: 'Oylik lavozim maoshi: 12 000 000 so‘m (yoki YATS 8-razryad)', defaultValue: 'Oylik lavozim maoshi: 12 000 000 so‘m', type: 'text', required: true },
      { key: 'salaryBonus', label: 'Qo‘shimcha haq to‘lash turi va miqdori', placeholder: 'KPI natijalariga asosan oylik 20% ustama va bayram/tungi ishga 2 hissa to‘lov', defaultValue: 'KPI natijalari bo‘yicha 20% ustama va ish vaqtidan tashqari mehnatga 2 hissa haq', type: 'text' },
      { key: 'vacationDays', label: 'Asosiy mehnat ta‘tili muddati', placeholder: '21 kalendar kun (MK 216-modda)', defaultValue: '21 kalendar kun', type: 'text', required: true },
      { key: 'extraVacationDays', label: 'Qo‘shimcha ta‘til muddati', placeholder: '3 ish kuni', defaultValue: '3 ish kuni', type: 'text' },
    ],
    sampleFilledValues: {
      contractNumber: '2026/MS-120',
      contractRegion: 'Toshkent shahri, Mirobod tumani',
      contractDate: '2026-yil 1-mart',
      companyName: '«ALFA GLOBAL TECH» MChJ nomidan direktor Karimov Alisher Baxtiyorovich (Ustav asosida)',
      employeeName: 'Usmonov Jasur Rustamovich',
      employeePassport: 'Pasport: AB 1234567, Mirobod tuman IIB, JSHSHIR (PINFL): 31204951234567',
      employeeAddress: 'Toshkent sh., Mirobod t., Oybek ko‘chasi, 12-uy, Tel: +998 90 123-45-67',
      workPlace: '«ALFA GLOBAL TECH» MChJ Axborot texnologiyalari departamenti',
      jobTitle: 'Yetakchi dasturiy ta‘minot muhandisi (Oliy ma‘lumotli, 3 yillik staj)',
      workNature: 'Asosiy ish joyi',
      contractType: 'Nomuayyan muddatga (muddatsiz)',
      startDate: '2026-yil 1-martdan',
      endDate: 'Nomuayyan muddatli',
      probationPeriod: '3 oy',
      workHours: 'Haftasiga 40 soat, 5 kunlik ish haftasi (09:00 dan 18:00 gacha, tushlik 13:00 dan 14:00 gacha)',
      salaryAmount: 'Oylik lavozim maoshi: 12 000 000 so‘m',
      salaryBonus: 'KPI natijalari bo‘yicha 20% ustama va ish vaqtidan tashqari mehnatga 2 hissa haq',
      vacationDays: '21 kalendar kun',
      extraVacationDays: '3 ish kuni',
    },
    templateGenerator: (v) => `${v.contractNumber || '120'}-son MEHNAT SHARTNOMASI (KONTRAKT)
(Yurxizmat.uz va O‘zbekiston Respublikasi Adliya vazirligi Legal Tech andozasi)

${v.contractRegion || 'Toshkent shahri'}                                      ${v.contractDate || '«___» ____________ 2026-yil'}

1. Korxona (mulkchilikning barcha shakllaridagi tashkilot, muassasa, shu jumladan ularning alohida tarkibiy bo‘linmalari) ${v.companyName || '[Ish beruvchi korxona nomi va rahbar F.I.Sh.]'} nomidan (keyingi o‘rinlarda «Ish beruvchi» deb ataladi) bir tomondan, va fuqaro ${v.employeeName || '[Xodim F.I.Sh.]'} (keyingi o‘rinlarda «Xodim» deb ataladi) ikkinchi tomondan, mazkur mehnat shartnomasini quyidagilar haqida tuzdilar:

2. Xodim ${v.employeeName || '[Xodim F.I.Sh.]'} ${v.workPlace || '[Taklif qilinayotgan ish joyi]'} kasbi bo‘yicha ${v.jobTitle || '[Taklif qilinayotgan lavozim nomi va talablari]'} lavozimiga ishga qabul qilinadi.

3. Shartnoma bo‘yicha ish xususiyati: ${v.workNature || 'Asosiy ish joyi'} hisoblanadi.

4. Shartnoma muddati: ${v.contractType || 'Nomuayyan muddatga (muddatsiz)'}.

5. Shartnoma bo‘yicha ishlash boshlanishi: ${v.startDate || '2026-yil 1-martdan'}, tamom bo‘lishi: ${v.endDate || 'Nomuayyan muddatli'}.

6. Sinov muddati: ${v.probationPeriod || '3 oy'} (MK 129, 130-moddalar).

7. Xodimning majburiyatlari:
a) mehnat va texnologiya intizomi (ichki mehnat tartibi qoidalari, ustavlar va intizom to‘g‘risidagi qoidalar)ga rioya qilish;
b) ish beruvchining qonuniy farmoyishlarini bajarish;
v) mehnatni muhofaza qilish, xavfsizlik texnikasi va ishlab chiqarish sanitariyasi talablariga rioya qilish;
g) lavozim yo‘riqnomalariga qat‘iy rioya qilish;
d) YATMM, MM bilan nazarda tutilgan malaka majburiyatlariga rioya qilish;
e) qonun hujjatlari va boshqa normativ hujjatlarga rioya qilish;
j) jamoa shartnomasi shartlariga rioya qilish;
z) xodim tomonidan qabul qilinadigan boshqa majburiyatlar: mehnat unumdorligi, mahsulot/xizmat sifati, ish normasini bajarish hamda tijorat va xizmat sirini saqlash.

8. Ish beruvchining majburiyatlari:
a) xodimning mehnatini tashkil etish, xodimni Mehnatni muhofaza qilish va xavfsizlik texnikasi qoidalari, lavozim yo‘riqnomalari, jamoa shartnomasi va boshqa lokal hujjatlar bilan tanishtirish;
b) mehnat va ishlab chiqarish intizomini ta‘minlash;
v) ish haqini o‘z vaqtida va to‘liq to‘lash (har oyning 20 va 5-kunlarida);
g) xavfsiz va samarali mehnat uchun shart-sharoitlar yaratish, xodimni o‘qitish, unga mehnatning xavfsiz shart-sharoiti to‘g‘risida yo‘l-yo‘riq berish;
d) ish joyini mehnatni muhofaza qilish va xavfsizlik texnikasi qoidalariga muvofiq jihozlash;
j) qonun hujjatlariga va boshqa normativ hujjatlarga rioya qilish;
z) jamoa shartnomasi shartlariga rioya qilish;
i) shartnomani «YAMMT» (my.mehnat.uz) tizimida ro‘yxatdan o‘tkazish va elektron mehnat daftarchasini yuritish.

9. Ish kuni rejimi:
${v.workHours || 'Haftasiga 40 soat, 5 kunlik ish haftasi (09:00 dan 18:00 gacha, tushlik 13:00 dan 14:00 gacha)'}.

10. Mehnatga haq to‘lash:
Xodimga quyidagicha haq to‘lash belgilanadi:
a) To‘lov turi va miqdori: ${v.salaryAmount || 'Oylik lavozim maoshi: 12 000 000 so‘m'}.
b) Amaldagi qonun hujjatlariga va normativ hujjatlarga muvofiq mehnat sharoitlari bilan bog‘liq bo‘lgan qo‘shimcha haq, ustama, kompensatsiyalar quyidagi miqdorlarda: ${v.salaryBonus || 'Ish vaqtidan tashqari va bayram kunlaridagi ishga kamida ikki hissa haq to‘lash (MK 262, 263-moddalar)'}.
v) Jamoa shartnomasi shartlari bilan nazarda tutilgan, shuningdek rahbar tomonidan belgilanadigan qo‘shimcha haq, ustama, mukofot, taqdirlashlar va rag‘batlantiruvchi boshqa to‘lovlar.

11. Xodimga:
a) Asosiy ta‘til (mehnat ta‘tili): ${v.vacationDays || '21 kalendar kun'} (MK 216-modda);
b) Qo‘shimcha ta‘til: ${v.extraVacationDays || '3 ish kuni'}dan iborat bo‘lgan haq to‘lanadigan yillik mehnat ta‘tili belgilanadi.

12. Mehnat shartnomasi (kontrakt)ning mehnat sharoitlari va unga haq to‘lash xususiyatlari, ijtimoiy himoya, imtiyozlar, kafolatlar va nizolarni hal etish bilan bog‘liq bo‘lgan boshqa shartlari qonunchilikka muvofiq amalga oshiriladi.

TARAFLARNING MANZILLARI, REKVIZITLARI VA IMZOLARI:

ISH BERUVCHI:                                 XODIM:
Tashkilot: ${v.companyName || '[Ish beruvchi tashkilot]'}
Yuridik manzil: ${v.workPlace || '[Yuridik manzil]'}
STIR (INN): 301234567                          F.I.Sh.: ${v.employeeName || '[Xodim F.I.Sh.]'}
MFO: 00444                                     Pasport/ID: ${v.employeePassport || '[Pasport ma‘lumotlari]'}
H/r: 20208000900123456789                      Yashash manzili: ${v.employeeAddress || '[Xodim manzili]'}
Bank: ATIB «Ipoteka Bank»                      Telefon: ${v.employeeAddress?.includes('Tel:') ? v.employeeAddress.split('Tel:')[1].trim() : '+998 90 123-45-67'}

Direktor: ___________ / ${v.companyName?.split(' ').slice(-2).join(' ') || 'Imzo'} /   Xodim: ___________ / ${v.employeeName?.split(' ').slice(-2).join(' ') || 'Imzo'} /
(M.O‘.)`,
  },

  // 1-B. МЕҲНАТ ШАРТНОМАСИ (КОНТРАКТ) — YURXIZMAT.UZ / LEGAL TECH РАСМИЙ АНДОЗАСИ (КИРИЛЛ)
  {
    id: 'mehnat-shartnomasi-legaltech-120',
    title: 'Меҳнат шартномаси (контракт) — Yurxizmat.uz / Legal Tech расмий андозаси',
    shortTitle: 'Меҳнат шартномаси (Legal Tech 120)',
    category: 'labor',
    description: 'Ўзбекистон Республикаси Адлия вазирлиги Legal Tech ва Yurxizmat.uz 120-сонли расмий давлат андозасига асосланган тўлиқ меҳнат контракти.',
    applicableLaw: 'Меҳнат кодекси 104, 105, 106, 107, 108, 110, 129, 216, 253, 452-моддалар; ВМ 971-сон қарори',
    lexUrl: 'https://lex.uz/docs/6257288#6258520',
    classificationCode: 'ЎзДСт 1157:2008 / LEGALTECH-120 / МК-104',
    fields: [
      { key: 'contractNumber', label: 'Шартнома рақами', placeholder: '120-сон', defaultValue: `${new Date().getFullYear()}/МШ-120`, type: 'text', required: true },
      { key: 'contractRegion', label: 'Шартнома тузилган ҳудуд (шаҳар/туман)', placeholder: 'Тошкент шаҳри, Миробод тумани', defaultValue: 'Тошкент шаҳри, Миробод тумани', type: 'text', required: true },
      { key: 'contractDate', label: 'Шартнома тузилган сана', placeholder: '«___» ____________ 2026 йил', defaultValue: '2026 йил 1 март', type: 'text', required: true },
      { key: 'employerFullName', label: 'Иш берувчининг тўлиқ номи ва раҳбарининг Ф.И.О.', placeholder: '«ALFA GLOBAL TECH» МЧЖ номидан директор Каримов А.Б. (Устав асосида)', defaultValue: '«ALFA GLOBAL TECH» МЧЖ номидан директор Каримов Алишер Бахтиёрович (Устав асосида)', type: 'text', required: true },
      { key: 'employeeFullName', label: 'Ходимнинг Ф.И.О.', placeholder: 'Усмонов Жасур Рустамович', defaultValue: 'Усмонов Жасур Рустамович (Ўзбекистон Республикаси фуқароси)', type: 'text', required: true },
      { key: 'employeePassportPinfl', label: 'Ходимнинг паспорти/ID картаси ва ЖШШИР', placeholder: 'Паспорт: АБ 1234567, ЖШШИР: 31204951234567', defaultValue: 'Паспорт: АБ 1234567, Миробод туман ИИБ, ЖШШИР: 31204951234567', type: 'text', required: true },
      { key: 'employeeAddress', label: 'Ходимнинг манзили ва телефони', placeholder: 'Тошкент ш., Чилонзор т., 9-мавзе, 14-уй, Тел: +998 90 123-45-67', defaultValue: 'Тошкент ш., Чилонзор т., 9-мавзе, 14-уй, Тел: +998 90 123-45-67', type: 'text', required: true },
      { key: 'workPlace', label: 'Таклиф қилинаётган иш жой', placeholder: '«ALFA GLOBAL TECH» МЧЖ Ахборот технологиялари департаменти', defaultValue: '«ALFA GLOBAL TECH» МЧЖ Ахборот технологиялари департаменти', type: 'text', required: true },
      { key: 'jobTitleAndRequirements', label: 'Таклиф қилинаётган лавозим номи ва талаблари', placeholder: 'Етакчи дастурий таъминот муҳандиси (Олий маълумотли, 3 йиллик тажриба)', defaultValue: 'Етакчи дастурий таъминот муҳандиси (Олий маълумотли, 3 йиллик тажриба)', type: 'text', required: true },
      { key: 'workTimeType', label: 'Иш вақти тури', placeholder: 'асосий иш жойи', type: 'select', options: ['асосий иш жойи', 'ички ўриндошлик асосида', 'ташқи ўриндошлик асосида', 'масофавий иш (Remote - МК 452)', 'комбинациялашган иш тартиби'], defaultValue: 'асосий иш жойи', required: true },
      { key: 'contractDurationType', label: 'Шартнома муддати', placeholder: 'номуайян муддатга (муддатсиз)', type: 'select', options: ['номуайян муддатга (муддатсиз)', '5 йилдан ортиқ бўлмаган муайян муддатга (МК 111)', 'муайян ишни бажариш вақтига'], defaultValue: 'номуайян муддатга (муддатсиз)', required: true },
      { key: 'startDate', label: 'Шартнома кучга кириш вақти (ишлаш бошланиши)', placeholder: '2026 йил 1 мартдан', defaultValue: '2026 йил 1 мартдан', type: 'text', required: true },
      { key: 'endDate', label: 'Шартнома якунига етиш вақти', placeholder: 'номуайян муддатли', defaultValue: 'номуайян муддатли', type: 'text' },
      { key: 'probationPeriod', label: 'Синов муддати', placeholder: '3 ой', type: 'select', options: ['синовсиз', '1 ой', '2 ой', '3 ой', '6 ойгача (раҳбар/бухгалтер)'], defaultValue: '3 ой', required: true },
      { key: 'employeeObligations', label: 'Ходимнинг мажбуриятлари (қўшимча)', placeholder: 'Иш ва маҳсулот сифати, иш нормасини бажариш, хизмат кўрсатиш ва тижорат сирини сақлаш', defaultValue: 'Иш, маҳсулот сифати, белгиланган иш нормасини бажариш, хизмат кўрсатиш ва тижорат сирини сақлаш', type: 'text' },
      { key: 'workDaySchedule', label: 'Иш куни режими', placeholder: 'Ҳафтасига 40 соат, 5 кунлик иш ҳафтаси (09:00 дан 18:00 гача, тушлик 13:00 дан 14:00 гача)', defaultValue: 'Ҳафтасига 40 соат, 5 кунлик иш ҳафтаси (09:00 дан 18:00 гача, тушлик 13:00 дан 14:00 гача)', type: 'text', required: true },
      { key: 'salaryPaymentTypeAndAmount', label: 'Тўлов тури ва миқдори (аниқ сумма ёки ЯТС разряди)', placeholder: 'Ойлик лавозим маоши: 12 000 000 сўм (ёки ЯТС бўйича 8-разряд)', defaultValue: 'Ойлик лавозим маоши: 12 000 000 сўм (аниқ суммада)', type: 'text', required: true },
      { key: 'extraPayTypeAndAmount', label: 'Қўшимча ҳақ тўлаш тури ва миқдори', placeholder: 'KPI натижаларига асосан ойлик 20% устама ва иш вақтидан ташқари ишга 2 ҳисса қўшимча ҳақ', defaultValue: 'KPI натижалари бўйича 20% устама ва дам олиш/байрам кунлари учун 2 ҳисса ҳақ', type: 'text' },
      { key: 'mainVacationDays', label: 'Асосий таътил муддати', placeholder: '21 календарь кун (МК 216-модда)', defaultValue: '21 календарь кун', type: 'text', required: true },
      { key: 'extraVacationDays', label: 'Қўшимча таътил муддати', placeholder: '3 иш куни', defaultValue: '3 иш куни', type: 'text' },
      { key: 'employerRequisites', label: 'Иш берувчининг манзили ва банк реквизитлари', placeholder: 'Тошкент ш., Миробод т., Нукус кўчаси, 24-уй, СТИР: 301234567, Ҳ/р: 20208000900123456789', defaultValue: 'Тошкент ш., Миробод т., Нукус кўчаси, 24-уй, СТИР: 301234567, МФО: 00444, Ҳ/р: 20208000900123456789', type: 'text', required: true },
    ],
    sampleFilledValues: {
      contractNumber: '2026/МШ-120',
      contractRegion: 'Тошкент шаҳри, Миробод тумани',
      contractDate: '2026 йил 1 март',
      employerFullName: '«ALFA GLOBAL TECH» МЧЖ номидан директор Каримов Алишер Бахтиёрович (Устав асосида)',
      employeeFullName: 'Усмонов Жасур Рустамович (Ўзбекистон Республикаси фуқароси)',
      employeePassportPinfl: 'Паспорт: АБ 1234567, 2022 йил Миробод туман ИИБ томонидан берилган, ЖШШИР: 31204951234567',
      employeeAddress: 'Тошкент ш., Чилонзор т., 9-мавзе, 14-уй, Тел: +998 90 123-45-67',
      workPlace: '«ALFA GLOBAL TECH» МЧЖ Ахборот технологиялари департаменти',
      jobTitleAndRequirements: 'Етакчи дастурий таъминот муҳандиси (Олий маълумотли, соҳа бўйича камида 3 йиллик тажриба)',
      workTimeType: 'асосий иш жойи',
      contractDurationType: 'номуайян муддатга (муддатсиз)',
      startDate: '2026 йил 1 мартдан',
      endDate: 'номуайян муддатли',
      probationPeriod: '3 ой',
      employeeObligations: 'Иш, маҳсулот сифати, иш нормасини бажариш, хизмат кўрсатиш ва тижорат сирини сақлаш',
      workDaySchedule: 'Ҳафтасига 40 соат, 5 кунлик иш ҳафтаси (09:00 дан 18:00 гача, тушлик 13:00 дан 14:00 гача)',
      salaryPaymentTypeAndAmount: 'Ойлик лавозим маоши: 12 000 000 сўм',
      extraPayTypeAndAmount: 'KPI натижалари бўйича 20% устама ва иш вақтидан ташқари ишга 2 ҳисса қўшимча ҳақ тўлаш',
      mainVacationDays: '21 календарь кун',
      extraVacationDays: '3 иш куни',
      employerRequisites: 'Тошкент ш., Миробод т., Нукус кўчаси, 24-уй, СТИР: 301234567, МФО: 00444, Ҳ/р: 20208000900123456789',
    },
    templateGenerator: (v) => `${v.contractNumber || '120'}-сон МЕҲНАТ ШАРТНОМАСИ (КОНТРАКТ)
(Ўз-ўзига ҳуқуқий хизмат кўрсатиш “Legal Tech” тизими ва Yurxizmat.uz 120-андозаси)

${v.contractRegion || 'Тошкент шаҳри'}                                      ${v.contractDate || '«___» ____________ 2026 йил'}

1. Корхона (мулкчиликнинг барча шаклларидаги ташкилот, муассаса, шу жумладан, уларнинг алоҳида таркибий бўлинмалари) ${v.employerFullName || '[Иш берувчининг тўлиқ номи ва раҳбарининг Ф.И.О.]'} номидан, кейинги ўринларда «Иш берувчи» деб аталади ва фуқаро ${v.employeeFullName || '[Ходимнинг Ф.И.О.]'} (Ўзбекистон Республикаси фуқаролиги бўлмаган шахс ҳам бўлиши мумкин), кейинги ўринларда «Ходим» деб аталади, мазкур шартномани қуйидагилар ҳақида туздик:

2. Ходим ${v.employeeFullName || '[Ходимнинг Ф.И.О.]'} ${v.workPlace || '[Таклиф қилинаётган иш жой]'} касби бўйича ${v.jobTitleAndRequirements || '[Таклиф қилинаётган лавозим номи ва талаблари]'} лавозимига ишга қабул қилинади.

3. Шартнома бўйича иш вақти тури: ${v.workTimeType || 'асосий иш жойи'} ҳисобланади.

4. Шартнома муддати: ${v.contractDurationType || 'номуайян муддатга (муддатсиз)'}.

5. Шартнома бўйича ишлаш бошланиши: ${v.startDate || '2026 йил 1 мартдан'}, тамом бўлиши: ${v.endDate || 'номуайян муддатли'}.

6. Синов муддати: ${v.probationPeriod || '3 ой'} (синовсиз ёки белгиланган синов муддати - МК 129, 130-моддалар).

7. Ходимнинг мажбуриятлари:
а) меҳнат ва технология интизоми (ички меҳнат тартиби қоидалари, уставлар ва интизом тўғрисидаги қоидалар)га риоя қилиш;
б) иш берувчининг қонуний фармойишларини бажариш;
в) меҳнатни муҳофаза қилиш, хавфсизлик техникаси ва ишлаб чиқариш санитарияси талабларига риоя қилиш;
г) лавозим йўриқномаларига риоя қилиш;
д) ЯТММ, ММ билан назарда тутилган малака мажбуриятларига риоя қилиш;
е) қонун ҳужжатлари ва бошқа норматив ҳужжатларга риоя қилиш;
ж) жамоа шартномаси шартларига риоя қилиш;
з) ходим томонидан қабул қилинадиган бошқа мажбуриятлар: ${v.employeeObligations || 'иш, маҳсулот сифати, иш нормасини бажариш, хизмат кўрсатиш ва тижорат сирини сақлаш'}.

8. Иш берувчининг мажбуриятлари:
а) ходимнинг меҳнатини ташкил этиш, ходимни Меҳнатни муҳофаза қилиш ва хавфсизлик техникаси қоидалари, лавозим йўриқномалари, жамоа шартномаси ва бошқа норматив ва маҳаллий ҳужжатлар билан таништириш;
б) меҳнат ва ишлаб чиқариш интизомини таъминлаш;
в) иш ҳақини ўз вақтида ва тўлиқ тўлаш;
г) хавфсиз ва самарали меҳнат учун шарт-шароитлар яратиш, ходимни ўқитиш, унга меҳнатнинг хавфсиз шарт-шароити тўғрисида йўл-йўриқ бериш;
д) иш жойини меҳнатни муҳофаза қилиш ва хавфсизлик техникаси қоидаларига мувофиқ жиҳозлаш;
ж) қонун ҳужжатларига ва бошқа норматив ҳужжатларга риоя қилиш;
з) жамоа шартномаси шартларига риоя қилиш;
и) иш берувчи томонидан қабул қилинадиган бошқа мажбуриятлар: шартномани «ЯММТ» (my.mehnat.uz) дастурида рўйхатдан ўтказиш ва электрон меҳнат дафтарчасини юритиш.

9. Иш куни режими:
${v.workDaySchedule || 'Ҳафтасига 40 соат, 5 кунлик иш ҳафтаси (09:00 дан 18:00 гача, тушлик 13:00 дан 14:00 гача)'}.

10. Меҳнат ҳақи тўлаш.
Ходимга қуйидагича ҳақ тўлаш белгиланади:
а) Тўлов тури ва миқдори (тўлов тури ва унинг аниқ суммадаги ёки ЯТС разряди кўрсатилган ҳолдаги, ёҳуд тушумдан олинган фоизлардаги миқдори):
${v.salaryPaymentTypeAndAmount || 'Ойлик лавозим маоши: 12 000 000 сўм'}.
б) Амалдаги қонун ҳужжатларига ва норматив ҳужжатларга мувофиқ меҳнат шароитлари билан боғлиқ бўлган қўшимча ҳақ, устама, компенсациялар қуйидаги миқдорларда:
${v.extraPayTypeAndAmount || 'Қўшимча ҳақ, устама ва компенсациялар (иш вақтидан ташқари ва байрам кунларига 2 ҳисса)'}.
в) Жамоа шартномаси шартлари билан назарда тутилган, шунингдек, берилган (мавжуд) ҳуқуқлар ва маблағлар доирасида раҳбар томонидан белгиланадиган қўшимча ҳақ, устама, мукофот, тақдирлашлар ва рағбатлантирувчи турдаги бошқа тўловлар.

11. Ходимга:
а) асосий таътил (меҳнат таътили): ${v.mainVacationDays || '21 календарь кун (МК 216-модда)'} иш кунидан;
б) қўшимча таътил: ${v.extraVacationDays || '3 иш куни'}дан иборат бўлган ҳақ тўланадиган йиллик таътил белгиланади.

12. Меҳнат шартномаси (контракт)нинг меҳнат шароитлари ва унга ҳақ тўлаш хусусиятлари, ижтимоий ҳимоя, имтиёзлар, кафолатлар ва ҳоказолар билан боғлиқ бўлган бошқа шартлари Ўзбекистон Республикасининг Меҳнат кодекси ва бошқа қонун ҳужжатларига асосан амалга оширилади.

ТОМОНЛАРНИНГ МАНЗИЛЛАРИ ВА ИМЗОЛАРИ:

ИШ БЕРУВЧИ:                                 ХОДИМ:
Иш берувчининг тўлиқ номи:                  Ходимнинг Ф.И.О.:
${v.employerFullName || '[Иш берувчининг тўлиқ номи]'}       ${v.employeeFullName || '[Ходимнинг Ф.И.О.]'}
Манзили ва реквизитлари:                    Паспорт/ID: ${v.employeePassportPinfl || '[Паспорт маълумотлари]'}
${v.employerRequisites || '[Иш берувчининг манзили]'}       Яшаш манзили: ${v.employeeAddress || '[Ходим манзили]'}
Шартнома тузилган сана: ${v.contractDate || '«___» ______ 2026 йил'}       Шартнома тузилган сана: ${v.contractDate || '«___» ______ 2026 йил'}

Раҳбар: ___________ (имзо)                  Ходим: ___________ (имзо)
(муҳр / М.Ў.)`,
  },

  // 2. ISHGA QABUL QILISH TO‘G‘RISIDA BUYRUQ
  {
    id: 'ishga-qabul-buyruq',
    title: 'Xodimni ishga qabul qilish to‘g‘risida rasmiy buyruq',
    shortTitle: 'Ishga qabul buyrug‘i',
    category: 'labor',
    description: 'Mehnat kodeksining 127-moddasiga muvofiq mehnat shartnomasi asosida chiqariladigan namunaviy korxona buyrug‘i.',
    applicableLaw: 'Mehnat kodeksi 127-modda (Ishga qabul qilishni rasmiylashtirish)',
    lexUrl: 'https://lex.uz/docs/6257288#6258680',
    classificationCode: 'O‘zDSt 1157:2008 / MK-127',
    fields: [
      { key: 'companyName', label: 'Tashkilot nomi', placeholder: '«GLOBAL SOFT» MChJ', type: 'text', required: true },
      { key: 'orderNumber', label: 'Buyruq raqami', placeholder: '12-k', defaultValue: '14-k', type: 'text', required: true },
      { key: 'employeeName', label: 'Xodimning to‘liq F.I.Sh.', placeholder: 'Sattorov Sardor Akmalovich', type: 'text', required: true },
      { key: 'department', label: 'Tarkibiy bo‘linma / Bo‘lim', placeholder: 'Axborot texnologiyalari departamenti', type: 'text', required: true },
      { key: 'jobTitle', label: 'Lavozimi', placeholder: 'Katta tizim ma‘muri', type: 'text', required: true },
      { key: 'startDate', label: 'Ish boshlash sanasi', type: 'date', required: true },
      { key: 'salary', label: 'Lavozim maoshi (so‘m)', placeholder: '10 000 000 so‘m', type: 'text', required: true },
      { key: 'probation', label: 'Sinov muddati', placeholder: '3 oy', defaultValue: '3 oy', type: 'text' },
      { key: 'directorName', label: 'Rahbarning F.I.Sh.', placeholder: 'Xolmatov B.A.', type: 'text', required: true },
    ],
    templateGenerator: (v) => `${(v.companyName || '[Tashkilot nomi]').toUpperCase()}

BUYRUQ
№ ${v.orderNumber || '___-k'}

Toshkent shahri                                            «___» ____________ 2026-yil

«Xodimni ishga qabul qilish to‘g‘risida»

O‘zbekiston Respublikasi Mehnat kodeksining 127-moddasiga hamda tuzilgan mehnat shartnomasiga asosan,

BUYURAMAN:

1. ${v.employeeName || '[Xodim F.I.Sh.]'} ${v.startDate || '«___» ________ 2026-yil'}dan boshlab ${v.department || '[Bo‘lim nomi]'}ga ${v.jobTitle || '[Lavozim]'} lavozimiga ishga qabul qilinsin.
2. Xodimga shtatlar jadvaliga muvofiq oylik ${v.salary || '[Maosh]'} miqdorida lavozim maoshi belgilansin.
3. Xodimga ${v.probation || '3 oy'} dastlabki sinov muddati belgilansin.
4. Bosh hisobchi ushbu buyruq asosida ish haqini hisoblab borishni ta‘minlasin.
5. Inson resurslari (HR) bo‘limi mehnat shartnomasini «YMMT» (Yagona milliy mehnat tizimi) idoralararo dasturiy-apparat kompleksida ro‘yxatdan o‘tkazsin.

Asos: ${v.employeeName || '[Xodim]'} bilan tuzilgan mehnat shartnomasi va arizasi.

Direktor: _________________ / ${v.directorName || '[Rahbar F.I.Sh.]'} /
M.O‘.

Buyruq bilan tanishdim: _________________ / ${v.employeeName || '[Xodim]'} /
Sana: «___» ____________ 2026-yil`,
  },

  // 3. ISHDAN BO‘SHASH ARIZASI
  {
    id: 'ishdan-boshash-arizasi',
    title: 'Xodimning o‘z xohishiga ko‘ra mehnat shartnomasini bekor qilish arizasi',
    shortTitle: 'Ishdan bo‘shash arizasi',
    category: 'labor',
    description: 'Mehnat kodeksining 160-moddasiga muvofiq xodimning o‘z tashabbusi bilan ishdan bo‘shash to‘g‘risidagi rasmiy arizasi.',
    applicableLaw: 'Mehnat kodeksi 160-modda (Xodimning tashabbusiga ko‘ra mehnat shartnomasini bekor qilish)',
    lexUrl: 'https://lex.uz/docs/6257288#6258880',
    classificationCode: 'O‘zDSt 1157:2008 / MK-160',
    fields: [
      { key: 'organizationName', label: 'Tashkilot nomi', placeholder: '«ALFA INNOVATIONS» MChJ', type: 'text', required: true },
      { key: 'directorName', label: 'Rahbarning F.I.Sh. va lavozimi', placeholder: 'Bosh direktori Karimov A.B. ga', type: 'text', required: true },
      { key: 'employeePosition', label: 'Xodimning lavozimi', placeholder: 'Moliya bo‘limi yetakchi mutaxassisi', type: 'text', required: true },
      { key: 'employeeName', label: 'Xodimning F.I.Sh.', placeholder: 'Usmonov Jasur Rustamovich dan', type: 'text', required: true },
      { key: 'lastWorkDate', label: 'Oxirgi ish kuni (Sana)', type: 'date', required: true },
      { key: 'additionalNotes', label: 'Qo‘shimcha izoh (ixtiyoriy)', placeholder: 'Ikki haftalik ogohlantirish muddatini qisqartirish...', type: 'textarea' },
    ],
    templateGenerator: (v) => `${v.organizationName || '[Tashkilot nomi]'}
${v.directorName || '[Rahbar F.I.Sh.]'}ga

${v.employeePosition || '[Xodim Lavozimi]'}
${v.employeeName || '[Xodim F.I.Sh.]'}dan


ARIZA

O‘zbekiston Respublikasi Mehnat kodeksining 160-moddasiga asosan, men bilan tuzilgan mehnat shartnomasini o‘z xohishimga ko‘ra ${v.lastWorkDate || '«___» ________ 2026-yil'} kunidan boshlab bekor qilishingizni, men bilan to‘liq hisob-kitob qilib (foydalanilmagan mehnat ta‘tili pullik kompensatsiyasini to‘lab), elektron mehnat daftarchamni topshirishingizni so‘rayman.

${v.additionalNotes ? `Qo‘shimcha izoh: ${v.additionalNotes}\n` : ''}
Sana: «___» ____________ 2026-yil
Imzo: ________________ / ${v.employeeName?.split(' ')[0] || '[Xodim]'} /`,
  },

  // 4. MEHNAT TA‘TILI BERISH BUYRUG‘I
  {
    id: 'mehnat-tatili-buyruq',
    title: 'Xodimga yillik asosiy mehnat ta‘tili berish to‘g‘risida buyruq',
    shortTitle: 'Ta‘til berish buyrug‘i',
    category: 'labor',
    description: 'Mehnat kodeksining 216-220 moddalariga asosan yillik haq to‘lanadigan mehnat ta‘tili berish haqidagi buyruq.',
    applicableLaw: 'Mehnat kodeksi 216, 217, 228-moddalar',
    lexUrl: 'https://lex.uz/docs/6257288#6259280',
    classificationCode: 'O‘zDSt 1157:2008 / MK-216',
    fields: [
      { key: 'companyName', label: 'Tashkilot nomi', placeholder: '«INNO TRADE» MChJ', type: 'text', required: true },
      { key: 'orderNumber', label: 'Buyruq raqami', placeholder: '35-t', type: 'text', required: true },
      { key: 'employeeName', label: 'Xodimning F.I.Sh.', placeholder: 'Rahimov Jamshid Baxtiyorovich', type: 'text', required: true },
      { key: 'jobTitle', label: 'Lavozimi', placeholder: 'Bosh hisobchi', type: 'text', required: true },
      { key: 'workPeriod', label: 'Qaysi ish yili uchun ta‘til', placeholder: '2025/2026 ish yili uchun', type: 'text', required: true },
      { key: 'vacationDays', label: 'Ta‘til davomiyligi (kalendar kun)', placeholder: '21 kalendar kun', defaultValue: '21', type: 'text', required: true },
      { key: 'startDate', label: 'Ta‘til boshlanish sanasi', type: 'date', required: true },
      { key: 'endDate', label: 'Ta‘til tugash sanasi', type: 'date', required: true },
      { key: 'directorName', label: 'Rahbar F.I.Sh.', placeholder: 'Mirzayev S.D.', type: 'text', required: true },
    ],
    templateGenerator: (v) => `${(v.companyName || '[Tashkilot nomi]').toUpperCase()}

BUYRUQ
№ ${v.orderNumber || '___-t'}

Toshkent shahri                                            «___» ____________ 2026-yil

«Yillik asosiy mehnat ta‘tili berish to‘g‘risida»

O‘zbekiston Respublikasi Mehnat kodeksining 216, 217 va 228-moddalariga hamda ta‘tillar jadvaliga asosan,

BUYURAMAN:

1. ${v.employeeName || '[Xodim F.I.Sh.]'}ga — ${v.jobTitle || '[Lavozimi]'} lavozimida ishlagan ${v.workPeriod || 'joriy ish yili'} uchun davomiyligi ${v.vacationDays || '21'} kalendar kun bo‘lgan yillik asosiy haq to‘lanadigan mehnat ta‘tili ${v.startDate || '[Sana]'}dan ${v.endDate || '[Sana]'}ga qadar berilsin.
2. Xodim ${v.endDate ? 'ta‘til tugaganidan so‘ng keyingi ish kunida' : '[Sana]'} ishga tushishi belgilansin.
3. Bosh hisobchiga Mehnat kodeksining 233-moddasiga muvofiq ta‘til haqi (o‘rtacha oylik ish haqi) to‘lovlarini ta‘til boshlanishidan kamida 3 kun oldin to‘lab berish yuklatilsin.

Asos: ${v.employeeName || '[Xodim]'}ning arizasi va tasdiqlangan ta‘tillar jadvali.

Direktor: _________________ / ${v.directorName || '[Rahbar F.I.Sh.]'} /
M.O‘.`,
  },

  // 5. TURAR JOY IJARA SHARTNOMASI
  {
    id: 'turar-joy-ijara-shartnomasi',
    title: 'Turar joyni ijaraga berish namunaviy shartnomasi',
    shortTitle: 'Turar joy ijara shartnomasi',
    category: 'civil',
    description: 'Fuqarolik kodeksining 535-557 va 600-moddalariga muvofiq, Davlat soliq qo‘mitasi (ijara.soliq.uz) ro‘yxatidan o‘tkazishga mos andoza.',
    applicableLaw: 'Fuqarolik kodeksi 535, 600, 608-moddalar; Soliq kodeksi 369-modda',
    lexUrl: 'https://lex.uz/docs/111189#160800',
    classificationCode: 'O‘zDSt 1157:2008 / FK-600',
    fields: [
      { key: 'landlordInfo', label: 'Ijaraga beruvchi (F.I.Sh, Pasport, JSHSHIR, Manzil)', placeholder: 'Aliyev Vali G‘aniyevich, Pasport: AA 1234567, JSHSHIR: 3120485...', type: 'textarea', required: true },
      { key: 'tenantInfo', label: 'Ijarachi (F.I.Sh, Pasport, JSHSHIR, Manzil)', placeholder: 'Saidov Temur Botirovich, Pasport: AB 7654321, JSHSHIR: 3200196...', type: 'textarea', required: true },
      { key: 'propertyAddress', label: 'Turar joy manzili va kadastr raqami', placeholder: 'Toshkent sh., Yunusobod t., 4-mavze, 12-uy, 34-xonadon. Kadastr №: 10:04:02:...', type: 'text', required: true },
      { key: 'monthlyRent', label: 'Oylik ijara to‘lovi miqdori (so‘m)', placeholder: '5 000 000 so‘m', type: 'text', required: true },
      { key: 'depositAmount', label: 'Kafolat depoziti summasi (Garov)', placeholder: '5 000 000 so‘m (yoki mavjud emas)', defaultValue: '5 000 000 so‘m', type: 'text' },
      { key: 'leaseTerm', label: 'Ijara muddati', placeholder: '11 oy (2026-yil 1-martdan 2027-yil 31-yanvargacha)', type: 'text', required: true },
      { key: 'paymentDay', label: 'Har oyning to‘lov muddati', placeholder: 'Har oyning 5-sanasiga qadar', type: 'text', required: true },
    ],
    sampleFilledValues: {
      landlordInfo: 'Aliyev Vali G‘aniyevich, Pasport: AA 1234567, 2022-yil Yunusobod tuman IIB tomonidan berilgan, JSHSHIR (PINFL): 31204851234567, Yashash manzili: Toshkent sh., Yunusobod t., 4-mavze, 12-uy, Tel: +998 90 123-45-67',
      tenantInfo: 'Saidov Temur Botirovich, Pasport: AB 7654321, 2023-yil Samarqand shahar IIB tomonidan berilgan, JSHSHIR (PINFL): 32001967654321, Yashash manzili: Toshkent sh., Chilonzor t., 9-mavze, 14-uy, Tel: +998 93 987-65-43',
      propertyAddress: 'Toshkent shahri, Yunusobod tumani, 4-mavze, 12-uy, 34-xonadon (3 xonali, 78 kv.m, Kadastr raqami: 10:04:02:01:03:0034)',
      monthlyRent: '5 000 000 so‘m',
      depositAmount: '5 000 000 so‘m (bir oylik kafolat garovi)',
      leaseTerm: '11 oy (2026-yil 1-martdan 2027-yil 31-yanvargacha)',
      paymentDay: 'Har oyning 5-sanasiga qadar',
    },
    templateGenerator: (v) => `TURAR JOYNI IJARAGA BERISH SHARTNOMASI
№ IJ-${Math.floor(1000 + Math.random() * 9000)}

Toshkent shahri                                            «___» ____________ 2026-yil

Fuqaro ${v.landlordInfo?.split(',')[0] || '[Ijaraga beruvchi]'} (${v.landlordInfo || '[Pasport/JSHSHIR]'}) (keyingi o‘rinlarda «Ijaraga beruvchi») bir tomondan, va
fuqaro ${v.tenantInfo?.split(',')[0] || '[Ijarachi]'} (${v.tenantInfo || '[Pasport/JSHSHIR]'}) (keyingi o‘rinlarda «Ijarachi») ikkinchi tomondan, O‘zbekiston Respublikasi Fuqarolik kodeksining 600-614 moddalariga asosan quyidagilar haqida mazkur shartnomani tuzdilar:

1. SHARTNOMA PREDMETI
1.1. Ijaraga beruvchi o‘ziga xususiy mulk huquqi asosida tegishli bo‘lgan ${v.propertyAddress || '[Xonadon manzili va kadastr raqami]'}da joylashgan turar joyni Ijarachiga vaqtincha yashash uchun haq evaziga ijaraga topshiradi.
1.2. Ijara muddati: ${v.leaseTerm || '11 oy'} etib belgilanadi.

2. TO‘LOV VA HISOBLASHISH TARTIBI
2.1. Mazkur turar joy uchun oylik ijara haqi ${v.monthlyRent || '[Summa]'} miqdorida belgilanadi.
2.2. To‘lov Ijarachi tomonidan ${v.paymentDay || 'har oyning 5-sanasiga qadar'} bank plastik kartasiga yoki naqd shaklda to‘lanadi.
2.3. Kafolat depoziti (garov): ${v.depositAmount || '1 oylik to‘lov miqdorida'}. Depozit shartnoma muddati tugagach, mulkka zarar yetkazilmagan bo‘lsa Ijarachiga to‘liq qaytariladi.
2.4. Kommunal xizmatlar (elektr energiyasi, gaz, sovuq va issiq suv, internet) to‘lovlari hisoblagich ko‘rsatkichlari bo‘yicha Ijarachi tomonidan qoplanadi.

3. TARAFLARNING MAJBURIYATLARI
3.1. Ijaraga beruvchi ushbu shartnomani Soliq organlarida (ijara.soliq.uz) hisobga qo‘yishga majbur.
3.2. Ijarachi turar joyni toza va soz holatda saqlashga, yong‘in va sanitariya xavfsizligi qoidalariga rioya qilishga majbur.
3.3. Turar joyni uchinchi shaxslarga ikkilamchi ijaraga (subarenda) berish qat‘iyan man etiladi.

4. SHARTNOMANI BEKOR QILISH VA NIZOLARNI HAL ETISH
4.1. Taraflar bir-birlarini shartnomani bekor qilish haqida kamida 1 oy oldin yozma ogohlantirishlari shart.
4.2. Barcha nizolar taraflarning muzokaralari yo‘li bilan, kelishuvga erishilmaganda esa sud tartibida hal etiladi.

TARAFLARNING REKVIZITLARI VA IMZOLARI:

IJARAGA BERUVCHI:                             IJARACHI:
${v.landlordInfo || '[Ijaraga beruvchi]'}     ${v.tenantInfo || '[Ijarachi]'}
Telefon: ___________________                  Telefon: ___________________
Karta/Hisob: _______________                  Karta/Hisob: _______________

Imzo: ______________________                  Imzo: ______________________`,
  },

  // 6. NOTURAR JOY (OFIS/OMBOR) IJARA SHARTNOMASI
  {
    id: 'noturar-joy-ijara-shartnomasi',
    title: 'Noturar joy (ofis, bino, omborxona) ijara shartnomasi',
    shortTitle: 'Ofis/Bino ijara shartnomasi',
    category: 'business',
    description: 'Yuridik shaxslar va YaTTlar o‘rtasida noturar joy, ofis yoki tijorat maydonlarini ijaraga berish bo‘yicha shartnoma.',
    applicableLaw: 'Fuqarolik kodeksi 535, 539, 542, 573-moddalar',
    lexUrl: 'https://lex.uz/docs/111189#160200',
    classificationCode: 'O‘zDSt 1157:2008 / FK-573',
    fields: [
      { key: 'lessorCompany', label: 'Ijaraga beruvchi kompaniya nomi va rahbari', placeholder: '«PREMIUM PLAZA» MChJ nomidan direktor S.A. Olimov', type: 'text', required: true },
      { key: 'lesseeCompany', label: 'Ijarachi kompaniya nomi va rahbari', placeholder: '«SMART LOGISTICS» MChJ nomidan direktor B.R. Qodirov', type: 'text', required: true },
      { key: 'premisesAddress', label: 'Bino manzili va maydoni (kv.m)', placeholder: 'Toshkent sh., Yakkasaroy t., Sh.Rustaveli ko‘chasi, 45-uy, 3-qavat, 150 kv.m', type: 'text', required: true },
      { key: 'monthlyRent', label: 'Oylik ijara haqi (QQS bilan/siz)', placeholder: '18 000 000 so‘m (QQSsiz)', type: 'text', required: true },
      { key: 'purpose', label: 'Foydalanish maqsadi', placeholder: 'Ofis va ma‘muriy faoliyat uchun', defaultValue: 'Ofis faoliyati uchun', type: 'text', required: true },
      { key: 'term', label: 'Ijara muddati', placeholder: '11 oy (yoki 1 yil)', defaultValue: '11 oy', type: 'text', required: true },
    ],
    sampleFilledValues: {
      lessorCompany: '«PREMIUM PLAZA» MChJ nomidan Ustav asosida direktor Olimov Sirojiddin Anvarovich',
      lesseeCompany: '«SMART LOGISTICS» MChJ nomidan Ustav asosida direktor Qodirov Botir Rustamovich',
      premisesAddress: 'Toshkent shahri, Yakkasaroy tumani, Shota Rustaveli ko‘chasi, 45-uy, 3-qavat, 305-ofis (150 kv.m)',
      monthlyRent: '18 000 000 so‘m (QQSsiz)',
      purpose: 'Zamonaviy ofis va IT dasturiy ta‘minot faoliyati uchun',
      term: '11 oy (2026-yil 1-martdan 2027-yil 31-yanvargacha)',
    },
    templateGenerator: (v) => `NOTURAR JOYNI IJARAGA BERISH SHARTNOMASI
№ OF-${new Date().getFullYear()}/${Math.floor(100 + Math.random() * 900)}

Toshkent shahri                                            «___» ____________ 2026-yil

Ustav asosida faoliyat yurituvchi ${v.lessorCompany || '[Ijaraga beruvchi tashkilot]'} (keyingi o‘rinlarda «Ijaraga beruvchi») bir tomondan, va
Ustav asosida faoliyat yurituvchi ${v.lesseeCompany || '[Ijarachi tashkilot]'} (keyingi o‘rinlarda «Ijarachi») ikkinchi tomondan, quyidagilar haqida mazkur shartnomani tuzdilar:

1. SHARTNOMA PREDMETI
1.1. Ijaraga beruvchi ${v.premisesAddress || '[Bino manzili va maydoni]'}da joylashgan noturar bino-joyni Ijarachiga ${v.purpose || 'ofis faoliyati'} uchun vaqtincha egalik qilish va foydalanishga topshiradi.
1.2. Bino topshirish-qabul qilish dalolatnomasi asosida taraflar o‘rtasida topshiriladi.
1.3. Ijara muddati: ${v.term || '11 oy'}.

2. TO‘LOVLAR VA HISOBLASHISH TARTIBI
2.1. Oylik ijara to‘lovi ${v.monthlyRent || '[Ijara to‘lovi summasi]'}ni tashkil etadi.
2.2. To‘lov Ijarachi tomonidan har oyning 10-sanasiga qadar Ijaraga beruvchining hisob-kitob raqamiga to‘lov topshirig‘i orqali o‘tkaziladi.
2.3. Kommunal va ekspluatatsiya xarajatlari alohida taqdim etiladigan schyot-fakturalar asosida qoplanadi.

3. TARAFLARNING MAJBURIYATLARI
3.1. Ijaraga beruvchi binoni barcha muhandislik tarmoqlari (elektr, suv, isitish, sovutish) soz holatda topshirishga majbur.
3.2. Ijarachi binodan qat‘iy belgilangan maqsadda foydalanishga, yong‘in xavfsizligi qoidalariga rioya qilishga majbur.

4. NIZOLARNI HAL ETISH
4.1. Shartnomani bajarish yuzasidan kelib chiqadigan barcha nizolar bo‘yicha talabnoma (pretenziya) yuborish majburiydir (muddati 10 kun).
4.2. Kelishuvga erishilmagan taqdirda nizo Toshkent tumanlararo iqtisodiy sudida ko‘rib chiqiladi.

5. TARAFLARNING YURIDIK MANZILLARI VA REKVIZITLARI:

IJARAGA BERUVCHI:                             IJARACHI:
${v.lessorCompany || '[Kompaniya nomi]'}      ${v.lesseeCompany || '[Kompaniya nomi]'}
STIR: ______________________                  STIR: ______________________
MFO: _______________________                  MFO: _______________________
H/r: _______________________                  H/r: _______________________
Manzil: ____________________                  Manzil: ____________________

Direktor: ___________ / Imzo /                Direktor: ___________ / Imzo /
M.O‘.                                         M.O‘.`,
  },

  // 7. MAHSULOT YETKAZIB BERISH (OLDI-SOTDI) SHARTNOMASI
  {
    id: 'oldi-sotdi-yetkazib-berish-shartnomasi',
    title: 'Mahsulot / tovar yetkazib berish (oldi-sotdi) shartnomasi',
    shortTitle: 'Oldi-sotdi shartnomasi',
    category: 'business',
    description: 'Fuqarolik kodeksining 437-456 moddalariga asosan xo‘jalik yurituvchi subyektlar o‘rtasida tovar yetkazib berish shartnomasi.',
    applicableLaw: 'Fuqarolik kodeksi 386-424, 437-456 moddalar; Shartnomaviy-huquqiy baza to‘g‘risidagi Qonun',
    lexUrl: 'https://lex.uz/docs/111189#158000',
    classificationCode: 'O‘zDSt 1157:2008 / FK-437',
    fields: [
      { key: 'sellerCompany', label: 'Yetkazib beruvchi (Sotuvchi) nomi', placeholder: '«TOSHKENT QURILISH MOLLARI» MChJ', type: 'text', required: true },
      { key: 'buyerCompany', label: 'Sotib oluvchi (Buyurtmachi) nomi', placeholder: '«BUILDING GROUP» MChJ', type: 'text', required: true },
      { key: 'productDescription', label: 'Mahsulot nomi, assortimenti va hajmi', placeholder: 'M-500 markali sement, 100 tonna (spetsifikatsiyaga muvofiq)', type: 'textarea', required: true },
      { key: 'totalContractPrice', label: 'Shartnomaning umumiy summasi (so‘m)', placeholder: '150 000 000 so‘m (QQS bilan)', type: 'text', required: true },
      { key: 'prepaymentPercent', label: 'Oldindan to‘lov foizi (Avans)', placeholder: '30%', defaultValue: '30%', type: 'text', required: true },
      { key: 'deliveryPeriod', label: 'Yetkazib berish muddati', placeholder: 'Oldindan to‘lov tushgan kundan boshlab 10 bank kuni ichida', type: 'text', required: true },
      { key: 'deliveryPlace', label: 'Yetkazib berish manzili', placeholder: 'Toshkent viloyati, Zangiota t., Obod ko‘chasi, 12-omborxona', type: 'text', required: true },
    ],
    templateGenerator: (v) => `MAHSULOT (TOVAR) YETKAZIB BERISH SHARTNOMASI
№ SB-${new Date().getFullYear()}/${Math.floor(100 + Math.random() * 900)}

Toshkent shahri                                            «___» ____________ 2026-yil

Ustav asosida faoliyat yurituvchi ${v.sellerCompany || '[Yetkazib beruvchi]'} (keyingi o‘rinlarda «Yetkazib beruvchi») bir tomondan, va
Ustav asosida faoliyat yurituvchi ${v.buyerCompany || '[Sotib oluvchi]'} (keyingi o‘rinlarda «Sotib oluvchi») ikkinchi tomondan, O‘zbekiston Respublikasi Fuqarolik kodeksining 437-456 moddalariga asosan quyidagilar haqida mazkur shartnomani tuzdilar:

1. SHARTNOMA PREDMETI
1.1. Yetkazib beruvchi mazkur shartnoma va uning ajralmas qismi bo‘lgan 1-sonli Spetsifikatsiyada ko‘rsatilgan ${v.productDescription || '[Mahsulot nomi va hajmi]'}ni Sotib oluvchiga mulk qilib yetkazib berish, Sotib oluvchi esa mahsulotni qabul qilib, haqini to‘lash majburiyatini oladi.
1.2. Mahsulot sifati O‘zbekiston Respublikasi davlat standartlari (O‘zDSt) va texnik shartlarga to‘liq mos bo‘lishi shart.

2. SHARTNOMA SUMMASI VA HISOBLASHISH TARTIBI
2.1. Mazkur shartnomaning umumiy summasi ${v.totalContractPrice || '[Shartnoma summasi]'}ni tashkil etadi.
2.2. Sotib oluvchi shartnoma imzolangan kundan boshlab 3 bank kuni ichida ${v.prepaymentPercent || '30%'} miqdorida oldindan to‘lov (avans) to‘laydi.
2.3. Qolgan summa mahsulot to‘liq yetkazib berilib, elektron hisobvaraq-faktura (EHF) imzolangan kundan boshlab 5 bank kuni ichida to‘lanadi.

3. YETKAZIB BERISH VA QABUL QILISH SHARTLARI
3.1. Yetkazib berish muddati: ${v.deliveryPeriod || 'avans tushgan kundan boshlab 10 bank kuni ichida'}.
3.2. Yetkazib berish joyi: ${v.deliveryPlace || '[Omborxona manzili]'}.
3.3. Mahsulot miqdori va sifati bo‘yicha topshirish-qabul qilish vakolatli shaxslar tomonidan rasmiylashtiriladi.

4. TARAFLARNING JAVOBGARLIGI
4.1. Yetkazib berish muddatlari kechiktirilganda Yetkazib beruvchi kechiktirilgan har bir kun uchun 0.5% miqdorida, ammo kechiktirilgan tovar summasining 50%idan ko‘p bo‘lmagan miqdorda peniya to‘laydi.
4.2. To‘lovlar kechiktirilganda Sotib oluvchi har bir kechiktirilgan kun uchun 0.4% miqdorida peniya to‘laydi.

5. NIZOLARNI HAL ETISH
5.1. Barcha kelishmovchiliklar o‘zaro muzokaralar va yozma talabnoma (pretenziya) yuborish tartibida hal qilinadi.
5.2. Kelishuvga erishilmasa, nizo Iqtisodiy sudda hal etiladi.

6. TARAFLARNING REKVIZITLARI VA IMZOLARI:

YETKAZIB BERUVCHI:                            SOTIB OLUVCHI:
${v.sellerCompany || '[Kompaniya nomi]'}      ${v.buyerCompany || '[Kompaniya nomi]'}
STIR: ______________________                  STIR: ______________________
MFO: _______________________                  MFO: _______________________
H/r: _______________________                  H/r: _______________________
Manzil: ____________________                  Manzil: ____________________

Direktor: ___________ / Imzo /                Direktor: ___________ / Imzo /
M.O‘.                                         M.O‘.`,
  },

  // 8. PULLI XIZMATLAR KO‘RSATISH SHARTNOMASI
  {
    id: 'xizmat-korsatish-shartnomasi',
    title: 'Pulli xizmatlar ko‘rsatish namunaviy shartnomasi',
    shortTitle: 'Xizmat ko‘rsatish shartnomasi',
    category: 'business',
    description: 'Fuqarolik kodeksining 703-708 moddalariga asosan konsalting, IT, marketing, yuridik yoki buxgalteriya xizmatlari ko‘rsatish shartnomasi.',
    applicableLaw: 'Fuqarolik kodeksi 703, 704, 705-moddalar',
    lexUrl: 'https://lex.uz/docs/111189#162000',
    classificationCode: 'O‘zDSt 1157:2008 / FK-703',
    fields: [
      { key: 'serviceProvider', label: 'Ijrochi (Xizmat ko‘rsatuvchi) nomi', placeholder: '«INNOVATION DIGITAL» MChJ nomidan direktor S.A.', type: 'text', required: true },
      { key: 'customer', label: 'Buyurtmachi nomi', placeholder: '«MEGA RETAIL» MChJ nomidan direktor B.K.', type: 'text', required: true },
      { key: 'serviceScope', label: 'Xizmatlarning aniq tavsifi (Predmeti)', placeholder: 'ERP tizimini joriy qilish, dasturiy ta‘minot ishlab chiqish va texnik qo‘llab-quvvatlash xizmati', type: 'textarea', required: true },
      { key: 'serviceCost', label: 'Xizmatlar narxi (so‘m)', placeholder: '25 000 000 so‘m', type: 'text', required: true },
      { key: 'term', label: 'Xizmat ko‘rsatish muddati', placeholder: '2026-yil 1-mayga qadar', type: 'text', required: true },
    ],
    templateGenerator: (v) => `PULLI XIZMATLAR KO‘RSATISH SHARTNOMASI
№ XZ-${new Date().getFullYear()}/${Math.floor(100 + Math.random() * 900)}

Toshkent shahri                                            «___» ____________ 2026-yil

Ustav asosida faoliyat yurituvchi ${v.serviceProvider || '[Ijrochi]'} (keyingi o‘rinlarda «Ijrochi») bir tomondan, va
Ustav asosida faoliyat yurituvchi ${v.customer || '[Buyurtmachi]'} (keyingi o‘rinlarda «Buyurtmachi») ikkinchi tomondan, O‘zbekiston Respublikasi Fuqarolik kodeksining 703-708 moddalariga muvofiq quyidagilar haqida mazkur shartnomani tuzdilar:

1. SHARTNOMA PREDMETI
1.1. Ijrochi Buyurtmachining topshirig‘iga binoan ${v.serviceScope || '[Xizmat tavsifi]'} xizmatlarini ko‘rsatish, Buyurtmachi esa ushbu xizmatlarni qabul qilib, haqini to‘lash majburiyatini oladi.
1.2. Xizmatlar bajarilishi bo‘yicha taraflar ikki tomonlama Bajarilgan ishlar dalolatnomasi (Akt) va Elektron hisobvaraq-faktura (EHF) rasmiylashtiradilar.

2. SHARTNOMA BAHOSI VA HISOBLASHISH TARTIBI
2.1. Mazkur shartnoma bo‘yicha ko‘rsatiladigan xizmatlarning umumiy qiymati ${v.serviceCost || '[Summa]'} so‘mni tashkil etadi.
2.2. To‘lovlar Buyurtmachi tomonidan xizmatlar dalolatnomasi imzolangan kundan boshlab 5 (besh) bank kuni ichida bank o‘tkazmasi orqali to‘lanadi.

3. XIZMATLARNI TOPSHIRISH-QABUL QILISH TARTIBI
3.1. Xizmat ko‘rsatish muddati: ${v.term || '[Muddat]'}.
3.2. Ijrochi xizmatlarni to‘liq yakunlagach, Buyurtmachiga dalolatnoma yuboradi. Buyurtmachi 3 ish kuni ichida dalolatnomani imzolashi yoki asoslantirilgan e‘tirozini taqdim etishi shart.

4. TARAFLARNING JAVOBGARLIGI VA NIZOLARNI HAL ETISH
4.1. Majburiyatlarni bajarmaganlik yoki lozim darajada bajarmaganlik uchun taraflar O‘zbekiston Respublikasi qonunchiligiga muvofiq javobgar bo‘ladilar.
4.2. Shartnomani bajarish yuzasidan kelib chiqadigan barcha nizolar Iqtisodiy sudda hal etiladi.

5. TARAFLARNING REKVIZITLARI:

IJROCHI:                                      BUYURTMACHI:
${v.serviceProvider || '[Ijrochi nomi]'}      ${v.customer || '[Buyurtmachi nomi]'}
STIR: ______________________                  STIR: ______________________
MFO: _______________________                  MFO: _______________________
H/r: _______________________                  H/r: _______________________

Direktor: ___________ / Imzo /                Direktor: ___________ / Imzo /
M.O‘.                                         M.O‘.`,
  },

  // 9. FUQAROLIK-HUQUQIY TUSDAGI PUDRAT SHARTNOMASI (FHT / GPH)
  {
    id: 'fht-pudrat-shartnomasi',
    title: 'Jismoniy shaxs bilan fuqarolik-huquqiy tusdagi (FHT) pudrat shartnomasi',
    shortTitle: 'FHT (GPH) shartnomasi',
    category: 'civil',
    description: 'Yuridik shaxs va jismoniy shaxs o‘rtasida aniq bir ish hajmini bajarish bo‘yicha tuziladigan fuqarolik-huquqiy pudrat shartnomasi.',
    applicableLaw: 'Fuqarolik kodeksi 631-655 moddalar; Soliq kodeksi 387-modda',
    lexUrl: 'https://lex.uz/docs/111189#161200',
    classificationCode: 'O‘zDSt 1157:2008 / FK-631',
    fields: [
      { key: 'companyName', label: 'Buyurtmachi tashkilot nomi', placeholder: '«SMART SOLUTIONS» MChJ nomidan direktor A.K.', type: 'text', required: true },
      { key: 'contractorInfo', label: 'Pudratchi (Jismoniy shaxs F.I.Sh, Pasport, JSHSHIR)', placeholder: 'Zokirov Sardor Bahodirovich, Pasport: AA 9876543, JSHSHIR: 3250192...', type: 'textarea', required: true },
      { key: 'workScope', label: 'Bajariladigan ishning aniq natijasi va hajmi', placeholder: 'Veb-sayt dizaynini ishlab chiqish va mobil ilova interfeysini loyihalash', type: 'textarea', required: true },
      { key: 'workPrice', label: 'Ish haqi miqdori (JShOD ushlanadi)', placeholder: '8 000 000 so‘m', type: 'text', required: true },
      { key: 'deadline', label: 'Ishni topshirishning oxirgi muddati', placeholder: '2026-yil 30-aprelga qadar', type: 'text', required: true },
    ],
    templateGenerator: (v) => `FUQAROLIK-HUQUQIY TUSDAGI PUDRAT SHARTNOMASI
№ FHT-${Math.floor(100 + Math.random() * 900)}

Toshkent shahri                                            «___» ____________ 2026-yil

${v.companyName || '[Buyurtmachi tashkilot]'} (keyingi o‘rinlarda «Buyurtmachi») bir tomondan, va
fuqaro ${v.contractorInfo?.split(',')[0] || '[Pudratchi F.I.Sh.]'} (${v.contractorInfo || '[Pasport/JSHSHIR]'}) (keyingi o‘rinlarda «Pudratchi») ikkinchi tomondan, O‘zbekiston Respublikasi Fuqarolik kodeksining 631-moddasiga asosan mazkur pudrat shartnomasini tuzdilar:

1. SHARTNOMA PREDMETI
1.1. Pudratchi Buyurtmachining topshirig‘iga binoan ${v.workScope || '[Ish tavsifi]'} ishlarini o‘z tavakkalchiligi asosida bajarish, Buyurtmachi esa tayyor natijani qabul qilib, haq to‘lash majburiyatini oladi.
1.2. Pudratchi o‘z ishini mustaqil tashkil etadi, unga nisbatan ichki mehnat tartibi qoidalari qo‘llanilmaydi.

2. ISHNING BAHOSI VA HISOBLASHISH TARTIBI
2.1. Mazkur shartnoma bo‘yicha bajarilgan ishning umumiy qiymati ${v.workPrice || '[Summa]'} so‘mni tashkil etadi.
2.2. To‘lov ishlar to‘liq yakunlanib, topshirish-qabul qilish dalolatnomasi imzolangan kundan boshlab 5 bank kuni ichida Pudratchining bank plastik kartasiga o‘tkaziladi.
2.3. Buyurtmachi Soliq agenti sifatida qonunchilikda belgilangan tartibda jismoniy shaxslardan olinadigan daromad solig‘i (JShOD - 12%) va ijtimoiy to‘lovlarni ushlab qolib, byudjetga o‘tkazadi.

3. ISHNI TOPSHIRISH MUDDATI
3.1. Ishlarni bajarish muddati: ${v.deadline || 'shartnoma imzolangan kundan 30 kalendar kun'}.

4. TARAFLARNING REKVIZITLARI:

BUYURTMACHI:                                  PUDRATCHI:
${v.companyName || '[Kompaniya nomi]'}        ${v.contractorInfo || '[Pudratchi F.I.Sh.]'}
STIR: ______________________                  JSHSHIR: ___________________
H/r: _______________________                  Karta raqami: ______________
Manzil: ____________________                  Telefon: ___________________

Direktor: ___________ / Imzo /                Pudratchi: _________ / Imzo /
M.O‘.`,
  },

  // 10. QARZ SHARTNOMASI VA RASMIY TILXAT
  {
    id: 'qarz-shartnomasi-va-tilxat',
    title: 'Fuqarolar o‘rtasidagi qarz shartnomasi va qarz tilxati',
    shortTitle: 'Qarz shartnomasi va tilxat',
    category: 'civil',
    description: 'Fuqarolik kodeksining 732-743 moddalariga muvofiq, sudlarda yuridik kuchga ega rasmiy qarz shartnomasi va tilxat andozasi.',
    applicableLaw: 'Fuqarolik kodeksi 732, 733, 735, 736-moddalar',
    lexUrl: 'https://lex.uz/docs/111189#162500',
    classificationCode: 'O‘zDSt 1157:2008 / FK-732',
    fields: [
      { key: 'lenderInfo', label: 'Qarz beruvchi (F.I.Sh, Pasport, JSHSHIR, Manzil)', placeholder: 'Karimov Rustam Alisherovich, Pasport: AA 1122334, JSHSHIR: 3150580...', type: 'textarea', required: true },
      { key: 'borrowerInfo', label: 'Qarz oluvchi (F.I.Sh, Pasport, JSHSHIR, Manzil)', placeholder: 'Saidov Sardor Botirovich, Pasport: AB 9988776, JSHSHIR: 3200192...', type: 'textarea', required: true },
      { key: 'loanAmountDigits', label: 'Qarz summasi (raqamda)', placeholder: '50 000 000', type: 'text', required: true },
      { key: 'loanAmountWords', label: 'Qarz summasi (so‘z bilan)', placeholder: 'Ellik million so‘m', type: 'text', required: true },
      { key: 'repaymentDate', label: 'Qarzni to‘liq qaytarish sanasi', type: 'date', required: true },
      { key: 'penaltyPerDay', label: 'Kechiktirilgan har bir kun uchun peniya', placeholder: '0.1% miqdorida', defaultValue: '0.1%', type: 'text' },
    ],
    templateGenerator: (v) => `QARZ SHARTNOMASI VA QARZ TILXATI

Toshkent shahri                                            «___» ____________ 2026-yil

Biz, fuqaro ${v.lenderInfo?.split(',')[0] || '[Qarz beruvchi F.I.Sh.]'} (${v.lenderInfo || '[Pasport/JSHSHIR]'}) (keyingi o‘rinlarda «Qarz beruvchi») bir tomondan, va
fuqaro ${v.borrowerInfo?.split(',')[0] || '[Qarz oluvchi F.I.Sh.]'} (${v.borrowerInfo || '[Pasport/JSHSHIR]'}) (keyingi o‘rinlarda «Qarz oluvchi») ikkinchi tomondan, O‘zbekiston Respublikasi Fuqarolik kodeksining 732-743 moddalariga muvofiq ushbu qarz shartnomasini tuzdik:

1. SHARTNOMA PREDMETI
1.1. Qarz beruvchi mazkur shartnoma imzolangan paytda Qarz oluvchiga naqd (yoki bank o‘tkazmasi) shaklda ${v.loanAmountDigits || '[Summa]'} (${v.loanAmountWords || '[So‘z bilan]'}) so‘m qarz mablag‘ini berdi, Qarz oluvchi esa ushbu mablag‘ni to‘liq qabul qilib oldi.
1.2. Mazkur shartnoma qarz summasi to‘liq topshirilganligini tasdiqlovchi QARZ TILXATI kuchiga ega (FK 733-modda 2-qism).

2. QARZNI QAYTARISH MUDDATI VA SHARTLARI
2.1. Qarz oluvchi olingan ${v.loanAmountDigits || '[Summa]'} so‘m qarz summasini ${v.repaymentDate || '«___» ________ 2026-yil'} sanasidan kechiktirmasdan Qarz beruvchiga to‘liq qaytarish majburiyatini oladi.
2.2. Qarz summasi belgilangan muddatdan kechiktirilgan taqdirda, Qarz oluvchi kechiktirilgan har bir kun uchun ${v.penaltyPerDay || '0.1%'} miqdorida peniya to‘laydi (FK 327, 736-moddalar).

3. YAKUNIY QOIDALAR
3.1. Mazkur shartnoma taraflarning har biri uchun bir xil yuridik kuchga ega bo‘lgan 2 nusxada tuzildi.
3.2. Qarz qaytarilmagan taqdirda, nizo sud orqali qonuniy tartibda undiriladi.

TARAFLARNING IMZOLARI:

QARZ BERUVCHI:                                QARZ OLUVCHI (TILXAT YOZUVCHI):
${v.lenderInfo || '[Qarz beruvchi]'}          ${v.borrowerInfo || '[Qarz oluvchi]'}
«Pulni topshirdim»                            «Ko‘rsatilgan summani to‘liq qabul qildim»

Imzo: ______________________                  Imzo: ______________________
Sana: «___» ____________ 2026-yil             Sana: «___» ____________ 2026-yil`,
  },

  // 11. SUDGA DA‘VO ARIZASI (QARZNI UNDIRISH)
  {
    id: 'davo-qarz-undirish',
    title: 'Qarz shartnomasi bo‘yicha qarz summasini undirish haqida sudga da‘vo arizasi',
    shortTitle: 'Qarz undirish sud da‘vosi',
    category: 'court',
    description: 'Fuqarolik ishlari bo‘yicha tumanlararo sudiga qarz, peniya va sud xarajatlarini undirish haqidagi rasmiy da‘vo arizasi.',
    applicableLaw: 'Fuqarolik kodeksi 732, 735, 327-moddalar; FPK 189, 190, 191-moddalar',
    lexUrl: 'https://lex.uz/docs/111189#162500',
    classificationCode: 'O‘zDSt 1157:2008 / FPK-189',
    fields: [
      { key: 'courtName', label: 'Sud nomi', placeholder: 'Fuqarolik ishlari bo‘yicha Shayxontohur tumanlararo sudiga', type: 'text', required: true },
      { key: 'plaintiffInfo', label: 'Da‘vogar (F.I.Sh, manzil, tel, JSHSHIR)', placeholder: 'Aliyev Vali, Toshkent sh., Chilonzor t., 12-uy, Tel: +998901234567, JSHSHIR: 3120485...', type: 'textarea', required: true },
      { key: 'defendantInfo', label: 'Javobgar (F.I.Sh, manzil, tel, JSHSHIR)', placeholder: 'Sobirov Bekzod, Toshkent sh., Shayxontohur t., Navoiy ko‘chasi, Tel: +998939876543, JSHSHIR: 3200192...', type: 'textarea', required: true },
      { key: 'contractDate', label: 'Qarz berilgan sana', type: 'date', required: true },
      { key: 'debtAmount', label: 'Asosiy qarz summasi (so‘m)', placeholder: '50 000 000', type: 'text', required: true },
      { key: 'dueDate', label: 'Qaytarish va‘da qilingan sana', type: 'date', required: true },
      { key: 'claimPrice', label: 'Da‘vo bahosi (Qarz + Peniya)', placeholder: '53 500 000 so‘m', type: 'text', required: true },
      { key: 'stateDuty', label: 'To‘langan davlat boji (4%)', placeholder: '2 140 000 so‘m', type: 'text', required: true },
    ],
    templateGenerator: (v) => `${v.courtName || '[Sud nomi]'}ga

Da‘vogar: ${v.plaintiffInfo || '[Da‘vogar ma‘lumotlari]'}
Javobgar: ${v.defendantInfo || '[Javobgar ma‘lumotlari]'}

Da‘vo bahosi: ${v.claimPrice || '[Summa]'} so‘m
Davlat boji: ${v.stateDuty || '[Summa]'} so‘m


DA‘VO ARIZASI
(Qarz summasi, foizlar va davlat bojini undirish to‘g‘risida)

${v.contractDate || '«___» ________ 2025-yil'} kuni javobgar ${v.defendantInfo?.split(',')[0] || '[Javobgar]'} mendan ${v.debtAmount || '[Qarz summasi]'} so‘m miqdorida qarz oldi va ushbu qarzni ${v.dueDate || '«___» ________ 2026-yil'} kuniga qadar qaytarish majburiyatini olib, qarz shartnomasi (tilxat) taqdim etdi.

Biroq, belgilangan qaytarish muddati o‘tgan bo‘lsada, javobgar qarzni qaytarishdan asossiz bo‘yin tovlab kelmoqda. Mening bir necha bor og‘zaki va yozma talabnomalarim natijasiz qoldi.

O‘zbekiston Respublikasi Fuqarolik kodeksining 732 va 735-moddalariga muvofiq, qarz oluvchi qarz shartnomasida nazarda tutilgan muddatda qarz summasini qaytarishi shart. FKning 327-moddasiga asosan boshqa shaxslarning pul mablag‘larini noqonuniy ushlab qolganlik uchun foizlar to‘lanishi belgilangan.

Yuqoridagilarga asosan hamda O‘zbekiston Respublikasi Fuqarolik protsessual kodeksining 189, 190, 191-moddalariga tayanib,

SUDDAN SO‘RAYMAN:

1. Javobgar ${v.defendantInfo?.split(',')[0] || '[Javobgar]'}dan mening foydamga ${v.debtAmount || '[Qarz]'} so‘m asosiy qarz summasini undirishingizni;
2. Pul mablag‘laridan noqonuniy foydalanganlik uchun ${v.claimPrice || '[Jami]'} so‘mgacha hisoblangan foizlarni undirishingizni;
3. Da‘vo kiritishda to‘langan ${v.stateDuty || '[Davlat boji]'} so‘m davlat boji va pochta xarajatlarini javobgar hisobidan qoplab berishingizni.

Ilova qilinayotgan hujjatlar:
1. Qarz tilxati (shartnomasi) asl nusxasi.
2. Davlat boji to‘langanligi haqidagi kvitansiya.
3. Da‘vogar pasport/ID nusxasi.
4. Javobgarga da‘vo arizasi nusxasi pochta orqali yuborilganligini tasdiqlovchi kvitansiya.

Da‘vogar: _________________ / ${v.plaintiffInfo?.split(',')[0] || 'Imzo'} /
Sana: «___» ____________ 2026-yil`,
  },

  // 12. SUD BUYRUG‘I (ALIMENT UNDIRISH)
  {
    id: 'sud-buyrugi-aliment',
    title: 'Voyaga yetmagan bolalar uchun aliment undirish haqida sud buyrug‘i berish to‘g‘risida ariza',
    shortTitle: 'Aliment sud buyrug‘i arizasi',
    category: 'family',
    description: 'Oila kodeksining 99-moddasi va FPKning 238-moddasiga binoan sud majlislarisiz qisqa muddatda sud buyrug‘i olish arizasi.',
    applicableLaw: 'Oila kodeksi 99, 101-moddalar; FPK 238-243 moddalar',
    lexUrl: 'https://lex.uz/docs/104720#105300',
    classificationCode: 'O‘zDSt 1157:2008 / FPK-238',
    fields: [
      { key: 'courtName', label: 'Sud nomi', placeholder: 'Fuqarolik ishlari bo‘yicha Mirzo Ulug‘bek tumanlararo sudiga', type: 'text', required: true },
      { key: 'applicantInfo', label: 'Undiruvchi (Ona/Ota F.I.Sh, Pasport, Manzil, Tel)', placeholder: 'Karimova Nargiza Baxtiyorovna, Toshkent sh., Mirzo Ulug‘bek t., Tel: +998901112233', type: 'textarea', required: true },
      { key: 'debtorInfo', label: 'Qarzdor (Ota/Ona F.I.Sh, Pasport, Ish joyi, Manzil)', placeholder: 'Karimov Jasur Rustamovich, Toshkent sh., Yashnobod t., Ish joyi: «TECH» MChJ', type: 'textarea', required: true },
      { key: 'childrenDetails', label: 'Bolalarning F.I.Sh. va tug‘ilgan sanalari', placeholder: 'Karimov Bobur Jasurovich (2018-yil 12-mayda tug‘ilgan), Karimova Madina Jasurovna (2021-yil 4-noyabrda tug‘ilgan)', type: 'textarea', required: true },
      { key: 'fractionPart', label: 'Undirilishi so‘ralayotgan ulush', placeholder: '1/3 qismi miqdorida (2 nafar bola uchun)', defaultValue: '1/3 qismi miqdorida', type: 'text', required: true },
    ],
    templateGenerator: (v) => `${v.courtName || '[Sud nomi]'}ga

Undiruvchi: ${v.applicantInfo || '[Undiruvchi ma‘lumotlari]'}
Qarzdor: ${v.debtorInfo || '[Qarzdor ma‘lumotlari]'}


ARIZA
(Voyaga yetmagan bolalar ta‘minoti uchun aliment undirish bo‘yicha sud buyrug‘i berish to‘g‘risida)

Men va qarzdor ${v.debtorInfo?.split(',')[0] || '[Qarzdor]'} o‘rtamizda qonuniy nikohdan quyidagi farzand(lar)imiz tug‘ilgan:
${v.childrenDetails || '[Bolalar ma‘lumotlari]'}.

Hozirgi vaqtda farzandlar to‘liq mening qaramog‘imda yashab kelmoqda. Biroq, qarzdor bolalarning moddiy ta‘minotida ixtiyoriy ravishda ishtirok etishdan bosh tortmoqda va aliment to‘lash bo‘yicha o‘zaro kelishuv tuzilmagan.

O‘zbekiston Respublikasi Oila kodeksining 99-moddasiga ko‘ra, ota-onalar voyaga yetmagan bolalariga ta‘minot berishlari shart. Voyaga yetmagan bolalar uchun aliment oylik ish haqi va boshqa daromadning tegishli qismida (${v.fractionPart || 'belgilangan ulushda'}) undiriladi.

FPKning 238-moddasiga binoan, voyaga yetmagan bolalar ta‘minoti uchun aliment undirish to‘g‘risidagi talablar sud buyrug‘i tartibida ko‘rib chiqiladi.

Yuqoridagilarga asosan hamda Oila kodeksining 99, 101-moddalari va FPKning 238-243 moddalariga tayanib,

SUDDAN SO‘RAYMAN:

Qarzdor ${v.debtorInfo?.split(',')[0] || '[Qarzdor]'}dan mening foydamga voyaga yetmagan farzandlarimiz ${v.childrenDetails?.split('(')[0] || '[Farzandlar]'} ta‘minoti uchun uning har oylik ish haqi va barcha daromadlarining ${v.fractionPart || '1/3 qismi'} miqdorida, har bir bola voyaga yetgunga qadar har oy aliment undirish haqida SUD BUYRUG‘I chiqarishingizni so‘rayman.

Ilovalar:
1. Nikoh to‘g‘risidagi guvohnoma nusxasi.
2. Bolalarning tug‘ilganlik haqidagi guvohnomalari nusxalari.
3. Mahalla yoki MFYdan bolalar mening qaramog‘imda ekanligi haqida ma‘lumotnoma.
4. Undiruvchi pasport nusxasi.

Undiruvchi: _________________ / ${v.applicantInfo?.split(',')[0] || 'Imzo'} /
Sana: «___» ____________ 2026-yil`,
  },

  // 13. TALABNOMA / PRETENZIYA
  {
    id: 'talabnoma-pretenziya',
    title: 'Shartnoma majburiyatlarini bajarish va qarzni to‘lash haqida rasmiy Talabnoma (Pretenziya)',
    shortTitle: 'Talabnoma (Pretenziya)',
    category: 'business',
    description: 'Sudgacha bo‘lgan nizolarni hal qilishning majburiy bosqichi sifatida qarz va peniyani to‘lash haqidagi rasmiy talabnoma.',
    applicableLaw: 'Fuqarolik kodeksi 234, 333-moddalar; Xo‘jalik yurituvchi subyektlar faoliyatining shartnomaviy-huquqiy bazasi to‘g‘risidagi Qonun',
    lexUrl: 'https://lex.uz/docs/44427',
    classificationCode: 'O‘zDSt 1157:2008 / FK-234',
    fields: [
      { key: 'recipientCompany', label: 'Qarzdor tashkilot nomi va rahbari', placeholder: '«BETA TRADE» MChJ bosh direktori A.B. Karimovga', type: 'text', required: true },
      { key: 'senderCompany', label: 'Talab qiluvchi tashkilot nomi', placeholder: '«GAMMA LOGISTICS» MChJ dan', type: 'text', required: true },
      { key: 'contractNumberAndDate', label: 'Shartnoma raqami va sanasi', placeholder: '2025-yil 10-yanvardagi 12-sonli Mahsulot yetkazib berish shartnomasi', type: 'text', required: true },
      { key: 'unpaidAmount', label: 'To‘lanmagan asosiy qarz summasi (so‘m)', placeholder: '34 800 000 so‘m', type: 'text', required: true },
      { key: 'penaltyAmount', label: 'Hisoblangan shartnomaviy peniya (so‘m)', placeholder: '3 480 000 so‘m', type: 'text' },
      { key: 'deadlineDays', label: 'Talabni ixtiyoriy bajarish muddati', placeholder: '7 (yetti) bank kuni ichida', defaultValue: '7 bank kuni ichida', type: 'text', required: true },
    ],
    templateGenerator: (v) => `${v.recipientCompany || '[Qarzdor Tashkilot]'}ga

Kimdan: ${v.senderCompany || '[Kreditor Tashkilot]'}
Chiqish №: ${Math.floor(100 + Math.random() * 900)}
Sana: «___» ____________ 2026-yil


TALABNOMA (PRETENZIYA)
(Shartnoma bo‘yicha to‘lov majburiyatini bajarish va qarzni to‘lash to‘g‘risida)

Bizning tashkilotlar o‘rtasida tuzilgan ${v.contractNumberAndDate || '[Shartnoma ma‘lumotlari]'}ga asosan biz o‘z zimmamizdagi barcha shartnoma majburiyatlarini to‘liq bajardik va tomonlar o‘rtasida hisobvaraq-faktura (dalolatnoma) tasdiqlangan.

Biroq, Shartnomaning to‘lov shartlariga zid ravishda, bugungi kunga qadar siz tomoningizdan ${v.unpaidAmount || '[Summa]'} miqdoridagi to‘lov amalga oshirilmadi.

O‘zbekiston Respublikasi Fuqarolik kodeksining 234-moddasiga asosan majburiyatlar shartnoma shartlariga va qonun talablariga muvofiq lozim darajada bajarilishi shart.

Ushbu talabnomani olgan kundan boshlab ${v.deadlineDays || '7 bank kuni ichida'} ko‘rsatilgan ${v.unpaidAmount || '[Summa]'} asosiy qarzni ${v.penaltyAmount ? `hamda hisoblangan ${v.penaltyAmount} peniyani` : ''} bizning hisob-kitob raqamimizga to‘lashingizni talab qilamiz.

Aks holda, asosiy qarzga qo‘shimcha ravishda shartnomaviy jarimalar (FK 327-modda), davlat boji va barcha yuridik/advokatlik xarajatlarini undirish uchun Iqtisodiy sudga da‘vo arizasi kiritilishini ma‘lum qilamiz.

Direktor: _________________ / Imzo va Muhr /
M.O‘.`,
  },

  // 14. ISHONCHNOMA (YURIDIK SHAXS NOMIDAN)
  {
    id: 'ishonchnoma-yuridik-shaxs',
    title: 'Yuridik shaxs nomidan vakillik qilish uchun rasmiy Ishonchnoma',
    shortTitle: 'Vakillik ishonchnomasi',
    category: 'business',
    description: 'Fuqarolik kodeksining 134-144 moddalariga muvofiq barcha davlat organlari, banklar va sudlarda vakillik qilish uchun ishonchnoma.',
    applicableLaw: 'Fuqarolik kodeksi 134, 135, 138, 139-moddalar',
    lexUrl: 'https://lex.uz/docs/111189#150200',
    classificationCode: 'O‘zDSt 1157:2008 / FK-134',
    fields: [
      { key: 'companyName', label: 'Tashkilot nomi', placeholder: '«INNOVATIVE LOGISTICS» MChJ', type: 'text', required: true },
      { key: 'directorName', label: 'Rahbarning F.I.Sh.', placeholder: 'Karimov Alisher Baxtiyorovich', type: 'text', required: true },
      { key: 'agentName', label: 'Ishonchli vakilning F.I.Sh.', placeholder: 'Usmonov Jasur Rustamovich', type: 'text', required: true },
      { key: 'agentPassport', label: 'Ishonchli vakil pasport/ID ma‘lumotlari', placeholder: 'Pasport: AB 1234567, 2022-yil IIB tomonidan berilgan, JSHSHIR: 31204...', type: 'text', required: true },
      { key: 'powersScope', label: 'Berilayotgan vakolatlar doirasi', placeholder: 'Barcha davlat organlari, sudlar, soliq va bojxona idoralarida, banklarda hujjatlarni imzolash va topshirish huquqi bilan', type: 'textarea', required: true },
      { key: 'validUntil', label: 'Ishonchnomaning amal qilish muddati', placeholder: '2026-yil 31-dekabrga qadar (kamida 3 yilgacha)', defaultValue: '2026-yil 31-dekabrga qadar', type: 'text', required: true },
    ],
    sampleFilledValues: {
      companyName: '«INNOVATIVE LOGISTICS & TECH» MChJ (STIR: 308945612)',
      directorName: 'Karimov Alisher Baxtiyorovich',
      agentName: 'Usmonov Jasur Rustamovich',
      agentPassport: 'Pasport: AB 1234567, 2022-yil 15-martda Toshkent shahar Mirobod tuman IIB tomonidan berilgan, JSHSHIR (PINFL): 31204951234567',
      powersScope: 'O‘zbekiston Respublikasining barcha davlat va nodavlat tashkilotlarida, shu jumladan Davlat soliq xizmati organlarida, Bojxona qo‘mitasida, barcha tijorat banklarida, Fuqarolik va Iqtisodiy sudlarda korxona manfaatlarini to‘liq himoya qilish, shartnomalar, dalolatnomalar, arizalar, elektron hisobvaraq-fakturalarni imzolash hamda topshirish huquqi bilan',
      validUntil: '2027-yil 31-dekabrga qadar (FK 139-moddasi bo‘yicha 3 yil muddatga)',
    },
    templateGenerator: (v) => `ISHONCHNOMA
№ ISH-${new Date().getFullYear()}/${Math.floor(100 + Math.random() * 900)}

Toshkent shahri                                            «___» ____________ 2026-yil

${v.companyName || '[Tashkilot nomi]'} nomidan Ustav asosida faoliyat yurituvchi direktor ${v.directorName || '[Rahbar F.I.Sh.]'},

ushbu ishonchnoma bilan fuqaro ${v.agentName || '[Ishonchli vakil F.I.Sh.]'}ga (${v.agentPassport || '[Pasport/JSHSHIR]'})

${v.companyName || '[Tashkilot nomi]'} nomidan ${v.powersScope || 'barcha davlat va nodavlat tashkilotlarida, sudlarda, banklarda manfaatlarini himoya qilish, shartnomalar, dalolatnomalar va hisobvaraq-fakturalarni imzolash hamda topshirish'} vakolatini beradi.

Mazkur ishonchnoma ${v.validUntil || 'bir yil muddatga'} berildi (boshqa shaxsga o‘tkazish huquqisiz).

Ishonchli vakil imzosi: _________________ / ${v.agentName?.split(' ')[0] || 'Vakil'} /

Direktor: _________________ / ${v.directorName || '[Rahbar F.I.Sh.]'} /
M.O‘.`,
  },

  // 14-B. AVTOTRANSPORT VOSITASINI BOSHQARISH VA TASARRUF ETISH ISHONCHNOMASI (DOVERENNOST)
  {
    id: 'ishonchnoma-avtotransport-boshqarish',
    title: 'Avtotransport vositasini boshqarish / tasarruf etish bo‘yicha Ishonchnoma (Doverennost)',
    shortTitle: 'Avtotransport ishonchnomasi (Doverennost)',
    category: 'civil',
    description: 'Fuqarolik kodeksining 134-144 moddalari va YHXX qoidalariga asosan avtomashinani boshqarish va texnik ko‘rikdan o‘tkazish bo‘yicha rasmiy ishonchnoma.',
    applicableLaw: 'Fuqarolik kodeksi 134, 135, 137, 139-moddalar; Yo‘l harakati qoidalari',
    lexUrl: 'https://lex.uz/docs/111189#150200',
    classificationCode: 'O‘zDSt 1157:2008 / FK-135-AUTO',
    fields: [
      { key: 'principalInfo', label: 'Ishonch bildiruvchi (Avtomobil egasi F.I.Sh, Pasport, JSHSHIR, Manzil)', placeholder: 'Ahmedov Botir Olimovich, Pasport: AA 5544332, JSHSHIR: 3150882...', type: 'textarea', required: true },
      { key: 'agentInfo', label: 'Ishonchli vakil (F.I.Sh, Pasport, JSHSHIR, Manzil, Haydovchilik guvohnomasi)', placeholder: 'Nazarov Sanjar Rustamovich, Pasport: AB 8877665, Guvohnoma: AF 123456', type: 'textarea', required: true },
      { key: 'carModelAndNumber', label: 'Avtotransport rusumi va davlat raqam belgisi', placeholder: 'CHEVROLET TRACKER-2, Davlat raqami: 01 A 777 AA', type: 'text', required: true },
      { key: 'carVinAndEngine', label: 'Kuzov (VIN) va Dvigatel raqamlari', placeholder: 'Kuzov №: KL17B451239999, Dvigatel №: B15D498212', type: 'text', required: true },
      { key: 'techPassportDetails', label: 'Texnik pasport (Qayd etish guvohnomasi) seriyasi va sanasi', placeholder: 'Texnik pasport: AAF 9876543, 2024-yil 12-mayda berilgan', type: 'text', required: true },
      { key: 'authorityScope', label: 'Berilayotgan vakolatlar', placeholder: 'O‘zbekiston Respublikasi hududida boshqarish, texnik ko‘rikdan o‘tkazish, sug‘urta qilish va jarimalarni to‘lash huquqi bilan', type: 'textarea', required: true },
      { key: 'validityDuration', label: 'Amal qilish muddati (FK 139 - maksimal 3 yilgacha)', placeholder: '3 (uch) yil muddatga (2029-yilgacha)', defaultValue: '3 yil muddatga', type: 'text', required: true },
    ],
    sampleFilledValues: {
      principalInfo: 'Ahmedov Botir Olimovich, Pasport: AA 5544332, berilgan sana: 2021-yil 10-iyun, Toshkent sh. Mirzo Ulug‘bek tuman IIB, JSHSHIR: 31508821234567, Manzil: Toshkent sh., Mirzo Ulug‘bek t., Feruza mavzesi, 18-uy, Tel: +998 90 333-22-11',
      agentInfo: 'Nazarov Sanjar Rustamovich, Pasport: AB 8877665, berilgan sana: 2022-yil 14-avgust, Yunusobod tuman IIB, JSHSHIR: 32201947654321, Haydovchilik guvohnomasi: AF № 654321 (toifasi: B), Manzil: Toshkent sh., Chilonzor t., 12-mavze, Tel: +998 93 555-44-33',
      carModelAndNumber: 'CHEVROLET TRACKER-2 (Premier), Davlat raqam belgisi: 01 A 777 AA, Ishlab chiqarilgan yili: 2024',
      carVinAndEngine: 'VIN (Kuzov) raqami: KL17B451239999, Dvigatel raqami: B15D498212, Rangi: Oq marvarid',
      techPassportDetails: 'Qayd etish guvohnomasi (Texnik pasport): AAF № 9876543, Toshkent shahar YHXB tomonidan 2024-yil 15-mayda berilgan',
      authorityScope: 'O‘zbekiston Respublikasi hududi bo‘ylab mazkur avtotransport vositasini boshqarish, texnik xizmat ko‘rsatish va majburiy texnik ko‘rikdan o‘tkazish, barcha sug‘urta turlari (OSAGO/KASKO) bo‘yicha shartnomalarni imzolash, yo‘l harakati qoidalari buzilishi bo‘yicha jarimalarni to‘lash va YHXX organlarida avtomashina bo‘yicha hujjatlarni rasmiylashtirish huquqi bilan (boshqa shaxsga tasarruf etish/sotish huquqisiz)',
      validityDuration: '3 (uch) yil muddatga (FK 139-modda talablariga muvofiq 2029-yil 1-martga qadar)',
    },
    templateGenerator: (v) => `AVTOTRANSPORT VOSITASINI BOSHQARISH UCHUN
ISHONCHNOMA (DOVERENNOST)

Toshkent shahri                                            «___» ____________ 2026-yil

Men, fuqaro ${v.principalInfo?.split(',')[0] || '[Ishonch bildiruvchi F.I.Sh.]'} (${v.principalInfo || '[Pasport ma‘lumotlari]'}),

ushbu ishonchnoma bilan fuqaro ${v.agentInfo?.split(',')[0] || '[Ishonchli vakil F.I.Sh.]'}ga (${v.agentInfo || '[Pasport va guvohnoma]'})

o‘zimga xususiy mulk huquqi asosida tegishli bo‘lgan quyidagi avtotransport vositasini:
- Rusumi va modeli: ${v.carModelAndNumber || '[Avtomobil rusumi va raqami]'}
- Agregat raqamlari: ${v.carVinAndEngine || '[VIN va dvigatel raqamlari]'}
- Qayd etish guvohnomasi: ${v.techPassportDetails || '[Texnik pasport ma‘lumotlari]'}

${v.authorityScope || 'boshqarish, texnik ko‘rikdan o‘tkazish, sug‘urta qilish va jarimalarni to‘lash huquqi bilan'} ishonib topshiraman.

Mazkur ishonchnoma O‘zbekiston Respublikasi Fuqarolik kodeksining 134-144 moddalariga asosan ${v.validityDuration || '3 yil muddatga'} berildi (boshqa shaxsga o‘tkazish - peredoveriye huquqisiz).

Ishonch bildiruvchi (Avtomobil egasi): _________________ / ${v.principalInfo?.split(',')[0] || 'Imzo'} /

Ishonchli vakil: _________________ / ${v.agentInfo?.split(',')[0] || 'Imzo'} /
(Qonunchilikda belgilangan hollarda notarial tasdiqlanadi va YHXX bazasida ro‘yxatga olinadi)`,
  },

  // 15. SHARTNOMAGA QO‘SHIMCHA KELISHUV
  {
    id: 'qoshimcha-kelishuv-dop-soglasheniye',
    title: 'Amaldagi shartnomaga o‘zgartirish kiritish bo‘yicha Qo‘shimcha kelishuv',
    shortTitle: 'Qo‘shimcha kelishuv',
    category: 'business',
    description: 'Fuqarolik kodeksining 382-384 moddalariga asosan shartnomaning narxi, muddati yoki shartlarini o‘zgartirish kelishuvi.',
    applicableLaw: 'Fuqarolik kodeksi 382, 383, 384-moddalar',
    lexUrl: 'https://lex.uz/docs/111189#157800',
    classificationCode: 'O‘zDSt 1157:2008 / FK-382',
    fields: [
      { key: 'agreementNumber', label: 'Qo‘shimcha kelishuv raqami', placeholder: '1-sonli', defaultValue: '1-sonli', type: 'text', required: true },
      { key: 'originalContract', label: 'Asosiy shartnoma raqami va sanasi', placeholder: '2025-yil 15-martdagi 24-sonli Ijara/Yetkazib berish shartnomasi', type: 'text', required: true },
      { key: 'partyOne', label: '1-taraf nomi', placeholder: '«ALFA» MChJ nomidan direktor A.K.', type: 'text', required: true },
      { key: 'partyTwo', label: '2-taraf nomi', placeholder: '«BETA» MChJ nomidan direktor S.R.', type: 'text', required: true },
      { key: 'amendmentsText', label: 'Kiritilayotgan o‘zgartirishlar matni', placeholder: '1. Shartnomaning 2.1-bandidagi narx 15 000 000 so‘mga o‘zgartirilsin.\n2. Shartnomaning 3.1-bandidagi muddat 2026-yil 31-dekabrgacha uzaytirilsin.', type: 'textarea', required: true },
    ],
    sampleFilledValues: {
      agreementNumber: '1-sonli',
      originalContract: '2025-yil 15-martdagi 24-sonli Ijara shartnomasi',
      partyOne: '«ALFA LOGISTICS» MChJ nomidan direktor Karimov A.B.',
      partyTwo: '«PREMIUM PLAZA» MChJ nomidan direktor Olimov S.A.',
      amendmentsText: '1. Shartnomaning 2.1-bandidagi oylik ijara haqi 15 000 000 so‘m etib belgilansin.\n2. Shartnomaning amal qilish muddati 2026-yil 31-dekabrga qadar uzaytirilsin.',
    },
    templateGenerator: (v) => `${v.originalContract || '[Asosiy shartnoma]'}ga
${v.agreementNumber || '1-sonli'} QO‘SHIMCHA KELISHUV

Toshkent shahri                                            «___» ____________ 2026-yil

Ustav asosida faoliyat yurituvchi ${v.partyOne || '[1-taraf]'} bir tomondan, va
Ustav asosida faoliyat yurituvchi ${v.partyTwo || '[2-taraf]'} ikkinchi tomondan, O‘zbekiston Respublikasi Fuqarolik kodeksining 382-moddasiga asosan quyidagilar haqida mazkur qo‘shimcha kelishuvni tuzdilar:

1. Taraflar o‘rtasida tuzilgan ${v.originalContract || '[Asosiy shartnoma ma‘lumotlari]'}ga quyidagi o‘zgartirish va qo‘shimchalar kiritilsin:
${v.amendmentsText || '1. Shartnomaning amal qilish muddati 2026-yil 31-dekabrga qadar uzaytirilsin.'}

2. Asosiy shartnomaning mazkur qo‘shimcha kelishuvda ko‘rsatilmagan qolgan barcha bandlari o‘zgarishsiz o‘z kuchida qoladi.
3. Mazkur qo‘shimcha kelishuv imzolangan paytdan e‘tiboran kuchga kiradi va Asosiy shartnomaning ajralmas qismi hisoblanadi.

TARAFLARNING REKVIZITLARI VA IMZOLARI:

1-TARAF:                                      2-TARAF:
${v.partyOne || '[Tashkilot nomi]'}           ${v.partyTwo || '[Tashkilot nomi]'}
STIR: ______________________                  STIR: ______________________
H/r: _______________________                  H/r: _______________________

Direktor: ___________ / Imzo /                Direktor: ___________ / Imzo /
M.O‘.                                         M.O‘.`,
  },

  // 16. ISHGA QABUL QILISH ARIZASI
  {
    id: 'ishga-qabul-arizasi',
    title: 'Ishga qabul qilish to‘g‘risida fuqaroning rasmiy arizasi',
    shortTitle: 'Ishga qabul arizasi',
    category: 'labor',
    description: 'Mehnat kodeksining 104 va 127-moddalariga muvofiq xodimning korxona rahbariga ishga kirish haqidagi arizasi.',
    applicableLaw: 'Mehnat kodeksi 104, 124, 127-moddalar',
    lexUrl: 'https://lex.uz/docs/6257288#6258520',
    classificationCode: 'O‘zDSt 1157:2008 / MK-104-A',
    fields: [
      { key: 'organizationName', label: 'Tashkilot nomi va rahbari', placeholder: '«INNO TECH GROUP» MChJ direktori A.B. Karimovga', defaultValue: '«INNO TECH GROUP» MChJ direktori Karimov A.B. ga', type: 'text', required: true },
      { key: 'applicantFullName', label: 'Arizachining to‘liq F.I.Sh.', placeholder: 'Sattorov Sardor Akmalovich dan', defaultValue: 'Sattorov Sardor Akmalovich dan', type: 'text', required: true },
      { key: 'applicantAddressAndPhone', label: 'Yashash manzili va telefoni', placeholder: 'Toshkent sh., Yunusobod t., 12-uy, Tel: +998 90 123-45-67', defaultValue: 'Toshkent sh., Yunusobod t., 12-uy, Tel: +998 90 123-45-67', type: 'text', required: true },
      { key: 'targetDepartment', label: 'Qabul qilinishi so‘ralayotgan bo‘lim', placeholder: 'Dasturiy ta‘minot bo‘limi', defaultValue: 'Dasturiy ta‘minot bo‘limi', type: 'text', required: true },
      { key: 'targetPosition', label: 'Lavozim nomi', placeholder: 'Yetakchi backend dasturchi', defaultValue: 'Yetakchi backend dasturchi', type: 'text', required: true },
      { key: 'startDate', label: 'Ish boshlash sanasi', placeholder: '2026-yil 1-martdan', defaultValue: '2026-yil 1-martdan', type: 'text', required: true },
      { key: 'workType', label: 'Ish tartibi', type: 'select', options: ['Asosiy ish joyi sifatida', 'Ichki o‘rindoshlik asosida', 'Tashqi o‘rindoshlik asosida', 'Masofaviy ish (Remote)'], defaultValue: 'Asosiy ish joyi sifatida', required: true },
    ],
    sampleFilledValues: {
      organizationName: '«INNO TECH GROUP» MChJ direktori Karimov A.B. ga',
      applicantFullName: 'Sattorov Sardor Akmalovich dan',
      applicantAddressAndPhone: 'Toshkent sh., Yunusobod t., 12-uy, Tel: +998 90 123-45-67',
      targetDepartment: 'Dasturiy ta‘minot bo‘limi',
      targetPosition: 'Yetakchi backend dasturchi',
      startDate: '2026-yil 1-martdan',
      workType: 'Asosiy ish joyi sifatida',
    },
    templateGenerator: (v) => `${v.organizationName || '[Tashkilot va Rahbar]'}

${v.applicantFullName || '[Arizachi F.I.Sh.]'}
Yashash manzili: ${v.applicantAddressAndPhone || '[Manzil va Tel]'}


ARIZA
(Ishga qabul qilish to‘g‘risida)

Meni ${v.startDate || '«___» ________ 2026-yil'}dan boshlab ${v.targetDepartment || '[Bo‘lim]'}ga ${v.targetPosition || '[Lavozim]'} lavozimiga ${v.workType || 'asosiy ish joyi sifatida'} ishga qabul qilishingizni so‘rayman.

O‘zbekiston Respublikasi Mehnat kodeksining 124-moddasida nazarda tutilgan zarur hujjatlar (pasport/ID-karta nusxasi, diplom va ma‘lumotnoma) ilova qilinmoqda.


Ilovalar:
1. Pasport / ID-karta nusxasi.
2. Oliy ma‘lumot to‘g‘risidagi diplom nusxasi.
3. Rezyume (CV).

Arizachi: _________________ / ${v.applicantFullName?.split(' ')[0] || 'Imzo'} /
Sana: «___» ____________ 2026-yil`,
  },

  // 17. SUDGA DA‘VO: ISHGA TIKLASH VA PROGUL HAQINI UNDIRISH (MK 541-544, FPK 189)
  {
    id: 'davo-ishga-tiklash',
    title: 'Ishga tiklash, majburiy progul uchun ish haqi va ma‘naviy zarar undirish haqida da‘vo arizasi',
    shortTitle: 'Ishga tiklash sud da‘vosi',
    category: 'court',
    description: 'Mehnat kodeksining 541-544 moddalari va FPK 189-moddasiga asosan noqonuniy bo‘shatilgan xodimning fuqarolik sudiga da‘vo arizasi.',
    applicableLaw: 'Mehnat kodeksi 541, 542, 543, 544, 545-moddalar; FPK 189, 190, 191-moddalar',
    lexUrl: 'https://lex.uz/docs/6257288#6262840',
    classificationCode: 'O‘zDSt 1157:2008 / FPK-189 / MK-541',
    fields: [
      { key: 'courtName', label: 'Sud nomi', placeholder: 'Fuqarolik ishlari bo‘yicha Yakkasaroy tumanlararo sudiga', defaultValue: 'Fuqarolik ishlari bo‘yicha Yakkasaroy tumanlararo sudiga', type: 'text', required: true },
      { key: 'plaintiffInfo', label: 'Da‘vogar (Xodim F.I.Sh, Pasport, PINFL, Manzil, Tel)', placeholder: 'Raximov Olimjon Sobirovich, Toshkent sh., Chilonzor t., 5-mavze, 12-uy, Tel: +998901234567, PINFL: 3120485...', type: 'textarea', required: true },
      { key: 'defendantInfo', label: 'Javobgar (Ish beruvchi tashkilot nomi, STIR, Manzil, Tel)', placeholder: '«AGRO EXPORT» MChJ, Toshkent sh., Yakkasaroy t., Sh.Rustaveli ko‘chasi, 21-uy, STIR: 305678901', type: 'textarea', required: true },
      { key: 'positionHeld', label: 'Egallab turgan lavozimi va ishlagan davri', placeholder: 'Bosh mutaxassis lavozimida 2023-yil 1-maydan 2026-yil 10-fevralgacha', type: 'text', required: true },
      { key: 'dismissalOrderInfo', label: 'Ishdan bo‘shatish buyrug‘i raqami va sanasi', placeholder: '2026-yil 10-fevraldagi 18-k sonli buyruq', type: 'text', required: true },
      { key: 'averageMonthlySalary', label: 'O‘rtacha oylik ish haqi miqdori (so‘m)', placeholder: '8 500 000 so‘m', type: 'text', required: true },
      { key: 'moralDamageClaim', label: 'So‘ralayotgan ma‘naviy zarar summasi (so‘m)', placeholder: '15 000 000 so‘m', defaultValue: '10 000 000 so‘m', type: 'text' },
    ],
    sampleFilledValues: {
      courtName: 'Fuqarolik ishlari bo‘yicha Yakkasaroy tumanlararo sudiga',
      plaintiffInfo: 'Raximov Olimjon Sobirovich, Toshkent sh., Chilonzor t., 5-mavze, 12-uy, Tel: +998 90 123-45-67, JSHSHIR: 31204851234567',
      defendantInfo: '«AGRO EXPORT» MChJ, Toshkent sh., Yakkasaroy t., Sh.Rustaveli ko‘chasi, 21-uy, STIR: 305678901, Tel: +998 71 200-00-00',
      positionHeld: 'Bosh mutaxassis lavozimida 2023-yil 1-maydan 2026-yil 10-fevralgacha',
      dismissalOrderInfo: '2026-yil 10-fevraldagi 18-k sonli buyruq',
      averageMonthlySalary: '8 500 000 so‘m',
      moralDamageClaim: '10 000 000 so‘m',
    },
    templateGenerator: (v) => `${v.courtName || '[Sud nomi]'}ga

Da‘vogar: ${v.plaintiffInfo || '[Da‘vogar ma‘lumotlari]'}
Javobgar: ${v.defendantInfo || '[Javobgar ma‘lumotlari]'}

(Mehnat munosabatlariga oid nizo bo‘yicha davlat bojidan ozod qilingan — Soliq kodeksi 378-modda)


DA‘VO ARIZASI
(Ishga tiklash, majburiy progul davri uchun ish haqi va ma‘naviy zararni undirish to‘g‘risida)

Men javobgar tashkilotda ${v.positionHeld || '[Lavozim va davr]'} ishlab kelganman.

Biroq, javobgarning ${v.dismissalOrderInfo || '[Ishdan bo‘shatish buyrug‘i]'} bilan men bilan tuzilgan mehnat shartnomasi qonun talablariga mutlaqo zid ravishda, xodimning aybi va asosli vajlarsiz bekor qilingan.

Ish beruvchi tomonidan O‘zbekiston Respublikasi Mehnat kodeksida belgilangan ogohlantirish muddati, kasaba uyushmasi roziligi olish tartibi hamda xodimning kafolatlari qo‘pol ravishda buzilgan.

O‘zbekiston Respublikasi Mehnat kodeksining 541-moddasiga ko‘ra, g‘ayriqonuniy ravishda boshqa ishga o‘tkazilgan yoki mehnat shartnomasi bekor qilingan xodim avvalgi ishiga tiklanishi shart.
Mehnat kodeksining 542-moddasiga asosan xodimga majburiy progulning butun vaqti uchun o‘rtacha ish haqi to‘lanadi.
Shuningdek, Mehnat kodeksining 544-moddasiga binoan ish beruvchi xodimga yetkazilgan ma‘naviy zararni qoplashi shart.

Yuqoridagilarga asosan hamda O‘zbekiston Respublikasi Mehnat kodeksining 541-545 moddalari va Fuqarolik protsessual kodeksining 189-191 moddalariga tayanib,

SUDDAN SO‘RAYMAN:

1. Javobgar ${v.defendantInfo?.split(',')[0] || '[Javobgar]'}ning ${v.dismissalOrderInfo || '[Buyrug‘i]'}ni noqonuniy deb topib, bekor qilishingizni;
2. Meni javobgar tashkilotdagi avvalgi lavozimimga ishga tiklashingizni;
3. Javobgardan mening foydamga majburiy progul bo‘lgan butun davr uchun o‘rtacha oylik ish haqim (${v.averageMonthlySalary || '[Maosh]'} hisobidan) summasini undirishingizni;
4. Noqonuniy bo‘shatish natijasida yetkazilgan ${v.moralDamageClaim || '10 000 000'} so‘m ma‘naviy zararni javobgardan undirib berishingizni.

Ilovalar:
1. Ishga qabul qilish va ishdan bo‘shatish to‘g‘risidagi buyruqlar nusxasi.
2. Mehnat shartnomasi va elektron mehnat daftarchasidan ko‘chirma.
3. Oylik ish haqi to‘g‘risida ma‘lumotnoma (spravka).
4. Da‘vogar pasport/ID-karta nusxasi.
5. Javobgarga da‘vo nusxasi yuborilganligi kvitansiyasi.

Da‘vogar: _________________ / ${v.plaintiffInfo?.split(',')[0] || 'Imzo'} /
Sana: «___» ____________ 2026-yil`,
  },

  // 18. DAVLAT ORGANLARIGA RASMIY MUROJAAT / ARIZA / SHIKOYAT
  {
    id: 'ariza-davlat-organiga-murojaat',
    title: 'Davlat organi, prokuratura yoki hokimiyatga rasmiy Ariza / Shikoyat',
    shortTitle: 'Davlat organiga rasmiy murojaat',
    category: 'admin',
    description: '«Jismoniy va yuridik shaxslarning murojaatlari to‘g‘risida»gi O‘zbekiston Respublikasi Qonuni (6, 19, 21-moddalar) talablariga to‘liq mos rasmiy ariza va shikoyat.',
    applicableLaw: '«Jismoniy va yuridik shaxslarning murojaatlari to‘g‘risida»gi Qonun 6, 19, 21, 23-moddalar; Ma‘muriy tartib-taomillar to‘g‘risidagi Qonun',
    lexUrl: 'https://lex.uz/docs/3336171',
    classificationCode: 'O‘zDSt 1157:2008 / AP-LAW-6',
    fields: [
      { key: 'authorityName', label: 'Davlat organi / Mansabdor shaxs nomi', placeholder: 'O‘zbekiston Respublikasi Bosh prokuraturasiga (yoki Toshkent shahar hokimiga)', defaultValue: 'O‘zbekiston Respublikasi Bosh prokuraturasiga', type: 'text', required: true },
      { key: 'applicantInfo', label: 'Murojaat qiluvchi (F.I.Sh, Pasport, PINFL, Manzil, Tel)', placeholder: 'Karimov Jasur Alisherovich, Toshkent sh., Mirzo Ulug‘bek t., Buyuk Ipak Yo‘li ko‘chasi, 14-uy, Tel: +998901234567, PINFL: 3120495...', type: 'textarea', required: true },
      { key: 'subjectMatter', label: 'Murojaat / Shikoyat mavzusi', placeholder: 'Mansabdor shaxslarning noqonuniy xatti-harakatlari va huquqlarni tiklash to‘g‘risida', defaultValue: 'Qonunbuzarlik holatlarini bartaraf etish va buzilgan huquqlarni tiklash to‘g‘risida', type: 'text', required: true },
      { key: 'circumstancesDescription', label: 'Holatning batafsil bayoni va buzilgan qonun normalari', placeholder: '2026-yil yanvar oyida tegishli organ tomonidan qonunga zid ravishda...', type: 'textarea', required: true },
      { key: 'demandsList', label: 'Qo‘yilayotgan aniq talablar (Iltimos / Taklif)', placeholder: '1. Holat yuzasidan xizmat tekshiruvi o‘tkazish;\n2. Noqonuniy harakatlarni to‘xtatish va aybdorlarni javobgarlikka tortish;', type: 'textarea', required: true },
    ],
    sampleFilledValues: {
      authorityName: 'O‘zbekiston Respublikasi Bosh prokuraturasiga',
      applicantInfo: 'Karimov Jasur Alisherovich, Toshkent sh., Mirzo Ulug‘bek t., Buyuk Ipak Yo‘li ko‘chasi, 14-uy, Tel: +998 90 123-45-67, JSHSHIR: 31204951234567',
      subjectMatter: 'Qonunbuzarlik holatlarini bartaraf etish va fuqaroning qonuniy manfaatlarini himoya qilish to‘g‘risida',
      circumstancesDescription: 'Mening nomimga xususiy mulk huquqi asosida tegishli bo‘lgan ko‘chmas mulk obyekti bo‘yicha tegishli tuman idoralari tomonidan asossiz to‘sqinliklar yuzaga keltirilmoqda va qonun talablariga zid talablar qo‘yilmoqda.',
      demandsList: '1. Mazkur murojaatda keltirilgan qonunbuzarlik holatini nazoratga olishingizni;\n2. Mansabdor shaxslarning harakatlari ustidan prokuror nazorati tartibida tekshiruv o‘tkazib, buzilgan huquqlarimni tiklash choralarini ko‘rishingizni so‘rayman.',
    },
    templateGenerator: (v) => `${v.authorityName || '[Davlat organi nomi]'}ga

Murojaat qiluvchi:
${v.applicantInfo || '[Arizachi ma‘lumotlari]'}


ARIZA (SHIKOYAT)
(${v.subjectMatter || 'Fuqaroning qonuniy huquq va manfaatlarini himoya qilish to‘g‘risida'})

«Jismoniy va yuridik shaxslarning murojaatlari to‘g‘risida»gi O‘zbekiston Respublikasi Qonunining 6-moddasiga asosan mazkur murojaatni yo‘llab, quyidagilarni ma‘lum qilaman:

${v.circumstancesDescription || '[Holat bayoni va qonunbuzarliklar]'}

O‘zbekiston Respublikasi Konstitutsiyasi va «Jismoniy va yuridik shaxslarning murojaatlari to‘g‘risida»gi Qonunning 19-moddasiga muvofiq, davlat organlari va mansabdor shaxslar fuqarolarning murojaatlarini har tomonlama, xolisona va o‘z vaqtida ko‘rib chiqishga majburdirlar.

Yuqoridagilardan kelib chiqib,

SO‘RAYMAN:

${v.demandsList || '1. Ushbu arizani qonunda belgilangan 15 kunlik muddatda ko‘rib chiqishingizni;\n2. Buzilgan huquq va qonuniy manfaatlarimni tiklash bo‘yicha qat‘iy choralar ko‘rishingizni.'}

Murojaat natijasi to‘g‘risida qonunda belgilangan tartibda va muddatda yozma (yoki elektron) shaklda javob xati berishingizni so‘rayman.

Ilovalar:
1. Dalillovchi hujjatlar nusxalari.
2. Arizachi shaxsini tasdiqlovchi hujjat nusxasi.

Murojaat qiluvchi: _________________ / ${v.applicantInfo?.split(',')[0] || 'Imzo'} /
Sana: «___» ____________ 2026-yil`,
  },

  // 19. SUDGA DA‘VO: YETKAZILGAN ZARARNI UNDIRISH (FK 985, 1021, FPK 189)
  {
    id: 'davo-zarar-undirish',
    title: 'Yetkazilgan moddiy va ma‘naviy zararni undirish to‘g‘risida sudga da‘vo arizasi',
    shortTitle: 'Zararni undirish sud da‘vosi',
    category: 'court',
    description: 'Fuqarolik kodeksining 985, 999 va 1021-moddalari asosida shaxsga, mol-mulkka yetkazilgan zararni undirish da‘vosi.',
    applicableLaw: 'Fuqarolik kodeksi 14, 985, 1021, 1022-moddalar; FPK 189-191-moddalar',
    lexUrl: 'https://lex.uz/docs/111189#166500',
    classificationCode: 'O‘zDSt 1157:2008 / FPK-189 / FK-985',
    fields: [
      { key: 'courtName', label: 'Sud nomi', placeholder: 'Fuqarolik ishlari bo‘yicha Mirzo Ulug‘bek tumanlararo sudiga', type: 'text', required: true },
      { key: 'plaintiffInfo', label: 'Da‘vogar (F.I.Sh, Pasport, PINFL, Manzil, Tel)', placeholder: 'Yoqubov Dilshod Anvarovich, Toshkent sh., Tel: +998901112233', type: 'textarea', required: true },
      { key: 'defendantInfo', label: 'Javobgar (F.I.Sh / Tashkilot, Manzil, Tel)', placeholder: 'Qodirov Botir Rustamovich, Toshkent sh., Tel: +998934445566', type: 'textarea', required: true },
      { key: 'incidentDateAndDetails', label: 'Hodisa sodir bo‘lgan sana va voqea tafsiloti', placeholder: '2026-yil 12-yanvar kuni javobgarning aybi bilan (suv toshishi / avariya oqibatida)...', type: 'textarea', required: true },
      { key: 'materialDamageAmount', label: 'Baholangan moddiy zarar summasi (so‘m)', placeholder: '28 400 000 so‘m', type: 'text', required: true },
      { key: 'moralDamageAmount', label: 'Ma‘naviy zarar summasi (so‘m)', placeholder: '5 000 000 so‘m', defaultValue: '5 000 000 so‘m', type: 'text' },
      { key: 'stateDuty', label: 'Davlat boji miqdori (4%)', placeholder: '1 136 000 so‘m', type: 'text', required: true },
    ],
    sampleFilledValues: {
      courtName: 'Fuqarolik ishlari bo‘yicha Mirzo Ulug‘bek tumanlararo sudiga',
      plaintiffInfo: 'Yoqubov Dilshod Anvarovich, Toshkent sh., Mirzo Ulug‘bek t., 4-mavze, 22-uy, 15-xonadon, Tel: +998 90 111-22-33, PINFL: 31508821234567',
      defendantInfo: 'Qodirov Botir Rustamovich, Toshkent sh., Mirzo Ulug‘bek t., 4-mavze, 22-uy, 19-xonadon, Tel: +998 93 444-55-66',
      incidentDateAndDetails: '2026-yil 12-yanvar kuni yuqori qavatdagi 19-xonadon egasi javobgar Qodirov B.R. ning e‘tiborsizligi va nosoz sanitariya-texnika jihozlari oqibatida mening xonadonimga suv toshib, devorlar, shift, qimmatbaho mebel va elektr texnikalari jiddiy shikastlandi.',
      materialDamageAmount: '28 400 000 so‘m',
      moralDamageAmount: '5 000 000 so‘m',
      stateDuty: '1 136 000 so‘m',
    },
    templateGenerator: (v) => `${v.courtName || '[Sud nomi]'}ga

Da‘vogar: ${v.plaintiffInfo || '[Da‘vogar ma‘lumotlari]'}
Javobgar: ${v.defendantInfo || '[Javobgar ma‘lumotlari]'}

Da‘vo bahosi: ${v.materialDamageAmount || '[Summa]'} so‘m
Davlat boji: ${v.stateDuty || '[Summa]'} so‘m


DA‘VO ARIZASI
(Yetkazilgan moddiy va ma‘naviy zararni undirish to‘g‘risida)

${v.incidentDateAndDetails || '[Hodisa bayoni]'}

Mazkur hodisa yuzasidan tuzilgan tegishli xizmat dalolatnomasi hamda mustaqil baholovchi tashkilotning xulosasiga asosan yetkazilgan moddiy zarar miqdori ${v.materialDamageAmount || '[Summa]'} so‘mni tashkil etdi.

Mening zararni ixtiyoriy qoplash haqidagi yozma talabnomam javobgar tomonidan qanoatlantirilmasdan qoldirildi.

O‘zbekiston Respublikasi Fuqarolik kodeksining 985-moddasiga binoan, g‘ayriqonuniy harakat (harakatsizlik) tufayli fuqaroning shaxsiga yoki mol-mulkiga yetkazilgan zarar uni yetkazgan shaxs tomonidan to‘liq hajmda qoplanishi shart.
FKning 1021 va 1022-moddalariga asosan fuqaroga yetkazilgan ma‘naviy zarar ham sud tomonidan undirilishi belgilangan.

Yuqoridagilarga asosan hamda FK 985, 1021-moddalari va FPK 189-191-moddalariga tayanib,

SUDDAN SO‘RAYMAN:

1. Javobgar ${v.defendantInfo?.split(',')[0] || '[Javobgar]'}dan mening foydamga yetkazilgan moddiy zarar uchun ${v.materialDamageAmount || '[Summa]'} so‘m undirishingizni;
2. Yetkazilgan ma‘naviy zarar uchun ${v.moralDamageAmount || '5 000 000'} so‘m undirishingizni;
3. To‘langan ${v.stateDuty || '[Davlat boji]'} so‘m davlat boji va baholash xarajatlarini javobgar hisobidan qoplab berishingizni.

Ilovalar:
1. Uy-joy mulkdorlari shirkati / MFY dalolatnomasi.
2. Mustaqil baholash tashkiloti xulosasi va to‘lov cheki.
3. Fotosuratlar va dalillar.
4. Davlat boji to‘langanligi kvitansiyasi.
5. Javobgarga da‘vo nusxasi yuborilganligi kvitansiyasi.

Da‘vogar: _________________ / ${v.plaintiffInfo?.split(',')[0] || 'Imzo'} /
Sana: «___» ____________ 2026-yil`,
  },

  // 20. SUDGA DA‘VO: ISHCHANLIK OBRO‘SI, RADDIYA VA ZARARNI UNDIRISH (FK 100, 14, 1021, 1022, FPK 189)
  {
    id: 'davo-ishchanlik-obro-zarar',
    title: 'Ishchanlik obro‘si, sha’n va qadr-qimmatni himoya qilish, raddiya berish va zararni qoplash haqida da‘vo arizasi',
    shortTitle: 'Ishchanlik obro‘si sud da‘vosi (FK 100)',
    category: 'court',
    description: 'Fuqarolik kodeksining 100-moddasi (1- va 6-qismlari), 14, 1021, 1022-moddalari va FPK 189-moddasi asosida yuridik yoki jismoniy shaxsning sudga da‘vosi.',
    applicableLaw: 'Fuqarolik kodeksi 14, 100, 985, 1021, 1022-moddalar; FPK 189, 190, 191-moddalar; Oliy Sud Plenumi Qarori',
    lexUrl: 'https://lex.uz/docs/111189#153400',
    classificationCode: 'O‘zDSt 1157:2008 / FPK-189 / FK-100',
    fields: [
      { key: 'courtName', label: 'Sud nomi', placeholder: 'Fuqarolik ishlari bo‘yicha Shayxontohur tumanlararo sudiga', defaultValue: 'Fuqarolik ishlari bo‘yicha Shayxontohur tumanlararo sudiga', type: 'text', required: true },
      { key: 'plaintiffInfo', label: 'Da‘vogar (Fermer xo‘jaligi / Tadbirkor / Fuqaro, STIR/PINFL, Manzil, Tel)', placeholder: '«BARAKALI DALALAR» Fermer xo‘jaligi (Rahbar: Alimov Sh.B.), Samarqand viloyati, Tel: +998901234567, STIR: 304556677', defaultValue: '«BARAKALI DALALAR» Fermer xo‘jaligi (Rahbar: Alimov Sh.B.), Samarqand viloyati, Tel: +998 90 123-45-67, STIR: 304556677', type: 'textarea', required: true },
      { key: 'defendantInfo', label: 'Javobgar (OAV / Shaxs / Mansabdor, Manzil, Tel)', placeholder: '«XABARLAR MEDIA» tahririyati / Fuqaro Sobirov A.T., Manzil: Toshkent sh., Tel: +998931112233', defaultValue: '«XABARLAR MEDIA» internet nashri tahririyati va muallif Sobirov A.T., Tel: +998 71 200-11-22', type: 'textarea', required: true },
      { key: 'defamationDetails', label: 'Tarqatilgan tuhmat / obro‘sizlantiruvchi ma‘lumotlar va manbasi', placeholder: '2026-yil 15-fevral kuni ijtimoiy tarmoqlar va saytda fermer xo‘jaligi go‘yoki noqonuniy yer egallaganligi haqida haqiqatga mutlaqo to‘g‘ri kelmaydigan ma‘lumot tarqatildi...', defaultValue: '2026-yil 15-fevral kuni ijtimoiy tarmoqlar va internet nashrida da‘vogar sha‘ni va ishchanlik obro‘siga putur yetkazuvchi, haqiqatga mutlaqo to‘g‘ri kelmaydigan yolg‘on ma‘lumotlar tarqatildi.', type: 'textarea', required: true },
      { key: 'materialDamageAmount', label: 'Boy berilgan foyda va moddiy zarar summasi (FK 14, 100)', placeholder: '45 000 000 so‘m', defaultValue: '45 000 000 so‘m', type: 'text', required: true },
      { key: 'moralDamageAmount', label: 'Ma‘naviy zarar summasi (FK 1021, 1022 - jismoniy shaxs/rahbar uchun)', placeholder: '20 000 000 so‘m', defaultValue: '20 000 000 so‘m', type: 'text' },
      { key: 'retractionDemands', label: 'Raddiya berish usuli va matni', placeholder: 'Ma‘lumot tarqatilgan o‘sha internet nashri va kanallarida raddiya e‘lon qilish majburiyatini yuklash', defaultValue: 'Ma‘lumot tarqatilgan internet nashrida va ijtimoiy tarmoq sahifalarida 5 kun muddatda rasmiy raddiya e‘lon qilish majburiyatini yuklash', type: 'textarea', required: true },
    ],
    sampleFilledValues: {
      courtName: 'Fuqarolik ishlari bo‘yicha Shayxontohur tumanlararo sudiga',
      plaintiffInfo: '«BARAKALI DALALAR» Fermer xo‘jaligi (Rahbar: Alimov Sh.B.), Samarqand viloyati, Tel: +998 90 123-45-67, STIR: 304556677',
      defendantInfo: '«XABARLAR MEDIA» internet nashri tahririyati va muallif Sobirov A.T., Manzil: Toshkent sh., Shayxontohur t., Tel: +998 71 200-11-22',
      defamationDetails: '2026-yil 15-fevral kuni javobgar tomonidan internet va ommaviy axborot vositalarida da‘vogar faoliyati to‘g‘risida haqiqatga to‘g‘ri kelmaydigan, ishchanlik obro‘sini to‘kadigan va kontragentlar bilan tuzilgan shartnomalarning bekor bo‘lishiga olib kelgan asossiz tuhmat ma‘lumotlar tarqatildi.',
      materialDamageAmount: '45 000 000 so‘m',
      moralDamageAmount: '20 000 000 so‘m',
      retractionDemands: 'O‘sha internet nashrining bosh sahifasida va ommaviy e‘lonlarda «Raddiya» sarlavhasi ostida rasmiy raddiya matnini e‘lon qilish.',
    },
    templateGenerator: (v) => `${v.courtName || '[Sud nomi]'}ga
    
Da‘vogar: ${v.plaintiffInfo || '[Da‘vogar ma‘lumotlari]'}
Javobgar: ${v.defendantInfo || '[Javobgar ma‘lumotlari]'}

Da‘vo bahosi: ${v.materialDamageAmount || '[Summa]'} so‘m
Davlat boji: Amaldagi stavka bo‘yicha to‘langan


DA‘VO ARIZASI
(Sha’n, qadr-qimmat va ishchanlik obro‘sini himoya qilish, raddiya berish hamda yetkazilgan zararni undirish to‘g‘risida)

${v.defamationDetails || '[Tafsilotlar]'}

Tarqatilgan ma‘lumotlar haqiqatga mutlaqo to‘g‘ri kelmaydi va to‘qib chiqarilgan. O‘zbekiston Respublikasi Fuqarolik kodeksining 100-moddasi 1-qismiga binoan, fuqaro o‘zining sha’niga, qadr-qimmatiga yoki ishchanlik obro‘siga putur yetkazuvchi ma’lumotlar yuzasidan sud yo‘li bilan raddiya talab qilishga haqli.
Ushbu moddaning 6-qismiga ko‘ra: «Ushbu moddaning fuqaroning ishchanlik obro‘sini himoya qilishga doir qoidalari tegishincha yuridik shaxsning ishchanlik obro‘sini himoya qilishga nisbatan ham qo‘llanadi (ushbu Kodeksning 1022-moddasida nazarda tutilgan hollardan tashqari). Yuridik shaxsning ishchanlik obro‘siga putur yetkazadigan ma’lumotlar tarqatilgan taqdirda, ushbu shaxs bunday ma’lumotlarni raddiya qilish bilan bir qatorda, ularni tarqatish natijasida yetkazilgan zararning o‘rnini qoplashni talab qilishga haqlidir.»

Javobgarga raddiya berish to‘g‘risida yuborilgan talabnoma javobsiz qoldirildi.
Natijada, da‘vogarning obro‘siga jiddiy putur yetib, yetkazilgan moddiy zarar (boy berilgan foyda - FK 14-modda) ${v.materialDamageAmount || '[Summa]'} so‘mni tashkil etdi.
Shuningdek, rahbarga yetkazilgan jismoniy va ma‘naviy azoblar uchun FK 1021 va 1022-moddalariga asosan ${v.moralDamageAmount || '[Summa]'} so‘m ma‘naviy zarar undirilishi lozim.

Yuqoridagilarga asosan hamda O‘zbekiston Respublikasi Fuqarolik kodeksining 14, 100, 985, 1021, 1022-moddalari va FPKning 189-191-moddalariga tayanib,

SUDDAN SO‘RAYMAN:

1. Javobgar tomonidan tarqatilgan ma‘lumotlarni haqiqatga to‘g‘ri kelmaydigan va da‘vogarning ishchanlik obro‘siga putur yetkazuvchi deb topishingizni;
2. Javobgarga ${v.retractionDemands || 'o‘sha manbada rasmiy raddiya e‘lon qilish'} majburiyatini yuklashingizni;
3. Javobgardan da‘vogar foydasiga yetkazilgan moddiy zarar (${v.materialDamageAmount || '[Summa]'} so‘m)ni to‘liq undirib berishingizni;
4. Yetkazilgan ma‘naviy zarar uchun ${v.moralDamageAmount || '[Summa]'} so‘m kompensatsiya undirishingizni;
5. Sud xarajatlari va davlat bojini javobgar hisobiga yuklashingizni.

Ilovalar:
1. Tuhmat/obro‘sizlantiruvchi post va maqolaning notarial tasdiqlangan skrinshot bayonnomasi.
2. Raddiya talab qilingan yozma pretenziya va pochta kvitansiyasi.
3. Moddiy zararni (boy berilgan foyda va bekor bo‘lgan shartnomalarni) tasdiqlovchi buxgalteriya hujjatlari.
4. Davlat boji to‘langanligi to‘g‘risida kvitansiya.
5. Da‘vo arizasi nusxasi javobgarga topshirilganligi hujjati.

Da‘vogar (vakili): _________________ / Imzo /
Sana: «___» ____________ 2026-yil`,
  },
];

