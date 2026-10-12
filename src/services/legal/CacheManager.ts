/**
 * Version-Aware Cache Manager for Legal Verification Results
 * Prevents silent cache reuse across different versions, dates, or altered citations.
 */

import { VerificationVerdict, VerificationEvidenceRecord } from './types';

export interface LegalCacheKeyParams {
  docId: string;
  articleNumber: string;
  targetDate: string;
  checksum?: string;
}

export interface CachedLegalResult {
  docId: string;
  articleNumber: string;
  targetDate: string;
  sourceChecksum: string;
  verdict: VerificationVerdict;
  cachedAt: number;     // timestamp ms
  expiresAt: number;    // timestamp ms
  evidence: VerificationEvidenceRecord;
}

export class LegalCacheManager {
  private static instance: LegalCacheManager;
  private memoryCache = new Map<string, CachedLegalResult>();
  private defaultTtlMs = 30 * 60 * 1000; // 30 minutes

  public static getInstance(): LegalCacheManager {
    if (!LegalCacheManager.instance) {
      LegalCacheManager.instance = new LegalCacheManager();
    }
    return LegalCacheManager.instance;
  }

  /**
   * Generates a deterministic, version- and date-sensitive cache key
   */
  public generateKey(params: LegalCacheKeyParams): string {
    const cleanDoc = (params.docId || 'unknown').toLowerCase().trim();
    const cleanArt = (params.articleNumber || 'unknown').toLowerCase().replace(/[^a-z0-9]/g, '');
    const cleanDate = (params.targetDate || 'today').slice(0, 10);
    const cleanCheck = params.checksum || 'any';
    return `LEXCACHE:${cleanDoc}:${cleanArt}:${cleanDate}:${cleanCheck}`;
  }

  /**
   * Gets cached verification result if present and fresh
   */
  public get(params: LegalCacheKeyParams): {
    hit: boolean;
    isStale: boolean;
    data?: CachedLegalResult;
  } {
    const key = this.generateKey(params);
    const entry = this.memoryCache.get(key);

    if (!entry) {
      return { hit: false, isStale: false };
    }

    const now = Date.now();
    if (now > entry.expiresAt) {
      // Stale cache detected: fail closed, do not treat as verified
      return { hit: true, isStale: true, data: entry };
    }

    return { hit: true, isStale: false, data: entry };
  }

  /**
   * Stores a validated result with strict TTL and source checksum
   */
  public set(
    params: LegalCacheKeyParams,
    evidence: VerificationEvidenceRecord,
    customTtlMs?: number
  ): void {
    const key = this.generateKey(params);
    const now = Date.now();
    const ttl = customTtlMs || this.defaultTtlMs;

    this.memoryCache.set(key, {
      docId: params.docId,
      articleNumber: params.articleNumber,
      targetDate: params.targetDate,
      sourceChecksum: evidence.sourceChecksum || 'default',
      verdict: evidence.verdict,
      cachedAt: now,
      expiresAt: now + ttl,
      evidence,
    });
  }

  /**
   * Invalidate specific document or all cache upon source updates
   */
  public invalidateDocument(docId: string): void {
    const prefix = `LEXCACHE:${docId.toLowerCase().trim()}:`;
    for (const key of this.memoryCache.keys()) {
      if (key.startsWith(prefix)) {
        this.memoryCache.delete(key);
      }
    }
  }

  public clearAll(): void {
    this.memoryCache.clear();
  }
}
