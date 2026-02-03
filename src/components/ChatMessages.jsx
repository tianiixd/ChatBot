import ChatMessage from "./ChatMessage";
import botImg from "../assets/robot.png";
import useAutoScroll from "../hooks/useAutoScroll";

export default function ChatMessages(props) {
  const { chatMessages, isLoading } = props;
  const scrollRef = useAutoScroll([chatMessages, isLoading]);

  return (
    <>
      {chatMessages.map((chatMessage) => {
        return (
          <ChatMessage
            key={chatMessage.id}
            message={chatMessage.message}
            isBot={chatMessage.isBot}
            time={chatMessage.time}
          />
        );
      })}

      {isLoading && (
        <div className="flex w-full items-end gap-3 justify-start">
          <div className="h-13 w-13 shrink-0 overflow-hidden rounded-full">
            <img
              src={botImg}
              alt="Bot"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="bg-white p-4 rounded-3xl rounded-tl-none">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            </div>
          </div>
        </div>
      )}

      <div ref={scrollRef} />
    </>
  );
}
/*
  OR LIKE THIS IF GUSTO MO MAS MORE SHORTER CODE
return chatMessages.map((chatMessage) => {
    return (
      <ChatMessage
        message={chatMessage.message}
        isBot={chatMessage.isBot}
        key={chatMessage.id}
      />
    );
  });

  */
