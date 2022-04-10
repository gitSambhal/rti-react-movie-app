import React, { useEffect, useState } from "react";
import MovieList from "../components/MovieList";
import { apiGetAllLatestMovies } from "../services/apiService";
import InfiniteScroll from "react-infinite-scroller";

export default function NewRelease() {
  let [movies, setMovies] = useState([]);
  let [loading, setLoading] = useState(false);
  let [page, setPage] = useState(1);
  let [hasMoreMovies, setHasMoreMovies] = useState(true);

  const fetchAllMovies = async () => {
    let where = {
      page,
    };
    try {
      setLoading(true);
      let res = await apiGetAllLatestMovies(where);
      console.log({ res, page });
      if (res.status === 200) {
        movies = [...movies, ...res.response.movies.docs];
        setMovies(movies);
        setHasMoreMovies(res.response.movies.hasNextPage);
      } else {
        console.error("Unable to fetch the data");
      }
    } catch (error) {
      console.error("Unable to fetch the data", error.message);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading) {
      setLoading(true);

      console.log("load more ", page);
      setPage(page + 1);
      fetchAllMovies();
    }
  };

  let html = {};
  html.listOfMovies = <MovieList movies={movies}></MovieList>;

  return (
    <div>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore={hasMoreMovies}
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
      >
        <div>{html.listOfMovies}</div>
      </InfiniteScroll>
    </div>
  );
}
