import React from "react";
import ChatSideBar from "../../components/chatbot/ChatSideBar";

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <div className="bg-[#ffffff] max-w-xs h-screen md:min-w-[18rem]">
        <ChatSideBar />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}

export default layout;
