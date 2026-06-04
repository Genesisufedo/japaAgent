import { useState } from "react";
import FileUpload from "./components/upload/FileUpload";
import ChatPanel from "./components/chat/ChatPanel";
import SchoolMatches from "./components/dashboard/SchoolMatches";
import Checklist from "./components/dashboard/Checklist";
import { useAnalyzeProfile } from "./hooks/useAnalyzeProfile";
import { useAgentChat } from "./hooks/useAgentChat";

export default function App() {
  const [files, setFiles] = useState({ cv: null, transcript: null });
  const [profile, setProfile] = useState({});
  const [schools, setSchools] = useState([]);
  const [checklist, setChecklist] = useState([]);
  const [messages, setMessages] = useState([]);
  const [analyzed, setAnalyzed] = useState(false);

  const { analyze, loading: analyzing } = useAnalyzeProfile();
  const { sendMessage, loading: chatting } = useAgentChat();

  const handleAnalyze = async () => {
    if (!files.cv || !files.transcript) return;

    try {
      const data = await analyze(files.cv, files.transcript);
      setProfile(data.profile || {});
      
    
      const topFiveSchools = (data.schools || []).slice(0, 6);
      setSchools(topFiveSchools);
      
      setChecklist(data.checklist || []);
      setMessages([{ 
        role: "assistant", 
        content: "Analysis complete. I've identified your top 5 school matches. How can I help you today?" 
      }]);
      setAnalyzed(true);
    } catch (err) {
      alert("Failed to analyze files. Please check the backend.");
    }
  };

  async function handleSendMessage(msg) {
    const history = [...messages, { role: "user", content: msg }];
    setMessages([...history, { role: "assistant", content: "" }]);
    await sendMessage(history, profile, schools, checklist, (chunk) => {
      setMessages(prev => {
        const next = [...prev];
        next[next.length - 1].content = chunk;
        return next;
      });
    });
  }

  return (
    <div className="min-h-screen bg-canvas text-text-main font-sans">
      <main className="max-w-7xl mx-auto px-4 py-8">
        {!analyzed ? (
          <div className="max-w-md mx-auto mt-12 p-8 bg-surface border border-border rounded-3xl shadow-sm">
            <h1 className="text-2xl font-bold mb-6 text-center">JapaPrep Agent</h1>
            <FileUpload onFilesSelected={(cv, tr) => setFiles({ cv, transcript: tr })} />
            
            <button 
              onClick={handleAnalyze}
              disabled={analyzing || !files.cv || !files.transcript}
              className={`mt-6 w-full py-3 rounded-xl font-semibold transition-all ${
                (!files.cv || !files.transcript || analyzing) 
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-primary hover:bg-primary-hover text-white'
              }`}
            >
              {analyzing ? "Evaluating..." : "Run Test"}
            </button>
          </div>
        ) : (
          <div className="flex flex-col xl:grid xl:grid-cols-12 gap-8">
            <div className="order-1 xl:col-span-12 p-4 bg-surface border border-border rounded-2xl shadow-sm flex gap-6 text-sm">
              <span className="font-semibold text-primary">Top 5 Schools Found</span>
              <span className="font-semibold text-primary">Checklist Items: {checklist.length}</span>
            </div>

            <div className="order-2 xl:col-span-5 space-y-6">
              <SchoolMatches schools={schools} />
              <Checklist items={checklist} />
            </div>

            <div className="order-3 xl:col-span-7 h-[50vh] xl:h-[70vh]">
              <ChatPanel messages={messages} onSend={handleSendMessage} loading={chatting} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}