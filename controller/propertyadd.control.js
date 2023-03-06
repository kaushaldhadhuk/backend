const propertyModel = require("../models/property.model");
const fileModel = require("../models/file.model");
var insertProperty = (req, res) => {
  try {
    console.log(req.body);
    console.log(req.files);

    propertyModel
      .create({
        
        c_id: req.body.c_id,
        s_c_id: req.body.s_c_id,
        city: req.body.city,
        size_id: req.body.size_id,
        p_desc: req.body.p_desc,
        rent: req.body.rent,
        p_age: req.body.p_age,
        bedroom : req.body.bedroom,
        bathroom : req.body.bathroom,
        p_floor: req.body.p_floor,
        o_mono : req.body.o_mono,
        balcony : req.body.balcony,
        deposit : req.body.deposit,
        agreement : req.body.agreement,
      })
      .then((result) => {
        if (result) {
          let media = [];
          if (req.files.p_media.length == undefined) {
            media.push(req.files.p_media);
          } else {
            media = req.files.p_media;
          }
          for (let index = 0; index < media.length; index++) {
            fileModel
              .create({
                p_media: media[index].name, 
              })
              .then((result) => {
                if (result) {
                  const filePath = media[index];
                  filePath.mv(
                    `${__dirname}/../public/assets/images/${media[index].name}`,
                    (error) => {
                      if (error) {
                        console.log(error, "error1");
                      }
                    }
                  );
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
          res.send({
            status: 1,
            result: result,
            msg: "Property Inserted successfully...",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};

var getProducts = (req,res)=>{
  try{  propertyModel.find().then((products)=>{
    res.send({status:1,data:products});})
    .catch((error)=>
    {console.log(error);}
    )
  }catch(error){
    console.log(error);
  }

}


module.exports = { insertProperty ,getProducts};
