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

  cards : Servant[] = []
  myCards : Servant[] = []

  gameRules? : GameRules;


  constructor(private service : CardManagerService){

  }

  ngOnInit() : void{
    this.service.getCards().subscribe(cards=>this.cards=cards);
    this.gameRules=new GameRules(10,3);
  }
  

  addCardToMyGame(id:number):void{
    this.gameRules?.servantUpdateCoins().subscribe(bool=>{
      if(bool){
        let card :any = this.cards.find(value=>value.id===id);
        this.myCards.push(card);
      }else{
        alert("Not enought Coins.")
      }
    });    
  }





}
