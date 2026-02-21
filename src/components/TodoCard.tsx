import { useState } from 'react';
import type { TodoCardProps } from '@/types';
import { Button } from '@/components/ui/button';
import { Trash2, Edit, Check, Circle } from 'lucide-react';
import { priorityColors, priorityBadges } from '@/constants';

export function TodoCard({ todo, onDelete, onEdit, onToggle }: TodoCardProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        setTimeout(() => {
            onDelete(todo.id);
        }, 200);
    };

    return (
        <div
            className={`rounded-lg border bg-card text-card-foreground p-4 shadow-sm hover:shadow-md transition-all border-l-4 ${priorityColors[todo.priority]} ${isDeleting ? 'animate-slide-out' : 'animate-slide-in'}`}
        >
            <div className="flex items-start justify-between gap-3">
                <div className="flex-1 space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onToggle(todo.id)}
                            className="h-6 w-6 shrink-0"
                        >
                            {todo.isCompleted ? (
                                <Check className="h-4 w-4 text-green-500" />
                            ) : (
                                <Circle className="h-4 w-4 text-muted-foreground" />
                            )}
                        </Button>
                        <p
                            className={`font-semibold truncate ${todo.isCompleted ? 'line-through text-muted-foreground' : 'text-foreground'}`}
                        >
                            {todo.title}
                        </p>
                        <span
                            className={`text-xs px-2 py-0.5 rounded-full ${priorityBadges[todo.priority]}`}
                        >
                            {todo.priority}
                        </span>
                    </div>
                    <p
                        className={`text-sm break-words ml-8 ${todo.isCompleted ? 'line-through text-muted-foreground' : 'text-muted-foreground'}`}
                    >
                        {todo.text}
                    </p>
                </div>
                <div className="flex gap-1 shrink-0">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(todo)}
                    >
                        <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={handleDelete}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
