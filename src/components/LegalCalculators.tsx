import React, { useState } from 'react';
import { 
  Calculator, 
  Scale, 
  Briefcase, 
  Percent, 
  HeartHandshake, 
  TrendingUp, 
  Info, 
  ExternalLink,
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import { OFFICIAL_MACRO_DATA } from '../data/lawsDatabase';

export const LegalCalculators: React.FC = () => {
  const [activeCalc, setActiveCalc] = useState<'court' | 'labor' | 'penalty' | 'alimony'>('court');

  // 1. Court State Duty State
  const [courtType, setCourtType] = useState<'civil_property' | 'civil_nonproperty' | 'civil_divorce' | 'economic_property' | 'admin'>('civil_property');
  const [claimAmount, setClaimAmount] = useState<number>(20000000);

  // 2. Labor Leave & Severance Pay State
  const [monthlySalary, setMonthlySalary] = useState<number>(6000000);
  const [yearsOfService, setYearsOfService] = useState<number>(4);
  const [unusedLeaveDays, setUnusedLeaveDays] = useState<number>(15);

  // 3. Penalty State
  const [debtPrincipal, setDebtPrincipal] = useState<number>(30000000);
  const [delayDays, setDelayDays] = useState<number>(45);
  const [penaltyDailyRate, setPenaltyDailyRate] = useState<number>(0.1); // 0.1% kunlik

  // 4. Alimony State
  const [childrenCount, setChildrenCount] = useState<number>(2);
  const [parentMonthlyIncome, setParentMonthlyIncome] = useState<number>(5000000);

  // 1. Calculate Court State Duty (Davlat boji to'g'risida Qonun)
  const calculateCourtDuty = () => {
    const BHM = OFFICIAL_MACRO_DATA.BHM;
    if (courtType === 'civil_property') {
      const fourPercent = claimAmount * 0.04;
      const minDuty = BHM; // kamida 1 BHM
      return Math.max(fourPercent, minDuty);
    }
    if (courtType === 'civil_nonproperty') {
      return BHM * 2; // 2 BHM
    }
    if (courtType === 'civil_divorce') {
      return BHM * 2; // 2 BHM (birinchi nikohda)
    }
    if (courtType === 'economic_property') {
      const twoPercent = claimAmount * 0.02;
      const minDuty = BHM; // kamida 1 BHM
      return Math.max(twoPercent, minDuty);
    }
    if (courtType === 'admin') {
      return BHM * 1; // 1 BHM
    }
    return 0;
  };

  // 2. Calculate Labor Severance Pay (MK 173-modda) and unused leave
  const calculateLaborPayout = () => {
    // Daily wage estimate (25.4 average working days)
    const dailyWage = monthlySalary / 25.4;
    const leaveCompensation = dailyWage * unusedLeaveDays;

    let severancePercent = 0.5; // 3 yilgacha 50%
    if (yearsOfService >= 15) severancePercent = 2.0;
    else if (yearsOfService >= 10) severancePercent = 1.5;
    else if (yearsOfService >= 5) severancePercent = 1.0;
    else if (yearsOfService >= 3) severancePercent = 0.75;

    const severancePay = monthlySalary * severancePercent;
    const totalPayout = leaveCompensation + severancePay;

    return {
      leaveCompensation,
      severancePercent: severancePercent * 100,
      severancePay,
      totalPayout,
    };
  };

  // 3. Calculate Penalty (FK 327 / Shartnoma)
  const calculatePenalty = () => {
    const dailyPenalty = debtPrincipal * (penaltyDailyRate / 100);
    const totalPenalty = dailyPenalty * delayDays;
    // O'zbekiston qonunchiligida peniya summasi asosiy qarz summasining 50% idan oshmasligi kerak (Qonun 44427)
    const cappedPenalty = Math.min(totalPenalty, debtPrincipal * 0.5);
    const totalPayable = debtPrincipal + cappedPenalty;
    return { dailyPenalty, totalPenalty, cappedPenalty, totalPayable };
  };

  // 4. Calculate Alimony (Oila kodeksi 99-modda)
  const calculateAlimony = () => {
    let rate = 0.25;
    if (childrenCount === 2) rate = 0.3333;
    if (childrenCount >= 3) rate = 0.5;

    const calculatedAlimony = parentMonthlyIncome * rate;
    // Har bir bola uchun eng kam miqdor MHTEKM ning 26.5% dan kam bo'lmasligi kerak
    const minPerChild = OFFICIAL_MACRO_DATA.MHTEKM * 0.265;
    const totalMinAlimony = minPerChild * childrenCount;

    const finalAlimony = Math.max(calculatedAlimony, totalMinAlimony);
    return {
      rate: Math.round(rate * 100),
      calculatedAlimony,
      minPerChild,
      totalMinAlimony,
      finalAlimony,
    };
  };

  const courtDutyResult = calculateCourtDuty();
  const laborResult = calculateLaborPayout();
  const penaltyResult = calculatePenalty();
  const alimonyResult = calculateAlimony();

  return (
    <div className="max-w-7xl mx-auto p-2 sm:p-4 space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Calculator className="w-6 h-6 text-cyan-400" />
            <h2 className="text-lg sm:text-xl font-bold text-white">Yuridik va Protsessual Kalkulyatorlar</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Davlat bojlari, mehnat ta‘tili va kompensatsiyasi, peniya foizlari hamda aliment miqdorini O‘zbekiston qonunlariga muvofiq 100% deterministik hisoblang.
          </p>
        </div>

        {/* Macro Card Banner */}
        <div className="bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-800 flex items-center gap-4 text-xs font-mono">
          <div>
            <span className="text-slate-400 block text-[10px]">BHM (BRV):</span>
            <span className="text-cyan-400 font-bold">{OFFICIAL_MACRO_DATA.BHM.toLocaleString()} so‘m</span>
          </div>
          <div className="h-6 w-px bg-slate-800"></div>
          <div>
            <span className="text-slate-400 block text-[10px]">MHTEKM (Min oylik):</span>
            <span className="text-emerald-400 font-bold">{OFFICIAL_MACRO_DATA.MHTEKM.toLocaleString()} so‘m</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <button
          onClick={() => setActiveCalc('court')}
          className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl font-bold text-xs sm:text-sm border transition ${
            activeCalc === 'court'
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/60 shadow-md shadow-cyan-950/50'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <Scale className="w-4 h-4 text-cyan-400" />
          <span>Davlat Boji</span>
        </button>

        <button
          onClick={() => setActiveCalc('labor')}
          className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl font-bold text-xs sm:text-sm border transition ${
            activeCalc === 'labor'
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/60 shadow-md shadow-emerald-950/50'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <Briefcase className="w-4 h-4 text-emerald-400" />
          <span>Mehnat & Nafaqalar</span>
        </button>

        <button
          onClick={() => setActiveCalc('penalty')}
          className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl font-bold text-xs sm:text-sm border transition ${
            activeCalc === 'penalty'
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/60 shadow-md shadow-amber-950/50'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <Percent className="w-4 h-4 text-amber-400" />
          <span>Peniya va Foizlar</span>
        </button>

        <button
          onClick={() => setActiveCalc('alimony')}
          className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl font-bold text-xs sm:text-sm border transition ${
            activeCalc === 'alimony'
              ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/60 shadow-md shadow-indigo-950/50'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <HeartHandshake className="w-4 h-4 text-indigo-400" />
          <span>Alimentlar</span>
        </button>
      </div>

      {/* CALCULATOR 1: COURT STATE DUTY */}
      {activeCalc === 'court' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-8">
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-cyan-400" />
              <span>Sudga Murojaat Bo‘yicha Davlat Boji Hisob-kitobi</span>
            </h3>
            <p className="text-xs text-slate-400">
              «Davlat boji to‘g‘risida»gi O‘zbekiston Respublikasi Qonuni (O‘RQ-600) talablariga asosan hisoblanadi.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Da‘vo turi va Sud kategoriyasi:</label>
                <select
                  value={courtType}
                  onChange={(e) => setCourtType(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs sm:text-sm rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                >
                  <option value="civil_property">Fuqarolik sudi — Mulkiy da‘vo (4%, kamida 1 BHM)</option>
                  <option value="civil_nonproperty">Fuqarolik sudi — Nomulkiy da‘vo (2 BHM)</option>
                  <option value="civil_divorce">Fuqarolik sudi — Nikohni bekor qilish (2 BHM)</option>
                  <option value="economic_property">Iqtisodiy sud — Mulkiy da‘vo (2%, kamida 1 BHM)</option>
                  <option value="admin">Ma‘muriy sud — Mansabdor shaxs harakatlari ustidan (1 BHM)</option>
                </select>
              </div>

              {(courtType === 'civil_property' || courtType === 'economic_property') && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Da‘vo bahosi (Undirilishi so‘ralayotgan summa, so‘m):
                  </label>
                  <input
                    type="number"
                    value={claimAmount}
                    onChange={(e) => setClaimAmount(Number(e.target.value))}
                    step={1000000}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm font-mono rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Masalan: 20 000 000 so‘m
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-6 bg-slate-950 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-xs text-slate-400 uppercase font-semibold tracking-wider">Hisoblangan Davlat Boji:</span>
              <div className="text-3xl sm:text-4xl font-black text-cyan-400 font-mono mt-2 mb-4">
                {Math.round(courtDutyResult).toLocaleString()} so‘m
              </div>

              <div className="space-y-2 text-xs text-slate-300 pt-3 border-t border-slate-800">
                <div className="flex justify-between">
                  <span className="text-slate-400">Qonuniy asos:</span>
                  <span className="font-semibold text-white">O‘RQ-600-son Qonun, 5-modda</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Joriy BHM stavkasi:</span>
                  <span className="font-semibold text-cyan-300">{OFFICIAL_MACRO_DATA.BHM.toLocaleString()} so‘m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Kamida to‘lanadigan chegara:</span>
                  <span className="font-semibold text-emerald-300">1 BHM ({OFFICIAL_MACRO_DATA.BHM.toLocaleString()} so‘m)</span>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-cyan-950/30 p-3 rounded-xl border border-cyan-800/40 text-[11px] text-cyan-200/90 flex items-start gap-2">
              <Info className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <span>
                Agar da‘vogar ish haqi undirish, aliment yoki mehnat huquqlari bo‘yicha sudga murojaat qilsa, qonunga ko‘ra davlat boji to‘lashdan to‘liq ozod qilinadi!
              </span>
            </div>
          </div>
        </div>
      )}

      {/* CALCULATOR 2: LABOR LEAVE & SEVERANCE */}
      {activeCalc === 'labor' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-8">
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-emerald-400" />
              <span>Mehnat Ta‘tili va Ishdan Bo‘shatish Nafaqasi</span>
            </h3>
            <p className="text-xs text-slate-400">
              Yangi tahrirdagi Mehnat kodeksining 173-moddasi (ishdan bo‘shatish nafaqasi) va 217-moddasi (mehnat ta‘tillari) asosida.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">O‘rtacha oylik ish haqi (so‘m):</label>
                <input
                  type="number"
                  value={monthlySalary}
                  onChange={(e) => setMonthlySalary(Number(e.target.value))}
                  step={500000}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm font-mono rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Tashkilotdagi umumiy ish staji (yil):</label>
                <input
                  type="number"
                  value={yearsOfService}
                  onChange={(e) => setYearsOfService(Number(e.target.value))}
                  min={0}
                  max={50}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm font-mono rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Foydalanilmagan ta‘til kunlari (kalendar kun):</label>
                <input
                  type="number"
                  value={unusedLeaveDays}
                  onChange={(e) => setUnusedLeaveDays(Number(e.target.value))}
                  min={0}
                  max={90}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm font-mono rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-slate-950 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-xs text-slate-400 uppercase font-semibold tracking-wider">Jami To‘lanishi Lozim Bo‘lgan Summa:</span>
              <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono mt-2 mb-4">
                {Math.round(laborResult.totalPayout).toLocaleString()} so‘m
              </div>

              <div className="space-y-2.5 text-xs text-slate-300 pt-3 border-t border-slate-800">
                <div className="flex justify-between">
                  <span className="text-slate-400">Ishdan bo‘shatish nafaqasi (MK 173-m):</span>
                  <span className="font-bold text-white font-mono">{Math.round(laborResult.severancePay).toLocaleString()} so‘m ({laborResult.severancePercent}%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Ta‘til kompensatsiyasi ({unusedLeaveDays} kun):</span>
                  <span className="font-bold text-white font-mono">{Math.round(laborResult.leaveCompensation).toLocaleString()} so‘m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Stajga ko‘ra nafaqa stavkasi:</span>
                  <span className="font-semibold text-emerald-300">{yearsOfService} yil staj = {laborResult.severancePercent}%</span>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-emerald-950/30 p-3 rounded-xl border border-emerald-800/40 text-[11px] text-emerald-200/90 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>
                Mehnat kodeksi 217-moddasiga muvofiq, O‘zbekistonda yillik asosiy eng kam mehnat ta‘tili 21 kalendar kundan kam bo‘lishi mumkin emas.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* CALCULATOR 3: PENALTY & INTEREST */}
      {activeCalc === 'penalty' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-8">
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Percent className="w-5 h-5 text-amber-400" />
              <span>Peniya va Shartnomaviy Majburiyatlar Bo‘yicha Foizlar</span>
            </h3>
            <p className="text-xs text-slate-400">
              Fuqarolik kodeksining 327-moddasi va «Xo‘jalik yurituvchi subyektlar faoliyatining shartnomaviy-huquqiy bazasi to‘g‘risida»gi Qonun bo‘yicha.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Asosiy qarz summasi (so‘m):</label>
                <input
                  type="number"
                  value={debtPrincipal}
                  onChange={(e) => setDebtPrincipal(Number(e.target.value))}
                  step={1000000}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm font-mono rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Kechiktirilgan kunlar soni:</label>
                <input
                  type="number"
                  value={delayDays}
                  onChange={(e) => setDelayDays(Number(e.target.value))}
                  min={1}
                  max={1000}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm font-mono rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Kunlik peniya stavkasi (%):</label>
                <input
                  type="number"
                  value={penaltyDailyRate}
                  onChange={(e) => setPenaltyDailyRate(Number(e.target.value))}
                  step={0.05}
                  min={0.01}
                  max={5}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm font-mono rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Standart amaliyotda odatda 0.1% dan 0.5% gacha bo‘ladi.
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-slate-950 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-xs text-slate-400 uppercase font-semibold tracking-wider">Hisoblangan Peniya Summasi:</span>
              <div className="text-3xl sm:text-4xl font-black text-amber-400 font-mono mt-2 mb-4">
                {Math.round(penaltyResult.cappedPenalty).toLocaleString()} so‘m
              </div>

              <div className="space-y-2.5 text-xs text-slate-300 pt-3 border-t border-slate-800">
                <div className="flex justify-between">
                  <span className="text-slate-400">Jami undiriladigan (Qarz + Peniya):</span>
                  <span className="font-bold text-white font-mono text-sm">{Math.round(penaltyResult.totalPayable).toLocaleString()} so‘m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Kunlik peniya miqdori:</span>
                  <span className="font-semibold text-amber-300 font-mono">{Math.round(penaltyResult.dailyPenalty).toLocaleString()} so‘m/kun</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Qonuniy 50% chegarasi:</span>
                  <span className="font-semibold text-slate-300">{Math.round(debtPrincipal * 0.5).toLocaleString()} so‘m</span>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-amber-950/30 p-3 rounded-xl border border-amber-800/40 text-[11px] text-amber-200/90 flex items-start gap-2">
              <Info className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>
                Qonunchilikka ko‘ra (44427-sonli Qonun 32-moddasi), peniyaning umumiy miqdori bajarilmagan majburiyat summasining 50 foizidan oshishi mumkin emas.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* CALCULATOR 4: ALIMONY */}
      {activeCalc === 'alimony' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-8">
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-indigo-400" />
              <span>Bolalar Ta‘minoti va Aliment Miqdori Kalkulyatori</span>
            </h3>
            <p className="text-xs text-slate-400">
              O‘zbekiston Respublikasi Oila kodeksining 99-moddasi bo‘yicha voyaga yetmagan bolalar uchun aliment hisoblash.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Voyaga yetmagan bolalar soni:</label>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((num) => (
                    <button
                      key={num}
                      onClick={() => setChildrenCount(num)}
                      className={`py-2 rounded-xl text-xs font-bold border transition ${
                        childrenCount === num
                          ? 'bg-indigo-600 text-white border-indigo-400 shadow-md'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {num === 3 ? '3 va undan ko‘p' : `${num} nafar bola`}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Aliment to‘lovchining oylik rasmiy daromadi (so‘m):
                </label>
                <input
                  type="number"
                  value={parentMonthlyIncome}
                  onChange={(e) => setParentMonthlyIncome(Number(e.target.value))}
                  step={500000}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm font-mono rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-slate-950 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-xs text-slate-400 uppercase font-semibold tracking-wider">Oylik Undiriladigan Aliment Miqdori:</span>
              <div className="text-3xl sm:text-4xl font-black text-indigo-400 font-mono mt-2 mb-4">
                {Math.round(alimonyResult.finalAlimony).toLocaleString()} so‘m / oy
              </div>

              <div className="space-y-2.5 text-xs text-slate-300 pt-3 border-t border-slate-800">
                <div className="flex justify-between">
                  <span className="text-slate-400">Daromaddan ushlanadigan ulush:</span>
                  <span className="font-bold text-white font-mono">
                    {childrenCount === 1 ? '1/4 qism (25%)' : childrenCount === 2 ? '1/3 qism (33.3%)' : '1/2 qism (50%)'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Har bir bola uchun qonuniy eng kam miqdor:</span>
                  <span className="font-semibold text-cyan-300 font-mono">
                    {Math.round(alimonyResult.minPerChild).toLocaleString()} so‘m (MHTEKM ning 26.5%)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Jami eng kam kafolatlangan miqdor:</span>
                  <span className="font-semibold text-emerald-300 font-mono">
                    {Math.round(alimonyResult.totalMinAlimony).toLocaleString()} so‘m
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-indigo-950/30 p-3 rounded-xl border border-indigo-800/40 text-[11px] text-indigo-200/90 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
              <span>
                Agar ota (ona) rasmiy ishlamasa yoki daromadini yashirsa, aliment O‘zbekiston Respublikasidagi o‘rtacha oylik ish haqi miqdoridan kelib chiqib hisoblanadi.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
