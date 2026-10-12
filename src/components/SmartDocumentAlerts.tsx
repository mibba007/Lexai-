/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Smart Document Alerts & Expiration Dashboard (Aqlli Hujjat Muddatlari Boshqaruvi).
 * Tracks expiration dates of generated/signed contracts (e.g. 30 days left, 7 days left, expired)
 * and provides in-app dashboard alerts with Uzbekistan statutory renewal guidance.
 */

import React, { useState } from 'react';
import {
  Bell,
  AlertTriangle,
  Clock,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Plus,
  RefreshCw,
  Trash2,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  FileText,
  User,
  Zap,
  Info,
  X
} from 'lucide-react';
import {
  TrackedContractDocument,
  ContractType,
  useDocumentExpirationAlerts
} from '../utils/documentExpirationManager';
import { LexCanonicalLink } from './LexCanonicalLink';

interface SmartDocumentAlertsProps {
  onNavigateToGenerator?: (templateId?: string) => void;
  compactMode?: boolean;
}

export const SmartDocumentAlerts: React.FC<SmartDocumentAlertsProps> = ({
  onNavigateToGenerator,
  compactMode = false,
}) => {
  const {
    contracts,
    activeAlerts,
    urgentAlerts,
    expiring30DaysAlerts,
    expiredAlerts,
    totalAlertCount,
    urgentCount,
    addContract,
    deleteContract,
    prolongContract,
    dismissAlert,
  } = useDocumentExpirationAlerts();

  const [filter, setFilter] = useState<'all' | 'urgent' | '30days' | 'expired' | 'active'>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // New Contract Form State
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<ContractType>('lease');
  const [newFirstParty, setNewFirstParty] = useState('');
  const [newSecondParty, setNewSecondParty] = useState('');
  const [newStartDate, setNewStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [newExpiryDate, setNewExpiryDate] = useState(() => {
    const d = new Date();
    d.setMonth(d.getMonth() + 11); // Standard 11-month lease
    return d.toISOString().split('T')[0];
  });
  const [newDocNumber, setNewDocNumber] = useState('');
  const [newNotes, setNewNotes] = useState('');

  const handleCreateTracked = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newExpiryDate) return;

    let law = 'O‘zR Fuqarolik kodeksi 554-moddasi';
    let url = 'https://lex.uz/docs/111189';

    if (newType === 'labor') {
      law = 'O‘zR Yangi Mehnat kodeksi 105-moddasi (Muddatli mehnat shartnomasi)';
      url = 'https://lex.uz/docs/6257288#6258900';
    } else if (newType === 'power_of_attorney') {
      law = 'O‘zR Fuqarolik kodeksi 134, 139-moddalari (Maksimal 3 yil muddat)';
      url = 'https://lex.uz/docs/111189';
    }

    addContract({
      title: newTitle.trim(),
      contractType: newType,
      parties: {
        firstParty: newFirstParty.trim() || '1-taraf',
        secondParty: newSecondParty.trim() || '2-taraf',
      },
      startDate: newStartDate,
      expiryDate: newExpiryDate,
      documentNumber: newDocNumber.trim() || undefined,
      governingLaw: law,
      lexUrl: url,
      notes: newNotes.trim() || undefined,
    });

    setIsAddModalOpen(false);
    setSuccessToast(`«${newTitle}» hujjati muddatlari muvaffaqiyatli kuzatuvga qo‘shildi!`);
    setTimeout(() => setSuccessToast(null), 4000);

    // Reset form
    setNewTitle('');
    setNewFirstParty('');
    setNewSecondParty('');
    setNewDocNumber('');
    setNewNotes('');
  };

  const filteredContracts = contracts.filter((c) => {
    if (filter === 'urgent') return c.daysRemaining <= 7 && c.daysRemaining >= 0;
    if (filter === '30days') return c.daysRemaining > 7 && c.daysRemaining <= 30;
    if (filter === 'expired') return c.daysRemaining < 0;
    if (filter === 'active') return c.daysRemaining > 30;
    return true;
  });

  // Render Compact Mode for DocumentGenerator or Navbar Popover
  if (compactMode) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Bell className="w-4 h-4 text-amber-400" />
              {totalAlertCount > 0 && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping" />
              )}
            </div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Hujjat Muddatlari &amp; Smart Eslatmalar
            </h4>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
            {totalAlertCount} ta ogohlantirish
          </span>
        </div>

        {activeAlerts.length === 0 ? (
          <p className="text-xs text-slate-400 py-1 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Yaqin 30 kun ichida muddati tugaydigan shartnomalar yo‘q.</span>
          </p>
        ) : (
          <div className="space-y-2">
            {activeAlerts.slice(0, 2).map((item) => (
              <div
                key={item.id}
                className={`p-2.5 rounded-xl border text-xs flex items-center justify-between gap-2 ${
                  item.daysRemaining <= 7
                    ? 'bg-red-950/30 border-red-500/40 text-red-200'
                    : 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                }`}
              >
                <div className="space-y-0.5 truncate">
                  <div className="font-bold truncate flex items-center gap-1.5">
                    {item.daysRemaining <= 7 ? (
                      <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                    ) : (
                      <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    )}
                    <span className="truncate">{item.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Muddati: <strong>{item.expiryDate}</strong> ({item.daysRemaining < 0 ? 'Muddati o‘tgan' : `${item.daysRemaining} kun qoldi`})
                  </p>
                </div>

                <button
                  onClick={() => prolongContract(item.id, 12)}
                  className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-lg text-[10px] font-bold shrink-0 transition"
                  title="Shartnomani 1 yilga uzaytirish"
                >
                  Uzaytirish
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Toast Notification */}
      {successToast && (
        <div className="p-3.5 rounded-2xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-200 text-xs font-semibold flex items-center justify-between shadow-lg shadow-emerald-950/40">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{successToast}</span>
          </div>
          <button onClick={() => setSuccessToast(null)} className="text-emerald-400 hover:text-white text-xs">
            ✕
          </button>
        </div>
      )}

      {/* Main Alert Banner / Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 border border-amber-500/30 rounded-3xl p-5 sm:p-7 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-600 to-yellow-500 p-0.5 shadow-lg shadow-amber-950/50 flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
                <Bell className="w-7 h-7 text-amber-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Smart Notifications (Hujjat Muddatlari Nazorati)
                </h2>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  O‘zR Qonunchilik Standartlari
                </span>
                {urgentCount > 0 && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/40 flex items-center gap-1 animate-pulse">
                    <AlertTriangle className="w-3 h-3" />
                    {urgentCount} ta shoshilinch
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
                Yaratilgan va imzolangan shartnomalar (mehnat, ijara, ishonchnoma, xizmat ko‘rsatish)ning amal qilish muddatlarini avtomatik kuzatadi hamda 30 kun va 7 kun qolganda qonuniy ogohlantirish beradi.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap self-start md:self-center shrink-0">
            <button
              onClick={() => setIsAddModalOpen(true)}
              id="add-tracked-contract-btn"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-extrabold text-xs transition shadow-md shadow-amber-950/40 flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Yangi Hujjatni Kuzatuvga Qo‘shish</span>
            </button>
          </div>
        </div>

        {/* Real-time Dashboard Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-800">
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-3.5">
            <span className="text-[11px] font-medium text-slate-400 block">Jami Hujjatlar</span>
            <span className="text-xl sm:text-2xl font-black text-white mt-1 block">
              {contracts.length} <span className="text-xs font-normal text-slate-500">ta</span>
            </span>
          </div>

          <div className="bg-slate-950/70 border border-amber-500/20 rounded-2xl p-3.5">
            <span className="text-[11px] font-medium text-amber-300 block">30 kun ichida tugaydigan</span>
            <span className="text-xl sm:text-2xl font-black text-amber-400 mt-1 block">
              {expiring30DaysAlerts.length} <span className="text-xs font-normal text-slate-500">ta</span>
            </span>
          </div>

          <div className="bg-slate-950/70 border border-red-500/30 rounded-2xl p-3.5">
            <span className="text-[11px] font-medium text-red-300 block">Shoshilinch (≤7 kun)</span>
            <span className="text-xl sm:text-2xl font-black text-red-400 mt-1 block">
              {urgentAlerts.length} <span className="text-xs font-normal text-slate-500">ta</span>
            </span>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-3.5">
            <span className="text-[11px] font-medium text-emerald-400 block">Muddati yetarli (Faol)</span>
            <span className="text-xl sm:text-2xl font-black text-emerald-400 mt-1 block">
              {contracts.filter((c) => c.daysRemaining > 30).length} <span className="text-xs font-normal text-slate-500">ta</span>
            </span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap cursor-pointer ${
            filter === 'all'
              ? 'bg-cyan-500 text-slate-950 shadow-md'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          Barchasi ({contracts.length})
        </button>

        <button
          onClick={() => setFilter('urgent')}
          className={`px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
            filter === 'urgent'
              ? 'bg-red-500 text-white shadow-md'
              : 'bg-slate-900 border border-slate-800 text-red-400 hover:bg-red-950/30'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Shoshilinch 7 kun ({urgentAlerts.length})</span>
        </button>

        <button
          onClick={() => setFilter('30days')}
          className={`px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
            filter === '30days'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'bg-slate-900 border border-slate-800 text-amber-400 hover:bg-amber-950/30'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>30 kun ichida ({expiring30DaysAlerts.length})</span>
        </button>

        <button
          onClick={() => setFilter('expired')}
          className={`px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap cursor-pointer ${
            filter === 'expired'
              ? 'bg-rose-600 text-white shadow-md'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          Muddati o‘tgan ({expiredAlerts.length})
        </button>

        <button
          onClick={() => setFilter('active')}
          className={`px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap cursor-pointer ${
            filter === 'active'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          Faol ({contracts.filter((c) => c.daysRemaining > 30).length})
        </button>
      </div>

      {/* Contract Alert Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredContracts.map((item) => {
          const isUrgent = item.daysRemaining <= 7 && item.daysRemaining >= 0;
          const isExpiring30 = item.daysRemaining > 7 && item.daysRemaining <= 30;
          const isExpired = item.daysRemaining < 0;

          return (
            <div
              key={item.id}
              className={`rounded-2xl border p-5 flex flex-col justify-between transition-all duration-200 shadow-md relative overflow-hidden ${
                isUrgent
                  ? 'bg-gradient-to-br from-red-950/40 via-slate-900 to-slate-900 border-red-500/50 hover:border-red-400 ring-1 ring-red-500/20'
                  : isExpiring30
                  ? 'bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 border-amber-500/50 hover:border-amber-400 ring-1 ring-amber-500/20'
                  : isExpired
                  ? 'bg-slate-900/90 border-rose-900/60 text-slate-400 opacity-90'
                  : 'bg-slate-900/90 border-slate-800 hover:border-cyan-500/40'
              }`}
            >
              <div className="space-y-3">
                {/* Header status badge & doc number */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    {isUrgent ? (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/40 flex items-center gap-1 animate-pulse">
                        <AlertTriangle className="w-3 h-3" />
                        Shoshilinch (≤7 kun)
                      </span>
                    ) : isExpiring30 ? (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        30 kundan kam qoldi
                      </span>
                    ) : isExpired ? (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-950 text-rose-400 border border-rose-800">
                        Muddati o‘tgan
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Faol shartnoma
                      </span>
                    )}
                  </div>

                  {item.documentNumber && (
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      № {item.documentNumber}
                    </span>
                  )}
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-sm font-bold text-white leading-snug">
                    {item.title}
                  </h3>
                  <div className="text-[11px] text-slate-400 mt-1 space-y-0.5">
                    <p className="truncate"><strong>1-taraf:</strong> {item.parties.firstParty}</p>
                    <p className="truncate"><strong>2-taraf:</strong> {item.parties.secondParty}</p>
                  </div>
                </div>

                {/* Dates & Expiration Progress */}
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-cyan-400" />
                      Boshlanishi: {item.startDate}
                    </span>
                    <span className={`font-bold flex items-center gap-1 ${
                      isUrgent ? 'text-red-400 font-extrabold' : isExpiring30 ? 'text-amber-400' : 'text-slate-200'
                    }`}>
                      Tugashi: {item.expiryDate}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800/60">
                    <span className="text-slate-400">Qolgan vaqt:</span>
                    <span className={`font-bold ${
                      isUrgent ? 'text-red-400 text-sm' : isExpiring30 ? 'text-amber-400 text-sm' : 'text-emerald-400'
                    }`}>
                      {item.daysRemaining < 0
                        ? `Muddati o‘tgan (${Math.abs(item.daysRemaining)} kun avval)`
                        : item.daysRemaining === 0
                        ? 'BUGUN TUGAYDI!'
                        : `${item.daysRemaining} kalendar kun`}
                    </span>
                  </div>
                </div>

                {/* Governing Law / Statutory Notice */}
                <div className="text-[11px] text-slate-300 p-2 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-start gap-1.5">
                  <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <div className="space-y-0.5 leading-relaxed">
                    <p><strong>Qonuniy qoida:</strong> {item.governingLaw}</p>
                    {item.notes && <p className="text-amber-300/90 text-[10px]">{item.notes}</p>}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-4 mt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => prolongContract(item.id, 12)}
                    className="px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-[11px] font-bold transition flex items-center gap-1 cursor-pointer"
                    title="Shartnomani qo‘shimcha 1 yilga uzaytirish (prolongatsiya qilish)"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>1 yilga uzaytirish</span>
                  </button>

                  {onNavigateToGenerator && (
                    <button
                      onClick={() => onNavigateToGenerator(item.templateId)}
                      className="px-2 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium transition cursor-pointer"
                      title="Generatorga o‘tib yangi shartnoma tuzish"
                    >
                      <Zap className="w-3 h-3 text-amber-400" />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  {item.lexUrl && (
                    <LexCanonicalLink
                      url={item.lexUrl}
                      documentName={item.governingLaw || item.title}
                      label=""
                      size="xs"
                      variant="subtle"
                      showCopyButton={true}
                    />
                  )}

                  <button
                    onClick={() => deleteContract(item.id)}
                    className="p-1.5 rounded-lg bg-slate-800/60 hover:bg-red-950/40 text-slate-500 hover:text-red-400 transition cursor-pointer"
                    title="Kuzatuvdan o‘chirish"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredContracts.length === 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 text-center space-y-3">
          <Clock className="w-10 h-10 text-slate-600 mx-auto" />
          <h4 className="text-base font-bold text-white">Ushbu toifada shartnomalar topilmadi</h4>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Hujjatlar generatori orqali yangi shartnoma tuzganingizda yoki yuqoridagi «Yangi Hujjatni Kuzatuvga Qo‘shish» tugmasi orqali shartnomalarni muddatli monitoringga kiritishingiz mumkin.
          </p>
        </div>
      )}

      {/* Add Tracked Document Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">
                  Yangi Hujjatni Muddatli Kuzatuvga Qo‘shish
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTracked} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Hujjat / Shartnoma Nomi <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Masalan: Turar-joy ijara shartnomasi yoki Xizmat ko‘rsatish shartnomasi"
                  required
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Hujjat Toifasi
                  </label>
                  <select
                    value={newType}
                    onChange={(e) => {
                      const t = e.target.value as ContractType;
                      setNewType(t);
                      // Auto calculate standard terms based on Uzbekistan practice
                      const d = new Date(newStartDate);
                      if (t === 'lease') {
                        d.setMonth(d.getMonth() + 11); // 11 months
                      } else if (t === 'labor') {
                        d.setFullYear(d.getFullYear() + 1); // 1 year
                      } else if (t === 'power_of_attorney') {
                        d.setFullYear(d.getFullYear() + 3); // 3 years max per FK 139
                      }
                      setNewExpiryDate(d.toISOString().split('T')[0]);
                    }}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="lease">Ijaraga berish (11 oy soliq me‘yori)</option>
                    <option value="labor">Mehnat shartnomasi (Muddatli)</option>
                    <option value="power_of_attorney">Ishonchnoma / Doverennost (3 yil)</option>
                    <option value="service">Pulli xizmat ko‘rsatish</option>
                    <option value="supply">Oldi-sotdi / Yetkazib berish</option>
                    <option value="loan">Qarz shartnomasi / Tilxat</option>
                    <option value="other">Boshqa yuridik kelishuv</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Shartnoma Raqami (№)
                  </label>
                  <input
                    type="text"
                    value={newDocNumber}
                    onChange={(e) => setNewDocNumber(e.target.value)}
                    placeholder="Masalan: IJ-08/2026"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    1-taraf (Ish beruvchi / Ijaraga beruvchi)
                  </label>
                  <input
                    type="text"
                    value={newFirstParty}
                    onChange={(e) => setNewFirstParty(e.target.value)}
                    placeholder="F.I.Sh. yoki korxona nomi"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    2-taraf (Xodim / Ijarachi / Vakil)
                  </label>
                  <input
                    type="text"
                    value={newSecondParty}
                    onChange={(e) => setNewSecondParty(e.target.value)}
                    placeholder="F.I.Sh. yoki korxona nomi"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Boshlanish Sanasi
                  </label>
                  <input
                    type="date"
                    value={newStartDate}
                    onChange={(e) => setNewStartDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Amal Qilish / Tugash Sanasi <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="date"
                    value={newExpiryDate}
                    onChange={(e) => setNewExpiryDate(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Qo‘shimcha Eslatma yoki Ogohlantirish sharti
                </label>
                <textarea
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  rows={2}
                  placeholder="Masalan: Muddat tugashidan 15 kun oldin xabardor qilish yoki depozitni qaytarish sharti..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 transition"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 text-xs font-bold transition shadow-md shadow-amber-950/40"
                >
                  Kuzatuvga Qo‘shish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
