import { Job } from "./job";
import { Skill } from "./skill";

export interface Cv {
  name:string;  //the name of the person the CV describes
  intro:string;
  portrait:string;  //path to image of the person's face. Should be square
  skills:Skill[];
  jobs:Job[];
}