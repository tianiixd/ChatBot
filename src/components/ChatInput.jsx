import { useState } from "react";

export default function ChatInput(props) {
  const { chatInput, isLoading } = props;
  const [inputValue, setInputValue] = useState("");

  const isInputEmpty = inputValue.trim() === "";
  const isDisabled = isLoading || isInputEmpty;

  const handleSend = (e) => {
    e.preventDefault();

    if (isDisabled) return;

    chatInput(inputValue);

    setInputValue("");
  };

  const resetText = (event) => {
    if (event.key === "Escape") {
      setInputValue("");
    }
  };

  return (
    <form onSubmit={handleSend} className="flex gap-3">
      <input
        type="text"
        placeholder="Send a message to Chatbot"
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
        onKeyDown={resetText}
        disabled={isLoading}
        className={`p-3 border-2 border-gray-300 outline-none rounded-md text-neutral-100 w-full bg-transparent transition-all duration-300 ease-in-out ${isLoading ? "cursor-not-allowed opacity-50" : "focus:border-sky-500 placeholder-gray-500 "}`}
      />
      <button
        type="submit"
        disabled={isDisabled}
        className={`py-1 px-5 rounded-lg text-neutral-100 transition-all duration-300 ease-in-out ${isDisabled ? "cursor-not-allowed bg-gray-600 text-neutral-300" : "bg-sky-700 cursor-pointer hover:bg-sky-800 "}`}
      >
        {isLoading ? "Wait" : "Send"}
      </button>
    </form>
  );
}
