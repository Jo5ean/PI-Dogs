// import axios from "axios";

// // const RUTA_GET = 'http://localhost:3000/dogs/get';
// //metemos la funcion dentro de una variable
// //por que cuando tenemos un error nos va a indicar que esta en la variable, si solo fuese string javascript no especifica donde

// export const GET_DOGS = "GET_DOGS";
// export const GET_DOGS_NAMES = "GET_DOGS_NAMES";
// export const SEARCH_ERROR = "SEARCH_ERROR";
// export const GET_TEMPS = "GET_TEMPS";
// export const GET_DETAIL = "GET_DETAIL";

// export const FILTER_BY_TEMP = "FILTER_BY_TEMP";
// export const FILTER_BY_ORIGIN = "FILTER_BY_ORIGIN";
// export const SORT_BY_NAME = "SORT_BY_NAME";
// export const SORT_BY_WEIGHT = "SORT_BY_WEIGHT";

// export function getDogs(){
//   return async function (dispatch){
//     try{
//       const response = await axios.get('http://localhost:3000/dogs/get', {});
//       console.log(response.data);
//       dispatch({
//         type: GET_DOGS,
//         payload: response.data
//       })
//     } catch(error){
//       console.log(error);
//   }
// }
// }

// export function getDogsNames(name) {
//   return async function (dispatch) {
//     try {
      
//         var json = await axios.get('http://localhost:3000/dogs/get?name=' + name)
//           return dispatch({
//             type: GET_DOGS_NAMES,
//             payload: json.data
//           })
//          } catch (error) {
//         console.log(error);
//          }
//   };
// }

// export function getTemps() {
//   return async function (dispatch) {
//     let res = await axios.get("http://localhost:3000/temps/getTemps");
//     return dispatch({ type: GET_TEMPS, payload: res.data });
//   };
// }

// export function postDog(payload) {
//   return async function (dispatch) {
//     let res = await axios.post("http://localhost:3000/dogs/post", payload);
//     return res;
//   };
// }

// export function getDetails(id) {
//   return async function (dispatch) {
//     try {
//       let res = await axios.get(`http://localhost:3000/dogs/get/${id}`, {});
//       return dispatch({ type: GET_DETAIL, payload: res.data });
//     } catch (err) {
//       console.log(err);
//     }
//   };
// }

// export function filterByTemp(payload) {
//   return {
//     type: FILTER_BY_TEMP,
//     payload,
//   };
// }

// export function filterByOrigin(payload) {
//   return {
//     type: FILTER_BY_ORIGIN,
//     payload,
//   };
// }

// export function sortByName(payload) {
//   return {
//     type: SORT_BY_NAME,
//     payload,
//   };
// }

// export function sortByWeight(payload) {
//   return {
//     type: SORT_BY_WEIGHT,
//     payload,
//   };
// }

/*
fetch.get(RUTA_GET).then(reponse => reponse.json()).then(data => respuestaFinal => dispatch())
    
*/

import axios from 'axios';

export const GET_DOGS = 'GET_DOGS';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const FILTER_BY_TEMPERAMENT = 'FILTER_BY_TEMPERAMENT';
export const FILTER_BY_ORIGIN = 'FILTER_BY_ORIGIN';
export const SORT_BY_NAME = 'SORT_BY_NAME';
export const SORT_BY_WEIGHT = 'SORT_BY_WEIGHT';
export const GET_DETAIL = 'GET_DETAIL';
export const SEARCH_FAIL = 'SEARCH_FAIL';


export function getDogs(name) {
    return async function (dispatch) {
        try {
            if (name) {
                var ciu = await axios.get('http://localhost:3001/dogs/get?name=' + name)
                return dispatch({ 
                    type: GET_DOGS, 
                    payload: ciu })
           
            }
            let json = await axios.get('http://localhost:3001/dogs/get');
            return dispatch({
                type: GET_DOGS,
                payload: json.data,
            })
         } catch (err) {
            console.log(err)
        }
    }
}

export function getTemperaments() {
    return async function (dispatch) {
        let json = await axios.get('http://localhost:3001/temps/getTemp', {});
        return dispatch({
            type: GET_TEMPERAMENTS,
            payload: json.data,
        })
    }
}

export function filterDogsByTemperament(payload) {
    return {
        type: FILTER_BY_TEMPERAMENT,
        payload
    }
}

export function filterDogsByOrigin(payload) {
    return {
        type: FILTER_BY_ORIGIN,
        payload,
    }
}

export function sortByName(payload) {
    return {
        type: SORT_BY_NAME,
        payload,
    }
}

export function sortByWeight(payload) {
    return {
        type: SORT_BY_WEIGHT,
        payload,
    }
}


export function postDog(payload) {
    return async function (dispatch) {
        const response = axios.post('http://localhost:3001/dogs/post', payload);
        console.log(response);
        return response;
    }
}

// Async Await:
export function getDetails(id) {
    return async function (dispatch) {
        try {
            var json = await axios.get('http://localhost:3001/dogs/get' + id);
            return dispatch({
                type: GET_DETAIL,
                payload: json.data
            })
        } catch (err) {
            console.log(err)
        }
    }
}
