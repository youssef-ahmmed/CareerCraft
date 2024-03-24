import ISkill from "../../types/ISkill";

class SkillDto {
  name: string;

  constructor(skillObject: ISkill) {
    this.name = skillObject.name;
  }
}

export default SkillDto;