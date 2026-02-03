import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function ChatInput(props) {
  const { chatInput, isLoading, chatMessages, setChatMessages } = props;
  const [inputValue, setInputValue] = useState("");

  const isInputEmpty = inputValue.trim() === "";
  const isDisabled = isLoading || isInputEmpty;
  const hasMessages = chatMessages && chatMessages.length > 0;

  const resetData = () => {
    if (hasMessages) {
      localStorage.removeItem("messages");
      setChatMessages([]);
    }
  };

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
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button
            type="button"
            disabled={!hasMessages}
            className={`py-1 px-5 rounded-lg text-neutral-100 transition-all duration-300 ${
              hasMessages
                ? "bg-red-600 hover:bg-red-700 cursor-pointer "
                : "bg-gray-600 cursor-not-allowed "
            }`}
          >
            Reset
          </button>
        </AlertDialogTrigger>

        <AlertDialogContent className="bg-gray-800 border-gray-700 text-neutral-100">
          <AlertDialogHeader>
            <AlertDialogTitle className="select-none">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400 select-none">
              This action cannot be undone. This will permanently delete your
              current conversation history.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-700 text-white hover:bg-gray-600 hover:text-white border-none cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={resetData}
              className="bg-red-600 hover:bg-red-700 text-white border-none cursor-pointer"
            >
              Delete Everything
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </form>
  );
}
