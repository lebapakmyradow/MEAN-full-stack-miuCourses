require("dotenv").config();
require("./api/data/db");

const express = require("express");
const path = require("path");
const app = express();
const routes = require("./api/routes");

app.use(function(req, res, next){
    console.log(req.method, req.url);
    next();
});

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api", function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'DELETE, GET, POST, PUT, PATCH');
    next();
});
app.use("/api", routes);

app.use(express.static(path.join(__dirname, "public")));


const server = app.listen(process.env.PORT, function(req, res){
    console.log("listening to port ", process.env.PORT);
});