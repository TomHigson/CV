import { Role } from "../role/role";

export interface Job {
  companyName?:string;
  level:string;
  avatar:string;  //path to company logo. should be square
  link?:string;  //comapny website
  startYear:number;
  startMonth:number;
  endYear?:number;  //if not present, assume current
  endMonth?:number; //if not present, assume current
  contact?:string;
  contactEmail?:string;
  roles?:Role[];
  description?:string;  //markdown encoded description
}