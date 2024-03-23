import { Router } from 'express';
import { validateCreateSkill } from '../middlewares/skill.validation';
import { verifyToken } from '../middlewares/verify.token';
import SkillController from '../controllers/skill.controller';
import {
  verifyUserExistance,
  verifyCompanyExistance,
  verifyEntityExistance
} from '../middlewares/verify.entity';


const skillRouter = Router();

skillRouter
  .post('/users/skills',
    verifyToken,
    validateCreateSkill,
    verifyUserExistance,
    SkillController.creatSkillsByUser
  );

skillRouter
  .delete('/users/skills/:skillId',
    verifyToken,
    verifyUserExistance,
    SkillController.deleteSkillByUser
  );

skillRouter
  .get('/users/:userId/skills',
    verifyToken,
    verifyEntityExistance,
    SkillController.getSkillsByUserId
  );

skillRouter
  .post('/jobs/:jobId/skills',
    verifyToken,
    validateCreateSkill,
    verifyCompanyExistance,
    SkillController.creatSkillsByJob
  );

skillRouter
  .delete('/jobs/:jobId/skills/:skillId',
    verifyToken,
    verifyCompanyExistance,
    SkillController.deleteSkillByJob
  );

export default skillRouter;