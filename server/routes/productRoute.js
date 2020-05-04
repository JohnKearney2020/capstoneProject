import express from 'express'
import Product from '../models/productModel'


const router = express.Router();

router.get('/', async (req, res) => {
    const products = await Product.find({});
    res.send(products);
});

router.post("/", async(req, res)=>{
    const product = new Product({
        title: req.body.title,
        image:req.body.image,
        category:req.body.category,
        price:req.body.price,
        qtyInStock:req.body.qtyInStock,
        rating:req.body.rating,
        numOfRev:req.body.numOfRev,
        description:req.body.description,
    });
    const newProduct = await product.save();
    if(newProduct){
        return res.status(201).send({message : "New Product Created", data: newProduct})
    }
    return res.status(500).send({ message: "Error"})
})

export default router;