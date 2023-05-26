import React, {useState,useEffect,useRef} from 'react'
import validation from './validation';
import './FormRegister.Module.css';
import { connect } from 'react-redux';
import  {register} from '../../redux/actions';
import imagen1 from '../../ultils/Imagenes/perritoregister.png'
import imagen2 from '../../ultils/Imagenes/accesoriosRegister.png'


const FormRegister = ({registerButton,renderFormButton,serverMessage}) => {

const [message,setMessage] = useState('')
const formRef = useRef(null);// Para Vaciar el FORM


const [userData,setForm]= useState({
  name:'',  
  email:'',
  password:''
});

const [errors ,setErrors]= useState({
    name:'',
    email:'',
    password:''
});

const handleOnChange = (event) => {
    setForm({
        ...userData,
        [event.target.name] : event.target.value
    })
    
    setErrors(
        validation({
         ...userData,
        [event.target.name] : event.target.value
        }))   
}

const handleOnSubmit =  (event)=>{
  event.preventDefault();
  registerButton(userData);
  formRef.current.reset();
}
//Cada vez que se ejecute SUBMIT actualizo el mensaje
useEffect(()=>{
  setMessage(serverMessage);
},[handleOnSubmit]);

  return (

    <div className='divFormRegister'>    
        <div className='cuerpoFormRegister'>
            <form className='formRegister'  ref={formRef} onSubmit ={handleOnSubmit}>
            <img className ='imagenFormRegister2' src={imagen2} alt="imageForm" />
              <div className='aux'>
                <h1 className='fromTitle' >REGISTRAR USUARIO</h1>
                
                {/* Manejo Error Back */}
                <div className='accesoNegado'> {message}  </div> 
                <div className='div1y2Register'>
                    <label>NAME</label>
                    <hr />
                    <input type="name" className='inputRegister' placeholder='Tu Nombre aqui' name='name' value={userData.value} onChange={handleOnChange}/>
                    {errors.name && <p>{errors.name}</p>}
                </div>
                <div className='div1y2Register'>
                    <label htmlFor="email">EMAIL</label>
                    <hr />
                    <input type="email" className='inputRegister' placeholder='Tu email aqui' name='email' value={userData.value} onChange={handleOnChange}/>
                    {errors.email && <p>{errors.email}</p>}
                </div>
                <div className='div1y2Register'>
                    <label >PASSWORD</label>
                    <hr />
                    <input type="password" className='inputRegister' placeholder='Tu password aqui' name='password' value ={userData.value} onChange={handleOnChange}/>
                    {errors.password && <p>{errors.password}</p>}
                </div>
                <button className='buttonRegister' >REGISTER</button>
                <button className='buttonRegister' name='form' onClick={renderFormButton} >GO TO LOGIN</button>
                <br />
              </div>  
                
            </form>
            <img className ='imagenFormRegister' src={imagen1} alt="imageForm" />
        </div>
    </div>
  )
}

const mapStateToProps = (state)=>{   //importo de mi estdo GLOBAL
  return{
    logStatus:state.logStatus,
    serverMessage:state.serverMessage
  }
}

const mapDispatchToProps = (dispatch)=>{  //Despacho Acciones
  return{
    registerButton: (userData)=>dispatch(register(userData)),   
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormRegister); //Aviso a que componente se esta conectando