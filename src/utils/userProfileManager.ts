/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Foydalanuvchi Shaxsiy Profili (My Profile) va ma'lumotlarni xavfsiz boshqarish moduli.
 * Foydalanuvchining umumiy rekvizitlari (F.I.Sh., Pasport ma'lumotlari, JSHSHIR/PINFL, STIR/TIN,
 * manzil, telefon va korxona rekvizitlari)ni lokal xotirada xavfsiz saqlaydi hamda
 * Hujjatlar generatori (DocumentGenerator)da shartnomalarni 1 tugma bilan avtomatik to'ldirishni ta'minlaydi.
 */

import { useState, useEffect, useCallback } from 'react';
import { LegalDocumentTemplate } from '../types';

export interface UserLegalProfile {
  // Jismoniy shaxs rekvizitlari
  fullName: string;
  passportSeriesNumber: string; // e.g. AB 1234567
  passportIssuedBy?: string;    // e.g. Mirobod tuman IIB
  passportIssuedDate?: string;  // e.g. 2022-05-14
  pinfl: string;                // 14 xonali JSHSHIR (PINFL)
  tin: string;                  // 9 xonali STIR (INN)
  address: string;              // Yashash manzili
  phoneNumber: string;          // Telefon raqami
  email?: string;
  birthDate?: string;

  // Yuridik shaxs / YaTT rekvizitlari (Ixtiyoriy biznes profili)
  isBusinessEntity?: boolean;
  companyName?: string;         // Tashkilot nomi (masalan: «ALFA TECH» MChJ)
  directorPosition?: string;    // Lavozim (Direktor / Boshqaruv raisi)
  directorFullName?: string;    // Rahbar F.I.Sh.
  companyTin?: string;          // Korxona STIRi
  mfo?: string;                 // Bank MFO kodi (5 xonali)
  bankAccount?: string;         // 20 xonali hisob-kitob raqami (20208...)
  bankName?: string;            // Bank nomi
  companyAddress?: string;      // Yuridik manzil

  lastUpdated?: string;
}

const STORAGE_KEY = 'lexai_user_legal_profile';
const PROFILE_UPDATE_EVENT = 'lexai_profile_updated';

// Standart namunaviy boshlang'ich profil (agar foydalanuvchi hali to'ldirmagan bo'lsa)
export const DEFAULT_SAMPLE_USER_PROFILE: UserLegalProfile = {
  fullName: 'Usmonov Jasur Rustamovich',
  passportSeriesNumber: 'AB 1234567',
  passportIssuedBy: 'Toshkent shahar Mirobod tuman IIB',
  passportIssuedDate: '2022-05-14',
  pinfl: '31204951234567',
  tin: '308945612',
  address: 'Toshkent sh., Mirobod t., Oybek ko‘chasi, 12-uy, 45-xonadon',
  phoneNumber: '+998 90 123-45-67',
  email: 'mtabekkuntibardiyev@gmail.com',
  birthDate: '1995-04-12',
  isBusinessEntity: true,
  companyName: '«ALFA GLOBAL TECH» MChJ',
  directorPosition: 'Direktor',
  directorFullName: 'Karimov Alisher Baxtiyorovich',
  companyTin: '308945612',
  mfo: '00444',
  bankAccount: '20208000900123456789',
  bankName: 'ATIB «Ipoteka Bank» Toshkent filiali',
  companyAddress: 'Toshkent sh., Mirobod t., Nukus ko‘chasi, 24-uy',
  lastUpdated: new Date().toISOString(),
};

/**
 * Lokal xotiradan profilni xavfsiz yuklab oladi
 */
export function getUserProfile(): UserLegalProfile | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.warn('[UserProfileManager] Profilni yuklashda xatolik:', err);
    return null;
  }
}

/**
 * Profilni lokal xotiraga xavfsiz saqlaydi va barcha tinglovchilarni ogohlantiradi
 */
export function saveUserProfile(profile: UserLegalProfile): void {
  try {
    const toSave: UserLegalProfile = {
      ...profile,
      lastUpdated: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    window.dispatchEvent(new CustomEvent(PROFILE_UPDATE_EVENT, { detail: toSave }));
  } catch (err) {
    console.error('[UserProfileManager] Profilni saqlashda xatolik:', err);
  }
}

/**
 * Profilni tozalaydi
 */
export function clearUserProfile(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(PROFILE_UPDATE_EVENT, { detail: null }));
  } catch (err) {
    console.error('[UserProfileManager] Profilni tozalashda xatolik:', err);
  }
}

