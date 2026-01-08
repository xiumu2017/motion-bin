export type DestructionMethod = 'burn' | 'crumple' | 'delete';

export interface EmotionRecord {
  id: string;
  content: string;
  method: DestructionMethod;
  timestamp: number;
  quote: string;
}
