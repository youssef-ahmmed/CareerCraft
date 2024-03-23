import { Router } from 'express';
import { verifyToken } from "../middlewares/verify.token";
import JobController from "../controllers/job.controller";
import {
  validateCreateNewJob,
  validateGetJobsBySkillsName,
  validateUpdateSpecificJob
} from "../middlewares/job.validator";

const jobRoute = Router();

jobRoute
  .post('/', verifyToken, validateCreateNewJob, JobController.createNewJob);

jobRoute
  .get('/:jobId', verifyToken, JobController.getSpecificJobById)
  .get('/', verifyToken, validateGetJobsBySkillsName, JobController.getJobsBySkillsName)
  .get('/matched-skills/users/:userId', verifyToken, JobController.getJobsMatchedUserSkills)
  .get('/applied/users/:userId', verifyToken, JobController.getJobsAppliedByUserId);

jobRoute
  .put('/:jobId', verifyToken, validateUpdateSpecificJob, JobController.updateSpecificJobById);

jobRoute
  .delete('/:jobId', verifyToken, JobController.deleteSpecificJobById);

export default jobRoute;
