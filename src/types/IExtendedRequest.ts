import { Request } from "express";
import { File } from 'multer';

interface IExtendedRequest extends Request {
  id?: string;
  file: File;
}

export default IExtendedRequest;
