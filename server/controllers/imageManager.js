import dotenv from 'dotenv';
dotenv.config();
// multer config and functions
import multer from "multer";

const ALLOWED_FORMATS = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
const storage = multer.memoryStorage();

const upload = multer({
    storage,
    fileFilter: function(req, file, cb) {
        if(ALLOWED_FORMATS.includes(file.mimetype)){
            cb(null, true);
        } else {
            cb(new Error('Filetype not supported.'), false);
        }
    }
})

const singleUpload = upload.single('image');

export const singleUploadCtrl = (req, res, next) => {
    singleUpload(req, res, (error) => {
        if(error) {
            return res.status(422).send({ message: error.message });
        }
        next();
    })
}

// cloudinary settings and functions
import cloudinary  from 'cloudinary';

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
})

export const deleteLatestImage = async (req, res) => {
    const usr = req.body.usr;
    try {
        const search = await cloudinary.v2.search.expression(`tags:${usr}`).execute();
        const response = search.resources;
        const toDelete = response[0].public_id;
        const q = await cloudinary.v2.api.delete_resources(toDelete);
        res.status(200).json(q);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const cloudinaryUpload = (file, userid) => { return cloudinary.v2.uploader.upload(file, 
        { 
            folder: `ProfilePics/${userid}`,
            width: 500,
            height: 500,
            crop: "thumb",
            tags: [userid]
        }
    )}

// image uploading functions
const formatImage = file => {
    const bufData = file.buffer.toString('base64');
    return `data:${file.mimetype};base64,${bufData}`;
}

export const uploadImage = async (req, res) => {
    try {
        if(!req.file) {
            throw new Error('No file found!')
        }
        const base64Image = formatImage(req.file);
        const cloudRes = await cloudinaryUpload(base64Image, req.headers.usr);
        return res.status(200).json(cloudRes);
    } catch (err) {
        res.status(400).send({ message: err.message })
    }
}

export const deleteUnusedImages = async (usr) => {
    try {
        const search = await cloudinary.v2.search.expression(`tags:${usr}`).execute();
        const res = search.resources;
        res.shift()
        const toDelete = res.map((img) => {
            return img.public_id;
        })
        await cloudinary.v2.api.delete_resources(toDelete);
    } catch (err) {
        return err;
    }
}
