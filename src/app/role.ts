import { Responsibility } from "./responsibility";

export interface Role {
  project:string;
  role:string;
  image?:string; //path to image
  link?:string; //if project is describved on the internet
  responsibilities:Responsibility[];
}