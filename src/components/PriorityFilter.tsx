import type { Priority, PriorityFilterProps } from '@/types';

export function PriorityFilter({
    priorityFilter,
    onChange
}: PriorityFilterProps) {
    const buttons: { value: Priority | 'all'; label: string; color: string }[] =
        [
            { value: 'all', label: 'All', color: 'bg-slate-500' },
            { value: 'high', label: 'High', color: 'bg-red-500' },
            { value: 'medium', label: 'Medium', color: 'bg-yellow-500' },
            { value: 'low', label: 'Low', color: 'bg-green-500' }
        ];

    return (
        <div className="flex gap-2">
            {buttons.map((btn) => (
                <button
                    key={btn.value}
                    onClick={() => onChange(btn.value)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                        priorityFilter === btn.value
                            ? `${btn.color} text-white`
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                >
                    {btn.label}
                </button>
            ))}
        </div>
    );
}
