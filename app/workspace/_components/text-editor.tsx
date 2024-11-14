"use client";

import { useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import {
  Bold,
  Italic,
  UnderlineIcon,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Heading1,
  Heading2,
  Highlighter,
  List,
  ListOrdered,
  Quote,
} from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function TextEditor() {
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
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none min-h-[200px] max-w-none",
      },
    },
    autofocus: true,
  });

  const ToolbarToggle = useCallback(
    ({ isActive, onClick, icon: Icon, tooltip }) => {
      return (
        <Toggle
          size="sm"
          pressed={isActive}
          onPressedChange={onClick}
          className="hover:bg-muted data-[state=on]:bg-muted"
        >
          <Icon className="h-4 w-4" />
          <span className="sr-only">{tooltip}</span>
        </Toggle>
      );
    },
    []
  );

  if (!editor) {
    return null;
  }

  return (
    <div className="border rounded-lg shadow-sm bg-card text-card-foreground">
      <div className="flex flex-wrap items-center gap-1 p-2 border-b bg-muted/50">
        <ToolbarToggle
          isActive={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
          icon={Bold}
          tooltip="Bold"
        />
        <ToolbarToggle
          isActive={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          icon={Italic}
          tooltip="Italic"
        />
        <ToolbarToggle
          isActive={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          icon={UnderlineIcon}
          tooltip="Underline"
        />
        <ToolbarToggle
          isActive={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          icon={Strikethrough}
          tooltip="Strikethrough"
        />
        <ToolbarToggle
          isActive={editor.isActive("highlight")}
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          icon={Highlighter}
          tooltip="Highlight"
        />
        <Separator orientation="vertical" className="mx-1 h-6" />
        <ToolbarToggle
          isActive={editor.isActive("heading", { level: 1 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          icon={Heading1}
          tooltip="Heading 1"
        />
        <ToolbarToggle
          isActive={editor.isActive("heading", { level: 2 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          icon={Heading2}
          tooltip="Heading 2"
        />
        <Separator orientation="vertical" className="mx-1 h-6" />
        <ToolbarToggle
          isActive={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          icon={List}
          tooltip="Bullet List"
        />
        <ToolbarToggle
          isActive={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          icon={ListOrdered}
          tooltip="Ordered List"
        />
        <ToolbarToggle
          isActive={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          icon={Quote}
          tooltip="Blockquote"
        />
        <Separator orientation="vertical" className="mx-1 h-6" />
        <ToolbarToggle
          isActive={editor.isActive({ textAlign: "left" })}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          icon={AlignLeft}
          tooltip="Align Left"
        />
        <ToolbarToggle
          isActive={editor.isActive({ textAlign: "center" })}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          icon={AlignCenter}
          tooltip="Align Center"
        />
        <ToolbarToggle
          isActive={editor.isActive({ textAlign: "right" })}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          icon={AlignRight}
          tooltip="Align Right"
        />
        <ToolbarToggle
          isActive={editor.isActive({ textAlign: "justify" })}
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          icon={AlignJustify}
          tooltip="Justify"
        />
      </div>
      <EditorContent
        editor={editor}
        className={cn(
          "p-4 overflow-y-auto max-h-[600px] focus:outline-none min-h-screen",
          "transition-shadow duration-200 ease-in-out"
        )}
      />
    </div>
  );
}
