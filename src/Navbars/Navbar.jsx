import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'
import Movie_name from '../Search_movie/Movie_name'


function Navbar() {
  
  return (
    <div>

      <div className='navbar'>
        <span className='logo'>CineFiles 🎬</span>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/movies'>Movies</NavLink>
        <NavLink to='/Tvseries'>Tv Series</NavLink>
        <NavLink to='/trending'>Trending</NavLink>
        <NavLink to='/search'> Search🔍</NavLink>
        
        
      </div>

      

    </div>
  )
}

export default Navbar