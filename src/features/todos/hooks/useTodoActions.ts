import useTodoStore, { selectTodos } from '../store/todoStore';
import type { Priority } from '@/types';
import {
    fetchTodosFromDb,
    createTodoInDb,
    updateTodoInDb,
    deleteTodoFromDb
} from '@/services/firebase';

export const useTodoActions = () => {
    const { setTodos, addTodo, removeTodo, editTodo, toggleTodo } =
        useTodoStore();
    const todos = useTodoStore(selectTodos);

    const loadTodos = async () => {
        const fetchedTodos = await fetchTodosFromDb();
        setTodos(fetchedTodos);
    };

    const addNewTodo = async (
        title: string,
        text: string,
        priority: Priority = 'medium'
    ) => {
        if (!title.trim()) return;
        const id = await createTodoInDb(title, text, priority);
        addTodo(id, title, text, priority);
    };

    const deleteTodo = async (id: string) => {
        await deleteTodoFromDb(id);
        removeTodo(id);
    };

    const updateTodo = async (
        id: string,
        title: string,
        text: string,
        priority: Priority
    ) => {
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

    return {
        loadTodos,
        addNewTodo,
        deleteTodo,
        updateTodo,
        toggleComplete
    };
};
