/**
 * Official Legal Source Ingestion & Update Monitoring Service
 * Validates official document structures, tracks synchronization status,
 * quarantines malformed or incomplete records, and maintains an auditable sync log.
 */

import {
  OfficialDocumentRecord,
  LegalDocumentStatus,
} from './types';
import {
  AUDITED_OFFICIAL_DOCUMENTS,
  computeStringChecksum,
} from './LegalDataRepository';
import { LegalCacheManager } from './CacheManager';

export interface IngestionRunResult {
  runId: string;
  startedAt: string;
  completedAt: string;
  totalDocumentsProcessed: number;
  totalProvisionsProcessed: number;
  quarantinedCount: number;
  quarantinedDocuments: Array<{
    documentId: string;
    title: string;
    reason: string;
  }>;
  status: 'SUCCESS' | 'WARNING' | 'FAILED';
  sourceRegistrySnapshotVersion: string;
}

export interface SyncStatus {
  lastSuccessfulSyncAt: string;
  syncState: 'SYNCHRONIZED' | 'SYNC_IN_PROGRESS' | 'DEGRADED' | 'DISCONNECTED';
  activeDocumentsCount: number;
  activeProvisionsCount: number;
  quarantinedCount: number;
  systemRegistryVersion: string;
  officialSource: string;
}

class LegalIngestionService {
  private static instance: LegalIngestionService;
  private lastSyncAt: string = new Date().toISOString();
  private quarantinedRecords: Array<{ documentId: string; title: string; reason: string }> = [];
  private syncHistory: IngestionRunResult[] = [];

  public static getInstance(): LegalIngestionService {
    if (!LegalIngestionService.instance) {
      LegalIngestionService.instance = new LegalIngestionService();
    }
    return LegalIngestionService.instance;
  }

  /**
   * Validate and ingest an official document record.
   * Quarantines document if structure is invalid.
   */
  public validateAndIngestDocument(doc: Partial<OfficialDocumentRecord>): {
    accepted: boolean;
    quarantineReason?: string;
  } {
    // 1. Mandatory Metadata Checks
    if (!doc.documentId || !doc.officialTitle || !doc.officialDocumentNumber) {
      const reason = 'Yetishmayotgan majburiy maydonlar: documentId, officialTitle yoki officialDocumentNumber';
      this.quarantinedRecords.push({
        documentId: doc.documentId || 'unknown',
        title: doc.officialTitle || 'Nomsiz hujjat',
        reason,
      });
      return { accepted: false, quarantineReason: reason };
    }

    // 2. Date Integrity Check
    if (!doc.effectiveFrom) {
      const reason = 'Hujjatning rasmiy kuchga kirish sanasi (effectiveFrom) mavjud emas';
      this.quarantinedRecords.push({
        documentId: doc.documentId,
        title: doc.officialTitle,
        reason,
      });
      return { accepted: false, quarantineReason: reason };
    }

    // 3. Provisions Integrity Check
    if (!doc.provisions || !Array.isArray(doc.provisions) || doc.provisions.length === 0) {
      const reason = 'Hujjatda birorta ham modda yoki qism topilmadi (chala yoki buzilgan hujjat)';
      this.quarantinedRecords.push({
        documentId: doc.documentId,
        title: doc.officialTitle,
        reason,
      });
      return { accepted: false, quarantineReason: reason };
    }

    // 4. Validate Each Provision
    for (const prov of doc.provisions) {
      if (!prov.articleNumber || !prov.currentContent) {
        const reason = `Modda raqami yoki matni bo‘sh bo‘lgan norma aniqlandi: ${prov.provisionId || 'unknown'}`;
        this.quarantinedRecords.push({
          documentId: doc.documentId,
          title: doc.officialTitle,
          reason,
        });
        return { accepted: false, quarantineReason: reason };
      }
    }

    // Validated: invalidate affected caches
    LegalCacheManager.getInstance().invalidateDocument(doc.documentId);
    return { accepted: true };
  }

  /**
   * Triggers a comprehensive ingestion verification pass over the registry
   */
  public triggerSynchronization(): IngestionRunResult {
    const startedAt = new Date().toISOString();
    let totalProvs = 0;
    const initialQuarantineCount = this.quarantinedRecords.length;

    for (const doc of AUDITED_OFFICIAL_DOCUMENTS) {
      const res = this.validateAndIngestDocument(doc);
      if (res.accepted) {
        totalProvs += doc.provisions.length;
      }
    }

    const completedAt = new Date().toISOString();
    this.lastSyncAt = completedAt;

    const runResult: IngestionRunResult = {
      runId: `sync-${Date.now()}`,
      startedAt,
      completedAt,
      totalDocumentsProcessed: AUDITED_OFFICIAL_DOCUMENTS.length,
      totalProvisionsProcessed: totalProvs,
      quarantinedCount: this.quarantinedRecords.length - initialQuarantineCount,
      quarantinedDocuments: [...this.quarantinedRecords],
      status: this.quarantinedRecords.length === 0 ? 'SUCCESS' : 'WARNING',
      sourceRegistrySnapshotVersion: 'LEXUZ-2026.1-INSTITUTIONAL',
    };

    this.syncHistory.push(runResult);
    return runResult;
  }

  /**
   * Returns live synchronization status for admin and UI indicators
   */
  public getSyncStatus(): SyncStatus {
    const activeDocs = AUDITED_OFFICIAL_DOCUMENTS.filter(
      (d) => d.documentStatus === 'DOC_IN_FORCE'
    ).length;
    let activeProvs = 0;
    for (const doc of AUDITED_OFFICIAL_DOCUMENTS) {
      if (doc.documentStatus === 'DOC_IN_FORCE') {
        activeProvs += doc.provisions.filter(
          (p) => p.provisionStatus === 'PROVISION_IN_FORCE'
        ).length;
      }
    }

    return {
      lastSuccessfulSyncAt: this.lastSyncAt,
      syncState: this.quarantinedRecords.length === 0 ? 'SYNCHRONIZED' : 'DEGRADED',
      activeDocumentsCount: activeDocs,
      activeProvisionsCount: activeProvs,
      quarantinedCount: this.quarantinedRecords.length,
      systemRegistryVersion: 'LEXUZ-2026.1-RELEASE',
      officialSource: 'Lex.uz Milliy qonunchilik ma’lumotlari bazasi',
    };
  }

  public getQuarantinedRecords(): Array<{ documentId: string; title: string; reason: string }> {
    return [...this.quarantinedRecords];
  }
}

export const legalIngestionService = LegalIngestionService.getInstance();
