const cloudinary = require("cloudinary").v2

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadMediaToCloudianary = async (filepath) => {
    try {
        const result = await cloudinary.uploader.upload(filepath, {
            resource_type: "auto",
        })
        return result
    } catch (error) {
        console.log("Error Uploading To Cloudinary, ", error)
        throw new Error('Error Uploading To Cloudinary')
    }
}

const deleteMediaFromCloudinary = async(publicId)=> {
    try {
        await cloudinary.uploader.destroy(publicId)
    } catch (error) {
        console.log("Failed To Delete Assest From Cloudinary, ", error)
        throw new Error('Failed To Delete Assest From Cloudinary')
    }
}

module.exports = {uploadMediaToCloudianary, deleteMediaFromCloudinary}