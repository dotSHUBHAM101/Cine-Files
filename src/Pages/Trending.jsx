import React from 'react'
import './Design.css'
import useFetch from '../CustomHook/useFetch';
import { useNavigate } from 'react-router-dom';

function Trending() {

 const apikey = import.meta.env.VITE_TMDB_API_KEY;
 
  const url = `https://api.themoviedb.org/3/trending/all/day?language=en-US&api_key=${apikey}`;
  const { data, loading, error } = useFetch(url);

  const navigate = useNavigate();

  return (
    <div className='content_area'>
      {data?.results?.map((movie, index) => {
        
        const movieName = movie.name || movie.title;

        return (
          
          <div 
            className="movie_content" 
            key={index} 
            onClick={() => navigate(`/movie/${encodeURIComponent(movieName)}`)}
          >
            <div className="movie_img">
              <img 
                src={movie.poster_path 
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
                } 
                alt={movieName} 
              />

              <div className="other_content">
                <h4 style={{ color: '#fff', margin: '4px 0', fontSize: '14px' }}>
                  {movieName}
                </h4>
                <p>Rating: {movie.vote_average?.toFixed(1) || 'N/A'} ⭐ </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Trending;