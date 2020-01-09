export class Job {
    constructor(name, org, year, desc, boxid, position){
        this.name = name;
        this.org = org;
        this.year = year;
        this.desc = desc;
        this.boxid = boxid;
        this.position = position;
    }

    getProp(index) {
        return this[index];
    }

    setProp(index, value) {
        this[index] = value;
    }

}