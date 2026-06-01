import React from 'react'
import useFetch from '../CustomHook/useFetch'
import './HighRatedMovie.css'
import { useNavigate } from 'react-router-dom';

function HighlyRatedMovie() {

  const navigate = useNavigate();

  const apiKey = `367f3cf63f766f468cdec4ca3ed883a0`;
  const High_rated_url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=${apiKey}`;

  const { data, loading, error } = useFetch(High_rated_url);
  

  return (
  
    <div className='highratedbox'>
      <h2>Highly rated Movies ⭐: </h2>

      <div className='high_rating_movies'>
        {data?.results?.map((high_rate, index) => {
          return (
            <div className="highlyRatedMovie_content" key={high_rate.id || index}onClick={() => navigate(`/movie/${encodeURIComponent(high_rate.title || high_rate.name)}`)}>
              
              <img 
                className="img_of_highlyRated"
                src={high_rate.poster_path 
                  ? `https://image.tmdb.org/t/p/w500${high_rate.poster_path}`
                  : `https://image.tmdb.org/t/p/w500${high_rate.backdrop_path}`
                } 
                alt={high_rate?.original_title || "highly rated movie"} 
              />

        
              <div className="highlyRatedOtherContent">
                <h4>{high_rate?.original_title}</h4>
                <p>{high_rate?.vote_average ? high_rate.vote_average.toFixed(1) : ''} ⭐</p>
              </div>

            </div>
          )
        })}
      </div>
    </div>
  )
}

export default HighlyRatedMovie;