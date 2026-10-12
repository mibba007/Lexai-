/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Aqlli Hujjat Muddatlari va Eslatmalar Boshqaruvi (Smart Document Expiration Manager).
 * Hujjatlar generatori (DocumentGenerator) va profil (MyProfile)da yaratilgan barcha shartnomalar,
 * ishonchnomalar, arizalar va ijara kelishuvlarining amal qilish muddatlarini (expiration dates)
 * avtomatik kuzatadi hamda 30 kun, 15 kun, 7 kun qolganda yoki muddati o'tganda
 * in-app dashboard ogohlantirishlarini (alertlarni) chiqaradi.
 */

import { useState, useEffect, useCallback } from 'react';

export type ContractType = 'labor' | 'lease' | 'power_of_attorney' | 'service' | 'supply' | 'loan' | 'other';
export type ContractExpiryStatus = 'ACTIVE' | 'EXPIRING_30_DAYS' | 'EXPIRING_7_DAYS' | 'EXPIRED' | 'RENEWED';

export interface TrackedContractDocument {
  id: string;
  title: string;
  templateId?: string;
  contractType: ContractType;
  parties: {
    firstParty: string;  // e.g. Ish beruvchi / Ijaraga beruvchi
    secondParty: string; // e.g. Xodim / Ijarachi
  };
  startDate: string;     // ISO YYYY-MM-DD
  expiryDate: string;    // ISO YYYY-MM-DD
  documentNumber?: string;
  governingLaw: string;  // e.g. "O'zR MK 105-modda" yoki "O'zR FK 554-modda"
  lexUrl?: string;
  notes?: string;
  status: ContractExpiryStatus;
  daysRemaining: number;
  isDismissed?: boolean;
  createdAt: string;
}

const STORAGE_KEY = 'lexai_tracked_contracts_v1';
const UPDATE_EVENT = 'lexai_contracts_updated';

// Helper to calculate days remaining
export function calculateDaysRemaining(expiryDateStr: string): number {
  if (!expiryDateStr) return 999;
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const expiry = new Date(expiryDateStr);
  expiry.setHours(0, 0, 0, 0);

  const diffTime = expiry.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// Helper to get status based on days remaining
export function getExpiryStatus(daysRemaining: number): ContractExpiryStatus {
  if (daysRemaining < 0) return 'EXPIRED';
  if (daysRemaining <= 7) return 'EXPIRING_7_DAYS';
  if (daysRemaining <= 30) return 'EXPIRING_30_DAYS';
  return 'ACTIVE';
}

// Initial realistic samples based on Uzbekistan business practices (e.g., 11-month lease, labor contract)
export const DEFAULT_SAMPLE_TRACKED_CONTRACTS: TrackedContractDocument[] = [
  {
    id: 'contract-lease-2026-01',
    title: 'Turar-joy ijara shartnomasi (Mirobod t., Oybek k.)',
    templateId: 'turar-joy-ijara-shartnomasi',
    contractType: 'lease',
    parties: {
      firstParty: 'Karimov Rustam Aliyevich (Ijaraga beruvchi)',
      secondParty: 'Usmonov Jasur Rustamovich (Ijarachi)',
    },
    startDate: '2025-11-20',
    expiryDate: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 18 days left (<=30 days)
    documentNumber: 'IJ-12/2025',
    governingLaw: 'O‘zR Fuqarolik kodeksi 554, 603-moddalari (11 oylik muddat va soliq ro‘yxati)',
    lexUrl: 'https://lex.uz/docs/111189',
    notes: 'Ijara muddati tugashidan 15 kun oldin taraflar shartnomani uzaytirish yoki bekor qilish to‘g‘risida xabardor qilishi lozim.',
    status: 'EXPIRING_30_DAYS',
    daysRemaining: 18,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'contract-labor-2026-02',
    title: 'Muddatli Mehnat shartnomasi (Bosh buxgalter)',
    templateId: 'mehnat-shartnomasi-namunaviy',
    contractType: 'labor',
    parties: {
      firstParty: '«ALFA GLOBAL TECH» MChJ (Direktor)',
      secondParty: 'Toshmatova Nargiza Anvarovna (Xodim)',
    },
    startDate: '2025-10-15',
    expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 5 days left (<=7 days urgent)
    documentNumber: 'MSH-45/2025',
    governingLaw: 'O‘zR Yangi Mehnat kodeksi 105-moddasi (Muddatli shartnomaning tugashi)',
    lexUrl: 'https://lex.uz/docs/6257288',
    notes: 'DIQQAT: MK 105-moddasiga ko‘ra, ish beruvchi xodimni shartnoma muddati tugashidan kamida 3 ish kuni oldin yozma ogohlantirishi shart!',
    status: 'EXPIRING_7_DAYS',
    daysRemaining: 5,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'contract-attorney-2026-03',
    title: 'Avtotransport vositasini boshqarish va tasarruf etish ishonchnomasi',
    templateId: 'ishonchnoma-avtotransport-boshqarish',
    contractType: 'power_of_attorney',
    parties: {
      firstParty: 'Usmonov Jasur Rustamovich (Ishonch bildiruvchi)',
      secondParty: 'Usmonov Otabek Rustamovich (Ishonchli vakil)',
    },
    startDate: '2023-11-15',
    expiryDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 45 days left (Active)
    documentNumber: 'ISH-099/2023',
    governingLaw: 'O‘zR Fuqarolik kodeksi 134, 139-moddalari (Maksimal 3 yillik amal qilish muddati)',
    lexUrl: 'https://lex.uz/docs/111189',
    notes: 'FK 139-moddasi: Ishonchnoma ko‘pi bilan 3 yil muddatga berilishi mumkin. Muddat ko‘rsatilmagan bo‘lsa, u berilgan kundan boshlab 1 yil davomida o‘z kuchini saqlaydi.',
    status: 'ACTIVE',
    daysRemaining: 45,
    createdAt: new Date().toISOString(),
  }
];

export function getStoredTrackedContracts(): TrackedContractDocument[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Seed with initial realistic contracts
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SAMPLE_TRACKED_CONTRACTS));
      return DEFAULT_SAMPLE_TRACKED_CONTRACTS;
    }
    const parsed: TrackedContractDocument[] = JSON.parse(raw);
    // Recalculate remaining days and status dynamically
    return parsed.map((doc) => {
      const remaining = calculateDaysRemaining(doc.expiryDate);
      return {
        ...doc,
        daysRemaining: remaining,
        status: getExpiryStatus(remaining),
      };
    });
  } catch (e) {
    console.warn('[SmartDocumentExpiration] Xotiradan o‘qishda eslatma:', e);
    return DEFAULT_SAMPLE_TRACKED_CONTRACTS;
  }
}

