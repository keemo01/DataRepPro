const express = require('express')
const app = express()
const port = 4000
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

// determine path and work out build folder
// serve the static files from the React app
const path = require('path');
app.use(express.static(path.join(__dirname, '../build')));
app.use('/static', express.static(path.join(__dirname, 'build//static')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse appplication/json
app.use(bodyParser.json())

// connect to mongodb
const myConnectionString = 'mongodb+srv://admin:admin@cluster0.ovjly.mongodb.net/productDatabase?retryWrites=true&w=majority';
mongoose.connect(myConnectionString, { useNewUrlParser: true });

// schema for database
const Schema = mongoose.Schema;

var productSchema = new Schema({
    name: String,
    qty: String,
    image: String
});

// create model for database for interaction
var ProductModel = mongoose.model("product", productSchema)

// get request from url, in this case '/' = home page/domain
app.get('/', (req, res) => {
    res.send('Hello World!')
})

// get request from /api/products and response with product json
app.get('/api/products', (req, res) => {

    // find doc in database
    ProductModel.find((err, data) => {
        res.json(data);
    })

})

// returns data (products) in that id
app.get('/api/products/:id', (req, res) => {

    // interaction to get data
    ProductModel.findById(req.params.id, (err, data) => {
        // send data from database
        res.json(data);
    })
})

// post request to create new product
app.post('/api/products', (req, res) => {

    // interact to create
    ProductModel.create({
        name: req.body.name,
        qty: req.body.qty,
        image: req.body.image
    })

    // server to client to prevent duplicate creation
    res.send('Product Added');
})

// update product with specific id
app.put('/api/products/:id', (req, res) => {

    // find product with that id and update from database
    ProductModel.findByIdAndUpdate(req.params.id, req.body, { new: true },
        (err, data) => {
            res.send(data)
        })
})

// listen from http (/api/products/:id) that has delete method
app.delete('/api/products/:id', (req, res) => {

    // delete record with that specific id (id associated with delete button)
    ProductModel.deleteOne({ _id: req.params.id },
        (error, data) => {
            if (error) {
                res.send(error);
            } else {
                res.send(data);
            }
        })
})

// handles any requests that don't match the ones above
// send html file from build folder
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/../build/index.html'));
});    

// listen from port
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
