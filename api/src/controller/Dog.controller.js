const axios = require("axios");
const { Dog, Temp } = require("../db");
const {getAllDogs} = require('./helper');


// [ ] GET /dogs:
// Obtener un listado de las razas de perro
// Debe devolver solo los datos necesarios para la ruta principal

// [ ] GET /dogs?name="...":
// Obtener un listado de las razas de perro que contengan la palabra ingresada como query parameter
// Si no existe ninguna raza de perro mostrar un mensaje adecuado
const getDogsByName = async (req, res, next) => {
  try {
    const name = req.query.name;
    console.log(name);
    let allDogs = await getAllDogs();
    // console.log(allDogs);
    if(name){
         let dogName = allDogs.filter((dog) => dog.name.toLowerCase().includes(name.toLowerCase()));
      dogName.length? res.send(dogName) : res.send("No hay datos");
    }else{
      res.status(200).send(allDogs);  
    }
  } catch (e) {
    next(e);
  }
};


// [ ] GET /dogs/{idRaza}:
// Obtener el detalle de una raza de perro en particular
// Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
// Incluir los temperamentos asociados
const getDog = async (req, res, next) => {
  try {
    const {idRaza} = req.params;
    console.log(idRaza);
    const allRazas = await getAllDogs();
    if(idRaza){
      let raza = await allRazas.filter((raza) => raza.id == idRaza); //== compara los valores luego de convertirlos a un mismo tipo de dato
      raza.length? res.send(raza) : res.send("No hay datos");
    }
  } catch (e) {
    next(e);
  }
};

// [ ] POST /dog:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body
// Crea una raza de perro en la base de datos
const postDogs = async (req, res, next) => {
  //sacamos el estado local del body
  try{
  const { name, height, weight, life_span, image, temperaments } = req.body;
  // console.log(req.body);
  const dogCreated = await Dog.create({
    name,
    height,
    weight,
    life_span: life_span + " years",
    image,
  });
  // console.log(dogCreated);
  let tempDb = await Temp.findAll({
    where: {
      name: temperaments, //nose si va el sequelize model definido en la base de datos
  }
  });
   console.log(tempDb);
  dogCreated.addTemp(tempDb);
  res.status(200).send('Race created successfully!');
  } catch (e) {
    next(e);
  }
};

//   const { dog, tempIds } = req.body;
//   if (dog) {
//     try {
//       let newDog = await Dog.create(dog);

//       //realizamos las relaciones con los temperamentos
//       let arr = [];
//       for (let i = 0; i < tempIds.length; i++) {
//         arr[i] = await newDog.addTemp(tempIds[i]); //funcion creada por sequelize cuando hacemos los modelos
//       }

//       if (newDog && arr[0])
//         res.json({ message: "Añadiste una nueva raza!", data: newDog });
//       else res.json({ message: "No se pudo añadir la raza" });
//     } catch (e) {
//       next(e);
//     }
//   } else {
//     res.send("No hay datos");
//   }
// };

module.exports = {
  postDogs,
  getDog,
  getDogsByName,
};
