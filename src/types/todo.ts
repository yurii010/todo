export type Priority = 'high' | 'medium' | 'low';

export type Todo = {
    id: string;
    title: string;
    text: string;
    isCompleted: boolean;
    createdAt: number;
    completedAt?: number | null;
    priority: Priority;
};
