import type { SearchProps } from '@/types';
import { Input } from '@/components/ui/input';
import { Search as SearchIcon } from 'lucide-react';

export function Search({ value, onChange, placeholder = 'Search todos...' }: SearchProps) {
    return (
        <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="pl-10 w-full"
            />
        </div>
    );
}
