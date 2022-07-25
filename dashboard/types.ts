export interface LinkDashboard{
    id: number;
    name: string;
    value: string;
}

export interface User {
  identification: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  date: string;
  city: string;
  profession: string;
  experience:Experience[];
  references:Reference[];
  skills:Skill[];
  studies:Study[];
}

export interface Experience {
  company:string;
  position:string;
  startDate:string|Date;
  endDate:string|Date;
  phone:string;
}

export interface Reference{
firstname:string;
lastname:string;
phonenumber:string;
}

export interface Skill{
  description:string;
}

export interface Study{
  level:string;
  school:string;
  academic:string;
}