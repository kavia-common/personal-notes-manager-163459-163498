"use client";

import React from "react";
import { Note } from "@/lib/api";
import { Button } from "./ui";
import { cn } from "@/utils/cn";

export function Sidebar({
  notes,
  selectedId,
  onSelect,
  onNew,
}: {
  notes: Note[];
  selectedId?: string | null;
  onSelect: (id: string) => void;
  onNew: () => void;
}) {
  return (
    <aside className="w-72 border-r border-gray-200 bg-white flex flex-col">
      <div className="p-3">
        <Button className="w-full" onClick={onNew}>
          + New note
        </Button>
      </div>
      <div className="overflow-y-auto flex-1">
        {notes.length === 0 ? (
          <div className="p-4 text-sm text-gray-500">No notes yet.</div>
        ) : (
          <ul className="p-2 space-y-1">
            {notes.map((n) => (
              <li key={n.id}>
                <button
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-md hover:bg-gray-100",
                    selectedId === n.id ? "bg-gray-100" : ""
                  )}
                  onClick={() => onSelect(n.id)}
                >
                  <div className="font-medium text-gray-800 truncate">
                    {n.title || "Untitled"}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {new Date(n.updatedAt).toLocaleString()}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}
