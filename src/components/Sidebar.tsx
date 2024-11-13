import React from "react";

interface Note {
  id: string;
  body: string;
}

interface SidebarProps {
  notes: Note[];
  currentNote: Note | null;
  setCurrentNoteId: (id: string) => void;
  newNote: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  notes,
  currentNote,
  setCurrentNoteId,
  newNote,
}) => {
  return (
    <div className="flex flex-col w-full h-full p-4 text-white bg-[#1b162f] md:w-1/4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold">Notes</h3>
        <button
          onClick={newNote}
          className="flex items-center justify-center w-8 h-8 text-xl text-[#1b162f] bg-white rounded-full"
        >
          +
        </button>
      </div>
      {notes.map((note, index) => (
        <div
          key={note.id}
          onClick={() => setCurrentNoteId(note.id)}
          className={`p-2 cursor-pointer rounded-md ${
            note.id === currentNote?.id ? "bg-[#2a2541] font-bold" : ""
          }`}
        >
          Note {index + 1}
        </div>
      ))}
    </div>
  );
};

export default React.memo(Sidebar);
