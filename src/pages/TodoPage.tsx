import { DailyGoal, useDailyGoal } from '@/features/daily-goals';
import { TodoListView } from '@/features/todos';

export function TodoPage() {
    const { dailyProgress, dailyGoal, setDailyGoal } = useDailyGoal();

    return (
        <div className="min-h-screen bg-background py-6 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Todo App
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Manage your tasks efficiently
                    </p>
                </div>

                <DailyGoal
                    completedToday={dailyProgress.completedToday}
                    dailyGoal={dailyGoal}
                    progress={dailyProgress.progress}
                    isGoalReached={dailyProgress.isGoalReached}
                    onSetGoal={setDailyGoal}
                />

                <TodoListView />
            </div>
        </div>
    );
}
