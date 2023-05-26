import React, {useState} from 'react'
import validation from './validation';
import './FormLogin.Module.css';
import { connect } from 'react-redux';
import  {logIn} from '../../redux/actions';
import imagen1 from '../../ultils/Imagenes/loginForm.png'




const FormLogin = ({logInButton,renderFormButton,logStatus}) => {

const [advertencia,setAdvertencia] = useState('');

//Estados del Form
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

//Modifica los cambios en tiempo real
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

//Submit Del Form
const handleOnSubmit = (event)=>{
    event.preventDefault();
    logInButton(userData);
    if(!logStatus) setAdvertencia('Datos Ingresados Incorrectamente') //Manejo Error desde el Front
}

  return (

    <div className='divFormLogin' >
        <div className='cuerpoFormLogin'>
            <img className ='imagenFormLogin' src={imagen1} alt="imageForm" />
            <form className='formLogin' onSubmit ={handleOnSubmit}>
                <div className='accesoNegado'>{advertencia}</div>
                <div className='div1y2Login'>
                    <label>NAME</label>
                    <hr />
                    <input type="name" className='inputLogin' placeholder='Tu Nombre aqui' name='name' value={userData.value} onChange={handleOnChange}/>
                    {errors.name && <p>{errors.name}</p>}
                </div>
                <div className='div1y2Login'>
                    <label htmlFor="email">EMAIL</label>
                    <hr />
                    <input type="email" className='inputLogin' placeholder='Tu email aqui' name='email' value={userData.value} onChange={handleOnChange}/>
                    {errors.email && <p>{errors.email}</p>}
                </div>
                <div className='div1y2Login'Login>
                    <label >PASSWORD</label>
                    <hr />
                    <input type="password" className='inputLogin' placeholder='Tu password aqui' name='password' value ={userData.value} onChange={handleOnChange}/>
                    {errors.password && <p>{errors.password}</p>}
                </div>
                <button className='buttonLogin' >INGRESAR</button>
                <button className='buttonLogin' name='form' onClick={renderFormButton} >REGISTRARSE</button>
                <br />
            </form>
            
        </div>
    </div>
    
  )
}


const mapStateToProps = (state)=>{   //importo de mi estdo GLOBAL
  return{
    logStatus:state.logStatus,  
  }
}

const mapDispatchToProps = (dispatch)=>{  //Despacho Acciones
  return{
    logInButton: (userData)=>dispatch(logIn(userData)),   
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormLogin); //Aviso a que componente se esta conectando