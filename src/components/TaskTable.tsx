import type { Task, UpdateTask } from "../types";
import { format } from "date-fns";
import { CheckCircle, Edit2, Trash2, XCircle } from "lucide-react";

type Props = {
  tasks: Task[];
  onUpdate: (id: string, payload: UpdateTask) => void;
  onDelete: (id: string) => void;
  updatingId?: string | null;
  deletingId?: string | null;
};

export default function TaskTable({
  tasks,
  onUpdate,
  onDelete,
  updatingId,
  deletingId,
}: Props) {
  if (tasks.length === 0)
    return (
      <p className="text-gray-500 text-center py-4">
        No tasks found.
      </p>
    );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden text-sm">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            <th className="px-4 py-3 text-left">Title</th>
            <th className="px-4 py-3 text-left">Description</th>
            <th className="px-4 py-3 text-center">Status</th>
            <th className="px-4 py-3 text-center">Created At</th>
            <th className="px-4 py-3 text-center">Updated At</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t) => (
            <tr
              key={t.id}
              className="border-t hover:bg-gray-50 transition-colors"
            >
              <td className="px-4 py-3 font-medium">{t.title}</td>
              <td className="px-4 py-3 text-gray-600">
                {t.description || "No Description"}
              </td>
              <td className="px-4 py-3 text-center">
                <span
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                    t.completed
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {t.completed ? (
                    <>
                      <CheckCircle size={14} /> Completed
                    </>
                  ) : (
                    <>
                      <XCircle size={14} /> Pending
                    </>
                  )}
                </span>
              </td>
              <td className="px-4 py-3 text-center text-gray-500">
                {format(new Date(t.createdAt), "MMM dd")}
              </td>
              <td className="px-4 py-3 text-center text-gray-500">
                {format(new Date(t.updatedAt), "MMM dd")}
              </td>
              <td className="px-4 py-3 text-center space-x-2">
                <button
                  onClick={() =>
                    onUpdate(t.id, { ...t, description: t.description ?? undefined, completed: !t.completed })
                  }
                  disabled={updatingId === t.id}
                  className="text-blue-600 hover:text-blue-800 disabled:opacity-50"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => onDelete(t.id)}
                  disabled={deletingId === t.id}
                  className="text-red-600 hover:text-red-800 disabled:opacity-50"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
