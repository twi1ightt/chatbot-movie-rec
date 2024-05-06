/* eslint-disable @next/next/no-img-element */
import { DocumentData } from "firebase-admin/firestore";
import { useEffect, useState } from "react";
import recquery from "../../pages/api/flaskroute";
import toast from "react-hot-toast";
import { log } from "console";

type Props = {
  emotionDetection: DocumentData;
};

function Emotionres({ emotionDetection }: Props) {
  const modelText =
    emotionDetection.user.name === "RealAI" ? emotionDetection.text : null;
  // const notification = toast.loading("Looking for movies...");
  const [recommendations, setRecommendations] = useState<any[]>([]);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const response = await recquery(emotionDetection.text);
        setRecommendations(response);
        toast.success("Responded! ", { id: "reposeDataRecommendation" });
      } catch (error) {
        toast.error("Error fetching recommendations", {
          id: "reposeDataRecommendation",
        });
        console.error("Error:", error);
      }
    }
    fetchMovie();
  }, [emotionDetection.text, modelText]);

  return (
    <div
      className={`py-5 text-black ${
        modelText && "bg-[#e6e7ee]/60"
      } hover:bg-[#e6e7ee]`}
    >
      <div className="flex flex-row space-x-5 px-10 max-w-2xl mx-auto">
        <img
          src={emotionDetection.user.avatar!}
          alt="User Profile picture"
          className="h-10 w-10 mx-0"
        />
        <div className="flex flex-col">
          <div className={` order-1 mb-2}`}>
            <p className="pt-1 text-xl">{emotionDetection.text}</p>
          </div>
          <div
            className={`${modelText && "border border-black/10 p-5"} order-2`}
          >
            {recommendations.length > 0 && modelText && (
              <>
                <p className="pt-1 text-2xl font-extrabold underline">
                  Some Movies Based On Your Emotion:
                </p>
                <p className="pt-1 text-sm">
                  <>
                    {recommendations.map((movie) => (
                      <>
                        <p
                          className="text-slate-900 text-xl font-semibold animate-slidein"
                          key={movie.Series_Title}
                        >
                          {`
                      - Title :  ${movie.Series_Title} \n
                        `}
                        </p>
                        <br />
                        <p key={movie.Genre} className="text-xl animate-slidein500">
                          {"\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +
                            `
                      - Genre :  ${movie.Genre} \n
                        `}
                        </p>
                        <br />
                        <p key={movie.Overview} className="text-xl animate-slidein700">
                          {"\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +
                            `
                      - OverView :  ${movie.Overview} 
                        `}
                        </p>
                        <br />
                        {/* <p key={movie.type} className="text-xl">
                          {`\xa0\xa0\xa0\xa0\xa0\xa0\xa0` +
                            `- Movie or Show? :  ${movie.type.toLowerCase()} \n
                        `}
                        </p> */}
                        <br />
                      </>
                    ))}
                  </>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Emotionres;
