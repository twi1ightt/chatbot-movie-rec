"use client";

import { PaperAirplaneIcon } from "@heroicons/react/16/solid";
import {
  addDoc,
  collection,
  DocumentData,
  serverTimestamp,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import { db } from "../../firebase";
import toast from "react-hot-toast";

type Props = {
  inputId: string;
  emotionDetection: DocumentData;
};

const hf = process.env.HUGGINGFACE_TOKEN;

function EmotionInput({ inputId }: Props) {
  const [input, setInput] = useState("");
  const { data: session } = useSession();

  const sendInput = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) return;

    const emotionModelInput = input.trim();
    const stringInput = emotionModelInput.toString();
    setInput("");

    const emotionDetection: emotionDetection = {
      text: emotionModelInput,
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
      collection(db, "EmotionModel", inputId, "emotionDetection"),
      emotionDetection
    );

    await fetch(`/api/route`, { //sending user input to hugging face model
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: stringInput,
        inputId: inputId,
      }),
    }).then(() => {
      toast.success("Responded! ", { id: notification });
    });
  };

  return (
    <div className="bg-[#e6e7ee]/90 hover:bg-[#e6e7ee] text-black text-sm px-56">
      <form onSubmit={sendInput} className="p-5 space-x-5 flex border-zinc-950">
        <input
          className="focus:outline-none bg-transparent flex-1 disabled:cursor-not-allowed 
                disabled:text-gray-300 text-lg border-2 border-spacing-4 border-slate-900/15 hover:border-slate-900/40 rounded-xl font-semibold resize-none p-3"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`" I'm pretty bored at the moment... "`}
          disabled={!session}
          id="modelin"
        />
        <button
          type="submit"
          disabled={!input || !session}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl"
        >
          <PaperAirplaneIcon className="h-4 w-4 " />
        </button>
      </form>
    </div>
  );
}

export default EmotionInput;
