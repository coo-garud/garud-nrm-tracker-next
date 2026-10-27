import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwIjZ325AfuEmexBGAA_jKF3PEFxeYMWaT0lvGTQqntCGoJPSjArGNF7fwuxyhHznqHqQ/exec';
    const TOKEN = 'nrm_tracker_sk_2024_aB7xK9mL3pQ8vW5zN2jD6fH4tR1cY';

    const response = await fetch(`${APPS_SCRIPT_URL}?token=${encodeURIComponent(TOKEN)}`);
    const data = await response.json();

    if (!response.ok || data.error) {
      return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
