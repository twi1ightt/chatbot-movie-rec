import {
  ChatBubbleBottomCenterTextIcon,
  ExclamationCircleIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-2 text-white">
      <div>
        <Image
          src="/logotext.png"
          alt="logo"
          width={300}
          height={300}
          sizes="100vw"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-black">
        <div className="card rounded-lg shadow-md p-4 bg-[#e6e7ee]">
          <div className="flex justify-center items-center mb-4">
            <ChatBubbleBottomCenterTextIcon className="h-6 w-6 text-blue-500" />
          </div>
          <h2 className="text-xl font-bold text-center mb-4">Examples</h2>
          <ul key={"ChatInfoCard1"} className="list-disc space-y-2 pl-4">
            <li key={"Card1Text"}>What are the rules of chess?</li>
            <li key={"Card1Text2"}>What is music theory?</li>
            <li key={"Card1Text3"}>Tell me a joke</li>
          </ul>
        </div>

        <div className="card rounded-lg shadow-md p-4 bg-[#e6e7ee]">
          <div className="flex justify-center items-center mb-4">
            <LightBulbIcon className="h-6 w-6 text-yellow-500" />
          </div>
          <h2 className="text-xl font-bold text-center mb-4">Capabilities</h2>
          <ul key={"chatInfoCard2"} className="list-disc space-y-2 pl-4">
            <li key={"Card2Text4"}>Detect user emotion</li>
            <li key={"Card2Text5"}>Quick, intuitive responses</li>
            <li key={"Card2Text6"}>Media recommendation</li>
          </ul>
        </div>

        <div className="card rounded-lg shadow-md p-4 bg-[#e6e7ee]">
          <div className="flex justify-center items-center mb-4">
            <ExclamationCircleIcon className="h-6 w-6 text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-center mb-4">Caution</h2>
          <ul key={"ChatInfoCard3"} className="list-disc space-y-2 pl-4">
            <li key={"Card3Text7"}>AI can make mistakes</li>
            <li key={"Card3Text8"}>Follow OpenAI terms of service</li>
            <li key={"Card3Text9"}>
              For support follow{" "}
              <a
                href="https://www.mind.org.uk/information-support/guides-to-support-and-services/crisis-services/helplines-listening-services/"
                className="text-underline underline-offset-4 text-red-500"
              >
                here.
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
