import type { ComponentType } from 'react';

export type Tone = 'neutral' | 'green' | 'amber' | 'red' | 'navy';

export type StepState = 'done' | 'current' | 'pending';

export interface FoodItem {
  id: string;
  name: string;
  brand: string;
  rating: number;
  category: string;
  photo?: string;
}

export interface Hub {
  id: string;
  name: string;
  distanceKm: number;
  eta: string;
  status: 'Busy' | 'Quiet' | 'Full';
  tone: Tone;
  brands: string;
  closed?: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  brand: string;
  price: number;
  available: boolean;
  category: string;
}

export interface Option {
  id: string;
  title: string;
  subtitle?: string;
}

export interface TimelineStep {
  label: string;
  time?: string;
  state: StepState;
}

export interface Voucher {
  code: string;
  rule: string;
  period: string;
  status: 'Active' | 'Expired';
  tone: Tone;
}

export interface ChartDatum {
  label: string;
  value: number;
}

export interface ScreenDefinition {
  id: string;
  title: string;
  component: ComponentType;
}

export interface ScreenGroup {
  id: 'customer' | 'restaurant';
  title: string;
  subtitle: string;
  screens: ScreenDefinition[];
}
