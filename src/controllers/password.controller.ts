import { Request, Response } from "express";
import { comparePassword, createEmailToken, hashPassword, verifyJwtToken } from "../utils/auth";
import { sendEmail } from "../utils/send.email";
import { JwtPayload } from "jsonwebtoken";
import IExtendedRequest from "../types/IExtendedRequest";

abstract class PasswordController {
  protected abstract getEntityByEmail(email: string): Promise<any>;
  protected abstract getEntityById(id: number): Promise<any>;
  protected abstract updateEntityById(id: number, update: any): Promise<void>;

  public forgetPassword = async (req: Request, res: Response) => {
    const email: string = req.body.email;

    try {
      const entity = await this.getEntityByEmail(email);
      if (!entity) {
        return res.status(400).json({ message: 'Email not exist' });
      }

      const secret: string = process.env.TOKEN_SECRET + entity.password;
      const token: string = createEmailToken(entity, secret);
      const link: string = `${process.env.BASE_URL}/${this.getEntityType()}/reset-password/${entity.id}/${token}`;

      await sendEmail(email, link);

      return res.status(201).json({ message: 'Password reset link sent to your email account' });
    } catch (err) {
      if (err.message === 'Error sending email') {
        return res.status(500).json({ message: 'Failed to send email' });
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  public resetPassword = async (req: Request, res: Response) => {
    const { token, id } = req.params;
    const newPassword = req.body.password;

    try {
      const entityId: number = parseInt(id, 10);
      const entity = await this.getEntityById(entityId);
      if (!entity) {
        return res.status(400).json({ message: 'Invalid link or expired' });
      }

      const secret: string = process.env.TOKEN_SECRET + entity.password;
      const decodedToken: JwtPayload = verifyJwtToken(token, secret);

      if (!decodedToken) {
        return res.status(400).json({ message: 'Invalid link or expired' });
      }

      const hashedPassword: string = await hashPassword(newPassword);
      await this.updateEntityById(entityId, { password: hashedPassword });

      return res.status(201).json({ message: 'Password Updated Successfully!' });
    } catch (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public changePassword = async (req: IExtendedRequest, res: Response) => {
    const { currentPassword, newPassword } = req.body;
    const entityId: number = parseInt(req.id, 10);

    try {
      const entity = await this.getEntityById(entityId);

      const isPasswordCorrect = await comparePassword(currentPassword, entity.password);
      if (!isPasswordCorrect) {
        return res.status(401).json({ message: 'Incorrect current password' });
      }

      const hashedPassword: string = await hashPassword(newPassword);
      await this.updateEntityById(entityId, { password: hashedPassword });

      return res.status(201).json({ message: 'Password Changed Successfully!' });
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  protected abstract getEntityType(): string;
}

export default PasswordController;
