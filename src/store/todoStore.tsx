import { create } from 'zustand';
import type { Todo, Priority } from '@/types/todo';

interface TodoState {
    todos: Todo[];
    dailyGoal: number;
    addTodo: (id: string, title: string, text: string, priority?: Priority) => void;
    removeTodo: (id: string) => void;
    editTodo: (id: string, title: string, text: string, priority?: Priority) => void;
    toggleTodo: (id: string) => void;
    setTodos: (todos: Todo[]) => void;
    setDailyGoal: (goal: number) => void;
}

const useTodoStore = create<TodoState>((set) => ({
    todos: [],
    dailyGoal: 3,

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
                todo.id === id ? { ...todo, title, text, priority: priority ?? todo.priority } : todo
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
        })),

    setTodos: (todos) => set({ todos }),

    setDailyGoal: (goal) => set({ dailyGoal: goal })
}));

export default useTodoStore;
export const selectTodos = (state: TodoState) => state.todos;
