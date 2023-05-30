import {useState,useEffect} from 'react'
import './SearchBar.Module.css'
import { connect } from 'react-redux';
import { onSearch, searchByName,getAllDBNames } from '../../redux/actions';
import {Card} from '../RoutesConection/RoutesConection'
import myImage from './dogMant.jpg';

const SearchBar = ({onSearch,searchByName,searchByName2,dogsById,dogsByName,allNames,dogByNameError,getAllDBNames}) => {

  useEffect(() => {
    getAllDBNames()
  },[])

  const [name,setName] = useState('seleccioneUno');
  const [name2,setName2] = useState('seleccione');

  const handleOnChange = (event) =>{
    setName(event.target.value)
  }
  const handleOnChange2 = (event) =>{
    setName2(event.target.value)
  }
  console.log(name2)
  // const handleOnClick = () =>{
  //   searchByName(name2)
  // }
  



  const random = () => {
  let randomId = Math?.floor(Math.random()* 226) + 1
  console.log(randomId);
  return randomId;
  }
  
  return (
    <div className='seachBar'>
      <div className='containerSearchBar' >
        <div>
          <button className='btnSearchBar1'  onClick={()=> onSearch(random())}>Random Character</button>
        </div>
        <div className='SearchBar'>
            <p>{dogByNameError}</p>
          <button className='btnSearchBar2'  id='buttonSearchBar' onClick={()=>searchByName(name)}>Search</button>
          
          
          {/*Agregado PI
          <input type="text" className='btnSearchBar2' onChange={handleOnChange2}/>
          <button  className='btnSearchBar2' onClick={()=>searchByName2(name2)}>ACCION INPUT</button> */}

          <select className='select' name='select' defaultValue='defaultSelect' onChange={handleOnChange}>
            <option value='defaultSelect' key='defaultSelect' disabled >Seleccione uno</option>
            {allNames.map(dogName => (
              <option value={dogName.name} key={dogName.id} >{dogName.name}</option>
              ))}
          </select>
        </div>
      </div>

        <div className='tarjetasCards'>
          
            {dogsById && dogsById.map(({id,name,bred_for,breed_group,origin,life_span,minHeight,maxHeight,minWeight,maxWeight,image,temperament}) => {
              return(
              <Card
                key={name}
                id={id}
                name={name}
                bred_for={bred_for}
                image={image? image : myImage} //SI no exite IMG de mantenimiento EJ ID 152
                breed_group={breed_group}
                origin={origin}
                life_span={life_span}
                minHeight={minHeight}
                maxHeight={maxHeight}
                minWeight={minWeight}
                maxWeight={maxWeight}
                temperament={temperament}
              />
              )})}
            
            {dogsByName && dogsByName.map(({id,name,bred_for,breed_group,origin,life_span,minHeight,maxHeight,minWeight,maxWeight,image,temperament}) => {
              return(
              <Card
                key={id}
                id={id}
                name={name}
                bred_for={bred_for}
                image={image && image.image ? image.image : myImage} //SI no exite IMG de mantenimiento EJ ID 152
                breed_group={breed_group}
                origin={origin}
                life_span={life_span}
                minHeight={minHeight}
                maxHeight={maxHeight}
                minWeight={minWeight}
                maxWeight={maxWeight}
                temperament={temperament}
              />
              )})}
          
        </div>   
    </div>
  );
}

const mapStateToProps = (state)=>{   //importo de mi estdo GLOBAL
  return{
     dogsById:state.dogsById,
     allNames:state.allNames,
     dogsByName:state.dogsByName,
     dogByNameError:state.dogByNameError,
  }
}

const mapDispatchToProps = (dispatch)=>{  //Despacho Acciones
  return{
    onSearch: (id)=>dispatch(onSearch(id)),               //INFO Dog
    searchByName: (name)=> dispatch(searchByName(name)),  //INFO Dog
    getAllDBNames: ()=> dispatch(getAllDBNames()),       //INFO plana de NAMEs
    searchByName2: (name2)=> dispatch(searchByName(name2)),  //INFO Dog
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar); //Aviso a que componente se esta conectando