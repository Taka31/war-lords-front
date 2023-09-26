import { Servant } from "./servant";

export class ServantHelper{

    isShield(servant : Servant) : boolean {
        let retour :boolean = false;
        if(servant.states){
            retour = servant.states.findIndex($value=>$value.id===1)>-1;
        }
        return retour;
    }

    isProvocation(servant : Servant) : boolean {
        let retour :boolean = false;
        if(servant.states){
            retour = servant.states.findIndex($value=>$value.id===3)>-1;
        }
        return retour;
    }

    isReincarnation(servant : Servant) : boolean {
        let retour :boolean = false;
        if(servant.states){
            retour = servant.states.findIndex($value=>$value.id===2)>-1;
        } 
        return retour;
    }

}