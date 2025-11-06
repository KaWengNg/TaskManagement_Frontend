import { useEffect, useState } from "react";
import axios from "axios";
import type { Task, CreateTask, UpdateTask } from "./types";
import TaskForm from "./components/TaskForm";
import TaskTable from "./components/TaskTable";

const API_BASE = `${import.meta.env.VITE_API_BASE_URL}/api/tasks`;

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);

      const params: Record<string, any> = { page, pageSize };
      if (filter === "completed") params.completed = true;
      if (filter === "pending") params.completed = false;

      const { data } = await axios.get(API_BASE, { params });

      setTasks(data.tasks || []);
      setTotalCount(data.total || 0);
    } catch {
      setError("Failed to fetch tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filter, page]);

  // --- Create ---
  const handleCreate = async (payload: CreateTask) => {
    try {
      await axios.post(API_BASE, payload);
      setPage(1); 
      await fetchTasks();
      (document.getElementById("createTaskModal") as HTMLDialogElement)?.close();
    } catch {
      alert("Failed to create task.");
    }
  };

  // --- Update ---
  const handleUpdate = async (id: string, payload: UpdateTask) => {
    try {
      await axios.put(`${API_BASE}/${id}`, payload);
      await fetchTasks();
      (document.getElementById("editTaskModal") as HTMLDialogElement)?.close();
      setEditingTask(null);
    } catch {
      alert("Failed to update task.");
    }
  };

  // --- Delete ---
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_BASE}/${id}`);
      await fetchTasks();
    } catch {
      alert("Failed to delete task.");
    }
  };

  const handleEditClick = (task: Task) => {
    setEditingTask(task);
    (document.getElementById("editTaskModal") as HTMLDialogElement)?.showModal();
  };

  return (
    <div className="max-w-5xl mx-auto p-6 flex flex-col gap-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Task Management Dashboard
        </h1>
      </header>

      <div className="bg-white rounded-xl shadow p-5 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-3">
            <select
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value as any);
                setPage(1);
              }}
              className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>

            <button
              onClick={() =>
                (document.getElementById("createTaskModal") as HTMLDialogElement)?.showModal()
              }
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow transition-colors"
            >
              + Create Task
            </button>
          </div>
        </div>

        {error && (
          <div className="text-red-700 bg-red-100 border border-red-300 rounded-lg p-3 text-center">
            {error}
            <button onClick={fetchTasks} className="underline ml-2">
              Retry
            </button>
          </div>
        )}

        {loading ? (
          <div className="text-center py-10 text-gray-500 animate-pulse">
            Loading tasks...
          </div>
        ) : (
          <>
            <TaskTable tasks={tasks} onDelete={handleDelete} onEdit={handleEditClick} />

            <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-gray-200 text-sm text-gray-600">
              <p>
                Showing <span className="font-medium">{tasks.length}</span> of{" "}
                <span className="font-medium">{totalCount}</span> tasks
              </p>

              <div className="flex items-center gap-2 mt-3 sm:mt-0">
                <button
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className="px-3 py-1 border rounded-md hover:bg-gray-100 disabled:opacity-50"
                >
                  Prev
                </button>
                <span>
                  Page <span className="font-medium">{page}</span> of{" "}
                  <span className="font-medium">{totalPages}</span>
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                  disabled={page >= totalPages}
                  className="px-3 py-1 border rounded-md hover:bg-gray-100 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <dialog id="createTaskModal" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Create New Task
          </h3>
          <TaskForm onSubmit={handleCreate} />
        </div>
      </dialog>

      <dialog id="editTaskModal" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Edit Task</h3>
          {editingTask && (
            <TaskForm
              onSubmit={(payload) => handleUpdate(editingTask.id, payload)}
              mode="edit"
              initialTask={editingTask}
            />
          )}
        </div>
      </dialog>
    </div>
  );
}
