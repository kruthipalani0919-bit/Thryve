import multer from "multer";
import path from "path";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {

    const allowedExtensions = [
        ".pdf",
        ".ppt",
        ".pptx"
    ];

    const extension = path.extname(file.originalname).toLowerCase();

    if (allowedExtensions.includes(extension)) {

        cb(null, true);

    } else {

        cb(new Error("Only PDF, PPT and PPTX files are allowed."));

    }

};

const upload = multer({

    storage,

    fileFilter,

    limits: {

        fileSize: 15 * 1024 * 1024

    }

});

export default upload;