/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Smart Templates Library Data & O'zbekiston Legislation Auto-Population Engine.
 * Provides curated legal document types (Mehnat shartnomasi, Ijaraga berish shartnomasi,
 * Doverennost / Ishonchnoma, Xizmat ko'rsatish, Savdo, Qarz, Sud da'volari)
 * and auto-populates all rekvizitlar and terms according to O'zbekiston standard legislation
 * (Yangi Mehnat kodeksi, Fuqarolik kodeksi, O'zDSt 1157:2008, Lex.uz).
 */

import { LegalCategory } from '../types';

export interface SmartLegislationProfile {
  id: string;
  name: string;
  badge: string;
  description: string;
  statutoryBasis: string;
  lexUrl: string;
  populatedValues: Record<string, string>;
  keyLegalGuarantees: string[];
}

export interface SmartTemplateDefinition {
  id: string;
  templateId: string; // ID corresponding to LEGAL_DOCUMENT_TEMPLATES
  title: string;
  shortTitle: string;
  category: LegalCategory;
  docTypeCode: 'mehnat' | 'ijara' | 'doverennost' | 'xizmat' | 'savdo' | 'qarz' | 'sud' | 'talabnoma';
  icon: string;
  popularRank: number;
  governingLaw: string;
  governingCodeName: string;
  lexUrl: string;
  standardClassification: string;
  summary: string;
  statutoryMandatoryClauses: string[];
  defaultProfileId: string;
  profiles: SmartLegislationProfile[];
}

export const SMART_TEMPLATES_LIBRARY: SmartTemplateDefinition[] = [
  // 1. MEHNAT SHARTNOMASI (YANGI MEHNAT KODEKSI 104-108 MODDALAR)
  {
    id: 'smart-mehnat-shartnomasi',
    templateId: 'mehnat-shartnomasi-namunaviy',
    title: 'Mehnat shartnomasi (Yakka tartibdagi mehnat kontrakti)',
    shortTitle: 'Mehnat shartnomasi',
    category: 'labor',
    docTypeCode: 'mehnat',
    icon: 'Briefcase',
    popularRank: 1,
    governingLaw: 'Yangi Mehnat kodeksi 104-108, 110, 129, 216, 253, 452-moddalar; VM 971-son qarori (YAMMT)',
    governingCodeName: 'O‘zR Yangi Mehnat Kodeksi',
    lexUrl: 'https://lex.uz/docs/6257288#6258520',
    standardClassification: 'O‘zDSt 1157:2008 / MK-104 / YAMMT',
    summary: 'Yangi Mehnat kodeksi talablariga to‘liq javob beruvchi, 40 soatlik haftalik rejim, 21 kunlik ta‘til, 3 oylik sinov va YAMMT elektron daftarchasi mezonlari bilan ta‘minlangan davlat standarti.',
    statutoryMandatoryClauses: [
      'Mehnat vazifasi, lavozim nomi va malaka talablari (MK 107-modda)',
      'Ish boshlanish sanasi va shartnoma muddati (MK 110-modda)',
      'Mehnatga haq to‘lash shartlari va oylik muddati (MK 253-modda)',
      'Ish vaqti va dam olish vaqti rejimi (MK 182-modda)',
      'Yillik asosiy uzaytirilgan ta‘til muddati (kamida 21 kalendar kun - MK 216)',
      'Dastlabki sinov muddati (maksimal 3 oy - MK 129-modda)',
      'YAMMT (my.mehnat.uz) yagona elektron tizimida ro‘yxatdan o‘tkazish (VM 971)'
    ],
    defaultProfileId: 'mehnat-standard-fulltime',
    profiles: [
      {
        id: 'mehnat-standard-fulltime',
        name: 'Standart doimiy ish (5 kunlik, 40 soat)',
        badge: 'MK 104-108 Asosiy',
        description: 'Tashkilotda to‘liq bandlik: 40 soatlik ish haftasi, 21 kalendar kunlik asosiy ta‘til, 3 oylik dastlabki sinov va 2 hissa ishdan tashqari haq.',
        statutoryBasis: 'Mehnat kodeksi 104, 107, 129, 182, 216, 253, 262-moddalar',
        lexUrl: 'https://lex.uz/docs/6257288#6258520',
        keyLegalGuarantees: [
          'Haftasiga 40 soatdan oshmaydigan normal ish vaqti (MK 182)',
          'Yillik kamida 21 kalendar kunlik haq to‘lanadigan ta‘til (MK 216)',
          'Har oyning 20 va 5-kunlarida oylik maoshini to‘lash kafolati (MK 253)',
          'Ishdan tashqari mehnatga kamida 2 hissa haq to‘lash (MK 262)'
        ],
        populatedValues: {
          contractNumber: `${new Date().getFullYear()}/MS-${Math.floor(100 + Math.random() * 900)}`,
          contractRegion: 'Toshkent shahri, Mirobod tumani',
          contractDate: `${new Date().getFullYear()}-yil 1-mart`,
          companyName: '«ALFA GLOBAL TECH» MChJ nomidan direktor Karimov Alisher Baxtiyorovich (Ustav asosida)',
          employeeName: 'Usmonov Jasur Rustamovich',
          employeePassport: 'Pasport: AB 1234567, Mirobod tuman IIB, JSHSHIR (PINFL): 31204951234567',
          employeeAddress: 'Toshkent sh., Mirobod t., Oybek ko‘chasi, 12-uy, Tel: +998 90 123-45-67',
          workPlace: '«ALFA GLOBAL TECH» MChJ Axborot texnologiyalari departamenti',
          jobTitle: 'Yetakchi dasturiy ta‘minot muhandisi (Oliy ma‘lumotli, 3 yillik staj)',
          workNature: 'Asosiy ish joyi',
          contractType: 'Nomuayyan muddatga (muddatsiz)',
          startDate: `${new Date().getFullYear()}-yil 1-martdan`,
          endDate: 'Nomuayyan muddatli',
          probationPeriod: '3 oy',
          workHours: 'Haftasiga 40 soat, 5 kunlik ish haftasi (09:00 dan 18:00 gacha, tushlik 13:00 dan 14:00 gacha)',
          salaryAmount: 'Oylik lavozim maoshi: 12 000 000 so‘m (aniq belgilangan pul shaklida)',
          salaryBonus: 'KPI natijalari bo‘yicha 20% oylik ustama va ish vaqtidan tashqari mehnatga kamida 2 hissa haq',
          vacationDays: '21 kalendar kun (MK 216-moddasi bo‘yicha kafolatlangan)',
          extraVacationDays: '3 ish kuni (soha staji uchun)',
        }
      },
      {
        id: 'mehnat-remote-masofaviy',
        name: 'Masofaviy ish (Remote Work - MK 452)',
        badge: 'MK 452 Masofaviy',
        description: 'Axborot-telekommunikatsiya tarmoqlari orqali masofaviy ishlash: asbob-uskuna kompensatsiyasi, erkin ish grafigi va elektron hisobot.',
        statutoryBasis: 'Mehnat kodeksi 452, 453, 454, 455, 456-moddalar (Masofaviy ishchilar mehnati)',
        lexUrl: 'https://lex.uz/docs/6257288#6261540',
        keyLegalGuarantees: [
          'Masofadan ishlashda xodim o‘z ish vaqtini mustaqil taqsimlaydi (MK 455)',
          'Shaxsiy asbob-uskuna va internet aloqasi uchun kompensatsiya (MK 454)',
          'Yillik kamida 21 kalendar kunlik mehnat ta‘tili to‘liq saqlanadi (MK 216)',
          'YAMMT bazasida masofaviy ish sifatida qayd etiladi'
        ],
        populatedValues: {
          contractNumber: `${new Date().getFullYear()}/MS-REMOTE`,
          contractRegion: 'Toshkent shahri',
          contractDate: `${new Date().getFullYear()}-yil 1-mart`,
          companyName: '«INNOVATION CLOUD SYSTEMS» MChJ nomidan direktor Saidov T.B.',
          employeeName: 'Rahimov Jamshid Baxtiyorovich',
          employeePassport: 'Pasport: AA 7654321, JSHSHIR (PINFL): 31508821234567',
          employeeAddress: 'Samarqand sh., Registon ko‘chasi, 24-uy, Tel: +998 91 222-33-44',
          workPlace: 'Masofaviy ish joyi (Xodimning yashash manzili bo‘yicha telekommunikatsiya vositalari orqali)',
          jobTitle: 'Katta Full-Stack dasturchi (Remote Engineer)',
          workNature: 'Masofaviy ish (Remote - MK 452)',
          contractType: 'Nomuayyan muddatga (muddatsiz)',
          startDate: `${new Date().getFullYear()}-yil 1-martdan`,
          endDate: 'Nomuayyan muddatli',
          probationPeriod: 'Sinov muddatisiz',
          workHours: 'Haftasiga 40 soat me‘yori bilan moslashuvchan (erkin) ish vaqti grafigi (MK 455-modda)',
          salaryAmount: 'Oylik lavozim maoshi: 18 000 000 so‘m',
          salaryBonus: 'Internet va texnika amortizatsiyasi uchun oylik 1 500 000 so‘m qonuniy kompensatsiya (MK 454)',
          vacationDays: '21 kalendar kun',
          extraVacationDays: '4 ish kuni',
        }
      },
      {
        id: 'mehnat-parttime-orindoshlik',
        name: 'O‘rindoshlik asosidagi ish (Part-time - MK 432)',
        badge: 'MK 432 O‘rindoshlik',
        description: 'Asosiy ishdan bo‘sh vaqtda ishlash: haftasiga ko‘pi bilan 20 soat (kuniga 4 soat) me‘yori, mutanosib haq to‘lash.',
        statutoryBasis: 'Mehnat kodeksi 432-442 moddalar (O‘rindoshlik asosida ishlovchilar)',
        lexUrl: 'https://lex.uz/docs/6257288#6261300',
        keyLegalGuarantees: [
          'Ish vaqti kunlik 4 soat, haftasiga 20 soatdan oshmasligi shart (MK 437)',
          'Ishlangan vaqtga mutanosib ravishda oylik haq kafolati (MK 438)',
          'Asosiy ish joyidagi ta‘til bilan bir vaqtda beriladigan ta‘til (MK 440)'
        ],
        populatedValues: {
          contractNumber: `${new Date().getFullYear()}/MS-ORINDOSH`,
          contractRegion: 'Toshkent shahri, Yakkasaroy tumani',
          contractDate: `${new Date().getFullYear()}-yil 1-mart`,
          companyName: '«DATA ANALYTICS LAB» MChJ direktori Alimov S.A.',
          employeeName: 'Zokirova Nilufar Rustamovna',
          employeePassport: 'Pasport: AB 9988776, JSHSHIR (PINFL): 41203911234567',
          employeeAddress: 'Toshkent sh., Chilonzor t., 15-uy, Tel: +998 90 987-65-43',
          workPlace: '«DATA ANALYTICS LAB» MChJ Konsalting bo‘limi',
          jobTitle: 'Katta yuridik maslahatchi (Legal Tech eksperti)',
          workNature: 'Tashqi o‘rindoshlik asosida',
          contractType: '5 yildan oshmagan muayyan muddatga (MK 111-modda)',
          startDate: `${new Date().getFullYear()}-yil 1-martdan`,
          endDate: `${new Date().getFullYear() + 1}-yil 1-martgacha`,
          probationPeriod: 'Sinov muddatisiz',
          workHours: 'Haftasiga 20 soat (dushanba-juma kunlari 14:00 dan 18:00 gacha, MK 437-modda)',
          salaryAmount: 'Ishlangan vaqtga mutanosib oylik maosh: 7 500 000 so‘m',
          salaryBonus: 'Shartnomaviy mukofotlar va natijadorlik ustamasi',
          vacationDays: '21 kalendar kun (asosiy ish joyidagi ta‘til bilan bir vaqtda)',
          extraVacationDays: '2 ish kuni',
        }
      }
    ]
  },

  // 2. IJARAGA BERISH SHARTNOMASI (TURAR JOY & TIJORAT - FUQAROLIK KODEKSI 535, 600)
  {
    id: 'smart-ijara-shartnomasi',
    templateId: 'turar-joy-ijara-shartnomasi',
    title: 'Ijaraga berish shartnomasi (Turar joy va Noturar joy)',
    shortTitle: 'Ijaraga berish shartnomasi',
    category: 'civil',
    docTypeCode: 'ijara',
    icon: 'Home',
    popularRank: 2,
    governingLaw: 'Fuqarolik kodeksi 535-557, 573-578, 600-614 moddalar; Soliq kodeksi 369-modda (ijara.soliq.uz)',
    governingCodeName: 'O‘zR Fuqarolik Kodeksi & Soliq Kodeksi',
    lexUrl: 'https://lex.uz/docs/111189#160800',
    standardClassification: 'O‘zDSt 1157:2008 / FK-600 / SOLIQ-IJARA',
    summary: 'Turar joy va noturar joy (ofis)ni ijaraga berish uchun soliq inspeksiyasi (ijara.soliq.uz) ro‘yxatidan o‘tkazishga to‘liq mos, kafolat depoziti, hisoblagich to‘lovlari va 1 oylik ogohlantirish shartlariga ega yuridik shablon.',
    statutoryMandatoryClauses: [
      'Ijara obyekti tavsifi, aniq manzili va kadastr raqami (FK 537-modda)',
      'Ijara to‘lovi miqdori, to‘lash muddati va bank rekviziti (FK 544-modda)',
      'Kafolat depoziti (garov summasi) va qaytarish shartlari',
      'Davlat soliq organlarida ro‘yxatdan o‘tkazish majburiyati (ijara.soliq.uz - Soliq kodeksi 369)',
      'Subarenda (uchinchi shaxslarga berish) taqiqi (FK 543-modda)',
      'Shartnomani muddatidan oldin bekor qilishda 1 oylik yozma ogohlantirish (FK 614-modda)'
    ],
    defaultProfileId: 'ijara-residential-standard',
    profiles: [
      {
        id: 'ijara-residential-standard',
        name: 'Turar joy ijarasi (11 oylik, ijara.soliq.uz ga mos)',
        badge: 'FK 600 Soliqqa mos',
        description: 'Jismoniy shaxslar o‘rtasida xonadonni ijaraga berish: 11 oylik muddat, 1 oylik kafolat depoziti, har oyning 5-kunigacha to‘lov va hisoblagich hisoblari.',
        statutoryBasis: 'Fuqarolik kodeksi 600, 608, 612-moddalar; Soliq kodeksi 369-modda',
        lexUrl: 'https://lex.uz/docs/111189#160800',
        keyLegalGuarantees: [
          '11 oylik qonuniy muddat — ortiqcha notarial va kadastr yuklamasisiz qonuniy ro‘yxat (FK 600)',
          'ijara.soliq.uz portalida avtomatik hisobga qo‘yish kafolati',
          'Mulkni shikastlanishdan himoya qiluvchi 1 oylik kafolat depoziti (garov)',
          'Kommunal to‘lovlarni hisoblagich ko‘rsatkichlari bo‘yicha qat‘iy ajratish'
        ],
        populatedValues: {
          landlordInfo: 'Aliyev Vali G‘aniyevich, Pasport: AA 1234567, 2022-yil 14-mayda Yunusobod tuman IIB tomonidan berilgan, JSHSHIR (PINFL): 31204851234567, Manzil: Toshkent sh., Yunusobod t., 4-mavze, 12-uy, Tel: +998 90 123-45-67',
          tenantInfo: 'Saidov Temur Botirovich, Pasport: AB 7654321, 2023-yil 10-yanvarda Samarqand shahar IIB tomonidan berilgan, JSHSHIR (PINFL): 32001967654321, Manzil: Samarqand sh., Registon ko‘chasi, 8-uy, Tel: +998 93 987-65-43',
          propertyAddress: 'Toshkent shahri, Yunusobod tumani, 4-mavze, 12-uy, 34-xonadon (3 xonali, 78 kv.m, Kadastr raqami: 10:04:02:01:03:0034)',
          monthlyRent: '5 000 000 so‘m',
          depositAmount: '5 000 000 so‘m (bir oylik kafolat depoziti)',
          leaseTerm: `11 oy (${new Date().getFullYear()}-yil 1-martdan ${new Date().getFullYear() + 1}-yil 31-yanvargacha)`,
          paymentDay: 'Har oyning 5-sanasiga qadar',
        }
      },
      {
        id: 'ijara-commercial-office',
        name: 'Noturar joy / Ofis ijarasi (Yuridik shaxslar - FK 573)',
        badge: 'FK 573 Tijorat bino',
        description: 'Tashkilotlar va YaTTlar o‘rtasida biznes ofis, ombor yoki do‘kon ijarasi: bank o‘tkazmasi, topshirish dalolatnomasi va iqtisodiy sud tartibi.',
        statutoryBasis: 'Fuqarolik kodeksi 535, 573, 577, 578-moddalar (Bino va inshootlarni ijaraga berish)',
        lexUrl: 'https://lex.uz/docs/111189#160200',
        keyLegalGuarantees: [
          'Ikki tomonlama topshirish-qabul qilish dalolatnomasi (Akt) majburiyligi (FK 577)',
          'Bank orqali elektron hisobvaraq-faktura (EHF) asosida hisob-kitob',
          'Pretenziya va Iqtisodiy sud tartibida nizolarni hal qilish kafolati'
        ],
        populatedValues: {
          landlordInfo: '«PREMIUM PLAZA» MChJ nomidan direktor Olimov Sirojiddin Anvarovich, STIR: 301234567, Manzil: Toshkent sh., Yakkasaroy t., Sh.Rustaveli ko‘chasi, 45-uy, Tel: +998 71 200-11-22',
          tenantInfo: '«SMART LOGISTICS» MChJ nomidan direktor Qodirov Botir Rustamovich, STIR: 308765432, Manzil: Toshkent sh., Chilonzor t., 9-mavze, Tel: +998 90 999-88-77',
          propertyAddress: 'Toshkent shahri, Yakkasaroy tumani, Shota Rustaveli ko‘chasi, 45-uy, Biznes markazi 3-qavat, 305-ofis (150 kv.m tijorat maydoni)',
          monthlyRent: '18 000 000 so‘m (QQSsiz)',
          depositAmount: '18 000 000 so‘m (ekspluatatsiya xavfsizligi kafolati)',
          leaseTerm: `11 oy (${new Date().getFullYear()}-yil 1-martdan ${new Date().getFullYear() + 1}-yil 31-yanvargacha)`,
          paymentDay: 'Har oyning 10-sanasiga qadar to‘lov topshirig‘i bilan',
        }
      }
    ]
  },

  // 3. DOVERENNOST (ISHONCHNOMA - FUQAROLIK KODEKSI 134-144 MODDALAR)
  {
    id: 'smart-doverennost-ishonchnoma',
    templateId: 'ishonchnoma-yuridik-shaxs',
    title: 'Ishonchnoma (Doverennost) — Barcha vakolatlar va avtotransport',
    shortTitle: 'Doverennost (Ishonchnoma)',
    category: 'business',
    docTypeCode: 'doverennost',
    icon: 'ShieldCheck',
    popularRank: 3,
    governingLaw: 'Fuqarolik kodeksi 134-144 moddalar (Vakillik va ishonchnoma); FPK 66-modda; IPK 61-modda',
    governingCodeName: 'O‘zR Fuqarolik Kodeksi (134-modda)',
    lexUrl: 'https://lex.uz/docs/111189#150200',
    standardClassification: 'O‘zDSt 1157:2008 / FK-134 / POA-LEGAL',
    summary: 'Yuridik shaxs nomidan to‘liq vakillik, sudlarda huquqlarni himoya qilish, bank, soliq va avtotransport vositalarini boshqarish bo‘yicha FK 134-144 moddalari talablariga mos rasmiy ishonchnoma (doverennost).',
    statutoryMandatoryClauses: [
      'Ishonchnoma berilgan sana va joy (Sana ko‘rsatilmagan ishonchnoma haqiqiy emas - FK 139-modda)',
      'Ishonch bildiruvchi va ishonchli vakilning to‘liq rekvizitlari va PINFL (FK 134-modda)',
      'Berilayotgan vakolatlar doirasining qat‘iy ro‘yxati (FK 134-modda)',
      'Ishonchnomaning amal qilish muddati (qonun bo‘yicha ko‘pi bilan 3 yil - FK 139-modda)',
      'Boshqa shaxsga o‘tkazish (peredoveriye) huquqi bor yoki yo‘qligi (FK 140-modda)',
      'Rahbar imzosi va muhr (yuridik shaxslar uchun - FK 138-modda)'
    ],
    defaultProfileId: 'doverennost-general-corporate',
    profiles: [
      {
        id: 'doverennost-general-corporate',
        name: 'Yuridik shaxs Bosh Ishonchnomasi (General Corporate POA)',
        badge: 'FK 134 Bosh Vakillik',
        description: 'Kompaniya nomidan davlat organlarida, soliq, bojxona, tijorat banklarida hujjatlarni imzolash, topshirish va shartnomalar tuzish vakolati.',
        statutoryBasis: 'Fuqarolik kodeksi 134, 138, 139-moddalar (Yuridik shaxs nomidan ishonchnoma)',
        lexUrl: 'https://lex.uz/docs/111189#150200',
        keyLegalGuarantees: [
          'FK 139-moddasi bo‘yicha maksimal 3 yillik qonuniy muddat',
          'Sana majburiyligi kafolati (FK 139: sanasiz ishonchnoma o‘z-o‘zidan haqiqiy emas)',
          'Bank, soliq va xo‘jalik shartnomalarini imzolashning aniq chegaralangan doirasi',
          'Peredoveriye (boshqa shaxsga o‘tkazish) cheklovi orqali firibgarlikdan himoya'
        ],
        populatedValues: {
          companyName: '«INNOVATIVE LOGISTICS & TECH» MChJ (STIR: 308945612)',
          directorName: 'Karimov Alisher Baxtiyorovich',
          agentName: 'Usmonov Jasur Rustamovich',
          agentPassport: 'Pasport: AB 1234567, 2022-yil 15-martda Toshkent shahar Mirobod tuman IIB tomonidan berilgan, JSHSHIR (PINFL): 31204951234567',
          powersScope: 'O‘zbekiston Respublikasining barcha davlat va nodavlat tashkilotlarida, shu jumladan Davlat soliq xizmati organlarida, Bojxona qo‘mitasida, tijorat banklarida, Fuqarolik va Iqtisodiy sudlarda korxona manfaatlarini to‘liq ifoda etish, arizalar, shartnomalar, dalolatnomalar, elektron hisobvaraq-fakturalarni imzolash hamda to‘lovlarni tasdiqlash huquqi bilan',
          validUntil: `${new Date().getFullYear() + 2}-yil 31-dekabrga qadar (FK 139-moddasiga asosan 3 yil muddatga)`,
        }
      },
      {
        id: 'doverennost-court-advocate',
        name: 'Sud va davlat organlarida vakillik qilish (Court Litigation)',
        badge: 'FPK 66 / IPK 61 Sud',
        description: 'Fuqarolik, iqtisodiy va ma‘muriy sudlarda ishtirok etish: da‘vo imzolash, dalillar taqdim etish, kelishuv bitimi tuzish va apellyatsiya berish.',
        statutoryBasis: 'Fuqarolik protsessual kodeksi 66, 67, 69-moddalar; Iqtisodiy protsessual kodeksi 61, 63-moddalar',
        lexUrl: 'https://lex.uz/docs/3517337#3518200',
        keyLegalGuarantees: [
          'Sudda da‘vo arizasini imzolash va da‘voni to‘liq yoki qisman rad etish vakolati (FPK 69)',
          'Kelishuv bitimi imzolash va ijro varaqasini undirishga topshirish huquqi',
          'Sud qarorlari ustidan apellyatsiya va kassatsiya shikoyatlari kiritish'
        ],
        populatedValues: {
          companyName: '«ASIA AGRO EXPORT» MChJ (STIR: 304556677)',
          directorName: 'Qosimov Sardor Bobirovich',
          agentName: 'Advokat Ergashev Dilshod Mahmudovich (Litsenziya: № 004521, Toshkent shahar Advokatlar palatasi a‘zosi)',
          agentPassport: 'Pasport: AA 5544332, Toshkent sh. Shayxontohur tuman IIB, JSHSHIR: 31809801234567',
          powersScope: 'O‘zbekiston Respublikasining barcha fuqarolik, iqtisodiy va ma‘muriy sudlarida, Majburiy ijro byurosida (MIB) da‘vogar, javobgar va uchinchi shaxs sifatida ishtirok etish, da‘vo arizalarini imzolash va topshirish, talabdan butunlay yoki qisman voz kechish, da‘vo talablarini kamaytirish yoki ko‘paytirish, kelishuv bitimi tuzish, sud qarorlari ustidan apellyatsiya, kassatsiya va taftish tartibida shikoyat berish, ijro hujjatlarini topshirish va undirilgan mol-mulkni qabul qilish huquqi bilan (FPK 69-moddasi talablariga to‘liq muvofiq)',
          validUntil: `${new Date().getFullYear() + 1}-yil 31-dekabrga qadar`,
        }
      },
      {
        id: 'doverennost-auto-driving',
        name: 'Avtotransport vositasini boshqarish (Auto Doverennost)',
        badge: 'FK 135 Avtotransport',
        description: 'Avtomobilni O‘zbekiston bo‘ylab boshqarish, texnik ko‘rikdan o‘tkazish, sug‘urta shartnomalarini tuzish va jarimalarni to‘lash huquqi.',
        statutoryBasis: 'Fuqarolik kodeksi 134, 135, 137, 139-moddalar; Yo‘l harakati qoidalari',
        lexUrl: 'https://lex.uz/docs/111189#150200',
        keyLegalGuarantees: [
          'Yo‘l harakati xavfsizligi xizmati (YHXX) va YHQ talablariga moslik',
          'Maksimal 3 yillik qonuniy amal qilish muddati',
          'Tasarruf etish (sotish/garov) huquqisiz faqat ishonchli boshqaruv kafolati'
        ],
        populatedValues: {
          companyName: 'Xususiy avtomobil egasi: Ahmedov Botir Olimovich',
          directorName: 'Ahmedov Botir Olimovich',
          agentName: 'Nazarov Sanjar Rustamovich (Haydovchilik guvohnomasi: AF 654321)',
          agentPassport: 'Pasport: AB 8877665, Yunusobod tuman IIB, JSHSHIR: 32201947654321',
          powersScope: 'CHEVROLET TRACKER-2 (Davlat raqami: 01 A 777 AA, VIN: KL17B451239999, Texnik pasport: AAF 9876543) rusumli avtotransport vositasini O‘zbekiston Respublikasi hududi bo‘ylab boshqarish, texnik xizmat ko‘rsatish, majburiy texnik ko‘rikdan o‘tkazish, sug‘urta (OSAGO/KASKO) polisini rasmiylashtirish va jarimalarni to‘lash huquqi bilan (sotish va garovga qo‘yish huquqisiz)',
          validUntil: `${new Date().getFullYear() + 3}-yil 1-martga qadar (3 yil muddatga)`,
        }
      }
    ]
  },

  // 4. PULLI XIZMATLAR KO‘RSATISH SHARTNOMASI (FK 703-708 MODDALAR)
  {
    id: 'smart-xizmat-korsatish',
    templateId: 'xizmat-korsatish-shartnomasi',
    title: 'Pulli xizmatlar ko‘rsatish shartnomasi (IT, Marketing, Konsalting)',
    shortTitle: 'Xizmat ko‘rsatish shartnomasi',
    category: 'business',
    docTypeCode: 'xizmat',
    icon: 'Handshake',
    popularRank: 4,
    governingLaw: 'Fuqarolik kodeksi 703-708 moddalar; Shartnomaviy-huquqiy baza to‘g‘risidagi Qonun',
    governingCodeName: 'O‘zR Fuqarolik Kodeksi (703-modda)',
    lexUrl: 'https://lex.uz/docs/111189#162000',
    standardClassification: 'O‘zDSt 1157:2008 / FK-703',
    summary: 'IT xizmatlari, konsalting, marketing, dizayn va dasturiy ta‘minot ishlab chiqish bo‘yicha topshirish-qabul qilish dalolatnomasi (Akt) va EHF bilan himoyalangan shartnoma.',
    statutoryMandatoryClauses: [
      'Xizmatlarning aniq hajmi, texnik topshiriq (TOR) va natijasi (FK 703)',
      'Xizmatlar narxi, hisob-kitob tartibi va to‘lov muddati (FK 704)',
      'Bajarilgan ishlar dalolatnomasini tasdiqlashning 3 kunlik muddati',
      'Intellektual mulk huquqlarini Buyurtmachiga o‘tkazish sharti',
      'Konfidensiallik va tijorat sirini muhofaza qilish bandi'
    ],
    defaultProfileId: 'xizmat-it-software',
    profiles: [
      {
        id: 'xizmat-it-software',
        name: 'IT dasturlash va texnik qo‘llab-quvvatlash (IT Services)',
        badge: 'FK 703 IT & Tech',
        description: 'Dasturiy ta‘minot yaratish, veb-sayt va ERP integratsiyasi: mualliflik huquqi o‘tishi, 30 kunlik kafolat va dalolatnoma.',
        statutoryBasis: 'Fuqarolik kodeksi 703, 704, 1031-moddalar (Mualliflik huquqi)',
        lexUrl: 'https://lex.uz/docs/111189#162000',
        keyLegalGuarantees: [
          'Barcha yaratilgan dastur kodi va intellektual mulk to‘liq Buyurtmachiga o‘tishi',
          'Xatoliklarni bepul bartaraf etish bo‘yicha 30 kunlik kafolat muddati',
          'Dalolatnoma topshirilgach 5 bank kuni ichida to‘lov kafolati'
        ],
        populatedValues: {
          serviceProvider: '«INNOVATIVE DIGITAL LAB» MChJ nomidan direktor Saidov A.K. (Ustav asosida)',
          customer: '«MEGA RETAIL GROUP» MChJ nomidan direktor Karimov B.R.',
          serviceScope: 'Korxona ichki boshqaruv ERP tizimini ishlab chiqish, ma‘lumotlar bazasini integratsiya qilish, server infratuzilmasini sozlash hamda 30 kunlik texnik kafolat xizmatini ko‘rsatish (Ilova qilingan Texnik topshiriqqa muvofiq)',
          serviceCost: '25 000 000 so‘m (QQSsiz)',
          term: `${new Date().getFullYear()}-yil 1-iyunga qadar`,
        }
      }
    ]
  },

  // 5. MAHSULOT YETKAZIB BERISH (OLDI-SOTDI) SHARTNOMASI (FK 437-456)
  {
    id: 'smart-oldi-sotdi-yetkazib-berish',
    templateId: 'oldi-sotdi-yetkazib-berish-shartnomasi',
    title: 'Mahsulot yetkazib berish (Oldi-sotdi) shartnomasi',
    shortTitle: 'Oldi-sotdi shartnomasi',
    category: 'business',
    docTypeCode: 'savdo',
    icon: 'PackageCheck',
    popularRank: 5,
    governingLaw: 'Fuqarolik kodeksi 437-456 moddalar; Shartnomaviy-huquqiy baza to‘g‘risidagi Qonun (25-modda: penya chegarasi)',
    governingCodeName: 'O‘zR Fuqarolik Kodeksi (437-modda)',
    lexUrl: 'https://lex.uz/docs/111189#158000',
    standardClassification: 'O‘zDSt 1157:2008 / FK-437',
    summary: 'Xo‘jalik yurituvchi subyektlar o‘rtasida tovar va moddiy boyliklarni yetkazib berish: 15-30% avans, O‘zDSt sifat talabi va qonuniy 50%lik penya chegarasi bilan himoyalangan shartnoma.',
    statutoryMandatoryClauses: [
      'Mahsulot assortimenti, miqdori va sifati spetsifikatsiyasi (FK 439)',
      'Yetkazib berish muddati va ombor manzili (FK 440)',
      'Oldindan to‘lov (avans) va yakuniy hisob-kitob muddati',
      'Kechiktirilgan har bir kun uchun penya (0.5%, maksimal 50% limit - Qonun 25-modda)',
      'Fors-major (yengib bo‘lmas kuch) holatlari va savdo-sanoat palatasi guvohnomasi'
    ],
    defaultProfileId: 'savdo-standard-supply',
    profiles: [
      {
        id: 'savdo-standard-supply',
        name: 'Ulgurji mahsulot yetkazib berish (30% avans bilan)',
        badge: 'FK 437 B2B Savdo',
        description: 'Tadbirkorlar o‘rtasida tovar yetkazish: 30% oldindan to‘lov, 10 kunlik yetkazish muddati va qat‘iy sifat standarti.',
        statutoryBasis: 'Fuqarolik kodeksi 437, 442, 444-moddalar; Qonun № 670-I',
        lexUrl: 'https://lex.uz/docs/111189#158000',
        keyLegalGuarantees: [
          'Sifatning O‘zDSt davlat standartiga to‘liq mos kelish majburiyati',
          'Kechiktirilgan to‘lov va mahsulot yetkazish uchun o‘zaro qonuniy penya',
          'Elektron hisobvaraq-faktura (EHF) va ishonchnoma asosida topshirish'
        ],
        populatedValues: {
          sellerCompany: '«TOSHKENT SANOAT TIZIMLARI» MChJ nomidan direktor Aliyev N.B.',
          buyerCompany: '«BUILDING MEGA CONSTRUCT» MChJ nomidan direktor Sobirov R.Sh.',
          productDescription: 'Yuqori sifatli M-500 markali sement mahsuloti, hajmi 100 (yuz) tonna, 1-sonli Texnik spetsifikatsiyaga to‘liq muvofiq',
          totalContractPrice: '150 000 000 so‘m (QQS bilan)',
          prepaymentPercent: '30%',
          deliveryPeriod: 'Oldindan to‘lov (avans) tushgan kundan boshlab 10 bank kuni ichida',
          deliveryPlace: 'Toshkent viloyati, Zangiota tumani, Obod ko‘chasi, 12-omborxona',
        }
      }
    ]
  },

  // 6. QARZ SHARTNOMASI VA TILXAT (FK 732-743 MODDALAR)
  {
    id: 'smart-qarz-shartnomasi',
    templateId: 'qarz-shartnomasi-va-tilxat',
    title: 'Qarz shartnomasi va Rasmiy qarz tilxati (Sudda yuridik kuchga ega)',
    shortTitle: 'Qarz shartnomasi & Tilxat',
    category: 'civil',
    docTypeCode: 'qarz',
    icon: 'Coins',
    popularRank: 6,
    governingLaw: 'Fuqarolik kodeksi 732-743 moddalar (Qarz shartnomasi shakli va qaytarish qoidalari)',
    governingCodeName: 'O‘zR Fuqarolik Kodeksi (732-modda)',
    lexUrl: 'https://lex.uz/docs/111189#162500',
    standardClassification: 'O‘zDSt 1157:2008 / FK-732-RECEIPT',
    summary: 'Fuqarolar o‘rtasida pul mablag‘larini qarzga berish va qabul qilib olish: tilxat kuchi, aniq qaytarish sanasi, kechiktirilgan kunga 0.1% penya va sud orqali undirish kafolati.',
    statutoryMandatoryClauses: [
      'Qarz berilgan aniq summa (raqamda va so‘z bilan - FK 732)',
      'Mablag‘ to‘liq topshirilganligini tasdiqlovchi tilxat matni (FK 733-modda 2-qism)',
      'Qarzni to‘liq qaytarishning qat‘iy sanasi (FK 735-modda)',
      'Kechiktirilgan har bir kun uchun shartnomaviy foiz/penya (FK 327, 736-moddalar)',
      'Sud orqali undirish va davlat bojini qarzdor hisobidan undirish qoidasi'
    ],
    defaultProfileId: 'qarz-notarial-format',
    profiles: [
      {
        id: 'qarz-notarial-format',
        name: 'Kafolatlangan qarz shartnomasi va tilxat (FK 732-736)',
        badge: 'FK 732 Tilxat',
        description: 'Sudlarda asosiy yozma dalil bo‘ladigan qarz tilxati: qat‘iy qaytarish muddati, 0.1% penya va rekvizitlar.',
        statutoryBasis: 'Fuqarolik kodeksi 732, 733, 735, 736, 327-moddalar',
        lexUrl: 'https://lex.uz/docs/111189#162500',
        keyLegalGuarantees: [
          'FK 733-moddasi 2-qismiga ko‘ra qarz tilxatining yozma shartnoma kuchi',
          'Belgilangan muddat o‘tishi bilan FK 327 bo‘yicha foizlar hisoblash kafolati',
          'Sudga da‘vo kiritishda 100% yuridik isbot kuchi'
        ],
        populatedValues: {
          lenderInfo: 'Karimov Rustam Alisherovich, Pasport: AA 1122334, 2021-yil Mirobod tuman IIB tomonidan berilgan, JSHSHIR: 31505801234567, Manzil: Toshkent sh., Mirobod t., Nukus ko‘chasi, 14-uy, Tel: +998 90 111-22-33',
          borrowerInfo: 'Saidov Sardor Botirovich, Pasport: AB 9988776, 2022-yil Chilonzor tuman IIB tomonidan berilgan, JSHSHIR: 32001927654321, Manzil: Toshkent sh., Chilonzor t., 7-mavze, 22-uy, Tel: +998 93 999-88-77',
          loanAmountDigits: '50 000 000',
          loanAmountWords: 'Ellik million so‘m',
          repaymentDate: `${new Date().getFullYear()}-yil 1-sentyabr`,
          penaltyPerDay: '0.1% miqdorida (har bir kechiktirilgan kun uchun)',
        }
      }
    ]
  },

  // 7. SUDGA DA‘VO ARIZASI (QARZNI UNDIRISH - FPK 189)
  {
    id: 'smart-davo-qarz-undirish',
    templateId: 'davo-qarz-undirish',
    title: 'Sudga da‘vo arizasi (Qarz, foizlar va davlat bojini undirish)',
    shortTitle: 'Sudga da‘vo arizasi',
    category: 'court',
    docTypeCode: 'sud',
    icon: 'Gavel',
    popularRank: 7,
    governingLaw: 'Fuqarolik protsessual kodeksi 189, 190, 191-moddalar; FK 732, 735, 327-moddalar',
    governingCodeName: 'O‘zR Fuqarolik Protsessual Kodeksi',
    lexUrl: 'https://lex.uz/docs/3517337#3519800',
    standardClassification: 'O‘zDSt 1157:2008 / FPK-189',
    summary: 'Fuqarolik ishlari bo‘yicha tumanlararo sudiga kiritiladigan rasmiy da‘vo arizasi: qarz summasi, FK 327 bo‘yicha foizlar, 4% davlat boji va ilovalar to‘liq hisoblangan.',
    statutoryMandatoryClauses: [
      'Sudning to‘liq rasmiy nomi (FPK 189-modda 2-qism 1-band)',
      'Da‘vogar va javobgarning to‘liq shaxsiy rekvizitlari, PINFL va manzillari',
      'Da‘vogar talablari va bu talablarga asos bo‘lgan holatlar (FK 732, 735)',
      'Da‘vo bahosi va to‘langan 4% davlat boji hisob-kitobi (FPK 190)',
      'Ilova qilingan dalillar ro‘yxati va javobgarga nusxa yuborilganligi kvitansiyasi'
    ],
    defaultProfileId: 'sud-qarz-undirish-standard',
    profiles: [
      {
        id: 'sud-qarz-undirish-standard',
        name: 'Qarz va peniyani undirish sud da‘vosi (FPK 189)',
        badge: 'FPK 189 Sud da‘vosi',
        description: 'Fuqarolik sudiga qarz va foizlarni undirish da‘vosi: 4% davlat boji va pochta xarajatlarini javobgardan undirish talabi.',
        statutoryBasis: 'FPK 189, 190, 191-moddalar; FK 732, 735, 327-moddalar',
        lexUrl: 'https://lex.uz/docs/3517337#3519800',
        keyLegalGuarantees: [
          'Da‘vo arizasini harakatdan qoldirish xavfisiz FPK 189 qoidalariga 100% mos tuzilishi',
          'Davlat boji va barcha sud xarajatlarini javobgardan undirib berish talabi',
          'Hisoblangan qonuniy foizlar (FK 327) bilan birga summani ko‘paytirish'
        ],
        populatedValues: {
          courtName: 'Fuqarolik ishlari bo‘yicha Shayxontohur tumanlararo sudiga',
          plaintiffInfo: 'Aliyev Vali G‘aniyevich, Toshkent sh., Chilonzor t., 12-uy, Tel: +998 90 123-45-67, JSHSHIR (PINFL): 31204851234567',
          defendantInfo: 'Sobirov Bekzod Rustamovich, Toshkent sh., Shayxontohur t., Navoiy ko‘chasi, 45-uy, Tel: +998 93 987-65-43, JSHSHIR: 32001927654321',
          contractDate: `${new Date().getFullYear() - 1}-yil 15-may`,
          debtAmount: '50 000 000',
          dueDate: `${new Date().getFullYear()}-yil 15-yanvar`,
          claimPrice: '53 500 000 so‘m (50 mln asosiy qarz + 3.5 mln foizlar)',
          stateDuty: '2 140 000 so‘m (da‘vo bahosining 4% miqdorida to‘langan)',
        }
      }
    ]
  },

  // 8. RASMIY TALABNOMA (PRETENZIYA - FK 234 / 333)
  {
    id: 'smart-talabnoma-pretenziya',
    templateId: 'talabnoma-pretenziya',
    title: 'Rasmiy talabnoma (Pretenziya — Sudgacha majburiy hal etish)',
    shortTitle: 'Talabnoma (Pretenziya)',
    category: 'business',
    docTypeCode: 'talabnoma',
    icon: 'AlertTriangle',
    popularRank: 8,
    governingLaw: 'Fuqarolik kodeksi 234, 333-moddalar; Xo‘jalik yurituvchi subyektlar faoliyatining shartnomaviy-huquqiy bazasi to‘g‘risidagi Qonun',
    governingCodeName: 'O‘zR Fuqarolik Kodeksi (234-modda)',
    lexUrl: 'https://lex.uz/docs/44427',
    standardClassification: 'O‘zDSt 1157:2008 / FK-234 / DEMAND-LETTER',
    summary: 'Sudga murojaat qilishdan oldin qarzni ixtiyoriy to‘lash haqidagi majburiy rasmiy talabnoma: 7-10 bank kunlik muddat, penya va sud xarajatlari ogohlantirishi bilan.',
    statutoryMandatoryClauses: [
      'Asos bo‘lgan shartnoma raqami, sanasi va topshirilgan tovar/xizmat dalolatnomasi',
      'To‘lanmagan asosiy qarz summasi va hisoblangan shartnomaviy penya',
      'Talabnomani ixtiyoriy qanoatlantirish uchun 7-10 bank kuni muddati',
      'Iqtisodiy sudga da‘vo kiritish va sud xarajatlarini yuklash to‘g‘risida qat‘iy ogohlantirish'
    ],
    defaultProfileId: 'pretenziya-standard-commercial',
    profiles: [
      {
        id: 'pretenziya-standard-commercial',
        name: 'Tijorat qarzdorligini to‘lash talabnomasi (7 bank kuni)',
        badge: 'FK 234 Pretenziya',
        description: 'Shartnoma to‘lovi kechiktirilganda yuboriladigan pretenziya: 7 bank kuni ichida to‘lash va sud ogohlantirishi.',
        statutoryBasis: 'Fuqarolik kodeksi 234, 327, 333-moddalar; Qonun № 670-I',
        lexUrl: 'https://lex.uz/docs/44427',
        keyLegalGuarantees: [
          'Sudgacha majburiy da‘vo tartibiga 100% rioya qilinganligini isbotlash',
          'Peniya va advokatlik xarajatlarini javobgardan undirish kafolati'
        ],
        populatedValues: {
          recipientCompany: '«BETA TRADE COMMERCE» MChJ bosh direktori Karimov A.B. ga',
          senderCompany: '«GAMMA LOGISTICS SERVICES» MChJ dan',
          contractNumberAndDate: `${new Date().getFullYear() - 1}-yil 10-noyabrdagi 24-sonli Xizmat ko‘rsatish shartnomasi`,
          unpaidAmount: '34 800 000 so‘m',
          penaltyAmount: '3 480 000 so‘m (shartnoma 4.2-bandi bo‘yicha penya)',
          deadlineDays: '7 bank kuni ichida',
        }
      }
    ]
  }
];

/**
 * Returns a smart template item by either smart id or raw templateId
 */
export function findSmartTemplate(idOrTemplateId: string): SmartTemplateDefinition | undefined {
  return SMART_TEMPLATES_LIBRARY.find(
    (st) => st.id === idOrTemplateId || st.templateId === idOrTemplateId
  );
}

/**
 * Returns the default populated values for a given smart template or raw template ID based on O'zbekiston legislation
 */
export function getStandardLegislationValues(
  templateId: string, 
  profileId?: string
): { values: Record<string, string>; profile: SmartLegislationProfile; smartTemplate: SmartTemplateDefinition } | null {
  const smart = findSmartTemplate(templateId);
  if (!smart) return null;

  const profile = profileId 
    ? smart.profiles.find((p) => p.id === profileId) || smart.profiles[0]
    : smart.profiles.find((p) => p.id === smart.defaultProfileId) || smart.profiles[0];

  return {
    values: { ...profile.populatedValues },
    profile,
    smartTemplate: smart,
  };
}
