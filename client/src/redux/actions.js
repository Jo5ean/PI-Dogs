import axios from "axios";

// const RUTA_GET = 'http://localhost:3000/dogs/get';
//metemos la funcion dentro de una variable
//por que cuando tenemos un error nos va a indicar que esta en la variable, si solo fuese string javascript no especifica donde

export const GET_DOGS = "GET_DOGS";
export const SEARCH_ERROR = "SEARCH_ERROR";
export const GET_TEMPS = "GET_TEMPS";
export const GET_DETAIL = "GET_DETAIL";

export const FILTER_BY_TEMP = "FILTER_BY_TEMP";
export const FILTER_BY_ORIGIN = "FILTER_BY_ORIGIN";
export const SORT_BY_NAME = "SORT_BY_NAME";
export const SORT_BY_WEIGHT = "SORT_BY_WEIGHT";


export function getDogs(name) {
  return async function (dispatch) {
    try {
      if (name) {
        return axios
          .get(`http://localhost:3000/dogs/get?name=${name}`)
          .then((res) => dispatch({ type: GET_DOGS, payload: res.data }))
          .catch((err) => dispatch({ type: GET_DOGS, payload: err.data }));
      }
      let res = await axios.get("http://localhost:3000/dogs/get", {}); //se puede pasar el objeto vacio?
      return dispatch({ type: GET_DOGS, payload: res.data });
    } catch (err) {
      let error = axios
        .get(`http://localhost:3000/dogs/get?name=${name}`)
        .then((res) => res.data); //consultar esta parte
      return dispatch({ type: SEARCH_ERROR, payload: error });
    }
  };
}

export function getTemps() {
  return async function (dispatch) {
    let res = await axios.get("http://localhost:3000/temps/getTemps", {});
    return dispatch({ type: GET_TEMPS, payload: res.data });
  };
}

export function postDog(payload) {
  return async function (dispatch) {
    let res = await axios.post("http://localhost:3000/dogs/post", payload);
    return res;
  };
}

export function getDetails(id) {
  return async function (dispatch) {
    try {
      let res = await axios.get(`http://localhost:3000/dogs/get/${id}`, {});
      return dispatch({ type: GET_DETAIL, payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };
}

export function filterByTemp(payload) {
  return {
    type: FILTER_BY_TEMP,
    payload,
  };
}

export function filterByOrigin(payload) {
  return {
    type: FILTER_BY_ORIGIN,
    payload,
  };
}

export function sortByName(payload) {
  return {
    type: SORT_BY_NAME,
    payload,
  };
}

export function sortByWeight(payload) {
  return {
    type: SORT_BY_WEIGHT,
    payload,
  };
}

/*
fetch.get(RUTA_GET).then(reponse => reponse.json()).then(data => respuestaFinal => dispatch())
    
*/
