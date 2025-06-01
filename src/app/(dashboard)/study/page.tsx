import NotesCard from "@components/card/notesCard";
import PomodoroTimer from "@components/card/pomodoro-timer";
import TaskMinimalist from "@components/card/task-minimalist";

const Page = () => {
    return (
        <div className="md:grid md:grid-cols-3 p-4 md:gap-6 bg-gradient-to-b from-blue-100 to-white">
            <PomodoroTimer />
            <TaskMinimalist />
            <NotesCard />
        </div>
    );
}

export default Page;