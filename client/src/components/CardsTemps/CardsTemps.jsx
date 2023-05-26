import React,{useEffect,useState} from 'react'
import './CardsTemps.Module.css'
import { connect } from 'react-redux';
import  {nextHandlerTemp,prevHandlerTemp,getAllDogsByTemps,ceroHandlerTemp,getAllDBTemps} from '../../redux/actions';
import {Card} from '../RoutesConection/RoutesConection'



const CardsTemps = ({renderStatus,pageTemp,myDogsByTemps,nextHandlerButton,prevHandlerButton,ceroHandler,getAllDogsTempsAction,renderFormButton,getAllDBTempsAction,allTemps,newDogTemps}) => {

  const[dogTemps,setTemp] = useState({
    temp:newDogTemps.temp,
    dogsFrom:newDogTemps.dogsFrom,
  })

  const handleOnChange=  (event) =>{
    setTemp({
      ...dogTemps,
      [event.target.name] : event.target.value
  })

  }

  //Retorna de la ultima pagina a la CERO
  if(!Array.isArray(myDogsByTemps)){
    ceroHandler();
  }

  //Monto el componente Cuando cambia la pagina
  useEffect(async () =>{
    getAllDBTempsAction();
    await getAllDogsTempsAction({dogTemps,pageTemp})
  },[dogTemps,pageTemp])



  return (
    <div className='CardTemps'>

      <div className='containerCardsTemps'>
        <button className='btnRender' name='card' onClick={renderFormButton} >Cards of Dogs</button>
        <div className='divButton'>
          <button className='btnPage' onClick={()=>{prevHandlerButton(pageTemp)}}>Prev</button>
          <h1>{pageTemp}</h1>
          <button className='btnPage' onClick={()=>{nextHandlerButton(pageTemp)}}>Next</button>
        </div>

        <div className='btnCardsTemp1'>
          <h3>Filter By Temps</h3>

          <select className='select' name='dogsFrom' defaultValue='pop' onChange={handleOnChange}>
            {newDogTemps.dogsFrom !== '' ?<option value='pop' >Seleccion Actual {newDogTemps.dogsFrom}</option>:<option value='pop' disabled >Seleccione uno</option>}
            <option value="DB" >Dogs from DataBase</option>
            <option value="API" >Dogs from Api</option>
          </select>

          <select className='select' name='temp'  defaultValue='' onChange={handleOnChange}>
          {newDogTemps.temp !== '' ?<option value='' >Seleccion Actual {newDogTemps.temp}</option>:<option value='' disabled >Seleccione uno</option>}
                {allTemps.map(dogTemps => (
                <option value={dogTemps.name} key={dogTemps.id}>{dogTemps.name}</option>
                    ))}
          </select>

        </div>
      </div>

      <div className='cardTemps' >
        {myDogsByTemps.length > 0 &&
       myDogsByTemps.map(({id,name,temperament,temperaments,image,breed_group}) => {
          if(id){
          return(
          <Card
            key={id}
            id={id}
            name={name}
            breed_group={breed_group}
            temperament={temperaments?temperaments:temperament}
            image={image}
            renderStatus={renderStatus}
          />
          )}
        })}
      </div>

    </div>
  )
}


const mapStateToProps = (state)=>{   //importo de mi estdo GLOBAL
  return{
    myDogsByTemps:state.myDogsByTemps,
    pageTemp:state.pageTemp,
    allTemps:state.allTemps,
    newDogTemps:state.newDogTemps
  }
}

const mapDispatchToProps = (dispatch)=>{  //Despacho Acciones
  return{
    getAllDogsTempsAction: (pageTemp)=>{dispatch(getAllDogsByTemps(pageTemp))}, //Lista filtrada

    getAllDBTempsAction: ()=>{dispatch(getAllDBTemps())},              //Temperamentos
    nextHandlerButton: (pageTemp)=>{dispatch(nextHandlerTemp(pageTemp))},
    prevHandlerButton: (pageTemp)=>{dispatch(prevHandlerTemp(pageTemp))},
    ceroHandler: ()=>{dispatch(ceroHandlerTemp())}
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardsTemps); //Aviso a que componente se esta conectando