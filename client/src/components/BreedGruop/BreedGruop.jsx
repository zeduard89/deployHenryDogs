import React,{useEffect} from 'react'
import './BreedGroup.Module.css'
import { connect } from 'react-redux';
import  {getAllDogsFiltered} from '../../redux/actions';
import {Card} from '../RoutesConection/RoutesConection'
import { useParams } from 'react-router-dom'
import myImage from './dogMant.jpg';




const BreedGroup = ({dogsByBreedGroup,getAllDogsAction}) => {

  const { breed_group } = useParams();

  //Monto el componente con la info inicial
  useEffect(() => {
    getAllDogsAction(breed_group);
  }, [getAllDogsAction,breed_group]);

  return (
    <div className='cardBreedGroup'>
      {dogsByBreedGroup.length > 0 &&
       dogsByBreedGroup.map(({id,name,image,minHeight,maxHeight,minWeight,maxWeight,temperament,life_span}) => {
          if(id){
          return(
          <Card
            key={id}
            id={id}
            name={name}
            breed_group={breed_group}
            image={image? image.image:myImage}
            life_span={life_span}
            minHeight={minHeight}
            maxHeight={maxHeight}
            minWeight={minWeight}
            maxWeight={maxWeight}
            temperament={temperament}
            
          />
          )
          }
        })

      }
    </div> 
  )
}


const mapStateToProps = (state)=>{   //importo de mi estdo GLOBAL
  return{
    dogsByBreedGroup:state.dogsByBreedGroup
  }
}

const mapDispatchToProps = (dispatch)=>{  //Despacho Acciones
  return{
    getAllDogsAction: (name)=>dispatch(getAllDogsFiltered(name)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BreedGroup); //Aviso a que componente se esta conectando