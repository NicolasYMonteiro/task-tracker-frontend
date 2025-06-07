import Modal from "@components/modal/modal";
import { Button } from "@components/ui/button";
import { FaPlus } from "react-icons/fa";
import { cn } from "@lib/utils";
import CreateTaskForm from "@components/form/task-form/create-task-form";

const CreateTaskModal = () => {
    return (
        <div className="h-full w-full flex justify-center items-center">
            <Modal
                title="Adicionar nova tarefa"
                description="Preencha os campos necessários e adicione uma nova tarefa à sua lista."
                buttonTrigger={
                    <Button
                        onClick={() => { }}
                        aria-label="Adicionar nova tarefa"
                        title="Adicionar nova tarefa"
                        className={cn(
                            "w-full h-full md:w-2/3 lg:w-1/3",
                            "bg-blue-500 text-white",
                            "border-2 border-blue-600",
                            "hover:bg-blue-600",
                            "hover:border-blue-700",
                            "rounded-lg p-1",
                            "flex items-center justify-center gap-2",
                            "text-xl md:text-2xl",
                            "transition-all duration-300 ease-in-out transform",
                        )}
                    >
                        <span className="">Nova tarefa</span>

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
