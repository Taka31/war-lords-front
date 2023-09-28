import { Component } from '@angular/core';
import { CardManagerService } from '../service/card-manager.service';
import { Servant } from '../data/servant';
import { GameManager } from '../data/game-manager';
import { ServantHelper } from '../data/servant-helper';
import { ServantInGame } from '../data/servant-in-game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {

  tavernCards : Servant[]= []
  myCards : ServantInGame[] = []
  helper!:ServantHelper;
  logs:string='';

  servantSelected! : Servant;

  gameManager? : GameManager;

  constructor(private service : CardManagerService){
    this.gameManager=new GameManager(10,3,6,1,this.service);
  }

  ngOnInit() : void{    
    this.helper=new ServantHelper();
    this.refreshServants();
  }
  

  addCardToMyGame(id?:number):void{
    this.gameManager?.servantUpdateCoins().subscribe(bool=>{
      if(bool){
        let card :any = this.tavernCards.find(value=>value.id===id);
        this.myCards.push(new ServantInGame(card));
        this.tavernCards.splice(this.tavernCards.findIndex(value=>value.id===id),1);
        this.logs+=`Servant choosen : ${card.name}\n`;
      }else{
        this.logs+='Not enought Coins.\n';
      }
    });    
  }

  refresh() :void{
    this.gameManager?.refreshServants().subscribe(bool=>{
      if(bool){
        this.gameManager?.getDockOfRandomCard().subscribe(servants=>this.tavernCards=servants);
        this.logs+='Refresh Servants\n';
      }else{
        this.logs+='Not enought Coins.\n';
      }
    });    
  }

  refreshServants():void{
    this.gameManager?.getDockOfRandomCard().subscribe(servants=>this.tavernCards=servants);
    this.logs+='Refresh Servants\n';
  }

  selectServant(index : number):void{
    this.gameManager!.manageSelectCard(index, this.myCards);
  }
}
