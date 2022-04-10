import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MovieCardContainer = styled.div`
  box-sizing: border-box;
  margin-bottom: -3px;
  flex-grow: 1;
  flex-basis: 150px;
  transition: 0.4s all;
  img {
    width: 100%;
    height: 100%;
  }
  :hover {
    transform: scale(1.1);
  }
`;

export default function MovieCard({ movie, ...rest }) {
  return (
    <>
      <MovieCardContainer>
        <Link to={`/details/${movie.id}`}>
          <div className="movie-img">
            <img src={movie.poster_path} alt="" />
          </div>
        </Link>
      </MovieCardContainer>
    </>
  )
}
