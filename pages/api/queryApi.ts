import openai from "./chatgpt";

const query = async (prompt: string, chatId?: string, model?: string) => {
  // const [messages] = useCollection(
  //   session &&
  //     query(
  //       collection(
  //         db,
  //         "users",
  //         session?.user?.email!,
  //         "chats",
  //         chatId,
  //         "messages"
  //       ),
  //       orderBy("createdAt", "asc")
  //     )
  // );

  // const ggPromt = [
  //   {
  //     role: "assistant",
  //     content:
  //       "I am a chatbot designed to offer friendly conversation, as well as be a good companion. I can listen without judgment and offer encouragement, or just have general conversation. Tell me what's on your mind today. i also make sure my responses are well formatted and grammatically correct.",
  //   },
  //   {
  //     role: "user",
  //     content: prompt,
  //   },
  // ];

  const completion = await openai.chat.completions
    .create({
      model: "gpt-3.5-turbo", //the model chosen to use from OpenAI
      messages: [
        {
          role: "assistant",
          content:
            "I am a chatbot designed to offer friendly conversation, as well as be a good companion. I can listen without judgment and offer encouragement, or just have general conversation. Tell me what's on your mind today. i also make sure my responses are well formatted and grammatically correct. I'm here to listen without judgment and offer support.  Are you feeling stressed, anxious, or something else?  Tell me what's on your mind today, and we can work through it together.", //prompt basically telling the model its role on my website
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.8, //model will be more willing to select words/tokens with a less likey probaility of being chosen from all predicted tokens
      max_tokens: 1000, // maximum number of tokens model can process for a single prompt and response
      top_p: 0.6, //determines the minimum probability of words to be used for a response. temperature can consider words from the range set in top p
      frequency_penalty: 0.5, // discourages the model from using words already used, controls diversity in a models reponse. when a word is used the penalty will increase by the number given
    })
    .then((completion) => completion.choices[0].message.content)
    .catch((err) => `I'm afraid i don't know what you mean! (${err.message})`);

  return completion;
};

export default query;
