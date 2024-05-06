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
  const isUser = emotionDetection.user.name != "RealAI";

  const [recommendations, setRecommendations] = useState<any[]>([]);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const notification = toast.loading("Looking for movies...", {
          id: "reposeDataRecommendation",
        });
        const response = await recquery(emotionDetection.text); //for the movies the response from the huggingface emotion detection model is being passed into the query. movies will be recommended based on the users detected emotion
        setRecommendations(response);
        toast.success("Responded! ", { id: "reposeDataRecommendation" });
      } catch (error) {
        toast.error("Error fetching recommendations", {
          id: "reposeDataRecommendation",
        });
        console.error("Error:", error); //
      }
    }
    fetchMovie();
  }, [emotionDetection.text, modelText]);

  return (
    <div
      className={`py-5 text-black ${modelText && "bg-[#e6e7ee]/60 order-1"} ${
        isUser && "order-2"
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
            {/* first display the emotions detected from user input */}
            <p className="pt-1 text-xl">{emotionDetection.text}</p>
          </div>
          <div
            className={`${modelText && "border border-black/10 p-5"} order-2`}
          >
            {recommendations.length > 0 && modelText && (
              <div>
                <div>
                  {/* Display the movies recived from python backend to the user */}
                  <p className="pt-1 text-2xl font-extrabold underline">
                    Some Movies Based On Your Emotion:
                  </p>
                </div>
                <div className="pt-1 text-sm">
                  <div>
                    {recommendations.map((movie) => (
                      <div key={movie.id}>
                        <div>
                          <p className="text-slate-900 text-xl font-semibold animate-slidein">
                            {`- Title :  ${movie.title} \n`}
                          </p>
                        </div>
                        <br />
                        <div>
                          <p
                            key={movie.genres}
                            className="text-xl animate-slidein500"
                          >
                            {"\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +
                              ` - Genre :  ${movie.genres} \n`}
                          </p>
                        </div>
                        <br />
                        <div>
                          <p
                            key={movie.description}
                            className="text-xl animate-slidein700"
                          >
                            {"\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +
                              ` - OverView :  ${movie.description} `}
                          </p>
                        </div>
                        <br />
                        <div>
                          <p
                            key={movie.type}
                            className="text-xl animate-slidein900"
                          >
                            {"\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +
                              ` - Type :  ${movie.type} `}
                          </p>
                        </div>
                        <br />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Emotionres;
