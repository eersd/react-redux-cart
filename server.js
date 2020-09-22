// import Pusher from "pusher";
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");

const app = express();
app.use(bodyParser.json());

const Pusher = require("pusher-js");
const pusher = new Pusher({
    appId: '1070545',
    key: 'a692f130cf06402ee20f',
    secret: '1e7009dead937e4b49b3',
    cluster: 'eu',
    encrypted: true
});

mongoose.connect("mongodb+srv://admin:eL1OHrceu7QjaTGp@cluster0.k4yoq.mongodb.net/shoppingCart?retryWrites=true&w=majority");

const db = mongoose.connection;
db.once("open", () => {
    console.log("DB connected");

    const listCollection = db.collection("productsList");
    const changeStream = listCollection.watch();

    changeStream.on("change", (change) => {
        console.log(change);

        if(change.operationType === 'insert') {
            const productDetails = change.fullDocument;
            pusher.trigger('products', 'inserted',
                {
                    title: productDetails.title,
                    description: productDetails.description,
                    image: productDetails.image,
                    price: productDetails.price,
                    availableSizes: productDetails.availableSizes,
                }
            );
        } else{
            console.log('Error triggering Pusher');
        }
    });
});


const Product = mongoose.model(
    "productsList",
    new mongoose.Schema({
        _id: {type: String, default: shortid.generate},
        title: String,
        description: String,
        image: String,
        price: Number,
        availableSizes: [String],
    })
);

app.get("/",(req,res) => {
    res.status(200).send('hello world')
})

// app.get("/api/products" , (req,res) => {
//     const products = Product.find((err,data) => {
//         if (err){
//             res.status(500).send(err);
//         }else{
//             res.status(200).send(data);
//         }
//         console.log(err);
//     });
//     res.send(products);
// });
app.get("/api/products" , (req,res) => {
    Product.find({},(err,data) => {
        if (err){
            res.status(500).send(err);
        }else{
            res.status(200).send(data);
        }
        console.log(err);
    });
});

app.post("/api/products", async (req,res) => {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.send(savedProduct);
});

app.delete("/api/products/:id", async(req,res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.send(deletedProduct);
})

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("serve at http://localhost:5000"));