import ISkill from "../../types/ISkill";

class SkillDto {
  id: number;
  name: string;

  constructor(skillObject: ISkill) {
    this.id = skillObject.id;
    this.name = skillObject.name;
  }
}

export default SkillDto;