import {REGISTER,LOGIN,LOGOUT,GET_ALL_DOGS,NEXTPAGE,PREVPAGE,NEXTPAGETEMP,PREVPAGETEMP,CEROPAGE, CEROPAGETEMP,DOG_SEARCH,DOG_BYNAME,DOG_BYNAMEERROR,DOG_BYGROUP,GET_TEMPS,GET_IMAGES,DOG_CREATED,GET_ALL_DOGS_BYTEMPS,GET_NAMES,DOG_BYNAME_DETAIL} from './actionsType';
//ADD,REMOVE,FILTER,ORDER,
import axios from 'axios';

//REGISTRAR USUARIO
export const register = (userData)=> {
    const endpoint = `/user/register/`;
    return async (dispatch)=>{
        try {
            const { data } = await axios.post(endpoint, {userData});
            if(data){
                return dispatch({
                type: REGISTER,
                payload: data,
                });
            } 
        } catch (error) {
            return dispatch({
                type: REGISTER,
                payload: error.response.data,
                });
            }     
    }
}

//LOGIN USUARIO
export const logIn = (userData)=> {

const endpoint = `/user/login/`;
return async (dispatch)=>{
    try {
        const { data } = await axios.post(endpoint, {userData});
       if(data){
            return dispatch({
            type: LOGIN,
            payload: data,
            });
        } 
    } catch (error) {
        return dispatch({
            type: REGISTER,
            payload: error.response.data,
            });
        }     
}
}

//LOGOUT USUARIO
export const logOut = (newState) => {
console.log(newState)
return (dispatch) => {
    //console.log(newState)
    return dispatch({
        type: LOGOUT,
        payload:newState,
        });
}
}

//Dogs HOME
export const getAllDogs = (props) => {
    const {page,order} = props
    const endpoint = `/getDogs/?page=${page}&order=${order}`;
    return async (dispatch) => {
        try {
            const { data } = await axios.get(endpoint);
            return dispatch({
                type: GET_ALL_DOGS,
                payload: {data,order},
            });
        } catch (error) {
            console.log(error.response.data);
        }
    };
};

//Dogs x pagina FILTRADO POR TEMPS
export const getAllDogsByTemps = ({pageTemp,dogTemps}) => {//1   {a,c}
    let temp = dogTemps.temp;
    let dogsFrom = dogTemps.dogsFrom;

    const endpoint = `/filterDogs/?page=${pageTemp}&temp=${temp}&dogsFrom=${dogsFrom}`;
    return async (dispatch) => {
        try {
            const { data } = await axios.get(endpoint);
            return dispatch({
                type: GET_ALL_DOGS_BYTEMPS,
                payload: {data,dogTemps},
            });
        } catch (error) {
            console.log(error.response.data);
        }
    };
};

//Dogs x filtrados TOCANDO breedGroup--------------
export const getAllDogsFiltered = (breed_group) => {
    const endpoint = `/dogs/?breed_group=${breed_group}`;
    return async (dispatch) => {
        try {
            const { data } = await axios.get(endpoint);
            return dispatch({
                type: DOG_BYGROUP,
                payload: data,
            });
        } catch (error) {
            console.log(error.response.data);
        }
    };
};
//! PAGINADO CARDS----
//Pagina++
export const nextHandler = (page) => {
    return (dispatch) => {
        const nextPage = page + 1;
        return dispatch({
            type: NEXTPAGE,
            payload: nextPage,
        });
    }
}
//Pagina--
export const prevHandler = (page) => {
    return (dispatch) => {
        const prevPage = page - 1;
        if(prevPage < 0) return;
        return dispatch({
            type: PREVPAGE,
            payload: prevPage,
        });
    }
}

//Final de pagina = 0
export const ceroHandler = () => {
    return (dispatch) => {
        const ceroPage = 0;
        return dispatch({
            type: CEROPAGE,
            payload: ceroPage,
        });
    }
}

//! Paginado TEMPS -----
//Pagina++TEMP
export const nextHandlerTemp = (pageTemp) => {
    return (dispatch) => {
        const nextPage = pageTemp + 1;
        return dispatch({
            type: NEXTPAGETEMP,
            payload: nextPage,
        });
    }
}
//Pagina--TEMP
export const prevHandlerTemp = (pageTemp) => {
    return (dispatch) => {
        const prevPage = pageTemp - 1;
        if(prevPage < 0) return;
        return dispatch({
            type: PREVPAGETEMP,
            payload: prevPage,
        });
    }
}

//Final de pagina = 0
export const ceroHandlerTemp = () => {
    return (dispatch) => {
        const ceroPage = 0;
        return dispatch({
            type: CEROPAGETEMP,
            payload: ceroPage,
        });
    }
}



//Funcion busca en API x ID para BOTON BUSQUEDA ALEATORIA
export const onSearch = (id) => {
    
    const endpoint = `/dogs/detail/${id}`;
    return async (dispatch) => {
        try {
            const { data } = await axios.get(endpoint);
            if(data.name){
                return dispatch({
                type: DOG_SEARCH,
                payload: data,
                });
            } 
        } catch (error) {
            console.log(error.response.data);
        }
    };             
}
//Funcion buscar X NOMBRE  componente BOTON SEARCHBAR PARAMS
export const searchByName = (name) => {
    console.log(name)
    const endpoint = `/dogs/name/${name}`;
    return async (dispatch) => {
        try {
            const { data } = await axios.get(endpoint);
            if(data){
                return dispatch({
                type: DOG_BYNAME,
                payload: data,
                });
            } 
        } catch (error) {
            return dispatch({
                type: DOG_BYNAMEERROR,
                payload: error.response.data,
                });
        }
    };             
}

//Funcion buscar X NOMBRE  componente DETAIL
export const searchByNameDETAIL = (name) => {
    const endpoint = `/dogs/name/${name}`;
    return async (dispatch) => {
        try {
            const { data } = await axios.get(endpoint);
            if(data){
                return dispatch({
                type: DOG_BYNAME_DETAIL,
                payload: data,
                });
            } 
        } catch (error) {
            console.log(error.response.data);
        }
    };             
}

//Funcion CREAR DOG
export const createDog = (dogInfo) => {
    const endpoint = `/dogs/`;
    return async(dispatch) => {
        try {
            const { data } = await axios.post(endpoint,{dogInfo});
            return dispatch({
                type: DOG_CREATED,
                payload: data,
            })
        } catch (error) {
            console.log(error.message); 
            
        }
    } 
 }

//! -------------------------------------------------- INFO PLANA

//Funcion buscar INFO TEMPS
export const getAllDBTemps = () => {
    const endpoint = `/getAllDBTemps`;
    return async (dispatch) => {
        try {
            const { data } = await axios.get(endpoint);
            if(data){
                return dispatch({
                type: GET_TEMPS,
                payload: data,
                });
            } 
        } catch (error) {
            console.log(error.response.data);
        }
    };             
}

//Funcion buscar INFO Imagenes
export const getAllDBImages = () => {
    const endpoint = `/imagenes`;
    return async (dispatch) => {
        try {
            const { data } = await axios.get(endpoint);
            if(data){
                return dispatch({
                type: GET_IMAGES,
                payload: data,
                });
            } 
        } catch (error) {
            console.log(error.response.data);
        }
    };             
}

//Funcion buscar INFO nombres
export const getAllDBNames = () => {
    const endpoint = `/names/`;
    return async (dispatch) => {
        try {
            const { data } = await axios.get(endpoint);
            if(data){
                return dispatch({
                type: GET_NAMES,
                payload: data,
                });
            } 
        } catch (error) {
            console.log(error.response.data);
        }
    };             
}

