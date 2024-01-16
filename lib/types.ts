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

export interface ISeatalkRequestBody {
  event_id: string;
  event_type: 'event_verification';
  timestamp: number;
  app_id: string;
  event: {
    seatalk_challenge: string;
  };
}
