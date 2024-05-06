import { XCircleIcon } from "@heroicons/react/24/solid";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import { collection, deleteDoc, doc } from "firebase/firestore";

type Props = {
  id: string;
};

function ChatRow({ id }: Props) {
  const pathName = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [active, setActive] = useState(false);

  const [messages] = useCollection(
    collection(db, "users", session?.user?.email!, "chats", id, "messages")
  );

  useEffect(() => {
    if (!pathName) return;
    setActive(pathName.includes(id));
  }, [id, pathName]);

  const removeChat = async () => {
    await deleteDoc(doc(db, "users", session?.user?.email!, "chats", id));
    router.replace("/");
  };

  return (
    <Link
      href={`/chat/${id}`}
      className={`ChatRow justify-center items-center
      ${active && "bg-[#fff3de95]"}`}
    >
      <ChatBubbleLeftEllipsisIcon className="h-5 w-7" />
      <p className="flex-1 hidden md:inline-flex truncate">
        {messages?.docs[messages?.docs.length - 1]?.data()?.text || "New Chat"}
      </p>
      <XCircleIcon
        onClick={removeChat}
        className="h-5 w-5 
        text-black hover:text-red-700 font-bold"
      />
    </Link>
  );
}

export default ChatRow;
