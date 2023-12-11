import multer from "multer";
import { uploadPath } from "./paths.js";
import AppError from "./app.error.js";
import { FAIL } from "./http.status.text.js";

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const fileName = `avatar-${Date.now()}.${ext}`;
    cb(null, fileName);
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

const uploadAvatar = multer({
  storage: diskStorage,
  fileFilter: fileFilter,
});

export default uploadAvatar;
