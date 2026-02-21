import { useMemo } from 'react';
import type { Todo } from '@/types';

interface UseTodoStatsProps {
    todos: Todo[];
    dailyGoal: number;
}

export const useTodoStats = ({ todos, dailyGoal }: UseTodoStatsProps) => {
    const stats = useMemo(() => {
        const completed = todos.filter((t) => t.isCompleted).length;
        const active = todos.filter((t) => !t.isCompleted).length;
        const total = todos.length;
        const productivity =
            total > 0 ? Math.round((completed / total) * 100) : 0;

        return { completed, active, productivity };
    }, [todos]);

    const dailyProgress = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayStart = today.getTime();

        const completedToday = todos.filter((t) => {
            return (
                t.isCompleted && t.completedAt && t.completedAt >= todayStart
            );
        }).length;

        const progress = Math.min((completedToday / dailyGoal) * 100, 100);
        const isGoalReached = completedToday >= dailyGoal;

        return { completedToday, dailyGoal, progress, isGoalReached };
    }, [todos, dailyGoal]);

    return {
        stats,
        dailyProgress
    };
};
