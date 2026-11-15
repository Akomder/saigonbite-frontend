export type Tone = 'neutral' | 'green' | 'amber' | 'red' | 'navy';
export type StepState = 'done' | 'current' | 'pending';
export interface FoodItem { id:number; name:string; brand:string; rating?:number; category?:string; photo?:string; }
export interface Option { id:string; title:string; subtitle?:string; }
export interface TimelineStep { label:string; time?:string; state:StepState; }
export interface ChartDatum { label:string; value:number; }
