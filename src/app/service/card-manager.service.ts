import { HttpClient } from '@angular/common/http'; 
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Servant } from '../data/servant';

@Injectable({
  providedIn: 'root'
})
export class CardManagerService {

  constructor(private httpClient : HttpClient) { }

  getCards():Observable<Servant[]>{
    return this.httpClient.get<Servant[]>(`/api/cards`)
  }
}
