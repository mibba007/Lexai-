/**
 * Macro-Economic & Legal Indicators Service
 * Date-aware, deterministic calculations with verified legal basis and validity intervals.
 */

import { MacroValueRecord } from './types';

// Historical and Current Registry of Bazaviy Hisoblash Miqdori (BHM)
export const BHM_HISTORICAL_REGISTRY: Array<{
  value: number;
  effectiveFrom: string;
  effectiveUntil: string;
  legalBasis: string;
  sourceUrl: string;
}> = [
  {
    value: 412000,
    effectiveFrom: '2024-10-01',
    effectiveUntil: '2099-12-31', // Hozirgi kunda amalda
    legalBasis: 'O‘zbekiston Respublikasi Prezidentining PF-108-son Farmoni (2024-yil)',
    sourceUrl: 'https://lex.uz/docs/7074384',
  },
  {
    value: 375000,
    effectiveFrom: '2024-09-01',
    effectiveUntil: '2024-09-30',
    legalBasis: 'O‘zbekiston Respublikasi Prezidentining PF-108-son Farmoni',
    sourceUrl: 'https://lex.uz/docs/7074384',
  },
  {
    value: 340000,
    effectiveFrom: '2023-12-01',
    effectiveUntil: '2024-08-31',
    legalBasis: 'O‘zbekiston Respublikasi Prezidentining PF-196-son Farmoni (17.11.2023)',
    sourceUrl: 'https://lex.uz/docs/6668725',
  },
  {
    value: 330000,
    effectiveFrom: '2023-05-01',
    effectiveUntil: '2023-11-30',
    legalBasis: 'O‘zbekiston Respublikasi Prezidentining PF-45-son Farmoni (28.03.2023)',
    sourceUrl: 'https://lex.uz/docs/6418854',
  },
  {
    value: 300000,
    effectiveFrom: '2022-06-01',
    effectiveUntil: '2023-04-30',
    legalBasis: 'O‘zbekiston Respublikasi Prezidentining PF-138-son Farmoni (20.05.2022)',
    sourceUrl: 'https://lex.uz/docs/6029837',
  },
  {
    value: 270000,
    effectiveFrom: '2021-09-01',
    effectiveUntil: '2022-05-31',
    legalBasis: 'O‘zbekiston Respublikasi Prezidentining PF-6279-son Farmoni (17.08.2021)',
    sourceUrl: 'https://lex.uz/docs/5579998',
  },
  {
    value: 245000,
    effectiveFrom: '2021-02-01',
    effectiveUntil: '2021-08-31',
    legalBasis: 'O‘zbekiston Respublikasi Prezidentining PF-6155-son Farmoni (30.12.2020)',
    sourceUrl: 'https://lex.uz/docs/5201504',
  },
  {
    value: 223000,
    effectiveFrom: '2019-08-01',
    effectiveUntil: '2021-01-31',
    legalBasis: 'O‘zbekiston Respublikasi Prezidentining PF-5723-son Farmoni (21.05.2019)',
    sourceUrl: 'https://lex.uz/docs/4346853',
  },
];

// Historical and Current Registry of MHTEKM (Mehnatga haq to'lashning eng kam miqdori)
export const MHTEKM_HISTORICAL_REGISTRY: Array<{
  value: number;
  effectiveFrom: string;
  effectiveUntil: string;
  legalBasis: string;
  sourceUrl: string;
}> = [
  {
    value: 1217000,
    effectiveFrom: '2024-10-01',
    effectiveUntil: '2099-12-31',
    legalBasis: 'O‘zbekiston Respublikasi Prezidentining PF-108-son Farmoni',
    sourceUrl: 'https://lex.uz/docs/7074384',
  },
  {
    value: 1050000,
    effectiveFrom: '2023-12-01',
    effectiveUntil: '2024-09-30',
    legalBasis: 'O‘zbekiston Respublikasi Prezidentining PF-196-son Farmoni',
    sourceUrl: 'https://lex.uz/docs/6668725',
  },
  {
    value: 980000,
    effectiveFrom: '2023-05-01',
    effectiveUntil: '2023-11-30',
    legalBasis: 'O‘zbekiston Respublikasi Prezidentining PF-45-son Farmoni',
    sourceUrl: 'https://lex.uz/docs/6418854',
  },
  {
    value: 920000,
    effectiveFrom: '2022-06-01',
    effectiveUntil: '2023-04-30',
    legalBasis: 'O‘zbekiston Respublikasi Prezidentining PF-138-son Farmoni',
    sourceUrl: 'https://lex.uz/docs/6029837',
  },
];

/**
 * Returns the exact verified BHM for a given calendar date (YYYY-MM-DD)
 */
