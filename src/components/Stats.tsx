import type { StatsProps } from '@/types';

export function Stats({ completed, active, productivity }: StatsProps) {
    return (
        <div className="rounded-lg border bg-card p-4 shadow-sm">
            <div className="flex items-center justify-between gap-4">
                <div className="flex-1 text-center">
                    <p className="text-2xl font-bold text-green-500">
                        {completed}
                    </p>
                    <p className="text-xs text-muted-foreground">Completed</p>
                </div>
                <div className="h-8 w-px bg-border" />
                <div className="flex-1 text-center">
                    <p className="text-2xl font-bold text-blue-500">{active}</p>
                    <p className="text-xs text-muted-foreground">Active</p>
                </div>
                <div className="h-8 w-px bg-border" />
                <div className="flex-1 text-center">
                    <p
                        className={`text-2xl font-bold ${productivity >= 80 ? 'text-green-500' : productivity >= 50 ? 'text-yellow-500' : 'text-red-500'}`}
                    >
                        {productivity}%
                    </p>
                    <p className="text-xs text-muted-foreground">
                        Productivity
                    </p>
                </div>
            </div>
        </div>
    );
}
