import React from "react";
import styledComponents from "styled-components";
import MovieCard from "./MovieCard";

const MovieListContainer = styledComponents.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  > MovieCard {
    border: 1px solid red;
  }
`;

export default function MovieList({ movies }) {
  const html = {};

  html.list = movies.map((movie) => (
    <MovieCard movie={movie} key={movie.movie_id}></MovieCard>
  ));

  return <MovieListContainer>{html.list}</MovieListContainer>;
}
