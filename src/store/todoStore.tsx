import { create } from 'zustand';
import type { TodoState } from '@/types';

const useTodoStore = create<TodoState>((set) => ({
    todos: [],
    setTodos: (todos) => set({ todos }),

    addTodo: (id, title, text, priority = 'medium') =>
        set((state) => ({
            todos: [
                ...state.todos,
                {
                    id,
                    title,
                    text,
                    isCompleted: false,
                    createdAt: Date.now(),
                    priority
                }
            ]
        })),

    removeTodo: (id) =>
        set((state) => ({
            todos: state.todos.filter((todo) => todo.id !== id)
        })),

    editTodo: (id, title, text, priority) =>
        set((state) => ({
            todos: state.todos.map((todo) =>
                todo.id === id
                    ? {
                          ...todo,
                          title,
                          text,
                          priority: priority ?? todo.priority
                      }
                    : todo
            )
        })),

    toggleTodo: (id) =>
        set((state) => ({
            todos: state.todos.map((todo) =>
                todo.id === id
                    ? {
                          ...todo,
                          isCompleted: !todo.isCompleted,
                          completedAt: !todo.isCompleted ? Date.now() : null
                      }
                    : todo
            )
        }))
}));

export default useTodoStore;
export const selectTodos = (state: TodoState) => state.todos;
