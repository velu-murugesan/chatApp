import { useEffect, useRef } from "react";
import UseGetMessages from "../../hooks/UseGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessage from "../../hooks/useListenMessage";

const Messages = () => {
  const { messages, loading } = UseGetMessages();
  const lastMessageRef = useRef();
  useListenMessage();

  console.log("messages:", messages);

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);
  return (
    <div className='px-4 flex-1 overflow-auto'>
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className='text-center text-red-50'>
          Send a message to start the conversation
        </p>
      )}
    </div>
  );
};
export default Messages;
