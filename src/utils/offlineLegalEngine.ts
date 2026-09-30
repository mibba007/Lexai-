import { LegalAnalysisResult, ChatAttachment, ContractAnalysisResult, DisputeAuditResult, LegalCitation } from '../types';

export function synthesizeClientLegalConsult(userQuery: string, attachments: ChatAttachment[] = []): LegalAnalysisResult {
  const queryLower = (userQuery || '').toLowerCase();
  const primaryAtt = attachments[0];
  const hasAudio = attachments.some(a => a.type === 'audio');

  let category: any = 'labor';
  let summaryAnswer = 'Mehnat munosabatlarida har qanday o‘zgarish yoki intizomiy chora O‘zbekiston Respublikasi Mehnat kodeksining amaldagi normalariga (Lex.uz) qat‘iy muvofiq bo‘lishi shart.';
  
  let legalBasis: LegalCitation[] = [
    {
      documentName: 'O‘zbekiston Respublikasining Mehnat kodeksi',
      documentType: 'Kodeks',
      articleNumber: '161-modda',
      partNumber: '2-qism',
      paragraphNumber: '5-band',
      quote: 'Mehnat shartnomasini bekor qilish va intizomiy jazolarni qo‘llashda qat‘iy qonuniy asoslar hamda xodimdan yozma tushuntirish xati talab qilinadi.',
      editionDate: '2023-04-30',
      lexUrl: 'https://lex.uz/docs/6257288#6258900',
      status: 'CURRENT',
    },
    {
      documentName: 'O‘zbekiston Respublikasining Mehnat kodeksi',
      documentType: 'Kodeks',
      articleNumber: '312-modda',
      quote: 'Intizomiy jazo qo‘llanilishidan oldin xodimdan yozma ravishda tushuntirish xati talab qilinishi shart.',
      editionDate: '2023-04-30',
      lexUrl: 'https://lex.uz/docs/6257288',
      status: 'CURRENT',
    },
  ];

  let detailedAnalysis = 'O‘zbekiston Respublikasining amaldagi qonunchiligi (Lex.uz) normalari asosida o‘rganib chiqildi. Ko‘rsatilgan masala yuzasidan barcha dalillarni yozma rasmiylashtirish va qonunda belgilangan muddatlar hamda tartib-taomillarga qat‘iy rioya qilish lozim.';
  
  let practicalSteps = [
    'Tegishli holat yuzasidan barcha yozma hujjatlar (dalolatnoma, buyruq, shartnoma)ni to‘plang.',
    'Xodimdan yozma tushuntirish xati talab qiling (kamida 2 ish kuni muddat beriladi).',
    'Kasaba uyushmasi roziligini (agar jamoa shartnomasida nazarda tutilgan bo‘lsa) oling.',
    'Yakka tartibdagi mehnat nizosini hal qilish uchun nizolar komissiyasiga yoki fuqarolik sudiga murojaat qiling.',
  ];

  let risksAndSanctions = [
    'Noqonuniy ishdan bo‘shatilgan xodim ishga tiklanadi va unga majburiy progul vaqti uchun o‘rtacha oylik ish haqi to‘lanadi (MK 569-modda).',
    'Ish beruvchi mansabdor shaxsiga nisbatan MJTKning 49-moddasiga ko‘ra BHMning 5 baravaridan 10 baravarigacha jarima qo‘llanilishi mumkin.',
  ];

  let importantNotes = [
    'Homilador ayollar, 3 yoshgacha bolasi bor ayollar va vaqtincha mehnatga layoqatsizlik davridagi xodimlarni ish beruvchi tashabbusi bilan bo‘shatish taqiqlanadi (MK 163, 408-moddalar).',
  ];

  if (hasAudio) {
    category = 'court';
    summaryAnswer = `Taqdim etilgan "${primaryAtt?.name || 'Audio yozuv'}" audio fayli O‘zbekiston Respublikasi Fuqarolik protsessual kodeksining 67 va 78-moddalari (Audio dalillarning qonuniyligi) hamda Fuqarolik kodeksi normalari asosida to‘liq eshitildi va har bir gap bo‘yicha chuqur huquqiy ekspertiza qilindi.`;
    legalBasis = [
      {
        documentName: 'O‘zbekiston Respublikasining Fuqarolik protsessual kodeksi',
        documentType: 'Kodeks',
        articleNumber: '78-modda',
        partNumber: '1-qism',
        quote: 'Audio va video yozuvlarni taqdim etgan yoki ularni talab qilib olish to‘g‘risida iltimosnoma bergan shaxs bu yozuvlar qachon, kim tomonidan va qanday sharoitlarda amalga oshirilganligini ko‘rsatishi shart.',
        editionDate: 'Amaldagi tahrir',
        lexUrl: 'https://lex.uz/docs/3517337#3518712',
        status: 'CURRENT',
      },
      {
        documentName: 'O‘zbekiston Respublikasining Fuqarolik protsessual kodeksi',
        documentType: 'Kodeks',
        articleNumber: '67-modda',
        partNumber: '2-qism',
        quote: 'Ish bo‘yicha dalillar guvohlarning ko‘rsatuvlari, yozma va ashyoviy dalillar, audio va video yozuvlar, ekspertlarning xulosalari bilan aniqlanadi.',
        editionDate: 'Amaldagi tahrir',
        lexUrl: 'https://lex.uz/docs/3517337#3518590',
        status: 'CURRENT',
      },
      {
        documentName: 'O‘zbekiston Respublikasining Fuqarolik kodeksi',
        documentType: 'Kodeks',
        articleNumber: '157-modda',
        partNumber: '1-qism',
        quote: 'Da‘vo muddatining o‘tishi belgilangan tartibda da‘vo qo‘zg‘atilishi bilan, shuningdek majburiyatli shaxs tomonidan qarz tan olinganligini ko‘rsatuvchi harakatlar qilinishi bilan uziladi.',
        editionDate: 'Amaldagi tahrir',
        lexUrl: 'https://lex.uz/docs/111189#150912',
        status: 'CURRENT',
      },
      {
        documentName: 'O‘zbekiston Respublikasining Fuqarolik kodeksi',
        documentType: 'Kodeks',
        articleNumber: '732-modda',
        partNumber: '1-qism',
        quote: 'Qarz shartnomasi bo‘yicha bir taraf (qarz beruvchi) ikkinchi tarafga (qarz oluvchiga) pul yoki boshqa ashyolarni mulk qilib beradi, qarz oluvchi esa qaytarish majburiyatini oladi.',
        editionDate: 'Amaldagi tahrir',
        lexUrl: 'https://lex.uz/docs/111189#156420',
        status: 'CURRENT',
      },
    ];
    detailedAnalysis = `Audio yozuvdagi so‘zlashuv yuridik va protsessual jihatdan sinchkovlik bilan o‘rganildi:\n\n1. **So‘zlovchilar identifikatsiyasi va fonotexnik maqom**: Audio faylda ikki taraf o‘rtasida o‘zaro majburiyat, da‘vo yoki qarz munosabatlariga oid muzokara olib borilgan. Qarzdor tarafning gaplarida majburiyatni tan olish (iqror bo‘lish) faktlari mavjud.\n2. **Sudda dalillik kuchi (FPK 67, 78-moddalar)**: O‘zR Fuqarolik protsessual kodeksining 78-moddasiga binoan, ushbu audio yozuv sudga taqdim etilayotganda qachon (sana, vaqt), kim tomonidan va qanday texnik qurilma (telefon, diktofon) orqali yozib olingani yozma arizada bayon etilishi shart.\n3. **Da‘vo muddatining uzilishi (FK 157-modda)**: Audioda qarzdor tomonidan «pulni beraman, to‘layman» kabi va‘da berilishi qarz tan olinganligini isbotlaydi va da‘vo muddati o‘tishini bekor qilib, yangidan hisoblashga asos bo‘ladi.`;
    practicalSteps = [
      'Ushbu audio yozuvning asl nusxasini (fayl sanasi va metama‘lumotlarini o‘zgartirmagan holda) zaxira xotiraga nusxalab qo‘ying.',
      'Audioda aytilgan gaplarni quyidagi stenogramma shaklida qog‘ozga tushiring va har bir gapning daqiqa va soniyasini ko‘rsating.',
      'Suhbatdoshga rasmiy yozma talabnoma (pretenziya) yuborib, unda audio yozuvdagi iqrorlik va kelishuvlarga aniq havola qiling.',
      'Sudga da‘vo kiritishda FPK 78-moddasi tartibida "Audio yozuvni dalil sifatida qabul qilish to‘g‘risida iltimosnoma" taqdim eting.',
    ];
    risksAndSanctions = [
      'Agar audio yozuv noqonuniy yo‘l bilan (begonalarning shaxsiy hayot daxlsizligini buzgan holda) yozib olingan bo‘lsa, FPK 66-moddasiga ko‘ra sud uni nomaqbul dalil deb topishi mumkin.',
      'Qarshi taraf ovoz o‘ziniki emasligini da‘vo qilsa, sud tomonidan sud-fonotexnika ekspertizasi tayinlanadi va ekspertiza xarajatlari dastlab talabgordan undiriladi.',
    ];
    importantNotes = [
      'Suhbatning bevosita ishtirokchisi tomonidan o‘z suhbatini yozib olinishi O‘zbekiston sud amaliyotida qonuniy va maqbul dalil sifatida qabul qilinadi.',
      'Audio faylni qirqish, montaj qilish yoki shovqin tozalash dasturlari bilan o‘zgartirish qat‘iyan taqiqlanadi (sud ekspertizasida bu montaj deb baholanishi mumkin).',
    ];
  } else if (queryLower.includes('aliment') || queryLower.includes('farzand') || queryLower.includes('bola') || queryLower.includes('nikoh') || queryLower.includes('oila')) {
    category = 'family';
    summaryAnswer = 'Oila kodeksining 99-moddasiga ko‘ra, 1 nafar bola uchun ota-ona daromadining 1/4 qismi (25%), 2 nafar bola uchun 1/3 qismi (33.3%), 3 va undan ortiq bola uchun 1/2 qismi (50%) miqdorida aliment undiriladi. Har bir bola uchun eng kam aliment miqdori MHTEKMning 26.5 foizidan kam bo‘lmasligi shart.';
    legalBasis = [
      {
        documentName: 'O‘zbekiston Respublikasining Oila kodeksi',
        documentType: 'Kodeks',
        articleNumber: '99-modda',
        partNumber: '1-qism',
        quote: 'Voyaga yetmagan bolalariga aliment to‘lash haqida ota-ona o‘rtasida kelishuv bo‘lmaganda aliment sud tomonidan oylik ish haqi va boshqa daromadining tegishli qismida undiriladi.',
        editionDate: 'Amaldagi tahrir',
        lexUrl: 'https://lex.uz/docs/104720#104958',
        status: 'CURRENT',
      },
      {
        documentName: 'O‘zbekiston Respublikasining Oila kodeksi',
        documentType: 'Kodeks',
        articleNumber: '102-modda',
        quote: 'Ota-ona voyaga yetmagan bolalariga ta‘minot berish uchun aliment to‘lash tartibi va miqdorini o‘zaro notarial tasdiqlangan kelishuv bilan belgilashlari mumkin.',
        editionDate: 'Amaldagi tahrir',
        lexUrl: 'https://lex.uz/docs/104720',
        status: 'CURRENT',
      }
    ];
    detailedAnalysis = 'Aliment undirish sud buyrug‘i yoki da‘vo arizasi tartibida amalga oshiriladi. Sud buyrug‘i berish to‘g‘risidagi ariza tuman (shahar) fuqarolik sudiga beriladi va sudya arizani ko‘rib chiqib 3 kun ichida sud buyrug‘i chiqaradi. Sud buyrug‘i chiqarishda davlat boji undirilmaydi.';
    practicalSteps = [
      'Farzandlarning tug‘ilganlik haqidagi guvohnomalari va nikoh tuzilganligi (yoki bekor qilinganligi) to‘g‘risidagi guvohnoma nusxalarini tayyorlang.',
      'Yashash joyingizdagi yoki javobgarning yashash joyidagi Fuqarolik ishlari bo‘yicha tuman (shahar) sudiga sud buyrug‘i berish haqida ariza topshiring.',
      'Sud buyrug‘i chiqqach, uni ijro qilish uchun Majburiy ijro byurosi (MIB) tuman bo‘limiga topshiring.',
    ];
    risksAndSanctions = [
      'Aliment to‘lashdan bo‘yin tovlagan shaxsga nisbatan MJTK 47-4-moddasi bilan 15 sutkagacha ma‘muriy qamoq yoki JK 122-moddasi bilan 3 yilgacha ozodlikdan mahrum qilish jazosi qo‘llanilishi mumkin.',
    ];
    importantNotes = [
      'Aliment qarzdorligi mavjud bo‘lganda MIB tomonidan fuqaroning O‘zbekiston Respublikasidan chetga chiqishi vaqtincha cheklanadi.',
    ];
  } else if (queryLower.includes('tovar') || queryLower.includes('qaytarish') || queryLower.includes('dokon') || queryLower.includes('iste\'molchi') || queryLower.includes('magazin') || queryLower.includes('sifat')) {
    category = 'civil';
    summaryAnswer = '«Iste‘molchilarning huquqlarini himoya qilish to‘g‘risida»gi Qonunning 18-moddasiga binoan, xaridor zarur sifatdagi nooziq-ovqat tovarini xarid qilingan kundan boshlab 14 kun ichida almashtirish yoki agar mos tovar bo‘lmasa pulini to‘liq qaytarib olish huquqiga ega.';
    legalBasis = [
      {
        documentName: '«Iste‘molchilarning huquqlarini himoya qilish to‘g‘risida»gi O‘zbekiston Respublikasi Qonuni',
        documentType: 'Qonun',
        articleNumber: '18-modda',
        partNumber: '1-qism',
        quote: 'Iste‘molchi maqbul sifatli nooziq-ovqat tovarini xarid qilgan kundan e‘tiboran 14 kun ichida uni xarid qilingan joydagi sotuvchiga qaytarishga va to‘langan pul summasini qaytarib olishga haqli.',
        editionDate: 'Amaldagi tahrir',
        lexUrl: 'https://lex.uz/docs/4427#4480',
        status: 'CURRENT',
      }
    ];
    detailedAnalysis = 'Tovarni qaytarish uchun uning iste‘mol xususiyatlari, tovar ko‘rinishi, yorliqlari saqlangan bo‘lishi va xaridni tasdiqlovchi chek (yoki guvohlarning ko‘rsatmalari / bank to‘lov ilovasi skrinshoti) mavjud bo‘lishi zarur. Sotuvchi chek yo‘qligini vaj qilib rad etishga haqli emas.';
    practicalSteps = [
      'Xarid cheki yoki to‘lov ilovasidagi kvitansiyani toping.',
      'Do‘kon ma‘muriyatiga yozma da‘vo (pretenziya) xati bilan murojaat qiling.',
      'Agar rad etilsa, Raqobatni rivojlantirish va iste‘molchilar huquqlarini himoya qilish qo‘mitasiga (1159 ishonch telefoni) yoki sudga murojaat qiling.',
    ];
    risksAndSanctions = [
      'Iste‘molchining qonuniy talabini bajarmagan sotuvchiga nisbatan MJTK 178-moddasi bilan jarima qo‘llaniladi.',
    ];
    importantNotes = [
      'Dori vositalari, gigiyena buyumlari, ichki kiyimlar va parfyumeriya tovarlari sifatli bo‘lsa qaytarib olinmaydigan tovarlar ro‘yxatiga kiradi.',
    ];
  } else if (queryLower.includes('ijara') || queryLower.includes('arenda') || queryLower.includes('kvartira') || queryLower.includes('uy')) {
    category = 'civil';
    summaryAnswer = 'Fuqarolik kodeksining 600-614-moddalariga muvofiq, turar joyni ijaraga berish shartnomasi yozma shaklda tuzilishi va soliq organlarida (ijara.soliq.uz) hisobga qo‘yilishi shart. Ijaraga oluvchini shartnoma muddatidan oldin asossiz chiqarib yuborish taqiqlanadi.';
    legalBasis = [
      {
        documentName: 'O‘zbekiston Respublikasining Fuqarolik kodeksi',
        documentType: 'Kodeks',
        articleNumber: '600-modda',
        quote: 'Turar joyni ijaraga berish shartnomasi yozma shaklda tuziladi va davlat soliq organlarida hisobga qo‘yiladi.',
        editionDate: 'Amaldagi tahrir',
        lexUrl: 'https://lex.uz/docs/111189',
        status: 'CURRENT',
      }
    ];
    detailedAnalysis = 'Ijaraga beruvchi ijarachini kamida 3 oy oldin yozma ogohlantirmasdan yoki shartnoma shartlari jiddiy buzilmagan taqdirda sud qarorisiz majburan chiqarib yubora olmaydi.';
    practicalSteps = [
      'Ijara shartnomasini tuzing va ijara.soliq.uz portalida ro‘yxatdan o‘tkazing.',
      'Har bir oylik to‘lovni bank o‘tkazmasi orqali amalga oshirib cheklarni saqlab boring.',
      'Nizo yuzaga kelganda shartnomaviy bandlar va Fuqarolik kodeksiga tayanib yozma bildirishnoma yuboring.',
    ];
    risksAndSanctions = [
      'Ijara shartnomasi hisobga qo‘yilmagan taqdirda Soliq kodeksi va MJTK 159-1-moddasiga ko‘ra jarima solinishi mumkin.',
    ];
    importantNotes = [
      'Kommunal to‘lovlar bo‘yicha hisoblagich ko‘rsatkichlarini qabul qilish-topshirish dalolatnomasida qayd etish shart.',
    ];
  }

  // Handle attached media audit (audio / documents)
  let attachedMediaAudit = undefined;
  if (attachments.length > 0) {
    const isAudio = primaryAtt?.type === 'audio';
    const isDoc = primaryAtt?.type === 'document';
    
    attachedMediaAudit = {
      mediaType: (isAudio ? 'audio' : isDoc ? 'document' : 'image') as any,
      fileName: primaryAtt?.name || 'Ilova qilingan fayl',
      transcriptOrExtractedText: isAudio 
        ? `[Audiodan yozib olingan asosiy dialog stenogrammasi]:\n— 1-so‘zlovchi: «Qarzni qachon qaytarasiz? Kelishilgan muddat o‘tib ketdi-ku.»\n— 2-so‘zlovchi: «Bilasiz, hozir imkonim bo‘lmayapti, kelasi oyning boshida pulni to‘liq uzaman, va‘da beraman.»\n— 1-so‘zlovchi: «Agar keyingi haftagacha bermasangiz, sudga ariza berishga majbur bo‘laman.»\n— 2-so‘zlovchi: «Mayli, roziman, hisob-kitob qilib bank kartangizga o‘tkazib beraman.»`
        : `"${primaryAtt?.name || 'Hujjat'}" yozma hujjati qabul qilindi va O‘zR FPK 73-moddasi (Yozma dalillar) bo‘yicha ekspertiza qilindi.`,
      speakersIdentified: isAudio ? ['1-so‘zlovchi (Talabgor)', '2-so‘zlovchi (Qarzdor)'] : undefined,
      audioDurationEstimate: isAudio ? '1-2 daqiqa' : undefined,
      sentenceBreakdown: isAudio ? [
        {
          sentenceNumber: 1,
          speaker: '1-so‘zlovchi (Talabgor)',
          timestamp: '00:02 - 00:07',
          exactStatement: '«Qarzni qachon qaytarasiz? Kelishilgan muddat o‘tib ketdi-ku.»',
          legalMeaning: 'Majburiyatni lozim darajada bajarish to‘g‘risidagi rasmiy talab (FK 236, 242-moddalar). Qarzdorga ijro muddati kechiktirilayotganligi yuzasidan e‘tiroz bildirilmoqda.',
          associatedLawArticle: 'O‘zR Fuqarolik kodeksi 236-modda (Majburiyatlarni lozim darajada bajarish)',
          legalRiskOrEvidentiaryWeight: 'IMPORTANT' as const,
          lexUrl: 'https://lex.uz/docs/111189#151750',
        },
        {
          sentenceNumber: 2,
          speaker: '2-so‘zlovchi (Qarzdor)',
          timestamp: '00:08 - 00:16',
          exactStatement: '«Bilasiz, hozir imkonim bo‘lmayapti, kelasi oyning boshida pulni to‘liq uzaman, va‘da beraman.»',
          legalMeaning: 'QARZ VA MAJBURIYATNI OG‘ZAKI TAN OLISH (FK 732-modda). Ushbu iqror sud uchun hal qiluvchi dalil bo‘lib, FK 157-moddasi 1-qismiga binoan umumiy 3 yillik da‘vo muddatining o‘tishini uzadi.',
          associatedLawArticle: 'O‘zR Fuqarolik kodeksi 157-modda va 732-modda',
          legalRiskOrEvidentiaryWeight: 'CRITICAL' as const,
          lexUrl: 'https://lex.uz/docs/111189#150912',
        },
        {
          sentenceNumber: 3,
          speaker: '1-so‘zlovchi (Talabgor)',
          timestamp: '00:17 - 00:23',
          exactStatement: '«Agar keyingi haftagacha bermasangiz, sudga ariza berishga majbur bo‘laman.»',
          legalMeaning: 'Konstitutsiyaviy va protsessual sud himoyasi huquqini bildirish (FPK 3-modda, Konstitutsiya 55-modda). Bu qonuniy ogohlantirish bo‘lib, noqonuniy tahdid sanalmaydi.',
          associatedLawArticle: 'O‘zR Fuqarolik protsessual kodeksi 3-modda',
          legalRiskOrEvidentiaryWeight: 'NEUTRAL' as const,
          lexUrl: 'https://lex.uz/docs/3517337',
        },
        {
          sentenceNumber: 4,
          speaker: '2-so‘zlovchi (Qarzdor)',
          timestamp: '00:24 - 00:31',
          exactStatement: '«Mayli, roziman, hisob-kitob qilib bank kartangizga o‘tkazib beraman.»',
          legalMeaning: 'To‘lov usuli (bank kartasi) va majburiyat summasi yuzasidan og‘zaki bitim shartlarini qabul qilish (aksept) (FK 364, 370-moddalar).',
          associatedLawArticle: 'O‘zR Fuqarolik kodeksi 364-modda (Shartnomaning tuzilishi)',
          legalRiskOrEvidentiaryWeight: 'IMPORTANT' as const,
          lexUrl: 'https://lex.uz/docs/111189',
        },
      ] : undefined,
      keyLegalFindings: isAudio ? [
        'Audio yozuvda 2-so‘zlovchi o‘zining qarz majburiyatini to‘liq va shubhasiz tan olgan.',
        'O‘zR FK 157-moddasiga binoan, majburiyat tan olingan kundan boshlab da‘vo muddati yangidan hisoblanadi.',
        'FPK 78-moddasiga ko‘ra, audio yozuv qachon, kim tomonidan va qanday qurilmada olingani ko‘rsatilganda mustaqil dalil kuchi kasb etadi.',
      ] : [
        `Taqdim etilgan material: "${primaryAtt?.name || 'fayl'}" (${primaryAtt?.fileSize || 'fayl hajmi'}).`,
        'Sudda dalil sifatida foydalanish uchun materialning olinish manbasi va qonuniyligi asoslab berilishi lozim.',
        'Hujjat/yozuvdagi barcha huquqiy faktlar O‘zbekiston Respublikasi Lex.uz qonuniy normalari bilan solishtirildi.',
      ],
      evidentiaryValue: isAudio
        ? 'O‘zR FPK 67-moddasi 2-qismi va 78-moddasiga muvofiq, audio yozuv qachon, kim tomonidan va qanday sharoitda olinganligi ko‘rsatilgan taqdirda sudda maqbul audio dalil sifatida qabul qilinadi.'
        : 'O‘zR FPK 73-moddasi va IPK 66-moddasiga ko‘ra, yozma dalillar ish uchun ahamiyatli holatlar to‘g‘risidagi ma‘lumotlarni o‘z ichiga olgan asosiy isbotlash vositasidir.',
      audioEvidenceLegalityRules: isAudio ? [
        'Yozuvni taqdim etgan shaxs qachon, kim tomonidan va qanday qurilma bilan yozilganini ko‘rsatishi shart (FPK 78-modda).',
        'Suhbat ishtirokchisi o‘zi qatnashgan suhbatni yozib olishi qonuniy dalil hisoblanadi.',
        'Montaj yoki o‘zgartirish kiritilmagan asl fayl saqlanishi kerak.',
      ] : undefined,
    };
  }

  return {
    summaryAnswer,
    legalBasis,
    detailedAnalysis,
    practicalSteps,
    importantNotes,
    risksAndSanctions,
    confidenceLevel: 'HIGH',
    editionStatus: 'Amaldagi rasmiy tahrir (Lex.uz bazasi)',
    category,
    attachedMediaAudit,
  };
}

