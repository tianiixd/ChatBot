import { useState } from "react";
import ChatInput from "./components/ChatInput";
import ChatMessages from "./components/ChatMessages";
import { Chatbot } from "./utils/chatbot";

export default function App() {
  const [chatMessages, setChatMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const chatInput = async (text) => {
    const userMessage = {
      id: crypto.randomUUID(),
      message: text,
      isBot: false,
    };
    setChatMessages((prev) => [...prev, userMessage]);

    setIsLoading(true);

    const replyText = await Chatbot.getResponseAsync(text);
    const botMessage = {
      id: crypto.randomUUID(),
      message: replyText,
      isBot: true,
    };
    setChatMessages((prev) => [...prev, botMessage]);
    setIsLoading(false);
  };

  return (
    <div className="flex items-center flex-col min-h-screen w-full bg-gray-800 py-10">
      <div className="flex flex-col items-center justify-center w-full px-4 pt-10 pb-6 text-center z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight animate-fade-in-appear bg-linear-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent drop-shadow-sm">
          Hello World!
        </h1>

        <p className="mt-4 text-sm sm:text-base md:text-lg text-neutral-400 max-w-[90%] sm:max-w-lg leading-relaxed animate-fade-in-appear animation-delay-200">
          {chatMessages.length === 0
            ? "Welcome to the chatbot project! Send a message below to start the conversation."
            : "Project Context Active"}
        </p>
      </div>
      <div className="flex w-full max-w-3xl flex-col gap-10 p-4 pb-10 animate-fade-in-appear">
        <ChatMessages chatMessages={chatMessages} isLoading={isLoading} />
      </div>

      <div className="fixed bottom-0 w-full bg-gray-800 p-4 border-t border-gray-700 flex justify-center z-50 animate-fade-in-appear">
        <div className="w-full max-w-3xl">
          <ChatInput chatInput={chatInput} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
