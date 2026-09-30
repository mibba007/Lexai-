/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Professional O‘zbekiston Qonunchiligi (Lex.uz) va O‘zDSt 1157:2008 standartlariga
 * muvofiq rasmiy hujjatlar, arizalar va namunaviy shartnomalar generatori.
 * 
 * O‘z ichiga oladi:
 * - Shartnoma bloklarini vizual tanlash va tahrirlash (Preambula, Predmet, Majburiyatlar, Javobgarlik, Nizolar)
 * - Qonunchilik iqtiboslarini Drag-and-Drop qilish tizimi
 * - DOCX va PDF eksporti
 * - Standart shrift va abzats qoidalariga moslikni ko‘rsatuvchi 'Preview' rejimi
 */

import React, { useState, useRef, useMemo, useEffect } from 'react';
import { 
  FileText, 
  Sparkles, 
  Copy, 
  Check, 
  Download, 
  Printer, 
  ExternalLink, 
  RefreshCw,
  Edit3,
  Scale,
  CheckCircle2,
  FileCode,
  FileType,
  Settings2,
  BookOpen,
  Zap,
  Eye,
  Sliders,
  Maximize2,
  Layers,
  FileCheck,
  Plus,
  AlertCircle,
  AlertTriangle,
  ShieldCheck,
  Briefcase,
  Home,
  Handshake,
  Gavel,
  ShieldAlert,
  HelpCircle,
  Wifi,
  WifiOff,
  Save,
  RotateCcw,
  ChevronRight,
  UserCheck,
  User
} from 'lucide-react';
import { LEGAL_DOCUMENT_TEMPLATES } from '../data/documentTemplates';
import { LegalDocumentTemplate, LegalCategory, ConsultationDocContext } from '../types';
import { 
  exportToWordDocx, 
  exportToPdf,
  printDocument, 
  exportToPlainText, 
  formatDocumentToHtml,
  DocumentExportOptions 
} from '../utils/documentExporter';
import { useOfflineMode, synthesizeOfflineDocumentEnhancement } from '../utils/offlineManager';
import { DocumentAIReviewResult, DocumentReviewSuggestion } from '../types';
import { scanDocumentForLegalIssuesOffline } from '../utils/documentReviewEngine';
import { LegalClauseDrawer } from './LegalClauseDrawer';
import { ContractBlockEditor } from './ContractBlockEditor';
import { CompliancePreviewModal } from './CompliancePreviewModal';
import { DocumentPreviewModal } from './DocumentPreviewModal';
import { DocumentAIReviewDrawer } from './DocumentAIReviewDrawer';
import { SmartTemplatesModal } from './SmartTemplatesModal';
import { 
  SMART_TEMPLATES_LIBRARY, 
  SmartTemplateDefinition, 
  SmartLegislationProfile,
  findSmartTemplate,
  getStandardLegislationValues
} from '../data/smartTemplatesData';
import { 
  useUserProfile, 
  autoFillTemplateFromProfile, 
  DEFAULT_SAMPLE_USER_PROFILE, 
  formatIndividualRequisites 
} from '../utils/userProfileManager';
import { Coins } from 'lucide-react';

interface DocumentGeneratorProps {
  consultationContext?: ConsultationDocContext | null;
  onClearConsultationContext?: () => void;
}

// Pre-defined quick smart presets for common legal document types (Mehnat, Ijara, Doverennost, etc.)
const QUICK_SCHEMA_PRESETS = [
  {
    id: 'mehnat-shartnomasi-namunaviy',
    smartId: 'smart-mehnat-shartnomasi',
    label: 'Mehnat shartnomasi (Labor Contract)',
    icon: Briefcase,
    category: 'labor' as LegalCategory,
    badge: 'MK 104-108',
    description: '40 soatlik ish haftasi, 21 kunlik ta‘til, 3 oylik sinov va YAMMT kafolatlari',
  },
  {
    id: 'turar-joy-ijara-shartnomasi',
    smartId: 'smart-ijara-shartnomasi',
    label: 'Ijaraga berish shartnomasi (Rent/Lease)',
    icon: Home,
    category: 'civil' as LegalCategory,
    badge: 'ijara.soliq.uz',
    description: '11 oylik muddat, kafolat depoziti, hisoblagich to‘lovlari va soliq ro‘yxati',
  },
  {
    id: 'ishonchnoma-yuridik-shaxs',
    smartId: 'smart-doverennost-ishonchnoma',
    label: 'Doverennost (Ishonchnoma - FK 134)',
    icon: ShieldCheck,
    category: 'business' as LegalCategory,
    badge: 'FK 134-144',
    description: 'Yuridik shaxs nomidan bank, soliq, sudlarda vakillik qilish va avtotransport',
  },
  {
    id: 'xizmat-korsatish-shartnomasi',
    smartId: 'smart-xizmat-korsatish',
    label: 'Xizmat shartnomasi (Service Contract)',
    icon: Handshake,
    category: 'business' as LegalCategory,
    badge: 'FK 703-modda',
    description: 'IT dasturlash, qabul dalolatnomasi, intellektual mulk va kafolat shartlari',
  },
  {
    id: 'qarz-shartnomasi-va-tilxat',
    smartId: 'smart-qarz-shartnomasi',
    label: 'Qarz va Tilxat (Loan & Receipt)',
    icon: Coins,
    category: 'civil' as LegalCategory,
    badge: 'FK 732-modda',
    description: 'Sudda yuridik kuchga ega pul topshirish tilxati va 0.1% kechiktirish penyasi',
  },
  {
    id: 'davo-qarz-undirish',
    smartId: 'smart-davo-qarz-undirish',
    label: 'Sud da‘vosi (Court Lawsuit)',
    icon: Gavel,
    category: 'court' as LegalCategory,
    badge: 'FPK 189',
    description: 'Fuqarolik sudiga qarz va zararni undirish da‘vosi: 4% davlat boji hisobi bilan',
  },
];

