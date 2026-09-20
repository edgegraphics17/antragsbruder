-- ============================================================
-- applications.last_stage: GS-Flow-Stages zulassen.
-- Der alte CHECK (upload/form/summary) ließ jeden
-- Grundsicherungs-Insert scheitern ("check constraint violated")
-- — der GS-Antrag erschien deshalb nie auf dem Dashboard.
-- (live angewendet via MCP-Migration allow_gs_stages_on_applications)
-- ============================================================

alter table public.applications drop constraint applications_last_stage_check;

alter table public.applications add constraint applications_last_stage_check
  check (last_stage = any (array[
    'upload'::text, 'form'::text, 'summary'::text,
    'check'::text, 'angaben'::text, 'ergebnis'::text,
    'formular'::text, 'unterlagen'::text, 'einreichen'::text
  ]));
