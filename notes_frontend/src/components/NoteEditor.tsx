"use client";

import React from "react";
import { Button, Input, Textarea } from "./ui";
import { Note } from "@/lib/api";

export function NoteEditor({
  note,
  onSave,
  onDelete,
}: {
  note: Note | null;
  onSave: (payload: { title: string; content: string }) => Promise<void>;
  onDelete: () => Promise<void>;
}) {
  const [title, setTitle] = React.useState(note?.title || "");
  const [content, setContent] = React.useState(note?.content || "");
  const [saving, setSaving] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);

  React.useEffect(() => {
    setTitle(note?.title || "");
    setContent(note?.content || "");
  }, [note?.id, note?.title, note?.content]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave({ title, content });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!note) return;
    if (!confirm("Delete this note?")) return;
    setDeleting(true);
    try {
      await onDelete();
    } finally {
      setDeleting(false);
    }
  };

  if (!note) {
    return (
      <div className="p-6 text-gray-500">
        Select a note or create a new one.
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 p-4 border-b border-gray-200">
        <Input
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </Button>
        <Button variant="ghost" onClick={handleDelete} disabled={deleting}>
          {deleting ? "Deleting..." : "Delete"}
        </Button>
      </div>
      <div className="p-4 flex-1 overflow-y-auto">
        <Textarea
          placeholder="Write your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[60vh]"
        />
      </div>
    </div>
  );
}
