import React from 'react'
import useFetch from '../CustomHook/useFetch'
import './Up.css'
import { useNavigate , useParams , Routes, BrowserRouter  , Route} from 'react-router-dom'
import '../App.css'
import Movie_details from '../Movie_details/Movie_details'


function Upcomming_movies() {

    const navigate = useNavigate();

  const apikey = `367f3cf63f766f468cdec4ca3ed883a0`

  const url = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&api_key=${apikey}`

  const {data , loading , error} = useFetch(url);


  console.log(data);





  return (
  


    <div className='upcomming_movies'>
      <div className="header">
        <h2>Upcoming Movies</h2>
        <div className="upcomming_movie_container">
          {data?.results?.map((up_movie , index)=> {
            return(
            <div className='upcomming_movie_content' key = {index} onClick={() => navigate(`/movie/${encodeURIComponent(up_movie.title || up_movie.name)}`)}>
              <img 
                  src={up_movie.poster_path 
                    ? `https://image.tmdb.org/t/p/w500${up_movie.poster_path}`
                    : `https://image.tmdb.org/t/p/w500${up_movie.backdrop_path}`
                  } 
                  alt={up_movie.title || up_movie.name} 
                />
                <div className='up_movie_OtherContent'>
                  <h4 style={{ color: '#fff', margin: '4px 0', fontSize: '14px' }}>
                  {up_movie.title || up_movie.name}
                </h4>
                <p> {up_movie.vote_average?.toFixed(1) || 'N/A'} ⭐ </p>
              <p style={{marginTop : '10px'}}><span style={{color : 'white !important'}}>Release date : </span>  <span style={{color : 'red'}}>{up_movie.release_date}</span></p>
                </div>
              
            </div>
            )
          })}
        </div>
      </div>
    </div>
    
  )
}

export default Upcomming_movies;
