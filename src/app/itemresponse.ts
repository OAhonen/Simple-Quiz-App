import { Question } from './question';

/**
 * ItemResponse from opentdb.com.
 */
export interface ItemResponse {
  response_code: number;
  results: [Question];
}
