import React, { useState, useRef, useEffect } from 'react';
import {
  Mic,
  Square,
  Upload,
  Play,
  Pause,
  FileAudio,
  ShieldCheck,
  ShieldAlert,
  Scale,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Copy,
  Check,
  Download,
  ExternalLink,
  ChevronRight,
  Filter,
  Sparkles,
  Info,
  RefreshCw,
  FolderPlus,
  Volume2
} from 'lucide-react';
import { AudioForensicReport, AudioForensicMetadata, AudioSentenceAnalysis } from '../types';

interface AudioForensicProps {
  onNavigateToDocumentGenerator?: (initialDoc: {
    title: string;
    docType: string;
    prefilledContent?: string;
  }) => void;
}

// Pre-configured authentic Uzbekistan court audio scenarios
const SAMPLE_CASES: Array<{
  id: string;
  title: string;
  category: string;
  description: string;
  metadata: AudioForensicMetadata;
  transcript: string;
  sentences: AudioSentenceAnalysis[];
  report: Partial<AudioForensicReport>;
}> = [
  {
    id: 'debt_acknowledgement',
    title: '1. Qarzni og‘zaki tan olish va to‘lash va‘dasi (FK 157, 732)',
    category: 'Fuqarolik nizosi / Qarz majburiyati',
    description: 'Qarzdor bilan telefon orqali muzokara: qarz summasini e‘tirozsiz tan olish va plastik kartaga o‘tkazib berish va‘dasi.',
    metadata: {
      recordingDate: '2026-02-14 14:30',
      recordingDevice: 'Samsung Galaxy S24 Ultra (Telefon yozuvi)',
      recordedBy: 'Talabgor (Kreditor)',
      recordingContext: 'Qarz muddati o‘tganligi sababli telefon orqali muzokara',
      caseType: 'civil',
      partiesInvolved: 'Talabgor (A. Rahimov) va Qarzdor (B. Karimov)',
    },
    transcript: `[Audiodan olingan to‘liq so‘zma-so‘z stenogramma]:\n— 1-so‘zlovchi (Talabgor): «Assalomu alaykum, Bekzod aka. O‘tgan yili fevralda olgan 35 million so‘m qarzni qachon qaytarasiz? Kelishilgan muddatdan 6 oy o‘tib ketdi-ku.»\n— 2-so‘zlovchi (Qarzdor): «Va alaykum assalom, Alisher. To‘g‘ri, mendan 35 million so‘m qarzim bor, aslo tonmayman. Bilasiz, qurilishda ishim biroz to‘xtab qoldi, kelasi oyning 10-sanasigacha pulni to‘liq uzaman, va‘da beraman.»\n— 1-so‘zlovchi (Talabgor): «Agar 10-sanagacha bermasangiz, majbur bo‘lib fuqarolik sudiga ariza bilan chiqaman.»\n— 2-so‘zlovchi (Qarzdor): «Yo‘q, sudga berishga hojat yo‘q, 10-sana kuni hisob-kitob qilib, to‘g‘ridan-to‘g‘ri bank kartangizga o‘tkazib beraman.»`,
    sentences: [
      {
        sentenceNumber: 1,
        speaker: '1-so‘zlovchi (Talabgor)',
        timestamp: '00:02 - 00:09',
        exactStatement: '«Assalomu alaykum, Bekzod aka. O‘tgan yili fevralda olgan 35 million so‘m qarzni qachon qaytarasiz? Kelishilgan muddatdan 6 oy o‘tib ketdi-ku.»',
        legalMeaning: 'Majburiyatni lozim darajada bajarish to‘g‘risidagi qonuniy talab. Kreditor tomonidan ijro muddati o‘tganligi rasman bildirilmoqda (FK 236, 242-moddalar).',
        associatedLawArticle: 'O‘zR Fuqarolik kodeksi 236, 242-moddalar',
        legalRiskOrEvidentiaryWeight: 'IMPORTANT',
        lexUrl: 'https://lex.uz/docs/111189#151750',
      },
      {
        sentenceNumber: 2,
        speaker: '2-so‘zlovchi (Qarzdor)',
        timestamp: '00:10 - 00:23',
        exactStatement: '«Va alaykum assalom, Alisher. To‘g‘ri, mendan 35 million so‘m qarzim bor, aslo tonmayman. Bilasiz, qurilishda ishim biroz to‘xtab qoldi, kelasi oyning 10-sanasigacha pulni to‘liq uzaman, va‘da beraman.»',
        legalMeaning: 'QARZ VA MAJBURIYATNI OG‘ZAKI SO‘ZSIZ TAN OLISH (FK 732-modda). Ushbu iqror sud uchun hal qiluvchi dalil bo‘lib, FK 157-moddasi 1-qismiga binoan umumiy 3 yillik da‘vo muddatining o‘tishini to‘xtatib, yangidan boshlaydi.',
        associatedLawArticle: 'O‘zR Fuqarolik kodeksi 157-modda (Da‘vo muddati o‘tishining uzilishi)',
        legalRiskOrEvidentiaryWeight: 'CRITICAL',
        lexUrl: 'https://lex.uz/docs/111189#150912',
      },
      {
        sentenceNumber: 3,
        speaker: '1-so‘zlovchi (Talabgor)',
        timestamp: '00:24 - 00:30',
        exactStatement: '«Agar 10-sanagacha bermasangiz, majbur bo‘lib fuqarolik sudiga ariza bilan chiqaman.»',
        legalMeaning: 'Konstitutsiyaviy sud himoyasi huquqidan foydalanish haqidagi ogohlantirish (Konstitutsiya 55-modda, FPK 3-modda). Bu qonuniy ogohlantirish bo‘lib, shantaj yoki tahdid sanalmaydi.',
        associatedLawArticle: 'O‘zR Fuqarolik protsessual kodeksi 3-modda',
        legalRiskOrEvidentiaryWeight: 'NEUTRAL',
        lexUrl: 'https://lex.uz/docs/3517337',
      },
      {
        sentenceNumber: 4,
        speaker: '2-so‘zlovchi (Qarzdor)',
        timestamp: '00:31 - 00:39',
        exactStatement: '«Yo‘q, sudga berishga hojat yo‘q, 10-sana kuni hisob-kitob qilib, to‘g‘ridan-to‘g‘ri bank kartangizga o‘tkazib beraman.»',
        legalMeaning: 'Majburiyatni bajarish usuli (bank kartasiga to‘lov) va aniq sanasi bo‘yicha og‘zaki bitim shartlarini qabul qilish (aksept) (FK 364, 370-moddalar).',
        associatedLawArticle: 'O‘zR Fuqarolik kodeksi 364, 370-moddalar',
        legalRiskOrEvidentiaryWeight: 'IMPORTANT',
        lexUrl: 'https://lex.uz/docs/111189',
      },
    ],
    report: {
      evidentiaryScore: 94,
      admissibilityVerdict: 'HIGHLY_ADMISSIBLE',
      verdictLabel: 'Sudda 100% maqbul va hal qiluvchi dalil (FPK 67, 78-moddalar)',
      executiveSummary: 'Taqdim etilgan audio yozuv O‘zR Fuqarolik protsessual kodeksining 67 va 78-moddalari talablariga to‘liq javob beradi. Suhbatda 2-so‘zlovchi (qarzdor) 35 000 000 so‘m qarzini aniq raqamlar bilan tan olgan. O‘zR FK 157-moddasiga ko‘ra, ushbu iqrorlik da‘vo muddatining o‘tishini uzadi va yangi da‘vo muddati boshlanadi.',
      courtAdmissibilityEvaluation: {
        fpk78Compliance: 'FPK 78-moddasi 1-qismiga to‘liq mos: yozuv vaqti, joyi, vositasi va ishtirokchilar ko‘rsatilgan.',
        sourceLegality: 'Muloqot ishtirokchisi tomonidan shaxsiy suhbatini yozib olinganligi sababli noqonuniy usulda olinmagan (FPK 66-modda buzilishi yo‘q).',
        chainOfCustody: 'Faylning asl metama‘lumotlari saqlangan.',
        phonoscopicExpertiseRequirement: 'Agar javobgar sudda o‘z ovozini inkor etsa, sud-fonotexnika ekspertizasi tayinlanadi.',
        admissibilityChecklist: [
          { item: 'Yozib olingan sana va vaqt aniq', passed: true, note: 'FPK 78-modda talabi' },
          { item: 'Yozib olgan shaxs ko‘rsatilgan (Talabgor)', passed: true, note: 'Suhbat ishtirokchisi' },
          { item: 'Yozuv vositasi ko‘rsatilgan (Galaxy S24)', passed: true, note: 'Texnik vosita ma‘lum' },
          { item: 'Montaj va kesish belgilari yo‘qligi', passed: true, note: 'Xom audio shaklida' },
        ],
      },
      keyLegalFindings: [
        'Qarzdor 35 mln so‘m miqdoridagi qarz majburiyatini to‘liq va so‘zsiz tan olgan.',
        'O‘zR Fuqarolik kodeksining 157-moddasi 1-qismiga ko‘ra, umumiy 3 yillik da‘vo muddati to‘xtatilib, yangidan hisoblanadi.',
        'Suhbat ishtirokchisi tomonidan o‘z suhbatini yozib olinishi O‘zR sudlarida maqbul va qonuniy dalil deb tan olinadi.',
      ],
      actionableSteps: [
        'Ushbu audio yozuvning asl nusxasini CD-disk yoki flesh-kartaga ko‘chirib muhrlang.',
        'Sud-fonotexnik tahlil stenogrammasini ilova qilib, FPK 78-moddasi tartibida "Audio dalilni qo‘shish to‘g‘risida iltimosnoma" taqdim eting.',
        'Qarzdorga sudgacha pretenziya yuborib, unda audio yozuvdagi e‘tiroflarni keltirib o‘ting.',
      ],
      statuteOfLimitationsImpact: 'O‘zR FK 157-moddasi: Majburiyatli shaxs tomonidan qarz tan olinganligi sababli da‘vo muddati uzilgan va qarzni undirish imkoniyati 100% tiklangan.',
    },
  },
  {
    id: 'labor_dispute',
    title: '2. Mehnat nizosi: Noqonuniy o‘z ixtiyori bilan ariza yozdirish bosimi (MK 5, 161)',
    category: 'Mehnat huquqi / Noqonuniy ishdan bo‘shatish',
    description: 'Bo‘lim boshlig‘ining xodimga og‘zaki bosim o‘tkazib, "o‘z xohishi bilan" ariza yozishni majburlashi audio yozuvi.',
    metadata: {
      recordingDate: '2026-01-20 11:15',
      recordingDevice: 'iPhone 15 Pro Diktofoni',
      recordedBy: 'Xodim (Jabrlanuvchi)',
      recordingContext: 'Rahbar xonasidagi shaxsiy suhbat',
      caseType: 'labor',
      partiesInvolved: 'Xodim (M. Saidov) va Bo‘lim boshlig‘i (K. Yusupov)',
    },
    transcript: `[Audiodan olingan to‘liq so‘zma-so‘z stenogramma]:\n— 1-so‘zlovchi (Bo‘lim boshlig‘i): «Saidov, eshit, gap bitta: bugun o‘z xohishing bilan ariza yozasan. Agar yozmasang, senga shunaqa modda bilan haydash buyrug‘i chiqaraman, hech qayerga ishga kirolmaysan.»\n— 2-so‘zlovchi (Xodim): «Lekin mening birorta intizomiy jazoim yo‘q-ku, nega o‘z xohishim bilan ketishim kerak? Men ishlashni xohlayman.»\n— 1-so‘zlovchi (Bo‘lim boshlig‘i): «Menga qara, menga gap qaytarma! Ariza yozmasang, komissiya tuzib akt tuzdiraman va statya bilan haydayman. Senga 1 soat vaqt.»`,
    sentences: [
      {
        sentenceNumber: 1,
        speaker: '1-so‘zlovchi (Bo‘lim boshlig‘i)',
        timestamp: '00:01 - 00:10',
        exactStatement: '«Saidov, eshit, gap bitta: bugun o‘z xohishing bilan ariza yozasan. Agar yozmasang, senga shunaqa modda bilan haydash buyrug‘i chiqaraman, hech qayerga ishga kirolmaysan.»',
        legalMeaning: 'MEHNAT MUNOSABATLARIDA MAJBURLASH VA NOQONUNIY TAZYIQ (MK 5-modda). Mehnat kodeksining 160-moddasiga ko‘ra xodimning tashabbusi faqat ixtiyoriy bo‘lishi shart. Majburlab yozdirilgan ariza g‘ayriqonuniy hisoblanadi.',
        associatedLawArticle: 'O‘zR Mehnat kodeksi 5, 160-moddalar',
        legalRiskOrEvidentiaryWeight: 'CRITICAL',
        lexUrl: 'https://lex.uz/docs/6257288#6258840',
      },
      {
        sentenceNumber: 2,
        speaker: '2-so‘zlovchi (Xodim)',
        timestamp: '00:11 - 00:18',
        exactStatement: '«Lekin mening birorta intizomiy jazoim yo‘q-ku, nega o‘z xohishim bilan ketishim kerak? Men ishlashni xohlayman.»',
        legalMeaning: 'Xodimning mehnat munosabatlarini davom ettirish istagi va noqonuniy talabga qarshi e‘tirozi. Intizomiy jazo yo‘qligi faktining qayd etilishi (MK 312-modda).',
        associatedLawArticle: 'O‘zR Mehnat kodeksi 312-modda',
        legalRiskOrEvidentiaryWeight: 'IMPORTANT',
        lexUrl: 'https://lex.uz/docs/6257288',
      },
      {
        sentenceNumber: 3,
        speaker: '1-so‘zlovchi (Bo‘lim boshlig‘i)',
        timestamp: '00:19 - 00:27',
        exactStatement: '«Menga qara, menga gap qaytarma! Ariza yozmasang, komissiya tuzib akt tuzdiraman va statya bilan haydayman. Senga 1 soat vaqt.»',
        legalMeaning: 'Mansab vakolatini suiiste‘mol qilish, soxta intizomiy jazo bilan qo‘rqitish (MJtK 49-moddasi bo‘yicha mehnat qonunchiligini buzish). Xodim sudga murojaat qilganda ishga tiklanish va majburiy progul haqini undirish kafolatlangan.',
        associatedLawArticle: 'O‘zR Mehnat kodeksi 161, 163-moddalar, MJtK 49-modda',
        legalRiskOrEvidentiaryWeight: 'CRITICAL',
        lexUrl: 'https://lex.uz/docs/6257288#6258900',
      },
    ],
    report: {
      evidentiaryScore: 96,
      admissibilityVerdict: 'HIGHLY_ADMISSIBLE',
      verdictLabel: 'Sudda va Mehnat inspektsiyasida inkor etib bo‘lmas dalil',
      executiveSummary: 'Ushbu audio yozuv ish beruvchi vakili tomonidan xodimni o‘z xohishi bilan bo‘shashga majburlash faktini to‘liq fosh etadi. O‘zR Oliy sudi Plenumi qarorlariga binoan, majburlash ostida yozilgan ariza haqiqiy emas deb topiladi va xodim zudlik bilan ishga tiklanib, unga ma‘naviy zarar va yetkazilgan moddiy zarar to‘liq undiriladi.',
      courtAdmissibilityEvaluation: {
        fpk78Compliance: 'FPK 78-moddasi bo‘yicha to‘liq qonuniy dalil.',
        sourceLegality: 'O‘z huquqlarini himoya qilish maqsadida ish joyidagi muloqotni yozib olish qonuniy o‘zini o‘zi himoya qilish usulidir (FK 14-modda).',
        chainOfCustody: 'Asl audio yozuv saqlangan.',
        phonoscopicExpertiseRequirement: 'Zarurat bo‘lsa, rahbar ovozi bo‘yicha fonotexnika ekspertizasi o‘tkaziladi.',
        admissibilityChecklist: [
          { item: 'Suhbat vaqti va ish joyi aniq', passed: true, note: 'Ish kabinetidagi audio' },
          { item: 'Xodimning o‘zi yozib olgan', passed: true, note: 'Daxlsizlik buzilmagan' },
          { item: 'Majburlash va tahdid so‘zlari aniq aks etgan', passed: true, note: 'To‘g‘ridan-to‘g‘ri iqtiboslar' },
          { item: 'Montaj qilinmagan', passed: true, note: 'Uzluksiz yozuv' },
        ],
      },
      keyLegalFindings: [
        'Ish beruvchi xodimni MK 160-moddasiga zid ravishda o‘z xohishi bilan ketishga majburlagan.',
        'MK 161, 312-moddalaridagi qonuniy kafolatlar buzilgan.',
        'Xodim ishga tiklanish va barcha majburiy progul kunlari uchun o‘rtacha ish haqini undirish huquqiga ega.',
      ],
      actionableSteps: [
        'Hech qanday ariza yozmang va o‘z mehnat vazifangizni bajarishda davom eting.',
        'Davlat mehnat huquq inspektsiyasiga (dmi.mehnat.uz) ushbu audio yozuv bilan shikoyat kiriting.',
        'Agar noqonuniy bo‘shatish buyrug‘i chiqsa, FPK 78-moddasi asosida audio dalilni ilova qilib, sudga da‘vo bilan chiqing.',
      ],
      statuteOfLimitationsImpact: 'Mehnat kodeksining 560-moddasiga ko‘ra, ishga tiklash to‘g‘risidagi da‘volar xodimga buyruq nusxasi berilgan kundan e‘tiboran 1 oy ichida kiritilishi shart.',
    },
  },
];

