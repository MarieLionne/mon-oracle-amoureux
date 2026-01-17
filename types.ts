
export interface OracleCard {
  id: number;
  name: string;
  category: 'Lumière' | 'Ombre' | 'Chemin' | 'Émotion';
  description: string;
}

export interface Reading {
  card: OracleCard;
  interpretation: string;
  advice: string;
  energy: string;
  timestamp: Date;
}

export interface ShopItem {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
  url: string;
}

export enum AppState {
  LANDING = 'LANDING',
  DECK = 'DECK',
  READING = 'READING',
  HISTORY = 'HISTORY',
  PRICING = 'PRICING',
  SHOP = 'SHOP',
  ADMIN = 'ADMIN'
}
