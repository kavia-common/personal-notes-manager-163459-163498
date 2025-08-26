"use client";

import React from "react";
import { useAuth } from "@/lib/auth";
import { Button, Input } from "./ui";
import Link from "next/link";

export function Header({
  onSearch,
}: {
  onSearch?: (q: string) => void;
}) {
  const { user, logout } = useAuth();
  const [q, setQ] = React.useState("");

  return (
    <header className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 bg-white">
      <div className="font-semibold text-primary">Notes</div>
      <div className="flex-1 max-w-2xl">
        <Input
          placeholder="Search notes..."
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            onSearch?.(e.target.value);
          }}
        />
      </div>
      <div className="flex items-center gap-2">
        {user ? (
          <>
            <span className="text-sm text-secondary">{user.email}</span>
            <Button variant="ghost" onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link href="/auth/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/auth/signup">
              <Button variant="primary">Sign up</Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
