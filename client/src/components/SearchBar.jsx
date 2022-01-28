import React, { useState } from "react";
import { useDispatch } from "react-redux"
import { getDogs } from "../redux/actions"

export default function SearchBar(){

    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleImputChange(e){
        e.preventDefault();
        setName(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        let dogs = getDogs(name)
        dispatch(dogs)
        setName('') //preguntar bien esta funcion
    }

    return (
        <div>
            <input type="text" placeholder="Search" value={name} onChange={e=>handleImputChange(e)} onKeyPress={e=>e.key ==="Enter" && handleSubmit(e)}/>
            <button onClick={e=>handleSubmit(e)}>Search</button>
        </div>
    )
}
