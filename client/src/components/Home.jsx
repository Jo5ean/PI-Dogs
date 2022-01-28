// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// //Ahora importamos las actions y los otros componentes
// import { getDogs, getTemps, filterByTemp, filterByOrigin, sortByName } from "../redux/actions";
// import Card from "./Card";
// import SearchBar from "./SearchBar";
// import Paginado from "./Paginado";

// export default function Home() {
//     const dispatch = useDispatch();
//     const allDogs = useSelector((state) => state.dogs);
//     console.log(allDogs);
//     const allTemps = useSelector((state) => state.temperaments); //temperaments o temps

// //Empezamos por el paginado:
//     //   estado actual    setea el estado actual
//     //         |           |
//     const [currentPage, setCurrentPage] = useState(1);//el useState sete el estado inicial(1st page)
//     const [dogsPerPage] = useState(8) //de esta forma cumplimos con la consigna

//     //definimos los indices del ultimo y el primer dog por pagina, para finalmente obttener cuantos perros recorrimos
//     const indexOfLastDog = currentPage * dogsPerPage;
//     const indexOfFirstDog = indexOfLastDog - dogsPerPage;
//     const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);

//     //definimos el estado de los filtros. Esto modifica el estado cuando ordenamos para asi poder devolverlo
//     const [setOrden] = useState("");

//     const paginado = (pageNumber) => {
//         setCurrentPage(pageNumber);
//     }
// //Procedemos a realizar la logica del renderizado:
//     //primero nos traemos los etados de los perros y sus temperamentos
//     useEffect(() => {
//         dispatch(getDogs())
//     }, [dispatch]);

//     useEffect(() => {
//         dispatch(getTemps())
//     } , [dispatch]);

//     //segundo definimos las funciones handlers, que nos facilitan el renderizado, para no poner logica en los botones
//     function handleClick(e){
//         e.preventDefault();
//         setCurrentPage(1);
//         dispatch(getDogs());
//     }
//     function handleFilterByTemp(e){
//         e.preventDefault();
//         setCurrentPage(1);
//         dispatch(filterByTemp(e.target.value));
//     }
//     function handleFilterByOrigin(e){
//         e.preventDefault();
//         setCurrentPage(1);
//         dispatch(filterByOrigin(e.target.value));
//     }
//     function handleSortByName(e){
//         e.preventDefault();
//         setCurrentPage(1);
//         dispatch(sortByName());
//         setOrden(`Ordenado de ${e.target.value}`);
//     }
//     // function handleSortByWeight(e){
//     //     e.preventDefault();
//     //     setCurrentPage(1);
//     //     dispatch(sortByWeight());
//     //     setOrden(`Ordenado de ${e.target.value}`);
//     // }

// //Realizamos el renderizado:
//     return (
//         <div className="home">
//             <div className="homeHeader">
//                 <ul>
//                     <li>
//                         <button onClick={e=>{handleClick(e)}}>Home</button>
//                     </li>
//                     {/* <li>
//                         <Link to='/dogs'><button>Breed Creator</button></Link>
//                     </li> */}
//                     <li className="content">
//                         <select onChange={e=>handleFilterByTemp(e)}>
//                             <option key={0} value='all'>All Temperaments</option>
//                             {allTemps?.sort(function(a,b){
//                                 if(a.name < b.name) return -1;
//                                 if(a.name > b.name) return 1;
//                                 return 0;
//                             }).map((temp) => {
//                                 return(<option key={temp.id} value={temp.name}>{temp.name}</option>)
//                             })
//                             }
//                         </select>
//                     </li>
//                     <li className="content">
//                         <select onChange={e=>handleFilterByOrigin(e)}>
//                             <option value='all'>All Dogs</option>
//                             <option value='api'>Existent Dogs</option>
//                             <option value='created'>Created Dogs</option>
//                         </select>
//                     </li>
//                     <li className="content">
//                         <select onChange={e=>handleSortByName(e)}>
//                             <option value='selected' hidden>Sort By</option>
//                             <option value='asc' >A to Z</option>
//                             <option value='desc'>Z to A</option>
//                         </select>
//                     </li>
//                     {/* <li className="content">
//                         <select onChange={e=>handleSortByWeight(e)}>
//                             <option value='selected' hidden>Sort By</option>
//                             <option value='asc' >Ascending</option>
//                             <option value='desc'>Descending</option>
//                         </select>
//                     </li> */}
//                     <li>
//                         <SearchBar />
//                     </li>
//                 </ul>
//         </div>

//         <h1>Dog Finder | Dog Creator</h1>

//         <Paginado dogsPerPage={dogsPerPage} totalDogs={allDogs.length} paginado={paginado}/>

//         <div className="homeContent">
//             {currentDogs?.map((dog) => {
//                 return (
//                     <div key={dog.id}>
//                         <Link to={`/dogs/${dog.id}`}>
//                             <Card 
//                             name={dog.name}
//                             image={dog.image}
//                             temperaments={dog.temperaments}
//                             weight={dog.weight}
//                             key = {dog.id}
//                             />
//                         </Link>
//                     </div>
//                 )
//             })}
//         </div>

