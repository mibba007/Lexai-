export type LegalCategory = 
  | 'all'
  | 'labor'        // Mehnat huquqi
  | 'civil'        // Fuqarolik huquqi
  | 'tax'          // Soliq huquqi
  | 'criminal'     // Jinoyat huquqi
  | 'admin'        // Ma'muriy huquq
  | 'family'       // Oila huquqi
  | 'business'     // Biznes va korporativ huquq
  | 'it_ip'        // IT va intellektual mulk
  | 'customs'      // Bojxona huquqi
  | 'court';       // Sud protsessi va ijro

export type LanguageMode = 'uz_lat' | 'uz_kir' | 'ru' | 'en';
export type NavigationTab = 'chat' | 'forensic' | 'dispute' | 'codex' | 'contract' | 'generator' | 'calculators' | 'cabinet' | 'profile';

export interface AudioForensicMetadata {
  recordingDate?: string;
  recordingDevice?: string;
  recordedBy?: string;
  recordingContext?: string;
  caseType?: 'civil' | 'economic' | 'labor' | 'criminal' | 'administrative';
  partiesInvolved?: string;
}

export interface AudioForensicReport {
  id: string;
  fileName: string;
  fileSize?: string;
  audioDuration?: string;
  analyzedAt: string;
  metadata: AudioForensicMetadata;
  fullTranscript: string;
  speakers: string[];
  executiveSummary: string;
  evidentiaryScore: number; // 0 - 100
  admissibilityVerdict: 'HIGHLY_ADMISSIBLE' | 'ADMISSIBLE_WITH_CONDITIONS' | 'RISK_OF_INADMISSIBILITY';
  verdictLabel: string;
  sentenceBreakdown: AudioSentenceAnalysis[];
  courtAdmissibilityEvaluation: {
    fpk78Compliance: string;
    sourceLegality: string;
    chainOfCustody: string;
    phonoscopicExpertiseRequirement: string;
    admissibilityChecklist: Array<{ item: string; passed: boolean; note: string }>;
  };
  keyLegalFindings: string[];
  actionableSteps: string[];
  statuteOfLimitationsImpact?: string;
  motionDraftText: string;
}

export type DisputePartyRole = 'defendant' | 'plaintiff' | 'auditor';

export interface DisputeGroundEvaluation {
  id: string;
  claimPoint: string;              // Qarshi tomon qo‘ygan talab yoki shikoyat vaji
  opponentLegalBasis?: string;     // Qarshi tomon tayangan modda/asos
  status: 'LEGAL_AND_GROUNDED' | 'PARTIALLY_GROUNDED' | 'UNGROUNDED_OR_ILLEGAL' | 'PROCEDURAL_VIOLATION';
  statusLabel: string;             // Masalan: "Qonunga zid / Asossiz"
  analysis: string;                // AI Yuridik ekspert xulosasi
  lexArticle: string;              // Rasmiy qonun moddasi
  lexUrl: string;                  // Lex.uz havolasi
  counterArgument: string;         // Himoya yoki rad etish uchun yuridik vaj
}

export interface ClarificationQuestion {
  id: string;
  question: string;
  category: 'evidence' | 'procedural' | 'financial' | 'factual';
  importance: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  impactExplanation: string;
  options?: string[];
  userAnswer?: string;
}

export interface DisputeAuditResult {
  caseTitle: string;
  disputeType: string;
  partyRole: DisputePartyRole;
  clientCompanyName?: string;
  opponentName?: string;
  claimTotalAmount?: string;
  overallWinProbability: number;     // e.g. 78 (%)
  riskProbability: number;           // e.g. 22 (%)
  probabilityRationale: string;      // Foiz hisob-kitobining yuridik asosnomasi
  confidenceDisclaimer: string;      // Qonuniy kafolat bermaslik va sud mustaqilligi ogohlantirishi
  executiveSummary: string;
  claimGrounds: DisputeGroundEvaluation[];
  proceduralDefects: Array<{
    title: string;
    lawArticle: string;
    description: string;
    practicalAdvantage: string;
    lexUrl: string;
  }>;
  strongPoints: string[];
  vulnerabilities: string[];
  interactiveQuestions: ClarificationQuestion[];
  actionPlaybook: Array<{
    stepNumber: number;
    title: string;
    action: string;
    deadline?: string;
    documentsNeeded: string[];
  }>;
  generatedCounterDocument?: {
    title: string;
    docType: 'otziv' | 'vstrechniy_davo' | 'pretenziya_javob' | 'shikoyat_rad';
    content: string;
    lexBasis: string;
  };
}

export interface LegalCitation {
  documentName: string;      // masalan: "O‘zbekiston Respublikasining Mehnat kodeksi"
  documentType: 'Kodeks' | 'Qonun' | 'Prezident Farmoni' | 'Prezident Qarori' | 'Vazirlar Mahkamasi Qarori' | 'Konstitutsiya' | 'Boshqa';
  articleNumber: string;     // masalan: "161-modda"
  partNumber?: string;       // masalan: "2-qism"
  paragraphNumber?: string;  // masalan: "4-band"
  quote?: string;            // Aniq normativ matn
  editionDate: string;       // masalan: "2023-yil 30-apreldan amalda"
  lexUrl: string;            // masalan: "https://lex.uz/docs/6257288#6258900"
  status: 'CURRENT' | 'HISTORICAL';
  relevanceScore?: number;
}

export type LexVerificationStatus = 'ACTIVE' | 'RECENTLY_AMENDED' | 'REPEALED' | 'REVISED' | 'CHECKING' | 'ERROR';

