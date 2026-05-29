export default function ChatPanel({ messages, onSend, loading }) {
  return (

    <div className="flex flex-col h-full bg-slate-800/60 backdrop-blur-md border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl">
      
     
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((m, i) => (
          <div key={i} className={`flex w-full ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm text-white ${
              m.role === 'user' 
                ? 'bg-primary text-slate-950 font-bold rounded-br-none' 
                : 'bg-slate-700/80 text-white rounded-bl-none border border-slate-600/50'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-700/80 text-white p-4 rounded-2xl rounded-bl-none text-sm animate-pulse border border-slate-600/50">
              Agent is thinking...
            </div>
          </div>
        )}
      </div>

   
      <div className="p-4 border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        <input 
          className="w-full bg-slate-800/80 border border-slate-600 rounded-xl p-3 text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="Ask a question..."
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.target.value.trim()) {
              onSend(e.target.value);
              e.target.value = '';
            }
          }}
        />
      </div>
    </div>
  );
}