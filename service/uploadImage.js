const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const enums = require("../utils/enums.json")
const messages = require("../utils/messages.json")

module.exports = {

    uploadImage: async (productImage, res) => {
        console.log(">>>>>>>>>>>>>>>>>>>>>>")
        if (!productImage.mimetype.startsWith("image")){
            console.log("object")
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: messages.INVALID_FILE_TYPE });
        }
        const maxFileSize = 1024 * 1024;
        if (productImage.size > maxFileSize){
            console.log("object ::::::::::")
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: messages.INVALID_FILE_SIZE });
        }
        try{
            const fileResult = await cloudinary.uploader.upload(
                productImage.tempFilePath,
                {
                    use_filename: true,
                    folder: "Product Images",
                }
            );
            console.log(fileResult)
    
            fs.unlink(productImage.tempFilePath, () => { });
            return fileResult;
        } catch (error){
            console.log(error)
        }
        
    },
    deleteImage: async (imageUrl) => {
        let imagePublicID = `Product Images${imageUrl.split("Product%20Images")[1].split(".")[0]}`;
        cloudinary.uploader.destroy(imagePublicID);
    }

}