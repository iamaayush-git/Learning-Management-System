import multer from "multer";
import path from "path";
import createHttpError from "http-errors";



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});


const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image")) {
    cb(createHttpError(400, "Only images are allowed"), false)
  } else {
    cb(null, true)
  }
}

const upload = multer({ storage, fileFilter })

export default upload