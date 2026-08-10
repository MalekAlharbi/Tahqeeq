import { useParams } from "react-router-dom";
import { useCategory } from "../hooks/useCategory";
import { useTask } from "../hooks/useTask";
import Loading from "../components/Loading";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Modal from "../components/Modal";
import type { Category, Task } from "../types/api";
import { Plus, User, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const Project = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const projectId = Number(id);

    // State for Categories
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [title, setTitle] = useState<string>("");
    const { getCategories, addCategory, updateCategory, deleteCategory } = useCategory(projectId);
    const [categories, setCategories] = useState<Category[]>([]);

    // State for Category Edit & Delete
    const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [editCategoryTitle, setEditCategoryTitle] = useState("");

    const [isDeleteCategoryModalOpen, setIsDeleteCategoryModalOpen] = useState(false);
    const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);

    // State for Tasks
    const { addTask, updateTaskPosition, updateTask, deleteTask } = useTask(projectId);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [taskTitle, setTaskTitle] = useState("");
    const [assignedTo, setAssignedTo] = useState("");

    // State for Task Edit & Delete
    const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [editTaskTitle, setEditTaskTitle] = useState("");
    const [editTaskAssignedTo, setEditTaskAssignedTo] = useState("");

    const [isDeleteTaskModalOpen, setIsDeleteTaskModalOpen] = useState(false);
    const [deletingTask, setDeletingTask] = useState<Task | null>(null);

    useEffect(() => {
        if (getCategories.data?.categories) {
            setCategories(getCategories.data?.categories);
        }
    }, [getCategories.data]);

    // Handlers for Add Category
    const handleAddCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        addCategory.mutate({ title: title.trim() });
        setIsCategoryModalOpen(false);
        setTitle("");
    };

    // Handlers for Edit Category
    const handleOpenEditCategory = (category: Category) => {
        setEditingCategory(category);
        setEditCategoryTitle(category.title);
        setIsEditCategoryModalOpen(true);
    };

    const handleUpdateCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingCategory || !editCategoryTitle.trim()) return;

        updateCategory.mutate(
            { categoryId: editingCategory.id, title: editCategoryTitle.trim() },
            {
                onSuccess: () => {
                    setIsEditCategoryModalOpen(false);
                    setEditingCategory(null);
                    setEditCategoryTitle("");
                }
            }
        );
    };

    // Handlers for Delete Category
    const handleOpenDeleteCategory = (category: Category) => {
        setDeletingCategory(category);
        setIsDeleteCategoryModalOpen(true);
    };

    const handleDeleteCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!deletingCategory) return;

        deleteCategory.mutate(deletingCategory.id, {
            onSuccess: () => {
                setIsDeleteCategoryModalOpen(false);
                setDeletingCategory(null);
            }
        });
    };

    // Handlers for Task Add
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

    // Handlers for Edit Task
    const handleOpenEditTask = (task: Task) => {
        setEditingTask(task);
        setEditTaskTitle(task.title);
        setEditTaskAssignedTo(
            typeof task.assigned_to === "object"
                ? task.assigned_to.name
                : task.assigned_to || ""
        );
        setIsEditTaskModalOpen(true);
    };

    const handleUpdateTask = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingTask || !editTaskTitle.trim()) return;

        updateTask.mutate(
            {
                taskId: editingTask.id,
                title: editTaskTitle.trim(),
                assigned_to: editTaskAssignedTo.trim() || undefined
            },
            {
                onSuccess: () => {
                    setIsEditTaskModalOpen(false);
                    setEditingTask(null);
                    setEditTaskTitle("");
                    setEditTaskAssignedTo("");
                }
            }
        );
    };

    // Handlers for Delete Task
    const handleOpenDeleteTask = (task: Task) => {
        setDeletingTask(task);
        setIsDeleteTaskModalOpen(true);
    };

    const handleDeleteTask = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!deletingTask) return;

        deleteTask.mutate(deletingTask.id, {
            onSuccess: () => {
                setIsDeleteTaskModalOpen(false);
                setDeletingTask(null);
            }
        });
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
                            className="px-4 py-2 border border-ui-outline text-ui-primaryText rounded-xl hover:bg-ui-surfaceContainer transition-colors font-medium cursor-pointer"
                        >
                            {t("Cancel")}
                        </button>
                        <button
                            type="submit"
                            disabled={addCategory.isPending}
                            className="px-4 py-2 bg-ui-primary text-ui-insidePrimaryText rounded-xl hover:opacity-90 transition-opacity font-semibold disabled:opacity-50 shadow-sm cursor-pointer"
                        >
                            {addCategory.isPending ? t("Saving...") : t("Save")}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Modal: Edit Category */}
            <Modal
                isOpen={isEditCategoryModalOpen}
                onClose={() => setIsEditCategoryModalOpen(false)}
                title={t("Edit Category")}
            >
                <form onSubmit={handleUpdateCategory} className="flex flex-col gap-4">
                    <input
                        value={editCategoryTitle}
                        onChange={(e) => setEditCategoryTitle(e.target.value)}
                        type="text"
                        placeholder={t("Category Name")}
                        className="bg-ui-surfaceContainer text-ui-primaryText border border-ui-outline p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-ui-primary placeholder:text-ui-secondaryText/60 transition-all"
                        required
                    />

                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            type="button"
                            onClick={() => setIsEditCategoryModalOpen(false)}
                            className="px-4 py-2 border border-ui-outline text-ui-primaryText rounded-xl hover:bg-ui-surfaceContainer transition-colors font-medium cursor-pointer"
                        >
                            {t("Cancel")}
                        </button>
                        <button
                            type="submit"
                            disabled={updateCategory.isPending}
                            className="px-4 py-2 bg-ui-primary text-ui-insidePrimaryText rounded-xl hover:opacity-90 transition-opacity font-semibold disabled:opacity-50 shadow-sm cursor-pointer"
                        >
                            {updateCategory.isPending ? t("Saving...") : t("Save")}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Modal: Delete Category */}
            <Modal
                isOpen={isDeleteCategoryModalOpen}
                onClose={() => setIsDeleteCategoryModalOpen(false)}
                title={t("Delete Category")}
            >
                <form onSubmit={handleDeleteCategory} className="flex flex-col gap-4">
                    <p className="text-ui-primaryText">
                        {t("Are you sure you want to delete this category?")}
                    </p>
                    {deletingCategory && (
                        <p className="font-bold text-ui-primaryText bg-ui-surfaceContainer p-3 rounded-xl border border-ui-outline/40">
                            {deletingCategory.title}
                        </p>
                    )}

                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            type="button"
                            onClick={() => setIsDeleteCategoryModalOpen(false)}
                            className="px-4 py-2 border border-ui-outline text-ui-primaryText rounded-xl hover:bg-ui-surfaceContainer transition-colors font-medium cursor-pointer"
                        >
                            {t("Cancel")}
                        </button>
                        <button
                            type="submit"
                            disabled={deleteCategory.isPending}
                            className="px-4 py-2 bg-ui-error text-white rounded-xl hover:opacity-90 transition-opacity font-semibold disabled:opacity-50 shadow-sm cursor-pointer"
                        >
                            {deleteCategory.isPending ? t("Saving...") : t("Delete")}
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
                        />
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            type="button"
                            onClick={() => {
                                setIsTaskModalOpen(false);
                                setSelectedCategoryId(null);
                            }}
                            className="px-4 py-2 border border-ui-outline text-ui-primaryText rounded-xl hover:bg-ui-surfaceContainer transition-colors font-medium cursor-pointer"
                        >
                            {t("Cancel")}
                        </button>
                        <button
                            type="submit"
                            disabled={addTask.isPending}
                            className="px-4 py-2 bg-ui-primary text-ui-insidePrimaryText rounded-xl hover:opacity-90 transition-opacity font-semibold disabled:opacity-50 shadow-sm cursor-pointer"
                        >
                            {addTask.isPending ? t("Saving...") : t("Save")}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Modal: Edit Task */}
            <Modal
                isOpen={isEditTaskModalOpen}
                onClose={() => setIsEditTaskModalOpen(false)}
                title={t("Edit Task")}
            >
                <form onSubmit={handleUpdateTask} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-ui-primaryText mb-1">
                            {t("Task Title")}
                        </label>
                        <input
                            value={editTaskTitle}
                            onChange={(e) => setEditTaskTitle(e.target.value)}
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
                            value={editTaskAssignedTo}
                            onChange={(e) => setEditTaskAssignedTo(e.target.value)}
                            type="text"
                            placeholder={t("Assignee Name (e.g. Malek)")}
                            className="w-full bg-ui-surfaceContainer text-ui-primaryText border border-ui-outline p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-ui-primary placeholder:text-ui-secondaryText/60 transition-all"
                        />
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            type="button"
                            onClick={() => setIsEditTaskModalOpen(false)}
                            className="px-4 py-2 border border-ui-outline text-ui-primaryText rounded-xl hover:bg-ui-surfaceContainer transition-colors font-medium cursor-pointer"
                        >
                            {t("Cancel")}
                        </button>
                        <button
                            type="submit"
                            disabled={updateTask.isPending}
                            className="px-4 py-2 bg-ui-primary text-ui-insidePrimaryText rounded-xl hover:opacity-90 transition-opacity font-semibold disabled:opacity-50 shadow-sm cursor-pointer"
                        >
                            {updateTask.isPending ? t("Saving...") : t("Save")}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Modal: Delete Task */}
            <Modal
                isOpen={isDeleteTaskModalOpen}
                onClose={() => setIsDeleteTaskModalOpen(false)}
                title={t("Delete Task")}
            >
                <form onSubmit={handleDeleteTask} className="flex flex-col gap-4">
                    <p className="text-ui-primaryText">
                        {t("Are you sure you want to delete this task?")}
                    </p>
                    {deletingTask && (
                        <p className="font-bold text-ui-primaryText bg-ui-surfaceContainer p-3 rounded-xl border border-ui-outline/40">
                            {deletingTask.title}
                        </p>
                    )}

                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            type="button"
                            onClick={() => setIsDeleteTaskModalOpen(false)}
                            className="px-4 py-2 border border-ui-outline text-ui-primaryText rounded-xl hover:bg-ui-surfaceContainer transition-colors font-medium cursor-pointer"
                        >
                            {t("Cancel")}
                        </button>
                        <button
                            type="submit"
                            disabled={deleteTask.isPending}
                            className="px-4 py-2 bg-ui-error text-white rounded-xl hover:opacity-90 transition-opacity font-semibold disabled:opacity-50 shadow-sm cursor-pointer"
                        >
                            {deleteTask.isPending ? t("Saving...") : t("Delete")}
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
                                            <div className="flex items-center gap-1">
                                                <button
                                                    onClick={() => handleOpenAddTaskModal(category.id)}
                                                    type="button"
                                                    className="flex items-center gap-1 text-xs bg-ui-primary/10 hover:bg-ui-primary/20 text-ui-primary font-semibold px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer active:scale-95"
                                                >
                                                    <Plus size={14} />
                                                    <span>{t("Task")}</span>
                                                </button>

                                                {/* Category Three Dots Menu */}
                                                <details className="relative group">
                                                    <summary className="list-none cursor-pointer p-1 rounded-lg hover:bg-ui-outline/20 text-ui-secondaryText hover:text-ui-primaryText focus:outline-none select-none transition-colors">
                                                        <MoreVertical size={16} />
                                                    </summary>
                                                    <div className="flex flex-col bg-ui-surfaceContainer border border-ui-outline/60 shadow-lg absolute right-0 top-full mt-1 p-1 rounded-xl z-20 min-w-[130px]">
                                                        <button
                                                            onClick={(e) => {
                                                                e.currentTarget.closest('details')?.removeAttribute('open');
                                                                handleOpenEditCategory(category);
                                                            }}
                                                            type="button"
                                                            className="text-ui-primaryText hover:bg-ui-outline/20 p-2 rounded-lg flex gap-2 items-center text-xs font-medium cursor-pointer w-full text-start"
                                                        >
                                                            <Pencil size={14} /> {t("Edit")}
                                                        </button>
                                                        <button
                                                            onClick={(e) => {
                                                                e.currentTarget.closest('details')?.removeAttribute('open');
                                                                handleOpenDeleteCategory(category);
                                                            }}
                                                            type="button"
                                                            className="text-ui-error hover:bg-ui-error/20 p-2 rounded-lg flex gap-2 items-center text-xs font-medium cursor-pointer w-full text-start"
                                                        >
                                                            <Trash2 size={14} /> {t("Delete")}
                                                        </button>
                                                    </div>
                                                    <div
                                                        className="fixed inset-0 z-10 cursor-default"
                                                        onClick={(e) => e.currentTarget.parentElement?.removeAttribute('open')}
                                                    />
                                                </details>
                                            </div>
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
                                                                    <div className="flex items-start justify-between gap-2">
                                                                        <span className="font-medium text-sm text-ui-primaryText leading-snug break-words flex-1">
                                                                            {task.title}
                                                                        </span>

                                                                        {/* Task Three Dots Menu */}
                                                                        <details className="relative group shrink-0">
                                                                            <summary className="list-none cursor-pointer p-1 rounded-md hover:bg-ui-outline/20 text-ui-secondaryText hover:text-ui-primaryText focus:outline-none select-none transition-colors">
                                                                                <MoreVertical size={14} />
                                                                            </summary>
                                                                            <div className="flex flex-col bg-ui-surfaceContainer border border-ui-outline/60 shadow-lg absolute right-0 top-full mt-1 p-1 rounded-xl z-30 min-w-[120px]">
                                                                                <button
                                                                                    onClick={(e) => {
                                                                                        e.currentTarget.closest('details')?.removeAttribute('open');
                                                                                        handleOpenEditTask(task);
                                                                                    }}
                                                                                    type="button"
                                                                                    className="text-ui-primaryText hover:bg-ui-outline/20 p-1.5 rounded-lg flex gap-2 items-center text-xs font-medium cursor-pointer w-full text-start"
                                                                                >
                                                                                    <Pencil size={13} /> {t("Edit")}
                                                                                </button>
                                                                                <button
                                                                                    onClick={(e) => {
                                                                                        e.currentTarget.closest('details')?.removeAttribute('open');
                                                                                        handleOpenDeleteTask(task);
                                                                                    }}
                                                                                    type="button"
                                                                                    className="text-ui-error hover:bg-ui-error/20 p-1.5 rounded-lg flex gap-2 items-center text-xs font-medium cursor-pointer w-full text-start"
                                                                                >
                                                                                    <Trash2 size={13} /> {t("Delete")}
                                                                                </button>
                                                                            </div>
                                                                            <div
                                                                                className="fixed inset-0 z-20 cursor-default"
                                                                                onClick={(e) => e.currentTarget.parentElement?.removeAttribute('open')}
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