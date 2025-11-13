import { useEffect, useState } from "react";
import { BuggysAPI } from "./lib/api";
import BuggyItem from "./components/BuggyItem";

export default function App() {
  const [buggys, setBuggys] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const list = await BuggysAPI.list();
        setBuggys(list);
      } catch (e) {
        setError("Failed to load buggys");
      }
    })();
  }, []);

  async function addBuggy(e) {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      const buggy = await BuggysAPI.create(title.trim());
      setBuggy((prev) => [...prev, buggy]);
      setTitle("");
    } catch {
      setError("Failed to add");
    }
  }

  async function toggle(buggy) {
    const updated = await BuggysAPI.update(buggy._id, { completed: !buggy.completed });
    setBuggy(prev => prev.map(t => (t._id === buggy._id ? updated : t)));
  }

  async function remove(buggy) {
    await BuggyAPI.remove(buggy._id);
    setBuggy(prev => prev.filter(t => t._id !== buggy._id));
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4"> Buggy App (Test your app for bugs!!)</h1>

      <form onSubmit={addBuggy} className="flex gap-2 mb-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New Bug"
          className="flex-1 border px-3 py-2 rounded"
          aria-label="new-buggy-input"
        />
        <button className="bg-black text-white px-4 py-2 rounded">Add</button>
      </form>

      {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

      <ul>
        {buggys.map((buggy) => (
          <BuggyItem
            key={buggy._id}
            buggy={buggy}
            onToggle={toggle}
            onDelete={remove}
          />
        ))}
      </ul>
    </div>
  );
}
