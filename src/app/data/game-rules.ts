import { Observable } from "rxjs";

export class GameRules{

    private coins:number;
    private costServant:number;

    constructor(coins:number, costServant: number){
        this.coins=coins;
        this.costServant=costServant;
    }

    getCoins():number{
        return this.coins; 
    }

    setCoins(coins : number):void{
        this.coins=coins;
    }

    servantUpdateCoins():Observable<boolean>{
        let transaction :boolean = false;

        if(this.coins>=this.costServant){
            this.coins-=this.costServant;
            transaction=true;
        }       
        return new Observable<boolean>(observer=>observer.next(transaction));
    }

}