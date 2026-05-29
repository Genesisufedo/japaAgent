import { CheckCircle } from "lucide-react";

export default function Checklist({ items }) {
  if (!items?.length) return null;

  return (
    <div className="bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl space-y-4">
      <h3 className="text-base font-bold text-white tracking-tight">
        Milestone Strategy Matrix
      </h3>
      <div className="space-y-2">
        {items.map((item, i) => {
        
          const taskText = typeof item === 'string' ? item : (item.task || "Missing Task Name");
          
       
          const dateText = (typeof item === 'object' && item.date) ? item.date : "Asap";
          
          return (
            <div
              key={i}
              className="flex gap-3 items-center justify-between p-3 bg-slate-950/20 border border-slate-800/40 rounded-xl"
            >
              <div className="flex gap-3 items-center">
                <CheckCircle size={15} className="text-indigo-500 shrink-0" />
                <p className="font-medium text-slate-300 text-xs tracking-tight">
                  {taskText}
                </p>
              </div>
              <span className="text-[10px] font-semibold text-slate-500 px-2 py-0.5 bg-slate-900 border border-slate-800/60 rounded-md tracking-wide">
                {dateText}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}