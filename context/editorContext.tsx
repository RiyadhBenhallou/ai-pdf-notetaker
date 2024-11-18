"use client";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { Editor, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { createContext, ReactNode } from "react";

// Define the context type
interface EditorContextType {
  editor: Editor | null; // `editor` can be null before initialization
}

// Create the context outside the component
const EditorContext = createContext<EditorContextType | undefined>(undefined);

export default function EditorProvider({ children }: { children: ReactNode }) {
  // Initialize the editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start writing your masterpiece…",
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
    ],
    content: "",
    editorProps: {
      attributes: {
        className:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none min-h-[200px] max-w-none",
      },
    },
    autofocus: true,
  });

  return (
    <EditorContext.Provider value={{ editor }}>
      {children}
    </EditorContext.Provider>
  );
}