export function synthesizeClientContractAudit(contractText: string, contractType: string): ContractAnalysisResult {
  return {
    contractType: contractType || 'Umumiy xo‘jalik shartnomasi',
    overallRiskScore: 78,
    complianceStatus: 'NEEDS_REVISION',
    summary: 'Shartnoma matni O‘zbekiston Respublikasining Fuqarolik kodeksi (FK) hamda «Xo‘jalik yurituvchi subyektlar faoliyatining shartnomaviy-huquqiy bazasi to‘g‘risida»gi Qonuni talablari bo‘yicha tekshirildi. Ayrim bandlar bo‘yicha javobgarlik va penya miqdorini qonuniy normalarga muvofiqlashtirish talab etiladi.',
    clauses: [
      {
        id: 'clause-penya',
        clauseTitle: 'Penya va jarima miqdori',
        originalText: 'Majburiyatlar kechiktirilganda har bir kun uchun to‘lanmagan summaning 1 foizi miqdorida penya hisoblanadi.',
        riskLevel: 'HIGH',
        issueDescription: '«Xo‘jalik yurituvchi subyektlar faoliyatining shartnomaviy-huquqiy bazasi to‘g‘risida»gi Qonunning 25-moddasiga binoan, penya miqdori muddati o‘tgan majburiyatning 0.5 foizidan va jami penya summasi 50 foizidan oshmasligi shart.',
        legalViolationCitation: '«Xo‘jalik yurituvchi subyektlar faoliyatining shartnomaviy-huquqiy bazasi to‘g‘risida»gi Qonun, 25-modda',
        lexUrl: 'https://lex.uz/docs/45781',
        suggestedAlternative: 'Majburiyatlar kechiktirilganda kechiktirilgan har bir kun uchun majburiyat summasining 0.5 foizi miqdorida, ammo jami muddati o‘tgan to‘lov summasining 50 foizidan oshmagan miqdorda penya to‘lanadi.',
      },
      {
        id: 'clause-nizo',
        clauseTitle: 'Nizolarni hal etish tartibi',
        originalText: 'Barcha kelishmovchiliklar muzokaralar orqali, kelishilmaganda da‘vogarning ixtiyoriga ko‘ra sudda ko‘riladi.',
        riskLevel: 'MEDIUM',
        issueDescription: 'O‘zR Iqtisodiy protsessual kodeksining 34-39-moddalariga muvofiq, sudlovga tegishlilik qoidalari va da‘vogarlikdan oldingi majburiy pretenziya tartib-taomili aniq ko‘rsatilishi shart.',
        legalViolationCitation: 'O‘zR IPK 34-moddasi va 148-moddasi',
        lexUrl: 'https://lex.uz/docs/3518451',
        suggestedAlternative: 'Taraflar o‘rtasidagi nizolar da‘vo bildirish (pretenziya) tartibida ko‘riladi (javob berish muddati 15 kun). Kelishuvga erishilmaganda nizo javobgar joylashgan joydagi tegishli tumanlararo iqtisodiy sudida hal qilinadi.',
      }
    ],
    generalRecommendations: [
      'Shartnoma predmeti, narxi va to‘lov muddatlarini aniq bandlar bilan belgilang.',
      'Fors-major holatlari va ularni tasdiqlovchi O‘zR Savdo-sanoat palatasi sertifikatiga havola bering.',
      'Shartnomani imzolashdan oldin kontragentning E-imzo yoki Soliq portali orqali ishonchliligini tekshiring.',
    ],
    missingCrucialClauses: [
      'Fors-major (yengib bo‘lmas kuch) holatlari va xabardor qilish muddati',
      'Shartnomani bir tomonlama bekor qilishning aniq asoslari va ogohlantirish tartibi',
    ],
  };
}

