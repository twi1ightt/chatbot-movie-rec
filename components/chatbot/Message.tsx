/* eslint-disable @next/next/no-img-element */
import { DocumentData } from "firebase-admin/firestore";
import { marked } from "marked";

type Props = {
  message: DocumentData;
};

function Message({ message }: Props) {
  const isChatbot = message.user.name === "RealAI";
  const isUser = message.user.name != "RealAI";

  const htmlText = marked(message.text);

  return (
    <div
      className={`py-5 text-black ${
        isChatbot && "bg-[#e6e7ee]/60 order-1" 
      } ${isUser && "order-2"} hover:bg-[#e6e7ee]`}
    >
      <div className="flex space-x-5 px-10 max-w-2xl mx-auto">
        <img
          src={message.user.avatar!}
          alt="Users Profile Picture"
          className="h-8 w-8"
        />
        <p
          className="pt-1 text-pretty text-xl"
          dangerouslySetInnerHTML={{ __html: htmlText }}
        />
      </div>
    </div>
  );
}

export default Message;
