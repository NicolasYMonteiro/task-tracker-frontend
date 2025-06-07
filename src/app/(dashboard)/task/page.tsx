'use client';

import { useEffect, useState } from 'react';
import TaskCard from '@components/card/task-card';
import type { Task } from "@sharedTypes/task";
import { getTasks } from '@actions/task/task.actions';

import CreateTaskModal from '@components/modal/create-task-modal';

const Page = () => {
  const [selectedFilter, setSelectedFilter] = useState('today');
  const [selectedOrder, setSelectedOrder] = useState<'asc' | 'desc'>('asc');

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const filters = [
    { value: 'today', label: 'Hoje' },
    { value: 'week', label: 'Semana' },
    { value: 'month', label: 'Mês' },
    { value: 'completed', label: 'Concluídas' },
    { value: 'all', label: 'Todas' },
  ];

  useEffect(() => {
    const fetchTasks = async (filter = selectedFilter, order = selectedOrder) => {
      setLoading(true);
      const data = await getTasks(filter, order);
      setTasks(data);
      setLoading(false);
    };

    fetchTasks();
  }, [selectedFilter, selectedOrder]);


  return (
    <div className="relative min-h-screen px-4 py-8">
      <div className="md:absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25 pointer-events-none md:bg-[url('/greciaFundo.png')]" />

      <div className={`relative z-10 ${tasks.length === 0 ? 'md:h-screen' : 'md:h-auto'} md:w-5/6 p-6 md:rounded-xl mx-auto`}>
        <h1 className="text-4xl font-serif font-bold text-blue-900 text-center mb-6 tracking-wide">
          Tarefas
        </h1>
        <div className="flex gap-2 mb-6 justify-center">
          {filters.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setSelectedFilter(value)}
              className={`px-3 py-1 rounded-lg border ${selectedFilter === value ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
                }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className={`grid gap-6 ${tasks.length === 0 ? 'md:h-2/5' : 'md:h-auto'} grid-cols-1 ${tasks.length === 0 ? 'md:grid-cols-none xl:grid-cols-none' : 'md:grid-cols-2'} ${tasks.length >= 7 ? 'md:grid-cols-2 xl:grid-cols-3' : 'md:grid-cols-2'}`}>

          <div className="h-full w-full flex justify-center items-center">
            <CreateTaskModal />
          </div>

          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))
          ) : (
            <div className="col-span-full text-center mt-4 text-gray-500 italic">
              Nenhuma tarefa encontrada. Adicione uma tarefa para começar!
            </div>
          )}
        </div>
      </div>
    </div>
  );


};

export default Page;
