import { create } from 'zustand';
import type { DailyGoalState } from '@/types';
import { getStoredDailyGoal, setStoredDailyGoal } from '@/lib/storage';

const useDailyGoalStore = create<DailyGoalState>((set) => ({
    dailyGoal: getStoredDailyGoal() ?? 3,
    setDailyGoal: (goal) => {
        setStoredDailyGoal(goal);
        set({ dailyGoal: goal });
    }
}));

export default useDailyGoalStore;
