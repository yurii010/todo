import { useState } from 'react';
import type { Todo } from '@/types';

export const useTodoModal = () => {
    const [modalMode, setModalMode] = useState<'add' | 'edit' | null>(null);
    const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

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
        modalMode,
        editingTodo,
        openAddModal,
        openEditModal,
        closeModal
    };
};
