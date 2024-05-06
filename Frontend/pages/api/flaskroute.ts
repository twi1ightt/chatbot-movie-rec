//calling the movie recommendation api made in the backend folder
const recquery = async (stringInput: string) => {
  const recresponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/recommend-movies`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ userInput: stringInput }),
    }
  );
  const recommendation = await recresponse.json();

  // const movieDetails = recommendation.map((movie: Movie) => ({
  //   title: movie.Series_Title,
  //   genres: movie.Genre,
  //   description: movie.Overview,

  return recommendation;
};
export default recquery;
//
