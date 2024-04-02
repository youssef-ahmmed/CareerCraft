import { Router } from 'express';
import { verifyToken } from "../middlewares/verify.token";
import JobController from "../controllers/job.controller";
import {
  validateCreateNewJob,
  validateGetJobsBySkillsName,
  validateUpdateSpecificJob
} from "../middlewares/job.validator";
import { verifyCompanyExistance, verifyEntityExistance, verifyUserExistance } from '../middlewares/verify.entity';

const jobRoute = Router();

jobRoute
  .post('/',
    verifyToken,
    verifyCompanyExistance,
    validateCreateNewJob,
    JobController.createNewJob
  );

jobRoute
  .get('/by-skills',
    verifyToken,
    verifyEntityExistance,
    validateGetJobsBySkillsName,
    JobController.getJobsBySkillsName
  );

jobRoute
  .get('/matched-skills',
    verifyToken,
    verifyUserExistance,
    JobController.getJobsMatchedUserSkills
  );

jobRoute
  .get('/applied',
    verifyToken,
    verifyUserExistance,
    JobController.getJobsAppliedByUserId
  );

jobRoute
  .get('/:jobId',
    verifyToken,
    verifyEntityExistance,
    JobController.getSpecificJobById
  );

jobRoute
  .put('/:jobId', verifyToken, validateUpdateSpecificJob, JobController.updateSpecificJobById);

jobRoute
  .delete('/:jobId', verifyToken, JobController.deleteSpecificJobById);

export default jobRoute;
