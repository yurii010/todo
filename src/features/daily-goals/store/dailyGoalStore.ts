import { create } from 'zustand';
import type { DailyGoalState } from '@/types';

const useDailyGoalStore = create<DailyGoalState>((set) => ({
    dailyGoal: 3,
    setDailyGoal: (goal) => set({ dailyGoal: goal })
}));

export default useDailyGoalStore;