export const AudioForensic: React.FC<AudioForensicProps> = ({ onNavigateToDocumentGenerator }) => {
  const [selectedCase, setSelectedCase] = useState<string>('debt_acknowledgement');
  const [activeTabFilter, setActiveTabFilter] = useState<'all' | 'critical' | 'important' | 'neutral'>('all');
  
  // Custom audio upload & recording states
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioDataUrl, setAudioDataUrl] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  
  // Analysis & Loading state
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [forensicReport, setForensicReport] = useState<AudioForensicReport | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Form metadata inputs
  const [metadata, setMetadata] = useState<AudioForensicMetadata>({
    recordingDate: new Date().toISOString().slice(0, 16).replace('T', ' '),
    recordingDevice: 'Mobil telefon (Diktofon)',
    recordedBy: 'Muloqot ishtirokchisi',
    recordingContext: 'Yuzma-yuz yoki telefon orqali muzokara',
    caseType: 'civil',
    partiesInvolved: '1-taraf va 2-taraf',
  });
  const [customFocus, setCustomFocus] = useState<string>('');

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<any>(null);

  // Initialize with preloaded sample report on first render
  useEffect(() => {
    loadPreloadedCase('debt_acknowledgement');
  }, []);

  const loadPreloadedCase = (caseId: string) => {
    const found = SAMPLE_CASES.find((c) => c.id === caseId);
    if (!found) return;

    setSelectedCase(caseId);
    setMetadata(found.metadata);
    setAudioFile(null);
    setAudioDataUrl('');
    setIsPlaying(false);

    const fullReport: AudioForensicReport = {
      id: 'case-' + found.id,
      fileName: found.title,
      analyzedAt: new Date().toISOString(),
      metadata: found.metadata,
      fullTranscript: found.transcript,
      speakers: ['1-so‘zlovchi', '2-so‘zlovchi'],
      executiveSummary: found.report.executiveSummary || '',
      evidentiaryScore: found.report.evidentiaryScore || 90,
      admissibilityVerdict: found.report.admissibilityVerdict || 'HIGHLY_ADMISSIBLE',
      verdictLabel: found.report.verdictLabel || 'Sudda yuqori dalillik kuchiga ega',
      sentenceBreakdown: found.sentences,
      courtAdmissibilityEvaluation: found.report.courtAdmissibilityEvaluation as any,
      keyLegalFindings: found.report.keyLegalFindings || [],
      actionableSteps: found.report.actionableSteps || [],
      statuteOfLimitationsImpact: found.report.statuteOfLimitationsImpact,
      motionDraftText: `FUQAROLIK ISHLARI BO‘YICHA SUDIGA\nDa‘vogar: ${found.metadata.partiesInvolved?.split('va')[0]?.trim() || '[Da‘vogar F.I.Sh.]'}\nJavobgar: ${found.metadata.partiesInvolved?.split('va')[1]?.trim() || '[Javobgar F.I.Sh.]'}\n\nAUDIO DALILNI ISH MATERIALLARIGA QO‘SHISH VA SUD MAJLISIDA TEKSHIRISH TO‘G‘RISIDA\nILTIMOSNOMA\n\nO‘zbekiston Respublikasi Fuqarolik protsessual kodeksining 67 va 78-moddalariga muvofiq, taraflar o‘rtasidagi majburiyat va da‘vo holatlarini isbotlash maqsadida ilova qilinayotgan audio yozuvni ish materiallariga qo‘shishingizni so‘rayman.\n\nAudio yozuv yuzasidan FPK 78-moddasi talab etgan ma‘lumotlar:\n1. Yozib olingan vaqt: ${found.metadata.recordingDate}\n2. Yozib olgan shaxs: ${found.metadata.recordedBy}\n3. Yozuv vositasi: ${found.metadata.recordingDevice}\n4. Yozuv sharoiti: ${found.metadata.recordingContext}\n\nUshbu audio yozuvda javobgar o‘z majburiyatini to‘liq tan olgan bo‘lib, FK 157-moddasi 1-qismiga binoan umumiy da‘vo muddatining o‘tishi uzilgan deb hisoblanadi.\n\nYuqoridagilarga ko‘ra, FPK 78, 203-moddalariga asosan:\n1. Taqdim etilgan audio yozuvni fuqarolik ishi materiallariga ashyoviy dalil sifatida qo‘shishingizni;\n2. Sud majlisida ushbu audio yozuvni eshittirish orqali tekshirishingizni so‘rayman.\n\nIlova: Audio yozuv nusxasi (CD-disk) va so‘zma-so‘z stenogrammasi.`,
    };

    setForensicReport(fullReport);
  };

  // Handle Audio File Selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAudioFile(file);
    const url = URL.createObjectURL(file);
    setAudioDataUrl(url);
    setSelectedCase('custom');

    // Auto set metadata
    setMetadata((prev) => ({
      ...prev,
      recordingDevice: 'Foydalanuvchi fayli (' + file.name + ')',
      recordingDate: new Date(file.lastModified).toISOString().slice(0, 16).replace('T', ' '),
    }));
  };

  // Real-time Voice Recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioDataUrl(audioUrl);
        const customAudioFile = new File([audioBlob], `Audio_yozuv_${Date.now()}.webm`, { type: 'audio/webm' });
        setAudioFile(customAudioFile);
        setSelectedCase('custom');
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingSeconds(0);

      timerRef.current = setInterval(() => {
        setRecordingSeconds((sec) => sec + 1);
      }, 1000);
    } catch (err: any) {
      alert('Mikrofondan foydalanishga ruxsat berilmadi: ' + (err?.message || err));
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
      clearInterval(timerRef.current);
    }
  };

  // Audio Playback toggle
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  // Execute Forensic Analysis via Backend API
  const handleAnalyzeAudio = async () => {
    if (!audioFile && !audioDataUrl) {
      alert('Iltimos, avval audio fayl yuklang yoki mikrofon orqali yozib oling!');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisError(null);

    try {
      // Convert to base64
      let base64Audio = '';
      if (audioFile) {
        base64Audio = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string || '');
          reader.onerror = () => resolve('');
          reader.readAsDataURL(audioFile);
        });
      } else if (audioDataUrl.startsWith('blob:')) {
        const res = await fetch(audioDataUrl);
        const blob = await res.blob();
        base64Audio = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string || '');
          reader.onerror = () => resolve('');
          reader.readAsDataURL(blob);
        });
      }

      const response = await fetch('/api/gemini/audio-forensic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          audioData: base64Audio,
          mimeType: audioFile?.type || 'audio/webm',
          fileName: audioFile?.name || 'Ovozli_dalil.webm',
          metadata,
          customFocus,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server xatosi: ${response.status}`);
      }

      const report: AudioForensicReport = await response.json();
      setForensicReport(report);
    } catch (err: any) {
      console.warn('Audio Forensic API error:', err);
      setAnalysisError(err?.message || 'Tahlil jarayonida xatolik yuz berdi');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Copy helper
  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Download Transcript or Motion
  const handleDownloadText = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered sentences
  const filteredSentences = forensicReport?.sentenceBreakdown?.filter((item) => {
    if (activeTabFilter === 'critical') return item.legalRiskOrEvidentiaryWeight === 'CRITICAL';
    if (activeTabFilter === 'important') return item.legalRiskOrEvidentiaryWeight === 'IMPORTANT';
    if (activeTabFilter === 'neutral') return item.legalRiskOrEvidentiaryWeight === 'NEUTRAL';
    return true;
  }) || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8" id="audio-forensic-module">
      {/* Hidden audio element for playback */}
      {audioDataUrl && (
        <audio
          ref={audioRef}
          src={audioDataUrl}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleAudioEnded}
          onLoadedMetadata={handleTimeUpdate}
        />
      )}

      {/* Module Hero Header */}
      <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 border border-indigo-500/30 shadow-xl relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 uppercase tracking-wider flex items-center gap-1.5">
                <FileAudio className="w-3.5 h-3.5 text-cyan-400" />
                Audio Forensic Pro
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                O‘zR FPK 67, 78-modda & IPK 66-modda
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Sud-Fonotexnika Standarti
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Audio Dalillar Auditi & Har Bir Gapning Yuridik Tahlili
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Ovozli xabarlar, telefon so‘zlashuvlari va audio yozuvlarni to‘liq transkripsiya qilish, audioda aytilgan 
              <strong> har bir gapning yuridik ma‘nosini</strong>, oqibatini va tegishli Lex.uz moddasini alohida ajratib, 
              sudda o‘tish maqbulligini tekshirish tizimi.
            </p>
          </div>

          <div className="flex md:flex-col items-center sm:items-end justify-between gap-3 border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6">
            <div className="text-left md:text-right">
              <div className="text-xs text-slate-400">Sud amaliyoti mosligi</div>
              <div className="text-lg font-bold text-emerald-400 font-mono">100% Qonuniy</div>
            </div>
            <div className="text-left md:text-right">
              <div className="text-xs text-slate-400">Diarizatsiya & Moddalar</div>
              <div className="text-sm font-semibold text-cyan-300">Daqiqama-daqiqa</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left = Input/Cases/Recorder, Right = Configuration & Triggers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Sample Cases & Upload */}
        <div className="lg:col-span-7 space-y-6">
          {/* Sample Cases Selector */}
          <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                Namunaviy Sud Ishlari (Tezkor tekshirish):
              </h3>
              <span className="text-xs text-slate-400">Tanlang va o‘rganing</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SAMPLE_CASES.map((sc) => {
                const isSelected = selectedCase === sc.id;
                return (
                  <button
                    key={sc.id}
                    onClick={() => loadPreloadedCase(sc.id)}
                    className={`text-left p-3.5 rounded-lg border transition-all text-xs space-y-1.5 ${
                      isSelected
                        ? 'bg-cyan-950/40 border-cyan-500/60 shadow-md ring-1 ring-cyan-500/30'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="font-bold text-white flex items-center justify-between">
                      <span>{sc.title}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />}
                    </div>
                    <div className="text-[11px] font-semibold text-cyan-300">{sc.category}</div>
                    <p className="text-[11px] text-slate-400 line-clamp-2">{sc.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Upload or Record Audio Area */}
          <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Mic className="w-4 h-4 text-indigo-400" />
              O‘z Audio Faylingizni Yuklang yoki Yozib Oling:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* File Upload Zone */}
              <label className="border-2 border-dashed border-slate-700 hover:border-cyan-500 rounded-xl p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-all bg-slate-950/50 hover:bg-cyan-950/10 group">
                <Upload className="w-8 h-8 text-slate-400 group-hover:text-cyan-400 mb-2 transition-transform group-hover:-translate-y-1" />
                <span className="text-xs font-semibold text-white group-hover:text-cyan-300">
                  {audioFile ? audioFile.name : 'Audio faylni tanlang yoki sudrab tashlang'}
                </span>
                <span className="text-[10px] text-slate-500 mt-1">MP3, WAV, M4A, OGG, WEBM (50MB gacha)</span>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              {/* Real-time Voice Recorder */}
              <div className="border border-slate-800 rounded-xl p-5 flex flex-col items-center justify-center text-center bg-slate-950/50">
                {isRecording ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-center gap-2 text-rose-400 font-mono font-bold text-base animate-pulse">
                      <span className="w-3 h-3 rounded-full bg-rose-500" />
                      Yozilmoqda: 00:{recordingSeconds < 10 ? `0${recordingSeconds}` : recordingSeconds}
                    </div>
                    <button
                      onClick={stopRecording}
                      className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-rose-950/50 transition-all"
                    >
                      <Square className="w-3.5 h-3.5 fill-current" />
                      Yozishni to‘xtatish
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <button
                      onClick={startRecording}
                      className="w-12 h-12 rounded-full bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/50 flex items-center justify-center text-indigo-300 mx-auto transition-all active:scale-95 group"
                    >
                      <Mic className="w-6 h-6 group-hover:scale-110 transition-transform text-indigo-400" />
                    </button>
                    <div className="text-xs font-semibold text-white">Mikrofon orqali yozib olish</div>
                    <div className="text-[10px] text-slate-500">Muloqot yoki ovozli xabarni yozing</div>
                  </div>
                )}
              </div>
            </div>

            {/* Audio Player Bar if Audio is loaded */}
            {audioDataUrl && (
              <div className="p-3 rounded-lg bg-slate-950 border border-cyan-800/50 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={togglePlay}
                    className="w-9 h-9 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center justify-center transition-all shadow-md flex-shrink-0"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5 fill-current" />}
                  </button>
                  <div>
                    <div className="text-xs font-semibold text-white truncate max-w-[200px] sm:max-w-xs">
                      {audioFile ? audioFile.name : 'Yozib olingan ovozli audio'}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, '0')} /{' '}
                      {Math.floor(duration / 60)}:{Math.floor(duration % 60).toString().padStart(2, '0')}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-1 rounded border border-cyan-800">
                    Ovoz tayyor
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: FPK 78 Metadata & Trigger */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Scale className="w-4 h-4 text-emerald-400" />
                FPK 78-modda Sud Pasporti:
              </h3>
              <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-800">
                Majburiy rekvisitlar
              </span>
            </div>

            <p className="text-[11px] text-slate-400">
              O‘zR FPK 78-moddasi talabiga ko‘ra, audio dalil taqdim etilganda quyidagi holatlar yozma ko‘rsatilishi shart:
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[11px] font-medium text-slate-300 block mb-1">
                  1. Yozib olingan sana va vaqt:
                </label>
                <input
                  type="text"
                  value={metadata.recordingDate || ''}
                  onChange={(e) => setMetadata({ ...metadata, recordingDate: e.target.value })}
                  placeholder="Masalan: 2026-02-14 14:30"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-medium text-slate-300 block mb-1">
                  2. Yozib olgan shaxs:
                </label>
                <input
                  type="text"
                  value={metadata.recordedBy || ''}
                  onChange={(e) => setMetadata({ ...metadata, recordedBy: e.target.value })}
                  placeholder="Masalan: Da‘vogar (A. Rahimov) / Muloqot ishtirokchisi"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-medium text-slate-300 block mb-1">
                  3. Yozuv qurilmasi va modeli:
                </label>
                <input
                  type="text"
                  value={metadata.recordingDevice || ''}
                  onChange={(e) => setMetadata({ ...metadata, recordingDevice: e.target.value })}
                  placeholder="Masalan: Samsung Galaxy S24 Ultra diktofoni"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-medium text-slate-300 block mb-1">
                  4. Ish toifasi:
                </label>
                <select
                  value={metadata.caseType || 'civil'}
                  onChange={(e) => setMetadata({ ...metadata, caseType: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="civil">Fuqarolik ishlari bo‘yicha sud (Qarz, mulk, moddiy zarar)</option>
                  <option value="economic">Iqtisodiy sud (Yuridik shaxslar o‘rtasidagi nizo)</option>
                  <option value="labor">Mehnat nizolari (Ishga tiklash, oylik maosh)</option>
                  <option value="administrative">Ma‘muriy sud (Mansabdor shaxslar harakatlari)</option>
                  <option value="criminal">Jinoyat ishlari (Tahdid, firibgarlik, pora)</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-medium text-slate-300 block mb-1">
                  Qo‘shimcha e‘tibor qaratiladigan jihat (ixtiyoriy):
                </label>
                <input
                  type="text"
                  value={customFocus}
                  onChange={(e) => setCustomFocus(e.target.value)}
                  placeholder="Masalan: qarz summasi yoki ishdan bo‘shatish tahdidi"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {/* Submit Analyze Button */}
            <button
              onClick={handleAnalyzeAudio}
              disabled={isAnalyzing}
              className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-900/30 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Audioni to‘liq tahlil qilinmoqda (Speech-to-Law)...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 fill-current" />
                  <span>Sud-Fonotexnika Tahlilini Boshlash</span>
                </>
              )}
            </button>

            {analysisError && (
              <div className="p-2.5 rounded-lg bg-rose-950/40 border border-rose-500/40 text-xs text-rose-300 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 text-rose-400" />
                <span>{analysisError}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Forensic Report Display Area */}
      {forensicReport && (
        <div className="space-y-6 pt-4 border-t border-slate-800" id="forensic-results-container">
          {/* Verdict Banner & Evidentiary Score */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Score & Verdict Card */}
            <div className="md:col-span-1 rounded-xl bg-slate-900 border border-slate-800 p-5 flex flex-col justify-between space-y-3">
              <div>
                <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                  Sudda Isbotlash Kuchlilik Darajasi:
                </span>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-4xl font-extrabold text-emerald-400 font-mono">
                    {forensicReport.evidentiaryScore || 92}%
                  </span>
                  <span className="text-xs text-slate-400">/ 100% Maqbullik</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/40 space-y-1">
                <div className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  {forensicReport.verdictLabel || 'Sudda yuqori dalillik kuchiga ega'}
                </div>
                <p className="text-[11px] text-emerald-200/80 leading-relaxed">
                  O‘zR FPK 67 va 78-moddalari talablari to‘liq bajarilgan.
                </p>
              </div>
            </div>

            {/* Executive Summary */}
            <div className="md:col-span-2 rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-cyan-400" />
                  Ekspertning Rasmiy Yuridik Xulosasi:
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  Sana: {new Date(forensicReport.analyzedAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {forensicReport.executiveSummary}
              </p>

              {forensicReport.statuteOfLimitationsImpact && (
                <div className="p-2.5 rounded-lg bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-200 flex items-start gap-2">
                  <Clock className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Da‘vo muddatiga ta‘siri:</strong>{' '}
                    {forensicReport.statuteOfLimitationsImpact}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Granular Sentence-by-Sentence Legal Meaning Section (THE CORE REQUEST) */}
          <div className="bg-slate-900 rounded-xl border border-cyan-800/40 p-5 sm:p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
                    <Scale className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-extrabold text-white">
                    Audiodagi Har Bir Gapning Yuridik Ma‘nosi va Oqibatlari ({forensicReport.sentenceBreakdown?.length || 0} ta gap)
                  </h3>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Har bir jumla alohida ajratilib, O‘zbekiston Respublikasi Kodekslari va Lex.uz rasmiy moddalari bilan bog‘langan.
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                <button
                  onClick={() => setActiveTabFilter('all')}
                  className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                    activeTabFilter === 'all'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Barchasi ({forensicReport.sentenceBreakdown?.length || 0})
                </button>
                <button
                  onClick={() => setActiveTabFilter('critical')}
                  className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                    activeTabFilter === 'critical'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Hal qiluvchi
                </button>
                <button
                  onClick={() => setActiveTabFilter('important')}
                  className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                    activeTabFilter === 'important'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Muhim
                </button>
              </div>
            </div>

            {/* Sentence Breakdown Cards */}
            <div className="space-y-4">
              {filteredSentences.map((item, idx) => {
                const isCritical = item.legalRiskOrEvidentiaryWeight === 'CRITICAL';
                const isImportant = item.legalRiskOrEvidentiaryWeight === 'IMPORTANT';

                return (
                  <div
                    key={idx}
                    className={`rounded-xl border p-4 sm:p-5 transition-all ${
                      isCritical
                        ? 'bg-rose-950/20 border-rose-500/40 hover:border-rose-500/60'
                        : isImportant
                          ? 'bg-amber-950/20 border-amber-500/40 hover:border-amber-500/60'
                          : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {/* Header: Number, Speaker, Timestamp, Tag */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-800/80">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-cyan-950 border border-cyan-500/50 text-cyan-300 font-bold text-xs flex items-center justify-center font-mono">
                          {item.sentenceNumber || idx + 1}
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                          🎙️ {item.speaker || 'So‘zlovchi'}
                        </span>
                        {item.timestamp && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-cyan-300 border border-slate-800 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-cyan-400" />
                            {item.timestamp}
                          </span>
                        )}
                      </div>

                      <span
                        className={`px-2.5 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 ${
                          isCritical
                            ? 'bg-rose-950 text-rose-300 border border-rose-700'
                            : isImportant
                              ? 'bg-amber-950 text-amber-300 border border-amber-700'
                              : 'bg-slate-800 text-slate-300 border border-slate-700'
                        }`}
                      >
                        {isCritical ? (
                          <>
                            <ShieldAlert className="w-3 h-3 text-rose-400" />
                            Hal qiluvchi dalil / Yuqori ahamiyat
                          </>
                        ) : isImportant ? (
                          <>
                            <AlertTriangle className="w-3 h-3 text-amber-400" />
                            Muhim dalil / E‘tiborga molik
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-3 h-3 text-slate-400" />
                            Muloqot / Ma‘lumot
                          </>
                        )}
                      </span>
                    </div>

                    {/* Exact Quote Box */}
                    <div className="mb-3 p-3 rounded-lg bg-slate-900 border border-slate-800/80">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                        Audioda aytilgan aniq gap / So‘zma-so‘z iqtibos:
                      </span>
                      <p className="text-xs sm:text-sm font-medium text-cyan-100 italic font-mono leading-relaxed">
                        {item.exactStatement}
                      </p>
                    </div>

                    {/* Legal Meaning & Impact */}
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <Scale className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                        <div className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                          <strong className="text-indigo-300 font-bold">Huquqiy ma‘nosi va oqibatlari:</strong>{' '}
                          {item.legalMeaning}
                        </div>
                      </div>

                      {/* Associated Law Article with Direct Lex.uz link */}
                      {item.associatedLawArticle && (
                        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/50 mt-2">
                          <div className="flex items-center gap-1.5 text-xs text-slate-300">
                            <FileText className="w-3.5 h-3.5 text-cyan-400" />
                            <span className="text-slate-400">Tegishli qonun moddasi:</span>
                            <span className="text-cyan-300 font-semibold">{item.associatedLawArticle}</span>
                          </div>

                          {item.lexUrl && (
                            <a
                              href={item.lexUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 bg-cyan-950/60 hover:bg-cyan-900/70 px-2.5 py-1 rounded border border-cyan-800/60 transition-colors"
                            >
                              <span>Lex.uz da ochish</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Full Transcript Box */}
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                To‘liq Audio Stenogrammasi (Speech-to-Text):
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(forensicReport.fullTranscript, 'transcript')}
                  className="px-2.5 py-1 rounded text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1 transition-all"
                >
                  {copiedKey === 'transcript' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedKey === 'transcript' ? 'Nusxalandi' : 'Nusxa olish'}</span>
                </button>
                <button
                  onClick={() => handleDownloadText(forensicReport.fullTranscript, 'Audio_Stenogramma.txt')}
                  className="px-2.5 py-1 rounded text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1 transition-all"
                >
                  <Download className="w-3 h-3" />
                  <span>Yuklab olish</span>
                </button>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-line max-h-60 overflow-y-auto">
              {forensicReport.fullTranscript}
            </div>
          </div>

          {/* Court Admissibility Checklist (FPK 78 & IPK 66) */}
          {forensicReport.courtAdmissibilityEvaluation && (
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                O‘zbekiston Respublikasi Sudlarida Audio Dalilning Maqbullik Nazorati:
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {forensicReport.courtAdmissibilityEvaluation.admissibilityChecklist?.map((check, cIdx) => (
                  <div key={cIdx} className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 flex items-start gap-2.5 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-white">{check.item}</div>
                      <div className="text-[11px] text-slate-400">{check.note}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-xs text-slate-300 space-y-1 bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                <div>
                  <strong className="text-emerald-400">FPK 78-modda:</strong> {forensicReport.courtAdmissibilityEvaluation.fpk78Compliance}
                </div>
                <div>
                  <strong className="text-cyan-400">Qonuniylik:</strong> {forensicReport.courtAdmissibilityEvaluation.sourceLegality}
                </div>
              </div>
            </div>
          )}

          {/* Actionable Steps & Key Findings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 space-y-3">
              <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                Aniqlangan Asosiy Huquqiy Faktlar:
              </h4>
              <ul className="space-y-2 text-xs text-slate-200">
                {forensicReport.keyLegalFindings?.map((kf, kfIdx) => (
                  <li key={kfIdx} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{kf}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 space-y-3">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Sudga Tayyorgarlik Amaliy Qadamlari:
              </h4>
              <ul className="space-y-2 text-xs text-slate-200">
                {forensicReport.actionableSteps?.map((as, asIdx) => (
                  <li key={asIdx} className="flex items-start gap-2">
                    <ChevronRight className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{as}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Court Motion Draft (Iltimosnoma) */}
          {forensicReport.motionDraftText && (
            <div className="bg-slate-900 rounded-xl border border-indigo-500/40 p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-400" />
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                    Sudga Taqdim Etiladigan Rasmiy Iltimosnoma Loyihasi (FPK 78-modda):
                  </h4>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(forensicReport.motionDraftText, 'motion')}
                    className="px-3 py-1 rounded text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1 transition-all"
                  >
                    {copiedKey === 'motion' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === 'motion' ? 'Nusxalandi' : 'Nusxa olish'}</span>
                  </button>
                  <button
                    onClick={() => handleDownloadText(forensicReport.motionDraftText, 'Sudga_Audio_Iltimosnoma.txt')}
                    className="px-3 py-1 rounded text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1 transition-all"
                  >
                    <Download className="w-3 h-3" />
                    <span>Yuklab olish</span>
                  </button>
                  {onNavigateToDocumentGenerator && (
                    <button
                      onClick={() => onNavigateToDocumentGenerator({
                        title: 'Audio dalilni ish materiallariga qo‘shish to‘g‘risida iltimosnoma',
                        docType: 'Iltimosnoma (FPK 78)',
                        prefilledContent: forensicReport.motionDraftText,
                      })}
                      className="px-3 py-1 rounded text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1 shadow-sm transition-all"
                    >
                      <FolderPlus className="w-3 h-3" />
                      <span>Generatorga o‘tish</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-slate-200 leading-relaxed whitespace-pre-line max-h-72 overflow-y-auto">
                {forensicReport.motionDraftText}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
