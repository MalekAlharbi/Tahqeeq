import { useParams } from "react-router-dom";
import { useCategory } from "../hooks/useCategory";
import Loading from "../components/Loading";
import { Draggable } from "../components/Draggable";
import { DragDropProvider } from "@dnd-kit/react";
import { Droppable } from "../components/Droppable";
import { useState } from "react";
import { t } from "i18next";
import Modal from "../components/Modal";

const Project = () => {
    const { id } = useParams();
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [title, setTitle] = useState<string>("");
    const [placed, setPlaced] = useState<boolean>(false);
    const { getCategories, addCategory } = useCategory(Number(id));

    // Handlers
    const handleAddCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        addCategory.mutate({ title });
        setIsCategoryModalOpen(false);
        setTitle("");
    }

    if (getCategories.isLoading) {
        return <Loading />
    }
    if (getCategories.isError) {
        return (
            <div>
                {getCategories.error.message}
            </div>
        )
    }
    return (
        <>
            <button onClick={() => setIsCategoryModalOpen(true)} className="bg-ui-primary text-ui-insidePrimaryText font-bold py-2 px-4 m-2 rounded-lg">{t("Add New Category")}</button>
            <Modal
                isOpen={isCategoryModalOpen}
                onClose={() => setIsCategoryModalOpen(false)}
                title={t("Add New Category")}
            >
                <form onSubmit={handleAddCategory} className="flex flex-col gap-4">
                    <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder={t("Category Name")} className="border p-2 rounded" required />

                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            type="button"
                            onClick={() => setIsCategoryModalOpen(false)}
                            className="px-4 py-2 border rounded"
                        >
                            إلغاء
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded"
                        >
                            حفظ
                        </button>
                    </div>
                </form>
            </Modal>
            <DragDropProvider
                onDragEnd={(e) => {
                    if (e.canceled) return;
                    setPlaced(e.operation.target.id === 4)
                }}>

                {/* {!placed && <Draggable id={1} />} */}
                {/* <Droppable id={4} >
                    {placed && <Draggable id={1} />}
                </Droppable> */}
                <div className="flex gap-6 overflow-x-auto p-4 w-full items-start">
                    {getCategories.data.categories.map((category) => {
                        return (
                            <Droppable key={category.id} id={category.id} >
                                <span className="text-primary-foreground text-lg">{category.title}</span>
                            </Droppable>
                        )
                    })}
                </div>
            </DragDropProvider>
        </>
    );
}

export default Project;