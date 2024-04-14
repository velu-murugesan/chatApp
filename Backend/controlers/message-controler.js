import { response } from "express";
import Conversation from "../models/conversation-model.js";
import Message from "../models/message-model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    // message model

    const newMessage = new Message({
      senderID: senderId,
      receiverID: receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("error in message controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) return response.status(200).json([]);

    res.status(200).json(conversation.messages);
  } catch (error) {
    console.log("error in message-controller = getmessage", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
