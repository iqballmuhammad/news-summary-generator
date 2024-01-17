import {
  SEATALK_EVENT,
  RESPONSE_TYPE,
  INTERACTIVE_EVENT_VALUE
} from '@/lib/types';
import { NextResponse } from 'next/server';
import { pun } from './pun';
import { getAppAccessToken, sendMessage, sendMessageCard } from '@/lib/service';
import { sleep } from '@/lib/utils';

export async function POST(req: Request) {
  const res = (await req.json()) as RESPONSE_TYPE;
  const { event_type, event } = res;
  const appToken = await getAppAccessToken();
  if (event_type) {
    switch (event_type) {
      case SEATALK_EVENT.INTERACTIVE_MESSAGE_CLICK:
        try {
          await handleInteractiveMessage(
            event.employee_code,
            event.value,
            appToken
          );
          return NextResponse.json({ status: 'success' });
        } catch (error) {
          return NextResponse.json({ error });
        }

      case SEATALK_EVENT.MESSAGE_RECEIVED:
        await sendMessageCard(event.employee_code, appToken);
        return NextResponse.json({ status: 'success' });

      case SEATALK_EVENT.VERIFICATION:
        const {
          event: { seatalk_challenge }
        } = res;
        return NextResponse.json({ seatalk_challenge });
      default:
        return NextResponse.json({ status: 'invalid event type' });
    }
  }
  return NextResponse.json({ error: 'unknown error' });
}

async function handleInteractiveMessage(
  employeeCode: string,
  eventValue: string,
  appToken: string
) {
  if (eventValue === INTERACTIVE_EVENT_VALUE.NO) {
    const punMessage = pun.items[Math.floor(Math.random() * pun.items.length)];
    await sendMessage(
      `Here is a pun for you: <br /> **${punMessage}**`,
      employeeCode,
      appToken
    );
    await sleep(1000);
    await sendMessageCard(employeeCode, appToken);
  } else {
    await sendMessage('Have a good day!', employeeCode, appToken);
  }
}
