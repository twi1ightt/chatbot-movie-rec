"use client";

import { useSession, signOut } from "next-auth/react";
import NewRec from "./NewRec";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
import RecRow from "./RecRow";
import WidgetChat from "./widgetChat";
import Image from "next/image";

function RecSideBar() {
  const { data: session } = useSession();

  const [recs] = useCollection(
    session &&
      query(
        collection(db, "users", session.user?.email!, "EmotionModel"),
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
              height={65}
              style={{ width: 70, height: 65 }}
              priority
              sizes="100vw"
            />
          </div>
        </div>
        <div className="items-center justify-center  h-1/7">
          <WidgetChat />
        </div>
      </div>
      <div className="h-2/3">
        <NewRec />
        <div className="overflow-y-auto max-h-[calc(100%-120px)] no-scrollbar">
          {recs?.docs.map((recommendation) => (
            <RecRow key={recommendation.id} inputId={recommendation.id} />
          ))}
        </div>
      </div>
      <div
        onClick={() => signOut()}
        className="cursor-pointer flex flex-col items-center align-middle mx-2 my-4 px-4 "
      >
        {session && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            onClick={() => signOut()}
            src={session.user?.image!}
            alt="User Profile picture"
            className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 "
          />
        )}
        <p className="text-black/40 text-2xl font-medium hover:text-black">
          Log Out
        </p>
      </div>
    </div>
  );
}

export default RecSideBar;
