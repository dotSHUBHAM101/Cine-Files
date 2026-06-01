import React from 'react'
import useFetch from '../CustomHook/useFetch';
import useDebounce from '../CustomHook/useDebounce';
import { useState } from 'react';
import '../Navbars/Navbar.css'
import { useNavigate } from 'react-router-dom';



function Movie_name() {

  const [movie_name, setMovie_name] = useState('');

  const debounce_search = useDebounce(movie_name, 500);

  const apikey = import.meta.env.VITE_TMDB_API_KEY;
  
  
  let url = '';

  if (movie_name) {
    url = `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${debounce_search}`;
  }
  
  
  const { data, loading, error } = useFetch(url);

  const navigate = useNavigate();

  return (
    <>

        <div className="inputbox">

        
          <input 
            type="text"  
            placeholder='Search....' 
            onChange={(e) => setMovie_name(e.target.value)} 
            value={movie_name}
          />
        </div>

              {movie_name &&loading && (
          <div className="spinner_container">
          <div className="loading_spinner"></div>
          </div>
            )}

            {error && (<p>Error occurred: {error}</p>)}

            

      {movie_name && data?.results && (


        data.results.length === 0 
    ? (
        <div className='error' style={{display : 'flex' , justifyContent : 'center' , alignItems : 'center' , height : '100vh' , flexDirection : 'column'}} >
            <h2>OOPS movie not found!!!</h2>
            <span style={{color: 'red' , marginTop : '20px'}}>Kindly retry</span>
        </div>
    )
    :(

        <div className="content_area">
          {data.results.map((movie, index) => (
            <div className="movie_content" key={movie.id || index} onClick={() => navigate(`/movie/${encodeURIComponent(movie.title|| movie.name)}`)}>
              <div className="movie_img">
                <img 
                  src={movie.poster_path 
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
                  } 
                  alt={movie.title || movie.name} 
                />
              </div>
              <div className="other_content">
                <h4 style={{ color: '#fff', margin: '4px 0', fontSize: '14px' }}>
                  {movie.title || movie.name}
                </h4>
                <p>Rating: {movie.vote_average?.toFixed(1) || 'N/A'} ⭐ </p>
              </div>



            </div>
          ))}


        </div>
      ))}
      </>

        
  )
}

export default Movie_name
