import React from "react";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import Split from "react-split";
import { nanoid } from "nanoid";

interface Note {
  id: string;
  body: string;
}

export default function App() {
  const [notes, setNotes] = React.useState<Note[]>([]);
  const [currentNoteId, setCurrentNoteId] = React.useState<string>(
    (notes[0] && notes[0].id) || ""
  );

  React.useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const createNewNote = React.useCallback(() => {
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown note's title here",
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.id);
  }, []);

  const updateNote = (text: string) => {
    setNotes((oldNotes) =>
      oldNotes.map((oldNote) =>
        oldNote.id === currentNoteId ? { ...oldNote, body: text } : oldNote
      )
    );
  };

  const findCurrentNote = () => {
    return notes.find((note) => note.id === currentNoteId) || notes[0];
  };

  return (
    <main className="flex h-screen">
      {notes.length > 0 ? (
        <Split
          sizes={[25, 75]}
          direction="horizontal"
          className="flex w-full"
          style={{ height: "100vh" }}
          gutterSize={10}
          gutterAlign="center"
          gutter={() => {
            const gutter = document.createElement("div");
            gutter.className = "gutter";
            return gutter;
          }}
        >
          <Sidebar
            notes={notes}
            currentNote={findCurrentNote()}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
          />
          {currentNoteId && notes.length > 0 && (
            <Editor currentNote={findCurrentNote()} updateNote={updateNote} />
          )}
        </Split>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <h1 className="mb-4 text-2xl font-bold">You have no notes</h1>
          <button
            onClick={createNewNote}
            className="px-4 py-2 text-white transition bg-[#1b162f] rounded-md hover:bg-indigo-500"
          >
            Create one now
          </button>
        </div>
      )}
    </main>
  );
}
