import { State } from "./state"

export interface Servant {
    id:number;
    atk:number;
    pv:number;
    skills:string;
    name:string;
    states:State[];
}