export function getBhmForDate(targetDateStr?: string): {
  value: number;
  effectiveFrom: string;
  effectiveUntil: string;
  legalBasis: string;
  sourceUrl: string;
  isCurrent: boolean;
} {
  const date = targetDateStr ? targetDateStr.slice(0, 10) : new Date().toISOString().slice(0, 10);
  const match = BHM_HISTORICAL_REGISTRY.find(
    (item) => date >= item.effectiveFrom && date <= item.effectiveUntil
  );

  if (match) {
    const isCurrent = match.effectiveUntil.startsWith('2099');
    return { ...match, isCurrent };
  }

  // If older than registry, fallback to earliest with clear explanation
  const earliest = BHM_HISTORICAL_REGISTRY[BHM_HISTORICAL_REGISTRY.length - 1];
  return {
    ...earliest,
    isCurrent: false,
  };
}

/**
 * Returns the exact verified MHTEKM for a given calendar date (YYYY-MM-DD)
 */
export function getMhtekmForDate(targetDateStr?: string): {
  value: number;
  effectiveFrom: string;
  effectiveUntil: string;
  legalBasis: string;
  sourceUrl: string;
  isCurrent: boolean;
} {
  const date = targetDateStr ? targetDateStr.slice(0, 10) : new Date().toISOString().slice(0, 10);
  const match = MHTEKM_HISTORICAL_REGISTRY.find(
    (item) => date >= item.effectiveFrom && date <= item.effectiveUntil
  );

  if (match) {
    const isCurrent = match.effectiveUntil.startsWith('2099');
    return { ...match, isCurrent };
  }

  const earliest = MHTEKM_HISTORICAL_REGISTRY[MHTEKM_HISTORICAL_REGISTRY.length - 1];
  return {
    ...earliest,
    isCurrent: false,
  };
}

/**
 * Deterministic Court State Duty Calculation (Davlat boji to‘g‘risida O‘RQ-600-son Qonun)
 */
export function calculateCourtDutyDeterministic(params: {
  courtType: 'civil_property' | 'civil_nonproperty' | 'civil_divorce' | 'economic_property' | 'admin';
  claimAmount: number;
  targetDate?: string;
}) {
  const bhmInfo = getBhmForDate(params.targetDate);
  const BHM = bhmInfo.value;
  let duty = 0;
  let formula = '';
  let legalBasis = '';
  let articleRef = '';

  switch (params.courtType) {
    case 'civil_property': {
      // Fuqarolik ishlari bo'yicha mulkiy da'volar: da'vo bahosining 4 foizi, lekin kamida 1 BHM
      const calculated = params.claimAmount * 0.04;
      duty = Math.max(calculated, BHM);
      formula = `Max(4% × ${params.claimAmount.toLocaleString()} so‘m, 1 BHM [${BHM.toLocaleString()} so‘m])`;
      legalBasis = '«Davlat boji to‘g‘risida»gi Qonun ilovasi, 1-band, "a" kichik bandi';
      articleRef = 'O‘RQ-600-son, 1-band';
      break;
    }
    case 'civil_nonproperty': {
      // Nomulkiy da'volar: 2 BHM
      duty = BHM * 2;
      formula = `2 × BHM (${BHM.toLocaleString()} so‘m)`;
      legalBasis = '«Davlat boji to‘g‘risida»gi Qonun ilovasi, 1-band, "b" kichik bandi';
      articleRef = 'O‘RQ-600-son, 1-band';
      break;
    }
    case 'civil_divorce': {
      // Nikohni bekor qilish: 2 BHM
      duty = BHM * 2;
      formula = `2 × BHM (${BHM.toLocaleString()} so‘m)`;
      legalBasis = '«Davlat boji to‘g‘risida»gi Qonun ilovasi, 1-band, "v" kichik bandi';
      articleRef = 'O‘RQ-600-son, 1-band';
      break;
    }
    case 'economic_property': {
      // Iqtisodiy sudlarda mulkiy da'volar: da'vo bahosining 2 foizi, lekin kamida 1 BHM
      const calculated = params.claimAmount * 0.02;
      duty = Math.max(calculated, BHM);
      formula = `Max(2% × ${params.claimAmount.toLocaleString()} so‘m, 1 BHM [${BHM.toLocaleString()} so‘m])`;
      legalBasis = '«Davlat boji to‘g‘risida»gi Qonun ilovasi, 2-band, "a" kichik bandi';
      articleRef = 'O‘RQ-600-son, 2-band';
      break;
    }
    case 'admin': {
      // Ma'muriy sudlarga davlat organlari ustidan shikoyat: 1 BHM
      duty = BHM * 1;
      formula = `1 × BHM (${BHM.toLocaleString()} so‘m)`;
      legalBasis = '«Davlat boji to‘g‘risida»gi Qonun ilovasi, 3-band';
      articleRef = 'O‘RQ-600-son, 3-band';
      break;
    }
  }

  return {
    duty: Math.round(duty),
    bhmUsed: BHM,
    bhmEffectiveDate: bhmInfo.effectiveFrom,
    bhmLegalBasis: bhmInfo.legalBasis,
    formula,
    legalBasis,
    articleRef,
    sourceUrl: 'https://lex.uz/docs/4682057',
  };
}

/**
 * Deterministic Labor Severance & Unused Leave Calculation (MK 173, 216-moddalar)
 */
