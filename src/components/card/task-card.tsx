'use client';

import { format } from 'date-fns';
import { FaCheck, FaUndo } from 'react-icons/fa'; // Font Awesome 5
import { AlertTriangle } from "lucide-react";
import { cn } from "@lib/utils";

export interface Task {
  id: number;
  title: string;
  description: string;
  date: Date | string;
  interval?: number;
  sequence?: number;
  emergency?: boolean;
  status: 'pending' | 'completed' | 'in-progress' | 'cancelled';
}

interface TaskCardProps {
  task: Task;
  onToggle: (id: number) => void;
}

const TaskCard = ({ task, onToggle }: TaskCardProps) => {

  const isCancelled = task.status === 'cancelled';
  const isCompleted = task.status === 'completed';
  const isInProgress = task.status === 'in-progress';
  const isPending = task.status === 'pending';
  const isEmergency = task.emergency;

  const date = typeof task.date === 'string' ? new Date(task.date) : task.date;

  return (
    <div
      className={`relative p-4 rounded-lg border shadow-lg shadow-gray-500 ${isCancelled ? 'bg-gray-50' : "bg-[#fff8ec]"} shadow-sm transition-all duration-300 flex flex-col justify-between ${isEmergency ? 'border-red-700 border-2 shadow-red-500' : isCancelled ? "border-gray-300" : 'border-yellow-700'
        } ${isCompleted || isCancelled ? 'opacity-60 line-through' : ''}`}
    >
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className='flex items-center gap-4'>
            {isEmergency && (
              <AlertTriangle
                className=" text-red-700"
                size={28}
                strokeWidth={3}
                aria-label="Tarefa de emergência"

              />
            )}
            <h2 className="text-xl font-semibold text-gray-800 font-serif">{task.title}</h2>

          </div>
          {isCancelled && (
            <span className="text-sm text-white font-bold rounded px-2 py-1 bg-gray-400/80">Cancelado</span>
          )}
          {isInProgress && (
            <span className="text-sm text-white font-bold rounded px-2 py-1 bg-blue-400/80">Em Progresso</span>
          )}
          {isPending && (
            <span className="text-sm text-white font-bold rounded px-2 py-1 bg-yellow-400/80">Pendente</span>
          )}

        </div>
        <p className="text-gray-700 mb-2">{task.description}</p>
        <p className="text-sm text-gray-500 italic mb-1">
          Data: {format(date, 'dd/MM/yyyy')}
        </p>
        {task.sequence && task.interval && (
          <p className="text-sm text-gray-500">
            Intervalo: {task.interval} dias | Concluída {task.sequence} vez(es) consecutiva(s)
          </p>

        )}
      </div>

      <button
        onClick={() => onToggle(task.id)}
        aria-label={isCompleted ? "Desmarcar tarefa" : "Concluir tarefa"}
        title={isCompleted ? "Desmarcar tarefa" : "Concluir tarefa"}
        className={`mt-4 flex items-center justify-center gap-2 rounded-md px-4 py-2 text-white text-sm font-semibold transition ${isCompleted
          ? 'bg-yellow-700 hover:bg-yellow-800'
          : isCancelled
            ? 'bg-gray-400 hover:bg-gray-500'
            : 'bg-green-600 hover:bg-green-700'
          }`}
      >
        {isCompleted ? (
          <>
            <FaUndo aria-hidden="true" /> Desmarcar
          </>
        ) : (
          <>
            <FaCheck aria-hidden="true" /> Concluir
          </>
        )}
      </button>
    </div>
  );
};

export default TaskCard;
