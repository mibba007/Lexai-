/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Mening Profilim (My Profile) komponenti.
 * Foydalanuvchining shaxsiy va yuridik ma'lumotlarini (F.I.Sh, Pasport/ID karta,
 * JSHSHIR/PINFL, STIR/TIN, yashash manzili, telefon va korxona rekvizitlari)
 * xavfsiz saqlash va boshqarish markazi.
 */

import React, { useState, useEffect } from 'react';
import {
  User,
  Shield,
  CreditCard,
  Building2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Save,
  CheckCircle2,
  AlertCircle,
  FileText,
  Zap,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Lock,
  Eye,
  Briefcase
} from 'lucide-react';
import {
  UserLegalProfile,
  useUserProfile,
  DEFAULT_SAMPLE_USER_PROFILE,
  formatIndividualRequisites,
  formatBusinessRequisites
} from '../utils/userProfileManager';

interface MyProfileViewProps {
  onNavigateToGenerator: () => void;
}

export const MyProfileView: React.FC<MyProfileViewProps> = ({
  onNavigateToGenerator,
}) => {
  const { profile, saveProfile, resetProfile } = useUserProfile();

  // Form states
  const [formData, setFormData] = useState<UserLegalProfile>(() => {
    return profile || DEFAULT_SAMPLE_USER_PROFILE;
  });

  const [activeTab, setActiveTab] = useState<'individual' | 'business'>('individual');
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (profile) {
      setFormData(profile);
    }
  }, [profile]);

  const handleChange = (key: keyof UserLegalProfile, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    saveProfile(formData);
    setSaveSuccessMessage('Profil ma‘lumotlari xavfsiz saqlandi! Hujjatlar generatorida «Auto-fill Template» orqali foydalanishingiz mumkin.');
    setTimeout(() => {
      setSaveSuccessMessage(null);
    }, 4000);
  };

  const handleFillSample = () => {
    setFormData(DEFAULT_SAMPLE_USER_PROFILE);
    saveProfile(DEFAULT_SAMPLE_USER_PROFILE);
    setSaveSuccessMessage('Namunaviy rekvizitlar yuklandi va saqlandi!');
    setTimeout(() => setSaveSuccessMessage(null), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Haqiqatan ham saqlangan profil ma‘lumotlarini tozalamoqchimisiz?')) {
      resetProfile();
      setFormData({
        fullName: '',
        passportSeriesNumber: '',
        passportIssuedBy: '',
        passportIssuedDate: '',
        pinfl: '',
        tin: '',
        address: '',
        phoneNumber: '',
        email: '',
        birthDate: '',
        isBusinessEntity: false,
      });
      setSaveSuccessMessage('Profil tozalandi.');
      setTimeout(() => setSaveSuccessMessage(null), 3000);
    }
  };

  // Validation checks
  const isPinflValid = formData.pinfl?.replace(/\D/g, '').length === 14;
  const isTinValid = formData.tin?.replace(/\D/g, '').length === 9;
  const isPassportValid = Boolean(formData.passportSeriesNumber?.trim().length >= 7);

  return (
    <div className="max-w-6xl mx-auto p-3 sm:p-6 space-y-6 animate-fadeIn">
      {/* Top Hero Card */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-0.5 shadow-lg shadow-cyan-950/50 flex items-center justify-center shrink-0">
            <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
              <User className="w-7 h-7 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Mening Profilim (My Profile)
              </h1>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
                Xavfsiz Lokal Xotira
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 flex items-center gap-1">
                <Lock className="w-3 h-3" />
                Maxfiy (Local-only)
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
              F.I.Sh., Pasport ma‘lumotlari, JSHSHIR (PINFL) va STIR (TIN) rekvizitlaringizni kiriting. Ushbu ma‘lumotlar Hujjatlar Generatori (DocumentGenerator)da shartnomalarni 1 tugma bilan avtomatik to‘ldirishda ishlatiladi.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap self-start md:self-center shrink-0">
          <button
            type="button"
            onClick={handleFillSample}
            id="fill-sample-profile-btn"
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold transition cursor-pointer flex items-center gap-1.5"
            title="Namunaviy to‘ldirilgan ma‘lumotlarni yuklash"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Namunaviy yuklash</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-2 rounded-xl bg-slate-800/60 hover:bg-red-950/40 text-slate-400 hover:text-red-300 border border-slate-700/60 text-xs font-semibold transition cursor-pointer flex items-center gap-1"
            title="Profilni tozalash"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Tozalash</span>
          </button>
        </div>
      </div>

      {/* Success Notification Toast */}
      {saveSuccessMessage && (
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs sm:text-sm font-semibold flex items-center justify-between shadow-lg shadow-emerald-950/30 animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{saveSuccessMessage}</span>
          </div>
          <button
            onClick={() => setSaveSuccessMessage(null)}
            className="text-emerald-400 hover:text-white px-2 py-0.5 text-xs font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Tabs & Main Profile Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Form Column (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Sub-profile Tabs */}
          <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 p-1.5 rounded-2xl">
            <button
              onClick={() => setActiveTab('individual')}
              id="tab-profile-individual"
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'individual'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-950/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Jismoniy Shaxs Rekvizitlari</span>
            </button>

            <button
              onClick={() => setActiveTab('business')}
              id="tab-profile-business"
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'business'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-950/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Tashkilot / Biznes Rekvizitlari</span>
            </button>
          </div>

          {/* Form Card */}
          <form onSubmit={handleSave} className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-7 space-y-5 shadow-xl">
            
            {activeTab === 'individual' ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-cyan-400" />
                    Pasport, PINFL va Shaxsiy Ma‘lumotlar
                  </h3>
                  <span className="text-[11px] text-slate-400">Majburiy rekvizitlar</span>
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    To‘liq F.I.Sh. (Familiya, Ism, Sharifingiz) <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    placeholder="Masalan: Usmonov Jasur Rustamovich"
                    id="input-profile-fullname"
                    className="w-full px-4 py-2.5 bg-slate-950/70 border border-slate-700/80 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                    required
                  />
                </div>

                {/* Passport & PINFL in 2 columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-semibold text-slate-300">
                        Pasport yoki ID-karta seriya va raqami <span className="text-rose-400">*</span>
                      </label>
                      {formData.passportSeriesNumber && (
                        <span className={`text-[10px] font-bold ${isPassportValid ? 'text-emerald-400' : 'text-amber-400'}`}>
                          {isPassportValid ? '✓ Standart' : 'Tekshiring'}
                        </span>
                      )}
                    </div>
                    <input
                      type="text"
                      value={formData.passportSeriesNumber}
                      onChange={(e) => handleChange('passportSeriesNumber', e.target.value.toUpperCase())}
                      placeholder="Masalan: AB 1234567"
                      id="input-profile-passport"
                      className="w-full px-4 py-2.5 bg-slate-950/70 border border-slate-700/80 rounded-xl text-xs sm:text-sm text-white font-mono placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                      required
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-semibold text-slate-300">
                        JSHSHIR / PINFL (14 xonali raqam) <span className="text-rose-400">*</span>
                      </label>
                      {formData.pinfl && (
                        <span className={`text-[10px] font-bold ${isPinflValid ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {isPinflValid ? '✓ 14 xonali to‘liq' : `${formData.pinfl.replace(/\D/g, '').length}/14 xona`}
                        </span>
                      )}
                    </div>
                    <input
                      type="text"
                      value={formData.pinfl}
                      onChange={(e) => handleChange('pinfl', e.target.value.replace(/\D/g, '').slice(0, 14))}
                      placeholder="Masalan: 31204951234567"
                      id="input-profile-pinfl"
                      maxLength={14}
                      className="w-full px-4 py-2.5 bg-slate-950/70 border border-slate-700/80 rounded-xl text-xs sm:text-sm text-white font-mono placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                      required
                    />
                  </div>
                </div>

                {/* Passport Issued By & Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Kim tomonidan berilgan (IIB / IIO FMB)
                    </label>
                    <input
                      type="text"
                      value={formData.passportIssuedBy || ''}
                      onChange={(e) => handleChange('passportIssuedBy', e.target.value)}
                      placeholder="Toshkent shahar Mirobod tuman IIB"
                      id="input-profile-issuedby"
                      className="w-full px-4 py-2.5 bg-slate-950/70 border border-slate-700/80 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Berilgan sana
                    </label>
                    <input
                      type="date"
                      value={formData.passportIssuedDate || ''}
                      onChange={(e) => handleChange('passportIssuedDate', e.target.value)}
                      id="input-profile-issueddate"
                      className="w-full px-4 py-2.5 bg-slate-950/70 border border-slate-700/80 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                {/* TIN (STIR) & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-semibold text-slate-300">
                        STIR / TIN (Soliq to‘lovchi kodi - 9 xonali)
                      </label>
                      {formData.tin && (
                        <span className={`text-[10px] font-bold ${isTinValid ? 'text-emerald-400' : 'text-amber-400'}`}>
                          {isTinValid ? '✓ 9 xona' : `${formData.tin.replace(/\D/g, '').length}/9`}
                        </span>
                      )}
                    </div>
                    <input
                      type="text"
                      value={formData.tin}
                      onChange={(e) => handleChange('tin', e.target.value.replace(/\D/g, '').slice(0, 9))}
                      placeholder="Masalan: 308945612"
                      id="input-profile-tin"
                      maxLength={9}
                      className="w-full px-4 py-2.5 bg-slate-950/70 border border-slate-700/80 rounded-xl text-xs sm:text-sm text-white font-mono placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Telefon raqamingiz
                    </label>
                    <input
                      type="text"
                      value={formData.phoneNumber}
                      onChange={(e) => handleChange('phoneNumber', e.target.value)}
                      placeholder="+998 90 123-45-67"
                      id="input-profile-phone"
                      className="w-full px-4 py-2.5 bg-slate-950/70 border border-slate-700/80 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                {/* Residential Address */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Doimiy ro‘yxatdan o‘tgan (yashash) manzili <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    rows={2}
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    placeholder="Toshkent shahri, Mirobod tumani, Oybek ko‘chasi, 12-uy, 45-xonadon"
                    id="input-profile-address"
                    className="w-full px-4 py-2 bg-slate-950/70 border border-slate-700/80 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    required
                  />
                </div>
              </div>
            ) : (
              /* Business Profile Tab */
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-cyan-400" />
                    Kompaniya, MChJ yoki YaTT Rekvizitlari
                  </h3>
                  <span className="text-[11px] text-cyan-400 font-medium">B2B shartnomalar uchun</span>
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Tashkilot yoki YaTT to‘liq nomi
                  </label>
                  <input
                    type="text"
                    value={formData.companyName || ''}
                    onChange={(e) => handleChange('companyName', e.target.value)}
                    placeholder="«ALFA GLOBAL TECH» MChJ"
                    id="input-profile-companyname"
                    className="w-full px-4 py-2.5 bg-slate-950/70 border border-slate-700/80 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                {/* Director details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Rahbar lavozimi
                    </label>
                    <input
                      type="text"
                      value={formData.directorPosition || 'Direktor'}
                      onChange={(e) => handleChange('directorPosition', e.target.value)}
                      placeholder="Direktor / Bosh direktor"
                      id="input-profile-directorposition"
                      className="w-full px-4 py-2.5 bg-slate-950/70 border border-slate-700/80 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Rahbar F.I.Sh. (Ustav asosida harakat qiluvchi)
                    </label>
                    <input
                      type="text"
                      value={formData.directorFullName || ''}
                      onChange={(e) => handleChange('directorFullName', e.target.value)}
                      placeholder="Karimov Alisher Baxtiyorovich"
                      id="input-profile-directorname"
                      className="w-full px-4 py-2.5 bg-slate-950/70 border border-slate-700/80 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                {/* Company TIN & Bank Account */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Korxona STIR (INN) raqami
                    </label>
                    <input
                      type="text"
                      value={formData.companyTin || ''}
                      onChange={(e) => handleChange('companyTin', e.target.value.replace(/\D/g, '').slice(0, 9))}
                      placeholder="308945612"
                      id="input-profile-companytin"
                      maxLength={9}
                      className="w-full px-4 py-2.5 bg-slate-950/70 border border-slate-700/80 rounded-xl text-xs sm:text-sm text-white font-mono placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Hisob-kitob raqami (20 xonali H/r)
                    </label>
                    <input
                      type="text"
                      value={formData.bankAccount || ''}
                      onChange={(e) => handleChange('bankAccount', e.target.value.replace(/\s/g, '').slice(0, 20))}
                      placeholder="20208000900123456789"
                      id="input-profile-bankaccount"
                      maxLength={20}
                      className="w-full px-4 py-2.5 bg-slate-950/70 border border-slate-700/80 rounded-xl text-xs sm:text-sm text-white font-mono placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                {/* Bank MFO & Bank Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Bank MFO kodi (5 xonali)
                    </label>
                    <input
                      type="text"
                      value={formData.mfo || ''}
                      onChange={(e) => handleChange('mfo', e.target.value.replace(/\D/g, '').slice(0, 5))}
                      placeholder="00444"
                      id="input-profile-mfo"
                      maxLength={5}
                      className="w-full px-4 py-2.5 bg-slate-950/70 border border-slate-700/80 rounded-xl text-xs sm:text-sm text-white font-mono placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Bank nomi
                    </label>
                    <input
                      type="text"
                      value={formData.bankName || ''}
                      onChange={(e) => handleChange('bankName', e.target.value)}
                      placeholder="ATIB «Ipoteka Bank» Toshkent filiali"
                      id="input-profile-bankname"
                      className="w-full px-4 py-2.5 bg-slate-950/70 border border-slate-700/80 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                {/* Company Address */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Korxona yuridik manzili
                  </label>
                  <input
                    type="text"
                    value={formData.companyAddress || ''}
                    onChange={(e) => handleChange('companyAddress', e.target.value)}
                    placeholder="Toshkent sh., Mirobod t., Nukus ko‘chasi, 24-uy"
                    id="input-profile-companyaddress"
                    className="w-full px-4 py-2.5 bg-slate-950/70 border border-slate-700/80 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>
            )}

            {/* Save Buttons */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3 flex-wrap">
              <span className="text-[11px] text-slate-500 flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-cyan-500" />
                Ma‘lumotlar xavfsiz lokal brauzer xotirasida saqlanadi
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  id="save-user-profile-btn"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs sm:text-sm transition shadow-lg shadow-cyan-950/40 cursor-pointer flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Profilni Saqlash</span>
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Right Preview Column (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          
          {/* Quick Auto-fill Action Card */}
          <div className="bg-gradient-to-br from-amber-950/30 via-slate-900 to-slate-900 border border-amber-500/40 rounded-3xl p-5 sm:p-6 shadow-xl space-y-3.5 ring-1 ring-amber-500/20">
            <div className="flex items-center gap-2 text-amber-400">
              <Zap className="w-5 h-5 fill-amber-400" />
              <h3 className="text-sm font-bold uppercase tracking-wider">
                Shartnomalarni Avto-To‘ldirish
              </h3>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Saqlangan profil rekvizitlaringiz Hujjatlar Generatori (`DocumentGenerator`) dagi yangi shartnomalarda «Auto-fill Template» tugmasi orqali avtomatik to‘ldiriladi.
            </p>

            <button
              onClick={() => {
                handleSave();
                onNavigateToGenerator();
              }}
              id="goto-generator-autofill-btn"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-extrabold text-xs transition shadow-md shadow-amber-950/40 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Saqlash & Hujjatlar Generatoriga O‘tish</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Live Official Requisites Preview */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-3 shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-cyan-400" />
                Shartnomalardagi Ko‘rinishi
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                O‘zDSt 1157:2008
              </span>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-300 leading-relaxed space-y-2 select-text">
              <div className="text-cyan-400 font-bold uppercase text-[10px]">
                {activeTab === 'individual' ? 'Jismoniy Shaxs Rekvizitlari:' : 'Korxona Rekvizitlari:'}
              </div>
              <p className="whitespace-pre-wrap break-words">
                {activeTab === 'individual' 
                  ? formatIndividualRequisites(formData) || 'Rekvizitlar to‘ldirilmagan'
                  : formatBusinessRequisites(formData) || 'Korxona rekvizitlari to‘ldirilmagan'}
              </p>
            </div>

            <div className="text-[10px] text-slate-500 flex items-center gap-1">
              <Shield className="w-3 h-3 text-emerald-400" />
              <span>O‘zbekiston Respublikasi shartnomalar andozasi formatida</span>
            </div>
          </div>

          {/* Statutory ID Verification Card */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-4 sm:p-5 space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Qonunchilik Standartlari:
            </span>
            <ul className="text-xs text-slate-400 space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>JSHSHIR (PINFL)</strong> — Soliq va bank tizimlarida jismoniy shaxsning yagona 14 xonali pasport kodi.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>STIR (TIN)</strong> — Davlat soliq qo‘mitasi tomonidan berilgan 9 xonali identifikatsiya raqami.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>O‘zDSt 1157:2008</strong> — Ish yuritish va yuridik hujjatlarni rasmiylashtirish davlat standarti.
                </span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};
