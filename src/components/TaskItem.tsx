import { useState } from "react";
import type { Task, UpdateTask } from "../types";

type Props = {
  task: Task;
  onUpdate: (id: string, payload: UpdateTask) => void;
  onDelete: (id: string) => void;
  updating?: boolean;
  deleting?: boolean;
};

export default function TaskItem({ task, onUpdate, onDelete, updating, deleting }: Props) {
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [desc, setDesc] = useState(task.description ?? "");
  const [completed, setCompleted] = useState(task.completed);

  const save = () => {
    onUpdate(task.id, { title, description: desc, completed });
    setEdit(false);
  };

  return (
    <div className="border rounded-lg p-4 flex flex-col gap-2 bg-white">
      {edit ? (
        <>
          <input
            className="border rounded p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="border rounded p-2"
            rows={2}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
            />
            Completed
          </label>
          <div className="flex gap-2">
            <button
              onClick={save}
              disabled={updating}
              className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 disabled:opacity-60"
            >
              {updating ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => setEdit(false)}
              className="border px-3 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() =>
                onUpdate(task.id, {
                  title: task.title,
                  description: task.description,
                  completed: !task.completed,
                })
              }
            />
            <h3
              className={`text-lg font-medium ${
                task.completed ? "line-through text-gray-400" : ""
              }`}
            >
              {task.title}
            </h3>
          </div>
          {task.description && (
            <p className="text-gray-600 ml-6">{task.description}</p>
          )}
          <div className="flex gap-2 ml-6 mt-2">
            <button
              onClick={() => setEdit(true)}
              className="border px-3 py-1 rounded hover:bg-gray-100"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task.id)}
              disabled={deleting}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 disabled:opacity-60"
            >
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
