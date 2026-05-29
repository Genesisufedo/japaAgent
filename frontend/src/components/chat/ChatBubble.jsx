export default function ChatBubble({ role, content }) {
  const isUser = role === 'user';
  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div 
        className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm shadow-sm ${
          isUser 
            ? 'bg-[#24C2A5] text-white rounded-br-none' 
            : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
        }`}
      >
        {content}
      </div>
    </div>
  );
}