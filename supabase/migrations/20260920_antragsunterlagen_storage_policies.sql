-- ============================================================
-- Storage-RLS für Bucket `antragsunterlagen` (GS-Anlagen-Uploads)
-- Ohne diese Policies lehnt Storage jeden Upload mit
-- "new row violates row-level security policy" ab.
-- Owner-Regel: erster Pfad-Ordner = auth.uid() (Pfad: userId/caseId/…)
-- (live angewendet via MCP-Migration add_antragsunterlagen_storage_policies)
-- ============================================================

create policy "antragsunterlagen: owner upload"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'antragsunterlagen'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "antragsunterlagen: owner read"
  on storage.objects for select to authenticated
  using (
    bucket_id = 'antragsunterlagen'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "antragsunterlagen: owner update"
  on storage.objects for update to authenticated
  using (
    bucket_id = 'antragsunterlagen'
    and (storage.foldername(name))[1] = auth.uid()::text
  )
  with check (
    bucket_id = 'antragsunterlagen'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "antragsunterlagen: owner delete"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'antragsunterlagen'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
