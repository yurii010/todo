import { create } from 'zustand';

export type Todo = {
    id: string;
    title: string;
    text: string;
    isCompleted: boolean;
    createdAt: number;
    completedAt?: number | null;
};

interface TodoState {
    todos: Todo[];
    addTodo: (id: string, title: string, text: string) => void;
    removeTodo: (id: string) => void;
    editTodo: (id: string, title: string, text: string) => void;
    toggleTodo: (id: string) => void;
    setTodos: (todos: Todo[]) => void;
}

const useTodoStore = create<TodoState>((set) => ({
    todos: [],

    addTodo: (id, title, text) =>
        set((state) => ({
            todos: [
                ...state.todos,
                {
                    id,
                    title,
                    text,
                    isCompleted: false,
                    createdAt: Date.now()
                }
            ]
        })),

    removeTodo: (id) =>
        set((state) => ({
            todos: state.todos.filter((todo) => todo.id !== id)
        })),

    editTodo: (id, title, text) =>
        set((state) => ({
            todos: state.todos.map((todo) => (todo.id === id ? { ...todo, title, text } : todo))
        })),

    toggleTodo: (id) =>
        set((state) => ({
            todos: state.todos.map((todo) =>
                todo.id === id
                    ? { ...todo, isCompleted: !todo.isCompleted, completedAt: !todo.isCompleted ? Date.now() : null }
                    : todo
            )
        })),

    setTodos: (todos) => set({ todos })
}));

export default useTodoStore;
export const selectTodos = (state: TodoState) => state.todos;