/**
 * Jismoniy shaxs rekvizitlarini rasmiy O'zDSt 1157:2008 standartiga mos matnga aylantiradi
 */
export function formatIndividualRequisites(p: UserLegalProfile): string {
  const parts: string[] = [];
  if (p.fullName) parts.push(p.fullName);
  
  const passParts: string[] = [];
  if (p.passportSeriesNumber) passParts.push(`Pasport/ID: ${p.passportSeriesNumber}`);
  if (p.passportIssuedBy) passParts.push(p.passportIssuedBy);
  if (p.passportIssuedDate) passParts.push(p.passportIssuedDate);
  if (passParts.length > 0) parts.push(passParts.join(', '));

  if (p.pinfl) parts.push(`JSHSHIR (PINFL): ${p.pinfl}`);
  if (p.tin) parts.push(`STIR (INN): ${p.tin}`);
  if (p.address) parts.push(`Manzil: ${p.address}`);
  if (p.phoneNumber) parts.push(`Tel: ${p.phoneNumber}`);

  return parts.join(', ');
}

/**
 * Yuridik shaxs rekvizitlarini rasmiy formatga aylantiradi
 */
export function formatBusinessRequisites(p: UserLegalProfile): string {
  const parts: string[] = [];
  if (p.companyName) {
    parts.push(p.companyName);
  }
  if (p.directorFullName) {
    parts.push(`nomidan ${p.directorPosition || 'direktor'} ${p.directorFullName} (Ustav asosida)`);
  }
  if (p.companyTin) parts.push(`STIR: ${p.companyTin}`);
  if (p.companyAddress) parts.push(`Yuridik manzil: ${p.companyAddress}`);
  if (p.bankAccount) parts.push(`H/r: ${p.bankAccount}`);
  if (p.mfo) parts.push(`MFO: ${p.mfo}`);
  if (p.bankName) parts.push(`Bank: ${p.bankName}`);
  if (p.phoneNumber) parts.push(`Tel: ${p.phoneNumber}`);

  return parts.join(', ');
}

/**
 * Foydalanuvchi profili maydonlarini shablon maydonlariga intellektual ravishda bog'laydi
 * (Auto-fill Template mapping engine)
 */
