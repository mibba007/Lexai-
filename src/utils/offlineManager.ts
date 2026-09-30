/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Oflayn rejim va lokal xotira (localStorage) boshqaruv moduli.
 * Internet tarmog'i uzilgan yoki foydalanuvchi oflayn rejimni faollashtirganda
 * to'liq lokal qonunchilik bazasi, shablonlar generatori va qoralamalarni
 * saqlash hamda tiklashni ta'minlaydi.
 */

import { useState, useEffect, useCallback } from 'react';

export interface OfflineDraft {
  templateId: string;
  formValues: Record<string, string>;
  customText: string | null;
  savedAt: string;
  title: string;
}

const DRAFT_STORAGE_KEY = 'lexai_offline_doc_draft_v1';
const OFFLINE_MODE_PREF_KEY = 'lexai_offline_mode_preference';

/**
 * Hook to manage network status and offline mode preferences
 */
export function useOfflineMode() {
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  });

  const [isForcedOffline, setIsForcedOffline] = useState<boolean>(() => {
    try {
      return localStorage.getItem(OFFLINE_MODE_PREF_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [lastSavedDraft, setLastSavedDraft] = useState<OfflineDraft | null>(() => {
    try {
      const saved = localStorage.getItem(DRAFT_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const toggleForcedOffline = useCallback(() => {
    setIsForcedOffline((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(OFFLINE_MODE_PREF_KEY, String(next));
      } catch (e) {
        console.warn('Failed to save offline preference:', e);
      }
      return next;
    });
  }, []);

  const saveDraft = useCallback((
    templateId: string,
    formValues: Record<string, string>,
    customText: string | null,
    title: string
  ) => {
    const draft: OfflineDraft = {
      templateId,
      formValues,
      customText,
      savedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      title,
    };
    try {
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
      setLastSavedDraft(draft);
      return true;
    } catch (e) {
      console.warn('Failed to save offline draft:', e);
      return false;
    }
  }, []);

  const clearDraft = useCallback(() => {
    try {
      localStorage.removeItem(DRAFT_STORAGE_KEY);
      setLastSavedDraft(null);
    } catch (e) {
      console.warn('Failed to clear offline draft:', e);
    }
  }, []);

  // Effective offline state: either physically offline or user selected forced offline
  const isEffectiveOffline = !isOnline || isForcedOffline;

  return {
    isOnline,
    isForcedOffline,
    isEffectiveOffline,
    toggleForcedOffline,
    lastSavedDraft,
    saveDraft,
    clearDraft,
  };
}

/**
 * Intelligent client-side legal text enhancer for offline mode.
 * Enhances legal documents with standard O'zDSt 1157:2008 clauses,
 * anti-corruption norms, dispute resolution jurisdiction, and formatting without any server call.
 */
export function synthesizeOfflineDocumentEnhancement(
  currentText: string,
  docType: string,
  userDetails: Record<string, string>,
  customInstructions?: string
): string {
  let enhanced = currentText.trim();

  // If text doesn't contain anti-corruption clause, inject it
  const hasCorruptionClause = /korruptsiya|коррупция/i.test(enhanced);
  if (!hasCorruptionClause && !enhanced.includes('ARIZA') && !enhanced.includes('АРИЗА')) {
    const antiCorruptionSection = `\n\nKORRUKSIYAGA QARSHI KURASHISH VA HALOLLIK SHARTI:
Taraflar ushbu shartnoma bo‘yicha o‘z majburiyatlarini bajarishda O‘zbekiston Respublikasining «Korrupsiyaga qarshi kurashish to‘g‘risida»gi Qonuni talablariga qat‘iy rioya qiladilar. Shartnomani tuzish, ijro etish yoki bekor qilish jarayonida har qanday noqonuniy to‘lovlar, pora berish, moddiy yoki nomoddiy naf taqdim etish qat‘iyan taqiqlanadi.`;
    
    // Insert before rekvizitlar if present, else append
    const rekvizitIdx = enhanced.search(/(TARAFLARNING|TOMONLARNING)\s+(YURIDIK\s+)?(REKVIZITLARI|MANZILLARI)/i);
    if (rekvizitIdx !== -1) {
      enhanced = enhanced.slice(0, rekvizitIdx) + antiCorruptionSection + '\n\n' + enhanced.slice(rekvizitIdx);
    } else {
      enhanced += antiCorruptionSection;
    }
  }

  // If text doesn't have standard Force Majeure clause
  const hasForceMajeure = /fors-major|yengib bo‘lmas kuch|форс-мажор/i.test(enhanced);
  if (!hasForceMajeure && !enhanced.includes('ARIZA') && !enhanced.includes('TILXAT')) {
    const forceMajeureSection = `\n\nFORS-MAJOR (YENGIB BO‘LMAS KUCH) HOLATLARI:
1. Taraflardan hech biri yengib bo‘lmas kuch holatlari (tabiiy ofatlar, harbiy harakatlar, davlat hokimiyati cheklovlari) yuz berganda majburiyatlarni to‘liq yoki qisman bajarmaganlik uchun javobgar bo‘lmaydi.
2. Bunday holatlar yuz berganda tegishli taraf 3 (uch) kun muddatda ikkinchi tarafni yozma xabardor qilishi va O‘zbekiston Respublikasi Savdo-sanoat palatasining tegishli tasdiqnomasini taqdim etishi shart.`;

    const rekvizitIdx = enhanced.search(/(TARAFLARNING|TOMONLARNING)\s+(YURIDIK\s+)?(REKVIZITLARI|MANZILLARI)/i);
    if (rekvizitIdx !== -1) {
      enhanced = enhanced.slice(0, rekvizitIdx) + forceMajeureSection + '\n\n' + enhanced.slice(rekvizitIdx);
    } else {
      enhanced += forceMajeureSection;
    }
  }

  // If user provided custom instructions (e.g. confidentiality or jurisdiction)
  if (customInstructions && customInstructions.trim()) {
    const customSection = `\n\nQO‘SHIMCHA KELISHILGAN SHARTLAR:
Taraflarning o‘zaro kelishuviga ko‘ra: ${customInstructions.trim()}`;
    const rekvizitIdx = enhanced.search(/(TARAFLARNING|TOMONLARNING)\s+(YURIDIK\s+)?(REKVIZITLARI|MANZILLARI)/i);
    if (rekvizitIdx !== -1) {
      enhanced = enhanced.slice(0, rekvizitIdx) + customSection + '\n\n' + enhanced.slice(rekvizitIdx);
    } else {
      enhanced += customSection;
    }
  }

  return enhanced;
}
