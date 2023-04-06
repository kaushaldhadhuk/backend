const express = require("express");
const app = express();
const Cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
require("./database");
require("dotenv").config()

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_API_KEY,
	api_secret: process.env.CLOUD_API_SECRET,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload({ useTempFiles: true }));
app.use(express.static("files"));
app.use(Cors());
app.use('/upload', express.static('upload'));

// Define All Routes file Here
const userRoutes = require("./routes/user.routes")
const categoryRoutes = require("./routes/category.routes")
const subCategoryRoutes = require("./routes/subcategory.routes")
const superAdminRoutes = require("./routes/superAdmin.routes")
const productRoutes = require("./routes/product.routes")
const imageRoutes = require("./routes/upload-image")
const contactRoutes = require("./routes/contactus.routes")
const enquiryRoutes = require("./routes/enquiry.routes")
const blogRoutes = require("./routes/blog.routes")
const serviceRoutes = require("./routes/service.routes")

// Define All Routes Here
app.use("/users", userRoutes)
app.use("/category", categoryRoutes)
app.use("/subcategory", subCategoryRoutes)
app.use("/superAdmin", superAdminRoutes)
app.use("/product", productRoutes)
app.use("/image", imageRoutes)
app.use("/contact", contactRoutes)
app.use("/enquiry", enquiryRoutes)
app.use("/blog", blogRoutes)
app.use("/service", serviceRoutes)

app.listen(7000, () => {
	console.log("server started");
});
