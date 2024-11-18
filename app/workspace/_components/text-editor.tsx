"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import { api } from "@/convex/_generated/api";
import { chatSession } from "@/lib/aiModel";
import { cn, genPrompt } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useAction, useMutation, useQuery } from "convex/react";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  Highlighter,
  Italic,
  List,
  ListOrdered,
  Loader2,
  Quote,
  Sparkles,
  Strikethrough,
  UnderlineIcon,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useTransition } from "react";

export default function TextEditor() {
  const [isPending, startTransition] = useTransition();
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
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none min-h-[200px] max-w-none",
      },
    },
    autofocus: true,
  });
  const { fileId } = useParams();
  const { user } = useUser();
  const searchAi = useAction(api.myActions.search);
  const saveNote = useMutation(api.notes.saveNote);
  const savedNote = useQuery(api.notes.getNoteById, {
    fileId: fileId as string,
  });

  useEffect(() => {
    editor
      ?.chain()
      .focus()
      .setContent(savedNote as string)
      .run();
    // editor?.commands.setContent(savedNote as string);
  }, [savedNote, editor]);

  const onAiSelection = () => {
    startTransition(async () => {
      const selectedText = editor?.state.doc.textBetween(
        editor.state.selection.from,
        editor.state.selection.to,
        " "
      );
      if (selectedText) {
        const result = await searchAi({
          query: selectedText,
          fileId: fileId as string,
        });
        const unformattedResult = JSON.parse(result);
        let answer = "";
        unformattedResult.forEach((item: any) => {
          answer += item.pageContent + "\n";
        });

        const prompt = genPrompt(selectedText, answer);
        const aiResponse = await chatSession.sendMessage(prompt);
        const finalAnswer = aiResponse.response
          .text()
          .replace("html", "")
          .replace("```", "")
          .replace("```", "");
        editor
          ?.chain()
          .focus()
          .insertContent(`${selectedText}<br />${finalAnswer}`)
          .run();
        const allText = editor?.getHTML();
        await saveNote({
          fileId: fileId as string,
          createdBy: user?.primaryEmailAddress?.emailAddress as string,
          note: allText as string,
        });
      }
    });
  };

  const ToolbarToggle = useCallback(
    ({ isActive, onClick, icon: Icon, tooltip }: any) => {
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
        <Separator orientation="vertical" className="mx-1 h-6" />

        <Button
          size="sm"
          variant={"ghost"}
          // pressed={isActive}
          // onPressedChange={onClick}
          onClick={onAiSelection}
          className="hover:bg-muted data-[state=on]:bg-muted"
        >
          {isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="h-4 w-4 hover:bg-yellow-500" />
          )}
        </Button>
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
