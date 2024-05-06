"use client";

import { SquaresPlusIcon } from "@heroicons/react/24/outline";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { db } from "../../firebase";

function NewRec() {
  const router = useRouter();
  const { data: session } = useSession();
  const createNewRec = async () => {
    const emotiondoc = await addDoc(
      collection(db, "users", session?.user?.email!, "EmotionModel"),
      {
        userId: session?.user?.email!,
        createdAt: serverTimestamp(),
      }
    );

    router.push(`/recommendation/${emotiondoc.id}`);
  };

  return (
    <div
      onClick={createNewRec}
      className="boarder-white ChatRow font-extrabold bg-[#d49b9b] rounded-xl my-4"
    >
      <SquaresPlusIcon className="h-4 w-4" />
      <p>New Recomendation</p>
    </div>
  );
}

export default NewRec;
