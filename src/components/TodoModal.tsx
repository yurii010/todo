import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface TodoModalProps {
    todo: { title: string; text: string } | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (title: string, text: string) => void;
    mode: 'add' | 'edit';
}

export function TodoModal({ todo, isOpen, onClose, onSave, mode }: TodoModalProps) {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');

    useEffect(() => {
        if (todo) {
            setTitle(todo.title);
            setText(todo.text);
        } else if (mode === 'add') {
            setTitle('');
            setText('');
        }
    }, [todo, mode]);

    const handleSave = () => {
        if (!title.trim()) return;
        onSave(title, text);
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
