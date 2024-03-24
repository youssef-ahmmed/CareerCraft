import { validateReqBody } from "./req.body.validation";
import JobValidation from "../validations/job.validation";

export const validateCreateNewJob = validateReqBody(JobValidation.createJob);

export const validateUpdateSpecificJob = validateReqBody(JobValidation.updateJob);

export const validateGetJobsBySkillsName = validateReqBody(JobValidation.getJobBySkills);
