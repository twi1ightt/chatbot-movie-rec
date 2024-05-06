"use client";

import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import { db } from "../../firebase";
import toast from "react-hot-toast";

type Props = {
  chatId: string;
};

function ChatInput({ chatId }: Props) {
  const [prompt, setPrompt] = useState("");
  const { data: session } = useSession();

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) return;

    const input = prompt.trim();
    setPrompt("");

    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          session?.user?.image! ||
          `https://ui-avatars.com/api/?name=${session?.user?.name!}`,
      },
    };
    console.log(session?.user?.image!);

    const notification = toast.loading("Thinking . . .");

    await addDoc(
      collection(
        db,
        "users",
        session?.user?.email!,
        "chats",
        chatId,
        "messages"
      ),
      message
    );

    await fetch(`/api/askQuestion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input,
        chatId,
        session,
      }),
    }).then(() => {
      toast.success("Responded! ", { id: notification });
    });
  };

  return (
    <div className="bg-[#e6e7ee]/90 hover:bg-[#e6e7ee] text-black text-sm px-56">
      <form
        onSubmit={sendMessage}
        className="p-5 space-x-5 flex border-zinc-950"
      >
        <input
          className="focus:outline-none bg-transparent flex-1 disabled:cursor-not-allowed 
          disabled:text-gray-300 text-lg border-2 border-spacing-4 border-slate-900/15 hover:border-slate-900/40 rounded-xl font-semibold resize-none p-3"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter Prompt"
          disabled={!session}
        />

        <button
          type="submit"
          disabled={!prompt || !session}
          className="bg-[#000000] text-white font-bold hover:opacity-50 px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <PaperAirplaneIcon className="h-4 w-4 " />
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
