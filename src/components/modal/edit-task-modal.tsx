import Modal from "@components/modal/modal";
import { FaPen } from "react-icons/fa";
import type { Task } from "@sharedTypes/task";
import EditTaskForm from "@components/form/task-form/edit-task-form";

interface EditTaskModalProps {
    task: Task;
  }
  
  const EditTaskModal = ({ task }: EditTaskModalProps) => {
    return (
        <section >
            <Modal
                title="Editar tarefa"
                description="Modifique as informações da tarefa conforme necessário."
                buttonTrigger={
                    <button
                        onClick={() => console.log('Editar tarefa', task.id)}
                        className="h-full border border-yellow-600 bg-yellow-100 hover:bg-yellow-200 flex items-center justify-center gap-2 rounded-md px-3 py-2 text-yellow-800 text-sm font-semibold transition"
                        aria-label="Editar tarefa"
                        title="Editar tarefa"
                    >
                        <FaPen />
                    </button>
                }
            >
                <section className="">
                    <EditTaskForm task={task} />
                </section>
            </Modal>
        </section>
    );
}

export default EditTaskModal;
