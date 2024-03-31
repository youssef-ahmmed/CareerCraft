import { Request, Response } from "express";
import { comparePassword, createToken } from "../utils/auth";

abstract class EntityAuthController {
  protected abstract createEntity(entityDto: any): Promise<any>;
  protected abstract getEntityByEmail(email: string): Promise<any>;

  public register = async (req: Request, res: Response) => {
    const entityDto = this.getEntityDto(req.body);

    try {
      const entity = await this.createEntity(entityDto);
      const token: string = createToken(entity.id);

      const { password, ...otherAttributes } = entity;

      return res.status(201).json({ token, ...otherAttributes });
    } catch (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const entity = await this.getEntityByEmail(email);
      if (!entity) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const isValid: boolean = await comparePassword(password, entity.password);
      if (!isValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const token: string = createToken(entity.id);
      const { password: entityPassword, ...otherAttributes } = entity;

      return res.status(201).json({ token, ...otherAttributes });
    } catch (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  protected abstract getEntityDto(requestBody: any): any;
}

export default EntityAuthController;
