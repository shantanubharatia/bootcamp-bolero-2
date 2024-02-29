export class Department {
    id: number;
    name: string;
    readOnly: boolean;
    mandatory: boolean;

    public constructor(id: number, name: string, readOnly : boolean, mandatory: boolean)
    {
        this.id = id;
        this.name = name;
        this.readOnly = readOnly;
        this.mandatory = mandatory;
    }
}