export interface Iuser{
  email:string;
  password:string;
  role:string;
}

export enum RolesEnum{
  Admin = 'admin',
  User = 'user',
}

