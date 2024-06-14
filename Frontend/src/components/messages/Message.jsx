import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../Zustand/useConversation.jsx";
import { extractTime } from "../../utils/extractTime.js";
import { useEffect } from "react";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const formattedTime = extractTime(message.createdAt);
  console.log("formattedTime:", formattedTime);
  console.log("messageCreatedAt:", message.createdAt);
  const fromMe = message.senderId === authUser._id;
  console.log("fromme:", fromMe);
  // Get current time

  console.log("message:", message);

  const chatClassName = fromMe ? "chat-end" : "chat-start";
  console.log("chatClassName:", chatClassName);
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";

  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full'>
          <img alt='Tailwind CSS chat bubble component' src={profilePic} />
        </div>
      </div>
      <div
        className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>
        {message.message}
      </div>
      <div className='chat-footer opacity-50 text-xs flex gap-1 items-center text-red-50'>
        {formattedTime}
      </div>
    </div>
  );
};
export default Message;
