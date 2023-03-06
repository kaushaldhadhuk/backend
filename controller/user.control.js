const userModel = require("../models/user.model");
const categoryModel = require("../models/category.model");
const subCategoryModel = require("../models/subcate.model");
const sizeModel = require("../modelS/size.model");
const contactModel = require("../models/contact.model");




var insertUserController = (req,res) => {
  try {
    console.log(req.body,"inserted");

    userModel.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      mobile: req.body.mobile  
    })
    .then((result) => {
      if (result) {
        res.send({ status: 1, result : result}) ;
      }
      else {
        res.send({ status: 0, message :"not inserted"}) ;
      }
    })
    .catch ((error) => {
      console.log(error);
    })
  }catch(error){
      console.log(error);
    }
};

var loginUser = (req,res) => {
  try {
    userModel.findOne({ email: req.body.email , password: req.body.password})
  .then((result) => {
      if (result) {
        console.log(req.body,"login success...");
         res.send({
          status: 1,
          result : result,
          message : "login success",
         });
        } else {
          res.send({
            status: 0,
            result : [],
            message : "login failed"
          });
        }
      })
  .catch ((error) => {
      console.log(error);
    })
  }catch(error){
      console.log(error);
}
};
  

var contactController = (req,res) => {
  try {
    console.log(req.body,"inserted");

    contactModel.create({
      name: req.body.name,
      email: req.body.email,
     subject : req.body.subject,
     message: req.body.message,
    })
    .then((result) => {
      if (result) {
        res.send({ status: 1, result : result}) ;
      }
      else {
        res.send({ status: 0, message :"not inserted"}) ;
      }
    })
    .catch ((error) => {
      console.log(error);
    })
  }catch(error){
      console.log(error);
    }
};



// //------ SIGN UP ----------
// const signupUser = async (req, res) => {
//    const { email, password, mobile_no, user_type, reg_date } = req.body;
//   // console.log(req.body)
//    const user = await userModel.findOne({ email: email })
//    if (user) {
//    return res.send("user already registered");
//    }
//    else {
  
//    const salt = bcrypt.genSaltSync(10)
  
//    // Hash Password
//    const hash = bcrypt.hashSync(password, salt)
  
//    let data = new userModel({
//    email: email,
//    password: hash,
//    mobile_no: mobile_no,
//    user_type: user_type,
//    reg_date: reg_date
  
//    })
//    console.log(data);
//    const token = jwt.sign({ _id: this._id }, "secretkey");//secret key
//    // console.log("token part", token);
//    await data.save();
//    res.json({ "message": "User Created", token });
//    }
//   }

//   //------------------SIGN IN USER --------------------------------

//   const signIn = async (req,res)=>{
//    const {email , password } = req.body;
//    const user = await userModel.findOne({ email: email})
//    if(user){
//    let ismatch = await bcrypt.compare(password, user.password);
//    console.log(password, ismatch)
//    if(ismatch){
//    const token = jwt.sign({_id: user._id},"secretkey");
//    res.cookie("jwt",token);
//    res.json({"message":"user register successfully!!"})
  
//    // res.json({ user: token});
//    }
//    else{
//    res.json({"message":"email or password mismatch"});
//    }
//    }
//    else{
//    res.json({"message":"user not found"});
//    }
//   }
var insertCategory = (req,res) => {
  try {
    console.log(req.body);
    categoryModel
    .create({
      c_name: req.body.c_name,
    })
    .then((result) => {
      if (result){
          res.send({
              status :1,
              result :result,
              msg:"Category inserted successfully",
          });
      }

  })
  .catch((error) => {
      console.log(error);
  });

}catch (error){
  console.log(error);
}
};

var getCategoryList = (req, res) => {

  try{
    categoryModel
    .find()
    .then((category)=>{
      if (category){
        console.log(category);
        res.send({ status :1,data:category,msg:"category List" })
      }else {
        res.send({ status :1,data:[],msg:" List not found" });
      }
    })
    .catch((error)=>{
      console.log(error);
    });
  }catch(error){
    console.log(error);
  }
};

var insertSubcategory = (req, res) =>{
    try {

      console.log(req.body);
      subCategoryModel
      .create({
        s_c_name : req.body.s_c_name,
        c_id : req.body.c_id,
      })
      .then((result) => {
        if (result){
          res.send({ status : 1, result : result, msg:"inserted"})
        }else{
          res.send({ status : 0, result : [], msg:" Not inserted"})
        }
      }).catch((error)=>{
        console.log(error);
      })
    } catch (error) {
      console.error(error);
    }
};

var sizeInsertController = (req, res) => {
  try {
    console.log(req.body);
    sizeModel
      .create({ size_name: req.body.size_name })
      .then((result) => {
        // console.log(result);
        if (result) {
          res.send({ status: 1, result: result, msg: "size inserted" });
        } else {
          res.send({ status: 0, result: [], msg: "size not inserted" });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};


var getSubCatagoryList=(req,res)=>{
  try{
      subCategoryModel.find({c_id:req.params.c_id}).then((subcategory)=>{
          if(subcategory){
            res.send({status:1,data:subcategory,msg:"sub....."})
          }
          else{
            res.send({status:1,data:[],msg:"not....."})
          }

      }).catch((err)=>{console.log(err)})
  }catch(error){
    console.log(error);
  }
}
var getSizeList = (req, res) => {
  try {
    console.log(req.body);
    sizeModel
      .find()
      .then((result) => {
        if (result) {
          // console.log(result);
          res.send({ status: 1, data: result, msg: "list gotted" });
        } else {
          res.send({ status: 0, data: [], msg: "not inserted" });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};


module.exports ={
  insertUserController,
  loginUser,
  insertCategory,
  getCategoryList,
  insertSubcategory,
  sizeInsertController,
  getSizeList,
  getSubCatagoryList,
  contactController,

}
