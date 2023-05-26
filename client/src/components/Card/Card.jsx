import React from 'react'
import { NavLink,useLocation} from 'react-router-dom';
import './Card.Module.css'


const Card = ({renderStatus,name,bred_for,breed_group,origin,life_span,minHeight,maxHeight,minWeight,maxWeight,image,temperament}) => {

  const location = useLocation();

  return (
    <div className='Card'>
      <div className='singleCard'>
        <img className='cardImage' src={image} alt='' />
        <NavLink className='linkCard' to={`/detail/${name}`}>
          <h2 className='cardName'>Name: {name}</h2>
        </NavLink>
        <h2>{bred_for}</h2>
        <NavLink className='linkCard' to={`/breed_group/${breed_group}`}>
        <h2>Breed Group: {breed_group}</h2>
        </NavLink>

        {location.pathname !== `/home`  ?(
        <div className='divCard1' >
          <h2>Orgin: {origin}</h2>
          <h2>Life Span: {life_span}</h2>
        </div>
        ):null}

        {renderStatus?(
        <div className='divCard2' >
          <h2>Min Height: {minHeight}</h2>
          <h2>Max Height: {maxHeight}</h2>
          <h2>Min Weight: {minWeight}</h2>
          <h2>Max Weight: {maxWeight}</h2> 
        </div>
        ):null}
        <h2>Temperaments: {temperament}</h2>   
      </div> 


    </div>
  )
}

export default Card