import Chat from "../../../components/chatbot/Chat";
import ChatInput from "../../../components/chatbot/ChatInput";

type props = {
  params: {
    id: string;
  };
};

function ChatPage({ params: { id } }: props) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Chat chatId={id} />
      <ChatInput chatId={id} />
    </div>
  );
}

export default ChatPage;
