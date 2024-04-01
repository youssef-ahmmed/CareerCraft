import { Request, Response, NextFunction } from "express";
import { validateReqBody } from "./req.body.validation";
import JobValidation from "../validations/job.validation";
import SkillValidation from "../validations/skill.validation";
import IExtendedRequest from "../types/IExtendedRequest";

export const validateCreateNewJob = validateReqBody(JobValidation.createJob);

export const validateUpdateSpecificJob = validateReqBody(JobValidation.updateJob);

export const validateGetJobsBySkillsName = async (
  req: IExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  const error = SkillValidation.getSkillsFromQueryParams(req.query);
  if (error && error.error && error.error.details && error.error.details[0]) {
    return res.status(400).json({ message: error.error.details[0].message });
  }

  const skillsParams: string = req.query.skills as string;
  const skills: string[] = skillsParams.split(' ');
  
  req.skills = skills;

  const err = JobValidation.getJobBySkills(req);
  if (err && err.error && err.error.details && err.error.details[0]) {
    return res.status(400).json({ message: err.error.details[0].message });
  }

  return next();
};
