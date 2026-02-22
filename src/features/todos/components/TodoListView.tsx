import { Plus, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TodoCard, TodoModal, Stats } from '@/features/todos';
import { Search, Filter, PriorityFilter } from '@/components/common';
import { useTodos } from '@/features/todos/hooks/useTodos';
import type { Priority } from '@/types';

export function TodoListView() {
    const {
        todos,
        filter,
        setFilter,
        searchQuery,
        setSearchQuery,
        priorityFilter,
        setPriorityFilter,
        modalMode,
        editingTodo,
        isLoading,
        error,
        addNewTodo,
        deleteTodo,
        updateTodo,
        toggleComplete,
        openEditModal,
        openAddModal,
        closeModal,
        stats
    } = useTodos();

    const handleSaveTodo = async (title: string, text: string, priority: Priority) => {
        if (modalMode === 'add') {
            await addNewTodo(title, text, priority);
        } else if (editingTodo) {
            await updateTodo(editingTodo.id, title, text, priority);
        }
        closeModal();
    };

    if (error) {
        return (
            <div className="rounded-xl border bg-card p-8 text-center text-destructive shadow-sm">
                <h2 className="text-lg font-semibold">Something went wrong</h2>
                <p className="text-sm text-muted-foreground mt-1">{error}</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex gap-3">
                <Search
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="Search todos..."
                />
                <Button onClick={openAddModal}>
                    <Plus className="h-4 w-4" />
                    <span className="hidden sm:inline">Add</span>
                </Button>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
                <Filter filter={filter} onChange={setFilter} />
                <PriorityFilter priorityFilter={priorityFilter} onChange={setPriorityFilter} />
            </div>

            <Stats
                completed={stats.completed}
                active={stats.active}
                productivity={stats.productivity}
            />

            <div className="space-y-3">
                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                ) : todos.length === 0 ? (
                    <div className="rounded-xl border bg-card p-8 text-center text-muted-foreground shadow-sm">
                        {searchQuery ? (
                            <p>No todos found matching "{searchQuery}"</p>
                        ) : filter === 'completed' ? (
                            <p>No completed todos yet</p>
                        ) : filter === 'active' ? (
                            <p>No active todos</p>
                        ) : (
                            <p>No todos yet. Add your first task!</p>
                        )}
                    </div>
                ) : (
                    todos.map((todo) => (
                        <TodoCard
                            key={todo.id}
                            todo={todo}
                            onDelete={deleteTodo}
                            onEdit={openEditModal}
                            onToggle={toggleComplete}
                        />
                    ))
                )}
            </div>

            <TodoModal
                todo={editingTodo}
                isOpen={modalMode !== null}
                onClose={closeModal}
                onSave={handleSaveTodo}
                mode={modalMode || 'edit'}
            />
        </div>
    );
}
