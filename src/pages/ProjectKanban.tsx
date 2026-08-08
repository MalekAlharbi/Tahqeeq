import { useParams } from "react-router-dom";
import { useCategory } from "../hooks/useCategory";
import { useTask } from "../hooks/useTask";
import Loading from "../components/Loading";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Modal from "../components/Modal";
import type { Category } from "../types/api";
import { Plus, User } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const Project = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const projectId = Number(id);

    // State for Categories
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [title, setTitle] = useState<string>("");
    const { getCategories, addCategory } = useCategory(projectId);
    const [categories, setCategories] = useState<Category[]>([]);

    // State for Tasks
    const { addTask, updateTaskPosition } = useTask(projectId);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [taskTitle, setTaskTitle] = useState("");
    const [assignedTo, setAssignedTo] = useState("");

    useEffect(() => {
        if (getCategories.data?.categories) {
            setCategories(getCategories.data?.categories);
        }
    }, [getCategories.data]);

    // Handlers for Category
    const handleAddCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        addCategory.mutate({ title: title.trim() });
        setIsCategoryModalOpen(false);
        setTitle("");
    };

    // Handlers for Task
    const handleOpenAddTaskModal = (categoryId: number) => {
        setSelectedCategoryId(categoryId);
        setTaskTitle("");
        setAssignedTo("");
        setIsTaskModalOpen(true);
    };

    const handleAddTask = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedCategoryId || !taskTitle.trim()) return;

        addTask.mutate(
            {
                categoryId: selectedCategoryId,
                title: taskTitle.trim(),
                assigned_to: assignedTo.trim() || undefined
            },
            {
                onSuccess: () => {
                    setIsTaskModalOpen(false);
                    setTaskTitle("");
                    setAssignedTo("");
                    setSelectedCategoryId(null);
                }
            }
        );
    };

    // Finish from drag
    const onDragEnd = (result: DropResult) => {
        const { destination, source } = result;

        // if you dont move it
        if (!destination) return;

        // moving at the same place
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        // Ids of category
        const sourceCategoryId = Number(source.droppableId);
        const destinationCategoryId = Number(destination.droppableId);

        // copy from categories
        const updatedCategories = Array.from(categories);

        // Find source category and destination category
        const sourceCategory = updatedCategories.find(c => c.id === sourceCategoryId);
        const destinationCategory = updatedCategories.find(c => c.id === destinationCategoryId);

        if (!sourceCategory || !destinationCategory) return;

        // copy of Tasks
        const sourceTasks = Array.from(sourceCategory.tasks || []);

        // Moved in the same category
        if (sourceCategoryId === destinationCategoryId) {
            const [movedTask] = sourceTasks.splice(source.index, 1);
            sourceTasks.splice(destination.index, 0, movedTask);
            sourceCategory.tasks = sourceTasks;
            setCategories(updatedCategories);

            updateTaskPosition.mutate({
                taskId: Number(movedTask.id),
                position: destination.index + 1,
                category_id: destinationCategoryId
            });
            return;
        }

        // Moved into different category
        const destinationTasks = Array.from(destinationCategory.tasks || []);
        const [movedTask] = sourceTasks.splice(source.index, 1);

        // set new index in new category
        destinationTasks.splice(destination.index, 0, movedTask);

        // update tasks array
        sourceCategory.tasks = sourceTasks;
        destinationCategory.tasks = destinationTasks;

        setCategories(updatedCategories);

        updateTaskPosition.mutate({
            taskId: Number(movedTask.id),
            position: destination.index + 1,
            category_id: destinationCategoryId
        });
    };

    if (getCategories.isLoading) {
        return <Loading />;
    }
    if (getCategories.isError) {
        return (
            <div className="p-4 text-ui-error font-semibold bg-ui-error/10 border border-ui-error/30 rounded-lg m-4">
                {getCategories.error.message}
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full min-h-screen bg-ui-surface text-ui-primaryText">
            {/* Top Toolbar */}
            <div className="p-4 flex items-center justify-between border-b border-ui-outline/40 bg-ui-surface">
                <h1 className="text-xl font-bold text-ui-primaryText flex items-center gap-2">
                    <span>📋</span> {t("Kanban Board")}
                </h1>
                <button
                    onClick={() => setIsCategoryModalOpen(true)}
                    className="bg-ui-primary text-ui-insidePrimaryText font-semibold py-2 px-4 rounded-xl shadow-sm hover:opacity-90 transition-all cursor-pointer flex items-center gap-2 active:scale-95"
                >
                    <Plus size={18} />
                    <span>{t("Add New Category")}</span>
                </button>
            </div>

            {/* Modal: Add Category */}
            <Modal
                isOpen={isCategoryModalOpen}
                onClose={() => setIsCategoryModalOpen(false)}
                title={t("Add New Category")}
            >
                <form onSubmit={handleAddCategory} className="flex flex-col gap-4">
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        placeholder={t("Category Name")}
                        className="bg-ui-surfaceContainer text-ui-primaryText border border-ui-outline p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-ui-primary placeholder:text-ui-secondaryText/60 transition-all"
                        required
                    />

                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            type="button"
                            onClick={() => setIsCategoryModalOpen(false)}
                            className="px-4 py-2 border border-ui-outline text-ui-primaryText rounded-xl hover:bg-ui-surfaceContainer transition-colors font-medium"
                        >
                            {t("Cancel")}
                        </button>
                        <button
                            type="submit"
                            disabled={addCategory.isPending}
                            className="px-4 py-2 bg-ui-primary text-ui-insidePrimaryText rounded-xl hover:opacity-90 transition-opacity font-semibold disabled:opacity-50 shadow-sm"
                        >
                            {addCategory.isPending ? t("Saving...") : t("Save")}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Modal: Add Task */}
            <Modal
                isOpen={isTaskModalOpen}
                onClose={() => {
                    setIsTaskModalOpen(false);
                    setSelectedCategoryId(null);
                }}
                title={t("Add New Task")}
            >
                <form onSubmit={handleAddTask} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-ui-primaryText mb-1">
                            {t("Task Title")}
                        </label>
                        <input
                            value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)}
                            type="text"
                            placeholder={t("Task Title")}
                            className="w-full bg-ui-surfaceContainer text-ui-primaryText border border-ui-outline p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-ui-primary placeholder:text-ui-secondaryText/60 transition-all"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-ui-primaryText mb-1">
                            {t("Assigned To")}
                        </label>
                        <input
                            value={assignedTo}
                            onChange={(e) => setAssignedTo(e.target.value)}
                            type="text"
                            placeholder={t("Assignee Name (e.g. Malek)")}
                            className="w-full bg-ui-surfaceContainer text-ui-primaryText border border-ui-outline p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-ui-primary placeholder:text-ui-secondaryText/60 transition-all"
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            type="button"
                            onClick={() => {
                                setIsTaskModalOpen(false);
                                setSelectedCategoryId(null);
                            }}
                            className="px-4 py-2 border border-ui-outline text-ui-primaryText rounded-xl hover:bg-ui-surfaceContainer transition-colors font-medium"
                        >
                            {t("Cancel")}
                        </button>
                        <button
                            type="submit"
                            disabled={addTask.isPending}
                            className="px-4 py-2 bg-ui-primary text-ui-insidePrimaryText rounded-xl hover:opacity-90 transition-opacity font-semibold disabled:opacity-50 shadow-sm"
                        >
                            {addTask.isPending ? t("Saving...") : t("Save")}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Categories & Tasks Columns Grid */}
            <div className="flex gap-6 overflow-x-auto p-6 w-full items-start flex-1">
                <DragDropContext onDragEnd={onDragEnd}>
                    {categories.map((category) => (
                        <Droppable
                            droppableId={category.id.toString()}
                            key={category.id}
                        >
                            {(provided, snapshot) => {
                                return (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className={`flex flex-col gap-3 min-w-[290px] w-72 p-4 rounded-2xl border bg-ui-surfaceContainer border-ui-outline/60 shadow-sm transition-all ${snapshot.isDraggingOver ? "ring-2 ring-ui-primary/50 bg-ui-primary/5 shadow-md" : ""
                                            }`}
                                    >
                                        <div className="flex items-center justify-between pb-3 border-b border-ui-outline/40">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-bold text-ui-primaryText text-base tracking-wide">{category.title}</h3>
                                                <span className="bg-ui-outline/20 text-ui-secondaryText text-xs font-semibold px-2 py-0.5 rounded-full">
                                                    {category.tasks?.length || 0}
                                                </span>
                                            </div>
                                            <button
                                                onClick={() => handleOpenAddTaskModal(category.id)}
                                                type="button"
                                                className="flex items-center gap-1 text-xs bg-ui-primary/10 hover:bg-ui-primary/20 text-ui-primary font-semibold px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer active:scale-95"
                                            >
                                                <Plus size={14} />
                                                <span>{t("Task")}</span>
                                            </button>
                                        </div>

                                        <div className="flex flex-col gap-2.5 min-h-[160px] pt-1">
                                            {category.tasks && category.tasks.length > 0 ? (
                                                category.tasks.map((task, index) => (
                                                    <Draggable
                                                        draggableId={task.id.toString()}
                                                        index={index}
                                                        key={task.id}
                                                    >
                                                        {(provided, snapshot) => {
                                                            return (
                                                                <div
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    className={`bg-ui-surface text-ui-primaryText border border-ui-outline/60 p-3.5 rounded-xl flex flex-col gap-2 transition-all select-none hover:border-ui-primary/40 ${snapshot.isDragging
                                                                            ? "shadow-xl ring-2 ring-ui-primary border-transparent opacity-95 scale-[1.02] z-50"
                                                                            : "shadow-sm hover:shadow-md"
                                                                        }`}
                                                                >
                                                                    <span className="font-medium text-sm text-ui-primaryText leading-snug">
                                                                        {task.title}
                                                                    </span>
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
                                                            );
                                                        }}
                                                    </Draggable>
                                                ))
                                            ) : (
                                                <div className="text-sm text-ui-secondaryText/60 italic text-center py-8 border-2 border-dashed border-ui-outline/30 rounded-xl flex items-center justify-center">
                                                    {t("No tasks")}
                                                </div>
                                            )}
                                            {provided.placeholder}
                                        </div>
                                    </div>
                                );
                            }}
                        </Droppable>
                    ))}
                </DragDropContext>
            </div>
        </div>
    );
};

export default Project;