export interface Skill {
  name:string;
  level:SkillLevel;
  link?:string;  //for technology/tool homepage
}

export enum SkillLevel {
  expert = "Expert",
  professional = "Professional",
  experienced = "Experienced"
}