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
  VERIFICATION = 'event_verification'
}

export enum SEATALK_API {
  APP_ACCESS_TOKEN = 'https://openapi.seatalk.io/auth/app_access_token'
}

export interface GetAccessTokenResponseBody {
  code: number;
  app_access_token: string;
  expire: number;
}

export interface VerificationRequestbody {
  event_id: string;
  event_type: SEATALK_EVENT;
  timestamp: number;
  app_id: string;
  event: {
    seatalk_challenge: string;
  };
}
