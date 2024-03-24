import { validateReqBody } from "./req.body.validation";
import SkillValidation from "../validations/skill.validation";

export const validateCreateSkill = validateReqBody(SkillValidation.createSkill);
