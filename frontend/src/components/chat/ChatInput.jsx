import { useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ChatInput({ onSend, disabled }) {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (!value.trim() || disabled) return;
    onSend(value);
    setValue("");
  };

  return (
    <div className="p-3 bg-slate-900/40 backdrop-blur-sm border-t border-slate-700/50 flex gap-2 items-center">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        placeholder="Query program match deviations, SOP rules, or funding metrics..."
        disabled={disabled}
        className="flex-1 min-w-0 px-4 py-2.5 bg-slate-950/50 border border-slate-700/50 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all disabled:opacity-50"
      />
      <button
        onClick={handleSubmit}
        disabled={disabled || !value.trim()}
        className="h-9 w-9 inline-flex items-center justify-center rounded-xl bg-primary text-slate-950 hover:bg-primary-hover active:scale-95 disabled:opacity-30 disabled:scale-100 transition-all shadow-lg shadow-primary/20 shrink-0"
      >
        <ArrowUp size={16} strokeWidth={3} />
      </button>
    </div>
  );
}