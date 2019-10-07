const express = require("express");

const morgan = require("morgan");
const path = require("path");
const passport = require("passport");
var bodyParser = require( 'body-parser' );
var cookieParser = require('cookie-parser')

require("./passport/conexionDB");
require('./passport/passport');
//Configurar 
const app = express();

app.set("port",4200);

//Midlewares



app.set(morgan('dev'));

app.use(cookieParser())


app.use(bodyParser.json({limit:"6mb"})); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true,limit:"6mb" })); // support encoded bodies

app.use(passport.initialize());

//Static files
app.use(express.static(path.join(__dirname,"public")));

//Routes
app.use("/outh",require("./routes/outhRutes"));
app.use("/api",require("./routes/apiRoutes"));
app.use("/",require("./routes/indexRoutes"));




const puerto = app.get("port");

app.listen(puerto,()=>{
    console.log("Servidor web iniciado en "+puerto);
});