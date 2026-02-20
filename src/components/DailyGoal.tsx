import { useState } from 'react';
import { Settings2, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GoalSettingsModal } from './GoalSettingsModal';

interface DailyGoalProps {
    completedToday: number;
    dailyGoal: number;
    progress: number;
    isGoalReached: boolean;
    onSetGoal: (goal: number) => void;
}

export function DailyGoal({
    completedToday,
    dailyGoal,
    progress,
    isGoalReached,
    onSetGoal
}: DailyGoalProps) {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    return (
        <>
            <div className="rounded-lg border bg-card p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        {isGoalReached ? (
                            <Trophy className="h-5 w-5 text-yellow-500" />
                        ) : (
                            <div className="h-5 w-5" />
                        )}
                        <h3 className="font-semibold text-foreground">
                            {isGoalReached
                                ? '🎉 Goal reached!'
                                : `Today's Goal: ${completedToday}/${dailyGoal}`}
                        </h3>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsSettingsOpen(true)}
                        className="h-8 w-8"
                    >
                        <Settings2 className="h-4 w-4" />
                    </Button>
                </div>

                <div className="relative h-3 w-full overflow-hidden rounded-full bg-muted">
                    <div
                        className={`absolute left-0 top-0 h-full transition-all duration-500 ${
                            isGoalReached
                                ? 'bg-gradient-to-r from-yellow-400 to-yellow-500'
                                : 'bg-gradient-to-r from-blue-500 to-blue-600'
                        }`}
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <p className="mt-2 text-xs text-muted-foreground">
                    {isGoalReached
                        ? "Amazing! You've completed all your tasks for today!"
                        : `${dailyGoal - completedToday} more to go`}
                </p>
            </div>

            <GoalSettingsModal
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
                currentGoal={dailyGoal}
                onSave={onSetGoal}
            />
        </>
    );
}
