"use client";

import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { FaTrash } from "react-icons/fa";

const TaskMinimalist = () => {
    const [tasks, setTasks] = useState<{ id: number; title: string; done: boolean }[]>([]);
    const [newTask, setNewTask] = useState("");

    const toggleTask = (id: number) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, done: !task.done } : task
            )
        );
    };

    const handleAddTask = () => {
        const trimmed = newTask.trim();
        if (trimmed.length === 0) return;

        setTasks((prev) => [
            ...prev,
            { id: Date.now(), title: trimmed, done: false },
        ]);
        setNewTask("");
    };
    const removeTask = (id: number) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    };

    return (
        <div className="w-full h-fit mx-auto mt-10 p-6 bg-white rounded-3xl shadow-md border border-gray-200 text-center space-y-4">
            <h2 className="text-xl font-semibold text-center text-gray-800">Tarefas</h2>

            <div className="space-y-2">
                {tasks.map((task) => (
                    <label
                        key={task.id}
                        className="flex justify-between gap-2"
                    >
                        <div className="flex w-full items-center gap-3 cursor-pointer group">
                            <button
                                onClick={() => toggleTask(task.id)}
                                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${task.done
                                    ? "bg-blue-600 border-blue-600"
                                    : "border-gray-400 group-hover:border-blue-500"
                                    }`}
                            >
                                {task.done && <Check className="w-3 h-3 text-white" />}
                            </button>
                            <span
                                className={`text-sm text-gray-800 transition-all ${task.done ? "line-through text-gray-400" : ""
                                    }`}
                            >
                                {task.title}
                            </span>
                        </div>

                        <button onClick={() => removeTask(task.id)}>
                            <FaTrash className="text-gray-400 hover:text-red-500 transition" />
                        </button>
                    </label>

                ))}
            </div>

            <div className="flex items-center gap-2">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
                    placeholder="Nova tarefa..."
                    className="flex-1 px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    onClick={handleAddTask}
                    className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default TaskMinimalist;
