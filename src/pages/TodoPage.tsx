import type { Priority } from '@/types';
import { Stats } from '@/components/Stats';
import { useTodos } from '@/hooks/useTodos';
import { Loader2, Plus } from 'lucide-react';
import { Search } from '@/components/Search';
import { Filter } from '@/components/Filter';
import { Button } from '@/components/ui/button';
import { TodoCard } from '@/components/TodoCard';
import { TodoModal } from '@/components/TodoModal';
import { DailyGoal } from '@/components/DailyGoal';
import { PriorityFilter } from '@/components/PriorityFilter';

export function TodoPage() {
    const {
        todos,
        stats,
        error,
        filter,
        isLoading,
        modalMode,
        editingTodo,
        searchQuery,
        dailyProgress,
        priorityFilter,
        setFilter,
        closeModal,
        addNewTodo,
        deleteTodo,
        updateTodo,
        openAddModal,
        setDailyGoal,
        openEditModal,
        setSearchQuery,
        toggleComplete,
        setPriorityFilter
    } = useTodos();

    const handleSaveTodo = async (
        title: string,
        text: string,
        priority: Priority
    ) => {
        if (modalMode === 'add') {
            await addNewTodo(title, text, priority);
        } else if (editingTodo) {
            await updateTodo(editingTodo.id, title, text, priority);
        }
        closeModal();
    };

    if (error) {
        return (
            <div className="min-h-screen bg-background py-6 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl">
                    <h1 className="text-2xl font-bold text-destructive text-center">
                        Something went wrong
                    </h1>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background py-6 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Todo App
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Manage your tasks efficiently
                    </p>
                </div>

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

                <Filter filter={filter} onChange={setFilter} />

                <PriorityFilter
                    priorityFilter={priorityFilter}
                    onChange={setPriorityFilter}
                />

                <DailyGoal
                    completedToday={dailyProgress.completedToday}
                    dailyGoal={dailyProgress.dailyGoal}
                    progress={dailyProgress.progress}
                    isGoalReached={dailyProgress.isGoalReached}
                    onSetGoal={setDailyGoal}
                />

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