export function autoFillTemplateFromProfile(
  profile: UserLegalProfile,
  template: LegalDocumentTemplate,
  asRole: 'secondParty' | 'firstParty' = 'secondParty' // Odatda foydalanuvchi ikkinchi taraf (xodim, ijarachi, da'vogar, vakil) bo'ladi
): { updatedValues: Record<string, string>; filledCount: number; matchedFieldLabels: string[] } {
  const updatedValues: Record<string, string> = {};
  const matchedFieldLabels: string[] = [];

  const formattedIndiv = formatIndividualRequisites(profile);
  const formattedBiz = formatBusinessRequisites(profile);

  // Shablonning har bir maydonini tekshiramiz
  template.fields.forEach((field) => {
    const k = field.key.toLowerCase();
    let valToSet: string | null = null;

    // 1. MEHNAT SHARTNOMASI MAYDONLARI
    if (k === 'employeename' || k === 'employeefullname') {
      valToSet = profile.fullName;
    } else if (k === 'employeepassport' || k === 'employeepassportpinfl') {
      const passInfo = [
        `Pasport: ${profile.passportSeriesNumber || 'AB 1234567'}`,
        profile.passportIssuedBy ? profile.passportIssuedBy : '',
        profile.pinfl ? `JSHSHIR (PINFL): ${profile.pinfl}` : '',
      ].filter(Boolean).join(', ');
      valToSet = passInfo;
    } else if (k === 'employeeaddress') {
      valToSet = `${profile.address}${profile.phoneNumber ? ', Tel: ' + profile.phoneNumber : ''}`;
    }

    // 2. IJARAGA BERISH SHARTNOMASI MAYDONLARI
    else if (k === 'tenantinfo' && asRole === 'secondParty') {
      valToSet = formattedIndiv;
    } else if (k === 'landlordinfo' && asRole === 'firstParty') {
      valToSet = formattedIndiv;
    } else if (k === 'lesseecompany' && asRole === 'secondParty' && profile.isBusinessEntity) {
      valToSet = `${profile.companyName || ''} nomidan ${profile.directorPosition || 'direktor'} ${profile.directorFullName || profile.fullName}`;
    } else if (k === 'lessorcompany' && asRole === 'firstParty' && profile.isBusinessEntity) {
      valToSet = `${profile.companyName || ''} nomidan ${profile.directorPosition || 'direktor'} ${profile.directorFullName || profile.fullName}`;
    }

    // 3. DOVERENNOST / ISHONCHNOMA MAYDONLARI
    else if ((k === 'agentname' || k === 'agentinfo') && asRole === 'secondParty') {
      valToSet = k === 'agentinfo' ? formattedIndiv : profile.fullName;
    } else if (k === 'agentpassport' && asRole === 'secondParty') {
      valToSet = `Pasport: ${profile.passportSeriesNumber}, ${profile.passportIssuedBy || 'IIB'}, JSHSHIR: ${profile.pinfl}`;
    } else if (k === 'companyname' && asRole === 'firstParty' && profile.companyName) {
      valToSet = profile.companyName;
    } else if (k === 'directorname' && asRole === 'firstParty') {
      valToSet = profile.directorFullName || profile.fullName;
    } else if (k === 'principalinfo' && asRole === 'firstParty') {
      valToSet = formattedIndiv;
    }

    // 4. SUD DA'VOLARI VA TALABNOMALAR
    else if (k === 'plaintiffinfo' || k === 'applicantinfo') {
      valToSet = formattedIndiv;
    } else if (k === 'applicantfullname') {
      valToSet = `${profile.fullName} dan`;
    } else if (k === 'applicantaddressandphone') {
      valToSet = `${profile.address}, Tel: ${profile.phoneNumber}`;
    }

    // 5. QARZ SHARTNOMASI VA TILXAT
    else if (k === 'borrowerinfo' && asRole === 'secondParty') {
      valToSet = formattedIndiv;
    } else if (k === 'lenderinfo' && asRole === 'firstParty') {
      valToSet = formattedIndiv;
    }

    // 6. XIZMAT KO'RSATISH VA OLDI-SOTDI
    else if (k === 'customer' && asRole === 'secondParty') {
      valToSet = profile.isBusinessEntity ? formattedBiz : formattedIndiv;
    } else if (k === 'serviceprovider' && asRole === 'firstParty') {
      valToSet = profile.isBusinessEntity ? formattedBiz : formattedIndiv;
    } else if (k === 'buyercompany' && asRole === 'secondParty') {
      valToSet = profile.companyName || profile.fullName;
    } else if (k === 'sellercompany' && asRole === 'firstParty') {
      valToSet = profile.companyName || profile.fullName;
    }

    // 7. ARIZALAR VA BUYRUQLAR
    else if (k === 'applicantname' || k === 'employeename') {
      valToSet = profile.fullName;
    }

    // Agar moslik topilsa, qiymatni o'rnatamiz
    if (valToSet) {
      updatedValues[field.key] = valToSet;
      matchedFieldLabels.push(field.label);
    }
  });

  return {
    updatedValues,
    filledCount: Object.keys(updatedValues).length,
    matchedFieldLabels,
  };
}

/**
 * React hook: komponentlarda foydalanuvchi profilini reaktiv boshqarish
 */
export function useUserProfile() {
  const [profile, setProfileState] = useState<UserLegalProfile | null>(() => getUserProfile());

  const reloadProfile = useCallback(() => {
    setProfileState(getUserProfile());
  }, []);

  const saveProfile = useCallback((newProfile: UserLegalProfile) => {
    saveUserProfile(newProfile);
    setProfileState(newProfile);
  }, []);

  const resetProfile = useCallback(() => {
    clearUserProfile();
    setProfileState(null);
  }, []);

  useEffect(() => {
    const handler = (e: any) => {
      setProfileState(e.detail);
    };
    window.addEventListener(PROFILE_UPDATE_EVENT, handler);
    return () => window.removeEventListener(PROFILE_UPDATE_EVENT, handler);
  }, []);

  const isProfileComplete = Boolean(
    profile && profile.fullName && profile.passportSeriesNumber && (profile.pinfl || profile.tin)
  );

  return {
    profile,
    saveProfile,
    resetProfile,
    reloadProfile,
    isProfileComplete,
  };
}
