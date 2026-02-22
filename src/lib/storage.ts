import { DAILY_GOAL_STORAGE_KEY } from '@/constants';

export const getStoredDailyGoal = (): number | null => {
    const stored = localStorage.getItem(DAILY_GOAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
};

export const setStoredDailyGoal = (goal: number): void => {
    localStorage.setItem(DAILY_GOAL_STORAGE_KEY, JSON.stringify(goal));
};
