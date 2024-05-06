import ModelInterface from "../../../components/rec/ModelInterface";
import EmotionInput from "../../../components/rec/EmotionInput";
import { DocumentData } from "firebase/firestore";

type props = {
  params: {
    id: string;
  },
};

function EmotionPage({ params: { id } }: props) {
  return (
    <>
      <div className="flex flex-col h-screen overflow-hidden">
        <ModelInterface inputId={id} />
        <EmotionInput inputId={id} />
      </div>
    </>
  );
}

export default EmotionPage;
