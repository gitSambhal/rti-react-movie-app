import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGetMoviesById } from "../services/apiService";

function MovieDetails({ movie, ...rest }) {
  const params = useParams();
  console.log({ params });
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(async () => {
    try {
      let resp = await apiGetMoviesById(params.id);
      if (resp.status === 200) {
        setMovieDetails(resp.response.movie);
      }
    } catch (error) {}
  }, []);

  return (
    <>
      <div>MovieDetails</div>
      <div>{movie.title}</div>
      <div>{movie.release_date}</div>
    </>
  );
}

export default MovieDetails;
