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
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "assistant",
          content:
            "I am a chatbot designed to offer friendly conversation, as well as be a good companion. I can listen without judgment and offer encouragement, or just have general conversation. Tell me what's on your mind today. i also make sure my responses are well formatted and grammatically correct.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 1,
      max_tokens: 1000,
      top_p: 0.4,
      frequency_penalty: 1.0,
      presence_penalty: 0.5,
    })
    .then((completion) => completion.choices[0].message.content)
    .catch((err) => `I'm afraid i don't know what you mean! (${err.message})`);

  return completion;
};

export default query;
