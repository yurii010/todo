import { useMemo, useState } from 'react';
import type { Todo } from '@/store/todoStore';

export const useSearch = (items: Todo[]) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredItems = useMemo(() => {
        if (!searchQuery.trim()) return items;
        const query = searchQuery.toLowerCase();
        return items.filter(
            (item) =>
                item.title.toLowerCase().includes(query) || item.text.toLowerCase().includes(query)
        );
    }, [items, searchQuery]);

    return {
        searchQuery,
        setSearchQuery,
        filteredItems
    };
};
