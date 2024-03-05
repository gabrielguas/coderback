import { generateProduct } from "../utils.js"

export const getProducts = async (req,res) => {
    try{
        let products = [];
        for (let i = 0; i < 100; i++){
            products.push(generateProduct());
        }
        res.send({status: "success", payload: products});
    } catch (error){
        console.log(error);
        res.status(500).send({ error: error, message: "No se pudo obtener los productos 😑"})
    }
}