
const recquery = async (stringInput: string) => {
  const recresponse = await fetch("http://127.0.0.1:5000/recommend-movies", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ userInput: stringInput }),
  });
  const recommendation = await recresponse.json();

  const movieDetails = recommendation.map((movie: Movie) => ({
    title: movie.title,
    genres: movie.genres,
    description: movie.description,
    type: movie.type
  }));


  return recommendation;
};
export default recquery;
