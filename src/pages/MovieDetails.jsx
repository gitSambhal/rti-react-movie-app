import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styledComponents from "styled-components";
import { apiGetMoviesById } from "../services/apiService";

const MovieDetailsContainer = styledComponents.div`
  display: flex;
  flex-direction: column;
  .title {
    background: #746a64;
    color: #fff;
    padding-top: 10px;
    padding-left: 10px;
    height: 50px;
    font-weight: bold;
  }

  .extra-info {
    padding: 20px;
  }

  .image-and-info {
    display: flex;

    .image {
      width: 100px;
      img {
        max-width: 100%;
      }
    }

    .info {
      margin-left: 20px;
      .year {
        font-size: 18px;
      }
      .runtime {
        font-style: italic;
        margin-bottom: 30px;
      }
      .rating {
        font-weight: bold;
        margin-bottom: 10px;
      }
      .add-to-fav button {
        background: #746a64;
        color: #fff;
        padding: 10px;
        color: #fff;
      }
    }
  }

  .overview {
    color: #746a64;
    margin-top: 10px;
  }

  .trailer {
    margin-top: 10px;
    a {
      text-decoration: none;
      color: #746a64;
      padding-top: 10px;
      padding-left: 10px;
    }
    .icon {
      border-color: transparent transparent transparent #202020;
    }
  }

`;

function MovieDetailsPage({ movie, ...rest }) {
  const params = useParams();
  console.log({ params });
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadMovie = async () => {
    try {
      let resp = await apiGetMoviesById(params.id);
      if (resp.status === 200) {
        setMovieDetails(resp.response.movie);
      } else {
        console.error("Movie not found");
      }
    } catch (error) {
      console.error("Movie not found", error.message);
    }
  };

  useEffect(() => {
    loadMovie();
  }, []);

  const html = {};

  html.loading = "loading";
  html.movieDetails = movieDetails && (
    <>
      <MovieDetailsContainer className="movie-details-container">
        <div className="title">{movieDetails.title}</div>
        <div className="extra-info">
          <div className="image-and-info">
            <div className="image">
              <img src={movieDetails.poster_path} alt="" />
            </div>
            <div className="info">
              <div className="year">
                {movieDetails.release_date.substr(0, 4)}
              </div>
              <div className="runtime">{movieDetails.runtime}</div>
              <div className="rating">{movieDetails.vote_average}/10</div>
              <div className="add-to-fav">
                <button>Add to favorite</button>
              </div>
            </div>
          </div>
          <div className="overview">{movieDetails.overview}</div>

          <div className="trailers">
            <p>TRAILERS</p>
            <hr />
            <div className="trailer">
              <a
                target="_blank"
                href={`https://youtu.be/${movieDetails.trailer_yt}`}
              >
                <span className="icon"></span> Play trailer
              </a>
            </div>
          </div>
        </div>
      </MovieDetailsContainer>
    </>
  );

  return (
    <>
      {loading && html.loading}
      {movieDetails && html.movieDetails}

      {/* <div>{movie.title}</div>
      <div>{movie.release_date}</div> */}
    </>
  );
}

export default MovieDetailsPage;
