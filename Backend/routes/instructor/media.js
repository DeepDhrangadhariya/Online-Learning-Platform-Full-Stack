const express = require('express');
const multer = require('multer')
const {uploadMediaToCloudianary, deleteMediaFromCloudinary} = require('../../helpers/cloudinary')

const router = express.Router()

const upload = multer({dest: 'uploads/'})

router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const result = await uploadMediaToCloudianary(req.file.path)
        res.status(200).json({
            success: true,
            data: result
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Error uploading file',
            error: error
        })
    }
})

router.delete('/delete/:id', async(req, res) => {
    try {
        const {id} =  req.params

        if(!id) {
            res.status(400).json({
                success: false,
                message: 'Asset Id Is Required'
            })
        }

        await deleteMediaFromCloudinary(id)

        res.status(200).json({
            success: true,
            message: 'Asset deleted successfully from cloudinary'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Error deleting file',
            error: error
        })
    }
})

module.exports = router