import {REGISTER,LOGIN,LOGOUT,GET_ALL_DOGS,NEXTPAGE,PREVPAGE,NEXTPAGETEMP,PREVPAGETEMP,CEROPAGE,CEROPAGETEMP,DOG_SEARCH,DOG_BYNAME,DOG_BYNAMEERROR,DOG_BYNAME_DETAIL,DOG_BYGROUP,GET_TEMPS,GET_IMAGES,DOG_CREATED,GET_ALL_DOGS_BYTEMPS, GET_NAMES} from "./actionsType";


const initialState = {

    myDogs: [], // Voy pisando siempre esta array
    newDogsOrder:'',
    
    myDogsByTemps: [],
    newDogTemps:{
        temp:'',
        dogsFrom:''},

    allDogs: [], //Este queda como base para modificarlo

    allTemps:[],
    allImages:[],
    allNames:[],

    dogsById:[],
    dogsByName:[],
    dogByNameError:'',
    dogByNameDetail:[],
    dogsByBreedGroup: [],
    serverMessage:'',
    dogCreated:'',
    logStatus:false,
    pageTemp:0, 
    page:0,
}

const reducer = (state = initialState, {type,payload}) =>{
    
    switch(type) {

        case GET_ALL_DOGS:
            return { ...state,
             myDogs: payload.data,
             newDogsOrder:payload.order};


        case GET_ALL_DOGS_BYTEMPS:
            return {
            ...state,
            myDogsByTemps:payload.data,
            newDogTemps:payload.dogTemps

        }
        
        case NEXTPAGE:
            return { ...state,
                page: payload};
                     
        case PREVPAGE:
            return { ...state,
                page: payload}; 

        case CEROPAGE:
            return { ...state,
            page: 0}; 

        case NEXTPAGETEMP:
            return { ...state,
             pageTemp: payload};
                             
        case PREVPAGETEMP:
            return { ...state,
            pageTemp: payload}; 
        
        case CEROPAGETEMP:
            return { ...state,
            pageTemp: 0}; 

        
        case DOG_SEARCH:
            let dog = state.dogsById.find(dog=> dog.id === payload.id) //SI existe no lo Agrego
            if(!dog){
               return { ...state,
               dogsById: [...state.dogsById, payload]}; 
            };
        break;

        case DOG_BYNAME:
            let dog2 = state.dogsByName.find(dog=>dog.name === payload.name) //SI existe no lo agrego
            if(!dog2){
                return { ...state,
             dogsByName: [...state.dogsByName, payload]};
            };
        break;

        case DOG_BYNAMEERROR:
            return {
                ...state,
                dogByNameError: payload};
        
        case DOG_BYNAME_DETAIL:
            return {
                ...state,
                dogByNameDetail: payload}; 
                
        case LOGIN:
            return {
                ...state,
            logStatus: payload};          
            
        case LOGOUT:
            return {
                ...state,
                logStatus: payload}; 

        case REGISTER:
            return {
                ...state,
            serverMessage: payload};
            
            
            case DOG_BYGROUP:
            return { ...state,
                dogsByBreedGroup: payload};
        
        case GET_TEMPS:
            return {
                ...state,
                allTemps:payload
            }

            case GET_IMAGES:
                return {
            ...state,
            allImages:payload
            }

        case GET_NAMES:
            return {
                ...state,
            allNames:payload
        }

        case DOG_CREATED:
            return {
            ...state,
            dogCreated:payload
             }   


        default:
            return{...state}        
    }
    
}

export default reducer;