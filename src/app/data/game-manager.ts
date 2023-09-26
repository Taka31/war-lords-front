import { Observable } from "rxjs";
import { Servant } from "./servant";
import { ServantInGame } from "./servant-in-game";
import { CardManagerService } from "../service/card-manager.service";

export class GameManager{

    private coins:number;
    private costServant:number;
    private displayedServants : number;
    private costRefresh:number;

    constructor(coins:number, costServant: number, displayedServants : number, costRefresh: number, private service:CardManagerService){
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

    getDockOfRandomCard():Observable<Servant[]>{       
        return new Observable<Servant[]>(observer=>{
            let retunrArray : Servant[]=[];
            this.service.getCards().subscribe(cards=>{
                for(let i=0;i<this.displayedServants;i++){
                    let value: Servant= cards[Math.floor(Math.random()*(cards.length))];
                    retunrArray.push(value)
                }
                observer.next(retunrArray)
            })
        });
    }

    manageSelectCard(index : number, servants : ServantInGame[]){

        let servant : ServantInGame= servants[index];
        // click on the same
        if(servant.isSelected()){
                servant.setSelected(false);
        }else{
            const i = servants.findIndex(x=>x.isSelected());
            console.log(i);
            if(i>-1){
                // change servant position
                var servantTemp : ServantInGame = servants[i];
                servants[i]=servant;
                servants[index]=servantTemp;
                
                servantTemp.setSelected(false);               
            }else{
                // select one component
                servant.setSelected(true);
            }   
        }
    }

}