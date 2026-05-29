import { Award, Globe, BookOpen, Calendar, DollarSign } from "lucide-react";

export default function SchoolMatches({ schools }) {
  if (!schools?.length) return null;

  // Helper to extract tuition regardless of currency key
  const formatTuition = (s) => {
    const key = Object.keys(s).find(k => k.startsWith('tuition_'));
    return key ? `${s[key].toLocaleString()} ${key.split('_')[1].toUpperCase()}` : "Contact Uni";
  };

  return (
    <div className="bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl space-y-4">
      <div className="flex items-center gap-2">
        <Award className="text-emerald-400" size={18} />
        <h3 className="text-base font-bold text-white tracking-tight">
          Recommended Schools
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {schools.map((school, i) => (
          <div
            key={i}
            className="group bg-slate-950/40 border border-slate-800/60 rounded-xl p-4 transition-all duration-300 hover:border-slate-700/80 hover:bg-slate-950/80"
          >
            <h4 className="font-semibold text-slate-200 text-sm mb-3 group-hover:text-indigo-400 transition-colors">
              {school.name}
            </h4>
            
            <div className="space-y-2 text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <Globe size={12} /> {school.country}
              </div>
              <div className="flex items-center gap-2">
                <BookOpen size={12} /> {school.program}
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={12} /> Deadline: {school.deadline}
              </div>
              <div className="flex items-center gap-2">
                <DollarSign size={12} /> {formatTuition(school)}
              </div>
            </div>
            
            <p className="mt-3 text-[10px] text-slate-500 italic border-t border-slate-800 pt-2">
              {school.notes}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}