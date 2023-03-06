const express = require("express");
const app = express();
const db = require ("./conn");

const UserController = require("./controller/user.control");
const bodyParser = require("body-parser");
const cors = require("cors");
// const attributeController = require("./controllers/attributes.controller");
const propertyaddController = require("./controller/propertyadd.control");
const fileUpload = require("express-fileupload");


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(express.static("files"));
app.use(cors());
app.get("/", function(req,res)
{
    res.send("Hello");
});

app.post("/insert-user", UserController.insertUserController); //register user
app.post("/login", UserController.loginUser);
app.post("/contact", UserController.contactController)
app.post("/insert-category",UserController.insertCategory)
app.get("/get-category",UserController.getCategoryList)
app.post("/insert-subcategory",UserController.insertSubcategory)

app.get("/get-size", UserController.getSizeList);

app.post("/insert-size", UserController.sizeInsertController);
app.post("/insert-property", propertyaddController.insertProperty);
app.get("/get-subcategory/:c_id",UserController.getSubCatagoryList);
app.get("/get-products",propertyaddController.getProducts)


const server = app.listen(8000,() => {
console.log("server started");

});
