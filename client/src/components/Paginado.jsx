import React from "react";
import '../styles/Paginado.css'

export default function Paginado({allDogs, dogsPerPage, paginado }){
    const pageNumber = [];

    for(let i = 0; i <= Math.ceil(allDogs / dogsPerPage); i++){
        pageNumber.push(i+1);
    }

    return  (
        <nav >
            <ul className="paginado">
                {pageNumber.length>1 && pageNumber.map(number => (
                    <li key={number}>
                        <button onClick={() => paginado(number)}>{number}</button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}