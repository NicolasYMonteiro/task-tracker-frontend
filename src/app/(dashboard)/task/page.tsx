'use client';

import { useEffect, useState } from 'react';
import TaskCard from '@components/card/task-card';
import type { Task } from "@sharedTypes/task";
import { getTasks } from '@actions/task/task.actions';

import CreateTaskModal from '@components/modal/create-task-modal';

const Page = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
      setLoading(false);
    };

    fetchTasks();
  }, []);

  const toggleStatus = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
            ...task,
            status: task.status === 'completed' ? 'pending' : 'completed',
          }
          : task
      )
    );
  };

  return (
    <div className="relative min-h-screen px-4 py-8">
      <div className="md:absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25 pointer-events-none md:bg-[url('/greciaFundo.png')]" />

      <div className="relative z-10 md:w-5/6 p-6 md:rounded-xl mx-auto">
        <h1 className="text-4xl font-serif font-bold text-blue-900 text-center mb-6 tracking-wide">
          Tarefas do dia
        </h1>

        <div className={`grid gap-6 grid-cols-1 ${tasks.length >= 7 ? 'md:grid-cols-2 xl:grid-cols-3' : 'md:grid-cols-2'}`}>

          <div className="h-full w-full flex justify-center items-center">
            <CreateTaskModal />
          </div>

          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskCard key={task.id} task={task} onToggle={toggleStatus} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 italic">
              Nenhuma tarefa encontrada. Adicione uma tarefa para começar!
            </div>
          )}
        </div>
      </div>
    </div>
  );


};

export default Page;
