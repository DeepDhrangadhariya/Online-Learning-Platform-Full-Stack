const express = require('express');
const multer = require('multer')
const { uploadMediaToCloudianary, deleteMediaFromCloudinary } = require('../../helpers/cloudinary')

const router = express.Router()

const upload = multer({ dest: 'uploads/' })

router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const result = await uploadMediaToCloudianary(req.file.path)
        res.status(200).json({
            success: true,
            data: result
        })
    } catch (error) {
        console.log("Error uploading file, ", error)
        res.status(500).json({
            success: false,
            message: 'Error uploading file',
            error: error
        })
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params

        if (!id) {
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
        console.log("Error Deleting File", error)
        res.status(500).json({
            success: false,
            message: 'Error deleting file',
            error: error
        })
    }
})

router.post('/bulk-upload', upload.array('files', 10), async (req, res) => {
    try {

        const uploadPromises = req.files.map(fileItem => uploadMediaToCloudianary(fileItem.path))

        const results = await Promise.all(uploadPromises)

        res.status(200).json({
            success: true,
            data: results
        })

    } catch (error) {
        console.log("Error In Bulk Uploading, ", error)
        res.status(500).json({
            success: false,
            message: 'Error In Bulk Uploading',
            error: error
        })
    }
})

module.exports = router