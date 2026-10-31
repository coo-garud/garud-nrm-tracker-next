import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzm_tj_J-4HMKE7MxRP_4FLcshAMsQkRUtlSU9jrl0Eb-lhXdpfRCvg6eQbmX-k-teZxw/exec';
    const TOKEN = 'nrm_tracker_sk_2024_aB7xK9mL3pQ8vW5zN2jD6fH4tR1cY';

    const response = await fetch(`${APPS_SCRIPT_URL}?token=${encodeURIComponent(TOKEN)}`, {
      method: 'POST',
      body: JSON.stringify(body)
    });

    const data = await response.json();

    if (!response.ok || data.error) {
      return NextResponse.json({ error: data.error || 'Failed to save data' }, { status: 500 });
    }

    return NextResponse.json({ success: true, saved: data.saved ?? null, skipped: data.skipped ?? null });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
