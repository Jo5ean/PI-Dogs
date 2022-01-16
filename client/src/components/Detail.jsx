import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getDetails } from '../redux/actions';

export default function Detail(props) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getDetails(props.match.params.id)); //accedemos al id del detalle
    }, [dispatch, props.match.params.id]);

    const myDog = useSelector(state => state.detail); //.detail?? 

    return (
        <div>
            <Link to="/home"><button>Home</button></Link>
            <Link to="/form"><button>Creat your own dog!</button></Link>
            {
                myDog.length > 0 ?
                    <div>
                        <h1>{myDog[0].name}</h1>
                        <ul>
                            <li>
                                <div>
                                    <img src={myDog[0].image} alt={myDog[0].name} />
                                </div>
                            </li>
                            <li>
                                <div>
                                    <h4>Temperaments:</h4>
                                    <ul>
                                        {myDog[0].createdInDb ?
                                            myDog[0].temperaments.map((e) => {
                                                return <li key={e.dog_temp.id}><label>{e.name}</label></li>
                                            } //dog_temp es la relacion que hacemos en la DB, el id nose si esta bien, reemplazar por temperamentID
                                            ) : myDog[0].temperaments ?
                                                myDog[0].temperaments.split(', ').map(e => {
                                                    return <li key={e}><label>{e}</label></li>
                                                }) :
                                                <li>No data</li>}
                                    </ul>
                                    <h4>Weight: </h4>
                                    <p>{myDog[0].weight}</p>
                                    <h4>Height: </h4>
                                    <p>{myDog[0].height}</p>
                                    <h4>Life Span: </h4>
                                    <p>{myDog[0].life_span}</p>
                                </div>
                            </li>
                        </ul>
                    </div> :
                    <div>
                        <h1>Loading...</h1>
                    </div>
            }
        </div>
    );
}
