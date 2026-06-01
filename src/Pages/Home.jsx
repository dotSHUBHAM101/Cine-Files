import React from 'react'
import './Home.css' 
import Backdrop_poster from '../assets/spider_maan_bckground.jpg'
import useFetch from '../CustomHook/useFetch'
import HighlyRatedMovie from '../More_pages/HighlyRatedMovie';
import { Link, useNavigate } from 'react-router-dom';
import Upcomming_movies from '../More_pages/Upcomming_movies';

function Home() {

  const apikey = import.meta.env.VITE_TMDB_API_KEY;

  const trend_url = `https://api.themoviedb.org/3/trending/all/day?language=en-US&api_key=${apikey}`;


  const navigate = useNavigate();



  const {data : trending_data , loading : trending_loading , error : trending_error } = useFetch(trend_url);

  
  



  return (

    <div className='home_page'>

      

    <div className="hero">
    <img src={Backdrop_poster} alt="backdrop_image" onClick={()=> navigate(`/movie/Spider-Man: Across the Spider-Verse`)} />


            {trending_loading && (
          <div className="spinner_container">
          <div className="loading_spinner"></div>
          </div>
            )}

            {trending_error&& (<p>Error occurred: {error}</p>)}

    <div className="hero_overlay">
        <h1>Spider-Man: Across the Spider-Verse</h1>
        <p>⭐ 8.7 | 2023 | Animation · Action · Adventure</p>
      
        
    </div>
  </div>

  <div className="trending">

    <h2 style={{marginTop : '30px'}}>Trending Today : </h2>
    
  <div className='trending_section'>
      {trending_data?.results?.map((movie , index)=> (
        <div className="trending_content" key={index} onClick={() => navigate(`/movie/${movie.name}`)}>

          <div className="trending_img">

                <img 
                  src={movie.poster_path 
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
                  } 
                  alt={movie.title || movie.name} 
                />

                <div className="trending_others">
                <h4 style={{ color: '#fff', margin: '4px 0', fontSize: '14px' }}>
                  {movie.title || movie.name}
                </h4>
                <p>Rating: {movie.vote_average?.toFixed(1) || 'N/A'} ⭐ </p>
              </div>
          </div>
        </div>
      ))}
    </div>

</div>


      <div className="Highly_rated">
        <HighlyRatedMovie/>
        
      </div>

      <div className="upcomming">
      <Upcomming_movies/>
      </div>


</div>

  )
}

export default Home
