import Modal from "../Modal";
import type { Category, Task } from "../../types/api";
import { useTranslation } from "react-i18next";

interface KanbanModalsProps {
    // Add Category
    isCategoryModalOpen: boolean;
    onCloseCategoryModal: () => void;
    categoryTitle: string;
    setCategoryTitle: (value: string) => void;
    onAddCategorySubmit: (e: React.FormEvent) => void;
    isAddCategoryPending: boolean;

    // Edit Category
    isEditCategoryModalOpen: boolean;
    onCloseEditCategoryModal: () => void;
    editCategoryTitle: string;
    setEditCategoryTitle: (value: string) => void;
    onUpdateCategorySubmit: (e: React.FormEvent) => void;
    isUpdateCategoryPending: boolean;

    // Delete Category
    isDeleteCategoryModalOpen: boolean;
    onCloseDeleteCategoryModal: () => void;
    deletingCategory: Category | null;
    onDeleteCategorySubmit: (e: React.FormEvent) => void;
    isDeleteCategoryPending: boolean;

    // Add Task
    isTaskModalOpen: boolean;
    onCloseTaskModal: () => void;
    taskTitle: string;
    setTaskTitle: (value: string) => void;
    assignedTo: string;
    setAssignedTo: (value: string) => void;
    onAddTaskSubmit: (e: React.FormEvent) => void;
    isAddTaskPending: boolean;

    // Edit Task
    isEditTaskModalOpen: boolean;
    onCloseEditTaskModal: () => void;
    editTaskTitle: string;
    setEditTaskTitle: (value: string) => void;
    onUpdateTaskSubmit: (e: React.FormEvent) => void;
    isUpdateTaskPending: boolean;

    // Delete Task
    isDeleteTaskModalOpen: boolean;
    onCloseDeleteTaskModal: () => void;
    deletingTask: Task | null;
    onDeleteTaskSubmit: (e: React.FormEvent) => void;
    isDeleteTaskPending: boolean;
}

