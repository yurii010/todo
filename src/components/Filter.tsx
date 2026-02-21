import { Button } from '@/components/ui/button';
import type { FilterProps } from '@/types';

export function Filter({ filter, onChange }: FilterProps) {
    return (
        <div className="flex gap-2">
            <Button
                variant={filter === 'all' ? 'default' : 'ghost'}
                onClick={() => onChange('all')}
                size="sm"
            >
                All
            </Button>
            <Button
                variant={filter === 'active' ? 'default' : 'ghost'}
                onClick={() => onChange('active')}
                size="sm"
            >
                Active
            </Button>
            <Button
                variant={filter === 'completed' ? 'default' : 'ghost'}
                onClick={() => onChange('completed')}
                size="sm"
            >
                Completed
            </Button>
        </div>
    );
}
