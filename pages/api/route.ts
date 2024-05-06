import type { NextApiRequest, NextApiResponse } from "next";
import emotionquery from "./emotionquery";
import admin from "firebase-admin";
import { adminDb } from "../../firebaseAdmin";

type Data = {
  answer: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { input, inputId, session } = req.body;

  if (!input) {
    res.status(400).json({ answer: "Please Provide A Prompt!" });
    return;
  }
  if (!inputId) {
    res.status(400).json({ answer: "Please Provide A Chat ID!" });
    return;
  }

  const emoResponse = await emotionquery(input, inputId);

  const analysis: emotionDetection = {
    text: emoResponse || "Im struggling to understand how you feel...",
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: "ChatAI",
      name: "RealAI",
      avatar: "/logoicon.png",
    },
  };

  // console.log(`analysis from route: ${JSON.stringify(analysis)}`);

  await adminDb
    .collection("EmotionModel") // Use the top-level collection
    .doc(inputId)
    .collection("emotionDetection")
    .add(analysis);

  res.status(200).json({ answer: analysis.text });
}

// try {
//   const hfResponse = await emotionquery(input, inputId);
//   console.log("from route: ", JSON.stringify(hfResponse));

//   const emotion: emotionDetection = {
//     text: hfResponse || "Failed to understand",
//     createdAt: admin.firestore.Timestamp.now(),
//     user: {
//       _id: "Emotion Model",
//       name: "RealAI",
//       avatar: "/av.png",
//     },
//   };

//   console.log("Avatar Path:", emotion.user.avatar);

//   const docPath = await adminDb
//     .collection("users")
//     .doc(session.user.email!)
//     .collection("EmotionModel")
//     .doc(inputId)
//     .collection("emotionDetection")
//     .add(emotion);
//   console.log("Constructed document path:", docPath.path);

//   res.status(200).json({ answer: emotion.text });
// } catch (error) {
//   console.error("Error during emotion classification:", error);
//   return res
//     .status(500)
//     .json({ answer: "!! Internal Server Error occurred" });
// }
