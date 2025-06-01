import { format } from 'date-fns';
import { FaCheck, FaPen, FaUndo } from 'react-icons/fa';
import { cn } from "@lib/utils";
import  type { Task } from "@sharedTypes/task";
import { TriangleAlert } from 'lucide-react';
import EditTaskModal from "@components/modal/edit-task-modal";

interface TaskCardProps {
  task: Task;
  onToggle: (id: number) => void;
}

const TaskCard = ({ task, onToggle }: TaskCardProps) => {
  const { id, title, description, date, interval, sequence, emergency, status } = task;

  const isCancelled = status === 'cancelled';
  const isCompleted = status === 'completed';
  const isInProgress = status === 'in-progress';
  const isPending = status === 'pending';

  const parsedDate = typeof date === 'string' ? new Date(date) : date;

  return (
    <div
      className={cn(
        "relative p-4 rounded-xl border shadow-md transition-all duration-300 flex flex-col justify-between",
        emergency ? "border-red-700 border-2 shadow-red-500" :
          isCancelled ? "border-gray-300" : "border-yellow-700",
        isCancelled ? "bg-gray-50" : "bg-[#fff8ec]/70",
        (isCompleted || isCancelled) && "opacity-60 line-through"
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


          {isCancelled && (
            <span className="text-xs font-semibold bg-gray-400/80 text-white px-2 py-1 rounded">Cancelado</span>
          )}
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
        {sequence && interval && (
          <p className="text-xs text-gray-500">
            Intervalo: {interval} dias | Concluída {sequence} vez(es) consecutiva(s)
          </p>
        )}
      </div>

      <div className='flex items-center mt-4'>
        <button
          onClick={() => onToggle(id)}
          aria-label={isCompleted ? "Desmarcar tarefa" : "Concluir tarefa"}
          title={isCompleted ? "Desmarcar tarefa" : "Concluir tarefa"}
          className={cn(
            "w-full mr-3 flex items-center justify-center gap-2 rounded-md px-4 py-2 text-white text-sm font-semibold transition-shadow duration-150 shadow",
            isCompleted
              ? "bg-yellow-700 hover:bg-yellow-800"
              : isCancelled
                ? "bg-gray-400 hover:bg-gray-500"
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
