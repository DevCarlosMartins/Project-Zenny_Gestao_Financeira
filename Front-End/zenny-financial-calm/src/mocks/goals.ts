export interface Goal {
  id: string;
  name: string;
  target: number;
  current: number;
  deadline: string;
  progress: number;
}

export const mockGoals: Goal[] = [
  {
    id: '1',
    name: 'Reserva de emergência',
    target: 30000,
    current: 21000,
    deadline: '2025-12-31',
    progress: 70,
  },
  {
    id: '2',
    name: 'Viagem para Europa',
    target: 15000,
    current: 5250,
    deadline: '2026-06-30',
    progress: 35,
  },
];
