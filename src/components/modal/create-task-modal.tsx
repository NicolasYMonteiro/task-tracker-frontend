import Modal from "@components/modal/modal";
import { Button } from "@components/ui/button";
import { FaPlus } from "react-icons/fa";
import { cn } from "@lib/utils";
import CreateTaskForm from "@components/form/task-form/create-task-form";

const CreateTaskModal = () => {
    return (
        <div className="h-full w-full flex justify-center items-center ">
            <Modal
                title="Adicionar nova tarefa"
                description="Preencha os campos necessários e adicione uma nova tarefa à sua lista."
                buttonTrigger={
                    <Button
                        onClick={() => { }}
                        aria-label="Adicionar nova tarefa"
                        title="Adicionar nova tarefa"
                        className={cn(
                            "aspect-square w-full md:w-auto md:h-full",
                            "bg-blue-500 text-white md:bg-transparent md:text-blue-600",
                            "border-2 border-blue-600",
                            "hover:bg-blue-600 md:hover:bg-transparent",
                            "hover:border-blue-700",
                            "rounded-lg md:rounded-full p-4 md:p-0",
                            "flex items-center justify-center gap-2 md:flex-col",
                            "text-xl md:text-5xl",
                            "transition-all duration-300 ease-in-out transform",
                            "md:hover:scale-105"
                        )}
                    >
                        <FaPlus className="" />
                        <span className="md:mt-2 md:hidden">Nova tarefa</span>
                    </Button>
                }
            >
                <section className="">
                    <CreateTaskForm />
                </section>
            </Modal>
        </div>
    );
}

export default CreateTaskModal;
