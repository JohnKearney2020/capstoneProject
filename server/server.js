import data from './api-items'
import express from 'express'
import dotenv from 'dotenv'
import config from './config'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import userRoute from './routes/userRoute'
import productRoute from './routes/productRoute'

dotenv.config();

const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
    useNewUrlParser : true,
    useUnifiedTopology : true, 
    useCreateIndex : true,
}).catch(error => console.log(error.reason))


const app = express();

app.use(bodyParser.json())

app.use("/api/users", userRoute);
// app.use("/api/products", productRoute)

app.get("/api/products/:id", (req, res) => {
    const productId = req.params.id;
    const product = data.products.find(param => param._id === productId)
    if(product)
    res.send(product);
    else
        res.status(404).send({msg: "Product Not Found"})

});
app.get("/api/products", (req, res) => {
    res.send(data.products);

});

app.listen(5000, () => {
    console.log("Serrver started in Local Host 5000")
})