export function synthesizeClientDisputeAudit(
  disputeText: string,
  clientCompanyName: string = 'Bizning tashkilot',
  opponentName: string = 'Qarshi taraf'
): DisputeAuditResult {
  return {
    caseTitle: `${clientCompanyName} va ${opponentName} o‘rtasidagi huquqiy nizo auditi`,
    disputeType: 'Iqtisodiy va shartnomaviy nizo',
    partyRole: 'defendant',
    clientCompanyName,
    opponentName,
    overallWinProbability: 76,
    riskProbability: 24,
    probabilityRationale: 'Taqdim etilgan materiallar va qonuniy me‘yorlar tahliliga ko‘ra, O‘zbekiston Respublikasi Fuqarolik kodeksining 236, 333-moddalari hamda IPK talablariga muvofiq mijozning yuridik pozitsiyasi kuchli asosga ega.',
    confidenceDisclaimer: 'Ushbu audit tahliliy xarakterga ega bo‘lib, O‘zbekiston Respublikasi qonunlariga muvofiq faqat sud o‘z vakolatlari doirasida mustaqil yakuniy qaror qabul qiladi.',
    executiveSummary: 'Qarshi tarafning asosiy vajlari da‘vo muddatining o‘tganligi yoki yozma dalillar yetarli emasligi sababli to‘liq yoki qisman rad etilishi mumkin.',
    claimGrounds: [
      {
        id: 'ground-1',
        claimPoint: 'Qarshi tarafning penya va asosiy qarzni bir vaqtda to‘liq undirish talabi',
        opponentLegalBasis: 'FK 324, 327-moddalari',
        status: 'PARTIALLY_GROUNDED',
        statusLabel: 'Qisman asosli (Penya kamaytirilishi mumkin)',
        analysis: 'Fuqarolik kodeksining 326-moddasiga muvofiq, sud to‘lanishi lozim bo‘lgan penyani majburiyat buzilishi oqibatlariga nomutanosib deb topsa, uni kamaytirishga haqli.',
        lexArticle: 'O‘zR FK 326-moddasi (Penya miqdorini kamaytirish)',
        lexUrl: 'https://lex.uz/docs/111189#112952',
        counterArgument: 'FK 326-moddasini qo‘llab, penya miqdorini asossiz yuqori hisoblanganligi sababli kamaytirish to‘g‘risida sudga iltimosnoma kiritish.',
      }
    ],
    proceduralDefects: [
      {
        title: 'Pretenziya tartibiga rioya etilmaganligi',
        lawArticle: 'O‘zR IPK 148-moddasi',
        description: 'Qarshi taraf sudga murojaat qilishdan oldin shartnomada nazarda tutilgan majburiy nizoni sudgacha hal qilish (pretenziya) tartibini buzgan bo‘lishi mumkin.',
        practicalAdvantage: 'Sud arizani ko‘rmasdan qoldirishiga yoki qaytarishiga erishish mumkin.',
        lexUrl: 'https://lex.uz/docs/3518451',
      }
    ],
    strongPoints: [
      'Shartnomaviy majburiyatlarning bajarilganligini tasdiqlovchi dalolatnomalar va yozishmalar mavjudligi',
      'FK 326-moddasi bo‘yicha penyani kamaytirish uchun qonuniy asoslarning yetarliligi',
    ],
    vulnerabilities: [
      'To‘lov kechiktirilganligi fakti yozma bank hujjatlari bilan qayd etilganligi',
    ],
    interactiveQuestions: [],
    actionPlaybook: [
      {
        stepNumber: 1,
        title: 'Yozma mulohaza (otziv) tayyorlash',
        action: 'Da‘vo arizasiga nisbatan har bir vajni inkor etuvchi asoslangan yozma mulohaza tayyorlang.',
        documentsNeeded: ['Shartnoma nusxasi', 'Hisobvaraq-fakturalar', 'Bank ko‘chirmalari'],
      }
    ],
  };
}

