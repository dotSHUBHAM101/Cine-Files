
import './App.css'
import { BrowserRouter , Route , Routes , NavLink } from 'react-router-dom'
import Navbar from './Navbars/Navbar'
import Home from './Pages/Home'
import Movies from './Pages/Movies'
import Tv_series from './Pages/Tv_series'
import Trending from './Pages/Trending'
import Movie_name from './Search_movie/Movie_name'
import Movie_details from './Movie_details/Movie_details'
import Not_Found_page from './Not_Found_page'

function App() {
  

  return (


    <>
        <BrowserRouter>
      <div className="container">
        <Navbar/>
        <div className="box">
          
          <div className="uppersection">
              
            </div>


              <Routes>
                <Route path='/' element = {<Home/>}/>
                <Route path='/movies' element = {<Movies/>}/>
                <Route path='/Tvseries' element = {<Tv_series/>}/>
                <Route path='/trending' element = {<Trending/>}/>
                <Route path='/search' element={<Movie_name/>}/>
                <Route path='/movie/:movie_name' element={<Movie_details/>}/>
                </Routes>
                <Routes path = '*' element = {Not_Found_page}/>
              

                    <div className="basicnavbars">
                    <NavLink to = '/'>Home</NavLink>
                    <NavLink to = '/trending'>Trending</NavLink>
                    <NavLink to = '/Movies'>Movies</NavLink>
                    <NavLink to = '/Tvseries'>Tv series</NavLink>
                    </div>


        </div>
      </div>
      </BrowserRouter>

      </>
  )
}

export default App
