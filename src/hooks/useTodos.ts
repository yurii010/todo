import { useEffect, useMemo, useState } from 'react';
import useTodoStore, { selectTodos } from '@/store/todoStore';
import type { Todo, Priority } from '@/types';
import {
    fetchTodosFromDb,
    createTodoInDb,
    updateTodoInDb,
    deleteTodoFromDb
} from '@/services/firebase';

type FilterType = 'all' | 'active' | 'completed';

export const useTodos = () => {
    const { setTodos, addTodo, removeTodo, editTodo, toggleTodo, dailyGoal, setDailyGoal } =
        useTodoStore();
    const todos = useTodoStore(selectTodos);
    const [modalMode, setModalMode] = useState<'add' | 'edit' | null>(null);
    const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<FilterType>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [priorityFilter, setPriorityFilter] = useState<Priority | 'all'>('all');

    useEffect(() => {
        const getTodos = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const fetchedTodos = await fetchTodosFromDb();
                setTodos(fetchedTodos);
            } catch (err) {
                console.error('Failed to fetch todos:', err);
                setError(err instanceof Error ? err.message : 'Failed to load todos');
            } finally {
                setIsLoading(false);
            }
        };
        getTodos();
    }, [setTodos]);

    const addNewTodo = async (title: string, text: string, priority: Priority = 'medium') => {
        if (!title.trim()) return;
        const id = await createTodoInDb(title, text, priority);
        addTodo(id, title, text, priority);
    };

    const deleteTodo = async (id: string) => {
        await deleteTodoFromDb(id);
        removeTodo(id);
    };

    const updateTodo = async (id: string, title: string, text: string, priority: Priority) => {
        await updateTodoInDb(id, { title, text, priority });
        editTodo(id, title, text, priority);
    };

    const toggleComplete = async (id: string) => {
        const todo = todos.find((t) => t.id === id);
        if (!todo) return;

        const isCompleting = !todo.isCompleted;
        await updateTodoInDb(id, {
            isCompleted: isCompleting,
            completedAt: isCompleting ? Date.now() : null
        });
        toggleTodo(id);
    };

    const openAddModal = () => {
        setEditingTodo(null);
        setModalMode('add');
    };

    const openEditModal = (todo: Todo) => {
        setEditingTodo(todo);
        setModalMode('edit');
    };

    const closeModal = () => {
        setEditingTodo(null);
        setModalMode(null);
    };

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

    const stats = useMemo(() => {
        const completed = todos.filter((t) => t.isCompleted).length;
        const active = todos.filter((t) => !t.isCompleted).length;
        const total = todos.length;
        const productivity = total > 0 ? Math.round((completed / total) * 100) : 0;

        return { completed, active, productivity };
    }, [todos]);

    const dailyProgress = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayStart = today.getTime();

        const completedToday = todos.filter((t) => {
            return t.isCompleted && t.completedAt && t.completedAt >= todayStart;
        }).length;

        const progress = Math.min((completedToday / dailyGoal) * 100, 100);
        const isGoalReached = completedToday >= dailyGoal;

        return { completedToday, dailyGoal, progress, isGoalReached };
    }, [todos, dailyGoal]);

    return {
        todos: filteredTodos,
        filter,
        setFilter,
        searchQuery,
        setSearchQuery,
        priorityFilter,
        setPriorityFilter,
        modalMode,
        editingTodo,
        isLoading,
        error,
        addNewTodo,
        deleteTodo,
        updateTodo,
        toggleComplete,
        openEditModal,
        openAddModal,
        closeModal,
        stats,
        dailyProgress,
        setDailyGoal
    };
};
