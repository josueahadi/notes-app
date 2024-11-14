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
    <div className="flex flex-col w-full h-full px-2   sm:px-4 py-4 text-white bg-[#1b162f] md:w-1/4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold sm:text-xl">Notes</h3>
        <button
          onClick={newNote}
          className="flex items-center justify-center w-6 sm:w-7 h-6 sm:h-7 text-xl text-[#1b162f] bg-white rounded-full"
        >
          +
        </button>
      </div>
      {notes.map((note, index) => (
        <div
          key={note.id}
          onClick={() => setCurrentNoteId(note.id)}
          className={`p-2 cursor-pointer rounded-md ${
            note.id === currentNote?.id ? "bg-[#2a2541] font-medium sm:font-semibold text-sm sm:text-sm" : ""
          }`}
        >
          Note {index + 1}
        </div>
      ))}
    </div>
  );
};

export default React.memo(Sidebar);
