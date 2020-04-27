import { Question } from './question';

export interface ItemResponse {
  response_code: number;
  results: [Question];
}
