import multer from "multer";
import path from "path";

//The disk storage engine gives you full control on storing files to disk.
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,  "./public/gallery")   // ../../public/gallery-> D:\projects!\public\gallery\user3.jpg&#39
    },
    filename: function (req, file, cb) {
     
      cb(null, file.originalname)
    }
  })

  // function to control which files should be uploaded and which should be skipped.
  const fileFilter = (req, file, cb) => {
    if (
      file.mimetype == "image/jpeg" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/gif"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  
export const upload = multer({ storage: storage,
fileFilter: fileFilter, })
