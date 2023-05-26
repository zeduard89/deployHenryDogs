import React,{useEffect,useState} from 'react'
import './Cards.Module.css'
import { connect } from 'react-redux';
import  {nextHandler,prevHandler,getAllDogs,ceroHandler} from '../../redux/actions';
import {Card} from '../RoutesConection/RoutesConection'


const Cards = ({renderStatus,page,myDogs,newDogsOrder,nextHandlerButton,prevHandlerButton,ceroHandler,getAllDogsAction,renderFormButton}) => {

  let newOrder = newDogsOrder
  const[order, setOrder] = useState(newOrder)

  const handleOrder = (event) =>{
    setOrder(event.target.value)
  }


  //Monto el componente con la info inicial
  useEffect(() => {
    getAllDogsAction({page,order});
  }, [page,order,getAllDogsAction]);

  //Retorna de la ultima pagina a la CERO
  if(!Array.isArray(myDogs)){
    ceroHandler();
  }
  



  
  return (
    <div className='Cards'>
      <div className='containerCards'>
        <button className='btnRender' name='card' onClick={renderFormButton} >Filter By Temps</button>
        <div className='divButton'>
          <button className='btnPage' onClick={()=>{prevHandlerButton(page)}}>Prev</button>
          <h1>{page}</h1>
          <button className='btnPage' onClick={()=>{nextHandlerButton(page)}}>Next</button>
        </div>
        <div className='btnCards1'>
          <h3>Order By </h3>
          <select className='select' name='orderPeso' defaultValue='pop' onChange={handleOrder}>
            {newOrder !== '' ?<option value='pop' >Seleccion Actual {newOrder} </option>:<option value='pop' disabled >Seleccione uno</option>}
            <option value='ABC' >A-Z</option>
            <option value="CBA">Z-A</option>
            {/* Corregir TEXTO Orden DES ASC */}
            <option value="ASCENDENTE">PESO DESCENDENTE</option>
            <option value='DESCENDENTE'>PESO ASCENDENTE</option>
        </select>
        </div>
        
      </div>
      
      
      <div className='tarjetasCards'>
      {myDogs.length > 0 &&
       myDogs.map(({id,name,breed_group,image,minHeight,maxHeight,minWeight,maxWeight,temperament}) => {
          if(id){
          return(
          <Card
            key={id}
            id={id}
            name={name}
            breed_group={breed_group}
            image={image}
            minHeight={minHeight}
            maxHeight={maxHeight}
            minWeight={minWeight}
            maxWeight={maxWeight}
            temperament={temperament}
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
     myDogs:state.myDogs,
     page:state.page,
     newDogsOrder:state.newDogsOrder,
  }
}

const mapDispatchToProps = (dispatch)=>{  //Despacho Acciones
  return{
    getAllDogsAction: (page)=>dispatch(getAllDogs(page)),
    nextHandlerButton: (page)=>{dispatch(nextHandler(page))},
    prevHandlerButton: (page)=>{dispatch(prevHandler(page))},
    ceroHandler: ()=>{dispatch(ceroHandler())}
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cards); //Aviso a que componente se esta conectando

