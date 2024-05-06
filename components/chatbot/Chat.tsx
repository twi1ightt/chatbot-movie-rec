"use client";

import { collection, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import Message from "./Message";
import { ChevronDoubleDownIcon } from "@heroicons/react/24/solid";

type Props = {
  chatId: string;
};

function Chat({ chatId }: Props) {
  const { data: session } = useSession();

  const [messages] = useCollection(
    session &&
      query(
        collection(
          db,
          "users",
          session?.user?.email!,
          "chats",
          chatId,
          "messages"
        ),
        orderBy("createdAt", "asc")
      )
  );

  return (
    <div className="flex-1 overflow-y-scroll overflow-x-hidden">
      {messages?.empty && (
        <>
          <p className="pt-10 text-center text-black font-extrabold">
            Enter A Prompt To Start Chatting 🧠
          </p>
          <ChevronDoubleDownIcon className="h-10 w-10 mx-auto mt-5 text-white animate-bounce" />
        </>
      )}
      {messages?.docs.map((message) => (
        <>
          <div className="bg-[#ffffffc5]/60 font-medium ">
            <Message key={message.id} message={message.data()} />
          </div>
        </>
      ))}
    </div>
  );
}

export default Chat;
