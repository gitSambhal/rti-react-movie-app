import env from "../env"

function fetchService(url, options = {}) {
  return new Promise(async (resolve, reject) => {
    try {

      let resp = await fetch(url, options)
      let json = await resp.json();

      let finalResp = {
        status: resp.status,
        response: json,
      }

      return resolve(finalResp);
    } catch (error) {
      return reject(error);
    }
  })
}

export const apiGetAllLatestMovies = ({ page }) => {
  const url = `${env.API_SERVER}movies?sortBy=popularity&page=${page}`;
  return fetchService(url);
}

export const apiGetAllPopularMovies = () => {
  const url = env.API_SERVER + 'movies?sortBy=release_date';
  return fetchService(url);
}

export const apiGetMoviesByName = (name) => {
  const url = `${env.API_SERVER}movies?sortBy=release_date&name=${name}`;
  return fetchService(url);
}

export const apiGetMoviesById = (id) => {
  const url = `${env.API_SERVER}movies/${id}`;
  return fetchService(url);
}
