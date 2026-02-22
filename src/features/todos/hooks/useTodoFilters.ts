import { useMemo, useState } from 'react';
import type { Todo, Priority, FilterType } from '@/types';

interface UseTodoFiltersProps {
    todos: Todo[];
}

export const useTodoFilters = ({ todos }: UseTodoFiltersProps) => {
    const [filter, setFilter] = useState<FilterType>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [priorityFilter, setPriorityFilter] = useState<Priority | 'all'>('all');

    const filteredTodos = useMemo(() => {
        return todos.filter((todo) => {
            if (filter === 'active' && todo.isCompleted) return false;
            if (filter === 'completed' && !todo.isCompleted) return false;
            if (priorityFilter !== 'all' && todo.priority !== priorityFilter) return false;

            if (searchQuery.trim()) {
                const query = searchQuery.toLowerCase();
                const matchesTitle = todo.title.toLowerCase().includes(query);
                const matchesText = todo.text.toLowerCase().includes(query);
                if (!matchesTitle && !matchesText) return false;
            }

            return true;
        });
    }, [todos, filter, searchQuery, priorityFilter]);

    return {
        filter,
        searchQuery,
        priorityFilter,
        filteredTodos,
        setFilter,
        setSearchQuery,
        setPriorityFilter
    };
};
