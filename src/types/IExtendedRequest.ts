import { Request } from "express"

interface IExtendedRequest extends Request {
  id?: string;
}

export default IExtendedRequest;
