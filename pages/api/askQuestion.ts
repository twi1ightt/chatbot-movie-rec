import type { NextApiRequest, NextApiResponse } from "next";
import query from "./queryApi";
import admin from "firebase-admin";
import { adminDb } from "../../firebaseAdmin";

type Data = {
  answer: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { prompt, chatId, model, session } = req.body;

  if (!prompt) {
    res.status(400).json({ answer: "Please Provide A Prompt!" });
    return;
  }
  if (!chatId) {
    res.status(400).json({ answer: "Please Provide A Chat ID!" });
    return;
  }

  const response = await query(prompt, chatId, model);

  const message: Message = {
    text: response || "I couldn't understand that...",
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: "ChatAI",
      name: "RealAI",
      avatar: "/logoicon.png",
    },
  };
  console.log("Avatar path: ", message.user.avatar);
  await adminDb
    .collection("users")
    .doc(session?.user?.email)
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .add(message); //create a message document in database and model response there

  res.status(200).json({ answer: message.text });
}
