import type { FormEvent } from "react";
import { useState } from "react";
import type { CreateTask } from "../types";

type Props = {
  onSubmit: (payload: CreateTask) => void;
  loading?: boolean;
};

export default function TaskForm({ onSubmit, loading }: Props) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handle = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ title: title.trim(), description: desc.trim() || undefined });
    setTitle("");
    setDesc("");
  };

  return (
    <form onSubmit={handle} className="flex flex-col gap-3">
      <input
        className="border rounded-lg p-2 focus:ring focus:ring-indigo-200"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className="border rounded-lg p-2 focus:ring focus:ring-indigo-200"
        placeholder="Description (optional)"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        rows={3}
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg py-2 px-4 disabled:opacity-60"
      >
        {loading ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
}
