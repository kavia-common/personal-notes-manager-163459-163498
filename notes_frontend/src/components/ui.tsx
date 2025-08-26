"use client";

import React from "react";
import { cn } from "../utils/cn";

export function Button({
  children,
  className,
  variant = "primary",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" }) {
  const styles = {
    primary:
      "bg-primary text-white hover:bg-primary/90 focus:ring-2 focus:ring-accent",
    secondary:
      "bg-secondary text-white hover:bg-secondary/90 focus:ring-2 focus:ring-accent",
    ghost:
      "bg-transparent text-primary hover:bg-gray-100 focus:ring-2 focus:ring-accent",
  }[variant];
  return (
    <button
      className={cn(
        "px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none",
        styles,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full px-3 py-2 rounded-md border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none",
        className
      )}
      {...props}
    />
  );
}

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "w-full px-3 py-2 rounded-md border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none min-h-[200px]",
        className
      )}
      {...props}
    />
  );
}

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "bg-white border border-gray-200 rounded-lg shadow-sm",
        className
      )}
      {...props}
    />
  );
}

export function Separator({ className }: { className?: string }) {
  return <div className={cn("h-px w-full bg-gray-200", className)} />;
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="text-center text-gray-500 p-6">
      <p className="text-lg font-medium text-gray-700">{title}</p>
      {description && <p className="mt-1">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
