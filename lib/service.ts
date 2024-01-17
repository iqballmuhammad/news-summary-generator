import { SEATALK_APP_ID, SEATALK_APP_SECRET } from './constant';
import { SEATALK_API, GetAccessTokenResponseBody } from './types';

export async function sendMessage(
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

  export async function getAppAccessToken() {
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

  export async function sendMessageCard(employeeCode: string, appToken: string) {
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
  
  
  
  
  
  