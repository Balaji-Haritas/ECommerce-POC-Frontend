import { Role } from "./role.model";

export interface User{
    username:string,
    email:string,
    phoneNumber:string,
    password:string,
    roleId:number,
    role?:Role
}