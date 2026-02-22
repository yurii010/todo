import type { Priority, PriorityFilterProps } from '@/types';
import { Button } from '@/components/ui/button';

export function PriorityFilter({ priorityFilter, onChange }: PriorityFilterProps) {
    const buttons: { value: Priority | 'all'; label: string; variant: string }[] = [
        { value: 'all', label: 'All', variant: 'secondary' },
        { value: 'high', label: 'High', variant: 'priorityHigh' },
        { value: 'medium', label: 'Medium', variant: 'priorityMedium' },
        { value: 'low', label: 'Low', variant: 'priorityLow' }
    ];

    return (
        <div className="flex gap-2">
            {buttons.map((btn) => (
                <Button
                    key={btn.value}
                    variant={priorityFilter === btn.value ? (btn.variant as any) : 'ghost'}
                    size="sm"
                    onClick={() => onChange(btn.value)}
                >
                    {btn.label}
                </Button>
            ))}
        </div>
    );
}
