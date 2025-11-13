export default function BuggyItem({ buggy, onToggle, onDelete }) {
  return (
    <li
      className="flex items-center justify-between gap-3 border-b py-2"
      data-testid="buggy-item"
    >
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={buggy.completed}
          onChange={() => onToggle(buggy)}
          aria-label={`toggle-${buggy.title}`}
        />
        <span
          className={`${
            buggy.completed ? "line-through text-gray-400" : "text-gray-900"
          }`}
        >
          {buggy.title}
        </span>
      </label>

      <button
        onClick={() => onDelete(buggy)}
        className="text-red-600 text-sm"
        aria-label={`delete-${buggy.title}`}
      >
        Delete
      </button>
    </li>
  );
}