export interface LexVerificationResult {
  lexUrl: string;
  documentName: string;
  articleNumber: string;
  status: 'ACTIVE' | 'RECENTLY_AMENDED' | 'REPEALED' | 'REVISED';
  statusLabel: string;
  isLatestEdition: boolean;
  lastAmendedLaw?: string;
  lastVerifiedAt: string;
  notes: string;
  officialSource: string;
  confidence: 'HIGH' | 'VERIFIED';
}

export interface AudioSentenceAnalysis {
  sentenceNumber: number;
  speaker?: string;                  // masalan: "1-so‘zlovchi (Qarz oluvchi)", "2-so‘zlovchi (Talabgor)"
  timestamp?: string;                // masalan: "00:04 - 00:12"
  exactStatement: string;            // Audioda aytilgan aniq gap/iqtibos
  legalMeaning: string;              // Gapning huquqiy oqibatlari va bahosi
  associatedLawArticle?: string;     // Tegishli qonun moddasi (masalan: O‘zR FK 732-modda)
  legalRiskOrEvidentiaryWeight?: 'CRITICAL' | 'IMPORTANT' | 'NEUTRAL';
  lexUrl?: string;
}

export interface LegalAnalysisResult {
  summaryAnswer: string;
  legalBasis: LegalCitation[];
  detailedAnalysis: string;
  practicalSteps: string[];
  importantNotes: string[];
  risksAndSanctions?: string[];
  clarificationQuestions?: string[];
  confidenceLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  editionStatus: string;
  category: LegalCategory;
  thinkingProcess?: string;
  sourceGroundingUrls?: Array<{ title: string; url: string }>;
  attachedMediaAudit?: {
    mediaType: 'document' | 'audio' | 'image';
    fileName: string;
    transcriptOrExtractedText?: string;
    speakersIdentified?: string[];
    audioDurationEstimate?: string;
    sentenceBreakdown?: AudioSentenceAnalysis[];
    keyLegalFindings?: string[];
    evidentiaryValue?: string;
    audioEvidenceLegalityRules?: string[];
  };
}

export interface ChatAttachment {
  name: string;
  type: 'image' | 'text' | 'document' | 'audio';
  previewUrl?: string;
  content?: string;
  fileSize?: string;
  mimeType?: string;
  duration?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  text: string;
  analysis?: LegalAnalysisResult;
  attachments?: ChatAttachment[];
  audioUrl?: string;
  isStreaming?: boolean;
}

export interface CodexArticle {
  id: string;
  codeId: string;
  codeName: string;
  chapterNumber?: string;
  chapterTitle?: string;
  articleNumber: string;
  articleTitle: string;
  content: string;
  effectiveDate: string;
  editionStatus: 'CURRENT' | 'HISTORICAL';
  lexUrl: string;
  keywords: string[];
  category: LegalCategory;
}

export interface ContractClauseAudit {
  id: string;
  clauseTitle: string;
  originalText: string;
  riskLevel: 'HIGH' | 'MEDIUM' | 'LOW' | 'SAFE';
  issueDescription: string;
  legalViolationCitation: string;
  lexUrl: string;
  suggestedAlternative: string;
}

export type ContractClauseIssue = ContractClauseAudit;

export interface ContractAnalysisResult {
  contractType: string;
  overallRiskScore: number; // 0 - 100 (100 = safe, 0 = critical risk)
  complianceStatus: 'COMPLIANT' | 'NEEDS_REVISION' | 'HIGH_RISK';
  summary: string;
  clauses: ContractClauseAudit[];
  generalRecommendations: string[];
  missingCrucialClauses: string[];
}

export interface LegalDocumentField {
  key: string;
  label: string;
  placeholder?: string;
  type: 'text' | 'textarea' | 'date' | 'number' | 'select';
  options?: string[];
  defaultValue?: string;
  required?: boolean;
}

export interface ConsultationDocContext {
  query: string;
  analysis: LegalAnalysisResult;
  suggestedDocType?: string;
}

export interface LegalDocumentTemplate {
  id: string;
  title: string;
  shortTitle?: string;
  category: LegalCategory;
  description: string;
  applicableLaw: string;
  lexUrl: string;
  classificationCode?: string; // O'zDSt 1157:2008 / FK-386 standard code
  fields: LegalDocumentField[];
  sampleFilledValues?: Record<string, string>;
  templateGenerator: (values: Record<string, string>) => string;
}

export interface LegalChatSession {
  id: string;
  title: string;
  category?: string;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
  lastQuery?: string;
  isPinned?: boolean;
  notes?: string;
  tags?: string[];
}

export type ReviewSuggestionType = 'CRITICAL_ERROR' | 'MISSING_MANDATORY_CLAUSE' | 'RECOMMENDATION';

export interface DocumentReviewSuggestion {
  id: string;
  type: ReviewSuggestionType;
  category: string;
  issueTitle: string;
  problematicText?: string;
  lawViolationCitation: string;
  lexUrl: string;
  explanation: string;
  suggestedReplacement: string;
  actionType: 'REPLACE' | 'INSERT_SECTION' | 'APPEND';
  applied?: boolean;
}

export interface DocumentAIReviewResult {
  overallScore: number; // 0 - 100
  summary: string;
  complianceRating: 'EXCELLENT' | 'GOOD' | 'NEEDS_REVISION' | 'CRITICAL_RISK';
  criticalIssuesCount: number;
  warningsCount: number;
  suggestions: DocumentReviewSuggestion[];
  reviewedAt: string;
}

