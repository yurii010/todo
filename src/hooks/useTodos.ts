import { useEffect, useState } from 'react';
import useTodoStore, { selectTodos, type Todo } from '@/store/todoStore';
import {
    fetchTodosFromDb,
    createTodoInDb,
    updateTodoInDb,
    deleteTodoFromDb
} from '@/services/firebase';

export const useTodos = () => {
    const { setTodos, addTodo, removeTodo, editTodo, toggleTodo } = useTodoStore();
    const todos = useTodoStore(selectTodos);
    const [modalMode, setModalMode] = useState<'add' | 'edit' | null>(null);
    const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

    const addNewTodo = async (title: string, text: string) => {
        if (!title.trim()) return;
        const id = await createTodoInDb(title, text);
        addTodo(id, title, text);
    };

    const deleteTodo = async (id: string) => {
        await deleteTodoFromDb(id);
        removeTodo(id);
    };

    const updateTodo = async (id: string, title: string, text: string) => {
        await updateTodoInDb(id, { title, text });
        editTodo(id, title, text);
    };

    const toggleComplete = async (id: string) => {
        const todo = todos.find((t) => t.id === id);
        if (!todo) return;

        await updateTodoInDb(id, {
            isCompleted: !todo.isCompleted
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

    return {
        todos,
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
        closeModal
    };
};
