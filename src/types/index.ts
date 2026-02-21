export type Priority = 'high' | 'medium' | 'low';
export type FilterType = 'all' | 'active' | 'completed';

export type Todo = {
    id: string;
    title: string;
    text: string;
    isCompleted: boolean;
    createdAt: number;
    completedAt?: number | null;
    priority: Priority;
};

export interface FilterProps {
    filter: FilterType;
    onChange: (filter: FilterType) => void;
}

export interface TodoCardProps {
    todo: Todo;
    onDelete: (id: string) => void;
    onEdit: (todo: Todo) => void;
    onToggle: (id: string) => void;
}

export interface DailyGoalProps {
    completedToday: number;
    dailyGoal: number;
    progress: number;
    isGoalReached: boolean;
    onSetGoal: (goal: number) => void;
}

export interface GoalSettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentGoal: number;
    onSave: (goal: number) => void;
}

export interface PriorityFilterProps {
    priorityFilter: Priority | 'all';
    onChange: (priority: Priority | 'all') => void;
}

export interface SearchProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export interface StatsProps {
    completed: number;
    active: number;
    productivity: number;
}

export interface TodoModalProps {
    todo: { title: string; text: string; priority?: Priority } | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (title: string, text: string, priority: Priority) => void;
    mode: 'add' | 'edit';
}

export interface DailyGoalState {
    dailyGoal: number;
    setDailyGoal: (goal: number) => void;
}

export interface TodoState {
    todos: Todo[];
    setTodos: (todos: Todo[]) => void;
    addTodo: (
        id: string,
        title: string,
        text: string,
        priority?: Priority
    ) => void;
    removeTodo: (id: string) => void;
    editTodo: (
        id: string,
        title: string,
        text: string,
        priority?: Priority
    ) => void;
    toggleTodo: (id: string) => void;
}
