type Props = {
  value: "all" | "completed" | "incomplete";
  onChange: (v: "all" | "completed" | "incomplete") => void;
};

export default function FilterBar({ value, onChange }: Props) {
  const filters: Props["value"][] = ["all", "completed", "incomplete"];
  return (
    <div className="flex gap-2">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => onChange(f)}
          className={`px-3 py-1 rounded-lg border ${
            f === value ? "bg-indigo-600 text-white" : "bg-white hover:bg-gray-100"
          }`}
        >
          {f[0].toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
}
