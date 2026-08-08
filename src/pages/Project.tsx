import { useParams } from "react-router-dom";
import { useCategory } from "../hooks/useCategory";
import { useTask } from "../hooks/useTask";
import Loading from "../components/Loading";
import { Draggable } from "../components/Draggable";
import { DragDropProvider } from "@dnd-kit/react";
import { Droppable } from "../components/Droppable";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Modal from "../components/Modal";
import type { Category, Task } from "../types/api";

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
            const sortedCategories = [...getCategories.data.categories]
                .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
                .map((cat) => ({
                    ...cat,
                    tasks: cat.tasks
                        ? [...cat.tasks].sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
                        : []
                }));
            setCategories(sortedCategories);
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

    if (getCategories.isLoading) {
        return <Loading />;
    }
    if (getCategories.isError) {
        return (
            <div className="p-4 text-red-500 font-semibold">
                {getCategories.error.message}
            </div>
        );
    }

    return (
        <>
            <div className="p-4 flex items-center justify-between border-b border-gray-100">
                <button
                    onClick={() => setIsCategoryModalOpen(true)}
                    className="bg-ui-primary text-ui-insidePrimaryText font-bold py-2 px-4 rounded-lg shadow-sm hover:opacity-90 transition-all cursor-pointer flex items-center gap-2"
                >
                    <span>+</span>
                    <span>{t("Add New Category") || "إضافة قسم جديد"}</span>
                </button>
            </div>

            {/* Modal: Add Category */}
            <Modal
                isOpen={isCategoryModalOpen}
                onClose={() => setIsCategoryModalOpen(false)}
                title={t("Add New Category") || "إضافة قسم جديد"}
            >
                <form onSubmit={handleAddCategory} className="flex flex-col gap-4">
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        placeholder={t("Category Name") || "اسم القسم"}
                        className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-primary"
                        required
                    />

                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            type="button"
                            onClick={() => setIsCategoryModalOpen(false)}
                            className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            إلغاء
                        </button>
                        <button
                            type="submit"
                            disabled={addCategory.isPending}
                            className="px-4 py-2 bg-ui-primary text-white rounded-lg hover:opacity-90 transition-opacity font-medium disabled:opacity-50"
                        >
                            {addCategory.isPending ? "جاري الحفظ..." : "حفظ"}
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
                title={t("Add New Task") || "إضافة مهمة جديدة"}
            >
                <form onSubmit={handleAddTask} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {t("Task Title") || "عنوان المهمة"}
                        </label>
                        <input
                            value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)}
                            type="text"
                            placeholder={t("Task Title") || "عنوان المهمة"}
                            className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-primary"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {t("Assigned To") || "المسند إليه"}
                        </label>
                        <input
                            value={assignedTo}
                            onChange={(e) => setAssignedTo(e.target.value)}
                            type="text"
                            placeholder={t("Assigned To") || "اسم الشخص (مثال: مالك)"}
                            className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-primary"
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
                            className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            إلغاء
                        </button>
                        <button
                            type="submit"
                            disabled={addTask.isPending}
                            className="px-4 py-2 bg-ui-primary text-white rounded-lg hover:opacity-90 transition-opacity font-medium disabled:opacity-50"
                        >
                            {addTask.isPending ? "جاري الحفظ..." : "حفظ"}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Drag & Drop Board */}
            <DragDropProvider
                onDragEnd={(e) => {
                    if (e.canceled || !e.operation?.target || !e.operation?.source) return;
                    const draggedTaskId = Number(e.operation.source.id);
                    const rawTargetId = Number(e.operation.target.id);

                    let targetCatId: number | null = null;
                    let computedPosition = 1;

                    setCategories((prevCategories) => {
                        // Find source task
                        let sourceTask: Task | null = null;
                        for (const cat of prevCategories) {
                            const found = cat.tasks?.find((t) => t.id === draggedTaskId);
                            if (found) {
                                sourceTask = found;
                                break;
                            }
                        }
                        if (!sourceTask) return prevCategories;

                        // Resolve target category and position
                        const directCategory = prevCategories.find((cat) => cat.id === rawTargetId);
                        if (directCategory) {
                            targetCatId = directCategory.id;
                            const filteredTasks = directCategory.tasks?.filter((t) => t.id !== draggedTaskId) || [];
                            computedPosition = filteredTasks.length + 1;
                        } else {
                            for (const cat of prevCategories) {
                                const foundIndex = cat.tasks?.findIndex((t) => t.id === rawTargetId);
                                if (foundIndex !== undefined && foundIndex !== -1) {
                                    targetCatId = cat.id;
                                    computedPosition = foundIndex + 1;
                                    break;
                                }
                            }
                        }

                        if (!targetCatId) return prevCategories;

                        const movedTask = { ...sourceTask, category_id: targetCatId, position: computedPosition };

                        return prevCategories.map((cat) => {
                            const tasksWithoutSource = cat.tasks?.filter((t) => t.id !== draggedTaskId) || [];

                            if (cat.id === targetCatId) {
                                const newTasks = [...tasksWithoutSource];
                                const insertIdx = Math.max(0, Math.min(computedPosition - 1, newTasks.length));
                                newTasks.splice(insertIdx, 0, movedTask);
                                
                                const reindexedTasks = newTasks.map((t, idx) => ({
                                    ...t,
                                    position: idx + 1
                                }));

                                return {
                                    ...cat,
                                    tasks: reindexedTasks
                                };
                            }

                            const reindexedTasks = tasksWithoutSource.map((t, idx) => ({
                                ...t,
                                position: idx + 1
                            }));

                            return {
                                ...cat,
                                tasks: reindexedTasks
                            };
                        });
                    });

                    if (targetCatId) {
                        updateTaskPosition.mutate({
                            taskId: draggedTaskId,
                            newPosition: computedPosition,
                            category_id: targetCatId
                        });
                    }
                }}
            >
                <div className="flex gap-6 overflow-x-auto p-4 w-full items-start">
                    {categories.map((category) => {
                        const sortedTasks = category.tasks
                            ? [...category.tasks].sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
                            : [];

                        return (
                            <Droppable
                                key={category.id}
                                id={category.id}
                                title={category.title}
                                onAddTask={() => handleOpenAddTaskModal(category.id)}
                            >
                                {sortedTasks.length > 0 ? (
                                    sortedTasks.map((task) => {
                                        const assigneeName = typeof task.assigned_to === "object"
                                            ? task.assigned_to?.name
                                            : task.assigned_to;

                                        return (
                                            <Draggable
                                                key={task.id}
                                                id={task.id}
                                                title={task.title}
                                                assignedTo={assigneeName}
                                            />
                                        );
                                    })
                                ) : (
                                    <div className="text-sm text-gray-400 italic text-center py-4">
                                        لا توجد مهام
                                    </div>
                                )}
                            </Droppable>
                        );
                    })}
                </div>
            </DragDropProvider>
        </>
    );
};

export default Project;