const emotionquery = async (input: string, inputId: string) => {
  //async function that takes in input and inpuut id
  const hf = process.env.HUGGINGFACE_TOKEN; //hf api token in env file

  const emotionResponse = await fetch(
    //async api post request to the url below
    
    // models that can be used for emotion detection
    //just comment the one in use and uncomment this one to compare them.
    //"https://api-inference.huggingface.co/models/SamLowe/roberta-base-go_emotions", 

    "https://api-inference.huggingface.co/models/bdotloh/distilbert-base-uncased-empathetic-dialogues-context",
    {
      headers: {
        "Content-Type": "application/json", //api request body will be in json format
        Authorization: `Bearer ${hf}`, // authentication to use hf api
      },
      method: "POST", //sending data to server
      body: JSON.stringify({ text: input }),
    }
  );
  const emotion = await emotionResponse.json(); // wait for request to be completed then parse the json data in the response
  const compareScores = (a: { score: number }, b: { score: number }) => b.score - a.score; // sorting the emotion array
  emotion.sort(compareScores);

  const top5 = emotion.slice(0, 5); //return only the top 5 emotions
  const dominantEmotion = top5[0].label;
  let modelresponse = `You seem to be feeling ${dominantEmotion} with hints of `; //just formatting the response from the api

  for (let i = 1; i < top5.length; i++) {
    const allEmotion = top5[i].label;
    modelresponse += `${allEmotion}, `; 
  } 
  return modelresponse;
};

export default emotionquery;
