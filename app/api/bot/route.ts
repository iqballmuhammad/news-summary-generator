import { SEATALK_APP_ID, SEATALK_APP_SECRET } from '@/lib/constant';
import {
  SEATALK_EVENT,
  RESPONSE_TYPE,
  GetAccessTokenResponseBody,
  SEATALK_API,
  INTERACTIVE_EVENT_VALUE
} from '@/lib/types';
import { NextResponse } from 'next/server';
import { pun } from './pun';

export async function POST(req: Request) {
  const res = (await req.json()) as RESPONSE_TYPE;
  const { event_type, event } = res;
  const appToken = await getAppAccessToken();
  if (event_type) {
    switch (event_type) {
      case SEATALK_EVENT.INTERACTIVE_MESSAGE_CLICK:
        if (event.value === INTERACTIVE_EVENT_VALUE.NO) {
          const punMessage =
            pun.items[Math.floor(Math.random() * pun.items.length)];
          await sendMessage(punMessage, event.employee_code, appToken);
          sleep(1000);
          await sendMessageCard(event.employee_code, appToken);
          return NextResponse.json({ data: 'success' });
        } else {
          await sendMessage('Have a good day!', event.employee_code, appToken);
          return NextResponse.json({ data: 'success' });
        }

      case SEATALK_EVENT.MESSAGE_RECEIVED:
        await sendMessageCard(event.employee_code, appToken);
        return NextResponse.json({ data: 'success' });

      case SEATALK_EVENT.VERIFICATION:
        const {
          event: { seatalk_challenge }
        } = res;
        return NextResponse.json({ seatalk_challenge });
      default:
        return NextResponse.json({ error: 'invalid event type' });
    }
  }
  return NextResponse.json({ error: 'unknown error' });
}

async function sendMessageCard(employeeCode: string, appToken: string) {
  const res = await fetch(SEATALK_API.SEND_SINGLE_CHAT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${appToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      employee_code: employeeCode.toString(),
      message: {
        tag: 'interactive_message',
        interactive_message: {
          elements: [
            {
              element_type: 'title',
              title: {
                text: 'Are you happy?'
              }
            },
            {
              element_type: 'description',
              description: {
                text: 'Have you laugh today?'
              }
            },
            {
              element_type: 'button',
              button: {
                button_type: 'callback',
                text: 'Not yet',
                value: 'no'
              }
            },
            {
              element_type: 'button',
              button: {
                button_type: 'callback',
                text: 'Yes',
                value: 'yes'
              }
            }
          ]
        }
      }
    })
  });
  const data = await res.json();
  console.log(data);
}

async function sendMessage(
  message: string,
  employeeCode: string,
  appToken: string
) {
  const res = await fetch(SEATALK_API.SEND_SINGLE_CHAT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${appToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      employee_code: employeeCode,
      message: {
        tag: 'text',
        text: {
          format: 1,
          content: message
        }
      }
    })
  });
  const data = await res.json();
  console.log(data);
}

async function getAppAccessToken() {
  const res = await fetch(SEATALK_API.APP_ACCESS_TOKEN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      app_id: SEATALK_APP_ID,
      app_secret: SEATALK_APP_SECRET
    }),
    next: {
      revalidate: 3600
    }
  });
  const { app_access_token } = (await res.json()) as GetAccessTokenResponseBody;
  return app_access_token || '';
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
