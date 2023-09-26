import { Servant } from "./servant";

export class ServantInGame{

    servant! : Servant;
    selected : boolean=false;

    constructor(servant : Servant){
        this.servant=servant;
    }

    isSelected():boolean{
        return this.selected;
    }     

    setSelected(value: boolean){
        this.selected=value;
    }
}