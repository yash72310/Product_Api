require('dotenv').config()
const express=require('express')
const app=express();
var cors = require('cors')
const PORT=process.env.PORT || 5000
const mongoose=require('mongoose')
const product_route=require('./Routes/product')
const product=require('./models/product')
const ProductJson=require('./product.json')

mongoose.connect(process.env.mongo_url,{useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true, useFindAndModify : true })
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected...')
});

// product.create(ProductJson);   // I will put the data in product model  
app.use(cors());


app.get("/",(req,res)=>{
    res.send("Hello World")
})

//middleware to us router


app.use('/product/api',product_route)





app.listen(PORT,()=>{
    console.log(`Running on PORT ${PORT}`)
})

