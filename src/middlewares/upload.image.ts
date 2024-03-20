import { Request } from 'express';
import multer, { File } from 'multer';
import path from 'path';
import fs from 'fs';

const imagesDirectory = path.join(__dirname, '../images');

if (!fs.existsSync(imagesDirectory)) {
  fs.mkdirSync(imagesDirectory);
}

const storage = multer.diskStorage({
  destination: function (req: Request, file: File, cb: (error: Error | null, destination: string) => void) {
    cb(null, imagesDirectory);
  },
  filename: function (req: Request, file: File, cb: (error: Error | null, filename: string) => void) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  }
});

function fileFilter(req: Request, file: File, cb: (error: Error | null, isAccept: boolean) => void) {
  const allowedExtensions = ['.png', '.jpg', '.jpeg'];
  const fileExtension = path.extname(file.originalname).toLowerCase();

  cb(null, allowedExtensions.includes(fileExtension));

}

const uploadImage = multer({ storage, fileFilter });
export default uploadImage;
