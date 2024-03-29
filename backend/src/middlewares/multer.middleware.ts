import multer from "multer";
import path from "node:path";

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./public/temp");
  },

  filename: function (req, file, callback) {
    const uniqueSuffix = Date.now();

    callback(null, file.originalname + "-" + uniqueSuffix);
  },
});

export const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
}); // Maximum size is set to 6MB
