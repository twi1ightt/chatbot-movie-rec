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
  inputId: string;
};

function RecRow({ inputId }: Props) {
  const pathName = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [active, setActive] = useState(false);

  const [input] = useCollection(
    collection(db, "EmotionModel", inputId, "emotionDetection")
  );

  useEffect(() => {
    if (!pathName) return;
    setActive(pathName.includes(inputId));
  }, [inputId, pathName]);

  const removeRec = async () => {
    await deleteDoc(
      doc(db, "users", session?.user?.email!, "EmotionModel", inputId)
    );
    router.replace("/recommendation");
  };

  return (
    <Link
      href={`/recommendation/${inputId}`}
      className={`ChatRow justify-center items-center
    ${active && "bg-[#0d187a3c]"}`}
    >
      <ChatBubbleLeftEllipsisIcon className="h-5 w-7" />
      <p className="flex-1 hidden md:inline-flex truncate">
        {input?.docs[input?.docs.length - 1]?.data()?.text ||
          "New Reccomendation"}
      </p>
      <XCircleIcon
        onClick={removeRec}
        className="h-5 w-5 
        text-black hover:text-red-700 font-bold"
      />
    </Link>
  );
}

export default RecRow;
