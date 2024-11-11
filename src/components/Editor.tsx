import React, { useEffect, useState, useCallback } from "react";
import MDEditor from "@uiw/react-md-editor";
import { debounce } from "lodash";

interface EditorProps {
  currentNote: { id: string; body: string };
  updateNote: (text: string) => void;
}

const useEditorContent = (initialContent: string, updateNote: (text: string) => void) => {
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  const debouncedUpdateNote = useCallback(
    debounce((value: string) => {
      updateNote(value);
    }, 300),
    [updateNote]
  );

  const handleContentChange = useCallback((value: string | undefined) => {
    const newValue = value || "";
    setContent(newValue);
    if (value !== undefined) {
      debouncedUpdateNote(newValue);
    }
  }, [debouncedUpdateNote]);

  return { content, handleContentChange };
};

const Editor: React.FC<EditorProps> = ({ currentNote, updateNote }) => {
  const { content, handleContentChange } = useEditorContent(currentNote.body, updateNote);

  return (
    <section className="w-full h-full p-4 overflow-y-auto">
      <MDEditor
        value={content}
        onChange={handleContentChange}
        height={window.innerHeight - 64}
        className="h-full markdown-editor"

      />
    </section>
  );
};

export default React.memo(Editor);