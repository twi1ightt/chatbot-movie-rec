import React from "react";
import RecSideBar from "../../components/rec/RecSideBar";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <div className="bg-[#ffffff] max-w-xs h-screen md:min-w-[18rem]">
        <RecSideBar />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
