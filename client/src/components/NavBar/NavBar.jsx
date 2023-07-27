import React from 'react'
import {NavLink} from 'react-router-dom';
import {useLocation,useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {logOut} from '../../redux/actions'
import './NavBar.Module.css'


const NavBar = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOutButton = () => {
    dispatch(logOut(false));
    navigate('/');
  }


    return (
      
    <>
    {
      //Condiciono la Locacion de NAV
      location.pathname !== `/PEDRO` ?(
      <nav className='navBarContainer'>    
          <div className='divNav1'>
              <button className='btnNav'>
                <NavLink className='navLink' to='/home'>Home</NavLink>
              </button> 
              <button className='btnNav'>
                <NavLink className='navLink' to='/createDog'>Create a Dog</NavLink>
              </button>
              <button className='btnNav'>
                <NavLink className='navLink' to='/searchDogs'>SearchDogs</NavLink>
              </button>
          </div>
          <div className='divNav2'>    
              <button className='btnNav' onClick={()=>logOutButton()}>Log Out</button>
          </div>  
      </nav> ):null
    }
    </> 
    )
}

export default NavBar;