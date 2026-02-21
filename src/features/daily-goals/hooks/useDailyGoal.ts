import { useMemo } from 'react';
import useDailyGoalStore from '../store/dailyGoalStore';
import useTodoStore, { selectTodos } from '@/features/todos/store/todoStore';

export const useDailyGoal = () => {
    const { dailyGoal, setDailyGoal } = useDailyGoalStore();
    const todos = useTodoStore(selectTodos);

    const dailyProgress = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayStart = today.getTime();

        const completedToday = todos.filter((t) => {
            return t.isCompleted && t.completedAt && t.completedAt >= todayStart;
        }).length;

        const progress = Math.min((completedToday / dailyGoal) * 100, 100);
        const isGoalReached = completedToday >= dailyGoal;

        return { completedToday, dailyGoal, progress, isGoalReached };
    }, [todos, dailyGoal]);

    return { dailyGoal, setDailyGoal, dailyProgress };
};
