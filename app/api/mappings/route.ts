import { auth, currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzm_tj_J-4HMKE7MxRP_4FLcshAMsQkRUtlSU9jrl0Eb-lhXdpfRCvg6eQbmX-k-teZxw/exec';
const TOKEN = 'nrm_tracker_sk_2024_aB7xK9mL3pQ8vW5zN2jD6fH4tR1cY';

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const response = await fetch(`${APPS_SCRIPT_URL}?token=${encodeURIComponent(TOKEN)}&action=mappings`);
    const data = await response.json();

    if (!response.ok || data.error) {
      return NextResponse.json({ error: 'Failed to fetch mappings' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await currentUser();
    const by = user?.primaryEmailAddress?.emailAddress ?? userId;
    const { rows } = await req.json();

    const response = await fetch(`${APPS_SCRIPT_URL}?token=${encodeURIComponent(TOKEN)}`, {
      method: 'POST',
      body: JSON.stringify({ action: 'saveMappings', rows, by })
    });
    const data = await response.json();

    if (!response.ok || data.error) {
      return NextResponse.json({ error: 'Failed to save mappings' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
