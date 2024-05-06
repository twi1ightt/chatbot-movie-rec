import { FilmIcon } from "@heroicons/react/24/outline";
import React from "react";
import Image from "next/image";

function page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-2 text-white">
      <div>
        <Image src="/logotext.png" alt="logo" width={300} height={10} />
      </div>
      <div className=" md:grid-cols-3 gap-4 text-black">
        <div className="card rounded-lg shadow-md p-4 bg-[#e6e7ee]">
          <div className="flex justify-center items-center mb-4">
            <FilmIcon className="h-6 w-6 text-blue-500" />
          </div>
          <h2 className="text-xl font-bold text-center mb-4">
            Recommendations
          </h2>
          <ul key={"InfoCard"} className="list-disc space-y-2 pl-4">
            <li key={"infoCardText"}>Get Movie And TV suggestions Based On Your Emotion</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default page;
