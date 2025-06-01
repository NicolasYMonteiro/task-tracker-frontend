"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { FaTrash } from "react-icons/fa";
import { Textarea } from "@components/ui/textarea";

const NotesCard = () => {
    const [notes, setNotes] = useState<{ id: number; title: string }[]>([]);
    const [newNote, setNewNote] = useState("");


    const handleAddNote = () => {
        const trimmed = newNote.trim();
        if (trimmed.length === 0) return;

        setNotes((prev) => [
            ...prev,
            { id: Date.now(), title: trimmed, done: false },
        ]);
        setNewNote("");
    };
    const removeNote = (id: number) => {
        setNotes((prev) => prev.filter((Note) => Note.id !== id));
    };

    return (
        <div className="w-full h-fit mx-auto mt-10 p-6 bg-white rounded-3xl shadow-md border border-gray-200 text-center space-y-4">
            <h2 className="text-xl font-semibold text-center text-gray-800">Notas Rápidas</h2>

            <div className="space-y-2">
                {notes.map((Note) => (
                    <label
                        key={Note.id}
                        className="flex justify-between gap-2"
                    >
                        <div className="flex w-full items-center gap-3 cursor-pointer group">

                            <Textarea 
                                value={Note.title}
                                onChange={(e) => {
                                    const updatedNotes = notes.map(t =>
                                        t.id === Note.id ? { ...t, title: e.target.value } : t
                                    );
                                    setNotes(updatedNotes);
                                }}
                                className="flex-1 text-sm text-gray-800 transition-all "
                                placeholder="Digite sua nota..."
                            />
                        </div>

                        <button onClick={() => removeNote(Note.id)}>
                            <FaTrash className="text-gray-400 hover:text-red-500 transition" />
                        </button>
                    </label>

                ))}
            </div>

            <div className="flex items-center gap-2">
                <Textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Digite sua nota..."
                    className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                />
                <button
                    onClick={handleAddNote}
                    className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default NotesCard;
