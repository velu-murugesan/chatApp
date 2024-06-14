import { useEffect, useState } from "react";
import useCoversation from "../Zustand/useConversation";
import toast from "react-hot-toast";
const UseGetMessages = () => {
  const [loading, setLoading] = useState(false);

  const { messages, setMessages, selectedConversation } = useCoversation();
  console.log("selectedConversation._id:", selectedConversation._id);
  useEffect(() => {
    const getMessage = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/messages/${selectedConversation._id}`);

        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }

        setMessages(data);
        console.log("data of useGetmessages:", data);
      } catch (error) {
        console.log("what error is this");
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (selectedConversation?._id) getMessage();
  }, [selectedConversation?._id, setMessages]);

  return { loading, messages };
};

export default UseGetMessages;
