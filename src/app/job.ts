import { Role } from "./role";

export interface Job {
  companyName:string;
  avatar:string;  //path to company logo. should be square
  link?:string;  //comapny website
  startYear:number;
  startMonth:number;
  endYear:number;
  endMonth:number;
  contact?:string;
  contactEmail?:string;
  roles:Role[];
}