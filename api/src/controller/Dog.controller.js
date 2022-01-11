const axios = require("axios");
const { Dog, Temp } = require("../db");

const getDogs = async (req, res, next) => {
  try {
      //pedido a la API
    const pedido = await axios.get("https://api.thedogapi.com/v1/breeds?api_key=7ea687ca-1807-4e2a-bd65-0ca4d77dd47d");
     //pedido a la DB
    const dogDb = await Dog.findAll({include: Temp});
    if (pedido || dogDb) {
        let aux = pedido.data?.map(dog => { //para evitar que rompa preguntamos si lo que pedimos existe
            return {
                name: dog.name, 
                image: dog.image.url,
                temperament: dog.temperament,
                weigth: dog.weight.metric
                }
            })
            //podemos utilizar concat o spread operator
            //ponemos los datos de la base de datos en primer lugar
            let final = [...dogDb, ...aux];

      res.send(final);
    } else {
      res.send("No hay datos");
    }
  } catch (e) {
    next(e);
  }
};

const postDogs = async (req, res, next) => {
//sacamos el estado local del body
     const { dog, tempIds } = req.body;
        if( dog ) {
            try{
                let newDog = await Dog.create(dog);

                //realizamos las relaciones con los temperamentos
                let arr = [];
                for (let i=0; i<tempIds.length; i++){
                  arr[i] = await newDog.addTemp(tempIds[i]) //funcion creada por sequelize cuando hacemos los modelos
                }


                if(newDog && arr[0]) res.json({message: "Añadiste una nueva raza!", data: newDog});
                else res.json({message: "No se pudo añadir la raza"});

            } catch (e) {
                next(e);
            }
        } else {
            res.send("No hay datos");
        }
};



module.exports = {
  getDogs,
  postDogs
};


