import { Button } from '@/components/ui/button';
import type { GoalSettingsModalProps } from '@/types';

export function GoalSettingsModal({
    isOpen,
    onClose,
    currentGoal,
    onSave
}: GoalSettingsModalProps) {
    const handleSave = (goal: number) => {
        onSave(goal);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-sm rounded-lg border bg-background p-6 shadow-lg animate-in fade-in zoom-in duration-200">
                <h3 className="text-lg font-semibold mb-4">Set Daily Goal</h3>

                <p className="text-sm text-muted-foreground mb-4">
                    How many tasks do you want to complete today?
                </p>

                <div className="grid grid-cols-5 gap-2 mb-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((goal) => (
                        <Button
                            key={goal}
                            variant={
                                currentGoal === goal ? 'default' : 'outline'
                            }
                            size="sm"
                            onClick={() => handleSave(goal)}
                            className="aspect-square p-0"
                        >
                            {goal}
                        </Button>
                    ))}
                </div>

                <Button variant="outline" onClick={onClose} className="w-full">
                    Cancel
                </Button>
            </div>
        </div>
    );
}
