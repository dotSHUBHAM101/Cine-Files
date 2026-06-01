import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './Movie_details.css'

function Movie_details() {

  const { movie_name } = useParams();
  const navigate = useNavigate();
  const decodedTitle = decodeURIComponent(movie_name);

  const apikey = import.meta.env.VITE_TMDB_API_KEY;
  
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

useEffect(() => {

  async function getCompleteMovieDetails() {
    try {
      setLoading(true);
      setError(false);


      const searchRes = await fetch(
        `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(decodedTitle)}&api_key=${apikey}`
      );
      const searchJson = await searchRes.json();
      const initialResult = searchJson?.results?.[0];

      if (!initialResult) {
        setMovieData(null);
        setLoading(false);
        return;
      }

    
      const mediaType = initialResult.media_type === "tv" ? "tv" : "movie";

      const detailRes = await fetch(
        `https://api.themoviedb.org/3/${mediaType}/${initialResult.id}?api_key=${apikey}&append_to_response=videos,credits`
      );
      const completeJson = await detailRes.json();

      setMovieData(completeJson);
    } catch (err) {
      console.error("Fetch pipeline failed", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  if (decodedTitle) {
    getCompleteMovieDetails();
  }
}, [decodedTitle]);

  if (loading) return <div className="loading_screen"><h2>Loading Cinematic Details...</h2></div>;
  if (error) return <div className="error_screen"><h2>Error retrieving data. Please try again.</h2></div>;
  if (!movieData) return <div className="error_screen"><h2>No movie matching "{decodedTitle}" found.</h2></div>;


  const trailer = movieData?.videos?.results?.find(vid => vid.type === "Trailer" && vid.site === "YouTube");
  const trailerUrl = trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;


  const topCast = movieData?.credits?.cast?.slice(0, 5);


  console.log(movieData);

  return (
    <div className="movie_details_wrapper">
      
    
      <div 
        className="details_hero_banner"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), #0f0f0f), url(https://image.tmdb.org/t/p/original${movieData.backdrop_path || movieData.poster_path})`
        }}
      >
        <button className="back_home_btn" onClick={() => navigate('/')}>← Back Home</button>
      </div>

      
      <div className="details_content_container">
        


      
        <div className="details_main_info_panel">
          <h1 className="movie_main_title">{movieData.title}</h1>
          
          <div className="meta_data_row">
            <span className="rating_badge">{movieData.vote_average?.toFixed(1)} ⭐</span>
            <span className="release_year_tag">{movieData.release_date?.split('-')[0]}</span>
            
            
            <div className="genre_tags_container">
              {movieData?.genres?.map((genre) => (
                <span key={genre.id} className="genre_bubble">{genre.name}</span>
              ))}
            </div>
          </div>

          <div className="overview_block">
            <h3>Overview</h3>
            <p>{movieData.overview || "No plot synopsis documentation listed."}</p>
          </div>

          
          {trailerUrl ? (
            <a href={trailerUrl} target="_blank" rel="noreferrer" className="watch_trailer_btn">
              ▶ Watch Official Trailer
            </a>
          ) : (
            <button className="watch_trailer_btn disabled_btn" disabled>Trailer Unavailable</button>
          )}

          
          <div className="cast_section_block">
            <h3>Top Cast</h3>
            <div className="cast_names_list">
              {topCast && topCast.length > 0 ? (
                topCast.map((actor) => (
                  <span key={actor.id} className="actor_tag_pill">{actor.name} <small style={{color: '#888'}}>({actor.character})</small></span>
                ))
              ) : (
                <span className="no_data_span">Cast details pending update.</span>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Movie_details;