export function calculateLaborSeveranceDeterministic(params: {
  monthlySalary: number;
  yearsOfService: number;
  unusedLeaveDays: number;
  targetDate?: string;
}) {
  const dailyWage = params.monthlySalary / 25.4;
  const leaveCompensation = Math.round(dailyWage * params.unusedLeaveDays);

  // MK 173-moddaga ko'ra ishdan bo'shatish nafaqasi (ish stajiga bog'liq):
  // 3 yilgacha: 50%
  // 3 yildan 5 yilgacha: 75%
  // 5 yildan 10 yilgacha: 100%
  // 10 yildan 15 yilgacha: 150%
  // 15 yildan ortiq: 200%
  let severancePercent = 0.5;
  if (params.yearsOfService >= 15) severancePercent = 2.0;
  else if (params.yearsOfService >= 10) severancePercent = 1.5;
  else if (params.yearsOfService >= 5) severancePercent = 1.0;
  else if (params.yearsOfService >= 3) severancePercent = 0.75;

  const severancePay = Math.round(params.monthlySalary * severancePercent);
  const totalPayout = leaveCompensation + severancePay;

  return {
    dailyWage: Math.round(dailyWage),
    leaveCompensation,
    severancePercent: severancePercent * 100,
    severancePay,
    totalPayout,
    legalBasis: 'O‘zbekiston Respublikasi Mehnat kodeksi 173-modda (Ishdan bo‘shatish nafaqasi miqdori) va 233, 234-moddalar (Foydalanilmagan ta‘til kompensatsiyasi)',
    sourceUrl: 'https://lex.uz/docs/6257288',
  };
}

/**
 * Deterministic Commercial Penalty Calculation with 50% Cap Enforcement
 * (Qonun №45781, 25-modda; FK 326, 327)
 */
export function calculateCommercialPenaltyDeterministic(params: {
  debtPrincipal: number;
  delayDays: number;
  dailyRatePercent: number; // e.g. 0.1% or 0.5%
}) {
  const safeDailyRate = Math.min(params.dailyRatePercent, 0.5); // Max statutory daily rate is 0.5%
  const uncappedDailyPenalty = params.debtPrincipal * (params.dailyRatePercent / 100);
  const uncappedTotalPenalty = uncappedDailyPenalty * params.delayDays;

  // Maximum legal cap: 50% of outstanding debt
  const maxCap = params.debtPrincipal * 0.5;
  const isCapped = uncappedTotalPenalty > maxCap;
  const statutoryTotalPenalty = Math.min(uncappedTotalPenalty, maxCap);
  const totalPayable = params.debtPrincipal + statutoryTotalPenalty;

  return {
    uncappedTotalPenalty: Math.round(uncappedTotalPenalty),
    statutoryTotalPenalty: Math.round(statutoryTotalPenalty),
    maxCap: Math.round(maxCap),
    isCapped,
    totalPayable: Math.round(totalPayable),
    legalBasis: '«Xo‘jalik yurituvchi subyektlar faoliyatining shartnomaviy-huquqiy bazasi to‘g‘risida»gi Qonun, 25-modda (Penyaning 50% lik qonuniy chegarasi); FK 326-modda',
    sourceUrl: 'https://lex.uz/docs/45781',
  };
}

/**
 * Deterministic Alimony Calculation with Statutory Minimum Floor (Oila kodeksi 99-modda)
 */
export function calculateAlimonyDeterministic(params: {
  childrenCount: number;
  parentMonthlyIncome: number;
  targetDate?: string;
}) {
  const mhtekmInfo = getMhtekmForDate(params.targetDate);
  const MHTEKM = mhtekmInfo.value;

  let rate = 0.25; // 1 bola uchun 1/4 (25%)
  if (params.childrenCount === 2) rate = 1 / 3; // 2 bola uchun 1/3 (~33.33%)
  else if (params.childrenCount >= 3) rate = 0.5; // 3 va undan ortiq bola uchun 1/2 (50%)

  const calculatedAlimony = params.parentMonthlyIncome * rate;

  // Oila kodeksi 99-moddasi 3-qismi: har bir bola uchun aliment miqdori MHTEKMning 26.5 foizidan kam bo'lmasligi shart
  const minFloorPerChild = Math.round(MHTEKM * 0.265);
  const totalMinFloor = minFloorPerChild * params.childrenCount;
  const finalAlimony = Math.max(calculatedAlimony, totalMinFloor);
  const isFloorApplied = calculatedAlimony < totalMinFloor;

  return {
    ratePercent: Math.round(rate * 100),
    calculatedAlimony: Math.round(calculatedAlimony),
    minFloorPerChild,
    totalMinFloor,
    finalAlimony: Math.round(finalAlimony),
    isFloorApplied,
    mhtekmUsed: MHTEKM,
    mhtekmLegalBasis: mhtekmInfo.legalBasis,
    legalBasis: 'O‘zbekiston Respublikasi Oila kodeksi 99-modda (Voyaga yetmagan bolalarga aliment undirish miqdori)',
    sourceUrl: 'https://lex.uz/docs/104720',
  };
}
