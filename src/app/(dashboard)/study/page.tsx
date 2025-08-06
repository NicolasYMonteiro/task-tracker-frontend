import NotesCard from "@components/card/notesCard";
import PomodoroTimer from "@components/card/pomodoro-timer";
import TaskMinimalist from "@components/card/task-minimalist";

const Page = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <header className="text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                    Gerenciador de Tarefas
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Organize seus estudos, tarefas e desenvolvimento pessoal de forma eficiente
                </p>
            </header>
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <PomodoroTimer />
                    <TaskMinimalist />
                </div>
                <div className="lg:col-span-1">
                    <NotesCard />
                </div>
            </div>
        </div>
    );
};

export default Page;