export const DocumentGenerator: React.FC<DocumentGeneratorProps> = ({
  consultationContext,
  onClearConsultationContext,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<LegalCategory | 'all'>('all');
  const [selectedTemplate, setSelectedTemplate] = useState<LegalDocumentTemplate>(
    LEGAL_DOCUMENT_TEMPLATES[0]
  );
  const [formValues, setFormValues] = useState<Record<string, string>>(
    LEGAL_DOCUMENT_TEMPLATES[0].sampleFilledValues || {}
  );
  const [isAIEnhancing, setIsAIEnhancing] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [customAIInstruction, setCustomAIInstruction] = useState('');
  const [generatedCustomText, setGeneratedCustomText] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [pdfExportSuccessMessage, setPdfExportSuccessMessage] = useState<string | null>(null);
  const [draftToastMessage, setDraftToastMessage] = useState<string | null>(null);

  // Offline Mode Engine & Draft Manager
  const {
    isOnline,
    isForcedOffline,
    isEffectiveOffline,
    toggleForcedOffline,
    lastSavedDraft,
    saveDraft,
  } = useOfflineMode();

  // Validation state & blocker modal
  const [attemptedActionWithoutValidation, setAttemptedActionWithoutValidation] = useState<string | null>(null);
  const [highlightMissingFields, setHighlightMissingFields] = useState<boolean>(false);

  // Editor mode: 'blocks' (Visual blocks) | 'form' (Fields) | 'raw' (Full text editor)
  const [editorMode, setEditorMode] = useState<'blocks' | 'form' | 'raw'>('blocks');
  const [isClauseDrawerOpen, setIsClauseDrawerOpen] = useState(false);
  const [isComplianceModalOpen, setIsComplianceModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isReviewDrawerOpen, setIsReviewDrawerOpen] = useState(false);
  const [isReviewingAI, setIsReviewingAI] = useState(false);
  const [reviewResult, setReviewResult] = useState<DocumentAIReviewResult | null>(null);
  const [appliedSuggestionIds, setAppliedSuggestionIds] = useState<Set<string>>(new Set());

  // Smart Templates Library & Auto-populate state
  const [isSmartTemplatesModalOpen, setIsSmartTemplatesModalOpen] = useState(false);
  const [activeSmartProfileName, setActiveSmartProfileName] = useState<string | null>(
    'Standart doimiy ish (5 kunlik, 40 soat)'
  );
  const [smartAutoFillNotice, setSmartAutoFillNotice] = useState<string | null>(
    'Yangi Mehnat kodeksi 104-108 moddalari va O‘zDSt 1157:2008 mezonlari asosida avto-to‘ldirilgan.'
  );

  // User Profile Auto-fill state (My Profile integration)
  const { profile, isProfileComplete } = useUserProfile();
  const [profileAutofillRole, setProfileAutofillRole] = useState<'secondParty' | 'firstParty'>('secondParty');
  const [profileAutofillToast, setProfileAutofillToast] = useState<string | null>(null);

  // Official Typography & Layout Controls (O‘zDSt 1157:2008)
  const [fontFamily, setFontFamily] = useState<'Times New Roman' | 'Arial' | 'Calibri' | 'Georgia'>('Times New Roman');
  const [fontSizePt, setFontSizePt] = useState<number>(14);
  const [lineSpacing, setLineSpacing] = useState<number>(1.15);
  const [paragraphIndentCm, setParagraphIndentCm] = useState<number>(1.25);
  const [showWatermark, setShowWatermark] = useState<boolean>(true);

  // Reference to focus on first missing input
  const fieldRefs = useRef<Record<string, HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null>>({});

  // Auto-fill & auto-generate when consultationContext is provided from chat
  useEffect(() => {
    if (!consultationContext) return;

    const queryLower = (consultationContext.query || '').toLowerCase();
    const analysis = consultationContext.analysis;

    // Pick best template according to situation
    let targetTemplateId = 'davo-zarar-undirish';
    if (
      queryLower.includes('obro') ||
      queryLower.includes('shan') ||
      queryLower.includes('qadr') ||
      queryLower.includes('tuhmat') ||
      queryLower.includes('100') ||
      queryLower.includes('1022') ||
      queryLower.includes('raddiya') ||
      queryLower.includes('fermer') ||
      queryLower.includes('yer')
    ) {
      targetTemplateId = 'davo-ishchanlik-obro-zarar';
    } else if (
      queryLower.includes('bo‘shat') ||
      queryLower.includes('boshat') ||
      queryLower.includes('mehnat') ||
      queryLower.includes('ishga tiklash') ||
      queryLower.includes('ishdan') ||
      queryLower.includes('161') ||
      queryLower.includes('541')
    ) {
      targetTemplateId = 'davo-ishga-tiklash';
    } else if (
      queryLower.includes('qarz') ||
      queryLower.includes('tilxat') ||
      queryLower.includes('732')
    ) {
      targetTemplateId = 'davo-qarz-undirish';
    } else if (
      queryLower.includes('shikoyat') ||
      queryLower.includes('prokuror') ||
      queryLower.includes('hokim') ||
      queryLower.includes('ariza')
    ) {
      targetTemplateId = 'ariza-davlat-organiga-murojaat';
    } else if (
      queryLower.includes('pretenziya') ||
      queryLower.includes('talabnoma')
    ) {
      targetTemplateId = 'shartnoma-majburiyat-talabnoma';
    }

    const foundTemplate =
      LEGAL_DOCUMENT_TEMPLATES.find((t) => t.id === targetTemplateId) ||
      LEGAL_DOCUMENT_TEMPLATES.find((t) => t.id === 'davo-ishchanlik-obro-zarar') ||
      LEGAL_DOCUMENT_TEMPLATES[0];

    setSelectedTemplate(foundTemplate);

    // Populate customized values
    const newValues: Record<string, string> = { ...(foundTemplate.sampleFilledValues || {}) };

    if (targetTemplateId === 'davo-ishchanlik-obro-zarar') {
      newValues.courtName = 'Fuqarolik ishlari bo‘yicha Shayxontohur tumanlararo sudiga';
      newValues.plaintiffInfo = queryLower.includes('fermer')
        ? '«BARAKALI DALALAR» Fermer xo‘jaligi (Rahbari: Alimov Sh.B.), Samarqand viloyati, Tel: +998 90 123-45-67, STIR: 304556677'
        : '«YURIDIK KORXONA» MChJ / Fuqaro Alimov Sh.B., Toshkent sh., Tel: +998 90 123-45-67, STIR/PINFL: 304556677';
      newValues.defendantInfo = 'OAV tahririyati / Javobgar shaxs, Tel: +998 71 200-11-22';
      newValues.defamationDetails =
        consultationContext.query +
        (analysis?.summaryAnswer ? `\n\nYuridik xulosa va asoslar: ${analysis.summaryAnswer}` : '');
      newValues.materialDamageAmount = '45 000 000 so‘m';
      newValues.moralDamageAmount = '20 000 000 so‘m';
      newValues.retractionDemands =
        'O‘sha internet nashrida va ijtimoiy tarmoq sahifalarida 5 kun muddatda rasmiy raddiya e‘lon qilish majburiyatini yuklash';
    } else if (targetTemplateId === 'davo-zarar-undirish') {
      newValues.incidentDateAndDetails =
        consultationContext.query +
        (analysis?.summaryAnswer ? `\n\nQonuniy asos: ${analysis.summaryAnswer}` : '');
    } else if (targetTemplateId === 'ariza-davlat-organiga-murojaat') {
      newValues.circumstancesDescription = consultationContext.query;
      newValues.demandsList =
        analysis?.practicalSteps?.map((s, i) => `${i + 1}. ${s}`).join('\n') ||
        '1. Ushbu arizani qonunda belgilangan 15 kunlik muddatda ko‘rib chiqishingizni;\n2. Buzilgan huquq va qonuniy manfaatlarimni tiklash bo‘yicha qat‘iy choralar ko‘rishingizni.';
    }

    setFormValues(newValues);

    // Immediately generate the full tailored official document text
    const fullDoc = foundTemplate.templateGenerator(newValues);
    setGeneratedCustomText(fullDoc);
    setEditorMode('raw');
  }, [consultationContext]);

  const filteredTemplates = LEGAL_DOCUMENT_TEMPLATES.filter(
    (t) => selectedCategory === 'all' || t.category === selectedCategory
  );

  // Real-time validation computation
  const { missingRequiredFields, totalRequiredCount, completedRequiredCount, completionPercentage, isValid } = useMemo(() => {
    const requiredFields = selectedTemplate.fields.filter((f) => f.required);
    const missing = requiredFields.filter((f) => {
      const val = formValues[f.key];
      return !val || val.trim() === '';
    });
    const total = requiredFields.length;
    const completed = total - missing.length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 100;
    return {
      missingRequiredFields: missing,
      totalRequiredCount: total,
      completedRequiredCount: completed,
      completionPercentage: percentage,
      isValid: missing.length === 0,
    };
  }, [selectedTemplate, formValues]);

  const handleSelectTemplate = (template: LegalDocumentTemplate) => {
    setSelectedTemplate(template);
    const smart = findSmartTemplate(template.id);
    if (smart) {
      const defProfile = smart.profiles.find((p) => p.id === smart.defaultProfileId) || smart.profiles[0];
      setFormValues(defProfile.populatedValues);
      setActiveSmartProfileName(defProfile.name);
      setSmartAutoFillNotice(`«${smart.shortTitle}» tanlandi: ${defProfile.statutoryBasis} mezonlari asosida avto-to‘ldirildi.`);
    } else {
      setFormValues(template.sampleFilledValues || {});
      setActiveSmartProfileName(null);
      setSmartAutoFillNotice(null);
    }
    setGeneratedCustomText(null);
    setHighlightMissingFields(false);
    setAttemptedActionWithoutValidation(null);
  };

  const handleSelectAndAutoPopulateSmartTemplate = (
    template: LegalDocumentTemplate,
    populatedValues: Record<string, string>,
    profile: SmartLegislationProfile,
    smartItem: SmartTemplateDefinition
  ) => {
    setSelectedTemplate(template);
    setFormValues(populatedValues);
    setGeneratedCustomText(null);
    setActiveSmartProfileName(profile.name);
    setSmartAutoFillNotice(
      `«${smartItem.shortTitle}» tanlandi: ${profile.statutoryBasis} mezonlari bo‘yicha to‘liq avto-to‘ldirildi.`
    );
    setHighlightMissingFields(false);
    setAttemptedActionWithoutValidation(null);
  };

  const handleAutoPopulateCurrentWithLegislation = (profileId?: string) => {
    const result = getStandardLegislationValues(selectedTemplate.id, profileId);
    if (result) {
      setFormValues(result.values);
      setGeneratedCustomText(null);
      setActiveSmartProfileName(result.profile.name);
      setSmartAutoFillNotice(
        `«${result.smartTemplate.shortTitle}» — ${result.profile.statutoryBasis} talablari asosida qayta to‘ldirildi.`
      );
      setHighlightMissingFields(false);
      setAttemptedActionWithoutValidation(null);
    } else if (selectedTemplate.sampleFilledValues) {
      setFormValues(selectedTemplate.sampleFilledValues);
      setGeneratedCustomText(null);
      setSmartAutoFillNotice('Namunaviy yuridik ma‘lumotlar asosida to‘ldirildi.');
      setHighlightMissingFields(false);
      setAttemptedActionWithoutValidation(null);
    }
  };

  const handleLoadQuickPreset = (presetId: string, smartId?: string) => {
    const tmpl = LEGAL_DOCUMENT_TEMPLATES.find((t) => t.id === presetId);
    if (tmpl) {
      handleSelectTemplate(tmpl);
    }
  };

  // Instant Auto-fill from My Profile (F.I.Sh., Passport, TIN/STIR, JSHSHIR)
  const handleAutoFillFromProfile = (role: 'secondParty' | 'firstParty' = profileAutofillRole) => {
    const activeProf = profile || DEFAULT_SAMPLE_USER_PROFILE;
    const { updatedValues, filledCount, matchedFieldLabels } = autoFillTemplateFromProfile(
      activeProf,
      selectedTemplate,
      role
    );

    if (filledCount > 0) {
      setFormValues((prev) => ({
        ...prev,
        ...updatedValues,
      }));
      setGeneratedCustomText(null);
      setProfileAutofillToast(
        `«Mening Profilim» (${activeProf.fullName}, Pasport: ${activeProf.passportSeriesNumber}, STIR/TIN: ${activeProf.tin || activeProf.pinfl}) orqali ${filledCount} ta maydon (${matchedFieldLabels.slice(0, 3).join(', ')}${matchedFieldLabels.length > 3 ? '...' : ''}) bir zumda avto-to‘ldirildi!`
      );
      setTimeout(() => setProfileAutofillToast(null), 5000);
    } else {
      // Fallback for custom or general templates
      const indiv = formatIndividualRequisites(activeProf);
      const firstField = selectedTemplate.fields[0];
      if (firstField) {
        setFormValues((prev) => ({
          ...prev,
          [firstField.key]: prev[firstField.key] || indiv,
        }));
      }
      setProfileAutofillToast(
        `Profil rekvizitlari muvaffaqiyatli tayyorlandi: ${activeProf.fullName} (Pasport: ${activeProf.passportSeriesNumber}, STIR: ${activeProf.tin})`
      );
      setTimeout(() => setProfileAutofillToast(null), 4000);
    }
  };

  const handleInputChange = (key: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
    setGeneratedCustomText(null);
  };

  const handleFillSampleData = () => {
    handleAutoPopulateCurrentWithLegislation();
  };

  const scrollToMissingField = (key: string) => {
    setEditorMode('form');
    setHighlightMissingFields(true);
    setTimeout(() => {
      const el = fieldRefs.current[key];
      if (el) {
        el.focus();
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const currentDocumentText = generatedCustomText || selectedTemplate.templateGenerator(formValues);

  const handleUpdateDocumentText = (newText: string) => {
    setGeneratedCustomText(newText);
  };

  const handleInsertClauseFromDrawer = (clauseText: string, sectionTitle?: string) => {
    const current = currentDocumentText;
    const addition = sectionTitle 
      ? `\n\n${sectionTitle.toUpperCase()}:\n${clauseText}` 
      : `\n\n${clauseText}`;
    setGeneratedCustomText(current + addition);
  };

  const exportOptions: DocumentExportOptions = {
    title: selectedTemplate.shortTitle || selectedTemplate.title,
    documentDate: new Date().toLocaleDateString('uz-UZ'),
    fontFamily,
    fontSizePt,
    lineSpacing,
    paragraphIndentCm,
    includeWatermark: showWatermark,
    classificationCode: selectedTemplate.classificationCode || 'O‘zDSt 1157:2008 / LEXAI',
  };

  const validateBeforeExport = (actionType: 'pdf' | 'word' | 'print' | 'preview'): boolean => {
    if (!isValid) {
      setAttemptedActionWithoutValidation(actionType);
      setHighlightMissingFields(true);
      setEditorMode('form');
      return false;
    }
    return true;
  };

  // Autosave draft locally
  useEffect(() => {
    const timer = setTimeout(() => {
      saveDraft(
        selectedTemplate.id,
        formValues,
        generatedCustomText,
        selectedTemplate.shortTitle || selectedTemplate.title
      );
    }, 1500);
    return () => clearTimeout(timer);
  }, [formValues, generatedCustomText, selectedTemplate, saveDraft]);

  const handleManualSaveDraft = () => {
    saveDraft(
      selectedTemplate.id,
      formValues,
      generatedCustomText,
      selectedTemplate.shortTitle || selectedTemplate.title
    );
    setDraftToastMessage('Qoralama lokal xotiraga muvaffaqiyatli saqlandi!');
    setTimeout(() => setDraftToastMessage(null), 3000);
  };

  const handleRestoreSavedDraft = () => {
    if (!lastSavedDraft) return;
    const tmpl = LEGAL_DOCUMENT_TEMPLATES.find((t) => t.id === lastSavedDraft.templateId);
    if (tmpl) {
      setSelectedTemplate(tmpl);
    }
    setFormValues(lastSavedDraft.formValues || {});
    setGeneratedCustomText(lastSavedDraft.customText);
    setDraftToastMessage(`Qoralama tiklandi (${lastSavedDraft.savedAt})!`);
    setTimeout(() => setDraftToastMessage(null), 3000);
  };

  const handleDownloadPdf = async () => {
    if (!validateBeforeExport('pdf')) return;
    setIsGeneratingPdf(true);
    try {
      await exportToPdf(currentDocumentText, exportOptions, 'official-document-canvas');
      setPdfExportSuccessMessage(`«${exportOptions.title}.pdf» rasmiy fayli muvaffaqiyatli yuklab olindi!`);
      setTimeout(() => setPdfExportSuccessMessage(null), 4000);
    } catch (err: any) {
      console.error('PDF export error:', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleDownloadWord = () => {
    if (!validateBeforeExport('word')) return;
    exportToWordDocx(currentDocumentText, exportOptions);
  };

  const handlePrint = () => {
    if (!validateBeforeExport('print')) return;
    printDocument(currentDocumentText, exportOptions);
  };

  const handleOpenCompliancePreview = () => {
    if (!validateBeforeExport('preview')) return;
    setIsComplianceModalOpen(true);
  };

  const handleDownloadText = () => {
    exportToPlainText(currentDocumentText, exportOptions);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentDocumentText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReviewWithAI = async () => {
    setIsReviewDrawerOpen(true);
    setIsReviewingAI(true);

    if (isEffectiveOffline) {
      const offlineResult = scanDocumentForLegalIssuesOffline(
        currentDocumentText,
        selectedTemplate.title
      );
      setReviewResult(offlineResult);
      setIsReviewingAI(false);
      return;
    }

    try {
      const res = await fetch('/api/gemini/review-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentText: currentDocumentText,
          documentType: selectedTemplate.title,
          category: selectedTemplate.category,
        }),
      });

      if (!res.ok) {
        throw new Error('AI review failed');
      }

      const data: DocumentAIReviewResult = await res.json();
      setReviewResult(data);
    } catch (err) {
      console.warn('AI review online call failed, using local legal scanner:', err);
      const offlineResult = scanDocumentForLegalIssuesOffline(
        currentDocumentText,
        selectedTemplate.title
      );
      setReviewResult(offlineResult);
    } finally {
      setIsReviewingAI(false);
    }
  };

  const handleApplySuggestion = (suggestion: DocumentReviewSuggestion) => {
    let updated = currentDocumentText;

    if (suggestion.actionType === 'REPLACE' && suggestion.problematicText && updated.includes(suggestion.problematicText)) {
      updated = updated.replace(suggestion.problematicText, suggestion.suggestedReplacement);
    } else if (suggestion.actionType === 'INSERT_SECTION') {
      const rekvizitIdx = updated.search(/(TARAFLARNING|TOMONLARNING)\s+(YURIDIK\s+)?(REKVIZITLARI|MANZILLARI)/i);
      if (rekvizitIdx !== -1) {
        updated = updated.slice(0, rekvizitIdx) + suggestion.suggestedReplacement + '\n\n' + updated.slice(rekvizitIdx);
      } else {
        updated += '\n\n' + suggestion.suggestedReplacement;
      }
    } else {
      const rekvizitIdx = updated.search(/(TARAFLARNING|TOMONLARNING)\s+(YURIDIK\s+)?(REKVIZITLARI|MANZILLARI)/i);
      if (rekvizitIdx !== -1) {
        updated = updated.slice(0, rekvizitIdx) + '\n\n' + suggestion.suggestedReplacement + '\n\n' + updated.slice(rekvizitIdx);
      } else {
        updated += '\n\n' + suggestion.suggestedReplacement;
      }
    }

    setGeneratedCustomText(updated);
    setAppliedSuggestionIds((prev) => new Set([...prev, suggestion.id]));
    setDraftToastMessage(`«${suggestion.issueTitle}» tuzatildi va hujjatga kiritildi!`);
    setTimeout(() => setDraftToastMessage(null), 3000);
  };

  const handleApplyAllSuggestions = () => {
    if (!reviewResult || !reviewResult.suggestions) return;
    let updated = currentDocumentText;
    const newApplied = new Set(appliedSuggestionIds);

    for (const sug of reviewResult.suggestions) {
      if (newApplied.has(sug.id)) continue;

      if (sug.actionType === 'REPLACE' && sug.problematicText && updated.includes(sug.problematicText)) {
        updated = updated.replace(sug.problematicText, sug.suggestedReplacement);
      } else {
        const rekvizitIdx = updated.search(/(TARAFLARNING|TOMONLARNING)\s+(YURIDIK\s+)?(REKVIZITLARI|MANZILLARI)/i);
        if (rekvizitIdx !== -1) {
          updated = updated.slice(0, rekvizitIdx) + '\n\n' + sug.suggestedReplacement + '\n\n' + updated.slice(rekvizitIdx);
        } else {
          updated += '\n\n' + sug.suggestedReplacement;
        }
      }
      newApplied.add(sug.id);
    }

    setGeneratedCustomText(updated);
    setAppliedSuggestionIds(newApplied);
    setDraftToastMessage('Barcha yuridik tavsiyalar muvaffaqiyatli qo‘llandi!');
    setTimeout(() => setDraftToastMessage(null), 3500);
  };

  const handleAIEnhance = async () => {
    setIsAIEnhancing(true);

    // If in offline mode, enhance document purely locally
    if (isEffectiveOffline) {
      const offlineDoc = synthesizeOfflineDocumentEnhancement(
        currentDocumentText,
        selectedTemplate.title,
        formValues,
        customAIInstruction
      );
      setGeneratedCustomText(offlineDoc);
      setDraftToastMessage('Hujjat lokal O‘zDSt 1157 mezonlari bilan oflayn rejimda boyitildi!');
      setTimeout(() => setDraftToastMessage(null), 3500);
      setIsAIEnhancing(false);
      return;
    }

    try {
      const res = await fetch('/api/gemini/generate-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentType: selectedTemplate.title,
          userDetails: formValues,
          customInstructions: customAIInstruction || 'O‘zbekiston Respublikasi rasmiy davlat standarti O‘zDSt 1157:2008 va amaldagi Lex.uz qonunlariga to‘liq mos holda, bandlarni aniq raqamlab, rekvizitlarni joylashtirib tuzing.',
        }),
      });

      if (!res.ok) {
        throw new Error('AI orqali hujjat tayyorlashda server javobi olinmadi');
      }
      
      const data = await res.json();
      if (data && data.formattedText && data.formattedText.trim().length > 20) {
        setGeneratedCustomText(data.formattedText);
      } else {
        const offlineDoc = synthesizeOfflineDocumentEnhancement(
          currentDocumentText,
          selectedTemplate.title,
          formValues,
          customAIInstruction
        );
        setGeneratedCustomText(offlineDoc);
      }
    } catch (err: any) {
      console.warn('AI enhance network error, falling back to client offline legal engine:', err);
      const offlineDoc = synthesizeOfflineDocumentEnhancement(
        currentDocumentText,
        selectedTemplate.title,
        formValues,
        customAIInstruction
      );
      setGeneratedCustomText(offlineDoc);
      setDraftToastMessage('Oflayn rejim: Hujjat lokal qonunchilik dvigateli orqali boyitildi!');
      setTimeout(() => setDraftToastMessage(null), 3500);
    } finally {
      setIsAIEnhancing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-2 sm:p-4 space-y-5">
      
      {/* Active Consultation Context Alert Banner */}
      {consultationContext && (
        <div className="bg-gradient-to-r from-cyan-950/90 via-blue-950/90 to-slate-900 border border-cyan-500/50 rounded-2xl p-4 sm:p-5 shadow-lg shadow-cyan-950/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 flex-shrink-0 mt-0.5 sm:mt-0">
              <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  ✨ AI Konsultatsiya Asosida Hujjat Tayyorlandi
                </h3>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Avtomatik sinxronlash
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                <span className="font-semibold text-cyan-300">Savol/Holat:</span> «{consultationContext.query}»
              </p>
              {consultationContext.analysis?.legalBasis && consultationContext.analysis.legalBasis.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 mt-2">
                  <span className="text-[11px] text-slate-400 font-medium">Asosiy moddalar:</span>
                  {consultationContext.analysis.legalBasis.map((b, i) => (
                    <span key={i} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                      {b.documentName} {b.articleNumber}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => handleAIEnhance()}
              disabled={isAIEnhancing}
              className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition flex items-center gap-1.5 shadow"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI bilan boyitish</span>
            </button>
            {onClearConsultationContext && (
              <button
                onClick={onClearConsultationContext}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 text-xs"
                title="Konsultatsiya bog‘lanishini tozalash"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                Yuridik Hujjatlar va Namunaviy Shartnomalar Generatori
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  O‘zDSt 1157:2008
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                O‘zbekiston qonunchiligiga (Lex.uz) mos namunaviy shartnomalar, arizalar, real vaqtda majburiy rekvizitlar tekshiruvi va rasmiy A4 preview.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Dedicated PDF Export Button */}
          <button
            onClick={handleDownloadPdf}
            disabled={isGeneratingPdf}
            id="pdf-export-button"
            data-testid="pdf-export-button"
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm cursor-pointer disabled:opacity-50 ${
              isValid
                ? 'bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 hover:from-rose-500 hover:to-red-500 text-white shadow-rose-950/40 ring-1 ring-rose-400/30'
                : 'bg-slate-800 border border-rose-500/40 text-rose-300 hover:bg-slate-700'
            }`}
            title={isValid ? 'A4 formatidagi rasmiy PDF faylni yuklab olish' : 'Avval barcha majburiy rekvizitlarni to‘ldiring'}
          >
            {isGeneratingPdf ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>PDF Export qilinmoqda...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>PDF Export</span>
                {!isValid && (
                  <span className="ml-1 w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                )}
              </>
            )}
          </button>

          {/* Dedicated Auto-fill Template Button (User Profile Integration) */}
          <button
            onClick={() => handleAutoFillFromProfile()}
            id="autofill-template-btn"
            data-testid="autofill-template-button"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white text-xs font-bold transition shadow-md shadow-emerald-950/40 ring-1 ring-emerald-400/40 cursor-pointer"
            title="Mening Profilim (F.I.Sh., Pasport, STIR/TIN, JSHSHIR) rekvizitlari bilan ushbu shartnomani darhol avto-to‘ldirish"
          >
            <UserCheck className="w-4 h-4 text-emerald-200" />
            <span>Auto-fill Template</span>
            <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-slate-950/70 text-emerald-300 font-bold ml-0.5">
              Profil
            </span>
          </button>

          {/* Dedicated Smart Templates Library Button */}
          <button
            onClick={() => setIsSmartTemplatesModalOpen(true)}
            id="open-smart-templates-btn"
            data-testid="smart-templates-library-button"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 text-xs font-extrabold transition shadow-md shadow-amber-950/40 ring-1 ring-amber-300/40 cursor-pointer"
            title="O‘zbekiston qonunchiligi (Lex.uz) mezonlari bo‘yicha 'Mehnat shartnomasi', 'Ijaraga berish', 'Doverennost' va boshqa smart shablonlar kutubxonasini ochish"
          >
            <Sparkles className="w-4 h-4 fill-slate-950" />
            <span>Smart Templates</span>
            <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-slate-950 text-amber-300 font-bold ml-0.5">
              Kutubxona
            </span>
          </button>

          {/* Review with AI Button */}
          <button
            onClick={handleReviewWithAI}
            id="review-with-ai-btn"
            data-testid="review-with-ai-button"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white text-xs font-bold transition shadow-md shadow-purple-950/40 ring-1 ring-purple-400/30 cursor-pointer"
            title="O‘zbekiston qonunchiligi (Lex.uz) bo‘yicha xatolar va yetishmayotgan bandlarni AI tekshiruvi"
          >
            <Sparkles className="w-4 h-4 text-cyan-300 animate-pulse" />
            <span>Review with AI</span>
          </button>

          {/* Dedicated Non-Editable Formatted Preview Button */}
          <button
            onClick={() => setIsPreviewModalOpen(true)}
            id="preview-document-btn"
            data-testid="preview-document-button"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/40 hover:border-cyan-400 text-xs font-bold transition shadow-sm cursor-pointer"
            title="Hujjatning rasmiy ko‘rinishini tahrirlanmaydigan modalda ko‘rish (PDF yuklab olishdan oldin)"
          >
            <Eye className="w-4 h-4 text-cyan-400" />
            <span>Preview</span>
          </button>

          {/* Pre-print Compliance Preview Modal Trigger */}
          <button
            onClick={handleOpenCompliancePreview}
            id="compliance-preview-btn"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold transition shadow-sm cursor-pointer"
            title="Chop etishdan oldin shrift va abzats qoidalariga mosligini ko‘rish"
          >
            <FileCheck className="w-4 h-4" />
            <span>Standart Audit</span>
          </button>

          <button
            onClick={handleDownloadWord}
            id="export-word-btn"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition shadow-sm cursor-pointer"
            title="Microsoft Word (.docx) formatida yuklab olish"
          >
            <FileType className="w-4 h-4" />
            <span>Word (.docx)</span>
          </button>

          <button
            onClick={handlePrint}
            id="export-pdf-print-btn"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition shadow-sm cursor-pointer"
            title="A4 formatda PDF sifatida saqlash yoki chop etish"
          >
            <Printer className="w-4 h-4" />
            <span>Chop etish</span>
          </button>

          <button
            onClick={handleCopy}
            id="copy-text-btn"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Nusxalandi!' : 'Nusxalash'}</span>
          </button>
        </div>
      </div>

      {/* PDF Export Success Toast */}
      {pdfExportSuccessMessage && (
        <div className="bg-emerald-950/90 border border-emerald-500/50 text-emerald-200 px-4 py-2.5 rounded-xl text-xs font-medium flex items-center justify-between shadow-lg shadow-emerald-950/30 animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{pdfExportSuccessMessage}</span>
          </div>
          <button
            onClick={() => setPdfExportSuccessMessage(null)}
            className="text-emerald-400 hover:text-white text-xs font-bold px-1.5 py-0.5"
          >
            ✕
          </button>
        </div>
      )}

      {/* SMART TEMPLATES LIBRARY HUB (User Request: Smart Templates for Mehnat, Ijara, Doverennost with standard legislation auto-fill) */}
      <div 
        id="smart-templates-library-hub"
        data-testid="smart-templates-library-hub"
        className="bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/20 border border-amber-500/30 rounded-2xl p-4 sm:p-5 space-y-3.5 shadow-lg shadow-amber-950/10 ring-1 ring-amber-500/20"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="flex items-start sm:items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 shadow-sm shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                  Smart Templates Kutubxonasi
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  O‘zbekiston Standart Qonunchiligi
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  Avto-to‘ldirish
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                «Mehnat shartnomasi», «Ijaraga berish shartnomasi», «Doverennost» va asosiy shablonlarni tanlang — qonun mezonlari bilan avtomatik to‘ldiriladi.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsSmartTemplatesModalOpen(true)}
            id="view-all-smart-templates-btn"
            data-testid="view-all-smart-templates-button"
            className="px-3.5 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shrink-0 self-start sm:self-center"
          >
            <span>Kutubxonani ochish (8 ta tur)</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 6 Quick Smart Template Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {QUICK_SCHEMA_PRESETS.map((preset) => {
            const Icon = preset.icon;
            const isSelected = selectedTemplate.id === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => handleLoadQuickPreset(preset.id, preset.smartId)}
                id={`preset-btn-${preset.id}`}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-br from-amber-950/70 via-slate-900 to-cyan-950/50 border-amber-500 shadow-md ring-1 ring-amber-500/40'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-400'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {preset.badge}
                    </span>
                  </div>
                  <h4 className={`text-xs font-bold mb-1 line-clamp-1 ${isSelected ? 'text-amber-300' : 'text-slate-200'}`}>
                    {preset.label.split('(')[0].trim()}
                  </h4>
                  <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">
                    {preset.description}
                  </p>
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                  <span className={isSelected ? 'text-amber-400 font-semibold' : 'text-slate-500'}>
                    {isSelected ? '✓ Qonun bilan to‘ldirilgan' : 'Tanlash & Avto-to‘ldirish'}
                  </span>
                  <Zap className={`w-3 h-3 ${isSelected ? 'text-amber-400' : 'text-slate-600'}`} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Smart Template Legislation Status & Profile Switcher */}
        {(() => {
          const currentSmart = findSmartTemplate(selectedTemplate.id);
          if (!currentSmart) return null;

          return (
            <div className="pt-2.5 border-t border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-2.5 text-xs">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1">
                  <Scale className="w-3.5 h-3.5" />
                  Qonunchilik asosi:
                </span>
                <span className="text-[11px] text-slate-300 font-medium">
                  {currentSmart.governingLaw}
                </span>
                <a
                  href={currentSmart.lexUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline flex items-center gap-1 text-[11px]"
                >
                  <span>Lex.uz</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Sub-profiles selector if multiple exist */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] text-slate-400">Profil:</span>
                {currentSmart.profiles.map((p) => {
                  const isCurrentProfile = activeSmartProfileName === p.name;
                  return (
                    <button
                      key={p.id}
                      onClick={() => handleAutoPopulateCurrentWithLegislation(p.id)}
                      className={`px-2 py-0.5 rounded text-[11px] transition cursor-pointer flex items-center gap-1 ${
                        isCurrentProfile
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 font-bold'
                          : 'bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700/60'
                      }`}
                      title={p.description}
                    >
                      <span>{p.badge}</span>
                      {isCurrentProfile && <span>✓</span>}
                    </button>
                  );
                })}

                <button
                  onClick={() => handleAutoPopulateCurrentWithLegislation()}
                  id="re-auto-populate-legislation-btn"
                  className="px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 text-[11px] font-bold hover:bg-amber-400 transition cursor-pointer flex items-center gap-1 ml-1"
                  title="Qonunchilik me‘yorlari bilan maydonlarni qayta to‘ldirish"
                >
                  <Zap className="w-3 h-3 fill-slate-950" />
                  <span>Qayta to‘ldirish</span>
                </button>
              </div>
            </div>
          );
        })()}

        {/* Smart Auto-fill notice banner if present */}
        {smartAutoFillNotice && (
          <div className="bg-amber-950/30 border border-amber-500/30 rounded-xl px-3 py-2 text-[11px] text-amber-200 flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{smartAutoFillNotice}</span>
            </div>
            <button
              onClick={() => setSmartAutoFillNotice(null)}
              className="text-amber-400/80 hover:text-white text-xs font-bold px-1"
            >
              ✕
            </button>
          </div>
        )}

        {/* Profile Auto-fill Toast Notification */}
        {profileAutofillToast && (
          <div className="bg-emerald-950/50 border border-emerald-500/40 rounded-xl px-3.5 py-2.5 text-xs text-emerald-200 flex items-center justify-between shadow-md shadow-emerald-950/30 animate-fadeIn">
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-medium">{profileAutofillToast}</span>
            </div>
            <button
              onClick={() => setProfileAutofillToast(null)}
              className="text-emerald-400 hover:text-white text-xs font-bold px-1.5"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* OFFLINE MODE CONTROL & DRAFT STATUS BAR */}
      <div 
        id="offline-mode-control-panel"
        className={`p-3.5 sm:p-4 rounded-2xl border transition-all ${
          isEffectiveOffline
            ? 'bg-amber-950/25 border-amber-500/40 text-amber-200 shadow-md shadow-amber-950/20'
            : 'bg-slate-900/90 border-slate-800 text-slate-300'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-2.5">
            <div className={`p-2 rounded-xl shrink-0 ${isEffectiveOffline ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-slate-800 text-cyan-400 border border-slate-700'}`}>
              {isEffectiveOffline ? <WifiOff className="w-4 h-4" /> : <Wifi className="w-4 h-4" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-bold text-white">
                  {isEffectiveOffline ? 'Oflayn Rejim Faol (Offline Mode)' : 'Tarmoq Holati: Onlayn (Online)'}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isEffectiveOffline ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                }`}>
                  {isEffectiveOffline ? 'Lokal Dvigatel' : 'Sinxron'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {isEffectiveOffline
                  ? 'Internet aloqasisiz ishlaydi: barcha shablonlar, qonuniy bandlar, O‘zDSt 1157:2008 mezonlari va PDF Export 100% lokal xotiradan bajariladi.'
                  : 'Oflayn rejimda ishlash uchun tugmani bosing yoki internet aloqasi uzilganda avtomatik o‘tadi.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap shrink-0">
            {/* Toggle Offline Mode Button */}
            <button
              onClick={toggleForcedOffline}
              id="document-toggle-offline-btn"
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition cursor-pointer flex items-center gap-1.5 ${
                isEffectiveOffline
                  ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-sm hover:bg-amber-400'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
              }`}
            >
              {isEffectiveOffline ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
              <span>{isEffectiveOffline ? 'Onlaynga o‘tish' : 'Oflayn rejim'}</span>
            </button>

            {/* Manual Save Draft */}
            <button
              onClick={handleManualSaveDraft}
              id="save-offline-draft-btn"
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
              title="Qoralamani lokal xotiraga saqlash"
            >
              <Save className="w-3.5 h-3.5 text-cyan-400" />
              <span>Qoralamani saqlash</span>
            </button>

            {/* Restore Draft if available */}
            {lastSavedDraft && (
              <button
                onClick={handleRestoreSavedDraft}
                id="restore-offline-draft-btn"
                className="px-3 py-1.5 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-300 border border-cyan-500/40 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                title={`Oxirgi saqlangan qoralama: ${lastSavedDraft.title} (${lastSavedDraft.savedAt})`}
              >
                <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
                <span>Qoralamani tiklash ({lastSavedDraft.savedAt})</span>
              </button>
            )}
          </div>
        </div>

        {/* Draft save toast notification */}
        {draftToastMessage && (
          <div className="mt-2.5 pt-2 border-t border-slate-800/80 text-[11px] text-emerald-400 font-medium flex items-center gap-1.5 animate-fadeIn">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{draftToastMessage}</span>
          </div>
        )}
      </div>

      {/* REAL-TIME VALIDATION STATUS BANNER */}
      <div 
        className={`p-4 rounded-2xl border transition-all ${
          isValid
            ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
            : 'bg-red-950/20 border-red-500/40 text-red-300'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-3">
            <div className={`p-2 rounded-xl shrink-0 ${isValid ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
              {isValid ? <ShieldCheck className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5 animate-pulse" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-xs sm:text-sm font-bold text-white">
                  {isValid 
                    ? 'Barcha majburiy rekvizitlar to‘liq kiritilgan (100%)' 
                    : `Hujjatda ${missingRequiredFields.length} ta majburiy rekvizit to‘ldirilmagan`}
                </h4>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isValid ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
                }`}>
                  {completionPercentage}% tayyor
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {isValid 
                  ? 'Hujjat O‘zbekiston davlat standartlariga mos, PDF yuklab olish va chop etishga tayyor.' 
                  : 'PDF eksporti va rasmiy chop etish uchun shartnoma raqami, sanasi va taraflar ma‘lumotlari kiritilishi shart.'}
              </p>
            </div>
          </div>

          {/* Action buttons on banner */}
          <div className="flex items-center gap-2 shrink-0">
            {!isValid && (
              <button
                onClick={() => handleAutoPopulateCurrentWithLegislation()}
                className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-300 hover:bg-amber-500/25 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-sm"
                title="O‘zbekiston standart qonunchilik mezonlari bilan avto-to‘ldirish"
              >
                <Zap className="w-3.5 h-3.5 fill-amber-400" />
                <span>Qonun mezonlari bilan to‘ldirish</span>
              </button>
            )}

            {!isValid && (
              <button
                onClick={() => setEditorMode('form')}
                className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition cursor-pointer shadow-sm"
              >
                <span>Maydonlarni to‘ldirish</span>
              </button>
            )}
          </div>
        </div>

        {/* Missing fields clickable tags */}
        {!isValid && missingRequiredFields.length > 0 && (
          <div className="mt-3 pt-3 border-t border-red-500/20 flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-red-400 font-medium">To‘ldirilishi kerak bo‘lgan maydonlar:</span>
            {missingRequiredFields.map((f) => (
              <button
                key={f.key}
                onClick={() => scrollToMissingField(f.key)}
                className="px-2 py-0.5 rounded-md bg-red-900/40 hover:bg-red-900/60 border border-red-500/40 text-red-200 text-[11px] font-medium transition cursor-pointer flex items-center gap-1"
                title="Ushbu maydonga o'tish"
              >
                <span>{f.label}</span>
                <span className="text-red-400 font-bold">*</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Validation Blocker Modal if User Tries to Export without Required Fields */}
      {attemptedActionWithoutValidation && !isValid && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-red-950/80 to-slate-900 border border-red-500/50 shadow-xl space-y-3 animate-fadeIn">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
              <ShieldAlert className="w-5 h-5" />
              <span>Diqqat: Majburiy rekvizitlar kiritilmagan!</span>
            </div>
            <button
              onClick={() => setAttemptedActionWithoutValidation(null)}
              className="text-slate-400 hover:text-white text-xs font-bold px-2 py-1"
            >
              ✕ Yopish
            </button>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            O‘zbekiston Respublikasi yuridik hujjatlar standartiga (O‘zDSt 1157:2008) ko‘ra, rasmiy PDF yoki Word fayl yaratish uchun quyidagi qizil bilan belgilangan maydonlarni kiritish shart:
          </p>

          <div className="flex flex-wrap gap-2">
            {missingRequiredFields.map((f) => (
              <button
                key={f.key}
                onClick={() => scrollToMissingField(f.key)}
                className="px-2.5 py-1 rounded-lg bg-red-500/20 border border-red-500 text-red-300 text-xs font-semibold hover:bg-red-500/30 transition cursor-pointer"
              >
                {f.label} ni kiritish →
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-red-500/20">
            <button
              onClick={handleFillSampleData}
              className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
            >
              <Zap className="w-4 h-4" />
              <span>Namunaviy ma‘lumotlar bilan to‘ldirib davom etish</span>
            </button>
            <button
              onClick={() => {
                setAttemptedActionWithoutValidation(null);
                setEditorMode('form');
              }}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition cursor-pointer"
            >
              Qo‘lda to‘ldirish
            </button>
          </div>
        </div>
      )}

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
        {[
          { id: 'all', label: 'Barcha hujjatlar' },
          { id: 'labor', label: 'Mehnat munosabatlari (MK)' },
          { id: 'civil', label: 'Fuqarolik & Ijara (FK)' },
          { id: 'business', label: 'Biznes, Yetkazib berish & Xizmatlar' },
          { id: 'court', label: 'Sud da‘volari & Talabnomalar' },
          { id: 'family', label: 'Oila & Aliment' },
          { id: 'admin', label: 'Davlat organlariga arizalar' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id as any)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Full Template Selector Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
        {filteredTemplates.map((template) => {
          const isSelected = template.id === selectedTemplate.id;
          return (
            <button
              key={template.id}
              onClick={() => handleSelectTemplate(template)}
              id={`tmpl-select-${template.id}`}
              className={`text-left p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-cyan-950/40 border-cyan-500/50 shadow-md ring-1 ring-cyan-500/20'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {template.classificationCode?.split('/')[1] || template.category.toUpperCase()}
                  </span>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
                </div>
                <h4 className={`text-xs font-bold line-clamp-2 mb-1 ${isSelected ? 'text-cyan-300' : 'text-slate-200'}`}>
                  {template.shortTitle || template.title}
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-2">
                  {template.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Mode Selector Tabs (Bloklar / Forma / To'liq Matn) */}
      <div className="flex items-center justify-between flex-wrap gap-3 p-2 rounded-xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-slate-400 font-medium px-2">Tahrirlash rejimi:</span>
          
          <button
            onClick={() => setEditorMode('blocks')}
            id="tab-blocks-mode"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              editorMode === 'blocks'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Vizual Bloklar Muharriri</span>
          </button>

          <button
            onClick={() => setEditorMode('form')}
            id="tab-form-mode"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer relative ${
              editorMode === 'form'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Rekvizitlar Formasi</span>
            {!isValid && (
              <span className="w-2 h-2 rounded-full bg-red-400"></span>
            )}
          </button>

          <button
            onClick={() => setEditorMode('raw')}
            id="tab-raw-mode"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              editorMode === 'raw'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>To‘liq Matn</span>
          </button>
        </div>

        {/* Legal Clause Bank Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsClauseDrawerOpen(!isClauseDrawerOpen)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer ${
              isClauseDrawerOpen
                ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isClauseDrawerOpen ? 'Iqtiboslar Bankini berkitish' : 'Qonuniy Iqtiboslar Banki (Drag & Drop)'}</span>
          </button>
        </div>
      </div>

      {/* Main Studio Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Interactive Editor Area (Blocks / Form / Raw Text) */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* Active Template Meta Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  {selectedTemplate.category.toUpperCase()} HUQUQI
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white mt-1.5">
                  {selectedTemplate.title}
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedTemplate.description}
            </p>

            {/* Applicable Law Citation */}
            <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Scale className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="truncate">{selectedTemplate.applicableLaw}</span>
              </div>
              <a
                href={selectedTemplate.lexUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 transition shrink-0"
              >
                <span>Lex.uz</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Action to auto-fill sample data */}
            {/* Auto-fill Template Integration (Mening Profilim: F.I.Sh., Pasport, STIR) */}
            <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-950/40 via-slate-950 to-slate-900 border border-emerald-500/30 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-white">Mening Profilim Rekvizitlari</span>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                  {isProfileComplete ? '✓ Profil to‘liq' : 'Standart profil'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 truncate">
                {profile?.fullName || DEFAULT_SAMPLE_USER_PROFILE.fullName} | Pasport: {profile?.passportSeriesNumber || DEFAULT_SAMPLE_USER_PROFILE.passportSeriesNumber} | STIR: {profile?.tin || DEFAULT_SAMPLE_USER_PROFILE.tin}
              </p>
              <div className="flex items-center gap-2 pt-0.5">
                <select
                  value={profileAutofillRole}
                  onChange={(e) => setProfileAutofillRole(e.target.value as any)}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-[11px] text-slate-300 focus:outline-none focus:border-emerald-500 cursor-pointer flex-1"
                >
                  <option value="secondParty">2-taraf sifatida (Xodim / Ijarachi / Vakil)</option>
                  <option value="firstParty">1-taraf sifatida (Ish beruvchi / Ijaraga beruvchi)</option>
                </select>
                <button
                  type="button"
                  onClick={() => handleAutoFillFromProfile(profileAutofillRole)}
                  id="profile-card-autofill-btn"
                  className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm cursor-pointer shrink-0"
                  title="Ushbu shartnoma maydonlarini profil ma'lumotlari bilan to‘ldirish"
                >
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  <span>Auto-fill Template</span>
                </button>
              </div>
            </div>

            {/* Action to auto-fill sample data */}
            {selectedTemplate.sampleFilledValues && (
              <button
                onClick={handleFillSampleData}
                id="fill-sample-data-btn"
                type="button"
                className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-xs font-medium text-cyan-300 border border-cyan-500/20 transition cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Namunaviy rekvizitlar bilan to‘ldirish</span>
              </button>
            )}
          </div>

          {/* Mode 1: Visual Block Editor */}
          {editorMode === 'blocks' && (
            <ContractBlockEditor
              initialDocumentText={currentDocumentText}
              onChangeDocumentText={handleUpdateDocumentText}
            />
          )}

          {/* Mode 2: Form Fields Editor with REAL-TIME MANDATORY VALIDATION HIGHLIGHTING */}
          {editorMode === 'form' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-cyan-400" />
                  <span>Hujjat rekvizitlari va maydonlari</span>
                </h4>
                <span className="text-[11px] text-slate-400">
                  {completedRequiredCount}/{totalRequiredCount} ta majburiy maydon
                </span>
              </div>

              <div className="space-y-3.5">
                {selectedTemplate.fields.map((field) => {
                  const val = formValues[field.key];
                  const isFieldEmpty = !val || val.trim() === '';
                  const isError = field.required && isFieldEmpty;

                  return (
                    <div key={field.key} className="space-y-1">
                      <label className="text-xs font-medium flex items-center justify-between">
                        <span className={isError ? 'text-red-400 font-semibold' : 'text-slate-300'}>
                          {field.label} {field.required && <span className="text-red-400 font-bold">*</span>}
                        </span>
                        {isError && (
                          <span className="text-[10px] text-red-400 font-medium flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            Majburiy rekvizit
                          </span>
                        )}
                      </label>

                      {field.type === 'textarea' ? (
                        <textarea
                          ref={(el) => {
                            fieldRefs.current[field.key] = el;
                          }}
                          value={formValues[field.key] || ''}
                          onChange={(e) => handleInputChange(field.key, e.target.value)}
                          placeholder={field.placeholder}
                          rows={2}
                          className={`w-full bg-slate-950 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none transition ${
                            isError
                              ? 'border-2 border-red-500/80 bg-red-950/20 focus:border-red-400 ring-2 ring-red-500/20'
                              : 'border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500'
                          }`}
                        />
                      ) : field.type === 'select' ? (
                        <select
                          ref={(el) => {
                            fieldRefs.current[field.key] = el;
                          }}
                          value={formValues[field.key] || field.defaultValue || ''}
                          onChange={(e) => handleInputChange(field.key, e.target.value)}
                          className={`w-full bg-slate-950 rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition cursor-pointer ${
                            isError
                              ? 'border-2 border-red-500/80 bg-red-950/20 focus:border-red-400 ring-2 ring-red-500/20'
                              : 'border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500'
                          }`}
                        >
                          {field.options?.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          ref={(el) => {
                            fieldRefs.current[field.key] = el;
                          }}
                          type={field.type}
                          value={formValues[field.key] || ''}
                          onChange={(e) => handleInputChange(field.key, e.target.value)}
                          placeholder={field.placeholder}
                          className={`w-full bg-slate-950 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none transition ${
                            isError
                              ? 'border-2 border-red-500/80 bg-red-950/20 focus:border-red-400 ring-2 ring-red-500/20'
                              : 'border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500'
                          }`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Mode 3: Raw Full Text Editor */}
          {editorMode === 'raw' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-cyan-400" />
                  <span>To‘liq Shartnoma Matni Tahrirlovchisi</span>
                </h4>
                <span className="text-[11px] text-slate-400">
                  {currentDocumentText.length} ta belgi
                </span>
              </div>

              <textarea
                value={currentDocumentText}
                onChange={(e) => handleUpdateDocumentText(e.target.value)}
                rows={16}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-[13px] text-slate-100 font-mono leading-relaxed focus:outline-none focus:border-cyan-500 transition resize-y"
              />
            </div>
          )}

          {/* AI Enhancement Section */}
          <div className="bg-slate-900/90 border border-cyan-500/20 rounded-2xl p-4 sm:p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                AI Yurist orqali boyitish & moslashtirish
              </h4>
            </div>

            <textarea
              value={customAIInstruction}
              onChange={(e) => setCustomAIInstruction(e.target.value)}
              placeholder="Qo‘shimcha shartlar (masalan: maxfiylik bandini kuchaytirish, peniyani 0.5% ga chegaralash, sud yurisdiksiyasini Toshkentga belgilash)..."
              rows={2}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 transition"
            />

            <button
              onClick={handleAIEnhance}
              id="ai-generate-doc-btn"
              disabled={isAIEnhancing}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold transition shadow-md shadow-cyan-600/20 disabled:opacity-50 cursor-pointer"
            >
              {isAIEnhancing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>AI Hujjatni tayyorlamoqda...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>AI bilan professional shaklga keltirish</span>
                </>
              )}
            </button>
          </div>

          {/* Drag & Drop Legal Clauses Drawer (Collapsible) */}
          {isClauseDrawerOpen && (
            <LegalClauseDrawer
              isOpen={isClauseDrawerOpen}
              onToggle={() => setIsClauseDrawerOpen(!isClauseDrawerOpen)}
              onInsertClause={handleInsertClauseFromDrawer}
            />
          )}
        </div>

        {/* Right Column: Official A4 Standard Document Canvas */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* Typography & Document Settings Bar (O‘zDSt 1157:2008) */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 flex flex-wrap items-center justify-between gap-3">
            
            {/* Font Family */}
            <div className="flex items-center gap-1.5 text-xs text-slate-300">
              <span className="text-slate-400">Shrift:</span>
              <select
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value as any)}
                className="bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
              >
                <option value="Times New Roman">Times New Roman (O‘zDSt)</option>
                <option value="Arial">Arial</option>
                <option value="Calibri">Calibri</option>
                <option value="Georgia">Georgia</option>
              </select>
            </div>

            {/* Font Size */}
            <div className="flex items-center gap-1.5 text-xs text-slate-300">
              <span className="text-slate-400">O‘lcham:</span>
              <select
                value={fontSizePt}
                onChange={(e) => setFontSizePt(Number(e.target.value))}
                className="bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
              >
                <option value={12}>12 pt</option>
                <option value={13}>13 pt</option>
                <option value={14}>14 pt (Rasmiy)</option>
                <option value={15}>15 pt</option>
              </select>
            </div>

            {/* Line Spacing */}
            <div className="flex items-center gap-1.5 text-xs text-slate-300">
              <span className="text-slate-400">Oraliq:</span>
              <select
                value={lineSpacing}
                onChange={(e) => setLineSpacing(Number(e.target.value))}
                className="bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
              >
                <option value={1.0}>1.0 (Zich)</option>
                <option value={1.15}>1.15 (O‘zDSt)</option>
                <option value={1.5}>1.5 (Standart)</option>
              </select>
            </div>

            {/* Xatboshi / Abzats */}
            <div className="flex items-center gap-1.5 text-xs text-slate-300">
              <span className="text-slate-400">Xatboshi:</span>
              <select
                value={paragraphIndentCm}
                onChange={(e) => setParagraphIndentCm(Number(e.target.value))}
                className="bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
              >
                <option value={0.75}>0.75 sm</option>
                <option value={1.25}>1.25 sm (O‘zDSt)</option>
                <option value={1.5}>1.50 sm</option>
              </select>
            </div>
          </div>

          {/* Official A4 Sheet Simulation Canvas */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-3 sm:p-5 overflow-hidden flex flex-col items-center">
            
            {/* Document Sheet Info Header */}
            <div className="w-full max-w-[210mm] flex flex-wrap items-center justify-between text-[11px] text-slate-400 mb-2 px-2 gap-2">
              <div className="flex items-center gap-2">
                <span className={`inline-block w-2 h-2 rounded-full ${isValid ? 'bg-emerald-400 animate-pulse' : 'bg-red-400 animate-ping'}`}></span>
                <span className="font-semibold text-slate-200">Rasmiy A4 Format (210×297 mm)</span>
                <span className="text-slate-600 hidden sm:inline">|</span>
                <span className="hidden sm:inline">Chap 30mm • Yuqori 20mm • O‘ng 15mm</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleReviewWithAI}
                  id="canvas-review-with-ai-btn"
                  className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-purple-900/60 to-indigo-900/60 hover:from-purple-800/60 hover:to-indigo-800/60 text-purple-200 border border-purple-500/40 font-semibold text-[11px] flex items-center gap-1.5 transition cursor-pointer shadow-sm"
                  title="O‘zbekiston qonunlari bo‘yicha xatolarni tekshirish"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                  <span>Review with AI</span>
                </button>
                <button
                  onClick={() => setIsPreviewModalOpen(true)}
                  id="canvas-preview-modal-btn"
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 font-semibold text-[11px] flex items-center gap-1.5 transition cursor-pointer border border-cyan-500/30 hover:border-cyan-400"
                  title="Hujjatni tahrirlanmaydigan formatda to‘liq ko‘rish"
                >
                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Preview</span>
                </button>
                <button
                  onClick={handleDownloadPdf}
                  disabled={isGeneratingPdf}
                  id="canvas-pdf-export-btn"
                  className="px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-[11px] flex items-center gap-1.5 transition shadow-sm cursor-pointer disabled:opacity-50"
                  title="A4 formatdagi PDF faylni yuklab olish"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PDF Export</span>
                </button>
                <button
                  onClick={handleDownloadWord}
                  id="canvas-word-export-btn"
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-[11px] flex items-center gap-1.5 transition cursor-pointer"
                  title="Word (.docx) formatida yuklab olish"
                >
                  <FileType className="w-3.5 h-3.5 text-blue-400" />
                  <span>Word</span>
                </button>
              </div>
            </div>

            {/* The Real A4 Sheet Container */}
            <div 
              id="official-document-canvas"
              className="w-full max-w-[210mm] bg-white text-slate-900 rounded-sm shadow-2xl transition-all duration-200 relative select-text overflow-hidden"
              style={{
                fontFamily: `'${fontFamily}', 'Times New Roman', serif`,
                boxSizing: 'border-box',
                minHeight: '297mm',
              }}
            >
              {/* Document Body with Official O'zDSt 1157:2008 Formatting */}
              <div 
                className="document-render-content"
                dangerouslySetInnerHTML={{
                  __html: formatDocumentToHtml(currentDocumentText, exportOptions)
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Smart Templates Library Modal */}
      <SmartTemplatesModal
        isOpen={isSmartTemplatesModalOpen}
        onClose={() => setIsSmartTemplatesModalOpen(false)}
        templates={LEGAL_DOCUMENT_TEMPLATES}
        selectedTemplateId={selectedTemplate.id}
        onSelectAndAutoPopulate={handleSelectAndAutoPopulateSmartTemplate}
        onPreviewTemplate={(tmpl) => {
          setSelectedTemplate(tmpl);
          setIsPreviewModalOpen(true);
        }}
      />

      {/* Compliance Pre-print Preview Modal */}
      <CompliancePreviewModal
        isOpen={isComplianceModalOpen}
        onClose={() => setIsComplianceModalOpen(false)}
        documentText={currentDocumentText}
        options={exportOptions}
        onExportWord={handleDownloadWord}
        onExportPdf={handleDownloadPdf}
        onPrint={handlePrint}
      />

      {/* Non-editable Formatted Document Preview Modal */}
      <DocumentPreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        documentText={currentDocumentText}
        options={exportOptions}
        onDownloadPdf={handleDownloadPdf}
        isGeneratingPdf={isGeneratingPdf}
        onDownloadWord={handleDownloadWord}
        onPrint={handlePrint}
      />

      {/* AI Legal Review Drawer */}
      <DocumentAIReviewDrawer
        isOpen={isReviewDrawerOpen}
        onClose={() => setIsReviewDrawerOpen(false)}
        reviewResult={reviewResult}
        isLoading={isReviewingAI}
        onApplySuggestion={handleApplySuggestion}
        onApplyAllSuggestions={handleApplyAllSuggestions}
        appliedSuggestionIds={appliedSuggestionIds}
        onRefreshReview={handleReviewWithAI}
      />
    </div>
  );
};

