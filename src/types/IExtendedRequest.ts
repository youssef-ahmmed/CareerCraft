import { Request } from "express";
import { File } from 'multer';

interface IExtendedRequest extends Request {
  id?: string;
  skills?: string[];
  file: File;
}

export default IExtendedRequest;