//         <Paginado dogsPerPage={dogsPerPage} totalDogs={allDogs.length} paginado={paginado}/>
//         <Link to='/'><button><span>Wellcome Friend..</span></button> </Link>
//         </div>
//     )
// }

import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, getTemperaments, filterDogsByTemperament, filterDogsByOrigin, sortByName, sortByWeight } from "../redux/actions";
import { Link } from 'react-router-dom';
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import '../styles/Home.css'


export default function Home() {
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs);
    const allTemperaments = useSelector((state) => state.temperaments);
    
    // Paginado:
    const [currentPage, setCurrentPage] = useState(1); // En una constante me guardo el estado local actual y la otra me setea el estado actual. El state inicial es 1 porque empiezo en la primer página.
    const [dogsPerPage, /*_setDogsPerPage*/] = useState(8); // Me guardo cuantos perros quiero por página.
    const indexOfLastDog = currentPage * dogsPerPage; // El índice del último perro de cada página va a ser el numero de la página multiplicado por la cantidad de perros por página.
    const indexOfFirstDog = indexOfLastDog - dogsPerPage; // El índice del primer perro de cada página va a ser el índice del último de esa página menos la cantidad de perros por página.
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog); // Los perros mostrados en cada página serán los que estén en la porción que va desde el primero hasta el último de cada página, de la lista total de perros.

    const [/*_orden*/, setOrden] = useState(''); // Estado local que me sirve para modificar el estado cuando ordeno y renderizar los perros ordenados como quiero.

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    //---------------------------------------------------------------------

    // Ahora voy a traerme del estado los perros cuando el componente se monta:
    useEffect(() => { // useEffect simula los lifecycles de los estados locales.
        dispatch(getDogs()) // Este dispatch es lo mismo que hacer el mapDispatchToProps
    }, [dispatch]) // El segundo parámetro del useEffect es un array donde va todo de lo que depende el useEffect para ejecutarse.
    
    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch])

    function handleClick(e) {
        e.preventDefault();
        setCurrentPage(1);
        dispatch(getDogs())
    }

    function handleFilterTemperaments(e) {
        e.preventDefault();
        setCurrentPage(1);
        dispatch(filterDogsByTemperament(e.target.value))
    }

    function handleFilterOrigin(e) {
        e.preventDefault();
        setCurrentPage(1);
        dispatch(filterDogsByOrigin(e.target.value))
    }

    function handleSortByName(e) {
        e.preventDefault();
        dispatch(sortByName(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`);
    }

    function handleSortByWeight(e) {
        e.preventDefault();
        dispatch(sortByWeight(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`);
    }

    return (
        <div className='home'>

            <div className='divNB'>
                <ul className='navbar'>
                    <li >
                        <button onClick={e => { handleClick(e) }} className='elementNB' >
                            Home
                        </button>
                    </li>
                    {/* <li>
                        <Link to='/dogs' ><button className='elementNB' >
                            Create pupper
                        </button></Link>
                    </li> */}
                    <li className='content-select'>
                        <select onChange={e => handleSortByName(e)}  >
                            <option value='selected' hidden className='elementNB' >Sort breeds by name</option>
                            <option value='asc'  >A - Z</option>
                            <option value='desc'  >Z - A</option>
                        </select>
                    </li>
                    <li className='content-select' >
                        <select onChange={e => handleSortByWeight(e)}  >
                            <option value='selected' hidden>Sort by weight</option>
                            <option value='asc'>Lighter to heavier</option>
                            <option value='desc'>Heavier to lighter</option>
                        </select>
                    </li>
                    <li className='content-select' >
                        <select onChange={e => handleFilterTemperaments(e)}  >
                            <option key={0} value='all'>All temperaments</option>
                            {allTemperaments?.sort(function (a, b) {
                                if (a.name < b.name) return -1;
                                if (a.name > b.name) return 1;
                                return 0;
                            }).map(el => {
                                return (
                                    <option key={el.id} value={el.name}>{el.name}</option>
                                )
                            })}
                        </select>
                    </li>
                    <li className='content-select' >
                        <select onChange={e => handleFilterOrigin(e)}  >
                            <option value='all'>All breeds</option>
                            <option value='api'>Existent breeds</option>
                            <option value='created'>Created breeds</option>
                        </select>
                    </li>
                    <li>
                        <SearchBar />
                    </li>
                </ul>
            </div>

            
            <h1>  Dog Finder / Creator  </h1>

            <Paginado dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginado={paginado} />


            <div className='container'>
                {
                        currentDogs?.map((el) => {
                        return (
                            <div key={el.id} className='cardHome'>
                                <Link to={'/home/' + el.id} style={{ textDecoration: 'none' }} >
                                    <Card
                                        name={el.name}
                                        image={el.image}
                                        temperaments={el.temperaments}
                                        weightMin={el.weightMin}
                                        weightMax={el.weightMax}
                                        key={el.id}
                                    />
                                </Link>
                            </div>
                        )
                    })
                }
            </div>

            <Paginado dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginado={paginado} />
            <Link to='/' ><button className='welcome'><span>Welcome Page</span></button></Link>
        </div>
    )

}