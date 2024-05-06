"use client";

import { collection, orderBy, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import Emotionres from "./Emotionres";
import { ChevronDoubleDownIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";

type Props = {
  inputId: string;
};

function ModelInterface({ inputId }: Props) {
  const { data: session } = useSession();

  const [modelResponse] = useCollection(
    session &&
      query(
        collection(db, "EmotionModel", inputId, "emotionDetection"),
        orderBy("createdAt", "asc")
      )
  );

  return (
    <div className="flex-1 overflow-y-scroll overflow-x-hidden">
      {modelResponse?.empty && (
        <>
          <p className="pt-10 text-center text-black font-extrabold">
            Say How You Feel To Get Movie Recomendations!
          </p>
          <ChevronDoubleDownIcon className="h-10 w-10 mx-auto mt-5 text-white animate-bounce" />
        </>
      )}
      {modelResponse?.docs.map((emotionDetection) => (
        <div key={emotionDetection.id} className="bg-[#cdbcbcc5] font-medium">
          <Emotionres emotionDetection={emotionDetection.data()} />
        </div>
      ))}
    </div>
  );
}

export default ModelInterface;
