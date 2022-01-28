import React from "react";

function Card({name, image, temperaments, weight}){
    return (
        <div className="card">
            <div>
                <h1>{name}</h1>
            </div>
            <div>
                <img src={image} alt={`${name}`} width='250px' heigth='200px'/>
            </div>
            <div>
                <h3>{function (temperaments){
                    if(typeof(temperaments)=== 'string')return temperaments;
                    if(Array.isArray(temperaments)){
                        let temps = temperaments.map(el => el.name);
                        return temps.join(', '); //los uno todo como te los entrega la api, sino seria un solo quilombo.
                    }
                }(temperaments)}</h3>
            </div>
            <div>
                <h6>Weigth: {weight}</h6>
            </div>
        </div>
    )
}

export default Card;