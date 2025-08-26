"use client";

import React from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { NoteEditor } from "@/components/NoteEditor";
import { useAuth } from "@/lib/auth";
import {
  Note,
  createNote,
  deleteNote as apiDeleteNote,
  getNote,
  listNotes,
  updateNote,
} from "@/lib/api";
import { EmptyState } from "@/components/ui";
import { useRouter } from "next/navigation";

export default function NotesPage() {
  const { user, initialized } = useAuth();
  const router = useRouter();

  const [notes, setNotes] = React.useState<Note[]>([]);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [selected, setSelected] = React.useState<Note | null>(null);
  const [loadingList, setLoadingList] = React.useState(false);
  const [loadingNote, setLoadingNote] = React.useState(false);
  const [query, setQuery] = React.useState("");

  React.useEffect(() => {
    if (initialized && !user) {
      router.push("/auth/login");
    }
  }, [initialized, user, router]);

  const refreshList = React.useCallback(
    async (q?: string) => {
      setLoadingList(true);
      try {
        const data = await listNotes(q ?? query);
        setNotes(data);
        if (data.length > 0 && (!selectedId || !data.find((n) => n.id === selectedId))) {
          setSelectedId(data[0].id);
        } else if (data.length === 0) {
          setSelectedId(null);
          setSelected(null);
        }
      } finally {
        setLoadingList(false);
      }
    },
    [query, selectedId]
  );

  React.useEffect(() => {
    if (user) {
      refreshList();
    }
  }, [user, refreshList]);

  React.useEffect(() => {
    const fetchSelected = async () => {
      if (!selectedId) {
        setSelected(null);
        return;
      }
      setLoadingNote(true);
      try {
        const n = await getNote(selectedId);
        setSelected(n);
      } catch {
        // ignore
      } finally {
        setLoadingNote(false);
      }
    };
    fetchSelected();
  }, [selectedId]);

  const handleNew = async () => {
    const newNote = await createNote({ title: "Untitled", content: "" });
    await refreshList();
    setSelectedId(newNote.id);
  };

  const handleSave = async (payload: { title: string; content: string }) => {
    if (!selectedId) return;
    await updateNote(selectedId, payload);
    await refreshList();
  };

  const handleDelete = async () => {
    if (!selectedId) return;
    await apiDeleteNote(selectedId);
    await refreshList();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header onSearch={(q) => { setQuery(q); refreshList(q); }} />
      <div className="flex flex-1 h-[calc(100vh-56px)]">
        <Sidebar
          notes={notes}
          selectedId={selectedId}
          onSelect={(id) => setSelectedId(id)}
          onNew={handleNew}
        />
        <main className="flex-1 bg-white">
          {loadingNote && <div className="p-4 text-sm text-gray-500">Loading...</div>}
          {!loadingNote && (
            <>
              {selected ? (
                <NoteEditor
                  note={selected}
                  onSave={handleSave}
                  onDelete={handleDelete}
                />
              ) : (
                <EmptyState
                  title={loadingList ? "Loading notes..." : "No note selected"}
                  description="Choose a note from the sidebar or create a new note."
                />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
