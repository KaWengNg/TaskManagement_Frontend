import type { Task } from "../types";
import { CheckCircle, Edit2, Trash2, XCircle } from "lucide-react";
import { toLocalTime } from "../utils/TimezoneConversion";

type Props = {
  tasks: Task[];
  onDelete: (id: string) => void;
  onEdit?: (task: Task) => void;
};

export default function TaskTable({
  tasks,
  onDelete,
  onEdit,
}: Props) {
  if (tasks.length === 0)
    return <p className="text-gray-500 text-center py-4">No tasks found.</p>;

  const handleDelete = (id: string, title: string) => {
    const confirmed = window.confirm(`Are you sure you want to delete "${title}"?`);
    if (confirmed) onDelete(id);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 border-collapse rounded-lg text-sm">
        <thead className="bg-gradient-to-r from-blue-50 to-blue-100 text-gray-700 text-xs tracking-wider border-b border-gray-300">
          <tr>
            <th className="px-4 py-3 text-center font-semibold w-12">#</th>
            <th className="px-4 py-3 text-left font-semibold">Title</th>
            <th className="px-4 py-3 text-left font-semibold">Description</th>
            <th className="px-4 py-3 text-center font-semibold">Status</th>
            <th className="px-4 py-3 text-center font-semibold w-12">Created At</th>
            <th className="px-4 py-3 text-center font-semibold w-12">Updated At</th>
            <th className="px-4 py-3 text-center font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((t, i) => (
            <tr
              key={t.id}
              className="border-b border-gray-200 hover:bg-blue-50 transition-colors duration-150"
            >
              <td className="px-4 py-3 text-center text-gray-700 font-medium">
                {i + 1}
              </td>
              <td className="px-4 py-3 font-medium">{t.title}</td>
              <td className="px-4 py-3 text-gray-600">{t.description || "—"}</td>

              <td className="px-4 py-3 text-center">
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
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
                      <XCircle size={14}/> Pending
                    </>
                  )}
                </span>
              </td>

              <td className="px-4 py-3 text-center text-gray-500 text-xs w-40">
                {toLocalTime(t.createdAt)}
              </td>
              <td className="px-4 py-3 text-center text-gray-500 text-xs w-40">
                {toLocalTime(t.updatedAt)}
              </td>

              <td className="px-4 py-3 text-center">
                <button
                  onClick={() => onEdit?.(t)}
                  className="text-blue-600 hover:text-blue-800 p-1"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => handleDelete(t.id, t.title)}
                  className="text-red-600 hover:text-red-800 p-1"
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
