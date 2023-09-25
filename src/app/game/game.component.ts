import { Component } from '@angular/core';
import { CardManagerService } from '../service/card-manager.service';
import { Servant } from '../data/servant';
import { GameRules } from '../data/game-rules';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {

  cards : Servant[]= []
  myCards : Servant[] = []

  gameRules? : GameRules;

  constructor(private service : CardManagerService){

  }

  ngOnInit() : void{
    this.gameRules=new GameRules(10,3,6,1);
    this.refreshServants();
  }
  

  addCardToMyGame(id:number):void{
    this.gameRules?.servantUpdateCoins().subscribe(bool=>{
      if(bool){
        let card :any = this.cards.find(value=>value.id===id);
        this.myCards.push(card);
        this.cards.splice(this.cards.findIndex(value=>value.id===id),1);
      }else{
        alert("Not enought Coins.")
      }
    });    
  }

  refresh() :void{
    this.gameRules?.refreshServants().subscribe(bool=>{
      if(bool){
        this.service.getCards().subscribe(cards=>this.cards=this.gameRules!.getDockOfRandomCard(cards));
      }else{
        alert("Not enought Coins.")
      }
    });
  }

  refreshServants():void{
    this.service.getCards().subscribe(cards=>this.cards=this.gameRules!.getDockOfRandomCard(cards));
  }





}
