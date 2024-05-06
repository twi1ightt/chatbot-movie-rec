"use client";

import { useSession, signOut } from "next-auth/react";
import NewChat from "./NewChat";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
import ChatRow from "./ChatRow";
import Widget from "./Widget";
import Image from "next/image";

function ChatSideBar() {
  const { data: session } = useSession();

  const [chats] = useCollection(
    session &&
      query(
        collection(db, "users", session.user?.email!, "chats"),
        orderBy("createdAt", "desc")
      )
  );
  return (
    <div className="flex flex-col p-4 h-full justify-between max-h-screen">
      <div>
        <div className="flex justify-center items-center">
          <div className="m-10">
            <Image
              src="/logoicon.png"
              alt="logo"
              width={70}
              height={70}
              sizes="100vw"
            />
          </div>
        </div>
        <div className="items-center justify-center  h-1/7">
          <Widget />
        </div>
      </div>
      <div className="h-2/3">
        <NewChat />
        <div className="overflow-y-auto max-h-[calc(100%-120px)] no-scrollbar">
          {chats?.docs.map((chat, index) => (
            <ChatRow key={chat.id} id={chat.id} />
          ))}
        </div>
      </div>
      <div
        onClick={() => signOut()}
        className="cursor-pointer flex flex-col items-center align-middle mx=2 my-4 px-4 "
      >
        {session && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            onClick={() => signOut()}
            src={session.user?.image!}
            alt="Profile picture"
            className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50"
          />
        )}
        <p className="text-black/40 text-2xl font-medium hover:text-black">
          Log Out
        </p>
      </div>
    </div>
  );
}

export default ChatSideBar;