export function saveStoredTrackedContracts(contracts: TrackedContractDocument[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contracts));
    window.dispatchEvent(new CustomEvent(UPDATE_EVENT, { detail: contracts }));
  } catch (e) {
    console.error('[SmartDocumentExpiration] Saqlashda xatolik:', e);
  }
}

export function addTrackedContract(doc: Omit<TrackedContractDocument, 'id' | 'daysRemaining' | 'status' | 'createdAt'>): TrackedContractDocument {
  const all = getStoredTrackedContracts();
  const remaining = calculateDaysRemaining(doc.expiryDate);
  const newDoc: TrackedContractDocument = {
    ...doc,
    id: 'contract-' + Date.now(),
    daysRemaining: remaining,
    status: getExpiryStatus(remaining),
    createdAt: new Date().toISOString(),
  };
  const updated = [newDoc, ...all];
  saveStoredTrackedContracts(updated);
  return newDoc;
}

export function deleteTrackedContract(id: string): void {
  const all = getStoredTrackedContracts();
  const filtered = all.filter((c) => c.id !== id);
  saveStoredTrackedContracts(filtered);
}

export function prolongTrackedContract(id: string, additionalMonths: number = 12): void {
  const all = getStoredTrackedContracts();
  const updated = all.map((c) => {
    if (c.id === id) {
      const currentExpiry = new Date(c.expiryDate);
      currentExpiry.setMonth(currentExpiry.getMonth() + additionalMonths);
      const newExpiryStr = currentExpiry.toISOString().split('T')[0];
      const newDays = calculateDaysRemaining(newExpiryStr);
      return {
        ...c,
        expiryDate: newExpiryStr,
        daysRemaining: newDays,
        status: getExpiryStatus(newDays),
        notes: (c.notes || '') + `\n[${new Date().toLocaleDateString('uz-UZ')}]: Shartnoma qo‘shimcha ${additionalMonths} oyga uzaytirildi.`,
      };
    }
    return c;
  });
  saveStoredTrackedContracts(updated);
}

export function dismissContractAlert(id: string): void {
  const all = getStoredTrackedContracts();
  const updated = all.map((c) => (c.id === id ? { ...c, isDismissed: true } : c));
  saveStoredTrackedContracts(updated);
}

// React Hook for using smart notifications in components
export function useDocumentExpirationAlerts() {
  const [contracts, setContracts] = useState<TrackedContractDocument[]>(() => getStoredTrackedContracts());

  const refreshContracts = useCallback(() => {
    setContracts(getStoredTrackedContracts());
  }, []);

  useEffect(() => {
    const handler = (e: any) => {
      if (e.detail) {
        setContracts(e.detail);
      } else {
        refreshContracts();
      }
    };
    window.addEventListener(UPDATE_EVENT, handler);
    return () => window.removeEventListener(UPDATE_EVENT, handler);
  }, [refreshContracts]);

  // Active alerts that require user attention (<= 30 days or expired and not dismissed)
  const activeAlerts = contracts.filter((c) => (c.daysRemaining <= 30 || c.status === 'EXPIRED') && !c.isDismissed);
  const urgentAlerts = contracts.filter((c) => c.daysRemaining <= 7 && c.daysRemaining >= 0 && !c.isDismissed);
  const expiring30DaysAlerts = contracts.filter((c) => c.daysRemaining > 7 && c.daysRemaining <= 30 && !c.isDismissed);
  const expiredAlerts = contracts.filter((c) => c.daysRemaining < 0 && !c.isDismissed);

  return {
    contracts,
    activeAlerts,
    urgentAlerts,
    expiring30DaysAlerts,
    expiredAlerts,
    totalAlertCount: activeAlerts.length,
    urgentCount: urgentAlerts.length,
    addContract: addTrackedContract,
    deleteContract: deleteTrackedContract,
    prolongContract: prolongTrackedContract,
    dismissAlert: dismissContractAlert,
    refreshContracts,
  };
}
