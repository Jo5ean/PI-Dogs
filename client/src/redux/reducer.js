// import {
//     GET_DOGS,
//     GET_TEMPS,
//     GET_DETAIL,
//     FILTER_BY_TEMP,
//     FILTER_BY_ORIGIN,
//     SORT_BY_NAME,
//     // SORT_BY_WEIGHT
// } from './actions';

// const initalState = {
//     dogs: [],
//     aux: [],
//     temps: [],
//     details: [],

// }

// export default function rootreducer(state = initalState, action) { //dentro de la accion tenemos un type y un payload
//     switch (action.type) {
//         case GET_DOGS:
//             return {
//                 ...state,
//                 dogs: action.payload,
//                 aux: action.payload //declaramos un auxiliar que utilizaremos y explicaremos mas adelante
//             }
//         case GET_TEMPS:
//             return {
//                 ...state,
//                 temperaments: action.payload //ojo aca con el nombre de la variable ?????
//             }
//         case FILTER_BY_TEMP:
//             const allDogs = state.aux; //aca usamos el aux para que cunado hacemos un filtro no se pierda el estado de los demas
//             const filterTemp = action.payload === 'all' ? allDogs : allDogs.filter(dog => {
//                 if(typeof dog.temperament === 'string'){
//                     return dog.temperament.toLowerCase().includes(action.payload.toLowerCase())
//                 }
//                 if(Array.isArray(dog.temperament)){
//                     let temps = dog.temperament.map(temp => temp.name);
//                     return temps.includes(action.payload);
//                 }
//                 return true; //si no es string ni array, entonces es un objeto y no hay filtro
//             });
//             return {
//                 ...state,
//                 dogs: filterTemp
//             }
//         case FILTER_BY_ORIGIN:
//             const  all  = state.aux; //mismo caso para el filtro por origen
//             const filterOrigin = action.payload === 'all' ? all : action.payload === 'created'? all.filter(dog => dog.createdIndDb) : all.filter(dog => !dog.createdIndDb);
//             return {
//                 ...state,
//                 dogs: filterOrigin
//             }
//         case SORT_BY_NAME:
//             const sotedByName = action.payload === "asc" ? state.aux.sort((a, b) => a.name.localeCompare(b.name)) : state.aux.sort((a, b) => b.name.localeCompare(a.name));
//             return {
//                 ...state,
//                 dogs: sotedByName
//             }
//         // case SORT_BY_WEIGHT:
//         //     const sotedByWeight = action .payload === "asc" ? state.aux.sort((a, b) => a.weight - b.weight) : state.aux.sort((a, b) => b.weight - a.weight);
//         //     return {
//         //         ...state,
//         //         dogs: sotedByWeight
//         //     }
//         case GET_DETAIL:
//             return {
//                 ...state,
//                 detail: action.payload
//             }
//             case "POST_DOG":
//                 return {
//                     ...state,
//                 }
//             default: 
//                 return state;
//         }
// }

import {
    GET_DOGS,
    GET_TEMPERAMENTS,
    FILTER_BY_TEMPERAMENT,
    FILTER_BY_ORIGIN,
    SORT_BY_NAME,
    SORT_BY_WEIGHT,
    GET_DETAIL,
} from "./actions";

const initialState = {
    dogs: [],
    allDogs: [],
    temperaments: [],
    detail: []
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload,
            }
        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            }
        case FILTER_BY_TEMPERAMENT:
            const allDogs = state.allDogs; // Al usar state.allDogs en lugar de state.dogs, cada vez que aplique un filtro, state.dogs va a cambiar, pero voy a seguir teniendo guardados todos los perros en mi state.allDogs, entonces voy a poder cambiar de filtro sin tener que volver a cargar la página.
            const temperamentFiltered = action.payload === 'all' ? allDogs : allDogs.filter(el => {
                if (typeof (el.temperaments) === 'string') return el.temperaments.includes(action.payload);
                if (Array.isArray(el.temperaments)) {
                    let temps = el.temperaments.map(el => el.name);
                    return temps.includes(action.payload);
                }
                return true;
            });
            return {
                ...state,
                dogs: temperamentFiltered
            }
        case FILTER_BY_ORIGIN:
            const all = state.allDogs;
            const originFiltered = action.payload === 'all' ? all : action.payload === 'created' ? all.filter(el => el.createdInDb) : all.filter(el => !el.createdInDb);
            return {
                ...state,
                dogs: originFiltered
            }
        case SORT_BY_NAME:
            const sortedName = action.payload === 'asc' ?
                state.dogs.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return 1;
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return -1;
                    }
                    return 0
                }) :
                state.dogs.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return -1;
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                dogs: sortedName,
            }

        case SORT_BY_WEIGHT:
            const sortedWeight = action.payload === 'asc' ?
                state.dogs.sort(function (a, b) {
                    return parseInt(a.weightMin) - parseInt(b.weightMin);
                }) :
                state.dogs.sort(function (a, b) {
                    return parseInt(b.weightMax) - parseInt(a.weightMax);
                });
            return {
                ...state,
                dogs: sortedWeight,
            }

        case 'POST_DOG':
            return {
                ...state,
            }

        case GET_DETAIL:
            return {
                ...state,
                detail: action.payload,
            }

        default:
            return state;
    }
}

export default rootReducer;