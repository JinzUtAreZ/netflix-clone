import movieTrailer from "movie-trailer";
import React, { useEffect, useState } from "react";
import Youtube from "react-youtube";
import "../componentsCss/Row.css";
import axios from "../utilities/axios";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      //console.log(request);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]); // fetchUrl is the one changing per row request

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      const moviesearch = movie?.title || movie?.name || movie?.originalName;
      //movieTrailer(movie?.name || "")
      movieTrailer(moviesearch || "")
        .then((url) => {
          // https://www.youtube.com/watch?v=XtMThy8QKqU
          // NOTE: input the value after the watch?v=
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  //console.table(movies);
  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow && "row__posterLarge"} `}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
