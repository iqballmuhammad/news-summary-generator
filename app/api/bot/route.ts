import { VerificationRequestbody, SEATALK_EVENT } from '@/lib/types';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const res = await req.json() as VerificationRequestbody;
  console.log(res);
  if (res.event) {
    console.log(res);
    const {
      event: { seatalk_challenge }
    } = res;
    return NextResponse.json({ seatalk_challenge });
  }
  return NextResponse.json({'error': 'event element does not exist'})
}
