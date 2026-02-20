
export interface ChecklistItem {
  id: string;
  label: string;
  category: string;
  completed: boolean;
  notes: string;
  photo?: string; // base64
}

export interface ChecklistForm {
  inspectorName: string;
  date: string;
  location: string;
  items: ChecklistItem[];
  summary?: string;
}

export enum AppState {
  FILLING = 'FILLING',
  SUBMITTING = 'SUBMITTING',
  COMPLETED = 'COMPLETED'
}
