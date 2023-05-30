import './App.css';
import React,{useEffect,useState} from 'react'
import {Route , Routes, useNavigate} from 'react-router-dom';
import {Cards,CardsTemps,Detail,Error,FormLogin,FormRegister,FormDog,NavBar,SearchBar,BreedGruop} from './components/RoutesConection/RoutesConection'
import { connect } from 'react-redux';
import axios from 'axios';
axios.defaults.baseURL = 'https://deployhenrydogs-production.up.railway.app/'

function App({logStatus}) {
  
  //Condiciono la ubicacion del usuario, si esa logIn o No
  const navigate = useNavigate();

  useEffect(() => {
    logStatus? navigate('/home')
    :navigate('/')
 }, [logStatus]);

 //Condiciono la renderizacion de los FORM's y las CARDS en una misma RUTA
 const [renderForm, setRenderForm] = useState({
  form:true,
  card:true,
 });
//Los Manejo por Eventos
 const renderFormButton = (event) =>{
  setRenderForm({
    ...renderForm,
     [event.target.name]:!renderForm[event.target.name
    ]})
 }

  
  return (

    <div className="App">
      
      <NavBar/>

      <Routes>
       
      {renderForm.form?<Route path='/' element={<FormLogin logStatus={logStatus} renderFormButton={renderFormButton}/>}/>
                 : <Route path='/' element={<FormRegister renderFormButton={renderFormButton}/>}/>}

      {renderForm.card?(<Route path='/home' element={<Cards renderStatus={renderForm.card} renderFormButton={renderFormButton}/> }/>)
                 :(<Route path='/home' element={<CardsTemps renderStatus={renderForm.card} renderFormButton={renderFormButton}/> }/>)}

        <Route path='/searchDogs' element={<SearchBar/>}/>
        <Route path='/detail/:name' element={<Detail/>}/>
        <Route path='/breed_group/:breed_group' element={<BreedGruop/>}/>
        <Route path='/createDog' element={<FormDog/>}/>
        <Route path=':error' element={<Error/>}/>
      </Routes>
    
    </div>

  );
}

const mapStateToProps = (state)=>{   //importo de mi estdo GLOBAL
  return{
    logStatus:state.logStatus,
     
  }
}



export default connect(
  mapStateToProps,
  null,
)(App); //Aviso a que componente se esta conectando

//! import { useSelector, useDispatch } from "react-redux";

//! const dogs = useSelector(state => state.dogs)
//! const dispatch = useDispatch()

//! useEffect(() => {
//!   dispatch(funcionRandom())
//! }, [dispatch])

