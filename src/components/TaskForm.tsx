import type { FormEvent } from "react";
import { useState, useEffect } from "react";
import type { CreateTask, Task } from "../types";

type Props = {
  onSubmit: (payload: CreateTask & { completed?: boolean }) => void;
  mode?: "create" | "edit";
  initialTask?: Task | null;
};

export default function TaskForm({
  onSubmit,
  mode = "create",
  initialTask = null,
}: Props) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title || "");
      setDesc(initialTask.description || "");
      setCompleted(initialTask.completed || false);
    } else {
      setTitle("");
      setDesc("");
      setCompleted(false);
    }
  }, [initialTask]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      title: title.trim(),
      description: desc.trim() || undefined,
      completed,
    });

    if (mode === "create") {
      setTitle("");
      setDesc("");
      setCompleted(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 w-full max-w-3xl mx-auto"
    >
      {/* Title */}
      <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-3">
        <label
          htmlFor="title"
          className="font-semibold text-gray-700 sm:text-right sm:pr-4"
        >
          Title
        </label>
        <div className="sm:col-span-3">
          <input
            id="title"
            className="w-full border rounded-lg p-2 focus:ring focus:ring-orange-200 focus:outline-none"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
      </div>

      {/* Description */}
      <div className="grid grid-cols-1 sm:grid-cols-4 items-start gap-3">
        <label
          htmlFor="description"
          className="font-semibold text-gray-700 sm:text-right sm:pr-4 mt-1"
        >
          Description
        </label>
        <div className="sm:col-span-3">
          <textarea
            id="description"
            className="w-full border rounded-lg p-2 focus:ring focus:ring-orange-200 focus:outline-none"
            placeholder="Description (optional)"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows={3}
          />
        </div>
      </div>

      {/* Completed Checkbox (edit mode only) */}
      {mode === "edit" && (
        <div className="flex items-center gap-3 mt-2 cursor-pointer select-none sm:pl-[25%]">
          <input
            id="completed"
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-400"
          />
          <label
            htmlFor="completed"
            className="text-gray-700 font-medium cursor-pointer"
          >
            Mark as Completed
          </label>
        </div>
      )}

      {/* Buttons */}
      <div className="flex justify-center gap-6 mt-8">
        <button
          type="submit"
          className={`${
            mode === "edit"
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-orange-500 hover:bg-orange-600"
          } text-white font-medium rounded-lg py-2 px-8 transition disabled:opacity-60`}
        >
          {mode === "edit"
            ? "Update Task"
            : "Add Task"}
        </button>

        <button
          type="button"
          onClick={() =>
            (document.getElementById(
              mode === "edit" ? "editTaskModal" : "createTaskModal"
            ) as HTMLDialogElement)?.close()
          }
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg py-2 px-8"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
