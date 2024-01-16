import { FormEvent, SetStateAction } from 'react';

import { ChatRequestOptions } from 'ai';

export interface SummaryMessageRequest {
  category: string;
  sourceName: string;
  sourceUrl: string;
  content: string;
}

export type PageStatus =
  | 'input'
  | 'loading'
  | 'completed-url'
  | 'completed-upload'
  | 'error';

export interface FormUrlProps {
  setStatus: (status: PageStatus) => void;
  handleInputChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  handleSubmit: (
    e: FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions | undefined
  ) => void;
  input: string;
}

export interface FormUploadProps {
  handleUpload: (e: React.FormEvent<HTMLFormElement>) => void;
  setFile: (value: SetStateAction<File | undefined>) => void;
}

export enum SEATALK_EVENT {
  MESSAGE_RECEIVED = 'message_from_bot_subscriber',
  VERIFICATION = 'event_verification',
  INTERACTIVE_MESSAGE_CLICK = 'interactive_message_click'
}

export enum SEATALK_API {
  APP_ACCESS_TOKEN = 'https://openapi.seatalk.io/auth/app_access_token',
  SEND_SINGLE_CHAT = 'https://openapi.seatalk.io/messaging/v2/single_chat',
  SEND_SERVICE_NOTICE = 'https://openapi.seatalk.io/messaging/v2/service_notice/send_message'
}

export interface GetAccessTokenResponseBody {
  code: number;
  app_access_token: string;
  expire: number;
}

export interface InteractiveMessageResponseBody {
  event_id: string;
  event_type: SEATALK_EVENT.INTERACTIVE_MESSAGE_CLICK;
  timestamp: number;
  app_id: number;
  event: {
    message_id: string;
    employee_code: string;
    value: string;
    seatalk_id: string;
  };
}

export interface VerificationResponseBody {
  event_id: string;
  event_type: SEATALK_EVENT.VERIFICATION;
  timestamp: number;
  app_id: string;
  event: {
    seatalk_challenge: string;
  };
}

export type RESPONSE_TYPE =
  | MessageReceivedResponseBody
  | VerificationResponseBody
  | InteractiveMessageResponseBody;

export interface MessageReceivedResponseBody {
  event_id: string;
  event_type: SEATALK_EVENT.MESSAGE_RECEIVED;
  timestamp: number;
  app_id: string;
  event: {
    employee_code: string;
    message: {
      tag: string;
      text: {
        content: string;
      };
    };
  };
}

export interface SingleChatRequestBody {
  employee_code: string;
  message: {
    tag: 'image';
    image: {
      content: string;
    };
  };
}

export interface InteractiveMessageRequestBody {
  employee_code: string;
  message: {
    tag: 'interactive_message';
    interactive_message: {
      elements: InteractiveMessage[];
    };
  };
}

interface InteractiveMessage {
  element_type: 'title' | 'description' | 'button';
  title?: {
    text: string;
  };
  description?: {
    text: string;
  };
  button?: {
    button_type: 'callback';
    text: string;
    value: 'pun';
  };
}
