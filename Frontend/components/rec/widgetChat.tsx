"use client";

import { useRouter } from "next/navigation";

function WidgetChat() {
  const router = useRouter();

  return (
    <div className="flex flex-row ">
      <button onClick={() => router.push("/chat")} className="flex-1">
        <div className="boarder-white font-extrabold bg-[#b3ffc697] hover:bg-[#b3ffc6] py-4 rounded-xl align-middle justify-center">
          <p className="flex-1 font-bold text-xl">Chat 🤖🗣</p>
          {/*<div className=" rounded-full justify-start align-middle order-1">
            <Image
              src={"/smile.png"}
              alt="happy emoji"
              height={30}
              width={30}
            />
          </div>
           <div className=" rounded-full justify-center order-3">
            <Image
              src={"/goofy.png"}
              alt="happy emoji"
              height={30}
              width={30}
            />
          </div>
          <div className=" rounded-full justify-end order-2">
            <Image src={"/sad.png"} alt="happy emoji" height={30} width={30} />
          </div>
         */}
        </div>
      </button>
    </div>
  );
}

export default WidgetChat;
