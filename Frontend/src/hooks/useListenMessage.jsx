import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../Zustand/useConversation";

import notification from "../../src/assets/sounds/notification.mp3";

const useListenMessage = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true;
      const sound = new Audio(notification);
      sound.play();
      setMessages([...messages, newMessage]);
    });
    socket.emit("sendMessage", messages);

    return () => {
      socket?.off("newMessage");
    };
  }, [socket, messages, setMessages]);
};

export default useListenMessage;
