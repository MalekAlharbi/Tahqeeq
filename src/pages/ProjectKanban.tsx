import { useParams } from "react-router-dom";
import { useCategory } from "../hooks/useCategory";
import { useTask } from "../hooks/useTask";
import Loading from "../components/Loading";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import type { Category, Task } from "../types/api";
import { Plus } from "lucide-react";
import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import { KanbanColumn } from "../components/kanban/KanbanColumn";
import { KanbanModals } from "../components/kanban/KanbanModals";

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
    const { addTask, updateTaskPosition, updateTask, toggleTaskIsComplete, deleteTask } = useTask(projectId);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [taskTitle, setTaskTitle] = useState("");
    const [assignedTo, setAssignedTo] = useState("");

    // State for Task Edit & Delete
    const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [editTaskTitle, setEditTaskTitle] = useState("");

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
        setIsEditTaskModalOpen(true);
    };

    const handleUpdateTask = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingTask || !editTaskTitle.trim()) return;

        updateTask.mutate(
            {
                taskId: editingTask.id,
                title: editTaskTitle.trim(),
            },
            {
                onSuccess: () => {
                    setIsEditTaskModalOpen(false);
                    setEditingTask(null);
                    setEditTaskTitle("");
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

    const handleToggleTaskIsComplete = (task: Task) => {
        const isCompleted = Boolean(task.is_completed);
        setCategories((prevCategories) =>
            prevCategories.map((cat) => ({
                ...cat,
                tasks: cat.tasks?.map((t) =>
                    t.id === task.id ? { ...t, is_completed: !isCompleted } : t
                ),
            }))
        );

        toggleTaskIsComplete.mutate(task.id, {
            onError: () => {
                if (getCategories.data?.categories) {
                    setCategories(getCategories.data.categories);
                }
            }
        });
    };

    // Finish from drag
    const onDragEnd = (result: DropResult) => {
        const { destination, source } = result;

        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        const sourceCategoryId = Number(source.droppableId);
        const destinationCategoryId = Number(destination.droppableId);

        const updatedCategories = Array.from(categories);
        const sourceCategory = updatedCategories.find(c => c.id === sourceCategoryId);
        const destinationCategory = updatedCategories.find(c => c.id === destinationCategoryId);

        if (!sourceCategory || !destinationCategory) return;

        const sourceTasks = Array.from(sourceCategory.tasks || []);

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

        const destinationTasks = Array.from(destinationCategory.tasks || []);
        const [movedTask] = sourceTasks.splice(source.index, 1);

        destinationTasks.splice(destination.index, 0, movedTask);

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

            {/* Modals */}
            <KanbanModals
                isCategoryModalOpen={isCategoryModalOpen}
                onCloseCategoryModal={() => setIsCategoryModalOpen(false)}
                categoryTitle={title}
                setCategoryTitle={setTitle}
                onAddCategorySubmit={handleAddCategory}
                isAddCategoryPending={addCategory.isPending}

                isEditCategoryModalOpen={isEditCategoryModalOpen}
                onCloseEditCategoryModal={() => setIsEditCategoryModalOpen(false)}
                editCategoryTitle={editCategoryTitle}
                setEditCategoryTitle={setEditCategoryTitle}
                onUpdateCategorySubmit={handleUpdateCategory}
                isUpdateCategoryPending={updateCategory.isPending}

                isDeleteCategoryModalOpen={isDeleteCategoryModalOpen}
                onCloseDeleteCategoryModal={() => setIsDeleteCategoryModalOpen(false)}
                deletingCategory={deletingCategory}
                onDeleteCategorySubmit={handleDeleteCategory}
                isDeleteCategoryPending={deleteCategory.isPending}

                isTaskModalOpen={isTaskModalOpen}
                onCloseTaskModal={() => {
                    setIsTaskModalOpen(false);
                    setSelectedCategoryId(null);
                }}
                taskTitle={taskTitle}
                setTaskTitle={setTaskTitle}
                assignedTo={assignedTo}
                setAssignedTo={setAssignedTo}
                onAddTaskSubmit={handleAddTask}
                isAddTaskPending={addTask.isPending}

                isEditTaskModalOpen={isEditTaskModalOpen}
                onCloseEditTaskModal={() => setIsEditTaskModalOpen(false)}
                editTaskTitle={editTaskTitle}
                setEditTaskTitle={setEditTaskTitle}
                onUpdateTaskSubmit={handleUpdateTask}
                isUpdateTaskPending={updateTask.isPending}

                isDeleteTaskModalOpen={isDeleteTaskModalOpen}
                onCloseDeleteTaskModal={() => setIsDeleteTaskModalOpen(false)}
                deletingTask={deletingTask}
                onDeleteTaskSubmit={handleDeleteTask}
                isDeleteTaskPending={deleteTask.isPending}
            />

            {/* Categories & Tasks Columns Grid */}
            <div className="flex gap-6 overflow-x-auto p-6 w-full items-start flex-1">
                <DragDropContext onDragEnd={onDragEnd}>
                    {categories.map((category) => (
                        <KanbanColumn
                            key={category.id}
                            category={category}
                            onOpenAddTask={handleOpenAddTaskModal}
                            onOpenEditCategory={handleOpenEditCategory}
                            onOpenDeleteCategory={handleOpenDeleteCategory}
                            onToggleTaskComplete={handleToggleTaskIsComplete}
                            onOpenEditTask={handleOpenEditTask}
                            onOpenDeleteTask={handleOpenDeleteTask}
                        />
                    ))}
                </DragDropContext>
            </div>
        </div>
    );
};

export default Project;