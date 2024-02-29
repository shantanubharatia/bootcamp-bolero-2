import { Department } from "./department";

export class Employee {
    id: number;
    name: string;
    departments : Department[];

    public constructor(id:number, name:string, departments:Department[])
    {
        this.id = id;
        this.name = name;
        this.departments = departments;
    }
}