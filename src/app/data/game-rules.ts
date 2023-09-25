import { Observable } from "rxjs";
import { Servant } from "./servant";

export class GameRules{

    private coins:number;
    private costServant:number;
    private displayedServants : number;
    private costRefresh:number;

    constructor(coins:number, costServant: number, displayedServants : number, costRefresh: number){
        this.coins=coins;
        this.costServant=costServant;
        this.displayedServants=displayedServants;
        this.costRefresh=costRefresh;
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

    refreshServants():Observable<boolean>{
        let transaction :boolean = false;

        if(this.coins>=this.costRefresh){
            this.coins-=this.costRefresh;
            transaction=true;
        }       
        return new Observable<boolean>(observer=>observer.next(transaction)); 
    
    }

    getDockOfRandomCard(servants : Servant[]):Servant[]{

        let retunrArray : Servant[]=[];

        for(let i=0;i<this.displayedServants;i++){
            let value: Servant= servants[Math.floor(Math.random()*(servants.length))];
            retunrArray.push(value)
        }
        console.log(retunrArray);
        return retunrArray;

    }

}