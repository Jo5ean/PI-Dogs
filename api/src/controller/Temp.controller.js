const axios = require("axios");
const { Temp } = require("../db");


const getTemps = async (req, res, next) => {
  try {
    const temps = await Temp.findAll();
    if(!temps.length){
    //pedido a la API de los temps
    const pedido = await axios.get(
      "https://api.thedogapi.com/v1/breeds?api_key=7ea687ca-1807-4e2a-bd65-0ca4d77dd47d"
    );

    let dbTemp = pedido.data.map((e) => {
      return {
        name: e.temperament,
      };
    });
    //filtramos por si no existe la propiedad (posible correccion)
    const filtrado = dbTemp.filter((e) => e.name !== undefined);
    //recorremos los temperamentos y los pusheamos en un array vacio
    const array = [];

    filtrado.forEach((e) => {
      array.push(e.name.split(", "));
    });
    // console.log(array);
    const final = new Set();

    //recorremos el array que creamos, y a la vez recorremos las strig del array. Estas ultimas se van añadiendo al objeto set

    array.forEach((e) => {
      e.forEach((e) => {
        final.add(e);
      });
    });
    //Ahora creamos otro array que sera el que devolveremos
    const final2 = [...final];
    // console.log(final2);

    //finalmente cargamos todo en la base de datos
    await Promise.all(
      final2.map((e) => {
        Temp.create({ name: e });
      })
    );

    res.json(final2);
    } else {
      res.json(temps);
    }
    
  } catch (e) {
    next(e);
  }
}

// function getTemps(req, res, next){
//   axios.get( "https://api.thedogapi.com/v1/breeds?api_key=7ea687ca-1807-4e2a-bd65-0ca4d77dd47d" )
//   .then(temps => {
//     let dbTemp = temps.data.map(elem=>{return {id: elem.id, name: elem.temperament}})

//     dbTemp.forEach(e =>{
//       Temp.findOrCreate({where:{id: e.id, name: e.name}})
//     })
//     //res.send("Se cargo la base de datos con los temperamentos");
//   })
//   .catch(e => console.log(e));
// }

module.exports = {
  getTemps,
};
