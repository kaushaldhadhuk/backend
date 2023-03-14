const { createSuperAdmin } = require("./Controller/superAdmin.controllers")
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const db = mongoose.connect("mongodb://localhost:27017/rental", async (error, Db) => {
    if (error) {
        console.log("Database not connected", error);

    } else {
        console.log("Database Connceted");
        await createSuperAdmin()
        // const data = "https://thumbs.dreamstime.com/b/cow-vet-veterinary-working-barn-75359103.jpg"
        // let buff = Buffer.from(data).toString('base64');
        // let text = buff.toString('base64');
        // console.log("Database Connceted",buff);
    }
});
// var request = require('request').defaults({ encoding: null });

// request.get("https://thumbs.dreamstime.com/b/cow-vet-veterinary-working-barn-75359103.jpg", function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//         data = "data:" + response.headers["content-type"] + ";base64," + Buffer.from(body).toString('base64');
//         // console.log(data);
//     }
// });

module.exports = db;