import './App.css';
import { BrowserRouter, NavLink, Routes, Route } from 'react-router-dom';

import { FaHome } from "react-icons/fa";
import { MdRestaurantMenu } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";

import Main from './scripts/Main';
import FavoriteSection from './favorites/Favorite';
import Settings from './scripts/Settings';

import CategoriesAndRecipes from './Recipes/CategoriesAndRecipes'; 

function App() {
  return (
    <BrowserRouter>
      <header className="top-header">
        <div>
          <p className="header-kicker">Recipe finder</p>
          <h1 className='header-title'>TheMealDB</h1>
        </div>
      </header>

      <Routes>  
        <Route
          path='/'
          element={
            <>
              <Main/> 
              <Settings/> 
            </>
          }
        />

        <Route path='/CategoriesAndRecipes' element={<CategoriesAndRecipes/>}/>
        <Route path='/Favorite' element={<FavoriteSection/>}/>
      </Routes>
      

      <nav className='bottom-nav'>

          <NavLink to='/' className='nav-link'>
            <span className="icon"><FaHome /></span>
            <span className="text">Главная</span>
          </NavLink>

          <NavLink to='/CategoriesAndRecipes' className='nav-link'>
            <span className="icon"><MdRestaurantMenu /></span>
            <span className="text">Рецепты</span>
          </NavLink>

          <NavLink to="/Favorite" className='nav-link'>
            <span className="icon"><MdFavoriteBorder /></span>
            <span className="text">Избранные</span>
          </NavLink>

      </nav>
      
    </BrowserRouter>
  );
};

export default App;
