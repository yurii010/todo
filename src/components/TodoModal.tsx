import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Priority } from '@/types/todo';

interface TodoModalProps {
    todo: { title: string; text: string; priority?: Priority } | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (title: string, text: string, priority: Priority) => void;
    mode: 'add' | 'edit';
}

export function TodoModal({ todo, isOpen, onClose, onSave, mode }: TodoModalProps) {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [priority, setPriority] = useState<Priority>('medium');

    useEffect(() => {
        if (todo) {
            setTitle(todo.title);
            setText(todo.text);
            setPriority(todo.priority ?? 'medium');
        } else if (mode === 'add') {
            setTitle('');
            setText('');
            setPriority('medium');
        }
    }, [todo, mode]);

    const handleSave = () => {
        if (!title.trim()) return;
        onSave(title, text, priority);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            <div className="relative z-50 w-full max-w-md rounded-xl border bg-card p-6 shadow-lg">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                    {mode === 'add' ? 'Add Todo' : 'Edit Todo'}
                </h2>

                <div className="space-y-4">
                    <div>
                        <Input
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full"
                            autoFocus
                        />
                    </div>

                    <div>
                        <Input
                            placeholder="Description"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="w-full"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                            Priority
                        </label>
                        <div className="flex gap-2">
                            <Button
                                type="button"
                                variant={priority === 'high' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setPriority('high')}
                                className="flex-1 bg-red-500 hover:bg-red-600"
                            >
                                High
                            </Button>
                            <Button
                                type="button"
                                variant={priority === 'medium' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setPriority('medium')}
                                className="flex-1 bg-yellow-500 hover:bg-yellow-600"
                            >
                                Medium
                            </Button>
                            <Button
                                type="button"
                                variant={priority === 'low' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setPriority('low')}
                                className="flex-1 bg-green-500 hover:bg-green-600"
                            >
                                Low
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-2 mt-6">
                    <Button variant="ghost" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave}>{mode === 'add' ? 'Add' : 'Save'}</Button>
                </div>
            </div>
        </div>
    );
}
