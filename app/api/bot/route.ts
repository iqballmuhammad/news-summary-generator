import { SEATALK_APP_ID, SEATALK_APP_SECRET } from '@/lib/constant';
import { getImage } from '@/lib/getImage';
import {
  SEATALK_EVENT,
  RESPONSE_TYPE,
  GetAccessTokenResponseBody,
  SEATALK_API
} from '@/lib/types';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const res = (await req.json()) as RESPONSE_TYPE;
  const { event_type, event } = res;
  const appToken = await getAppAccessToken();
  if (event_type) {
    switch (event_type) {
      case SEATALK_EVENT.INTERACTIVE_MESSAGE_CLICK:
        await sendRandomPunImage(event.employee_code, appToken);
        return NextResponse.json({ data: 'success' });

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
  await fetch(SEATALK_API.SEND_SERVICE_NOTICE, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${appToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      tag: 'interactive_message',
      interactive_message: {
        default: {
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
                value: 'pun'
              }
            },
            {
              element_type: 'button',
              button: {
                button_type: 'callback',
                text: 'Yes, but try to make me laugh anyway',
                value: 'pun'
              }
            }
          ]
        }
      },
      employee_codes: [employeeCode]
    })
  });
}

async function sendRandomPunImage(employeeCode: string, appToken: string) {
  const image = getImage();
  await fetch(SEATALK_API.SEND_SERVICE_NOTICE, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${appToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      employee_code: employeeCode,
      message: {
        tag: 'image',
        image: {
          content: image
        }
      }
    })
  });
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
