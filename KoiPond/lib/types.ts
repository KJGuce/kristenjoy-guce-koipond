// lib/types.ts

export interface Alm {
  id: string;
  title: string;
  description: string;
  category: string;
  created_at: string;
  updated_at: string;
}

export interface Act {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
