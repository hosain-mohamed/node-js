import multer from "multer";
import { uploadPath } from "./paths.js";
import AppError from "./app.error.js";
import { FAIL } from "./http.status.text.js";

export function uploadImages(fileName) {
  const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      const ext = file.mimetype.split("/")[1];
      const name = (!fileName ? `avatar` : fileName) + `${Date.now()}.${ext}`;
      cb(null, name);
    },
  });

  const fileFilter = (req, file, cb) => {
    const fileType = file.mimetype.split("/")[0];
    if (fileType === "image") {
      cb(null, true);
    } else {
      cb(new AppError(400, { avatar: "Only images are supported" }, FAIL));
    }
  };

  return multer({
    storage: diskStorage,
    fileFilter: fileFilter,
  });
}
