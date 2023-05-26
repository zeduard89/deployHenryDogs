import React,{useEffect} from 'react'
import './Detail.Module.css'
import { connect } from 'react-redux';
import  {searchByNameDETAIL} from '../../redux/actions';
import { useParams } from 'react-router-dom'
import {Card} from '../RoutesConection/RoutesConection'
import myImage from './dogMant.jpg';




const Detail = ({searchByNameDETAIL,dogByNameDetail}) => {

  const { name } = useParams();
  
  //Monto el componente con la info inicial
  useEffect(() => {
    if (name) {searchByNameDETAIL(name);}
  }, [name]);

  return (
    <div className='Card'>
          <h1>DOGS DETAIL</h1>
          <Card
            key={dogByNameDetail.id}
            id={dogByNameDetail.id}
            name={dogByNameDetail.name}
            bred_for={dogByNameDetail.bred_for}
            image={dogByNameDetail.image? dogByNameDetail.image.image:myImage}
            breed_group={dogByNameDetail.breed_group}
            origin={dogByNameDetail.origin}
            life_span={dogByNameDetail.life_span}
            minHeight={dogByNameDetail.minHeight}
            maxHeight={dogByNameDetail.maxHeight}
            minWeight={dogByNameDetail.minWeight}
            maxWeight={dogByNameDetail.maxWeight}
            temperament={dogByNameDetail.temperament}
          />
          
    </div> 
  )
}


const mapStateToProps = (state)=>{   //importo de mi estdo GLOBAL
  return{
    dogByNameDetail:state.dogByNameDetail,
  }
}

const mapDispatchToProps = (dispatch)=>{  //Despacho Acciones
  return{
    searchByNameDETAIL: (name)=>dispatch(searchByNameDETAIL(name)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Detail); //Aviso a que componente se esta conectando