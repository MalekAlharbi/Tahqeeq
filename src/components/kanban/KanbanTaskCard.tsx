import type { Task } from "../../types/api";
import { Check, MoreVertical, Pencil, Trash2, User } from "lucide-react";
import { Draggable } from "@hello-pangea/dnd";
import { useTranslation } from "react-i18next";

interface KanbanTaskCardProps {
    task: Task;
    index: number;
    onToggleComplete: (task: Task) => void;
    onEdit: (task: Task) => void;
    onDelete: (task: Task) => void;
}

export const KanbanTaskCard = ({
    task,
    index,
    onToggleComplete,
    onEdit,
    onDelete,
}: KanbanTaskCardProps) => {
    const { t } = useTranslation();
    const isCompleted = Boolean(task.is_completed);

    return (
        <Draggable draggableId={task.id.toString()} index={index} key={task.id}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`bg-ui-surface text-ui-primaryText border border-ui-outline/60 p-3.5 rounded-xl flex flex-col gap-2 transition-all select-none hover:border-ui-primary/40 ${
                        snapshot.isDragging
                            ? "shadow-xl ring-2 ring-ui-primary border-transparent opacity-95 scale-[1.02] z-50"
                            : "shadow-sm hover:shadow-md"
                    }`}
                >
                    <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2.5 flex-1 min-w-0">
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onToggleComplete(task);
                                }}
                                className={`mt-0.5 shrink-0 w-4.5 h-4.5 rounded border flex items-center justify-center transition-all cursor-pointer ${
                                    isCompleted
                                        ? "bg-ui-primary border-ui-primary text-ui-surface"
                                        : "border-ui-outline hover:border-ui-primary/70 bg-transparent text-transparent"
                                }`}
                                title={isCompleted ? t("Mark incomplete") : t("Mark complete")}
                            >
                                <Check size={12} strokeWidth={3.5} className={isCompleted ? "block" : "hidden"} />
                            </button>

                            <span
                                className={`font-medium text-sm leading-snug wrap-break-word flex-1 transition-all ${
                                    isCompleted
                                        ? "line-through text-ui-secondaryText/60"
                                        : "text-ui-primaryText"
                                }`}
                            >
                                {task.title}
                            </span>
                        </div>

                        {/* Task Three Dots Menu */}
                        <details className="relative group shrink-0">
                            <summary className="list-none cursor-pointer p-1 rounded-md hover:bg-ui-outline/20 text-ui-secondaryText hover:text-ui-primaryText focus:outline-none select-none transition-colors">
                                <MoreVertical size={14} />
                            </summary>
                            <div className="flex flex-col bg-ui-surfaceContainer border border-ui-outline/60 shadow-lg absolute right-0 top-full mt-1 p-1 rounded-xl z-30 min-w-30">
                                <button
                                    onClick={(e) => {
                                        e.currentTarget.closest("details")?.removeAttribute("open");
                                        onEdit(task);
                                    }}
                                    type="button"
                                    className="text-ui-primaryText hover:bg-ui-outline/20 p-1.5 rounded-lg flex gap-2 items-center text-xs font-medium cursor-pointer w-full text-start"
                                >
                                    <Pencil size={13} /> {t("Edit")}
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.currentTarget.closest("details")?.removeAttribute("open");
                                        onDelete(task);
                                    }}
                                    type="button"
                                    className="text-ui-error hover:bg-ui-error/20 p-1.5 rounded-lg flex gap-2 items-center text-xs font-medium cursor-pointer w-full text-start"
                                >
                                    <Trash2 size={13} /> {t("Delete")}
                                </button>
                            </div>
                            <div
                                className="fixed inset-0 z-20 cursor-default"
                                onClick={(e) => e.currentTarget.parentElement?.removeAttribute("open")}
                            />
                        </details>
                    </div>

                    {task.assigned_to && (
                        <div className="flex items-center gap-1 text-xs text-ui-secondaryText bg-ui-surfaceContainer px-2 py-1 rounded-md border border-ui-outline/30 w-fit">
                            <User size={12} className="text-ui-primary" />
                            <span>
                                {typeof task.assigned_to === "object"
                                    ? task.assigned_to.name
                                    : task.assigned_to}
                            </span>
                        </div>
                    )}
                </div>
            )}
        </Draggable>
    );
};
