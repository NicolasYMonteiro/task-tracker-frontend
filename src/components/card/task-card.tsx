import { format } from 'date-fns';
import { FaCheck, FaUndo } from 'react-icons/fa';
import { cn } from "@lib/utils";
import  type { Task, UpdateTask } from "@sharedTypes/task";
import { TriangleAlert } from 'lucide-react';
import EditTaskModal from "@components/modal/edit-task-modal";
import { updateTask } from '@actions/task/task.actions';

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const { id, title, description, date, interval, sequence, emergency, status } = task;

  const isCompleted = status === 'COMPLETED' ;
  const isInProgress = status === 'IN-PROGRESS';
  const isPending = status === 'PENDING';

  const parsedDate = typeof date === 'string' ? new Date(date) : date;

  const ChangeStatus = async () => {
    const newStatus = status === 'COMPLETED' ? 'PENDING' : 'COMPLETED';
  
    const updatedTask: UpdateTask = {
      id,
      title,
      description,
      date: parsedDate,
      interval,
      emergency,
      status: newStatus,
    };

    try {
      const response = await updateTask(id, updatedTask);
      if (response.success) {
        window.location.reload();
      } else {
        console.error('Erro ao atualizar tarefa:', response.message);
      }
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
    }
  };

  return (
    <div
      className={cn(
        "relative p-4 rounded-xl border border-blue-600 shadow-md transition-all duration-300 flex flex-col justify-between",
        "bg-[#fffef2] hover:shadow-lg hover:bg-[#fffeeb]",
        emergency ? "border-red-700 border-2 shadow-red-500" :
        (isCompleted) && "line-through"
      )}
    >

      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {emergency && (
              <div className=" text-red-600 p-1 rounded-br-md">
                <TriangleAlert size={24} strokeWidth={2.5} />
              </div>
            )}
            
            <h2 className="text-lg font-semibold text-gray-800 font-serif tracking-tight leading-snug">
              {title}
            </h2>
          </div>

          {isInProgress && (
            <span className="text-xs font-semibold bg-blue-500/80 text-white px-2 py-1 rounded">Em Progresso</span>
          )}
          {isPending && (
            <span className="text-xs font-semibold bg-yellow-400/80 text-white px-2 py-1 rounded">Pendente</span>
          )}
        </div>

        <p className="text-gray-700 mb-2 text-sm">{description}</p>
        <p className="text-xs text-gray-500 italic mb-1">
          Data: {format(parsedDate, 'dd/MM/yyyy')}
        </p>
        {interval && (
          <p className="text-xs text-gray-500">
            Intervalo: {interval} dias | Concluída {sequence || 0} vez(es) consecutiva(s)
          </p>
        )}
      </div>

      <div className='flex items-center mt-4'>
        <button
          onClick={ChangeStatus}
          aria-label={isCompleted ? "Desmarcar tarefa" : "Concluir tarefa"}
          title={isCompleted ? "Desmarcar tarefa" : "Concluir tarefa"}
          className={cn(
            "w-full mr-3 flex items-center justify-center gap-2 rounded-md px-4 py-2 text-white text-sm font-semibold transition-shadow duration-150 shadow",
            isCompleted
              ? "bg-yellow-700 hover:bg-yellow-800"
                : "bg-green-600 hover:bg-green-700"
          )}
        >
          {isCompleted ? <FaUndo /> : <FaCheck />}
          {isCompleted ? "Desmarcar" : "Concluir"}
        </button>

          <EditTaskModal task={task} />
      </div>
    </div>
  );
};

export default TaskCard;
