// ============================================================
// API: Supabase Health Check
// GET /api/health/supabase
// ============================================================

import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('cases')
      .select('id')
      .limit(1);

    if (error && error.message !== 'relation "cases" does not exist') {
      return NextResponse.json({
        status: 'error',
        connected: false,
        message: error.message,
      }, { status: 500 });
    }

    return NextResponse.json({
      status: 'ok',
      connected: true,
      message: 'Supabase verbunden',
      hasTables: !error,
    });
  } catch (err: any) {
    return NextResponse.json({
      status: 'error',
      connected: false,
      message: err.message,
    }, { status: 500 });
  }
}
