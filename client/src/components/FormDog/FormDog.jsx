import React, {useState,useEffect, useRef} from 'react'
import './FormDog.Module.css'
import { connect } from 'react-redux';
import  {getAllDBTemps,createDog} from '../../redux/actions';
import validation from './validation'
import imagen1 from '../../ultils/Imagenes/dog1.png'
import imagen2 from '../../ultils/Imagenes/dog2.png'



const FormDog = ({getAllDBTempsAction,createDogAction,allTemps,dogCreated}) => {
   
    const formRef = useRef(null);// Para Vaciar el FORM

    //Traigo los Temps para los SELECT, evito que el usuario escriba mal un temp de la lista
    useEffect(() => {
        getAllDBTempsAction();
    },[])

    //Revisar Limpieza de form
    useEffect(()=>{
        if (dogCreated && dogCreated.length >= 60){     
    formRef.current.reset();// Resetea el formulario
    setForm({
    name:'',
    bred_for:'',
    breed_group:'',
    origin:'',
    life_span:'',
    minHeight:'',
    maxHeight:'',
    minWeight:'',
    maxWeight:'',
    image:null,
    temperamentId1:'',
    temperamentId2:'',
    temperamentId3:'',
    temperamentId4:''
    })}

    },[dogCreated])

const [dogInfo,setForm]= useState({
    name:'',
    bred_for:'',
    breed_group:'',
    origin:'',
    life_span:'',
    minHeight:'',
    maxHeight:'',
    minWeight:'',
    maxWeight:'',
    image:null,
    temperamentId1:'',
    temperamentId2:'',
    temperamentId3:'',
    temperamentId4:''
 });
      
 const [errors ,setErrors]= useState({
   name:'',
   bred_for:'',
   breed_group:'',
   origin:'',
   life_span:'',
   minHeight:'',
   maxHeight:'',
   minWeight:'',
   maxWeight:'',
   image:'',    
   temperamentId1:'',
   temperamentId2:'',
   temperamentId3:'',
   temperamentId4:''
 });
      
 const handleOnChange = (event) => {

     setForm({
         ...dogInfo,
         [event.target.name] : event.target.value
     })
     
     setErrors(
        validation({
            ...dogInfo,
           [event.target.name] : event.target.value
           }))
          
 }


 
 const handleOnSubmit = (event)=>{
     event.preventDefault();
     createDogAction(dogInfo); 
}
 
 return (
      
    <div className='containerFormDog'>

            <img className ='imagenForm1' src={imagen1} alt="imageForm" />

            <form className='column2FormDog' ref={formRef} onSubmit ={handleOnSubmit}>
                <h1 className='fromTitle' >CREA TU PROPIO PERRO</h1>

                {/* Alerta DEL BACK */}
                <div className='accesoNegado'>"{dogCreated}"</div>

                <div className='containerDiv1y2'>
                    <div className='divisor1'>
                        <div className="divLabelInput">
                            <label className='labelFormDog'>NAME</label>
                            <input className='inputFormDog' type="name" placeholder='Tu Nombre aqui' name='name' value={dogInfo.value} onChange={handleOnChange}/>
                        </div>
                        {errors.name && <p>{errors.name}</p>}
                    </div>
                    <div className='divisor1'>
                        <div className="divLabelInput">
                            <label className='labelFormDog'>BRED FOR</label>
                            <input className='inputFormDog' type="text" placeholder='Especialidad' name='bred_for' value={dogInfo.value} onChange={handleOnChange}/>
                        </div>
                        {errors.bred_for && <p>{errors.bred_for}</p>}
                    </div>
                    <div className='divisor1'>
                        <div className="divLabelInput">
                            <label className='labelFormDog'>BREED GROUP</label>
                            <input className='inputFormDog' type="text" placeholder='raza' name='breed_group' value ={dogInfo.value} onChange={handleOnChange}/>
                        </div>
                        {errors.breed_group && <p>{errors.breed_group}</p>}
                    </div>
                    <div className='divisor1'>
                        <div className="divLabelInput">
                            <label className='labelFormDog'>ORIGIN</label>
                            <input className='inputFormDog' type="text" placeholder='Origin' name='origin' value ={dogInfo.value} onChange={handleOnChange}/>
                        </div>
                        {errors.origin && <p>{errors.origin}</p>}
                    </div>
                    <div className='divisor1'>
                        <div className="divLabelInput">
                            <label className='labelFormDog'>LIFE SPAN</label>
                            <input className='inputFormDog' type="text" placeholder='lifeSpan' name='life_span' value ={dogInfo.value} onChange={handleOnChange}/>
                        </div>
                        {errors.life_span && <p>{errors.life_span}</p>}
                    </div>
                    <div className='divisor1'>
                        <div className="divLabelInput">
                            <label className='labelFormDog'>MIN HEIGHT</label>
                            <input className='inputFormDog' type="text" placeholder='minHeight' name='minHeight' value ={dogInfo.value} onChange={handleOnChange}/>
                        </div>
                        {errors.minHeight && <p>{errors.minHeight}</p>}
                    </div>
                    <div className='divisor1'>
                        <div className="divLabelInput">
                            <label className='labelFormDog'>MAX HEIGHT</label>
                            <input className='inputFormDog' type="text" placeholder='maxHeight' name='maxHeight' value ={dogInfo.value} onChange={handleOnChange}/>
                        </div>
                        {errors.maxHeight && <p>{errors.maxHeight}</p>}
                    </div>
                    <div className='divisor1'>
                        <div className="divLabelInput">
                            <label className='labelFormDog'>MIN WEIGHT</label>
                            <input className='inputFormDog' type="text" placeholder='minWeight' name='minWeight' value ={dogInfo.value} onChange={handleOnChange}/>
                        </div>
                        {errors.minWeight && <p>{errors.minWeight}</p>}
                    </div>
                    <div className='divisor1'>
                        <div className="divLabelInput">
                            <label className='labelFormDog'>MAX WEIGHT</label>
                            <input className='inputFormDog' type="text" placeholder='maxWeight' name='maxWeight' value ={dogInfo.value} onChange={handleOnChange}/>
                        </div>
                        {errors.maxWeight && <p>{errors.maxWeight}</p>}
                    </div>
                </div>
                
                <div className='nav'>
                    <h3 className='temperaments'>Temperaments</h3>
                    {errors.temperamentId1 && <p className='errorTemperamento'>{errors.temperamentId1}</p>}
                    <select className='selectDogForm' name='temperamentId1' defaultValue='' onChange={handleOnChange}>
                    <option value="" disabled >Selecciona una opción</option>
                        {allTemps.map(temp => (
                        <option value={temp.name} key={temp.id}>{temp.name}</option>
                             ))}
                    </select>
                    <select className='selectDogForm' name='temperamentId2' defaultValue='' onChange={handleOnChange}>
                    <option value="" disabled >Selecciona una opción</option>
                        {allTemps.map(temp => (
                        <option value={temp.name} key={temp.id}>{temp.name}</option>
                             ))}
                    </select>
                    <select className='selectDogForm' name='temperamentId3' defaultValue='' onChange={handleOnChange}>
                    <option value="" disabled >Selecciona una opción</option>
                        {allTemps.map(temp => (
                        <option value={temp.name} key={temp.id}>{temp.name}</option>
                             ))}
                    </select>
                    <select className='selectDogForm' name='temperamentId4' defaultValue='' onChange={handleOnChange}>
                    <option value="" disabled >Selecciona una opción</option>
                        {allTemps.map(temp => (
                        <option value={temp.name} key={temp.id} >{temp.name}</option>
                             ))}
                    </select>
                </div>
                <hr />
                <input className='inputFormDog' type="file" name='image'accept="image/*" onChange={handleOnChange}/>
                {errors.image && <p className='errorImage'>{errors.image}</p>}
                
                <button type='submit' className='buttonFormDog' >CREAR</button>
                <br />
            </form>
            <img className ='imagenForm2' src={imagen2} alt="imageForm" />

        
    </div>
    
  )
}


const mapStateToProps = (state)=>{   //importo de mi estdo GLOBAL
  return{
    allTemps:state.allTemps,
    dogCreated:state.dogCreated,
  }
}

const mapDispatchToProps = (dispatch)=>{  //Despacho Acciones
  return{
    getAllDBTempsAction: ()=>dispatch(getAllDBTemps()),
    createDogAction: (dogInfo)=>dispatch(createDog(dogInfo)),

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormDog); //Aviso a que componente se esta conectando