export const KanbanModals = ({
    isCategoryModalOpen,
    onCloseCategoryModal,
    categoryTitle,
    setCategoryTitle,
    onAddCategorySubmit,
    isAddCategoryPending,

    isEditCategoryModalOpen,
    onCloseEditCategoryModal,
    editCategoryTitle,
    setEditCategoryTitle,
    onUpdateCategorySubmit,
    isUpdateCategoryPending,

    isDeleteCategoryModalOpen,
    onCloseDeleteCategoryModal,
    deletingCategory,
    onDeleteCategorySubmit,
    isDeleteCategoryPending,

    isTaskModalOpen,
    onCloseTaskModal,
    taskTitle,
    setTaskTitle,
    assignedTo,
    setAssignedTo,
    onAddTaskSubmit,
    isAddTaskPending,

    isEditTaskModalOpen,
    onCloseEditTaskModal,
    editTaskTitle,
    setEditTaskTitle,
    onUpdateTaskSubmit,
    isUpdateTaskPending,

    isDeleteTaskModalOpen,
    onCloseDeleteTaskModal,
    deletingTask,
    onDeleteTaskSubmit,
    isDeleteTaskPending,
}: KanbanModalsProps) => {
    const { t } = useTranslation();

    return (
        <>
            {/* Modal: Add Category */}
            <Modal
                isOpen={isCategoryModalOpen}
                onClose={onCloseCategoryModal}
                title={t("Add New Category")}
            >
                <form onSubmit={onAddCategorySubmit} className="flex flex-col gap-4">
                    <input
                        value={categoryTitle}
                        onChange={(e) => setCategoryTitle(e.target.value)}
                        type="text"
                        placeholder={t("Category Name")}
                        className="bg-ui-surfaceContainer text-ui-primaryText border border-ui-outline p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-ui-primary placeholder:text-ui-secondaryText/60 transition-all"
                        required
                    />

                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            type="button"
                            onClick={onCloseCategoryModal}
                            className="px-4 py-2 border border-ui-outline text-ui-primaryText rounded-xl hover:bg-ui-surfaceContainer transition-colors font-medium cursor-pointer"
                        >
                            {t("Cancel")}
                        </button>
                        <button
                            type="submit"
                            disabled={isAddCategoryPending}
                            className="px-4 py-2 bg-ui-primary text-ui-insidePrimaryText rounded-xl hover:opacity-90 transition-opacity font-semibold disabled:opacity-50 shadow-sm cursor-pointer"
                        >
                            {isAddCategoryPending ? t("Saving...") : t("Save")}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Modal: Edit Category */}
            <Modal
                isOpen={isEditCategoryModalOpen}
                onClose={onCloseEditCategoryModal}
                title={t("Edit Category")}
            >
                <form onSubmit={onUpdateCategorySubmit} className="flex flex-col gap-4">
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
                            onClick={onCloseEditCategoryModal}
                            className="px-4 py-2 border border-ui-outline text-ui-primaryText rounded-xl hover:bg-ui-surfaceContainer transition-colors font-medium cursor-pointer"
                        >
                            {t("Cancel")}
                        </button>
                        <button
                            type="submit"
                            disabled={isUpdateCategoryPending}
                            className="px-4 py-2 bg-ui-primary text-ui-insidePrimaryText rounded-xl hover:opacity-90 transition-opacity font-semibold disabled:opacity-50 shadow-sm cursor-pointer"
                        >
                            {isUpdateCategoryPending ? t("Saving...") : t("Save")}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Modal: Delete Category */}
            <Modal
                isOpen={isDeleteCategoryModalOpen}
                onClose={onCloseDeleteCategoryModal}
                title={t("Delete Category")}
            >
                <form onSubmit={onDeleteCategorySubmit} className="flex flex-col gap-4">
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
                            onClick={onCloseDeleteCategoryModal}
                            className="px-4 py-2 border border-ui-outline text-ui-primaryText rounded-xl hover:bg-ui-surfaceContainer transition-colors font-medium cursor-pointer"
                        >
                            {t("Cancel")}
                        </button>
                        <button
                            type="submit"
                            disabled={isDeleteCategoryPending}
                            className="px-4 py-2 bg-ui-error text-white rounded-xl hover:opacity-90 transition-opacity font-semibold disabled:opacity-50 shadow-sm cursor-pointer"
                        >
                            {isDeleteCategoryPending ? t("Saving...") : t("Delete")}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Modal: Add Task */}
            <Modal
                isOpen={isTaskModalOpen}
                onClose={onCloseTaskModal}
                title={t("Add New Task")}
            >
                <form onSubmit={onAddTaskSubmit} className="flex flex-col gap-4">
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
                            onClick={onCloseTaskModal}
                            className="px-4 py-2 border border-ui-outline text-ui-primaryText rounded-xl hover:bg-ui-surfaceContainer transition-colors font-medium cursor-pointer"
                        >
                            {t("Cancel")}
                        </button>
                        <button
                            type="submit"
                            disabled={isAddTaskPending}
                            className="px-4 py-2 bg-ui-primary text-ui-insidePrimaryText rounded-xl hover:opacity-90 transition-opacity font-semibold disabled:opacity-50 shadow-sm cursor-pointer"
                        >
                            {isAddTaskPending ? t("Saving...") : t("Save")}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Modal: Edit Task */}
            <Modal
                isOpen={isEditTaskModalOpen}
                onClose={onCloseEditTaskModal}
                title={t("Edit Task")}
            >
                <form onSubmit={onUpdateTaskSubmit} className="flex flex-col gap-4">
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

                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            type="button"
                            onClick={onCloseEditTaskModal}
                            className="px-4 py-2 border border-ui-outline text-ui-primaryText rounded-xl hover:bg-ui-surfaceContainer transition-colors font-medium cursor-pointer"
                        >
                            {t("Cancel")}
                        </button>
                        <button
                            type="submit"
                            disabled={isUpdateTaskPending}
                            className="px-4 py-2 bg-ui-primary text-ui-insidePrimaryText rounded-xl hover:opacity-90 transition-opacity font-semibold disabled:opacity-50 shadow-sm cursor-pointer"
                        >
                            {isUpdateTaskPending ? t("Saving...") : t("Save")}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Modal: Delete Task */}
            <Modal
                isOpen={isDeleteTaskModalOpen}
                onClose={onCloseDeleteTaskModal}
                title={t("Delete Task")}
            >
                <form onSubmit={onDeleteTaskSubmit} className="flex flex-col gap-4">
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
                            onClick={onCloseDeleteTaskModal}
                            className="px-4 py-2 border border-ui-outline text-ui-primaryText rounded-xl hover:bg-ui-surfaceContainer transition-colors font-medium cursor-pointer"
                        >
                            {t("Cancel")}
                        </button>
                        <button
                            type="submit"
                            disabled={isDeleteTaskPending}
                            className="px-4 py-2 bg-ui-error text-white rounded-xl hover:opacity-90 transition-opacity font-semibold disabled:opacity-50 shadow-sm cursor-pointer"
                        >
                            {isDeleteTaskPending ? t("Saving...") : t("Delete")}
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
};
