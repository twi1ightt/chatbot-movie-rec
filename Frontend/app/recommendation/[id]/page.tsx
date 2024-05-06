import ModelInterface from "../../../components/rec/ModelInterface";
import EmotionInput from "../../../components/rec/EmotionInput";
import { DocumentData } from "firebase-admin/firestore";

type Props = {
  params: {
    id: string;
    emotionDetection: DocumentData;
  };
};

function EmotionPage({ params: { id, emotionDetection } }: Props) {
  return (
    <>
      <div className="flex flex-col h-screen overflow-hidden">
        <ModelInterface inputId={id} />
        <EmotionInput inputId={id} emotionDetection={emotionDetection} />
      </div>
    </>
  );
}

export default EmotionPage;
