'use client';

// SLICE 3 (V6) — DocumentUpload: feste Slots, DB-First mit Rollback.
// DB-Eintrag (PENDING) vor Storage-Upload, bei Fehler Rollback (Löschen),
// danach Status PROCESSING. Pfad: ${userId}/${caseId}/${fileId}.${ext}.
// Reload-sicher: Beim Mounten werden vorhandene Dokumente geladen.
// Slot-Labels/Beschreibungen aus dem Dict (alg1.upload.slots.<ROLE>).
import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth-context';
import { DocumentSlot } from './upload/DocumentSlot';
import { useLocaleFromPath } from '@/i18n/use-locale';
import { getDashboardDict } from '@/content/i18n/dashboard';

const SLOTS = [
  { role: 'TERMINATION', required: true },
  { role: 'PAYSLIP', required: true },
  { role: 'ID_CARD', required: true },
  { role: 'OTHER', required: false },
] as const;

interface DocumentRow {
  id: string;
  filename: string;
  status: string;
  storage_path: string | null;
}

export function DocumentUpload({
  userId,
  caseId,
  applicationId,
  onComplete,
}: {
  userId: string;
  caseId: string;
  applicationId?: string;
  onComplete: () => void;
}) {
  const { user } = useAuth();
  const locale = useLocaleFromPath();
  const t = getDashboardDict(locale).alg1.upload;
  const [files, setFiles] = useState<Record<string, DocumentRow>>({});
  const [loading, setLoading] = useState(true);
  const [bypass, setBypass] = useState(false);

  // Initialer Fetch — Reload-Sicherheit (Dokumente bleiben immer sichtbar)
  useEffect(() => {
    if (!user || !applicationId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Initialzustand ohne Fetch-Möglichkeit
      setLoading(false);
      return;
    }
    const load = async () => {
      const { data } = await supabase
        .from('documents_meta')
        .select('id, filename, status, storage_path, document_role')
        .eq('application_id', applicationId)
        .neq('status', 'ERROR');
      if (data) {
        const mapped: Record<string, DocumentRow> = {};
        (data as (DocumentRow & { document_role: string | null })[]).forEach((doc) => {
          if (doc.document_role) mapped[doc.document_role] = doc;
        });
        setFiles(mapped);
      }
      setLoading(false);
    };
    load();
  }, [user, applicationId]);

  const handleUpload = useCallback(
    async (file: File, role: string) => {
      if (!user) return;
      const fileId = crypto.randomUUID();
      const ext = (file.name.split('.').pop() ?? 'bin').toLowerCase();
      const filePath = `${userId}/${caseId}/${fileId}.${ext}`;

      // 1. DB-First: Slot reservieren (PENDING) — application_id UND case_id
      const { data: meta, error: metaErr } = await supabase
        .from('documents_meta')
        .insert({
          application_id: applicationId,
          case_id: caseId,
          user_id: user.id,
          document_role: role,
          storage_path: filePath,
          filename: file.name,
          file_size: file.size,
          mime_type: file.type,
          status: 'PENDING',
        })
        .select('id')
        .single();
      if (metaErr || !meta) return;

      // 2. Storage-Upload
      const { error: storageErr } = await supabase.storage.from('documents').upload(filePath, file);

      // 3. Rollback bei Fehler, sonst Status PROCESSING (wartet auf OCR)
      if (storageErr) {
        await supabase.from('documents_meta').delete().eq('id', meta.id);
        return;
      }
      await supabase.from('documents_meta').update({ status: 'PROCESSING' }).eq('id', meta.id);
      setFiles((prev) => ({ ...prev, [role]: { id: meta.id, filename: file.name, status: 'PROCESSING', storage_path: filePath } }));
    },
    [user, applicationId, caseId],
  );

  const handleDelete = useCallback(
    async (role: string) => {
      const doc = files[role];
      if (!doc) return;
      await supabase.from('documents_meta').delete().eq('id', doc.id);
      if (doc.storage_path) {
        await supabase.storage.from('documents').remove([doc.storage_path]);
      }
      setFiles((prev) => {
        const next = { ...prev };
        delete next[role];
        return next;
      });
    },
    [files],
  );

  if (loading) {
    return <div className="h-6 w-6 animate-spin rounded-full border-2 border-brand-600 border-t-transparent" />;
  }

  const requiredDone = SLOTS.filter((s) => s.required).every((s) => files[s.role]);
  const canContinue = requiredDone || bypass;

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {SLOTS.map((slot) => {
          const slotDict = t.slots[slot.role as keyof typeof t.slots];
          return (
            <DocumentSlot
              key={slot.role}
              role={slot.role}
              label={slotDict.label}
              description={slotDict.description}
              required={slot.required}
              document={files[slot.role]}
              onUpload={handleUpload}
              onDelete={handleDelete}
            />
          );
        })}
      </div>

      <label className="flex items-center gap-2 text-sm text-ink-soft">
        <input type="checkbox" checked={bypass} onChange={(e) => setBypass(e.target.checked)} className="accent-brand-600" />
        {t.bypassLabel}
      </label>

      <button
        type="button"
        onClick={onComplete}
        disabled={!canContinue}
        className="w-full rounded-xl bg-brand-600 py-3 font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-50"
      >
        {t.continueBtn}
      </button>
    </div>
  );
}
