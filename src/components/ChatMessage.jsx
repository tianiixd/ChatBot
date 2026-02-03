import dayjs from "dayjs";
import userImg from "../assets/user.png";
import botImg from "../assets/robot.png";

export default function ChatMessage(props) {
  const { message, isBot } = props;
  return (
    <div
      className={`flex w-full items-end gap-3 ${isBot ? "justify-start" : "justify-end"}`}
    >
      {isBot && (
        <div className="h-13 w-13 shrink-0 overflow-hidden rounded-full ">
          <img
            src={botImg}
            alt="Bot Image"
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <div
        className={`max-w-[50%] bg-white p-4 rounded-3xl wrap-break-words ${isBot ? "rounded-tl-none" : "rounded-tr-none"}`}
      >
        <p className="text-gray-800 text-justify leading-7">{message}</p>
        <p
          className={`text-[11px] mt-1 font-medium text-gray-400 ${isBot ? "text-left" : "text-right"}`}
        >
          {dayjs().format("h:mma")}
        </p>
      </div>

      {!isBot && (
        <div className="h-13 w-13 shrink-0 overflow-hidden rounded-full">
          <img
            src={userImg}
            alt="User Image"
            className="h-full w-full object-cover"
          />
        </div>
      )}
    </div>
  );
}
