import { useEffect, useState } from 'react';
import useTodoStore, { selectTodos } from '../store/todoStore';
import useDailyGoalStore from '@/features/daily-goals/store/dailyGoalStore';
import { useTodoActions } from './useTodoActions';
import { useTodoFilters } from './useTodoFilters';
import { useTodoStats } from './useTodoStats';
import { useTodoModal } from './useTodoModal';

export const useTodos = () => {
    const todos = useTodoStore(selectTodos);
    const { dailyGoal, setDailyGoal } = useDailyGoalStore();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { loadTodos, addNewTodo, deleteTodo, updateTodo, toggleComplete } = useTodoActions();

    const {
        filter,
        searchQuery,
        priorityFilter,
        filteredTodos,
        setFilter,
        setSearchQuery,
        setPriorityFilter
    } = useTodoFilters({ todos });

    const { stats, dailyProgress } = useTodoStats({ todos, dailyGoal });

    const { modalMode, editingTodo, openAddModal, openEditModal, closeModal } = useTodoModal();

    useEffect(() => {
        const getTodos = async () => {
            setIsLoading(true);
            setError(null);
            try {
                await loadTodos();
            } catch (err) {
                console.error('Failed to fetch todos:', err);
                setError(err instanceof Error ? err.message : 'Failed to load todos');
            } finally {
                setIsLoading(false);
            }
        };
        getTodos();
    }, [loadTodos]);

    return {
        todos: filteredTodos,
        stats,
        error,
        filter,
        isLoading,
        modalMode,
        editingTodo,
        searchQuery,
        dailyProgress,
        priorityFilter,
        setFilter,
        addNewTodo,
        deleteTodo,
        updateTodo,
        closeModal,
        setDailyGoal,
        openAddModal,
        openEditModal,
        toggleComplete,
        setSearchQuery,
        setPriorityFilter
    };
};
