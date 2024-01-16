import { ISeatalkRequestBody } from '@/lib/types';

export async function POST(req: Request) {
  const res = await req.json();
  console.log(res);
  const {
    event: { seatalk_challenge }
  } = res as ISeatalkRequestBody;
  return Response.json({ seatalk_challenge });
}
