import { SEATALK_APP_ID, SEATALK_APP_SECRET } from '@/lib/constant';
import { GetAccessTokenResponseBody, SEATALK_API } from '@/lib/types';
import { NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch(SEATALK_API.APP_ACCESS_TOKEN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      app_id: SEATALK_APP_ID,
      app_secret: SEATALK_APP_SECRET
    }),
    cache: 'force-cache',
    next: {
      revalidate: 3600
    }
  });
  const { app_access_token } = (await res.json()) as GetAccessTokenResponseBody;
  if (app_access_token) {
    return NextResponse.json({ app_access_token });
  }
  return NextResponse.json({ app_access_token: '' });
}
