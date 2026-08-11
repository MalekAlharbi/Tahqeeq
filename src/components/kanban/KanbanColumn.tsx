import type { Category, Task } from "../../types/api";
import { Droppable } from "@hello-pangea/dnd";
import { MoreVertical, Pencil, Plus, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { KanbanTaskCard } from "./KanbanTaskCard";

interface KanbanColumnProps {
    category: Category;
    onOpenAddTask: (categoryId: number) => void;
    onOpenEditCategory: (category: Category) => void;
    onOpenDeleteCategory: (category: Category) => void;
    onToggleTaskComplete: (task: Task) => void;
    onOpenEditTask: (task: Task) => void;
    onOpenDeleteTask: (task: Task) => void;
}

export const KanbanColumn = ({
    category,
    onOpenAddTask,
    onOpenEditCategory,
    onOpenDeleteCategory,
    onToggleTaskComplete,
    onOpenEditTask,
    onOpenDeleteTask,
}: KanbanColumnProps) => {
    const { t } = useTranslation();

    return (
        <Droppable droppableId={category.id.toString()} key={category.id}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`flex flex-col gap-3 min-w-72.5 w-72 p-4 rounded-2xl border bg-ui-surfaceContainer border-ui-outline/60 shadow-sm transition-all ${
                        snapshot.isDraggingOver
                            ? "ring-2 ring-ui-primary/50 bg-ui-primary/5 shadow-md"
                            : ""
                    }`}
                >
                    {/* Category Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-ui-outline/40">
                        <div className="flex items-center gap-2">
                            <h3 className="font-bold text-ui-primaryText text-base tracking-wide">
                                {category.title}
                            </h3>
                            <span className="bg-ui-outline/20 text-ui-secondaryText text-xs font-semibold px-2 py-0.5 rounded-full">
                                {category.tasks?.length || 0}
                            </span>
                        </div>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => onOpenAddTask(category.id)}
                                type="button"
                                className="p-1 rounded-lg hover:bg-ui-outline/20 text-ui-secondaryText hover:text-ui-primaryText transition-colors cursor-pointer"
                                title={t("Add New Task")}
                            >
                                <Plus size={18} />
                            </button>

                            {/* Category Three Dots Menu */}
                            <details className="relative group">
                                <summary className="list-none cursor-pointer p-1 rounded-lg hover:bg-ui-outline/20 text-ui-secondaryText hover:text-ui-primaryText focus:outline-none select-none transition-colors">
                                    <MoreVertical size={16} />
                                </summary>
                                <div className="flex flex-col bg-ui-surfaceContainer border border-ui-outline/60 shadow-lg absolute right-0 top-full mt-1 p-1 rounded-xl z-20 min-w-32.5">
                                    <button
                                        disabled
                                        onClick={(e) => {
                                            e.currentTarget.closest("details")?.removeAttribute("open");
                                            onOpenEditCategory(category);
                                        }}
                                        type="button"
                                        className="cursor-not-allowed text-ui-primaryText hover:bg-ui-outline/20 p-2 rounded-lg flex gap-2 items-center text-xs font-medium w-full text-start"
                                    >
                                        <Pencil size={14} /> {t("Edit")}
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.currentTarget.closest("details")?.removeAttribute("open");
                                            onOpenDeleteCategory(category);
                                        }}
                                        type="button"
                                        className="text-ui-error hover:bg-ui-error/20 p-2 rounded-lg flex gap-2 items-center text-xs font-medium cursor-pointer w-full text-start"
                                    >
                                        <Trash2 size={14} /> {t("Delete")}
                                    </button>
                                </div>
                                <div
                                    className="fixed inset-0 z-10 cursor-default"
                                    onClick={(e) => e.currentTarget.parentElement?.removeAttribute("open")}
                                />
                            </details>
                        </div>
                    </div>

                    {/* Task Cards List */}
                    <div className="flex flex-col gap-2.5 min-h-40 pt-1">
                        {category.tasks && category.tasks.length > 0 ? (
                            category.tasks.map((task, index) => (
                                <KanbanTaskCard
                                    key={task.id}
                                    task={task}
                                    index={index}
                                    onToggleComplete={onToggleTaskComplete}
                                    onEdit={onOpenEditTask}
                                    onDelete={onOpenDeleteTask}
                                />
                            ))
                        ) : (
                            <div className="text-sm text-ui-secondaryText/60 italic text-center py-8 border-2 border-dashed border-ui-outline/30 rounded-xl flex items-center justify-center">
                                {t("No tasks")}
                            </div>
                        )}
                        {provided.placeholder}
                    </div>
                </div>
            )}
        </Droppable>
    );
};
