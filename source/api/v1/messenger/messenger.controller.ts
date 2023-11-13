import { Request, Response } from "express";
import User from "@src/data/user";
import Friend from "@src/data/friend";
import FriendRequest from "@src/data/friend-request";
import Chat from "@src/data/chat";

export default {
  createChat: async (req: Request, res: Response) => {
    const { userId, friendId } = req.body;

    const userExists = await User.getUserById(userId);
    if (!userExists) {
      return res.status(404).json({ msg: "Пользователь не найден" });
    }

    const friendExists = await User.getUserById(friendId);
    if (!friendExists) {
      return res.status(404).json({ msg: "Пользователь не найден" });
    }

    const chatExists = await Chat.findExistingChat(userId, friendId);
    if (chatExists) {
      return res.status(409).json({ msg: "Чат уже существует" });
    }

    const chat = await Chat.createChatRoom(userId, friendId);
    res.status(200).json({ chatId: chat.chatId });
  },
  userChats: async (req: Request, res: Response) => {
    const userId = req.userId;

    const user = await User.getUserById(userId);
    if (!user) {
      return res.status(404).json({ msg: "Пользователь не найден" });
    }

    const userChats = await Chat.getUserChats(userId);

    return res.status(200).json({ userChats });
  },
};
