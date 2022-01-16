import {
    GET_DOGS,
    GET_TEMPS,
    GET_DETAIL,
    FILTER_BY_TEMP,
    FILTER_BY_ORIGIN,
    SORT_BY_NAME,
    // SORT_BY_WEIGHT
} from './actions';

const initalState = {
    dogs: [],
    dog: {},
    temps: [],
    details: [],

}

export default function rootreducer(state = initalState, action) { //dentro de la accion tenemos un type y un payload
    switch (action.type) {
        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload,
                aux: action.payload //declaramos un auxiliar que utilizaremos y explicaremos mas adelante
            }
        case GET_TEMPS:
            return {
                ...state,
                temperaments: action.payload //ojo aca con el nombre de la variable ?????
            }
        case FILTER_BY_TEMP:
            const allDogs = state.aux; //aca usamos el aux para que cunado hacemos un filtro no se pierda el estado de los demas
            const filterTemp = action.payload === 'all' ? allDogs : allDogs.filter(dog => {
                if(typeof dog.temperament === 'string'){
                    return dog.temperament.toLowerCase().includes(action.payload.toLowerCase())
                }
                if(Array.isArray(dog.temperament)){
                    let temps = dog.temperament.map(temp => temp.name);
                    return temps.includes(action.payload);
                }
                return true;
            });
            return {
                ...state,
                dogs: filterTemp
            }
        case FILTER_BY_ORIGIN:
            const  all  = state.aux; //mismo caso para el filtro por origen
            const filterOrigin = action.payload === 'all' ? all : action.payload === 'created'? all.filter(dog => dog.createdIndDb) : all.filter(dog => !dog.createdIndDb);
            return {
                ...state,
                dogs: filterOrigin
            }
        case SORT_BY_NAME:
            const sotedByName = action.payload === "asc" ? state.aux.sort((a, b) => a.name.localeCompare(b.name)) : state.aux.sort((a, b) => b.name.localeCompare(a.name));
            return {
                ...state,
                dogs: sotedByName
            }
        // case SORT_BY_WEIGHT:
        //     const sotedByWeight = action .payload === "asc" ? state.aux.sort((a, b) => a.weight - b.weight) : state.aux.sort((a, b) => b.weight - a.weight);
        //     return {
        //         ...state,
        //         dogs: sotedByWeight
        //     }
        case GET_DETAIL:
            return {
                ...state,
                detail: action.payload
            }
            case "POST_DOG":
                return {
                    ...state,
                }
            default: 
                return state;
        }
}